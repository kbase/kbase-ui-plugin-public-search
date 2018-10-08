define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    './types2/controller'
], function (
    ko,
    reg,
    gen,
    html,
    TypeController
) {
    'use strict';

    class ViewModel {
        constructor({row}) {
            this.row = row;
            this.type = row.data.type.value;
            this.componentName = TypeController.typeToComponent(this.type).name();
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div');

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                margin: '0px 4px 10px 50px',
                padding: '4px',
                border: '1px silver solid',
                borderRadius: '4px',
                boxShadow: '4px 4px 4px rgba(200,200,200,0.5)'
            }
        }
    });

    function template() {
        return div({
            class: style.classes.component,
            dataBind: {
                component: {
                    name: 'componentName',
                    params: {
                        row: 'row'
                    }
                }
            }
        });
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});