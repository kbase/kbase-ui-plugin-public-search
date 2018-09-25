define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders'
], function (
    ko,
    reg,
    gen,
    html,
    builders
) {
    'use strict';

    class ViewModel {
        constructor(params, context, element, componentInfo, name) {
            this.tree = ko.unwrap(params.tree);
            this.runtime = context.$root.runtime;
            this.componentName = name;
            this.dataIcon = this.getDataIcon();
        }

        getDataIcon() {
            try {
                const typeId = this.tree.typeID,
                    type = this.runtime.service('type').parseTypeId(typeId),
                    icon = this.runtime.service('type').getIcon({ type: type });
                return {
                    classes: icon.classes.join(' '),
                    color: icon.color
                };
            } catch (err) {
                console.error('Error fetching icon config: ', err);
                return {
                    classes: 'fa-question',
                    color: 'gray'
                };
            }
        }
    }

    const t = html.tag,
        a = t('a'),
        span = t('span'),
        div = t('div');

    // function buildIcon(icon, color) {
    //     return div({
    //         style: {
    //             display: 'inline-block',
    //             width: '30px'
    //         }
    //     }, span({
    //         class: 'fa fa-lg fa-' + icon,
    //         style: {
    //             color: color
    //         }
    //     }));
    // }

    function buildDataIcon() {
        return div({
            style: {
                fontSize: '80%'
            }
        }, [
            span({
                class: 'fa-stack fa-2x'
            }, [
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
        ]);
    }

    function template() {
        return div({
            style: {
                // border: '1px silver solid',
                // padding: '4px'
            }
        }, [
            div({
                style: {
                    padding: '4px',
                    border: '1px silver solid',
                    display: 'flex',
                    flexDirection: 'row'
                }
            }, [
                div(
                    buildDataIcon()
                ),
                div({
                    style: {
                        flex: '1 1 0px'
                    }
                }, [
                    div(a({
                        dataBind: {
                            text: 'tree.display.title',
                            attr: {
                                href: '"/#dataview/" + tree.ref'
                            }
                        },
                        target: '_blank'
                    })),
                    div({
                        dataBind: {
                            text: 'tree.type'
                        }
                    })
                ])
            ]),
            div({
                style: {
                    marginLeft: '20px'
                },
                dataBind: {
                    foreach: 'tree.children'
                }
            }, gen.component2({
                name: '$component.componentName',
                params: {
                    tree: '$data'
                }
            }))
        ]);
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});