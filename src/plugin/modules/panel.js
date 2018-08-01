define([
    'knockout',
    'kb_common/html',
    './components/main',
    './lib/model',
    './viewModel'
], function (
    ko,
    html,
    MainComponent,
    model,
    ViewModel
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    function layoutNode() {
        const markup = div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            },
            dataBind: {
                component: {
                    name: MainComponent.quotedName(),
                    params: {

                    }
                }
            }
        });
        const d = document.createElement('div');
        d.innerHTML = markup;
        return d.firstChild;
    }

    class Widget {
        constructor(config) {
            this.runtime = config.runtime;
            this.hostNode = null;
            this.container = null;
            this.vm = new ViewModel({
                runtime: this.runtime
            });
        }

        attach(node) {
            this.hostNode = node;
            this.container = layoutNode();
            this.hostNode.appendChild(this.container);
        }

        start() {
            this.runtime.send('ui', 'setTitle', 'Public Search');
            ko.applyBindings(this.vm, this.container);
        }

        stop() {
            // nothing to do ... yet.
        }

        detach() {
            if (this.hostNode && this.container) {
                this.hostNode.removeChild(this.container);
            }
        }
    }

    return Widget;
});