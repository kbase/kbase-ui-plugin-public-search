define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    '../../../table2'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    TableComponent
) {
    'use strict';

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {genomeRef, selectedContig, contigsCount} = params;
            this.genomeRef = genomeRef;
            this.runtime = context.$root.runtime;
            this.selectedContig = selectedContig;
            this.contigsCount = contigsCount;

            this.selectedRow = ko.observable();
            this.subscribe(this.selectedRow, (newValue) => {
                if (newValue) {
                    this.selectedContig(newValue.id);
                } else {
                    this.selectedContig(null);
                }
            });

            this.contigs = ko.observableArray();

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.table = {
                style: {
                    table: {
                        backgroundColor: '#FFF'
                    },
                    row: {
                        // borderBottom: '1px silver solid'
                    }
                },
                selectedRow: this.selectedRow,
                sort: {
                    column: ko.observable('length'),
                    direction: ko.observable('desc')
                },
                columns: [
                    {
                        name: 'id',
                        label: 'ID',
                        width: 65,
                        html: false,
                        sort: true,
                        style: {
                            cell: {
                                'overflow-y': 'auto',
                                'white-space': 'nowrap',
                                'text-overflow': 'ellipsis'
                            }
                        },
                    },
                    {
                        name: 'length',
                        label: 'Length',
                        width: 35,
                        sort: true,
                        style: {
                            cell: {
                                'text-align': 'right',
                                'font-family': 'monospace',
                                'font-size': '95%',
                                'overflow-y': 'auto',
                                'white-space': 'nowrap',
                                'text-overflow': 'ellipsis'
                            }
                        },
                        format: {
                            type: 'number',
                            format: '0,0'
                        }
                    }
                ]
            };

            this.getContigs()
                .then((contigs) => {
                    if (contigs) {
                        this.contigsCount(contigs.length);
                        this.contigs(contigs.map((contig) => {
                            return {
                                id: contig.id,
                                length: contig.length,
                                selected: ko.observable(false)
                            };
                        }));
                    } else {
                        this.contigs([]);
                    }
                    this.ready(true);
                })
                .catch((err) => {
                    // simple error
                    this.error(err.message);
                });
        }

        getContigs() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authenticated: true
            });
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.genomeRef,
                    included: ['contigs', 'num_contigs', 'contig_lengths', 'contigset_ref', 'assembly_ref']
                }]
            }])
                .spread((result) => {
                    const {contigset_ref, assembly_ref} = result.data[0].data;
                    if (contigset_ref) {
                        return workspace.callFunc('get_objects2', [{
                            objects: [{
                                ref: contigset_ref,
                                included: [
                                    'contigs/[*]/id',
                                    'contigs/[*]/length'
                                ]
                            }]
                        }])
                            .spread((result) => {
                                return result.data[0].data.contigs;
                            });
                    } else if (assembly_ref) {
                        return workspace.callFunc('get_objects2', [{
                            objects: [{
                                ref: assembly_ref,
                                included: [
                                    'contigs',
                                ]
                            }]
                        }])
                            .spread((result) => {
                                const contigs = result.data[0].data.contigs;
                                return Object.keys(contigs).map((contigId) => {
                                    const contig = contigs[contigId];
                                    return {
                                        id: contig.contig_id,
                                        length: contig.length,
                                        start: contig.start_position,
                                    };
                                });
                            });
                    } else {
                        // throw new Error('Cannot get contigs...');
                        return [];
                    }
                });
        }
    }

    const t = html.tag,
        div = t('div');

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }
        },

        searchResults: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px silver solid'
            }
        },
        contigRow: {
            css: {
                padding: '4px',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    backgroundColor: '#CCC'
                }
            }
        },
        selectedContig: {
            css: {
                backgroundColor: '#CCC'
            }
        }
    });

    // function buildContigs() {
    //     return div({
    //         style: {
    //             flex: '1 1 0px',
    //             overflowY: 'auto',
    //             padding: '4px'
    //         },
    //         dataBind: {
    //             foreach: 'contigs'
    //         }
    //     }, div({
    //         class: style.classes.contigRow,
    //         dataBind: {
    //             click: 'function(d,e){$component.doSelectContig.call($component,d,e)}',
    //             class: 'selected() ? "' + style.classes.selectedContig + '" : null'
    //         }
    //     }, [
    //         div({
    //             style: {
    //                 display: 'inline-block',
    //                 width: '60%',
    //                 overflowY: 'auto',
    //                 textOverflow: 'ellipsis'
    //             },
    //             dataBind: {
    //                 text: 'id',
    //                 attr: {
    //                     title: 'id'
    //                 }
    //             }
    //         }),
    //         div({
    //             style: {
    //                 display: 'inline-block',
    //                 width: '40%',
    //                 overflowY: 'auto',
    //                 textOverflow: 'ellipsis',
    //                 textAlign: 'right'
    //             },
    //             dataBind: {
    //                 typedText: {
    //                     value: 'length',
    //                     type: '"number"',
    //                     format: '"0,0"'
    //                 }
    //             }
    //         })
    //     ]));
    // }

    function buildContigsTable() {
        return gen.component({
            name: TableComponent.name(),
            params: {
                table: 'table',
                rows: 'contigs'
            }
        });
    }

    function buildNoContigs() {
        return div({
            class: 'alert alert-warning'
        }, 'No contigs available');
    }

    function buildLoading() {
        return div({
            class: 'fa fa-spin fa-spinner fa-fw'
        });
    }

    function template() {
        return div({
            class: style.classes.component
        }, gen.if('ready',
            gen.if('contigs().length > 0',
                buildContigsTable(),
                buildNoContigs()),
            buildLoading()));
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