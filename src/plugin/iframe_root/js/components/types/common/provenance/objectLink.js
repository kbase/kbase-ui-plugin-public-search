define([
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    reg,
    gen,
    html
) {
    'use strict';

    class ViewModel {
        constructor(params) {
            this.name = params.name;
            this.ref = params.ref;
        }
    }

    // VIEW

    const t = html.tag,
        a = t('a');

    function template() {
        return a({
            dataBind: {
                text: 'name',
                attr: {
                    href: '"/#dataview/" + ref'
                }
            },
            target: '_blank'
        });
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});