define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_knockout/components/tabset',
    './history',
    './linksIn',
    './linksOut'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    TabsetComponent,
    HistoryComponent,
    LinksInComponent,
    LinksOutComponent
) {
    'use strict';

    class ViewModel extends ViewModelBase{
        constructor(params) {
            super(params);
            const {object} = params;

            this.object = object;

            this.tabs = [{
                tab: {
                    label: 'History'
                },
                panel: {
                    component: {
                        name: HistoryComponent.name(),
                        params: {
                            ref: 'object.objectInfo.ref'
                        }
                    }
                }
            }, {
                tab: {
                    label: 'Composition (links out)'
                },
                panel: {
                    component: {
                        name: LinksOutComponent.name(),
                        params: {
                            object: 'object'
                        }
                    }
                }
            }, {
                tab: {
                    label: 'Used by (links in)'
                },
                panel: {
                    component: {
                        name: LinksInComponent.name(),
                        params: {
                            ref: 'object.objectInfo.ref'
                        }
                    }
                }
            }];
        }
    }

    const t = html.tag,
        div = t('div');

    function buildTabs() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }
        }, [
            gen.component({
                name: TabsetComponent.name(),
                params: {
                    tabContext: '$component',
                    tabs: 'tabs',
                    bus: 'bus'
                }
            })
        ]);
    }

    function template() {
        return buildTabs();
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});