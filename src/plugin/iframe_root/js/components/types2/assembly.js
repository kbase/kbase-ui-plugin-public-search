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

            // Note: Narrative data is removed due to size of narrative data.
            this.contigCount = obj.data.contigs;
            this.dnaSize = obj.data.dna_size;
            this.gcContent = obj.data.gc_content;
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div');

    const spec = [{
        class: 'col1',
        content: [[
            {
                label: 'contigs',
                property: 'contigCount',
                type: 'number',
                format: '0,0'
            },
            {
                label: 'dna size',
                property: 'dnaSize',
                type: 'number',
                format: '0,0'
            }
        ], [{
            label: 'gc content',
            property: 'gcContent',
            type: 'number',
            format: '0.0%'
        }]]
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