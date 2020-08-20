define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","../../lineage"],(function(e,t,i,a,n,s){
"use strict";const o=a.tag,d=o("div"),l=o("table"),c=o("tr"),r=o("th"),g=o("td")
;class h{constructor({ref:t},i){
this.ref=t,this.runtime=i.$root.runtime,this.loading=e.observable(!0),
this.scientificName=e.observable(),
this.rank=e.observable(),this.domain=e.observable(),this.kingdom=e.observable(),
this.geneticCode=e.observable(),
this.aliases=e.observableArray(),this.lineage=e.observableArray(),
this.getOverviewInfo()}getOverviewInfo(){
this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_object_subset",[[{ref:this.ref,
included:["scientific_name","scientific_lineage","rank","domain","kingdom","aliases","genetic_code"]
}]]).spread(([e])=>{
this.scientificName(e.data.scientific_name),this.rank(e.data.rank),
this.domain(e.data.domain),
this.kingdom(e.data.kingdom),this.geneticCode(e.data.genetic_code),
this.aliases(e.data.aliases),this.loading(!1);const t=e.data.scientific_lineage
;if(t){let e;e=-1!==t.indexOf(";")?t.split(";"):t.split(","),this.lineage(e)}
}).catch(e=>{console.error("ERROR",e)})}}const m=a.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column",marginTop:"10px"}},table:{
css:{},inner:{td:{padding:"4px",verticalAlign:"top"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px",verticalAlign:"top"},
"td:nth-child(1)":{width:"10em"},"th:nth-child(1)":{width:"10em"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}});function b(){return d({
class:m.classes.component},i.if("loading",n.loading("Loading overview data"),l({
class:m.classes.table},[c([r("Scientific name"),g({dataBind:{
text:"scientificName"}})]),c([r("Rank"),g({dataBind:{text:"rank"}
})]),c([r("Kingdom"),g({dataBind:{text:"kingdom"}})]),c([r("Domain"),g({
dataBind:{text:"domain"}})]),c([r("Genetic Code"),g({dataBind:{
text:"geneticCode"}})]),c([r("Aliases"),g({dataBind:{foreach:"aliases"}},d({
dataBind:{text:"$data"}}))]),c([r("Lineage"),g({dataBind:{component:{
name:s.quotedName(),params:{lineage:"lineage"}}}})])])))}
return t.registerComponent((function(){return{viewModelWithContext:h,
template:b(),stylesheet:m.sheet}}))}));