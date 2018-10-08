define([], function () {
    'use strict';

    class BaseObject {
        constructor({object}) {
            const [, workspaceId, objectId, version] = object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
            // console.log('object', workspaceId, objectId, version);
            this.workspaceId = workspaceId;
            this.objectId = objectId;
            this.version = version;
        }
    }

    return {BaseObject};
});