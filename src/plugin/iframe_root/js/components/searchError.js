define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    '../lib/ui',
    'kb_knockout/components/error'
], function (
    ko,
    reg,
    ViewModelBase,
    html,
    ui,
    ErrorComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {error} = params;

            this.error = error;

            // The parent will always be the overlay.
            this.parent = context.$parent;

            this.title = 'Search Error';

            this.source = ko.pureComputed(() => {
                if (!this.error()) {
                    return;
                }
                return this.error().source;
            });
            this.code = ko.pureComputed(() => {
                if (!this.error()) {
                    return;
                }
                return this.error().code;
            });
            this.message = ko.pureComputed(() => {
                if (!this.error()) {
                    return;
                }
                return this.error().message;
            });
            this.detail = ko.pureComputed(() => {
                if (!this.error()) {
                    return;
                }
                return this.error().detail;
            });
            this.info = ko.pureComputed(() => {
                if (!this.error()) {
                    return;
                }
                return this.error().info;
            });
            this.stackTrace = ko.pureComputed(() => {
                if (!this.error()) {
                    return;
                }
                return this.error().stackTrace;
            });
        }

        onClose() {
            this.parent.bus.send('close');
        }
    }

    function buildErrorViewer() {
        return div({
            dataBind: {
                component: {
                    name: ErrorComponent.quotedName(),
                    params: {
                        source: 'source',
                        code: 'code',
                        message: 'message',
                        detail: 'detail',
                        info: 'info',
                        stackTrace: 'stackTrace'
                    }
                }
            }
        });
    }

    function buildTitle() {
        return span({
            dataBind: {
                text: 'title'
            }
        });
    }

    function template() {
        return ui.buildDialog({
            type: 'error',
            title: buildTitle(),
            body: buildErrorViewer(),
            buttons: [
                {
                    label: 'Close',
                    // nb: established by the overlayPanel
                    onClick: 'function(){bus.send("close")}'
                }
            ]
        });
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});