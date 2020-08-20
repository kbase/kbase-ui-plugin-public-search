define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,o,r,a){
"use strict";const n=r.tag,i=n("a"),s=n("div");class l{
constructor({ref:e,taxonomy:o},r){
this.runtime=r.$root.runtime,this.ref=e,this.ready=t.observable(!1),
this.error=t.observable(),
o?(this.taxonomy=this.parseTaxonomy(o),this.ready(!0)):e?(this.taxonomy=null,
this.getOverviewInfo().then(({taxonomy:t})=>{this.taxonomy=t,this.ready(!0)
}).catch(t=>{console.error("ERROR",t),this.error(t.message)
})):(this.ready(!0),this.taxonomy=[])}parseTaxonomy(t){if(!t)return[]
;if(t instanceof Array)return t;let e
;return e=-1!==t.indexOf(";")?t.split(";"):t.split(","),e}getOverviewInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_object_subset",[[{ref:this.ref,
included:["taxonomy"]}]]).spread(([t])=>({
taxonomy:this.parseTaxonomy(t.data.taxonomy)}))}}const c=r.makeStyles({
component:{css:{}},sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}});function m(){return s({
class:c.classes.component},o.if("ready",o.if("taxonomy.length > 0",s({dataBind:{
foreach:"taxonomy"}},s(i({dataBind:{attr:{
href:'"http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=" + $data'},
text:"$data"},target:"_blank"}))),s({style:{fontStyle:"italic"}
},"No lineage available")),o.if("error",s({class:"alert alert-danger",dataBind:{
text:"error"}}),a.loading("Loading taxonomy data"))))}
return e.registerComponent((function(){return{viewModelWithContext:l,
template:m(),stylesheet:c.sheet}}))}));