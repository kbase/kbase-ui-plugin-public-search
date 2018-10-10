define([
    './base'
], function (
    base
) {
    'use strict';

    class MediaObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.data.name || this.object.object_name;
        }

        getDetail() {
            return {
                id:this.object.data.id,
                isDefined:this.object.data.isDefined,
                isMinimal:this.object.data.isMinimal,
                compoundCount:this.object.data.mediacompounds,
                name:this.object.data.name,
                type:this.object.data.type
            };
        }
    }

    return MediaObject;
});