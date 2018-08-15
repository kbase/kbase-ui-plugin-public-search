define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        button = t('button');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            const {page, totalPages, summaryCount, resultCount, totalCount, realTotalCount, searching, searchState} = params;

            this.page = page;
            this.totalPages = totalPages;
            this.summaryCount = summaryCount;
            this.resultCount = resultCount;
            this.totalCount = totalCount;
            this.realTotalCount = realTotalCount;
            this.searching = searching;
            this.searchState = searchState;
        }

        doFirstPage() {
            this.page(1);
        }

        doPrevPage() {
            if (this.page() > 1) {
                this.page(this.page() - 1);
            }
        }

        doNextPage() {
            if (this.page() < this.totalPages()) {
                this.page(this.page() + 1);
            }
        }

        doLastPage() {
            this.page(this.totalPages());
        }
    }

    var styles = html.makeStyles({
        component: {
            css: {
                display: 'flex',
                flexDirection: 'row'
            }
        },
        toolbar: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px',
                alignItems: 'center'
            }
        },
        cell: {
            css: {
                padding: '4px'
            }
        }
    });

    function buildNavButtons() {
        return div({
            class: 'btn-group',
            role: 'group'
        }, [
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the first page of results',
                dataBind: {
                    click: 'doFirstPage',
                    enable: 'page() > 1'
                }
            }, span({
                class: 'fa fa-step-backward'
            })),
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the previous page of results',
                dataBind: {
                    click: 'doPrevPage',
                    enable: 'page() > 1'
                }
            }, span({
                class: 'fa fa-chevron-left'
            })),
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the next page of results',
                dataBind: {
                    click: 'doNextPage',
                    enable: 'page() < totalPages()'
                }
            }, span({
                class: 'fa fa-chevron-right'
            })),
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the last page of results',
                dataBind: {
                    click: 'doLastPage',
                    enable: 'page() < totalPages()'
                }
            }, span({
                class: 'fa fa-step-forward'
            }))
        ]);
    }

    function buildNavbar() {
        return div({
            class: styles.classes.toolbar
        }, [
            div({
                class: styles.classes.cell,
                style: {
                    flex: '0 0 auto'
                }
            }, buildNavButtons()),
            div({
                class: styles.classes.cell,
                style: {
                    flex: '0 0 auto'
                }
            }, [
                // Note: if no pages, then display nothing here.
                gen.switch('searchState', [
                    [
                        '"none"',
                        ''
                    ],
                    [
                        '"notfound"',
                        'no pages'
                    ],
                    [
                        '"error"',
                        ''
                    ],
                    [
                        '"searching"',
                        span({
                            style: {
                                fontSize: '80%'
                            }
                        },  html.loading())
                    ],
                    [
                        '"success"',
                        gen.if('totalPages() === 0',
                            'no pages',
                            div({
                                style: {
                                    display: 'inline-block',
                                    marginLeft: '6px'
                                }
                            }, [
                                ' Page ',
                                span({
                                    style: {
                                        fontWeight: 'bold'
                                    },
                                    dataBind: {
                                        text: 'page'
                                    }
                                }),
                                ' of ',
                                span({
                                    style: {
                                        fontWeight: 'bold'
                                    },
                                    dataBind: {
                                        typedText: {
                                            value: 'totalPages',
                                            type: '"number"',
                                            format: '"0,0"'
                                        }
                                    }
                                })
                            ]))
                    ]
                ])
            ])
        ]);
    }

    function buildSummary() {
        return gen.switch('searchState', [
            ['"none"', ''],
            ['"notfound"', ''],
            ['"error"', ''],
            [
                '"searching"',
                span({
                    style: {
                        fontSize: '80%'
                    }
                },  html.loading())
            ],
            [
                '"success"',
                div([
                    'Showing ',
                    span({
                        style: {
                            fontWeight: 'bold'
                        },
                        dataBind: {
                            typedText: {
                                value: 'resultCount',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }),
                    ' out of ',
                    span({
                        style: {
                            fontWeight: 'bold'
                        },
                        dataBind: {
                            typedText: {
                                value: 'realTotalCount',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }),
                    gen.if('realTotalCount() > totalCount()', span({
                        style: {
                            fontStyle: 'italic'
                        }
                    }, [
                        ' (truncated to ',
                        span({
                            dataBind: {
                                typedText: {
                                    value: 'totalCount',
                                    type: '"number"',
                                    format: '"0,0"'
                                }
                            }
                        }), ' ',
                        span({
                            class: 'fa fa-question-circle',
                            style: {
                                color: 'gray'
                            },
                            title: [
                                'The search service is limited to finding at most 10,000 items. ',
                                'Any results for the current sort order beyond 10,000 items will be omitted. ',
                                'If this is a problem, you should restrict your search further.'
                            ].join('\n')
                        }),
                        ')'
                    ]))
                ])
            ]
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }
            }, buildNavbar()),
            div({
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }
            }, buildSummary()),
            // div({
            //     style: {
            //         flex: '1',
            //         display: 'flex',
            //         flexDirection: 'row',
            //         alignItems: 'center'
            //     }
            // }, div({
            //     dataBind: {
            //         component: {
            //             name: SummaryComponent.quotedName(),
            //             params: {
            //                 typeCounts: 'typeCounts',
            //                 resultCount: 'resultCount',
            //                 searchStatus: 'searchStatus'
            //             }
            //         }
            //     }
            // })),
            // div({
            //     style: {
            //         flex: '1',
            //         display: 'flex',
            //         flexDirection: 'row',
            //         alignItems: 'center',
            //         justifyContent: 'flex-end'
            //     }
            // }, div({
            //     dataBind: {
            //         component: {
            //             name: AccessControlComponent.quotedName(),
            //             params: {
            //                 withPrivateData: 'withPrivateData',
            //                 withPublicData: 'withPublicData',
            //             }
            //         }
            //     }
            // }))

        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});