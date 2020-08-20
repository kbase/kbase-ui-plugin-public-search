define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    './overview',
    '../builders'
], function (
    ko,
    reg,
    gen,
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

            this.setTabs({
                primary: null,
                overview: OverviewComponent.name(),
                custom: []
            });

            this.ready(true);
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
            // If we ever get a universal "name" or "description" or "title"
            // field we would use that here rather than object name.
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
                        format: '"MMM D, YYYY"'
                    }
                }
            })
        ];
    }

    function template() {
        return div({
            class: style.classes.component
        },
        gen.if('ready',
            gen.if('object',
                [
                    builders.buildHeader(buildObjectIdentification(), null),
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
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});