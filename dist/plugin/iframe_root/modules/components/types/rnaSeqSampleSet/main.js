define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","./overview","../builders"],(function(e,t,o,n,a,i,c){
"use strict";const r=n.tag,s=r("div"),l=r("a");class b extends c.TypeViewModel{
constructor(e,t){super(e,t),this.setTabs({primary:null,overview:i.name(),
custom:[]}),this.ready(!0)}}const d=n.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},sectionHeader:{css:{
fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}}
});return t.registerComponent((function(){return{viewModelWithContext:b,
template:s({class:d.classes.component
},o.if("ready",o.if("object",[c.buildHeader([o.if("object.objectInfo.name",l({
style:{fontSize:"120%",fontWeight:"bold",fontStyle:"italic"},dataBind:{
text:"object.objectInfo.name",attr:{href:'"/#dataview/" + object.objectInfo.ref'
}},target:"_blank"}),s(a.loading())),s(l({dataBind:{
text:'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
attr:{href:'"/#spec/type/" + object.objectInfo.type'}},target:"_blank"})),s({
dataBind:{typedText:{value:"object.objectInfo.saveDate",type:'"date"',
format:'"MMM D, YYYY"'}}})],null),c.buildTabs()],a.loading()),a.loading())),
stylesheet:d.sheet}}))}));