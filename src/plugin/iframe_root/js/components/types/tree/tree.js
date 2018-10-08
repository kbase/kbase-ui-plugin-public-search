define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    './overview',
    './simpleTree',
    '../builders'
], function (
    ko,
    reg,
    gen,
    html,
    build,
    OverviewComponent,
    SimpleTreeComponent,
    builders
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
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

    class ViewModel extends builders.TypeViewModel {
        constructor(params, context) {
            super(params, context);

            this.tree = null;
            this.treeInfo = null;
            this.objectName = this.object.objectInfo.name;
            this.objectRef = this.object.objectInfo.ref;

            this.setTabs({
                primary: {
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
                overview: OverviewComponent.name(),
                custom: []
            });

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
                    // TODO: get the scientific name for objectData.data.ws_refs.user1.g[0]
                    return workspace.callFunc('get_objects2', [{
                        objects: [{
                            ref: objectData.data.ws_refs.user1.g[0],
                            included: [
                                'scientific_name'
                            ]
                        }],
                        ignoreErrors: 1,
                        no_data: 0
                    }])
                        .spread((result) => {
                            let subjectScientificName;
                            if (result.data[0]) {
                                subjectScientificName = result.data[0].data.scientific_name;
                            }

                            const treeData = objectData.data.tree;
                            const tree = this.parseTree(treeData);

                            const leaves = objectData.data.leaf_list.reduce((leaves, nodeID) => {
                                const defaultLabel = objectData.data.default_node_labels[nodeID];
                                const parsedDefaultLabel = /^(.+)\s\((.+)\)$/.exec(defaultLabel);
                                if (nodeID === 'user1') {
                                    // for the user's genome, the format is a bit different
                                    // "object_name (User Genome ref)"
                                    // we don't page attention to the part in parens, so we don't
                                    // bother with a special regex, we just use the object_name if
                                    // the scientific name is not available.
                                    let objectName;
                                    if (parsedDefaultLabel) {
                                        [,objectName,] = parsedDefaultLabel;
                                    }
                                    leaves[nodeID] = {
                                        userGenome: true,
                                        nodeID: nodeID,
                                        label: subjectScientificName,
                                        scientificName: subjectScientificName || objectName || 'User Genome',
                                        genomeID: null,
                                        ref: objectData.data.ws_refs[nodeID].g[0]
                                    };
                                } else {
                                    // The label is typically "scientific name (genome id)"

                                    if (!parsedDefaultLabel) {
                                        leaves[nodeID] = {
                                            userGenome: false,
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
                                        const [,scientificName, genomeID] = parsedDefaultLabel;
                                        leaves[nodeID] = {
                                            userGenome: false,
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
                                }
                                return leaves;
                            }, {});
                            this.tree = tree;
                            this.treeInfo = {
                                leaves: leaves
                            };
                            // do something with the tree...

                        });
                });
        }
    }

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
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

    function buildTreeIdentification() {
        return [
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
                        format: '"MMM D, YYYY"'
                    }
                }
            })
        ];
    }

    function template() {
        return div({
            class: style.classes.component
        },
        gen.if('ready',
            gen.if('object',
                [
                    builders.buildHeader(buildTreeIdentification(), null),
                    builders.buildTabs()
                ],
                build.loading()),
            build.loading()
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