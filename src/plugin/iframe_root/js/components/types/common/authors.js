define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        span = t('span'),
        div = t('div');

    class ViewModel {
        constructor(params) {
            const {authors} = params;

            this.authors = authors;
        }
    }

    function template() {
        return div({
            dataBind: {
                let: {
                    authorCount: 'authors.length'
                }
            }
        }, gen.foreach('authors', [
            span({
                dataBind: {
                    text: '$data'
                }
            }),
            gen.if('$index() < authorCount - 1', '; ')
        ]));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});