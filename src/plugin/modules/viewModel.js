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
                    value: 'fbamodel',
                    label: 'FBA Model',
                },
                {
                    value: 'genome',
                    label: 'Genome',
                },
                {
                    value: 'pangenome',
                    label: 'Pangenome',
                },
                {
                    value: 'taxon',
                    label: 'Taxon',
                },
                {
                    value: 'tree',
                    label: 'Species Tree',
                }
            ];
        }
    }

    return ViewModel;
});