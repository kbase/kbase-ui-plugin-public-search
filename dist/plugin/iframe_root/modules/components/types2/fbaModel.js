define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./builder"],(function(e,t,o,s,n){
"use strict";class r extends n.TypeComponentBase{constructor(e){super(e)}}
const c=(0,s.tag)("div"),l=[{class:"col1",content:[[{label:"compartments",
property:"compartments"},{label:"compounds",property:"compounds"},{
label:"reactions",property:"reactions"}],[{label:"scientific name",
property:"scientificName"}]]},{class:"col1",content:[[{label:"KBase ID",
property:"id"}],[{label:"source",property:"source"}]]}]
;return t.registerComponent((function(){return{viewModel:r,template:c({
class:n.style.classes.component},n.build(l)),stylesheet:n.style.sheet}}))}));