define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/components/tabset',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../wikipediaImage',
    './overview',
    '../container',
    '../containerTab',
    '../provenance',
    './metadata',
    './simpleTree'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    TabsetComponent,
    html,
    build,
    WikipediaImageComponent,
    OverviewComponent,
    ContainerComponent,
    ContainerTabComponent,
    ProvenanceComponent,
    MetadataComponent,
    SimpleTreeComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        a = t('a');

    class Tree {
        constructor(nodes, label, length) {
            this.nodes = nodes;
            this.label = label;
            this.length = length;
        }
    }

    class Leaf {
        constructor(label, length) {
            this.label = label;
            this.length = length;
        }
    }

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            const {object} = params;

            this.object = ko.utils.unwrapObservable(object);

            this.runtime = context.$root.runtime;

            this.ready = ko.observable(false);

            this.tree = null;
            this.treeInfo = null;
            // this.summaryInfo = ko.observable();
            this.objectName = this.object.objectInfo.name;
            this.objectRef = this.object.objectInfo.ref;
            // this.taxonomy = ko.observableArray();
            this.dataIcon = this.getDataIcon();

            this.tabs = [
                {
                    active: true,
                    tab: {
                        label: 'Simple Tree',
                        component: null
                    },
                    panel: {
                        component: {
                            name: SimpleTreeComponent.name(),
                            params: {
                                originRef: 'objectRef',
                                tree: 'tree',
                                treeInfo: 'treeInfo'
                            }
                        }
                    }
                },
                {
                    tab: {
                        label: 'Overview'
                    },
                    panel: {
                        component: {
                            name: OverviewComponent.name(),
                            params: {
                                ref: 'object.objectInfo.ref'
                            }
                        }
                    }
                },
                {
                    tab: {
                        component: {
                            name: ContainerTabComponent.name(),
                            params: {
                                object: 'object'
                            }
                        }
                    },
                    panel: {
                        component: {
                            name: ContainerComponent.name(),
                            params: {
                                object: 'object'
                            }
                        }
                    }
                },
                {
                    tab: {
                        label: 'Provenance'
                    },
                    panel: {
                        component: {
                            name: ProvenanceComponent.name(),
                            params: {
                                ref: 'object.objectInfo.ref'
                            }
                        }
                    }
                },

                {
                    tab: {
                        label: 'Metadata',
                        component: null
                    },
                    panel: {
                        component: {
                            name: MetadataComponent.name(),
                            params: {
                                metadata: 'object.objectInfo.metadata'
                            }
                        }
                    }
                }
            ];

            this.getSummaryInfo()
                .then(() => {
                    this.ready(true);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                    // TODO handle error
                });
        }

        parseTree(treeData) {
            const data = treeData;
            let pos = 0;
            // const depth = 0;

            // collect characters into a string until a char in the string
            // stoppers is encountered.
            function getUntil(stoppers) {
                const chars = [];
                while (stoppers.indexOf(data[pos]) === -1) {
                    chars.push(data[pos]);
                    pos += 1;
                }
                return chars.join('');
            }

            // a length always starts with ":" and is a float,
            function maybeGetLength() {
                if (data[pos] !== ':') {
                    return null;
                }
                pos += 1;
                return parseFloat(getUntil(',)'));
            }

            // a leaf consists of a label and optional length.
            // <label>[:<length>]
            function maybeGetLeaf() {
                const label = getUntil(':,)');
                const length = maybeGetLength();
                return new Leaf(label, length);
            }

            // descendants is a list of either leaves or other
            // sets of descendants.
            // Or, one may think of each descendant as a "subtree",
            // which may take the form of a single leaf node
            // or a collection of other subtree collections.
            function maybeGetTree() {
                // ditch if not really a descendant list
                if (data[pos] !== '(') {
                    return null;
                }
                pos += 1;
                const nodes = [];
                let node;
                for (;;) {
                    // now repeatedly get either a leaf or a descendant list
                    node = maybeGetTree();
                    if (node === null) {
                        node = maybeGetLeaf();
                    }
                    nodes.push(node);
                    // end of list is signalled by ")", next element by ","
                    // anything else should be an error
                    // TODO: whitespace
                    if (data[pos] === ')') {
                        pos += 1;
                        break;
                    }
                    if (data[pos] !== ',') {
                        throw new Error('Unexpected character in descendants list: "' + data[pos] + '" at pos "' + pos + '"');
                    }
                    pos += 1;
                }
                const label = getUntil(':,);');
                const length = maybeGetLength();
                return new Tree(nodes, label, length);
            }
            return maybeGetTree();
        }

        getSummaryInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L1111
            // https://github.com/kbase/workspace_deluxe/blob/8a52097748ef31b94cdf1105766e2c35108f4c41/workspace.spec#L265
            return workspace.callFunc('get_objects', [[{
                ref: this.object.objectInfo.ref
            }]])
                .spread(([objectData]) => {
                    // console.log('object data???', objectData);
                    const treeData = objectData.data.tree;
                    const tree = this.parseTree(treeData);
                    const leaves = objectData.data.leaf_list.reduce((leaves, nodeID) => {
                        const defaultLabel = objectData.data.default_node_labels[nodeID];
                        const m = /^(.+)\s\((.+)\)$/.exec(defaultLabel);
                        if (!m) {
                            // console.log('what??', defaultLabel);
                            leaves[nodeID] = {
                                nodeID: nodeID,
                                label: defaultLabel,
                                scientificName: defaultLabel,
                                genomeID: null,
                                // TODO: how to get type ("g" - genome), and
                                // when are there more than one refs per node?
                                // Maybe for the general case this is relevant, but for
                                // the species tree implementation, these are fixed at g and length 1?
                                ref: objectData.data.ws_refs[nodeID].g[0]
                            };
                        } else {
                            const [,scientificName, genomeID] = m;
                            leaves[nodeID] = {
                                nodeID: nodeID,
                                label: defaultLabel,
                                scientificName: scientificName,
                                genomeID: genomeID,
                                // TODO: how to get type ("g" - genome), and
                                // when are there more than one refs per node?
                                // Maybe for the general case this is relevant, but for
                                // the species tree implementation, these are fixed at g and length 1?
                                ref: objectData.data.ws_refs[nodeID].g[0]
                            };
                        }
                        return leaves;
                    }, {});
                    this.tree = tree;
                    this.treeInfo = {
                        leaves: leaves
                    };
                    // console.log('got tree', tree);
                    // do something with the tree...
                });
        }

        getDataIcon() {
            try {
                const typeId = this.object.objectInfo.type,
                    type = this.runtime.service('type').parseTypeId(typeId),
                    icon = this.runtime.service('type').getIcon({ type: type });
                return {
                    classes: icon.classes.join(' '),
                    color: icon.color
                };
            } catch (err) {
                console.error('When fetching icon config: ', err);
                return {
                    classes: 'fa-question',
                    color: 'gray'
                };
            }
        }
    }

    const styles = html.makeStyles({
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px'
                },
                th: {
                    fontWeight: 'bold',
                    textAlign: 'left',
                    padding: '4px'
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
        return div({
            style: {
                display : 'flex',
                flexDirection: 'row'
            }
        }, [
            div({
                style: {
                    flex: '3 1 0px',
                    display: 'flex',
                    flexDirection: 'column'
                }
            }, [
                div({
                    style: {
                        display: 'flex',
                        flexDirection: 'row'
                    }
                }, [
                    div(div([
                        span({ class: 'fa-stack fa-2x' }, [
                            span({
                                class: 'fa fa-circle fa-stack-2x',
                                dataBind: {
                                    style: {
                                        color: 'dataIcon.color'
                                    }
                                }
                            }),
                            span({
                                class: 'fa-inverse fa-stack-1x ',
                                dataBind: {
                                    class: 'dataIcon.classes'
                                }
                            })
                        ])
                    ])),
                    div({
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }
                    }, [
                        gen.if('objectName',
                            a({
                                style: {
                                    fontSize: '120%',
                                    fontWeight: 'bold',
                                    fontStyle: 'italic'
                                },
                                dataBind: {
                                    text: 'objectName',
                                    attr: {
                                        href: '"/#dataview/" + object.objectInfo.ref'
                                    }
                                },
                                target: '_blank'
                            }),
                            div(build.loading())),
                        div(a({
                            dataBind: {
                                text: 'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
                                attr: {
                                    href: '"/#spec/type/" + object.objectInfo.type'
                                }
                            },
                            target: '_blank'
                        })),
                        div({
                            dataBind: {
                                typedText: {
                                    value: 'object.objectInfo.saveDate',
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
                    flex: '1 1 0px',
                }
            }, [
            ])
        ]);
    }

    function buildTabs() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
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
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        gen.if('ready',
            [
                buildOverview(),
                buildTabs()
            ],
            build.loading()));
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