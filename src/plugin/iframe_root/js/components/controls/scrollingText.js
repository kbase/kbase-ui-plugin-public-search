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

    class ViewModel {
        constructor({text, maxHeight}) {
            this.text = text;
            this.maxHeight = maxHeight;
        }
    }

    const t = html.tag,
        div = t('div');

    const styles = html.makeStyles({
        component: {
            css: {
                overflowY: 'auto'
            }
        }
    });

    function template() {
        return div({
            class: styles.classes.component,
            dataBind: {
                text: 'text',
                style: {
                    'max-height': 'maxHeight'
                }
            }
        });
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});