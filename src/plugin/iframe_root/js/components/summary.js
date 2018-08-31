define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        span = t('span'),
        div = t('div'),
        table = t('table'),
        tbody = t('tbody'),
        tr = t('tr'),
        td = t('td');
    // const [span, div, table, tbody, tr, td] = html.tags(['span', 'div', 'table', 'tbody', 'tr', 'th', 'td']);

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
                width: '100%',
                backgroundColor: '#FFF',
                fontSize: '100%'
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
        totalsTable: {
            css: {
                width: '100%',
                backgroundColor: '#FFF',
                fontSize: '100%',
                // marginTop: '10px'
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
                // '.-header > .-cell:nth-child(1)': {
                //     width: '10%'
                // },
                '.-header > .-cell:nth-child(1)': {
                    width: '65%'
                },
                '.-header > .-cell:nth-child(3)': {
                    width: '35%',
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
                // '.-body > .-row > .-cell:nth-child(1)': {
                //     width: '10%'
                // },
                '.-body > .-row > .-cell:nth-child(1)': {
                    width: '65%'
                },
                '.-body > .-row > .-cell:nth-child(2)': {
                    width: '35%',
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
        },
        columnSubHeader: {
            fontWeight: 'bold',
            color: 'gray',
            // marginTop: '8px',
            // marginRight: '4px'
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '1.5em',
            marginTop: '10px'
        },
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

        doSelectDataType(data, jqueryEvent) {
            const event = jqueryEvent.originalEvent;

            if (event.altKey) {
                // Alt key means to toggle this checkbox, and to toggle all others to
                // the opposite state.

                // toggle this one
                if (this.omittedDataTypes().includes(data.type)) {
                    this.omittedDataTypes.remove(data.type);
                } else {
                    this.omittedDataTypes.push(data.type);
                }

                // then the rest
                const omitted = this.omittedDataTypes().includes(data.type);
                this.searchSummary().forEach((type) => {
                    if (type.type !== data.type) {
                        if (omitted) {
                            this.omittedDataTypes.remove(type.type);
                        } else {
                            this.omittedDataTypes.push(type.type);
                        }
                    }
                });
            } else if (event.metaKey) {
                // Control key means to keep ensure this checkbox is on, and all others
                // are off.
                if (this.omittedDataTypes().includes(data.type)) {
                    this.omittedDataTypes.remove(data.type);
                }
                this.searchSummary().forEach((type) => {
                    if (type.type !== data.type) {
                        if (!this.omittedDataTypes().includes(type.type)) {
                            this.omittedDataTypes.push(type.type);
                        }
                    }
                });
            } else {
                // just toggle this one
                if (this.omittedDataTypes().includes(data.type)) {
                    this.omittedDataTypes.remove(data.type);
                } else {
                    this.omittedDataTypes.push(data.type);
                }
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
                                format: '"0,0a"',
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

    function buildTotalsTable() {
        return div({
            class: style.classes.totalsTable
        }, [
            div({
                class: '-body-container'
            }, div({
                class: '-body',
            }, [
                div({
                    class: '-row',
                    style: {
                        height: '1.5em'
                    }
                }, [
                    // div({
                    //     class: '-cell'
                    // }),

                    div({
                        class: '-cell',
                        dataBind: {
                            style: {
                                'font-weight': 'includedTotal() ? "bold" : "normal"',
                                'font-style': 'includedTotal() ? "normal" : "italic"'
                            }
                        }
                    }, 'Included'),
                    div({
                        class: '-cell',
                        dataBind: {
                            typedText: {
                                value: 'includedTotal',
                                type: '"number"',
                                format: '"0,0a"',
                                missing: '"-"'
                            },
                            style: {
                                'font-weight': 'includedTotal() ? "bold" : "normal"',
                                'font-style': 'includedTotal() ? "normal" : "italic"'
                            }
                        }
                    })
                ]),
                div({
                    class: '-row',
                    style: {
                        height: '1.5em'
                    }
                }, [
                    // div({
                    //     class: '-cell'
                    // }),

                    div({
                        class: '-cell',
                        dataBind: {
                            style: {
                                'font-weight': 'excludedTotal() ? "bold" : "normal"',
                                'font-style': 'excludedTotal() ? "normal" : "italic"'
                            }
                        }
                    }, 'Excluded'),
                    div({
                        class: '-cell',
                        dataBind: {
                            typedText: {
                                value: 'excludedTotal',
                                type: '"number"',
                                format: '"0,0"',
                                missing: '"-"'
                            },
                            style: {
                                'font-weight': 'excludedTotal() ? "bold" : "normal"',
                                'font-style': 'excludedTotal() ? "normal" : "italic"'
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

    function buildTotal() {
        return div({
            class: style.classes.statusRow
        }, buildTotals());
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            buildSummaryTable(),
            div({
                class: style.classes.columnSubHeader
            }, 'Search Results'),
            buildTotalsTable()
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