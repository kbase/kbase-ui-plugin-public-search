define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    'kb_lib/props',
    'kb_service/utils',
    '../lib/ui',
    './types/controller',
    './searchError'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    props,
    serviceUtils,
    ui,
    TypeController,
    SearchErrorComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            this.parent = context.$parent;

            const {row} = params;
            this.row = row;

            this.workspace = context.$root.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authenticated: true
            });

            this.object = ko.observable();

            this.error = ko.observable();
            this.component = ko.pureComputed(() => {
                const object = this.object();
                if (!object) {
                    return null;
                }
                return TypeController.typeToComponent(object.objectInfo.typeName);
            });

            TypeController.typeToComponent('genome');
            // this.objectInfo = ko.observable();
            // this.workspaceInfo = ko.observable();

            this.bus.on('close', () => {
                this.parent.send('close');
            });

            this.fetchObjectInfo();
        }

        onClose() {
            this.parent.send('close');
        }

        onView() {
            const ref = this.row.metadata.ref;
            window.open('#dataview/' + ref, '_blank');
        }

        fetchObjectInfo() {
            const firstRef = [
                String(this.row.metadata.workspaceId),
                String(this.row.metadata.objectId),
                String(1)
            ].join('/');
            Promise.all([
                this.workspace.callFunc('get_object_info3', [{
                    objects: [{
                        ref: this.row.metadata.ref,
                    }, {
                        ref: firstRef
                    }],
                    includeMetadata: 1,
                    ignoreErrors: 1
                }])
                    .spread((result) => {
                        return result;
                    }),
                this.workspace.callFunc('get_workspace_info', [{
                    id: this.row.metadata.workspaceId
                }])
                    .spread((result) => {
                        return result;
                    })
            ])
                .spread((obj_info_result, workspace_info) => {
                // .spread(([[object_info]], [workspace_info]) => {
                    const [object_info, first_object_info] = obj_info_result.infos;
                    if (!object_info) {
                        throw new Error('Object could not be accessed');
                    }
                    const obj = {
                        objectInfo: serviceUtils.objectInfoToObject(object_info),
                        firstObjectInfo: serviceUtils.objectInfoToObject(first_object_info),
                        workspaceInfo: serviceUtils.workspaceInfoToObject(workspace_info),
                    };
                    if (props.hasProp(obj.workspaceInfo, ['metadata', 'narrative'])) {
                        obj.workspaceType = 'narrative';
                    } else if (props.getProp(obj.workspaceInfo, ['metadata', 'searchtags']) === 'refdata') {
                        obj.workspaceType = 'refdata';
                    } else {
                        obj.workspaceType = 'unknown';
                    }
                    // console.log('obj', obj);
                    this.object(obj);
                })
                .catch((err) => {
                    this.error(err);
                    console.error('ERROR', err);
                });
        }
    }

    function buildTitle() {
        return 'Object Inspector';
    }

    function buildBody() {
        return gen.if('component',
            gen.component2({
                name: 'component().name()',
                params: {
                    object: 'object'
                }
            }));
    }

    function buildError() {
        return div({
            dataBind: {
                component: {
                    name: SearchErrorComponent.quotedName(),
                    params: {
                        error: 'error',
                        onClose: 'function(){$component.onClose.call($component)}'
                    }
                }
            }
        });
    }

    // function build

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        gen.if('object',
            ui.buildFullHeightDialog({
                type: 'info',
                title: buildTitle(),
                body: buildBody(),
                buttons: [
                    {
                        label: 'View',
                        onClick: 'onView'
                    },
                    {
                        label: 'Close',
                        onClick: 'onClose'
                    }
                ]
            }),
            gen.if('error',
                buildError(),
                html.loading())));
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});