define([
    './base'
], function (
    base
) {
    'use strict';

    class PangenomeObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.data.name;
        }

        getDetail() {
            return {
                name: this.object.data.name,
                genomeRefCount: this.object.data.genome_refs,
                orthologCount: this.object.data.orthologs,
                type: this.object.data.type
            };
        }
    }

    return PangenomeObject;
});