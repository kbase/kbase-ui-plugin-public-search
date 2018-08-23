define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html',
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    class ViewModel {
        constructor({ref}, context) {
            this.ref = ref;

            this.runtime = context.$root.runtime;

            this.loading = ko.observable(true);

            this.type = ko.observable();
            // this.referenceTypes = ko.observable();
            // this.kbaseID = ko.observable();
            // this.description = ko.observable();

            this.getOverviewInfo()
                .then(() => {
                    this.loading(false);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                });
        }

        getOverviewInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
            return workspace.callFunc('get_object_subset', [[{
                ref: this.ref,
                included: [
                    'type'
                ]
            }]])
                .spread(([objectData]) => {
                    this.type(objectData.data.type);
                    // this.referenceTypes(objectData.data.ref_type);
                    // this.kbaseID(objectData.data.kbase_id);
                    // this.description(objectData.data.tree.description);
                    this.loading(false);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                });
        }
    }

    const styles = html.makeStyles({
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
        return table({
            class: styles.classes.table
        }, [
            tr([
                th('Type'),
                td({
                    dataBind: {
                        text: 'type'
                    }
                })
            ]),
            tr([
                th('Count'),
                td({
                    dataBind: {
                        text: 'type'
                    }
                })
            ]),
            // tr([
            //     th('Description'),
            //     td({
            //         dataBind: {
            //             text: 'description'
            //         }
            //     })
            // ]),
            // tr([
            //     th('KBase ID'),
            //     td({
            //         dataBind: {
            //             text: 'kbaseID'
            //         }
            //     })
            // ]),
            // tr([
            //     th('Reference Types'),
            //     td({
            //         dataBind: {
            //             text: 'referenceTypes'
            //         }
            //     })
            // ])
            // tr([
            //     th('Lineage'),
            //     td({
            //         dataBind: {
            //             component: {
            //                 name: LineageComponent.quotedName(),
            //                 params: {
            //                     lineage: 'lineage'
            //                 }
            //             }
            //         }
            //     })
            // ]),
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        },
        gen.if('loading',
            html.loading('Loading overview data'),
            buildOverview()));
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});