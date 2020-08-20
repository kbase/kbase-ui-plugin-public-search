define(["kb_lib/props"],(function(e){"use strict";function t(e){
const t=["#F44336","#E91E63","#9C27B0","#3F51B5","#2196F3","#673AB7","#FFC107","#0277BD","#00BCD4","#009688","#4CAF50","#33691E","#2E7D32","#AEEA00","#03A9F4","#FF9800","#FF5722","#795548","#006064","#607D8B"]
;let s=0;for(let n=0;n<e.name.length;n+=1)s+=e.name.charCodeAt(n)
;return t[s%t.length]}return{TypeManager:class{constructor({typeDefs:t}){
this.types=new e.Props({data:{}}),t.types.forEach(e=>{
const t=e.type.module,s=e.type.name;this.types.setItem([t,s],e)
},{}),this.defaultIcon={type:"fontAwesome",classes:["fa-file-o"]}}
getIcon({type:e,size:s}){
const n=this.types.getItem([e.module,e.name,"icon"])||this.defaultIcon,o=n.classes.map((function(e){
return e}));switch(n.type){case"kbase":if(o.push("icon"),s)switch(s){
case"small":o.push("icon-sm");break;case"medium":o.push("icon-md");break
;case"large":o.push("icon-lg")}break;case"fontAwesome":o.push("fa")}if(o)return{
classes:o,type:n.type,color:n.color||t(e),
html:'<span class="'+o.join(" ")+'"></span>'}}setIcon(e,t){
var s=this.types.getItem([e.module,e.name])
;null==s?this.types.setItem([e.module,e.name],{icon:t
}):this.types.setItem([e.module,e.name,"icon"],t)}makeTypeId(e){
return e.module+"."+e.name+"-"+e.version.major+"."+e.version.minor}
parseTypeId(e){var t=e.match(/^(.+?)\.(.+?)-(.+?)\.(.+)$/)
;if(!t)throw new Error("Invalid data type "+e)
;if(5!==t.length)throw new Error("Invalid data type "+e);return{module:t[1],
name:t[2],version:{major:t[3],minor:t[4]}}}makeType(){if(1===arguments.length){
var e=arguments[0];if(e.version){var t=e.version.split(".");return{
module:e.module,name:e.name,version:{major:t[0],minor:t[1]}}}}}makeVersion(e){
return e.version.major+"."+e.version.minor}}}}));