define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_knockout/components/tabset","kb_lib/html","kb_lib/htmlBuilders","../common/wikipediaImage","./overview","../common/publications","../common/container","../common/containerTab"],(function(e,t,o,n,a,i,c,s,l,r,m,f){
"use strict";const b=i.tag,p=b("div"),d=b("span"),y=b("a");class u extends n{
constructor(t,o){super(t);const{object:n}=t
;this.object=n,this.runtime=o.$root.runtime,
this.summaryInfo=e.observable(),this.scientificName=e.observable(),
this.taxonomy=e.observableArray(),this.dataIcon=e.observable(),this.tabs=[{
active:!0,tab:{label:"Overview"},panel:{component:{name:l.name(),params:{
ref:"object().objectInfo.ref"}}}},{tab:{component:{name:f.name(),params:{
object:"object"}}},panel:{component:{name:m.name(),params:{object:"object"}}}},{
tab:{label:"Something Else",component:null},panel:{component:null,
content:p("hi!")}},{tab:{label:"Publications",component:null},panel:{component:{
name:r.name(),params:{query:this.scientificName}}}
}],this.getSummaryInfo(),this.getDataIcon()}getSummaryInfo(){
this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1}).callFunc("get_object_subset",[[{
ref:this.object().objectInfo.ref,included:["scientific_name"]
}]]).spread(([e])=>{this.scientificName(e.data.scientific_name)
;const t=e.data.taxonomy;if(t){let e
;e=-1!==t.indexOf(";")?t.split(";"):t.split(","),this.taxonomy(e)}})}
getDataIcon(){try{
const e=this.object().objectInfo.type,t=this.runtime.service("type").parseTypeId(e),o=this.runtime.service("type").getIcon({
type:t});this.dataIcon({classes:o.classes.join(" "),color:o.color})}catch(e){
console.error("When fetching icon config: ",e),this.dataIcon({
classes:"fa-question",color:"gray"})}}}const x=i.makeStyles({table:{css:{},
inner:{td:{padding:"4px"},th:{fontWeight:"bold",textAlign:"left",padding:"4px"}}
},sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}})
;return t.registerComponent((function(){return{viewModelWithContext:u,
template:p({style:{flex:"1 1 0px",display:"flex",flexDirection:"column"}
},o.if("object()",[p({style:{display:"flex",flexDirection:"row"}},[p({style:{
flex:"3 1 0px",display:"flex",flexDirection:"column"}},[p({style:{
display:"flex",flexDirection:"row"}},[p(p([d({class:"fa-stack fa-2x"},[d({
class:"fa fa-circle fa-stack-2x",dataBind:{style:{color:"dataIcon().color"}}
}),d({class:"fa-inverse fa-stack-1x ",dataBind:{class:"dataIcon().classes"}
})])])),p({style:{display:"flex",flexDirection:"column",justifyContent:"center"}
},[o.if("scientificName",y({style:{fontSize:"120%",fontWeight:"bold",
fontStyle:"italic"},dataBind:{text:"scientificName",attr:{
href:'"/#dataview/" + object().objectInfo.ref'}},target:"_blank"
}),p(c.loading())),p(y({dataBind:{
text:'object().objectInfo.typeName + " " + object().objectInfo.typeMajorVersion + "." + object().objectInfo.typeMinorVersion',
attr:{href:'"/#spec/type/" + object().objectInfo.type'}},target:"_blank"})),p({
dataBind:{typedText:{value:"object().objectInfo.saveDate",type:'"date"',
format:'"YYYY-MM-DD"'}}})])])]),p({style:{flex:"1 1 0px"}},[p({style:{
padding:"4px",margin:"4px"}},o.component({name:s.name(),params:{
scientificName:"scientificName",height:'"150px"'}}))])]),p({style:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},[o.component({
name:a.name(),params:{tabContext:"$component",tabs:"tabs",bus:"bus"}
})])],c.loading())),stylesheet:x.sheet}}))}));