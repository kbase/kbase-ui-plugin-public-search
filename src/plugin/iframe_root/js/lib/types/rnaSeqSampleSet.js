define([
    './base'
], function (
    base
) {
    'use strict';

    class RNASeqSampleSetObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.data.sampleset_desc || this.object.object_name;
        }

        getDetail() {
            return {
                sampleCount: this.object.data.num_samples || '-',
                description: this.object.data.sampleset_desc || '-',
                source: this.object.data.source || '-'
            };
        }
    }

    return RNASeqSampleSetObject;
});