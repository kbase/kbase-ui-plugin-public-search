define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./types2/controller"],(function(e,t,o,n,s){
"use strict";class r{constructor({row:e}){
this.row=e,this.type=e.data.type.value,
this.componentName=s.typeToComponent(this.type).name()}}
const p=(0,n.tag)("div"),a=n.makeStyles({component:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column",margin:"0px 4px 10px 50px",padding:"4px",
border:"1px silver solid",borderRadius:"4px",
boxShadow:"4px 4px 4px rgba(200,200,200,0.5)"}}})
;return t.registerComponent((function(){return{viewModel:r,template:p({
class:a.classes.component,dataBind:{component:{name:"componentName",params:{
row:"row"}}}}),stylesheet:a.sheet}}))}));