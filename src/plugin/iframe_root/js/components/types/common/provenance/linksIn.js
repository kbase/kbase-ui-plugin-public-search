define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_lib/workspaceUtils',
    '../../../table',
    './objectLink'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    builders,
    workspaceUtils,
    TableComponent,
    ObjectLinkComponent
) {
    'use strict';

    /*
    Other objects which reference this one.
    */

    class ViewModel extends ViewModelBase{
        constructor(params, context) {
            super(params);
            const {ref} = params;

            this.runtime = context.$root.runtime;
            this.ref = ref;

            this.ready = ko.observable(false);
            this.error = ko.observable(null);

            this.referencingObjects = ko.observableArray();

            this.table = {
                style: {
                    backgroundColor: '#FFF'
                },
                rowStyle: {
                    borderBottom: '1px silver solid'
                },
                sort: {
                    column: ko.observable('name'),
                    direction: ko.observable('asc')
                },
                columns: [
                    {
                        name: 'name',
                        label: 'Name',
                        width: 30,
                        html: false,
                        sort: true,
                        component: {
                            name: ObjectLinkComponent.name(),
                            params: {
                                name: 'name',
                                ref: 'ref'
                            }
                        }
                    },
                    {
                        name: 'type',
                        label: 'Type',
                        width: 15,
                        sort: true
                    },
                    {
                        name: 'saved',
                        label: 'Saved',
                        width: 15,
                        format: {
                            type: 'date',
                            format: 'MMM D, YYYY'
                        },
                        sort: true
                    },
                    {
                        name: 'savedBy',
                        label: 'Saved By',
                        width: 15,
                        // component: {
                        //     name: AuthorsComponent.name(),
                        //     params: {authors: 'authors'}
                        // },
                        sort: true
                    },
                    {
                        name: 'container',
                        label: 'Narrative',
                        width: 25,
                        // component: {
                        //     name: AuthorsComponent.name(),
                        //     params: {authors: 'authors'}
                        // },
                        sort: true
                    }

                ]
            };
            this.table.columnMap = this.table.columns.reduce((map, column) => {
                map[column.name] = column;
                return map;
            }, {});

            this.getReferencingObjects()
                .then((referencingObjects) => {
                    this.ready(true);
                    this.referencingObjects(referencingObjects);
                })
                .catch((err) => {
                    console.error('ERROR!', err);
                });
        }

        getReferencingObjects() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000
            });
            // Note this is a bulk api, so it accepts a list and returns a list.
            return workspace.callFunc('list_referencing_objects', [[{
                ref: this.ref
            }]])
                .spread((result) => {
                    const objectsInfo = result[0].map((info) => {
                        return workspaceUtils.objectInfoToObject(info);
                    });

                    return Promise.all(objectsInfo.map((info) => {
                        return workspace.callFunc('get_workspace_info', [{
                            id: info.wsid
                        }])
                            .spread((info) => {
                                return workspaceUtils.workspaceInfoToObject(info);
                            });
                    }))
                        .then((workspaces) => {
                            return objectsInfo.map((objectInfo, index) => {
                                const workspace = workspaces[index];
                                let containerTitle;
                                if (workspace.metadata && workspace.metadata.narrative_nice_name) {
                                    containerTitle = workspace.metadata.narrative_nice_name;
                                } else {
                                    containerTitle = workspace.name;
                                }
                                return {
                                    name: objectInfo.name,
                                    ref: objectInfo.ref,
                                    type: objectInfo.typeName,
                                    saved: objectInfo.saveDate,
                                    savedBy: objectInfo.saved_by,
                                    container: containerTitle
                                    // container: {
                                    //     workspaceId: workspace.wsid,
                                    //     title: workspace.workspace
                                    // }
                                };
                            });
                        });
                });
        }
    }

    // VIEW

    const t = html.tag,
        p = t('p'),
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
        col0: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        col1: {
            css: {
                flex: '0 0 10em',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        col2: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        container: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }
    });

    function buildReferences() {
        return div({
            class: style.classes.container,
            dataBind:{
                component: {
                    name: TableComponent.quotedName(),
                    params: {
                        table: 'table',
                        rows: 'referencingObjects'
                    }
                }
            }
        });
    }

    function buildIntro() {
        return div([
            p([
                'The "Objects Referencing" view shows all objects which ',
                'are linked to, or use, this one.'
            ]),
        ]);
    }
    // function template() {
    //     // TODO: some layout here...
    //     return div({
    //         class: style.classes.component
    //     }, [
    //         div({
    //             class: style.classes.col0
    //         }, gen.if('referencingObjects().length > 0',
    //             buildReferences(),
    //             div('No referencing objects found')))
    //     ]);
    // }

    function buildNotFound() {
        return div({
            class: 'alert alert-warning'
        }, 'No other objects reference this one.');
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            buildIntro(),
            gen.if('ready',
                gen.if('referencingObjects().length > 0',
                    buildReferences(),
                    buildNotFound()),
                builders.loading())
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