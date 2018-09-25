define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    '../lib/style',
    '../lib/text'
], function (
    ko,
    reg,
    gen,
    html,
    commonStyle,
    text
) {
    'use strict';

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

            this.canUncheck = ko.pureComputed(() => {
                return (this.searchSummary().length - this.omittedDataTypes().length > 1);
            });
        }

        doSelectDataType(data, event) {
            // note - knockout should return the same type of event no matter
            // how it is being listened for...
            // const event = jqueryEvent.originalEvent;
            if (!this.canUncheck() && data.selected()) {
                return;
            }

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

    const t = html.tag,
        span = t('span'),
        div = t('div');

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
            }
        },
        columnSubHeader: {
            fontWeight: 'bold',
            color: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px'
        },
    });

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
                }, span({
                    class: commonStyle.classes.tooltipDark,
                    title: text.getTooltip('DATA_TYPES_DATA_TYPE_COLUMN')
                }, 'Data Type')),
                div({
                    class: '-cell'
                }, span({
                    class: commonStyle.classes.tooltipDark,
                    title: text.getTooltip('DATA_TYPES_COUNT_COLUMN')
                }, 'Count'))
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
                        click: 'function(d,e){$component.doSelectDataType.call($component,d,e);}',
                        style: {
                            cursor: '$component.canUncheck() || !selected() ? "pointer" : "auto"'
                        }
                    },
                    title: text.getTooltip('DATA_TYPES_CHECKBOX')
                }, [
                    div({
                        class: '-cell'
                    },
                    gen.if('indexAvailable',
                        span({
                            class: ['fa', commonStyle.classes.tooltipDark],
                            dataBind: {
                                css: {
                                    'fa-check-square-o': 'selected()',
                                    'fa-square-o': '!selected()'
                                },
                                style: {
                                    'color': '$component.canUncheck() || !selected() ? "#000" : "#AAA"'
                                }
                            }
                        }),
                        span({
                            class: ['fa', 'fa-ban', commonStyle.classes.tooltipDark],
                            style: {
                                color: '#AAA'
                            }
                        }))
                    ),

                    div({
                        class: '-cell',
                        dataBind: {
                            text: 'type',
                            style: {
                                'font-weight': 'count() ? "bold" : "normal"',
                                'font-style': 'count() ? "normal" : "italic"',
                                'color': 'selected() ? "#000" : "#AAA"'
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
                                'color': 'selected() ? "#000" : "#AAA"'
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
                                format: '"0,0a"',
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

    function template() {
        return div({
            class: style.classes.component
        }, [
            buildSummaryTable(),
            div({
                class: style.classes.columnSubHeader
            }, span({
                class: commonStyle.classes.tooltipDark,
                title: text.getTooltip('DATA_TYPES_SEARCH_RESULTS_HEADER')
            }, 'Search Results')),
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