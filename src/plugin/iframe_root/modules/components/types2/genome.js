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

    const spec = [
        {
            class: 'col2',
            content:  [
                [{
                    label: 'domain',
                    property: 'domain'
                }, {
                    label: 'scientific name',
                    property: 'scientificName'
                }],
                [{
                    label: 'contigs',
                    property: 'contigCount'
                }, {
                    label: 'features',
                    property: 'featureCount'
                }]
            ]
        }, {
            class: 'col1',
            content: [
                [{
                    label: 'source',
                    property: 'source'
                }, {
                    label: 'id',
                    property: 'sourceId'
                }]
            ]
        }
    ];

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