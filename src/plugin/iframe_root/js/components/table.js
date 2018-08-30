define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    ko,
    reg,
    ViewModelBase,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            this.rows = params.rows;
            this.table = params.table;

            // this.rows = ko.pureComputed(() => {
            //     console.log('sort compute?', this.table.sort.column(), this.table.sort.direction());
            //     const rows = params.rows.sorted((a, b) => {
            //         const c = this.table.sort.column();
            //         const x = this.table.sort.direction() * this.table.columnMap[c].sort.comparator(a[c], b[c]);
            //         return x;
            //     });
            //     console.log('sorted!', rows);
            //     return rows
            //     // return params.rows;
            // });

        }

        sortTable(a, b) {
            const c = this.table.sort.column();
            const dir = this.table.sort.direction() === 'asc' ? 1 : -1;
            const x = dir * this.table.columnMap[c].sort.comparator(a[c], b[c]);
            return x;
        }

        doSort(data) {

            const currentSortColumn = this.table.sort.column();
            const currentSortDirection = this.table.sort.direction();
            // console.log('do sort', currentSortColumn, currentSortDirection, data.name);
            // console.log('sorting?', data, currentSortColumn, currentSortDirection);
            if (currentSortColumn === data.name) {
                if (currentSortDirection === 'asc') {
                    this.table.sort.direction('desc');
                } else {
                    this.table.sort.direction('asc');
                }
            } else {
                this.table.sort.column(data.name);
                this.table.sort.direction(currentSortDirection);
            }
        }

        calcColumnStyle(column) {
            const style = {
                width: column.width + '%'
            };
            if (column.cellStyle) {
                Object.assign(style, column.cellStyle);
            } else {
                Object.assign(style, {
                    padding: '4px'
                });
            }
            return style;
        }

        stringify(obj) {
            return '{' + Object.keys(obj).map((key) => {
                return key + ':' + String(obj[key]);
            }).join(',') + '}';
        }
    }

    function buildRow() {
        return div({
            dataBind: {
                with: 'row',
                style: 'table.rowStyle'
            }
        }, gen.foreachAs('$component.table.columns', 'column',
            // make the implicit context the row again.
            gen.if('column.component',
                // use the column specified for the column, using the
                // specified params (relative to row) as input.
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top'
                    },
                    dataBind: {
                        style: '$component.calcColumnStyle(column)'
                    }
                }, span({
                    dataBind: {
                        component: {
                            name: 'column.component.name',
                            // hopefully params are relative to the row context...
                            params: 'eval("(" + $component.stringify(column.component.params) + ")")'
                        }
                    }
                })),
                // else use the row's column value directly
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top'
                    },
                    dataBind: {
                        style: '$component.calcColumnStyle(column)'
                    }
                }, [
                    gen.if('column.format',
                        span({
                            dataBind: {
                                typedText: {
                                    value: 'row[column.name]',
                                    type: 'column.format.type',
                                    format: 'column.format.format'
                                }
                            }
                        }),
                        gen.if('column.html',
                            span({
                                dataBind: {
                                    html: 'row[column.name]'
                                }
                            }),
                            span({
                                dataBind: {
                                    text: 'row[column.name]'
                                }
                            })))
                ]
                ))));
    }

    function buildTable() {
        const header = div({
            style: {
                '-moz-user-select': 'none',
                '-webkit-user-select': 'none',
                '-ms-user-select': 'none',
                userSelect: 'none'
            }
        }, gen.foreach('table.columns',
            div({
                style: {
                    display: 'inline-block',
                    fontStyle: 'italic',
                    // padding: '4px',
                    cursor: 'pointer',
                    userSelect: 'none'
                },
                dataBind: {
                    style: '$component.calcColumnStyle($data)',
                    // style:  {
                    //     width: 'width + "%"'
                    // },
                    click: 'function (d, e) {$component.doSort.call($component,d,e);}'
                }
            }, [
                span({
                    dataBind: {
                        text: 'label'
                    }
                }),
                span({
                    dataBind: {
                        visible: 'sort',
                        css: {
                            'fa-sort-desc': '$component.table.sort.column() === name && $component.table.sort.direction() === "desc"',
                            'fa-sort-asc': '$component.table.sort.column() === name && $component.table.sort.direction() === "asc"',
                            'fa-sort': '$component.table.sort.column() !== name'
                        },
                        style: {
                            color: '$component.table.sort.column() !== name ? "#AAA" : "#000"'
                        }
                    },
                    style: {
                        marginLeft: '4px'
                    },
                    class: 'fa'
                })
            ])
        ));
        // we loop across all the columns; remember, this is invoked
        // within the row, so we need to reach back up to get the
        // row context.
        const row = buildRow();

        return div({
            dataBind: {
                style: {
                    'background-color': 'table.style.backgroundColor'
                }
            },
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            header,
            div({
                style: {
                    flex: '1 1 0px',
                    overflowY: 'auto'
                }
            }, gen.foreachAs(
                'rows.sorted((a,b) => {return $component.sortTable.call($component,a,b)})',
                'row',
                row))
        ]);
    }

    function template() {
        return buildTable();
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});