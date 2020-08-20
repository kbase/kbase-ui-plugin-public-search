define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_knockout/components/tabset","./history","./linksIn","./linksOut"],(function(e,t,n,o,a,s,c,b,r){
"use strict";class i extends o{constructor(e){super(e);const{object:t}=e
;this.object=t,this.tabs=[{tab:{label:"History"},panel:{component:{
name:c.name(),params:{ref:"object.objectInfo.ref"}}}},{tab:{
label:"Object Composition"},panel:{component:{name:r.name(),params:{
object:"object"}}}},{tab:{label:"Objects Referencing"},panel:{component:{
name:b.name(),params:{ref:"object.objectInfo.ref"}}}}]}}const l=(0,a.tag)("div")
;function m(){return l({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column",marginTop:"10px"}},[n.component({name:s.name(),params:{
tabContext:"$component",tabs:"tabs",bus:"bus"}})])}
return t.registerComponent((function(){return{viewModel:i,template:m()}}))}));