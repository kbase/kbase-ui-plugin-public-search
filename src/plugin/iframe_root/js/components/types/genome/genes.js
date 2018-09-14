define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_lib/jsonRpc/genericClient',
    'kb_lib/jsonRpc/dynamicServiceClient'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    builders,
    GenericClient,
    DynamicServiceClient
) {
    'use strict';

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {ref} = params;
            this.ref = ref;
            this.runtime = context.$root.runtime;
            this.token = ko.pureComputed(() => {
                const auth = context.$root.authorization();
                if (!auth) {
                    return null;
                }
                return auth.token;
            });

            this.searchTerm = ko.observable();

            this.getGenes();
        }

        getGenes() {
            return false;
        }

        
    }

    const t = html.tag,
        div = t('div'),
        span = t('span');

    const style = html.makeStyles({
        component: {
            css: {
                display: 'flex',
                flexDirection: 'row'
            }
        },
        columnHeader: {
            css: {
                fontWeight: 'bold',
                color: '#CCC',
                margin: '10px 0 6px 0'
            }
        },
        contigColumn: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        genesColumn: {
            css: {
                flex: '3 3 0px'
            }
        },
        contigsTable: {
            css: {
                // flex: '1 1 0px',
                overflowY: 'auto',
                border: '1px red solid'
            }
        },
        contigsRow: {
            css: {
                display: 'flex',
                flexDirection: 'row',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    'background-color': 'rgba(200,200,200,1)'
                }
            },
            inner: {
                '.-col1': {
                    flex: '2 1 0px'
                },
                '.-col2': {
                    flex: '1 1 0px',
                    'text-align': 'right'
                }
            }
        },
        genesTable: {
            css: {
                // flex: '1 1 0px',
                overflowY: 'auto',
                border: '1px red solid'
            }
        },
        genesRow: {
            css: {
                display: 'flex',
                flexDirection: 'row',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    'background-color': 'rgba(200,200,200,1)'
                }
            },
            inner: {
                '.-col1': {
                    flex: '2 1 0px'
                },
                '.-col2': {
                    flex: '1 1 0px',
                    'text-align': 'right'
                }
            }
        },
    });

   

    function template() {
        return div('this page will show a gene browser for this genome.');
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});