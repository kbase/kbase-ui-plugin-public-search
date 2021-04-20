define([
    'bluebird',
    'knockout',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/httpUtils',
    './components/columns/selection'
], function (
    Promise,
    ko,
    ViewModelBase,
    httpUtils,
    SelectionComponent
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

    class RootViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {runtime, hostChannel, authorized, authorization, pluginParams} = params;
            this.runtime = runtime;
            this.hostChannel = hostChannel;
            this.pluginParams = pluginParams;
            this.authorized = ko.observable(authorized);
            this.authorization = ko.observable(authorization);

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.methodMap = null;

            this.supportedDataTypes = [
                {
                    value: 'Narrative',
                    label: 'Narrative',
                    indexAvailable: true
                },
                {
                    value: 'Assembly',
                    label: 'Assembly',
                    indexAvailable: true
                },
                {
                    value: 'FBAModel',
                    label: 'FBA Model',
                    indexAvailable: true
                },
                {
                    value: 'Genome',
                    label: 'Genome',
                    indexAvailable: true
                },
                {
                    value: 'PairedEndLibrary',
                    label: 'Paired-End Library',
                    indexAvailable: true
                },
                {
                    value: 'Pangenome',
                    label: 'Pangenome',
                    indexAvailable: true
                },
                {
                    value: 'RNASeqSampleSet',
                    label: 'RNA-Seq Sample Set',
                    indexAvailable: true
                },
                {
                    value: 'SingleEndLibrary',
                    label: 'Single-End Library',
                    indexAvailable: true
                },
                // {
                //     value: 'taxon',
                //     label: 'Taxon',
                // },
                {
                    value: 'Tree',
                    label: 'Species Tree',
                    indexAvailable: true
                },
                {
                    value: 'Media',
                    label: 'Media',
                    indexAvailable: true
                }
            ];
            this.supportedDataTypesMap = this.supportedDataTypes.reduce((map, type) => {
                map[type.value] = type;
                return map;
            }, {});

            this.columns = [
                {
                    name: 'selected',
                    label: 'Select',
                    type: 'boolean',
                    sort: null,
                    width: 0.5,
                    style: {
                        textAlign: 'center'
                    },
                    noSelect: true,
                    component: SelectionComponent.name()
                },
                {
                    name: 'description',
                    label: 'Name',
                    type: 'string',
                    sort: null,
                    // width is more like a weight... for all current columns the
                    // widths are summed, and each column's actual width attribute
                    // is set as the percent of total.
                    width: 3
                },
                {
                    name: 'date',
                    label: 'Last changed',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    sort: {
                        propertyKey: 'timestamp',
                        isObject: false,
                        direction: ko.observable('descending'),
                        active: ko.observable(true)
                    },
                    width: 1
                },
                {
                    name: 'type',
                    label: 'Data Type',
                    type: 'string',
                    sort: {
                        propertyKey: 'type',
                        isObject: false,
                        direction: ko.observable('ascending'),
                        active: ko.observable(false)
                    },
                    // width is more like a weight... for all current columns the
                    // widths are summed, and each column's actual width attribute
                    // is set as the percent of total.
                    width: 1
                },
                {
                    name: 'name',
                    label: 'Workspace',
                    type: 'string',
                    width: 3
                },
                {
                    name: 'source',
                    label: 'Type',
                    type: 'string',
                    width: 1
                },
                {
                    name: 'owner',
                    label: 'Owner',
                    type: 'string',
                    width: 1
                }
            ];

            this.columnsMap = this.columns.reduce(function (acc, col) {
                acc[col.name] = col;
                return acc;
            }, {});

            // MAIN
            this.getMethodMap()
                .then((methodMap) => {
                    this.methodMap = methodMap;
                    return this.getAllTypes();
                })
                .then((types) => {
                    this.supportedDataTypes.forEach((supportedType) => {
                        if (types.includes(supportedType.value)) {
                            supportedType.indexAvailable = true;
                            return;
                        }
                        console.warn('omitting unindexed type: ' + supportedType.value);
                        return supportedType.indexAvailable = false;
                    });
                    this.ready(true);
                })
                .catch((err) => {
                    this.error(err);
                });
        }

        getMethodMap() {
            const nms = this.runtime.service('rpc').makeClient({
                module: 'NarrativeMethodStore',
                timeout: 10000,
                authorization: false
            });
            return Promise.all([
                nms.callFunc('list_methods_spec', [{tag: 'dev'}]),
                nms.callFunc('list_methods_spec', [{tag: 'beta'}]),
                nms.callFunc('list_methods_spec', [{tag: 'release'}])
            ])
                .spread(([dev], [beta], [release]) => {
                    const devMap = dev.reduce((methodMap, spec) => {
                        const id = spec.behavior.kb_service_name + '/' +
                                   spec.behavior.kb_service_method;
                        methodMap[id] = spec;
                        return methodMap;
                    }, {});

                    const betaMap = beta.reduce((methodMap, spec) => {
                        const id = spec.behavior.kb_service_name + '/' +
                                   spec.behavior.kb_service_method;
                        methodMap[id] = spec;
                        return methodMap;
                    }, {});

                    const releaseMap = release.reduce((methodMap, spec) => {
                        const id = spec.behavior.kb_service_name + '/' +
                                   spec.behavior.kb_service_method;
                        methodMap[id] = spec;
                        return methodMap;
                    }, {});

                    return {
                        dev: devMap,
                        beta: betaMap,
                        release: releaseMap
                    };
                })
                .catch((err) => {
                    console.error('ERROR', err.message);
                    return null;
                });
        }

        getAllTypes() {
            const search = this.runtime.service('rpc').makeClient({
                module: 'SearchAPI2Legacy',
                timeout: 60000,
                authorization: true
            });
            const param = {
                match_filter: {
                    exclude_subobjects: 1
                },
                access_filter: {
                    with_private: 1,
                    with_public: 1
                }
            };
            return search.callFunc('search_types', [param])
                .spread((result) => {
                    return Object.keys(result.type_to_count);
                });
        }
    }

    return RootViewModel;
});