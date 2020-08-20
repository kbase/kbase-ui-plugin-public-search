define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./builder"],(function(e,t,o,n,l){
"use strict";class s extends l.TypeComponentBase{constructor(e){super(e)}}
const r=(0,n.tag)("div"),i=[{class:"col1",content:[[{label:"name",
property:"name"}],[{label:"id",property:"id"},{label:"type",property:"type"}]]
},{class:"col1",content:[[{label:"is minimal?",property:"isMinimal",
type:"boolean",format:["Yes","No"]},{label:"is defined?",property:"isDefined",
type:"boolean",format:["Yes","No"]}],[{label:"compound count",
property:"compoundCount"}]]}];return t.registerComponent((function(){return{
viewModel:s,template:r({class:l.style.classes.component},l.build(i)),
stylesheet:l.style.sheet}}))}));