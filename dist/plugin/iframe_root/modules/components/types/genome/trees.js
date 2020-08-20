define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/jsonRpc/genericClient"],(function(e,t,r,s,n){
"use strict";const i=(0,s.tag)("div");class o{constructor(e,t){
this.runtime=t.$root.runtime,this.trees=[]}fetchTrees(){var e=new n({
module:"Workspace",url:this.runtime.getConfig("services.workspace.url"),
token:this.runtime.service("session").getAuthToken()}),t={
ref:this.options.workspaceID+"/"+this.options.genomeID}
;return e.callFunc("list_referencing_objects",[[t]]).spread(e=>{
const t=e[0].filter(e=>"KBaseTrees.Tree"===e[2].split("-")[0]).map(e=>({
wsid:e[6],id:e[0],name:e[1]}))
;return this.trees=t,this.trees.length>0&&(this.currentTree=0),null})}}
return t.registerComponent((function(){return{viewModelWithContext:o,
template:i("trees here...")}}))}));