define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,i,n,a){
"use strict"
;const o=n.tag,s=o("a"),r=o("div"),c=o("table"),l=o("tr"),m=o("th"),d=o("td")
;class h{constructor({ref:e,scientificName:i,taxonomy:n},a){
this.runtime=a.$root.runtime,
this.ref=e,this.ready=t.observable(!1),i&&n?(this.scientificName=i,
this.taxonomy=this.parseTaxonomy(n)):(this.scientificName=null,
this.taxonomy=null,
this.getOverviewInfo().then(({scientificName:t,taxonomy:e})=>{
this.scientificName=t,this.taxonomy=e,this.ready(!0)}).catch(t=>{
console.error("ERROR",t)}))}parseTaxonomy(t){if(!t)return[]
;if(t instanceof Array)return t;let e
;return e=-1!==t.indexOf(";")?t.split(";"):t.split(","),e}getOverviewInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_object_subset",[[{ref:this.ref,
included:["scientific_name","taxonomy"]}]]).spread(([t])=>({
scientificName:t.data.scientific_name,
taxonomy:this.parseTaxonomy(t.data.taxonomy)}))}}const f=n.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
marginTop:"10px"}},table:{css:{},inner:{td:{padding:"4px",verticalAlign:"top"},
th:{fontWeight:"bold",color:"rgba(200,200,200,1)",textAlign:"left",
padding:"4px",verticalAlign:"top"},"td:nth-child(1)":{width:"10em"},
"th:nth-child(1)":{width:"10em"}}},sectionHeader:{css:{fontWeight:"bold",
fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}}});function x(){
return r({class:f.classes.component},i.if("ready",c({class:f.classes.table
},[l([m("Scientific name"),d({dataBind:{text:"scientificName"}
})]),l([m("Taxonomic Lineage"),d(r({dataBind:{foreach:"taxonomy"}},r(s({
dataBind:{attr:{
href:'"http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=" + $data'},
text:"$data"},target:"_blank"}))))])]),a.loading("Loading taxonomy data")))}
return e.registerComponent((function(){return{viewModelWithContext:h,
template:x(),stylesheet:f.sheet}}))}));