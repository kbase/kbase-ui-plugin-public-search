define([],(function(){"use strict";return{isEqual:function(e,n){const t=[]
;return function e(n,r){const u=typeof n,f=typeof r;if(u!==f)return!1;switch(u){
case"string":case"number":case"boolean":if(n!==r)return!1;break;case"undefined":
if("undefined"!==f)return!1;break;case"object":if(n instanceof Array){
if(n.length!==r.length)return!1;for(let u=0;u<n.length;u++){
if(t.push(u),!e(n[u],r[u]))return!1;t.pop()}}else if(null===n){
if(null!==r)return!1}else{if(null===r)return!1;{
const u=Object.keys(n).sort(),f=Object.keys(r).sort()
;if(u.length!==f.length)return!1;for(let i=0;i<u.length;i++){
if(t.push(u[i]),!e(n[u[i]],r[u[i]]))return!1;t.pop()}}}}return!0}(e,n)}}}));