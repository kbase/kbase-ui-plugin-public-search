define([
    './base'
], function (
    base
) {
    'use strict';

    class GenomeObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }
    }

    return GenomeObject;
});