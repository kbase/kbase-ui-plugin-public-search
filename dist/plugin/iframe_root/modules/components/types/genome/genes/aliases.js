define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,t,l,i){
"use strict";class o{constructor({field:t}){
this.aliases=t.value,this.open=e.observable(!1)}doToggleAlias(){
this.open(!this.open())}}const n=i.tag,s=n("span"),a=n("div"),d=n("button")
;return t.registerComponent((function(){return{viewModel:o,template:a({style:{
flex:"1 1 0px",display:"flex",flexDirection:"row"}
},l.if("aliases.length === 0",a({style:{flex:"1 1 0px",textAlign:"center"}
},"-"),[a({style:{flex:"1 1 0px",border:"1px silver dotted"}},a({style:{
position:"relative"},dataBind:{style:{"z-index":'open() ? 10000 : "auto"'}}},a({
style:{position:"absolute",left:"0",top:"0",right:"0",backgroundColor:"#FFF",
border:"1px silver solid"}},a({style:{display:"flex",flexDirection:"column"}
},l.foreach("aliases",a({dataBind:{visible:"$index() === 0 || $component.open()"
},style:{overflow:"hidden",textOverflow:"ellipsis"}},[l.if("type",s({style:{
color:"gray"},dataBind:{text:'type + ": "'}})),s({style:{},dataBind:{text:"name"
}})])))))),l.if("aliases.length > 1",a({style:{flex:"0 0 2em"}},a({style:{
flex:"0 0 2em"}},d({dataBind:{
click:"function(){$component.doToggleAlias.call($component)}"}},[a({style:{
display:"inline-block",width:"1em",textAlign:"right",marginRight:"4px"},
dataBind:{text:"aliases.length"}}),a({style:{display:"inline-block",width:"1em"
},dataBind:{text:'open() ? "↓" : "→"'}})]))))]))}}))}));