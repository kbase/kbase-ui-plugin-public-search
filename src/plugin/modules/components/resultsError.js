define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        p = t('p'),
        button = t('button');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
        }
    }

    function template() {
        return div({
            class: 'alert alert-danger',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                padding: '20px'
            }
        }, [
            'Error running your search!',
            p({
                style: {
                    marginTop: '10px',
                    textAlign: 'center'
                }
            }, [
                button({
                    class: 'btn btn-default',
                    // this should propagate up, if all of the
                    // ancestor components are based on ViewModelBase
                    dataBind: {
                        click: 'function() {bus.send("showError")}'
                    }
                }, 'Show Error')
            ])
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});