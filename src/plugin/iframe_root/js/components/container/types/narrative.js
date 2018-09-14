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

    const t = html.tag,
        div = t('div'),
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
        cell: {
            css: {
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        cellElement: {
            css: {
                display: 'block',
                flex: '1 1 0px'
            }
        }
    });

    class ViewModel {
        constructor({name, owner, lastModifiedAt, workspaceId, objectId}) {
            this.name = name;
            this.owner = owner;
            this.lastModifiedAt = lastModifiedAt;
            this.workspaceId = workspaceId;
            this.objectId = objectId;
        }
    }

    function buildNarrativeInfo() {
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.title
            }, 'In narrative'),
            div({
                class: style.classes.cell
            }, a({
                target: '_blank',
                class: style.classes.cellElement,
                dataBind: {
                    text: 'name',
                    attr: {
                        href: '"/narrative/ws." + workspaceId + ".obj." + objectId'
                    }
                }
            })),
            div(a({
                target: '_blank',
                dataBind: {
                    text: 'owner',
                    attr: {
                        href: '"#people/" + owner'
                    }
                }
            })),
            div({
                dataBind: {
                    typedText: {
                        value: 'lastModifiedAt',
                        type: '"date"',
                        format: '"MMM D, YYYY"'
                    }
                }
            })
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