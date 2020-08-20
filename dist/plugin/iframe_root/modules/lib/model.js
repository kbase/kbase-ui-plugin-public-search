define(["bluebird","kb_lib/workspaceUtils"],(function(e,t){"use strict";return{
Model:class{constructor({runtime:e}){this.runtime=e}
searchSummary({query:e,withUserData:t,withReferenceData:r,types:a,withPrivate:i,withPublic:o}){
"*"===e&&(e=null),this.runtime.service("session").getAuthToken()||(i=!1,o=!0)
;var c={match_filter:{full_text_in_all:e,exclude_subobjects:1},access_filter:{
with_private:i?1:0,with_public:o?1:0}}
;if(a&&(c.object_types=a),r)t||(c.match_filter.source_tags=["refdata"],
c.match_filter.source_tags_blacklist=0);else{
if(!t)throw new Error('Must select one or both of "refdata" or/and "narrativedata"')
;c.match_filter.source_tags=["refdata"],c.match_filter.source_tags_blacklist=1}
return this.runtime.service("rpc").makeClient({module:"KBaseSearchEngine",
timeout:1e4,authenticated:!0}).callFunc("search_types",[c]).spread(e=>e)}
search({query:e,start:t,count:r,withUserData:a,withReferenceData:i,types:o,sorting:c,withPrivate:s,withPublic:n}){
"*"===e&&(e=null);var l={match_filter:{full_text_in_all:e,exclude_subobjects:1},
pagination:{start:t,count:r},post_processing:{ids_only:0,skip_info:0,
skip_keys:0,skip_data:0,include_highlight:1,add_narrative_info:1,
add_access_group_info:1},access_filter:{with_private:s?1:0,with_public:n?1:0},
sorting_rules:c.map(({propertyKey:e,direction:t,isObject:r})=>({property:e,
ascending:"ascending"===t?1:0,is_object_property:r?1:0}))}
;if(i)a||(l.match_filter.source_tags=["refdata"],
l.match_filter.source_tags_blacklist=0);else{
if(!a)throw new Error('Must select one or both of "refdata" or/and "narrativedata"')
;l.match_filter.source_tags=["refdata"],l.match_filter.source_tags_blacklist=1}
o&&(l.object_types=o);return this.runtime.service("rpc").makeClient({
module:"KBaseSearchEngine",timeout:1e4,authenticated:!0
}).callFunc("search_objects",[l]).spread(e=>e)}getNarrative(r){
const a=this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authenticated:!0});return a.callFunc("get_object_info3",[{objects:[{
wsid:r.workspaceId,objid:r.objectId}],ignoreErrors:1}]).spread(i=>{
if(0===i.infos.length)throw new Error("No Narrative found with reference "+r.workspaceId+"/"+r.objectId)
;if(i.infos.length>1)throw new Error("Too many Narratives found with reference "+r.workspaceId+"/"+r.objectId)
;const o=t.objectInfoToObject(i.infos[0])
;return e.all([o,a.callFunc("get_workspace_info",[{id:o.wsid}]).spread(e=>e)])
}).spread((e,r)=>({objectInfo:e,workspaceInfo:t.workspaceInfoToObject(r)}))}
getObjectInfo(r){const a=this.runtime.service("rpc").makeClient({
module:"Workspace",timeout:1e4,authenticated:!0})
;return a.callFunc("get_object_info3",[{objects:[{wsid:r.workspaceId,
objid:r.objectId,ver:r.version}],ignoreErrors:1}]).spread(i=>{
if(0===i.infos.length)throw new Error("No object found with reference "+r)
;if(i.infos.length>1)throw new Error("Too many objects found with reference "+r)
;const o=t.objectInfoToObject(i.infos[0])
;return e.all([o,a.callFunc("get_workspace_info",[{id:o.wsid}])])
}).spread((e,r)=>({objectInfo:e,workspaceInfo:t.workspaceInfoToObject(r[0])}))}
getObjectsInfo(t){var r=t.map(e=>{if("string"==typeof e){
const[t,r,a]=e.split("/").map(e=>parseInt(e,10));return{workspaceId:t,
objectId:r,version:a}}});return e.all(r.map(e=>this.getObjectInfo(e)))}
getWritableNarratives(){return this.runtime.service("rpc").makeClient({
module:"Workspace",timeout:1e4,authenticated:!0
}).callFunc("list_workspace_info",[{perm:"w"
}]).spread(e=>e.map(e=>t.workspaceInfoToObject(e)).filter(e=>!(!e.metadata.narrative||isNaN(parseInt(e.metadata.narrative,10))||!e.metadata.narrative_nice_name||!e.metadata.is_temporary||"true"===e.metadata.is_temporary))).then(e=>{
const t=Object.keys(e.reduce((e,t)=>(e[t.owner]=!0,e),{}))
;return this.runtime.service("rpc").makeClient({module:"UserProfile",
timeout:1e4,authenticated:!0}).callFunc("get_user_profile",[t]).spread(t=>{
const r=t.reduce((e,t)=>(e[t.user.username]=t,e),{});return e.forEach(e=>{
e.ownerRealName=r[e.owner].user.realname}),e})})}copyObject(e){
return this.runtime.service("rpc").makeClient({module:"NarrativeService",
timeout:1e4,authenticated:!0}).callFunc("copy_object",[{ref:e.sourceObjectRef,
target_ws_id:e.targetWorkspaceId}]).spread(e=>e)}
copyObjects({sourceObjectRefs:t,targetWorkspaceId:r}){
return e.all(t.map(e=>this.copyObject({sourceObjectRef:e,targetWorkspaceId:r})))
}createNarrative(e){
const t=["# "+e.title,"",'This narrative was created by the "Copy Object" dialog in the "Data Search" web app.',"","You will find your copied data in the Data panel on the left-hand side of the Narrative."].join("\n")
;return this.runtime.service("rpc").makeClient({module:"NarrativeService",
timeout:1e4,authenticated:!0}).callFunc("create_new_narrative",[{title:e.title,
includeIntroCell:0,markdown:t}]).spread(e=>({workspaceInfo:e.workspaceInfo,
objectInfo:e.narrativeInfo}))}}}}));