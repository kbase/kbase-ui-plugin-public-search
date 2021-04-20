define([
    './assembly',
    './fbaModel',
    './genome',
    './media',
    './narrative',
    './pairedEndLibrary',
    './pangenome',
    './rnaSeqSampleSet',
    './singleEndLibrary',
    './tree',
    './default',
], function (
    AssemblyObject,
    FBAModelObject,
    GenomeObject,
    MediaObject,
    NarrativeObject,
    PairedEndLibraryObject,
    PangenomeObject,
    RNASeqSampleSetObject,
    SingleEndLibraryObject,
    TreeObject,
    DefaultObject
) {
    'use strict';

    // // case 'assembly':
    // //     return AssemblyComponent;
    // // case 'fbamodel':
    // //     return FBAModelComponent;
    // case 'genome':
    //     return GenomeObject;
    // // case 'narrative':
    // //     return NarrativeComponent;
    // // case 'singleendlibrary':
    // //     return SingleEndLibraryComponent;
    // // case 'pairedendlibrary':
    // //     return PairedEndLibraryComponent;
    // // case 'rnaseqsampleset':
    // //     return RNASeqSampleSetComponent;
    // // case 'pangenome':
    // //     return PangenomeComponent;
    // case 'tree':
    //     return new TreeObject({object});
    // // case 'media':
    // //     return MediaComponent;
    // default:
    //     return new DefaultObject({object});
    // }

    const searchObjectMap = {
        assembly: AssemblyObject,
        fbamodel: FBAModelObject,
        genome: GenomeObject,
        media: MediaObject,
        narrative: NarrativeObject,
        pairedendlibrary: PairedEndLibraryObject,
        pangenome: PangenomeObject,
        rnaseqsampleset: RNASeqSampleSetObject,
        singleendlibrary: SingleEndLibraryObject,
        tree: TreeObject
    };

    function makeSearchObject(object) {
        const searchObjectClass = searchObjectMap[object.workspace_type_name.toLowerCase()] || DefaultObject;
        return new searchObjectClass({object});
    }

    return {makeSearchObject};
});