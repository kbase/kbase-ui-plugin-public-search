define([
    'kb_knockout/registry',
    'kb_lib/html'
], function (
    reg,
    html
) {
    'use strict';

    const t = html.tag,
        a = t('a');

    class ViewModel {
        constructor({text, id}) {
            this.text = text;
            this.id = id;
        }
    }

    function template() {
        return a({
            dataBind: {
                html: 'text',
                attr: {
                    href: '"https://www.ncbi.nlm.nih.gov/pubmed/" + id'
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