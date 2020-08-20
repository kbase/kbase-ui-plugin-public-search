define(["kb_common_ts/HttpClient"],(function(e){"use strict";return{
Analytics:class{constructor({code:e,hostname:t,clientId:n}){
this.code=e,this.hostname=t,this.clientId=n}encodeQuery(e){
return Object.keys(e).map(t=>[encodeURIComponent(t),encodeURIComponent(e[t])].join("=")).join("&")
}sendToGA(t){const n=this.encodeQuery(t);return(new e.HttpClient).request({
method:"POST",url:"https://www.google-analytics.com/collect",
header:new e.HttpHeader({"content-type":"application/x-www-form-urlencoded"}),
withCredentials:!0,data:n}).catch(e=>{console.error("ERROR sending to GA",e)})}
send(e){const t={v:1,tid:this.code,cid:this.clientId,t:"pageview",ds:"kbase-ui",
dp:e,dl:encodeURIComponent(document.location.href),dh:this.host}
;return this.sendToGA(t)}sendEvent({category:e,action:t,label:n,value:o}){
const i={v:1,tid:this.code,cid:this.clientId,t:"event",ec:e,ea:t}
;return n&&(i.el=n),o&&(i.ev=o),this.sendToGA(i)}
sendTiming({category:e,variable:t,time:n,label:o}){var i={v:1,tid:this.code,
cid:this.clientId,t:"timing",utc:e,utv:t,utt:n,utl:o};return this.sendToGA(i)}}}
}));