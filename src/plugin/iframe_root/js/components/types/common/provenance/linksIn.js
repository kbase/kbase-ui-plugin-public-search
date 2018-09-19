define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    '../../../../lib/serviceUtils',
    '../../../table'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    serviceUtils,
    TableComponent
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
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        },
                        // component: {
                        //     name: PubMedLinkComponent.name(),
                        //     params: {
                        //         text: 'title',
                        //         id: 'id'
                        //     }
                        // }
                    },
                    {
                        name: 'type',
                        label: 'Type',
                        width: 15,
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'saved',
                        label: 'Saved',
                        width: 10,
                        format: {
                            type: 'date',
                            format: 'MM/DD/YYY'
                        },
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'savedBy',
                        label: 'Saved By',
                        width: 15,
                        // component: {
                        //     name: AuthorsComponent.name(),
                        //     params: {authors: 'authors'}
                        // },
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'container',
                        label: 'Container',
                        width: 30,
                        // component: {
                        //     name: AuthorsComponent.name(),
                        //     params: {authors: 'authors'}
                        // },
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
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
                    console.log('got...', this.referencingObjects());
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
                    return result[0].map((info) => {
                        const objectInfo = serviceUtils.objectInfoToObject(info);
                        return {
                            name: objectInfo.name,
                            type: objectInfo.typeName,
                            saved: objectInfo.saveDate,
                            savedBy: objectInfo.saved_by,
                            container: String(objectInfo.wsid)
                        };
                    });
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
                flexDirection: 'row',
                marginTop: '10px'
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

    function template() {
        // TODO: some layout here...
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.col1
            }, 'selector here'),
            div({
                class: style.classes.col2
            }, gen.if('referencingObjects().length > 0',
                buildReferences(),
                div('No referencing objects found')))
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