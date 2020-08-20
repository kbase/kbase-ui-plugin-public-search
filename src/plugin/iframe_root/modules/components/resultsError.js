define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html'
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
        hr = t('hr'),
        button = t('button');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            const {table} = params;

            this.errorMessage = table.errorMessage();
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
            p('Error running your search!'),
            hr({style: {width: '50%'}}),
            p({
                dataBind: {
                    text: 'errorMessage'
                }
            }),
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
                        click: 'function(){bus.send("showError")}'
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