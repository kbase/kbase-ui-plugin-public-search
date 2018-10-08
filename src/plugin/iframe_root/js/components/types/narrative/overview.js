define([
    'bluebird',
    'knockout',
    'marked',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders'
], function (
    Promise,
    ko,
    marked,
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

            // overview fields
            console.log('narrative info?', this.object.workspaceInfo, this.object.objectInfo);

            this.title = this.object.workspaceInfo.metadata.narrative_nice_name;
            this.abstract = null;
            this.createdBy = null;
            this.createdAt = null;
            this.lastSavedAt = this.object.objectInfo.saveDate;
            this.lastSavedBy = this.object.objectInfo.saved_by;

            this.cellCounts = {
                markdown:  this.getObjectMetadataInt('jupyter.markdown'),
                code: this.getObjectMetadataInt('jupyter.code'),
                app: this.gatherAppCellCounts()
            };

            // this.appCellCount = 20;
            this.genomeCount = 13;
            this.objectCounts = null;

            Promise.all([
                this.getTypeCounts(),
                this.getAbstract()
            ])
                .spread((objectTypeCounts, {abstract, createdBy, createdAt}) => {
                    console.log('got overview!', objectTypeCounts);
                    this.objectCounts = objectTypeCounts;
                    this.abstract = abstract;
                    this.createdBy = createdBy;
                    this.createdAt = createdAt;
                    this.ready(true);
                })
                .catch((err) => {
                    this.error(err.message);
                    console.error('error', err);
                });
        }

        getObjectMetadataInt(name) {
            const value = this.object.objectInfo.metadata[name];
            if (!value) {
                return 0;
            }
            return parseInt(value, 10);
        }

        gatherAppCellCounts() {
            return Object.entries(this.object.objectInfo.metadata).reduce((count, [key, value]) => {
                if (key.startsWith('method.')) {
                    return count + parseInt(value, 10);
                }
                return count;
            }, 0);
        }

        getTypeCounts() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: true
            });
            return workspace.callFunc('list_objects', [{
                ids: [this.object.workspaceInfo.id]
            }])
                .spread((result) => {
                    const typeCounts = result.reduce((typeCounts, objectInfo) => {
                        const [,type,,] = objectInfo[2].split(/[.-]/);
                        if (!typeCounts[type]) {
                            typeCounts[type] = 1;
                        } else {
                            typeCounts[type] += 1;
                        }
                        return typeCounts;
                    }, {});
                    const objectTypeCounts = Object.entries(typeCounts)
                        .map(([key, value]) => {
                            return {
                                type: key,
                                count: value
                            };
                        })
                        .sort((a, b) => a.type.localeCompare(b.type));
                    return objectTypeCounts;
                });
        }

        getAbstract() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: true
            });
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.object.objectInfo.ref,
                }]
            }])
                .spread((result) => {
                    const narrativeObject = result.data[0];
                    const cells = narrativeObject.data.cells;
                    const markdownCells = cells
                        .filter((cell) => {
                            return cell.cell_type === 'markdown';
                        })
                        .map((cell) => {
                            return cell.source;
                        });
                    const welcomeRe = /Welcome to KBase's Narrative Interface!/;
                    // console.log('cells', markdownCells);
                    const abstract = markdownCells.find((content) => {
                        if (!content) {
                            return false;
                        }
                        if (welcomeRe.test(content)) {
                            return false;
                        }
                        return true;
                    });
                    // console.log('metadata', result);
                    const createdBy = narrativeObject.creator;
                    const fixedCreated = narrativeObject.created.split('+')[0];
                    const createdAt = new Date(fixedCreated);
                    // console.log('result', result);

                    return {abstract, createdBy, createdAt};
                });
            // .spread(([object]) => {
            //     console.log('got narr', object);
            // });
        }
    }

    // VIEW

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        table = t('table'),
        tbody = t('tbody'),
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
        column1: {
            css: {
                display: 'inline-block',
                width: '50%',
                verticalAlign: 'top',
                paddingRight: '10px'
            }
        },
        column2: {
            css: {
                display: 'inline-block',
                width: '50%',
                verticalAlign: 'top',
                paddingLeft: '10px'
            }
        },
        columnHeader: {
            css: {
                fontWeight: 'bold',
                color: '#333',
                margin: '10px 0 4px 0'
            }
        },
        narrativeTitle: {
            css: {
                fontWeight: 'bold',
                fontSize: '120%',
            }
        },
        narrativeAbstract: {
            css: {
                // maxHeight: '20em',
                // overflowY: 'auto',
                padding: '6px',
                border: '1px rgba(200,200,200, 0.5) solid',
                borderRadius: '4px'
            },
            inner: {
                h2: {
                    fontSize: '100%'
                },
                blockquote: {
                    fontSize: '100%'
                }
            }
        }
    });

    function buildAbstract() {
        return div([
            div({
                class: style.classes.narrativeTitle,
                dataBind: {
                    text: 'title'
                }
            }),
            div([
                span('Created : '),
                span({
                    dataBind: {
                        typedText: {
                            value: 'createdAt',
                            type: '"date"',
                            format: '"MMM D, YYYY"'
                        }
                    }
                })
            ]),
            div([
                span('Created by: '),
                span({
                    dataBind: {
                        text: 'createdBy'
                    }
                })
            ]),
            div([
                span('Last saved: '),
                span({
                    dataBind: {
                        typedText: {
                            value: 'lastSavedAt',
                            type: '"date"',
                            format: '"MMM D, YYYY"'
                        }
                    }
                })
            ]),
            div([
                span('Last saved by: '),
                span({
                    dataBind: {
                        text: 'lastSavedBy'
                    }
                })
            ]),
            div({
                class: style.classes.narrativeAbstract
            }, gen.if('abstract',
                div({
                    dataBind: {
                        htmlMarkdown: 'abstract'
                    }
                }),
                div({
                    style: {
                        fontStyle: 'italic'
                    }
                }, 'Sorry, no introductory markdown cell found for this Narrative.')))
        ]);
    }

    // function buildSummary() {
    //     return table({
    //         class: style.classes.table
    //     }, [
    //         tr([
    //             th('Title'),
    //             td({
    //                 dataBind: {
    //                     text: 'title'
    //                 }
    //             })
    //         ]),
    //         tr([
    //             th('First Cell'),
    //             td(gen.if('abstract',
    //                 div({
    //                     dataBind: {
    //                         htmlMarkdown: 'abstract'
    //                     }
    //                 }),
    //                 'none'))
    //         ]),
    //         // tr([
    //         //     th('Owner'),
    //         //     td({
    //         //         dataBind: {
    //         //             text: 'owner'
    //         //         }
    //         //     })
    //         // ]),
    //         // tr([
    //         //     th('Creator'),
    //         //     td({
    //         //         dataBind: {
    //         //             text: 'creator'
    //         //         }
    //         //     })
    //         // ]),
    //         // tr([
    //         //     th('Created'),
    //         //     td({
    //         //         dataBind: {
    //         //             text: 'title'
    //         //         }
    //         //     })
    //         // ]),
    //         // tr([
    //         //     th('Last Saved'),
    //         //     td({
    //         //         dataBind: {
    //         //             text: 'title'
    //         //         }
    //         //     })
    //         // ]),
    //     ]);
    // }

    function buildCells() {
        return table({
            class: style.classes.table
        }, [
            tr([
                th('Apps'),
                td({
                    style:{
                        textAlign: 'right'
                    },
                    dataBind: {
                        text: 'cellCounts.app'
                    }
                })
            ]),
            tr([
                th('Markdown'),
                td({
                    style:{
                        textAlign: 'right'
                    },
                    dataBind: {
                        text: 'cellCounts.markdown'
                    }
                })
            ]),
            tr([
                th('Code'),
                td({
                    style:{
                        textAlign: 'right'
                    },
                    dataBind: {
                        text: 'cellCounts.code'
                    }
                })
            ])
        ]);
    }

    function buildObjects() {
        return table({
            class: style.classes.table
        }, [
            tbody({
                dataBind: {
                    foreach: 'objectCounts'
                }
            },
            tr([
                th({
                    dataBind: {
                        text: 'type'
                    }
                }),
                td({
                    style:{
                        textAlign: 'right'
                    },
                    dataBind: {
                        text: 'count'
                    }
                })
            ]))
        ]);
    }

    function buildOverview() {
        return div([
            div({
                class: style.classes.column1
            }, [
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Abstract'),
                    buildAbstract()
                ]),

                // div([
                //     div({
                //         class: style.classes.columnHeader
                //     }, 'Source'),
                //     'TBD'
                // ])
            ]),
            div({
                class: style.classes.column2
            }, [
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Cells'),
                    buildCells()
                ]),
                div([
                    div({
                        class: style.classes.columnHeader
                    }, 'Objects'),
                    buildObjects()
                ]),
                // div([
                //     div({
                //         class: style.classes.columnHeader
                //     }, 'Taxonomic Lineage'),
                //     div({
                //         dataBind: {
                //             component: {
                //                 name: LineageComponent.quotedName(),
                //                 params: {
                //                     taxonomy: 'taxonomy'
                //                 }
                //             }
                //         }
                //     })
                // ])
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