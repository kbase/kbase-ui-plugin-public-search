define(["knockout","kb_knockout/registry","kb_lib/html","kb_knockout/components/help","kb_knockout/lib/viewModelBase","../lib/ui","yaml!./help.yml"],(function(t,e,o,l,n,s,i){
"use strict";var a=o.tag,d=a("div"),r=a("span");class c extends n{
constructor(t,e){super(t),this.onClose=t.onClose,this.helpDb=i,this.buttons=[{
title:"Close",action:this.doClose
}],this.title="Search Help",this.parent=e.$parent}doClose(){this.send("close")}}
return e.registerComponent((function(){return{viewModelWithContext:c,
template:s.buildDialog({title:r({dataBind:{text:"title"}}),body:d({dataBind:{
component:{name:l.quotedName(),params:{helpDb:"helpDb",onClose:"doClose"}}}}),
buttons:[{label:"Close",onClick:"doClose"}]})}}))}));