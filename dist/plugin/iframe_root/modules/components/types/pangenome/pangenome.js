define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_knockout/components/tabset","kb_lib/html","kb_lib/htmlBuilders","./overview","../builders"],(function(t,e,o,n,s,a,i,c,r){
"use strict";const l=a.tag,b=l("div"),d=l("a");class f extends r.TypeViewModel{
constructor(t,e){
super(t,e),this.summaryInfo=null,this.taxonomy=[],this.dataIcon=this.getDataIcon(),
this.setTabs({primary:null,overview:c.name(),custom:[]}),this.start()}start(){
this.ready(!0)}getDataIcon(){try{
const t=this.object.objectInfo.type,e=this.runtime.service("type").parseTypeId(t),o=this.runtime.service("type").getIcon({
type:e});return{classes:o.classes.join(" "),color:o.color}}catch(t){
return console.error("When fetching icon config: ",t),{classes:"fa-question",
color:"gray"}}}}const p=a.makeStyles({component:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column"}},table:{css:{},inner:{td:{padding:"4px"},
th:{fontWeight:"bold",textAlign:"left",padding:"4px"}}},sectionHeader:{css:{
fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}}
});return e.registerComponent((function(){return{viewModelWithContext:f,
template:b({class:p.classes.component
},o.if("ready",o.if("object",[r.buildHeader([o.if("object.objectInfo.name",d({
style:{fontSize:"120%",fontWeight:"bold",fontStyle:"italic"},dataBind:{
text:"object.objectInfo.name",attr:{href:'"/#dataview/" + object.objectInfo.ref'
}},target:"_blank"}),b(i.loading())),b(d({dataBind:{
text:'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
attr:{href:'"/#spec/type/" + object.objectInfo.type'}},target:"_blank"})),b({
dataBind:{typedText:{value:"object.objectInfo.saveDate",type:'"date"',
format:'"YYYY-MM-DD"'}}})],null),b({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}},[o.component({name:s.name(),params:{
tabContext:"$component",tabs:"tabs",bus:"bus"}})])],i.loading()),i.loading())),
stylesheet:p.sheet}}))}));