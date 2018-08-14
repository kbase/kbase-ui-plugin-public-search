define([
], function (
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

    class ViewModel {
        constructor({runtime}) {
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
            // Primary search inputs
            // this.searchInput = ko.observable();
            //     this.forceSearch = ko.observable();
            //     this.types = ko.observableArray();
            //     this.dataSources = ko.observableArray();
            //     this.firstItem = ko.observable();
            //     this.pageSize = ko.observable();

            //     // Search state
            //     this.searching = ko.observable();
            //     this.error = ko.observable();
        }
    }

    return ViewModel;
});