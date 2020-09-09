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
        constructor({object}, context) {
            this.ref = object.objectInfo.ref;
            this.runtime = context.$root.runtime;
            this.ready = ko.observable(false);
            this.error = ko.observable(false);

            this.name = ko.observable();
            this.genomeCount = ko.observable();
            this.orthologCount = ko.observable();

            this.getOverviewInfo();
        }

        getOverviewInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.ref
                }]
            }])
                .then(([result]) => {
                    const object = result.data[0];
                    this.name(object.data.name);
                    this.genomeCount(object.data.genome_refs.length);
                    this.orthologCount(object.data.orthologs.length);
                    this.ready(true);
                })
                .catch((err) => {
                    this.error(err.message);
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
                th('Name'),
                td({
                    dataBind: {
                        text: 'name'
                    }
                })
            ]),
            tr([
                th('Genomes'),
                td({
                    dataBind: {
                        text: 'genomeCount'
                    }
                })
            ]),
            tr([
                th('Genomes'),
                td({
                    dataBind: {
                        text: 'orthologCount'
                    }
                })
            ])
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