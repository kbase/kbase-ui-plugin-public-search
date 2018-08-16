define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        p = t('p'),
        span = t('span');

    const styles = html.makeStyles({
        component: {
            css: {
                position: 'absolute',
                border: '1px rgba(100,100,100,0.5) solid',
                boxShadow: '4px 4px 4px rgba(100,100,100,0.5)',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(255,255,255,1)',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        titleArea: {
            css: {
                backgroundColor: 'rgba(100,100,100,1)',
                padding: '4px',
                position: 'relative'
            }
        },
        titleButton: {
            css: {
                position: 'absolute',
                right: '4px',
                top: '4px',
                width: '10px',
                color: 'rgba(255,100,100,0.5)',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    color: 'rgba(255,100,100,1)'
                }
            }
        },
        title: {
            css: {
                color: 'rgba(255,255,255,1)',
                fontWeight: 'bold'
            }
        },
        contentArea: {
            css: {
                padding: '4px',
                overflowY: 'auto',
                flex: '1 1 0px'
            }
        },
        content: {
            css: {
                fontWeight: 'normal'
            }
        }
    });

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {title, content, remover, top, left} = params;

            this.title = title;
            this.closer = remover;

            if (typeof content === 'string') {
                this.content = [content];
            } else {
                this.content = content;
            }

            this.top = top;
            this.left = left;

            // just for testing...

            this.width = 200;
            this.height = 200;
        }

        doClose() {
            this.closer();
        }
    }

    function template() {
        return div({
            class: styles.classes.component,
            dataBind: {
                style: {
                    top: 'top',
                    left: 'left',
                    width: 'width',
                    height: 'height'
                },
                click: 'function(){}',
                clickBubble: 'false'
            }
        }, [
            div({
                class: styles.classes.titleArea
            }, [
                div({
                    class: styles.classes.titleButton,
                    dataBind: {
                        click: 'doClose'
                    }
                }, span({
                    class: 'fa fa-times'
                })),
                div({
                    class: styles.classes.title
                }, [
                    span({
                        class: 'fa fa-question-circle',
                        style: {
                            marginRight: '6px'
                        }
                    }),
                    span({
                        dataBind: {
                            text: 'title'
                        }
                    })
                ])

            ]),
            div({
                class: styles.classes.contentArea
            }, [
                div({
                    class: styles.classes.content,
                    dataBind: {
                        foreach: 'content'
                    }
                }, p({
                    dataBind: {
                        text: '$data'
                    }
                }))
            ])
        ]);
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