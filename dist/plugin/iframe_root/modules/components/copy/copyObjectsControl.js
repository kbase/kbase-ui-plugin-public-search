define(["knockout","kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html","../../lib/text"],(function(t,e,o,c,s){
"use strict";var l=c.tag,n=l("button"),i=l("span");class a extends o{
constructor(e,o){super(e);const{selectedObjects:c}=e
;this.selectedObjects=c,this.authorized=o.$root.authorized,
this.buttonTitle=t.pureComputed(()=>this.selectedObjects().length>0?"Click me to open a window allowing you to copy the objects you have selected":"When you have selected objects (via the checkbox to the left of them), clicking me will allow you to copy them")
}doCopyObjects(){this.sendToParent("show-copy-objects")}}function u(){return n({
class:"btn",title:s.getTooltip("COPY_OBJECTS_BUTTON"),dataBind:{
click:"doCopyObjects",enable:"selectedObjects().length > 0 && authorized()",
class:'selectedObjects().length === 0 ? "btn-default" : "btn-primary"',attr:{
title:"buttonTitle"}}},[i({class:"fa fa-clone"})," Copy Selected..."])}
return e.registerComponent((function(){return{viewModelWithContext:a,
template:u()}}))}));