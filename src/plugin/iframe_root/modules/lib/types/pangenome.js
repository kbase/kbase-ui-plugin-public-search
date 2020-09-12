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
            return this.object.data.pangenome_name;
        }

        getDetail() {
            return {
                name: this.object.data.pangenome_name,
                genomeRefCount: this.object.data.genome_upas.length,
                type: this.object.data.type
            };
        }
    }

    return PangenomeObject;
});