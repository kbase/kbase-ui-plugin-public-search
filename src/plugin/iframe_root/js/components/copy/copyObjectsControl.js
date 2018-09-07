define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html'
], function (
    ko,
    reg,
    ViewModelBase,
    html
) {
    'use strict';

    var t = html.tag,
        button = t('button'),
        span = t('span'),
        div = t('div');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {selectedObjects} = params;
            this.selectedObjects = selectedObjects;

            // TODO: add isAuthorized, established at the root.

            // this.showOverlay = showOverlay;

            this.buttonTitle = ko.pureComputed(() => {
                if (this.selectedObjects().length > 0) {
                    return 'Click me to open a window allowing you to copy the objects you have selected';
                } else {
                    return 'When you have selected objects (via the checkbox to the left of them), clicking me will allow you to copy them';
                }
            });
        }

        doCopyObjects() {
            this.sendToParent('show-copy-objects');
        }
    }

    // div({
    //     class: 'btn btn-default',
    //     dataBind: {
    //         click: 'function(d,e){$component.showFeedback.call($component,d,e);}'
    //     }
    // }, [
    //     span({
    //         class: 'fa fa-bullhorn'
    //     }),
    //     ' Feedbackx'
    // ]),

    function buildCopyButton() {
        return button({
            class: 'btn',
            dataBind: {
                click: 'doCopyObjects',
                enable: 'selectedObjects().length > 0',
                class: 'selectedObjects().length === 0 ? "btn-default" : "btn-primary"',
                attr: {
                    title: 'buttonTitle'
                }
            }
        }, [
            span({
                class: 'fa fa-clone',
                // style: {
                //     marginRight: '6px'
                // }
            }),
            ' Copy Selected...'
        ]);
    }

    function template() {
        return buildCopyButton();
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});