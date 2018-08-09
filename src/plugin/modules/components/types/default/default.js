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
        constructor() {
            this.loading = ko.observable(false);
        }
    }

    function buildOverview() {
        return 'default viewer';
    }

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        gen.if('loading',
            html.loading('Loading viewer'),
            buildOverview()));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});