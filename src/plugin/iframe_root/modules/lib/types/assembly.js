define([
    './base'
], function (
    base
) {
    'use strict';

    class AssemblyObject extends base.BaseObject {
        constructor(params) {
            super(params);
        }

        getTitle() {
            return this.object.data.name || this.object.object_name;
        }

        getDetail() {
            // Note: Narrative data is removed due to size of narrative data.
            return {
                contigCount: this.object.data.contigs,
                dnaSize: this.object.data.dna_size,
                gcContent: this.object.data.gc_content
            };
        }
    }

    return AssemblyObject;
});