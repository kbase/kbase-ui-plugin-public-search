define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/components/tabset',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    './overview',
    '../builders'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    TabsetComponent,
    html,
    build,
    OverviewComponent,
    builders
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        a = t('a');

    class ViewModel extends builders.TypeViewModel {
        constructor(params, context) {
            super(params, context);

            this.summaryInfo = null;
            this.taxonomy = [];
            this.dataIcon = this.getDataIcon();

            this.setTabs({
                primary: null,
                overview: OverviewComponent.name(),
                custom: []
            });

            this.start();
        }

        start() {
            this.ready(true);
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

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
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

    function buildObjectIdentification() {
        return [
            gen.if('object.objectInfo.name',
                a({
                    style: {
                        fontSize: '120%',
                        fontWeight: 'bold',
                        fontStyle: 'italic'
                    },
                    dataBind: {
                        text: 'object.objectInfo.name',
                        attr: {
                            href: '"/#dataview/" + object.objectInfo.ref'
                        }
                    },
                    target: '_blank'
                }),
                div(build.loading())),
            div(a({
                dataBind: {
                    text: 'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
                    attr: {
                        href: '"/#spec/type/" + object.objectInfo.type'
                    }
                },
                target: '_blank'
            })),
            div({
                dataBind: {
                    typedText: {
                        value: 'object.objectInfo.saveDate',
                        type: '"date"',
                        format: '"YYYY-MM-DD"'
                    }
                }
            })
        ];
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
            class: style.classes.component
        },
        gen.if('ready',
            gen.if('object',
                [
                    builders.buildHeader(buildObjectIdentification(), null),
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
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});