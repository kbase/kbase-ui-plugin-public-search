define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    class ViewModel {
        constructor({object}) {
            this.object = object;
        }
    }

    function template() {
        return div(gen.switch('object().workspaceType', [
            ['"narrative"',
                'Narrative'],
            ['"refdata"',
                'Reference Data'],
            ['"unknown"',
                'Unknown Workspace']
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