define([
    './base'
], function (
    base
) {
    'use strict';

    class SingleEndLibraryObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.object_name;
        }

        getDetail() {
            return {
                // Note: Narrative data is removed due to size of narrative data.
                gcContent: this.object.data.gc_content,
                libraryFiles: this.object.data.lib,
                phredType: this.object.data.phred_type,
                meanQualityScore: this.object.data.qual_mean,
                readCount: this.object.data.read_count,
                readMeanLength: this.object.data.read_length_mean,
                sequencingTechnology: this.object.data.sequencing_tech
            };
        }
    }

    return SingleEndLibraryObject;
});