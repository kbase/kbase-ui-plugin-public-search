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

            this.contigs = ko.observableArray(),
            this.genes = ko.observableArray();
            this.selectedContig = ko.observable();

            this.subscribe(this.selectedContig, (newValue) => {
                this.getGenesForContig(newValue);
            });

            this.getGenome();
            this.getAllFeatures();
        }

        doSelectContig(data) {
            console.log('selecting ', data);
            this.selectedContig(data.id);
        }

        getGenome() {
            const workspace = new GenericClient({
                module: 'Workspace',
                url: this.runtime.config('services.workspace.url'),
                timeout: 10000,
                token: this.token()
            });

            // feature id filters: https://github.com/kbase/genome_annotation_api/blob/master/GenomeAnnotationAPI.spec#L34
            // get features with filter: get_feature_ids https://github.com/kbase/genome_annotation_api/blob/master/GenomeAnnotationAPI.spec#L301
            // get_features: https://github.com/kbase/genome_annotation_api/blob/master/GenomeAnnotationAPI.spec#L319
            // get_features2: https://github.com/kbase/genome_annotation_api/blob/master/GenomeAnnotationAPI.spec#L338

            // see https://ci.kbase.us/#spec/type/KBaseGenomes.Genome-14.2
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.ref,
                    included: [
                        'contig_ids', 'contig_lengths'
                    ]
                }],
                // ignoreErrors: 1,
                no_data: 0
            }])
                .spread((result) => {
                    console.log('got', result);
                    const genomeInfo = result.data[0];
                    if (!genomeInfo) {
                        throw new Error('Could not get contigs for this genome');
                    }
                    const contigIDs = genomeInfo.data.contig_ids;
                    const contigLengths = genomeInfo.data.contig_lengths;
                    const contigs = contigIDs.map((contigID, index) => {
                        return {
                            id: contigID,
                            length: contigLengths[index]
                        };
                    });
                    this.contigs(contigs);
                })
                .catch((err) => {
                    console.error('error', err);
                });
        }

        getAllFeatures() {
            const genomeAnnotationAPI = new DynamicServiceClient({
                module: 'GenomeAnnotationAPI',
                url: this.runtime.config('services.ServiceWizard.url'),
                token: this.token()
            });
            const featureIDs = ['RSP_0002', 'RSP_0003'];
            return genomeAnnotationAPI.callFunc('get_features2', [
                {
                    ref: this.ref,
                    exclude_sequence: 1,
                    feature_id_list: featureIDs
                }
            ])
                .then((result) => {
                    console.log('got features?', result);
                })
                .catch((err) => {
                    console.error('Error', err);
                });
        }

        getGenesForContig(contigID) {
            const genomeAnnotationAPI = new DynamicServiceClient({
                module: 'GenomeAnnotationAPI',
                url: this.runtime.config('services.ServiceWizard.url'),
                token: this.token()
            });
            console.log('getting feature ids for ', contigID);
            return genomeAnnotationAPI.callFunc('get_feature_ids', [
                {
                    ref: this.ref,
                    filters: {
                        region_list: [
                            {
                                contig_id: contigID,
                                strand: '+'
                            },
                            {
                                contig_id: contigID,
                                strand: '-'
                            }
                        ]
                    }
                }
            ])
                .then((result) => {
                    console.log('got feature ids?', result);
                })
                .catch((err) => {
                    console.error('Error', err);
                });
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

    function buildContigs() {
        return div({
            class: style.classes.contigsTable,
            dataBind: {
                foreach: 'contigs'
            }
        }, [
            div({
                class: style.classes.contigsRow,
                dataBind: {
                    click: 'function(d){$component.doSelectContig.call($component,d)}'
                }
            }, [
                div({
                    class: '-col1',
                    dataBind: {
                        text: 'id'
                    }
                }),
                div({
                    class: '-col2',
                    dataBind: {
                        typedText: {
                            value: 'length',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                })
            ])
        ]);
    }

    function buildGenes() {
        return div({
            class: style.classes.genesTable,
            dataBind: {
                foreach: 'genes'
            }
        }, [
            div({
                class: style.classes.genesRow
            }, [
                // div({
                //     class: '-col1',
                //     dataBind: {
                //         text: 'id'
                //     }
                // }),
                // div({
                //     class: '-col2',
                //     dataBind: {
                //         typedText: {
                //             value: 'length',
                //             type: '"number"',
                //             format: '"0,0"'
                //         }
                //     }
                // })
            ])
        ]);
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.contigColumn
            },  [
                div({
                    class: style.classes.columnHeader
                }, 'Contigs'),
                gen.if('contigs', buildContigs(), builders.loading())
            ]),
            div({
                class: style.classes.genesColumn
            }, [
                div({
                    class: style.classes.columnHeader
                }, gen.if('selectedContig()', [
                    'Genes for contig ',
                    span({
                        dataBind: {
                            text: 'selectedContig'
                        }
                    })
                ], 'Please select a contig to view its associated genes')),
                buildGenes()
            ])
        ]);
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