define([],(function(){"use strict";function t(e){switch(e.nodeType){
case Node.ELEMENT_NODE:return function(e){const n={type:"element",
name:e.nodeName,attributes:{},children:[],text:null}
;if(e.hasChildNodes()>0)for(let r=0;r<e.childNodes.length;r+=1){
const i=e.childNodes[r];n.children.push(t(i))}else n.text=e.textContent
;if(e.hasAttributes())for(let t=0;t<e.attributes.length;t+=1){
const r=e.attributes[t];n.attributes[r.name]=r.value}return n}(e)
;case Node.TEXT_NODE:return function(t){return{type:"text",name:t.nodeName,
attributes:{},children:[],text:t.data}}(e);default:return null}}
function e(t,n,r){return function(t,n){if(0===n.length)return t;const[i,...u]=n
;for(let r=0;r<t.children.length;r+=1){const n=t.children[r]
;if(n.name===i)return e(n,u)}return r}(t,n)}return{docToJSON:function(e){
const n={name:null,attributes:[],children:[]}
;for(let r=0;r<e.children.length;r+=1){const i=e.children[r]
;n.children.push(t(i))}return n},findText:function(t,n,r){const i=e(t,n,null)
;return i?i.text:r},find:e}}));