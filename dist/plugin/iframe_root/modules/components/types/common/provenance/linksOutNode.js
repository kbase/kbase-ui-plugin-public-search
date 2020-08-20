define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,t,a,s){
"use strict";class r{constructor(t,a,s,r,c){
this.tree=e.unwrap(t.tree),this.runtime=a.$root.runtime,
this.componentName=c,this.tree.accessible?this.dataIcon=this.getDataIcon():this.dataIcon=null
}getDataIcon(){try{
const e=this.tree.typeID,t=this.runtime.service("type").parseTypeId(e),a=this.runtime.service("type").getIcon({
type:t});return{classes:a.classes.join(" "),color:a.color}}catch(e){
return console.error("Error fetching icon config: ",e),{classes:"fa-question",
color:"gray"}}}}const c=s.tag,n=c("a"),o=c("span"),i=c("div")
;return t.registerComponent((function(){return{viewModelWithContext:r,
template:i({style:{}},[i({style:{padding:"4px",border:"1px silver solid",
display:"flex",flexDirection:"row"}},[a.if("dataIcon",i(i({style:{fontSize:"80%"
}},[o({class:"fa-stack fa-2x"},[o({class:"fa fa-circle fa-stack-2x",dataBind:{
style:{color:"dataIcon.color"}}}),o({class:"fa fa-inverse fa-stack-1x ",
dataBind:{class:"dataIcon.classes"}})])])),i(i({style:{fontSize:"80%"}},[o({
class:"fa-stack fa-2x"},[o({class:"fa fa-circle fa-stack-2x",style:{color:"red"}
}),o({class:"fa fa-inverse fa-stack-1x fa-question"})])]))),i({style:{
flex:"1 1 0px"}},[i(a.if("tree.accessible",n({dataBind:{
text:"tree.display.title",attr:{href:'"/#dataview/" + tree.ref'}},
target:"_blank"}),[o("This object is not accessible to you: "),o({dataBind:{
text:"tree.ref"}})])),i(a.if("tree.accessible",n({dataBind:{text:"tree.type",
attr:{href:'"/#spec/type/" + tree.typeID'}},target:"_blank"
}),o("Unknown type")))])]),i({style:{marginLeft:"20px"},dataBind:{
foreach:"tree.children"}},a.component2({name:"$component.componentName",params:{
tree:"$data"}}))])}}))}));