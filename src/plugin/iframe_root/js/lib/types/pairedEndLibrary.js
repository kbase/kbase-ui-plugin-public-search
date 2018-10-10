define([
    './base'
], function (
    base
) {
    'use strict';

    class PairedEndLibraryObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.object_name;
        }

        getDetail() {
            return {
                gcContent: this.object.data.gc_content,
                insertMeanSize: this.object.data.insert_size_mean,
                phredType: this.object.data.phred_type,
                meanQualityScore: this.object.data.qual_mean,
                readCount: this.object.data.read_count,
                readMeanLength: this.object.data.read_length_mean,
                sequencingTechnology: this.object.data.sequencing_tech,
                libraryFiles: this.object.data.lib1
            };
        }
    }

    return PairedEndLibraryObject;
});