define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_lib/jsonRpc/genericClient',
    'kb_lib/jsonRpc/dynamicServiceClient',
    'kb_knockout/components/table',
    './aliases',
    './functions',
    './location'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    builders,
    GenericClient,
    DynamicServiceClient,
    TableComponent,
    AliasesComponent,
    FunctionsComponent,
    LocationComponent
) {
    'use strict';

    class Column {
        constructor({name, label, type, sort, width, style, noSelect, component}) {
            this.name = name;
            this.label = label;
            this.type = type;
            this.sort = sort || null;
            this.width = width || 1;
            this.style = style || {};
            this.noSelect = noSelect || false;
            this.component = component || null;
        }
    }

    class Row {
        constructor({data}) {
            this.mode = 'normal';
            // this.id ?
            this.over = ko.observable(false);
            this.data = data;
        }
    }

    class Table {
        constructor({rows} = {}) {
            this.rows = ko.observableArray(rows || []);
            this.selectedRows = ko.observableArray();
            this.columns = [
                new Column({
                    name: 'type',
                    label: 'Type',
                    type: 'string',
                    width: 1
                }),
                new Column({
                    name: 'id',
                    label: 'ID',
                    type: 'string',
                    width: 2
                }),
                new Column({
                    name: 'aliases',
                    label: 'Aliases',
                    width: 3,
                    component: AliasesComponent.name()
                }),
                new Column({
                    name: 'functions',
                    label: 'Functions',
                    width: 3,
                    component: FunctionsComponent.name()
                }),
                new Column({
                    name: 'location',
                    label: 'Location',
                    width: 3,
                    component: LocationComponent.name()
                })
            ];

            this.isLoading = ko.observable();
            this.pageSize = ko.observable();
            this.state = ko.observable();
            this.errorMessage = ko.observable();
            this.env = {
                selectedRows: this.selectedRows
            };
            this.actions = {};
            this.sortby = (column) => {
                column.sort.direction(column.sort.direction()==='ascending'? 'descending' : 'ascending');
                this.columns.forEach((column) => {
                    if (column.sort) {
                        column.sort.active(false);
                    }
                });
                column.sort.active(true);
            };
            this.rowAction = null;
        }
    }

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {object} = params;
            this.object = object;
            console.log('object...', object);
            // for now reconstruct the guid...
            this.genomeGuid = 'WS:' + [object.objectInfo.wsid, object.objectInfo.id, object.objectInfo.version].map(String).join('/');
            // this.genomeGuid = object.guid;
            // this.ref = ref;
            this.runtime = context.$root.runtime;
            this.token = ko.pureComputed(() => {
                const auth = context.$root.authorization();
                if (!auth) {
                    return null;
                }
                return auth.token;
            });

            this.searchInput = ko.observable('*');

            this.table = new Table();

            this.subscribe(this.table.pageSize, (newValue) => {
                console.log('new page size', newValue);
            });

            this.searchQuery = ko.pureComputed(() => {
                const searchInput = this.searchInput();
                if (!searchInput) {
                    return;
                }
                const searchTerms = searchInput.trim();
                if (searchTerms.length === 0) {
                    return;
                }

                const pageSize = this.table.pageSize();
                if (!pageSize) {
                    return;
                }

                return {
                    terms: searchInput,
                    pageSize: pageSize
                };
            });

            this.subscribe(this.searchQuery, (newValue) => {
                console.log('hmm', newValue);
                if (!newValue) {
                    return;
                }
                this.doSearch(newValue);
            });

            this.messages = {
                none: 'no active search',
                notfound: 'sorry, not found',
                loading: 'loading...',
                error: 'error!'
                // none: div([
                //     p('No active search.'),
                //     hr({style: {width: '50%'}}),
                //     p('Enter one or more terms above to search for public data.'),
                //     p('The search will find objects that include <b>all of the search words</b>, or terms, you submit. In tech-speak, this means that the terms are implicitly combined by a logical "AND".'),
                //     p([
                //         'Terms are matched against <b>whole words</b>; a search term will which is part of a word found in an object will not result in a match.'
                //     ])
                // ]),
                // notfound: div([
                //     p('Sorry, nothing was found with this search.'),
                //     hr({style: {width: '50%'}}),
                //     p([
                //         'Try broadening your search or use the ',
                //         span({
                //             class: 'fa fa-bullhorn'
                //         }),
                //         ' Feedback button above to let us know how we can improve search.'
                //     ]),
                // ]),
                // loading: div([
                //     build.loading('Running your search...')
                // ]),
                // error: {
                //     component: {
                //         name: ResultsErrorComponent.name(),
                //         params: {
                //             link: 'bus',
                //             message: 'errorMessage'
                //         }
                //     }
                // }
            };
        }

        doSearch(query) {
            console.log('do search', query);
            this.getGenes(query)
                .then((genes) => {
                    console.log('GENES', genes);
                    const rows = genes.map(({id, type, aliases, functions, location}) => {
                        return new Row({
                            data: {
                                id: {
                                    value: id
                                },
                                type: {
                                    value: type
                                },
                                aliases: {
                                    value: aliases
                                },
                                functions: {
                                    value: functions
                                },
                                location: {
                                    value: location
                                }
                            }
                        });
                    });
                    console.log('rows', rows);
                    this.table.rows(rows);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                });
        }

        getGenes(query) {
            console.log('get genes with', query);
            const searchAPI = this.runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: true
            });
            // const searchApi = new DynamicServiceClient({
            //     module: 'KBaseSearchEngine',
            //     url: this.runtime.config('services.ServiceWizard.url'),
            //     token: this.token()
            // });
            // const query = this.searchInput();
            const start = 0;
            const count = query.pageSize;

            let fullTextInAll = this.genomeGuid;
            if (query.terms !== '*') {
                fullTextInAll += ' ' + query.terms;
            }

            const sortingRules = [{
                property: 'id',
                ascending: 1,
                is_object_property: 1
            }];
            const param = {
                object_types: ['GenomeFeature'],
                match_filter: {
                    full_text_in_all: fullTextInAll,
                    exclude_subobjects: 0,
                    // lookup_in_keys: {
                    //     parent_guid: {
                    //         value: this.genomeGuid
                    //     }
                    // }
                },
                pagination: {
                    start: start,
                    count: count
                },
                post_processing: {
                    ids_only: 0,
                    skip_info: 0,
                    skip_keys: 0,
                    skip_data: 0,
                    include_highlight: 1,
                    add_narrative_info: 1,
                    add_access_group_info: 1
                },
                access_filter: {
                    with_private: 1,
                    with_public: 1
                },
                sorting_rules: sortingRules
            };
            return searchAPI.callFunc('search_objects', [param])
                .spread((result) => {
                    console.log('got search result', param, result);
                    return result.objects.map(({data}) => {
                        const {id, type, location, aliases, functions} = data;
                        return {
                            id, type,
                            location: location.map(([id, start, strand, length]) => {
                                return {id, start, strand, length};
                            }),
                            aliases: aliases.map((alias) => {
                                if (typeof alias === 'string') {
                                    return {
                                        type: null,
                                        name: alias
                                    };
                                } else {
                                    const [type, name] = alias;
                                    return {type, name};
                                }
                            }),
                            functions: functions || []
                        };
                    });
                })
                .catch((err) => {
                    console.error('error', err);
                });
        }

        // doSearch() {
        //     this.getGenes();
        //     console.log('search');
        // }
    }

    const t = html.tag,
        div = t('div'),
        input = t('input'),
        button = t('button'),
        span = t('span');

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        row: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        col1: {
            css: {
                flex: '2 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        col2: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        searchBar: {
            css: {
                border: '1px silver solid'
            }
        },
        searchResults: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px silver solid'
            }
        }
    });

    function buildSearchBar() {
        return div({}, [
            input({
                dataBind: {
                    textInput: 'searchInput'
                }
            }),
            button({
                dataBind: {
                    click: 'function(){doSearch()}'
                }
            }, 'Search')
        ]);
    }

    function buildResults() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            },
            dataBind: {
                component: {
                    name: TableComponent.quotedName(),
                    params: {
                        link: 'bus',
                        table: 'table',
                        messages: 'messages'
                    }
                }
            }
        });
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            div({
                style: {
                    flex: '0 0 50px'
                }
            }, [
                'Genes'
            ]),
            div({
                class: style.classes.row
            }, [
                div({
                    class: style.classes.col1
                }, [
                    div({
                        class: style.classes.searchBar
                    }, buildSearchBar()),
                    div({
                        class: style.classes.searchResults
                    }, buildResults())
                ]),
                div({
                    class: style.classes.col2
                })
            ])
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