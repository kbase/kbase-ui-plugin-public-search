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
    }

    return DefaultSearchObject;
});