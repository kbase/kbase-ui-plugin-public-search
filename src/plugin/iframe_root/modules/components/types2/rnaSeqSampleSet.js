define([
    'kb_knockout/registry',
    'kb_lib/html',
    './builder'
], function (
    reg,
    html,
    builder
) {
    'use strict';

    class ViewModel extends builder.TypeComponentBase {
        constructor(params) {
            super(params);
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div');

    const spec = [{
        class: 'col1',
        content: [[
            {
                label: 'description',
                property: 'description'
            }
        ], [
            {
                label: 'source',
                property: 'source'
            }
        ]]
    }, {
        class: 'col1',
        content: [[
            {
                label: 'sample count',
                property: 'sampleCount'
            }
        ]]
    }];

    function template() {
        return div({
            class: builder.style.classes.component
        }, builder.build(spec));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: builder.style.sheet
        };
    }

    return reg.registerComponent(component);
});