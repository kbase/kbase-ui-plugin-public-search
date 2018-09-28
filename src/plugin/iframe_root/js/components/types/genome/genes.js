define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_lib/jsonRpc/genericClient',
    'kb_lib/jsonRpc/dynamicServiceClient',
    'kb_lib/lang',
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
    lang,
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

            this.ready = ko.observable(false);
            this.contigs = ko.observableArray();

            this.status = ko.observable('none');

            this.searchInput = ko.observable('*');
            this.pageNumber = ko.observable(1);
            this.pageCount = ko.observable(0);

            this.table = new Table();

            this.subscribe(this.searchInput, () => {
                this.pageNumber(1);
            });

            this.lastSearchQuery = {
                terms: null,
                pageSize: null,
                page: null
            };

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

                const page = this.pageNumber();

                const query = {
                    terms: searchInput,
                    pageSize: pageSize,
                    page: page
                };
                return query;
            });

            this.subscribe(this.searchQuery, (newValue) => {
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

            this.getContigs()
                .then((contigs) => {
                    this.contigs(contigs);
                    this.ready(true);
                });
        }

        doSearch() {
            const query = this.searchQuery();
            if (!query) {
                return;
            }
            if (lang.isEqual(query, this.lastSearchQuery)) {
                return;
            }
            if (!query.page) {
                query.page = 1;
            }

            this.lastSearchQuery = JSON.parse(JSON.stringify(query));

            this.status('searching');

            return this.getGenes(query)
                .then(({genes, total}) => {
                    if (genes.length === 0) {
                        this.table.rows.removeAll();
                        this.pageNumber(null);
                        this.pageCount(null);
                        this.status('notfound');
                        return;
                    }

                    this.status('done');

                    this.pageCount(Math.ceil(total / query.pageSize));

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
                    this.table.rows(rows);
                })
                .catch((err) => {
                    this.status('error');
                    console.error('ERROR', err);
                });
        }

        doFirst() {
            this.pageNumber(1);
        }


        doPrev() {
            if (this.pageNumber() > 1) {
                this.pageNumber(this.pageNumber() - 1);
            }
        }

        doNext() {
            if (this.pageNumber() < this.pageCount()) {
                this.pageNumber(this.pageNumber() + 1);
            }
        }

        doLast() {
            this.pageNumber(this.pageCount());
        }

        getContigs() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authenticated: true
            });
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.object.objectInfo.ref,
                    included: ['contigs', 'num_contigs', 'contig_lengths', 'contigset_ref', 'assembly_ref']
                }]
            }])
                .spread((result) => {
                    console.log('contigs1', result);
                    const {contigs, num_contigs, contig_lengths, contigset_ref, assembly_ref} = result.data[0].data;
                    // const api = this.runtime.service('rpc').makeClient({
                    //     module: 'GenomeAnnotationAPI',
                    //     timeout: 10000,
                    //     authenticated: true
                    // });
                    // return api.callFunc('get_summary', [{
                    //     ref: contigset_ref,
                    // }]);
                    if (contigset_ref) {
                        return workspace.callFunc('get_objects2', [{
                            objects: [{
                                ref: contigset_ref,
                                included: [
                                    'contigs/[*]/id',
                                    'contigs/[*]/length'
                                ]
                            }]
                        }]);
                    } else if (assembly_ref) {
                        return workspace.callFunc('get_objects2', [{
                            objects: [{
                                ref: assembly_ref,
                                included: [
                                    'contigs/[*]/contig_id',
                                    'contigs/[*]/length'
                                ]
                            }]
                        }])
                            .then((result) => {
                                console.log('result', result);
                                return result;
                            });
                    } else {
                        throw new Error('Cannot get contigs...');
                    }
                })
                .spread((result) => {
                    return result.data[0].data.contigs;
                    // console.log('contigs?', result);
                });
        }

        getGenes(query) {
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

            const start = (query.page - 1) * query.pageSize;
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
                    const genes = result.objects.map(({data}) => {
                        const {id, type, location, aliases, functions} = data;
                        return {
                            id, type,
                            location: location.map(([id, start, strand, length]) => {
                                return {id, start, strand, length};
                            }),
                            aliases: aliases ? aliases.map((alias) => {
                                if (typeof alias === 'string') {
                                    return {
                                        type: null,
                                        name: alias
                                    };
                                } else {
                                    const [type, name] = alias;
                                    return {type, name};
                                }
                            }) : [],
                            functions: functions || []
                        };
                    });
                    return {
                        total: result.total,
                        genes: genes
                    };
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
                // flex: '2 1 0px',
                width: '15em',
                display: 'flex',
                flexDirection: 'column',
                // backgroundColor: 'aqua'
            }
        },
        col2: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                // backgroundColor: 'yellow'
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
                class: 'btn btn-default',
                style: {
                    width: '3em',
                    maxWidth: '3em'
                },
                dataBind: {
                    click: 'function(){doSearch()}'
                }
            }, gen.switch('$component.status()', [
                ['"none"', span({
                    class: 'fa fa-search'
                })],
                ['"searching"', span({
                    class: 'fa fa-spinner fa-spin fa-fw'
                })],
                ['"done"', span({
                    class: 'fa fa-search'
                })],
                ['"error"', span({
                    class: 'fa fa-search'
                })]
            ])),
            ' ',
            button({
                class: 'btn btn-default',
                dataBind: {
                    click: 'function(d){$component.doFirst.call($component)}',
                    disable: 'pageNumber() === 1'
                }
            }, span({
                class: 'fa fa-step-backward'
            })),
            button({
                class: 'btn btn-default',
                dataBind: {
                    click: 'function(d){$component.doPrev.call($component)}',
                    disable: 'pageNumber() === 1'
                }
            }, span({
                class: 'fa fa-chevron-left'
            })),
            button({
                class: 'btn btn-default',
                dataBind: {
                    click: 'function(d){$component.doNext.call($component)}',
                    disable: 'pageNumber() === pageCount()'
                }
            }, span({
                class: 'fa fa-chevron-right'
            })),
            button({
                class: 'btn btn-default',
                dataBind: {
                    click: 'function(d){$component.doLast.call($component)}',
                    disable: 'pageNumber() === pageCount()'
                }
            }, span({
                class: 'fa fa-step-forward'
            })),
            span({
                dataBind: {
                    text: 'pageNumber'
                }
            }),
            ' of ',
            span({
                dataBind: {
                    text: 'pageCount'
                }
            })
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

    function buildContigs() {
        return div({
            style: {
                flex: '1 1 0px',
                overflowY: 'auto',
                padding: '4px'
            },
            dataBind: {
                foreach: 'contigs'
            }
        }, div([
            div({
                style: {
                    display: 'inline-block',
                    width: '60%',
                    overflowY: 'auto',
                    textOverflow: 'ellipsis'
                },
                dataBind: {
                    text: 'id',
                    attr: {
                        title: 'id'
                    }
                }
            }),
            div({
                style: {
                    display: 'inline-block',
                    width: '40%',
                    overflowY: 'auto',
                    textOverflow: 'ellipsis',
                    textAlign: 'right'
                },
                dataBind: {
                    typedText: {
                        value: 'length',
                        type: '"number"',
                        format: '"0,0"'
                    }
                }
            })
        ]));
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
            // div({
            //     class: style.classes.row
            // }, [
            //     div({
            //         class: style.classes.col1
            //     }, 'hi'),
            //     div({
            //         class: style.classes.col2
            //     }, 'hello')
            // ]),
            gen.if('ready',
                div({
                    class: style.classes.row
                }, [
                    div({
                        class: style.classes.col1
                    }, buildContigs()),
                    div({
                        class: style.classes.col2
                    }, [
                        div({
                            class: style.classes.searchBar
                        }, buildSearchBar()),
                        div({
                            class: style.classes.searchResults
                        }, buildResults())
                    ])
                ]),
                div({
                    style: {
                        textAlign: 'center',
                        padding: '10px'
                    }
                }, span({
                    class: 'fa fa-pulse fa-spinner fa-fw'
                })))
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