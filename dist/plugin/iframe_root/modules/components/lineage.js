define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,n,a){
"use strict";const r=a.tag,o=r("a"),i=r("div");class s{constructor({lineage:e}){
this.lineage=t.observableArray(t.utils.unwrapObservable(e))}}
const l=a.makeStyles({});function c(){return i({dataBind:{foreach:"lineage"}
},i(o({dataBind:{attr:{
href:'"http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=" + $data'},
text:"$data"},target:"_blank"})))}return e.registerComponent((function(){return{
viewModelWithContext:s,template:c(),stylesheet:l.sheet}}))}));