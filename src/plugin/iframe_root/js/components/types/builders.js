define([
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../container/container',
    './common/wikipediaImage'
], function (
    gen,
    html,
    build,
    ContainerHeaderComponent,
    WikipediaImageComponent
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

    return {buildHeader};
});