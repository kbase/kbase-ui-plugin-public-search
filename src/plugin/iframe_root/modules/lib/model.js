define([
    'bluebird',
    'kb_lib/workspaceUtils'
], function (
    Promise,
    workspaceUtils
) {
    'use strict';

    class Model {
        constructor({runtime}) {
            this.runtime = runtime;
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

            const searchAPI = this.runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: true
            });

            return searchAPI.callFunc('search_types', [param])
                .spread((result) => {
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

            const searchAPI = this.runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: true
            });
            return searchAPI.callFunc('search_objects', [param])
                .spread((result) => {
                    return result;
                });
        }

        // TO PORT

        getNarrative(ref) {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authenticated: true
            });

            return workspace.callFunc('get_object_info3', [{
                objects: [{
                    wsid: ref.workspaceId,
                    objid: ref.objectId
                }],
                ignoreErrors: 1
            }])
                .spread((result) => {
                    if (result.infos.length === 0) {
                        throw new Error('No Narrative found with reference ' + ref.workspaceId + '/' + ref.objectId);
                    }
                    if (result.infos.length > 1) {
                        throw new Error('Too many Narratives found with reference ' + ref.workspaceId + '/' + ref.objectId);
                    }
                    const objectInfo = workspaceUtils.objectInfoToObject(result.infos[0]);
                    return Promise.all([
                        objectInfo,
                        workspace.callFunc('get_workspace_info', [{
                            id: objectInfo.wsid
                        }])
                            .spread((info) => {
                                return info;
                            })
                    ]);
                })
                .spread((objectInfo, wsInfo) => {
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceUtils.workspaceInfoToObject(wsInfo)
                    };
                });
        }

        getObjectInfo(ref) {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authenticated: true
            });

            return workspace.callFunc('get_object_info3', [{
                objects: [{
                    wsid: ref.workspaceId,
                    objid: ref.objectId,
                    ver: ref.version
                }],
                ignoreErrors: 1
            }])
                .spread((result) => {
                    if (result.infos.length === 0) {
                        throw new Error('No object found with reference ' + ref);
                    }
                    if (result.infos.length > 1) {
                        throw new Error('Too many objects found with reference ' + ref);
                    }
                    const objectInfo = workspaceUtils.objectInfoToObject(result.infos[0]);
                    return Promise.all([
                        objectInfo,
                        workspace.callFunc('get_workspace_info', [{id: objectInfo.wsid}
                        ])]);
                })
                .spread((objectInfo, wsInfo) => {
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceUtils.workspaceInfoToObject(wsInfo[0])
                    };
                });
        }

        getObjectsInfo(refs) {
            var normalizedRefs = refs.map((ref) => {
                if (typeof ref === 'string') {
                    const [workspaceId, objectId, version] = ref.split('/').map((x) => {
                        return parseInt(x, 10);
                    });
                    return {
                        workspaceId: workspaceId,
                        objectId: objectId,
                        version: version
                    };
                }
            });

            return Promise.all(normalizedRefs.map((ref) => {
                return this.getObjectInfo(ref);
            }));
        }

        getWritableNarratives() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authenticated: true
            });

            return workspace.callFunc('list_workspace_info', [{
                perm: 'w'
            }])
                .spread((data) => {
                    var objects = data.map((workspaceInfo) => {
                        return workspaceUtils.workspaceInfoToObject(workspaceInfo);
                    });
                    return objects.filter((workpaceInfo) => {
                        if (workpaceInfo.metadata.narrative && (!isNaN(parseInt(workpaceInfo.metadata.narrative, 10))) &&
                            // don't keep the current narrative workspace.
                            workpaceInfo.metadata.narrative_nice_name &&
                            workpaceInfo.metadata.is_temporary && workpaceInfo.metadata.is_temporary !== 'true') {
                            return true;
                        }
                        return false;
                    });
                })
                .then((narratives) => {
                    const owners = Object.keys(narratives.reduce((owners, narrative) => {
                        owners[narrative.owner] = true;
                        return owners;
                    }, {}));
                    const userProfile = this.runtime.service('rpc').makeClient({
                        module: 'UserProfile',
                        timeout: 10000,
                        authenticated: true
                    });
                    return userProfile.callFunc('get_user_profile', [owners])
                        .spread((profiles) => {
                            const ownerProfiles = profiles.reduce((ownerProfiles, profile) => {
                                ownerProfiles[profile.user.username] = profile;
                                return ownerProfiles;
                            }, {});
                            narratives.forEach((narrative) => {
                                narrative.ownerRealName = ownerProfiles[narrative.owner].user.realname;
                            });
                            return narratives;
                        });
                });
        }

        copyObject(arg) {
            const narrativeService = this.runtime.service('rpc').makeClient({
                module: 'NarrativeService',
                timeout: 10000,
                authenticated: true
            });

            return narrativeService.callFunc('copy_object', [{
                ref: arg.sourceObjectRef,
                target_ws_id: arg.targetWorkspaceId
            }])
                .spread((copiedObjectInfo) => {
                    // NB: the narrative service will have already transformed
                    // the workspace object info into a structure compatible with
                    // the venerable objectInfoToObject :)
                    return copiedObjectInfo;
                });
        }

        copyObjects({sourceObjectRefs, targetWorkspaceId}) {
            return Promise.all(sourceObjectRefs.map((ref) => {
                return this.copyObject({
                    sourceObjectRef: ref,
                    targetWorkspaceId: targetWorkspaceId
                });
            }));
        }

        createNarrative(arg) {
            const commentCell = [
                '# ' + arg.title,
                '',
                'This narrative was created by the "Copy Object" dialog in the "Data Search" web app.',
                '',
                'You will find your copied data in the Data panel on the left-hand side of the Narrative.',
            ].join('\n');
            const narrativeService = this.runtime.service('rpc').makeClient({
                module: 'NarrativeService',
                timeout: 10000,
                authenticated: true
            });

            return narrativeService.callFunc('create_new_narrative', [{
                title: arg.title,
                includeIntroCell: 0,
                markdown: commentCell
            }])
                .spread((newNarrative) => {
                    return {
                        workspaceInfo: newNarrative.workspaceInfo,
                        objectInfo: newNarrative.narrativeInfo
                    };
                });
        }
    }

    return {Model};
});
