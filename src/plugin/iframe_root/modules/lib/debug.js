define([
    'kb_lib/jsonRpc/genericClient'
], function (
    GenericClient
) {
    'use strict';

    function tryInaccessibleObject(runtime, guid, ref) {
        const workspace = new GenericClient({
            token: runtime.service('session').getAuthToken(),
            module: 'Workspace',
            url: runtime.config('services.workspace.url')
        });
        workspace.callFunc('get_object_info3', [{
            objects: [{
                ref: ref
            }]
        }])
            .then((result) => {
                console.warn('inaccessible object', result);
                return null;
            })
            .catch((err) => {
                console.error('inaccessible object', ref, guid, err.message);
                return null;
            });
    }

    return {tryInaccessibleObject};
});