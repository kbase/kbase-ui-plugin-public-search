define(["bluebird","kb_lib/props","kb_lib/messenger","./services/session","./services/widget","./services/type","./services/rpc"],(e,t,i,s,r,n,h)=>{
"use strict";return class{
constructor({authorization:e,token:a,username:c,config:o,pluginConfigDB:u}){
this.authorization=e,this.token=a,this.username=c,this.configDB=new t.Props({
data:o
}),this.pluginConfigDB=u,this.pluginPath="/modules/plugins/"+u.getItem("package.name")+"/iframe_root",
this.pluginResourcePath=this.pluginPath+"/resources",
this.messenger=new i,this.heartbeatTimer=null,this.services={session:new s({
runtime:this}),widget:new r({runtime:this}),type:new n({runtime:this,
config:this.pluginConfigDB.getItem("install.types")}),rpc:new h({runtime:this})
},
this.featureSwitches={},this.configDB.getItem("ui.featureSwitches.available",[]).forEach(e=>{
this.featureSwitches[e.id]=e})}config(e,t){return this.configDB.getItem(e,t)}
getConfig(e,t){return this.config(e,t)}service(e){
if(!(e in this.services))throw new Error('The UI service "'+e+'" is not defined')
;return this.services[e]}getService(e){return this.service(e)}send(e,t,i){
this.messenger.send({channel:e,message:t,data:i})}receive(e,t,i){
return this.messenger.receive({channel:e,message:t,handler:i})}recv(e,t,i){
return this.receive(e,t,i)}drop(e){this.messenger.unreceive(e)}
featureEnabled(e,t=!1){
if(!this.featureSwitches[e])throw new Error('Feature switch "'+e+'" not defined')
;return this.configDB.getItem("ui.featureSwitches.enabled").includes(e)||t}
start(){return e.try(()=>(this.heartbeatTimer=window.setInterval(()=>{
this.send("app","heartbeat",{time:(new Date).getTime()})
},1e3),this.services.session.start()))}stop(){
return e.try(()=>(window.clearInterval(this.heartbeatTimer),
this.services.session.stop()))}}});