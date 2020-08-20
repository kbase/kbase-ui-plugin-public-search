define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,o,i){
"use strict";class n{constructor({field:e}){
this.locations=e.value,this.open=t.observable(!1)}doToggle(){
this.open(!this.open())}}const l=i.tag,s=l("span"),a=l("div"),d=l("button")
;return e.registerComponent((function(){return{viewModel:n,template:a({style:{
flex:"1 1 0px",display:"flex",flexDirection:"row"}},[a({style:{flex:"1 1 0px",
border:"1px silver dotted"}},a({style:{position:"relative"},dataBind:{style:{
"z-index":'open() ? 10000 : "auto"'}}},a({style:{position:"absolute",left:"0",
top:"0",right:"0",backgroundColor:"#FFF",border:"1px silver solid"}},a({style:{
display:"flex",flexDirection:"column"}},o.foreach("locations",a({dataBind:{
visible:"$index() === 0 || $component.open()"},style:{overflow:"hidden",
textOverflow:"ellipsis"}},[s({dataBind:{text:"strand"}}),s({dataBind:{
typedText:{value:"start",type:'"number"',format:'"0,0"'}}})," (",s({dataBind:{
text:"length"}}),")"])))))),o.if("locations.length > 1",a({style:{flex:"0 0 2em"
}},d({dataBind:{click:"function(){$component.doToggle.call($component)}"}},[a({
style:{display:"inline-block",width:"1em",textAlign:"right",marginRight:"4px"},
dataBind:{text:"locations.length"}}),a({style:{display:"inline-block",
width:"1em"},dataBind:{text:'open() ? "↓" : "→"'}})])))])}}))}));