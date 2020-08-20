define(["kb_lib/jsonRpc/dynamicServiceClient","kb_lib/jsonRpc/genericClient","kb_lib/jsonRpc/exceptions"],(function(e,r,t){
"use strict";class i extends Error{constructor(e,r,t,i,n){
super(t),this.source=e,
this.code=r,this.message=t,this.detail=i,this.info=n,this.stack=(new Error).stack
}}return{RPC:class{constructor(e){this.runtime=e.runtime,this.RPCError=i}
call(n,o,s){
const c=this.runtime.config(["services",n,"url"].join(".")),u=this.runtime.service("session").getAuthToken()
;let l;l=c?new r({module:n,url:c,token:u}):new e({
url:this.runtime.config("services.service_wizard.url"),token:u,module:n})
;const m=s||[];return l.callFunc(o,m).catch(e=>{
if(e instanceof t.AjaxError)throw new i("AJAX Error: "+e.name,e.code,e.message,null,{
originalError:e});if(e instanceof i){
const r="An error was encountered running an rpc method",t='The module is "'+e.module+'", the method "'+e.func+'", the error returned from the service is "'+(e.message||"unknown")+'"'
;throw new i("service-call-error",e.name,r,t,{originalError:e})}
throw new i("rpc-call",e.name,e.message,null,{originalError:e})})}},
RPCClient:class{constructor(e){
this.runtime=e.runtime,this.moduleName=e.module,this.timeout=e.timeout||6e4,
this.RPCError=i,this.authenticated=e.authenticated,this.setup()}setup(){
const t=this.runtime.config(["services",this.moduleName,"url"].join("."));let i
;if(i=this.authenticated?this.runtime.service("session").getAuthToken():null,
t)this.client=new r({module:this.moduleName,url:t,token:i,timeout:this.timeout
});else{
const t=this.runtime.config("deploy.services.dynamicServiceProxies"),n=this.runtime.config("deploy.services.urlBase")
;t.includes(this.moduleName)?this.client=new r({module:this.moduleName,
url:n+"/dynamic_service_proxies/"+this.moduleName,token:i,timeout:this.timeout
}):this.client=new e({url:this.runtime.config("services.service_wizard.url"),
token:i,module:this.moduleName,timeout:this.timeout})}}callFunc(e,r){
const n=r||[];return this.client.callFunc(e,n).catch(e=>{
if(e instanceof t.AjaxError)throw console.error("AJAX Error",e),
new i("AJAX Error: "+e.name,e.code,e.message,null,{originalError:e})
;if(e instanceof i){console.error("RPC Error",e)
;const r="An error was encountered running an rpc method",t='The module is "'+e.module+'", the method "'+e.func+'", the error returned from the service is "'+(e.message||"unknown")+'"'
;throw new i("service-call-error",e.name,r,t,{originalError:e})}
throw new i("rpc-call",e.name,e.message,null,{originalError:e})})}}}}));