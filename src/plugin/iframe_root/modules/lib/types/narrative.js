define([
    './base'
], function (
    base
) {
    'use strict';

    class NarrativeObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.key_props['title'];
        }

        getDetail() {
            return {
                title: this.object.key_props.title
            };
        }
    }

    return NarrativeObject;
});