define([
    'knockout',
    'kb_knockout/lib/viewModelBase'
], function (
    ko,
    ViewModelBase
) {
    'use strict';

    // class SearchError {
    //     constructor({name, message, code, detail, info}) {
    //         this.name = name;
    //         this.message = message;
    //         this.code = code;
    //         this.detail = detail;
    //         this.info = info;
    //     }
    // }

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {runtime} = params;
            this.runtime = runtime;
            this.supportedDataTypes = [
                {
                    value: 'FBAModel',
                    label: 'FBA Model',
                },
                {
                    value: 'Genome',
                    label: 'Genome',
                },
                {
                    value: 'Pangenome',
                    label: 'Pangenome',
                },
                // {
                //     value: 'taxon',
                //     label: 'Taxon',
                // },
                {
                    value: 'Tree',
                    label: 'Species Tree',
                },
                {
                    value: 'Media',
                    label: 'Media'
                },
                {
                    value: 'MediaCompound',
                    label: 'Media Compound'
                }
            ];
        }
    }

    return ViewModel;
});