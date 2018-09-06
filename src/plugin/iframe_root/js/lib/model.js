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
                authenticated: true
            });
        }

        searchSummary({query, withUserData, withReferenceData, types, withPrivate, withPublic}) {
            if (query === '*') {
                query = null;
            }

            // just be safe, don't even allow a choice to be effective when unauthenticated.
            if (!this.runtime.service('session').getAuthToken()) {
                withPrivate = false;
                withPublic = true;
            }

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1
                },
                access_filter: {
                    with_private: withPrivate ? 1 : 0,
                    with_public: withPublic ? 1 : 0
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

        search({query, start, count, withUserData, withReferenceData, types, sorting,  withPrivate, withPublic}) {
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
                    with_private: withPrivate ? 1 : 0,
                    with_public: withPublic ? 1 : 0
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

        // TO PORT 

        getNarrative(ref) {
            return rpc.call('Workspace', 'get_object_info3', {
                objects: [{
                    wsid: ref.workspaceId,
                    objid: ref.objectId
                }],
                ignoreErrors: 1
            })
                .spread(function (result) {
                    if (result.infos.length === 0) {
                        throw new Error('No Narrative found with reference ' + ref.workspaceId + '/' + ref.objectId);
                    }
                    if (result.infos.length > 1) {
                        throw new Error('Too many Narratives found with reference ' + ref.workspaceId + '/' + ref.objectId);
                    }
                    var objectInfo = apiUtils.objectInfoToObject(result.infos[0]);
                    return Promise.all([
                        objectInfo,
                        rpc.call('Workspace', 'get_workspace_info', {
                            id: objectInfo.wsid
                        })
                            .spread(function (info) {
                                return info;
                            })
                    ]);
                })
                .spread(function (objectInfo, wsInfo) {
                    var workspaceInfo = apiUtils.workspaceInfoToObject(wsInfo);
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceInfo
                    };
                });
        }

        getObjectInfo(ref) {
            return rpc.call('Workspace', 'get_object_info3', {
                objects: [{
                    wsid: ref.workspaceId,
                    objid: ref.objectId,
                    ver: ref.version
                }],
                ignoreErrors: 1
            })
                .spread(function (result) {
                    if (result.infos.length === 0) {
                        throw new Error('No object found with reference ' + ref);
                    }
                    if (result.infos.length > 1) {
                        throw new Error('Too many objects found with reference ' + ref);
                    }
                    var objectInfo = apiUtils.objectInfoToObject(result.infos[0]);
                    return Promise.all([objectInfo, rpc.call('Workspace', 'get_workspace_info', {id: objectInfo.wsid})]);
                })
                .spread(function (objectInfo, wsInfo) {
                    var workspaceInfo = apiUtils.workspaceInfoToObject(wsInfo[0]);
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceInfo
                    };
                });
        }

        getObjectsInfo(refs) {
            var normalizedRefs = refs.map(function (ref) {
                if (typeof ref === 'string') {
                    var a = ref.split('/').map(function (x) {
                        return parseInt(x, 10);
                    });
                    return {
                        workspaceId: a[0],
                        objectId: a[1],
                        version: a[2]
                    };
                }
            });

            return Promise.all(normalizedRefs.map(function (ref) {
                return getObjectInfo(ref);
            }));
        }

        getWritableNarratives() {
            return rpc.call('Workspace', 'list_workspace_info', {
                perm: 'w'
            })
                .spread(function (data) {
                    var objects = data.map(function (workspaceInfo) {
                        return apiUtils.workspace_metadata_to_object(workspaceInfo);
                    });
                    return objects.filter(function (obj) {
                        if (obj.metadata.narrative && (!isNaN(parseInt(obj.metadata.narrative, 10))) &&
                            // don't keep the current narrative workspace.
                            obj.metadata.narrative_nice_name &&
                            obj.metadata.is_temporary && obj.metadata.is_temporary !== 'true') {
                            return true;
                        }
                        return false;
                    });
                })
                .then(function (narratives) {
                    var owners = Object.keys(narratives.reduce(function (owners, narrative) {
                        owners[narrative.owner] = true;
                        return owners;
                    }, {}));
                    return rpc.call('UserProfile', 'get_user_profile', owners)
                        .spread(function (profiles) {
                            var ownerProfiles = profiles.reduce(function (ownerProfiles, profile) {
                                ownerProfiles[profile.user.username] = profile;
                                return ownerProfiles;
                            }, {});
                            narratives.forEach(function (narrative) {
                                narrative.ownerRealName = ownerProfiles[narrative.owner].user.realname;
                            });
                            return narratives;
                        });
                });
        }

        copyObject(arg) {
            return rpc.call('NarrativeService', 'copy_object', {
                ref: arg.sourceObjectRef,
                target_ws_id: arg.targetWorkspaceId
            })
                .spread(function (copiedObjectInfo) {
                    // NB: the narrative service will have already transformed
                    // the workspace object info into a structure compatible with
                    // the venerable objectInfoToObject :)
                    return copiedObjectInfo;
                });
        }

        copyObjects(arg) {
            return Promise.all(arg.sourceObjectRefs.map(function (ref) {
                return copyObject({
                    sourceObjectRef: ref,
                    targetWorkspaceId: arg.targetWorkspaceId
                });
            }));
        }

        createNarrative(arg) {
            var commentCell = [
                '# ' + arg.title,
                '',
                'This narrative was created by the "Copy Object" dialog in the "Data Search" web app.',
                '',
                'You will find your copied data in the Data panel on the left-hand side of the Narrative.',
            ].join('\n');

            return rpc.call('NarrativeService', 'create_new_narrative', {
                title: arg.title,
                includeIntroCell: 0,
                markdown: commentCell
            })
                .spread(function (newNarrative) {
                    return {
                        workspaceInfo: newNarrative.workspaceInfo,
                        objectInfo: newNarrative.narrativeInfo
                    };
                });
        }
    }

    const columns = [
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