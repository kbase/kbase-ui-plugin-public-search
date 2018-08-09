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
        div = t('div'),
        a = t('a'),
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
        constructor({source, sourceID, owner, lastModifiedAt, workspaceId, objectId}) {
            this.source = source;
            this.sourceID = sourceID;
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
                }, 'Reference Data')
            ]),
            table({
                class: styles.classes.table
            }, [
                tbody([
                    tr([
                        th('Source'),
                        td(span({
                            dataBind: {
                                text: 'source'
                            }
                        }))
                    ]),
                    tr([
                        th('Source ID'),
                        td(span({
                            dataBind: {
                                text: 'sourceID'
                            }
                        }))
                    ]),
                    tr([
                        th('Data import by'),
                        td(span({
                            dataBind: {
                                text: 'owner'
                            }
                        }))
                    ]),
                    // tr([
                    //     th('Created'),
                    //     td(span({
                    //         // dataBind: {
                    //         //     text: 'object().workspaceInfo.owner'
                    //         // }
                    //     }, 'tbd'))
                    // ]),
                    // tr([
                    //     th('Last modified'),
                    //     td(span({
                    //         dataBind: {
                    //             typedText: {
                    //                 value: 'lastModifiedAt',
                    //                 type: '"date"',
                    //                 format: '"YYYY-MM-DD @ hh:mm a"'
                    //             }
                    //         }
                    //     }))
                    // ])
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