define([
    './genome/genome',
    './taxon/taxon',
    './narrative/narrative',
    './default/default'
], function (
    GenomeComponent,
    TaxonComponent,
    NarrativeComponent,
    DefaultComponent
) {
    'use strict';

    function typeToComponent(type) {
        switch (type.toLowerCase()) {
        case 'genome':
            return GenomeComponent;
        case 'taxon':
            return TaxonComponent;
        case 'narrative':
            return NarrativeComponent;
        default:
            return DefaultComponent;
        }
    }

    return {typeToComponent};
});