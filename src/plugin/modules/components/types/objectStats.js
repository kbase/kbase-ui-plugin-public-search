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
        a = t('a'),
        span = t('span'),
        div = t('div'),
        table = t('table'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    const styles = html.makeStyles({
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px'
                },
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(200,200,200,1)',
                    textAlign: 'left',
                    padding: '4px'
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

    class ViewModel {
        constructor({createdAt, modifiedAt}) {
            this.createdAt = createdAt;
            this.modifiedAt = modifiedAt;
        }
    }

    function buildTypeInfo() {
        return div([
            div([
                span({
                    class: styles.classes.sectionHeader
                }, 'Object Info'),
                // a({
                //     class: 'btn btn-link',
                //     target: '_blank',
                //     dataBind: {
                //         attr: {
                //             href: '"#spec/type/" + typeID'
                //         }
                //     }
                // }, 'view')
            ]),
            table({
                class: styles.classes.table
            }, [
                tbody([
                    tr([
                        th('Created at'),
                        td({
                            dataBind: {
                                typedText: {
                                    value: 'createdAt',
                                    type: '"date"',
                                    format: '"YYYY/MM/DD @ hh:mm a"'
                                }
                            }
                        })
                    ]),
                    tr([
                        th('Last modified at'),
                        td({
                            dataBind: {
                                typedText: {
                                    value: 'modifiedAt',
                                    type: '"date"',
                                    format: '"YYYY/MM/DD @ hh:mm a"'
                                }
                            }
                        })
                    ])
                ])
            ])
        ]);
    }

    function template() {
        return buildTypeInfo();
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