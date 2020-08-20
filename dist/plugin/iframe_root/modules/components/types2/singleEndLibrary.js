define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./builder"],(function(e,t,n,o,r){
"use strict";class l extends r.TypeComponentBase{constructor(e){super(e)}}
const s=(0,o.tag)("div"),a=[{class:"col1",content:[[{
label:"sequencing technology",property:"sequencingTechnology"}],[{
label:"phred type",property:"phredType"},{label:"mean quality score",
property:"meanQualityScore"}]]},{class:"col1",content:[[{label:"gc content",
property:"gcContent",type:"number",format:"0.0%"}],[{label:"reads",
property:"readCount",type:"number",format:"0,0"},{label:"read mean length",
property:"readMeanLength",type:"number",format:"0,0"}]]}]
;return t.registerComponent((function(){return{viewModel:l,template:s({
class:r.style.classes.component},r.build(a)),stylesheet:r.style.sheet}}))}));