define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./builder"],(function(e,t,s,n,o){
"use strict";class l extends o.TypeComponentBase{constructor(e){super(e)}}
const r=(0,n.tag)("div"),c=[{class:"col1",content:[[{label:"type",
property:"type"}]]}];return t.registerComponent((function(){return{viewModel:l,
template:r({class:o.style.classes.component},o.build(c)),
stylesheet:o.style.sheet}}))}));