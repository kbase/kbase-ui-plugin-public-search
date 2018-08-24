define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/components/tabset',
    'kb_common/html',
    '../wikipediaImage',
    './overview',
    './taxonomy',
    './publications',
    '../container',
    '../containerTab',
    '../provenance',
    '../wikipedia'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    TabsetComponent,
    html,
    WikipediaImageComponent,
    TabOverviewComponent,
    TaxonomyComponent,
    PublicationsComponent,
    ContainerComponent,
    ContainerTabComponent,
    ProvenanceComponent,
    WikipediaComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        a = t('a');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            // console.log('genome params', params.object());

            const {object} = params;

            this.object = object;

            this.ref = ko.pureComputed(() => {
                if (object() && object().objectInfo) {
                    return object().objectInfo.ref;
                }
                return null;
            });

            this.runtime = context.$root.runtime;

            this.summaryInfo = ko.observable();

            this.scientificName = ko.observable();
            this.taxonomy = ko.observableArray();

            this.dataIcon = ko.observable();

            this.tabs = [
                {
                    active: true,
                    tab: {
                        label: 'Overview'
                    },
                    panel: {
                        component: {
                            name: TabOverviewComponent.name(),
                            params: {
                                ref: 'object().objectInfo.ref'
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
                                ref: 'ref',
                                methodMap: 'methodMap'
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
                                ref: 'object().objectInfo.ref'
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
                {
                    tab: {
                        label: 'Assembly & Annotation',
                        component: null
                    },
                    panel: {
                        component: null,
                        content: div('hi!')
                    }
                }
            ];

            this.getDataIcon();

            this.methodMap = null;
            this.ready = ko.observable(false);

            Promise.all([
                this.getSummaryInfo(),
                this.getMethodMap()
            ])
                .then(() => {
                    // console.log('method map?', this.methodMap());
                    this.ready(true);
                });
        }

        getMethodMap() {
            const nms = this.runtime.service('rpc').makeClient({
                module: 'NarrativeMethodStore',
                timeout: 10000,
                authorization: false
            });
            return Promise.all([
                nms.callFunc('list_methods_spec', [{tag: 'dev'}]),
                nms.callFunc('list_methods_spec', [{tag: 'beta'}]),
                nms.callFunc('list_methods_spec', [{tag: 'release'}])
            ])
                .spread(([dev], [beta], [release]) => {
                    // console.log('hey, got method specs info...', result);
                    const methodMap = {};

                    const devMap = dev.reduce((methodMap, spec) => {
                        const id = spec.behavior.kb_service_name + '/' +
                                   spec.behavior.kb_service_method;
                        methodMap[id] = spec;
                        return methodMap;
                    }, {});

                    const betaMap = beta.reduce((methodMap, spec) => {
                        const id = spec.behavior.kb_service_name + '/' +
                                   spec.behavior.kb_service_method;
                        methodMap[id] = spec;
                        return methodMap;
                    }, {});

                    const releaseMap = release.reduce((methodMap, spec) => {
                        const id = spec.behavior.kb_service_name + '/' +
                                   spec.behavior.kb_service_method;
                        methodMap[id] = spec;
                        return methodMap;
                    }, {});

                    this.methodMap = {
                        dev: devMap,
                        beta: betaMap,
                        release: releaseMap
                    };
                    // console.log('hey, got method map!!', this.methodMap);
                })
                .catch((err) => {
                    console.error('ERROR', err.message);
                    return null;
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
                ref: this.object().objectInfo.ref,
                included: [
                    'scientific_name'
                ]
            }]])
                .spread(([objectData]) => {
                    this.scientificName(objectData.data.scientific_name);
                    const tax = objectData.data.taxonomy;
                    if (tax) {
                        let taxList;
                        if (tax.indexOf(';') !== -1) {
                            taxList = tax.split(';');
                        } else {
                            taxList = tax.split(',');
                        }
                        this.taxonomy(taxList);
                    }
                });
        }

        getDataIcon() {
            try {
                const typeId = this.object().objectInfo.type,
                    type = this.runtime.service('type').parseTypeId(typeId),
                    icon = this.runtime.service('type').getIcon({ type: type });
                this.dataIcon({
                    classes: icon.classes.join(' '),
                    color: icon.color
                });
            } catch (err) {
                console.error('When fetching icon config: ', err);
                this.dataIcon({
                    classes: 'fa-question',
                    color: 'gray'
                });
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

    function buildOverview() {
        return div({
            style: {
                display : 'flex',
                flexDirection: 'row',
                height: '100px'
            }
        }, [
            div({
                style: {
                    flex: '2 1 0px',
                    display: 'flex',
                    flexDirection: 'column'
                }
            }, [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'row'
                    }
                }, [
                    div([
                        span({ class: 'fa-stack fa-2x' }, [
                            span({
                                class: 'fa fa-circle fa-stack-2x',
                                dataBind: {
                                    style: {
                                        color: 'dataIcon().color'
                                    }
                                }
                            }),
                            span({
                                class: 'fa-inverse fa-stack-1x ',
                                dataBind: {
                                    class: 'dataIcon().classes'
                                }
                            })
                        ])
                    ]),
                    div({
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }
                    }, [
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
                                        href: '"#dataview/" + object().objectInfo.ref'
                                    }
                                },
                                target: '_blank'
                            }),
                            div(html.loading())),
                        div(a({
                            dataBind: {
                                text: 'object().objectInfo.typeName + " " + object().objectInfo.typeMajorVersion + "." + object().objectInfo.typeMinorVersion',
                                attr: {
                                    href: '"#spec/type/" + object().objectInfo.type'
                                }
                            },
                            target: '_blank'
                        })),
                        div({
                            dataBind: {
                                typedText: {
                                    value: 'object().objectInfo.saveDate',
                                    type: '"date"',
                                    format: '"YYYY-MM-DD"'
                                }
                            }
                        })
                    ])
                ])
            ]),
            div({
                style: {
                    flex: '1 1 0px'
                }
            }, [
                div({
                    style: {
                        // border: '1px silver solid',
                        // padding: '4px',
                        // margin: '4px',
                        float: 'right'
                    }
                }, gen.component({
                    name: WikipediaImageComponent.name(),
                    params: {
                        scientificName: 'scientificName',
                        height: '"100px"'
                    }
                }))
            ])
        ]);
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
            gen.if('object()',
                [
                    buildOverview(),
                    buildTabs()
                ],
                html.loading())));
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