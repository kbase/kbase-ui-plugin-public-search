define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html',
    '../metadata'
], function (
    ko,
    reg,
    gen,
    html,
    MetadataComponent
) {
    'use strict';

    const t = html.tag,
        p = t('p'),
        span = t('span'),
        div = t('div');

    class ViewModel {
        constructor({object}, context) {
            this.object = object;

            this.runtime = context.$root.runtime;

            this.loading = ko.observable(true);

            this.loading(false);
        }
    }

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }
        },
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px',
                    verticalAlign: 'top'
                },
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(200,200,200,1)',
                    textAlign: 'left',
                    padding: '4px',
                    verticalAlign: 'top'
                },
                'td:nth-child(1)': {
                    width: '10em'
                },
                'th:nth-child(1)': {
                    width: '10em'
                }

            }
        },
        sectionHeader: {
            css: {
                fontWeight: 'bold',
                fontSize: '110%',
                color: 'rgba(100,100,100,1)',
                marginTop: '8px'
            }
        }
    });

    function buildOverview() {
        return div([
            p([
                'This object of type ',
                span({
                    style: {
                        fontWeight: 'bold'
                    },
                    dataBind: {
                        text: 'object().objectInfo.typeName'
                    }
                }),
                ' does not have a specific visualizer.'
            ]),
            p([
                'To view additional information about this object, visit its Landing Page by clicking on the title above, ',
                'or the "View" button at the bottom of this window.'
            ]),
            div({
                class: style.classes.sectionHeader
            }, 'Metadata'),
            div({
                dataBind: {
                    component: {
                        name: MetadataComponent.quotedName(),
                        params: {
                            metadata: 'object().objectInfo.metadata'
                        }
                    }
                }
            })
        ]);
    }

    function template() {
        return div({
            class: style.classes.component
        },
        gen.if('loading',
            html.loading('Loading overview data'),
            buildOverview()));
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