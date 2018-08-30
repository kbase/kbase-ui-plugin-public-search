define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders'
], function (
    ko,
    reg,
    gen,
    html,
    build
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
            this.ready = ko.observable(true);

            // this.getOverviewInfo();
        }

    //     getOverviewInfo() {
    //         const workspace = this.runtime.service('rpc').makeClient({
    //             module: 'Workspace',
    //             timeout: 10000,
    //             authorization: false
    //         });
    //         // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
    //         // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
    //         workspace.callFunc('get_object_subset', [[{
    //             ref: this.ref,
    //             included: [
    //                 'scientific_name',
    //                 'scientific_lineage',
    //                 'rank',
    //                 'domain',
    //                 'kingdom',
    //                 'aliases',
    //                 'genetic_code'
    //             ]
    //         }]])
    //             .spread(([objectData]) => {
    //                 // console.log('taxon object data...', objectData);
    //                 this.scientificName(objectData.data.scientific_name);
    //                 this.rank(objectData.data.rank);
    //                 this.domain(objectData.data.domain);
    //                 this.kingdom(objectData.data.kingdom);
    //                 this.geneticCode(objectData.data.genetic_code);
    //                 this.aliases(objectData.data.aliases);
    //                 this.loading(false);
    //                 // this.scientificName(objectData.data.scientific_name);
    //                 const lineage = objectData.data.scientific_lineage;
    //                 if (lineage) {
    //                     let lineageList;
    //                     if (lineage.indexOf(';') !== -1) {
    //                         lineageList = lineage.split(';');
    //                     } else {
    //                         lineageList = lineage.split(',');
    //                     }
    //                     this.lineage(lineageList);
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.error('ERROR', err);
    //             });
    //     }
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
                th('Something'),
                td({
                    // dataBind: {
                    //     text: 'scientificName'
                    // }
                }, 'Here')
            ]),
            // tr([
            //     th('Rank'),
            //     td({
            //         dataBind: {
            //             text: 'rank'
            //         }
            //     })
            // ]),
            // tr([
            //     th('Kingdom'),
            //     td({
            //         dataBind: {
            //             text: 'kingdom'
            //         }
            //     })
            // ]),
            // tr([
            //     th('Domain'),
            //     td({
            //         dataBind: {
            //             text: 'domain'
            //         }
            //     })
            // ]),
            // tr([
            //     th('Genetic Code'),
            //     td({
            //         dataBind: {
            //             text: 'geneticCode'
            //         }
            //     })
            // ]),
            // tr([
            //     th('Aliases'),
            //     td({
            //         dataBind: {
            //             foreach: 'aliases'
            //         }
            //     }, div({
            //         dataBind: {
            //             text: '$data'
            //         }
            //     }))
            // ]),
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
        gen.if('ready',
            buildOverview(),
            build.loading('Loading overview data')
        ));
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