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
            this.isDefined = obj.data.isDefined;
            this.isMinimal = obj.data.isMinimal;
            this.compoundCount = obj.data.mediacompounds;
            this.name = obj.data.name;
            this.type = obj.data.type;
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div');

    const spec = [{
        class: 'col1',
        content: [[
            {
                label: 'name',
                property: 'name'
            }
        ], [
            {
                label: 'id',
                property: 'id'
            }, {
                label: 'type',
                property: 'type'
            }
        ]]
    }, {
        class: 'col1',
        content: [[
            {
                label: 'is minimal?',
                property: 'isMinimal',
                type: 'boolean',
                format: 'true,false'
            },
            {
                label: 'is defined?',
                property: 'isDefined',
                type: 'boolean',
                format: 'true,false'
            }
        ], [
            {
                label: 'compound count',
                property: 'compoundCount'
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