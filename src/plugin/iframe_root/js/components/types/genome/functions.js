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

    class ViewModel {
        constructor({field}) {
            this.functions = field.value;
            this.open = ko.observable(false);
        }

        doToggle() {
            this.open(!this.open());
        }
    }

    const t = html.tag,
        span = t('span'),
        div = t('div'),
        button = t('button');

    function buildButton() {
        return button({
            dataBind: {
                click: 'function(){$component.doToggle.call($component)}'
            }
        }, [
            div({
                style: {
                    display: 'inline-block',
                    width: '1em',
                    textAlign: 'right',
                    marginRight: '4px'
                },
                dataBind: {
                    text: 'functions.length'
                }
            }),
            div({
                style: {
                    display: 'inline-block',
                    width: '1em'
                },
                dataBind: {
                    text: 'open() ? "↓" : "→"'
                }
            })
        ]);
    }

    function buildCell() {
        return div({
            dataBind: {
                visible: '$index() === 0 || $component.open()'
            },
            style: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // flex: '1 1 0px'
            }
        }, [
            // the actual thing to display.
            span({
                dataBind: {
                    text: '$data'
                }
            })
        ]);
    }

    function template() {
        return div({
            style: {
                display: 'flex',
                flexDirection: 'row'
            }
        }, gen.if('functions.length === 0',
            div({
                style: {
                    flex: '1 1 0px',
                    textAlign: 'center'
                }
            }, '-'),
            [
                div({
                    style: {
                        flex: '1 1 0px',
                        border: '1px silver dotted',
                    // position: 'relative',
                    // zIndex: '100'
                    },
                // dataBind: {
                //     style: {
                //         'z-index': 'open() ? 10000 : "auto"'
                //     }
                // }
                }, div({
                    style: {
                        position: 'relative'
                    },
                    dataBind: {
                        style: {
                            'z-index': 'open() ? 10000 : "auto"'
                        }
                    }
                }, div({
                    style: {
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        right: '0',
                        backgroundColor: '#FFF',
                        border: '1px silver solid'
                    },
                // dataBind: {
                //     style: {
                //         'z-index': 'open() ? 10000 : "auto"'
                //     }
                // }
                }, div({
                    style: {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, gen.foreach('functions', buildCell()))))),
                gen.if('functions.length > 1',
                    div({
                        style: {
                            flex: '0 0 2em'
                        }
                    }, buildButton()))
            ]));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);

});