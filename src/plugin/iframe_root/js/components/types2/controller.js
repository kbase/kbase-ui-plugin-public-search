define([
    './genome',
    './narrative',
    './default',
    './pangenome',
    './tree',
    './fbaModel',
    './rnaSeqSampleSet',
    './assembly',
    './pairedEndLibrary',
    './singleEndLibrary',
    './media'
], function (
    GenomeComponent,
    NarrativeComponent,
    DefaultComponent,
    PangenomeComponent,
    TreeComponent,
    FBAModelComponent,
    RNASeqSampleSetComponent,
    AssemblyComponent,
    PairedEndLibraryComponent,
    SingleEndLibraryComponent,
    MediaComponent
) {
    'use strict';

    function typeToComponent(type) {
        switch (type.toLowerCase()) {
        case 'assembly':
            return AssemblyComponent;
        case 'fbamodel':
            return FBAModelComponent;
        case 'genome':
            return GenomeComponent;
        case 'narrative':
            return NarrativeComponent;
        case 'singleendlibrary':
            return SingleEndLibraryComponent;
        case 'pairedendlibrary':
            return PairedEndLibraryComponent;
        case 'rnaseqsampleset':
            return RNASeqSampleSetComponent;
        case 'pangenome':
            return PangenomeComponent;
        case 'tree':
            return TreeComponent;
        case 'media':
            return MediaComponent;
        default:
            return DefaultComponent;
        }
    }

    return {typeToComponent};
});