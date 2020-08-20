define(["knockout","kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html","../lib/ui","./feedbackForm"],(function(t,e,n,o,i,s){
"use strict";const l=o.tag,a=l("div"),c=l("span");class r extends n{
constructor(t,e){
super(t),this.parent=e.$parent,this.title="Public Search Feedback"}onClose(){
this.parent.bus.send("close")}}return e.registerComponent((function(){return{
viewModelWithContext:r,template:i.buildDialog({type:"bullhorn",title:c({
dataBind:{text:"title"}}),body:a({dataBind:{component:{name:s.quotedName(),
params:{}}}}),buttons:[{label:"Close",onClick:'function(){bus.send("close")}'}]
})}}))}));