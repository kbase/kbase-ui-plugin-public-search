define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,i,s,a){
"use strict";class o{constructor({object:e},i){
this.object=e,this.runtime=i.$root.runtime,
this.ready=t.observable(!1),this.error=t.observable(),
this.id=null,this.description=null,
this.domain=null,this.platform=null,this.sampleCount=null,
this.replicateCount=null,
this.source=null,this.libraryType=null,this.publicationId=null,
this.externalSourceDate=null,
this.conditionSetRef=null,this.condition=null,this.getObject().then(()=>{
this.ready(!0)}).catch(t=>{console.error("ERROR",t),this.error(t.message)})}
getObject(){return this.runtime.service("rpc").makeClient({module:"Workspace",
timeout:1e4,authorization:!1}).callFunc("get_objects2",[{objects:[{
ref:this.object.objectInfo.ref,
included:["sampleset_id","sampleset_desc","domain","platform","num_samples","num_replicates","source","Library_type","publication_id","external_source_date","conditionset_ref","condition"]
}],ignoreErrors:1,no_data:0}]).spread(t=>{console.log("object data?",t)
;const e=t.data[0].data
;this.id=e.sampleset_id,this.description=e.sampleset_desc,
this.domain=e.domain,this.platform=e.platform,
this.sampleCount=e.num_samples,this.replicateCount=e.num_replicates,
this.source=e.source,
this.libraryType=e.Library_type,this.publicationId=e.publication_id,
this.externalSourceDate=e.external_source_date,
this.conditionSetRef=e.conditionset_ref,this.condition=e.condition})}}
const l=s.tag,n=l("div"),r=l("table"),c=l("tr"),d=l("th"),u=l("td"),p=s.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
marginTop:"10px"}},table:{css:{},inner:{td:{padding:"4px",verticalAlign:"top"},
th:{fontWeight:"bold",color:"rgba(200,200,200,1)",textAlign:"left",
padding:"4px",verticalAlign:"top"},"td:nth-child(1)":{width:"10em"},
"th:nth-child(1)":{width:"10em"}}},sectionHeader:{css:{fontWeight:"bold",
fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}},column:{css:{
display:"inline-block",width:"50%",verticalAlign:"top"}},columnHeader:{css:{
fontWeight:"bold",color:"#333",margin:"10px 0 4px 0"}}});function m(){return n({
class:p.classes.component},i.if("ready",n([n({class:p.classes.column},[n([n({
class:p.classes.columnHeader},"Samples"),r({class:p.classes.table
},[c([d("Sample Set ID"),u({dataBind:{text:"id"}})]),c([d("Sample Count"),u({
dataBind:{text:"sampleCount"}})]),c([d("Replicate Count"),u({dataBind:{
text:"replicateCount"}})])])]),n([n({class:p.classes.columnHeader},"Source"),r({
class:p.classes.table},[c([d("Source"),u({dataBind:{text:"source"}
})]),c([d("Date"),u({dataBind:{text:"externalSourceDate"}
})]),c([d("Library Type"),u({dataBind:{text:"libraryType"}
})]),c([d("Platform"),u({dataBind:{text:"platform"}})])])])]),n({
class:p.classes.column},[n([n({class:p.classes.columnHeader},"Taxonomy"),r({
class:p.classes.table},[c([d("Domain"),u({dataBind:{text:"domain"}
})])])])])]),i.if("error",n({class:"alert alert-danger",dataBind:{text:"error"}
}),a.loading("Loading overview data"))))}return e.registerComponent((function(){
return{viewModelWithContext:o,template:m(),stylesheet:p.sheet}}))}));