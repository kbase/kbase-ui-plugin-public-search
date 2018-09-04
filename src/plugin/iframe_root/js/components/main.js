define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    '../lib/serviceUtils',
    '../lib/model',
    './searchBar',
    './filterBar',
    './resultsArea',
    './navBar',
    './searchError',
    './summary',
    './help',
    './tooltipManager',
    './dataSource',
    './feedback',
    'kb_knockout/components/overlayPanel',
    'kb_knockout/lib/nanoBus',
    '../lib/debug'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    serviceUtils,
    model,
    SearchBarComponent,
    FilterBarComponent,
    ResultsAreaComponent,
    NavBarComponent,
    SearchErrorComponent,
    SummaryComponent,
    HelpComponent,
    TooltipComponent,
    DataSourceComponent,
    FeedbackComponent,
    OverlayPanelComponent,
    NanoBus,
    debug
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            this.runtime = context.$root.runtime;
            this.supportedDataTypes = context.$root.supportedDataTypes;

            // Primary search inputs
            this.searchInput = ko.observable();
            this.forceSearch = ko.observable();
            this.page = ko.observable();
            this.pageSize = ko.observable();
            this.totalPages = ko.observable();

            // Filters
            this.dataTypes = ko.observableArray();
            this.omittedDataTypes = ko.observableArray();
            this.dataSources = ko.observableArray();
            this.withPrivateData = ko.observable(true);
            this.withPublicData = ko.observable(true);
            this.withUserData = ko.observable(true);
            this.withReferenceData = ko.observable(true);

            // data model
            this.model = new model.Model({
                runtime: this.runtime
            });

            // Search state
            this.searching = ko.observable();
            this.error = ko.observable();
            this.searchState = ko.observable('none');
            this.errorMessage = ko.pureComputed(() => {
                const error = this.error();
                if (error) {
                    return error.message;
                }
            });

            // And... search results.
            this.searchResults= ko.observableArray();
            this.resultCount = ko.pureComputed(() => {
                return this.searchResults().length;
            });
            this.searchSummary = ko.observableArray(
                this.supportedDataTypes.map((type) => {
                    return {
                        selected: ko.pureComputed(() => {return !this.omittedDataTypes().includes(type.value);}),
                        type: type.value,
                        count: ko.observable(null)
                    };
                })
                    .sort((a, b) => {
                        if (a.type < b.type) {
                            return -1;
                        }
                        if (a.type > b.type) {
                            return 1;
                        }
                        return 0;
                    }));

            // TODO: not implemented yet
            this.summaryCount = null;

            // TODO: configurable?
            this.maxResultCount = 10000;
            this.totalCount = ko.observable();
            this.realTotalCount = ko.observable();

            this.searchQueryInput = ko.pureComputed(() => {
                const omitted = this.omittedDataTypes();
                const dataTypes = [];
                for (const type of this.supportedDataTypes) {
                    if (!omitted.includes(type.value)) {
                        dataTypes.push(type.value);
                    }
                }

                const supportedDataTypes = this.supportedDataTypes.map((type) => {
                    return type.value;
                });

                return {
                    searchInput: this.searchInput(),
                    forceSearch: this.forceSearch(),
                    dataTypes: dataTypes,
                    supportedDataTypes: supportedDataTypes,
                    dataSources: this.dataSources(),
                    withPrivateData: this.withPrivateData(),
                    withPublicData: this.withPublicData(),
                    withUserData: this.withUserData(),
                    withReferenceData: this.withReferenceData()
                };
            });

            this.searchPagingInput = ko.pureComputed(() => {
                return {
                    page: this.page(),
                    pageSize: this.pageSize()
                };
            });

            this.totalPages = ko.pureComputed(() => {
                if (this.totalCount() && this.pageSize()) {
                    return Math.ceil(this.totalCount()/this.pageSize());
                }
                return 0;
            });


            this.subscribe(this.pageSize, () => {
                // if the new page size puts the current page beyond the end, set it to the end.
                if (this.page() > this.totalPages()) {
                    this.page(this.totalPages());
                }
            });

            // sorting interface
            this.sortSpec = ko.pureComputed(() => {
                return {
                    sortSpec: model.columns
                        .filter((column) => {
                            if (!column.sort) {
                                return false;
                            }
                            return column.sort.active();
                        })
                        .map((column) => {
                            return {
                                propertyKey: column.sort.propertyKey,
                                direction: column.sort.direction(),
                                isObject: column.sort.isObject
                            };
                        })
                };
            });

            // computeds
            this.searchQuery = ko.pureComputed(() => {
                return {
                    input: this.searchQueryInput(),
                    paging: this.searchPagingInput(),
                    sorting: this.sortSpec()
                };
            });

            // subscriptions
            this.subscribe(this.searchQuery, (newValue) => {
                // don't run search until page size is set.
                // console.log('new query...', newValue, newValue.paging);
                if (!newValue.paging.pageSize) {
                    return;
                }
                // console.log('do search through searchQuery');
                this.doSearch(newValue);
            });

            // overlay and error
            this.overlayComponent = ko.observable();
            this.showOverlay = ko.observable();
            this.subscribe(this.showOverlay, (newValue) => {
                this.overlayComponent(newValue);
            });


            // Help.
            this.parentBus.on('help', () => {
                this.showOverlay({
                    name: HelpComponent.name(),
                    viewModel: {}
                });
            });

            this.bus.on('showError', () => {
                this.showError();
            });

            this.bus.on('show-feedback', () => {
                this.showOverlay({
                    name: FeedbackComponent.name(),
                    viewModel: {}
                });
            });

            this.bus.on('show-help', () => {
                this.showOverlay({
                    name: HelpComponent.name(),
                    viewModel: {}
                });
            });

            this.tooltipChannel = new NanoBus();
            this.bus.on('show-tooltip', (tooltip) => {
                this.tooltipChannel.send('add-tooltip', tooltip);
            });
        }

        showError() {
            const err = this.error();
            let stackTrace = [];

            if (err.stack) {
                stackTrace = err.stack.split('\n');
            }

            if (err instanceof Error) {
                this.error({
                    code: 'error',
                    message: err.name + ': ' + err.message,
                    detail: 'trace here',
                    info: {
                        stackTrace: err.stack.split('\n')
                    },
                    stackTrace: stackTrace
                });
            // Some other object altogether
            } else {
                this.error({
                    code: 'unknown',
                    message: err.message || '',
                    detail: '',
                    info: err || {},
                    stackTrace: stackTrace
                });
            }
            this.showOverlay({
                name: SearchErrorComponent.name(),
                type: 'error',
                viewModel: {
                    error: this.error
                }
            });
        }

        grokDescription(object) {
            switch (object.type) {
            case 'Narrative':
                return object.key_props['title'];
            case 'Tree':
                return object.data.default_node_labels.user1;
            case 'Pangenome':
                return object.data.name;
            case 'FBAModel':
                return object.data.name;
            default:
                if (object.data) {
                    if (object.data.scientific_name) {
                        return object.data.scientific_name;
                    } else if (object.data.name) {
                        return object.data.name;
                    }
                }
                return object.object_name;
            }
        }

        doSearch(query) {
            // console.log('do search 1', query);
            // translate query to model call
            if (!query.input.searchInput || query.input.searchInput.trim().length === 0) {
                this.searchState('none');
                this.searchResults.removeAll();
                this.resetSearchSummary();
                this.totalCount(0);
                this.realTotalCount(0);
                this.page(1);
                return;
            }
            // console.log('do search 2');

            let start;
            if (query.paging.page) {
                start = (query.paging.page - 1) * query.paging.pageSize;
            } else {
                start = 0;
            }

            // calculate the count; it may not be pageSize on the final page.
            let count;
            if (query.paging.page > 1) {
                const last = query.paging.page * query.paging.pageSize;
                if (last >= this.maxResultCount) {
                    count = this.maxResultCount - last + query.paging.pageSize;
                } else {
                    count = query.paging.pageSize;
                }
            } else {
                count = query.paging.pageSize;
            }

            let dataTypes;
            if (query.input.dataTypes.length === 0) {
                dataTypes = null;
            } else {
                dataTypes = query.input.dataTypes;
            }

            // console.log('about to search...');
            this.searching(true);
            this.searchState('searching');
            Promise.all([
                this.model.search({
                    query: query.input.searchInput,
                    types: dataTypes,
                    start: start,
                    count: count,
                    withUserData: query.input.withUserData,
                    withReferenceData: query.input.withReferenceData,
                    sorting: query.sorting.sortSpec
                }),
                this.model.searchSummary({
                    types: query.input.supportedDataTypes,
                    query: query.input.searchInput,
                    withUserData: query.input.withUserData,
                    withReferenceData: query.input.withReferenceData
                })
            ])
                .spread((result, summaryResult) => {
                    this.searchResults.removeAll();

                    this.searchSummary().forEach((summary) => {
                        summary.count(summaryResult.type_to_count[summary.type] || 0);
                        // if (this.omittedDataTypes().includes(summary.type)) {
                        //     summary.count(null);
                        // } else {
                        //     summary.count(summaryResult.type_to_count[summary.type] || 0);
                        // }
                    });


                    const len = result.objects.length;
                    if (len === 0) {
                        this.searchState('notfound');
                        this.totalCount(0);
                        this.realTotalCount(0);
                        this.page(1);
                        return;
                    }

                    if (result.total > this.maxResultCount) {
                        this.totalCount(this.maxResultCount);
                        this.realTotalCount(result.total);
                    } else {
                        this.totalCount(result.total);
                        this.realTotalCount(result.total);
                    }

                    // we receive the workspace and object info for each search result.
                    // Here we transform them into more usable forms.
                    const workspacesMap = {};
                    for (const [id, info] of Object.entries(result.access_groups_info)) {
                        workspacesMap[id] = serviceUtils.workspaceInfoToObject(info);
                    }
                    this.workspacesMap = workspacesMap;

                    const objectsMap = {};
                    for (const [ref, info] of Object.entries(result.objects_info)) {
                        objectsMap[ref] = serviceUtils.objectInfoToObject(info);
                    }
                    this.objectsMap = objectsMap;

                    const workspaces = {};
                    for (const [id, info] of Object.entries((workspacesMap))) {
                        // grok the workspace type
                        const workspace = {
                            type: null,
                            name: null,
                            owner: null,
                            ownerRealName: null
                        };
                        if (info == null) {
                            workspace.type = 'inaccessible';
                        } else if (info.globalread === 'n' && info.user_permission === 'n') {
                            workspace.type = 'inaccessible';
                        } else {
                            workspace.owner = info.owner;
                            if (result.access_group_narrative_info[id]) {
                                workspace.ownerRealName = result.access_group_narrative_info[id][4];
                            }
                            if (info.metadata.narrative) {
                                if (info.metadata.narrative_nice_name) {
                                    workspace.type = 'narrative';
                                    workspace.name = info.metadata.narrative_nice_name;
                                } else {
                                    workspace.type = 'tempnarrative';
                                    workspace.name = 'Untitled';
                                }
                            } else if (info.metadata.searchtags) {
                                if (info.metadata.searchtags.includes('refdata')) {
                                    workspace.type = 'refdata';
                                    workspace.name = info.name;
                                } else {
                                    workspace.type = 'workspace';
                                    workspace.name = info.name;
                                }
                            } else {
                                workspace.type = 'workspace';
                                workspace.name = info.name;
                            }
                        }
                        workspaces[id] = workspace;
                    }

                    // Calculate page stats
                    // if (!this.page()) {
                    //     this.page(1);
                    // }

                    // Populate results
                    const searchResults = result.objects.map((object) => {
                        // just testing...
                        const [, workspaceId, objectId, version] = object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
                        const workspace = workspaces[workspaceId];
                        let owner;
                        let name;
                        let mode = 'normal';
                        const source = workspace.type;
                        switch (workspace.type) {
                        case 'narrative':
                            owner = workspace.owner;
                            name = workspace.name;
                            // name = 'narrative';
                            break;
                        case 'tempnarrative':
                            owner = workspace.owner;
                            name = workspace.name;
                            // name = 'narrative';
                            break;
                        case 'refdata':
                            if (object.data.source) {
                                owner = 'kbase';
                                name = object.data.source;
                            } else {
                                owner = 'kbase';
                                // console.log('hmm', workspace, object);
                                name = 'n/a';
                            }
                            break;
                        case 'workspace':
                            owner = workspace.owner;
                            name = workspace.name;
                            break;
                        case 'inaccessible':
                            owner = 'n/a';
                            name = 'n/a';
                            mode = 'inaccessible';
                            // debug.tryInaccessibleObject(this.runtime, object.guid, [workspaceId, objectId, version].join('/'));
                            break;
                        default:
                            owner = '** err';
                            name = '** err';
                        }

                        const row = {
                            mode: mode,
                            data: {
                                type: {
                                    value: object.type
                                },
                                date: {
                                    value: new Date(object.timestamp)
                                },
                                owner: {
                                    value: owner
                                },
                                source: {
                                    value: source
                                },
                                name: {
                                    value: name
                                },
                                description: {
                                    value: this.grokDescription(object)
                                },
                                metadata: {
                                    workspaceId: workspaceId,
                                    objectId: objectId,
                                    version: version,
                                    ref: [workspaceId, objectId, version].join('/'),
                                    workspaceType: workspace.type
                                }
                            }
                        };
                        return row;

                        // quick hack
                        // this.searchResults.push(row);
                    });
                    this.searchResults(searchResults);
                    this.searchState('success');
                })
                .catch((error) => {
                    this.searchResults.removeAll();
                    // this.searchSummary.removeAll();
                    this.resetSearchSummary();
                    this.totalCount(0);
                    this.realTotalCount(0);
                    this.page(1);
                    this.searchState('error');
                    this.error(error);
                    // this.showError();
                })
                .finally(() => {
                    this.searching(false);
                });
        }

        resetSearchSummary() {
            this.searchSummary().forEach((summary) => {
                summary.count(null);
            });
        }
    }

    const style = html.makeStyles({
        component: {
            css: {
                margin: '0 10px',
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        header: {
            css: {
                // flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        headerCol1: {
            css: {
                flex: '2 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        headerCol2: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                // border: '1px solid rgba(200, 200, 200, 1)',
                margin: '0 0 4px 4px',
                padding: '4px'
            }
        },
        mainRow: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        filterColumn: {
            css: {
                width: '15em',
                display: 'flex',
                flexDirection: 'column',
                paddingRight: '10px'
            }
        },
        resultsColumn: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        fieldGroupLabel: {
            fontWeight: 'bold',
            color: 'gray',
            // marginTop: '8px',
            // marginRight: '4px'
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1.5em',
            marginBottom: '8px'
        },
        columnHeader: {
            // fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'gray',
            // textAlign: 'center',
            margin: '10px 0 10px 0',
            textTransform: 'lowercase',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '2em'
            // borderBottom: '1px silver solid'
        },
        columnGroup: {
            css: {
                border: '1px silver solid',
                // padding: '4px',
                marginBottom: '10px'
            }
        }
    });

    function template() {
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.header
            }, [
                div({
                    class: style.classes.headerCol1
                }, [
                    gen.component({
                        name: SearchBarComponent.name(),
                        params: ['bus', 'searchInput', 'forceSearch', 'searching']
                    }),
                ]),
            ]),
            div({
                class: style.classes.mainRow
            }, [
                div({
                    class: style.classes.filterColumn
                }, [
                    div({
                        class: style.classes.columnHeader
                    }, 'Filters'),
                    div({
                        class: style.classes.columnGroup
                    }, [
                        div({
                            class: style.classes.fieldGroupLabel
                        }, 'Data Sources'),
                        gen.component({
                            name: DataSourceComponent.name(),
                            params: {
                                withUserData: 'withUserData',
                                withReferenceData: 'withReferenceData'
                            }
                        })
                    ]),
                    div({
                        class: style.classes.columnGroup
                    }, [
                        div({
                            class: style.classes.fieldGroupLabel
                        }, 'Data Types'),
                        gen.component({
                            name: SummaryComponent.name(),
                            params: ['searchSummary', 'searchState', 'totalCount', 'realTotalCount', 'omittedDataTypes']
                        })
                    ])
                ]),
                div({
                    class: style.classes.resultsColumn
                }, [
                    div({
                        class: style.classes.columnHeader
                    }, 'Results'),
                    gen.component({
                        name: NavBarComponent.name(),
                        params: ['bus', 'page', 'totalPages', 'summaryCount', 'resultCount',
                            'totalCount', 'realTotalCount', 'searching', 'searchState']
                    }),
                    gen.component({
                        name: ResultsAreaComponent.name(),
                        params: ['bus', 'searchResults', 'searching', 'pageSize', 'searchState', 'showOverlay', 'errorMessage']
                    })
                ])
            ]),
            gen.component({
                name: OverlayPanelComponent.name(),
                params: {
                    component: 'overlayComponent',
                    hostVm: '$data'
                }
            }),
            gen.component({
                name: TooltipComponent.name(),
                params: {
                    channel: 'tooltipChannel'
                }
            })
        ]);
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});