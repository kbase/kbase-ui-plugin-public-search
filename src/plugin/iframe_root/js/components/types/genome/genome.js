define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/components/tabset',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    './overview',
    '../common/taxonomy',
    '../common/publications',
    './genes',
    '../container',
    '../containerTab',
    '../common/provenance',
    '../common/wikipedia',
    './trees',
    '../builders'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    TabsetComponent,
    html,
    build,
    TabOverviewComponent,
    TaxonomyComponent,
    PublicationsComponent,
    GenesComponent,
    ContainerComponent,
    ContainerTabComponent,
    ProvenanceComponent,
    WikipediaComponent,
    TreesComponent,
    builders
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        a = t('a');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            const {object} = params;
            this.object = object;
            this.runtime = context.$root.runtime;

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.summaryInfo = null;
            this.scientificName = null;
            this.taxonomy = null;
            this.dataIcon = this.getDataIcon();

            this.tabs = [
                {
                    active: true,
                    tab: {
                        label: 'Genome',
                        component: null
                    },
                    panel: {
                        component: {
                            name: GenesComponent.name(),
                            params: {
                                ref: 'object.objectInfo.ref'
                            }
                        }
                    }
                },
                {
                    tab: {
                        label: 'Overview'
                    },
                    panel: {
                        component: {
                            name: TabOverviewComponent.name(),
                            params: {
                                ref: 'object.objectInfo.ref'
                            }
                        }
                    }
                },
                {
                    tab: {
                        component: {
                            name: ContainerTabComponent.name(),
                            params: {
                                object: 'object'
                            }
                        }
                    },
                    panel: {
                        component: {
                            name: ContainerComponent.name(),
                            params: {
                                object: 'object'
                            }
                        }
                    }
                },
                {
                    tab: {
                        label: 'Wikipedia'
                    },
                    panel: {
                        component: {
                            name: WikipediaComponent.name(),
                            params: {
                                scientificName: 'scientificName'
                            }
                        }
                    }
                },
                {
                    tab: {
                        label: 'Provenance'
                    },
                    panel: {
                        component: {
                            name: ProvenanceComponent.name(),
                            params: {
                                ref: 'object.objectInfo.ref'
                            }
                        }
                    }
                },
                {
                    tab: {
                        label: 'Taxonomy',
                        component: null
                    },
                    panel: {
                        component: {
                            name: TaxonomyComponent.name(),
                            params: {
                                ref: 'object.objectInfo.ref'
                            }
                        }
                    }
                },
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
                },
                // {
                //     tab: {
                //         label: 'Trees',
                //         component: null
                //     },
                //     panel: {
                //         component: {
                //             name: TreesComponent.name(),
                //             params: {
                //                 ref: 'object.objectInfo.ref'
                //             }
                //         }
                //     }
                // }
            ];


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

        getDataIcon() {
            try {
                const typeId = this.object.objectInfo.type,
                    type = this.runtime.service('type').parseTypeId(typeId),
                    icon = this.runtime.service('type').getIcon({ type: type });
                return {
                    classes: icon.classes.join(' '),
                    color: icon.color
                };
            } catch (err) {
                console.error('When fetching icon config: ', err);
                return {
                    classes: 'fa-question',
                    color: 'gray'
                };
            }
        }
    }

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

    // function buildContainerInfo() {
    //     return div({
    //         dataBind: {
    //             component: {
    //                 name: ContainerHeaderComponent.quotedName(),
    //                 params: {
    //                     object: 'object'
    //                 }
    //             }
    //         }
    //     });
    // }

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
                    target: '_blank'
                }),
                div(build.loading())),
            div({
                dataBind: {
                    text: 'domain'
                }
            }),
            div(a({
                dataBind: {
                    text: 'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
                    attr: {
                        href: '"/#spec/type/" + object.objectInfo.type'
                    }
                },
                target: '_blank'
            }))

            // div({
            //     dataBind: {
            //         typedText: {
            //             value: 'object.objectInfo.saveDate',
            //             type: '"date"',
            //             format: '"YYYY-MM-DD"'
            //         }
            //     }
            // })
        ];
    }

    function buildTabs() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '12px'
            }
        }, [
            gen.component({
                name: TabsetComponent.name(),
                params: {
                    tabs: 'tabs',
                    tabContext: '$component',
                    bus: 'bus'
                }
            })
        ]);
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
                    buildTabs()
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