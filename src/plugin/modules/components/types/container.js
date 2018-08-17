define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html',
    '../containerTypes/narrative',
    '../containerTypes/refdata',
    '../containerTypes/unknown'
], function (
    ko,
    reg,
    gen,
    html,
    NarrativeComponent,
    RefdataComponent,
    UnknownComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    const styles = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }
        }
    });

    class ViewModel {
        constructor({object}) {
            this.object = object;
        }
    }

    function template() {
        return div({
            class: styles.classes.component
        }, gen.switch('object().workspaceType', [
            ['"narrative"',
                gen.component({
                    name: NarrativeComponent.name(),
                    params: {
                        name: 'object().workspaceInfo.metadata.narrative_nice_name',
                        owner: 'object().workspaceInfo.owner',
                        lastModifiedAt: 'object().workspaceInfo.modDate',
                        workspaceId: 'object().workspaceInfo.id',
                        objectId: 'object().objectInfo.id'
                    }
                })],
            ['"refdata"',
                gen.component({
                    name: RefdataComponent.name(),
                    params: {
                        source: 'object().objectInfo.metadata.Source',
                        sourceID: 'object().objectInfo.metadata["Source ID"]',
                        owner: 'object().workspaceInfo.owner',
                        lastModifiedAt: 'object().workspaceInfo.modDate',
                        workspaceId: 'object().workspaceInfo.id',
                        objectId: 'object().objectInfo.id'
                    }
                })],
            ['"unknown"',
                gen.component({
                    name: UnknownComponent.name(),
                    params: {
                        name: 'object().workspaceInfo.name',
                        owner: 'object().workspaceInfo.owner',
                        lastModifiedAt: 'object().workspaceInfo.modDate',
                        workspaceId: 'object().workspaceInfo.id',
                        objectId: 'object().objectInfo.id'
                    }
                })]
        ]));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});