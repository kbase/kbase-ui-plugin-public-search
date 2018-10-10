define([], function () {
    'use strict';

    class BaseObject {
        constructor({object}) {
            this.object = object;
            const [, workspaceId, objectId, version] = object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
            // console.log('object', workspaceId, objectId, version);
            this.workspaceId = workspaceId;
            this.objectId = objectId;
            this.version = version;
            this.ref = [workspaceId, objectId, version].join('/');

            // Standard fields
            // getTitle is not defined ... which makes this a sortof abstract base class.
            this.title = this.getTitle();

            this.detail = this.getDetail();
        }

        getDetail() {
            return {};
        }
    }

    return {BaseObject};
});