define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,o,n,e){
"use strict";const r=e.tag,a=r("span"),u=r("div");class s{constructor(t){
const{authors:o}=t;this.authors=o}}return o.registerComponent((function(){
return{viewModel:s,template:u({dataBind:{let:{authorCount:"authors.length"}}
},n.foreach("authors",[a({dataBind:{text:"$data"}
}),n.if("$index() < authorCount - 1","; ")]))}}))}));