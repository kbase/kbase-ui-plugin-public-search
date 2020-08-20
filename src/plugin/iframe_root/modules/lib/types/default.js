define([
    './base'
], function (
    base
) {
    'use strict';

    class DefaultSearchObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            if (this.object.data) {
                if (this.object.data.scientific_name) {
                    return this.object.data.scientific_name;
                } else if (this.object.data.name) {
                    return this.object.data.name;
                }
            }
            return this.object.object_name;
        }
    }

    return DefaultSearchObject;
});