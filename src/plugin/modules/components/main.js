define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    '../lib/model',
    './searchBar',
    './filterBar',
    './resultsArea',
    './navBar',
    './searchError',
    './summary',
    'kb_knockout/components/overlayPanel'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    model,
    SearchBarComponent,
    FilterBarComponent,
    ResultsAreaComponent,
    NavBarComponent,
    SearchErrorComponent,
    SummaryComponent,
    OverlayPanelComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    // class SearchError {
    //     constructor({name, message, code, detail, info}) {
    //         this.name = name;
    //         this.message = message;
    //         this.code = code;
    //         this.detail = detail;
    //         this.info = info;
    //     }
    // }

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            this.runtime = context['$root'].runtime;

            // Primary search inputs
            this.searchInput = ko.observable();
            this.forceSearch = ko.observable();
            this.page = ko.observable();
            this.pageSize = ko.observable();
            this.totalPages = ko.observable();

            // Filters
            this.dataTypes = ko.observableArray();
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

            // And... search results.
            this.searchResults= ko.observableArray();
            this.resultCount = ko.pureComputed(() => {
                return this.searchResults().length;
            });
            this.searchSummary = ko.observableArray();

            // TODO: not implemented yet
            this.summaryCount = null;


            // TODO: configurable?
            this.maxResultCount = 10000;
            this.totalCount = ko.observable();
            this.realTotalCount = ko.observable();

            this.searchQueryInput = ko.pureComputed(() => {
                this.page(null);
                return {
                    searchInput: this.searchInput(),
                    forceSearch: this.forceSearch(),
                    dataTypes: this.dataTypes(),
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
                if (!newValue.paging.pageSize) {
                    return;
                }
                this.doSearch(newValue);
            });

            // overlay and error
            this.overlayComponent = ko.observable();
            this.showOverlay = ko.observable();
            this.subscribe(this.showOverlay, (newValue) => {
                this.overlayComponent(newValue);
            });



            // this.sortSpec = ko.observableArray();
            // this.model.columns.forEach((column) => {
            //     if (column.sort.active()) {

            //     }
            // });

            // [
            //     {
            //         name: 'date',
            //         ascending: false
            //     }
            // ]);
        }

        showError(err) {
            var stackTrace = [];
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
                params: {
                    type: '"error"',
                    hostVm: 'search'
                },
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
                    } else {
                        console.warn('cannot determine description for', object);
                        return 'n/a';
                    }
                } else {
                    console.warn('cannot determine description for', object);
                    return 'n/a';
                }
            }
        }

        doSearch(query) {
            // translate query to model call
            if (!query.input.searchInput || query.input.searchInput.trim().length === 0) {
                this.searchState('none');
                this.searchResults.removeAll();
                this.searchSummary.removeAll();
                this.totalCount(0);
                this.realTotalCount(0);
                // this.totalPages(0);
                this.page(null);
                return;
            }

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
                    // count = this.maxResultCount - (query.paging.page - 1) * query.paging.pageSize;
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

            const param = {
                query: query.input.searchInput,
                types: dataTypes,
                start: start,
                count: count,
                withUserData: query.input.withUserData,
                withReferenceData: query.input.withReferenceData,
                sorting: query.sorting.sortSpec
            };
            this.searching(true);
            this.searchState('searching');
            Promise.all([
                this.model.search(param),
                this.model.searchSummary(param)
            ])
                .spread((result, summaryResult) => {
                    // console.log('result!', summaryResult);
                    // The results
                    this.searchResults.removeAll();
                    this.searchSummary.removeAll();
                    const len = result.objects.length;
                    if (len === 0) {
                        this.searchState('notfound');
                        this.totalCount(0);
                        this.realTotalCount(0);
                        // this.totalPages(0);
                        this.page(null);
                        return;
                    }

                    // The search types summary
                    this.searchSummary(Object.entries(summaryResult.type_to_count)
                        .map(([type, count]) => {
                            return {
                                type: type,
                                count: count
                            };
                        })
                        .sort((a, b) => {
                            if (a.count < b.count) {
                                return 1;
                            } else if (a.count > b.count) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }));

                    // The workspace summary
                    const workspaces = Object.keys(result.access_group_narrative_info).reduce((workspaces, wsid) => {
                        const narrative_info = result.access_group_narrative_info[wsid];
                        if (narrative_info) {
                            const [narrativeName, /*obj id*/, /*saved time*/ , owner, ownerRealname] = narrative_info;
                            workspaces[wsid] = {
                                // this is just a guess since the search tag is not provided in the results.
                                type: narrativeName ? 'narrative': 'refdata',
                                name: narrativeName,
                                owner: owner,
                                ownerRealname: ownerRealname
                            };
                        } else {
                            // it is
                            workspaces[wsid] = {
                                name: '',
                                type: 'inaccessible',
                                owner: null,
                                ownerRealname: null
                            };
                        }
                        return workspaces;
                    }, {});

                    if (result.total > this.maxResultCount) {
                        this.totalCount(this.maxResultCount);
                        this.realTotalCount(result.total);
                    } else {
                        this.totalCount(result.total);
                        this.realTotalCount(result.total);
                    }

                    // Calculate page stats
                    // const totalPages = Math.ceil(this.totalCount()/query.paging.pageSize);
                    // this.totalPages(totalPages);
                    if (!this.page()) {
                        this.page(1);
                    }

                    // Populate results
                    result.objects.forEach((object) => {
                        // just testing...
                        const [, workspaceId, objectId, version] = object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
                        const workspace = workspaces[workspaceId];
                        let owner;
                        let name;
                        const source = workspace.type;
                        switch (workspace.type) {
                        case 'narrative':
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
                        case 'inaccessible':
                            owner = 'n/a';
                            name = 'n/a';
                            break;
                        default:
                            owner = '** err';
                            name = '** err';
                        }

                        const row = {
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
                        };
                        this.searchResults.push(row);
                    });
                    this.searchState('success');
                })
                .catch((error) => {
                    this.searchResults.removeAll();
                    this.searchSummary.removeAll();
                    this.totalCount(0);
                    this.realTotalCount(0);
                    this.page(null);
                    this.searchState('error');
                    this.showError(error);
                })
                .finally(() => {
                    this.searching(false);
                });
        }
    }

    const styles = html.makeStyles({
        component: {
            css: {
                margin: '10px',
                padding: '10px',
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
                border: '1px solid rgba(200, 200, 200, 1)',
                margin: '0 0 4px 4px',
                padding: '4px'
            }
        }
    });

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                class: styles.classes.header
            }, [
                div({
                    class: styles.classes.headerCol1
                }, [
                    gen.component({
                        name: SearchBarComponent.name(),
                        params: ['searchInput', 'forceSearch', 'searching']
                    }),
                    gen.component({
                        name: FilterBarComponent.name(),
                        params: ['withPrivateData', 'withPublicData', 'dataTypes', 'withUserData', 'withReferenceData']
                    }),
                    gen.component({
                        name: NavBarComponent.name(),
                        params: ['page', 'totalPages', 'summaryCount', 'resultCount',
                            'totalCount', 'realTotalCount', 'searching', 'searchState']
                    })
                ]),
                div({
                    class: styles.classes.headerCol2
                }, gen.component({
                    name: SummaryComponent.name(),
                    params: ['searchSummary']
                }))
            ]),
            gen.component({
                name: ResultsAreaComponent.name(),
                params: ['searchResults', 'searching', 'pageSize', 'searchState', 'showOverlay']
            }),
            gen.component({
                name: OverlayPanelComponent.name(),
                params: {
                    component: 'overlayComponent',
                    hostVm: '$data'
                }
            })
        ]);
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});