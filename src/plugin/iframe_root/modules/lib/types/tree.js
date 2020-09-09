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
            return this.object.data.tree_name || this.object.object_name;
        }

        getDetail() {
            return {
                type: this.object.data.type
            };
        }
    }

    return TreeObject;
});