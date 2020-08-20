define(["knockout","kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html","../lib/ui","kb_knockout/components/error"],(function(e,r,t,o,s,i){
"use strict";const n=o.tag,u=n("div"),a=n("span");class c extends t{
constructor(r,t){super(r);const{error:o}=r
;this.error=o,this.parent=t.$parent,this.title="Search Error",
this.source=e.pureComputed(()=>{if(this.error())return this.error().source
}),this.code=e.pureComputed(()=>{if(this.error())return this.error().code
}),this.message=e.pureComputed(()=>{if(this.error())return this.error().message
}),this.detail=e.pureComputed(()=>{if(this.error())return this.error().detail}),
this.info=e.pureComputed(()=>{if(this.error())return this.error().info
}),this.stackTrace=e.pureComputed(()=>{
if(this.error())return this.error().stackTrace})}onClose(){
this.parent.bus.send("close")}}return r.registerComponent((function(){return{
viewModelWithContext:c,template:s.buildDialog({type:"error",title:a({dataBind:{
text:"title"}}),body:u({dataBind:{component:{name:i.quotedName(),params:{
source:"source",code:"code",message:"message",detail:"detail",info:"info",
stackTrace:"stackTrace"}}}}),buttons:[{label:"Close",
onClick:'function(){bus.send("close")}'}]})}}))}));