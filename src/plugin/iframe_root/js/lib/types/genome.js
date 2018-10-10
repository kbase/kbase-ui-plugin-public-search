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

        getTitle() {
            if (this.object.data.scientific_name) {
                return this.object.data.scientific_name;
            } else if (this.object.data.name) {
                return this.object.data.name;
            }
        }

        getDetail() {
            return {
                domain: this.object.data.domain,
                scientificName: this.object.data.scientific_name,
                contigCount: this.object.data.num_contigs,
                featureCount: this.object.data.features,
                source: this.object.data.source,
                sourceId: this.object.data.source_id,
            };
        }
    }

    return GenomeObject;
});