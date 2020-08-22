define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/lang',
    'kb_knockout/components/table',
    // '../../../autoTable/main',
    './aliases',
    './functions',
    './location',
    './contigs'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    lang,
    TableComponent,
    AliasesComponent,
    FunctionsComponent,
    LocationComponent,
    ContigsComponent
) {
    'use strict';

    class Column {
        constructor({name, label, type, sort, width, style, noSelect, component, action}) {
            this.name = name;
            this.label = label;
            this.type = type;
            this.sort = sort || null;
            this.width = width || 1;
            this.style = style || {};
            this.noSelect = noSelect || false;
            this.component = component || null;
            this.action = action;
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
        constructor({rows, info} = {}) {
            this.info = info;
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
                    width: 2,
                    action: {
                        fn: (id) => {
                            const url = `/#dataview//${this.info.workspaceId}/${this.info.objectId}/${this.info.objectVersion}?sub=Feature&subid=${id.value}`;
                            window.open(url, '_blank');
                        }
                    }
                }),
                // new Column({
                //     name: 'aliases',
                //     label: 'Aliases',
                //     width: 3,
                //     component: AliasesComponent.name()
                // }),
                new Column({
                    name: 'functions',
                    label: 'Functions',
                    width: 4,
                    component: FunctionsComponent.name()
                }),
                new Column({
                    name: 'location',
                    label: 'Location',
                    width: 2,
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
            this.undefinedHTML = span({
                style: {
                    color: 'rgba(200, 200, 200, 1)'
                }
            }, '∅');
        }
    }

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {object} = params;
            this.object = object;
            // for now reconstruct the guid...
            this.genomeGuid = 'WS:' + [object.objectInfo.wsid, object.objectInfo.id, object.objectInfo.version].map(String).join('/');
            this.workspaceId = object.objectInfo.wsid;
            this.objectId = object.objectInfo.id;
            this.objectVersion = object.objectInfo.version;
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
            this.error = ko.observable();

            this.status = ko.observable('none');

            this.selectedContig = ko.observable();
            this.contigsCount = ko.observable();


            this.searchInput = ko.observable('*');
            this.contigFilterInput = ko.observable();
            this.totalFound = ko.observable();
            this.pageNumber = ko.observable(1);
            this.pageCount = ko.observable(0);

            this.table = new Table({
                info: {
                    workspaceId: this.workspaceId,
                    objectId: this.objectId,
                    objectVersion: this.objectVersion
                }
            });

            this.subscribe(this.selectedContig, (newValue) => {
                // this.searchInput(newValue);
                if (newValue) {
                    this.contigFilterInput(newValue);
                } else {
                    this.contigFilterInput(null);
                }
            });

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
                    filter: {
                        contig: this.contigFilterInput()
                    },
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

                    this.totalFound(total);

                    if (genes.length === 0) {
                        this.table.rows.removeAll();
                        this.pageNumber(null);
                        this.pageCount(null);
                        this.status('notfound');
                        return;
                    }

                    this.status('done');

                    this.pageCount(Math.ceil(total / query.pageSize));

                    const rows = genes.map((gene) => {

                        const {id, type, aliases, functions, location} = gene;
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

        getGenes(query) {
            const searchAPI = this.runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: true
            });

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
            const lookupInKeys = {};
            if (query.filter.contig && query.filter.contig.length > 0) {
                // lookupInKeys.contig_id = {
                //     value: query.filter.contig
                // };
                fullTextInAll += ' ' + query.filter.contig;
            }
            const param = {
                object_types: ['GenomeFeature'],
                match_filter: {
                    full_text_in_all: fullTextInAll,
                    exclude_subobjects: 0,
                    lookup_in_keys: lookupInKeys
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
                            functions: functions || (data.function ? [data.function] : undefined)
                        };
                    });
                    return {
                        total: result.total,
                        genes
                    };
                })
                .catch((err) => {
                    console.error('error', err);
                });
        }
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
                flexDirection: 'column',
                marginTop: '10px'
            }
        },
        row: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        columnHeader: {
            css: {
                backgroundColor: '#CCC',
                color: '#555',
                padding: '4px',
                textAlign: 'center',
                fontWeight: 'bold'
            }
        },
        col1: {
            css: {
                // flex: '2 1 0px',
                width: '15em',
                display: 'flex',
                flexDirection: 'column',
                marginRight: '4px'
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
        filterBar: {
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
        },
        contigRow: {
            css: {
                padding: '4px',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    backgroundColor: '#CCC'
                }
            }
        },
        selectedContig: {
            css: {
                backgroundColor: '#CCC'
            }
        },
        label: {
            css: {
                fontWeight: 'bold',
                color: 'rgba(150,150,150,1)'
            }
        }
    });

    function buildFilterBar() {
        return div({}, [
            buildLabel('selected contig '),
            gen.if('contigFilterInput',
                span({
                    style: {
                        fontWeight: 'bold'
                    },
                    dataBind: {
                        text: 'contigFilterInput'
                    }
                }),
                span({
                    style: {
                        fontStyle: 'italic'
                    }
                }, 'No contig selected'))
        ]);
    }

    function buildSearchInput() {
        return [
            input({
                dataBind: {
                    textInput: 'searchInput'
                },
                placeholder: 'Search Features'
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
                ['"notfound"', span({
                    class: 'fa fa-search'
                })],
                ['"done"', span({
                    class: 'fa fa-search'
                })],
                ['"error"', span({
                    class: 'fa fa-search'
                })]
            ]))
        ];
    }

    function buildLabel(label) {
        return span({
            class: style.classes.label
        }, label);
    }

    function buildNavButtons() {
        return [
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
            div({
                style: {
                    display: 'inline-block',
                    marginLeft: '10px'
                }
            }, gen.if('pageCount() > 0',
                [
                    buildLabel('pg '),
                    span({
                        dataBind: {
                            text: 'pageNumber'
                        }
                    }),
                    buildLabel(' of '),
                    span({
                        dataBind: {
                            typedText: {
                                value: 'pageCount',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    })
                ],
                span({
                    style: {
                        fontStyle: 'italic'
                    }
                }, 'No genes match this search')))
        ];
    }

    function buildResultsSummary() {
        return gen.if('totalFound()',
            div({
                style: {
                    display: 'inline-block',
                    marginLeft: '10px'
                }
            }, [
                buildLabel('found '),
                span({
                    dataBind: {
                        typedText: {
                            value: 'totalFound()',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                })
            ]));
    }

    function buildSearchBar() {
        return [
            buildSearchInput(),
            buildNavButtons(),
            buildResultsSummary()
        ];
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

    // function buildWaiting() {
    //     return div({
    //         style: {
    //             textAlign: 'center',
    //             padding: '10px'
    //         }
    //     }, span({
    //         class: 'fa fa-pulse fa-spinner fa-fw'
    //     }));
    // }

    // function buildError() {
    //     return div({
    //         class: 'alert alert-danger',
    //         dataBind: {
    //             text: 'error'
    //         }
    //     });
    // }

    function buildContigSelector() {
        return gen.component({
            name: ContigsComponent.name(),
            params: {
                genomeRef: 'object.objectInfo.ref',
                selectedContig: 'selectedContig',
                contigsCount: 'contigsCount'
            }
        });
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.row
            }, [
                div({
                    class: style.classes.col1
                }, [
                    div({
                        class: style.classes.columnHeader
                    }, [
                        'contigs (',
                        gen.if('typeof contigsCount() === "undefined"',
                            span({class: 'fa fa-spin fa-spinner fa-fw'}),
                            gen.if('contigsCount() > 0',
                                span({
                                    dataBind: {
                                        text: 'contigsCount()'
                                    }
                                }),
                                'none')),
                        ')'
                    ]),
                    buildContigSelector()
                ]),
                div({
                    class: style.classes.col2
                }, [
                    div({
                        class: style.classes.columnHeader
                    }, 'features'),
                    div({
                        class: style.classes.searchBar
                    }, buildSearchBar()),
                    div({
                        class: style.classes.filterBar
                    }, buildFilterBar()),
                    div({
                        class: style.classes.searchResults
                    }, buildResults())
                ])
            ])
            // gen.if('error',
            //     buildError(),
            //     buildWaiting())
            // )
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