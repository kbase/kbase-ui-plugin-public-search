define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,n,o,i){
"use strict";const s=o.tag,r=s("div"),l=s("table"),c=s("tr"),a=s("th"),d=s("td")
;class h{constructor({object:e},n){
this.ref=e.objectInfo.ref,this.runtime=n.$root.runtime,
this.loading=t.observable(!0),
this.type=null,this.count=null,this.getOverviewInfo().then(()=>{this.loading(!1)
}).catch(t=>{console.error("ERROR",t)})}getOverviewInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_objects2",[{objects:[{ref:this.ref,
included:["/type","/kb_refs"]}]}]).spread(({data:t})=>{const[e]=t
;this.type=e.data.type,
this.count=Object.keys(e.data.kb_refs).length,this.loading(!1)}).catch(t=>{
console.error("ERROR",t)})}}const u=o.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column",marginTop:"10px"}},table:{
css:{},inner:{td:{padding:"4px",verticalAlign:"top"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px",verticalAlign:"top"},
"td:nth-child(1)":{width:"10em"},"th:nth-child(1)":{width:"10em"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}});function g(){return r({
class:u.classes.component},n.if("loading",i.loading("Loading overview data"),l({
class:u.classes.table},[c([a("Type"),d({dataBind:{text:"type"}
})]),c([a("Count"),d({dataBind:{text:"count"}})])])))}
return e.registerComponent((function(){return{viewModelWithContext:h,
template:g(),stylesheet:u.sheet}}))}));