define([
    './base'
], function (
    base
) {
    'use strict';

    class TreeObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.data.default_node_labels.user1;
        }

        getDetail() {
            return {
                type: this.object.data.type
            };
        }
    }

    return TreeObject;
});