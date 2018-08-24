define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    // const t = html.tag,
    //     span = t('span'),
    //     div = t('div'),
    //     table = t('table'),
    const [span, div, table, tbody, tr, th, td] = html.tags(['span', 'div', 'table', 'tbody', 'tr', 'th', 'td']);

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        container: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        title: {
            css: {
                fontWeight: 'bold',
                color: 'gray',
            }
        },
        summaryTable: {
            css: {
                // borderTop: '1px silver solid',
                // borderBottom: '1px silver solid',
                width: '100%',
                backgroundColor: '#FFF',
            },
            inner: {
                '.-header': {
                    fontStyle: 'italic',
                    color: 'rgba(0, 0, 0, 0.7)',
                    padding: '4px',
                    borderBottom: '1px silver solid',
                },
                '.-header > .-cell': {
                    display: 'inline-block'
                },
                '.-header > .-cell:nth-child(1)': {
                    width: '10%'
                },
                '.-header > .-cell:nth-child(2)': {
                    width: '45%'
                },
                '.-header > .-cell:nth-child(3)': {
                    width: '45%',
                    textAlign: 'right'

                },
                '.-body-container': {
                    backgroundColor: 'rgba(255,255,255,1)',
                },
                '.-body > .-row': {
                    padding: '4px',
                    height: '2em'
                },
                '.-body > .-row > .-cell': {
                    display: 'inline-block'
                },
                '.-body > .-row > .-cell:nth-child(1)': {
                    width: '10%'
                },
                '.-body > .-row > .-cell:nth-child(2)': {
                    width: '45%'
                },
                '.-body > .-row > .-cell:nth-child(3)': {
                    width: '45%',
                    textAlign: 'right'
                }
            }
        },
        activeFilterInput: {
            css: {
                backgroundColor: 'rgba(209, 226, 255, 1)',
                color: '#000'
            },
            pseudo: {
                hover: {
                    backgroundColor: 'rgba(209, 226, 255, 0.5)',
                }
            }
        },
        statusRow: {
            css: {
                // height: '3em'
            }
        }
    });

    class ViewModel {
        constructor({searchSummary, searchState, totalCount, realTotalCount, omittedDataTypes}) {
            this.searchSummary = searchSummary;
            this.searchState = searchState;
            this.totalCount = totalCount;
            this.realTotalCount = realTotalCount;
            this.omittedDataTypes = omittedDataTypes;

            this.includedTotal = ko.pureComputed(() => {
                if (['none', 'error', 'searching'].includes(this.searchState())) {
                    return null;
                }
                return this.searchSummary().reduce((total, typeSummary) => {
                    if (typeSummary.selected()) {
                        return total + typeSummary.count();
                    }
                    return total;
                }, 0);
            });

            this.excludedTotal = ko.pureComputed(() => {
                if (['none', 'error', 'searching'].includes(this.searchState())) {
                    return null;
                }
                return this.searchSummary().reduce((total, typeSummary) => {
                    if (!typeSummary.selected()) {
                        return total + typeSummary.count();
                    }
                    return total;
                }, 0);
            });
        }

        doSelectDataType(data) {
            if (this.omittedDataTypes().includes(data.type)) {
                this.omittedDataTypes.remove(data.type);
            } else {
                this.omittedDataTypes.push(data.type);
            }
        }
    }

    function buildSummaryTable() {
        return div({
            class: style.classes.summaryTable
        }, [
            div({
                class: '-header'
            }, [
                div({
                    class: '-cell'
                }),
                div({
                    class: '-cell'
                }, 'Data Type'),
                div({
                    class: '-cell'
                }, 'Count')
            ]),
            div({
                class: '-body-container'
            }, div({
                class: '-body',
                dataBind: {
                    foreach: 'searchSummary'
                }
            }, [
                div({
                    class: '-row',
                    dataBind: {
                        css: {
                            [style.classes.activeFilterInput]: 'selected()'
                        },
                        click: 'function(d,e){$component.doSelectDataType.call($component,d,e);}'
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }, [
                    div({
                        class: '-cell'
                    },
                    // input({
                    //     type: 'checkbox',
                    //     dataBind: {
                    //         checked: 'selected'
                    //     }
                    // })),
                    span({
                        class: 'fa',
                        dataBind: {
                            css: {
                                'fa-check-square-o': 'selected()',
                                'fa-square-o': '!selected()'
                            }
                        }
                    })),

                    div({
                        class: '-cell',
                        dataBind: {
                            text: 'type',
                            style: {
                                'font-weight': 'count() ? "bold" : "normal"',
                                'font-style': 'count() ? "normal" : "italic"',
                                'color': 'selected() ? "#000" : "#CCC"'
                            }
                        }
                    }),
                    div({
                        class: '-cell',
                        dataBind: {
                            typedText: {
                                value: 'count',
                                type: '"number"',
                                format: '"0,0"',
                                missing: '"-"'
                            },
                            style: {
                                'font-weight': 'count() ? "bold" : "normal"',
                                'font-style': 'count() ? "normal" : "italic"',
                                'color': 'selected() ? "#000" : "#CCC"'
                            }
                        }
                    })
                ])
            ]))
        ]);
    }

    function buildTotals() {
        return table({
            style: {
                borderSpacing: '4px',
                borderCollapse: 'separate'
            }
        },
        tbody([
            tr([
                td('Included'),
                td(span({
                    dataBind: {
                        typedText: {
                            value: 'includedTotal',
                            type: '"number"',
                            format: '"0,0"',
                            missing: '"-"'
                        }
                    }
                }))
            ]),
            tr([
                td('Excluded'),
                td(span({
                    dataBind: {
                        typedText: {
                            value: 'excludedTotal',
                            type: '"number"',
                            format: '"0,0"',
                            missing: '"-"'
                        }
                    }
                }))
            ])
        ])
        );
    }

    function buildMessage(message) {
        return div({
            style: {
                fontStyle: 'italic',
                textAlign: 'center',
            }
        }, message);
    }

    function buildTotal() {
        return div({
            class: style.classes.statusRow
        }, buildTotals());
    }

    // function buildTotal() {
    //     return div({
    //         class: style.classes.statusRow
    //     }, gen.switch('searchState', [
    //         [
    //             '"none"', buildMessage('No active search')
    //         ],
    //         [
    //             '"searching"', buildMessage(html.loading('Searching', 'normal'))
    //         ],
    //         [
    //             '"error"', buildMessage('Error!')
    //         ],
    //         [
    //             '["success", "notfound"]', buildTotals()
    //             // buildMessage(div([
    //             //     'Found ',
    //             //     span({
    //             //         style: {
    //             //             fontWeight: 'bold'
    //             //         },
    //             //         dataBind: {
    //             //             typedText: {
    //             //                 value: 'includedTotal',
    //             //                 type: '"number"',
    //             //                 format: '"0,0"'
    //             //             }
    //             //         }
    //             //     }),
    //             //     gen.plural('realTotalCount', ' data object', ' data objects')
    //             // ]))
    //         ],
    //         [
    //             '$default',
    //             buildMessage(div([
    //                 'Unknown search state "',
    //                 span({
    //                     dataBind: {
    //                         text: 'searchState'
    //                     }
    //                 }),
    //                 '"'
    //             ]))
    //         ]
    //     ]));
    // }

    function template() {
        return div({
            class: style.classes.component
        }, [
            buildTotal(),
            buildSummaryTable()
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});