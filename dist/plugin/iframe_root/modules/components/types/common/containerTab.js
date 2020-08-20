define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,n,o){
"use strict";const r=(0,o.tag)("div");class c{constructor(e){const{object:n}=e
;this.object=t.utils.unwrapObservable(n)}}
return e.registerComponent((function(){return{viewModel:c,
template:r(n.switch("object.workspaceType",[['"narrative"',"Narrative"],['"refdata"',"Reference Data"],['"unknown"',"Unknown Workspace"]]))
}}))}));