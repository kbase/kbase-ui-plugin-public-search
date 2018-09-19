define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../../../../lib/serviceUtils'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    build,
    serviceUtils
) {
    'use strict';

    const t = html.tag,
        p = t('p'),
        div = t('div'),
        span = t('span'),
        table = t('table'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    class ViewModel extends ViewModelBase {
        constructor(params, context, element, componentInfo, name) {
            super(params);
            this.methodMap = context.$root.methodMap;
            // this.methodMap = ko.utils.unwrapObservable(params.methodMap);
            const ref = ko.utils.unwrapObservable(params.ref);
            const [workspaceId, objectId, objectVersion] = ref.split('/').map((part) => {return parseInt(part, 10);});
            this.objectRef = {
                ref: ref,
                workspaceId: workspaceId,
                objectId: objectId,
                version: objectVersion
            };
            this.runtime = context.$root.runtime;
            this.componentId = name;

            this.ready = ko.observable(false);
            this.error = ko.observable();
            this.provenanceMissing = false;

            this.objectInfo = null;
            this.workspaceInfo = null;
            this.workspaceType = null;
            this.workspaceName = null;
            this.workspaceOwner = null;
            this.moduleInfo = null;

            this.appInfo = null;
            this.copyInfo = null;
            this.inputObjectRefs = [];
            this.scriptInfo = null;

            this.app = null;

            this.showObjectDetail = ko.observable(false);
            this.showConnectionDetail = ko.observable(false);

            this.getProvenance()
                .then(() => {
                    this.ready(true);
                });
        }

        getWorkspaceInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            return workspace.callFunc('get_workspace_info', [
                {
                    id: this.objectRef.workspaceId
                }
            ])
                .spread((workspaceInfo) => {
                    return serviceUtils.workspaceInfoToObject(workspaceInfo);
                });
        }

        getProvenanceInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: this.objectRef.ref
                }],
                ignoreErrors: 1,
                no_data: 1
            }])
                .spread((result) => {
                    const objectInfo = result.data[0];
                    return objectInfo;
                });
        }

        getModuleInfo() {
            const nms = this.runtime.service('rpc').makeClient({
                module: 'Catalog',
                timeout: 10000,
                authorization: false
            });
            return nms.callFunc('get_module_version', [
                {
                    module_name: this.appInfo.module
                }
            ])
                .spread((moduleInfo) => {
                    return this.moduleInfo = moduleInfo;
                })
                .catch((err) => {
                    console.error('ERROR', err.message);
                    return null;
                });
        }

        resolveApp() {
            return Promise.try(() => {
                const id = this.appInfo.module + '/' +
                        this.appInfo.method;

                const cachedAppSpec = this.methodMap.release[id] ||
                                      this.methodMap.beta[id] ||
                                      this.methodMap.dev[id];
                if (!cachedAppSpec) {
                    throw new Error('App not found in nms cache with id: ' + id);
                }

                const [module, method] = cachedAppSpec.info.id.split('/');

                const appId = cachedAppSpec.info.id;

                const nms = this.runtime.service('rpc').makeClient({
                    module: 'NarrativeMethodStore',
                    timeout: 10000,
                    authorization: false
                });
                return nms.callFunc('get_method_brief_info', [
                    {
                        ids: [appId],
                        tag: this.moduleInfo.git_commit_hash
                    }
                ])
                    .spread(([info]) => {
                        this.app = {
                            module: module,
                            method: method,
                            spec: cachedAppSpec
                        };
                        return info;
                    })
                    .catch((err) => {
                        console.error('ERROR', err.message);
                        return null;
                    });
            });
        }

        getApp() {
            return this.getModuleInfo()
                .then(() => {
                    return this.resolveApp();
                });
        }

        getProvenance() {
            return Promise.all([
                this.getWorkspaceInfo(),
                this.getProvenanceInfo()
            ])
                .spread((workspaceInfo, objectInfo) => {
                    if (objectInfo.provenance.length === 0) {
                        // no provenance??
                        this.provenanceMissing = true;
                        return;
                    }

                    const provenanceAction = objectInfo.provenance[0];

                    this.workspaceInfo = workspaceInfo;
                    // parse out what type of workspace it is ...
                    this.workspaceOwner = workspaceInfo.owner;
                    if (workspaceInfo.metadata.narrative) {
                        this.workspaceType = 'Narrative';
                        this.workspaceName = workspaceInfo.metadata.narrative_nice_name || 'Unknown';
                    } else if (workspaceInfo.metadata.searchtags && workspaceInfo.metadata.searchtags.includes('refdata')) {
                        this.workspaceType = 'RefData';
                        this.workspaceName = workspaceInfo.name;
                    } else {
                        this.workspaceType = 'Workspace';
                        this.workspaceName = workspaceInfo.name;
                    }

                    this.objectInfo = serviceUtils.objectInfoToObject(objectInfo.info);

                    this.inputObjectRefs = provenanceAction.resolved_ws_objects;

                    if (objectInfo.copied) {
                        // it is a copy, no matter what provenance says...
                        this.copyInfo = {
                            ref: objectInfo.copied,
                            isOriginalAccessible: objectInfo.copy_source_inaccessible === 0 ? true : false
                        };
                    } else if (provenanceAction.service && provenanceAction.method) {
                        this.appInfo = {
                            module: provenanceAction.service,
                            method: provenanceAction.method,
                            version: provenanceAction.service_ver
                        };
                        return this.getApp();
                    } else if (provenanceAction.script && provenanceAction.service) {
                        this.scriptInfo = {
                            service: provenanceAction.service,
                            serviceVersion: provenanceAction.service_ver,
                            script: provenanceAction.script,
                            version: provenanceAction.version
                        };
                    } else if (provenanceAction.script) {
                        this.scriptInfo = {
                            service: null,
                            serviceVersion: null,
                            script: provenanceAction.script,
                            version: provenanceAction.script_ver
                        };
                    }
                })
                .catch((error) => {
                    console.error('ERROR', error);
                });
        }
    }

    const styles = html.makeStyles({
        objectInfoBox: {
            css: {
                border: '1px silver solid',
                margin: '10px',
                padding: '4px',
                flex: '1 1 0px'
            }
        },
        row: {
            css: {
                display: 'flex',
                flexDirection: 'row'
            }
        },
        sectionTitle: {
            css: {
                fontWeight: 'bold',
                color: 'rgba(100,100,100,1)'
            }
        },
        label: {
            css: {
                fontWeight: 'bold',
                color: 'rgba(150,150,150,1)'
            }
        },
        appInfoBox: {
            css: {
                border: '2px green solid',
                borderRadius: '8px',
                margin: '10px',
                padding: '4px',
                flex: '1 1 0px'
            }
        },
        scriptInfoBox: {
            css: {
                border: '2px green solid',
                borderRadius: '8px',
                margin: '10px',
                padding: '4px',
                flex: '1 1 0px'
            }
        },
        copyInfoBox: {
            css: {
                border: '2px blue solid',
                borderRadius: '8px',
                margin: '10px',
                padding: '4px',
                flex: '1 1 0px'
            }
        },
        connector: {
            css: {
                margin: '10px',
                fontWeight: 'bold',
                width: '20em'
                // width: '10em'
            }
        },
        object: {
            css: {
                fontWeight: 'bold',
                width: '30em'
            }
        },
        infoBox: {
            css: {
                // border: '1px silver solid',
                // padding: '6px',
                // margin: '10px'
            }
        },
        infoTable: {
            css: {
                width: '100%'
            },
            inner: {
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(150, 150, 150, 1)',
                    width: '5em',
                    padding: '4px',
                    verticalAlign: 'top'
                },
                td: {
                    // width: '75%',
                    padding: '4px',
                    verticalAlign: 'top'
                },
                'td.-bare': {
                    padding: '0'
                }
            }
        }
    });

    function buildIcon(icon, color) {
        return div({
            style: {
                display: 'inline-block',
                width: '30px'
            }
        }, span({
            class: 'fa fa-lg fa-' + icon,
            style: {
                color: color
            }
        }));
    }

    function buildCopyInfo() {
        return div({
            class: styles.classes.infoBox
        }, [
            div({
                style: {
                    display: 'flex',
                    flexDirection: 'row',
                    // borderLeft: '2px blue solid'
                }
            },  [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'blue',
                        width: '15px'
                    }
                }, [
                    div({
                        style: {
                            // marginLeft: '1px',
                            marginBottom: '-10px',
                            textAlign: 'center'
                        }
                    }, span({
                        class: 'fa fa-caret-up fa-lg'
                    })),
                    div({
                        style: {
                            borderLeft: '2px blue solid',
                            margin: '0 50%',
                            flex: '1 1 0px'
                        }
                    })
                ]),
                div({
                    class: styles.classes.connector,
                    style: {
                        color: 'blue'
                    }
                }, [
                    buildIcon('files-o', 'blue'),
                    span('Which was created by Copying')
                ]),
                div({
                    class: styles.classes.copyInfoBox
                }, [
                    div(span({
                        style: {
                            cursor: 'pointer'
                        },
                        dataBind: {
                            click: 'function(){showConnectionDetail(!showConnectionDetail());}'
                        }
                    }, [
                        span({
                            class: 'fa',
                            style: {
                                width: '1em'
                            },
                            dataBind: {
                                css: {
                                    'fa-caret-right': '!showConnectionDetail()',
                                    'fa-caret-down': 'showConnectionDetail()'
                                }
                            }
                        }),
                        span(gen.if('showConnectionDetail()', 'hide detail', 'show detail'))
                    ])),
                    gen.if('showConnectionDetail()', gen.with('copyInfo', [
                        table({
                            class: styles.classes.infoTable
                        } ,[
                            tr([
                                th('Object ref'),
                                td({
                                    dataBind: {
                                        text: 'ref'
                                    }
                                })
                            ]),
                            tr([
                                th('Accessible?'),
                                td({
                                    dataBind: {
                                        typedText: {
                                            value: 'isOriginalAccessible',
                                            type: '"boolean"',
                                            format: '"Yes,No"'
                                        }
                                    }
                                })
                            ])
                        ])
                    ]))
                ]),
            ]),
            // div({
            //     class: styles.classes.connector
            // }, [
            //     buildIcon('file-o', 'black'),
            //     'Object: '
            // ]),
            div({
                style: {
                    marginLeft: '15px'
                },
                dataBind: {
                    component: {
                        name: 'componentId',
                        params: {
                            methodMap: '$component.methodMap',
                            ref: 'copyInfo.ref'
                        }
                    }
                }
            })
        ]);
    }

    // function buildCopyInfo() {
    //     return div({
    //         style: {
    //             border: '1px silver solid'
    //         }
    //     }, [
    //         div({
    //             style: {
    //                 fontWeight: 'bold',
    //             }
    //         }, 'CREATED BY COPY'),
    //         div({
    //             dataBind: {
    //                 text: 'ref'
    //             }
    //         }),
    //         div({
    //             dataBind: {
    //                 typedText: {
    //                     value: 'isOriginalAccessible',
    //                     type: '"boolean"',
    //                     format: '"Yes,No"'
    //                 }
    //             }
    //         }),
    //         div({
    //             style: {
    //                 marginLeft: '10px'
    //             },
    //             dataBind: {
    //                 component: {
    //                     name: '$component.componentId',
    //                     params: {
    //                         ref: 'ref'
    //                     }
    //                 }
    //             }
    //         })
    //     ]);
    // }

    function buildAppInfo() {
        return div({
            class: styles.classes.infoBox
        }, [
            div({
                style: {
                    display: 'flex',
                    flexDirection: 'row',
                    // borderLeft: '2px green solid'
                }
            },  [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'green',
                        width: '15px'
                    }
                }, [
                    div({
                        style: {
                            // marginLeft: '1px',
                            marginBottom: '-10px',
                            textAlign: 'center'
                        }
                    }, span({
                        class: 'fa fa-caret-up fa-lg'
                    })),
                    div({
                        style: {
                            borderLeft: '2px green solid',
                            margin: '0 50%',
                            flex: '1 1 0px'
                        }
                    })
                ]),
                div({
                    class: styles.classes.connector,
                    style: {
                        color: 'green'
                    }
                }, [
                    buildIcon('gear', 'green'),
                    span('Which was created by an App')
                ]),
                div({
                    class: styles.classes.appInfoBox
                }, [
                    div(span({
                        class: styles.classes.row,
                        style: {
                            cursor: 'pointer'
                        },
                        dataBind: {
                            click: 'function(){showConnectionDetail(!showConnectionDetail());}'
                        }
                    }, [
                        span({
                            class: 'fa',
                            style: {
                                width: '1em'
                            },
                            dataBind: {
                                css: {
                                    'fa-caret-right': '!showConnectionDetail()',
                                    'fa-caret-down': 'showConnectionDetail()'
                                }
                            }
                        }),
                        div({
                            style: {
                                flex: '1 1 0px'
                            }
                        }, [
                            span({
                                fontWeight: 'bold'
                            }, 'App'),
                            ' named "' +
                            span({
                                style: {
                                    fontWeight: 'bold'
                                },
                                dataBind: {
                                    text: 'app.spec.info.name'
                                }
                            }),
                            '"'
                        ])
                        // span(gen.if('showConnectionDetail()', 'hide detail', 'show detail'))
                    ])),
                    gen.if('showConnectionDetail()', gen.with('app', table({
                        class: styles.classes.infoTable
                    }, [
                        tr([
                            th('module'),
                            td({
                                dataBind: {
                                    text: 'module'
                                }
                            })
                        ]),
                        tr([
                            th('method'),
                            td({
                                class: '-bare'
                            }, table({
                                class: styles.classes.infoTable
                            }, [
                                tr([
                                    th('title'),
                                    td({
                                        dataBind: {
                                            text: 'spec.info.name'
                                        }
                                    })
                                ]),
                                tr([
                                    th('method'),
                                    td({
                                        dataBind: {
                                            text: 'method'
                                        }
                                    })
                                ])
                            ]))
                        ]),
                        tr([
                            th('version'),
                            td({
                                dataBind: {
                                    text: 'spec.info.ver'
                                }
                            })
                        ])
                    ])))
                ])
            ]),
            div({
            }, [
                gen.if('inputObjectRefs', buildInputObjects())
            ])
        ]);
    }

    function buildScriptInfo() {
        return div({
            class: styles.classes.infoBox
        }, [
            div({
                style: {
                    display: 'flex',
                    flexDirection: 'row'
                }
            },  [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'green',
                        width: '15px'
                    }
                }, [
                    div({
                        style: {
                            marginBottom: '-10px',
                            textAlign: 'center'
                        }
                    }, span({
                        class: 'fa fa-caret-up fa-lg'
                    })),
                    div({
                        style: {
                            borderLeft: '2px green solid',
                            margin: '0 50%',
                            flex: '1 1 0px'
                        }
                    })
                ]),
                div({
                    class: styles.classes.connector,
                    style: {
                        color: 'green'
                    }
                }, [
                    buildIcon('gear', 'green'),
                    span('Which was created by a Script')
                ]),
                div({
                    class: styles.classes.scriptInfoBox
                }, [
                    div(span({
                        class: styles.classes.row,
                        style: {
                            cursor: 'pointer'
                        },
                        dataBind: {
                            click: 'function(){showConnectionDetail(!showConnectionDetail());}'
                        }
                    }, [
                        span({
                            class: 'fa',
                            style: {
                                width: '1em'
                            },
                            dataBind: {
                                css: {
                                    'fa-caret-right': '!showConnectionDetail()',
                                    'fa-caret-down': 'showConnectionDetail()'
                                }
                            }
                        }),
                        div({
                            style: {
                                flex: '1 1 0px'
                            }
                        }, [
                            span({
                                fontWeight: 'bold'
                            }, 'Script'),
                            ' named "' +
                            span({
                                style: {
                                    fontWeight: 'bold'
                                },
                                dataBind: {
                                    text: 'scriptInfo.script'
                                }
                            }),
                            '"'
                        ])
                    ])),
                    gen.if('showConnectionDetail()',
                        gen.with('scriptInfo',
                            table({
                                class: styles.classes.infoTable
                            }, tbody([
                                gen.if('service', tr([
                                    th('service'),
                                    td({
                                        dataBind: {
                                            text: 'service'
                                        }
                                    })
                                ])),
                                gen.if('serviceVersion', tr([
                                    th('version'),
                                    td({
                                        dataBind: {
                                            text: 'serviceVersion'
                                        }
                                    })
                                ])),
                                tr([
                                    th('script'),
                                    td({
                                        dataBind: {
                                            text: 'script'
                                        }
                                    })
                                ]),
                                gen.if('version', tr([
                                    th('version'),
                                    td({
                                        dataBind: {
                                            text: 'version'
                                        }
                                    })
                                ]))
                            ]))))
                ])
            ]),
            div({
            }, [
                gen.if('inputObjectRefs', buildInputObjects())
            ])
        ]);
    }

    // function buildScriptInfo() {
    //     return div({
    //         style: {
    //             border: '1px silver solid'
    //         }
    //     },  [
    //         gen.with('appInfo', [
    //             div({
    //                 style: {
    //                     fontWeight: 'bold',
    //                 }
    //             }, 'CREATED BY SCRIPT'),
    //             div({
    //                 dataBind: {
    //                     text: 'script'
    //                 }
    //             }),
    //             div({
    //                 dataBind: {
    //                     text: 'version'
    //                 }
    //             })
    //         ]),
    //         gen.if('inputObjectRefs', buildInputObjects())
    //     ]);
    // }
    function buildEdgeInfo() {
        return div({
            class: styles.classes.infoBox
        }, [
            div({
                style: {
                    display: 'flex',
                    flexDirection: 'row'
                }
            },  [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'red',
                        width: '15px'
                    }
                }, [
                    div({
                        style: {
                            // marginLeft: '1px',
                            marginBottom: '-10px',
                            textAlign: 'center'
                        }
                    }, span({
                        class: 'fa fa-caret-up fa-lg'
                    })),
                    div({
                        style: {
                            borderLeft: '2px red solid',
                            margin: '0 50%',
                            flex: '1 1 0px'
                        }
                    })
                ]),
                div({
                    class: styles.classes.connector
                }, [
                    buildIcon('cloud', 'red'),
                    span({
                        style: {
                            fontStyle: 'italic'
                        }
                    }, 'EDGE of the system')
                ]),
                div({
                    class: styles.classes.objectInfoBox
                }, [
                    'nothing to see here...'
                    // div(span({
                    //     style: {
                    //         cursor: 'pointer'
                    //     },
                    //     dataBind: {
                    //         click: 'function(){showObjectDetail(!showObjectDetail());}'
                    //     }
                    // }, [
                    //     span({
                    //         class: 'fa',
                    //         style: {
                    //             width: '1em'
                    //         },
                    //         dataBind: {
                    //             css: {
                    //                 'fa-caret-right': '!showObjectDetail()',
                    //                 'fa-caret-down': 'showObjectDetail()'
                    //             }
                    //         }
                    //     }),
                    //     span(gen.if('showObjectDetail()', 'hide detail', 'show detail'))
                    // ])),
                    // gen.if('showObjectDetail()',
                    //     div({
                    //     }, 'nothing to see here...'))
                ])
            ])
        ]);
    }

    function buildInputObjects() {
        return div({
            style: {
                flex: '1 1 0px',
                marginLeft: '15px'
            }
        }, gen.if('inputObjectRefs.length > 0',
            div({
                dataBind: {
                    foreach: 'inputObjectRefs'
                }
            }, div({
                dataBind: {
                    component: {
                        name: '$component.componentId',
                        params: {
                            ref: '$data',
                            methodMap: '$component.methodMap'
                        }
                    }
                }
            })),
            buildEdgeInfo()));
    }

    function buildObjectInfo() {
        return div({
            class: styles.classes.infoBox
        }, [
            div({
                style: {
                    display: 'flex',
                    flexDirection: 'row'
                }
            },  [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'black',
                        width: '15px'
                    }
                }, [
                    div({
                        style: {
                            // marginLeft: '1px',
                            marginBottom: '-10px',
                            textAlign: 'center'
                        }
                    }, span({
                        class: 'fa fa-caret-up fa-lg'
                    })),
                    div({
                        style: {
                            borderLeft: '2px black solid',
                            margin: '0 50%',
                            flex: '1 1 0px'
                        }
                    })
                ]),
                div({
                    class: styles.classes.connector
                }, [
                    buildIcon('file-o', 'black'),
                    'Object: '
                ]),
                div({
                    class: styles.classes.objectInfoBox
                }, [
                    div(span({
                        class: styles.classes.row,
                        style: {
                            cursor: 'pointer'
                        },
                        dataBind: {
                            click: 'function(){showObjectDetail(!showObjectDetail());}'
                        }
                    }, [
                        span({
                            class: 'fa',
                            style: {
                                width: '1em'
                            },
                            dataBind: {
                                css: {
                                    'fa-caret-right': '!showObjectDetail()',
                                    'fa-caret-down': 'showObjectDetail()'
                                }
                            }
                        }),
                        div({
                            style: {
                                flex: '1 1 0px'
                            }
                        }, [
                            span({
                                style: {
                                    fontWeight: 'bold'
                                },
                                dataBind: {
                                    text: 'objectInfo.typeName'
                                }
                            }),
                            ' object named "' +
                            span({
                                style: {
                                    fontWeight: 'bold'
                                },
                                dataBind: {
                                    text: 'objectInfo.name'
                                }
                            }),
                            '" in ' +
                            span({
                                style: {
                                    fontWeight: 'bold'
                                },
                                dataBind: {
                                    text: 'workspaceType'
                                }
                            }),
                            ' named "' +
                            span({
                                style: {
                                    fontWeight: 'bold'
                                },
                                dataBind: {
                                    text: 'workspaceName'
                                }
                            }),
                            '"'
                        ])
                        // span(gen.if('showObjectDetail()', 'hide detail', 'show detail'))
                    ])),
                    gen.if('showObjectDetail()',
                        div({
                            style: {
                                display: 'flex',
                                flexDirection: 'row'
                            }
                        }, [
                            div({
                                style: {
                                    flex: '1 1 0px'
                                }
                            }, [
                                div({
                                    class: styles.classes.sectionTitle
                                }, 'Object'),
                                table({
                                    class: styles.classes.infoTable
                                } ,[
                                    tr([
                                        th('name'),
                                        td({
                                            dataBind: {
                                                text: 'objectInfo.name'
                                            }
                                        })
                                    ]),
                                    tr([
                                        th('created'),
                                        td({
                                            dataBind: {
                                                typedText: {
                                                    value: 'objectInfo.saveDate',
                                                    type: '"date"',
                                                    format: '"YYYY-MM-DD"'
                                                }
                                            }
                                        })
                                    ])
                                ])
                            ]),
                            div({
                                style: {
                                    flex: '1 1 0px'
                                }
                            }, [
                                div([
                                    'in ',
                                    span({
                                        class: styles.classes.sectionTitle,
                                        dataBind: {
                                            text: 'workspaceType'
                                        }
                                    })
                                ]),
                                table({
                                    class: styles.classes.infoTable
                                } ,[
                                    tr([
                                        th('name'),
                                        td({
                                            dataBind: {
                                                text: 'workspaceName'
                                            }
                                        })
                                    ]),
                                    tr([
                                        th('owner'),
                                        td({
                                            dataBind: {
                                                text: 'workspaceOwner'
                                            }
                                        })
                                    ])
                                ])
                            ])
                        ]))
                ])
            ])
        ]);
    }

    function buildMissing() {
        return div({
            style: {
                margin: '10px',
            }
        }, [
            p({
                style: {
                    textAlign: 'center',
                    fontStyle: 'italic'
                }
            }, 'No provenance for this object')
        ]);
    }

    function template() {
        return div({
            dataBind: {
                if: 'ready'
            }
        }, gen.if('provenanceMissing',
            buildMissing(),
            [
                buildObjectInfo(),
                gen.if('copyInfo', buildCopyInfo()),
                gen.if('scriptInfo', buildScriptInfo()),
                gen.if('appInfo', buildAppInfo())
            ]), build.loading());
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