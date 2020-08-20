define([
    'knockout',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'utils',
    './components/main',
    './rootViewModel'
], function (
    ko,
    gen,
    html,
    utils,
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

        // renderLayout() {
        //     return div({
        //         style: {
        //             flex: '1 1 0px',
        //             overflow: 'auto',
        //             minHeight: '0px'
        //         }
        //     }, div(
        //         {
        //             class: 'container-fluid',
        //             style: {
        //                 width: '100%'
        //             },
        //             dataKBTesthookPlugin: 'public-search'
        //         },
        //         [
        //             div({ class: 'row' }, [
        //                 div({ class: 'col-md-8' }, [div({ id: widgetSet.addWidget('kb_dataview_jsonView') })]),
        //                 div({ class: 'col-md-4' }, [div({ id: widgetSet.addWidget('kb_dataview_jsonViewOverview') })])
        //             ])
        //         ]
        //     ));
        // }

        init() {
            this.runtime.send('ui', 'setTitle', 'KBase Data Search');
        }

        attach(node) {
            this.hostNode = node;
        }

        start(params) {

            // const {token, username, config, realname, email} = payload;
            // if (token) {
            //     this.authorization = {token, username, realname, email};
            // } else {
            //     this.authorization = null;
            // }
            // this.token = token;
            // this.username = username;
            // this.config = config;
            // this.authorized = token ? true : false;

            // this.runtime = new runtime.Runtime({config, token, username, realname, email});
            this.render(ko);

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

            // this.channel.on('loggedin', ({token, username, realname, email}) => {
            //     this.runtime.auth({token, username, realname, email});
            //     this.rootViewModel.authorized(true);
            //     this.rootViewModel.authorization({token, username, realname, email});
            //     // really faked for now.
            //     // this.runtime.service('session').
            // });

            // this.channel.on('loggedout', () => {
            //     this.runtime.unauth();
            //     this.rootViewModel.authorized(false);
            //     this.rootViewModel.authorization(null);
            // });

            // this.rootViewModel.bus.on('instrumentation', (payload) => {
            //     this.hostChannel.send('send-instrumentation', payload);
            // });

        }

        stop() {
            return null;
        }

        detach() {
            return null;
        }
    }

    return MainView;
});
