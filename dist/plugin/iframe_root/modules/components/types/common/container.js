define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./containerTypes/narrative","./containerTypes/refdata","./containerTypes/unknown"],(function(e,o,t,n,c,a,r){
"use strict";const s=(0,n.tag)("div"),i=n.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column",marginTop:"10px"}}})
;class b{constructor(o){const{object:t}=o
;this.object=e.utils.unwrapObservable(t)}}
return o.registerComponent((function(){return{viewModel:b,template:s({
class:i.classes.component
},t.switch("object.workspaceType",[['"narrative"',t.component({name:c.name(),
params:{name:"object.workspaceInfo.metadata.narrative_nice_name",
owner:"object.workspaceInfo.owner",
lastModifiedAt:"object.workspaceInfo.modDate",
workspaceId:"object.workspaceInfo.id",objectId:"object.objectInfo.id"}
})],['"refdata"',t.component({name:a.name(),params:{
source:"object.objectInfo.metadata.Source",
sourceID:'object.objectInfo.metadata["Source ID"]',
owner:"object.workspaceInfo.owner",
lastModifiedAt:"object.workspaceInfo.modDate",
workspaceId:"object.workspaceInfo.id",objectId:"object.objectInfo.id"}
})],['"unknown"',t.component({name:r.name(),params:{
name:"object.workspaceInfo.name",owner:"object.workspaceInfo.owner",
lastModifiedAt:"object.workspaceInfo.modDate",
workspaceId:"object.workspaceInfo.id",objectId:"object.objectInfo.id"}})]])),
stylesheet:i.sheet}}))}));