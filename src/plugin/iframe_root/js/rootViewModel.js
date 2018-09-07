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
            const {runtime, hostChannel} = params;
            this.runtime = runtime;
            this.hostChannel = hostChannel;

            this.ready = ko.observable(false);
            this.error = ko.observable();

            this.methodMap = null;

            this.supportedDataTypes = [
                {
                    value: 'Assembly',
                    label: 'Assembly'
                },
                {
                    value: 'FBAModel',
                    label: 'FBA Model',
                },
                {
                    value: 'Genome',
                    label: 'Genome',
                },
                {
                    value: 'PairedEndLibrary',
                    label: 'Paired-End Library'
                },
                {
                    value: 'Pangenome',
                    label: 'Pangenome',
                },
                {
                    value: 'RNASeqSampleSet',
                    label: 'RNA-Seq Sample Set'
                },
                {
                    value: 'SingleEndLibrary',
                    label: 'Single-End Library'
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
                }
            ];

            this.bus.on('show-feedback', () => {
                this.showFeedback();
            });

            this.getMethodMap()
                .then((methodMap) => {
                    this.methodMap = methodMap;
                    this.ready(true);
                })
                .catch((err) => {
                    this.error(err);
                });

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
                    label: 'Date',
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
                    name: 'source',
                    label: 'Data Source',
                    type: 'string',
                    width: 1
                },
                {
                    name: 'owner',
                    label: 'Owner',
                    type: 'string',
                    width: 1
                },
                {
                    name: 'name',
                    label: 'Title',
                    type: 'string',
                    width: 3
                }
                // {
                //     name: 'inspect',
                //     label: 'Inspect',
                //     type: 'action',
                //     width: 5,
                //     component: InspectControl.name(),
                //     rowStyle: {
                //         textAlign: 'center'
                //     },
                //     headerStyle: {
                //         textAlign: 'center'
                //     }
                // },
                // {
                //     name: 'copy',
                //     label: 'Copy',
                //     width: 6,
                //     component: StageControl.name(),
                //     rowStyle: {
                //         textAlign: 'center'
                //     },
                //     headerStyle: {
                //         textAlign: 'center'
                //     }
                // }
            ];

            this.columnsMap = this.columns.reduce(function (acc, col) {
                acc[col.name] = col;
                return acc;
            }, {});
        }

        googleFormLink(arg) {
            const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScfZEQlO2Zq1ZgYQkn0pEIlXJapEOxrdeZmHY4PqvIyy7sugw/viewform';
            const query = {
                usp: 'pp_url',
                'entry.45112532': arg.username,
                'entry.1257375807': arg.realname,
                'entry.1670959681': arg.email,
                'entry.250050267': arg.subject
            };
            return baseUrl + '?' + httpUtils.encodeQuery(query);
        }

        showFeedback() {
            const fields = {
                username: this.runtime.service('session').getUsername() || '',
                realname: this.runtime.service('session').getRealname() || '',
                email: this.runtime.service('session').getEmail() || '',
                subject: 'Public Search'
            };
            // window.open(this.googleFormLink(fields), '_blank');
            this.hostChannel.send('open-window', {
                url: this.googleFormLink(fields),
                name: '_blank'
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
    }

    return RootViewModel;
});