define([
    'knockout',
    'kb_lib/html',
    './components/test/perf'
], function (
    ko,
    html,
    PerfComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    class Widget {
        constructor({runtime}) {
            this.runtime = runtime;
            this.hostNode = null;
            this.container = null;

            this.searchAPI = runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: false
            });
        }

        // LIFECYCLE API

        attach(node) {
            this.hostNode = node;
            this.container = node.appendChild(document.createElement('div'));
        }

        start() {
            this.container.innerHTML = div({
                style: {
                    margin: '10px'
                }
            }, [
                div({
                    dataBind: {
                        component: {
                            name: PerfComponent.quotedName(),
                            params: {}
                        }
                    }
                })
            ]);
            const vm = {
                runtime: this.runtime
            };
            ko.applyBindings(vm, this.container);
        }

        stop() {
            //nothing yet...
        }

        detach() {
            if (this.hostNode && this.container) {
                this.hostNode.removeChild(this.container);
            }
        }
    }

    return Widget;
});