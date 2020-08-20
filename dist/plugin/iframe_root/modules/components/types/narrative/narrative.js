define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","./overview","../builders"],(function(e,t,o,n,a,i,r){
"use strict";const s=n.tag,c=s("div"),l=s("a");class b extends r.TypeViewModel{
constructor(e,t){super(e,t),this.setTabs({primary:null,overview:i.name(),
custom:[]}),this.ready(!0)}}const d=n.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},sectionHeader:{css:{
fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}}
});return t.registerComponent((function(){return{viewModelWithContext:b,
template:c({class:d.classes.component
},o.if("ready",o.if("object",[r.buildHeader([l({style:{fontSize:"120%",
fontWeight:"bold",fontStyle:"italic"},dataBind:{
text:"object.workspaceInfo.metadata.narrative_nice_name",attr:{
href:'"/narrative/ws." + object.workspaceInfo.id + ".obj." + object.objectInfo.id'
}},target:"_blank"}),c(l({dataBind:{
text:'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
attr:{href:'"/#spec/type/" + object.objectInfo.type'}},target:"_blank"})),c({
dataBind:{typedText:{value:"object.objectInfo.saveDate",type:'"date"',
format:'"MMM D, YYYY"'}}})],null),r.buildTabs()],a.loading()),a.loading())),
stylesheet:d.sheet}}))}));