!function(t,n){
"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t=t||self).d3=t.d3||{})
}(this,(function(t){"use strict";function n(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}
function e(t){return 1===t.length&&(t=function(t){return function(e,r){
return n(t(e),r)}}(t)),{left:function(n,e,r,i){
for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1
;t(n[o],e)<0?r=o+1:i=o}return r},right:function(n,e,r,i){
for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1
;t(n[o],e)>0?i=o:r=o+1}return r}}}var r=e(n),i=r.right,o=r.left;function a(t,n){
return[t,n]}function u(t){return null===t?NaN:+t}function c(t,n){
var e,r,i=t.length,o=0,a=-1,c=0,f=0
;if(null==n)for(;++a<i;)isNaN(e=u(t[a]))||(f+=(r=e-c)*(e-(c+=r/++o)));else for(;++a<i;)isNaN(e=u(n(t[a],a,t)))||(f+=(r=e-c)*(e-(c+=r/++o)))
;if(o>1)return f/(o-1)}function f(t,n){var e=c(t,n);return e?Math.sqrt(e):e}
function s(t,n){var e,r,i,o=t.length,a=-1;if(null==n){
for(;++a<o;)if(null!=(e=t[a])&&e>=e)for(r=i=e;++a<o;)null!=(e=t[a])&&(r>e&&(r=e),
i<e&&(i=e))
}else for(;++a<o;)if(null!=(e=n(t[a],a,t))&&e>=e)for(r=i=e;++a<o;)null!=(e=n(t[a],a,t))&&(r>e&&(r=e),
i<e&&(i=e));return[r,i]}var l=Array.prototype,h=l.slice,d=l.map;function p(t){
return function(){return t}}function v(t){return t}function g(t,n,e){
t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e
;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e
;return o}var y=Math.sqrt(50),_=Math.sqrt(10),b=Math.sqrt(2);function m(t,n,e){
var r,i,o,a,u=-1;if(e=+e,(t=+t)===(n=+n)&&e>0)return[t]
;if((r=n<t)&&(i=t,t=n,n=i),0===(a=x(t,n,e))||!isFinite(a))return[]
;if(a>0)for(t=Math.ceil(t/a),
n=Math.floor(n/a),o=new Array(i=Math.ceil(n-t+1));++u<i;)o[u]=(t+u)*a;else for(t=Math.floor(t*a),
n=Math.ceil(n*a),o=new Array(i=Math.ceil(t-n+1));++u<i;)o[u]=(t-u)/a
;return r&&o.reverse(),o}function x(t,n,e){
var r=(n-t)/Math.max(0,e),i=Math.floor(Math.log(r)/Math.LN10),o=r/Math.pow(10,i)
;return i>=0?(o>=y?10:o>=_?5:o>=b?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(o>=y?10:o>=_?5:o>=b?2:1)
}function w(t,n,e){
var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i
;return o>=y?i*=10:o>=_?i*=5:o>=b&&(i*=2),n<t?-i:i}function M(t){
return Math.ceil(Math.log(t.length)/Math.LN2)+1}function N(t,n,e){
if(null==e&&(e=u),r=t.length){if((n=+n)<=0||r<2)return+e(t[0],0,t)
;if(n>=1)return+e(t[r-1],r-1,t);var r,i=(r-1)*n,o=Math.floor(i),a=+e(t[o],o,t)
;return a+(+e(t[o+1],o+1,t)-a)*(i-o)}}function T(t,n){var e,r,i=t.length,o=-1
;if(null==n){
for(;++o<i;)if(null!=(e=t[o])&&e>=e)for(r=e;++o<i;)null!=(e=t[o])&&e>r&&(r=e)
}else for(;++o<i;)if(null!=(e=n(t[o],o,t))&&e>=e)for(r=e;++o<i;)null!=(e=n(t[o],o,t))&&e>r&&(r=e)
;return r}function A(t){for(var n,e,r,i=t.length,o=-1,a=0;++o<i;)a+=t[o].length
;for(e=new Array(a);--i>=0;)for(n=(r=t[i]).length;--n>=0;)e[--a]=r[n];return e}
function S(t,n){var e,r,i=t.length,o=-1;if(null==n){
for(;++o<i;)if(null!=(e=t[o])&&e>=e)for(r=e;++o<i;)null!=(e=t[o])&&r>e&&(r=e)
}else for(;++o<i;)if(null!=(e=n(t[o],o,t))&&e>=e)for(r=e;++o<i;)null!=(e=n(t[o],o,t))&&r>e&&(r=e)
;return r}function k(t){if(!(i=t.length))return[]
;for(var n=-1,e=S(t,E),r=new Array(e);++n<e;)for(var i,o=-1,a=r[n]=new Array(i);++o<i;)a[o]=t[o][n]
;return r}function E(t){return t.length}var C=Array.prototype.slice
;function P(t){return t}var z=1e-6;function R(t){return"translate("+(t+.5)+",0)"
}function D(t){return"translate(0,"+(t+.5)+")"}function q(t){return function(n){
return+t(n)}}function L(t){var n=Math.max(0,t.bandwidth()-1)/2
;return t.round()&&(n=Math.round(n)),function(e){return+t(e)+n}}function U(){
return!this.__axis}function O(t,n){
var e=[],r=null,i=null,o=6,a=6,u=3,c=1===t||4===t?-1:1,f=4===t||2===t?"x":"y",s=1===t||3===t?R:D
;function l(l){
var h=null==r?n.ticks?n.ticks.apply(n,e):n.domain():r,d=null==i?n.tickFormat?n.tickFormat.apply(n,e):P:i,p=Math.max(o,0)+u,v=n.range(),g=+v[0]+.5,y=+v[v.length-1]+.5,_=(n.bandwidth?L:q)(n.copy()),b=l.selection?l.selection():l,m=b.selectAll(".domain").data([null]),x=b.selectAll(".tick").data(h,n).order(),w=x.exit(),M=x.enter().append("g").attr("class","tick"),N=x.select("line"),T=x.select("text")
;m=m.merge(m.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),
x=x.merge(M),
N=N.merge(M.append("line").attr("stroke","currentColor").attr(f+"2",c*o)),
T=T.merge(M.append("text").attr("fill","currentColor").attr(f,c*p).attr("dy",1===t?"0em":3===t?"0.71em":"0.32em")),
l!==b&&(m=m.transition(l),x=x.transition(l),N=N.transition(l),T=T.transition(l),
w=w.transition(l).attr("opacity",z).attr("transform",(function(t){
return isFinite(t=_(t))?s(t):this.getAttribute("transform")
})),M.attr("opacity",z).attr("transform",(function(t){
var n=this.parentNode.__axis;return s(n&&isFinite(n=n(t))?n:_(t))
}))),w.remove(),
m.attr("d",4===t||2==t?a?"M"+c*a+","+g+"H0.5V"+y+"H"+c*a:"M0.5,"+g+"V"+y:a?"M"+g+","+c*a+"V0.5H"+y+"V"+c*a:"M"+g+",0.5H"+y),
x.attr("opacity",1).attr("transform",(function(t){return s(_(t))
})),N.attr(f+"2",c*o),
T.attr(f,c*p).text(d),b.filter(U).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",2===t?"start":4===t?"end":"middle"),
b.each((function(){this.__axis=_}))}return l.scale=function(t){
return arguments.length?(n=t,l):n},l.ticks=function(){
return e=C.call(arguments),l},l.tickArguments=function(t){
return arguments.length?(e=null==t?[]:C.call(t),l):e.slice()
},l.tickValues=function(t){
return arguments.length?(r=null==t?null:C.call(t),l):r&&r.slice()
},l.tickFormat=function(t){return arguments.length?(i=t,l):i
},l.tickSize=function(t){return arguments.length?(o=a=+t,l):o
},l.tickSizeInner=function(t){return arguments.length?(o=+t,l):o
},l.tickSizeOuter=function(t){return arguments.length?(a=+t,l):a
},l.tickPadding=function(t){return arguments.length?(u=+t,l):u},l}var B={
value:function(){}};function F(){for(var t,n=0,e=arguments.length,r={};n<e;++n){
if(!(t=arguments[n]+"")||t in r||/[\s.]/.test(t))throw new Error("illegal type: "+t)
;r[t]=[]}return new Y(r)}function Y(t){this._=t}function I(t,n){
return t.trim().split(/^|\s+/).map((function(t){var e="",r=t.indexOf(".")
;if(r>=0&&(e=t.slice(r+1),
t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t)
;return{type:t,name:e}}))}function H(t,n){
for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}
function j(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){
t[r]=B,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,
value:e}),t}Y.prototype=F.prototype={constructor:Y,on:function(t,n){
var e,r=this._,i=I(t+"",r),o=-1,a=i.length;if(!(arguments.length<2)){
if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n)
;for(;++o<a;)if(e=(t=i[o]).type)r[e]=j(r[e],t.name,n);else if(null==n)for(e in r)r[e]=j(r[e],t.name,null)
;return this}for(;++o<a;)if((e=(t=i[o]).type)&&(e=H(r[e],t.name)))return e},
copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice()
;return new Y(t)},call:function(t,n){
if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2]
;if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t)
;for(o=0,e=(r=this._[t]).length;o<e;++o)r[o].value.apply(n,i)},
apply:function(t,n,e){
if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t)
;for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}}
;var X="http://www.w3.org/1999/xhtml",V={svg:"http://www.w3.org/2000/svg",
xhtml:X,xlink:"http://www.w3.org/1999/xlink",
xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"
};function G(t){var n=t+="",e=n.indexOf(":")
;return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),V.hasOwnProperty(n)?{
space:V[n],local:t}:t}function W(t){return function(){
var n=this.ownerDocument,e=this.namespaceURI
;return e===X&&n.documentElement.namespaceURI===X?n.createElement(t):n.createElementNS(e,t)
}}function Z(t){return function(){
return this.ownerDocument.createElementNS(t.space,t.local)}}function $(t){
var n=G(t);return(n.local?Z:W)(n)}function Q(){}function K(t){
return null==t?Q:function(){return this.querySelector(t)}}function J(){return[]}
function tt(t){return null==t?J:function(){return this.querySelectorAll(t)}}
function nt(t){return function(){return this.matches(t)}}function et(t){
return new Array(t.length)}function rt(t,n){
this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,
this._next=null,this._parent=t,this.__data__=n}rt.prototype={constructor:rt,
appendChild:function(t){return this._parent.insertBefore(t,this._next)},
insertBefore:function(t,n){return this._parent.insertBefore(t,n)},
querySelector:function(t){return this._parent.querySelector(t)},
querySelectorAll:function(t){return this._parent.querySelectorAll(t)}}
;function it(t,n,e,r,i,o){
for(var a,u=0,c=n.length,f=o.length;u<f;++u)(a=n[u])?(a.__data__=o[u],
r[u]=a):e[u]=new rt(t,o[u]);for(;u<c;++u)(a=n[u])&&(i[u]=a)}
function ot(t,n,e,r,i,o,a){var u,c,f,s={},l=n.length,h=o.length,d=new Array(l)
;for(u=0;u<l;++u)(c=n[u])&&(d[u]=f="$"+a.call(c,c.__data__,u,n),
f in s?i[u]=c:s[f]=c)
;for(u=0;u<h;++u)(c=s[f="$"+a.call(t,o[u],u,o)])?(r[u]=c,c.__data__=o[u],
s[f]=null):e[u]=new rt(t,o[u]);for(u=0;u<l;++u)(c=n[u])&&s[d[u]]===c&&(i[u]=c)}
function at(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function ut(t){
return function(){this.removeAttribute(t)}}function ct(t){return function(){
this.removeAttributeNS(t.space,t.local)}}function ft(t,n){return function(){
this.setAttribute(t,n)}}function st(t,n){return function(){
this.setAttributeNS(t.space,t.local,n)}}function lt(t,n){return function(){
var e=n.apply(this,arguments)
;null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function ht(t,n){
return function(){var e=n.apply(this,arguments)
;null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)
}}function dt(t){
return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView
}function pt(t){return function(){this.style.removeProperty(t)}}
function vt(t,n,e){return function(){this.style.setProperty(t,n,e)}}
function gt(t,n,e){return function(){var r=n.apply(this,arguments)
;null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}
function yt(t,n){
return t.style.getPropertyValue(n)||dt(t).getComputedStyle(t,null).getPropertyValue(n)
}function _t(t){return function(){delete this[t]}}function bt(t,n){
return function(){this[t]=n}}function mt(t,n){return function(){
var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function xt(t){
return t.trim().split(/^|\s+/)}function wt(t){return t.classList||new Mt(t)}
function Mt(t){this._node=t,this._names=xt(t.getAttribute("class")||"")}
function Nt(t,n){for(var e=wt(t),r=-1,i=n.length;++r<i;)e.add(n[r])}
function Tt(t,n){for(var e=wt(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}
function At(t){return function(){Nt(this,t)}}function St(t){return function(){
Tt(this,t)}}function kt(t,n){return function(){
(n.apply(this,arguments)?Nt:Tt)(this,t)}}function Et(){this.textContent=""}
function Ct(t){return function(){this.textContent=t}}function Pt(t){
return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}
function zt(){this.innerHTML=""}function Rt(t){return function(){
this.innerHTML=t}}function Dt(t){return function(){var n=t.apply(this,arguments)
;this.innerHTML=null==n?"":n}}function qt(){
this.nextSibling&&this.parentNode.appendChild(this)}function Lt(){
this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)
}function Ut(){return null}function Ot(){var t=this.parentNode
;t&&t.removeChild(this)}function Bt(){var t=this.cloneNode(!1),n=this.parentNode
;return n?n.insertBefore(t,this.nextSibling):t}function Ft(){
var t=this.cloneNode(!0),n=this.parentNode
;return n?n.insertBefore(t,this.nextSibling):t}Mt.prototype={add:function(t){
this._names.indexOf(t)<0&&(this._names.push(t),
this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){
var n=this._names.indexOf(t)
;n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))
},contains:function(t){return this._names.indexOf(t)>=0}};var Yt={}
;(t.event=null,
"undefined"!=typeof document)&&("onmouseenter"in document.documentElement||(Yt={
mouseenter:"mouseover",mouseleave:"mouseout"}));function It(t,n,e){
return t=Ht(t,n,e),function(n){var e=n.relatedTarget
;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}
function Ht(n,e,r){return function(i){var o=t.event;t.event=i;try{
n.call(this,this.__data__,e,r)}finally{t.event=o}}}function jt(t){
return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".")
;return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}function Xt(t){
return function(){var n=this.__on;if(n){
for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],
t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture)
;++i?n.length=i:delete this.__on}}}function Vt(t,n,e){
var r=Yt.hasOwnProperty(t.type)?It:Ht;return function(i,o,a){
var u,c=this.__on,f=r(n,o,a)
;if(c)for(var s=0,l=c.length;s<l;++s)if((u=c[s]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),
this.addEventListener(u.type,u.listener=f,u.capture=e),void(u.value=n)
;this.addEventListener(t.type,f,e),u={type:t.type,name:t.name,value:n,
listener:f,capture:e},c?c.push(u):this.__on=[u]}}function Gt(n,e,r,i){
var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{
t.event=o}}function Wt(t,n,e){var r=dt(t),i=r.CustomEvent
;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),
e?(i.initEvent(n,e.bubbles,e.cancelable),
i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Zt(t,n){
return function(){return Wt(this,t,n)}}function $t(t,n){return function(){
return Wt(this,t,n.apply(this,arguments))}}var Qt=[null];function Kt(t,n){
this._groups=t,this._parents=n}function Jt(){
return new Kt([[document.documentElement]],Qt)}function tn(t){
return"string"==typeof t?new Kt([[document.querySelector(t)]],[document.documentElement]):new Kt([[t]],Qt)
}Kt.prototype=Jt.prototype={constructor:Kt,select:function(t){
"function"!=typeof t&&(t=K(t))
;for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a,u=n[i],c=u.length,f=r[i]=new Array(c),s=0;s<c;++s)(o=u[s])&&(a=t.call(o,o.__data__,s,u))&&("__data__"in o&&(a.__data__=o.__data__),
f[s]=a);return new Kt(r,this._parents)},selectAll:function(t){
"function"!=typeof t&&(t=tt(t))
;for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var a,u=n[o],c=u.length,f=0;f<c;++f)(a=u[f])&&(r.push(t.call(a,a.__data__,f,u)),
i.push(a));return new Kt(r,i)},filter:function(t){
"function"!=typeof t&&(t=nt(t))
;for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a=n[i],u=a.length,c=r[i]=[],f=0;f<u;++f)(o=a[f])&&t.call(o,o.__data__,f,a)&&c.push(o)
;return new Kt(r,this._parents)},data:function(t,n){
if(!t)return d=new Array(this.size()),f=-1,this.each((function(t){d[++f]=t})),d
;var e=n?ot:it,r=this._parents,i=this._groups
;"function"!=typeof t&&(t=function(t){return function(){return t}}(t))
;for(var o=i.length,a=new Array(o),u=new Array(o),c=new Array(o),f=0;f<o;++f){
var s=r[f],l=i[f],h=l.length,d=t.call(s,s&&s.__data__,f,r),p=d.length,v=u[f]=new Array(p),g=a[f]=new Array(p)
;e(s,l,v,g,c[f]=new Array(h),d,n);for(var y,_,b=0,m=0;b<p;++b)if(y=v[b]){
for(b>=m&&(m=b+1);!(_=g[m])&&++m<p;);y._next=_||null}}
return(a=new Kt(a,r))._enter=u,a._exit=c,a},enter:function(){
return new Kt(this._enter||this._groups.map(et),this._parents)},exit:function(){
return new Kt(this._exit||this._groups.map(et),this._parents)},
join:function(t,n,e){var r=this.enter(),i=this,o=this.exit()
;return r="function"==typeof t?t(r):r.append(t+""),
null!=n&&(i=n(i)),null==e?o.remove():e(o),r&&i?r.merge(i).order():i},
merge:function(t){
for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var c,f=n[u],s=e[u],l=f.length,h=a[u]=new Array(l),d=0;d<l;++d)(c=f[d]||s[d])&&(h[d]=c)
;for(;u<r;++u)a[u]=n[u];return new Kt(a,this._parents)},order:function(){
for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,a=i[o];--o>=0;)(r=i[o])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),
a=r);return this},sort:function(t){function n(n,e){
return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=at)
;for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){
for(var a,u=e[o],c=u.length,f=i[o]=new Array(c),s=0;s<c;++s)(a=u[s])&&(f[s]=a)
;f.sort(n)}return new Kt(i,this._parents).order()},call:function(){
var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},
nodes:function(){var t=new Array(this.size()),n=-1;return this.each((function(){
t[++n]=this})),t},node:function(){
for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){
var a=r[i];if(a)return a}return null},size:function(){var t=0
;return this.each((function(){++t})),t},empty:function(){return!this.node()},
each:function(t){
for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],a=0,u=o.length;a<u;++a)(i=o[a])&&t.call(i,i.__data__,a,o)
;return this},attr:function(t,n){var e=G(t);if(arguments.length<2){
var r=this.node()
;return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}
return this.each((null==n?e.local?ct:ut:"function"==typeof n?e.local?ht:lt:e.local?st:ft)(e,n))
},style:function(t,n,e){
return arguments.length>1?this.each((null==n?pt:"function"==typeof n?gt:vt)(t,n,null==e?"":e)):yt(this.node(),t)
},property:function(t,n){
return arguments.length>1?this.each((null==n?_t:"function"==typeof n?mt:bt)(t,n)):this.node()[t]
},classed:function(t,n){var e=xt(t+"");if(arguments.length<2){
for(var r=wt(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1
;return!0}return this.each(("function"==typeof n?kt:n?At:St)(e,n))},
text:function(t){
return arguments.length?this.each(null==t?Et:("function"==typeof t?Pt:Ct)(t)):this.node().textContent
},html:function(t){
return arguments.length?this.each(null==t?zt:("function"==typeof t?Dt:Rt)(t)):this.node().innerHTML
},raise:function(){return this.each(qt)},lower:function(){return this.each(Lt)},
append:function(t){var n="function"==typeof t?t:$(t)
;return this.select((function(){return this.appendChild(n.apply(this,arguments))
}))},insert:function(t,n){
var e="function"==typeof t?t:$(t),r=null==n?Ut:"function"==typeof n?n:K(n)
;return this.select((function(){
return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)
}))},remove:function(){return this.each(Ot)},clone:function(t){
return this.select(t?Ft:Bt)},datum:function(t){
return arguments.length?this.property("__data__",t):this.node().__data__},
on:function(t,n,e){var r,i,o=jt(t+""),a=o.length;if(!(arguments.length<2)){
for(u=n?Vt:Xt,null==e&&(e=!1),r=0;r<a;++r)this.each(u(o[r],n,e));return this}
var u=this.node().__on
;if(u)for(var c,f=0,s=u.length;f<s;++f)for(r=0,c=u[f];r<a;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value
},dispatch:function(t,n){return this.each(("function"==typeof n?$t:Zt)(t,n))}}
;var nn=0;function en(){return new rn}function rn(){
this._="@"+(++nn).toString(36)}function on(){
for(var n,e=t.event;n=e.sourceEvent;)e=n;return e}function an(t,n){
var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint()
;return r.x=n.clientX,
r.y=n.clientY,[(r=r.matrixTransform(t.getScreenCTM().inverse())).x,r.y]}
var i=t.getBoundingClientRect()
;return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}
function un(t){var n=on()
;return n.changedTouches&&(n=n.changedTouches[0]),an(t,n)}function cn(t,n,e){
arguments.length<3&&(e=n,n=on().changedTouches)
;for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return an(t,r)
;return null}function fn(){t.event.stopImmediatePropagation()}function sn(){
t.event.preventDefault(),t.event.stopImmediatePropagation()}function ln(t){
var n=t.document.documentElement,e=tn(t).on("dragstart.drag",sn,!0)
;"onselectstart"in n?e.on("selectstart.drag",sn,!0):(n.__noselect=n.style.MozUserSelect,
n.style.MozUserSelect="none")}function hn(t,n){
var e=t.document.documentElement,r=tn(t).on("dragstart.drag",null)
;n&&(r.on("click.drag",sn,!0),setTimeout((function(){r.on("click.drag",null)
}),0)),
"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,
delete e.__noselect)}function dn(t){return function(){return t}}
function pn(t,n,e,r,i,o,a,u,c,f){
this.target=t,this.type=n,this.subject=e,this.identifier=r,
this.active=i,this.x=o,this.y=a,this.dx=u,this.dy=c,this._=f}function vn(){
return!t.event.ctrlKey&&!t.event.button}function gn(){return this.parentNode}
function yn(n){return null==n?{x:t.event.x,y:t.event.y}:n}function _n(){
return navigator.maxTouchPoints||"ontouchstart"in this}function bn(t,n,e){
t.prototype=n.prototype=e,e.constructor=t}function mn(t,n){
var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}
function xn(){}rn.prototype=en.prototype={constructor:rn,get:function(t){
for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},
set:function(t,n){return t[this._]=n},remove:function(t){
return this._ in t&&delete t[this._]},toString:function(){return this._}
},pn.prototype.on=function(){var t=this._.on.apply(this._,arguments)
;return t===this._?this:t}
;var wn=.7,Mn=1/wn,Nn="\\s*([+-]?\\d+)\\s*",Tn="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",An="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Sn=/^#([0-9a-f]{3,8})$/,kn=new RegExp("^rgb\\("+[Nn,Nn,Nn]+"\\)$"),En=new RegExp("^rgb\\("+[An,An,An]+"\\)$"),Cn=new RegExp("^rgba\\("+[Nn,Nn,Nn,Tn]+"\\)$"),Pn=new RegExp("^rgba\\("+[An,An,An,Tn]+"\\)$"),zn=new RegExp("^hsl\\("+[Tn,An,An]+"\\)$"),Rn=new RegExp("^hsla\\("+[Tn,An,An,Tn]+"\\)$"),Dn={
aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,
azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,
blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,
chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,
cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,
darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,
darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,
darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,
darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,
darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,
deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,
firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,
gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,
gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,
hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,
khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,
lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,
lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,
lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,
lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,
lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,
limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,
mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,
mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,
mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,
midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,
navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,
orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,
palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,
papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,
plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,
red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,
salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,
sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,
slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,
steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,
turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,
whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function qn(){
return this.rgb().formatHex()}function Ln(){return this.rgb().formatRgb()}
function Un(t){var n,e
;return t=(t+"").trim().toLowerCase(),(n=Sn.exec(t))?(e=n[1].length,
n=parseInt(n[1],16),
6===e?On(n):3===e?new In(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):8===e?Bn(n>>24&255,n>>16&255,n>>8&255,(255&n)/255):4===e?Bn(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|240&n,((15&n)<<4|15&n)/255):null):(n=kn.exec(t))?new In(n[1],n[2],n[3],1):(n=En.exec(t))?new In(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=Cn.exec(t))?Bn(n[1],n[2],n[3],n[4]):(n=Pn.exec(t))?Bn(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=zn.exec(t))?Vn(n[1],n[2]/100,n[3]/100,1):(n=Rn.exec(t))?Vn(n[1],n[2]/100,n[3]/100,n[4]):Dn.hasOwnProperty(t)?On(Dn[t]):"transparent"===t?new In(NaN,NaN,NaN,0):null
}function On(t){return new In(t>>16&255,t>>8&255,255&t,1)}function Bn(t,n,e,r){
return r<=0&&(t=n=e=NaN),new In(t,n,e,r)}function Fn(t){
return t instanceof xn||(t=Un(t)),
t?new In((t=t.rgb()).r,t.g,t.b,t.opacity):new In}function Yn(t,n,e,r){
return 1===arguments.length?Fn(t):new In(t,n,e,null==r?1:r)}
function In(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}
function Hn(){return"#"+Xn(this.r)+Xn(this.g)+Xn(this.b)}function jn(){
var t=this.opacity
;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")
}function Xn(t){
return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}
function Vn(t,n,e,r){
return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new Zn(t,n,e,r)}
function Gn(t){if(t instanceof Zn)return new Zn(t.h,t.s,t.l,t.opacity)
;if(t instanceof xn||(t=Un(t)),!t)return new Zn;if(t instanceof Zn)return t
;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),a=NaN,u=o-i,c=(o+i)/2
;return u?(a=n===o?(e-r)/u+6*(e<r):e===o?(r-n)/u+2:(n-e)/u+4,
u/=c<.5?o+i:2-o-i,a*=60):u=c>0&&c<1?0:a,new Zn(a,u,c,t.opacity)}
function Wn(t,n,e,r){return 1===arguments.length?Gn(t):new Zn(t,n,e,null==r?1:r)
}function Zn(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}
function $n(t,n,e){
return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}bn(xn,Un,{
copy:function(t){return Object.assign(new this.constructor,this,t)},
displayable:function(){return this.rgb().displayable()},hex:qn,formatHex:qn,
formatHsl:function(){return Gn(this).formatHsl()},formatRgb:Ln,toString:Ln
}),bn(In,Yn,mn(xn,{brighter:function(t){
return t=null==t?Mn:Math.pow(Mn,t),new In(this.r*t,this.g*t,this.b*t,this.opacity)
},darker:function(t){
return t=null==t?wn:Math.pow(wn,t),new In(this.r*t,this.g*t,this.b*t,this.opacity)
},rgb:function(){return this},displayable:function(){
return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1
},hex:Hn,formatHex:Hn,formatRgb:jn,toString:jn})),bn(Zn,Wn,mn(xn,{
brighter:function(t){
return t=null==t?Mn:Math.pow(Mn,t),new Zn(this.h,this.s,this.l*t,this.opacity)},
darker:function(t){
return t=null==t?wn:Math.pow(wn,t),new Zn(this.h,this.s,this.l*t,this.opacity)},
rgb:function(){
var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r
;return new In($n(t>=240?t-240:t+120,i,r),$n(t,i,r),$n(t<120?t+240:t-120,i,r),this.opacity)
},displayable:function(){
return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1
},formatHsl:function(){var t=this.opacity
;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")
}}))
;var Qn=Math.PI/180,Kn=180/Math.PI,Jn=.96422,te=.82521,ne=4/29,ee=6/29,re=3*ee*ee
;function ie(t){if(t instanceof ae)return new ae(t.l,t.a,t.b,t.opacity)
;if(t instanceof de)return pe(t);t instanceof In||(t=Fn(t))
;var n,e,r=se(t.r),i=se(t.g),o=se(t.b),a=ue((.2225045*r+.7168786*i+.0606169*o)/1)
;return r===i&&i===o?n=e=a:(n=ue((.4360747*r+.3850649*i+.1430804*o)/Jn),
e=ue((.0139322*r+.0971045*i+.7141733*o)/te)),
new ae(116*a-16,500*(n-a),200*(a-e),t.opacity)}function oe(t,n,e,r){
return 1===arguments.length?ie(t):new ae(t,n,e,null==r?1:r)}
function ae(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}
function ue(t){return t>.008856451679035631?Math.pow(t,1/3):t/re+ne}
function ce(t){return t>ee?t*t*t:re*(t-ne)}function fe(t){
return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function se(t){
return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function le(t){
if(t instanceof de)return new de(t.h,t.c,t.l,t.opacity)
;if(t instanceof ae||(t=ie(t)),
0===t.a&&0===t.b)return new de(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity)
;var n=Math.atan2(t.b,t.a)*Kn
;return new de(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}
function he(t,n,e,r){return 1===arguments.length?le(t):new de(t,n,e,null==r?1:r)
}function de(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}
function pe(t){if(isNaN(t.h))return new ae(t.l,0,0,t.opacity);var n=t.h*Qn
;return new ae(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}bn(ae,oe,mn(xn,{
brighter:function(t){
return new ae(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},
darker:function(t){
return new ae(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},
rgb:function(){
var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200
;return new In(fe(3.1338561*(n=Jn*ce(n))-1.6168667*(t=1*ce(t))-.4906146*(e=te*ce(e))),fe(-.9787684*n+1.9161415*t+.033454*e),fe(.0719453*n-.2289914*t+1.4052427*e),this.opacity)
}})),bn(de,he,mn(xn,{brighter:function(t){
return new de(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},
darker:function(t){
return new de(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},
rgb:function(){return pe(this).rgb()}}))
;var ve=-.14861,ge=1.78277,ye=-.29227,_e=-.90649,be=1.97294,me=be*_e,xe=be*ge,we=ge*ye-_e*ve
;function Me(t){if(t instanceof Te)return new Te(t.h,t.s,t.l,t.opacity)
;t instanceof In||(t=Fn(t))
;var n=t.r/255,e=t.g/255,r=t.b/255,i=(we*r+me*n-xe*e)/(we+me-xe),o=r-i,a=(be*(e-i)-ye*o)/_e,u=Math.sqrt(a*a+o*o)/(be*i*(1-i)),c=u?Math.atan2(a,o)*Kn-120:NaN
;return new Te(c<0?c+360:c,u,i,t.opacity)}function Ne(t,n,e,r){
return 1===arguments.length?Me(t):new Te(t,n,e,null==r?1:r)}
function Te(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}
function Ae(t,n,e,r,i){var o=t*t,a=o*t
;return((1-3*t+3*o-a)*n+(4-6*o+3*a)*e+(1+3*t+3*o-3*a)*r+a*i)/6}function Se(t){
var n=t.length-1;return function(e){
var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,u=r<n-1?t[r+2]:2*o-i
;return Ae((e-r/n)*n,a,i,o,u)}}function ke(t){var n=t.length;return function(e){
var r=Math.floor(((e%=1)<0?++e:e)*n),i=t[(r+n-1)%n],o=t[r%n],a=t[(r+1)%n],u=t[(r+2)%n]
;return Ae((e-r/n)*n,i,o,a,u)}}function Ee(t){return function(){return t}}
function Ce(t,n){return function(e){return t+e*n}}function Pe(t,n){var e=n-t
;return e?Ce(t,e>180||e<-180?e-360*Math.round(e/360):e):Ee(isNaN(t)?n:t)}
function ze(t){return 1==(t=+t)?Re:function(n,e){return e-n?function(t,n,e){
return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){
return Math.pow(t+r*n,e)}}(n,e,t):Ee(isNaN(n)?e:n)}}function Re(t,n){var e=n-t
;return e?Ce(t,e):Ee(isNaN(t)?n:t)}bn(Te,Ne,mn(xn,{brighter:function(t){
return t=null==t?Mn:Math.pow(Mn,t),new Te(this.h,this.s,this.l*t,this.opacity)},
darker:function(t){
return t=null==t?wn:Math.pow(wn,t),new Te(this.h,this.s,this.l*t,this.opacity)},
rgb:function(){
var t=isNaN(this.h)?0:(this.h+120)*Qn,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t)
;return new In(255*(n+e*(ve*r+ge*i)),255*(n+e*(ye*r+_e*i)),255*(n+e*(be*r)),this.opacity)
}}));var De=function t(n){var e=ze(n);function r(t,n){
var r=e((t=Yn(t)).r,(n=Yn(n)).r),i=e(t.g,n.g),o=e(t.b,n.b),a=Re(t.opacity,n.opacity)
;return function(n){return t.r=r(n),t.g=i(n),t.b=o(n),t.opacity=a(n),t+""}}
return r.gamma=t,r}(1);function qe(t){return function(n){
var e,r,i=n.length,o=new Array(i),a=new Array(i),u=new Array(i)
;for(e=0;e<i;++e)r=Yn(n[e]),o[e]=r.r||0,a[e]=r.g||0,u[e]=r.b||0
;return o=t(o),a=t(a),u=t(u),r.opacity=1,function(t){
return r.r=o(t),r.g=a(t),r.b=u(t),r+""}}}var Le=qe(Se),Ue=qe(ke)
;function Oe(t,n){n||(n=[]);var e,r=t?Math.min(n.length,t.length):0,i=n.slice()
;return function(o){for(e=0;e<r;++e)i[e]=t[e]*(1-o)+n[e]*o;return i}}
function Be(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}
function Fe(t,n){
var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r)
;for(e=0;e<i;++e)o[e]=Ge(t[e],n[e]);for(;e<r;++e)a[e]=n[e];return function(t){
for(e=0;e<i;++e)a[e]=o[e](t);return a}}function Ye(t,n){var e=new Date
;return t=+t,n=+n,function(r){return e.setTime(t*(1-r)+n*r),e}}function Ie(t,n){
return t=+t,n=+n,function(e){return t*(1-e)+n*e}}function He(t,n){
var e,r={},i={}
;for(e in null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={}),
n)e in t?r[e]=Ge(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t)
;return i}}
var je=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Xe=new RegExp(je.source,"g")
;function Ve(t,n){var e,r,i,o=je.lastIndex=Xe.lastIndex=0,a=-1,u=[],c=[]
;for(t+="",n+="";(e=je.exec(t))&&(r=Xe.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),
u[a]?u[a]+=i:u[++a]=i),
(e=e[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,c.push({i:a,x:Ie(e,r)})),
o=Xe.lastIndex
;return o<n.length&&(i=n.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?c[0]?function(t){
return function(n){return t(n)+""}}(c[0].x):function(t){return function(){
return t}}(n):(n=c.length,function(t){for(var e,r=0;r<n;++r)u[(e=c[r]).i]=e.x(t)
;return u.join("")})}function Ge(t,n){var e,r=typeof n
;return null==n||"boolean"===r?Ee(n):("number"===r?Ie:"string"===r?(e=Un(n))?(n=e,
De):Ve:n instanceof Un?De:n instanceof Date?Ye:Be(n)?Oe:Array.isArray(n)?Fe:"function"!=typeof n.valueOf&&"function"!=typeof n.toString||isNaN(n)?He:Ie)(t,n)
}function We(t,n){return t=+t,n=+n,function(e){return Math.round(t*(1-e)+n*e)}}
var Ze,$e,Qe,Ke,Je=180/Math.PI,tr={translateX:0,translateY:0,rotate:0,skewX:0,
scaleX:1,scaleY:1};function nr(t,n,e,r,i,o){var a,u,c
;return(a=Math.sqrt(t*t+n*n))&&(t/=a,
n/=a),(c=t*e+n*r)&&(e-=t*c,r-=n*c),(u=Math.sqrt(e*e+r*r))&&(e/=u,
r/=u,c/=u),t*r<n*e&&(t=-t,n=-n,c=-c,a=-a),{translateX:i,translateY:o,
rotate:Math.atan2(n,t)*Je,skewX:Math.atan(c)*Je,scaleX:a,scaleY:u}}
function er(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}
return function(o,a){var u=[],c=[];return o=t(o),a=t(a),function(t,r,i,o,a,u){
if(t!==i||r!==o){var c=a.push("translate(",null,n,null,e);u.push({i:c-4,
x:Ie(t,i)},{i:c-2,x:Ie(r,o)})}else(i||o)&&a.push("translate("+i+n+o+e)
}(o.translateX,o.translateY,a.translateX,a.translateY,u,c),function(t,n,e,o){
t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),o.push({
i:e.push(i(e)+"rotate(",null,r)-2,x:Ie(t,n)})):n&&e.push(i(e)+"rotate("+n+r)
}(o.rotate,a.rotate,u,c),function(t,n,e,o){t!==n?o.push({
i:e.push(i(e)+"skewX(",null,r)-2,x:Ie(t,n)}):n&&e.push(i(e)+"skewX("+n+r)
}(o.skewX,a.skewX,u,c),function(t,n,e,r,o,a){if(t!==e||n!==r){
var u=o.push(i(o)+"scale(",null,",",null,")");a.push({i:u-4,x:Ie(t,e)},{i:u-2,
x:Ie(n,r)})}else 1===e&&1===r||o.push(i(o)+"scale("+e+","+r+")")
}(o.scaleX,o.scaleY,a.scaleX,a.scaleY,u,c),o=a=null,function(t){
for(var n,e=-1,r=c.length;++e<r;)u[(n=c[e]).i]=n.x(t);return u.join("")}}}
var rr=er((function(t){
return"none"===t?tr:(Ze||(Ze=document.createElement("DIV"),
$e=document.documentElement,
Qe=document.defaultView),Ze.style.transform=t,t=Qe.getComputedStyle($e.appendChild(Ze),null).getPropertyValue("transform"),
$e.removeChild(Ze),
nr(+(t=t.slice(7,-1).split(","))[0],+t[1],+t[2],+t[3],+t[4],+t[5]))
}),"px, ","px)","deg)"),ir=er((function(t){
return null==t?tr:(Ke||(Ke=document.createElementNS("http://www.w3.org/2000/svg","g")),
Ke.setAttribute("transform",t),
(t=Ke.transform.baseVal.consolidate())?nr((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):tr)
}),", ",")",")"),or=Math.SQRT2;function ar(t){return((t=Math.exp(t))+1/t)/2}
function ur(t,n){
var e,r,i=t[0],o=t[1],a=t[2],u=n[0],c=n[1],f=n[2],s=u-i,l=c-o,h=s*s+l*l
;if(h<1e-12)r=Math.log(f/a)/or,e=function(t){
return[i+t*s,o+t*l,a*Math.exp(or*t*r)]};else{
var d=Math.sqrt(h),p=(f*f-a*a+4*h)/(2*a*2*d),v=(f*f-a*a-4*h)/(2*f*2*d),g=Math.log(Math.sqrt(p*p+1)-p),y=Math.log(Math.sqrt(v*v+1)-v)
;r=(y-g)/or,e=function(t){var n=t*r,e=ar(g),u=a/(2*d)*(e*function(t){
return((t=Math.exp(2*t))-1)/(t+1)}(or*n+g)-function(t){
return((t=Math.exp(t))-1/t)/2}(g));return[i+u*s,o+u*l,a*e/ar(or*n+g)]}}
return e.duration=1e3*r,e}function cr(t){return function(n,e){
var r=t((n=Wn(n)).h,(e=Wn(e)).h),i=Re(n.s,e.s),o=Re(n.l,e.l),a=Re(n.opacity,e.opacity)
;return function(t){return n.h=r(t),n.s=i(t),n.l=o(t),n.opacity=a(t),n+""}}}
var fr=cr(Pe),sr=cr(Re);function lr(t){return function(n,e){
var r=t((n=he(n)).h,(e=he(e)).h),i=Re(n.c,e.c),o=Re(n.l,e.l),a=Re(n.opacity,e.opacity)
;return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=a(t),n+""}}}
var hr=lr(Pe),dr=lr(Re);function pr(t){return function n(e){function r(n,r){
var i=t((n=Ne(n)).h,(r=Ne(r)).h),o=Re(n.s,r.s),a=Re(n.l,r.l),u=Re(n.opacity,r.opacity)
;return function(t){
return n.h=i(t),n.s=o(t),n.l=a(Math.pow(t,e)),n.opacity=u(t),n+""}}
return e=+e,r.gamma=n,r}(1)}var vr=pr(Pe),gr=pr(Re)
;var yr,_r,br=0,mr=0,xr=0,wr=0,Mr=0,Nr=0,Tr="object"==typeof performance&&performance.now?performance:Date,Ar="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){
setTimeout(t,17)};function Sr(){return Mr||(Ar(kr),Mr=Tr.now()+Nr)}
function kr(){Mr=0}function Er(){this._call=this._time=this._next=null}
function Cr(t,n,e){var r=new Er;return r.restart(t,n,e),r}function Pr(){
Sr(),++br;for(var t,n=yr;n;)(t=Mr-n._time)>=0&&n._call.call(null,t),n=n._next
;--br}function zr(){Mr=(wr=Tr.now())+Nr,br=mr=0;try{Pr()}finally{
br=0,function(){var t,n,e=yr,r=1/0
;for(;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,
e=t?t._next=n:yr=n);_r=t,Dr(r)}(),Mr=0}}function Rr(){var t=Tr.now(),n=t-wr
;n>1e3&&(Nr-=n,wr=t)}function Dr(t){
br||(mr&&(mr=clearTimeout(mr)),t-Mr>24?(t<1/0&&(mr=setTimeout(zr,t-Tr.now()-Nr)),
xr&&(xr=clearInterval(xr))):(xr||(wr=Tr.now(),
xr=setInterval(Rr,1e3)),br=1,Ar(zr)))}function qr(t,n,e){var r=new Er
;return n=null==n?0:+n,r.restart((function(e){r.stop(),t(e+n)}),n,e),r}
Er.prototype=Cr.prototype={constructor:Er,restart:function(t,n,e){
if("function"!=typeof t)throw new TypeError("callback is not a function")
;e=(null==e?Sr():+e)+(null==n?0:+n),
this._next||_r===this||(_r?_r._next=this:yr=this,
_r=this),this._call=t,this._time=e,Dr()},stop:function(){
this._call&&(this._call=null,this._time=1/0,Dr())}}
;var Lr=F("start","end","cancel","interrupt"),Ur=[];function Or(t,n,e,r,i,o){
var a=t.__transition;if(a){if(e in a)return}else t.__transition={}
;!function(t,n,e){var r,i=t.__transition;function o(t){
e.state=1,e.timer.restart(a,e.delay,e.time),e.delay<=t&&a(t-e.delay)}
function a(o){var f,s,l,h;if(1!==e.state)return c()
;for(f in i)if((h=i[f]).name===e.name){if(3===h.state)return qr(a)
;4===h.state?(h.state=6,
h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),
delete i[f]):+f<n&&(h.state=6,
h.timer.stop(),h.on.call("cancel",t,t.__data__,h.index,h.group),delete i[f])}
if(qr((function(){
3===e.state&&(e.state=4,e.timer.restart(u,e.delay,e.time),u(o))
})),e.state=2,e.on.call("start",t,t.__data__,e.index,e.group),2===e.state){
for(e.state=3,
r=new Array(l=e.tween.length),f=0,s=-1;f<l;++f)(h=e.tween[f].value.call(t,t.__data__,e.index,e.group))&&(r[++s]=h)
;r.length=s+1}}function u(n){
for(var i=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(c),
e.state=5,1),o=-1,a=r.length;++o<a;)r[o].call(t,i)
;5===e.state&&(e.on.call("end",t,t.__data__,e.index,e.group),c())}function c(){
for(var r in e.state=6,e.timer.stop(),delete i[n],i)return;delete t.__transition
}i[n]=e,e.timer=Cr(o,0,e.time)}(t,e,{name:n,index:r,group:i,on:Lr,tween:Ur,
time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:0})}
function Br(t,n){var e=Yr(t,n)
;if(e.state>0)throw new Error("too late; already scheduled");return e}
function Fr(t,n){var e=Yr(t,n)
;if(e.state>3)throw new Error("too late; already running");return e}
function Yr(t,n){var e=t.__transition
;if(!e||!(e=e[n]))throw new Error("transition not found");return e}
function Ir(t,n){var e,r,i,o=t.__transition,a=!0;if(o){
for(i in n=null==n?null:n+"",
o)(e=o[i]).name===n?(r=e.state>2&&e.state<5,e.state=6,
e.timer.stop(),e.on.call(r?"interrupt":"cancel",t,t.__data__,e.index,e.group),
delete o[i]):a=!1;a&&delete t.__transition}}function Hr(t,n){var e,r
;return function(){var i=Fr(this,t),o=i.tween
;if(o!==e)for(var a=0,u=(r=e=o).length;a<u;++a)if(r[a].name===n){
(r=r.slice()).splice(a,1);break}i.tween=r}}function jr(t,n,e){var r,i
;if("function"!=typeof e)throw new Error;return function(){
var o=Fr(this,t),a=o.tween;if(a!==r){i=(r=a).slice();for(var u={name:n,value:e
},c=0,f=i.length;c<f;++c)if(i[c].name===n){i[c]=u;break}c===f&&i.push(u)}
o.tween=i}}function Xr(t,n,e){var r=t._id;return t.each((function(){
var t=Fr(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)
})),function(t){return Yr(t,r).value[n]}}function Vr(t,n){var e
;return("number"==typeof n?Ie:n instanceof Un?De:(e=Un(n))?(n=e,De):Ve)(t,n)}
function Gr(t){return function(){this.removeAttribute(t)}}function Wr(t){
return function(){this.removeAttributeNS(t.space,t.local)}}function Zr(t,n,e){
var r,i,o=e+"";return function(){var a=this.getAttribute(t)
;return a===o?null:a===r?i:i=n(r=a,e)}}function $r(t,n,e){var r,i,o=e+""
;return function(){var a=this.getAttributeNS(t.space,t.local)
;return a===o?null:a===r?i:i=n(r=a,e)}}function Qr(t,n,e){var r,i,o
;return function(){var a,u,c=e(this)
;if(null!=c)return(a=this.getAttribute(t))===(u=c+"")?null:a===r&&u===i?o:(i=u,
o=n(r=a,c));this.removeAttribute(t)}}function Kr(t,n,e){var r,i,o
;return function(){var a,u,c=e(this)
;if(null!=c)return(a=this.getAttributeNS(t.space,t.local))===(u=c+"")?null:a===r&&u===i?o:(i=u,
o=n(r=a,c));this.removeAttributeNS(t.space,t.local)}}function Jr(t,n){
return function(e){this.setAttribute(t,n.call(this,e))}}function ti(t,n){
return function(e){this.setAttributeNS(t.space,t.local,n.call(this,e))}}
function ni(t,n){var e,r;function i(){var i=n.apply(this,arguments)
;return i!==r&&(e=(r=i)&&ti(t,i)),e}return i._value=n,i}function ei(t,n){var e,r
;function i(){var i=n.apply(this,arguments);return i!==r&&(e=(r=i)&&Jr(t,i)),e}
return i._value=n,i}function ri(t,n){return function(){
Br(this,t).delay=+n.apply(this,arguments)}}function ii(t,n){
return n=+n,function(){Br(this,t).delay=n}}function oi(t,n){return function(){
Fr(this,t).duration=+n.apply(this,arguments)}}function ai(t,n){
return n=+n,function(){Fr(this,t).duration=n}}function ui(t,n){
if("function"!=typeof n)throw new Error;return function(){Fr(this,t).ease=n}}
function ci(t,n,e){var r,i,o=function(t){
return(t+"").trim().split(/^|\s+/).every((function(t){var n=t.indexOf(".")
;return n>=0&&(t=t.slice(0,n)),!t||"start"===t}))}(n)?Br:Fr;return function(){
var a=o(this,t),u=a.on;u!==r&&(i=(r=u).copy()).on(n,e),a.on=i}}
var fi=Jt.prototype.constructor;function si(t){return function(){
this.style.removeProperty(t)}}function li(t,n,e){return function(r){
this.style.setProperty(t,n.call(this,r),e)}}function hi(t,n,e){var r,i
;function o(){var o=n.apply(this,arguments);return o!==i&&(r=(i=o)&&li(t,o,e)),r
}return o._value=n,o}function di(t){return function(n){
this.textContent=t.call(this,n)}}function pi(t){var n,e;function r(){
var r=t.apply(this,arguments);return r!==e&&(n=(e=r)&&di(r)),n}
return r._value=t,r}var vi=0;function gi(t,n,e,r){
this._groups=t,this._parents=n,this._name=e,this._id=r}function yi(t){
return Jt().transition(t)}function _i(){return++vi}var bi=Jt.prototype
;function mi(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function xi(t){
return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}gi.prototype=yi.prototype={
constructor:gi,select:function(t){var n=this._name,e=this._id
;"function"!=typeof t&&(t=K(t))
;for(var r=this._groups,i=r.length,o=new Array(i),a=0;a<i;++a)for(var u,c,f=r[a],s=f.length,l=o[a]=new Array(s),h=0;h<s;++h)(u=f[h])&&(c=t.call(u,u.__data__,h,f))&&("__data__"in u&&(c.__data__=u.__data__),
l[h]=c,Or(l[h],n,e,h,l,Yr(u,e)));return new gi(o,this._parents,n,e)},
selectAll:function(t){var n=this._name,e=this._id
;"function"!=typeof t&&(t=tt(t))
;for(var r=this._groups,i=r.length,o=[],a=[],u=0;u<i;++u)for(var c,f=r[u],s=f.length,l=0;l<s;++l)if(c=f[l]){
for(var h,d=t.call(c,c.__data__,l,f),p=Yr(c,e),v=0,g=d.length;v<g;++v)(h=d[v])&&Or(h,n,e,v,d,p)
;o.push(d),a.push(c)}return new gi(o,a,n,e)},filter:function(t){
"function"!=typeof t&&(t=nt(t))
;for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a=n[i],u=a.length,c=r[i]=[],f=0;f<u;++f)(o=a[f])&&t.call(o,o.__data__,f,a)&&c.push(o)
;return new gi(r,this._parents,this._name,this._id)},merge:function(t){
if(t._id!==this._id)throw new Error
;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var c,f=n[u],s=e[u],l=f.length,h=a[u]=new Array(l),d=0;d<l;++d)(c=f[d]||s[d])&&(h[d]=c)
;for(;u<r;++u)a[u]=n[u];return new gi(a,this._parents,this._name,this._id)},
selection:function(){return new fi(this._groups,this._parents)},
transition:function(){
for(var t=this._name,n=this._id,e=_i(),r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],c=u.length,f=0;f<c;++f)if(a=u[f]){
var s=Yr(a,n);Or(a,t,e,f,u,{time:s.time+s.delay+s.duration,delay:0,
duration:s.duration,ease:s.ease})}return new gi(r,this._parents,t,e)},
call:bi.call,nodes:bi.nodes,node:bi.node,size:bi.size,empty:bi.empty,
each:bi.each,on:function(t,n){var e=this._id
;return arguments.length<2?Yr(this.node(),e).on.on(t):this.each(ci(e,t,n))},
attr:function(t,n){var e=G(t),r="transform"===e?ir:Vr
;return this.attrTween(t,"function"==typeof n?(e.local?Kr:Qr)(e,r,Xr(this,"attr."+t,n)):null==n?(e.local?Wr:Gr)(e):(e.local?$r:Zr)(e,r,n))
},attrTween:function(t,n){var e="attr."+t
;if(arguments.length<2)return(e=this.tween(e))&&e._value
;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error
;var r=G(t);return this.tween(e,(r.local?ni:ei)(r,n))},style:function(t,n,e){
var r="transform"==(t+="")?rr:Vr;return null==n?this.styleTween(t,function(t,n){
var e,r,i;return function(){
var o=yt(this,t),a=(this.style.removeProperty(t),yt(this,t))
;return o===a?null:o===e&&a===r?i:i=n(e=o,r=a)}
}(t,r)).on("end.style."+t,si(t)):"function"==typeof n?this.styleTween(t,function(t,n,e){
var r,i,o;return function(){var a=yt(this,t),u=e(this),c=u+""
;return null==u&&(this.style.removeProperty(t),
c=u=yt(this,t)),a===c?null:a===r&&c===i?o:(i=c,o=n(r=a,u))}
}(t,r,Xr(this,"style."+t,n))).each(function(t,n){
var e,r,i,o,a="style."+n,u="end."+a;return function(){
var c=Fr(this,t),f=c.on,s=null==c.value[a]?o||(o=si(n)):void 0
;f===e&&i===s||(r=(e=f).copy()).on(u,i=s),c.on=r}
}(this._id,t)):this.styleTween(t,function(t,n,e){var r,i,o=e+""
;return function(){var a=yt(this,t);return a===o?null:a===r?i:i=n(r=a,e)}
}(t,r,n),e).on("end.style."+t,null)},styleTween:function(t,n,e){
var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value
;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error
;return this.tween(r,hi(t,n,null==e?"":e))},text:function(t){
return this.tween("text","function"==typeof t?function(t){return function(){
var n=t(this);this.textContent=null==n?"":n}}(Xr(this,"text",t)):function(t){
return function(){this.textContent=t}}(null==t?"":t+""))},textTween:function(t){
var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value
;if(null==t)return this.tween(n,null);if("function"!=typeof t)throw new Error
;return this.tween(n,pi(t))},remove:function(){
return this.on("end.remove",function(t){return function(){var n=this.parentNode
;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}
}(this._id))},tween:function(t,n){var e=this._id;if(t+="",arguments.length<2){
for(var r,i=Yr(this.node(),e).tween,o=0,a=i.length;o<a;++o)if((r=i[o]).name===t)return r.value
;return null}return this.each((null==n?Hr:jr)(e,t,n))},delay:function(t){
var n=this._id
;return arguments.length?this.each(("function"==typeof t?ri:ii)(n,t)):Yr(this.node(),n).delay
},duration:function(t){var n=this._id
;return arguments.length?this.each(("function"==typeof t?oi:ai)(n,t)):Yr(this.node(),n).duration
},ease:function(t){var n=this._id
;return arguments.length?this.each(ui(n,t)):Yr(this.node(),n).ease},
end:function(){var t,n,e=this,r=e._id,i=e.size()
;return new Promise((function(o,a){var u={value:a},c={value:function(){
0==--i&&o()}};e.each((function(){var e=Fr(this,r),i=e.on
;i!==t&&((n=(t=i).copy())._.cancel.push(u),
n._.interrupt.push(u),n._.end.push(c)),e.on=n}))}))}};var wi=function t(n){
function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e
}(3),Mi=function t(n){function e(t){return 1-Math.pow(1-t,n)}
return n=+n,e.exponent=t,e}(3),Ni=function t(n){function e(t){
return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e
}(3),Ti=Math.PI,Ai=Ti/2;function Si(t){return(1-Math.cos(Ti*t))/2}
function ki(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}
function Ei(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}
var Ci=4/11,Pi=7.5625;function zi(t){
return(t=+t)<Ci?Pi*t*t:t<.7272727272727273?Pi*(t-=.5454545454545454)*t+.75:t<.9090909090909091?Pi*(t-=.8181818181818182)*t+.9375:Pi*(t-=.9545454545454546)*t+.984375
}var Ri=1.70158,Di=function t(n){function e(t){return t*t*((n+1)*t-n)}
return n=+n,e.overshoot=t,e}(Ri),qi=function t(n){function e(t){
return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}(Ri),Li=function t(n){
function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}
return n=+n,e.overshoot=t,e}(Ri),Ui=2*Math.PI,Oi=function t(n,e){
var r=Math.asin(1/(n=Math.max(1,n)))*(e/=Ui);function i(t){
return n*Math.pow(2,10*--t)*Math.sin((r-t)/e)}return i.amplitude=function(n){
return t(n,e*Ui)},i.period=function(e){return t(n,e)},i
}(1,.3),Bi=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=Ui)
;function i(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+r)/e)}
return i.amplitude=function(n){return t(n,e*Ui)},i.period=function(e){
return t(n,e)},i}(1,.3),Fi=function t(n,e){
var r=Math.asin(1/(n=Math.max(1,n)))*(e/=Ui);function i(t){
return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((r-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((r+t)/e))/2
}return i.amplitude=function(n){return t(n,e*Ui)},i.period=function(e){
return t(n,e)},i}(1,.3),Yi={time:null,delay:0,duration:250,ease:xi}
;function Ii(t,n){
for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return Yi.time=Sr(),
Yi;return e}Jt.prototype.interrupt=function(t){return this.each((function(){
Ir(this,t)}))},Jt.prototype.transition=function(t){var n,e
;t instanceof gi?(n=t._id,
t=t._name):(n=_i(),(e=Yi).time=Sr(),t=null==t?null:t+"")
;for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],c=u.length,f=0;f<c;++f)(a=u[f])&&Or(a,t,n,f,u,e||Ii(a,n))
;return new gi(r,this._parents,t,n)};var Hi=[null];function ji(t){
return function(){return t}}function Xi(t,n,e){
this.target=t,this.type=n,this.selection=e}function Vi(){
t.event.stopImmediatePropagation()}function Gi(){
t.event.preventDefault(),t.event.stopImmediatePropagation()}var Wi={name:"drag"
},Zi={name:"space"},$i={name:"handle"},Qi={name:"center"};function Ki(t){
return[+t[0],+t[1]]}function Ji(t){return[Ki(t[0]),Ki(t[1])]}function to(n){
return function(e){return cn(e,t.event.touches,n)}}var no={name:"x",
handles:["w","e"].map(fo),input:function(t,n){
return null==t?null:[[+t[0],n[0][1]],[+t[1],n[1][1]]]},output:function(t){
return t&&[t[0][0],t[1][0]]}},eo={name:"y",handles:["n","s"].map(fo),
input:function(t,n){return null==t?null:[[n[0][0],+t[0]],[n[1][0],+t[1]]]},
output:function(t){return t&&[t[0][1],t[1][1]]}},ro={name:"xy",
handles:["n","w","e","s","nw","ne","sw","se"].map(fo),input:function(t){
return null==t?null:Ji(t)},output:function(t){return t}},io={
overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",
w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",
sw:"nesw-resize"},oo={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},ao={n:"s",
s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},uo={overlay:1,selection:1,n:null,e:1,
s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},co={overlay:1,selection:1,n:-1,e:null,s:1,
w:null,nw:-1,ne:-1,se:1,sw:1};function fo(t){return{type:t}}function so(){
return!t.event.ctrlKey&&!t.event.button}function lo(){
var t=this.ownerSVGElement||this
;return t.hasAttribute("viewBox")?[[(t=t.viewBox.baseVal).x,t.y],[t.x+t.width,t.y+t.height]]:[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]
}function ho(){return navigator.maxTouchPoints||"ontouchstart"in this}
function po(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}
function vo(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function go(n){
var e,r=lo,i=so,o=ho,a=!0,u=F("start","brush","end"),c=6;function f(t){
var e=t.property("__brush",g).selectAll(".overlay").data([fo("overlay")])
;e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",io.overlay).merge(e).each((function(){
var t=po(this).extent
;tn(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])
})),
t.selectAll(".selection").data([fo("selection")]).enter().append("rect").attr("class","selection").attr("cursor",io.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges")
;var r=t.selectAll(".handle").data(n.handles,(function(t){return t.type}))
;r.exit().remove(),r.enter().append("rect").attr("class",(function(t){
return"handle handle--"+t.type})).attr("cursor",(function(t){return io[t.type]
})),
t.each(s).attr("fill","none").attr("pointer-events","all").on("mousedown.brush",d).filter(o).on("touchstart.brush",d).on("touchmove.brush",p).on("touchend.brush touchcancel.brush",v).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")
}function s(){var t=tn(this),n=po(this).selection
;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),
t.selectAll(".handle").style("display",null).attr("x",(function(t){
return"e"===t.type[t.type.length-1]?n[1][0]-c/2:n[0][0]-c/2
})).attr("y",(function(t){return"s"===t.type[0]?n[1][1]-c/2:n[0][1]-c/2
})).attr("width",(function(t){
return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+c:c
})).attr("height",(function(t){
return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+c:c
}))):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)
}function l(t,n,e){return!e&&t.__brush.emitter||new h(t,n)}function h(t,n){
this.that=t,this.args=n,this.state=t.__brush,this.active=0}function d(){
if((!e||t.event.touches)&&i.apply(this,arguments)){
var r,o,u,c,f,h,d,p,v,g,y,_=this,b=t.event.target.__data__.type,m="selection"===(a&&t.event.metaKey?b="overlay":b)?Wi:a&&t.event.altKey?Qi:$i,x=n===eo?null:uo[b],w=n===no?null:co[b],M=po(_),N=M.extent,T=M.selection,A=N[0][0],S=N[0][1],k=N[1][0],E=N[1][1],C=0,P=0,z=x&&w&&a&&t.event.shiftKey,R=t.event.touches?to(t.event.changedTouches[0].identifier):un,D=R(_),q=D,L=l(_,arguments,!0).beforestart()
;"overlay"===b?(T&&(v=!0),
M.selection=T=[[r=n===eo?A:D[0],u=n===no?S:D[1]],[f=n===eo?k:r,d=n===no?E:u]]):(r=T[0][0],
u=T[0][1],f=T[1][0],d=T[1][1]),o=r,c=u,h=f,p=d
;var U=tn(_).attr("pointer-events","none"),O=U.selectAll(".overlay").attr("cursor",io[b])
;if(t.event.touches)L.moved=F,L.ended=I;else{
var B=tn(t.event.view).on("mousemove.brush",F,!0).on("mouseup.brush",I,!0)
;a&&B.on("keydown.brush",H,!0).on("keyup.brush",j,!0),ln(t.event.view)}
Vi(),Ir(_),s.call(_),L.start()}function F(){var t=R(_)
;!z||g||y||(Math.abs(t[0]-q[0])>Math.abs(t[1]-q[1])?y=!0:g=!0),q=t,v=!0,Gi(),Y()
}function Y(){var t;switch(C=q[0]-D[0],P=q[1]-D[1],m){case Zi:case Wi:
x&&(C=Math.max(A-r,Math.min(k-f,C)),
o=r+C,h=f+C),w&&(P=Math.max(S-u,Math.min(E-d,P)),c=u+P,p=d+P);break;case $i:
x<0?(C=Math.max(A-r,Math.min(k-r,C)),
o=r+C,h=f):x>0&&(C=Math.max(A-f,Math.min(k-f,C)),
o=r,h=f+C),w<0?(P=Math.max(S-u,Math.min(E-u,P)),
c=u+P,p=d):w>0&&(P=Math.max(S-d,Math.min(E-d,P)),c=u,p=d+P);break;case Qi:
x&&(o=Math.max(A,Math.min(k,r-C*x)),
h=Math.max(A,Math.min(k,f+C*x))),w&&(c=Math.max(S,Math.min(E,u-P*w)),
p=Math.max(S,Math.min(E,d+P*w)))}
h<o&&(x*=-1,t=r,r=f,f=t,t=o,o=h,h=t,b in oo&&O.attr("cursor",io[b=oo[b]])),
p<c&&(w*=-1,
t=u,u=d,d=t,t=c,c=p,p=t,b in ao&&O.attr("cursor",io[b=ao[b]])),M.selection&&(T=M.selection),
g&&(o=T[0][0],
h=T[1][0]),y&&(c=T[0][1],p=T[1][1]),T[0][0]===o&&T[0][1]===c&&T[1][0]===h&&T[1][1]===p||(M.selection=[[o,c],[h,p]],
s.call(_),L.brush())}function I(){if(Vi(),t.event.touches){
if(t.event.touches.length)return;e&&clearTimeout(e),e=setTimeout((function(){
e=null}),500)
}else hn(t.event.view,v),B.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null)
;U.attr("pointer-events","all"),
O.attr("cursor",io.overlay),M.selection&&(T=M.selection),
vo(T)&&(M.selection=null,s.call(_)),L.end()}function H(){
switch(t.event.keyCode){case 16:z=x&&w;break;case 18:
m===$i&&(x&&(f=h-C*x,r=o+C*x),w&&(d=p-P*w,u=c+P*w),m=Qi,Y());break;case 32:
m!==$i&&m!==Qi||(x<0?f=h-C:x>0&&(r=o-C),
w<0?d=p-P:w>0&&(u=c-P),m=Zi,O.attr("cursor",io.selection),Y());break;default:
return}Gi()}function j(){switch(t.event.keyCode){case 16:z&&(g=y=z=!1,Y());break
;case 18:m===Qi&&(x<0?f=h:x>0&&(r=o),w<0?d=p:w>0&&(u=c),m=$i,Y());break;case 32:
m===Zi&&(t.event.altKey?(x&&(f=h-C*x,
r=o+C*x),w&&(d=p-P*w,u=c+P*w),m=Qi):(x<0?f=h:x>0&&(r=o),
w<0?d=p:w>0&&(u=c),m=$i),O.attr("cursor",io[b]),Y());break;default:return}Gi()}}
function p(){l(this,arguments).moved()}function v(){l(this,arguments).ended()}
function g(){var t=this.__brush||{selection:null}
;return t.extent=Ji(r.apply(this,arguments)),t.dim=n,t}
return f.move=function(t,e){t.selection?t.on("start.brush",(function(){
l(this,arguments).beforestart().start()
})).on("interrupt.brush end.brush",(function(){l(this,arguments).end()
})).tween("brush",(function(){
var t=this,r=t.__brush,i=l(t,arguments),o=r.selection,a=n.input("function"==typeof e?e.apply(this,arguments):e,r.extent),u=Ge(o,a)
;function c(n){r.selection=1===n&&null===a?null:u(n),s.call(t),i.brush()}
return null!==o&&null!==a?c:c(1)})):t.each((function(){
var t=this,r=arguments,i=t.__brush,o=n.input("function"==typeof e?e.apply(t,r):e,i.extent),a=l(t,r).beforestart()
;Ir(t),i.selection=null===o?null:o,s.call(t),a.start().brush().end()}))
},f.clear=function(t){f.move(t,null)},h.prototype={beforestart:function(){
return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},
start:function(){
return this.starting?(this.starting=!1,this.emit("start")):this.emit("brush"),
this},brush:function(){return this.emit("brush"),this},end:function(){
return 0==--this.active&&(delete this.state.emitter,this.emit("end")),this},
emit:function(t){
Gt(new Xi(f,t,n.output(this.state.selection)),u.apply,u,[t,this.that,this.args])
}},f.extent=function(t){
return arguments.length?(r="function"==typeof t?t:ji(Ji(t)),f):r
},f.filter=function(t){
return arguments.length?(i="function"==typeof t?t:ji(!!t),f):i
},f.touchable=function(t){
return arguments.length?(o="function"==typeof t?t:ji(!!t),f):o
},f.handleSize=function(t){return arguments.length?(c=+t,f):c
},f.keyModifiers=function(t){return arguments.length?(a=!!t,f):a
},f.on=function(){var t=u.on.apply(u,arguments);return t===u?f:t},f}
var yo=Math.cos,_o=Math.sin,bo=Math.PI,mo=bo/2,xo=2*bo,wo=Math.max
;function Mo(t){return function(n,e){
return t(n.source.value+n.target.value,e.source.value+e.target.value)}}
var No=Array.prototype.slice;function To(t){return function(){return t}}
var Ao=Math.PI,So=2*Ao,ko=1e-6,Eo=So-ko;function Co(){
this._x0=this._y0=this._x1=this._y1=null,this._=""}function Po(){return new Co}
function zo(t){return t.source}function Ro(t){return t.target}function Do(t){
return t.radius}function qo(t){return t.startAngle}function Lo(t){
return t.endAngle}Co.prototype=Po.prototype={constructor:Co,
moveTo:function(t,n){
this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},
closePath:function(){
null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},
lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},
quadraticCurveTo:function(t,n,e,r){
this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+r)},
bezierCurveTo:function(t,n,e,r,i,o){
this._+="C"+ +t+","+ +n+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},
arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i
;var o=this._x1,a=this._y1,u=e-t,c=r-n,f=o-t,s=a-n,l=f*f+s*s
;if(i<0)throw new Error("negative radius: "+i)
;if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(l>ko)if(Math.abs(s*u-c*f)>ko&&i){
var h=e-o,d=r-a,p=u*u+c*c,v=h*h+d*d,g=Math.sqrt(p),y=Math.sqrt(l),_=i*Math.tan((Ao-Math.acos((p+l-v)/(2*g*y)))/2),b=_/y,m=_/g
;Math.abs(b-1)>ko&&(this._+="L"+(t+b*f)+","+(n+b*s)),
this._+="A"+i+","+i+",0,0,"+ +(s*h>f*d)+","+(this._x1=t+m*u)+","+(this._y1=n+m*c)
}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},
arc:function(t,n,e,r,i,o){t=+t,n=+n,o=!!o
;var a=(e=+e)*Math.cos(r),u=e*Math.sin(r),c=t+a,f=n+u,s=1^o,l=o?r-i:i-r
;if(e<0)throw new Error("negative radius: "+e)
;null===this._x1?this._+="M"+c+","+f:(Math.abs(this._x1-c)>ko||Math.abs(this._y1-f)>ko)&&(this._+="L"+c+","+f),
e&&(l<0&&(l=l%So+So),
l>Eo?this._+="A"+e+","+e+",0,1,"+s+","+(t-a)+","+(n-u)+"A"+e+","+e+",0,1,"+s+","+(this._x1=c)+","+(this._y1=f):l>ko&&(this._+="A"+e+","+e+",0,"+ +(l>=Ao)+","+s+","+(this._x1=t+e*Math.cos(i))+","+(this._y1=n+e*Math.sin(i))))
},rect:function(t,n,e,r){
this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +r+"h"+-e+"Z"
},toString:function(){return this._}};var Uo="$";function Oo(){}
function Bo(t,n){var e=new Oo;if(t instanceof Oo)t.each((function(t,n){
e.set(n,t)}));else if(Array.isArray(t)){var r,i=-1,o=t.length
;if(null==n)for(;++i<o;)e.set(i,t[i]);else for(;++i<o;)e.set(n(r=t[i],i,t),r)
}else if(t)for(var a in t)e.set(a,t[a]);return e}function Fo(){return{}}
function Yo(t,n,e){t[n]=e}function Io(){return Bo()}function Ho(t,n,e){
t.set(n,e)}function jo(){}Oo.prototype=Bo.prototype={constructor:Oo,
has:function(t){return Uo+t in this},get:function(t){return this[Uo+t]},
set:function(t,n){return this[Uo+t]=n,this},remove:function(t){var n=Uo+t
;return n in this&&delete this[n]},clear:function(){
for(var t in this)t[0]===Uo&&delete this[t]},keys:function(){var t=[]
;for(var n in this)n[0]===Uo&&t.push(n.slice(1));return t},values:function(){
var t=[];for(var n in this)n[0]===Uo&&t.push(this[n]);return t},
entries:function(){var t=[];for(var n in this)n[0]===Uo&&t.push({key:n.slice(1),
value:this[n]});return t},size:function(){var t=0
;for(var n in this)n[0]===Uo&&++t;return t},empty:function(){
for(var t in this)if(t[0]===Uo)return!1;return!0},each:function(t){
for(var n in this)n[0]===Uo&&t(this[n],n.slice(1),this)}};var Xo=Bo.prototype
;function Vo(t,n){var e=new jo;if(t instanceof jo)t.each((function(t){e.add(t)
}));else if(t){var r=-1,i=t.length
;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e
}jo.prototype=Vo.prototype={constructor:jo,has:Xo.has,add:function(t){
return this[Uo+(t+="")]=t,this},remove:Xo.remove,clear:Xo.clear,values:Xo.keys,
size:Xo.size,empty:Xo.empty,each:Xo.each};var Go=Array.prototype.slice
;function Wo(t,n){return t-n}function Zo(t){return function(){return t}}
function $o(t,n){for(var e,r=-1,i=n.length;++r<i;)if(e=Qo(t,n[r]))return e
;return 0}function Qo(t,n){
for(var e=n[0],r=n[1],i=-1,o=0,a=t.length,u=a-1;o<a;u=o++){
var c=t[o],f=c[0],s=c[1],l=t[u],h=l[0],d=l[1];if(Ko(c,l,n))return 0
;s>r!=d>r&&e<(h-f)*(r-s)/(d-s)+f&&(i=-i)}return i}function Ko(t,n,e){var r
;return function(t,n,e){return(n[0]-t[0])*(e[1]-t[1])==(e[0]-t[0])*(n[1]-t[1])
}(t,n,e)&&function(t,n,e){return t<=n&&n<=e||e<=n&&n<=t
}(t[r=+(t[0]===n[0])],e[r],n[r])}function Jo(){}
var ta=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]]
;function na(){var t=1,n=1,e=M,r=u;function i(t){var n=e(t)
;if(Array.isArray(n))n=n.slice().sort(Wo);else{var r=s(t),i=r[0],a=r[1]
;n=w(i,a,n),n=g(Math.floor(i/n)*n,Math.floor(a/n)*n,n)}
return n.map((function(n){return o(t,n)}))}function o(e,i){var o=[],u=[]
;return function(e,r,i){var o,u,c,f,s,l,h=new Array,d=new Array
;o=u=-1,f=e[0]>=r,ta[f<<1].forEach(p)
;for(;++o<t-1;)c=f,f=e[o+1]>=r,ta[c|f<<1].forEach(p);ta[f<<0].forEach(p)
;for(;++u<n-1;){
for(o=-1,f=e[u*t+t]>=r,s=e[u*t]>=r,ta[f<<1|s<<2].forEach(p);++o<t-1;)c=f,
f=e[u*t+t+o+1]>=r,l=s,s=e[u*t+o+1]>=r,ta[c|f<<1|s<<2|l<<3].forEach(p)
;ta[f|s<<3].forEach(p)}o=-1,s=e[u*t]>=r,ta[s<<2].forEach(p)
;for(;++o<t-1;)l=s,s=e[u*t+o+1]>=r,ta[s<<2|l<<3].forEach(p);function p(t){
var n,e,r=[t[0][0]+o,t[0][1]+u],c=[t[1][0]+o,t[1][1]+u],f=a(r),s=a(c)
;(n=d[f])?(e=h[s])?(delete d[n.end],
delete h[e.start],n===e?(n.ring.push(c),i(n.ring)):h[n.start]=d[e.end]={
start:n.start,end:e.end,ring:n.ring.concat(e.ring)
}):(delete d[n.end],n.ring.push(c),
d[n.end=s]=n):(n=h[s])?(e=d[f])?(delete h[n.start],
delete d[e.end],n===e?(n.ring.push(c),i(n.ring)):h[e.start]=d[n.end]={
start:e.start,end:n.end,ring:e.ring.concat(n.ring)
}):(delete h[n.start],n.ring.unshift(r),h[n.start=f]=n):h[f]=d[s]={start:f,
end:s,ring:[r,c]}}ta[s<<3].forEach(p)}(e,i,(function(t){r(t,e,i),function(t){
for(var n=0,e=t.length,r=t[e-1][1]*t[0][0]-t[e-1][0]*t[0][1];++n<e;)r+=t[n-1][1]*t[n][0]-t[n-1][0]*t[n][1]
;return r}(t)>0?o.push([t]):u.push(t)})),u.forEach((function(t){
for(var n,e=0,r=o.length;e<r;++e)if(-1!==$o((n=o[e])[0],t))return void n.push(t)
})),{type:"MultiPolygon",value:i,coordinates:o}}function a(n){
return 2*n[0]+n[1]*(t+1)*4}function u(e,r,i){e.forEach((function(e){
var o,a=e[0],u=e[1],c=0|a,f=0|u,s=r[f*t+c]
;a>0&&a<t&&c===a&&(o=r[f*t+c-1],e[0]=a+(i-o)/(s-o)-.5),
u>0&&u<n&&f===u&&(o=r[(f-1)*t+c],e[1]=u+(i-o)/(s-o)-.5)}))}
return i.contour=o,i.size=function(e){if(!arguments.length)return[t,n]
;var r=Math.ceil(e[0]),o=Math.ceil(e[1])
;if(!(r>0&&o>0))throw new Error("invalid size");return t=r,n=o,i
},i.thresholds=function(t){
return arguments.length?(e="function"==typeof t?t:Array.isArray(t)?Zo(Go.call(t)):Zo(t),
i):e},i.smooth=function(t){return arguments.length?(r=t?u:Jo,i):r===u},i}
function ea(t,n,e){
for(var r=t.width,i=t.height,o=1+(e<<1),a=0;a<i;++a)for(var u=0,c=0;u<r+e;++u)u<r&&(c+=t.data[u+a*r]),
u>=e&&(u>=o&&(c-=t.data[u-o+a*r]),n.data[u-e+a*r]=c/Math.min(u+1,r-1+o-u,o))}
function ra(t,n,e){
for(var r=t.width,i=t.height,o=1+(e<<1),a=0;a<r;++a)for(var u=0,c=0;u<i+e;++u)u<i&&(c+=t.data[a+u*r]),
u>=e&&(u>=o&&(c-=t.data[a+(u-o)*r]),n.data[a+(u-e)*r]=c/Math.min(u+1,i-1+o-u,o))
}function ia(t){return t[0]}function oa(t){return t[1]}function aa(){return 1}
var ua={},ca={};function fa(t){
return new Function("d","return {"+t.map((function(t,n){
return JSON.stringify(t)+": d["+n+'] || ""'})).join(",")+"}")}function sa(t){
var n=Object.create(null),e=[];return t.forEach((function(t){
for(var r in t)r in n||e.push(n[r]=r)})),e}function la(t,n){
var e=t+"",r=e.length;return r<n?new Array(n-r+1).join(0)+e:e}function ha(t){
var n=t.getUTCHours(),e=t.getUTCMinutes(),r=t.getUTCSeconds(),i=t.getUTCMilliseconds()
;return isNaN(t)?"Invalid Date":function(t){
return t<0?"-"+la(-t,6):t>9999?"+"+la(t,6):la(t,4)
}(t.getUTCFullYear())+"-"+la(t.getUTCMonth()+1,2)+"-"+la(t.getUTCDate(),2)+(i?"T"+la(n,2)+":"+la(e,2)+":"+la(r,2)+"."+la(i,3)+"Z":r?"T"+la(n,2)+":"+la(e,2)+":"+la(r,2)+"Z":e||n?"T"+la(n,2)+":"+la(e,2)+"Z":"")
}function da(t){var n=new RegExp('["'+t+"\n\r]"),e=t.charCodeAt(0)
;function r(t,n){var r,i=[],o=t.length,a=0,u=0,c=o<=0,f=!1;function s(){
if(c)return ca;if(f)return f=!1,ua;var n,r,i=a;if(34===t.charCodeAt(i)){
for(;a++<o&&34!==t.charCodeAt(a)||34===t.charCodeAt(++a););
return(n=a)>=o?c=!0:10===(r=t.charCodeAt(a++))?f=!0:13===r&&(f=!0,
10===t.charCodeAt(a)&&++a),t.slice(i+1,n-1).replace(/""/g,'"')}for(;a<o;){
if(10===(r=t.charCodeAt(n=a++)))f=!0;else if(13===r)f=!0,
10===t.charCodeAt(a)&&++a;else if(r!==e)continue;return t.slice(i,n)}
return c=!0,t.slice(i,o)}
for(10===t.charCodeAt(o-1)&&--o,13===t.charCodeAt(o-1)&&--o;(r=s())!==ca;){
for(var l=[];r!==ua&&r!==ca;)l.push(r),r=s();n&&null==(l=n(l,u++))||i.push(l)}
return i}function i(n,e){return n.map((function(n){return e.map((function(t){
return a(n[t])})).join(t)}))}function o(n){return n.map(a).join(t)}
function a(t){
return null==t?"":t instanceof Date?ha(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t
}return{parse:function(t,n){var e,i,o=r(t,(function(t,r){if(e)return e(t,r-1)
;i=t,e=n?function(t,n){var e=fa(t);return function(r,i){return n(e(r),i,t)}
}(t,n):fa(t)}));return o.columns=i||[],o},parseRows:r,format:function(n,e){
return null==e&&(e=sa(n)),[e.map(a).join(t)].concat(i(n,e)).join("\n")},
formatBody:function(t,n){return null==n&&(n=sa(t)),i(t,n).join("\n")},
formatRows:function(t){return t.map(o).join("\n")},formatRow:o,formatValue:a}}
var pa=da(","),va=pa.parse,ga=pa.parseRows,ya=pa.format,_a=pa.formatBody,ba=pa.formatRows,ma=pa.formatRow,xa=pa.formatValue,wa=da("\t"),Ma=wa.parse,Na=wa.parseRows,Ta=wa.format,Aa=wa.formatBody,Sa=wa.formatRows,ka=wa.formatRow,Ea=wa.formatValue
;var Ca=new Date("2019-01-01T00:00").getHours()||new Date("2019-07-01T00:00").getHours()
;function Pa(t){if(!t.ok)throw new Error(t.status+" "+t.statusText)
;return t.blob()}function za(t){
if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.arrayBuffer()}
function Ra(t){if(!t.ok)throw new Error(t.status+" "+t.statusText)
;return t.text()}function Da(t,n){return fetch(t,n).then(Ra)}function qa(t){
return function(n,e,r){
return 2===arguments.length&&"function"==typeof e&&(r=e,e=void 0),
Da(n,e).then((function(n){return t(n,r)}))}}var La=qa(va),Ua=qa(Ma)
;function Oa(t){if(!t.ok)throw new Error(t.status+" "+t.statusText)
;return t.json()}function Ba(t){return function(n,e){
return Da(n,e).then((function(n){return(new DOMParser).parseFromString(n,t)}))}}
var Fa=Ba("application/xml"),Ya=Ba("text/html"),Ia=Ba("image/svg+xml")
;function Ha(t){return function(){return t}}function ja(){
return 1e-6*(Math.random()-.5)}function Xa(t,n,e,r){
if(isNaN(n)||isNaN(e))return t;var i,o,a,u,c,f,s,l,h,d=t._root,p={data:r
},v=t._x0,g=t._y0,y=t._x1,_=t._y1;if(!d)return t._root=p,t
;for(;d.length;)if((f=n>=(o=(v+y)/2))?v=o:y=o,
(s=e>=(a=(g+_)/2))?g=a:_=a,i=d,!(d=d[l=s<<1|f]))return i[l]=p,t
;if(u=+t._x.call(null,d.data),
c=+t._y.call(null,d.data),n===u&&e===c)return p.next=d,i?i[l]=p:t._root=p,t;do{
i=i?i[l]=new Array(4):t._root=new Array(4),
(f=n>=(o=(v+y)/2))?v=o:y=o,(s=e>=(a=(g+_)/2))?g=a:_=a
}while((l=s<<1|f)==(h=(c>=a)<<1|u>=o));return i[h]=d,i[l]=p,t}
function Va(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i}
function Ga(t){return t[0]}function Wa(t){return t[1]}function Za(t,n,e){
var r=new $a(null==n?Ga:n,null==e?Wa:e,NaN,NaN,NaN,NaN)
;return null==t?r:r.addAll(t)}function $a(t,n,e,r,i,o){
this._x=t,this._y=n,this._x0=e,
this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function Qa(t){for(var n={
data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}
var Ka=Za.prototype=$a.prototype;function Ja(t){return t.x+t.vx}function tu(t){
return t.y+t.vy}function nu(t){return t.index}function eu(t,n){var e=t.get(n)
;if(!e)throw new Error("missing: "+n);return e}function ru(t){return t.x}
function iu(t){return t.y}Ka.copy=function(){
var t,n,e=new $a(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root
;if(!r)return e;if(!r.length)return e._root=Qa(r),e;for(t=[{source:r,
target:e._root=new Array(4)
}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,
target:r.target[i]=new Array(4)}):r.target[i]=Qa(n));return e
},Ka.add=function(t){var n=+this._x.call(null,t),e=+this._y.call(null,t)
;return Xa(this.cover(n,e),n,e,t)},Ka.addAll=function(t){
var n,e,r,i,o=t.length,a=new Array(o),u=new Array(o),c=1/0,f=1/0,s=-1/0,l=-1/0
;for(e=0;e<o;++e)isNaN(r=+this._x.call(null,n=t[e]))||isNaN(i=+this._y.call(null,n))||(a[e]=r,
u[e]=i,r<c&&(c=r),r>s&&(s=r),i<f&&(f=i),i>l&&(l=i));if(c>s||f>l)return this
;for(this.cover(c,f).cover(s,l),e=0;e<o;++e)Xa(this,a[e],u[e],t[e]);return this
},Ka.cover=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this
;var e=this._x0,r=this._y0,i=this._x1,o=this._y1
;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{
for(var a,u,c=i-e,f=this._root;e>t||t>=i||r>n||n>=o;)switch(u=(n<r)<<1|t<e,
(a=new Array(4))[u]=f,f=a,c*=2,u){case 0:i=e+c,o=r+c;break;case 1:e=i-c,o=r+c
;break;case 2:i=e+c,r=o-c;break;case 3:e=i-c,r=o-c}
this._root&&this._root.length&&(this._root=f)}
return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this},Ka.data=function(){
var t=[];return this.visit((function(n){if(!n.length)do{t.push(n.data)
}while(n=n.next)})),t},Ka.extent=function(t){
return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]
},Ka.find=function(t,n,e){
var r,i,o,a,u,c,f,s=this._x0,l=this._y0,h=this._x1,d=this._y1,p=[],v=this._root
;for(v&&p.push(new Va(v,s,l,h,d)),
null==e?e=1/0:(s=t-e,l=n-e,h=t+e,d=n+e,e*=e);c=p.pop();)if(!(!(v=c.node)||(i=c.x0)>h||(o=c.y0)>d||(a=c.x1)<s||(u=c.y1)<l))if(v.length){
var g=(i+a)/2,y=(o+u)/2
;p.push(new Va(v[3],g,y,a,u),new Va(v[2],i,y,g,u),new Va(v[1],g,o,a,y),new Va(v[0],i,o,g,y)),
(f=(n>=y)<<1|t>=g)&&(c=p[p.length-1],
p[p.length-1]=p[p.length-1-f],p[p.length-1-f]=c)}else{
var _=t-+this._x.call(null,v.data),b=n-+this._y.call(null,v.data),m=_*_+b*b
;if(m<e){var x=Math.sqrt(e=m);s=t-x,l=n-x,h=t+x,d=n+x,r=v.data}}return r
},Ka.remove=function(t){
if(isNaN(o=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this
;var n,e,r,i,o,a,u,c,f,s,l,h,d=this._root,p=this._x0,v=this._y0,g=this._x1,y=this._y1
;if(!d)return this;if(d.length)for(;;){
if((f=o>=(u=(p+g)/2))?p=u:g=u,(s=a>=(c=(v+y)/2))?v=c:y=c,
n=d,!(d=d[l=s<<1|f]))return this;if(!d.length)break
;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}
for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,
r?(i?r.next=i:delete r.next,
this):n?(i?n[l]=i:delete n[l],(d=n[0]||n[1]||n[2]||n[3])&&d===(n[3]||n[2]||n[1]||n[0])&&!d.length&&(e?e[h]=d:this._root=d),
this):(this._root=i,this)},Ka.removeAll=function(t){
for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this
},Ka.root=function(){return this._root},Ka.size=function(){var t=0
;return this.visit((function(n){if(!n.length)do{++t}while(n=n.next)})),t
},Ka.visit=function(t){var n,e,r,i,o,a,u=[],c=this._root
;for(c&&u.push(new Va(c,this._x0,this._y0,this._x1,this._y1));n=u.pop();)if(!t(c=n.node,r=n.x0,i=n.y0,o=n.x1,a=n.y1)&&c.length){
var f=(r+o)/2,s=(i+a)/2
;(e=c[3])&&u.push(new Va(e,f,s,o,a)),(e=c[2])&&u.push(new Va(e,r,s,f,a)),
(e=c[1])&&u.push(new Va(e,f,i,o,s)),(e=c[0])&&u.push(new Va(e,r,i,f,s))}
return this},Ka.visitAfter=function(t){var n,e=[],r=[]
;for(this._root&&e.push(new Va(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){
var i=n.node;if(i.length){var o,a=n.x0,u=n.y0,c=n.x1,f=n.y1,s=(a+c)/2,l=(u+f)/2
;(o=i[0])&&e.push(new Va(o,a,u,s,l)),
(o=i[1])&&e.push(new Va(o,s,u,c,l)),(o=i[2])&&e.push(new Va(o,a,l,s,f)),
(o=i[3])&&e.push(new Va(o,s,l,c,f))}r.push(n)}
for(;n=r.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},Ka.x=function(t){
return arguments.length?(this._x=t,this):this._x},Ka.y=function(t){
return arguments.length?(this._y=t,this):this._y}
;var ou=Math.PI*(3-Math.sqrt(5));function au(t,n){
if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null
;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}
function uu(t){return(t=au(Math.abs(t)))?t[1]:NaN}
var cu,fu=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i
;function su(t){if(!(n=fu.exec(t)))throw new Error("invalid format: "+t);var n
;return new lu({fill:n[1],align:n[2],sign:n[3],symbol:n[4],zero:n[5],width:n[6],
comma:n[7],precision:n[8]&&n[8].slice(1),trim:n[9],type:n[10]})}function lu(t){
this.fill=void 0===t.fill?" ":t.fill+"",
this.align=void 0===t.align?">":t.align+"",
this.sign=void 0===t.sign?"-":t.sign+"",
this.symbol=void 0===t.symbol?"":t.symbol+"",
this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,
this.comma=!!t.comma,
this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,
this.type=void 0===t.type?"":t.type+""}function hu(t,n){var e=au(t,n)
;if(!e)return t+"";var r=e[0],i=e[1]
;return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")
}su.prototype=lu.prototype,lu.prototype.toString=function(){
return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type
};var du={"%":function(t,n){return(100*t).toFixed(n)},b:function(t){
return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){
return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},
f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},
o:function(t){return Math.round(t).toString(8)},p:function(t,n){
return hu(100*t,n)},r:hu,s:function(t,n){var e=au(t,n);if(!e)return t+""
;var r=e[0],i=e[1],o=i-(cu=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=r.length
;return o===a?r:o>a?r+new Array(o-a+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+au(t,Math.max(0,n+o-1))[0]
},X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){
return Math.round(t).toString(16)}};function pu(t){return t}
var vu,gu=Array.prototype.map,yu=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"]
;function _u(t){
var n=void 0===t.grouping||void 0===t.thousands?pu:function(t,n){
return function(e,r){
for(var i=e.length,o=[],a=0,u=t[0],c=0;i>0&&u>0&&(c+u+1>r&&(u=Math.max(1,r-c)),
o.push(e.substring(i-=u,i+u)),!((c+=u+1)>r));)u=t[a=(a+1)%t.length]
;return o.reverse().join(n)}
}(gu.call(t.grouping,Number),t.thousands+""),e=void 0===t.currency?"":t.currency[0]+"",r=void 0===t.currency?"":t.currency[1]+"",i=void 0===t.decimal?".":t.decimal+"",o=void 0===t.numerals?pu:function(t){
return function(n){return n.replace(/[0-9]/g,(function(n){return t[+n]}))}
}(gu.call(t.numerals,String)),a=void 0===t.percent?"%":t.percent+"",u=void 0===t.minus?"-":t.minus+"",c=void 0===t.nan?"NaN":t.nan+""
;function f(t){
var f=(t=su(t)).fill,s=t.align,l=t.sign,h=t.symbol,d=t.zero,p=t.width,v=t.comma,g=t.precision,y=t.trim,_=t.type
;"n"===_?(v=!0,
_="g"):du[_]||(void 0===g&&(g=12),y=!0,_="g"),(d||"0"===f&&"="===s)&&(d=!0,
f="0",s="=")
;var b="$"===h?e:"#"===h&&/[boxX]/.test(_)?"0"+_.toLowerCase():"",m="$"===h?r:/[%p]/.test(_)?a:"",x=du[_],w=/[defgprs%]/.test(_)
;function M(t){var e,r,a,h=b,M=m;if("c"===_)M=x(t)+M,t="";else{
var N=(t=+t)<0||1/t<0;if(t=isNaN(t)?c:x(Math.abs(t),g),y&&(t=function(t){
t:for(var n,e=t.length,r=1,i=-1;r<e;++r)switch(t[r]){case".":i=n=r;break
;case"0":0===i&&(i=r),n=r;break;default:if(!+t[r])break t;i>0&&(i=0)}
return i>0?t.slice(0,i)+t.slice(n+1):t
}(t)),N&&0==+t&&"+"!==l&&(N=!1),h=(N?"("===l?l:u:"-"===l||"("===l?"":l)+h,
M=("s"===_?yu[8+cu/3]:"")+M+(N&&"("===l?")":""),
w)for(e=-1,r=t.length;++e<r;)if(48>(a=t.charCodeAt(e))||a>57){
M=(46===a?i+t.slice(e+1):t.slice(e))+M,t=t.slice(0,e);break}}v&&!d&&(t=n(t,1/0))
;var T=h.length+t.length+M.length,A=T<p?new Array(p-T+1).join(f):""
;switch(v&&d&&(t=n(A+t,A.length?p-M.length:1/0),A=""),s){case"<":t=h+t+M+A;break
;case"=":t=h+A+t+M;break;case"^":t=A.slice(0,T=A.length>>1)+h+t+M+A.slice(T)
;break;default:t=A+h+t+M}return o(t)}
return g=void 0===g?6:/[gprs]/.test(_)?Math.max(1,Math.min(21,g)):Math.max(0,Math.min(20,g)),
M.toString=function(){return t+""},M}return{format:f,formatPrefix:function(t,n){
var e=f(((t=su(t)).type="f",
t)),r=3*Math.max(-8,Math.min(8,Math.floor(uu(n)/3))),i=Math.pow(10,-r),o=yu[8+r/3]
;return function(t){return e(i*t)+o}}}}function bu(n){
return vu=_u(n),t.format=vu.format,t.formatPrefix=vu.formatPrefix,vu}
function mu(t){return Math.max(0,-uu(Math.abs(t)))}function xu(t,n){
return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(uu(n)/3)))-uu(Math.abs(t)))
}function wu(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,uu(n)-uu(t))+1
}function Mu(){return new Nu}function Nu(){this.reset()}bu({decimal:".",
thousands:",",grouping:[3],currency:["$",""],minus:"-"}),Nu.prototype={
constructor:Nu,reset:function(){this.s=this.t=0},add:function(t){
Au(Tu,t,this.t),Au(this,Tu.s,this.s),this.s?this.t+=Tu.t:this.s=Tu.t},
valueOf:function(){return this.s}};var Tu=new Nu;function Au(t,n,e){
var r=t.s=n+e,i=r-n,o=r-i;t.t=n-o+(e-i)}
var Su=1e-6,ku=1e-12,Eu=Math.PI,Cu=Eu/2,Pu=Eu/4,zu=2*Eu,Ru=180/Eu,Du=Eu/180,qu=Math.abs,Lu=Math.atan,Uu=Math.atan2,Ou=Math.cos,Bu=Math.ceil,Fu=Math.exp,Yu=Math.log,Iu=Math.pow,Hu=Math.sin,ju=Math.sign||function(t){
return t>0?1:t<0?-1:0},Xu=Math.sqrt,Vu=Math.tan;function Gu(t){
return t>1?0:t<-1?Eu:Math.acos(t)}function Wu(t){
return t>1?Cu:t<-1?-Cu:Math.asin(t)}function Zu(t){return(t=Hu(t/2))*t}
function $u(){}function Qu(t,n){t&&Ju.hasOwnProperty(t.type)&&Ju[t.type](t,n)}
var Ku={Feature:function(t,n){Qu(t.geometry,n)},FeatureCollection:function(t,n){
for(var e=t.features,r=-1,i=e.length;++r<i;)Qu(e[r].geometry,n)}},Ju={
Sphere:function(t,n){n.sphere()},Point:function(t,n){
t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){
for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},
LineString:function(t,n){tc(t.coordinates,n,0)},MultiLineString:function(t,n){
for(var e=t.coordinates,r=-1,i=e.length;++r<i;)tc(e[r],n,0)},
Polygon:function(t,n){nc(t.coordinates,n)},MultiPolygon:function(t,n){
for(var e=t.coordinates,r=-1,i=e.length;++r<i;)nc(e[r],n)},
GeometryCollection:function(t,n){
for(var e=t.geometries,r=-1,i=e.length;++r<i;)Qu(e[r],n)}};function tc(t,n,e){
var r,i=-1,o=t.length-e;for(n.lineStart();++i<o;)r=t[i],n.point(r[0],r[1],r[2])
;n.lineEnd()}function nc(t,n){var e=-1,r=t.length
;for(n.polygonStart();++e<r;)tc(t[e],n,1);n.polygonEnd()}function ec(t,n){
t&&Ku.hasOwnProperty(t.type)?Ku[t.type](t,n):Qu(t,n)}
var rc,ic,oc,ac,uc,cc=Mu(),fc=Mu(),sc={point:$u,lineStart:$u,lineEnd:$u,
polygonStart:function(){cc.reset(),sc.lineStart=lc,sc.lineEnd=hc},
polygonEnd:function(){var t=+cc
;fc.add(t<0?zu+t:t),this.lineStart=this.lineEnd=this.point=$u},
sphere:function(){fc.add(zu)}};function lc(){sc.point=dc}function hc(){pc(rc,ic)
}function dc(t,n){sc.point=pc,rc=t,ic=n,oc=t*=Du,ac=Ou(n=(n*=Du)/2+Pu),uc=Hu(n)}
function pc(t,n){
var e=(t*=Du)-oc,r=e>=0?1:-1,i=r*e,o=Ou(n=(n*=Du)/2+Pu),a=Hu(n),u=uc*a,c=ac*o+u*Ou(i),f=u*r*Hu(i)
;cc.add(Uu(f,c)),oc=t,ac=o,uc=a}function vc(t){return[Uu(t[1],t[0]),Wu(t[2])]}
function gc(t){var n=t[0],e=t[1],r=Ou(e);return[r*Ou(n),r*Hu(n),Hu(e)]}
function yc(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function _c(t,n){
return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}
function bc(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function mc(t,n){
return[t[0]*n,t[1]*n,t[2]*n]}function xc(t){
var n=Xu(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}
var wc,Mc,Nc,Tc,Ac,Sc,kc,Ec,Cc,Pc,zc,Rc,Dc,qc,Lc,Uc,Oc,Bc,Fc,Yc,Ic,Hc,jc,Xc,Vc,Gc,Wc=Mu(),Zc={
point:$c,lineStart:Kc,lineEnd:Jc,polygonStart:function(){
Zc.point=tf,Zc.lineStart=nf,Zc.lineEnd=ef,Wc.reset(),sc.polygonStart()},
polygonEnd:function(){sc.polygonEnd(),Zc.point=$c,Zc.lineStart=Kc,Zc.lineEnd=Jc,
cc<0?(wc=-(Nc=180),Mc=-(Tc=90)):Wc>Su?Tc=90:Wc<-1e-6&&(Mc=-90),Pc[0]=wc,Pc[1]=Nc
},sphere:function(){wc=-(Nc=180),Mc=-(Tc=90)}};function $c(t,n){
Cc.push(Pc=[wc=t,Nc=t]),n<Mc&&(Mc=n),n>Tc&&(Tc=n)}function Qc(t,n){
var e=gc([t*Du,n*Du]);if(Ec){var r=_c(Ec,e),i=_c([r[1],-r[0],0],r);xc(i),i=vc(i)
;var o,a=t-Ac,u=a>0?1:-1,c=i[0]*Ru*u,f=qu(a)>180
;f^(u*Ac<c&&c<u*t)?(o=i[1]*Ru)>Tc&&(Tc=o):f^(u*Ac<(c=(c+360)%360-180)&&c<u*t)?(o=-i[1]*Ru)<Mc&&(Mc=o):(n<Mc&&(Mc=n),
n>Tc&&(Tc=n)),
f?t<Ac?rf(wc,t)>rf(wc,Nc)&&(Nc=t):rf(t,Nc)>rf(wc,Nc)&&(wc=t):Nc>=wc?(t<wc&&(wc=t),
t>Nc&&(Nc=t)):t>Ac?rf(wc,t)>rf(wc,Nc)&&(Nc=t):rf(t,Nc)>rf(wc,Nc)&&(wc=t)
}else Cc.push(Pc=[wc=t,Nc=t]);n<Mc&&(Mc=n),n>Tc&&(Tc=n),Ec=e,Ac=t}function Kc(){
Zc.point=Qc}function Jc(){Pc[0]=wc,Pc[1]=Nc,Zc.point=$c,Ec=null}
function tf(t,n){if(Ec){var e=t-Ac;Wc.add(qu(e)>180?e+(e>0?360:-360):e)
}else Sc=t,kc=n;sc.point(t,n),Qc(t,n)}function nf(){sc.lineStart()}
function ef(){
tf(Sc,kc),sc.lineEnd(),qu(Wc)>Su&&(wc=-(Nc=180)),Pc[0]=wc,Pc[1]=Nc,Ec=null}
function rf(t,n){return(n-=t)<0?n+360:n}function of(t,n){return t[0]-n[0]}
function af(t,n){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var uf={
sphere:$u,point:cf,lineStart:sf,lineEnd:df,polygonStart:function(){
uf.lineStart=pf,uf.lineEnd=vf},polygonEnd:function(){
uf.lineStart=sf,uf.lineEnd=df}};function cf(t,n){t*=Du;var e=Ou(n*=Du)
;ff(e*Ou(t),e*Hu(t),Hu(n))}function ff(t,n,e){
++zc,Dc+=(t-Dc)/zc,qc+=(n-qc)/zc,Lc+=(e-Lc)/zc}function sf(){uf.point=lf}
function lf(t,n){t*=Du;var e=Ou(n*=Du)
;Xc=e*Ou(t),Vc=e*Hu(t),Gc=Hu(n),uf.point=hf,ff(Xc,Vc,Gc)}function hf(t,n){t*=Du
;var e=Ou(n*=Du),r=e*Ou(t),i=e*Hu(t),o=Hu(n),a=Uu(Xu((a=Vc*o-Gc*i)*a+(a=Gc*r-Xc*o)*a+(a=Xc*i-Vc*r)*a),Xc*r+Vc*i+Gc*o)
;Rc+=a,Uc+=a*(Xc+(Xc=r)),Oc+=a*(Vc+(Vc=i)),Bc+=a*(Gc+(Gc=o)),ff(Xc,Vc,Gc)}
function df(){uf.point=cf}function pf(){uf.point=gf}function vf(){
yf(Hc,jc),uf.point=cf}function gf(t,n){Hc=t,jc=n,t*=Du,n*=Du,uf.point=yf
;var e=Ou(n);Xc=e*Ou(t),Vc=e*Hu(t),Gc=Hu(n),ff(Xc,Vc,Gc)}function yf(t,n){t*=Du
;var e=Ou(n*=Du),r=e*Ou(t),i=e*Hu(t),o=Hu(n),a=Vc*o-Gc*i,u=Gc*r-Xc*o,c=Xc*i-Vc*r,f=Xu(a*a+u*u+c*c),s=Wu(f),l=f&&-s/f
;Fc+=l*a,
Yc+=l*u,Ic+=l*c,Rc+=s,Uc+=s*(Xc+(Xc=r)),Oc+=s*(Vc+(Vc=i)),Bc+=s*(Gc+(Gc=o)),
ff(Xc,Vc,Gc)}function _f(t){return function(){return t}}function bf(t,n){
function e(e,r){return e=t(e,r),n(e[0],e[1])}
return t.invert&&n.invert&&(e.invert=function(e,r){
return(e=n.invert(e,r))&&t.invert(e[0],e[1])}),e}function mf(t,n){
return[qu(t)>Eu?t+Math.round(-t/zu)*zu:t,n]}function xf(t,n,e){
return(t%=zu)?n||e?bf(Mf(t),Nf(n,e)):Mf(t):n||e?Nf(n,e):mf}function wf(t){
return function(n,e){return[(n+=t)>Eu?n-zu:n<-Eu?n+zu:n,e]}}function Mf(t){
var n=wf(t);return n.invert=wf(-t),n}function Nf(t,n){
var e=Ou(t),r=Hu(t),i=Ou(n),o=Hu(n);function a(t,n){
var a=Ou(n),u=Ou(t)*a,c=Hu(t)*a,f=Hu(n),s=f*e+u*r
;return[Uu(c*i-s*o,u*e-f*r),Wu(s*i+c*o)]}return a.invert=function(t,n){
var a=Ou(n),u=Ou(t)*a,c=Hu(t)*a,f=Hu(n),s=f*i-c*o
;return[Uu(c*i+f*o,u*e+s*r),Wu(s*e-u*r)]},a}function Tf(t){function n(n){
return(n=t(n[0]*Du,n[1]*Du))[0]*=Ru,n[1]*=Ru,n}
return t=xf(t[0]*Du,t[1]*Du,t.length>2?t[2]*Du:0),n.invert=function(n){
return(n=t.invert(n[0]*Du,n[1]*Du))[0]*=Ru,n[1]*=Ru,n},n}
function Af(t,n,e,r,i,o){if(e){var a=Ou(n),u=Hu(n),c=r*e
;null==i?(i=n+r*zu,o=n-c/2):(i=Sf(a,i),o=Sf(a,o),(r>0?i<o:i>o)&&(i+=r*zu))
;for(var f,s=i;r>0?s>o:s<o;s-=c)f=vc([a,-u*Ou(s),-u*Hu(s)]),t.point(f[0],f[1])}}
function Sf(t,n){(n=gc(n))[0]-=t,xc(n);var e=Gu(-n[1])
;return((-n[2]<0?-e:e)+zu-Su)%zu}function kf(){var t,n=[];return{
point:function(n,e){t.push([n,e])},lineStart:function(){n.push(t=[])},
lineEnd:$u,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},
result:function(){var e=n;return n=[],t=null,e}}}function Ef(t,n){
return qu(t[0]-n[0])<Su&&qu(t[1]-n[1])<Su}function Cf(t,n,e,r){
this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}
function Pf(t,n,e,r,i){var o,a,u=[],c=[];if(t.forEach((function(t){
if(!((n=t.length-1)<=0)){var n,e,r=t[0],a=t[n];if(Ef(r,a)){
for(i.lineStart(),o=0;o<n;++o)i.point((r=t[o])[0],r[1]);i.lineEnd()
}else u.push(e=new Cf(r,t,null,!0)),
c.push(e.o=new Cf(r,null,e,!1)),u.push(e=new Cf(a,t,null,!1)),
c.push(e.o=new Cf(a,null,e,!0))}})),u.length){
for(c.sort(n),zf(u),zf(c),o=0,a=c.length;o<a;++o)c[o].e=e=!e
;for(var f,s,l=u[0];;){for(var h=l,d=!0;h.v;)if((h=h.n)===l)return
;f=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){
if(d)for(o=0,a=f.length;o<a;++o)i.point((s=f[o])[0],s[1]);else r(h.x,h.n.x,1,i)
;h=h.n}else{
if(d)for(f=h.p.z,o=f.length-1;o>=0;--o)i.point((s=f[o])[0],s[1]);else r(h.x,h.p.x,-1,i)
;h=h.p}f=(h=h.o).z,d=!d}while(!h.v);i.lineEnd()}}}function zf(t){if(n=t.length){
for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}
mf.invert=mf;var Rf=Mu();function Df(t){
return qu(t[0])<=Eu?t[0]:ju(t[0])*((qu(t[0])+Eu)%zu-Eu)}function qf(t,n){
var e=Df(n),r=n[1],i=Hu(r),o=[Hu(e),-Ou(e),0],a=0,u=0
;Rf.reset(),1===i?r=Cu+Su:-1===i&&(r=-Cu-Su)
;for(var c=0,f=t.length;c<f;++c)if(l=(s=t[c]).length)for(var s,l,h=s[l-1],d=Df(h),p=h[1]/2+Pu,v=Hu(p),g=Ou(p),y=0;y<l;++y,
d=b,v=x,g=w,h=_){
var _=s[y],b=Df(_),m=_[1]/2+Pu,x=Hu(m),w=Ou(m),M=b-d,N=M>=0?1:-1,T=N*M,A=T>Eu,S=v*x
;if(Rf.add(Uu(S*N*Hu(T),g*w+S*Ou(T))),a+=A?M+N*zu:M,A^d>=e^b>=e){
var k=_c(gc(h),gc(_));xc(k);var E=_c(o,k);xc(E);var C=(A^M>=0?-1:1)*Wu(E[2])
;(r>C||r===C&&(k[0]||k[1]))&&(u+=A^M>=0?1:-1)}}
return(a<-1e-6||a<Su&&Rf<-1e-6)^1&u}function Lf(t,n,e,r){return function(i){
var o,a,u,c=n(i),f=kf(),s=n(f),l=!1,h={point:d,lineStart:v,lineEnd:g,
polygonStart:function(){h.point=y,h.lineStart=_,h.lineEnd=b,a=[],o=[]},
polygonEnd:function(){h.point=d,h.lineStart=v,h.lineEnd=g,a=A(a);var t=qf(o,r)
;a.length?(l||(i.polygonStart(),
l=!0),Pf(a,Of,t,e,i)):t&&(l||(i.polygonStart(),l=!0),
i.lineStart(),e(null,null,1,i),i.lineEnd()),l&&(i.polygonEnd(),l=!1),a=o=null},
sphere:function(){
i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}}
;function d(n,e){t(n,e)&&i.point(n,e)}function p(t,n){c.point(t,n)}function v(){
h.point=p,c.lineStart()}function g(){h.point=d,c.lineEnd()}function y(t,n){
u.push([t,n]),s.point(t,n)}function _(){s.lineStart(),u=[]}function b(){
y(u[0][0],u[0][1]),s.lineEnd();var t,n,e,r,c=s.clean(),h=f.result(),d=h.length
;if(u.pop(),o.push(u),u=null,d)if(1&c){if((n=(e=h[0]).length-1)>0){
for(l||(i.polygonStart(),
l=!0),i.lineStart(),t=0;t<n;++t)i.point((r=e[t])[0],r[1]);i.lineEnd()}
}else d>1&&2&c&&h.push(h.pop().concat(h.shift())),a.push(h.filter(Uf))}return h}
}function Uf(t){return t.length>1}function Of(t,n){
return((t=t.x)[0]<0?t[1]-Cu-Su:Cu-t[1])-((n=n.x)[0]<0?n[1]-Cu-Su:Cu-n[1])}
var Bf=Lf((function(){return!0}),(function(t){var n,e=NaN,r=NaN,i=NaN;return{
lineStart:function(){t.lineStart(),n=1},point:function(o,a){
var u=o>0?Eu:-Eu,c=qu(o-e)
;qu(c-Eu)<Su?(t.point(e,r=(r+a)/2>0?Cu:-Cu),t.point(i,r),
t.lineEnd(),t.lineStart(),
t.point(u,r),t.point(o,r),n=0):i!==u&&c>=Eu&&(qu(e-i)<Su&&(e-=i*Su),
qu(o-u)<Su&&(o-=u*Su),r=function(t,n,e,r){var i,o,a=Hu(t-e)
;return qu(a)>Su?Lu((Hu(n)*(o=Ou(r))*Hu(e)-Hu(r)*(i=Ou(n))*Hu(t))/(i*o*a)):(n+r)/2
}(e,r,o,a),
t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),n=0),t.point(e=o,r=a),i=u},
lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}
}),(function(t,n,e,r){var i
;if(null==t)i=e*Cu,r.point(-Eu,i),r.point(0,i),r.point(Eu,i),
r.point(Eu,0),r.point(Eu,-i),
r.point(0,-i),r.point(-Eu,-i),r.point(-Eu,0),r.point(-Eu,i);else if(qu(t[0]-n[0])>Su){
var o=t[0]<n[0]?Eu:-Eu;i=e*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)
}else r.point(n[0],n[1])}),[-Eu,-Cu]);function Ff(t){
var n=Ou(t),e=6*Du,r=n>0,i=qu(n)>Su;function o(t,e){return Ou(t)*Ou(e)>n}
function a(t,e,r){var i=[1,0,0],o=_c(gc(t),gc(e)),a=yc(o,o),u=o[0],c=a-u*u
;if(!c)return!r&&t;var f=n*a/c,s=-n*u/c,l=_c(i,o),h=mc(i,f);bc(h,mc(o,s))
;var d=l,p=yc(h,d),v=yc(d,d),g=p*p-v*(yc(h,h)-1);if(!(g<0)){
var y=Xu(g),_=mc(d,(-p-y)/v);if(bc(_,h),_=vc(_),!r)return _
;var b,m=t[0],x=e[0],w=t[1],M=e[1];x<m&&(b=m,m=x,x=b);var N=x-m,T=qu(N-Eu)<Su
;if(!T&&M<w&&(b=w,
w=M,M=b),T||N<Su?T?w+M>0^_[1]<(qu(_[0]-m)<Su?w:M):w<=_[1]&&_[1]<=M:N>Eu^(m<=_[0]&&_[0]<=x)){
var A=mc(d,(-p+y)/v);return bc(A,h),[_,vc(A)]}}}function u(n,e){
var i=r?t:Eu-t,o=0;return n<-i?o|=1:n>i&&(o|=2),e<-i?o|=4:e>i&&(o|=8),o}
return Lf(o,(function(t){var n,e,c,f,s;return{lineStart:function(){f=c=!1,s=1},
point:function(l,h){
var d,p=[l,h],v=o(l,h),g=r?v?0:u(l,h):v?u(l+(l<0?Eu:-Eu),h):0
;if(!n&&(f=c=v)&&t.lineStart(),
v!==c&&(!(d=a(n,p))||Ef(n,d)||Ef(p,d))&&(p[0]+=Su,
p[1]+=Su,v=o(p[0],p[1])),v!==c)s=0,
v?(t.lineStart(),d=a(p,n),t.point(d[0],d[1])):(d=a(n,p),
t.point(d[0],d[1]),t.lineEnd()),n=d;else if(i&&n&&r^v){var y
;g&e||!(y=a(p,n,!0))||(s=0,
r?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),
t.lineEnd()):(t.point(y[1][0],y[1][1]),
t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1])))}
!v||n&&Ef(n,p)||t.point(p[0],p[1]),n=p,c=v,e=g},lineEnd:function(){
c&&t.lineEnd(),n=null},clean:function(){return s|(f&&c)<<1}}
}),(function(n,r,i,o){Af(o,t,e,i,n,r)}),r?[0,-t]:[-Eu,t-Eu])}var Yf=1e9,If=-Yf
;function Hf(t,n,e,r){function i(i,o){return t<=i&&i<=e&&n<=o&&o<=r}
function o(i,o,u,f){var s=0,l=0
;if(null==i||(s=a(i,u))!==(l=a(o,u))||c(i,o)<0^u>0)do{
f.point(0===s||3===s?t:e,s>1?r:n)
}while((s=(s+u+4)%4)!==l);else f.point(o[0],o[1])}function a(r,i){
return qu(r[0]-t)<Su?i>0?0:3:qu(r[0]-e)<Su?i>0?2:1:qu(r[1]-n)<Su?i>0?1:0:i>0?3:2
}function u(t,n){return c(t.x,n.x)}function c(t,n){var e=a(t,1),r=a(n,1)
;return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}
return function(a){var c,f,s,l,h,d,p,v,g,y,_,b=a,m=kf(),x={point:w,
lineStart:function(){x.point=M,f&&f.push(s=[]);y=!0,g=!1,p=v=NaN},
lineEnd:function(){c&&(M(l,h),d&&g&&m.rejoin(),c.push(m.result()))
;x.point=w,g&&b.lineEnd()},polygonStart:function(){b=m,c=[],f=[],_=!0},
polygonEnd:function(){var n=function(){
for(var n=0,e=0,i=f.length;e<i;++e)for(var o,a,u=f[e],c=1,s=u.length,l=u[0],h=l[0],d=l[1];c<s;++c)o=h,
a=d,
h=(l=u[c])[0],d=l[1],a<=r?d>r&&(h-o)*(r-a)>(d-a)*(t-o)&&++n:d<=r&&(h-o)*(r-a)<(d-a)*(t-o)&&--n
;return n}(),e=_&&n,i=(c=A(c)).length
;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),
o(null,null,1,a),a.lineEnd()),i&&Pf(c,u,n,o,a),a.polygonEnd());b=a,c=f=s=null}}
;function w(t,n){i(t,n)&&b.point(t,n)}function M(o,a){var u=i(o,a)
;if(f&&s.push([o,a]),
y)l=o,h=a,d=u,y=!1,u&&(b.lineStart(),b.point(o,a));else if(u&&g)b.point(o,a);else{
var c=[p=Math.max(If,Math.min(Yf,p)),v=Math.max(If,Math.min(Yf,v))],m=[o=Math.max(If,Math.min(Yf,o)),a=Math.max(If,Math.min(Yf,a))]
;!function(t,n,e,r,i,o){var a,u=t[0],c=t[1],f=0,s=1,l=n[0]-u,h=n[1]-c
;if(a=e-u,l||!(a>0)){if(a/=l,l<0){if(a<f)return;a<s&&(s=a)}else if(l>0){
if(a>s)return;a>f&&(f=a)}if(a=i-u,l||!(a<0)){if(a/=l,l<0){if(a>s)return
;a>f&&(f=a)}else if(l>0){if(a<f)return;a<s&&(s=a)}if(a=r-c,h||!(a>0)){
if(a/=h,h<0){if(a<f)return;a<s&&(s=a)}else if(h>0){if(a>s)return;a>f&&(f=a)}
if(a=o-c,h||!(a<0)){if(a/=h,h<0){if(a>s)return;a>f&&(f=a)}else if(h>0){
if(a<f)return;a<s&&(s=a)}
return f>0&&(t[0]=u+f*l,t[1]=c+f*h),s<1&&(n[0]=u+s*l,n[1]=c+s*h),!0}}}}
}(c,m,t,n,e,r)?u&&(b.lineStart(),
b.point(o,a),_=!1):(g||(b.lineStart(),b.point(c[0],c[1])),
b.point(m[0],m[1]),u||b.lineEnd(),_=!1)}p=o,v=a,g=u}return x}}
var jf,Xf,Vf,Gf=Mu(),Wf={sphere:$u,point:$u,lineStart:function(){
Wf.point=$f,Wf.lineEnd=Zf},lineEnd:$u,polygonStart:$u,polygonEnd:$u}
;function Zf(){Wf.point=Wf.lineEnd=$u}function $f(t,n){
jf=t*=Du,Xf=Hu(n*=Du),Vf=Ou(n),Wf.point=Qf}function Qf(t,n){t*=Du
;var e=Hu(n*=Du),r=Ou(n),i=qu(t-jf),o=Ou(i),a=r*Hu(i),u=Vf*e-Xf*r*o,c=Xf*e+Vf*r*o
;Gf.add(Uu(Xu(a*a+u*u),c)),jf=t,Xf=e,Vf=r}function Kf(t){
return Gf.reset(),ec(t,Wf),+Gf}var Jf=[null,null],ts={type:"LineString",
coordinates:Jf};function ns(t,n){return Jf[0]=t,Jf[1]=n,Kf(ts)}var es={
Feature:function(t,n){return is(t.geometry,n)},FeatureCollection:function(t,n){
for(var e=t.features,r=-1,i=e.length;++r<i;)if(is(e[r].geometry,n))return!0
;return!1}},rs={Sphere:function(){return!0},Point:function(t,n){
return os(t.coordinates,n)},MultiPoint:function(t,n){
for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(os(e[r],n))return!0;return!1},
LineString:function(t,n){return as(t.coordinates,n)},
MultiLineString:function(t,n){
for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(as(e[r],n))return!0;return!1},
Polygon:function(t,n){return us(t.coordinates,n)},MultiPolygon:function(t,n){
for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(us(e[r],n))return!0;return!1},
GeometryCollection:function(t,n){
for(var e=t.geometries,r=-1,i=e.length;++r<i;)if(is(e[r],n))return!0;return!1}}
;function is(t,n){return!(!t||!rs.hasOwnProperty(t.type))&&rs[t.type](t,n)}
function os(t,n){return 0===ns(t,n)}function as(t,n){
for(var e,r,i,o=0,a=t.length;o<a;o++){if(0===(r=ns(t[o],n)))return!0
;if(o>0&&(i=ns(t[o],t[o-1]))>0&&e<=i&&r<=i&&(e+r-i)*(1-Math.pow((e-r)/i,2))<ku*i)return!0
;e=r}return!1}function us(t,n){return!!qf(t.map(cs),fs(n))}function cs(t){
return(t=t.map(fs)).pop(),t}function fs(t){return[t[0]*Du,t[1]*Du]}
function ss(t,n,e){var r=g(t,n-Su,e).concat(n);return function(t){
return r.map((function(n){return[t,n]}))}}function ls(t,n,e){
var r=g(t,n-Su,e).concat(n);return function(t){return r.map((function(n){
return[n,t]}))}}function hs(){
var t,n,e,r,i,o,a,u,c,f,s,l,h=10,d=h,p=90,v=360,y=2.5;function _(){return{
type:"MultiLineString",coordinates:b()}}function b(){
return g(Bu(r/p)*p,e,p).map(s).concat(g(Bu(u/v)*v,a,v).map(l)).concat(g(Bu(n/h)*h,t,h).filter((function(t){
return qu(t%p)>Su})).map(c)).concat(g(Bu(o/d)*d,i,d).filter((function(t){
return qu(t%v)>Su})).map(f))}return _.lines=function(){
return b().map((function(t){return{type:"LineString",coordinates:t}}))
},_.outline=function(){return{type:"Polygon",
coordinates:[s(r).concat(l(a).slice(1),s(e).reverse().slice(1),l(u).reverse().slice(1))]
}},_.extent=function(t){
return arguments.length?_.extentMajor(t).extentMinor(t):_.extentMinor()
},_.extentMajor=function(t){
return arguments.length?(r=+t[0][0],e=+t[1][0],u=+t[0][1],
a=+t[1][1],r>e&&(t=r,r=e,e=t),u>a&&(t=u,u=a,a=t),_.precision(y)):[[r,u],[e,a]]},
_.extentMinor=function(e){
return arguments.length?(n=+e[0][0],t=+e[1][0],o=+e[0][1],
i=+e[1][1],n>t&&(e=n,n=t,t=e),o>i&&(e=o,o=i,i=e),_.precision(y)):[[n,o],[t,i]]},
_.step=function(t){
return arguments.length?_.stepMajor(t).stepMinor(t):_.stepMinor()
},_.stepMajor=function(t){return arguments.length?(p=+t[0],v=+t[1],_):[p,v]
},_.stepMinor=function(t){return arguments.length?(h=+t[0],d=+t[1],_):[h,d]
},_.precision=function(h){
return arguments.length?(y=+h,c=ss(o,i,90),f=ls(n,t,y),s=ss(u,a,90),l=ls(r,e,y),
_):y
},_.extentMajor([[-180,-89.999999],[180,89.999999]]).extentMinor([[-180,-80.000001],[180,80.000001]])
}function ds(t){return t}var ps,vs,gs,ys,_s=Mu(),bs=Mu(),ms={point:$u,
lineStart:$u,lineEnd:$u,polygonStart:function(){ms.lineStart=xs,ms.lineEnd=Ns},
polygonEnd:function(){
ms.lineStart=ms.lineEnd=ms.point=$u,_s.add(qu(bs)),bs.reset()},
result:function(){var t=_s/2;return _s.reset(),t}};function xs(){ms.point=ws}
function ws(t,n){ms.point=Ms,ps=gs=t,vs=ys=n}function Ms(t,n){bs.add(ys*t-gs*n),
gs=t,ys=n}function Ns(){Ms(ps,vs)}var Ts=1/0,As=Ts,Ss=-Ts,ks=Ss,Es={
point:function(t,n){t<Ts&&(Ts=t);t>Ss&&(Ss=t);n<As&&(As=n);n>ks&&(ks=n)},
lineStart:$u,lineEnd:$u,polygonStart:$u,polygonEnd:$u,result:function(){
var t=[[Ts,As],[Ss,ks]];return Ss=ks=-(As=Ts=1/0),t}}
;var Cs,Ps,zs,Rs,Ds=0,qs=0,Ls=0,Us=0,Os=0,Bs=0,Fs=0,Ys=0,Is=0,Hs={point:js,
lineStart:Xs,lineEnd:Ws,polygonStart:function(){Hs.lineStart=Zs,Hs.lineEnd=$s},
polygonEnd:function(){Hs.point=js,Hs.lineStart=Xs,Hs.lineEnd=Ws},
result:function(){
var t=Is?[Fs/Is,Ys/Is]:Bs?[Us/Bs,Os/Bs]:Ls?[Ds/Ls,qs/Ls]:[NaN,NaN]
;return Ds=qs=Ls=Us=Os=Bs=Fs=Ys=Is=0,t}};function js(t,n){Ds+=t,qs+=n,++Ls}
function Xs(){Hs.point=Vs}function Vs(t,n){Hs.point=Gs,js(zs=t,Rs=n)}
function Gs(t,n){var e=t-zs,r=n-Rs,i=Xu(e*e+r*r)
;Us+=i*(zs+t)/2,Os+=i*(Rs+n)/2,Bs+=i,js(zs=t,Rs=n)}function Ws(){Hs.point=js}
function Zs(){Hs.point=Qs}function $s(){Ks(Cs,Ps)}function Qs(t,n){
Hs.point=Ks,js(Cs=zs=t,Ps=Rs=n)}function Ks(t,n){var e=t-zs,r=n-Rs,i=Xu(e*e+r*r)
;Us+=i*(zs+t)/2,
Os+=i*(Rs+n)/2,Bs+=i,Fs+=(i=Rs*t-zs*n)*(zs+t),Ys+=i*(Rs+n),Is+=3*i,js(zs=t,Rs=n)
}function Js(t){this._context=t}Js.prototype={_radius:4.5,
pointRadius:function(t){return this._radius=t,this},polygonStart:function(){
this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){
this._point=0},lineEnd:function(){
0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){
switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:
this._context.lineTo(t,n);break;default:
this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,zu)}
},result:$u};var tl,nl,el,rl,il,ol=Mu(),al={point:$u,lineStart:function(){
al.point=ul},lineEnd:function(){tl&&cl(nl,el),al.point=$u},
polygonStart:function(){tl=!0},polygonEnd:function(){tl=null},result:function(){
var t=+ol;return ol.reset(),t}};function ul(t,n){al.point=cl,nl=rl=t,el=il=n}
function cl(t,n){rl-=t,il-=n,ol.add(Xu(rl*rl+il*il)),rl=t,il=n}function fl(){
this._string=[]}function sl(t){
return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}
function ll(t){return function(n){var e=new hl;for(var r in t)e[r]=t[r]
;return e.stream=n,e}}function hl(){}function dl(t,n,e){
var r=t.clipExtent&&t.clipExtent()
;return t.scale(150).translate([0,0]),null!=r&&t.clipExtent(null),
ec(e,t.stream(Es)),n(Es.result()),null!=r&&t.clipExtent(r),t}function pl(t,n,e){
return dl(t,(function(e){
var r=n[1][0]-n[0][0],i=n[1][1]-n[0][1],o=Math.min(r/(e[1][0]-e[0][0]),i/(e[1][1]-e[0][1])),a=+n[0][0]+(r-o*(e[1][0]+e[0][0]))/2,u=+n[0][1]+(i-o*(e[1][1]+e[0][1]))/2
;t.scale(150*o).translate([a,u])}),e)}function vl(t,n,e){
return pl(t,[[0,0],n],e)}function gl(t,n,e){return dl(t,(function(e){
var r=+n,i=r/(e[1][0]-e[0][0]),o=(r-i*(e[1][0]+e[0][0]))/2,a=-i*e[0][1]
;t.scale(150*i).translate([o,a])}),e)}function yl(t,n,e){
return dl(t,(function(e){
var r=+n,i=r/(e[1][1]-e[0][1]),o=-i*e[0][0],a=(r-i*(e[1][1]+e[0][1]))/2
;t.scale(150*i).translate([o,a])}),e)}fl.prototype={_radius:4.5,_circle:sl(4.5),
pointRadius:function(t){
return(t=+t)!==this._radius&&(this._radius=t,this._circle=null),this},
polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},
lineStart:function(){this._point=0},lineEnd:function(){
0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){
switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break
;case 1:this._string.push("L",t,",",n);break;default:
null==this._circle&&(this._circle=sl(this._radius)),
this._string.push("M",t,",",n,this._circle)}},result:function(){
if(this._string.length){var t=this._string.join("");return this._string=[],t}
return null}},hl.prototype={constructor:hl,point:function(t,n){
this.stream.point(t,n)},sphere:function(){this.stream.sphere()},
lineStart:function(){this.stream.lineStart()},lineEnd:function(){
this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},
polygonEnd:function(){this.stream.polygonEnd()}};var _l=Ou(30*Du)
;function bl(t,n){return+n?function(t,n){
function e(r,i,o,a,u,c,f,s,l,h,d,p,v,g){var y=f-r,_=s-i,b=y*y+_*_
;if(b>4*n&&v--){
var m=a+h,x=u+d,w=c+p,M=Xu(m*m+x*x+w*w),N=Wu(w/=M),T=qu(qu(w)-1)<Su||qu(o-l)<Su?(o+l)/2:Uu(x,m),A=t(T,N),S=A[0],k=A[1],E=S-r,C=k-i,P=_*E-y*C
;(P*P/b>n||qu((y*E+_*C)/b-.5)>.3||a*h+u*d+c*p<_l)&&(e(r,i,o,a,u,c,S,k,T,m/=M,x/=M,w,v,g),
g.point(S,k),e(S,k,T,m,x,w,f,s,l,h,d,p,v,g))}}return function(n){
var r,i,o,a,u,c,f,s,l,h,d,p,v={point:g,lineStart:y,lineEnd:b,
polygonStart:function(){n.polygonStart(),v.lineStart=m},polygonEnd:function(){
n.polygonEnd(),v.lineStart=y}};function g(e,r){e=t(e,r),n.point(e[0],e[1])}
function y(){s=NaN,v.point=_,n.lineStart()}function _(r,i){
var o=gc([r,i]),a=t(r,i)
;e(s,l,f,h,d,p,s=a[0],l=a[1],f=r,h=o[0],d=o[1],p=o[2],16,n),n.point(s,l)}
function b(){v.point=g,n.lineEnd()}function m(){y(),v.point=x,v.lineEnd=w}
function x(t,n){_(r=t,n),i=s,o=l,a=h,u=d,c=p,v.point=_}function w(){
e(s,l,f,h,d,p,i,o,r,a,u,c,16,n),v.lineEnd=b,b()}return v}}(t,n):function(t){
return ll({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}(t)}
var ml=ll({point:function(t,n){this.stream.point(t*Du,n*Du)}})
;function xl(t,n,e,r,i){function o(o,a){return[n+t*(o*=r),e-t*(a*=i)]}
return o.invert=function(o,a){return[(o-n)/t*r,(e-a)/t*i]},o}
function wl(t,n,e,r,i,o){
var a=Ou(o),u=Hu(o),c=a*t,f=u*t,s=a/t,l=u/t,h=(u*e-a*n)/t,d=(u*n+a*e)/t
;function p(t,o){return[c*(t*=r)-f*(o*=i)+n,e-f*t-c*o]}
return p.invert=function(t,n){return[r*(s*t-l*n+h),i*(d-l*t-s*n)]},p}
function Ml(t){return Nl((function(){return t}))()}function Nl(t){
var n,e,r,i,o,a,u,c,f,s,l=150,h=480,d=250,p=0,v=0,g=0,y=0,_=0,b=0,m=1,x=1,w=null,M=Bf,N=null,T=ds,A=.5
;function S(t){return c(t[0]*Du,t[1]*Du)}function k(t){
return(t=c.invert(t[0],t[1]))&&[t[0]*Ru,t[1]*Ru]}function E(){
var t=wl(l,0,0,m,x,b).apply(null,n(p,v)),r=(b?wl:xl)(l,h-t[0],d-t[1],m,x,b)
;return e=xf(g,y,_),u=bf(n,r),c=bf(e,u),a=bl(u,A),C()}function C(){
return f=s=null,S}return S.stream=function(t){
return f&&s===t?f:f=ml(function(t){return ll({point:function(n,e){var r=t(n,e)
;return this.stream.point(r[0],r[1])}})}(e)(M(a(T(s=t)))))
},S.preclip=function(t){return arguments.length?(M=t,w=void 0,C()):M
},S.postclip=function(t){return arguments.length?(T=t,N=r=i=o=null,C()):T
},S.clipAngle=function(t){
return arguments.length?(M=+t?Ff(w=t*Du):(w=null,Bf),C()):w*Ru
},S.clipExtent=function(t){
return arguments.length?(T=null==t?(N=r=i=o=null,ds):Hf(N=+t[0][0],r=+t[0][1],i=+t[1][0],o=+t[1][1]),
C()):null==N?null:[[N,r],[i,o]]},S.scale=function(t){
return arguments.length?(l=+t,E()):l},S.translate=function(t){
return arguments.length?(h=+t[0],d=+t[1],E()):[h,d]},S.center=function(t){
return arguments.length?(p=t[0]%360*Du,v=t[1]%360*Du,E()):[p*Ru,v*Ru]
},S.rotate=function(t){
return arguments.length?(g=t[0]%360*Du,y=t[1]%360*Du,_=t.length>2?t[2]%360*Du:0,
E()):[g*Ru,y*Ru,_*Ru]},S.angle=function(t){
return arguments.length?(b=t%360*Du,E()):b*Ru},S.reflectX=function(t){
return arguments.length?(m=t?-1:1,E()):m<0},S.reflectY=function(t){
return arguments.length?(x=t?-1:1,E()):x<0},S.precision=function(t){
return arguments.length?(a=bl(u,A=t*t),C()):Xu(A)},S.fitExtent=function(t,n){
return pl(S,t,n)},S.fitSize=function(t,n){return vl(S,t,n)
},S.fitWidth=function(t,n){return gl(S,t,n)},S.fitHeight=function(t,n){
return yl(S,t,n)},function(){
return n=t.apply(this,arguments),S.invert=n.invert&&k,E()}}function Tl(t){
var n=0,e=Eu/3,r=Nl(t),i=r(n,e);return i.parallels=function(t){
return arguments.length?r(n=t[0]*Du,e=t[1]*Du):[n*Ru,e*Ru]},i}function Al(t,n){
var e=Hu(t),r=(e+Hu(n))/2;if(qu(r)<Su)return function(t){var n=Ou(t)
;function e(t,e){return[t*n,Hu(e)/n]}return e.invert=function(t,e){
return[t/n,Wu(e*n)]},e}(t);var i=1+e*(2*r-e),o=Xu(i)/r;function a(t,n){
var e=Xu(i-2*r*Hu(n))/r;return[e*Hu(t*=r),o-e*Ou(t)]}
return a.invert=function(t,n){var e=o-n,a=Uu(t,qu(e))*ju(e)
;return e*r<0&&(a-=Eu*ju(t)*ju(e)),[a/r,Wu((i-(t*t+e*e)*r*r)/(2*r))]},a}
function Sl(){return Tl(Al).scale(155.424).center([0,33.6442])}function kl(){
return Sl().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])
}function El(t){return function(n,e){var r=Ou(n),i=Ou(e),o=t(r*i)
;return[o*i*Hu(n),o*Hu(e)]}}function Cl(t){return function(n,e){
var r=Xu(n*n+e*e),i=t(r),o=Hu(i),a=Ou(i);return[Uu(n*o,r*a),Wu(r&&e*o/r)]}}
var Pl=El((function(t){return Xu(2/(1+t))}));Pl.invert=Cl((function(t){
return 2*Wu(t/2)}));var zl=El((function(t){return(t=Gu(t))&&t/Hu(t)}))
;function Rl(t,n){return[t,Yu(Vu((Cu+n)/2))]}function Dl(t){
var n,e,r,i=Ml(t),o=i.center,a=i.scale,u=i.translate,c=i.clipExtent,f=null
;function s(){var o=Eu*a(),u=i(Tf(i.rotate()).invert([0,0]))
;return c(null==f?[[u[0]-o,u[1]-o],[u[0]+o,u[1]+o]]:t===Rl?[[Math.max(u[0]-o,f),n],[Math.min(u[0]+o,e),r]]:[[f,Math.max(u[1]-o,n)],[e,Math.min(u[1]+o,r)]])
}return i.scale=function(t){return arguments.length?(a(t),s()):a()
},i.translate=function(t){return arguments.length?(u(t),s()):u()
},i.center=function(t){return arguments.length?(o(t),s()):o()
},i.clipExtent=function(t){
return arguments.length?(null==t?f=n=e=r=null:(f=+t[0][0],n=+t[0][1],e=+t[1][0],
r=+t[1][1]),s()):null==f?null:[[f,n],[e,r]]},s()}function ql(t){
return Vu((Cu+t)/2)}function Ll(t,n){
var e=Ou(t),r=t===n?Hu(t):Yu(e/Ou(n))/Yu(ql(n)/ql(t)),i=e*Iu(ql(t),r)/r
;if(!r)return Rl;function o(t,n){i>0?n<-Cu+Su&&(n=-Cu+Su):n>Cu-Su&&(n=Cu-Su)
;var e=i/Iu(ql(n),r);return[e*Hu(r*t),i-e*Ou(r*t)]}
return o.invert=function(t,n){var e=i-n,o=ju(r)*Xu(t*t+e*e),a=Uu(t,qu(e))*ju(e)
;return e*r<0&&(a-=Eu*ju(t)*ju(e)),[a/r,2*Lu(Iu(i/o,1/r))-Cu]},o}
function Ul(t,n){return[t,n]}function Ol(t,n){
var e=Ou(t),r=t===n?Hu(t):(e-Ou(n))/(n-t),i=e/r+t;if(qu(r)<Su)return Ul
;function o(t,n){var e=i-n,o=r*t;return[e*Hu(o),i-e*Ou(o)]}
return o.invert=function(t,n){var e=i-n,o=Uu(t,qu(e))*ju(e)
;return e*r<0&&(o-=Eu*ju(t)*ju(e)),[o/r,i-ju(r)*Xu(t*t+e*e)]},o}
zl.invert=Cl((function(t){return t})),Rl.invert=function(t,n){
return[t,2*Lu(Fu(n))-Cu]},Ul.invert=Ul
;var Bl=1.340264,Fl=-.081106,Yl=893e-6,Il=.003796,Hl=Xu(3)/2;function jl(t,n){
var e=Wu(Hl*Hu(n)),r=e*e,i=r*r*r
;return[t*Ou(e)/(Hl*(Bl+3*Fl*r+i*(7*Yl+9*Il*r))),e*(Bl+Fl*r+i*(Yl+Il*r))]}
function Xl(t,n){var e=Ou(n),r=Ou(t)*e;return[e*Hu(t)/r,Hu(n)/r]}
function Vl(t,n){var e=n*n,r=e*e
;return[t*(.8707-.131979*e+r*(r*(.003971*e-.001529*r)-.013791)),n*(1.007226+e*(.015085+r*(.028874*e-.044475-.005916*r)))]
}function Gl(t,n){return[Ou(n)*Hu(t),Hu(n)]}function Wl(t,n){
var e=Ou(n),r=1+Ou(t)*e;return[e*Hu(t)/r,Hu(n)/r]}function Zl(t,n){
return[Yu(Vu((Cu+n)/2)),-t]}function $l(t,n){return t.parent===n.parent?1:2}
function Ql(t,n){return t+n.x}function Kl(t,n){return Math.max(t,n.y)}
function Jl(t){var n=0,e=t.children,r=e&&e.length
;if(r)for(;--r>=0;)n+=e[r].value;else n=1;t.value=n}function th(t,n){
var e,r,i,o,a,u=new ih(t),c=+t.value&&(u.value=t.value),f=[u]
;for(null==n&&(n=nh);e=f.pop();)if(c&&(e.value=+e.data.value),
(i=n(e.data))&&(a=i.length))for(e.children=new Array(a),
o=a-1;o>=0;--o)f.push(r=e.children[o]=new ih(i[o])),r.parent=e,r.depth=e.depth+1
;return u.eachBefore(rh)}function nh(t){return t.children}function eh(t){
t.data=t.data.data}function rh(t){var n=0;do{t.height=n
}while((t=t.parent)&&t.height<++n)}function ih(t){
this.data=t,this.depth=this.height=0,this.parent=null}jl.invert=function(t,n){
for(var e,r=n,i=r*r,o=i*i*i,a=0;a<12&&(o=(i=(r-=e=(r*(Bl+Fl*i+o*(Yl+Il*i))-n)/(Bl+3*Fl*i+o*(7*Yl+9*Il*i)))*r)*i*i,
!(qu(e)<ku));++a);return[Hl*t*(Bl+3*Fl*i+o*(7*Yl+9*Il*i))/Ou(r),Wu(Hu(r)/Hl)]
},Xl.invert=Cl(Lu),Vl.invert=function(t,n){var e,r=n,i=25;do{var o=r*r,a=o*o
;r-=e=(r*(1.007226+o*(.015085+a*(.028874*o-.044475-.005916*a)))-n)/(1.007226+o*(.045255+a*(.259866*o-.311325-.005916*11*a)))
}while(qu(e)>Su&&--i>0)
;return[t/(.8707+(o=r*r)*(o*(o*o*o*(.003971-.001529*o)-.013791)-.131979)),r]
},Gl.invert=Cl(Wu),Wl.invert=Cl((function(t){return 2*Lu(t)
})),Zl.invert=function(t,n){return[-n,2*Lu(Fu(t))-Cu]
},ih.prototype=th.prototype={constructor:ih,count:function(){
return this.eachAfter(Jl)},each:function(t){var n,e,r,i,o=this,a=[o];do{
for(n=a.reverse(),
a=[];o=n.pop();)if(t(o),e=o.children)for(r=0,i=e.length;r<i;++r)a.push(e[r])
}while(a.length);return this},eachAfter:function(t){
for(var n,e,r,i=this,o=[i],a=[];i=o.pop();)if(a.push(i),
n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e]);for(;i=a.pop();)t(i)
;return this},eachBefore:function(t){
for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),
n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this},
sum:function(t){return this.eachAfter((function(n){
for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value
;n.value=e}))},sort:function(t){return this.eachBefore((function(n){
n.children&&n.children.sort(t)}))},path:function(t){
for(var n=this,e=function(t,n){if(t===n)return t
;var e=t.ancestors(),r=n.ancestors(),i=null;t=e.pop(),n=r.pop();for(;t===n;)i=t,
t=e.pop(),n=r.pop();return i}(n,t),r=[n];n!==e;)n=n.parent,r.push(n)
;for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r},
ancestors:function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},
descendants:function(){var t=[];return this.each((function(n){t.push(n)})),t},
leaves:function(){var t=[];return this.eachBefore((function(n){
n.children||t.push(n)})),t},links:function(){var t=this,n=[]
;return t.each((function(e){e!==t&&n.push({source:e.parent,target:e})})),n},
copy:function(){return th(this).eachBefore(eh)}};var oh=Array.prototype.slice
;function ah(t){for(var n,e,r=0,i=(t=function(t){
for(var n,e,r=t.length;r;)e=Math.random()*r--|0,n=t[r],t[r]=t[e],t[e]=n;return t
}(oh.call(t))).length,o=[];r<i;)n=t[r],e&&fh(e,n)?++r:(e=lh(o=uh(o,n)),r=0)
;return e}function uh(t,n){var e,r;if(sh(n,t))return[n]
;for(e=0;e<t.length;++e)if(ch(n,t[e])&&sh(hh(t[e],n),t))return[t[e],n]
;for(e=0;e<t.length-1;++e)for(r=e+1;r<t.length;++r)if(ch(hh(t[e],t[r]),n)&&ch(hh(t[e],n),t[r])&&ch(hh(t[r],n),t[e])&&sh(dh(t[e],t[r],n),t))return[t[e],t[r],n]
;throw new Error}function ch(t,n){var e=t.r-n.r,r=n.x-t.x,i=n.y-t.y
;return e<0||e*e<r*r+i*i}function fh(t,n){var e=t.r-n.r+1e-6,r=n.x-t.x,i=n.y-t.y
;return e>0&&e*e>r*r+i*i}function sh(t,n){
for(var e=0;e<n.length;++e)if(!fh(t,n[e]))return!1;return!0}function lh(t){
switch(t.length){case 1:return function(t){return{x:t.x,y:t.y,r:t.r}}(t[0])
;case 2:return hh(t[0],t[1]);case 3:return dh(t[0],t[1],t[2])}}function hh(t,n){
var e=t.x,r=t.y,i=t.r,o=n.x,a=n.y,u=n.r,c=o-e,f=a-r,s=u-i,l=Math.sqrt(c*c+f*f)
;return{x:(e+o+c/l*s)/2,y:(r+a+f/l*s)/2,r:(l+i+u)/2}}function dh(t,n,e){
var r=t.x,i=t.y,o=t.r,a=n.x,u=n.y,c=n.r,f=e.x,s=e.y,l=e.r,h=r-a,d=r-f,p=i-u,v=i-s,g=c-o,y=l-o,_=r*r+i*i-o*o,b=_-a*a-u*u+c*c,m=_-f*f-s*s+l*l,x=d*p-h*v,w=(p*m-v*b)/(2*x)-r,M=(v*g-p*y)/x,N=(d*b-h*m)/(2*x)-i,T=(h*y-d*g)/x,A=M*M+T*T-1,S=2*(o+w*M+N*T),k=w*w+N*N-o*o,E=-(A?(S+Math.sqrt(S*S-4*A*k))/(2*A):k/S)
;return{x:r+w+M*E,y:i+N+T*E,r:E}}function ph(t,n,e){
var r,i,o,a,u=t.x-n.x,c=t.y-n.y,f=u*u+c*c
;f?(i=n.r+e.r,i*=i,a=t.r+e.r,i>(a*=a)?(r=(f+a-i)/(2*f),
o=Math.sqrt(Math.max(0,a/f-r*r)),
e.x=t.x-r*u-o*c,e.y=t.y-r*c+o*u):(r=(f+i-a)/(2*f),
o=Math.sqrt(Math.max(0,i/f-r*r)),e.x=n.x+r*u-o*c,e.y=n.y+r*c+o*u)):(e.x=n.x+e.r,
e.y=n.y)}function vh(t,n){var e=t.r+n.r-1e-6,r=n.x-t.x,i=n.y-t.y
;return e>0&&e*e>r*r+i*i}function gh(t){
var n=t._,e=t.next._,r=n.r+e.r,i=(n.x*e.r+e.x*n.r)/r,o=(n.y*e.r+e.y*n.r)/r
;return i*i+o*o}function yh(t){this._=t,this.next=null,this.previous=null}
function _h(t){if(!(i=t.length))return 0;var n,e,r,i,o,a,u,c,f,s,l
;if((n=t[0]).x=0,n.y=0,!(i>1))return n.r
;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(i>2))return n.r+e.r
;ph(e,n,r=t[2]),n=new yh(n),
e=new yh(e),r=new yh(r),n.next=r.previous=e,e.next=n.previous=r,
r.next=e.previous=n;t:for(u=3;u<i;++u){
ph(n._,e._,r=t[u]),r=new yh(r),c=e.next,f=n.previous,s=e._.r,l=n._.r;do{
if(s<=l){if(vh(c._,r._)){e=c,n.next=e,e.previous=n,--u;continue t}
s+=c._.r,c=c.next}else{if(vh(f._,r._)){(n=f).next=e,e.previous=n,--u;continue t}
l+=f._.r,f=f.previous}}while(c!==f.next)
;for(r.previous=n,r.next=e,n.next=e.previous=e=r,
o=gh(n);(r=r.next)!==e;)(a=gh(r))<o&&(n=r,o=a);e=n.next}
for(n=[e._],r=e;(r=r.next)!==e;)n.push(r._)
;for(r=ah(n),u=0;u<i;++u)(n=t[u]).x-=r.x,n.y-=r.y;return r.r}function bh(t){
return null==t?null:mh(t)}function mh(t){if("function"!=typeof t)throw new Error
;return t}function xh(){return 0}function wh(t){return function(){return t}}
function Mh(t){return Math.sqrt(t.value)}function Nh(t){return function(n){
n.children||(n.r=Math.max(0,+t(n)||0))}}function Th(t,n){return function(e){
if(r=e.children){var r,i,o,a=r.length,u=t(e)*n||0;if(u)for(i=0;i<a;++i)r[i].r+=u
;if(o=_h(r),u)for(i=0;i<a;++i)r[i].r-=u;e.r=o+u}}}function Ah(t){
return function(n){var e=n.parent;n.r*=t,e&&(n.x=e.x+t*n.x,n.y=e.y+t*n.y)}}
function Sh(t){
t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),
t.y1=Math.round(t.y1)}function kh(t,n,e,r,i){
for(var o,a=t.children,u=-1,c=a.length,f=t.value&&(r-n)/t.value;++u<c;)(o=a[u]).y0=e,
o.y1=i,o.x0=n,o.x1=n+=o.value*f}var Eh={depth:-1},Ch={};function Ph(t){
return t.id}function zh(t){return t.parentId}function Rh(t,n){
return t.parent===n.parent?1:2}function Dh(t){var n=t.children;return n?n[0]:t.t
}function qh(t){var n=t.children;return n?n[n.length-1]:t.t}function Lh(t,n,e){
var r=e/(n.i-t.i);n.c-=r,n.s+=e,t.c+=r,n.z+=e,n.m+=e}function Uh(t,n,e){
return t.a.parent===n.parent?t.a:e}function Oh(t,n){
this._=t,this.parent=null,this.children=null,
this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n
}function Bh(t,n,e,r,i){
for(var o,a=t.children,u=-1,c=a.length,f=t.value&&(i-e)/t.value;++u<c;)(o=a[u]).x0=n,
o.x1=r,o.y0=e,o.y1=e+=o.value*f}Oh.prototype=Object.create(ih.prototype)
;var Fh=(1+Math.sqrt(5))/2;function Yh(t,n,e,r,i,o){
for(var a,u,c,f,s,l,h,d,p,v,g,y=[],_=n.children,b=0,m=0,x=_.length,w=n.value;b<x;){
c=i-e,f=o-r;do{s=_[m++].value}while(!s&&m<x)
;for(l=h=s,g=s*s*(v=Math.max(f/c,c/f)/(w*t)),p=Math.max(h/g,g/l);m<x;++m){
if(s+=u=_[m].value,u<l&&(l=u),u>h&&(h=u),g=s*s*v,(d=Math.max(h/g,g/l))>p){s-=u
;break}p=d}y.push(a={value:s,dice:c<f,children:_.slice(b,m)
}),a.dice?kh(a,e,r,i,w?r+=f*s/w:o):Bh(a,e,r,w?e+=c*s/w:i,o),w-=s,b=m}return y}
var Ih=function t(n){function e(t,e,r,i,o){Yh(n,t,e,r,i,o)}
return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Fh);var Hh=function t(n){
function e(t,e,r,i,o){
if((a=t._squarify)&&a.ratio===n)for(var a,u,c,f,s,l=-1,h=a.length,d=t.value;++l<h;){
for(c=(u=a[l]).children,f=u.value=0,s=c.length;f<s;++f)u.value+=c[f].value
;u.dice?kh(u,e,r,i,r+=(o-r)*u.value/d):Bh(u,e,r,e+=(i-e)*u.value/d,o),d-=u.value
}else t._squarify=a=Yh(n,t,e,r,i,o),a.ratio=n}return e.ratio=function(n){
return t((n=+n)>1?n:1)},e}(Fh);function jh(t,n,e){
return(n[0]-t[0])*(e[1]-t[1])-(n[1]-t[1])*(e[0]-t[0])}function Xh(t,n){
return t[0]-n[0]||t[1]-n[1]}function Vh(t){
for(var n=t.length,e=[0,1],r=2,i=2;i<n;++i){
for(;r>1&&jh(t[e[r-2]],t[e[r-1]],t[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}
function Gh(){return Math.random()}var Wh=function t(n){function e(t,e){
return t=null==t?0:+t,
e=null==e?1:+e,1===arguments.length?(e=t,t=0):e-=t,function(){return n()*e+t}}
return e.source=t,e}(Gh),Zh=function t(n){function e(t,e){var r,i
;return t=null==t?0:+t,e=null==e?1:+e,function(){var o
;if(null!=r)o=r,r=null;else do{r=2*n()-1,o=2*n()-1,i=r*r+o*o}while(!i||i>1)
;return t+e*o*Math.sqrt(-2*Math.log(i)/i)}}return e.source=t,e
}(Gh),$h=function t(n){function e(){var t=Zh.source(n).apply(this,arguments)
;return function(){return Math.exp(t())}}return e.source=t,e
}(Gh),Qh=function t(n){function e(t){return function(){
for(var e=0,r=0;r<t;++r)e+=n();return e}}return e.source=t,e
}(Gh),Kh=function t(n){function e(t){var e=Qh.source(n)(t);return function(){
return e()/t}}return e.source=t,e}(Gh),Jh=function t(n){function e(t){
return function(){return-Math.log(1-n())/t}}return e.source=t,e}(Gh)
;function td(t,n){switch(arguments.length){case 0:break;case 1:this.range(t)
;break;default:this.range(n).domain(t)}return this}function nd(t,n){
switch(arguments.length){case 0:break;case 1:this.interpolator(t);break;default:
this.interpolator(n).domain(t)}return this}
var ed=Array.prototype,rd=ed.map,id=ed.slice,od={name:"implicit"};function ad(){
var t=Bo(),n=[],e=[],r=od;function i(i){var o=i+"",a=t.get(o);if(!a){
if(r!==od)return r;t.set(o,a=n.push(i))}return e[(a-1)%e.length]}
return i.domain=function(e){if(!arguments.length)return n.slice();n=[],t=Bo()
;for(var r,o,a=-1,u=e.length;++a<u;)t.has(o=(r=e[a])+"")||t.set(o,n.push(r))
;return i},i.range=function(t){
return arguments.length?(e=id.call(t),i):e.slice()},i.unknown=function(t){
return arguments.length?(r=t,i):r},i.copy=function(){return ad(n,e).unknown(r)},
td.apply(i,arguments),i}function ud(){
var t,n,e=ad().unknown(void 0),r=e.domain,i=e.range,o=[0,1],a=!1,u=0,c=0,f=.5
;function s(){var e=r().length,s=o[1]<o[0],l=o[s-0],h=o[1-s]
;t=(h-l)/Math.max(1,e-u+2*c),
a&&(t=Math.floor(t)),l+=(h-l-t*(e-u))*f,n=t*(1-u),a&&(l=Math.round(l),
n=Math.round(n));var d=g(e).map((function(n){return l+t*n}))
;return i(s?d.reverse():d)}return delete e.unknown,e.domain=function(t){
return arguments.length?(r(t),s()):r()},e.range=function(t){
return arguments.length?(o=[+t[0],+t[1]],s()):o.slice()
},e.rangeRound=function(t){return o=[+t[0],+t[1]],a=!0,s()
},e.bandwidth=function(){return n},e.step=function(){return t
},e.round=function(t){return arguments.length?(a=!!t,s()):a
},e.padding=function(t){return arguments.length?(u=Math.min(1,c=+t),s()):u
},e.paddingInner=function(t){return arguments.length?(u=Math.min(1,t),s()):u
},e.paddingOuter=function(t){return arguments.length?(c=+t,s()):c
},e.align=function(t){
return arguments.length?(f=Math.max(0,Math.min(1,t)),s()):f},e.copy=function(){
return ud(r(),o).round(a).paddingInner(u).paddingOuter(c).align(f)
},td.apply(s(),arguments)}function cd(t){var n=t.copy
;return t.padding=t.paddingOuter,
delete t.paddingInner,delete t.paddingOuter,t.copy=function(){return cd(n())},t}
function fd(t){return+t}var sd=[0,1];function ld(t){return t}function hd(t,n){
return(n-=t=+t)?function(e){return(e-t)/n}:function(t){return function(){
return t}}(isNaN(n)?NaN:.5)}function dd(t){var n,e=t[0],r=t[t.length-1]
;return e>r&&(n=e,e=r,r=n),function(t){return Math.max(e,Math.min(r,t))}}
function pd(t,n,e){var r=t[0],i=t[1],o=n[0],a=n[1]
;return i<r?(r=hd(i,r),o=e(a,o)):(r=hd(r,i),o=e(o,a)),function(t){return o(r(t))
}}function vd(t,n,e){
var r=Math.min(t.length,n.length)-1,o=new Array(r),a=new Array(r),u=-1
;for(t[r]<t[0]&&(t=t.slice().reverse(),
n=n.slice().reverse());++u<r;)o[u]=hd(t[u],t[u+1]),a[u]=e(n[u],n[u+1])
;return function(n){var e=i(t,n,1,r)-1;return a[e](o[e](n))}}function gd(t,n){
return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
}function yd(){var t,n,e,r,i,o,a=sd,u=sd,c=Ge,f=ld;function s(){
return r=Math.min(a.length,u.length)>2?vd:pd,i=o=null,l}function l(n){
return isNaN(n=+n)?e:(i||(i=r(a.map(t),u,c)))(t(f(n)))}
return l.invert=function(e){return f(n((o||(o=r(u,a.map(t),Ie)))(e)))
},l.domain=function(t){
return arguments.length?(a=rd.call(t,fd),f===ld||(f=dd(a)),s()):a.slice()
},l.range=function(t){return arguments.length?(u=id.call(t),s()):u.slice()
},l.rangeRound=function(t){return u=id.call(t),c=We,s()},l.clamp=function(t){
return arguments.length?(f=t?dd(a):ld,l):f!==ld},l.interpolate=function(t){
return arguments.length?(c=t,s()):c},l.unknown=function(t){
return arguments.length?(e=t,l):e},function(e,r){return t=e,n=r,s()}}
function _d(t,n){return yd()(t,n)}function bd(n,e,r,i){var o,a=w(n,e,r)
;switch((i=su(null==i?",f":i)).type){case"s":
var u=Math.max(Math.abs(n),Math.abs(e))
;return null!=i.precision||isNaN(o=xu(a,u))||(i.precision=o),t.formatPrefix(i,u)
;case"":case"e":case"g":case"p":case"r":
null!=i.precision||isNaN(o=wu(a,Math.max(Math.abs(n),Math.abs(e))))||(i.precision=o-("e"===i.type))
;break;case"f":case"%":
null!=i.precision||isNaN(o=mu(a))||(i.precision=o-2*("%"===i.type))}
return t.format(i)}function md(t){var n=t.domain;return t.ticks=function(t){
var e=n();return m(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){
var r=n();return bd(r[0],r[r.length-1],null==t?10:t,e)},t.nice=function(e){
null==e&&(e=10);var r,i=n(),o=0,a=i.length-1,u=i[o],c=i[a];return c<u&&(r=u,u=c,
c=r,
r=o,o=a,a=r),(r=x(u,c,e))>0?r=x(u=Math.floor(u/r)*r,c=Math.ceil(c/r)*r,e):r<0&&(r=x(u=Math.ceil(u*r)/r,c=Math.floor(c*r)/r,e)),
r>0?(i[o]=Math.floor(u/r)*r,
i[a]=Math.ceil(c/r)*r,n(i)):r<0&&(i[o]=Math.ceil(u*r)/r,
i[a]=Math.floor(c*r)/r,n(i)),t},t}function xd(t,n){
var e,r=0,i=(t=t.slice()).length-1,o=t[r],a=t[i]
;return a<o&&(e=r,r=i,i=e,e=o,o=a,a=e),t[r]=n.floor(o),t[i]=n.ceil(a),t}
function wd(t){return Math.log(t)}function Md(t){return Math.exp(t)}
function Nd(t){return-Math.log(-t)}function Td(t){return-Math.exp(-t)}
function Ad(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Sd(t){
return function(n){return-t(-n)}}function kd(n){
var e,r,i=n(wd,Md),o=i.domain,a=10;function u(){return e=function(t){
return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),
function(n){return Math.log(n)/t})}(a),r=function(t){
return 10===t?Ad:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}
}(a),o()[0]<0?(e=Sd(e),r=Sd(r),n(Nd,Td)):n(wd,Md),i}return i.base=function(t){
return arguments.length?(a=+t,u()):a},i.domain=function(t){
return arguments.length?(o(t),u()):o()},i.ticks=function(t){
var n,i=o(),u=i[0],c=i[i.length-1];(n=c<u)&&(h=u,u=c,c=h)
;var f,s,l,h=e(u),d=e(c),p=null==t?10:+t,v=[];if(!(a%1)&&d-h<p){
if(h=Math.round(h)-1,d=Math.round(d)+1,u>0){
for(;h<d;++h)for(s=1,f=r(h);s<a;++s)if(!((l=f*s)<u)){if(l>c)break;v.push(l)}
}else for(;h<d;++h)for(s=a-1,f=r(h);s>=1;--s)if(!((l=f*s)<u)){if(l>c)break
;v.push(l)}}else v=m(h,d,Math.min(d-h,p)).map(r);return n?v.reverse():v
},i.tickFormat=function(n,o){
if(null==o&&(o=10===a?".0e":","),"function"!=typeof o&&(o=t.format(o)),
n===1/0)return o;null==n&&(n=10);var u=Math.max(1,a*n/i.ticks().length)
;return function(t){var n=t/r(Math.round(e(t)))
;return n*a<a-.5&&(n*=a),n<=u?o(t):""}},i.nice=function(){return o(xd(o(),{
floor:function(t){return r(Math.floor(e(t)))},ceil:function(t){
return r(Math.ceil(e(t)))}}))},i}function Ed(t){return function(n){
return Math.sign(n)*Math.log1p(Math.abs(n/t))}}function Cd(t){
return function(n){return Math.sign(n)*Math.expm1(Math.abs(n))*t}}
function Pd(t){var n=1,e=t(Ed(n),Cd(n));return e.constant=function(e){
return arguments.length?t(Ed(n=+e),Cd(n)):n},md(e)}function zd(t){
return function(n){return n<0?-Math.pow(-n,t):Math.pow(n,t)}}function Rd(t){
return t<0?-Math.sqrt(-t):Math.sqrt(t)}function Dd(t){return t<0?-t*t:t*t}
function qd(t){var n=t(ld,ld),e=1;function r(){
return 1===e?t(ld,ld):.5===e?t(Rd,Dd):t(zd(e),zd(1/e))}
return n.exponent=function(t){return arguments.length?(e=+t,r()):e},md(n)}
function Ld(){var t=qd(yd());return t.copy=function(){
return gd(t,Ld()).exponent(t.exponent())},td.apply(t,arguments),t}
var Ud=new Date,Od=new Date;function Bd(t,n,e,r){function i(n){
return t(n=0===arguments.length?new Date:new Date(+n)),n}
return i.floor=function(n){return t(n=new Date(+n)),n},i.ceil=function(e){
return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){
var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){
return n(t=new Date(+t),null==e?1:Math.floor(e)),t},i.range=function(e,r,o){
var a,u=[];if(e=i.ceil(e),o=null==o?1:Math.floor(o),!(e<r&&o>0))return u;do{
u.push(a=new Date(+e)),n(e,o),t(e)}while(a<e&&e<r);return u
},i.filter=function(e){return Bd((function(n){
if(n>=n)for(;t(n),!e(n);)n.setTime(n-1)}),(function(t,r){
if(t>=t)if(r<0)for(;++r<=0;)for(;n(t,-1),
!e(t););else for(;--r>=0;)for(;n(t,1),!e(t););}))},e&&(i.count=function(n,r){
return Ud.setTime(+n),Od.setTime(+r),t(Ud),t(Od),Math.floor(e(Ud,Od))
},i.every=function(t){
return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){
return r(n)%t==0}:function(n){return i.count(0,n)%t==0}):i:null}),i}
var Fd=Bd((function(){}),(function(t,n){t.setTime(+t+n)}),(function(t,n){
return n-t}));Fd.every=function(t){
return t=Math.floor(t),isFinite(t)&&t>0?t>1?Bd((function(n){
n.setTime(Math.floor(n/t)*t)}),(function(n,e){n.setTime(+n+e*t)
}),(function(n,e){return(e-n)/t})):Fd:null}
;var Yd=Fd.range,Id=1e3,Hd=6e4,jd=36e5,Xd=864e5,Vd=6048e5,Gd=Bd((function(t){
t.setTime(t-t.getMilliseconds())}),(function(t,n){t.setTime(+t+n*Id)
}),(function(t,n){return(n-t)/Id}),(function(t){return t.getUTCSeconds()
})),Wd=Gd.range,Zd=Bd((function(t){
t.setTime(t-t.getMilliseconds()-t.getSeconds()*Id)}),(function(t,n){
t.setTime(+t+n*Hd)}),(function(t,n){return(n-t)/Hd}),(function(t){
return t.getMinutes()})),$d=Zd.range,Qd=Bd((function(t){
t.setTime(t-t.getMilliseconds()-t.getSeconds()*Id-t.getMinutes()*Hd)
}),(function(t,n){t.setTime(+t+n*jd)}),(function(t,n){return(n-t)/jd
}),(function(t){return t.getHours()})),Kd=Qd.range,Jd=Bd((function(t){
t.setHours(0,0,0,0)}),(function(t,n){t.setDate(t.getDate()+n)}),(function(t,n){
return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Hd)/Xd}),(function(t){
return t.getDate()-1})),tp=Jd.range;function np(t){return Bd((function(n){
n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)}),(function(t,n){
t.setDate(t.getDate()+7*n)}),(function(t,n){
return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Hd)/Vd}))}
var ep=np(0),rp=np(1),ip=np(2),op=np(3),ap=np(4),up=np(5),cp=np(6),fp=ep.range,sp=rp.range,lp=ip.range,hp=op.range,dp=ap.range,pp=up.range,vp=cp.range,gp=Bd((function(t){
t.setDate(1),t.setHours(0,0,0,0)}),(function(t,n){t.setMonth(t.getMonth()+n)
}),(function(t,n){
return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())
}),(function(t){return t.getMonth()})),yp=gp.range,_p=Bd((function(t){
t.setMonth(0,1),t.setHours(0,0,0,0)}),(function(t,n){
t.setFullYear(t.getFullYear()+n)}),(function(t,n){
return n.getFullYear()-t.getFullYear()}),(function(t){return t.getFullYear()}))
;_p.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Bd((function(n){
n.setFullYear(Math.floor(n.getFullYear()/t)*t),
n.setMonth(0,1),n.setHours(0,0,0,0)}),(function(n,e){
n.setFullYear(n.getFullYear()+e*t)})):null};var bp=_p.range,mp=Bd((function(t){
t.setUTCSeconds(0,0)}),(function(t,n){t.setTime(+t+n*Hd)}),(function(t,n){
return(n-t)/Hd}),(function(t){return t.getUTCMinutes()
})),xp=mp.range,wp=Bd((function(t){t.setUTCMinutes(0,0,0)}),(function(t,n){
t.setTime(+t+n*jd)}),(function(t,n){return(n-t)/jd}),(function(t){
return t.getUTCHours()})),Mp=wp.range,Np=Bd((function(t){t.setUTCHours(0,0,0,0)
}),(function(t,n){t.setUTCDate(t.getUTCDate()+n)}),(function(t,n){return(n-t)/Xd
}),(function(t){return t.getUTCDate()-1})),Tp=Np.range;function Ap(t){
return Bd((function(n){
n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)
}),(function(t,n){t.setUTCDate(t.getUTCDate()+7*n)}),(function(t,n){
return(n-t)/Vd}))}
var Sp=Ap(0),kp=Ap(1),Ep=Ap(2),Cp=Ap(3),Pp=Ap(4),zp=Ap(5),Rp=Ap(6),Dp=Sp.range,qp=kp.range,Lp=Ep.range,Up=Cp.range,Op=Pp.range,Bp=zp.range,Fp=Rp.range,Yp=Bd((function(t){
t.setUTCDate(1),t.setUTCHours(0,0,0,0)}),(function(t,n){
t.setUTCMonth(t.getUTCMonth()+n)}),(function(t,n){
return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())
}),(function(t){return t.getUTCMonth()})),Ip=Yp.range,Hp=Bd((function(t){
t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),(function(t,n){
t.setUTCFullYear(t.getUTCFullYear()+n)}),(function(t,n){
return n.getUTCFullYear()-t.getUTCFullYear()}),(function(t){
return t.getUTCFullYear()}));Hp.every=function(t){
return isFinite(t=Math.floor(t))&&t>0?Bd((function(n){
n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),
n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)}),(function(n,e){
n.setUTCFullYear(n.getUTCFullYear()+e*t)})):null};var jp=Hp.range
;function Xp(t){if(0<=t.y&&t.y<100){var n=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L)
;return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}
function Vp(t){if(0<=t.y&&t.y<100){
var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L))
;return n.setUTCFullYear(t.y),n}
return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Gp(t,n,e){
return{y:t,m:n,d:e,H:0,M:0,S:0,L:0}}function Wp(t){
var n=t.dateTime,e=t.date,r=t.time,i=t.periods,o=t.days,a=t.shortDays,u=t.months,c=t.shortMonths,f=ev(i),s=rv(i),l=ev(o),h=rv(o),d=ev(a),p=rv(a),v=ev(u),g=rv(u),y=ev(c),_=rv(c),b={
a:function(t){return a[t.getDay()]},A:function(t){return o[t.getDay()]},
b:function(t){return c[t.getMonth()]},B:function(t){return u[t.getMonth()]},
c:null,d:Nv,e:Nv,f:Ev,H:Tv,I:Av,j:Sv,L:kv,m:Cv,M:Pv,p:function(t){
return i[+(t.getHours()>=12)]},q:function(t){return 1+~~(t.getMonth()/3)},Q:og,
s:ag,S:zv,u:Rv,U:Dv,V:qv,w:Lv,W:Uv,x:null,X:null,y:Ov,Y:Bv,Z:Fv,"%":ig},m={
a:function(t){return a[t.getUTCDay()]},A:function(t){return o[t.getUTCDay()]},
b:function(t){return c[t.getUTCMonth()]},B:function(t){return u[t.getUTCMonth()]
},c:null,d:Yv,e:Yv,f:Vv,H:Iv,I:Hv,j:jv,L:Xv,m:Gv,M:Wv,p:function(t){
return i[+(t.getUTCHours()>=12)]},q:function(t){return 1+~~(t.getUTCMonth()/3)},
Q:og,s:ag,S:Zv,u:$v,U:Qv,V:Kv,w:Jv,W:tg,x:null,X:null,y:ng,Y:eg,Z:rg,"%":ig},x={
a:function(t,n,e){var r=d.exec(n.slice(e))
;return r?(t.w=p[r[0].toLowerCase()],e+r[0].length):-1},A:function(t,n,e){
var r=l.exec(n.slice(e));return r?(t.w=h[r[0].toLowerCase()],e+r[0].length):-1},
b:function(t,n,e){var r=y.exec(n.slice(e))
;return r?(t.m=_[r[0].toLowerCase()],e+r[0].length):-1},B:function(t,n,e){
var r=v.exec(n.slice(e));return r?(t.m=g[r[0].toLowerCase()],e+r[0].length):-1},
c:function(t,e,r){return N(t,n,e,r)},d:pv,e:pv,f:mv,H:gv,I:gv,j:vv,L:bv,m:dv,
M:yv,p:function(t,n,e){var r=f.exec(n.slice(e))
;return r?(t.p=s[r[0].toLowerCase()],e+r[0].length):-1},q:hv,Q:wv,s:Mv,S:_v,
u:ov,U:av,V:uv,w:iv,W:cv,x:function(t,n,r){return N(t,e,n,r)},X:function(t,n,e){
return N(t,r,n,e)},y:sv,Y:fv,Z:lv,"%":xv};function w(t,n){return function(e){
var r,i,o,a=[],u=-1,c=0,f=t.length
;for(e instanceof Date||(e=new Date(+e));++u<f;)37===t.charCodeAt(u)&&(a.push(t.slice(c,u)),
null!=(i=$p[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",
(o=n[r])&&(r=o(e,i)),a.push(r),c=u+1);return a.push(t.slice(c,u)),a.join("")}}
function M(t,n){return function(e){var r,i,o=Gp(1900,void 0,1)
;if(N(o,t,e+="",0)!=e.length)return null;if("Q"in o)return new Date(o.Q)
;if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0))
;if(n&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),
void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null
;"w"in o||(o.w=1),
"Z"in o?(i=(r=Vp(Gp(o.y,0,1))).getUTCDay(),r=i>4||0===i?kp.ceil(r):kp(r),
r=Np.offset(r,7*(o.V-1)),
o.y=r.getUTCFullYear(),o.m=r.getUTCMonth(),o.d=r.getUTCDate()+(o.w+6)%7):(i=(r=Xp(Gp(o.y,0,1))).getDay(),
r=i>4||0===i?rp.ceil(r):rp(r),
r=Jd.offset(r,7*(o.V-1)),o.y=r.getFullYear(),o.m=r.getMonth(),
o.d=r.getDate()+(o.w+6)%7)
}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),
i="Z"in o?Vp(Gp(o.y,0,1)).getUTCDay():Xp(Gp(o.y,0,1)).getDay(),
o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(i+5)%7:o.w+7*o.U-(i+6)%7)
;return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,Vp(o)):Xp(o)}}function N(t,n,e,r){
for(var i,o,a=0,u=n.length,c=e.length;a<u;){if(r>=c)return-1
;if(37===(i=n.charCodeAt(a++))){
if(i=n.charAt(a++),!(o=x[i in $p?n.charAt(a++):i])||(r=o(t,e,r))<0)return-1
}else if(i!=e.charCodeAt(r++))return-1}return r}
return b.x=w(e,b),b.X=w(r,b),b.c=w(n,b),m.x=w(e,m),m.X=w(r,m),m.c=w(n,m),{
format:function(t){var n=w(t+="",b);return n.toString=function(){return t},n},
parse:function(t){var n=M(t+="",!1);return n.toString=function(){return t},n},
utcFormat:function(t){var n=w(t+="",m);return n.toString=function(){return t},n
},utcParse:function(t){var n=M(t+="",!0);return n.toString=function(){return t},
n}}}var Zp,$p={"-":"",_:" ",0:"0"},Qp=/^\s*\d+/,Kp=/^%/,Jp=/[\\^$*+?|[\]().{}]/g
;function tv(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length
;return r+(o<e?new Array(e-o+1).join(n)+i:i)}function nv(t){
return t.replace(Jp,"\\$&")}function ev(t){
return new RegExp("^(?:"+t.map(nv).join("|")+")","i")}function rv(t){
for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}
function iv(t,n,e){var r=Qp.exec(n.slice(e,e+1))
;return r?(t.w=+r[0],e+r[0].length):-1}function ov(t,n,e){
var r=Qp.exec(n.slice(e,e+1));return r?(t.u=+r[0],e+r[0].length):-1}
function av(t,n,e){var r=Qp.exec(n.slice(e,e+2))
;return r?(t.U=+r[0],e+r[0].length):-1}function uv(t,n,e){
var r=Qp.exec(n.slice(e,e+2));return r?(t.V=+r[0],e+r[0].length):-1}
function cv(t,n,e){var r=Qp.exec(n.slice(e,e+2))
;return r?(t.W=+r[0],e+r[0].length):-1}function fv(t,n,e){
var r=Qp.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}
function sv(t,n,e){var r=Qp.exec(n.slice(e,e+2))
;return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function lv(t,n,e){
var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e,e+6))
;return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function hv(t,n,e){
var r=Qp.exec(n.slice(e,e+1));return r?(t.q=3*r[0]-3,e+r[0].length):-1}
function dv(t,n,e){var r=Qp.exec(n.slice(e,e+2))
;return r?(t.m=r[0]-1,e+r[0].length):-1}function pv(t,n,e){
var r=Qp.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}
function vv(t,n,e){var r=Qp.exec(n.slice(e,e+3))
;return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function gv(t,n,e){
var r=Qp.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}
function yv(t,n,e){var r=Qp.exec(n.slice(e,e+2))
;return r?(t.M=+r[0],e+r[0].length):-1}function _v(t,n,e){
var r=Qp.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}
function bv(t,n,e){var r=Qp.exec(n.slice(e,e+3))
;return r?(t.L=+r[0],e+r[0].length):-1}function mv(t,n,e){
var r=Qp.exec(n.slice(e,e+6))
;return r?(t.L=Math.floor(r[0]/1e3),e+r[0].length):-1}function xv(t,n,e){
var r=Kp.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function wv(t,n,e){
var r=Qp.exec(n.slice(e));return r?(t.Q=+r[0],e+r[0].length):-1}
function Mv(t,n,e){var r=Qp.exec(n.slice(e))
;return r?(t.s=+r[0],e+r[0].length):-1}function Nv(t,n){
return tv(t.getDate(),n,2)}function Tv(t,n){return tv(t.getHours(),n,2)}
function Av(t,n){return tv(t.getHours()%12||12,n,2)}function Sv(t,n){
return tv(1+Jd.count(_p(t),t),n,3)}function kv(t,n){
return tv(t.getMilliseconds(),n,3)}function Ev(t,n){return kv(t,n)+"000"}
function Cv(t,n){return tv(t.getMonth()+1,n,2)}function Pv(t,n){
return tv(t.getMinutes(),n,2)}function zv(t,n){return tv(t.getSeconds(),n,2)}
function Rv(t){var n=t.getDay();return 0===n?7:n}function Dv(t,n){
return tv(ep.count(_p(t)-1,t),n,2)}function qv(t,n){var e=t.getDay()
;return t=e>=4||0===e?ap(t):ap.ceil(t),
tv(ap.count(_p(t),t)+(4===_p(t).getDay()),n,2)}function Lv(t){return t.getDay()}
function Uv(t,n){return tv(rp.count(_p(t)-1,t),n,2)}function Ov(t,n){
return tv(t.getFullYear()%100,n,2)}function Bv(t,n){
return tv(t.getFullYear()%1e4,n,4)}function Fv(t){var n=t.getTimezoneOffset()
;return(n>0?"-":(n*=-1,"+"))+tv(n/60|0,"0",2)+tv(n%60,"0",2)}function Yv(t,n){
return tv(t.getUTCDate(),n,2)}function Iv(t,n){return tv(t.getUTCHours(),n,2)}
function Hv(t,n){return tv(t.getUTCHours()%12||12,n,2)}function jv(t,n){
return tv(1+Np.count(Hp(t),t),n,3)}function Xv(t,n){
return tv(t.getUTCMilliseconds(),n,3)}function Vv(t,n){return Xv(t,n)+"000"}
function Gv(t,n){return tv(t.getUTCMonth()+1,n,2)}function Wv(t,n){
return tv(t.getUTCMinutes(),n,2)}function Zv(t,n){
return tv(t.getUTCSeconds(),n,2)}function $v(t){var n=t.getUTCDay()
;return 0===n?7:n}function Qv(t,n){return tv(Sp.count(Hp(t)-1,t),n,2)}
function Kv(t,n){var e=t.getUTCDay()
;return t=e>=4||0===e?Pp(t):Pp.ceil(t),tv(Pp.count(Hp(t),t)+(4===Hp(t).getUTCDay()),n,2)
}function Jv(t){return t.getUTCDay()}function tg(t,n){
return tv(kp.count(Hp(t)-1,t),n,2)}function ng(t,n){
return tv(t.getUTCFullYear()%100,n,2)}function eg(t,n){
return tv(t.getUTCFullYear()%1e4,n,4)}function rg(){return"+0000"}function ig(){
return"%"}function og(t){return+t}function ag(t){return Math.floor(+t/1e3)}
function ug(n){
return Zp=Wp(n),t.timeFormat=Zp.format,t.timeParse=Zp.parse,t.utcFormat=Zp.utcFormat,
t.utcParse=Zp.utcParse,Zp}ug({dateTime:"%x, %X",date:"%-m/%-d/%Y",
time:"%-I:%M:%S %p",periods:["AM","PM"],
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
months:["January","February","March","April","May","June","July","August","September","October","November","December"],
shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
});var cg="%Y-%m-%dT%H:%M:%S.%LZ";var fg=Date.prototype.toISOString?function(t){
return t.toISOString()}:t.utcFormat(cg)
;var sg=+new Date("2000-01-01T00:00:00.000Z")?function(t){var n=new Date(t)
;return isNaN(n)?null:n
}:t.utcParse(cg),lg=1e3,hg=6e4,dg=36e5,pg=864e5,vg=2592e6,gg=31536e6
;function yg(t){return new Date(t)}function _g(t){
return t instanceof Date?+t:+new Date(+t)}function bg(t,n,r,i,o,a,u,c,f){
var s=_d(ld,ld),l=s.invert,h=s.domain,d=f(".%L"),p=f(":%S"),v=f("%I:%M"),g=f("%I %p"),y=f("%a %d"),_=f("%b %d"),b=f("%B"),m=f("%Y"),x=[[u,1,lg],[u,5,5e3],[u,15,15e3],[u,30,3e4],[a,1,hg],[a,5,3e5],[a,15,9e5],[a,30,18e5],[o,1,dg],[o,3,108e5],[o,6,216e5],[o,12,432e5],[i,1,pg],[i,2,1728e5],[r,1,6048e5],[n,1,vg],[n,3,7776e6],[t,1,gg]]
;function M(e){
return(u(e)<e?d:a(e)<e?p:o(e)<e?v:i(e)<e?g:n(e)<e?r(e)<e?y:_:t(e)<e?b:m)(e)}
function N(n,r,i,o){if(null==n&&(n=10),"number"==typeof n){
var a=Math.abs(i-r)/n,u=e((function(t){return t[2]})).right(x,a)
;u===x.length?(o=w(r/gg,i/gg,n),n=t):u?(o=(u=x[a/x[u-1][2]<x[u][2]/a?u-1:u])[1],
n=u[0]):(o=Math.max(w(r,i,n),1),n=c)}return null==o?n:n.every(o)}
return s.invert=function(t){return new Date(l(t))},s.domain=function(t){
return arguments.length?h(rd.call(t,_g)):h().map(yg)},s.ticks=function(t,n){
var e,r=h(),i=r[0],o=r[r.length-1],a=o<i
;return a&&(e=i,i=o,o=e),e=(e=N(t,i,o,n))?e.range(i,o+1):[],a?e.reverse():e
},s.tickFormat=function(t,n){return null==n?M:f(n)},s.nice=function(t,n){
var e=h();return(t=N(t,e[0],e[e.length-1],n))?h(xd(e,t)):s},s.copy=function(){
return gd(s,bg(t,n,r,i,o,a,u,c,f))},s}function mg(){
var t,n,e,r,i,o=0,a=1,u=ld,c=!1;function f(n){
return isNaN(n=+n)?i:u(0===e?.5:(n=(r(n)-t)*e,c?Math.max(0,Math.min(1,n)):n))}
return f.domain=function(i){
return arguments.length?(t=r(o=+i[0]),n=r(a=+i[1]),e=t===n?0:1/(n-t),f):[o,a]
},f.clamp=function(t){return arguments.length?(c=!!t,f):c
},f.interpolator=function(t){return arguments.length?(u=t,f):u
},f.unknown=function(t){return arguments.length?(i=t,f):i},function(i){
return r=i,t=i(o),n=i(a),e=t===n?0:1/(n-t),f}}function xg(t,n){
return n.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())
}function wg(){var t=qd(mg());return t.copy=function(){
return xg(t,wg()).exponent(t.exponent())},nd.apply(t,arguments)}function Mg(){
var t,n,e,r,i,o,a,u=0,c=.5,f=1,s=ld,l=!1;function h(t){
return isNaN(t=+t)?a:(t=.5+((t=+o(t))-n)*(t<n?r:i),
s(l?Math.max(0,Math.min(1,t)):t))}return h.domain=function(a){
return arguments.length?(t=o(u=+a[0]),
n=o(c=+a[1]),e=o(f=+a[2]),r=t===n?0:.5/(n-t),i=n===e?0:.5/(e-n),h):[u,c,f]
},h.clamp=function(t){return arguments.length?(l=!!t,h):l
},h.interpolator=function(t){return arguments.length?(s=t,h):s
},h.unknown=function(t){return arguments.length?(a=t,h):a},function(a){
return o=a,t=a(u),n=a(c),e=a(f),r=t===n?0:.5/(n-t),i=n===e?0:.5/(e-n),h}}
function Ng(){var t=qd(Mg());return t.copy=function(){
return xg(t,Ng()).exponent(t.exponent())},nd.apply(t,arguments)}function Tg(t){
for(var n=t.length/6|0,e=new Array(n),r=0;r<n;)e[r]="#"+t.slice(6*r,6*++r)
;return e}
var Ag=Tg("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Sg=Tg("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),kg=Tg("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),Eg=Tg("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),Cg=Tg("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),Pg=Tg("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),zg=Tg("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),Rg=Tg("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),Dg=Tg("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"),qg=Tg("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab")
;function Lg(t){return Le(t[t.length-1])}
var Ug=new Array(3).concat("d8b365f5f5f55ab4ac","a6611adfc27d80cdc1018571","a6611adfc27df5f5f580cdc1018571","8c510ad8b365f6e8c3c7eae55ab4ac01665e","8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e","8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e","8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e","5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30","5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(Tg),Og=Lg(Ug),Bg=new Array(3).concat("af8dc3f7f7f77fbf7b","7b3294c2a5cfa6dba0008837","7b3294c2a5cff7f7f7a6dba0008837","762a83af8dc3e7d4e8d9f0d37fbf7b1b7837","762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837","762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837","762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837","40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b","40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(Tg),Fg=Lg(Bg),Yg=new Array(3).concat("e9a3c9f7f7f7a1d76a","d01c8bf1b6dab8e1864dac26","d01c8bf1b6daf7f7f7b8e1864dac26","c51b7de9a3c9fde0efe6f5d0a1d76a4d9221","c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221","c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221","c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221","8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419","8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(Tg),Ig=Lg(Yg),Hg=new Array(3).concat("998ec3f7f7f7f1a340","5e3c99b2abd2fdb863e66101","5e3c99b2abd2f7f7f7fdb863e66101","542788998ec3d8daebfee0b6f1a340b35806","542788998ec3d8daebf7f7f7fee0b6f1a340b35806","5427888073acb2abd2d8daebfee0b6fdb863e08214b35806","5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806","2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08","2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(Tg),jg=Lg(Hg),Xg=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(Tg),Vg=Lg(Xg),Gg=new Array(3).concat("ef8a62ffffff999999","ca0020f4a582bababa404040","ca0020f4a582ffffffbababa404040","b2182bef8a62fddbc7e0e0e09999994d4d4d","b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d","b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d","b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d","67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a","67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(Tg),Wg=Lg(Gg),Zg=new Array(3).concat("fc8d59ffffbf91bfdb","d7191cfdae61abd9e92c7bb6","d7191cfdae61ffffbfabd9e92c7bb6","d73027fc8d59fee090e0f3f891bfdb4575b4","d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4","d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4","d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4","a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695","a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(Tg),$g=Lg(Zg),Qg=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(Tg),Kg=Lg(Qg),Jg=new Array(3).concat("fc8d59ffffbf99d594","d7191cfdae61abdda42b83ba","d7191cfdae61ffffbfabdda42b83ba","d53e4ffc8d59fee08be6f59899d5943288bd","d53e4ffc8d59fee08bffffbfe6f59899d5943288bd","d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd","d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd","9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2","9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(Tg),ty=Lg(Jg),ny=new Array(3).concat("e5f5f999d8c92ca25f","edf8fbb2e2e266c2a4238b45","edf8fbb2e2e266c2a42ca25f006d2c","edf8fbccece699d8c966c2a42ca25f006d2c","edf8fbccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(Tg),ey=Lg(ny),ry=new Array(3).concat("e0ecf49ebcda8856a7","edf8fbb3cde38c96c688419d","edf8fbb3cde38c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(Tg),iy=Lg(ry),oy=new Array(3).concat("e0f3dba8ddb543a2ca","f0f9e8bae4bc7bccc42b8cbe","f0f9e8bae4bc7bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(Tg),ay=Lg(oy),uy=new Array(3).concat("fee8c8fdbb84e34a33","fef0d9fdcc8afc8d59d7301f","fef0d9fdcc8afc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(Tg),cy=Lg(uy),fy=new Array(3).concat("ece2f0a6bddb1c9099","f6eff7bdc9e167a9cf02818a","f6eff7bdc9e167a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(Tg),sy=Lg(fy),ly=new Array(3).concat("ece7f2a6bddb2b8cbe","f1eef6bdc9e174a9cf0570b0","f1eef6bdc9e174a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(Tg),hy=Lg(ly),dy=new Array(3).concat("e7e1efc994c7dd1c77","f1eef6d7b5d8df65b0ce1256","f1eef6d7b5d8df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(Tg),py=Lg(dy),vy=new Array(3).concat("fde0ddfa9fb5c51b8a","feebe2fbb4b9f768a1ae017e","feebe2fbb4b9f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(Tg),gy=Lg(vy),yy=new Array(3).concat("edf8b17fcdbb2c7fb8","ffffcca1dab441b6c4225ea8","ffffcca1dab441b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(Tg),_y=Lg(yy),by=new Array(3).concat("f7fcb9addd8e31a354","ffffccc2e69978c679238443","ffffccc2e69978c67931a354006837","ffffccd9f0a3addd8e78c67931a354006837","ffffccd9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(Tg),my=Lg(by),xy=new Array(3).concat("fff7bcfec44fd95f0e","ffffd4fed98efe9929cc4c02","ffffd4fed98efe9929d95f0e993404","ffffd4fee391fec44ffe9929d95f0e993404","ffffd4fee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(Tg),wy=Lg(xy),My=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(Tg),Ny=Lg(My),Ty=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(Tg),Ay=Lg(Ty),Sy=new Array(3).concat("e5f5e0a1d99b31a354","edf8e9bae4b374c476238b45","edf8e9bae4b374c47631a354006d2c","edf8e9c7e9c0a1d99b74c47631a354006d2c","edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(Tg),ky=Lg(Sy),Ey=new Array(3).concat("f0f0f0bdbdbd636363","f7f7f7cccccc969696525252","f7f7f7cccccc969696636363252525","f7f7f7d9d9d9bdbdbd969696636363252525","f7f7f7d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(Tg),Cy=Lg(Ey),Py=new Array(3).concat("efedf5bcbddc756bb1","f2f0f7cbc9e29e9ac86a51a3","f2f0f7cbc9e29e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(Tg),zy=Lg(Py),Ry=new Array(3).concat("fee0d2fc9272de2d26","fee5d9fcae91fb6a4acb181d","fee5d9fcae91fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(Tg),Dy=Lg(Ry),qy=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(Tg),Ly=Lg(qy)
;var Uy=gr(Ne(300,.5,0),Ne(-240,.5,1)),Oy=gr(Ne(-100,.75,.35),Ne(80,1.5,.8)),By=gr(Ne(260,.75,.35),Ne(80,1.5,.8)),Fy=Ne()
;var Yy=Yn(),Iy=Math.PI/3,Hy=2*Math.PI/3;function jy(t){var n=t.length
;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}
var Xy=jy(Tg("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),Vy=jy(Tg("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),Gy=jy(Tg("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),Wy=jy(Tg("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"))
;function Zy(t){return function(){return t}}
var $y=Math.abs,Qy=Math.atan2,Ky=Math.cos,Jy=Math.max,t_=Math.min,n_=Math.sin,e_=Math.sqrt,r_=1e-12,i_=Math.PI,o_=i_/2,a_=2*i_
;function u_(t){return t>1?0:t<-1?i_:Math.acos(t)}function c_(t){
return t>=1?o_:t<=-1?-o_:Math.asin(t)}function f_(t){return t.innerRadius}
function s_(t){return t.outerRadius}function l_(t){return t.startAngle}
function h_(t){return t.endAngle}function d_(t){return t&&t.padAngle}
function p_(t,n,e,r,i,o,a,u){var c=e-t,f=r-n,s=a-i,l=u-o,h=l*c-s*f
;if(!(h*h<r_))return[t+(h=(s*(n-o)-l*(t-i))/h)*c,n+h*f]}
function v_(t,n,e,r,i,o,a){
var u=t-e,c=n-r,f=(a?o:-o)/e_(u*u+c*c),s=f*c,l=-f*u,h=t+s,d=n+l,p=e+s,v=r+l,g=(h+p)/2,y=(d+v)/2,_=p-h,b=v-d,m=_*_+b*b,x=i-o,w=h*v-p*d,M=(b<0?-1:1)*e_(Jy(0,x*x*m-w*w)),N=(w*b-_*M)/m,T=(-w*_-b*M)/m,A=(w*b+_*M)/m,S=(-w*_+b*M)/m,k=N-g,E=T-y,C=A-g,P=S-y
;return k*k+E*E>C*C+P*P&&(N=A,T=S),{cx:N,cy:T,x01:-s,y01:-l,x11:N*(i/x-1),
y11:T*(i/x-1)}}function g_(t){this._context=t}function y_(t){return new g_(t)}
function __(t){return t[0]}function b_(t){return t[1]}function m_(){
var t=__,n=b_,e=Zy(!0),r=null,i=y_,o=null;function a(a){
var u,c,f,s=a.length,l=!1
;for(null==r&&(o=i(f=Po())),u=0;u<=s;++u)!(u<s&&e(c=a[u],u,a))===l&&((l=!l)?o.lineStart():o.lineEnd()),
l&&o.point(+t(c,u,a),+n(c,u,a));if(f)return o=null,f+""||null}
return a.x=function(n){return arguments.length?(t="function"==typeof n?n:Zy(+n),
a):t},a.y=function(t){
return arguments.length?(n="function"==typeof t?t:Zy(+t),a):n
},a.defined=function(t){
return arguments.length?(e="function"==typeof t?t:Zy(!!t),a):e
},a.curve=function(t){return arguments.length?(i=t,null!=r&&(o=i(r)),a):i
},a.context=function(t){return arguments.length?(null==t?r=o=null:o=i(r=t),a):r
},a}function x_(){var t=__,n=null,e=Zy(0),r=b_,i=Zy(!0),o=null,a=y_,u=null
;function c(c){var f,s,l,h,d,p=c.length,v=!1,g=new Array(p),y=new Array(p)
;for(null==o&&(u=a(d=Po())),f=0;f<=p;++f){
if(!(f<p&&i(h=c[f],f,c))===v)if(v=!v)s=f,u.areaStart(),u.lineStart();else{
for(u.lineEnd(),u.lineStart(),l=f-1;l>=s;--l)u.point(g[l],y[l])
;u.lineEnd(),u.areaEnd()}
v&&(g[f]=+t(h,f,c),y[f]=+e(h,f,c),u.point(n?+n(h,f,c):g[f],r?+r(h,f,c):y[f]))}
if(d)return u=null,d+""||null}function f(){
return m_().defined(i).curve(a).context(o)}return c.x=function(e){
return arguments.length?(t="function"==typeof e?e:Zy(+e),n=null,c):t
},c.x0=function(n){return arguments.length?(t="function"==typeof n?n:Zy(+n),c):t
},c.x1=function(t){
return arguments.length?(n=null==t?null:"function"==typeof t?t:Zy(+t),c):n
},c.y=function(t){
return arguments.length?(e="function"==typeof t?t:Zy(+t),r=null,c):e
},c.y0=function(t){return arguments.length?(e="function"==typeof t?t:Zy(+t),c):e
},c.y1=function(t){
return arguments.length?(r=null==t?null:"function"==typeof t?t:Zy(+t),c):r
},c.lineX0=c.lineY0=function(){return f().x(t).y(e)},c.lineY1=function(){
return f().x(t).y(r)},c.lineX1=function(){return f().x(n).y(e)
},c.defined=function(t){
return arguments.length?(i="function"==typeof t?t:Zy(!!t),c):i
},c.curve=function(t){return arguments.length?(a=t,null!=o&&(u=a(o)),c):a
},c.context=function(t){return arguments.length?(null==t?o=u=null:u=a(o=t),c):o
},c}function w_(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function M_(t){return t}
g_.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){
case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n)
;break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var N_=A_(y_)
;function T_(t){this._curve=t}function A_(t){function n(n){return new T_(t(n))}
return n._curve=t,n}function S_(t){var n=t.curve
;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){
return arguments.length?n(A_(t)):n()._curve},t}function k_(){
return S_(m_().curve(N_))}function E_(){
var t=x_().curve(N_),n=t.curve,e=t.lineX0,r=t.lineX1,i=t.lineY0,o=t.lineY1
;return t.angle=t.x,
delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,
t.radius=t.y,
delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,
t.lineStartAngle=function(){return S_(e())
},delete t.lineX0,t.lineEndAngle=function(){return S_(r())
},delete t.lineX1,t.lineInnerRadius=function(){return S_(i())
},delete t.lineY0,t.lineOuterRadius=function(){return S_(o())
},delete t.lineY1,t.curve=function(t){
return arguments.length?n(A_(t)):n()._curve},t}function C_(t,n){
return[(n=+n)*Math.cos(t-=Math.PI/2),n*Math.sin(t)]}T_.prototype={
areaStart:function(){this._curve.areaStart()},areaEnd:function(){
this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},
lineEnd:function(){this._curve.lineEnd()},point:function(t,n){
this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var P_=Array.prototype.slice
;function z_(t){return t.source}function R_(t){return t.target}function D_(t){
var n=z_,e=R_,r=__,i=b_,o=null;function a(){
var a,u=P_.call(arguments),c=n.apply(this,u),f=e.apply(this,u);if(o||(o=a=Po()),
t(o,+r.apply(this,(u[0]=c,
u)),+i.apply(this,u),+r.apply(this,(u[0]=f,u)),+i.apply(this,u)),
a)return o=null,a+""||null}return a.source=function(t){
return arguments.length?(n=t,a):n},a.target=function(t){
return arguments.length?(e=t,a):e},a.x=function(t){
return arguments.length?(r="function"==typeof t?t:Zy(+t),a):r},a.y=function(t){
return arguments.length?(i="function"==typeof t?t:Zy(+t),a):i
},a.context=function(t){return arguments.length?(o=null==t?null:t,a):o},a}
function q_(t,n,e,r,i){t.moveTo(n,e),t.bezierCurveTo(n=(n+r)/2,e,n,i,r,i)}
function L_(t,n,e,r,i){t.moveTo(n,e),t.bezierCurveTo(n,e=(e+i)/2,r,e,r,i)}
function U_(t,n,e,r,i){var o=C_(n,e),a=C_(n,e=(e+i)/2),u=C_(r,e),c=C_(r,i)
;t.moveTo(o[0],o[1]),t.bezierCurveTo(a[0],a[1],u[0],u[1],c[0],c[1])}var O_={
draw:function(t,n){var e=Math.sqrt(n/i_);t.moveTo(e,0),t.arc(0,0,e,0,a_)}},B_={
draw:function(t,n){var e=Math.sqrt(n/5)/2
;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),
t.lineTo(e,-3*e),t.lineTo(e,-e),
t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),
t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},F_=Math.sqrt(1/3),Y_=2*F_,I_={
draw:function(t,n){var e=Math.sqrt(n/Y_),r=e*F_
;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}
},H_=Math.sin(i_/10)/Math.sin(7*i_/10),j_=Math.sin(a_/10)*H_,X_=-Math.cos(a_/10)*H_,V_={
draw:function(t,n){var e=Math.sqrt(.8908130915292852*n),r=j_*e,i=X_*e
;t.moveTo(0,-e),t.lineTo(r,i);for(var o=1;o<5;++o){
var a=a_*o/5,u=Math.cos(a),c=Math.sin(a)
;t.lineTo(c*e,-u*e),t.lineTo(u*r-c*i,c*r+u*i)}t.closePath()}},G_={
draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}
},W_=Math.sqrt(3),Z_={draw:function(t,n){var e=-Math.sqrt(n/(3*W_))
;t.moveTo(0,2*e),t.lineTo(-W_*e,-e),t.lineTo(W_*e,-e),t.closePath()}
},$_=-.5,Q_=Math.sqrt(3)/2,K_=1/Math.sqrt(12),J_=3*(K_/2+1),tb={
draw:function(t,n){var e=Math.sqrt(n/J_),r=e/2,i=e*K_,o=r,a=e*K_+e,u=-o,c=a
;t.moveTo(r,i),
t.lineTo(o,a),t.lineTo(u,c),t.lineTo($_*r-Q_*i,Q_*r+$_*i),t.lineTo($_*o-Q_*a,Q_*o+$_*a),
t.lineTo($_*u-Q_*c,Q_*u+$_*c),
t.lineTo($_*r+Q_*i,$_*i-Q_*r),t.lineTo($_*o+Q_*a,$_*a-Q_*o),
t.lineTo($_*u+Q_*c,$_*c-Q_*u),t.closePath()}},nb=[O_,B_,I_,G_,V_,Z_,tb]
;function eb(){}function rb(t,n,e){
t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)
}function ib(t){this._context=t}function ob(t){this._context=t}function ab(t){
this._context=t}function ub(t,n){this._basis=new ib(t),this._beta=n}
ib.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){
this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){
switch(this._point){case 3:rb(this,this._x1,this._y1);case 2:
this._context.lineTo(this._x1,this._y1)}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){
case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n)
;break;case 1:this._point=2;break;case 2:
this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6)
;default:rb(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}
},ob.prototype={areaStart:eb,areaEnd:eb,lineStart:function(){
this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,
this._point=0},lineEnd:function(){switch(this._point){case 1:
this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:
this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),
this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),
this._context.closePath();break;case 3:
this.point(this._x2,this._y2),this.point(this._x3,this._y3),
this.point(this._x4,this._y4)}},point:function(t,n){
switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break
;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:
this._point=3,this._x4=t,
this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6)
;break;default:rb(this,t,n)}
this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},ab.prototype={
areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},
lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},
lineEnd:function(){
(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){
case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3
;var e=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+n)/6
;this._line?this._context.lineTo(e,r):this._context.moveTo(e,r);break;case 3:
this._point=4;default:rb(this,t,n)}
this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},ub.prototype={
lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},
lineEnd:function(){var t=this._x,n=this._y,e=t.length-1
;if(e>0)for(var r,i=t[0],o=n[0],a=t[e]-i,u=n[e]-o,c=-1;++c<=e;)r=c/e,
this._basis.point(this._beta*t[c]+(1-this._beta)*(i+r*a),this._beta*n[c]+(1-this._beta)*(o+r*u))
;this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){
this._x.push(+t),this._y.push(+n)}};var cb=function t(n){function e(t){
return 1===n?new ib(t):new ub(t,n)}return e.beta=function(n){return t(+n)},e
}(.85);function fb(t,n,e){
t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)
}function sb(t,n){this._context=t,this._k=(1-n)/6}sb.prototype={
areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},
lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},
lineEnd:function(){switch(this._point){case 2:
this._context.lineTo(this._x2,this._y2);break;case 3:fb(this,this._x1,this._y1)}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){
case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n)
;break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3
;default:fb(this,t,n)}
this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,
this._y1=this._y2,this._y2=n}};var lb=function t(n){function e(t){
return new sb(t,n)}return e.tension=function(n){return t(+n)},e}(0)
;function hb(t,n){this._context=t,this._k=(1-n)/6}hb.prototype={areaStart:eb,
areaEnd:eb,lineStart:function(){
this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,
this._point=0},lineEnd:function(){switch(this._point){case 1:
this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:
this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:
this.point(this._x3,this._y3),
this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},
point:function(t,n){switch(t=+t,n=+n,this._point){case 0:
this._point=1,this._x3=t,this._y3=n;break;case 1:
this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:
this._point=3,this._x5=t,this._y5=n;break;default:fb(this,t,n)}
this._x0=this._x1,
this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}}
;var db=function t(n){function e(t){return new hb(t,n)}
return e.tension=function(n){return t(+n)},e}(0);function pb(t,n){
this._context=t,this._k=(1-n)/6}pb.prototype={areaStart:function(){this._line=0
},areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},
lineEnd:function(){
(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){
case 0:this._point=1;break;case 1:this._point=2;break;case 2:
this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2)
;break;case 3:this._point=4;default:fb(this,t,n)}
this._x0=this._x1,this._x1=this._x2,
this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}}
;var vb=function t(n){function e(t){return new pb(t,n)}
return e.tension=function(n){return t(+n)},e}(0);function gb(t,n,e){
var r=t._x1,i=t._y1,o=t._x2,a=t._y2;if(t._l01_a>r_){
var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,c=3*t._l01_a*(t._l01_a+t._l12_a)
;r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/c,
i=(i*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/c}if(t._l23_a>r_){
var f=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,s=3*t._l23_a*(t._l23_a+t._l12_a)
;o=(o*f+t._x1*t._l23_2a-n*t._l12_2a)/s,a=(a*f+t._y1*t._l23_2a-e*t._l12_2a)/s}
t._context.bezierCurveTo(r,i,o,a,t._x2,t._y2)}function yb(t,n){
this._context=t,this._alpha=n}yb.prototype={areaStart:function(){this._line=0},
areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,
this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0
},lineEnd:function(){switch(this._point){case 2:
this._context.lineTo(this._x2,this._y2);break;case 3:
this.point(this._x2,this._y2)}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){
var e=this._x2-t,r=this._y2-n
;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}
switch(this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n)
;break;case 1:this._point=2;break;case 2:this._point=3;default:gb(this,t,n)}
this._l01_a=this._l12_a,
this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,
this._x0=this._x1,
this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}}
;var _b=function t(n){function e(t){return n?new yb(t,n):new sb(t,0)}
return e.alpha=function(n){return t(+n)},e}(.5);function bb(t,n){
this._context=t,this._alpha=n}bb.prototype={areaStart:eb,areaEnd:eb,
lineStart:function(){
this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,
this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0
},lineEnd:function(){switch(this._point){case 1:
this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:
this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:
this.point(this._x3,this._y3),
this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},
point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n
;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}
switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:
this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:
this._point=3,this._x5=t,this._y5=n;break;default:gb(this,t,n)}
this._l01_a=this._l12_a,
this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,
this._x0=this._x1,
this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}}
;var mb=function t(n){function e(t){return n?new bb(t,n):new hb(t,0)}
return e.alpha=function(n){return t(+n)},e}(.5);function xb(t,n){
this._context=t,this._alpha=n}xb.prototype={areaStart:function(){this._line=0},
areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,
this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0
},lineEnd:function(){
(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){
var e=this._x2-t,r=this._y2-n
;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}
switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break
;case 2:
this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2)
;break;case 3:this._point=4;default:gb(this,t,n)}
this._l01_a=this._l12_a,this._l12_a=this._l23_a,
this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,
this._x0=this._x1,this._x1=this._x2,
this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}}
;var wb=function t(n){function e(t){return n?new xb(t,n):new pb(t,0)}
return e.alpha=function(n){return t(+n)},e}(.5);function Mb(t){this._context=t}
function Nb(t){return t<0?-1:1}function Tb(t,n,e){
var r=t._x1-t._x0,i=n-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),a=(e-t._y1)/(i||r<0&&-0),u=(o*i+a*r)/(r+i)
;return(Nb(o)+Nb(a))*Math.min(Math.abs(o),Math.abs(a),.5*Math.abs(u))||0}
function Ab(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}
function Sb(t,n,e){var r=t._x0,i=t._y0,o=t._x1,a=t._y1,u=(o-r)/3
;t._context.bezierCurveTo(r+u,i+u*n,o-u,a-u*e,o,a)}function kb(t){
this._context=t}function Eb(t){this._context=new Cb(t)}function Cb(t){
this._context=t}function Pb(t){this._context=t}function zb(t){
var n,e,r=t.length-1,i=new Array(r),o=new Array(r),a=new Array(r)
;for(i[0]=0,o[0]=2,
a[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,o[n]=4,a[n]=4*t[n]+2*t[n+1]
;for(i[r-1]=2,o[r-1]=7,
a[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/o[n-1],o[n]-=e,a[n]-=e*a[n-1]
;for(i[r-1]=a[r-1]/o[r-1],n=r-2;n>=0;--n)i[n]=(a[n]-i[n+1])/o[n]
;for(o[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-i[n+1];return[i,o]}
function Rb(t,n){this._context=t,this._t=n}function Db(t,n){
if((i=t.length)>1)for(var e,r,i,o=1,a=t[n[0]],u=a.length;o<i;++o)for(r=a,
a=t[n[o]],e=0;e<u;++e)a[e][1]+=a[e][0]=isNaN(r[e][1])?r[e][0]:r[e][1]}
function qb(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e}
function Lb(t,n){return t[n]}function Ub(t){var n=t.map(Ob)
;return qb(t).sort((function(t,e){return n[t]-n[e]}))}function Ob(t){
for(var n,e=-1,r=0,i=t.length,o=-1/0;++e<i;)(n=+t[e][1])>o&&(o=n,r=e);return r}
function Bb(t){var n=t.map(Fb);return qb(t).sort((function(t,e){return n[t]-n[e]
}))}function Fb(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n)
;return e}function Yb(t){return function(){return t}}function Ib(t){return t[0]}
function Hb(t){return t[1]}function jb(){this._=null}function Xb(t){
t.U=t.C=t.L=t.R=t.P=t.N=null}function Vb(t,n){var e=n,r=n.R,i=e.U
;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}
function Gb(t,n){var e=n,r=n.L,i=e.U
;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}
function Wb(t){for(;t.L;)t=t.L;return t}function Zb(t,n,e,r){
var i=[null,null],o=bm.push(i)-1
;return i.left=t,i.right=n,e&&Qb(i,t,n,e),r&&Qb(i,n,t,r),
ym[t.index].halfedges.push(o),ym[n.index].halfedges.push(o),i}
function $b(t,n,e){var r=[n,e];return r.left=t,r}function Qb(t,n,e,r){
t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}
function Kb(t,n,e,r,i){
var o,a=t[0],u=t[1],c=a[0],f=a[1],s=0,l=1,h=u[0]-c,d=u[1]-f;if(o=n-c,h||!(o>0)){
if(o/=h,h<0){if(o<s)return;o<l&&(l=o)}else if(h>0){if(o>l)return;o>s&&(s=o)}
if(o=r-c,h||!(o<0)){if(o/=h,h<0){if(o>l)return;o>s&&(s=o)}else if(h>0){
if(o<s)return;o<l&&(l=o)}if(o=e-f,d||!(o>0)){if(o/=d,d<0){if(o<s)return
;o<l&&(l=o)}else if(d>0){if(o>l)return;o>s&&(s=o)}if(o=i-f,d||!(o<0)){
if(o/=d,d<0){if(o>l)return;o>s&&(s=o)}else if(d>0){if(o<s)return;o<l&&(l=o)}
return!(s>0||l<1)||(s>0&&(t[0]=[c+s*h,f+s*d]),l<1&&(t[1]=[c+l*h,f+l*d]),!0)}}}}}
function Jb(t,n,e,r,i){var o=t[1];if(o)return!0
;var a,u,c=t[0],f=t.left,s=t.right,l=f[0],h=f[1],d=s[0],p=s[1],v=(l+d)/2,g=(h+p)/2
;if(p===h){if(v<n||v>=r)return;if(l>d){if(c){if(c[1]>=i)return}else c=[v,e]
;o=[v,i]}else{if(c){if(c[1]<e)return}else c=[v,i];o=[v,e]}
}else if(u=g-(a=(l-d)/(p-h))*v,a<-1||a>1)if(l>d){if(c){if(c[1]>=i)return
}else c=[(e-u)/a,e];o=[(i-u)/a,i]}else{if(c){if(c[1]<e)return}else c=[(i-u)/a,i]
;o=[(e-u)/a,e]}else if(h<p){if(c){if(c[0]>=r)return}else c=[n,a*n+u];o=[r,a*r+u]
}else{if(c){if(c[0]<n)return}else c=[r,a*r+u];o=[n,a*n+u]}
return t[0]=c,t[1]=o,!0}function tm(t,n){var e=t.site,r=n.left,i=n.right
;return e===i&&(i=r,
r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],
i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function nm(t,n){
return n[+(n.left!==t.site)]}function em(t,n){return n[+(n.left===t.site)]}
Mb.prototype={areaStart:eb,areaEnd:eb,lineStart:function(){this._point=0},
lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){
t=+t,
n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))
}},kb.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){
this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},
lineEnd:function(){switch(this._point){case 2:
this._context.lineTo(this._x1,this._y1);break;case 3:
Sb(this,this._t0,Ab(this,this._t0))}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,n){var e=NaN
;if(n=+n,(t=+t)!==this._x1||n!==this._y1){switch(this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n)
;break;case 1:this._point=2;break;case 2:
this._point=3,Sb(this,Ab(this,e=Tb(this,t,n)),e);break;default:
Sb(this,this._t0,e=Tb(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,
this._y1=n,this._t0=e}}
},(Eb.prototype=Object.create(kb.prototype)).point=function(t,n){
kb.prototype.point.call(this,n,t)},Cb.prototype={moveTo:function(t,n){
this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},
lineTo:function(t,n){this._context.lineTo(n,t)},
bezierCurveTo:function(t,n,e,r,i,o){this._context.bezierCurveTo(n,t,r,e,o,i)}
},Pb.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){
var t=this._x,n=this._y,e=t.length
;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),
2===e)this._context.lineTo(t[1],n[1]);else for(var r=zb(t),i=zb(n),o=0,a=1;a<e;++o,
++a)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[a],n[a])
;(this._line||0!==this._line&&1===e)&&this._context.closePath(),
this._line=1-this._line,this._x=this._y=null},point:function(t,n){
this._x.push(+t),this._y.push(+n)}},Rb.prototype={areaStart:function(){
this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){
this._x=this._y=NaN,this._point=0},lineEnd:function(){
0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){
switch(t=+t,n=+n,this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n)
;break;case 1:this._point=2;default:
if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{
var e=this._x*(1-this._t)+t*this._t
;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}
},jb.prototype={constructor:jb,insert:function(t,n){var e,r,i;if(t){
if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n
;e=t
}else this._?(t=Wb(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,
e=null)
;for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)e===(r=e.U).L?(i=r.R)&&i.C?(e.C=i.C=!1,
r.C=!0,
t=r):(t===e.R&&(Vb(this,e),e=(t=e).U),e.C=!1,r.C=!0,Gb(this,r)):(i=r.L)&&i.C?(e.C=i.C=!1,
r.C=!0,t=r):(t===e.L&&(Gb(this,e),e=(t=e).U),e.C=!1,r.C=!0,Vb(this,r)),e=t.U
;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null
;var n,e,r,i=t.U,o=t.L,a=t.R
;if(e=o?a?Wb(a):o:a,i?i.L===t?i.L=e:i.R=e:this._=e,o&&a?(r=e.C,
e.C=t.C,e.L=o,o.U=e,
e!==a?(i=e.U,e.U=t.U,t=e.R,i.L=t,e.R=a,a.U=e):(e.U=i,i=e,t=e.R)):(r=t.C,
t=e),t&&(t.U=i),!r)if(t&&t.C)t.C=!1;else{do{if(t===this._)break;if(t===i.L){
if((n=i.R).C&&(n.C=!1,i.C=!0,Vb(this,i),n=i.R),n.L&&n.L.C||n.R&&n.R.C){
n.R&&n.R.C||(n.L.C=!1,
n.C=!0,Gb(this,n),n=i.R),n.C=i.C,i.C=n.R.C=!1,Vb(this,i),t=this._;break}
}else if((n=i.L).C&&(n.C=!1,i.C=!0,Gb(this,i),n=i.L),n.L&&n.L.C||n.R&&n.R.C){
n.L&&n.L.C||(n.R.C=!1,
n.C=!0,Vb(this,n),n=i.L),n.C=i.C,i.C=n.L.C=!1,Gb(this,i),t=this._;break}
n.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var rm,im=[];function om(){Xb(this),
this.x=this.y=this.arc=this.site=this.cy=null}function am(t){var n=t.P,e=t.N
;if(n&&e){var r=n.site,i=t.site,o=e.site;if(r!==o){
var a=i[0],u=i[1],c=r[0]-a,f=r[1]-u,s=o[0]-a,l=o[1]-u,h=2*(c*l-f*s)
;if(!(h>=-xm)){
var d=c*c+f*f,p=s*s+l*l,v=(l*d-f*p)/h,g=(c*p-s*d)/h,y=im.pop()||new om
;y.arc=t,y.site=i,y.x=v+a,y.y=(y.cy=g+u)+Math.sqrt(v*v+g*g),t.circle=y
;for(var _=null,b=_m._;b;)if(y.y<b.y||y.y===b.y&&y.x<=b.x){if(!b.L){_=b.P;break}
b=b.L}else{if(!b.R){_=b;break}b=b.R}_m.insert(_,y),_||(rm=y)}}}}function um(t){
var n=t.circle;n&&(n.P||(rm=n.N),_m.remove(n),im.push(n),Xb(n),t.circle=null)}
var cm=[];function fm(){Xb(this),this.edge=this.site=this.circle=null}
function sm(t){var n=cm.pop()||new fm;return n.site=t,n}function lm(t){
um(t),gm.remove(t),cm.push(t),Xb(t)}function hm(t){
var n=t.circle,e=n.x,r=n.cy,i=[e,r],o=t.P,a=t.N,u=[t];lm(t)
;for(var c=o;c.circle&&Math.abs(e-c.circle.x)<mm&&Math.abs(r-c.circle.cy)<mm;)o=c.P,
u.unshift(c),lm(c),c=o;u.unshift(c),um(c)
;for(var f=a;f.circle&&Math.abs(e-f.circle.x)<mm&&Math.abs(r-f.circle.cy)<mm;)a=f.N,
u.push(f),lm(f),f=a;u.push(f),um(f);var s,l=u.length
;for(s=1;s<l;++s)f=u[s],c=u[s-1],Qb(f.edge,c.site,f.site,i)
;c=u[0],(f=u[l-1]).edge=Zb(c.site,f.site,null,i),am(c),am(f)}function dm(t){
for(var n,e,r,i,o=t[0],a=t[1],u=gm._;u;)if((r=pm(u,a)-o)>mm)u=u.L;else{
if(!((i=o-vm(u,a))>mm)){r>-mm?(n=u.P,e=u):i>-mm?(n=u,e=u.N):n=e=u;break}
if(!u.R){n=u;break}u=u.R}!function(t){ym[t.index]={site:t,halfedges:[]}}(t)
;var c=sm(t);if(gm.insert(n,c),n||e){
if(n===e)return um(n),e=sm(n.site),gm.insert(c,e),
c.edge=e.edge=Zb(n.site,c.site),am(n),void am(e);if(e){um(n),um(e)
;var f=n.site,s=f[0],l=f[1],h=t[0]-s,d=t[1]-l,p=e.site,v=p[0]-s,g=p[1]-l,y=2*(h*g-d*v),_=h*h+d*d,b=v*v+g*g,m=[(g*_-d*b)/y+s,(h*b-v*_)/y+l]
;Qb(e.edge,f,p,m),c.edge=Zb(f,t,null,m),e.edge=Zb(t,p,null,m),am(n),am(e)
}else c.edge=Zb(n.site,c.site)}}function pm(t,n){
var e=t.site,r=e[0],i=e[1],o=i-n;if(!o)return r;var a=t.P;if(!a)return-1/0
;var u=(e=a.site)[0],c=e[1],f=c-n;if(!f)return u;var s=u-r,l=1/o-1/f,h=s/f
;return l?(-h+Math.sqrt(h*h-2*l*(s*s/(-2*f)-c+f/2+i-o/2)))/l+r:(r+u)/2}
function vm(t,n){var e=t.N;if(e)return pm(e,n);var r=t.site
;return r[1]===n?r[0]:1/0}var gm,ym,_m,bm,mm=1e-6,xm=1e-12;function wm(t,n,e){
return(t[0]-e[0])*(n[1]-t[1])-(t[0]-n[0])*(e[1]-t[1])}function Mm(t,n){
return n[1]-t[1]||n[0]-t[0]}function Nm(t,n){var e,r,i,o=t.sort(Mm).pop()
;for(bm=[],
ym=new Array(t.length),gm=new jb,_m=new jb;;)if(i=rm,o&&(!i||o[1]<i.y||o[1]===i.y&&o[0]<i.x))o[0]===e&&o[1]===r||(dm(o),
e=o[0],r=o[1]),o=t.pop();else{if(!i)break;hm(i.arc)}if(function(){
for(var t,n,e,r,i=0,o=ym.length;i<o;++i)if((t=ym[i])&&(r=(n=t.halfedges).length)){
var a=new Array(r),u=new Array(r);for(e=0;e<r;++e)a[e]=e,u[e]=tm(t,bm[n[e]])
;for(a.sort((function(t,n){return u[n]-u[t]})),e=0;e<r;++e)u[e]=n[a[e]]
;for(e=0;e<r;++e)n[e]=u[e]}}(),n){
var a=+n[0][0],u=+n[0][1],c=+n[1][0],f=+n[1][1];!function(t,n,e,r){
for(var i,o=bm.length;o--;)Jb(i=bm[o],t,n,e,r)&&Kb(i,t,n,e,r)&&(Math.abs(i[0][0]-i[1][0])>mm||Math.abs(i[0][1]-i[1][1])>mm)||delete bm[o]
}(a,u,c,f),function(t,n,e,r){var i,o,a,u,c,f,s,l,h,d,p,v,g=ym.length,y=!0
;for(i=0;i<g;++i)if(o=ym[i]){
for(a=o.site,u=(c=o.halfedges).length;u--;)bm[c[u]]||c.splice(u,1)
;for(u=0,f=c.length;u<f;)p=(d=em(o,bm[c[u]]))[0],
v=d[1],l=(s=nm(o,bm[c[++u%f]]))[0],
h=s[1],(Math.abs(p-l)>mm||Math.abs(v-h)>mm)&&(c.splice(u,0,bm.push($b(a,d,Math.abs(p-t)<mm&&r-v>mm?[t,Math.abs(l-t)<mm?h:r]:Math.abs(v-r)<mm&&e-p>mm?[Math.abs(h-r)<mm?l:e,r]:Math.abs(p-e)<mm&&v-n>mm?[e,Math.abs(l-e)<mm?h:n]:Math.abs(v-n)<mm&&p-t>mm?[Math.abs(h-n)<mm?l:t,n]:null))-1),
++f);f&&(y=!1)}if(y){var _,b,m,x=1/0
;for(i=0,y=null;i<g;++i)(o=ym[i])&&(m=(_=(a=o.site)[0]-t)*_+(b=a[1]-n)*b)<x&&(x=m,
y=o);if(y){var w=[t,n],M=[t,r],N=[e,r],T=[e,n]
;y.halfedges.push(bm.push($b(a=y.site,w,M))-1,bm.push($b(a,M,N))-1,bm.push($b(a,N,T))-1,bm.push($b(a,T,w))-1)
}}for(i=0;i<g;++i)(o=ym[i])&&(o.halfedges.length||delete ym[i])}(a,u,c,f)}
this.edges=bm,this.cells=ym,gm=_m=bm=ym=null}function Tm(t){return function(){
return t}}function Am(t,n,e){this.target=t,this.type=n,this.transform=e}
function Sm(t,n,e){this.k=t,this.x=n,this.y=e}Nm.prototype={constructor:Nm,
polygons:function(){var t=this.edges;return this.cells.map((function(n){
var e=n.halfedges.map((function(e){return nm(n,t[e])}))
;return e.data=n.site.data,e}))},triangles:function(){var t=[],n=this.edges
;return this.cells.forEach((function(e,r){
if(o=(i=e.halfedges).length)for(var i,o,a,u=e.site,c=-1,f=n[i[o-1]],s=f.left===u?f.right:f.left;++c<o;)a=s,
s=(f=n[i[c]]).left===u?f.right:f.left,
a&&s&&r<a.index&&r<s.index&&wm(u,a,s)<0&&t.push([u.data,a.data,s.data])})),t},
links:function(){return this.edges.filter((function(t){return t.right
})).map((function(t){return{source:t.left.data,target:t.right.data}}))},
find:function(t,n,e){
for(var r,i,o=this,a=o._found||0,u=o.cells.length;!(i=o.cells[a]);)if(++a>=u)return null
;var c=t-i.site[0],f=n-i.site[1],s=c*c+f*f;do{
i=o.cells[r=a],a=null,i.halfedges.forEach((function(e){var r=o.edges[e],u=r.left
;if(u!==i.site&&u||(u=r.right)){var c=t-u[0],f=n-u[1],l=c*c+f*f
;l<s&&(s=l,a=u.index)}}))}while(null!==a)
;return o._found=r,null==e||s<=e*e?i.site:null}},Sm.prototype={constructor:Sm,
scale:function(t){return 1===t?this:new Sm(this.k*t,this.x,this.y)},
translate:function(t,n){
return 0===t&0===n?this:new Sm(this.k,this.x+this.k*t,this.y+this.k*n)},
apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},
applyX:function(t){return t*this.k+this.x},applyY:function(t){
return t*this.k+this.y},invert:function(t){
return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){
return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},
rescaleX:function(t){
return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},
rescaleY:function(t){
return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},
toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}}
;var km=new Sm(1,0,0);function Em(t){
for(;!t.__zoom;)if(!(t=t.parentNode))return km;return t.__zoom}function Cm(){
t.event.stopImmediatePropagation()}function Pm(){
t.event.preventDefault(),t.event.stopImmediatePropagation()}function zm(){
return!t.event.ctrlKey&&!t.event.button}function Rm(){var t=this
;return t instanceof SVGElement?(t=t.ownerSVGElement||t).hasAttribute("viewBox")?[[(t=t.viewBox.baseVal).x,t.y],[t.x+t.width,t.y+t.height]]:[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]:[[0,0],[t.clientWidth,t.clientHeight]]
}function Dm(){return this.__zoom||km}function qm(){
return-t.event.deltaY*(1===t.event.deltaMode?.05:t.event.deltaMode?1:.002)}
function Lm(){return navigator.maxTouchPoints||"ontouchstart"in this}
function Um(t,n,e){
var r=t.invertX(n[0][0])-e[0][0],i=t.invertX(n[1][0])-e[1][0],o=t.invertY(n[0][1])-e[0][1],a=t.invertY(n[1][1])-e[1][1]
;return t.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),a>o?(o+a)/2:Math.min(0,o)||Math.max(0,a))
}Em.prototype=Sm.prototype,t.FormatSpecifier=lu,t.active=function(t,n){
var e,r,i=t.__transition
;if(i)for(r in n=null==n?null:n+"",i)if((e=i[r]).state>1&&e.name===n)return new gi([[t]],Hi,n,+r)
;return null},t.arc=function(){
var t=f_,n=s_,e=Zy(0),r=null,i=l_,o=h_,a=d_,u=null;function c(){
var c,f,s=+t.apply(this,arguments),l=+n.apply(this,arguments),h=i.apply(this,arguments)-o_,d=o.apply(this,arguments)-o_,p=$y(d-h),v=d>h
;if(u||(u=c=Po()),
l<s&&(f=l,l=s,s=f),l>r_)if(p>a_-r_)u.moveTo(l*Ky(h),l*n_(h)),u.arc(0,0,l,h,d,!v),
s>r_&&(u.moveTo(s*Ky(d),s*n_(d)),u.arc(0,0,s,d,h,v));else{
var g,y,_=h,b=d,m=h,x=d,w=p,M=p,N=a.apply(this,arguments)/2,T=N>r_&&(r?+r.apply(this,arguments):e_(s*s+l*l)),A=t_($y(l-s)/2,+e.apply(this,arguments)),S=A,k=A
;if(T>r_){var E=c_(T/s*n_(N)),C=c_(T/l*n_(N))
;(w-=2*E)>r_?(m+=E*=v?1:-1,x-=E):(w=0,
m=x=(h+d)/2),(M-=2*C)>r_?(_+=C*=v?1:-1,b-=C):(M=0,_=b=(h+d)/2)}
var P=l*Ky(_),z=l*n_(_),R=s*Ky(x),D=s*n_(x);if(A>r_){
var q,L=l*Ky(b),U=l*n_(b),O=s*Ky(m),B=s*n_(m);if(p<i_&&(q=p_(P,z,O,B,L,U,R,D))){
var F=P-q[0],Y=z-q[1],I=L-q[0],H=U-q[1],j=1/n_(u_((F*I+Y*H)/(e_(F*F+Y*Y)*e_(I*I+H*H)))/2),X=e_(q[0]*q[0]+q[1]*q[1])
;S=t_(A,(s-X)/(j-1)),k=t_(A,(l-X)/(j+1))}}
M>r_?k>r_?(g=v_(O,B,P,z,l,k,v),y=v_(L,U,R,D,l,k,v),
u.moveTo(g.cx+g.x01,g.cy+g.y01),
k<A?u.arc(g.cx,g.cy,k,Qy(g.y01,g.x01),Qy(y.y01,y.x01),!v):(u.arc(g.cx,g.cy,k,Qy(g.y01,g.x01),Qy(g.y11,g.x11),!v),
u.arc(0,0,l,Qy(g.cy+g.y11,g.cx+g.x11),Qy(y.cy+y.y11,y.cx+y.x11),!v),
u.arc(y.cx,y.cy,k,Qy(y.y11,y.x11),Qy(y.y01,y.x01),!v))):(u.moveTo(P,z),
u.arc(0,0,l,_,b,!v)):u.moveTo(P,z),
s>r_&&w>r_?S>r_?(g=v_(R,D,L,U,s,-S,v),y=v_(P,z,O,B,s,-S,v),
u.lineTo(g.cx+g.x01,g.cy+g.y01),
S<A?u.arc(g.cx,g.cy,S,Qy(g.y01,g.x01),Qy(y.y01,y.x01),!v):(u.arc(g.cx,g.cy,S,Qy(g.y01,g.x01),Qy(g.y11,g.x11),!v),
u.arc(0,0,s,Qy(g.cy+g.y11,g.cx+g.x11),Qy(y.cy+y.y11,y.cx+y.x11),v),
u.arc(y.cx,y.cy,S,Qy(y.y11,y.x11),Qy(y.y01,y.x01),!v))):u.arc(0,0,s,x,m,v):u.lineTo(R,D)
}else u.moveTo(0,0);if(u.closePath(),c)return u=null,c+""||null}
return c.centroid=function(){
var e=(+t.apply(this,arguments)+ +n.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-i_/2
;return[Ky(r)*e,n_(r)*e]},c.innerRadius=function(n){
return arguments.length?(t="function"==typeof n?n:Zy(+n),c):t
},c.outerRadius=function(t){
return arguments.length?(n="function"==typeof t?t:Zy(+t),c):n
},c.cornerRadius=function(t){
return arguments.length?(e="function"==typeof t?t:Zy(+t),c):e
},c.padRadius=function(t){
return arguments.length?(r=null==t?null:"function"==typeof t?t:Zy(+t),c):r
},c.startAngle=function(t){
return arguments.length?(i="function"==typeof t?t:Zy(+t),c):i
},c.endAngle=function(t){
return arguments.length?(o="function"==typeof t?t:Zy(+t),c):o
},c.padAngle=function(t){
return arguments.length?(a="function"==typeof t?t:Zy(+t),c):a
},c.context=function(t){return arguments.length?(u=null==t?null:t,c):u},c
},t.area=x_,t.areaRadial=E_,t.ascending=n,t.autoType=function(t){
for(var n in t){var e,r,i=t[n].trim()
;if(i)if("true"===i)i=!0;else if("false"===i)i=!1;else if("NaN"===i)i=NaN;else if(isNaN(e=+i)){
if(!(r=i.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)))continue
;Ca&&r[4]&&!r[7]&&(i=i.replace(/-/g,"/").replace(/T/," ")),i=new Date(i)
}else i=e;else i=null;t[n]=i}return t},t.axisBottom=function(t){return O(3,t)
},t.axisLeft=function(t){return O(4,t)},t.axisRight=function(t){return O(2,t)
},t.axisTop=function(t){return O(1,t)
},t.bisect=i,t.bisectLeft=o,t.bisectRight=i,t.bisector=e,t.blob=function(t,n){
return fetch(t,n).then(Pa)},t.brush=function(){return go(ro)
},t.brushSelection=function(t){var n=t.__brush
;return n?n.dim.output(n.selection):null},t.brushX=function(){return go(no)
},t.brushY=function(){return go(eo)},t.buffer=function(t,n){
return fetch(t,n).then(za)},t.chord=function(){var t=0,n=null,e=null,r=null
;function i(i){
var o,a,u,c,f,s,l=i.length,h=[],d=g(l),p=[],v=[],y=v.groups=new Array(l),_=new Array(l*l)
;for(o=0,f=-1;++f<l;){for(a=0,s=-1;++s<l;)a+=i[f][s];h.push(a),p.push(g(l)),o+=a
}for(n&&d.sort((function(t,e){return n(h[t],h[e])
})),e&&p.forEach((function(t,n){t.sort((function(t,r){return e(i[n][t],i[n][r])
}))})),c=(o=wo(0,xo-t*l)/o)?t:xo/l,a=0,f=-1;++f<l;){for(u=a,s=-1;++s<l;){
var b=d[f],m=p[b][s],x=i[b][m],w=a,M=a+=x*o;_[m*l+b]={index:b,subindex:m,
startAngle:w,endAngle:M,value:x}}y[b]={index:b,startAngle:u,endAngle:a,
value:h[b]},a+=c}for(f=-1;++f<l;)for(s=f-1;++s<l;){var N=_[s*l+f],T=_[f*l+s]
;(N.value||T.value)&&v.push(N.value<T.value?{source:T,target:N}:{source:N,
target:T})}return r?v.sort(r):v}return i.padAngle=function(n){
return arguments.length?(t=wo(0,n),i):t},i.sortGroups=function(t){
return arguments.length?(n=t,i):n},i.sortSubgroups=function(t){
return arguments.length?(e=t,i):e},i.sortChords=function(t){
return arguments.length?(null==t?r=null:(r=Mo(t))._=t,i):r&&r._},i
},t.clientPoint=an,t.cluster=function(){var t=$l,n=1,e=1,r=!1;function i(i){
var o,a=0;i.eachAfter((function(n){var e=n.children;e?(n.x=function(t){
return t.reduce(Ql,0)/t.length}(e),n.y=function(t){return 1+t.reduce(Kl,0)
}(e)):(n.x=o?a+=t(n,o):0,n.y=0,o=n)}));var u=function(t){
for(var n;n=t.children;)t=n[0];return t}(i),c=function(t){
for(var n;n=t.children;)t=n[n.length-1];return t
}(i),f=u.x-t(u,c)/2,s=c.x+t(c,u)/2;return i.eachAfter(r?function(t){
t.x=(t.x-i.x)*n,t.y=(i.y-t.y)*e}:function(t){
t.x=(t.x-f)/(s-f)*n,t.y=(1-(i.y?t.y/i.y:1))*e})}return i.separation=function(n){
return arguments.length?(t=n,i):t},i.size=function(t){
return arguments.length?(r=!1,n=+t[0],e=+t[1],i):r?null:[n,e]
},i.nodeSize=function(t){
return arguments.length?(r=!0,n=+t[0],e=+t[1],i):r?[n,e]:null},i
},t.color=Un,t.contourDensity=function(){
var t=ia,n=oa,e=aa,r=960,i=500,o=20,a=2,u=3*o,c=r+2*u>>a,f=i+2*u>>a,s=Zo(20)
;function l(r){var i=new Float32Array(c*f),l=new Float32Array(c*f)
;r.forEach((function(r,o,s){var l=+t(r,o,s)+u>>a,h=+n(r,o,s)+u>>a,d=+e(r,o,s)
;l>=0&&l<c&&h>=0&&h<f&&(i[l+h*c]+=d)})),ea({width:c,height:f,data:i},{width:c,
height:f,data:l},o>>a),ra({width:c,height:f,data:l},{width:c,height:f,data:i
},o>>a),ea({width:c,height:f,data:i},{width:c,height:f,data:l},o>>a),ra({
width:c,height:f,data:l},{width:c,height:f,data:i},o>>a),ea({width:c,height:f,
data:i},{width:c,height:f,data:l},o>>a),ra({width:c,height:f,data:l},{width:c,
height:f,data:i},o>>a);var d=s(i);if(!Array.isArray(d)){var p=T(i)
;d=w(0,p,d),(d=g(0,Math.floor(p/d)*d,d)).shift()}
return na().thresholds(d).size([c,f])(i).map(h)}function h(t){
return t.value*=Math.pow(2,-2*a),t.coordinates.forEach(d),t}function d(t){
t.forEach(p)}function p(t){t.forEach(v)}function v(t){t[0]=t[0]*Math.pow(2,a)-u,
t[1]=t[1]*Math.pow(2,a)-u}function y(){return c=r+2*(u=3*o)>>a,f=i+2*u>>a,l}
return l.x=function(n){return arguments.length?(t="function"==typeof n?n:Zo(+n),
l):t},l.y=function(t){
return arguments.length?(n="function"==typeof t?t:Zo(+t),l):n
},l.weight=function(t){return arguments.length?(e="function"==typeof t?t:Zo(+t),
l):e},l.size=function(t){if(!arguments.length)return[r,i]
;var n=Math.ceil(t[0]),e=Math.ceil(t[1])
;if(!(n>=0||n>=0))throw new Error("invalid size");return r=n,i=e,y()
},l.cellSize=function(t){if(!arguments.length)return 1<<a
;if(!((t=+t)>=1))throw new Error("invalid cell size")
;return a=Math.floor(Math.log(t)/Math.LN2),y()},l.thresholds=function(t){
return arguments.length?(s="function"==typeof t?t:Array.isArray(t)?Zo(Go.call(t)):Zo(t),
l):s},l.bandwidth=function(t){if(!arguments.length)return Math.sqrt(o*(o+1))
;if(!((t=+t)>=0))throw new Error("invalid bandwidth")
;return o=Math.round((Math.sqrt(4*t*t+1)-1)/2),y()},l
},t.contours=na,t.create=function(t){
return tn($(t).call(document.documentElement))
},t.creator=$,t.cross=function(t,n,e){
var r,i,o,u,c=t.length,f=n.length,s=new Array(c*f)
;for(null==e&&(e=a),r=o=0;r<c;++r)for(u=t[r],i=0;i<f;++i,++o)s[o]=e(u,n[i])
;return s
},t.csv=La,t.csvFormat=ya,t.csvFormatBody=_a,t.csvFormatRow=ma,t.csvFormatRows=ba,
t.csvFormatValue=xa,
t.csvParse=va,t.csvParseRows=ga,t.cubehelix=Ne,t.curveBasis=function(t){
return new ib(t)},t.curveBasisClosed=function(t){return new ob(t)
},t.curveBasisOpen=function(t){return new ab(t)
},t.curveBundle=cb,t.curveCardinal=lb,
t.curveCardinalClosed=db,t.curveCardinalOpen=vb,
t.curveCatmullRom=_b,t.curveCatmullRomClosed=mb,
t.curveCatmullRomOpen=wb,t.curveLinear=y_,t.curveLinearClosed=function(t){
return new Mb(t)},t.curveMonotoneX=function(t){return new kb(t)
},t.curveMonotoneY=function(t){return new Eb(t)},t.curveNatural=function(t){
return new Pb(t)},t.curveStep=function(t){return new Rb(t,.5)
},t.curveStepAfter=function(t){return new Rb(t,1)
},t.curveStepBefore=function(t){return new Rb(t,0)
},t.customEvent=Gt,t.descending=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN
},t.deviation=f,t.dispatch=F,t.drag=function(){
var n,e,r,i,o=vn,a=gn,u=yn,c=_n,f={},s=F("start","drag","end"),l=0,h=0
;function d(t){
t.on("mousedown.drag",p).filter(c).on("touchstart.drag",y).on("touchmove.drag",_).on("touchend.drag touchcancel.drag",b).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")
}function p(){if(!i&&o.apply(this,arguments)){
var u=m("mouse",a.apply(this,arguments),un,this,arguments)
;u&&(tn(t.event.view).on("mousemove.drag",v,!0).on("mouseup.drag",g,!0),
ln(t.event.view),fn(),r=!1,n=t.event.clientX,e=t.event.clientY,u("start"))}}
function v(){if(sn(),!r){var i=t.event.clientX-n,o=t.event.clientY-e;r=i*i+o*o>h
}f.mouse("drag")}function g(){
tn(t.event.view).on("mousemove.drag mouseup.drag",null),hn(t.event.view,r),sn(),
f.mouse("end")}function y(){if(o.apply(this,arguments)){
var n,e,r=t.event.changedTouches,i=a.apply(this,arguments),u=r.length
;for(n=0;n<u;++n)(e=m(r[n].identifier,i,cn,this,arguments))&&(fn(),e("start"))}}
function _(){var n,e,r=t.event.changedTouches,i=r.length
;for(n=0;n<i;++n)(e=f[r[n].identifier])&&(sn(),e("drag"))}function b(){
var n,e,r=t.event.changedTouches,o=r.length
;for(i&&clearTimeout(i),i=setTimeout((function(){i=null
}),500),n=0;n<o;++n)(e=f[r[n].identifier])&&(fn(),e("end"))}
function m(n,e,r,i,o){var a,c,h,p=r(e,n),v=s.copy()
;if(Gt(new pn(d,"beforestart",a,n,l,p[0],p[1],0,0,v),(function(){
return null!=(t.event.subject=a=u.apply(i,o))&&(c=a.x-p[0]||0,h=a.y-p[1]||0,!0)
})))return function t(u){var s,g=p;switch(u){case"start":f[n]=t,s=l++;break
;case"end":delete f[n],--l;case"drag":p=r(e,n),s=l}
Gt(new pn(d,u,a,n,s,p[0]+c,p[1]+h,p[0]-g[0],p[1]-g[1],v),v.apply,v,[u,i,o])}}
return d.filter=function(t){
return arguments.length?(o="function"==typeof t?t:dn(!!t),d):o
},d.container=function(t){
return arguments.length?(a="function"==typeof t?t:dn(t),d):a
},d.subject=function(t){return arguments.length?(u="function"==typeof t?t:dn(t),
d):u},d.touchable=function(t){
return arguments.length?(c="function"==typeof t?t:dn(!!t),d):c},d.on=function(){
var t=s.on.apply(s,arguments);return t===s?d:t},d.clickDistance=function(t){
return arguments.length?(h=(t=+t)*t,d):Math.sqrt(h)},d
},t.dragDisable=ln,t.dragEnable=hn,t.dsv=function(t,n,e,r){
3===arguments.length&&"function"==typeof e&&(r=e,e=void 0);var i=da(t)
;return Da(n,e).then((function(t){return i.parse(t,r)}))
},t.dsvFormat=da,t.easeBack=Li,
t.easeBackIn=Di,t.easeBackInOut=Li,t.easeBackOut=qi,
t.easeBounce=zi,t.easeBounceIn=function(t){return 1-zi(1-t)
},t.easeBounceInOut=function(t){return((t*=2)<=1?1-zi(1-t):zi(t-1)+1)/2
},t.easeBounceOut=zi,t.easeCircle=Ei,t.easeCircleIn=function(t){
return 1-Math.sqrt(1-t*t)},t.easeCircleInOut=Ei,t.easeCircleOut=function(t){
return Math.sqrt(1- --t*t)},t.easeCubic=xi,t.easeCubicIn=function(t){
return t*t*t},t.easeCubicInOut=xi,t.easeCubicOut=function(t){return--t*t*t+1
},t.easeElastic=Bi,t.easeElasticIn=Oi,t.easeElasticInOut=Fi,t.easeElasticOut=Bi,
t.easeExp=ki,t.easeExpIn=function(t){return Math.pow(2,10*t-10)
},t.easeExpInOut=ki,t.easeExpOut=function(t){return 1-Math.pow(2,-10*t)
},t.easeLinear=function(t){return+t
},t.easePoly=Ni,t.easePolyIn=wi,t.easePolyInOut=Ni,
t.easePolyOut=Mi,t.easeQuad=mi,t.easeQuadIn=function(t){return t*t
},t.easeQuadInOut=mi,t.easeQuadOut=function(t){return t*(2-t)
},t.easeSin=Si,t.easeSinIn=function(t){return 1-Math.cos(t*Ai)
},t.easeSinInOut=Si,t.easeSinOut=function(t){return Math.sin(t*Ai)
},t.entries=function(t){var n=[];for(var e in t)n.push({key:e,value:t[e]})
;return n},t.extent=s,t.forceCenter=function(t,n){var e;function r(){
var r,i,o=e.length,a=0,u=0;for(r=0;r<o;++r)a+=(i=e[r]).x,u+=i.y
;for(a=a/o-t,u=u/o-n,r=0;r<o;++r)(i=e[r]).x-=a,i.y-=u}
return null==t&&(t=0),null==n&&(n=0),r.initialize=function(t){e=t
},r.x=function(n){return arguments.length?(t=+n,r):t},r.y=function(t){
return arguments.length?(n=+t,r):n},r},t.forceCollide=function(t){
var n,e,r=1,i=1;function o(){
for(var t,o,u,c,f,s,l,h=n.length,d=0;d<i;++d)for(o=Za(n,Ja,tu).visitAfter(a),
t=0;t<h;++t)u=n[t],s=e[u.index],l=s*s,c=u.x+u.vx,f=u.y+u.vy,o.visit(p)
;function p(t,n,e,i,o){var a=t.data,h=t.r,d=s+h
;if(!a)return n>c+d||i<c-d||e>f+d||o<f-d;if(a.index>u.index){
var p=c-a.x-a.vx,v=f-a.y-a.vy,g=p*p+v*v
;g<d*d&&(0===p&&(g+=(p=ja())*p),0===v&&(g+=(v=ja())*v),
g=(d-(g=Math.sqrt(g)))/g*r,
u.vx+=(p*=g)*(d=(h*=h)/(l+h)),u.vy+=(v*=g)*d,a.vx-=p*(d=1-d),a.vy-=v*d)}}}
function a(t){if(t.data)return t.r=e[t.data.index]
;for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}function u(){if(n){
var r,i,o=n.length;for(e=new Array(o),r=0;r<o;++r)i=n[r],e[i.index]=+t(i,r,n)}}
return"function"!=typeof t&&(t=Ha(null==t?1:+t)),o.initialize=function(t){
n=t,u()},o.iterations=function(t){return arguments.length?(i=+t,o):i
},o.strength=function(t){return arguments.length?(r=+t,o):r
},o.radius=function(n){return arguments.length?(t="function"==typeof n?n:Ha(+n),
u(),o):t},o},t.forceLink=function(t){var n,e,r,i,o,a=nu,u=function(t){
return 1/Math.min(i[t.source.index],i[t.target.index])},c=Ha(30),f=1
;function s(r){
for(var i=0,a=t.length;i<f;++i)for(var u,c,s,l,h,d,p,v=0;v<a;++v)c=(u=t[v]).source,
l=(s=u.target).x+s.vx-c.x-c.vx||ja(),
h=s.y+s.vy-c.y-c.vy||ja(),l*=d=((d=Math.sqrt(l*l+h*h))-e[v])/d*r*n[v],
h*=d,s.vx-=l*(p=o[v]),s.vy-=h*p,c.vx+=l*(p=1-p),c.vy+=h*p}function l(){if(r){
var u,c,f=r.length,s=t.length,l=Bo(r,a)
;for(u=0,i=new Array(f);u<s;++u)(c=t[u]).index=u,
"object"!=typeof c.source&&(c.source=eu(l,c.source)),
"object"!=typeof c.target&&(c.target=eu(l,c.target)),
i[c.source.index]=(i[c.source.index]||0)+1,
i[c.target.index]=(i[c.target.index]||0)+1
;for(u=0,o=new Array(s);u<s;++u)c=t[u],
o[u]=i[c.source.index]/(i[c.source.index]+i[c.target.index]);n=new Array(s),h(),
e=new Array(s),d()}}function h(){
if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+u(t[e],e,t)}function d(){
if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+c(t[n],n,t)}
return null==t&&(t=[]),s.initialize=function(t){r=t,l()},s.links=function(n){
return arguments.length?(t=n,l(),s):t},s.id=function(t){
return arguments.length?(a=t,s):a},s.iterations=function(t){
return arguments.length?(f=+t,s):f},s.strength=function(t){
return arguments.length?(u="function"==typeof t?t:Ha(+t),h(),s):u
},s.distance=function(t){
return arguments.length?(c="function"==typeof t?t:Ha(+t),d(),s):c},s
},t.forceManyBody=function(){var t,n,e,r,i=Ha(-30),o=1,a=1/0,u=.81
;function c(r){var i,o=t.length,a=Za(t,ru,iu).visitAfter(s)
;for(e=r,i=0;i<o;++i)n=t[i],a.visit(l)}function f(){if(t){var n,e,o=t.length
;for(r=new Array(o),n=0;n<o;++n)e=t[n],r[e.index]=+i(e,n,t)}}function s(t){
var n,e,i,o,a,u=0,c=0;if(t.length){
for(i=o=a=0;a<4;++a)(n=t[a])&&(e=Math.abs(n.value))&&(u+=n.value,
c+=e,i+=e*n.x,o+=e*n.y);t.x=i/c,t.y=o/c}else{(n=t).x=n.data.x,n.y=n.data.y;do{
u+=r[n.data.index]}while(n=n.next)}t.value=u}function l(t,i,c,f){
if(!t.value)return!0;var s=t.x-n.x,l=t.y-n.y,h=f-i,d=s*s+l*l
;if(h*h/u<d)return d<a&&(0===s&&(d+=(s=ja())*s),
0===l&&(d+=(l=ja())*l),d<o&&(d=Math.sqrt(o*d)),
n.vx+=s*t.value*e/d,n.vy+=l*t.value*e/d),!0;if(!(t.length||d>=a)){
(t.data!==n||t.next)&&(0===s&&(d+=(s=ja())*s),
0===l&&(d+=(l=ja())*l),d<o&&(d=Math.sqrt(o*d)));do{
t.data!==n&&(h=r[t.data.index]*e/d,n.vx+=s*h,n.vy+=l*h)}while(t=t.next)}}
return c.initialize=function(n){t=n,f()},c.strength=function(t){
return arguments.length?(i="function"==typeof t?t:Ha(+t),f(),c):i
},c.distanceMin=function(t){return arguments.length?(o=t*t,c):Math.sqrt(o)
},c.distanceMax=function(t){return arguments.length?(a=t*t,c):Math.sqrt(a)
},c.theta=function(t){return arguments.length?(u=t*t,c):Math.sqrt(u)},c
},t.forceRadial=function(t,n,e){var r,i,o,a=Ha(.1);function u(t){
for(var a=0,u=r.length;a<u;++a){
var c=r[a],f=c.x-n||1e-6,s=c.y-e||1e-6,l=Math.sqrt(f*f+s*s),h=(o[a]-l)*i[a]*t/l
;c.vx+=f*h,c.vy+=s*h}}function c(){if(r){var n,e=r.length
;for(i=new Array(e),o=new Array(e),
n=0;n<e;++n)o[n]=+t(r[n],n,r),i[n]=isNaN(o[n])?0:+a(r[n],n,r)}}
return"function"!=typeof t&&(t=Ha(+t)),
null==n&&(n=0),null==e&&(e=0),u.initialize=function(t){r=t,c()
},u.strength=function(t){
return arguments.length?(a="function"==typeof t?t:Ha(+t),c(),u):a
},u.radius=function(n){return arguments.length?(t="function"==typeof n?n:Ha(+n),
c(),u):t},u.x=function(t){return arguments.length?(n=+t,u):n},u.y=function(t){
return arguments.length?(e=+t,u):e},u},t.forceSimulation=function(t){
var n,e=1,r=.001,i=1-Math.pow(r,1/300),o=0,a=.6,u=Bo(),c=Cr(s),f=F("tick","end")
;function s(){l(),f.call("tick",n),e<r&&(c.stop(),f.call("end",n))}
function l(r){var c,f,s=t.length;void 0===r&&(r=1)
;for(var l=0;l<r;++l)for(e+=(o-e)*i,u.each((function(t){t(e)
})),c=0;c<s;++c)null==(f=t[c]).fx?f.x+=f.vx*=a:(f.x=f.fx,
f.vx=0),null==f.fy?f.y+=f.vy*=a:(f.y=f.fy,f.vy=0);return n}function h(){
for(var n,e=0,r=t.length;e<r;++e){
if((n=t[e]).index=e,null!=n.fx&&(n.x=n.fx),null!=n.fy&&(n.y=n.fy),
isNaN(n.x)||isNaN(n.y)){var i=10*Math.sqrt(e),o=e*ou
;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}
function d(n){return n.initialize&&n.initialize(t),n}return null==t&&(t=[]),h(),
n={tick:l,restart:function(){return c.restart(s),n},stop:function(){
return c.stop(),n},nodes:function(e){return arguments.length?(t=e,h(),u.each(d),
n):t},alpha:function(t){return arguments.length?(e=+t,n):e},
alphaMin:function(t){return arguments.length?(r=+t,n):r},alphaDecay:function(t){
return arguments.length?(i=+t,n):+i},alphaTarget:function(t){
return arguments.length?(o=+t,n):o},velocityDecay:function(t){
return arguments.length?(a=1-t,n):1-a},force:function(t,e){
return arguments.length>1?(null==e?u.remove(t):u.set(t,d(e)),n):u.get(t)},
find:function(n,e,r){var i,o,a,u,c,f=0,s=t.length
;for(null==r?r=1/0:r*=r,f=0;f<s;++f)(a=(i=n-(u=t[f]).x)*i+(o=e-u.y)*o)<r&&(c=u,
r=a);return c},on:function(t,e){return arguments.length>1?(f.on(t,e),n):f.on(t)}
}},t.forceX=function(t){var n,e,r,i=Ha(.1);function o(t){
for(var i,o=0,a=n.length;o<a;++o)(i=n[o]).vx+=(r[o]-i.x)*e[o]*t}function a(){
if(n){var o,a=n.length
;for(e=new Array(a),r=new Array(a),o=0;o<a;++o)e[o]=isNaN(r[o]=+t(n[o],o,n))?0:+i(n[o],o,n)
}}return"function"!=typeof t&&(t=Ha(null==t?0:+t)),o.initialize=function(t){n=t,
a()},o.strength=function(t){
return arguments.length?(i="function"==typeof t?t:Ha(+t),a(),o):i
},o.x=function(n){
return arguments.length?(t="function"==typeof n?n:Ha(+n),a(),o):t},o
},t.forceY=function(t){var n,e,r,i=Ha(.1);function o(t){
for(var i,o=0,a=n.length;o<a;++o)(i=n[o]).vy+=(r[o]-i.y)*e[o]*t}function a(){
if(n){var o,a=n.length
;for(e=new Array(a),r=new Array(a),o=0;o<a;++o)e[o]=isNaN(r[o]=+t(n[o],o,n))?0:+i(n[o],o,n)
}}return"function"!=typeof t&&(t=Ha(null==t?0:+t)),o.initialize=function(t){n=t,
a()},o.strength=function(t){
return arguments.length?(i="function"==typeof t?t:Ha(+t),a(),o):i
},o.y=function(n){
return arguments.length?(t="function"==typeof n?n:Ha(+n),a(),o):t},o
},t.formatDefaultLocale=bu,
t.formatLocale=_u,t.formatSpecifier=su,t.geoAlbers=kl,t.geoAlbersUsa=function(){
var t,n,e,r,i,o,a=kl(),u=Sl().rotate([154,0]).center([-2,58.5]).parallels([55,65]),c=Sl().rotate([157,0]).center([-3,19.9]).parallels([8,18]),f={
point:function(t,n){o=[t,n]}};function s(t){var n=t[0],a=t[1]
;return o=null,e.point(n,a),o||(r.point(n,a),o)||(i.point(n,a),o)}function l(){
return t=n=null,s}return s.invert=function(t){
var n=a.scale(),e=a.translate(),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n
;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?u:i>=.166&&i<.234&&r>=-.214&&r<-.115?c:a).invert(t)
},s.stream=function(e){return t&&n===e?t:t=function(t){var n=t.length;return{
point:function(e,r){for(var i=-1;++i<n;)t[i].point(e,r)},sphere:function(){
for(var e=-1;++e<n;)t[e].sphere()},lineStart:function(){
for(var e=-1;++e<n;)t[e].lineStart()},lineEnd:function(){
for(var e=-1;++e<n;)t[e].lineEnd()},polygonStart:function(){
for(var e=-1;++e<n;)t[e].polygonStart()},polygonEnd:function(){
for(var e=-1;++e<n;)t[e].polygonEnd()}}
}([a.stream(n=e),u.stream(e),c.stream(e)])},s.precision=function(t){
return arguments.length?(a.precision(t),
u.precision(t),c.precision(t),l()):a.precision()},s.scale=function(t){
return arguments.length?(a.scale(t),
u.scale(.35*t),c.scale(t),s.translate(a.translate())):a.scale()
},s.translate=function(t){if(!arguments.length)return a.translate()
;var n=a.scale(),o=+t[0],s=+t[1]
;return e=a.translate(t).clipExtent([[o-.455*n,s-.238*n],[o+.455*n,s+.238*n]]).stream(f),
r=u.translate([o-.307*n,s+.201*n]).clipExtent([[o-.425*n+Su,s+.12*n+Su],[o-.214*n-Su,s+.234*n-Su]]).stream(f),
i=c.translate([o-.205*n,s+.212*n]).clipExtent([[o-.214*n+Su,s+.166*n+Su],[o-.115*n-Su,s+.234*n-Su]]).stream(f),
l()},s.fitExtent=function(t,n){return pl(s,t,n)},s.fitSize=function(t,n){
return vl(s,t,n)},s.fitWidth=function(t,n){return gl(s,t,n)
},s.fitHeight=function(t,n){return yl(s,t,n)},s.scale(1070)
},t.geoArea=function(t){return fc.reset(),ec(t,sc),2*fc
},t.geoAzimuthalEqualArea=function(){
return Ml(Pl).scale(124.75).clipAngle(179.999)
},t.geoAzimuthalEqualAreaRaw=Pl,t.geoAzimuthalEquidistant=function(){
return Ml(zl).scale(79.4188).clipAngle(179.999)
},t.geoAzimuthalEquidistantRaw=zl,t.geoBounds=function(t){var n,e,r,i,o,a,u
;if(Tc=Nc=-(wc=Mc=1/0),Cc=[],ec(t,Zc),e=Cc.length){
for(Cc.sort(of),n=1,o=[r=Cc[0]];n<e;++n)af(r,(i=Cc[n])[0])||af(r,i[1])?(rf(r[0],i[1])>rf(r[0],r[1])&&(r[1]=i[1]),
rf(i[0],r[1])>rf(r[0],r[1])&&(r[0]=i[0])):o.push(r=i)
;for(a=-1/0,n=0,r=o[e=o.length-1];n<=e;r=i,++n)i=o[n],(u=rf(r[1],i[0]))>a&&(a=u,
wc=i[0],Nc=r[1])}
return Cc=Pc=null,wc===1/0||Mc===1/0?[[NaN,NaN],[NaN,NaN]]:[[wc,Mc],[Nc,Tc]]
},t.geoCentroid=function(t){zc=Rc=Dc=qc=Lc=Uc=Oc=Bc=Fc=Yc=Ic=0,ec(t,uf)
;var n=Fc,e=Yc,r=Ic,i=n*n+e*e+r*r
;return i<ku&&(n=Uc,e=Oc,r=Bc,Rc<Su&&(n=Dc,e=qc,
r=Lc),(i=n*n+e*e+r*r)<ku)?[NaN,NaN]:[Uu(e,n)*Ru,Wu(r/Xu(i))*Ru]
},t.geoCircle=function(){var t,n,e=_f([0,0]),r=_f(90),i=_f(6),o={
point:function(e,r){t.push(e=n(e,r)),e[0]*=Ru,e[1]*=Ru}};function a(){
var a=e.apply(this,arguments),u=r.apply(this,arguments)*Du,c=i.apply(this,arguments)*Du
;return t=[],n=xf(-a[0]*Du,-a[1]*Du,0).invert,Af(o,u,c,1),a={type:"Polygon",
coordinates:[t]},t=n=null,a}return a.center=function(t){
return arguments.length?(e="function"==typeof t?t:_f([+t[0],+t[1]]),a):e
},a.radius=function(t){return arguments.length?(r="function"==typeof t?t:_f(+t),
a):r},a.precision=function(t){
return arguments.length?(i="function"==typeof t?t:_f(+t),a):i},a
},t.geoClipAntimeridian=Bf,t.geoClipCircle=Ff,t.geoClipExtent=function(){
var t,n,e,r=0,i=0,o=960,a=500;return e={stream:function(e){
return t&&n===e?t:t=Hf(r,i,o,a)(n=e)},extent:function(u){
return arguments.length?(r=+u[0][0],
i=+u[0][1],o=+u[1][0],a=+u[1][1],t=n=null,e):[[r,i],[o,a]]}}
},t.geoClipRectangle=Hf,t.geoConicConformal=function(){
return Tl(Ll).scale(109.5).parallels([30,30])
},t.geoConicConformalRaw=Ll,t.geoConicEqualArea=Sl,
t.geoConicEqualAreaRaw=Al,t.geoConicEquidistant=function(){
return Tl(Ol).scale(131.154).center([0,13.9389])
},t.geoConicEquidistantRaw=Ol,t.geoContains=function(t,n){
return(t&&es.hasOwnProperty(t.type)?es[t.type]:is)(t,n)
},t.geoDistance=ns,t.geoEqualEarth=function(){return Ml(jl).scale(177.158)
},t.geoEqualEarthRaw=jl,t.geoEquirectangular=function(){
return Ml(Ul).scale(152.63)
},t.geoEquirectangularRaw=Ul,t.geoGnomonic=function(){
return Ml(Xl).scale(144.049).clipAngle(60)
},t.geoGnomonicRaw=Xl,t.geoGraticule=hs,t.geoGraticule10=function(){
return hs()()},t.geoIdentity=function(){
var t,n,e,r,i,o,a,u=1,c=0,f=0,s=1,l=1,h=0,d=null,p=1,v=1,g=ll({
point:function(t,n){var e=b([t,n]);this.stream.point(e[0],e[1])}}),y=ds
;function _(){return p=u*s,v=u*l,o=a=null,b}function b(e){var r=e[0]*p,i=e[1]*v
;if(h){var o=i*t-r*n;r=r*t+i*n,i=o}return[r+c,i+f]}return b.invert=function(e){
var r=e[0]-c,i=e[1]-f;if(h){var o=i*t+r*n;r=r*t-i*n,i=o}return[r/p,i/v]
},b.stream=function(t){return o&&a===t?o:o=g(y(a=t))},b.postclip=function(t){
return arguments.length?(y=t,d=e=r=i=null,_()):y},b.clipExtent=function(t){
return arguments.length?(y=null==t?(d=e=r=i=null,
ds):Hf(d=+t[0][0],e=+t[0][1],r=+t[1][0],i=+t[1][1]),
_()):null==d?null:[[d,e],[r,i]]},b.scale=function(t){
return arguments.length?(u=+t,_()):u},b.translate=function(t){
return arguments.length?(c=+t[0],f=+t[1],_()):[c,f]},b.angle=function(e){
return arguments.length?(n=Hu(h=e%360*Du),t=Ou(h),_()):h*Ru
},b.reflectX=function(t){return arguments.length?(s=t?-1:1,_()):s<0
},b.reflectY=function(t){return arguments.length?(l=t?-1:1,_()):l<0
},b.fitExtent=function(t,n){return pl(b,t,n)},b.fitSize=function(t,n){
return vl(b,t,n)},b.fitWidth=function(t,n){return gl(b,t,n)
},b.fitHeight=function(t,n){return yl(b,t,n)},b},t.geoInterpolate=function(t,n){
var e=t[0]*Du,r=t[1]*Du,i=n[0]*Du,o=n[1]*Du,a=Ou(r),u=Hu(r),c=Ou(o),f=Hu(o),s=a*Ou(e),l=a*Hu(e),h=c*Ou(i),d=c*Hu(i),p=2*Wu(Xu(Zu(o-r)+a*c*Zu(i-e))),v=Hu(p),g=p?function(t){
var n=Hu(t*=p)/v,e=Hu(p-t)/v,r=e*s+n*h,i=e*l+n*d,o=e*u+n*f
;return[Uu(i,r)*Ru,Uu(o,Xu(r*r+i*i))*Ru]}:function(){return[e*Ru,r*Ru]}
;return g.distance=p,g},t.geoLength=Kf,t.geoMercator=function(){
return Dl(Rl).scale(961/zu)},t.geoMercatorRaw=Rl,t.geoNaturalEarth1=function(){
return Ml(Vl).scale(175.295)
},t.geoNaturalEarth1Raw=Vl,t.geoOrthographic=function(){
return Ml(Gl).scale(249.5).clipAngle(90.000001)
},t.geoOrthographicRaw=Gl,t.geoPath=function(t,n){var e,r,i=4.5;function o(t){
return t&&("function"==typeof i&&r.pointRadius(+i.apply(this,arguments)),
ec(t,e(r))),r.result()}return o.area=function(t){return ec(t,e(ms)),ms.result()
},o.measure=function(t){return ec(t,e(al)),al.result()},o.bounds=function(t){
return ec(t,e(Es)),Es.result()},o.centroid=function(t){
return ec(t,e(Hs)),Hs.result()},o.projection=function(n){
return arguments.length?(e=null==n?(t=null,ds):(t=n).stream,o):t
},o.context=function(t){
return arguments.length?(r=null==t?(n=null,new fl):new Js(n=t),
"function"!=typeof i&&r.pointRadius(i),o):n},o.pointRadius=function(t){
return arguments.length?(i="function"==typeof t?t:(r.pointRadius(+t),+t),o):i
},o.projection(t).context(n)
},t.geoProjection=Ml,t.geoProjectionMutator=Nl,t.geoRotation=Tf,
t.geoStereographic=function(){return Ml(Wl).scale(250).clipAngle(142)
},t.geoStereographicRaw=Wl,t.geoStream=ec,t.geoTransform=function(t){return{
stream:ll(t)}},t.geoTransverseMercator=function(){
var t=Dl(Zl),n=t.center,e=t.rotate;return t.center=function(t){
return arguments.length?n([-t[1],t[0]]):[(t=n())[1],-t[0]]
},t.rotate=function(t){
return arguments.length?e([t[0],t[1],t.length>2?t[2]+90:90]):[(t=e())[0],t[1],t[2]-90]
},e([0,0,90]).scale(159.155)
},t.geoTransverseMercatorRaw=Zl,t.gray=function(t,n){
return new ae(t,0,0,null==n?1:n)
},t.hcl=he,t.hierarchy=th,t.histogram=function(){var t=v,n=s,e=M;function r(r){
var o,a,u=r.length,c=new Array(u);for(o=0;o<u;++o)c[o]=t(r[o],o,r)
;var f=n(c),s=f[0],l=f[1],h=e(c,s,l)
;Array.isArray(h)||(h=w(s,l,h),h=g(Math.ceil(s/h)*h,l,h))
;for(var d=h.length;h[0]<=s;)h.shift(),--d;for(;h[d-1]>l;)h.pop(),--d
;var p,v=new Array(d+1)
;for(o=0;o<=d;++o)(p=v[o]=[]).x0=o>0?h[o-1]:s,p.x1=o<d?h[o]:l
;for(o=0;o<u;++o)s<=(a=c[o])&&a<=l&&v[i(h,a,0,d)].push(r[o]);return v}
return r.value=function(n){
return arguments.length?(t="function"==typeof n?n:p(n),r):t
},r.domain=function(t){
return arguments.length?(n="function"==typeof t?t:p([t[0],t[1]]),r):n
},r.thresholds=function(t){
return arguments.length?(e="function"==typeof t?t:Array.isArray(t)?p(h.call(t)):p(t),
r):e},r},t.hsl=Wn,t.html=Ya,t.image=function(t,n){
return new Promise((function(e,r){var i=new Image;for(var o in n)i[o]=n[o]
;i.onerror=r,i.onload=function(){e(i)},i.src=t}))
},t.interpolate=Ge,t.interpolateArray=function(t,n){return(Be(n)?Oe:Fe)(t,n)
},t.interpolateBasis=Se,
t.interpolateBasisClosed=ke,t.interpolateBlues=Ay,t.interpolateBrBG=Og,
t.interpolateBuGn=ey,t.interpolateBuPu=iy,t.interpolateCividis=function(t){
return t=Math.max(0,Math.min(1,t)),
"rgb("+Math.max(0,Math.min(255,Math.round(-4.54-t*(35.34-t*(2381.73-t*(6402.7-t*(7024.72-2710.57*t)))))))+", "+Math.max(0,Math.min(255,Math.round(32.49+t*(170.73+t*(52.82-t*(131.46-t*(176.58-67.37*t)))))))+", "+Math.max(0,Math.min(255,Math.round(81.24+t*(442.36-t*(2482.43-t*(6167.24-t*(6614.94-2475.67*t)))))))+")"
},
t.interpolateCool=By,t.interpolateCubehelix=vr,t.interpolateCubehelixDefault=Uy,
t.interpolateCubehelixLong=gr,
t.interpolateDate=Ye,t.interpolateDiscrete=function(t){var n=t.length
;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}
},t.interpolateGnBu=ay,
t.interpolateGreens=ky,t.interpolateGreys=Cy,t.interpolateHcl=hr,
t.interpolateHclLong=dr,
t.interpolateHsl=fr,t.interpolateHslLong=sr,t.interpolateHue=function(t,n){
var e=Pe(+t,+n);return function(t){var n=e(t);return n-360*Math.floor(n/360)}
},t.interpolateInferno=Gy,t.interpolateLab=function(t,n){
var e=Re((t=oe(t)).l,(n=oe(n)).l),r=Re(t.a,n.a),i=Re(t.b,n.b),o=Re(t.opacity,n.opacity)
;return function(n){return t.l=e(n),t.a=r(n),t.b=i(n),t.opacity=o(n),t+""}
},t.interpolateMagma=Vy,
t.interpolateNumber=Ie,t.interpolateNumberArray=Oe,t.interpolateObject=He,
t.interpolateOrRd=cy,
t.interpolateOranges=Ly,t.interpolatePRGn=Fg,t.interpolatePiYG=Ig,
t.interpolatePlasma=Wy,
t.interpolatePuBu=hy,t.interpolatePuBuGn=sy,t.interpolatePuOr=jg,
t.interpolatePuRd=py,t.interpolatePurples=zy,t.interpolateRainbow=function(t){
(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5)
;return Fy.h=360*t-100,Fy.s=1.5-1.5*n,Fy.l=.8-.9*n,Fy+""
},t.interpolateRdBu=Vg,t.interpolateRdGy=Wg,
t.interpolateRdPu=gy,t.interpolateRdYlBu=$g,
t.interpolateRdYlGn=Kg,t.interpolateReds=Dy,
t.interpolateRgb=De,t.interpolateRgbBasis=Le,
t.interpolateRgbBasisClosed=Ue,t.interpolateRound=We,
t.interpolateSinebow=function(t){var n
;return t=(.5-t)*Math.PI,Yy.r=255*(n=Math.sin(t))*n,
Yy.g=255*(n=Math.sin(t+Iy))*n,Yy.b=255*(n=Math.sin(t+Hy))*n,Yy+""
},t.interpolateSpectral=ty,
t.interpolateString=Ve,t.interpolateTransformCss=rr,t.interpolateTransformSvg=ir,
t.interpolateTurbo=function(t){
return t=Math.max(0,Math.min(1,t)),"rgb("+Math.max(0,Math.min(255,Math.round(34.61+t*(1172.33-t*(10793.56-t*(33300.12-t*(38394.49-14825.05*t)))))))+", "+Math.max(0,Math.min(255,Math.round(23.31+t*(557.33+t*(1225.33-t*(3574.96-t*(1073.77+707.56*t)))))))+", "+Math.max(0,Math.min(255,Math.round(27.2+t*(3211.1-t*(15327.97-t*(27814-t*(22569.18-6838.66*t)))))))+")"
},
t.interpolateViridis=Xy,t.interpolateWarm=Oy,t.interpolateYlGn=my,t.interpolateYlGnBu=_y,
t.interpolateYlOrBr=wy,
t.interpolateYlOrRd=Ny,t.interpolateZoom=ur,t.interrupt=Ir,
t.interval=function(t,n,e){var r=new Er,i=n
;return null==n?(r.restart(t,n,e),r):(n=+n,
e=null==e?Sr():+e,r.restart((function o(a){a+=i,r.restart(o,i+=n,e),t(a)}),n,e),
r)},t.isoFormat=fg,t.isoParse=sg,t.json=function(t,n){return fetch(t,n).then(Oa)
},t.keys=function(t){var n=[];for(var e in t)n.push(e);return n
},t.lab=oe,t.lch=function(t,n,e,r){
return 1===arguments.length?le(t):new de(e,n,t,null==r?1:r)
},t.line=m_,t.lineRadial=k_,t.linkHorizontal=function(){return D_(q_)
},t.linkRadial=function(){var t=D_(U_)
;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t
},t.linkVertical=function(){return D_(L_)
},t.local=en,t.map=Bo,t.matcher=nt,t.max=T,t.mean=function(t,n){
var e,r=t.length,i=r,o=-1,a=0
;if(null==n)for(;++o<r;)isNaN(e=u(t[o]))?--i:a+=e;else for(;++o<r;)isNaN(e=u(n(t[o],o,t)))?--i:a+=e
;if(i)return a/i},t.median=function(t,e){var r,i=t.length,o=-1,a=[]
;if(null==e)for(;++o<i;)isNaN(r=u(t[o]))||a.push(r);else for(;++o<i;)isNaN(r=u(e(t[o],o,t)))||a.push(r)
;return N(a.sort(n),.5)
},t.merge=A,t.min=S,t.mouse=un,t.namespace=G,t.namespaces=V,t.nest=function(){
var t,n,e,r=[],i=[];function o(e,i,a,u){
if(i>=r.length)return null!=t&&e.sort(t),null!=n?n(e):e
;for(var c,f,s,l=-1,h=e.length,d=r[i++],p=Bo(),v=a();++l<h;)(s=p.get(c=d(f=e[l])+""))?s.push(f):p.set(c,[f])
;return p.each((function(t,n){u(v,n,o(t,i,a,u))})),v}return e={
object:function(t){return o(t,0,Fo,Yo)},map:function(t){return o(t,0,Io,Ho)},
entries:function(t){return function t(e,o){if(++o>r.length)return e
;var a,u=i[o-1]
;return null!=n&&o>=r.length?a=e.entries():(a=[],e.each((function(n,e){a.push({
key:e,values:t(n,o)})}))),null!=u?a.sort((function(t,n){return u(t.key,n.key)
})):a}(o(t,0,Io,Ho),0)},key:function(t){return r.push(t),e},
sortKeys:function(t){return i[r.length-1]=t,e},sortValues:function(n){
return t=n,e},rollup:function(t){return n=t,e}}},t.now=Sr,t.pack=function(){
var t=null,n=1,e=1,r=xh;function i(i){
return i.x=n/2,i.y=e/2,t?i.eachBefore(Nh(t)).eachAfter(Th(r,.5)).eachBefore(Ah(1)):i.eachBefore(Nh(Mh)).eachAfter(Th(xh,1)).eachAfter(Th(r,i.r/Math.min(n,e))).eachBefore(Ah(Math.min(n,e)/(2*i.r))),
i}return i.radius=function(n){return arguments.length?(t=bh(n),i):t
},i.size=function(t){return arguments.length?(n=+t[0],e=+t[1],i):[n,e]
},i.padding=function(t){
return arguments.length?(r="function"==typeof t?t:wh(+t),i):r},i
},t.packEnclose=ah,t.packSiblings=function(t){return _h(t),t
},t.pairs=function(t,n){null==n&&(n=a)
;for(var e=0,r=t.length-1,i=t[0],o=new Array(r<0?0:r);e<r;)o[e]=n(i,i=t[++e])
;return o},t.partition=function(){var t=1,n=1,e=0,r=!1;function i(i){
var o=i.height+1;return i.x0=i.y0=e,i.x1=t,i.y1=n/o,i.eachBefore(function(t,n){
return function(r){r.children&&kh(r,r.x0,t*(r.depth+1)/n,r.x1,t*(r.depth+2)/n)
;var i=r.x0,o=r.y0,a=r.x1-e,u=r.y1-e
;a<i&&(i=a=(i+a)/2),u<o&&(o=u=(o+u)/2),r.x0=i,r.y0=o,r.x1=a,r.y1=u}
}(n,o)),r&&i.eachBefore(Sh),i}return i.round=function(t){
return arguments.length?(r=!!t,i):r},i.size=function(e){
return arguments.length?(t=+e[0],n=+e[1],i):[t,n]},i.padding=function(t){
return arguments.length?(e=+t,i):e},i},t.path=Po,t.permute=function(t,n){
for(var e=n.length,r=new Array(e);e--;)r[e]=t[n[e]];return r},t.pie=function(){
var t=M_,n=w_,e=null,r=Zy(0),i=Zy(a_),o=Zy(0);function a(a){
var u,c,f,s,l,h=a.length,d=0,p=new Array(h),v=new Array(h),g=+r.apply(this,arguments),y=Math.min(a_,Math.max(-a_,i.apply(this,arguments)-g)),_=Math.min(Math.abs(y)/h,o.apply(this,arguments)),b=_*(y<0?-1:1)
;for(u=0;u<h;++u)(l=v[p[u]=u]=+t(a[u],u,a))>0&&(d+=l)
;for(null!=n?p.sort((function(t,e){return n(v[t],v[e])
})):null!=e&&p.sort((function(t,n){return e(a[t],a[n])
})),u=0,f=d?(y-h*b)/d:0;u<h;++u,g=s)c=p[u],s=g+((l=v[c])>0?l*f:0)+b,v[c]={
data:a[c],index:u,value:l,startAngle:g,endAngle:s,padAngle:_};return v}
return a.value=function(n){
return arguments.length?(t="function"==typeof n?n:Zy(+n),a):t
},a.sortValues=function(t){return arguments.length?(n=t,e=null,a):n
},a.sort=function(t){return arguments.length?(e=t,n=null,a):e
},a.startAngle=function(t){
return arguments.length?(r="function"==typeof t?t:Zy(+t),a):r
},a.endAngle=function(t){
return arguments.length?(i="function"==typeof t?t:Zy(+t),a):i
},a.padAngle=function(t){
return arguments.length?(o="function"==typeof t?t:Zy(+t),a):o},a
},t.piecewise=function(t,n){
for(var e=0,r=n.length-1,i=n[0],o=new Array(r<0?0:r);e<r;)o[e]=t(i,i=n[++e])
;return function(t){var n=Math.max(0,Math.min(r-1,Math.floor(t*=r)))
;return o[n](t-n)}},t.pointRadial=C_,t.polygonArea=function(t){
for(var n,e=-1,r=t.length,i=t[r-1],o=0;++e<r;)n=i,i=t[e],o+=n[1]*i[0]-n[0]*i[1]
;return o/2},t.polygonCentroid=function(t){
for(var n,e,r=-1,i=t.length,o=0,a=0,u=t[i-1],c=0;++r<i;)n=u,
u=t[r],c+=e=n[0]*u[1]-u[0]*n[1],o+=(n[0]+u[0])*e,a+=(n[1]+u[1])*e
;return[o/(c*=3),a/c]},t.polygonContains=function(t,n){
for(var e,r,i=t.length,o=t[i-1],a=n[0],u=n[1],c=o[0],f=o[1],s=!1,l=0;l<i;++l)e=(o=t[l])[0],
(r=o[1])>u!=f>u&&a<(c-e)*(u-r)/(f-r)+e&&(s=!s),c=e,f=r;return s
},t.polygonHull=function(t){if((e=t.length)<3)return null
;var n,e,r=new Array(e),i=new Array(e)
;for(n=0;n<e;++n)r[n]=[+t[n][0],+t[n][1],n]
;for(r.sort(Xh),n=0;n<e;++n)i[n]=[r[n][0],-r[n][1]]
;var o=Vh(r),a=Vh(i),u=a[0]===o[0],c=a[a.length-1]===o[o.length-1],f=[]
;for(n=o.length-1;n>=0;--n)f.push(t[r[o[n]][2]])
;for(n=+u;n<a.length-c;++n)f.push(t[r[a[n]][2]]);return f
},t.polygonLength=function(t){
for(var n,e,r=-1,i=t.length,o=t[i-1],a=o[0],u=o[1],c=0;++r<i;)n=a,
e=u,n-=a=(o=t[r])[0],e-=u=o[1],c+=Math.sqrt(n*n+e*e);return c
},t.precisionFixed=mu,
t.precisionPrefix=xu,t.precisionRound=wu,t.quadtree=Za,t.quantile=N,
t.quantize=function(t,n){for(var e=new Array(n),r=0;r<n;++r)e[r]=t(r/(n-1))
;return e
},t.radialArea=E_,t.radialLine=k_,t.randomBates=Kh,t.randomExponential=Jh,
t.randomIrwinHall=Qh,
t.randomLogNormal=$h,t.randomNormal=Zh,t.randomUniform=Wh,t.range=g,
t.rgb=Yn,t.ribbon=function(){var t=zo,n=Ro,e=Do,r=qo,i=Lo,o=null;function a(){
var a,u=No.call(arguments),c=t.apply(this,u),f=n.apply(this,u),s=+e.apply(this,(u[0]=c,
u)),l=r.apply(this,u)-mo,h=i.apply(this,u)-mo,d=s*yo(l),p=s*_o(l),v=+e.apply(this,(u[0]=f,
u)),g=r.apply(this,u)-mo,y=i.apply(this,u)-mo
;if(o||(o=a=Po()),o.moveTo(d,p),o.arc(0,0,s,l,h),
l===g&&h===y||(o.quadraticCurveTo(0,0,v*yo(g),v*_o(g)),
o.arc(0,0,v,g,y)),o.quadraticCurveTo(0,0,d,p),
o.closePath(),a)return o=null,a+""||null}return a.radius=function(t){
return arguments.length?(e="function"==typeof t?t:To(+t),a):e
},a.startAngle=function(t){
return arguments.length?(r="function"==typeof t?t:To(+t),a):r
},a.endAngle=function(t){
return arguments.length?(i="function"==typeof t?t:To(+t),a):i
},a.source=function(n){return arguments.length?(t=n,a):t},a.target=function(t){
return arguments.length?(n=t,a):n},a.context=function(t){
return arguments.length?(o=null==t?null:t,a):o},a
},t.scaleBand=ud,t.scaleDiverging=function t(){var n=md(Mg()(ld))
;return n.copy=function(){return xg(n,t())},nd.apply(n,arguments)
},t.scaleDivergingLog=function t(){var n=kd(Mg()).domain([.1,1,10])
;return n.copy=function(){return xg(n,t()).base(n.base())},nd.apply(n,arguments)
},t.scaleDivergingPow=Ng,t.scaleDivergingSqrt=function(){
return Ng.apply(null,arguments).exponent(.5)
},t.scaleDivergingSymlog=function t(){var n=Pd(Mg());return n.copy=function(){
return xg(n,t()).constant(n.constant())},nd.apply(n,arguments)
},t.scaleIdentity=function t(n){var e;function r(t){return isNaN(t=+t)?e:t}
return r.invert=r,r.domain=r.range=function(t){
return arguments.length?(n=rd.call(t,fd),r):n.slice()},r.unknown=function(t){
return arguments.length?(e=t,r):e},r.copy=function(){return t(n).unknown(e)
},n=arguments.length?rd.call(n,fd):[0,1],md(r)
},t.scaleImplicit=od,t.scaleLinear=function t(){var n=_d(ld,ld)
;return n.copy=function(){return gd(n,t())},td.apply(n,arguments),md(n)
},t.scaleLog=function t(){var n=kd(yd()).domain([1,10])
;return n.copy=function(){return gd(n,t()).base(n.base())
},td.apply(n,arguments),n},t.scaleOrdinal=ad,t.scalePoint=function(){
return cd(ud.apply(null,arguments).paddingInner(1))
},t.scalePow=Ld,t.scaleQuantile=function t(){var e,r=[],o=[],a=[];function u(){
var t=0,n=Math.max(1,o.length);for(a=new Array(n-1);++t<n;)a[t-1]=N(r,t/n)
;return c}function c(t){return isNaN(t=+t)?e:o[i(a,t)]}
return c.invertExtent=function(t){var n=o.indexOf(t)
;return n<0?[NaN,NaN]:[n>0?a[n-1]:r[0],n<a.length?a[n]:r[r.length-1]]
},c.domain=function(t){if(!arguments.length)return r.slice();r=[]
;for(var e,i=0,o=t.length;i<o;++i)null==(e=t[i])||isNaN(e=+e)||r.push(e)
;return r.sort(n),u()},c.range=function(t){
return arguments.length?(o=id.call(t),u()):o.slice()},c.unknown=function(t){
return arguments.length?(e=t,c):e},c.quantiles=function(){return a.slice()
},c.copy=function(){return t().domain(r).range(o).unknown(e)
},td.apply(c,arguments)},t.scaleQuantize=function t(){
var n,e=0,r=1,o=1,a=[.5],u=[0,1];function c(t){return t<=t?u[i(a,t,0,o)]:n}
function f(){var t=-1;for(a=new Array(o);++t<o;)a[t]=((t+1)*r-(t-o)*e)/(o+1)
;return c}return c.domain=function(t){
return arguments.length?(e=+t[0],r=+t[1],f()):[e,r]},c.range=function(t){
return arguments.length?(o=(u=id.call(t)).length-1,f()):u.slice()
},c.invertExtent=function(t){var n=u.indexOf(t)
;return n<0?[NaN,NaN]:n<1?[e,a[0]]:n>=o?[a[o-1],r]:[a[n-1],a[n]]
},c.unknown=function(t){return arguments.length?(n=t,c):c
},c.thresholds=function(){return a.slice()},c.copy=function(){
return t().domain([e,r]).range(u).unknown(n)},td.apply(md(c),arguments)
},t.scaleSequential=function t(){var n=md(mg()(ld));return n.copy=function(){
return xg(n,t())},nd.apply(n,arguments)},t.scaleSequentialLog=function t(){
var n=kd(mg()).domain([1,10]);return n.copy=function(){
return xg(n,t()).base(n.base())},nd.apply(n,arguments)},t.scaleSequentialPow=wg,
t.scaleSequentialQuantile=function t(){var e=[],r=ld;function o(t){
if(!isNaN(t=+t))return r((i(e,t)-1)/(e.length-1))}return o.domain=function(t){
if(!arguments.length)return e.slice();e=[]
;for(var r,i=0,a=t.length;i<a;++i)null==(r=t[i])||isNaN(r=+r)||e.push(r)
;return e.sort(n),o},o.interpolator=function(t){
return arguments.length?(r=t,o):r},o.copy=function(){return t(r).domain(e)
},nd.apply(o,arguments)},t.scaleSequentialSqrt=function(){
return wg.apply(null,arguments).exponent(.5)
},t.scaleSequentialSymlog=function t(){var n=Pd(mg());return n.copy=function(){
return xg(n,t()).constant(n.constant())},nd.apply(n,arguments)
},t.scaleSqrt=function(){return Ld.apply(null,arguments).exponent(.5)
},t.scaleSymlog=function t(){var n=Pd(yd());return n.copy=function(){
return gd(n,t()).constant(n.constant())},td.apply(n,arguments)
},t.scaleThreshold=function t(){var n,e=[.5],r=[0,1],o=1;function a(t){
return t<=t?r[i(e,t,0,o)]:n}return a.domain=function(t){
return arguments.length?(e=id.call(t),
o=Math.min(e.length,r.length-1),a):e.slice()},a.range=function(t){
return arguments.length?(r=id.call(t),
o=Math.min(e.length,r.length-1),a):r.slice()},a.invertExtent=function(t){
var n=r.indexOf(t);return[e[n-1],e[n]]},a.unknown=function(t){
return arguments.length?(n=t,a):n},a.copy=function(){
return t().domain(e).range(r).unknown(n)},td.apply(a,arguments)
},t.scaleTime=function(){
return td.apply(bg(_p,gp,ep,Jd,Qd,Zd,Gd,Fd,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)
},t.scaleUtc=function(){
return td.apply(bg(Hp,Yp,Sp,Np,wp,mp,Gd,Fd,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)
},t.scan=function(t,e){if(r=t.length){var r,i,o=0,a=0,u=t[a]
;for(null==e&&(e=n);++o<r;)(e(i=t[o],u)<0||0!==e(u,u))&&(u=i,a=o)
;return 0===e(u,u)?a:void 0}
},t.schemeAccent=Sg,t.schemeBlues=Ty,t.schemeBrBG=Ug,
t.schemeBuGn=ny,t.schemeBuPu=ry,
t.schemeCategory10=Ag,t.schemeDark2=kg,t.schemeGnBu=oy,
t.schemeGreens=Sy,t.schemeGreys=Ey,
t.schemeOrRd=uy,t.schemeOranges=qy,t.schemePRGn=Bg,
t.schemePaired=Eg,t.schemePastel1=Cg,
t.schemePastel2=Pg,t.schemePiYG=Yg,t.schemePuBu=ly,
t.schemePuBuGn=fy,t.schemePuOr=Hg,
t.schemePuRd=dy,t.schemePurples=Py,t.schemeRdBu=Xg,
t.schemeRdGy=Gg,t.schemeRdPu=vy,
t.schemeRdYlBu=Zg,t.schemeRdYlGn=Qg,t.schemeReds=Ry,
t.schemeSet1=zg,t.schemeSet2=Rg,
t.schemeSet3=Dg,t.schemeSpectral=Jg,t.schemeTableau10=qg,
t.schemeYlGn=by,t.schemeYlGnBu=yy,
t.schemeYlOrBr=xy,t.schemeYlOrRd=My,t.select=tn,t.selectAll=function(t){
return"string"==typeof t?new Kt([document.querySelectorAll(t)],[document.documentElement]):new Kt([null==t?[]:t],Qt)
},
t.selection=Jt,t.selector=K,t.selectorAll=tt,t.set=Vo,t.shuffle=function(t,n,e){
for(var r,i,o=(null==e?t.length:e)-(n=null==n?0:+n);o;)i=Math.random()*o--|0,
r=t[o+n],t[o+n]=t[i+n],t[i+n]=r;return t},t.stack=function(){
var t=Zy([]),n=qb,e=Db,r=Lb;function i(i){
var o,a,u=t.apply(this,arguments),c=i.length,f=u.length,s=new Array(f)
;for(o=0;o<f;++o){
for(var l,h=u[o],d=s[o]=new Array(c),p=0;p<c;++p)d[p]=l=[0,+r(i[p],h,p,i)],
l.data=i[p];d.key=h}for(o=0,a=n(s);o<f;++o)s[a[o]].index=o;return e(s,a),s}
return i.keys=function(n){
return arguments.length?(t="function"==typeof n?n:Zy(P_.call(n)),i):t
},i.value=function(t){
return arguments.length?(r="function"==typeof t?t:Zy(+t),i):r
},i.order=function(t){
return arguments.length?(n=null==t?qb:"function"==typeof t?t:Zy(P_.call(t)),i):n
},i.offset=function(t){return arguments.length?(e=null==t?Db:t,i):e},i
},t.stackOffsetDiverging=function(t,n){
if((u=t.length)>0)for(var e,r,i,o,a,u,c=0,f=t[n[0]].length;c<f;++c)for(o=a=0,
e=0;e<u;++e)(i=(r=t[n[e]][c])[1]-r[0])>0?(r[0]=o,
r[1]=o+=i):i<0?(r[1]=a,r[0]=a+=i):(r[0]=0,r[1]=i)
},t.stackOffsetExpand=function(t,n){if((r=t.length)>0){
for(var e,r,i,o=0,a=t[0].length;o<a;++o){for(i=e=0;e<r;++e)i+=t[e][o][1]||0
;if(i)for(e=0;e<r;++e)t[e][o][1]/=i}Db(t,n)}
},t.stackOffsetNone=Db,t.stackOffsetSilhouette=function(t,n){if((e=t.length)>0){
for(var e,r=0,i=t[n[0]],o=i.length;r<o;++r){
for(var a=0,u=0;a<e;++a)u+=t[a][r][1]||0;i[r][1]+=i[r][0]=-u/2}Db(t,n)}
},t.stackOffsetWiggle=function(t,n){
if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,o=0,a=1;a<r;++a){
for(var u=0,c=0,f=0;u<i;++u){
for(var s=t[n[u]],l=s[a][1]||0,h=(l-(s[a-1][1]||0))/2,d=0;d<u;++d){var p=t[n[d]]
;h+=(p[a][1]||0)-(p[a-1][1]||0)}c+=l,f+=h*l}e[a-1][1]+=e[a-1][0]=o,c&&(o-=f/c)}
e[a-1][1]+=e[a-1][0]=o,Db(t,n)}
},t.stackOrderAppearance=Ub,t.stackOrderAscending=Bb,
t.stackOrderDescending=function(t){return Bb(t).reverse()
},t.stackOrderInsideOut=function(t){
var n,e,r=t.length,i=t.map(Fb),o=Ub(t),a=0,u=0,c=[],f=[];for(n=0;n<r;++n)e=o[n],
a<u?(a+=i[e],c.push(e)):(u+=i[e],f.push(e));return f.reverse().concat(c)
},t.stackOrderNone=qb,t.stackOrderReverse=function(t){return qb(t).reverse()
},t.stratify=function(){var t=Ph,n=zh;function e(e){
var r,i,o,a,u,c,f,s=e.length,l=new Array(s),h={}
;for(i=0;i<s;++i)r=e[i],u=l[i]=new ih(r),
null!=(c=t(r,i,e))&&(c+="")&&(h[f="$"+(u.id=c)]=f in h?Ch:u)
;for(i=0;i<s;++i)if(u=l[i],null!=(c=n(e[i],i,e))&&(c+="")){
if(!(a=h["$"+c]))throw new Error("missing: "+c)
;if(a===Ch)throw new Error("ambiguous: "+c)
;a.children?a.children.push(u):a.children=[u],u.parent=a}else{
if(o)throw new Error("multiple roots");o=u}if(!o)throw new Error("no root")
;if(o.parent=Eh,o.eachBefore((function(t){t.depth=t.parent.depth+1,--s
})).eachBefore(rh),o.parent=null,s>0)throw new Error("cycle");return o}
return e.id=function(n){return arguments.length?(t=mh(n),e):t
},e.parentId=function(t){return arguments.length?(n=mh(t),e):n},e
},t.style=yt,t.sum=function(t,n){var e,r=t.length,i=-1,o=0
;if(null==n)for(;++i<r;)(e=+t[i])&&(o+=e);else for(;++i<r;)(e=+n(t[i],i,t))&&(o+=e)
;return o},t.svg=Ia,t.symbol=function(){var t=Zy(O_),n=Zy(64),e=null
;function r(){var r
;if(e||(e=r=Po()),t.apply(this,arguments).draw(e,+n.apply(this,arguments)),
r)return e=null,r+""||null}return r.type=function(n){
return arguments.length?(t="function"==typeof n?n:Zy(n),r):t
},r.size=function(t){
return arguments.length?(n="function"==typeof t?t:Zy(+t),r):n
},r.context=function(t){return arguments.length?(e=null==t?null:t,r):e},r
},t.symbolCircle=O_,
t.symbolCross=B_,t.symbolDiamond=I_,t.symbolSquare=G_,t.symbolStar=V_,
t.symbolTriangle=Z_,
t.symbolWye=tb,t.symbols=nb,t.text=Da,t.thresholdFreedmanDiaconis=function(t,e,r){
return t=d.call(t,u).sort(n),
Math.ceil((r-e)/(2*(N(t,.75)-N(t,.25))*Math.pow(t.length,-1/3)))
},t.thresholdScott=function(t,n,e){
return Math.ceil((e-n)/(3.5*f(t)*Math.pow(t.length,-1/3)))
},t.thresholdSturges=M,t.tickFormat=bd,t.tickIncrement=x,t.tickStep=w,t.ticks=m,
t.timeDay=Jd,
t.timeDays=tp,t.timeFormatDefaultLocale=ug,t.timeFormatLocale=Wp,t.timeFriday=up,
t.timeFridays=pp,
t.timeHour=Qd,t.timeHours=Kd,t.timeInterval=Bd,t.timeMillisecond=Fd,
t.timeMilliseconds=Yd,
t.timeMinute=Zd,t.timeMinutes=$d,t.timeMonday=rp,t.timeMondays=sp,
t.timeMonth=gp,
t.timeMonths=yp,t.timeSaturday=cp,t.timeSaturdays=vp,t.timeSecond=Gd,
t.timeSeconds=Wd,
t.timeSunday=ep,t.timeSundays=fp,t.timeThursday=ap,t.timeThursdays=dp,
t.timeTuesday=ip,
t.timeTuesdays=lp,t.timeWednesday=op,t.timeWednesdays=hp,t.timeWeek=ep,
t.timeWeeks=fp,
t.timeYear=_p,t.timeYears=bp,t.timeout=qr,t.timer=Cr,t.timerFlush=Pr,t.touch=cn,
t.touches=function(t,n){null==n&&(n=on().touches)
;for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=an(t,n[e]);return i
},t.transition=yi,t.transpose=k,t.tree=function(){var t=Rh,n=1,e=1,r=null
;function i(i){var c=function(t){
for(var n,e,r,i,o,a=new Oh(t,0),u=[a];n=u.pop();)if(r=n._.children)for(n.children=new Array(o=r.length),
i=o-1;i>=0;--i)u.push(e=n.children[i]=new Oh(r[i],i)),e.parent=n
;return(a.parent=new Oh(null,0)).children=[a],a}(i)
;if(c.eachAfter(o),c.parent.m=-c.z,c.eachBefore(a),r)i.eachBefore(u);else{
var f=i,s=i,l=i;i.eachBefore((function(t){
t.x<f.x&&(f=t),t.x>s.x&&(s=t),t.depth>l.depth&&(l=t)}))
;var h=f===s?1:t(f,s)/2,d=h-f.x,p=n/(s.x+h+d),v=e/(l.depth||1)
;i.eachBefore((function(t){t.x=(t.x+d)*p,t.y=t.depth*v}))}return i}
function o(n){var e=n.children,r=n.parent.children,i=n.i?r[n.i-1]:null;if(e){
!function(t){
for(var n,e=0,r=0,i=t.children,o=i.length;--o>=0;)(n=i[o]).z+=e,n.m+=e,
e+=n.s+(r+=n.c)}(n);var o=(e[0].z+e[e.length-1].z)/2
;i?(n.z=i.z+t(n._,i._),n.m=n.z-o):n.z=o}else i&&(n.z=i.z+t(n._,i._))
;n.parent.A=function(n,e,r){if(e){
for(var i,o=n,a=n,u=e,c=o.parent.children[0],f=o.m,s=a.m,l=u.m,h=c.m;u=qh(u),
o=Dh(o),
u&&o;)c=Dh(c),(a=qh(a)).a=n,(i=u.z+l-o.z-f+t(u._,o._))>0&&(Lh(Uh(u,n,r),n,i),
f+=i,s+=i),l+=u.m,f+=o.m,h+=c.m,s+=a.m
;u&&!qh(a)&&(a.t=u,a.m+=l-s),o&&!Dh(c)&&(c.t=o,c.m+=f-h,r=n)}return r
}(n,i,n.parent.A||r[0])}function a(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}
function u(t){t.x*=n,t.y=t.depth*e}return i.separation=function(n){
return arguments.length?(t=n,i):t},i.size=function(t){
return arguments.length?(r=!1,n=+t[0],e=+t[1],i):r?null:[n,e]
},i.nodeSize=function(t){
return arguments.length?(r=!0,n=+t[0],e=+t[1],i):r?[n,e]:null},i
},t.treemap=function(){var t=Ih,n=!1,e=1,r=1,i=[0],o=xh,a=xh,u=xh,c=xh,f=xh
;function s(t){
return t.x0=t.y0=0,t.x1=e,t.y1=r,t.eachBefore(l),i=[0],n&&t.eachBefore(Sh),t}
function l(n){var e=i[n.depth],r=n.x0+e,s=n.y0+e,l=n.x1-e,h=n.y1-e
;l<r&&(r=l=(r+l)/2),
h<s&&(s=h=(s+h)/2),n.x0=r,n.y0=s,n.x1=l,n.y1=h,n.children&&(e=i[n.depth+1]=o(n)/2,
r+=f(n)-e,
s+=a(n)-e,(l-=u(n)-e)<r&&(r=l=(r+l)/2),(h-=c(n)-e)<s&&(s=h=(s+h)/2),t(n,r,s,l,h))
}return s.round=function(t){return arguments.length?(n=!!t,s):n
},s.size=function(t){return arguments.length?(e=+t[0],r=+t[1],s):[e,r]
},s.tile=function(n){return arguments.length?(t=mh(n),s):t
},s.padding=function(t){
return arguments.length?s.paddingInner(t).paddingOuter(t):s.paddingInner()
},s.paddingInner=function(t){
return arguments.length?(o="function"==typeof t?t:wh(+t),s):o
},s.paddingOuter=function(t){
return arguments.length?s.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):s.paddingTop()
},s.paddingTop=function(t){
return arguments.length?(a="function"==typeof t?t:wh(+t),s):a
},s.paddingRight=function(t){
return arguments.length?(u="function"==typeof t?t:wh(+t),s):u
},s.paddingBottom=function(t){
return arguments.length?(c="function"==typeof t?t:wh(+t),s):c
},s.paddingLeft=function(t){
return arguments.length?(f="function"==typeof t?t:wh(+t),s):f},s
},t.treemapBinary=function(t,n,e,r,i){
var o,a,u=t.children,c=u.length,f=new Array(c+1)
;for(f[0]=a=o=0;o<c;++o)f[o+1]=a+=u[o].value;!function t(n,e,r,i,o,a,c){
if(n>=e-1){var s=u[n];return s.x0=i,s.y0=o,s.x1=a,void(s.y1=c)}
var l=f[n],h=r/2+l,d=n+1,p=e-1;for(;d<p;){var v=d+p>>>1;f[v]<h?d=v+1:p=v}
h-f[d-1]<f[d]-h&&n+1<d&&--d;var g=f[d]-l,y=r-g;if(a-i>c-o){var _=(i*y+a*g)/r
;t(n,d,g,i,o,_,c),t(d,e,y,_,o,a,c)}else{var b=(o*y+c*g)/r
;t(n,d,g,i,o,a,b),t(d,e,y,i,b,a,c)}}(0,c,t.value,n,e,r,i)
},t.treemapDice=kh,t.treemapResquarify=Hh,
t.treemapSlice=Bh,t.treemapSliceDice=function(t,n,e,r,i){
(1&t.depth?Bh:kh)(t,n,e,r,i)
},t.treemapSquarify=Ih,t.tsv=Ua,t.tsvFormat=Ta,t.tsvFormatBody=Aa,
t.tsvFormatRow=ka,
t.tsvFormatRows=Sa,t.tsvFormatValue=Ea,t.tsvParse=Ma,t.tsvParseRows=Na,
t.utcDay=Np,
t.utcDays=Tp,t.utcFriday=zp,t.utcFridays=Bp,t.utcHour=wp,t.utcHours=Mp,
t.utcMillisecond=Fd,
t.utcMilliseconds=Yd,t.utcMinute=mp,t.utcMinutes=xp,t.utcMonday=kp,
t.utcMondays=qp,t.utcMonth=Yp,t.utcMonths=Ip,t.utcSaturday=Rp,t.utcSaturdays=Fp,
t.utcSecond=Gd,
t.utcSeconds=Wd,t.utcSunday=Sp,t.utcSundays=Dp,t.utcThursday=Pp,t.utcThursdays=Op,
t.utcTuesday=Ep,
t.utcTuesdays=Lp,t.utcWednesday=Cp,t.utcWednesdays=Up,t.utcWeek=Sp,
t.utcWeeks=Dp,t.utcYear=Hp,t.utcYears=jp,t.values=function(t){var n=[]
;for(var e in t)n.push(t[e]);return n
},t.variance=c,t.version="5.16.0",t.voronoi=function(){var t=Ib,n=Hb,e=null
;function r(r){return new Nm(r.map((function(e,i){
var o=[Math.round(t(e,i,r)/mm)*mm,Math.round(n(e,i,r)/mm)*mm]
;return o.index=i,o.data=e,o})),e)}return r.polygons=function(t){
return r(t).polygons()},r.links=function(t){return r(t).links()
},r.triangles=function(t){return r(t).triangles()},r.x=function(n){
return arguments.length?(t="function"==typeof n?n:Yb(+n),r):t},r.y=function(t){
return arguments.length?(n="function"==typeof t?t:Yb(+t),r):n
},r.extent=function(t){
return arguments.length?(e=null==t?null:[[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]],
r):e&&[[e[0][0],e[0][1]],[e[1][0],e[1][1]]]},r.size=function(t){
return arguments.length?(e=null==t?null:[[0,0],[+t[0],+t[1]]],
r):e&&[e[1][0]-e[0][0],e[1][1]-e[0][1]]},r
},t.window=dt,t.xml=Fa,t.zip=function(){return k(arguments)},t.zoom=function(){
var n,e,r=zm,i=Rm,o=Um,a=qm,u=Lm,c=[0,1/0],f=[[-1/0,-1/0],[1/0,1/0]],s=250,l=ur,h=F("start","zoom","end"),d=500,p=0
;function v(t){
t.property("__zoom",Dm).on("wheel.zoom",w).on("mousedown.zoom",M).on("dblclick.zoom",N).filter(u).on("touchstart.zoom",T).on("touchmove.zoom",A).on("touchend.zoom touchcancel.zoom",S).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")
}function g(t,n){
return(n=Math.max(c[0],Math.min(c[1],n)))===t.k?t:new Sm(n,t.x,t.y)}
function y(t,n,e){var r=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k
;return r===t.x&&i===t.y?t:new Sm(t.k,r,i)}function _(t){
return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function b(t,n,e){
t.on("start.zoom",(function(){m(this,arguments).start()
})).on("interrupt.zoom end.zoom",(function(){m(this,arguments).end()
})).tween("zoom",(function(){
var t=this,r=arguments,o=m(t,r),a=i.apply(t,r),u=null==e?_(a):"function"==typeof e?e.apply(t,r):e,c=Math.max(a[1][0]-a[0][0],a[1][1]-a[0][1]),f=t.__zoom,s="function"==typeof n?n.apply(t,r):n,h=l(f.invert(u).concat(c/f.k),s.invert(u).concat(c/s.k))
;return function(t){if(1===t)t=s;else{var n=h(t),e=c/n[2]
;t=new Sm(e,u[0]-n[0]*e,u[1]-n[1]*e)}o.zoom(null,t)}}))}function m(t,n,e){
return!e&&t.__zooming||new x(t,n)}function x(t,n){
this.that=t,this.args=n,this.active=0,this.extent=i.apply(t,n),this.taps=0}
function w(){if(r.apply(this,arguments)){
var t=m(this,arguments),n=this.__zoom,e=Math.max(c[0],Math.min(c[1],n.k*Math.pow(2,a.apply(this,arguments)))),i=un(this)
;if(t.wheel)t.mouse[0][0]===i[0]&&t.mouse[0][1]===i[1]||(t.mouse[1]=n.invert(t.mouse[0]=i)),
clearTimeout(t.wheel);else{if(n.k===e)return
;t.mouse=[i,n.invert(i)],Ir(this),t.start()}
Pm(),t.wheel=setTimeout(u,150),t.zoom("mouse",o(y(g(n,e),t.mouse[0],t.mouse[1]),t.extent,f))
}function u(){t.wheel=null,t.end()}}function M(){
if(!e&&r.apply(this,arguments)){
var n=m(this,arguments,!0),i=tn(t.event.view).on("mousemove.zoom",s,!0).on("mouseup.zoom",l,!0),a=un(this),u=t.event.clientX,c=t.event.clientY
;ln(t.event.view),Cm(),n.mouse=[a,this.__zoom.invert(a)],Ir(this),n.start()}
function s(){if(Pm(),!n.moved){var e=t.event.clientX-u,r=t.event.clientY-c
;n.moved=e*e+r*r>p}
n.zoom("mouse",o(y(n.that.__zoom,n.mouse[0]=un(n.that),n.mouse[1]),n.extent,f))}
function l(){
i.on("mousemove.zoom mouseup.zoom",null),hn(t.event.view,n.moved),Pm(),n.end()}}
function N(){if(r.apply(this,arguments)){
var n=this.__zoom,e=un(this),a=n.invert(e),u=n.k*(t.event.shiftKey?.5:2),c=o(y(g(n,u),e,a),i.apply(this,arguments),f)
;Pm(),
s>0?tn(this).transition().duration(s).call(b,c,e):tn(this).call(v.transform,c)}}
function T(){if(r.apply(this,arguments)){
var e,i,o,a,u=t.event.touches,c=u.length,f=m(this,arguments,t.event.changedTouches.length===c)
;for(Cm(),
i=0;i<c;++i)a=[a=cn(this,u,(o=u[i]).identifier),this.__zoom.invert(a),o.identifier],
f.touch0?f.touch1||f.touch0[2]===a[2]||(f.touch1=a,
f.taps=0):(f.touch0=a,e=!0,f.taps=1+!!n)
;n&&(n=clearTimeout(n)),e&&(f.taps<2&&(n=setTimeout((function(){n=null
}),d)),Ir(this),f.start())}}function A(){if(this.__zooming){
var e,r,i,a,u=m(this,arguments),c=t.event.changedTouches,s=c.length
;for(Pm(),n&&(n=clearTimeout(n)),
u.taps=0,e=0;e<s;++e)i=cn(this,c,(r=c[e]).identifier),
u.touch0&&u.touch0[2]===r.identifier?u.touch0[0]=i:u.touch1&&u.touch1[2]===r.identifier&&(u.touch1[0]=i)
;if(r=u.that.__zoom,u.touch1){
var l=u.touch0[0],h=u.touch0[1],d=u.touch1[0],p=u.touch1[1],v=(v=d[0]-l[0])*v+(v=d[1]-l[1])*v,_=(_=p[0]-h[0])*_+(_=p[1]-h[1])*_
;r=g(r,Math.sqrt(v/_)),
i=[(l[0]+d[0])/2,(l[1]+d[1])/2],a=[(h[0]+p[0])/2,(h[1]+p[1])/2]}else{
if(!u.touch0)return;i=u.touch0[0],a=u.touch0[1]}
u.zoom("touch",o(y(r,i,a),u.extent,f))}}function S(){if(this.__zooming){
var n,r,i=m(this,arguments),o=t.event.changedTouches,a=o.length
;for(Cm(),e&&clearTimeout(e),e=setTimeout((function(){e=null
}),d),n=0;n<a;++n)r=o[n],
i.touch0&&i.touch0[2]===r.identifier?delete i.touch0:i.touch1&&i.touch1[2]===r.identifier&&delete i.touch1
;if(i.touch1&&!i.touch0&&(i.touch0=i.touch1,
delete i.touch1),i.touch0)i.touch0[1]=this.__zoom.invert(i.touch0[0]);else if(i.end(),
2===i.taps){var u=tn(this).on("dblclick.zoom");u&&u.apply(this,arguments)}}}
return v.transform=function(t,n,e){var r=t.selection?t.selection():t
;r.property("__zoom",Dm),t!==r?b(t,n,e):r.interrupt().each((function(){
m(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()
}))},v.scaleBy=function(t,n,e){v.scaleTo(t,(function(){
var t=this.__zoom.k,e="function"==typeof n?n.apply(this,arguments):n;return t*e
}),e)},v.scaleTo=function(t,n,e){v.transform(t,(function(){
var t=i.apply(this,arguments),r=this.__zoom,a=null==e?_(t):"function"==typeof e?e.apply(this,arguments):e,u=r.invert(a),c="function"==typeof n?n.apply(this,arguments):n
;return o(y(g(r,c),a,u),t,f)}),e)},v.translateBy=function(t,n,e){
v.transform(t,(function(){
return o(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof e?e.apply(this,arguments):e),i.apply(this,arguments),f)
}))},v.translateTo=function(t,n,e,r){v.transform(t,(function(){
var t=i.apply(this,arguments),a=this.__zoom,u=null==r?_(t):"function"==typeof r?r.apply(this,arguments):r
;return o(km.translate(u[0],u[1]).scale(a.k).translate("function"==typeof n?-n.apply(this,arguments):-n,"function"==typeof e?-e.apply(this,arguments):-e),t,f)
}),r)},x.prototype={start:function(){
return 1==++this.active&&(this.that.__zooming=this,this.emit("start")),this},
zoom:function(t,n){
return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),
this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),
this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),
this.that.__zoom=n,this.emit("zoom"),this},end:function(){
return 0==--this.active&&(delete this.that.__zooming,this.emit("end")),this},
emit:function(t){
Gt(new Am(v,t,this.that.__zoom),h.apply,h,[t,this.that,this.args])}
},v.wheelDelta=function(t){
return arguments.length?(a="function"==typeof t?t:Tm(+t),v):a
},v.filter=function(t){
return arguments.length?(r="function"==typeof t?t:Tm(!!t),v):r
},v.touchable=function(t){
return arguments.length?(u="function"==typeof t?t:Tm(!!t),v):u
},v.extent=function(t){
return arguments.length?(i="function"==typeof t?t:Tm([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),
v):i},v.scaleExtent=function(t){
return arguments.length?(c[0]=+t[0],c[1]=+t[1],v):[c[0],c[1]]
},v.translateExtent=function(t){
return arguments.length?(f[0][0]=+t[0][0],f[1][0]=+t[1][0],
f[0][1]=+t[0][1],f[1][1]=+t[1][1],v):[[f[0][0],f[0][1]],[f[1][0],f[1][1]]]
},v.constrain=function(t){return arguments.length?(o=t,v):o
},v.duration=function(t){return arguments.length?(s=+t,v):s
},v.interpolate=function(t){return arguments.length?(l=t,v):l},v.on=function(){
var t=h.on.apply(h,arguments);return t===h?v:t},v.clickDistance=function(t){
return arguments.length?(p=(t=+t)*t,v):Math.sqrt(p)},v
},t.zoomIdentity=km,t.zoomTransform=Em,Object.defineProperty(t,"__esModule",{
value:!0})}));