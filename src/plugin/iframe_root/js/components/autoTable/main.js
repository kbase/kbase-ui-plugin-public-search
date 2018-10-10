define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    './message'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    build,
    MessageComponent
) {
    'use strict';

    class ViewModel extends ViewModelBase {
        constructor(params, _context, element) {
            super(params);

            const {table, messages} = params;

            this.element = element;
            this.slowLoadingThreshold = 300;

            this.table = table;
            this.rows = this.table.rows;
            this.columns = this.table.columns;
            this.state = this.table.state;
            this.actions = this.table.actions;
            this.env = this.table.env;
            this.view = this.table.view;
            this.detailComponent = this.table.detailComponent;

            this.messages = messages;

            // calculate widths...
            this.totalWidth = this.columns.reduce((tw, column) => {
                return tw + column.width;
            }, 0);
            this.columns.forEach((column) => {
                const width = String(100 * column.width / this.totalWidth) + '%';

                // Header column style
                column.headerStyle = column.headerStyle || {};
                column.headerStyle.flexBasis = width;

                // Row column style
                column.rowStyle = column.rowStyle || {};
                column.rowStyle.flexBasis = width;
            });

            this.sortColumn = ko.observable('timestamp');

            this.sortDirection = ko.observable('descending');

            // AUTO SIZING

            // we hinge upon the height, which is updated when we start and when the ...
            this.height = ko.observable();

            this.compactRowHeight = 35;
            this.expandedRowHeight = 100;

            this.headerRowHeight = 35;

            this.rowHeight = ko.observable(this.compactRowHeight);

            this.subscribe(this.view, (newValue) => {
                switch (newValue) {
                case 'compact':
                    this.rowHeight(this.compactRowHeight);
                    break;
                case 'expanded':
                    this.rowHeight(this.expandedRowHeight);
                    break;
                }
            });

            this.resizerTimeout = 200;
            this.resizerTimer = null;

            this.resizer = () => {
                if (this.resizerTimer) {
                    return;
                }
                this.resizerTimer = window.setTimeout(() => {
                    this.resizerTimer = null;
                    this.height(this.calcHeight());
                }, this.resizerTimeout);
            };

            this.resizeListener = window.addEventListener('resize', this.resizer, false);

            this.subscribe(this.height, (newValue) => {
                if (!newValue) {
                    this.table.pageSize(null);
                }

                const rowCount = Math.floor(newValue / this.rowHeight());
                this.table.pageSize(rowCount);
            });

            this.subscribe(this.rowHeight, (newValue) => {
                const height = this.height();
                if (!height) {
                    return;
                }
                const rowCount = Math.floor(height / newValue);
                this.table.pageSize(rowCount);
            });

            this.isLoadingSlowly = ko.observable(false);

            this.loadingTimer = null;


            this.subscribe(this.table.isLoading, (loading) => {
                if (loading) {
                    this.timeLoading();
                } else {
                    this.cancelTimeLoading();
                }
            });

            // Calculate the height immediately upon component load
            this.height(this.calcHeight());

        }

        doRowAction(data, event, row) {
            if (this.table.rowAction && row.mode !== 'inaccessible') {
                this.table.rowAction(row);
            }
        }

        /*
            Sorting is managed here in the table, and we
            communicate changes via the table.sortColumn() call.
             We don't know whether the implementation supports
             single or multiple column sorts, etc.
             In turn, the sorted property may be set to asending,
             descending, or falsy.
        */
        doSort(column) {
            this.table.sortBy(column);
        }

        calcHeight() {
            return this.element.querySelector('.' + style.classes.tableBody).clientHeight;
        }

        doOpenUrl(data) {
            if (!data.url) {
                console.warn('No url for this column, won\'t open it');
                return;
            }
            window.open(data.url, '_blank');
        }

        openLink(url) {
            if (url) {
                window.open(url, '_blank');
            }
        }

        timeLoading() {
            this.loadingTimer = window.setTimeout(() => {
                if (this.table.isLoading()) {
                    this.isLoadingSlowly(true);
                }
                this.loadingTimer = null;
            }, this.slowLoadingThreshold);
        }

        cancelTimeLoading() {
            if (this.loadingTimer) {
                window.clearTimeout(this.loadingTimer);
                this.loadingTimer = null;
            }
            this.isLoadingSlowly(false);
        }

        dispose() {
            super.dispose();
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizer, false);
            }
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        a = t('a');

    const style = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'flex-start',
            // minWidth: '40em'
        },
        header: {
            flex: '0 0 50px'
        },
        headerRow: {
            flex: '0 0 35px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontWeight: 'bold',
            color: 'gray',
            overflow: 'hidden'
        },
        tableBody: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }
        },
        compactRow: {
            css: {
                flex: '0 0 35px',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px #DDD solid',
                overflow: 'hidden'
            }
        },
        expandedRow: {
            css: {
                flex: '0 0 100px',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px #DDD solid'
            }
        },
        commonRow: {
            css: {
                flex: '1 1 0px',
                // backgroundColor: 'yellow',
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
                overflow: 'hidden',
                flexWrap: 'nowrap'
            }
        },
        detailRow: {
            css: {
                height: '65px',
                display: 'flex',
                flexDirection: 'column'
                // backgroundColor: 'lime'
            }
        },
        rowOver: {
            css: {
                cursor: 'pointer',
                backgroundColor: '#CCC'
            }
        },
        itemRowActive: {
            backgroundColor: '#DDD'
        },
        searchLink: {
            css: {
                textDecoration: 'underline'
            },
            pseudo: {
                hover: {
                    textDecoration: 'underline',
                    backgroundColor: '#EEE',
                    cursor: 'pointer'
                }
            }
        },
        cell: {
            flexGrow: '1',
            flexShrink: '1',
            minWidth: '0',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
        },
        rowContent: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch'
        },
        content: {
            flex: '1 1 0px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '0'
        },
        value: {
            css: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: '0'
            }
        },
        headerCell: {
            css: {
                flex: '0 0 0px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                // border: '1px silver solid',
                borderTop: '1px #DDD solid',
                borderBottom: '1px #DDD solid',
                height: '35px',
                padding: '4px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center'
            }
        },
        innerCell: {
            flex: '1 1 0px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        innerSortCell: {
            flex: '1 1 0px',
            // overflow: 'hidden'
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden'
        },
        sortableCell: {
            css: {
                cursor: 'pointer',
            },
            pseudo: {
                hover: {
                    backgroundColor: 'rgba(200,200,200,0.8)'
                }
            }
        },
        sortedCell: {
            backgroundColor: 'rgba(200,200,200,0.5)'
        },
        sortIndicator: {
            display: 'inline'
        },
        sectionHeader: {
            padding: '4px',
            fontWeight: 'bold',
            color: '#FFF',
            backgroundColor: '#888'
        },
        selected: {
            backgroundColor: '#CCC'
        },
        private: {
            backgroundColor: 'green'
        },
        miniButton: {
            css: {
                padding: '2px',
                border: '2px transparent solid',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    border: '2px white solid'
                },
                active: {
                    border: '2px white solid',
                    backgroundColor: '#555',
                    color: '#FFF'
                }
            }
        }
    });

    function obj(aa) {
        return aa.reduce(function (acc, prop) {
            acc[prop[0]] = prop[1];
            return acc;
        }, {});
    }

    function buildHeader() {
        return  div({
            class: style.classes.headerRow,
            dataBind: {
                foreach: {
                    data: '$component.columns',
                    as: '"column"'
                }
            }
        }, div({
            dataBind: {
                style: 'column.headerStyle',
                css: obj([
                    [style.classes.sortableCell, 'column.sort ? true : false'],
                    [style.classes.sortedCell, 'column.sort && column.sort.active() ? true : false']
                ]),
                event: {
                    click: 'column.sort ? function () {$component.doSort(column);} : false'
                }
            },
            class: [style.classes.headerCell]
        }, [
            gen.if('column.sort',
                div({
                    class: [style.classes.innerSortCell]
                }, [
                    // header label
                    div({
                        class: [style.classes.innerCell]
                    }, [
                        span({
                            dataBind: {
                                text: 'column.label'
                            },
                            style: {

                                marginRight: '2px'
                            },
                        })
                    ]),

                    // sort indicator
                    div({
                        class: [style.classes.sortIndicator]
                    }, [
                        gen.if('!column.sort.active()',
                            span({
                                class: 'fa fa-sort'
                            }),
                            gen.if('column.sort.direction() === "descending"',
                                span({
                                    class: 'fa fa-sort-desc'
                                }),
                                gen.if('column.sort.direction() === "ascending"',
                                    span({
                                        class: 'fa fa-sort-asc'
                                    }))))
                    ])
                ]),
                div({
                    class: [style.classes.innerCell]
                }, [
                    span({
                        dataBind: {
                            text: 'column.label'
                        }
                    })
                ]))
        ]));
    }

    function buildColValue() {
        return gen.if('row.data[column.name].action',
            span({
                class: style.classes.value,
                dataBind: {
                    typedText: {
                        value: 'row.data[column.name].value',
                        type: 'column.type',
                        format: 'column.format',
                        click: '$component[rowl[column.name].action]'
                    },
                    attr: {
                        title: 'row.data[column.name].info'
                    }
                }
            }),
            gen.if('row.data[column.name].url',
                a({
                    class: style.classes.value,
                    dataBind: {
                        typedText: {
                            value: 'row.data[column.name].value',
                            type: 'column.type',
                            format: 'column.format'
                        },
                        attr: {
                            title: 'row.data[column.name].info'
                        },
                        click: 'function () {$component.doOpenUrl(row.data[column.name]);}',
                        clickBubble: 'false'
                    }
                }),
                span({
                    class: style.classes.value,
                    dataBind: {
                        typedText: {
                            value: 'row.data[column.name].value',
                            type: 'column.type',
                            format: 'column.format'
                        },
                        attr: {
                            title: 'row.data[column.name].info'
                        }
                    }
                })));
    }

    function buildEmptyCol() {
        return div({
            style: {
                backgroundColor: 'silver',
                flex: '1 1 0px',
                height: '100%'
            }
        });
    }

    function  buildActionFnCol() {
        return gen.if('row.data[column.name]',
            a({
                dataBind: {
                    typedText: {
                        value: 'row.data[column.name].value',
                        type: 'column.type',
                        format: 'column.format'
                    },
                    click: 'function () {column.action.fn(row.data[column.name], row);}',
                    clickBubble: false,
                    attr: {
                        title: 'row.data[column.name].info'
                    }
                },
                style: {
                    cursor: 'pointer'
                }
            }),
            gen.if('column.action.label',
                a({
                    dataBind: {
                        text: 'column.action.label',
                        // click: 'function () {column.action(row);}',
                        // clickBubble: false
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }),
                a({
                    dataBind: {
                        css: 'column.action.icon',
                        click: 'function () {column.action.fn(row);}',
                        clickBubble: false,
                        // attr: {
                        //     title: 'row[column.name].info'
                        // }
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    class: 'fa'
                })));
    }

    function  buildActionNameCol() {
        return gen.if('row.data[column.name]',
            a({
                dataBind: {
                    typedText: {
                        value: 'row.data[column.name].value',
                        type: 'column.type',
                        format: 'column.format'
                    },
                    click: 'function () {$component.actions[column.action.name]({row: row, col: row.data[column.name]});}',
                    clickBubble: false,
                    attr: {
                        title: 'row.data[column.name].info'
                    }
                },
                style: {
                    cursor: 'pointer'
                }
            }),
            gen.if('column.action.label',
                a({
                    dataBind: {
                        text: 'column.action.label',
                        click: 'function () {$component.actions[column.action.name]({row: row, col: null});}',
                        clickBubble: false,
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }),
                a({
                    dataBind: {
                        css: 'column.action.icon',
                        click: 'function () {$component.actions[column.action.name]({row: row, col: null});}',
                        clickBubble: false,
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    class: 'fa'
                })));
    }

    function  buildActionLinkCol() {
        return gen.if('row.data[column.name]',
            gen.if('row.data[column.name].url',
                a({
                    dataBind: {
                        typedText: {
                            value: 'row.data[column.name].value',
                            type: 'column.type',
                            format: 'column.format'
                        },
                        click: 'function () {$component.openLink(row.data[column.name].url);}',
                        // click: 'function () {column.action.fn(row[column.name], row);}',
                        clickBubble: false,
                        attr: {
                            title: 'row.data[column.name].info'
                        }
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }),
                span({
                    dataBind: {
                        typedText: {
                            value: 'row.data[column.name].value',
                            type: 'column.type',
                            format: 'column.format'
                        },
                        attr: {
                            title: 'row.data[column.name].info'
                        }
                    }
                })),
            // Case of a column definition containing a link, but no corresponding
            // row value. E.g. a per-row action.

            // NO column value, show the column action label or icon
            gen.if('column.action.label',
                a({
                    dataBind: {
                        text: 'column.action.label',
                        // click: 'function () {column.action(row);}',
                        // clickBubble: false
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }),
                a({
                    dataBind: {
                        css: 'column.action.icon',
                        click: 'function () {$module.openLink(row.data[column.name], row);}',
                        clickBubble: false,
                        // attr: {
                        //     title: 'row[column.name].info'
                        // }
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    class: 'fa'
                })));
    }

    function buildCommonRow() {
        return div({
            dataBind: {
                foreach: {
                    data: '$component.columns',
                    as: '"column"'
                },
                event: {
                    click: '(d,e) => {$component.doRowAction.call($component, d, e, row)}',
                    mouseover: '() => {row.over(true)}',
                    mouseout: '() => {row.over(false)}'
                }
            },
            class: style.classes.commonRow
        }, div({
            dataBind: {
                style: 'column.rowStyle',
                class: 'row.over() && !column.noSelect ? "' + style.classes.rowOver + '" : null'
            },
            class: [style.classes.cell]
        }, gen.if('row.mode === "inaccessible"',
            buildEmptyCol(),
            div({
                class: [style.classes.content],
                dataBind: {
                    style: 'column.style'
                }
            }, [
                gen.if('column.action', [
                    gen.if('column.action.fn', buildActionFnCol()),
                    gen.if('column.action.name', buildActionNameCol()),
                    gen.if('column.action.link', buildActionLinkCol())
                ],
                gen.if('column.component',
                    gen.component2({
                        name: 'column.component',
                        params: {
                            field: 'row.data[column.name]',
                            row: 'row',
                            env: '$component.env'
                        }
                    }),
                    gen.if('row.data[column.name]', buildColValue())))
            ])
        )));
    }

    function buildDetailRow() {
        return div({
            class: style.classes.detailRow
        }, gen.component2({
            name: '$component.detailComponent',
            params: {
                row: 'row'
            }
        }));
    }

    function buildCompactRow() {
        return div({
            class: style.classes.compactRow
        }, [
            buildCommonRow()
        ]);
    }

    function buildExpandedRow() {
        return div({
            class: style.classes.expandedRow
        }, [
            buildCommonRow(),
            buildDetailRow()
        ]);
    }

    function buildRows() {
        return gen.foreachAs('rows', 'row',
            gen.if('$component.table.view() === "compact"',
                buildCompactRow(),
                buildExpandedRow()));
    }

    function buildLoading() {
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
        }, [
            div({
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }, [
                gen.if('$component.isLoadingSlowly', build.loading())
            ])
        ]);
    }

    function buildMessage(type, message) {
        return gen.if('typeof messages.' + message + ' === "string"',
            gen.component({
                name: MessageComponent.name(),
                params: {
                    type: '"' + type + '"',
                    message: 'messages.' + message
                }
            }),
            div({
                dataBind: {
                    component: {
                        name: 'messages.' + message + '.component.name',
                        params: {
                            bus: '$component.bus',
                            table: '$component.table'
                        }
                    }
                }
            }));
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            buildHeader(),
            div({
                class: style.classes.tableBody
            }, gen.switch('$component.state()', [
                [
                    '"notfound"',
                    buildMessage('warning', 'notfound')
                ],
                [
                    '"none"',
                    buildMessage('info', 'none')
                ],
                [
                    '"error"',
                    buildMessage('danger', 'error')
                ],
                [
                    '$default',
                    gen.if('$component.isLoading',
                        buildLoading(),
                        buildRows())
                ]
            ]))
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