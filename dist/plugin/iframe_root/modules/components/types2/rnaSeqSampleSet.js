define(["kb_knockout/registry","kb_lib/html","./builder"],(function(e,t,s){
"use strict";class o extends s.TypeComponentBase{constructor(e){super(e)}}
const n=(0,t.tag)("div"),l=[{class:"col1",content:[[{label:"description",
property:"description"}],[{label:"source",property:"source"}]]},{class:"col1",
content:[[{label:"sample count",property:"sampleCount"}]]}]
;return e.registerComponent((function(){return{viewModel:o,template:n({
class:s.style.classes.component},s.build(l)),stylesheet:s.style.sheet}}))}));