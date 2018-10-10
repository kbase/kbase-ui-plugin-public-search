define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    './builder'
], function (
    ko,
    reg,
    gen,
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
                label: 'sequencing technology',
                property: 'sequencingTechnology'
            }
        ], [
            {
                label: 'phred type',
                property: 'phredType'
            },
            {
                label: 'mean quality score',
                property: 'meanQualityScore'
            }
        ]]
    }, {
        class: 'col1',
        content: [[
            {
                label: 'gc content',
                property: 'gcContent',
                type: 'number',
                format: '0.0%'
            }
        ], [
            {
                label: 'reads',
                property: 'readCount',
                type: 'number',
                format: '0,0'
            },
            {
                label: 'read mean length',
                property: 'readMeanLength',
                type: 'number',
                format: '0,0'
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