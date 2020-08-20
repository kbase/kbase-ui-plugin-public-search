define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_lib/workspaceUtils"],(function(e,t,s,o,i,a,n,l){
"use strict";class r extends i{constructor(e,s,o,i,a){
super(e),this.methodMap=s.$root.methodMap
;const n=t.utils.unwrapObservable(e.ref),[l,r,c]=n.split("/").map(e=>parseInt(e,10))
;this.objectRef={ref:n,workspaceId:l,objectId:r,version:c
},this.runtime=s.$root.runtime,
this.componentId=a,this.ready=t.observable(!1),this.error=t.observable(),
this.provenanceMissing=!1,
this.objectInfo=null,this.workspaceInfo=null,this.workspaceType=null,
this.workspaceName=null,
this.workspaceOwner=null,this.moduleInfo=null,this.appInfo=null,
this.copyInfo=null,
this.inputObjectRefs=[],this.scriptInfo=null,this.app=null,this.showObjectDetail=t.observable(!1),
this.showConnectionDetail=t.observable(!1),this.getProvenance().then(()=>{
this.ready(!0)}).catch(t=>{console.error("ERRORx",e,t),this.error(t)})}
getWorkspaceInfo(){return this.runtime.service("rpc").makeClient({
module:"Workspace",timeout:1e4,authorization:!1
}).callFunc("get_workspace_info",[{id:this.objectRef.workspaceId
}]).spread(e=>l.workspaceInfoToObject(e))}getProvenanceInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_objects2",[{objects:[{ref:this.objectRef.ref}],
ignoreErrors:1,no_data:1}]).spread(e=>e.data[0])}getModuleInfo(){
return this.runtime.service("rpc").makeClient({module:"Catalog",timeout:1e4,
authorization:!1}).callFunc("get_module_version",[{
module_name:this.appInfo.module}]).spread(e=>this.moduleInfo=e)}resolveApp(){
return e.try(()=>{
const e=this.appInfo.module+"/"+this.appInfo.method,t=this.methodMap.release[e]||this.methodMap.beta[e]||this.methodMap.dev[e]
;if(!t)return null;const[s,o]=t.info.id.split("/"),i=t.info.id
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
this.objectInfo=l.objectInfoToObject(t.info),this.inputObjectRefs=s.resolved_ws_objects,
t.copied)this.copyInfo={ref:t.copied,
isOriginalAccessible:0===t.copy_source_inaccessible};else{
if(s.service&&s.method)return this.appInfo={module:s.service,method:s.method,
version:s.service_ver},this.getApp();s.script&&s.service?this.scriptInfo={
service:s.service,serviceVersion:s.service_ver,script:s.script,version:s.version
}:s.script&&(this.scriptInfo={service:null,serviceVersion:null,script:s.script,
version:s.script_ver})}})}}
const c=a.tag,d=c("p"),p=c("div"),f=c("span"),h=c("table"),x=c("tbody"),m=c("tr"),b=c("th"),u=c("td"),g=a.makeStyles({
objectInfoBox:{css:{border:"1px silver solid",margin:"10px",padding:"4px",
flex:"1 1 0px"}},row:{css:{display:"flex",flexDirection:"row"}},sectionTitle:{
css:{fontWeight:"bold",color:"rgba(100,100,100,1)"}},label:{css:{
fontWeight:"bold",color:"rgba(150,150,150,1)"}},appInfoBox:{css:{
border:"2px green solid",borderRadius:"8px",margin:"10px",padding:"4px",
flex:"1 1 0px"}},scriptInfoBox:{css:{border:"2px green solid",
borderRadius:"8px",margin:"10px",padding:"4px",flex:"1 1 0px"}},copyInfoBox:{
css:{border:"2px blue solid",borderRadius:"8px",margin:"10px",padding:"4px",
flex:"1 1 0px"}},connector:{css:{margin:"10px",fontWeight:"bold",width:"20em"}},
object:{css:{fontWeight:"bold",width:"30em"}},infoBox:{css:{}},infoTable:{css:{
width:"100%"},inner:{th:{fontWeight:"bold",color:"rgba(150, 150, 150, 1)",
width:"5em",padding:"4px",verticalAlign:"top"},td:{padding:"4px",
verticalAlign:"top"},"td.-bare":{padding:"0"}}}});function y(e,t){return p({
style:{display:"inline-block",width:"30px"}},f({class:"fa fa-lg fa-"+e,style:{
color:t}}))}function w(){return p({style:{flex:"1 1 0px",marginLeft:"15px"}
},o.if("inputObjectRefs.length > 0",p({dataBind:{foreach:"inputObjectRefs"}},p({
dataBind:{component:{name:"$component.componentId",params:{ref:"$data",
methodMap:"$component.methodMap"}}}})),p({class:g.classes.infoBox},[p({style:{
display:"flex",flexDirection:"row"}},[p({style:{display:"flex",
flexDirection:"column",color:"red",width:"15px"}},[p({style:{
marginBottom:"-10px",textAlign:"center"}},f({class:"fa fa-caret-up fa-lg"})),p({
style:{borderLeft:"2px red solid",margin:"0 50%",flex:"1 1 0px"}})]),p({
class:g.classes.connector},[y("cloud","red"),f({style:{fontStyle:"italic"}
},"EDGE of the system")]),p({class:g.classes.objectInfoBox
},["nothing to see here..."])])])))}function v(){return p({style:{margin:"10px",
border:"1px red solid",width:"25em"}},[p({style:{backgroundColor:"red",
color:"white",fontWeight:"bold",padding:"10px"}},"Error"),p({style:{
padding:"10px"}},[d({style:{textAlign:"left"},dataBind:{text:"error().message"}
})])])}function B(){return p(o.if("ready",o.if("provenanceMissing",p({style:{
margin:"10px"}},[d({style:{textAlign:"center",fontStyle:"italic"}
},"No provenance for this object")]),o.if("error()",v(),[p({
class:g.classes.infoBox},[p({style:{display:"flex",flexDirection:"row"}},[p({
style:{display:"flex",flexDirection:"column",color:"black",width:"15px"}},[p({
style:{marginBottom:"-10px",textAlign:"center"}},f({class:"fa fa-caret-up fa-lg"
})),p({style:{borderLeft:"2px black solid",margin:"0 50%",flex:"1 1 0px"}
})]),p({class:g.classes.connector},[y("file-o","black"),"Object: "]),p({
class:g.classes.objectInfoBox},[p(f({class:g.classes.row,style:{cursor:"pointer"
},dataBind:{click:"function(){showObjectDetail(!showObjectDetail());}"}},[f({
class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showObjectDetail()","fa-caret-down":"showObjectDetail()"}}
}),p({style:{flex:"1 1 0px"}},[f({style:{fontWeight:"bold"},dataBind:{
text:"objectInfo.typeName"}}),' object named "'+f({style:{fontWeight:"bold"},
dataBind:{text:"objectInfo.name"}}),'" in '+f({style:{fontWeight:"bold"},
dataBind:{text:"workspaceType"}}),' named "'+f({style:{fontWeight:"bold"},
dataBind:{text:"workspaceName"}}),'"'])])),o.if("showObjectDetail()",p({style:{
display:"flex",flexDirection:"row"}},[p({style:{flex:"1 1 0px"}},[p({
class:g.classes.sectionTitle},"Object"),h({class:g.classes.infoTable
},[m([b("name"),u({dataBind:{text:"objectInfo.name"}})]),m([b("created"),u({
dataBind:{typedText:{value:"objectInfo.saveDate",type:'"date"',
format:'"YYYY-MM-DD"'}}})])])]),p({style:{flex:"1 1 0px"}},[p(["in ",f({
class:g.classes.sectionTitle,dataBind:{text:"workspaceType"}})]),h({
class:g.classes.infoTable},[m([b("name"),u({dataBind:{text:"workspaceName"}
})]),m([b("owner"),u({dataBind:{text:"workspaceOwner"}
})])])])]))])])]),o.if("copyInfo",p({class:g.classes.infoBox},[p({style:{
display:"flex",flexDirection:"row"}},[p({style:{display:"flex",
flexDirection:"column",color:"blue",width:"15px"}},[p({style:{
marginBottom:"-10px",textAlign:"center"}},f({class:"fa fa-caret-up fa-lg"})),p({
style:{borderLeft:"2px blue solid",margin:"0 50%",flex:"1 1 0px"}})]),p({
class:g.classes.connector,style:{color:"blue"}
},[y("files-o","blue"),f("Which was created by Copying")]),p({
class:g.classes.copyInfoBox},[p(f({style:{cursor:"pointer"},dataBind:{
click:"function(){showConnectionDetail(!showConnectionDetail());}"}},[f({
class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}
}),f(o.if("showConnectionDetail()","hide detail","show detail"))])),o.if("showConnectionDetail()",o.with("copyInfo",[h({
class:g.classes.infoTable},[m([b("Object ref"),u({dataBind:{text:"ref"}
})]),m([b("Accessible?"),u({dataBind:{typedText:{value:"isOriginalAccessible",
type:'"boolean"',format:'"Yes,No"'}}})])])]))])]),p({style:{marginLeft:"15px"},
dataBind:{component:{name:"componentId",params:{
methodMap:"$component.methodMap",ref:"copyInfo.ref"}}}
})])),o.if("scriptInfo",p({class:g.classes.infoBox},[p({style:{display:"flex",
flexDirection:"row"}},[p({style:{display:"flex",flexDirection:"column",
color:"green",width:"15px"}},[p({style:{marginBottom:"-10px",textAlign:"center"}
},f({class:"fa fa-caret-up fa-lg"})),p({style:{borderLeft:"2px green solid",
margin:"0 50%",flex:"1 1 0px"}})]),p({class:g.classes.connector,style:{
color:"green"}},[y("gear","green"),f("Which was created by a Script")]),p({
class:g.classes.scriptInfoBox},[p(f({class:g.classes.row,style:{cursor:"pointer"
},dataBind:{click:"function(){showConnectionDetail(!showConnectionDetail());}"}
},[f({class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}}),p({style:{flex:"1 1 0px"}},[f({
fontWeight:"bold"},"Script"),' named "'+f({style:{fontWeight:"bold"},dataBind:{
text:"scriptInfo.script"}
}),'"'])])),o.if("showConnectionDetail()",o.with("scriptInfo",h({
class:g.classes.infoTable},x([o.if("service",m([b("service"),u({dataBind:{
text:"service"}})])),o.if("serviceVersion",m([b("version"),u({dataBind:{
text:"serviceVersion"}})])),m([b("script"),u({dataBind:{text:"script"}
})]),o.if("version",m([b("version"),u({dataBind:{text:"version"}
})]))]))))])]),p({},[o.if("inputObjectRefs",w())])])),o.if("appInfo",o.if("app",p({
class:g.classes.infoBox},[p({style:{display:"flex",flexDirection:"row"}},[p({
style:{display:"flex",flexDirection:"column",color:"green",width:"15px"}},[p({
style:{marginBottom:"-10px",textAlign:"center"}},f({class:"fa fa-caret-up fa-lg"
})),p({style:{borderLeft:"2px green solid",margin:"0 50%",flex:"1 1 0px"}
})]),p({class:g.classes.connector,style:{color:"green"}
},[y("gear","green"),f("Which was created by an App")]),p({
class:g.classes.appInfoBox},[p(f({class:g.classes.row,style:{cursor:"pointer"},
dataBind:{click:"function(){showConnectionDetail(!showConnectionDetail());}"}
},[f({class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}}),p({style:{flex:"1 1 0px"}},[f({
fontWeight:"bold"},"App"),' named "'+f({style:{fontWeight:"bold"},dataBind:{
text:"app.spec.info.name"}
}),'"'])])),o.if("showConnectionDetail()",o.with("app",h({
class:g.classes.infoTable},[m([b("module"),u({dataBind:{text:"module"}
})]),m([b("method"),u({class:"-bare"},h({class:g.classes.infoTable
},[m([b("title"),u({dataBind:{text:"spec.info.name"}})]),m([b("method"),u({
dataBind:{text:"method"}})])]))]),m([b("version"),u({dataBind:{
text:"spec.info.ver"}})])])))])]),p({},[o.if("inputObjectRefs",w())])]),p({
class:g.classes.infoBox},[p({style:{display:"flex",flexDirection:"row"}},[p({
style:{display:"flex",flexDirection:"column",color:"green",width:"15px"}},[p({
style:{marginBottom:"-10px",textAlign:"center"}},f({class:"fa fa-caret-up fa-lg"
})),p({style:{borderLeft:"2px green solid",margin:"0 50%",flex:"1 1 0px"}
})]),p({class:g.classes.connector,style:{color:"green"}
},[y("gear","green"),f("Which was created by an App")]),p({
class:g.classes.appInfoBox},[p(f({class:g.classes.row,style:{cursor:"pointer"},
dataBind:{click:"function(){showConnectionDetail(!showConnectionDetail());}"}
},[f({class:"fa",style:{width:"1em"},dataBind:{css:{
"fa-caret-right":"!showConnectionDetail()",
"fa-caret-down":"showConnectionDetail()"}}}),p({style:{flex:"1 1 0px"}
},[f("App not found: "),f({dataBind:{
text:'$component.appInfo.module + "/" + $component.appInfo.method'}
})])])),o.if("showConnectionDetail()",p({},[d(["This app was not found. This probably indicates that it was only available ","in a development mode, and was later removed from the app catalog."])]))])]),p({},[o.if("inputObjectRefs",w())])])))])),o.if("error",v(),n.loading())))
}return s.registerComponent((function(){return{viewModelWithContext:r,
template:B(),stylesheet:g.sheet}}))}));