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

    class ViewModel {
        constructor(params) {
            const {object} = params;

            const metadata = object().objectInfo.metadata;
            this.metadata = Object.keys(metadata).map((key) => {
                return {
                    key: key,
                    value: metadata[key]
                };
            });
        }
    }

    const t = html.tag,
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    const styles = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }
        },
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px',
                    verticalAlign: 'top'
                },
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(200,200,200,1)',
                    textAlign: 'left',
                    padding: '4px',
                    verticalAlign: 'top'
                },
                'td:nth-child(1)': {
                    width: '10em'
                },
                'th:nth-child(1)': {
                    width: '10em'
                }
            }
        },
        sectionHeader: {
            css: {
                fontWeight: 'bold',
                fontSize: '110%',
                color: 'rgba(100,100,100,1)',
                marginTop: '8px'
            }
        }
    });

    function buildMetadataTable() {
        return table({
            class: styles.classes.table,
            dataBind: {
                foreach: 'metadata'
            }
        },
        tr([
            th({
                dataBind: {
                    text: 'key'
                }
            }),
            td({
                dataBind: {
                    text: 'value'
                }
            })
        ]));
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            buildMetadataTable()
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