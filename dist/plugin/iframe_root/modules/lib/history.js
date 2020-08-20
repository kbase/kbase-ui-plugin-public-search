define(["bluebird","kb_common_ts/Cookie","kb_lib/jsonRpc/genericClient","kb_lib/props"],(function(e,t,r,s){
"use strict";class i{constructor({name:e,maxSize:t}){
this.name=e,this.maxSize=t||10}updateHistory(e){
return this.getHistory().then(t=>{let r
;return r=t.includes(e)?t.filter(t=>t!==e):t,
r.unshift(e),r.length>this.maxSize&&(r=r.slice(0,this.maxSize)),
this.setHistory(r),r})}getHistory(){}setHistory(){}removeHistory(){}}return{
History:i,CookieHistory:class extends i{constructor(e){
super(e),this.maxAge=e.maxAge||3600}setHistory(e){
const r=encodeURIComponent(JSON.stringify(e)),s=new t.Cookie(this.name).setSecure(!0).setDomain(window.location.hostname).setPath("/").setMaxAge(this.maxAge).setValue(r)
;(new t.CookieManager).setItem(s)}getHistory(){return e.try(()=>{
const e=(new t.CookieManager).getItem(this.name);let r;if(e)try{
r=JSON.parse(decodeURIComponent(e))}catch(s){
console.warn("Corrupt history found in cookie; resetting cookie: "+e,s),
r=[],this.setHistory(r)}else r=[];return r})}deleteHistory(){}},
ProfileHistory:class extends i{constructor(e){
super(e),this.maxAge=e.maxAge||3600,
this.username=e.username,this.profileService=new r({url:e.url,token:e.token,
module:"UserProfile"})}updateUserProfile(e){
return this.profileService.callFunc("update_user_profile",[e]).then(()=>!0).catch(e=>{
throw console.error("Error updating user profile",e),
new Error("Error updating profile with history: "+e.message)})}setHistory(e){
const t=["public-search","settings","history"]
;return this.profileService.callFunc("get_user_profile",[[this.username]]).spread(r=>{
const i=new s.Props({data:r[0]}),o=new s.Props({
data:i.getItem("profile.plugins",{})});if(o.hasItem(t)&&function(e,t){
if(e.length!==t.length)return!1
;for(let r=0;r<e.length;r+=1)if(e[r]!==t[r])return!1;return!0
}(o.getItem(t).history,e))return!0;o.setItem(t,{history:e,
time:(new Date).getTime()});var n={profile:{profile:{plugins:o.getRaw()},
user:i.getItem("user")}};return this.updateUserProfile(n)}).catch(e=>{
throw console.error("ERROR setting history",e),
new Error("Error setting history: "+e.message)})}getHistory(){
const e=["profile","plugins","public-search","settings","history"]
;return this.profileService.callFunc("get_user_profile",[[this.username]]).spread(t=>{
const r=new s.Props({data:t[0]});let i=function(e,t){
for(var r=0;r<e.length;r+=1){var s=t(e[r]);if(s)return s}}([e],e=>r.getItem(e))
;return i&&i.history instanceof Array||(i={history:[],time:(new Date).getTime()
}),i.history}).catch(e=>{
throw console.error("Error fetching history",e),new Error("Error fetching history: "+e.message)
})}deleteHistory(){}}}}));