define(["./windowChannel","./runtime"],(e,n)=>{"use strict";return class{
constructor({rootWindow:n,pluginConfigDB:t}){
this.rootWindow=n,this.container=n.document.body,
this.hostParams=this.getParamsFromIFrame(),
this.hostChannelId=this.hostParams.channelId,
this.pluginParams=this.hostParams.params,
this.pluginConfigDB=t,this.authorized=null,
this.navigationListeners=[],this.navigationQueue=[],
this.channel=new e.BidirectionalWindowChannel({on:this.rootWindow,
host:document.location.origin,to:this.hostChannelId}),this.runtime=null}
getParamsFromIFrame(){
if(!this.rootWindow.frameElement.hasAttribute("data-params"))throw new Error("No params found in window!!")
;return JSON.parse(decodeURIComponent(this.rootWindow.frameElement.getAttribute("data-params")))
}showHelp(){this.rootViewModel.bus.send("help")}onNavigate(e){
if(this.navigationListeners.push(e),1===this.navigationListeners.length){
const e=this.navigationQueue
;this.navigationQueue=[],e.forEach(({view:e,params:n})=>{
this.navigationListeners.forEach(t=>{t({view:e,params:n})})})}}
handleNavigation({view:e,params:n}){
0===this.navigationListeners.length?this.navigationQueue.push({view:e,params:n
}):this.navigationListeners.forEach(t=>{t({view:e,params:n})})}
setupDOMListeners(){window.document.addEventListener("click",()=>{
this.channel.send("clicked",{})})}setupListeners(){
this.channel.on("navigate",e=>{const{view:n,params:t}=e;this.handleNavigation({
view:n,params:t})})}setupRuntimeListeners(){this.runtime.messenger.receive({
channel:"app",message:"navigate",handler:e=>{this.channel.send("ui-navigate",e)}
}),this.runtime.messenger.receive({channel:"app",message:"post-form",
handler:({action:e,params:n})=>{this.channel.send("post-form",{action:e,params:n
})}}),this.runtime.messenger.receive({channel:"ui",message:"setTitle",
handler:e=>{this.channel.send("set-title",{title:e})}})}started(){
this.channel.send("started",{})}start(){return new Promise((e,t)=>{
this.channel.start(),this.channel.on("start",i=>{
const{authorization:s,config:a}=i,{token:o,username:r,realname:h}=s
;this.authorization=o?{token:o,username:r,realname:h
}:null,this.token=o,this.username=r,
this.config=a,this.authorized=!!o,this.runtime=new n({authorization:s,config:a,
token:o,username:r,pluginConfigDB:this.pluginConfigDB
}),this.runtime.start().then(()=>{
this.setupListeners(),this.setupRuntimeListeners(),e()}).catch(e=>{t(e)
}),this.channel.on("loggedin",({token:e,username:n,realname:t,email:i})=>{
this.runtime.send("session","loggedin",{token:e,username:n,realname:t,email:i})
}),this.channel.on("loggedout",()=>{this.runtime.send("session","loggedout")})
}),window.document.addEventListener("click",()=>{this.channel.send("clicked",{})
}),this.channel.send("ready",{})})}stop(){}}});