define(["kb_lib/props","./rpc","./typeManager","yaml!../data/types.yaml"],(function(e,s,t,i){
"use strict";class n{constructor({runtime:e}){this.runtime=e}makeClient(e){let t
;return t=void 0===e.authenticated||!!e.authenticated,new s.RPCClient({
runtime:this.runtime,module:e.module,timeout:e.timeout,authenticated:t})}}
class r{constructor({token:e,username:s,realname:t,email:i}){
this.token=e,this.username=s,this.realname=t,this.email=i}getAuthToken(){
return this.token}getUsername(){return this.username}getRealname(){
return this.realname}getEmail(){return this.email}}class a{
constructor({runtime:e}){this.runtime=e,this.typeManager=new t.TypeManager({
typeDefs:i})}getIcon({type:e,size:s}){return this.typeManager.getIcon({type:e,
size:s})}parseTypeId(e){return this.typeManager.parseTypeId(e)}}return{
Runtime:class{constructor({config:e,token:s,username:t,realname:i,email:u}){
this.configDB=e,this.token=s,this.username=t,this.services={rpc:new n({
runtime:this}),session:new r({runtime:this,username:t,token:s,email:u,realname:i
}),type:new a({runtime:this})}}service(e){switch(e){case"session":
return this.services.session;case"rpc":return this.services.rpc;case"type":
return this.services.type}}auth({token:e,username:s,realname:t,email:i}){
this.services.session.token=e,
this.services.session.username=s,this.services.session.realname=t,
this.services.session.email=i}unauth(){
this.services.session.token=null,this.services.session.username=null,
this.services.session.realname=null,this.services.session.email=null}
config(s,t){return e.getProp(this.configDB,s,t)}}}}));