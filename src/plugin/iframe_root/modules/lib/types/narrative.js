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
            return this.object.data['narrative_title'];
        }

        getDetail() {
            return {
                title: this.object.data['narrative_title']
            };
        }
    }

    return NarrativeObject;
});