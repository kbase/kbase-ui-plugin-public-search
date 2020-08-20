define(["kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,n){
"use strict";class r{constructor(t){this.name=t.name,this.ref=t.ref}}const a=(0,
n.tag)("a");return t.registerComponent((function(){return{viewModel:r,
template:a({dataBind:{text:"name",attr:{href:'"/#dataview/" + ref'}},
target:"_blank"})}}))}));