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
        a = t('a'),
        p = t('p'),
        hr = t('hr'),
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
                        th('Data imported by'),
                        td(a({
                            dataBind: {
                                text: 'owner',
                                attr: {
                                    href: '"/#people/" + owner'
                                }
                            },
                            target: '_blank'
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
                    tr([
                        th('Data imported'),
                        td(span({
                            dataBind: {
                                typedText: {
                                    value: 'lastModifiedAt',
                                    type: '"date"',
                                    format: '"YYYY-MM-DD"'
                                }
                            }
                        }))
                    ])
                ])
            ])
        ]);
    }

    function buildExplanation() {
        return div([
            p('This data object is contained within a Reference Data Workspace.'),
            p([
                'KBase provides several sets of public reference datasets which you may use ',
                'within Narratives for analysis.'
            ]),
            p([
                'Please see our ',
                a({
                    href: 'http://kbase.us/data-policy-and-sources',
                    target: '_blank'
                }, 'Data Policy & Sources'),
                ' page for a full list of data sources and our data policy.'
            ])
        ]);
    }

    function template() {
        return div([
            buildNarrativeInfo(),
            hr({
                style: {
                    width: '50%'
                }
            }),
            buildExplanation()
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