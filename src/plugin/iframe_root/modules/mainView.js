define([
    'knockout',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    './components/main',
    './rootViewModel'
], function (
    ko,
    gen,
    html,
    MainComponent,
    RootViewModel
) {
    'use strict';

    const t = html.tag;
    const div = t('div');

    class MainView {
        constructor({ runtime }) {
            this.runtime = runtime;
        }

        render(ko, params) {
            const authorized = this.runtime.service('session').isAuthenticated();
            const authorization = this.runtime.service('session').getAuthentication();

            this.rootViewModel = new RootViewModel({
                runtime: this.runtime,
                authorized: authorized,
                authorization: authorization,
                pluginParams: params
            });
            this.container.innerHTML = div({
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'column'
                }
            }, gen.if('ready',
                gen.component({
                    name: MainComponent.name(),
                    params: {
                        runtime: 'runtime',
                        bus: 'bus',
                        authorization: 'authorization',
                        pluginParams: 'pluginParams'
                    }
                })));
            ko.applyBindings(this.rootViewModel, this.container);
        }

        init() {
            this.runtime.send('ui', 'setTitle', 'KBase Data Search');
        }

        attach(node) {
            this.hostNode = node;
            this.container = node.appendChild(document.createElement('div'));
            this.container.style.display = 'flex';
            this.container.style.flex = '1 1 0px';
            this.container.style['flex-direction'] = 'column';
        }

        start(params) {
            this.render(ko, params);

            // TODO: revive me?
            // this.rootViewModel.bus.on('set-plugin-params', ({pluginParams}) => {
            //     this.hostChannel.send('set-plugin-params', {pluginParams});
            // });

            // this.channel.on('show-help', () => {
            //     this.showHelp();
            // });

            this.runtime.receive('session', 'loggedin', ({ token, username, realname }) => {
                this.rootViewModel.authorized(true);
                this.rootViewModel.authorization({ token, username, realname });
            });

            this.runtime.receive('session', 'loggedout', () => {
                this.rootViewModel.authorized(false);
                this.rootViewModel.authorization(null);
            });
        }

        stop() {
            return null;
        }

        detach() {
            if (this.container && this.hostNode) {
                this.hostNode.removeChild(this.container);
            }
        }
    }

    return MainView;
});
