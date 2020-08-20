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
                label: 'compartments',
                property: 'compartments'
            }, {
                label: 'compounds',
                property: 'compounds'
            }, {
                label: 'reactions',
                property: 'reactions'
            }
        ], [
            {
                label: 'scientific name',
                property: 'scientificName'
            }
        ]]
    }, {
        class: 'col1',
        content: [[{
            label: 'KBase ID',
            property: 'id'
        }], [{
            label: 'source',
            property: 'source'
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