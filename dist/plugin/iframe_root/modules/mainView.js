define(["knockout","kb_knockout/lib/generators","kb_lib/html","utils","./components/main","./rootViewModel"],(function(e,t,i,n,o,r){
"use strict";const s=(0,i.tag)("div");return class{constructor({runtime:e}){
this.runtime=e}render(e,i){
const n=this.runtime.service("session").isAuthenticated(),a=this.runtime.service("session").getAuthentication()
;this.rootViewModel=new r({runtime:this.runtime,authorized:n,authorization:a,
pluginParams:i}),this.container.innerHTML=s({style:{flex:"1 1 0px",
display:"flex",flexDirection:"column"}},t.if("ready",t.component({name:o.name(),
params:{runtime:"runtime",bus:"bus",authorization:"authorization",
pluginParams:"pluginParams"}
}))),e.applyBindings(this.rootViewModel,this.container)}init(){
this.runtime.send("ui","setTitle","KBase Data Search")}attach(e){this.hostNode=e
}start(t){
this.render(e),this.runtime.receive("session","loggedin",({token:e,username:t,realname:i})=>{
this.rootViewModel.authorized(!0),this.rootViewModel.authorization({token:e,
username:t,realname:i})}),this.runtime.receive("session","loggedout",()=>{
this.rootViewModel.authorized(!1),this.rootViewModel.authorization(null)})}
stop(){return null}detach(){return null}}}));