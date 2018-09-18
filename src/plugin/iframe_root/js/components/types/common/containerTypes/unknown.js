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
        div = t('div'),
        span = t('span'),
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
        constructor({name, owner, lastModifiedAt, workspaceId, objectId}) {
            this.name = name;
            this.owner = owner;
            this.lastModifiedAt = lastModifiedAt;
            this.workspaceId = workspaceId;
            this.objectId = objectId;
        }
    }

    function buildNarrativeInfo() {
        return div([
            div([
                span({
                    class: styles.classes.sectionHeader
                }, 'Unknown Workspace')
            ]),
            table({
                class: styles.classes.table
            }, [
                tbody([
                    tr([
                        th('Narrative'),
                        td(span({
                            dataBind: {
                                text: 'name'
                            }
                        }))
                    ]),
                    tr([
                        th('Owner'),
                        td(span({
                            dataBind: {
                                text: 'owner'
                            }
                        }))
                    ]),
                    tr([
                        th('Created'),
                        td(span({
                            // dataBind: {
                            //     text: 'object().workspaceInfo.owner'
                            // }
                        }, 'tbd'))
                    ]),
                    tr([
                        th('Last modified'),
                        td(span({
                            dataBind: {
                                typedText: {
                                    value: 'lastModifiedAt',
                                    type: '"date"',
                                    format: '"YYYY-MM-DD @ hh:mm a"'
                                }
                            }
                        }))
                    ])
                ])
            ])
        ]);
    }

    function template() {
        return buildNarrativeInfo();
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