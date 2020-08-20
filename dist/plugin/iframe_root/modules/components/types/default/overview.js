define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","../common/metadata"],(function(t,e,o,i,n,a){
"use strict";const s=i.tag,c=s("p"),l=s("span"),r=s("div");class d{
constructor({object:e},o){
this.object=e,this.runtime=o.$root.runtime,this.ready=t.observable(!0)}}
const b=i.makeStyles({component:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"column",marginTop:"10px"}},table:{css:{},inner:{td:{
padding:"4px",verticalAlign:"top"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px",verticalAlign:"top"},
"td:nth-child(1)":{width:"10em"},"th:nth-child(1)":{width:"10em"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}});function h(){return r({
class:b.classes.component},o.if("ready",r([c(["This object of type ",l({style:{
fontWeight:"bold"},dataBind:{text:"object.objectInfo.typeName"}
})," does not have a specific visualizer."]),c(["To view additional information about this object, visit its Landing Page by clicking on the title above, ",'or the "View" button at the bottom of this window.']),r({
class:b.classes.sectionHeader},"Metadata"),r({dataBind:{component:{
name:a.quotedName(),params:{object:"object"}}}
})]),n.loading("Loading overview data")))}
return e.registerComponent((function(){return{viewModelWithContext:d,
template:h(),stylesheet:b.sheet}}))}));