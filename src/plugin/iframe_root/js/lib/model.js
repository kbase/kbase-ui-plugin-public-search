define([
    'knockout'
], function (
    ko
) {
    'use strict';

    class Model {
        constructor({runtime}) {
            this.runtime = runtime;
            // console.log('runtime?', runtime);
            this.searchAPI = this.runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: false
            });
        }

        searchSummary({query, withUserData, withReferenceData, types}) {

            if (query === '*') {
                query = null;
            }

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1
                },
                access_filter: {
                    with_private: 0,
                    with_public: 1
                }
            };

            if (types) {
                param.object_types = types;
            }

            if (withReferenceData) {
                if (withUserData) {
                    // nothing to do, put no source tags restrictions at all
                } else {
                    // only refdata.
                    param.match_filter.source_tags = ['refdata'];
                    param.match_filter.source_tags_blacklist = 0;
                }
            } else {
                if (withUserData) {
                    // only narrativedata
                    param.match_filter.source_tags = ['refdata'];
                    param.match_filter.source_tags_blacklist = 1;
                } else {
                    // should never occur
                    throw new Error('Must select one or both of "refdata" or/and "narrativedata"');
                }
            }

            return this.searchAPI.callFunc('search_types', [param])
                .spread(function (result) {
                    return result;
                });
        }

        search({query, start, count, withUserData, withReferenceData, types, sorting}) {
            const sortingRules = sorting.map(({propertyKey, direction, isObject}) => {
                return {
                    property: propertyKey,
                    ascending: direction === 'ascending' ? 1 : 0,
                    is_object_property: isObject ? 1 : 0
                };
            });

            if (query === '*') {
                query = null;
            }

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1
                },
                pagination: {
                    start: start,
                    count: count
                },
                post_processing: {
                    ids_only: 0,
                    skip_info: 0,
                    skip_keys: 0,
                    skip_data: 0,
                    include_highlight: 1,
                    add_narrative_info: 1,
                    add_access_group_info: 1
                },
                access_filter: {
                    with_private: 0,
                    with_public: 1
                },
                sorting_rules: sortingRules
            };

            if (withReferenceData) {
                if (withUserData) {
                    // nothing to do, put no source tags restrictions at all
                } else {
                    // only refdata.
                    param.match_filter.source_tags = ['refdata'];
                    param.match_filter.source_tags_blacklist = 0;
                }
            } else {
                if (withUserData) {
                    // only narrativedata
                    param.match_filter.source_tags = ['refdata'];
                    param.match_filter.source_tags_blacklist = 1;
                } else {
                    // should never occur
                    throw new Error('Must select one or both of "refdata" or/and "narrativedata"');
                }

            }

            if (types) {
                param.object_types = types;
            }

            return this.searchAPI.callFunc('search_objects', [param])
                .spread(function (result) {
                    return result;
                });
        }
    }

    const columns = [
        {
            name: 'description',
            label: 'Description',
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
            // sort: {
            //     keyName: 'source',
            //     direction: ko.observable('ascending'),
            //     active: ko.observable(false)
            // },
            width: 1,
            // action: {
            //     name: 'doAddPi'
            // }
        },
        {
            name: 'owner',
            label: 'Owner',
            type: 'string',
            // sort: {
            //     keyName: 'owner',
            //     isObject: false,
            //     direction: ko.observable('ascending'),
            //     active: ko.observable(false)
            // },
            width: 1,
            // action: {
            //     name: 'doAddPi'
            // }
        },

        {
            name: 'name',
            label: 'Title',
            type: 'string',
            // sort: {
            //     keyName: 'source',
            //     direction: ko.observable('ascending'),
            //     active: ko.observable(false)
            // },
            width: 3,
            // action: {
            //     name: 'doAddPi'
            // }
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

    const columnsMap = columns.reduce(function (acc, col) {
        acc[col.name] = col;
        return acc;
    }, {});

    return {Model, columns, columnsMap};
});