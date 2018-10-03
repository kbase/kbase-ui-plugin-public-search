define([
    'bluebird',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    './overview',
    '../common/publications',
    './genes/main',
    '../common/wikipedia',
    './trees',
    '../builders'
], function (
    Promise,
    reg,
    gen,
    html,
    build,
    OverviewComponent,
    PublicationsComponent,
    GenesComponent,
    WikipediaComponent,
    TreesComponent,
    builders
) {
    'use strict';

    // VIEW MODEL

    class ViewModel extends builders.TypeViewModel {
        constructor(params, context) {
            super(params, context);

            this.summaryInfo = null;
            this.scientificName = null;
            this.taxonomy = null;

            this.setTabs({
                primary: {
                    tab: {
                        label: 'Features'
                    },
                    panel: {
                        component: {
                            name: GenesComponent.name(),
                            params: {
                                object: 'object'
                            }
                        }
                    }
                },
                overview: OverviewComponent.name(),
                custom: [
                    {
                        tab: {
                            label: 'Wikipedia'
                        },
                        panel: {
                            component: {
                                name: WikipediaComponent.name(),
                                params: {
                                    term: 'scientificName'
                                }
                            }
                        }
                    },
                    // {
                    //     tab: {
                    //         label: 'Taxonomy',
                    //         component: null
                    //     },
                    //     panel: {
                    //         component: {
                    //             name: TaxonomyComponent.name(),
                    //             params: {
                    //                 ref: 'object.objectInfo.ref'
                    //             }
                    //         }
                    //     }
                    // },
                    {
                        tab: {
                            label: 'Publications',
                            component: null
                        },
                        panel: {
                            component: {
                                name: PublicationsComponent.name(),
                                params: {
                                    query: 'scientificName'
                                }
                            }
                        }
                    }
                ]
            });

            Promise.all([
                this.getSummaryInfo()
            ])
                .then(() => {
                    this.ready(true);
                })
                .catch((err) => {
                    console.error('Error', err);
                    this.error(err);
                });
        }

        getSummaryInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
            return workspace.callFunc('get_object_subset', [[{
                ref: this.object.objectInfo.ref,
                included: [
                    'scientific_name',
                    'domain'
                ]
            }]])
                .spread(([objectData]) => {
                    this.scientificName = objectData.data.scientific_name;
                    this.domain = objectData.data.domain;
                    const tax = objectData.data.taxonomy;
                    if (tax) {
                        let taxList;
                        if (tax.indexOf(';') !== -1) {
                            taxList = tax.split(';');
                        } else {
                            taxList = tax.split(',');
                        }
                        this.taxonomy = taxList;
                    }
                });
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div'),
        a = t('a');

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

    function buildGenomeIdentification() {
        return [
            gen.if('scientificName',
                a({
                    style: {
                        fontSize: '120%',
                        fontWeight: 'bold',
                        fontStyle: 'italic'
                    },
                    dataBind: {
                        text: 'scientificName',
                        attr: {
                            href: '"/#dataview/" + object.objectInfo.ref'
                        }
                    },
                    target: '_blank',
                    title: 'This is the scientific name assigned to this Genome object.'
                }),
                div(build.loading())),
            div({
                dataBind: {
                    text: 'domain'
                },
                title: 'This is the taxonomic domain assigned to this Genome object.'
            }),
            div(a({
                dataBind: {
                    text: 'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
                    attr: {
                        href: '"/#spec/type/" + object.objectInfo.type'
                    }
                },
                target: '_blank',
                title: 'This is the type and type version of this Genome object. You may click on it to view more information about this type.'
            }))
        ];
    }

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        gen.if('ready()',
            gen.if('object',
                [
                    builders.buildHeader(buildGenomeIdentification(), 'scientificName'),
                    builders.buildTabs()
                ],
                build.loading()),
            build.loading()
        ));
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});