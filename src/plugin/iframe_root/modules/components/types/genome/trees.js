define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/jsonRpc/genericClient'
], function (
    ko,
    reg,
    gen,
    html,
    GenericClient
) {
    'use strict';
    const t = html.tag,
        div = t('div');

    class ViewModel {
        constructor(params, context) {
            this.runtime = context.$root.runtime;

            this.trees = [];
        }

        fetchTrees() {
            var workspace = new GenericClient({
                module: 'Workspace',
                url: this.runtime.getConfig('services.workspace.url'),
                token: this.runtime.service('session').getAuthToken()
            });
            var objectIdentity = {
                ref: this.options.workspaceID + '/' + this.options.genomeID
            };
            return workspace.callFunc('list_referencing_objects', [[objectIdentity]])
                .spread((data) => {
                    const referencingTrees = data[0]
                        .filter((referencingObject) => {
                            const type = referencingObject[2].split('-')[0];
                            return (type === 'KBaseTrees.Tree');
                        })
                        .map((referencingTree) => {
                            return {
                                wsid: referencingTree[6],
                                id: referencingTree[0],
                                name: referencingTree[1]
                            };
                        });
                    this.trees = referencingTrees;
                    if (this.trees.length > 0) {
                        this.currentTree = 0;
                    }
                    return null;
                });
        }
    }

    function template() {
        return div('trees here...');
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});