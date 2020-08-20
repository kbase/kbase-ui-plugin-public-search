define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,s,o){
"use strict";class n{constructor({text:t,maxHeight:e}){
this.text=t,this.maxHeight=e}}const i=(0,o.tag)("div"),c=o.makeStyles({
component:{css:{overflowY:"auto"}}});return e.registerComponent((function(){
return{viewModel:n,template:i({class:c.classes.component,dataBind:{text:"text",
style:{"max-height":"maxHeight"}}}),stylesheet:c.sheet}}))}));