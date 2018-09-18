define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../common/lineage'
], function (
    ko,
    reg,
    gen,
    html,
    build,
    LineageComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    class ViewModel {
        constructor(params, context) {
            const {object} = params;
            this.ref = object.objectInfo.ref;

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.runtime = context.$root.runtime;

            this.scientificName = null;
            this.domain = null;
            this.dnaSize = null;
            this.contigCount = null;
            this.featureCount = null;
            this.gcContent = null;
            this.taxonomy = null;

            this.getOverviewInfo()
                .then(() => {
                    this.ready(true);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                });
        }

        getOverviewInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
            return workspace.callFunc('get_object_subset', [[{
                ref: this.ref,
                included: [
                    'scientific_name',
                    'domain',
                    'dna_size',
                    'num_contigs',
                    'gc_content',
                    'taxonomy'
                ]
            }]])
                .spread(([objectData]) => {
                    this.scientificName = objectData.data.scientific_name;
                    this.domain = objectData.data.domain;
                    this.dnaSize = objectData.data.dna_size;
                    this.contigCount = objectData.data.num_contigs;
                    this.taxonomy = objectData.data.taxonomy;

                    let gcContent;
                    // comment below from genome landing page widget kbaseGenomeOverview
                    /* Assume two cases for GC content.
                    * 1. GC > 1 --> it's a raw percentage, so just render
                    * 2. GC < 1 --> it's a decimal and should be x100
                    * 3. (maybe?) GC > 100 --> it's an actual count of GCs and should be divided by dna length
                    */
                    if (typeof objectData.data.gc_content === 'number') {
                        gcContent = objectData.data.gc_content;
                        if (gcContent > 100) {
                            if (objectData.data.dna_size && objectData.data.dna_size !== 0) {
                                gcContent = gcContent / objectData.data.dna_size;
                            } else {
                                gcContent = 100;
                            }
                        } else if (gcContent > 1.0) {
                            gcContent = gcContent / 100;
                        }
                    } else {
                        gcContent = null;
                    }

                    this.gcContent = gcContent;
                    this.featureCount = objectData.info[10]['Number features'] || objectData.info[10]['Number of CDS'];
                });
        }
    }

    const style = html.makeStyles({
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
        },
        column: {
            css: {
                display: 'inline-block',
                width: '50%',
                verticalAlign: 'top'
            }
        },
        columnHeader: {
            css: {
                fontWeight: 'bold',
                color: '#333',
                margin: '10px 0 4px 0'
            }
        }
    });

    function buildOverview() {
        return div([
            div({
                class: style.classes.column
            }, [
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Taxonomy'),
                    buildTaxonomy()
                ]),

                // div([
                //     div({
                //         class: style.classes.columnHeader
                //     }, 'Source'),
                //     'TBD'
                // ])
            ]),
            div({
                class: style.classes.column
            }, [
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Stats'),
                    buildStats()
                ]),
                // div([
                //     div({
                //         class: style.classes.columnHeader
                //     }, 'Taxonomic Lineage'),
                //     div({
                //         dataBind: {
                //             component: {
                //                 name: LineageComponent.quotedName(),
                //                 params: {
                //                     taxonomy: 'taxonomy'
                //                 }
                //             }
                //         }
                //     })
                // ])
            ])
        ]);
    }

    function buildTaxonomy() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('Scientific name'),
                td({
                    dataBind: {
                        text: 'scientificName'
                    }
                })
            ]),
            tr([
                th('Domain'),
                td({
                    dataBind: {
                        text: 'domain'
                    }
                })
            ]),
            tr([
                th('Lineage'),
                td(div({
                    dataBind: {
                        component: {
                            name: LineageComponent.quotedName(),
                            params: {
                                taxonomy: 'taxonomy'
                            }
                        }
                    }
                }))
            ])
        ]);
    }

    function buildStats() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('DNA Length'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'dnaSize',
                            type: '"number"',
                            format: '"0,0"',
                            missing: '"-"'
                        }
                    }
                })
            ]),
            tr([
                th('# Contigs'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'contigCount',
                            type: '"number"',
                            format: '"0,0"',
                            missing: '"-"'
                        }
                    }
                })
            ]),
            tr([
                th('GC Content'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'gcContent',
                            type: '"number"',
                            format: '"0.0%"',
                            missing: '"-"'
                        }
                    }
                })
            ]),
            tr([
                th('# Features'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'featureCount',
                            type: '"number"',
                            format: '"0,0"',
                            missing: '"-"'
                        }
                    }
                })
            ])
        ]);
    }

    function buildOverviewx() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('Domain'),
                td({
                    dataBind: {
                        text: 'domain'
                    }
                })
            ]),
            tr([
                th('Scientific name'),
                td({
                    dataBind: {
                        text: 'scientificName'
                    }
                })
            ]),
            tr([
                th('DNA Length'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'dnaSize',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                })
            ]),
            tr([
                th('# Contigs'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'contigCount',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                })
            ]),
            tr([
                th('GC Content'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'gcContent',
                            type: '"number"',
                            format: '"0.0%"'
                        }
                    }
                })
            ]),
            tr([
                th('# Features'),
                td({
                    dataBind: {
                        typedText: {
                            value: 'featureCount',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                })
            ])
        ]);
    }

    function template() {
        return div({
            class: style.classes.component
        },
        gen.if('ready',
            buildOverview(),
            build.loading('Loading overview data')
        ));
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