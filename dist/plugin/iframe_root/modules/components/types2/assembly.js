define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./builder"],(function(e,t,n,o,r){
"use strict";class s extends r.TypeComponentBase{constructor(e){super(e)}}
const c=(0,o.tag)("div"),l=[{class:"col1",content:[[{label:"contigs",
property:"contigCount",type:"number",format:"0,0"},{label:"dna size",
property:"dnaSize",type:"number",format:"0,0"}],[{label:"gc content",
property:"gcContent",type:"number",format:"0.0%"}]]}]
;return t.registerComponent((function(){return{viewModel:s,template:c({
class:r.style.classes.component},r.build(l)),stylesheet:r.style.sheet}}))}));