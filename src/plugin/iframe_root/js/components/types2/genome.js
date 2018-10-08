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

    class ViewModel {
        constructor({row}) {
            this.row = row;
            const obj = row.data.detail.searchObject;

            this.domain = obj.data.domain;
            this.scientificName = obj.data.scientific_name;
            this.contigCount = obj.data.num_contigs;
            this.featureCount = obj.data.features;
            this.source = obj.data.source;
            this.sourceId = obj.data.source_id;
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