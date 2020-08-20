define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","../common/lineage"],(function(t,e,n,a,i,s){
"use strict";const o=a.tag,l=o("div"),c=o("table"),d=o("tr"),r=o("th"),m=o("td")
;class u{constructor(e,n){const{object:a}=e
;this.ref=a.objectInfo.ref,this.ready=t.observable(!1),
this.error=t.observable(),this.runtime=n.$root.runtime,this.scientificName=null,
this.domain=null,this.dnaSize=null,this.contigCount=null,this.featureCount=null,
this.gcContent=null,
this.taxonomy=null,this.kbaseID=null,this.getOverviewInfo().then(()=>{
this.ready(!0)}).catch(t=>{console.error("ERROR",t)})}getOverviewInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_object_subset",[[{ref:this.ref,
included:["scientific_name","domain","dna_size","num_contigs","gc_content","taxonomy","id"]
}]]).spread(([t])=>{let e
;this.scientificName=t.data.scientific_name,this.domain=t.data.domain,
this.dnaSize=t.data.dna_size,
this.contigCount=t.data.num_contigs,this.taxonomy=t.data.taxonomy,
this.kbaseID=t.data.id,
"number"==typeof t.data.gc_content?(e=t.data.gc_content,e>100?t.data.dna_size&&0!==t.data.dna_size?e/=t.data.dna_size:e=100:e>1&&(e/=100)):e=null,
this.gcContent=e,
this.featureCount=t.info[10]["Number features"]||t.info[10]["Number of CDS"]})}}
const h=a.makeStyles({component:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"column",marginTop:"10px"}},table:{css:{},inner:{td:{
padding:"4px",verticalAlign:"top"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px",verticalAlign:"top"},
"td:nth-child(1)":{width:"10em"},"th:nth-child(1)":{width:"10em"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}},column:{css:{
display:"inline-block",width:"50%",verticalAlign:"top"}},columnHeader:{css:{
fontWeight:"bold",color:"#333",margin:"10px 0 4px 0"}}});function g(){return l({
class:h.classes.component},n.if("ready",l([l({class:h.classes.column},[l([l({
class:h.classes.columnHeader},"Taxonomy"),c({class:h.classes.table
},[d([r("Scientific name"),m({dataBind:{text:"scientificName"}
})]),d([r("Domain"),m({dataBind:{text:"domain"}})]),d([r("Lineage"),m(l({
dataBind:{component:{name:s.quotedName(),params:{taxonomy:"taxonomy"}}}
}))])])])]),l({class:h.classes.column},[l([l({class:h.classes.columnHeader
},"Stats"),c({class:h.classes.table},[d([r("DNA Length"),m({dataBind:{
typedText:{value:"dnaSize",type:'"number"',format:'"0,0"',missing:'"-"'}}
})]),d([r("# Contigs"),m({dataBind:{typedText:{value:"contigCount",
type:'"number"',format:'"0,0"',missing:'"-"'}}})]),d([r("GC Content"),m({
dataBind:{typedText:{value:"gcContent",type:'"number"',format:'"0.0%"',
missing:'"-"'}}})]),d([r("# Features"),m({dataBind:{typedText:{
value:"featureCount",type:'"number"',format:'"0,0"',missing:'"-"'}}
})])])]),l([l({class:h.classes.columnHeader},"KBase"),c({class:h.classes.table
},[d([r("KBase ID"),m({dataBind:{text:"kbaseID"}
})])])])])]),i.loading("Loading overview data")))}
return e.registerComponent((function(){return{viewModelWithContext:u,
template:g(),stylesheet:h.sheet}}))}));