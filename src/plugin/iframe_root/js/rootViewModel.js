define([
    'bluebird',
    'knockout',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/httpUtils'
], function (
    Promise,
    ko,
    ViewModelBase,
    httpUtils
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
                // console.log('show feedback?');
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
            // console.log('fields??', fields, this.runtime.service('session'));
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
                    // console.log('hey, got method specs info...', result);
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
                    // console.log('hey, got method map!!', this.methodMap);
                })
                .catch((err) => {
                    console.error('ERROR', err.message);
                    return null;
                });
        }
    }

    return RootViewModel;
});