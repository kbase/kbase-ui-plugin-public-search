define(["knockout","kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html","../lib/ui"],(function(e,t,n,o,r){
"use strict";const s=o.tag,i=s("div");s("span");class u extends n{
constructor(e,t){super(e),this.parent=t.$parent}onClose(){
this.parent.bus.send("close")}}function c(){return i(i("Feedback form here..."))
}return t.registerComponent((function(){return{viewModelWithContext:u,
template:c()}}))}));