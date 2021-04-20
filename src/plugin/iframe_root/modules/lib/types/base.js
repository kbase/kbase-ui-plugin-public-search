define([], function () {
    'use strict';

    class BaseObject {
        constructor({object}) {
            this.object = object;
            const {
                workspace_id: workspaceId,
                object_id: objectId,
                object_version: version
            } = object;
            this.workspaceId = workspaceId;
            this.objectId = objectId;
            this.version = version;
            this.ref = [workspaceId, objectId, version].join('/');

            // Standard fields
            // getTitle is not defined ... which makes this sort-of an abstract base class.
            this.title = this.getTitle();
            this.detail = this.getDetail();
        }

        getDetail() {
            return {};
        }
    }

    return {BaseObject};
});
