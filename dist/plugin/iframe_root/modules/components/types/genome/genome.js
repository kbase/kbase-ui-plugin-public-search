define(["bluebird","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","./overview","../common/publications","./genes/main","../common/wikipedia","./trees","../builders"],(function(e,t,i,n,o,a,s,c,r,l,m){
"use strict";class d extends m.TypeViewModel{constructor(t,i){
super(t,i),this.summaryInfo=null,
this.scientificName=null,this.taxonomy=null,this.setTabs({primary:{tab:{
label:"Features"},panel:{component:{name:c.name(),params:{object:"object"}}}},
overview:a.name(),custom:[{tab:{label:"Wikipedia"},panel:{component:{
name:r.name(),params:{term:"scientificName"}}}},{tab:{label:"Publications",
component:null},panel:{component:{name:s.name(),params:{query:"scientificName"}}
}}]}),e.all([this.getSummaryInfo()]).then(()=>{this.ready(!0)}).catch(e=>{
console.error("Error",e),this.error(e)})}getSummaryInfo(){
return this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_object_subset",[[{
ref:this.object.objectInfo.ref,included:["scientific_name","domain"]
}]]).spread(([e])=>{
this.scientificName=e.data.scientific_name,this.domain=e.data.domain
;const t=e.data.taxonomy;if(t){let e
;e=-1!==t.indexOf(";")?t.split(";"):t.split(","),this.taxonomy=e}})}}
const b=n.tag,f=b("div"),p=b("a"),u=n.makeStyles({table:{css:{},inner:{td:{
padding:"4px"},th:{fontWeight:"bold",textAlign:"left",padding:"4px"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}})
;return t.registerComponent((function(){return{viewModelWithContext:d,
template:f({style:{flex:"1 1 0px",display:"flex",flexDirection:"column"}
},i.if("ready()",i.if("object",[m.buildHeader([i.if("scientificName",p({style:{
fontSize:"120%",fontWeight:"bold",fontStyle:"italic"},dataBind:{
text:"scientificName",attr:{href:'"/#dataview/" + object.objectInfo.ref'}},
target:"_blank",
title:"This is the scientific name assigned to this Genome object."
}),f(o.loading())),f({dataBind:{text:"domain"},
title:"This is the taxonomic domain assigned to this Genome object."}),f(p({
dataBind:{
text:'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
attr:{href:'"/#spec/type/" + object.objectInfo.type'}},target:"_blank",
title:"This is the type and type version of this Genome object. You may click on it to view more information about this type."
}))],"scientificName"),m.buildTabs()],o.loading()),o.loading())),
stylesheet:u.sheet}}))}));