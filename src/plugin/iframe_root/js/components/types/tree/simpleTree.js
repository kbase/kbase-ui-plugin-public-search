define([
    'kb_knockout/registry',
    'kb_lib/html',
    './simpleTreeNode'
], function (
    reg,
    html,
    SimpleTreeNodeComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    class ViewModel {
        constructor({tree, treeInfo, originRef}) {
            this.tree = tree;
            this.leaves = treeInfo.leaves;
            this.originRef = originRef;
        }
    }

    function buildTree() {
        return div({
            dataBind: {
                component: {
                    name: SimpleTreeNodeComponent.quotedName(),
                    params: {
                        node: 'tree',
                        leaves: '$component.leaves',
                        originRef: 'originRef'
                    }
                }
            }
        });
    }

    function template() {
        return div({
            style: {
                marginTop: '10px',
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            buildTree()
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});