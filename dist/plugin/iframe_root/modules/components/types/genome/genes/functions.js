define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,n,i){
"use strict";class o{constructor({field:e}){
this.functions=e.value,this.open=t.observable(!1)}doToggle(){
this.open(!this.open())}}const l=i.tag,s=l("span"),d=l("div"),r=l("button")
;return e.registerComponent((function(){return{viewModel:o,template:d({style:{
flex:"1 1 0px",display:"flex",flexDirection:"row"}
},n.if("functions.length === 0",d({style:{flex:"1 1 0px",textAlign:"center"}
},"-"),[d({style:{flex:"1 1 0px",border:"1px silver dotted"}},d({style:{
position:"relative"},dataBind:{style:{"z-index":'open() ? 10000 : "auto"'}}},d({
style:{position:"absolute",left:"0",top:"0",right:"0",backgroundColor:"#FFF",
border:"1px silver solid"}},d({style:{display:"flex",flexDirection:"column"}
},n.foreach("functions",d({dataBind:{
visible:"$index() === 0 || $component.open()"},style:{overflow:"hidden",
textOverflow:"ellipsis"}},[s({dataBind:{text:"$data"}
})])))))),n.if("functions.length > 1",d({style:{flex:"0 0 2em"}},r({dataBind:{
click:"function(){$component.doToggle.call($component)}"}},[d({style:{
display:"inline-block",width:"1em",textAlign:"right",marginRight:"4px"},
dataBind:{text:"functions.length"}}),d({style:{display:"inline-block",
width:"1em"},dataBind:{text:'open() ? "↓" : "→"'}})])))]))}}))}));