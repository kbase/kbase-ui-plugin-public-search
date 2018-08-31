define([
    'kb_lib/jsonRpc/genericClient'
], function (
    GenericClient
) {
    'use strict';

    function tryInaccessibleObject(runtime, ref) {
        const workspace = new GenericClient({
            runtime: runtime,
            module: 'Workspace',
            url: runtime.config('services.workspace.url')
        });
        workspace.callFunc('get_object_info3', [{
            objects: [{
                ref: ref
            }]
        }])
            .then((result) => {
                console.log('inaccessible object', result);
                return null;
            })
            .catch((err) => {
                console.error('inaccessible object', err.message);
                return null;
            });
    }

    return {tryInaccessibleObject};
});