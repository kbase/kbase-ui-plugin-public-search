define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/components/tabset',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../common/wikipediaImage',
    './overview',
    '../common/publications',
    '../common/container',
    '../common/containerTab'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    TabsetComponent,
    html,
    build,
    WikipediaImageComponent,
    OverviewComponent,
    PublicationsComponent,
    ContainerComponent,
    ContainerTabComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        a = t('a');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            const {object} = params;

            this.object = object;

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
                            name: OverviewComponent.name(),
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
                        label: 'Something Else',
                        component: null
                    },
                    panel: {
                        component: null,
                        content: div('hi!')
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
                                query: this.scientificName
                            }
                        }
                    }
                },
            ];

            this.getSummaryInfo();
            this.getDataIcon();
        }

        getSummaryInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
            workspace.callFunc('get_object_subset', [[{
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
                flexDirection: 'row'
            }
        }, [
            div({
                style: {
                    flex: '3 1 0px',
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
                    div(div([
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
                    ])),
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
                                        href: '"/#dataview/" + object().objectInfo.ref'
                                    }
                                },
                                target: '_blank'
                            }),
                            div(build.loading())),
                        div(a({
                            dataBind: {
                                text: 'object().objectInfo.typeName + " " + object().objectInfo.typeMajorVersion + "." + object().objectInfo.typeMinorVersion',
                                attr: {
                                    href: '"/#spec/type/" + object().objectInfo.type'
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
                    flex: '1 1 0px',
                }
            }, [
                div({
                    style: {
                        padding: '4px',
                        margin: '4px'
                    }
                }, gen.component({
                    name: WikipediaImageComponent.name(),
                    params: {
                        scientificName: 'scientificName',
                        height: '"150px"'
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

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        gen.if('object()',
            [
                buildOverview(),
                buildTabs()
            ],
            build.loading()));
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