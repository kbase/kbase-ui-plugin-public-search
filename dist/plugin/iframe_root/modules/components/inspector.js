define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_lib/props","../lib/serviceUtils","../lib/ui","./types/controller","./searchError"],(function(e,o,t,r,n,s,a,i,c,l,p,b){
"use strict";const d=(0,s.tag)("div");class u extends n{constructor(e,t){
super(e),this.parent=t.$parent;const{row:r}=e
;this.row=r,this.workspace=t.$root.runtime.service("rpc").makeClient({
module:"Workspace",timeout:1e4,authenticated:!0
}),this.ready=o.observable(!1),this.error=o.observable(),
this.object=null,this.component=null,this.fetchObjectInfo().then(e=>{
this.object=e,
this.component=p.typeToComponent(e.objectInfo.typeName),this.ready(!0)
}).catch(e=>{console.error("ERROR",e)})}onClose(){this.send("close")}onView(){
const e=this.row.metadata.ref;window.open("/#dataview/"+e,"_blank")}
fetchObjectInfo(){
const o=[String(this.row.metadata.workspaceId),String(this.row.metadata.objectId),String(1)].join("/")
;return e.all([this.workspace.callFunc("get_object_info3",[{objects:[{
ref:this.row.metadata.ref},{ref:o}],includeMetadata:1,ignoreErrors:1
}]).spread(e=>e),this.workspace.callFunc("get_workspace_info",[{
id:this.row.metadata.workspaceId}]).spread(e=>e)]).spread((e,o)=>{
const[t,r]=e.infos;if(!t)throw new Error("Object could not be accessed")
;const n={objectInfo:c.objectInfoToObject(t),
firstObjectInfo:c.objectInfoToObject(r),workspaceInfo:c.workspaceInfoToObject(o)
}
;return i.hasProp(n.workspaceInfo,["metadata","narrative"])?n.workspaceType="narrative":"refdata"===i.getProp(n.workspaceInfo,["metadata","searchtags"])?n.workspaceType="refdata":n.workspaceType="unknown",
n}).catch(e=>{this.error(e),console.error("ERROR",e)})}dispose(){super.dispose()
}}return t.registerComponent((function(){return{viewModelWithContext:u,
template:d({style:{flex:"1 1 0px",position:"relative",display:"flex",
flexDirection:"column"}},[r.if("ready()",l.buildFullHeightDialog2({
body:r.if("component",r.component2({name:"component.name()",params:{
object:"object"}})),buttons:[{label:"View",onClick:"onView"},{label:"Close",
onClick:"onClose"}]}),r.if("error()",d({dataBind:{component:{
name:b.quotedName(),params:{link:"bus",error:"error",
onClose:'function(){$component.bus.send("close")}'}}}}),a.loading()))])}}))}));