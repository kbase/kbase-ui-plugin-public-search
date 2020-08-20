define(["bluebird","knockout","marked","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,a,s,r,l,c){
"use strict";class o{constructor({object:a},s){
this.object=a,this.runtime=s.$root.runtime,
this.ready=e.observable(!1),this.error=e.observable(),
this.title=this.object.workspaceInfo.metadata.narrative_nice_name,
this.abstract=null,
this.createdBy=null,this.createdAt=null,this.lastSavedAt=this.object.objectInfo.saveDate,
this.lastSavedBy=this.object.objectInfo.saved_by,this.cellCounts={
markdown:this.getObjectMetadataInt("jupyter.markdown"),
code:this.getObjectMetadataInt("jupyter.code"),app:this.gatherAppCellCounts()
},this.objectCounts=null,
t.all([this.getTypeCounts(),this.getAbstract()]).spread((t,{abstract:e,createdBy:a,createdAt:s})=>{
this.objectCounts=t,
this.abstract=e,this.createdBy=a,this.createdAt=s,this.ready(!0)}).catch(t=>{
this.error(t.message),console.error("error",t)})}getObjectMetadataInt(t){
const e=this.object.objectInfo.metadata[t];return e?parseInt(e,10):0}
gatherAppCellCounts(){
return Object.entries(this.object.objectInfo.metadata).reduce((t,[e,a])=>e.startsWith("method.")?t+parseInt(a,10):t,0)
}getTypeCounts(){return this.runtime.service("rpc").makeClient({
module:"Workspace",timeout:1e4,authorization:!0}).callFunc("list_objects",[{
ids:[this.object.workspaceInfo.id]}]).spread(t=>{const e=t.reduce((t,e)=>{
const[,a,,]=e[2].split(/[.-]/);return t[a]?t[a]+=1:t[a]=1,t},{})
;return Object.entries(e).map(([t,e])=>({type:t,count:e
})).sort((t,e)=>t.type.localeCompare(e.type))})}getAbstract(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!0}).callFunc("get_objects2",[{objects:[{
ref:this.object.objectInfo.ref}]}]).spread(t=>{
const e=t.data[0],a=e.data.cells.filter(t=>"markdown"===t.cell_type).map(t=>t.source),s=/Welcome to KBase's Narrative Interface!/,r=a.find(t=>!!t&&!s.test(t)),l=e.creator,c=e.created.split("+")[0]
;return{abstract:r,createdBy:l,createdAt:new Date(c)}})}}
const i=l.tag,n=i("a"),d=i("span"),p=i("div"),b=i("table"),h=i("tbody"),u=i("tr"),g=i("th"),m=i("td"),y=l.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
marginTop:"10px"}},table:{css:{},inner:{td:{padding:"4px",verticalAlign:"top"},
th:{fontWeight:"bold",color:"rgba(200,200,200,1)",textAlign:"left",
padding:"4px",verticalAlign:"top"},"td:nth-child(1)":{width:"10em"},
"th:nth-child(1)":{width:"10em"}}},sectionHeader:{css:{fontWeight:"bold",
fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}},column:{css:{
display:"inline-block",width:"50%",verticalAlign:"top"}},column1:{css:{
display:"inline-block",width:"50%",verticalAlign:"top",paddingRight:"10px"}},
column2:{css:{display:"inline-block",width:"50%",verticalAlign:"top",
paddingLeft:"10px"}},columnHeader:{css:{fontWeight:"bold",color:"#333",
margin:"10px 0 4px 0"}},narrativeTitle:{css:{fontWeight:"bold",fontSize:"120%"}
},createdBy:{css:{fontWeight:"italic"}},narrativeAbstract:{css:{padding:"6px",
border:"1px rgba(200,200,200, 0.5) solid",borderRadius:"4px",
boxShadow:"4px 4px 4px rgba(100,100,100,1)"},inner:{h2:{fontSize:"100%"},
blockquote:{fontSize:"100%"}}},label:{css:{fontWeight:"bold",
color:"rgba(200,200,200,1)",marginRight:"4px"}}});function f(){return p({
class:y.classes.component},r.if("ready",p([p({class:y.classes.column1},[p([p({
class:y.classes.columnHeader},"Narrative"),p([p({class:y.classes.narrativeTitle,
dataBind:{text:"title"}}),p([d({class:y.classes.label},"creator"),n({
class:y.classes.createdBy,target:"_blank",dataBind:{text:"createdBy",attr:{
href:'"/#people/" + createdBy'}}})]),p({class:y.classes.narrativeAbstract
},r.if("abstract",p({dataBind:{htmlMarkdown:"abstract"}}),p({style:{
fontStyle:"italic"}
},"Sorry, no introductory markdown cell found for this Narrative.")))])])]),p({
class:y.classes.column2},[p([p({class:y.classes.columnHeader},"Cells"),b({
class:y.classes.table},[u([g("Apps"),m({style:{textAlign:"right"},dataBind:{
text:"cellCounts.app"}})]),u([g("Markdown"),m({style:{textAlign:"right"},
dataBind:{text:"cellCounts.markdown"}})]),u([g("Code"),m({style:{
textAlign:"right"},dataBind:{text:"cellCounts.code"}})])])]),p([p({
class:y.classes.columnHeader},"Objects"),b({class:y.classes.table},[h({
dataBind:{foreach:"objectCounts"}},u([g({dataBind:{text:"type"}}),m({style:{
textAlign:"right"},dataBind:{text:"count"}})]))])]),p([p({
class:y.classes.columnHeader},"Info"),b({class:y.classes.table
},[h({},[u([g("created"),m({dataBind:{typedText:{value:"createdAt",
type:'"date"',format:'"MMM D, YYYY @ hh:mm a"'}}})]),u([g("by"),m(n({
target:"_blank",dataBind:{text:"createdBy",attr:{href:'"/#people/" + createdBy'}
}
}))]),r.if("createdBy !== lastSavedBy || createdAt.getTime() !== lastSavedAt.getTime()",[u([g("last saved"),m({
dataBind:{typedText:{value:"lastSavedAt",type:'"date"',
format:'"MMM D, YYYY @ hh:mm a"'}}})]),u([g("by"),m(n({target:"_blank",
dataBind:{text:"lastSavedBy",attr:{href:'"/#people/" + lastSavedBy'}}
}))])])])])])])]),r.if("error",p({class:"alert alert-danger",dataBind:{
text:"error"}}),c.loading("Loading overview data"))))}
return s.registerComponent((function(){return{viewModelWithContext:o,
template:f(),stylesheet:y.sheet}}))}));