define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    '../lib/ui'
], function (
    ko,
    reg,
    ViewModelBase,
    html,
    ui
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            // const {error} = params;

            // this.error = error;

            // // The parent will always be the overlay.
            this.parent = context.$parent;

            // this.title = 'Search Error';

            // this.source = ko.pureComputed(() => {
            //     if (!this.error()) {
            //         return;
            //     }
            //     return this.error().source;
            // });
            // this.code = ko.pureComputed(() => {
            //     if (!this.error()) {
            //         return;
            //     }
            //     return this.error().code;
            // });
            // this.message = ko.pureComputed(() => {
            //     if (!this.error()) {
            //         return;
            //     }
            //     return this.error().message;
            // });
            // this.detail = ko.pureComputed(() => {
            //     if (!this.error()) {
            //         return;
            //     }
            //     return this.error().detail;
            // });
            // this.info = ko.pureComputed(() => {
            //     if (!this.error()) {
            //         return;
            //     }
            //     return this.error().info;
            // });
            // this.stackTrace = ko.pureComputed(() => {
            //     if (!this.error()) {
            //         return;
            //     }
            //     return this.error().stackTrace;
            // });
        }

        onClose() {
            this.parent.bus.send('close');
        }
    }

    function buildFeedbackForm() {
        return div(
            'Feedback form here...'
        );
    }

    function template() {
        return div(buildFeedbackForm());
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});