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

    class ViewModel {
        constructor({row}) {
            this.row = row;
            const obj = row.data.detail.searchObject;

            this.id = obj.data.id;
            this.name = obj.data.name;
            this.compartments = obj.data.modelcompartments;
            this.compounds = obj.data.modelcompounds;
            this.reactions = obj.data.modelreactions;
            this.source = obj.data.source;
            this.type = obj.data.type;

            this.scientificName = obj.key_props.scientific_name;
            this.lineage = obj.key_props.taxonomy;
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
            // {
            //     label: 'lineage',
            //     property: 'lineage'
            // }
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