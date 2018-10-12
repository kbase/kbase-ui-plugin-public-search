define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    build
) {
    'use strict';

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            const {page, totalPages, summaryCount, resultCount, totalCount, realTotalCount, searching, searchState, view} = params;

            this.page = page;
            this.totalPages = totalPages;
            this.summaryCount = summaryCount;
            this.resultCount = resultCount;
            this.totalCount = totalCount;
            this.realTotalCount = realTotalCount;
            this.searching = searching;
            this.searchState = searchState;

            this.view = view;
        }

        compactView() {
            return this.view() === 'compact';
        }

        expandedView() {
            return this.view() === 'expanded';
        }

        setView(view) {
            this.view(view);
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

        showTruncatedResultsTooltip(data, ev) {
            const tooltip = {
                title: 'Truncated Results',
                content: [
                    'The search service is limited to accessing at most 10,000 items for a given query. ',
                    'Any results beyond the 10,000th item, within the current query and sort order, will be omitted. ',
                ],
                left: ev.clientX,
                top: ev.clientY
            };
            this.bus.send('show-tooltip', tooltip);
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        button = t('button');

    var styles = html.makeStyles({
        component: {
            css: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch'
            }
        },
        toolbar: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }
        },
        cell: {
            css: {
                padding: '4px'
            }
        },
        col1: {
            css: {
                flex: '2 1 0px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }
        },
        col2: {
            css: {
                flex: '2 1 0px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative'
            }
        },
        col3: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end'
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
                    flex: '0 0 auto',
                    position: 'relative'
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
                        '["searching", "success"]', [
                            gen.if('searchState() === "searching"', buildLoadingScreen()),
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
                    ]
                ])
            ])
        ]);
    }

    function buildLoadingScreen() {
        return div({
            style: {
                position: 'absolute',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                fontSize: '300%',
                display: 'flex',
                flexDirection: 'column',
                zIndex: '5'
            }
        });
    }

    function buildSummary() {
        return gen.switch('searchState', [
            ['"none"', ''],
            ['"notfound"', ''],
            ['"error"', ''],
            [
                '["searching", "success"]', [
                    gen.if('searchState() === "searching"', buildLoadingScreen()),
                    div([
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
                        ' of ',
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
                        ' objects',
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
                                dataTooltipHook: 'truncatedText',
                                style: {
                                    color: 'gray',
                                    cursor: 'pointer'
                                },
                                dataBind: {
                                    click: 'function(d,e){$component.showTruncatedResultsTooltip(d,e)}'
                                }
                            }),
                            ')'
                        ]))
                    ])
                ]
            ]
        ]);
    }

    function buildButtons() {
        return div({
            class: 'btn-group'
        }, [
            button({
                class: 'btn btn-default',
                title: 'Show results in compact rows - one row per item',
                dataBind: {
                    class: 'compactView() ? "active" : null',
                    click: '() => {$component.setView("compact")}'
                }
            }, span({
                class: 'fa fa-bars'
            })),
            button({
                class: 'btn btn-default',
                title: 'Show results with expanded rows - some detail shown within row',
                dataBind: {
                    class: 'expandedView() ? "active" : null',
                    click: '() => {$component.setView("expanded")}'
                }
            }, span({
                class: 'fa fa-square-o'
            }))
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                class: styles.classes.col1
            }, buildNavbar()),
            div({
                class: styles.classes.col2
            }, buildSummary()),
            div({
                class: styles.classes.col3
            }, buildButtons())
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