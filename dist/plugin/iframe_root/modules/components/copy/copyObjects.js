define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBootstrapBuilders","kb_lib/htmlBuilders","../../lib/ui","../../lib/model","./narrativeSelector","select2"],(function(e,t,o,s,a,c,i,r,n,l){
"use strict";class d extends s{constructor(t,o){
super(t),this.runtime=o.$root.runtime,
this.objectsToCopy=e.unwrap(t.objectsToCopy),
this.objectToView=e.observable(),this.copyMethod=e.observable(),
this.selectedNarrative=e.observable(),
this.selectedNarrativeObject=e.observable(),
this.errorMessage=e.observable(),this.completionMessage=e.observable(),
this.newNarrativeName=e.observable(),
this.copyStatus=e.observable("none"),this.selectedObjects=e.observableArray(),
this.title="Copy Object",this.messages={
removeObjectFromList:"Remove this object from the list of selected objects to copy.",
cannotRemoveLastObjectFromList:"Sorry, cannot remove the last object from the list."
},this.model=new n.Model({runtime:this.runtime
}),this.canCopy=e.pureComputed(()=>{switch(this.copyStatus()){case"none":
switch(this.copyMethod()){case"existing":
if(this.selectedNarrativeObject())return!0;break;case"new":
if(this.newNarrativeName())return!0}return!1;case"copying":return!1
;case"success":return!0;case"error":return!1;default:
return console.warn("Unknown copy status: ",this.copyStatus()),!1}
}),this.subscribe(this.copyMethod,e=>{switch(e){case"new":
this.selectedNarrative(null)}}),this.subscribe(this.selectedNarrative,e=>{if(e){
this.copyMethod("existing");const t=e.split("/"),o=t[0],s=t[1]
;this.model.getNarrative({workspaceId:o,objectId:s}).then(e=>{
this.selectedNarrativeObject(e)}).catch(Error,e=>{
console.error(e),this.copyStatus("error"),this.errorMessage(e.message)
}).catch(e=>{
console.error(e),this.copyStatus("error"),this.errorMessage("unknown error")})
}else this.copyMethod("new")
}),this.model.getObjectsInfo(this.objectsToCopy).then(t=>{
this.selectedObjects(t.map(t=>({workspaceInfo:t.workspaceInfo,
objectInfo:t.objectInfo,selected:e.observable()})))})}viewObject(e){
this.model.getObjectInfo(e).then(e=>{this.objectToView(e)})}doSelectObject(e){
e.selected()?(e.selected(!1),
this.objectToView(null)):(this.selectedObjects().forEach(e=>{e.selected(!1)
}),e.selected(!0),this.viewObject({workspaceId:e.workspaceInfo.id,
objectId:e.objectInfo.id,version:e.objectInfo.version}))}makeNarrativeUrl(e){
return this.runtime.config("services.narrative.url")+e}copyIntoNarrative(e){
return this.model.copyObjects({
sourceObjectRefs:this.selectedObjects().map(e=>e.objectInfo.ref),
targetWorkspaceId:e.workspaceId})}copyIntoNewNarrative(e){
return this.model.createNarrative({title:e}).then(e=>this.model.copyObjects({
sourceObjectRefs:this.selectedObjects().map(e=>e.objectInfo.ref),
targetWorkspaceId:e.workspaceInfo.id}).then(()=>e))}doClose(){this.send("close")
}doCopy(){
switch(this.errorMessage(""),this.copyStatus("copying"),this.copyMethod()){
case"new":this.copyIntoNewNarrative(this.newNarrativeName()).then(e=>{
const t=["ws",e.workspaceInfo.id,"obj",e.objectInfo.id].join("."),o=this.makeNarrativeUrl("/narrative/"+t)
;this.selectedNarrativeObject({workspaceInfo:e.workspaceInfo,
objectInfo:e.objectInfo,url:o}),this.copyStatus("success")}).catch(e=>{
this.copyStatus("error"),this.errorMessage(e.message)});break;case"existing":
if(this.selectedNarrativeObject()){const e=this.selectedNarrativeObject()
;this.copyIntoNarrative({workspaceId:e.workspaceInfo.id}).then(()=>{
const t=["ws",e.workspaceInfo.id,"obj",e.objectInfo.id].join("."),o=this.makeNarrativeUrl("/narrative/"+t)
;this.selectedNarrativeObject({workspaceInfo:e.workspaceInfo,
objectInfo:e.objectInfo,url:o}),this.copyStatus("success")}).catch(e=>{
console.error("ERROR copying objects into narrative",e),
this.copyStatus("error"),this.errorMessage(e.message)})
}else this.errorMessage("You must select a narrative before copying the data object into it.")
}}doRemoveObject(e){
e.selected()&&this.objectToView(null),this.selectedObjects.remove(e)}}
const b=a.tag,h=b("a"),p=b("h3"),y=b("div"),m=b("span"),f=b("input"),u=b("button"),j=b("table"),v=b("thead"),w=b("tbody"),g=b("tr"),I=b("td"),k=b("th"),N=b("p"),O=b("b")
;var x=a.makeStyles({viewTable:{css:{width:"100%"},inner:{td:{border:"none",
padding:"3px",verticalAlign:"top"},th:{border:"none",padding:"3px",
verticalAlign:"top",fontWeight:"normal"},"td:nth-child(1)":{width:"30%"},
"th:nth-child(1)":{width:"30%"}}},selectedObjectsTable:{css:{width:"100%"},
inner:{"tbody tr:hover":{backgroundColor:"rgba(200,200,200,0.8)"},td:{
borderBottom:"1px solid rgba(200,200,200,0.8)",padding:"3px",
verticalAlign:"middle"},th:{borderBottom:"1px solid rgba(200,200,200,0.8)",
padding:"3px",verticalAlign:"top",fontWeight:"normal",fontStyle:"italic"},
"td:nth-child(1)":{width:"30%"},"th:nth-child(1)":{width:"30%"},
"td:nth-child(3)":{textAlign:"center"},"th:nth-child(3)":{textAlign:"center"}}},
selectableRow:{css:{},modifiers:{selected:{backgroundColor:"rgba(200,200,200,1)"
}}}});return t.registerComponent((function(){return{viewModelWithContext:d,
template:y([r.buildDialog({title:m({dataBind:{text:"title"}}),icon:"clone",
body:y({class:"container-fluid"
},[N(["You may use this  panel to copy the ",O("data object")," you are viewing into either a ",O("new Narrative"),", which will be created on the fly, or an ",O("existing Narrartive")," which you may select from the list below."]),y({
class:"container-fluid"},[p("Selected objects"),y({class:"row"},[y({
class:"col-md-8"
},[o.ifnot("selectedObjects().length",m("no objects selected"),j({
class:x.classes.selectedObjectsTable
},[v([g([k("type"),k("object name"),k("remove")])]),w({dataBind:{
foreach:"selectedObjects"}},[g({class:[x.classes.selectableRow],style:{
cursor:"pointer"},dataBind:{
click:"function(d,e){$component.doSelectObject.call($component,d,e)}",
class:'selected() ? "'+x.scopes.selected+'" : false'}},[I({style:{width:"2em"},
dataBind:{text:"objectInfo.typeName"}}),I({dataBind:{text:"objectInfo.name"}
}),I({style:{textAlign:"center"}},u({type:"button",
class:"btn btn-xs btn-danger btn-kb-flat",dataBind:{
click:"function(d,e){$component.doRemoveObject.call($component,d,e)}",
enable:"$component.selectedObjects().length > 1",attr:{
title:"$component.selectedObjects().length > 1 ? $component.messages.removeObjectFromList : $component.messages.cannotRemoveLastObjectFromList"
}}},m({class:"fa fa-times"})))])])]))]),y({class:"col-md-4"},y({
class:"panel panel-default",style:{width:"100%"}},[y({class:"panel-heading"
},[y({class:"panel-title",dataBind:{style:{
color:'objectToView() ?  "black" : "gray"'}}},"Inspect Selected Object")]),y({
class:"panel-body"},[o.if("objectToView",o.with("objectToView",j({
class:x.classes.viewTable},[g([k("name"),I({dataBind:{text:"objectInfo.name"}
})]),g([k("modified"),I({dataBind:{typedText:{value:"objectInfo.saveDate",
type:'"date"',format:'"MM/DD/YYYY"'}}})]),g([k("by"),I({dataBind:{
text:"objectInfo.saved_by"}})]),g([k("type"),I({dataBind:{
text:"objectInfo.typeName"}})]),g([k("module"),I({dataBind:{
text:"objectInfo.typeModule"}})]),g([k("version"),I([m({dataBind:{
text:"objectInfo.typeMajorVersion"}}),".",m({dataBind:{
text:"objectInfo.typeMinorVersion"}
})])])])),"If you click on an object listed on the left, its detail will show here")])]))])]),y({
class:"container-fluid"},[p("Select Narrative"),y({class:"row"},[y({
class:"col-md-8"},[y({class:"row"},[y({class:"col-sm-2"},f({type:"radio",
name:"copyMethod",value:"new",dataBind:{checked:"copyMethod"}})),y({
class:"col-sm-10"
},"Copy into New Narrative")]),o.if('copyMethod() === "new"',y({class:"row"
},[y({class:"col-sm-2"}),y({class:"col-sm-10"},y({style:{display:"flex",
flexDirection:"row",alignItems:"center"}},[y({style:{flex:"0 0 auto",
weight:"bold",color:"rgb(100,100,100)",marginRight:"4px"}},"Name "),y({style:{
flex:"1"}},f({class:"form-control",style:{width:"100%"},dataBind:{
textInput:"newNarrativeName"}}))]))])),y({class:"row"},[y({class:"col-sm-2"
}),y({class:"col-sm-10",style:{fontStyle:"italic",padding:"6px"}
}," - or - ")]),y({class:"row"},[y({class:"col-sm-2"},f({type:"radio",
name:"copyMethod",value:"existing",dataBind:{checked:"copyMethod"}})),y({
class:"col-sm-10"
},["Copy into an existing Narrative: ",o.ifnot('copyMethod() === "existing"',y({
style:{fontStyle:"italic"}},"select a writable narrative."),y({style:{
marginBottom:"20px"},dataBind:{component:{name:l.quotedName(),params:{
selectedNarrative:"selectedNarrative"}}}}))])])]),y({class:"col-md-4"},[y({
class:"panel panel-default"},[y({class:"panel-heading"},[y({class:"panel-title",
dataBind:{style:{color:'selectedNarrativeObject() ? "black" : "gray"'}}
},["Selected Narrative"])]),y({class:"panel-body"
},[o.ifnot("copyMethod","When you have selected a narrative to copy into, details about it will be shown here"),o.if('copyMethod() === "existing"',[N(["The data object will be copied into the following Narrative:"]),o.ifnot("selectedNarrativeObject()",N({
style:{fontStyle:"italic",textAlign:"center"}
},"Select a narrative from those available to you on the left.")),o.with("selectedNarrativeObject",j({
class:x.classes.viewTable},[g([k("Name"),I({dataBind:{
text:"workspaceInfo.metadata.narrative_nice_name"}})]),g([k("Ref"),I({dataBind:{
text:"objectInfo.ref"}})]),g([k("Owner"),I({dataBind:{text:"objectInfo.saved_by"
}})]),g([k("Modified"),I({dataBind:{typedText:{value:"objectInfo.saveDate",
type:'"date"',format:'"MM/DD/YYYY"'}}
})])]))]),o.if('copyMethod() === "new"',N(["A new narrative will be created containing this data object."]))])])])])]),y({
class:"container-fluid"},[y({class:"row"},[y({class:"col-md-8"
},[o.if("$component.selectedObjects().length === 0","No objects to copy!"),o.if("$component.selectedObjects().length > 0",u({
type:"button",class:"btn btn-primary",dataBind:{enable:"canCopy",click:"doCopy"}
},["Copy Object",o.if("$component.selectedObjects().length > 1","s")," into Narrative"]))]),y({
class:"col-md-4"})])]),y({style:{marginTop:"12px"}
},[[o.if('copyStatus() === "success"',c.buildPanel({type:"success",
title:"Successfully Copied",
body:y([N(["Successfully copied this data object to the Narrative ",m({style:{
fontWeight:"bold"},dataBind:{
text:"selectedNarrativeObject().workspaceInfo.metadata.narrative_nice_name"}
})]),N([m({style:{fontStyle:"italic"}},h({dataBind:{attr:{
href:"selectedNarrativeObject().url"}},class:"btn btn-default",target:"_blank"
},"Open this Narrative"))])])
}))],[o.if('copyStatus() === "copying"',c.buildPanel({type:"info",
title:"In Progress",body:y([i.loading("Copying")])
}))],[o.if('copyStatus() === "error"',c.buildPanel({type:"error",title:"Error",
body:y([N("An error occurred attempting to copy the data:"),N({dataBind:{
text:"errorMessage"}})])}))]])]),buttons:[{type:"default",label:"Close",
onClick:"doClose"}]})]),stylesheet:x.sheet}}))}));