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

    class ViewModel {
        constructor({object}, context) {
            this.object = object;

            this.runtime = context.$root.runtime;
            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.id = null;
            this.description = null;
            this.domain = null;
            this.platform = null;
            this.sampleCount = null;
            this.replicateCount = null;
            this.source = null;
            this.libraryType = null;
            this.publicationId = null;
            this.externalSourceDate = null;
            this.conditionSetRef = null;
            this.condition = null;

            this.getObject()
                .then(() => {
                    this.ready(true);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                    this.error(err.message);
                });
        }

        getObject() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.object.objectInfo.ref,
                    included: [
                        'sampleset_id',
                        'sampleset_desc',
                        'domain',
                        'platform',
                        'num_samples',
                        'num_replicates',
                        'source',
                        'Library_type',
                        'publication_id',
                        'external_source_date',
                        'conditionset_ref',
                        'condition'
                    ]
                }],
                ignoreErrors: 1,
                no_data: 0
            }])
                .spread((result) => {
                    console.log('object data?', result);
                    const d = result.data[0].data;
                    this.id = d.sampleset_id;
                    this.description = d.sampleset_desc;
                    this.domain = d.domain;
                    this.platform = d.platform;
                    this.sampleCount = d.num_samples;
                    this.replicateCount = d.num_replicates;
                    this.source = d.source;
                    this.libraryType = d.Library_type;
                    this.publicationId = d.publication_id;
                    this.externalSourceDate = d.external_source_date;
                    this.conditionSetRef = d.conditionset_ref;
                    this.condition = d.condition;
                });
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

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
        },
        column: {
            css: {
                display: 'inline-block',
                width: '50%',
                verticalAlign: 'top'
            }
        },
        columnHeader: {
            css: {
                fontWeight: 'bold',
                color: '#333',
                margin: '10px 0 4px 0'
            }
        }
    });

    function buildSampleInfo() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('Sample Set ID'),
                td({
                    dataBind: {
                        text: 'id'
                    }
                })
            ]),
            tr([
                th('Sample Count'),
                td({
                    dataBind: {
                        text: 'sampleCount'
                    }
                })
            ]),
            tr([
                th('Replicate Count'),
                td({
                    dataBind: {
                        text: 'replicateCount'
                    }
                })
            ])
        ]);
    }

    function buildTaxonomy() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('Domain'),
                td({
                    dataBind: {
                        text: 'domain'
                    }
                })
            ])
        ]);
    }

    function buildSource() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('Source'),
                td({
                    dataBind: {
                        text: 'source'
                    }
                })
            ]),
            tr([
                th('Date'),
                td({
                    dataBind: {
                        text: 'externalSourceDate'
                    }
                })
            ]),
            tr([
                th('Library Type'),
                td({
                    dataBind: {
                        text: 'libraryType'
                    }
                })
            ]),
            tr([
                th('Platform'),
                td({
                    dataBind: {
                        text: 'platform'
                    }
                })
            ])
        ]);
    }

    function buildOverview() {
        return div([
            div({
                class: style.classes.column
            }, [
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Samples'),
                    buildSampleInfo()
                ]),

                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Source'),
                    buildSource()
                ])
            ]),
            div({
                class: style.classes.column
            }, [
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Taxonomy'),
                    buildTaxonomy()
                ]),
            ])
        ]);
    }

    function buildError() {
        return div({
            class: 'alert alert-danger',
            dataBind: {
                text: 'error'
            }
        });
    }

    function template() {
        return div({
            class: style.classes.component
        },
        gen.if('ready',
            buildOverview(),
            gen.if('error',
                buildError(),
                build.loading('Loading overview data'))
        ));
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