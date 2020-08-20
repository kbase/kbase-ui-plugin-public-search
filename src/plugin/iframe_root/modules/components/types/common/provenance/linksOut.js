define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_lib/jsonRpc/genericClient',
    'kb_lib/workspaceUtils',
    'kb_lib/props',
    './linksOutNode'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    builders,
    GenericClient,
    workspaceUtils,
    props,
    NodeComponent
) {
    'use strict';

    /*
    This is essentially object composition - which objects, other than this one,
    contribute to the entire data scope for this object.
    See workspace.get_objects2, the refs field in the returned ObjectData.
    */

    function fetchReferencedObjects(runtime, ref) {
        const workspace = new GenericClient({
            module: 'Workspace',
            url: runtime.config('services.Workspace.url'),
            // TODO: how to let this be dynamic.
            token: runtime.service('session').getAuthToken()
        });

        function getTypeDisplay(typeName) {
            let fieldsToInclude;
            let displayMapping;
            switch (typeName) {
            case 'Genome':
                fieldsToInclude = ['scientific_name'];
                displayMapping = [{
                    from: 'data.scientific_name',
                    to: 'title'
                }];
                break;
            case 'Assembly':
                fieldsToInclude = ['assembly_id'];
                displayMapping = [{
                    from: 'data.assembly_id',
                    to: 'title'
                }];
                break;
            case 'Taxon':
                fieldsToInclude = ['scientific_name'];
                displayMapping = [{
                    from: 'data.scientific_name',
                    to: 'title'
                }];
                break;
            case 'Tree':
                fieldsToInclude = ['name', 'description', 'type'],
                displayMapping = [{
                    from: 'data.name',
                    to: 'title'
                }];
                break;
            case 'RNASeqSampleSet':
                fieldsToInclude = ['sampleset_id', 'sampleset_desc'],
                displayMapping = [{
                    from: 'data.sampleset_id',
                    to: 'title'
                }];
                break;
            case 'SingleEndLibrary':
                fieldsToInclude = ['source.source', 'source.source_id'],
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'PairedEndLibrary':
                fieldsToInclude = ['source.source', 'source.source_id'],
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'ConditionSet':
                fieldsToInclude = ['ontology_mapping_method'],
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'ContigSet':
                fieldsToInclude = ['name', 'id'];
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'Media':
                fieldsToInclude = ['name', 'id'];
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'FBAModel':
                fieldsToInclude = ['name', 'id'];
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'OntologyDictionary':
                // just map a field so we don't get the whole object.
                fieldsToInclude = ['auto_generated_by'];
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'Narrative':
                // just map a field so we don't get the whole object.
                fieldsToInclude = ['nbformat', 'nbformat_minor'];
                displayMapping = [{
                    from: 'info.1',
                    to: 'title'
                }];
                break;
            case 'Pangenome':
                // just map a field so we don't get the whole object.
                fieldsToInclude = ['name'];
                displayMapping = [{
                    from: 'data.name',
                    to: 'title'
                }];
                break;
            default:
                throw new Error('Sorry, no handler for ' + typeName);
            }

            return {
                fieldsToInclude, displayMapping
            };
        }

        function fetchRefs(ref, level) {
            return workspace.callFunc('get_objects2', [{
                objects: [{
                    ref: ref
                }],
                ignoreErrors: 1,
                no_data: 1
            }])
            // .spread((result) => {
            //     const objectInfo = workspaceUtils.objectInfoToObject(result.data[0].info);

                //     // return Promise.props({
                //     //     objectInfo,
                //     //     refs: result.data[0].refs,
                //     //     display: fetchObjectDisplay(objectInfo)
                //     // });
                // })
                .spread((result) => {
                    if (result.data[0] === null) {
                        return {
                            ref: ref,
                            accessible: false,
                            workspaceId: null,
                            objectId: null,
                            objectVersion: null,
                            name: null,
                            type: null,
                            typeID: null,
                            children: []
                        };
                    }
                    const objectInfo = workspaceUtils.objectInfoToObject(result.data[0].info);
                    const refs = result.data[0].refs;
                    return Promise.props(
                        {
                            ref: ref,
                            accessible: true,
                            workspaceId: objectInfo.wsid,
                            objectId: objectInfo.id,
                            objectVersion: objectInfo.version,
                            name: objectInfo.name,
                            type: objectInfo.typeName,
                            typeID: objectInfo.type,
                            // display: display,
                            children: Promise.all(refs.map((ref) => { return fetchRefs(ref, level + 1); }))
                                .then((result) => {
                                    return result.sort((a, b) => {
                                        if (a.type === null) {
                                            if (b.type === null) {
                                                return 0;
                                            } else {
                                                return -1;
                                            }
                                        } else if (b.type === null) {
                                            return 1;
                                        } else {
                                            return a.type.localeCompare(b.type);
                                        }
                                    });
                                })
                        }
                    );
                });
        }

        return fetchRefs(ref, 0)
            .then((tree) => {
                // get all of the node refs
                // make one request for all node refs for further object info
                // update each node with the display.
                function walkTree(tree, fun) {
                    function walker(node) {
                        try {
                            fun(node);
                            node.children.forEach((node) => {
                                walker(node);
                            });
                        } catch (ex) {
                            console.error('ERROR walking tree', ex);
                        }
                    }
                    walker(tree);
                }

                const nodes = [];
                walkTree(tree, (node) => {
                    if (!node.type) {
                        node.display = {
                            title: '** Inaccessible **'
                        };
                        return;
                    }
                    nodes.push({
                        node: node,
                        displaySpec: getTypeDisplay(node.type)
                    });
                });

                const param = nodes.map((node) => {
                    return {
                        ref: node.node.ref,
                        included: node.displaySpec.fieldsToInclude
                    };
                });

                return workspace.callFunc('get_objects2', [{
                    objects: param,
                    ignoreErrors: 1
                    // no_data: 1
                }])
                    .spread((result) => {
                        // here we update the node objects we put together above.
                        result.data.forEach((object, index) => {
                            if (object === null) {
                                node.node.display = {
                                    title: 'Unknown'
                                };
                                return;
                            }
                            const node = nodes[index];
                            const display = node.displaySpec.displayMapping.reduce((displayFields, {from, to}) => {
                                displayFields[to] = props.getProp(object, from);
                                return displayFields;
                            }, {});
                            node.node.display = display;
                        });

                        return tree;
                    })
                    .catch((err) => {
                        console.error('Error getting object display info', err, param, tree);
                        return {
                            title: '** ERROR **'
                        };
                    });
            });
    }

    class ViewModel extends ViewModelBase{
        constructor(params, context) {
            super(params);
            const {object} = params;
            this.runtime = context.$root.runtime;

            this.object = object;

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.refTree = ko.observable();

            this.getReferencedObjects(this.object.objectInfo)
                .then((refTree) => {
                    this.refTree(refTree);
                    this.ready(true);
                })
                .catch((err) => {
                    this.error(err);
                    console.error('error', err);
                });
        }

        getReferencedObjects(objectInfo) {
            return fetchReferencedObjects(this.runtime, objectInfo.ref);
        }

    }

    const t = html.tag,
        p = t('p'),
        div = t('div');

    function buildRefTree() {
        return gen.component({
            name: NodeComponent.name(),
            params: {
                tree: 'refTree'
            }
        });
    }

    function buildIntro() {
        return div([
            p([
                'The "Object Composition" view shows all objects which are linked ',
                'from this object. In this sense, the entire data set encompassed by ',
                'this object is composed of this object plus all other objects it ',
                'references.'
            ]),
            p([
                'This chart reads like an outline, in which indentation level indicates ',
                'that the indented objects are linked to the object directly above.'
            ])
        ]);
    }

    function template() {
        return div({
            style: {
                marginTop: '10px'
            }
        }, [
            buildIntro(),
            gen.if('ready',
                buildRefTree(),
                builders.loading())
        ]);
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});