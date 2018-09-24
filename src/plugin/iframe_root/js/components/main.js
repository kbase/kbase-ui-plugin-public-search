define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/lang',
    '../lib/serviceUtils',
    '../lib/model',
    './searchBar',
    './resultsArea',
    './navBar',
    './searchError',
    './dataTypes',
    './help',
    './tooltipManager',
    './dataSource',
    './dataPrivacy',
    './feedback',
    './copy/copyObjects',
    'kb_knockout/components/overlayPanel',
    'kb_knockout/lib/nanoBus',
    '../lib/debug',
    '../lib/history',
    '../lib/style',
    '../lib/text'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    lang,
    serviceUtils,
    model,
    SearchBarComponent,
    ResultsAreaComponent,
    NavBarComponent,
    SearchErrorComponent,
    DataTypesComponent,
    HelpComponent,
    TooltipComponent,
    DataSourceComponent,
    DataPrivacyComponent,
    FeedbackComponent,
    CopyObjectsComponent,
    OverlayPanelComponent,
    NanoBus,
    debug,
    history,
    commonStyle,
    text
) {
    'use strict';

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            // maybe these should be passed in directly, and set up
            // here with let? "let" us try.
            this.runtime = context.$root.runtime;
            this.supportedDataTypes = context.$root.supportedDataTypes;
            this.columns = context.$root.columns;
            this.maxHistoryLength = 10;

            this.authorization = params.authorization;
            this.pluginParams = this.parsePluginParams(params.pluginParams);

            // Primary search inputs
            this.searchInput = ko.observable(this.pluginParams.query);
            this.forceSearch = ko.observable();
            this.page = ko.observable(1);
            this.pageSize = ko.observable();
            this.totalPages = ko.observable();
            this.searchHistory = ko.observableArray();

            // Filters

            // For data types, we take the params, if any, and set the
            // omitted data types to include all of the supported data types
            // not in the list of supplied data types.
            let defaultOmittedDataTypes = [];
            if (this.pluginParams.dataTypes) {
                defaultOmittedDataTypes = this.supportedDataTypes
                    .filter(({value}) => {
                        return !this.pluginParams.dataTypes.includes(value.toLowerCase());
                    })
                    .map((type) => {
                        return type.value;
                    });
            }

            this.dataTypes = ko.observableArray();
            this.omittedDataTypes = ko.observableArray(defaultOmittedDataTypes);

            this.dataSources = ko.observableArray();

            let defaultWithPrivateData = true;
            let defaultWithPublicData = true;
            if (this.pluginParams.dataPrivacy) {
                if (!this.pluginParams.dataPrivacy.includes('private')) {
                    defaultWithPrivateData = false;
                }
                if (!this.pluginParams.dataPrivacy.includes('public')) {
                    defaultWithPublicData = false;
                }
                if (!defaultWithPrivateData && !defaultWithPublicData) {
                    defaultWithPrivateData = true;
                    defaultWithPublicData = true;
                }
            }
            this.withPrivateData = ko.observable(defaultWithPrivateData);
            this.withPublicData = ko.observable(defaultWithPublicData);

            let defaultWithUserData = true;
            let defaultWithReferenceData = true;
            if (this.pluginParams.workspaceTypes) {
                if (!this.pluginParams.workspaceTypes.includes('narrative')) {
                    defaultWithUserData = false;
                }
                if (!this.pluginParams.workspaceTypes.includes('refdata')) {
                    defaultWithReferenceData = false;
                }
                if (!defaultWithUserData && !defaultWithReferenceData) {
                    defaultWithUserData = true;
                    defaultWithReferenceData = true;
                }
            }
            this.withUserData = ko.observable(defaultWithUserData);
            this.withReferenceData = ko.observable(defaultWithReferenceData);

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

            // Auth state
            // TODO: this should be set by an auth event.
            // this.authorization = ko.observable(this.runtime.service('session').getAuthToken());

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
                    page: this.page() || 1,
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
                // console.log('ah 1', this.page(), this.totalPages(), newValue);
                if (this.page() > this.totalPages()) {
                    this.page(this.totalPages());
                // } else if (!this.page() && this.totalPages() > 0) {
                //     this.page(1);
                }
                // console.log('ah 2', this.page(), this.totalPages(), newValue);
            });

            // sorting interface
            this.sortSpec = ko.pureComputed(() => {
                return {
                    sortSpec: this.columns
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

            // object selection - for copying and ??
            this.selectedRows = ko.observableArray();

            this.selectedObjects = ko.pureComputed(() => {
                return this.selectedRows().map((rowId) => {
                    const [,workspaceId, objectId, version] = /WS:(\d+)\/(\d+)\/(\d+)/.exec(rowId);
                    return [workspaceId, objectId, version].join('/');
                });
            });

            // computeds
            this.searchQuery = ko.pureComputed(() => {
                return {
                    input: this.searchQueryInput(),
                    paging: this.searchPagingInput(),
                    sorting: this.sortSpec(),
                    authorization: this.authorization()
                };
            });

            // subscriptions
            this.lastSearch = {
                query: null,
            };
            this.subscribe(this.searchQuery, (newValue) => {
                // don't run search until page size is set.
                if (!newValue.paging.pageSize) {
                    return;
                }

                // Don't search if we have spammed some dependency.
                if (lang.isEqual(newValue, this.lastSearch.query)) {
                    return;
                }

                // If the query terms have changed, reset the page --
                // otherwise, leave it alone.
                // It may still be adjusted after the search completes.
                if (this.lastSearch.query) {
                    if (this.lastSearch.query.input.searchInput !== newValue.input.searchInput) {
                        if (this.page() && this.page() > 1) {
                            this.page(null);
                            return;
                        }
                    }
                }

                this.lastSearch.query = newValue;
                this.doSearch(newValue);
            });

            // overlay and error
            this.overlayComponent = ko.observable();
            this.showOverlay = ko.observable();
            this.subscribe(this.showOverlay, (newValue) => {
                this.overlayComponent(newValue);
            });

            // Help.
            // this.parentBus.on('help', () => {
            //     this.showOverlay({
            //         name: HelpComponent.name(),
            //         viewModel: {
            //             bus: this.bus
            //         }
            //     });
            // });

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
                    viewModel: {
                        // bus: this.bus
                    }
                });
            });

            this.bus.on('show-copy-objects', () => {
                this.showOverlay({
                    name: CopyObjectsComponent.name(),
                    viewModel: {
                        objectsToCopy: this.selectedObjects
                    }
                });
                // window.alert('copying objects...');
            });

            this.tooltipChannel = new NanoBus();
            this.bus.on('show-tooltip', (tooltip) => {
                this.tooltipChannel.send('add-tooltip', tooltip);
            });

            this.subscribe(this.authorization, () => {
                this.setupHistory();
            });

            // MAIN

            this.setupHistory();
        }

        setupHistory() {
            if (this.authorization()) {
                this.history = new history.ProfileHistory({
                    maxSize: 10,
                    name: 'kbase.plugins.public-search',
                    maxAge: 60*60,
                    token: this.authorization().token,
                    username: this.authorization().username,
                    url: this.runtime.config('services.UserProfile.url')
                });
            } else {
                this.history = new history.CookieHistory({
                    maxSize: 10,
                    name: 'kbase.plugins.public-search',
                    maxAge: 60*60
                });
            }
            this.history.getHistory()
                .then((history) => {
                    this.searchHistory(history);
                })
                .catch((err) => {
                    console.error('Error fetching search history', err);
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

        parsePluginParams(pluginParams) {
            return {
                query: pluginParams.query,
                dataPrivacy: pluginParams.dataPrivacy ? pluginParams.dataPrivacy.split(',') : null,
                workspaceTypes: pluginParams.workspaceTypes ? pluginParams.workspaceTypes.split(',') : null,
                dataTypes: pluginParams.dataTypes ? pluginParams.dataTypes.split(',').map((type) => {return type.toLowerCase();}) : null
            };
        }

        updatePluginParams(query) {
            // const pluginParams = {
            //     query: null,
            //     dataPrivacy: [],
            //     workspaceTypes: [],
            //     dataTypes: []
            // };

            const pluginParams = {};

            if (query.input.searchInput) {
                pluginParams.query = query.input.searchInput.trim();
            }

            if (query.input.withPrivateData || query.input.withPublicData) {
                const dataPrivacy = [];
                if (query.input.withPrivateData) {
                    dataPrivacy.push('private');
                }
                if (query.input.withPublicData) {
                    dataPrivacy.push('public');
                }
                if (dataPrivacy.length !== 2) {
                    pluginParams.dataPrivacy = dataPrivacy;
                }
            }

            if (query.input.withUserData || query.input.withReferenceData) {
                const workspaceTypes = [];
                if (query.input.withUserData) {
                    workspaceTypes.push('narrative');
                }
                if (query.input.withReferenceData) {
                    workspaceTypes.push('refdata');
                }
                if (workspaceTypes.length !== 2) {
                    pluginParams.workspaceTypes = workspaceTypes;
                }
            }

            if (query.input.dataTypes &&
                query.input.dataTypes.length !== this.supportedDataTypes.length) {
                pluginParams.dataTypes = query.input.dataTypes;
            }

            this.parentBus.send('set-plugin-params', {pluginParams});
        }

        doSearch(query) {
            this.updatePluginParams(query);

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

            // Set the query params

            // NB this is async, so the history will not be updated right away here.
            this.history.updateHistory(query.input.searchInput)
                .then((newHistory) => {
                    this.searchHistory(newHistory);
                })
                .catch((err) => {
                    console.error('Error updating search history', err);
                    this.searchHistory([]);
                });

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

            const dataTypes = query.input.dataTypes;
            // if (query.input.dataTypes.length === 0) {
            //     dataTypes = null;
            // } else {
            //     dataTypes = query.input.dataTypes;
            // }


            // console.log('dosearch');
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
                    sorting: query.sorting.sortSpec,
                    withPrivate: query.input.withPrivateData,
                    withPublic: query.input.withPublicData
                }),
                this.model.searchSummary({
                    types: query.input.supportedDataTypes,
                    query: query.input.searchInput,
                    withUserData: query.input.withUserData,
                    withReferenceData: query.input.withReferenceData,
                    withPrivate: query.input.withPrivateData,
                    withPublic: query.input.withPublicData
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
                    if (!this.page()) {
                        this.page(1);
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
                        // } else if (info.globalread === 'n' && info.user_permission === 'n') {
                        //     workspace.type = 'inaccessible';
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
                            debug.tryInaccessibleObject(this.runtime, object.guid, [workspaceId, objectId, version].join('/'));
                            break;
                        default:
                            owner = '** err';
                            name = '** err';
                        }

                        const row = {
                            mode: mode,
                            id: object.guid,
                            // should be added in the table component; we shouldn't necessarily
                            // know about this here. or perhaps in an class provided by the table
                            // module.
                            over: ko.observable(false),
                            data: {
                                selected: {
                                    value: ko.observable(this.selectedRows().includes(object.guid))
                                },
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
                    });
                    this.searchResults(searchResults);
                    this.searchState('success');
                })
                .catch((error) => {
                    this.searchResults.removeAll();
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

    const t = html.tag,
        span = t('span'),
        div = t('div');

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
                // the min-width prevents the column from shrinking.
                // TODO: same thing with flex!
                minWidth: '15em',
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
            class: style.classes.component,
            dataBind: {
                let: {
                    authorization: 'authorization'
                }
            }
        }, [
            div({
                class: style.classes.header
            }, [
                div({
                    class: style.classes.headerCol1
                }, [
                    gen.component({
                        name: SearchBarComponent.name(),
                        params: ['bus', 'searchInput', 'forceSearch', 'searching', 'selectedObjects', 'searchHistory']
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
                        class: style.classes.columnHeader,
                        title: text.getTooltip('FILTERS_HEADER')
                    }, span({
                        class: commonStyle.classes.tooltipLight
                    }, 'Filters')),
                    div({
                        class: style.classes.columnGroup
                    }, [
                        div({
                            class: style.classes.fieldGroupLabel
                        }, span({
                            class: commonStyle.classes.tooltipDark,
                            title: text.getTooltip('DATA_PRIVACY_HEADER')
                        }, 'Data Privacy')),
                        gen.component({
                            name: DataPrivacyComponent.name(),
                            params: {
                                withPrivateData: 'withPrivateData',
                                withPublicData: 'withPublicData'
                            }
                        })
                    ]),
                    div({
                        class: style.classes.columnGroup
                    }, [
                        div({
                            class: style.classes.fieldGroupLabel
                        }, span({
                            class: commonStyle.classes.tooltipDark,
                            title: text.getTooltip('WORKSPACE_TYPE_HEADER')
                        }, 'Workspace Type')),
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
                        }, span({
                            class: commonStyle.classes.tooltipDark,
                            title: text.getTooltip('DATA_TYPES_HEADER')
                        }, 'Data Types')),
                        gen.component({
                            name: DataTypesComponent.name(),
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
                        params: ['bus', 'searchResults', 'searching', 'pageSize', 'searchState', 'showOverlay', 'errorMessage', 'selectedRows']
                    })
                ])
            ]),
            gen.component({
                name: OverlayPanelComponent.name(),
                params: {
                    component: 'overlayComponent'
                    // hostVm: '$data'
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
            stylesheets: [style.sheet, commonStyle.sheet]
        };
    }

    return reg.registerComponent(component);
});