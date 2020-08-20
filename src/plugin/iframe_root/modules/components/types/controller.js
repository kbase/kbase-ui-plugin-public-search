define([
    './genome/genome',
    './taxon/taxon',
    './narrative/narrative',
    './default/default',
    './pangenome/pangenome',
    './tree/tree',
    './rnaSeqSampleSet/main'
], function (
    GenomeComponent,
    TaxonComponent,
    NarrativeComponent,
    DefaultComponent,
    PangenomeComponent,
    TreeComponent,
    RNASeqSampleSetComponent
) {
    'use strict';

    function typeToComponent(type) {
        switch (type.toLowerCase()) {
        case 'genome':
            return GenomeComponent;
        // case 'taxon':
        //     return TaxonComponent;
        case 'rnaseqsampleset':
            return RNASeqSampleSetComponent;

        case 'narrative':
            return NarrativeComponent;
        case 'pangenome':
            return PangenomeComponent;
        case 'tree':
            return TreeComponent;
        default:
            return DefaultComponent;
        }
    }

    return {typeToComponent};
});