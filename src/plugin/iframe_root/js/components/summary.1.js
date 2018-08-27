define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    './table'
], function (
    ko,
    reg,
    gen,
    html,
    TableComponent
) {
    'use strict';

    const t = html.tag,
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
        }
    });

    class ViewModel {
        constructor({searchSummary, searchState, totalCount, realTotalCount}) {
            this.summary = searchSummary;
            this.searchState = searchState;
            this.totalCount = totalCount;
            this.realTotalCount = totalCount;

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

    function buildSummaryTable() {
        return div({
            class: styles.classes.container,
            dataBind: {
                component: {
                    name: TableComponent.quotedName(),
                    params: {
                        table: 'table',
                        rows: 'summary'
                    }
                }
            }
        });
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                class: styles.classes.title
            }, 'Search Summary'),
            buildSummaryTable()
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