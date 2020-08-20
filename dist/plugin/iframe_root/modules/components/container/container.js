define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./types/narrative","./types/refdata","./types/unknown"],(function(e,o,t,a,n,c,r){
"use strict";class s{constructor(o){const{object:t}=o
;this.object=e.utils.unwrapObservable(t)}}
const b=(0,a.tag)("div"),p=a.makeStyles({component:{css:{}}})
;return o.registerComponent((function(){return{viewModel:s,template:b({
class:p.classes.component
},t.switch("object.workspaceType",[['"narrative"',t.component({name:n.name(),
params:{name:"object.workspaceInfo.metadata.narrative_nice_name",
owner:"object.workspaceInfo.owner",
lastModifiedAt:"object.workspaceInfo.modDate",
workspaceId:"object.workspaceInfo.id",
objectId:"parseInt(object.workspaceInfo.metadata.narrative)"}
})],['"refdata"',t.component({name:c.name(),params:{
source:"object.objectInfo.metadata.Source",
sourceID:'object.objectInfo.metadata["Source ID"]',
owner:"object.workspaceInfo.owner",
lastModifiedAt:"object.workspaceInfo.modDate",
workspaceId:"object.workspaceInfo.id",objectId:"object.objectInfo.id"}
})],['"unknown"',t.component({name:r.name(),params:{
name:"object.workspaceInfo.name",owner:"object.workspaceInfo.owner",
lastModifiedAt:"object.workspaceInfo.modDate",
workspaceId:"object.workspaceInfo.id",objectId:"object.objectInfo.id"}})]])),
stylesheet:p.sheet}}))}));