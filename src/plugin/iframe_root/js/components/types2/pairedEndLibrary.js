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
            this.gcContent = obj.data.gc_content;
            this.insertMeanSize = obj.data.insert_size_mean;
            this.phredType = obj.data.phred_type;
            this.meanQualityScore = obj.data.qual_mean;
            this.readCount = obj.data.read_count;
            this.readMeanLength = obj.data.read_length_mean;
            this.sequencingTechnology = obj.data.sequencing_tech;
            this.libraryFiles = obj.data.lib1;
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
            },
            {
                label: 'insert mean size',
                property: 'insertMeanSize',
                type: 'number',
                format: '0,0'
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