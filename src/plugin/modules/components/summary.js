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

    const t = html.tag,
        span = t('span'),
        div = t('div');

    const styles = html.makeStyles({
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
                textAlign: 'center'
            }
        },
        summaryTable: {
            css: {
                border: '1px silver solid',
                padding: '4px 20px',
                // overflow: 'hidden',
                // display: 'relative',
                margin: '0 auto',
                width: '15em',
                zIndex: '1000',
                backgroundColor: '#FFF',
                boxShadow: '4px 4px 4px silver'
                // textOverflow: 'fade'
            },
            inner: {
                '.-header': {
                    fontStyle: 'italic',
                    color: 'rgba(0, 0, 0, 0.7)'
                },
                '.-header > .-cell': {
                    display: 'inline-block'
                },
                '.-header > .-cell:nth-child(1)': {
                    width: '50%'
                },
                '.-header > .-cell:nth-child(2)': {
                    width: '50%',
                    // paddingRight: '30%',
                    textAlign: 'right'

                },
                '.-body-container': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    maxHeight: '10em',
                    // overflow: 'hidden',
                    cursor: 'pointer'
                },
                '.-body': {

                },
                '.-body > .-row > .-cell': {
                    display: 'inline-block'
                },
                '.-body > .-row > .-cell:nth-child(1)': {
                    width: '50%'
                },
                '.-body > .-row > .-cell:nth-child(2)': {
                    width: '50%',
                    fontWeight: 'bold',
                    // paddingRight: '30%',
                    textAlign: 'right'
                }
            }
        }
    });

    class ViewModel {
        constructor({searchSummary, searchState, totalCount, realTotalCount}) {
            this.summary = searchSummary;
            this.searchState = searchState;
            this.totalCount = totalCount;
            this.realTotalCount = realTotalCount;

            this.isOver = ko.observable(false);

            this.table = {
                style: {
                    backgroundColor: '#FFF'
                },
                rowStyle: {
                },
                sort: {
                    column: ko.observable('count'),
                    direction: ko.observable('desc')
                },
                columns: [
                    {
                        name: 'type',
                        label: 'Type',
                        width: 50,
                        cellStyle: {},
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'count',
                        label: 'Count',
                        width: 50,
                        cellStyle: {
                            textAlign: 'right',
                            paddingRight: '30%'
                        },
                        format: {
                            type: 'number',
                            format: '0,0'
                        },
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    }
                ]
            };
            this.table.columnMap = this.table.columns.reduce((map, column) => {
                map[column.name] = column;
                return map;
            }, {});
        }
    }

    function buildSummary() {
        return gen.if('searchState() === "success"',
            buildWrappedTable());
    }

    function buildWrappedTable() {
        return div({
            style: {
                position: 'relative',
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, div({
            style: {
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                zIndex: '1',
                display: 'flex',
                flexDirection: 'column'
            },
            dataBind: {
                style: {
                    overflowY: 'isOver() ? "visible" : "hidden"'

                },
                event: {
                    'mouseover': 'function(d,e){$component.isOver(true);}',
                    'mouseout': 'function(d,e){$component.isOver(false);}'
                }
            }
        }, [
            div({
                style: {
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    zIndex: '2',
                    // background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,1))'
                },
                // dataBind: {
                //     style: {
                //         background: 'isOver() ? "none" : "linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,1))"'
                //     }
                // }
            }),
            buildSummaryTable()
        ]));
    }

    function buildSummaryTable() {
        return div({
            class: styles.classes.summaryTable
        }, [
            div({
                class: '-header'
            }, [
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
                    foreach: 'summary'
                }
            }, [
                div({
                    class: '-row'
                }, [
                    div({
                        class: '-cell',
                        dataBind: {
                            text: 'type'
                        }
                    }),
                    div({
                        class: '-cell',
                        dataBind: {
                            typedText: {
                                value: 'count',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    })
                ])
            ]))
        ]);
    }

    function buildMessage(message) {
        return div({
            style: {
                fontStyle: 'italic',
                textAlign: 'center'
            }
        }, message);
    }

    function buildTotal() {
        return gen.switch('searchState', [
            [
                '"none"', buildMessage('No search yet')
            ],
            [
                '"notfound"', buildMessage('Nothing found')
            ],
            [
                '"searching"', buildMessage('Searching...')
            ],
            [
                '"error"', buildMessage('Error!')
            ],
            [
                '"success"',
                buildMessage(div([
                    'Found ',
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
                    gen.plural('realTotalCount', ' data object', ' data objects')
                ]))
            ],
            [
                '$default',
                buildMessage(div([
                    'Unknown search state "',
                    span({
                        dataBind: {
                            text: 'searchState'
                        }
                    }),
                    '"'
                ]))
            ]
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                class: styles.classes.title
            }, 'Search Summary'),
            buildTotal(),
            buildSummary()
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