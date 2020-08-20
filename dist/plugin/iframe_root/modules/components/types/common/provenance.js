define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","../../../lib/serviceUtils"],(function(e,t,s,o,i,a,n){
"use strict"
;const l=i.tag,c=l("p"),r=l("div"),d=l("span"),p=l("table"),f=l("tbody"),h=l("tr"),x=l("th"),m=l("td")
;class b{constructor(e,s,o,i,a){this.methodMap=s.$root.methodMap
;const n=t.utils.unwrapObservable(e.ref),[l,c,r]=n.split("/").map(e=>parseInt(e,10))
;this.objectRef={ref:n,workspaceId:l,objectId:c,version:r
},this.runtime=s.$root.runtime,
this.componentId=a,this.ready=t.observable(!1),this.error=t.observable(),
this.provenanceMissing=!1,
this.objectInfo=null,this.workspaceInfo=null,this.workspaceType=null,
this.workspaceName=null,
this.workspaceOwner=null,this.moduleInfo=null,this.appInfo=null,
this.copyInfo=null,
this.inputObjectRefs=[],this.scriptInfo=null,this.app=null,this.showObjectDetail=t.observable(!1),
this.showConnectionDetail=t.observable(!1),this.getProvenance().then(()=>{
this.ready(!0)})}getWorkspaceInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_workspace_info",[{id:this.objectRef.workspaceId
}]).spread(e=>n.workspaceInfoToObject(e))}getProvenanceInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_objects2",[{objects:[{ref:this.objectRef.ref}],
ignoreErrors:1,no_data:1}]).spread(e=>e.data[0])}getModuleInfo(){
return this.runtime.service("rpc").makeClient({module:"Catalog",timeout:1e4,
authorization:!1}).callFunc("get_module_version",[{
module_name:this.appInfo.module
}]).spread(e=>this.moduleInfo=e).catch(e=>(console.error("ERROR",e.message),
null))}resolveApp(){return e.try(()=>{
const e=this.appInfo.module+"/"+this.appInfo.method,t=this.methodMap.release[e]||this.methodMap.beta[e]||this.methodMap.dev[e]
;if(!t)throw new Error("App not found in Narrative Method Store with id: "+e)
;const[s,o]=t.info.id.split("/"),i=t.info.id
;return this.runtime.service("rpc").makeClient({module:"NarrativeMethodStore",
timeout:1e4,authorization:!1}).callFunc("get_method_brief_info",[{ids:[i],
tag:this.moduleInfo.git_commit_hash}]).spread(([e])=>(this.app={module:s,
method:o,spec:t},e)).catch(e=>(console.error("ERROR",e.message),null))})}
getApp(){return this.getModuleInfo().then(()=>this.resolveApp())}
getProvenance(){
return e.all([this.getWorkspaceInfo(),this.getProvenanceInfo()]).spread((e,t)=>{
if(0===t.provenance.length)return void(this.provenanceMissing=!0)
;const s=t.provenance[0]
;if(this.workspaceInfo=e,this.workspaceOwner=e.owner,e.metadata.narrative?(this.workspaceType="Narrative",
this.workspaceName=e.metadata.narrative_nice_name||"Unknown"):e.metadata.searchtags&&e.metadata.searchtags.includes("refdata")?(this.workspaceType="RefData",
this.workspaceName=e.name):(this.workspaceType="Workspace",
this.workspaceName=e.name),
this.objectInfo=n.objectInfoToObject(t.info),this.inputObjectRefs=s.resolved_ws_objects,
t.copied)this.copyInfo={ref:t.copied,
isOriginalAccessible:0===t.copy_source_inaccessible};else{
if(s.service&&s.method)return this.appInfo={module:s.service,method:s.method,
version:s.service_ver},this.getApp();s.script&&s.service?this.scriptInfo={
service:s.service,serviceVersion:s.service_ver,script:s.script,version:s.version
}:s.script&&(this.scriptInfo={service:null,serviceVersion:null,script:s.script,
version:s.script_ver})}}).catch(e=>{console.error("ERROR",e)})}}
const u=i.makeStyles({objectInfoBox:{css:{border:"1px silver solid",
margin:"10px",padding:"4px",flex:"1 1 0px"}},row:{css:{display:"flex",
flexDirection:"row"}},sectionTitle:{css:{fontWeight:"bold",
color:"rgba(100,100,100,1)"}},label:{css:{fontWeight:"bold",
color:"rgba(150,150,150,1)"}},appInfoBox:{css:{border:"2px green solid",
borderRadius:"8px",margin:"10px",padding:"4px",flex:"1 1 0px"}},scriptInfoBox:{
css:{border:"2px green solid",borderRadius:"8px",margin:"10px",padding:"4px",
flex:"1 1 0px"}},copyInfoBox:{css:{border:"2px blue solid",borderRadius:"8px",
margin:"10px",padding:"4px",flex:"1 1 0px"}},connector:{css:{margin:"10px",
fontWeight:"bold",width:"20em"}},object:{css:{fontWeight:"bold",width:"30em"}},
infoBox:{css:{}},infoTable:{css:{width:"100%"},inner:{th:{fontWeight:"bold",
color:"rgba(150, 150, 150, 1)",width:"5em",padding:"4px",verticalAlign:"top"},
td:{padding:"4px",verticalAlign:"top"},"td.-bare":{padding:"0"}}}})
;function g(e,t){return r({style:{display:"inline-block",width:"30px"}},d({
class:"fa fa-lg fa-"+e,style:{color:t}}))}function y(){return r({style:{
flex:"1 1 0px",marginLeft:"15px"}},o.if("inputObjectRefs.length > 0",r({
dataBind:{foreach:"inputObjectRefs"}},r({dataBind:{component:{
name:"$component.componentId",params:{ref:"$data",
methodMap:"$component.methodMap"}}}})),r({class:u.classes.infoBox},[r({style:{
display:"flex",flexDirection:"row"}},[r({style:{display:"flex",
flexDirection:"column",color:"red",width:"15px"}},[r({style:{
marginBottom:"-10px",textAlign:"center"}},d({class:"fa fa-caret-up fa-lg"})),r({
style:{borderLeft:"2px red solid",margin:"0 50%",flex:"1 1 0px"}})]),r({
class:u.classes.connector},[g("cloud","red"),d({style:{fontStyle:"italic"}
},"EDGE of the system")]),r({class:u.classes.objectInfoBox
},["nothing to see here..."])])])))}function w(){return r({dataBind:{if:"ready"}
},o.if("provenanceMissing",r({style:{margin:"10px"}},[c({style:{
textAlign:"center",fontStyle:"italic"}},"No provenance for this object")]),[r({
class:u.classes.infoBox},[r({style:{display:"flex",flexDirection:"row"}},[r({
style:{display:"flex",flexDirection:"column",color:"black",width:"15px"}},[r({
style:{marginBottom:"-10px",textAlign:"center"}},d({class:"fa fa-caret-up fa-lg"
})),r({style:{borderLeft:"2px black solid",margin:"0 50%",flex:"1 1 0px"}
})]),r({class:u.classes.connector},[g("file-o","black"),"Object: "]),r({
class:u.classes.objectInfoBox},[r(d({class:u.classes.row,style:{cursor:"pointer"
},dataBind:{click:"function(){showObjectDetail(!showObjectDetail());}"}},[d({
class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showObjectDetail()","fa-caret-down":"showObjectDetail()"}}
}),r({style:{flex:"1 1 0px"}},[d({style:{fontWeight:"bold"},dataBind:{
text:"objectInfo.typeName"}}),' object named "'+d({style:{fontWeight:"bold"},
dataBind:{text:"objectInfo.name"}}),'" in '+d({style:{fontWeight:"bold"},
dataBind:{text:"workspaceType"}}),' named "'+d({style:{fontWeight:"bold"},
dataBind:{text:"workspaceName"}}),'"'])])),o.if("showObjectDetail()",r({style:{
display:"flex",flexDirection:"row"}},[r({style:{flex:"1 1 0px"}},[r({
class:u.classes.sectionTitle},"Object"),p({class:u.classes.infoTable
},[h([x("name"),m({dataBind:{text:"objectInfo.name"}})]),h([x("created"),m({
dataBind:{typedText:{value:"objectInfo.saveDate",type:'"date"',
format:'"YYYY-MM-DD"'}}})])])]),r({style:{flex:"1 1 0px"}},[r(["in ",d({
class:u.classes.sectionTitle,dataBind:{text:"workspaceType"}})]),p({
class:u.classes.infoTable},[h([x("name"),m({dataBind:{text:"workspaceName"}
})]),h([x("owner"),m({dataBind:{text:"workspaceOwner"}
})])])])]))])])]),o.if("copyInfo",r({class:u.classes.infoBox},[r({style:{
display:"flex",flexDirection:"row"}},[r({style:{display:"flex",
flexDirection:"column",color:"blue",width:"15px"}},[r({style:{
marginBottom:"-10px",textAlign:"center"}},d({class:"fa fa-caret-up fa-lg"})),r({
style:{borderLeft:"2px blue solid",margin:"0 50%",flex:"1 1 0px"}})]),r({
class:u.classes.connector,style:{color:"blue"}
},[g("files-o","blue"),d("Which was created by Copying")]),r({
class:u.classes.copyInfoBox},[r(d({style:{cursor:"pointer"},dataBind:{
click:"function(){showConnectionDetail(!showConnectionDetail());}"}},[d({
class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}
}),d(o.if("showConnectionDetail()","hide detail","show detail"))])),o.if("showConnectionDetail()",o.with("copyInfo",[p({
class:u.classes.infoTable},[h([x("Object ref"),m({dataBind:{text:"ref"}
})]),h([x("Accessible?"),m({dataBind:{typedText:{value:"isOriginalAccessible",
type:'"boolean"',format:'"Yes,No"'}}})])])]))])]),r({style:{marginLeft:"15px"},
dataBind:{component:{name:"componentId",params:{
methodMap:"$component.methodMap",ref:"copyInfo.ref"}}}
})])),o.if("scriptInfo",r({class:u.classes.infoBox},[r({style:{display:"flex",
flexDirection:"row"}},[r({style:{display:"flex",flexDirection:"column",
color:"green",width:"15px"}},[r({style:{marginBottom:"-10px",textAlign:"center"}
},d({class:"fa fa-caret-up fa-lg"})),r({style:{borderLeft:"2px green solid",
margin:"0 50%",flex:"1 1 0px"}})]),r({class:u.classes.connector,style:{
color:"green"}},[g("gear","green"),d("Which was created by a Script")]),r({
class:u.classes.scriptInfoBox},[r(d({class:u.classes.row,style:{cursor:"pointer"
},dataBind:{click:"function(){showConnectionDetail(!showConnectionDetail());}"}
},[d({class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}}),r({style:{flex:"1 1 0px"}},[d({
fontWeight:"bold"},"Script"),' named "'+d({style:{fontWeight:"bold"},dataBind:{
text:"scriptInfo.script"}
}),'"'])])),o.if("showConnectionDetail()",o.with("scriptInfo",p({
class:u.classes.infoTable},f([o.if("service",h([x("service"),m({dataBind:{
text:"service"}})])),o.if("serviceVersion",h([x("version"),m({dataBind:{
text:"serviceVersion"}})])),h([x("script"),m({dataBind:{text:"script"}
})]),o.if("version",h([x("version"),m({dataBind:{text:"version"}
})]))]))))])]),r({},[o.if("inputObjectRefs",y())])])),o.if("appInfo",r({
class:u.classes.infoBox},[r({style:{display:"flex",flexDirection:"row"}},[r({
style:{display:"flex",flexDirection:"column",color:"green",width:"15px"}},[r({
style:{marginBottom:"-10px",textAlign:"center"}},d({class:"fa fa-caret-up fa-lg"
})),r({style:{borderLeft:"2px green solid",margin:"0 50%",flex:"1 1 0px"}
})]),r({class:u.classes.connector,style:{color:"green"}
},[g("gear","green"),d("Which was created by an App")]),r({
class:u.classes.appInfoBox},[r(d({class:u.classes.row,style:{cursor:"pointer"},
dataBind:{click:"function(){showConnectionDetail(!showConnectionDetail());}"}
},[d({class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}}),r({style:{flex:"1 1 0px"}},[d({
fontWeight:"bold"},"App"),' named "'+d({style:{fontWeight:"bold"},dataBind:{
text:"app.spec.info.name"}
}),'"'])])),o.if("showConnectionDetail()",o.with("app",p({
class:u.classes.infoTable},[h([x("module"),m({dataBind:{text:"module"}
})]),h([x("method"),m({class:"-bare"},p({class:u.classes.infoTable
},[h([x("title"),m({dataBind:{text:"spec.info.name"}})]),h([x("method"),m({
dataBind:{text:"method"}})])]))]),h([x("version"),m({dataBind:{
text:"spec.info.ver"}
})])])))])]),r({},[o.if("inputObjectRefs",y())])]))]),a.loading())}
return s.registerComponent((function(){return{viewModelWithContext:b,
template:w(),stylesheet:u.sheet}}))}));