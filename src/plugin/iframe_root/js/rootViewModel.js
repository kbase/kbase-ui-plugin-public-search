define([
    'knockout',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/httpUtils'
], function (
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

            this.bus.on('show-help', () => {
                console.log('show help!');
            });

            this.bus.on('show-feedback', () => {
                // console.log('show feedback?');
                this.showFeedback();

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
    }

    return RootViewModel;
});