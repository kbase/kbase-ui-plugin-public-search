define([
    'knockout',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/httpUtils',
    './components/main',
    './lib/model',
    './viewModel'
], function (
    ko,
    gen,
    html,
    httpUtils,
    MainComponent,
    model,
    ViewModel
) {
    'use strict';

    ko.options.deferUpdates = true;

    const t = html.tag,
        div = t('div');

    function layoutNode() {
        const markup = div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            gen.component({
                name: MainComponent.name(),
                params: {
                    bus: 'bus'
                }
            })
        ]);
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

        googleFormLink(arg) {
            const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScfZEQlO2Zq1ZgYQkn0pEIlXJapEOxrdeZmHY4PqvIyy7sugw/viewform';
            const query = {
                usp: 'pp_url',
                'entry.45112532': arg.username,
                'entry.1257375807': arg.realname,
                'entry.1670959681': arg.email,
                'entry.250050267': arg.subject
            };
            console.log('query?', query);
            return baseUrl + '?' + httpUtils.encodeQuery(query);
        }

        showFeedback() {
            const fields = {
                username: this.runtime.service('session').getUsername() || '',
                realname: this.runtime.service('session').getRealname() || '',
                email: this.runtime.service('session').getEmail() || '',
                subject: 'Public Search'
            };
            window.open(this.googleFormLink(fields), '_blank');
        }

        showHelp() {
            this.vm.bus.send('help');
        }

        attach(node) {
            this.hostNode = node;
            this.container = layoutNode();
            this.hostNode.appendChild(this.container);
        }

        start() {
            this.runtime.send('ui', 'setTitle', 'Search Public Data');
            ko.applyBindings(this.vm, this.container);
            this.runtime.send('ui', 'addButton', {
                name: 'feedback',
                label: 'Feedback',
                style: 'default',
                icon: 'bullhorn',
                toggle: false,
                params: {
                    // ref: objectInfo.ref
                },
                callback: () => {
                    this.showFeedback();
                }
            });

            this.runtime.send('ui', 'addButton', {
                name: 'help',
                label: 'Help',
                style: 'default',
                icon: 'question-circle',
                toggle: false,
                params: {
                    // ref: objectInfo.ref
                },
                callback: () => {
                    this.showHelp();
                }
            });
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