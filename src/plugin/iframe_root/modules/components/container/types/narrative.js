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
        constructor({name, owner, lastModifiedAt, workspaceId, objectId}) {
            this.name = name;
            this.owner = owner;
            this.lastModifiedAt = lastModifiedAt;
            this.workspaceId = workspaceId;
            this.objectId = objectId;
        }
    }

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        a = t('a');

    const style = html.makeStyles({
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px'
                },
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(200,200,200,1)',
                    textAlign: 'left',
                    padding: '4px'
                }
            }
        },
        title: {
            css: {
                fontWeight: 'bold',
                color: 'rgba(100,100,100,1)',
                textAlign: 'center'
            }
        },
        component: {
            css: {
                // flex: '1 1 0px',
                // display: 'flex',
                // flexDirection: 'column'
            }
        },
        row: {
            css: {
                display: 'flex',
                flexDirection: 'row'
            }
        },
        cell: {
            css: {
                flex: '1 1 0px',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
        cellContent: {
            css: {
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
        label: {
            css: {
                fontWeight: 'bold',
                color: 'rgba(200,200,200,1)',
                marginRight: '4px'
            }
        }
    });

    function buildNarrativeInfo() {
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.title
            }, 'In Narrative'),
            div({
                class: style.classes.row
            }, [
                span({
                    class: style.classes.label
                }, 'title'),
                div({
                    class: style.classes.cell
                }, div({
                    class: style.classes.cellContent
                }, a({
                    target: '_blank',
                    dataBind: {
                        text: 'name',
                        attr: {
                            href: '"/narrative/ws." + workspaceId + ".obj." + objectId',
                            title: 'name'
                        }
                    }
                })))
            ]),
            div({
                class: style.classes.row
            }, [
                span({
                    class: style.classes.label
                }, 'owner'),
                div({
                    class: style.classes.cell
                }, a({
                    class: style.classes.cellContent,
                    target: '_blank',
                    dataBind: {
                        text: 'owner',
                        attr: {
                            href: '"#people/" + owner',
                            title: 'owner'
                        }
                    }
                }))
            ]),
            div({
                class: style.classes.row
            }, [
                span({
                    class: style.classes.label
                }, 'saved'),
                div({
                    class: style.classes.cell
                }, span({
                    class: style.classes.cellContent,
                    dataBind: {
                        typedText: {
                            value: 'lastModifiedAt',
                            type: '"date"',
                            format: '"MMM D, YYYY"'
                        }
                    }
                }))
            ])
        ]);
    }


    function template() {
        return buildNarrativeInfo();
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});