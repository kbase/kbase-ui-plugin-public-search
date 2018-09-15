define([
    'module',
    './iframer'
], function (
    module,
    Iframer
) {
    'use strict';

    // The module url includes the initial / and, so we start after that,
    // and we also remove this file and the modules directory.
    const pluginPath = module.uri.split('/').slice(1, -2).join('/');

    class Panel {
        constructor(config) {
            this.runtime = config.runtime;
            this.iframer = null;
            this.hostNode = null;
            this.container = null;
        }

        attach(node) {
            this.hostNode = node;
            this.container = node.appendChild(document.createElement('div'));
            this.container.style.flex = '1 1 0px';
            this.container.style.display = 'flex';
            this.container.style['flex-direction'] = 'column';
        }

        start() {
            this.iframer = new Iframer({
                runtime: this.runtime,
                node: this.container,
                pluginPath: pluginPath
            });

            this.runtime.send('ui', 'setTitle', 'KBase Search');

            return this.iframer.start();
        }

        stop() {
            if (this.hostNode && this.container) {
                this.hostNode.removeChild(this.container);
            }
            if (this.iframer) {
                return this.iframer.stop();
            }
        }
    }
    return Panel;
});
