define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./builder"],(function(e,t,o,n,s){
"use strict";class l extends s.TypeComponentBase{constructor(e){super(e)}}
const r=(0,n.tag)("div"),c=[{class:"col1",content:[[{label:"name",
property:"name"}],[{label:"type",property:"type"}]]},{class:"col1",content:[[{
label:"genome references",property:"genomeRefCount"}],[{label:"orthologs",
property:"orthologCount"}]]}];return t.registerComponent((function(){return{
viewModel:l,template:r({class:s.style.classes.component},s.build(c)),
stylesheet:s.style.sheet}}))}));