define([
    './genome',
    // './narrative',
    './default'
    // './pangenome',
    // './tree',
    // './fbaModel',
    // './rnaSeqSampleSet',
    // './assembly',
    // './pairedEndLibrary',
    // './singleEndLibrary',
    // './media'
], function (
    GenomeObject,
    // NarrativeComponent,
    DefaultObject
    // PangenomeComponent,
    // TreeComponent,
    // FBAModelComponent,
    // RNASeqSampleSetComponent,
    // AssemblyComponent,
    // PairedEndLibraryComponent,
    // SingleEndLibraryComponent,
    // MediaComponent
) {
    'use strict';

    function makeSearchObject(object) {
        console.log('object', object);
        switch (object.type.toLowerCase()) {
        // case 'assembly':
        //     return AssemblyComponent;
        // case 'fbamodel':
        //     return FBAModelComponent;
        case 'genome':
            return new GenomeObject({object});
        // case 'narrative':
        //     return NarrativeComponent;
        // case 'singleendlibrary':
        //     return SingleEndLibraryComponent;
        // case 'pairedendlibrary':
        //     return PairedEndLibraryComponent;
        // case 'rnaseqsampleset':
        //     return RNASeqSampleSetComponent;
        // case 'pangenome':
        //     return PangenomeComponent;
        // case 'tree':
        //     return TreeComponent;
        // case 'media':
        //     return MediaComponent;
        default:
            return new DefaultObject({object});
        }
    }

    return {makeSearchObject};
});