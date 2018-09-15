define([
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    './simpleTreeNode'
], function (
    reg,
    gen,
    html,
    SimpleTreeNodeComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    function measureTree(t) {
        let maxDepth = 0;
        let maxLength = 0;
        function crawl(depth, length, limb) {
            depth = depth + 1;
            if (limb.length) {
                length = length + limb.length;
            }
            if (!limb.nodes) {
                maxLength = Math.max(maxLength, length);
                maxDepth = Math.max(maxDepth, depth);
                return;
            }
            limb.nodes.forEach((node) => {
                crawl(depth, length, node);
            });
        }
        crawl(0, 0, t);
        return [maxDepth, maxLength];
    }

    class ViewModel {
        constructor({tree, treeInfo, originRef}, context, element) {
            this.tree = tree;
            this.leaves = treeInfo.leaves;
            this.originRef = originRef;
            this.componentName = SimpleTreeNodeComponent.name();

            // Calculate the scaling factor.
            // The scaling factor is obtained by:
            // 1. determine the longest path from root to leaf = L
            // 2. determine the width of the container = W
            // 3. The factor is 0.5*W/L = S.
            // 4. The length of each edge is then Ln * S
            this.width = element.clientWidth / 2;
            const [depth, length] = measureTree(tree);
            this.maxLength = length;
            this.maxDepth = depth;
            this.scalingFactor = null;
            if (depth) {
                if (length) {
                    this.scalingFactor = this.width/length;
                } else {
                    // A tree with some depth but no length means that all
                    // branches and leaves are of length 0. It doesn't matter
                    // what the scaling factor is, so just use the width.
                    // TODO: the tree display should use some minimal value
                    // for showing length, so that 0 lengths don't collapse.
                    this.scalingFactor = this.width;
                }
            } else {
                // no tree
                // console.log('no tree');
            }
        }
    }

    function buildTree() {
        return div({
            dataBind: {
                component: {
                    name: SimpleTreeNodeComponent.quotedName(),
                    params: {
                        componentName: 'componentName',
                        node: 'tree',
                        leaves: '$component.leaves',
                        originRef: 'originRef',
                        scalingFactor: 'scalingFactor'
                    }
                }
            }
        });
    }

    function buildScale() {
        return div({
            style: {
                borderBottom: '1px silver solid',
                padding: '4px'
            }
        }, [
            div('Scale - distance'),
            div([
                div({
                    style: {
                        display: 'inline-block'
                    }
                }, '0'),
                div({
                    style: {
                        display: 'inline-block',
                        borderBottom: '1px blue solid'
                    },
                    dataBind: {
                        style: {
                            width: '$component.width + "px"'
                        }
                    }
                }),
                div({
                    style: {
                        display: 'inline-block'
                    },
                    dataBind: {
                        typedText: {
                            value: '$component.maxLength',
                            type: '"number"',
                            format: '"0.0000"'
                        }
                    }
                })
            ])
        ]);
    }

    function template() {
        return div({
            style: {
                marginTop: '10px',
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, gen.if('scalingFactor',
            [
                buildScale(),
                buildTree()
            ],
            div('Sorry, no tree'))
        );
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});