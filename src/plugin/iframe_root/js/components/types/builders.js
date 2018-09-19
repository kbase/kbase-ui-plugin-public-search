define([
    'knockout',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/components/tabset',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../container/container',
    './common/wikipediaImage',
    './common/container',
    './common/containerTab',
    './common/metadata',
    './common/provenance/main',

], function (
    ko,
    gen,
    ViewModelBase,
    TabsetComponent,
    html,
    build,
    ContainerHeaderComponent,
    WikipediaImageComponent,
    ContainerComponent,
    ContainerTabComponent,
    MetadataComponent,
    ProvenanceComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span');

    function buildContainerInfo() {
        return div({
            dataBind: {
                component: {
                    name: ContainerHeaderComponent.quotedName(),
                    params: {
                        object: 'object'
                    }
                }
            }
        });
    }

    function buildObjectIdentification(objectIdentificationContent) {
        return div({
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
                                color: 'dataIcon.color'
                            }
                        }
                    }),
                    span({
                        class: 'fa-inverse fa-stack-1x ',
                        dataBind: {
                            class: 'dataIcon.classes'
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
            }, objectIdentificationContent)
        ]);
    }

    function buildHeader(objectIdentificationContent, wikipediaTerm) {
        return div({
            style: {
                display : 'flex',
                flexDirection: 'row',
                height: '100px',
                marginBottom: '10px'
            }
        }, [
            div({
                style: {
                    flex: '3 1 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px silver solid',
                    paddingTop: '10px',
                    overflow: 'hidden'
                }
            }, buildObjectIdentification(objectIdentificationContent)),
            div({
                style: {
                    width: '150px'
                }
            }, (function () {
                if (!wikipediaTerm) {
                    return;
                }
                return gen.component({
                    name: WikipediaImageComponent.name(),
                    params: {
                        term: wikipediaTerm,
                        height: '"100px"'
                    }
                });
            })()
                // gen.component({
                //     name: WikipediaImageComponent.name(),
                //     params: {
                //         scientificName: 'scientificName',
                //         height: '"100px"'
                //     }
                // })
            ),
            div({
                style: {
                    flex: '2 1 0px',
                    border: '1px silver solid',
                    padding: '4px',
                    marginRight: '10px',
                    overflow: 'hidden'
                }
            }, buildContainerInfo())
        ]);
    }

    function buildTabs() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            gen.component({
                name: TabsetComponent.name(),
                params: {
                    tabContext: '$component',
                    tabs: 'tabs',
                    bus: 'bus'
                }
            })
        ]);
    }

    class TypeViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {object} = params;
            this.object = object;
            this.runtime = context.$root.runtime;

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.dataIcon = this.getDataIcon();

            this.tabs = [];
        }

        setTabs({primary, overview, custom}) {
            if (primary) {
                if (primary.tab) {
                    this.tabs.push(primary);
                } else {
                    this.tabs.push({
                        tab: 'Primary',
                        panel: {
                            component: primary,
                            params: {
                                object: 'object'
                            }
                        }
                    });
                }
            }
            if (overview) {
                this.tabs.push({
                    tab: {
                        label: 'Overview'
                    },
                    panel: {
                        component: {
                            name: overview,
                            params: {
                                object: 'object'
                            }
                        }
                    }
                });
            }

            this.tabs.push({
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
            });

            // general tabs:
            this.tabs.push({
                tab: {
                    label: 'Provenance'
                },
                panel: {
                    component: {
                        name: ProvenanceComponent.name(),
                        params: {
                            object: 'object'
                        }
                    }
                }
            });
            this.tabs.push({
                tab: {
                    label: 'Metadata'
                },
                panel: {
                    component: {
                        name: MetadataComponent.name(),
                        params: {
                            object: 'object'
                        }
                    }
                }
            });

            // custom tabs:
            custom.forEach((tab) => {
                this.tabs.push(tab);
            });


            this.tabs[0].active = true;
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

    return {buildHeader, buildTabs, TypeViewModel};
});