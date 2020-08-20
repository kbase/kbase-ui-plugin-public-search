!function(t,e){
"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.vega={})
}(this,(function(t){"use strict";function e(t,e,n){
return t.fields=e||[],t.fname=n,t}function n(t){return null==t?null:t.fname}
function r(t){return null==t?null:t.fields}function i(t){throw Error(t)}
function a(t){var e,n,r,a=[],o=null,u=0,f=t.length,s="";function c(){
a.push(s+t.substring(e,n)),s="",e=n+1}
for(t+="",e=n=0;n<f;++n)if("\\"===(r=t[n]))s+=t.substring(e,n),
e=++n;else if(r===o)c(),o=null,u=-1;else{if(o)continue
;e===u&&'"'===r||e===u&&"'"===r?(e=n+1,
o=r):"."!==r||u?"["===r?(n>e&&c(),u=e=n+1):"]"===r&&(u||i("Access path missing open bracket: "+t),
u>0&&c(),u=0,e=n+1):n>e?c():e=n+1}
return u&&i("Access path missing closing bracket: "+t),
o&&i("Access path missing closing quote: "+t),n>e&&(n++,c()),a}
var o=Array.isArray;function u(t){return t===Object(t)}function f(t){
return"string"==typeof t}function s(t){
return o(t)?"["+t.map(s)+"]":u(t)||f(t)?JSON.stringify(t).replace("\u2028","\\u2028").replace("\u2029","\\u2029"):t
}function c(t,n){var r=a(t),i="return _["+r.map(s).join("][")+"];"
;return e(Function("_",i),[t=1===r.length?r[0]:t],n||t)}
var l=[],h=c("id"),d=e((function(t){return t}),l,"identity"),p=e((function(){
return 0}),l,"zero"),g=e((function(){return 1}),l,"one"),v=e((function(){
return!0}),l,"true"),m=e((function(){return!1}),l,"false");function y(t,e,n){
var r=[e].concat([].slice.call(n));console[t].apply(console,r)}function b(t){
var e=t||0;return{level:function(t){return arguments.length?(e=+t,this):e},
error:function(){return e>=1&&y("error","ERROR",arguments),this},
warn:function(){return e>=2&&y("warn","WARN",arguments),this},info:function(){
return e>=3&&y("log","INFO",arguments),this},debug:function(){
return e>=4&&y("log","DEBUG",arguments),this}}}function _(t){
return t[t.length-1]}function x(t){return null==t||""===t?null:+t}function w(t){
return function(e){return t*Math.exp(e)}}function M(t){return function(e){
return Math.log(t*e)}}function k(t){return function(e){
return e<0?-Math.pow(-e,t):Math.pow(e,t)}}function E(t,e,n,r){
var i=n(t[0]),a=n(_(t)),o=(a-i)*e;return[r(i-o),r(a-o)]}function S(t,e){
return E(t,e,x,d)}function A(t,e){var n=Math.sign(t[0]);return E(t,e,M(n),w(n))}
function C(t,e,n){return E(t,e,k(n),k(1/n))}function O(t,e,n,r,i){
var a=r(t[0]),o=r(_(t)),u=null!=e?r(e):(a+o)/2;return[i(u+(a-u)*n),i(u+(o-u)*n)]
}function z(t,e,n){return O(t,e,n,x,d)}function D(t,e,n){var r=Math.sign(t[0])
;return O(t,e,n,M(r),w(r))}function N(t,e,n,r){return O(t,e,n,k(r),k(1/r))}
function R(t){return null!=t?o(t)?t:[t]:[]}function T(t){
return"function"==typeof t}function P(t,n){
var i,o,u,f,c,l,h,d,p,g=[],v=(t=R(t)).map((function(t,e){
return null==t?null:(g.push(e),T(t)?t:a(t).map(s).join("]["))
})),m=g.length-1,y=R(n),b="var u,v;return ";if(m<0)return null
;for(o=0;o<=m;++o)T(u=v[i=g[o]])?(f="(u=this."+(l="f"+i)+"(a))",
c="(v=this."+l+"(b))",
(h=h||{})[l]=u):(f="(u=a["+u+"])",c="(v=b["+u+"])"),l="((v=v instanceof Date?+v:v),(u=u instanceof Date?+u:u))",
"descending"!==y[i]?(p=1,
d=-1):(p=-1,d=1),b+="("+f+"<"+c+"||u==null)&&v!=null?"+d+":(u>v||v==null)&&u!=null?"+p+":"+l+"!==u&&v===v?"+d+":v!==v&&u===u?"+p+(i<m?":":":0")
;return u=Function("a","b",b+";"),h&&(u=u.bind(h)),t=t.reduce((function(t,e){
return T(e)?(r(e)||[]).forEach((function(e){t[e]=1})):null!=e&&(t[e+""]=1),t
}),{}),e(u,Object.keys(t))}function L(t){return T(t)?t:function(){return t}}
function q(t,e){var n,r;function i(){e(r),n=r=null}return function(e){
r=e,n&&clearTimeout(n),n=setTimeout(i,t)}}function U(t){
for(var e,n,r=1,i=arguments.length;r<i;++r)for(n in e=arguments[r])t[n]=e[n]
;return t}function F(t,e){var n,r,i,a,o,u=-1,f=t.length;if(null==e){
for(;++u<f;)if(null!=(r=t[u])&&r>=r){n=i=r;break}
for(a=o=u;++u<f;)null!=(r=t[u])&&(n>r&&(n=r,a=u),i<r&&(i=r,o=u))}else{
for(;++u<f;)if(null!=(r=e(t[u],u,t))&&r>=r){n=i=r;break}
for(a=o=u;++u<f;)null!=(r=e(t[u],u,t))&&(n>r&&(n=r,a=u),i<r&&(i=r,o=u))}
return[a,o]}var j={};function I(t){var e,n,r={};function i(t){
return r.hasOwnProperty(t)&&r[t]!==j}return e={size:0,empty:0,object:r,has:i,
get:function(t){return i(t)?r[t]:void 0},set:function(t,n){
return i(t)||(++e.size,r[t]===j&&--e.empty),r[t]=n,this},delete:function(t){
return i(t)&&(--e.size,++e.empty,r[t]=j),this},clear:function(){
e.size=e.empty=0,e.object=r={}},test:function(t){
return arguments.length?(n=t,e):n},clean:function(){var t,i,a={},o=0
;for(t in r)(i=r[t])===j||n&&n(i)||(a[t]=i,++o);e.size=o,e.empty=0,e.object=r=a}
},t&&Object.keys(t).forEach((function(n){e.set(n,t[n])})),e}function $(t,e){
var n=t.prototype=Object.create(e.prototype);return n.constructor=t,n}
function B(t){return"boolean"==typeof t}function W(t){
return"[object Date]"===Object.prototype.toString.call(t)}function Y(t){
return"number"==typeof t}function G(t){
return"[object RegExp]"===Object.prototype.toString.call(t)}function H(t,n){
return t&&(t=n?R(t).map((function(t){return t.replace(/\\(.)/g,"$1")
})):R(t)),e(t&&t.length?Function("_","return ''+"+t.map((function(t){
return"_["+(n?s(t):a(t).map(s).join("]["))+"]"})).join("+'|'+")+";"):function(){
return""},t,"key")}function V(t,e,n,r){var i=e.length,a=n.length;if(!a)return e
;if(!i)return n
;for(var o=r||new e.constructor(i+a),u=0,f=0,s=0;u<i&&f<a;++s)o[s]=t(e[u],n[f])>0?n[f++]:e[u++]
;for(;u<i;++u,++s)o[s]=e[u];for(;f<a;++f,++s)o[s]=n[f];return o}function X(t,e){
for(var n="";--e>=0;)n+=t;return n}function J(t,e,n,r){
var i=n||" ",a=t+"",o=e-a.length
;return o<=0?a:"left"===r?X(i,o)+a:"center"===r?X(i,~~(o/2))+a+X(i,Math.ceil(o/2)):a+X(i,o)
}function Z(t){return null==t||""===t?null:!(!t||"false"===t||"0"===t)&&!!t}
function Q(t){return Y(t)||W(t)?t:Date.parse(t)}function K(t,e){
return e=e||Q,null==t||""===t?null:e(t)}function tt(t){
return null==t||""===t?null:t+""}function et(t){
for(var e={},n=0,r=t.length;n<r;++n)e[t[n]]=!0;return e}function nt(t,e,n,r){
var i=null!=r?r:"…",a=t+"",o=a.length,u=Math.max(0,e-i.length)
;return o<=e?a:"left"===n?i+a.slice(o-u):"center"===n?a.slice(0,Math.ceil(u/2))+i+a.slice(o-~~(u/2)):a.slice(0,u)+i
}function rt(t,e,n){if(t){var r,i=0,a=t.length
;if(e)for(;i<a;++i)(r=e(t[i]))&&n(r,i,t);else t.forEach(n)}}function it(t){
var e=t||d,n=[],r={};return n.add=function(t){var i=e(t)
;return r[i]||(r[i]=1,n.push(t)),n},n.remove=function(t){var i,a=e(t)
;return r[a]&&(r[a]=0,(i=n.indexOf(t))>=0&&n.splice(i,1)),n},n}
var at=Symbol("vega_id"),ot=1;function ut(t){return!(!t||!ft(t))}function ft(t){
return t[at]}function st(t,e){return t[at]=e,t}function ct(t){
var e=t===Object(t)?t:{data:t};return ft(e)?e:st(e,ot++)}function lt(t){
return ht(t,ct({}))}function ht(t,e){for(var n in t)e[n]=t[n];return e}
function dt(t,e){return st(e,ft(t))}function pt(t){return t&&t.constructor===gt}
function gt(){var t=[],e=[],n=[],r=[],i=[],a=!1;return{constructor:gt,
insert:function(e){for(var n=R(e),r=0,i=n.length;r<i;++r)t.push(n[r])
;return this},remove:function(t){
for(var n=T(t)?r:e,i=R(t),a=0,o=i.length;a<o;++a)n.push(i[a]);return this},
modify:function(t,e,r){var a={field:e,value:L(r)}
;return T(t)?(a.filter=t,i.push(a)):(a.tuple=t,n.push(a)),this},
encode:function(t,e){return T(t)?i.push({filter:t,field:e}):n.push({tuple:t,
field:e}),this},reflow:function(){return a=!0,this},pulse:function(o,u){
var f,s,c,l,h,d,p={},g={};for(f=0,s=u.length;f<s;++f)p[ft(u[f])]=1
;for(f=0,s=e.length;f<s;++f)p[ft(h=e[f])]=-1
;for(f=0,s=r.length;f<s;++f)l=r[f],u.forEach((function(t){l(t)&&(p[ft(t)]=-1)}))
;for(f=0,s=t.length;f<s;++f)d=ft(h=t[f]),p[d]?p[d]=1:o.add.push(ct(t[f]))
;for(f=0,s=u.length;f<s;++f)h=u[f],p[ft(h)]<0&&o.rem.push(h);function v(t,e,n){
n?t[e]=n(t):o.encode=e,a||(g[ft(t)]=t)}
for(f=0,s=n.length;f<s;++f)h=(c=n[f]).tuple,
l=c.field,(d=p[ft(h)])>0&&(v(h,l,c.value),o.modifies(l))
;for(f=0,s=i.length;f<s;++f)c=i[f],l=c.filter,u.forEach((function(t){
l(t)&&p[ft(t)]>0&&v(t,c.field,c.value)})),o.modifies(c.field)
;if(a)o.mod=e.length||r.length?u.filter((function(t){return p[ft(t)]>0
})):u.slice();else for(d in g)o.mod.push(g[d]);return o}}}var vt="_:mod:_"
;function mt(){Object.defineProperty(this,vt,{writable:!0,value:{}})}
var yt=mt.prototype;yt.set=function(t,e,n,r){var i=this,a=i[t],u=i[vt]
;return null!=e&&e>=0?(a[e]!==n||r)&&(a[e]=n,
u[e+":"+t]=-1,u[t]=-1):(a!==n||r)&&(i[t]=n,u[t]=o(n)?1+n.length:-1),i
},yt.modified=function(t,e){var n,r=this[vt];if(!arguments.length){
for(n in r)if(r[n])return!0;return!1}if(o(t)){
for(n=0;n<t.length;++n)if(r[t[n]])return!0;return!1}
return null!=e&&e>=0?e+1<r[t]||!!r[e+":"+t]:!!r[t]},yt.clear=function(){
return this[vt]={},this};var bt=0,_t=new mt;function xt(t,e,n,r){
this.id=++bt,this.value=t,this.stamp=-1,this.rank=-1,this.qrank=-1,this.flags=0,
e&&(this._update=e),n&&this.parameters(n,r)}var wt=xt.prototype;function Mt(t){
return function(e){var n=this.flags
;return 0===arguments.length?!!(n&t):(this.flags=e?n|t:n&~t,this)}}
wt.targets=function(){return this._targets||(this._targets=it(h))
},wt.set=function(t){return this.value!==t?(this.value=t,1):0
},wt.skip=Mt(1),wt.modified=Mt(2),wt.parameters=function(t,e,n){e=!1!==e
;var r,a,u,f,s=this,c=s._argval=s._argval||new mt,l=s._argops=s._argops||[],h=[]
;function d(t,n,r){
r instanceof xt?(r!==s&&(e&&r.targets().add(s),h.push(r)),l.push({op:r,name:t,
index:n})):c.set(t,n,r)}
for(r in t)if(a=t[r],"pulse"===r)R(a).forEach((function(t){
t instanceof xt?t!==s&&(t.targets().add(s),
h.push(t)):i("Pulse parameters must be operator instances.")
})),s.source=a;else if(o(a))for(c.set(r,-1,Array(u=a.length)),
f=0;f<u;++f)d(r,f,a[f]);else d(r,-1,a)
;return this.marshall().clear(),n&&(l.initonly=!0),h},wt.marshall=function(t){
var e,n,r,i,a,o=this._argval||_t,u=this._argops;if(u){
for(n=0,r=u.length;n<r;++n)a=(i=(e=u[n]).op).modified()&&i.stamp===t,
o.set(e.name,e.index,i.value,a);if(u.initonly){
for(n=0;n<r;++n)(e=u[n]).op.targets().remove(this)
;this._argops=null,this._update=null}}return o},wt.evaluate=function(t){
var e=this._update;if(e){var n=this.marshall(t.stamp),r=e.call(this,n,t)
;if(n.clear(),
r!==this.value)this.value=r;else if(!this.modified())return t.StopPropagation}},
wt.run=function(t){
return t.stamp<=this.stamp?t.StopPropagation:(this.skip()?(this.skip(!1),
e=0):e=this.evaluate(t),this.stamp=t.stamp,this.pulse=e||t);var e};var kt=0
;function Et(t,e,n){
this.id=++kt,this.value=null,n&&(this.receive=n),t&&(this._filter=t),
e&&(this._apply=e)}function St(t,e,n){return new Et(t,e,n)}var At=Et.prototype
;At._filter=v,At._apply=d,At.targets=function(){
return this._targets||(this._targets=it(h))},At.consume=function(t){
return arguments.length?(this._consume=!!t,this):!!this._consume
},At.receive=function(t){if(this._filter(t)){
for(var e=this.value=this._apply(t),n=this._targets,r=n?n.length:0,i=0;i<r;++i)n[i].receive(e)
;this._consume&&(t.preventDefault(),t.stopPropagation())}
},At.filter=function(t){var e=St(t);return this.targets().add(e),e
},At.apply=function(t){var e=St(null,t);return this.targets().add(e),e
},At.merge=function(){var t=St();this.targets().add(t)
;for(var e=0,n=arguments.length;e<n;++e)arguments[e].targets().add(t);return t},
At.throttle=function(t){var e=-1;return this.filter((function(){var n=Date.now()
;return n-e>t?(e=n,1):0}))},At.debounce=function(t){var e=St()
;return this.targets().add(St(null,null,q(t,(function(t){var n=t.dataflow
;e.receive(t),n&&n.run&&n.run()})))),e},At.between=function(t,e){var n=!1
;return t.targets().add(St(null,null,(function(){n=!0
}))),e.targets().add(St(null,null,(function(){n=!1}))),this.filter((function(){
return n}))};var Ct=/^([A-Za-z]+:)?\/\//,Ot="file://";function zt(t){return{
options:t||{},sanitize:Nt,load:Dt,file:Tt,http:Rt}}function Dt(t,e){var n=this
;return n.sanitize(t,e).then((function(t){var r=t.href
;return t.localFile?n.file(r):n.http(r,e)}))}function Nt(t,e){
return e=U({},this.options,e),new Promise((function(n,r){var i,a,o,u,f={
href:null}
;null!=t&&"string"==typeof t?(a=Ct.test(t),(u=e.baseURL)&&!a&&(Lt(t,"/")||"/"===u[u.length-1]||(t="/"+t),
t=u+t),
o=(i=Lt(t,Ot))||"file"===e.mode||"http"!==e.mode&&!a&&Pt(),i?t=t.slice(Ot.length):Lt(t,"//")&&("file"===e.defaultProtocol?(t=t.slice(2),
o=!0):t=(e.defaultProtocol||"http")+":"+t),Object.defineProperty(f,"localFile",{
value:!!o
}),f.href=t,e.target&&(f.target=e.target+""),n(f)):r("Sanitize failure, invalid URI: "+s(t))
}))}function Rt(t,e){return function(t,e){
var n="function"==typeof fetch?fetch:require("node-fetch")
;return n?n(t,e):Promise.reject("No fetch method available.")
}(t,U({},this.options.http,e)).then((function(t){
if(!t.ok)throw t.status+""+t.statusText;return t.text()}))}function Tt(t){
return new Promise((function(e,n){var r=Pt();r?r.readFile(t,(function(t,r){
t?n(t):e(r)})):n("No file system access for "+t)}))}function Pt(){
var t="function"==typeof require&&require("fs");return t&&T(t.readFile)?t:null}
function Lt(t,e){return null!=t&&0===t.lastIndexOf(e,0)}var qt={boolean:Z,
integer:x,number:x,date:K,string:tt,unknown:d},Ut=[function(t){
return"true"===t||"false"===t||!0===t||!1===t},function(t){
return Bt(t)&&(t=+t)==~~t},Bt,function(t){return!isNaN(Date.parse(t))
}],Ft=["boolean","integer","number","date"];function jt(t,e){
if(!t||!t.length)return"unknown"
;var n,r,i,a=0,o=t.length,u=Ut.length,f=Ut.map((function(t,e){return e+1}))
;for(r=0,
o=t.length;r<o;++r)for(n=e?t[r][e]:t[r],i=0;i<u;++i)if(f[i]&&$t(n)&&!Ut[i](n)&&(f[i]=0,
++a===Ut.length))return"string";return a=f.reduce((function(t,e){
return 0===t?e:t}),0)-1,Ft[a]}function It(t,e){return e.reduce((function(e,n){
return e[n]=jt(t,n),e}),{})}function $t(t){return null!=t&&t==t}function Bt(t){
return!(isNaN(+t)||t instanceof Date)}var Wt={},Yt={};function Gt(t){
return new Function("d","return {"+t.map((function(t,e){
return JSON.stringify(t)+": d["+e+"]"})).join(",")+"}")}function Ht(t){
var e=new RegExp('["'+t+"\n\r]"),n=t.charCodeAt(0);function r(t,e){
var r,i=[],a=t.length,o=0,u=0,f=a<=0,s=!1;function c(){if(f)return Yt
;if(s)return s=!1,Wt;var e,r,i=o;if(34===t.charCodeAt(i)){
for(;o++<a&&34!==t.charCodeAt(o)||34===t.charCodeAt(++o););
return(e=o)>=a?f=!0:10===(r=t.charCodeAt(o++))?s=!0:13===r&&(s=!0,
10===t.charCodeAt(o)&&++o),t.slice(i+1,e-1).replace(/""/g,'"')}for(;o<a;){
if(10===(r=t.charCodeAt(e=o++)))s=!0;else if(13===r)s=!0,
10===t.charCodeAt(o)&&++o;else if(r!==n)continue;return t.slice(i,e)}
return f=!0,t.slice(i,a)}
for(10===t.charCodeAt(a-1)&&--a,13===t.charCodeAt(a-1)&&--a;(r=c())!==Yt;){
for(var l=[];r!==Wt&&r!==Yt;)l.push(r),r=c();e&&null==(l=e(l,u++))||i.push(l)}
return i}function i(e){return e.map(a).join(t)}function a(t){
return null==t?"":e.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{
parse:function(t,e){var n,i,a=r(t,(function(t,r){if(n)return n(t,r-1)
;i=t,n=e?function(t,e){var n=Gt(t);return function(r,i){return e(n(r),i,t)}
}(t,e):Gt(t)}));return a.columns=i||[],a},parseRows:r,format:function(e,n){
return null==n&&(n=function(t){var e=Object.create(null),n=[]
;return t.forEach((function(t){for(var r in t)r in e||n.push(e[r]=r)})),n
}(e)),[n.map(a).join(t)].concat(e.map((function(e){return n.map((function(t){
return a(e[t])})).join(t)}))).join("\n")},formatRows:function(t){
return t.map(i).join("\n")}}}Ht(","),Ht("\t");function Vt(t){
return function(e,n){var r={delimiter:t};return Xt(e,n?U(n,r):r)}}
function Xt(t,e){
return e.header&&(t=e.header.map(s).join(e.delimiter)+"\n"+t),Ht(e.delimiter).parse(t+"")
}function Jt(t,e){var n=e&&e.property?c(e.property):d;return u(t)&&!function(t){
return!("function"!=typeof Buffer||!T(Buffer.isBuffer))&&Buffer.isBuffer(t)
}(t)?function(t,e){return e&&e.copy?JSON.parse(JSON.stringify(t)):t
}(n(t)):n(JSON.parse(t))}function Zt(t){return t}function Qt(t,e){
return"GeometryCollection"===e.type?{type:"FeatureCollection",
features:e.geometries.map((function(e){return Kt(t,e)}))}:Kt(t,e)}
function Kt(t,e){
var n=e.id,r=e.bbox,i=null==e.properties?{}:e.properties,a=te(t,e)
;return null==n&&null==r?{type:"Feature",properties:i,geometry:a}:null==r?{
type:"Feature",id:n,properties:i,geometry:a}:{type:"Feature",id:n,bbox:r,
properties:i,geometry:a}}function te(t,e){var n=function(t){if(null==t)return Zt
;var e,n,r=t.scale[0],i=t.scale[1],a=t.translate[0],o=t.translate[1]
;return function(t,u){u||(e=n=0);var f=2,s=t.length,c=new Array(s)
;for(c[0]=(e+=t[0])*r+a,c[1]=(n+=t[1])*i+o;f<s;)c[f]=t[f],++f;return c}
}(t.transform),r=t.arcs;function i(t,e){e.length&&e.pop()
;for(var i=r[t<0?~t:t],a=0,o=i.length;a<o;++a)e.push(n(i[a],a))
;t<0&&function(t,e){for(var n,r=t.length,i=r-e;i<--r;)n=t[i],t[i++]=t[r],t[r]=n
}(e,o)}function a(t){return n(t)}function o(t){
for(var e=[],n=0,r=t.length;n<r;++n)i(t[n],e);return e.length<2&&e.push(e[0]),e}
function u(t){for(var e=o(t);e.length<4;)e.push(e[0]);return e}function f(t){
return t.map(u)}return function t(e){var n,r=e.type;switch(r){
case"GeometryCollection":return{type:r,geometries:e.geometries.map(t)}
;case"Point":n=a(e.coordinates);break;case"MultiPoint":n=e.coordinates.map(a)
;break;case"LineString":n=o(e.arcs);break;case"MultiLineString":n=e.arcs.map(o)
;break;case"Polygon":n=f(e.arcs);break;case"MultiPolygon":n=e.arcs.map(f);break
;default:return null}return{type:r,coordinates:n}}(e)}function ee(t,e){
var n={},r={},i={},a=[],o=-1;function u(t,e){for(var r in t){var i=t[r]
;delete e[i.start],delete i.start,delete i.end,i.forEach((function(t){
n[t<0?~t:t]=1})),a.push(i)}}return e.forEach((function(n,r){
var i,a=t.arcs[n<0?~n:n]
;a.length<3&&!a[1][0]&&!a[1][1]&&(i=e[++o],e[o]=n,e[r]=i)
})),e.forEach((function(e){var n,a,o=function(e){var n,r=t.arcs[e<0?~e:e],i=r[0]
;t.transform?(n=[0,0],r.forEach((function(t){n[0]+=t[0],n[1]+=t[1]
}))):n=r[r.length-1];return e<0?[n,i]:[i,n]}(e),u=o[0],f=o[1]
;if(n=i[u])if(delete i[n.end],n.push(e),n.end=f,a=r[f]){delete r[a.start]
;var s=a===n?n:n.concat(a);r[s.start=n.start]=i[s.end=a.end]=s
}else r[n.start]=i[n.end]=n;else if(n=r[f])if(delete r[n.start],
n.unshift(e),n.start=u,a=i[u]){delete i[a.end];var c=a===n?n:a.concat(n)
;r[c.start=a.start]=i[c.end=n.end]=c
}else r[n.start]=i[n.end]=n;else r[(n=[e]).start=u]=i[n.end=f]=n
})),u(i,r),u(r,i),e.forEach((function(t){n[t<0?~t:t]||a.push([t])})),a}
function ne(t){return te(t,re.apply(this,arguments))}function re(t,e,n){
var r,i,a
;if(arguments.length>1)r=ie(t,e,n);else for(i=0,r=new Array(a=t.arcs.length);i<a;++i)r[i]=i
;return{type:"MultiLineString",arcs:ee(t,r)}}function ie(t,e,n){var r,i=[],a=[]
;function o(t){var e=t<0?~t:t;(a[e]||(a[e]=[])).push({i:t,g:r})}function u(t){
t.forEach(o)}function f(t){t.forEach(u)}return function t(e){switch(r=e,e.type){
case"GeometryCollection":e.geometries.forEach(t);break;case"LineString":
u(e.arcs);break;case"MultiLineString":case"Polygon":f(e.arcs);break
;case"MultiPolygon":!function(t){t.forEach(f)}(e.arcs)}
}(e),a.forEach(null==n?function(t){i.push(t[0].i)}:function(t){
n(t[0].g,t[t.length-1].g)&&i.push(t[0].i)}),i}var ae={dsv:Xt,csv:Vt(","),
tsv:Vt("\t"),json:Jt,topojson:function(t,e){var n,r,a
;return t=Jt(t,e),n=e&&(a=e.feature)?Qt:e&&(a=e.mesh)?ne:i("Missing TopoJSON feature or mesh parameter."),
(r=(r=t.objects[a])?n(t,r):i("Invalid TopoJSON object: "+a))&&r.features||[r]}}
;function oe(t,e){
return arguments.length>1?(ae[t]=e,this):ae.hasOwnProperty(t)?ae[t]:null}
var ue=new Date,fe=new Date;function se(t,e,n,r){function i(e){
return t(e=new Date(+e)),e}return i.floor=i,i.ceil=function(n){
return t(n=new Date(n-1)),e(n,1),t(n),n},i.round=function(t){
var e=i(t),n=i.ceil(t);return t-e<n-t?e:n},i.offset=function(t,n){
return e(t=new Date(+t),null==n?1:Math.floor(n)),t},i.range=function(n,r,a){
var o,u=[];if(n=i.ceil(n),a=null==a?1:Math.floor(a),!(n<r&&a>0))return u;do{
u.push(o=new Date(+n)),e(n,a),t(n)}while(o<n&&n<r);return u
},i.filter=function(n){return se((function(e){
if(e>=e)for(;t(e),!n(e);)e.setTime(e-1)}),(function(t,r){
if(t>=t)if(r<0)for(;++r<=0;)for(;e(t,-1),
!n(t););else for(;--r>=0;)for(;e(t,1),!n(t););}))},n&&(i.count=function(e,r){
return ue.setTime(+e),fe.setTime(+r),t(ue),t(fe),Math.floor(n(ue,fe))
},i.every=function(t){
return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(e){
return r(e)%t==0}:function(e){return i.count(0,e)%t==0}):i:null}),i}
var ce=se((function(){}),(function(t,e){t.setTime(+t+e)}),(function(t,e){
return e-t}));ce.every=function(t){
return t=Math.floor(t),isFinite(t)&&t>0?t>1?se((function(e){
e.setTime(Math.floor(e/t)*t)}),(function(e,n){e.setTime(+e+n*t)
}),(function(e,n){return(n-e)/t})):ce:null};ce.range
;var le=1e3,he=6e4,de=36e5,pe=864e5,ge=6048e5,ve=se((function(t){
t.setTime(Math.floor(t/le)*le)}),(function(t,e){t.setTime(+t+e*le)
}),(function(t,e){return(e-t)/le}),(function(t){return t.getUTCSeconds()
})),me=(ve.range,se((function(t){t.setTime(Math.floor(t/he)*he)
}),(function(t,e){t.setTime(+t+e*he)}),(function(t,e){return(e-t)/he
}),(function(t){return t.getMinutes()}))),ye=(me.range,se((function(t){
var e=t.getTimezoneOffset()*he%de
;e<0&&(e+=de),t.setTime(Math.floor((+t-e)/de)*de+e)}),(function(t,e){
t.setTime(+t+e*de)}),(function(t,e){return(e-t)/de}),(function(t){
return t.getHours()}))),be=(ye.range,se((function(t){t.setHours(0,0,0,0)
}),(function(t,e){t.setDate(t.getDate()+e)}),(function(t,e){
return(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*he)/pe}),(function(t){
return t.getDate()-1})));be.range;function _e(t){return se((function(e){
e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)}),(function(t,e){
t.setDate(t.getDate()+7*e)}),(function(t,e){
return(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*he)/ge}))}
var xe=_e(0),we=_e(1),Me=(_e(2),
_e(3),_e(4)),ke=(_e(5),_e(6),xe.range,we.range,Me.range,se((function(t){
t.setDate(1),t.setHours(0,0,0,0)}),(function(t,e){t.setMonth(t.getMonth()+e)
}),(function(t,e){
return e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear())
}),(function(t){return t.getMonth()}))),Ee=(ke.range,se((function(t){
t.setMonth(0,1),t.setHours(0,0,0,0)}),(function(t,e){
t.setFullYear(t.getFullYear()+e)}),(function(t,e){
return e.getFullYear()-t.getFullYear()}),(function(t){return t.getFullYear()})))
;Ee.every=function(t){return isFinite(t=Math.floor(t))&&t>0?se((function(e){
e.setFullYear(Math.floor(e.getFullYear()/t)*t),
e.setMonth(0,1),e.setHours(0,0,0,0)}),(function(e,n){
e.setFullYear(e.getFullYear()+n*t)})):null};Ee.range;var Se=se((function(t){
t.setUTCSeconds(0,0)}),(function(t,e){t.setTime(+t+e*he)}),(function(t,e){
return(e-t)/he}),(function(t){return t.getUTCMinutes()
})),Ae=(Se.range,se((function(t){t.setUTCMinutes(0,0,0)}),(function(t,e){
t.setTime(+t+e*de)}),(function(t,e){return(e-t)/de}),(function(t){
return t.getUTCHours()}))),Ce=(Ae.range,se((function(t){t.setUTCHours(0,0,0,0)
}),(function(t,e){t.setUTCDate(t.getUTCDate()+e)}),(function(t,e){return(e-t)/pe
}),(function(t){return t.getUTCDate()-1})));Ce.range;function Oe(t){
return se((function(e){
e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)
}),(function(t,e){t.setUTCDate(t.getUTCDate()+7*e)}),(function(t,e){
return(e-t)/ge}))}
var ze=Oe(0),De=Oe(1),Ne=(Oe(2),Oe(3),Oe(4)),Re=(Oe(5),Oe(6),ze.range,
De.range,Ne.range,se((function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)
}),(function(t,e){t.setUTCMonth(t.getUTCMonth()+e)}),(function(t,e){
return e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear())
}),(function(t){return t.getUTCMonth()}))),Te=(Re.range,se((function(t){
t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),(function(t,e){
t.setUTCFullYear(t.getUTCFullYear()+e)}),(function(t,e){
return e.getUTCFullYear()-t.getUTCFullYear()}),(function(t){
return t.getUTCFullYear()})));Te.every=function(t){
return isFinite(t=Math.floor(t))&&t>0?se((function(e){
e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),
e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)}),(function(e,n){
e.setUTCFullYear(e.getUTCFullYear()+n*t)})):null};Te.range;function Pe(t){
if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L)
;return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}
function Le(t){if(0<=t.y&&t.y<100){
var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L))
;return e.setUTCFullYear(t.y),e}
return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function qe(t){return{
y:t,m:0,d:1,H:0,M:0,S:0,L:0}}var Ue,Fe,je,Ie,$e,Be={"-":"",_:" ",0:"0"
},We=/^\s*\d+/,Ye=/^%/,Ge=/[\\^$*+?|[\]().{}]/g;function He(t,e,n){
var r=t<0?"-":"",i=(r?-t:t)+"",a=i.length
;return r+(a<n?new Array(n-a+1).join(e)+i:i)}function Ve(t){
return t.replace(Ge,"\\$&")}function Xe(t){
return new RegExp("^(?:"+t.map(Ve).join("|")+")","i")}function Je(t){
for(var e={},n=-1,r=t.length;++n<r;)e[t[n].toLowerCase()]=n;return e}
function Ze(t,e,n){var r=We.exec(e.slice(n,n+1))
;return r?(t.w=+r[0],n+r[0].length):-1}function Qe(t,e,n){
var r=We.exec(e.slice(n,n+1));return r?(t.u=+r[0],n+r[0].length):-1}
function Ke(t,e,n){var r=We.exec(e.slice(n,n+2))
;return r?(t.U=+r[0],n+r[0].length):-1}function tn(t,e,n){
var r=We.exec(e.slice(n,n+2));return r?(t.V=+r[0],n+r[0].length):-1}
function en(t,e,n){var r=We.exec(e.slice(n,n+2))
;return r?(t.W=+r[0],n+r[0].length):-1}function nn(t,e,n){
var r=We.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}
function rn(t,e,n){var r=We.exec(e.slice(n,n+2))
;return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function an(t,e,n){
var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n,n+6))
;return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function on(t,e,n){
var r=We.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}
function un(t,e,n){var r=We.exec(e.slice(n,n+2))
;return r?(t.d=+r[0],n+r[0].length):-1}function fn(t,e,n){
var r=We.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}
function sn(t,e,n){var r=We.exec(e.slice(n,n+2))
;return r?(t.H=+r[0],n+r[0].length):-1}function cn(t,e,n){
var r=We.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}
function ln(t,e,n){var r=We.exec(e.slice(n,n+2))
;return r?(t.S=+r[0],n+r[0].length):-1}function hn(t,e,n){
var r=We.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}
function dn(t,e,n){var r=We.exec(e.slice(n,n+6))
;return r?(t.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function pn(t,e,n){
var r=Ye.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function gn(t,e,n){
var r=We.exec(e.slice(n));return r?(t.Q=+r[0],n+r[0].length):-1}
function vn(t,e,n){var r=We.exec(e.slice(n))
;return r?(t.Q=1e3*+r[0],n+r[0].length):-1}function mn(t,e){
return He(t.getDate(),e,2)}function yn(t,e){return He(t.getHours(),e,2)}
function bn(t,e){return He(t.getHours()%12||12,e,2)}function _n(t,e){
return He(1+be.count(Ee(t),t),e,3)}function xn(t,e){
return He(t.getMilliseconds(),e,3)}function wn(t,e){return xn(t,e)+"000"}
function Mn(t,e){return He(t.getMonth()+1,e,2)}function kn(t,e){
return He(t.getMinutes(),e,2)}function En(t,e){return He(t.getSeconds(),e,2)}
function Sn(t){var e=t.getDay();return 0===e?7:e}function An(t,e){
return He(xe.count(Ee(t),t),e,2)}function Cn(t,e){var n=t.getDay()
;return t=n>=4||0===n?Me(t):Me.ceil(t),
He(Me.count(Ee(t),t)+(4===Ee(t).getDay()),e,2)}function On(t){return t.getDay()}
function zn(t,e){return He(we.count(Ee(t),t),e,2)}function Dn(t,e){
return He(t.getFullYear()%100,e,2)}function Nn(t,e){
return He(t.getFullYear()%1e4,e,4)}function Rn(t){var e=t.getTimezoneOffset()
;return(e>0?"-":(e*=-1,"+"))+He(e/60|0,"0",2)+He(e%60,"0",2)}function Tn(t,e){
return He(t.getUTCDate(),e,2)}function Pn(t,e){return He(t.getUTCHours(),e,2)}
function Ln(t,e){return He(t.getUTCHours()%12||12,e,2)}function qn(t,e){
return He(1+Ce.count(Te(t),t),e,3)}function Un(t,e){
return He(t.getUTCMilliseconds(),e,3)}function Fn(t,e){return Un(t,e)+"000"}
function jn(t,e){return He(t.getUTCMonth()+1,e,2)}function In(t,e){
return He(t.getUTCMinutes(),e,2)}function $n(t,e){
return He(t.getUTCSeconds(),e,2)}function Bn(t){var e=t.getUTCDay()
;return 0===e?7:e}function Wn(t,e){return He(ze.count(Te(t),t),e,2)}
function Yn(t,e){var n=t.getUTCDay()
;return t=n>=4||0===n?Ne(t):Ne.ceil(t),He(Ne.count(Te(t),t)+(4===Te(t).getUTCDay()),e,2)
}function Gn(t){return t.getUTCDay()}function Hn(t,e){
return He(De.count(Te(t),t),e,2)}function Vn(t,e){
return He(t.getUTCFullYear()%100,e,2)}function Xn(t,e){
return He(t.getUTCFullYear()%1e4,e,4)}function Jn(){return"+0000"}function Zn(){
return"%"}function Qn(t){return+t}function Kn(t){return Math.floor(+t/1e3)}
function tr(t){return Ue=function(t){
var e=t.dateTime,n=t.date,r=t.time,i=t.periods,a=t.days,o=t.shortDays,u=t.months,f=t.shortMonths,s=Xe(i),c=Je(i),l=Xe(a),h=Je(a),d=Xe(o),p=Je(o),g=Xe(u),v=Je(u),m=Xe(f),y=Je(f),b={
a:function(t){return o[t.getDay()]},A:function(t){return a[t.getDay()]},
b:function(t){return f[t.getMonth()]},B:function(t){return u[t.getMonth()]},
c:null,d:mn,e:mn,f:wn,H:yn,I:bn,j:_n,L:xn,m:Mn,M:kn,p:function(t){
return i[+(t.getHours()>=12)]},Q:Qn,s:Kn,S:En,u:Sn,U:An,V:Cn,w:On,W:zn,x:null,
X:null,y:Dn,Y:Nn,Z:Rn,"%":Zn},_={a:function(t){return o[t.getUTCDay()]},
A:function(t){return a[t.getUTCDay()]},b:function(t){return f[t.getUTCMonth()]},
B:function(t){return u[t.getUTCMonth()]},c:null,d:Tn,e:Tn,f:Fn,H:Pn,I:Ln,j:qn,
L:Un,m:jn,M:In,p:function(t){return i[+(t.getUTCHours()>=12)]},Q:Qn,s:Kn,S:$n,
u:Bn,U:Wn,V:Yn,w:Gn,W:Hn,x:null,X:null,y:Vn,Y:Xn,Z:Jn,"%":Zn},x={
a:function(t,e,n){var r=d.exec(e.slice(n))
;return r?(t.w=p[r[0].toLowerCase()],n+r[0].length):-1},A:function(t,e,n){
var r=l.exec(e.slice(n));return r?(t.w=h[r[0].toLowerCase()],n+r[0].length):-1},
b:function(t,e,n){var r=m.exec(e.slice(n))
;return r?(t.m=y[r[0].toLowerCase()],n+r[0].length):-1},B:function(t,e,n){
var r=g.exec(e.slice(n));return r?(t.m=v[r[0].toLowerCase()],n+r[0].length):-1},
c:function(t,n,r){return k(t,e,n,r)},d:un,e:un,f:dn,H:sn,I:sn,j:fn,L:hn,m:on,
M:cn,p:function(t,e,n){var r=s.exec(e.slice(n))
;return r?(t.p=c[r[0].toLowerCase()],n+r[0].length):-1},Q:gn,s:vn,S:ln,u:Qe,
U:Ke,V:tn,w:Ze,W:en,x:function(t,e,r){return k(t,n,e,r)},X:function(t,e,n){
return k(t,r,e,n)},y:rn,Y:nn,Z:an,"%":pn};function w(t,e){return function(n){
var r,i,a,o=[],u=-1,f=0,s=t.length
;for(n instanceof Date||(n=new Date(+n));++u<s;)37===t.charCodeAt(u)&&(o.push(t.slice(f,u)),
null!=(i=Be[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",
(a=e[r])&&(r=a(n,i)),o.push(r),f=u+1);return o.push(t.slice(f,u)),o.join("")}}
function M(t,e){return function(n){var r,i,a=qe(1900)
;if(k(a,t,n+="",0)!=n.length)return null;if("Q"in a)return new Date(a.Q)
;if("p"in a&&(a.H=a.H%12+12*a.p),"V"in a){if(a.V<1||a.V>53)return null
;"w"in a||(a.w=1),
"Z"in a?(i=(r=Le(qe(a.y))).getUTCDay(),r=i>4||0===i?De.ceil(r):De(r),
r=Ce.offset(r,7*(a.V-1)),
a.y=r.getUTCFullYear(),a.m=r.getUTCMonth(),a.d=r.getUTCDate()+(a.w+6)%7):(i=(r=e(qe(a.y))).getDay(),
r=i>4||0===i?we.ceil(r):we(r),
r=be.offset(r,7*(a.V-1)),a.y=r.getFullYear(),a.m=r.getMonth(),
a.d=r.getDate()+(a.w+6)%7)
}else("W"in a||"U"in a)&&("w"in a||(a.w="u"in a?a.u%7:"W"in a?1:0),
i="Z"in a?Le(qe(a.y)).getUTCDay():e(qe(a.y)).getDay(),
a.m=0,a.d="W"in a?(a.w+6)%7+7*a.W-(i+5)%7:a.w+7*a.U-(i+6)%7)
;return"Z"in a?(a.H+=a.Z/100|0,a.M+=a.Z%100,Le(a)):e(a)}}function k(t,e,n,r){
for(var i,a,o=0,u=e.length,f=n.length;o<u;){if(r>=f)return-1
;if(37===(i=e.charCodeAt(o++))){
if(i=e.charAt(o++),!(a=x[i in Be?e.charAt(o++):i])||(r=a(t,n,r))<0)return-1
}else if(i!=n.charCodeAt(r++))return-1}return r}
return b.x=w(n,b),b.X=w(r,b),b.c=w(e,b),_.x=w(n,_),_.X=w(r,_),_.c=w(e,_),{
format:function(t){var e=w(t+="",b);return e.toString=function(){return t},e},
parse:function(t){var e=M(t+="",Pe);return e.toString=function(){return t},e},
utcFormat:function(t){var e=w(t+="",_);return e.toString=function(){return t},e
},utcParse:function(t){var e=M(t,Le);return e.toString=function(){return t},e}}
}(t),Fe=Ue.format,je=Ue.parse,Ie=Ue.utcFormat,$e=Ue.utcParse,Ue}tr({
dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
months:["January","February","March","April","May","June","July","August","September","October","November","December"],
shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
});var er="%Y-%m-%dT%H:%M:%S.%LZ";Date.prototype.toISOString||Ie(er)
;+new Date("2000-01-01T00:00:00.000Z")||$e(er);function nr(t,e,n){
var r=oe((e=e||{}).type||"json")
;return r||i("Unknown data format type: "+e.type),
t=r(t,e),e.parse&&function(t,e,n){if(!t.length)return;n=n||je
;var r,i,a,o,u,f,s,c=t.columns||Object.keys(t[0]);"auto"===e&&(e=It(t,c))
;for(c=Object.keys(e),r=c.map((function(t){var r,i,a=e[t]
;if(a&&(0===a.indexOf("date:")||0===a.indexOf("utc:")))return("'"===(i=(r=a.split(/:(.+)?/,2))[1])[0]&&"'"===i[i.length-1]||'"'===i[0]&&'"'===i[i.length-1])&&(i=i.slice(1,-1)),
"utc"===r[0]?$e(i):n(i)
;if(!qt[a])throw Error("Illegal format pattern: "+t+":"+a);return qt[a]
})),o=0,f=t.length,
s=c.length;o<f;++o)for(i=t[o],u=0;u<s;++u)i[a=c[u]]=r[u](i[a])
}(t,e.parse,n),t.hasOwnProperty("columns")&&delete t.columns,t}var rr={skip:!0}
;function ir(t,e,n,r,i,a){var o,u,f=U({},a,rr)
;T(n)||(n=L(n)),void 0===r?o=function(e){t.touch(n(e))
}:T(r)?(u=new xt(null,r,i,!1),o=function(e){var r,i=n(e)
;u.evaluate(e),pt(r=u.value)?t.pulse(i,r,a):t.update(i,r,f)}):o=function(e){
t.update(n(e),r,f)},e.apply(o)}function ar(t,e,n,r,i,a){var o,u
;void 0===r?u=n:(o=T(r)?r:L(r),(u=new xt(null,r=n?function(t,e){var r=o(t,e)
;return n.skip()||(n.skip(r!==this.value).value=r),r
}:o,i,!1)).modified(a&&a.force),
u.rank=0,n&&(u.skip(!0),u.value=n.value,u.targets().add(n))),e.targets().add(u)}
var or={};function ur(t,e,n){
this.dataflow=t,this.stamp=null==e?-1:e,this.add=[],
this.rem=[],this.mod=[],this.fields=null,this.encode=n||null}var fr=ur.prototype
;function sr(t,e){return t?function(n,r){return t(n,r)&&e(n,r)}:e}
function cr(t,e){var n=[];return rt(t,e,(function(t){n.push(t)})),n}
function lr(t,e){var n={};return t.visit(e,(function(t){n[ft(t)]=1
})),function(t){return n[ft(t)]?null:t}}function hr(t,e,n,r){
var i,a,o,u,f,s=this,c=0
;for(this.dataflow=t,this.stamp=e,this.fields=null,this.encode=r||null,
this.pulses=n,o=0,u=n.length;o<u;++o)if((i=n[o]).stamp===e){
if(i.fields)for(f in a=s.fields||(s.fields={}),i.fields)a[f]=1
;i.changed(s.ADD)&&(c|=s.ADD),
i.changed(s.REM)&&(c|=s.REM),i.changed(s.MOD)&&(c|=s.MOD)}this.changes=c}
fr.StopPropagation=or,
fr.ADD=1,fr.REM=2,fr.MOD=4,fr.ADD_REM=3,fr.ADD_MOD=5,fr.ALL=7,
fr.REFLOW=8,fr.SOURCE=16,fr.NO_SOURCE=32,fr.NO_FIELDS=64,fr.fork=function(t){
return new ur(this.dataflow).init(this,t)},fr.clone=function(){
var t=this.fork(7)
;return t.add=t.add.slice(),t.rem=t.rem.slice(),t.mod=t.mod.slice(),
t.source&&(t.source=t.source.slice()),t.materialize(23)},fr.addAll=function(){
var t=this
;return this.source&&this.source.length!==this.add.length?((t=new ur(this.dataflow).init(this)).add=t.source,
t):t},fr.init=function(t,e){var n=this;return n.stamp=t.stamp,n.encode=t.encode,
!t.fields||64&e||(n.fields=t.fields),
1&e?(n.addF=t.addF,n.add=t.add):(n.addF=null,
n.add=[]),2&e?(n.remF=t.remF,n.rem=t.rem):(n.remF=null,
n.rem=[]),4&e?(n.modF=t.modF,
n.mod=t.mod):(n.modF=null,n.mod=[]),32&e?(n.srcF=null,
n.source=null):(n.srcF=t.srcF,n.source=t.source),n},fr.runAfter=function(t){
this.dataflow.runAfter(t)},fr.changed=function(t){var e=t||7
;return 1&e&&this.add.length||2&e&&this.rem.length||4&e&&this.mod.length
},fr.reflow=function(t){if(t)return this.fork(7).reflow()
;var e=this.add.length,n=this.source&&this.source.length
;return n&&n!==e&&(this.mod=this.source,e&&this.filter(4,lr(this,1))),this
},fr.modifies=function(t){var e=R(t),n=this.fields||(this.fields={})
;return e.forEach((function(t){n[t]=!0})),this},fr.modified=function(t){
var e=this.fields
;return!(!this.mod.length||!e)&&(arguments.length?o(t)?t.some((function(t){
return e[t]})):e[t]:!!e)},fr.filter=function(t,e){var n=this
;return 1&t&&(n.addF=sr(n.addF,e)),
2&t&&(n.remF=sr(n.remF,e)),4&t&&(n.modF=sr(n.modF,e)),
16&t&&(n.srcF=sr(n.srcF,e)),n},fr.materialize=function(t){var e=this
;return 1&(t=t||7)&&e.addF&&(e.add=cr(e.add,e.addF),
e.addF=null),2&t&&e.remF&&(e.rem=cr(e.rem,e.remF),
e.remF=null),4&t&&e.modF&&(e.mod=cr(e.mod,e.modF),
e.modF=null),16&t&&e.srcF&&(e.source=e.source.filter(e.srcF),e.srcF=null),e
},fr.visit=function(t,e){var n,r,i=this,a=e
;return 16&t?(rt(i.source,i.srcF,a),i):(1&t&&rt(i.add,i.addF,a),
2&t&&rt(i.rem,i.remF,a),
4&t&&rt(i.mod,i.modF,a),8&t&&(n=i.source)&&((r=i.add.length+i.mod.length)===n.length||rt(n,r?lr(i,5):i.srcF,a)),
i)};var dr=$(hr,ur);function pr(t,e){try{e(t)}catch(n){t.error(n)}}
dr.fork=function(t){var e=new ur(this.dataflow).init(this,t&this.NO_FIELDS)
;return void 0!==t&&(t&e.ADD&&this.visit(e.ADD,(function(t){return e.add.push(t)
})),t&e.REM&&this.visit(e.REM,(function(t){return e.rem.push(t)
})),t&e.MOD&&this.visit(e.MOD,(function(t){return e.mod.push(t)}))),e
},dr.changed=function(t){return this.changes&t},dr.modified=function(t){
var e=this,n=e.fields;return n&&e.changes&e.MOD?o(t)?t.some((function(t){
return n[t]})):n[t]:0},dr.filter=function(){
i("MultiPulse does not support filtering.")},dr.materialize=function(){
i("MultiPulse does not support materialization.")},dr.visit=function(t,e){
var n=this,r=n.pulses,i=r.length,a=0
;if(t&n.SOURCE)for(;a<i;++a)r[a].visit(t,e);else for(;a<i;++a)r[a].stamp===n.stamp&&r[a].visit(t,e)
;return n};var gr={skip:!1,force:!1};function vr(t){this.cmp=t,this.nodes=[]}
var mr=vr.prototype;function yr(t,e,n,r){var i,a,o
;for(i=t[n];n>e&&r(i,a=t[o=n-1>>1])<0;)t[n]=a,n=o;return t[n]=i}
function br(t,e,n){
for(var r,i=e,a=t.length,o=t[e],u=2*e+1;u<a;)(r=u+1)<a&&n(t[u],t[r])>=0&&(u=r),
t[e]=t[u],u=2*(e=u)+1;return t[e]=o,yr(t,i,e,n)}function _r(){
this._log=b(),this.logLevel(1),this._clock=0,this._rank=0;try{this._loader=zt()
}catch(t){}
this._touched=it(h),this._pulses={},this._pulse=null,this._heap=new vr((function(t,e){
return t.qrank-e.qrank})),this._postrun=[]}mr.size=function(){
return this.nodes.length},mr.clear=function(){return this.nodes=[],this
},mr.peek=function(){return this.nodes[0]},mr.push=function(t){var e=this.nodes
;return e.push(t),yr(e,0,e.length-1,this.cmp)},mr.pop=function(){
var t,e=this.nodes,n=e.pop()
;return e.length?(t=e[0],e[0]=n,br(e,0,this.cmp)):t=n,t},mr.replace=function(t){
var e=this.nodes,n=e[0];return e[0]=t,br(e,0,this.cmp),n
},mr.pushpop=function(t){var e=this.nodes,n=e[0]
;return e.length&&this.cmp(n,t)<0&&(e[0]=t,t=n,br(e,0,this.cmp)),t}
;var xr=_r.prototype;function wr(t){return function(){
return this._log[t].apply(this,arguments)}}function Mr(t,e){
xt.call(this,t,null,e)}xr.stamp=function(){return this._clock
},xr.loader=function(t){
return arguments.length?(this._loader=t,this):this._loader
},xr.cleanThreshold=1e4,xr.add=function(t,e,n,r){var i,a=1
;return t instanceof xt?i=t:t&&t.prototype instanceof xt?i=new t:T(t)?i=new xt(null,t):(a=0,
i=new xt(t,e)),
this.rank(i),a&&(r=n,n=e),n&&this.connect(i,i.parameters(n,r)),this.touch(i),i},
xr.connect=function(t,e){var n,r,i=t.rank
;for(n=0,r=e.length;n<r;++n)if(i<e[n].rank)return void this.rerank(t)
},xr.rank=function(t){t.rank=++this._rank},xr.rerank=function(t){
for(var e,n,r,a=[t];a.length;)if(this.rank(e=a.pop()),
n=e._targets)for(r=n.length;--r>=0;)a.push(e=n[r]),
e===t&&i("Cycle detected in dataflow graph.")},xr.pulse=function(t,e,n){
this.touch(t,n||gr)
;var r=new ur(this,this._clock+(this._pulse?0:1)),i=t.pulse&&t.pulse.source||[]
;return r.target=t,this._pulses[t.id]=e.pulse(r,i),this},xr.touch=function(t,e){
var n=e||gr
;return this._pulse?this._enqueue(t):this._touched.add(t),n.skip&&t.skip(!0),
this},xr.update=function(t,e,n){var r=n||gr
;return(t.set(e)||r.force)&&this.touch(t,r),this
},xr.changeset=gt,xr.ingest=function(t,e,n){
return this.pulse(t,this.changeset().insert(nr(e,n)))
},xr.request=function(t,e,n){var r=this,i=0,a=r._pending||function(t){
var e,n,r=new Promise((function(r,i){e=function(){r(t)},n=i}))
;return r.requests=0,r.done=function(){0==--r.requests&&t.runAfter((function(){
t._pending=null;try{t.run(),t._pending?t._pending.then(e):e()}catch(r){n(r)}}))
},t._pending=r}(r);return a.requests+=1,r.loader().load(e,{context:"dataflow"
}).then((function(t){return nr(t,n)}),(function(t){
i=-1,r.error("Loading failed",e,t)})).catch((function(t){
i=-2,r.error("Data ingestion failed",e,t)})).then((function(e){
return r.pulse(t,r.changeset().remove(v).insert(e||[])),a.done(),i}))
},xr.events=function(t,e,n,r){for(var i,a=this,o=St(n,r),u=function(t){
t.dataflow=a;try{o.receive(t)}catch(e){a.error(e)}finally{a.run()}
},f=0,s=(i="string"==typeof t&&"undefined"!=typeof document?document.querySelectorAll(t):R(t)).length;f<s;++f)i[f].addEventListener(e,u)
;return o},xr.on=function(t,e,n,r,i){
return(t instanceof xt?ar:ir)(this,t,e,n,r,i),this},xr.run=function(t){
var e,n,r,i,a=this,o=0,u=a.logLevel()
;if(a._pending)return a.info("Awaiting requests, delaying dataflow run."),0
;if(a._pulse)return a.error("Dataflow invoked recursively. Use the runAfter method to queue invocation."),
0;if(!a._touched.length)return a.info("Dataflow invoked, but nothing to do."),0
;a._pulse=new ur(a,++a._clock,t),
u>=3&&(r=Date.now(),a.debug("-- START PROPAGATION ("+a._clock+") -----")),
a._touched.forEach((function(t){a._enqueue(t,!0)})),a._touched=it(h);try{
for(;a._heap.size()>0;)(e=a._heap.pop()).rank===e.qrank?(n=e.run(a._getPulse(e,t)),
u>=4&&a.debug(e.id,n===or?"STOP":n,e),
n!==or&&(a._pulse=n,e._targets&&e._targets.forEach((function(t){a._enqueue(t)
}))),++o):a._enqueue(e,!0)}catch(s){i=s}
if(a._pulses={},a._pulse=null,u>=3&&(r=Date.now()-r,
a.info("> Pulse "+a._clock+": "+o+" operators; "+r+"ms")),
i&&(a._postrun=[],a.error(i)),a._onrun)try{a._onrun(a,o,i)}catch(s){a.error(s)}
if(a._postrun.length){var f=a._postrun;a._postrun=[],f.sort((function(t,e){
return e.priority-t.priority})).forEach((function(t){pr(a,t.callback)}))}
return this},xr.runAsync=function(){
return this._pending||this.run()&&this._pending||Promise.resolve(this)
},xr.runAfter=function(t,e,n){this._pulse||e?this._postrun.push({priority:n||0,
callback:t}):pr(this,t)},xr._enqueue=function(t,e){var n=!this._pulses[t.id]
;n&&(this._pulses[t.id]=this._pulse),(n||e)&&(t.qrank=t.rank,this._heap.push(t))
},xr._getPulse=function(t,e){var n,r=t.source,i=this._clock
;return r&&o(r)?new hr(this,i,n=r.map((function(t){return t.pulse
})),e):(n=this._pulses[t.id],
r&&((r=r.pulse)&&r!==or?r.stamp===i&&n.target!==t?n=r:n.source=r.source:n.source=[]),
n)
},xr.error=wr("error"),xr.warn=wr("warn"),xr.info=wr("info"),xr.debug=wr("debug"),
xr.logLevel=wr("level");var kr=$(Mr,xt);kr.run=function(t){
return t.stamp<=this.stamp?t.StopPropagation:(this.skip()?this.skip(!1):e=this.evaluate(t),
(e=e||t)!==t.StopPropagation&&(this.pulse=e),this.stamp=t.stamp,e);var e
},kr.evaluate=function(t){var e=this.marshall(t.stamp),n=this.transform(e,t)
;return e.clear(),n},kr.transform=function(){};var Er={};function Sr(t){
var e=Ar(t);return e&&e.Definition||null}function Ar(t){
return t=t&&t.toLowerCase(),Er.hasOwnProperty(t)?Er[t]:null}function Cr(t){
return t&&t.length?1===t.length?t[0]:function(t){return function(e){
for(var n=t.length,r=1,i=String(t[0](e));r<n;++r)i+="|"+t[r](e);return i}
}(t):function(){return""}}function Or(t,e,n){return n||t+(e?"_"+e:"")}var zr={
values:Rr({name:"values",init:"cell.store = true;",set:"cell.data.values()",
idx:-1}),count:Rr({name:"count",set:"cell.num"}),__count__:Rr({name:"count",
set:"this.missing + this.valid"}),missing:Rr({name:"missing",set:"this.missing"
}),valid:Rr({name:"valid",set:"this.valid"}),sum:Rr({name:"sum",
init:"this.sum = 0;",add:"this.sum += +v;",rem:"this.sum -= v;",set:"this.sum"
}),mean:Rr({name:"mean",init:"this.mean = 0;",
add:"var d = v - this.mean; this.mean += d / this.valid;",
rem:"var d = v - this.mean; this.mean -= this.valid ? d / this.valid : this.mean;",
set:"this.valid ? this.mean : undefined"}),average:Rr({name:"average",
set:"this.valid ? this.mean : undefined",req:["mean"],idx:1}),variance:Rr({
name:"variance",init:"this.dev = 0;",add:"this.dev += d * (v - this.mean);",
rem:"this.dev -= d * (v - this.mean);",
set:"this.valid > 1 ? this.dev / (this.valid-1) : undefined",req:["mean"],idx:1
}),variancep:Rr({name:"variancep",
set:"this.valid > 1 ? this.dev / this.valid : undefined",req:["variance"],idx:2
}),stdev:Rr({name:"stdev",
set:"this.valid > 1 ? Math.sqrt(this.dev / (this.valid-1)) : undefined",
req:["variance"],idx:2}),stdevp:Rr({name:"stdevp",
set:"this.valid > 1 ? Math.sqrt(this.dev / this.valid) : undefined",
req:["variance"],idx:2}),stderr:Rr({name:"stderr",
set:"this.valid > 1 ? Math.sqrt(this.dev / (this.valid * (this.valid-1))) : undefined",
req:["variance"],idx:2}),distinct:Rr({name:"distinct",
set:"cell.data.distinct(this.get)",req:["values"],idx:3}),ci0:Rr({name:"ci0",
set:"cell.data.ci0(this.get)",req:["values"],idx:3}),ci1:Rr({name:"ci1",
set:"cell.data.ci1(this.get)",req:["values"],idx:3}),median:Rr({name:"median",
set:"cell.data.q2(this.get)",req:["values"],idx:3}),q1:Rr({name:"q1",
set:"cell.data.q1(this.get)",req:["values"],idx:3}),q3:Rr({name:"q3",
set:"cell.data.q3(this.get)",req:["values"],idx:3}),argmin:Rr({name:"argmin",
init:"this.argmin = undefined;",add:"if (v < this.min) this.argmin = t;",
rem:"if (v <= this.min) this.argmin = undefined;",
set:"this.argmin || cell.data.argmin(this.get)",req:["min"],str:["values"],idx:3
}),argmax:Rr({name:"argmax",init:"this.argmax = undefined;",
add:"if (v > this.max) this.argmax = t;",
rem:"if (v >= this.max) this.argmax = undefined;",
set:"this.argmax || cell.data.argmax(this.get)",req:["max"],str:["values"],idx:3
}),min:Rr({name:"min",init:"this.min = undefined;",
add:"if (v < this.min || this.min === undefined) this.min = v;",
rem:"if (v <= this.min) this.min = NaN;",
set:"this.min = (isNaN(this.min) ? cell.data.min(this.get) : this.min)",
str:["values"],idx:4}),max:Rr({name:"max",init:"this.max = undefined;",
add:"if (v > this.max || this.max === undefined) this.max = v;",
rem:"if (v >= this.max) this.max = NaN;",
set:"this.max = (isNaN(this.max) ? cell.data.max(this.get) : this.max)",
str:["values"],idx:4})},Dr=Object.keys(zr);function Nr(t,e){return zr[t](e)}
function Rr(t){return function(e){var n=U({init:"",add:"",rem:"",idx:0},t)
;return n.out=e||t.name,n}}function Tr(t,e){return t.idx-e.idx}function Pr(t,e){
var n=e||d,r=function(t,e){var n,r=t.reduce((function t(n,r){function i(e){
n[e]||t(n,n[e]=zr[e]())}
return r.req&&r.req.forEach(i),e&&r.str&&r.str.forEach(i),n
}),t.reduce((function(t,e){return t[e.name]=e,t}),{})),i=[]
;for(n in r)i.push(r[n]);return i.sort(Tr)
}(t,!0),i="var cell = this.cell; this.valid = 0; this.missing = 0;",a="this.cell = cell; this.init();",o="if(v==null){++this.missing; return;} if(v!==v) return; ++this.valid;",u="if(v==null){--this.missing; return;} if(v!==v) return; --this.valid;",f="var cell = this.cell;"
;return r.forEach((function(t){i+=t.init,o+=t.add,u+=t.rem
})),t.slice().sort(Tr).forEach((function(t){f+="t['"+t.out+"']="+t.set+";"
})),f+="return t;",
(a=Function("cell",a)).prototype.init=Function(i),a.prototype.add=Function("v","t",o),
a.prototype.rem=Function("v","t",u),
a.prototype.set=Function("t",f),a.prototype.get=n,a.fields=t.map((function(t){
return t.out})),a}function Lr(t){
var e,n,r,i,a,o,u,f,s=t.maxbins||20,c=t.base||10,l=Math.log(c),h=t.divide||[5,2],d=t.extent[0],p=t.extent[1],g=p-d
;if(t.step)e=t.step;else if(t.steps){
for(a=g/s,o=0,u=t.steps.length;o<u&&t.steps[o]<a;++o);e=t.steps[Math.max(0,o-1)]
}else{
for(n=Math.ceil(Math.log(s)/l),r=t.minstep||0,e=Math.max(r,Math.pow(c,Math.round(Math.log(g)/l)-n));Math.ceil(g/e)>s;)e*=c
;for(o=0,u=h.length;o<u;++o)(a=e/h[o])>=r&&g/a<=s&&(e=a)}
return i=(a=Math.log(e))>=0?0:1+~~(-a/l),
f=Math.pow(c,-i-1),(t.nice||void 0===t.nice)&&(d=d<(a=Math.floor(d/e+f)*e)?a-e:a,
p=Math.ceil(p/e)*e),{start:d,stop:p,step:e}}function qr(t,e){
var n,r=[],i=t.length,a=-1
;if(null==e)for(;++a<i;)isNaN(n=Ur(t[a]))||r.push(n);else for(;++a<i;)isNaN(n=Ur(e(t[a],a,t)))||r.push(n)
;return r}function Ur(t){return null===t?NaN:+t}function Fr(t,e){
return t<e?-1:t>e?1:t>=e?0:NaN}function jr(t){
return 1===t.length&&(t=function(t){return function(e,n){return Fr(t(e),n)}
}(t)),{left:function(e,n,r,i){for(null==r&&(r=0),null==i&&(i=e.length);r<i;){
var a=r+i>>>1;t(e[a],n)<0?r=a+1:i=a}return r},right:function(e,n,r,i){
for(null==r&&(r=0),null==i&&(i=e.length);r<i;){var a=r+i>>>1
;t(e[a],n)>0?i=a:r=a+1}return r}}}t.random=Math.random
;var Ir=jr(Fr),$r=Ir.right,Br=Ir.left;function Wr(t,e){let n,r
;if(void 0===e)for(let i of t)null!=i&&i>=i&&(void 0===n?n=r=i:(n>i&&(n=i),
r<i&&(r=i)));else{let i=-1
;for(let a of t)null!=(a=e(a,++i,t))&&a>=a&&(void 0===n?n=r=a:(n>a&&(n=a),
r<a&&(r=a)))}return[n,r]}function Yr(t,e,n){
t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n
;for(var r=-1,i=0|Math.max(0,Math.ceil((e-t)/n)),a=new Array(i);++r<i;)a[r]=t+r*n
;return a}var Gr=Math.sqrt(50),Hr=Math.sqrt(10),Vr=Math.sqrt(2);function Xr(t){
return null===t?NaN:+t}function Jr(t,e,n=Xr){if(r=t.length){
if((e=+e)<=0||r<2)return+n(t[0],0,t);if(e>=1)return+n(t[r-1],r-1,t)
;var r,i=(r-1)*e,a=Math.floor(i),o=+n(t[a],a,t)
;return o+(+n(t[a+1],a+1,t)-o)*(i-a)}}function Zr(t,e,n=0,r=t.length-1,i=Fr){
for(;r>n;){if(r-n>600){
const a=r-n+1,o=e-n+1,u=Math.log(a),f=.5*Math.exp(2*u/3),s=.5*Math.sqrt(u*f*(a-f)/a)*(o-a/2<0?-1:1)
;Zr(t,e,Math.max(n,Math.floor(e-o*f/a+s)),Math.min(r,Math.floor(e+(a-o)*f/a+s)),i)
}const a=t[e];let o=n,u=r;for(Qr(t,n,e),i(t[r],a)>0&&Qr(t,n,r);o<u;){
for(Qr(t,o,u),++o,--u;i(t[o],a)<0;)++o;for(;i(t[u],a)>0;)--u}
0===i(t[n],a)?Qr(t,n,u):(++u,Qr(t,u,r)),u<=e&&(n=u+1),e<=u&&(r=u-1)}return t}
function Qr(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function Kr(e,n,r,i){
if(!e.length)return[void 0,void 0];var a,o,u,f,s=qr(e,i),c=s.length,l=n;for(u=0,
f=Array(l);u<l;++u){for(a=0,o=0;o<c;++o)a+=s[~~(t.random()*c)];f[u]=a/c}
return[Jr(f.sort(Fr),r/2),Jr(f,1-r/2)]}function ti(t,e){var n=qr(t,e)
;return[Jr(n.sort(Fr),.25),Jr(n,.5),Jr(n,.75)]}function ei(e,n){
var r,i,a=NaN,o={mean:function(t){return arguments.length?(r=t||0,a=NaN,o):r},
stdev:function(t){return arguments.length?(i=null==t?1:t,a=NaN,o):i},
sample:function(){var e,n,o=0,u=0;if(a==a)return o=a,a=NaN,o;do{
e=(o=2*t.random()-1)*o+(u=2*t.random()-1)*u}while(0===e||e>1)
;return n=Math.sqrt(-2*Math.log(e)/e),a=r+u*n*i,r+o*n*i},pdf:function(t){
var e=Math.exp(Math.pow(t-r,2)/(-2*Math.pow(i,2)))
;return 1/(i*Math.sqrt(2*Math.PI))*e},cdf:function(t){
var e,n=(t-r)/i,a=Math.abs(n);if(a>37)e=0;else{var o=Math.exp(-a*a/2)
;a<7.07106781186547?(e=o*((((((.0352624965998911*a+.700383064443688)*a+6.37396220353165)*a+33.912866078383)*a+112.079291497871)*a+221.213596169931)*a+220.206867912376),
e/=((((((.0883883476483184*a+1.75566716318264)*a+16.064177579207)*a+86.7807322029461)*a+296.564248779674)*a+637.333633378831)*a+793.826512519948)*a+440.413735824752):e=o/(a+1/(a+2/(a+3/(a+4/(a+.65)))))/2.506628274631
}return n>0?1-e:e},icdf:function(t){if(t<=0||t>=1)return NaN
;var e=2*t-1,n=8*(Math.PI-3)/(3*Math.PI*(4-Math.PI)),a=2/(Math.PI*n)+Math.log(1-Math.pow(e,2))/2,o=Math.log(1-e*e)/n,u=(e>0?1:-1)*Math.sqrt(Math.sqrt(a*a-o)-a)
;return r+i*Math.SQRT2*u}};return o.mean(e).stdev(n)}function ni(e,n){
var r=ei(),i={},a=0;return i.data=function(t){
return arguments.length?(e=t,a=t?t.length:0,i.bandwidth(n)):e
},i.bandwidth=function(t){return arguments.length?(!(n=t)&&e&&(n=ri(e)),i):n
},i.sample=function(){return e[~~(t.random()*a)]+n*r.sample()
},i.pdf=function(t){for(var i=0,o=0;o<a;++o)i+=r.pdf((t-e[o])/n);return i/n/a
},i.cdf=function(t){for(var i=0,o=0;o<a;++o)i+=r.cdf((t-e[o])/n);return i/a
},i.icdf=function(){throw Error("KDE icdf not supported.")},i.data(e)}
function ri(t){var e=t.length,n=ti(t),r=(n[2]-n[0])/1.34
;return 1.06*Math.min(Math.sqrt(function(t,e){let n,r=0,i=0,a=0
;if(void 0===e)for(let o of t)null!=o&&(o=+o)>=o&&(n=o-i,
i+=n/++r,a+=n*(o-i));else{let o=-1
;for(let u of t)null!=(u=e(u,++o,t))&&(u=+u)>=u&&(n=u-i,i+=n/++r,a+=n*(u-i))}
if(r>1)return a/(r-1)}(t)),r)*Math.pow(e,-.2)}function ii(e,n){var r,i={},a=0
;function o(t){var e,n=[],r=0;for(e=0;e<a;++e)r+=n[e]=null==t[e]?1:+t[e]
;for(e=0;e<a;++e)n[e]/=r;return n}return i.weights=function(t){
return arguments.length?(r=o(n=t||[]),i):n},i.distributions=function(t){
return arguments.length?(t?(a=t.length,e=t):(a=0,e=[]),i.weights(n)):e
},i.sample=function(){
for(var n=t.random(),i=e[a-1],o=r[0],u=0;u<a-1;o+=r[++u])if(n<o){i=e[u];break}
return i.sample()},i.pdf=function(t){for(var n=0,i=0;i<a;++i)n+=r[i]*e[i].pdf(t)
;return n},i.cdf=function(t){for(var n=0,i=0;i<a;++i)n+=r[i]*e[i].cdf(t)
;return n},i.icdf=function(){throw Error("Mixture icdf not supported.")
},i.distributions(e).weights(n)}function ai(e,n){null==n&&(n=null==e?1:e,e=0)
;var r,i,a,o={};return o.min=function(t){
return arguments.length?(a=i-(r=t||0),o):r},o.max=function(t){
return arguments.length?(a=(i=t||0)-r,o):i},o.sample=function(){
return r+a*t.random()},o.pdf=function(t){return t>=r&&t<=i?1/a:0
},o.cdf=function(t){return t<r?0:t>i?1:(t-r)/a},o.icdf=function(t){
return t>=0&&t<=1?r+t*a:NaN},o.min(e).max(n)}function oi(t){this._key=t?c(t):ft,
this.reset()}var ui=oi.prototype;function fi(t){
Mr.call(this,null,t),this._adds=[],
this._mods=[],this._alen=0,this._mlen=0,this._drop=!0,
this._cross=!1,this._dims=[],
this._dnames=[],this._measures=[],this._countOnly=!1,
this._counts=null,this._prev=null,this._inputs=null,this._outputs=null}
ui.reset=function(){
this._add=[],this._rem=[],this._ext=null,this._get=null,this._q=null
},ui.add=function(t){this._add.push(t)},ui.rem=function(t){this._rem.push(t)
},ui.values=function(){if(this._get=null,0===this._rem.length)return this._add
;var t,e,n,r=this._add,i=this._rem,a=this._key,o=r.length,u=i.length,f=Array(o-u),s={}
;for(t=0;t<u;++t)s[a(i[t])]=1
;for(t=0,e=0;t<o;++t)s[a(n=r[t])]?s[a(n)]=0:f[e++]=n
;return this._rem=[],this._add=f},ui.distinct=function(t){
for(var e,n=this.values(),r=n.length,i={},a=0;--r>=0;)e=t(n[r])+"",
i.hasOwnProperty(e)||(i[e]=1,++a);return a},ui.extent=function(t){
if(this._get!==t||!this._ext){var e=this.values(),n=F(e,t)
;this._ext=[e[n[0]],e[n[1]]],this._get=t}return this._ext
},ui.argmin=function(t){return this.extent(t)[0]||{}},ui.argmax=function(t){
return this.extent(t)[1]||{}},ui.min=function(t){var e=this.extent(t)[0]
;return null!=e?t(e):void 0},ui.max=function(t){var e=this.extent(t)[1]
;return null!=e?t(e):void 0},ui.quartile=function(t){
return this._get===t&&this._q||(this._q=ti(this.values(),t),this._get=t),this._q
},ui.q1=function(t){return this.quartile(t)[0]},ui.q2=function(t){
return this.quartile(t)[1]},ui.q3=function(t){return this.quartile(t)[2]
},ui.ci=function(t){
return this._get===t&&this._ci||(this._ci=Kr(this.values(),1e3,.05,t),
this._get=t),this._ci},ui.ci0=function(t){return this.ci(t)[0]
},ui.ci1=function(t){return this.ci(t)[1]},fi.Definition={type:"Aggregate",
metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0
},{name:"ops",type:"enum",array:!0,values:Dr},{name:"fields",type:"field",
null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"drop",
type:"boolean",default:!0},{name:"cross",type:"boolean",default:!1},{name:"key",
type:"field"}]};var si=$(fi,Mr);function ci(t){Mr.call(this,null,t)}
si.transform=function(t,e){var n,r=this,i=e.fork(e.NO_SOURCE|e.NO_FIELDS)
;return this.stamp=i.stamp,
this.value&&((n=t.modified())||e.modified(this._inputs))?(this._prev=this.value,
this.value=n?this.init(t):{},e.visit(e.SOURCE,(function(t){r.add(t)
}))):(this.value=this.value||this.init(t),e.visit(e.REM,(function(t){r.rem(t)
})),e.visit(e.ADD,(function(t){r.add(t)
}))),i.modifies(this._outputs),r._drop=!1!==t.drop,
t.cross&&r._dims.length>1&&(r._drop=!1,this.cross()),r.changes(i)
},si.cross=function(){var t=this,e=t.value,n=t._dnames,r=n.map((function(){
return{}})),i=n.length;function a(t){var e,a,o,u
;for(e in t)for(o=t[e].tuple,a=0;a<i;++a)r[a][u=o[n[a]]]=u}
a(t._prev),a(e),function a(o,u,f){var s,c,l=n[f],h=r[f++]
;for(s in h)u[l]=h[s],c=o?o+"|"+s:s,f<i?a(c,u,f):e[c]||t.cell(c,u)}("",{},0)
},si.init=function(t){var e=this._inputs=[],a=this._outputs=[],o={}
;function u(t){
for(var n,i=R(r(t)),a=0,u=i.length;a<u;++a)o[n=i[a]]||(o[n]=1,e.push(n))}
this._dims=R(t.groupby),this._dnames=this._dims.map((function(t){var e=n(t)
;return u(t),a.push(e),e
})),this.cellkey=t.key?t.key:Cr(this._dims),this._countOnly=!0,
this._counts=[],this._measures=[]
;var f,s,c,l,h,d,p=t.fields||[null],g=t.ops||["count"],v=t.as||[],m=p.length,y={}
;for(m!==g.length&&i("Unmatched number of fields and aggregate ops."),
d=0;d<m;++d)f=p[d],
s=g[d],null==f&&"count"!==s&&i("Null aggregate field specified."),
h=Or(s,l=n(f),v[d]),
a.push(h),"count"!==s?((c=y[l])||(u(f),(c=y[l]=[]).field=f,this._measures.push(c)),
"count"!==s&&(this._countOnly=!1),c.push(Nr(s,h))):this._counts.push(h)
;return this._measures=this._measures.map((function(t){return Pr(t,t.field)
})),{}},si.cellkey=Cr(),si.cell=function(t,e){var n=this.value[t]
;return n?0===n.num&&this._drop&&n.stamp<this.stamp?(n.stamp=this.stamp,
this._adds[this._alen++]=n):n.stamp<this.stamp&&(n.stamp=this.stamp,
this._mods[this._mlen++]=n):(n=this.value[t]=this.newcell(t,e),
this._adds[this._alen++]=n),n},si.newcell=function(t,e){var n={key:t,num:0,
agg:null,tuple:this.newtuple(e,this._prev&&this._prev[t]),stamp:this.stamp,
store:!1};if(!this._countOnly){var r,i=this._measures,a=i.length
;for(n.agg=Array(a),r=0;r<a;++r)n.agg[r]=new i[r](n)}
return n.store&&(n.data=new oi),n},si.newtuple=function(t,e){
var n,r,i=this._dnames,a=this._dims,o={}
;for(n=0,r=a.length;n<r;++n)o[i[n]]=a[n](t);return e?dt(e.tuple,o):ct(o)
},si.add=function(t){var e,n,r,i=this.cellkey(t),a=this.cell(i,t)
;if(a.num+=1,!this._countOnly)for(a.store&&a.data.add(t),
n=0,r=(e=a.agg).length;n<r;++n)e[n].add(e[n].get(t),t)},si.rem=function(t){
var e,n,r,i=this.cellkey(t),a=this.cell(i,t)
;if(a.num-=1,!this._countOnly)for(a.store&&a.data.rem(t),
n=0,r=(e=a.agg).length;n<r;++n)e[n].rem(e[n].get(t),t)
},si.celltuple=function(t){var e,n,r,i=t.tuple,a=this._counts
;for(t.store&&t.data.values(),n=0,r=a.length;n<r;++n)i[a[n]]=t.num
;if(!this._countOnly)for(n=0,r=(e=t.agg).length;n<r;++n)e[n].set(i);return i
},si.changes=function(t){
var e,n,r,i,a=this._adds,o=this._mods,u=this._prev,f=this._drop,s=t.add,c=t.rem,l=t.mod
;if(u)for(n in u)e=u[n],f&&!e.num||c.push(e.tuple)
;for(r=0,i=this._alen;r<i;++r)s.push(this.celltuple(a[r])),a[r]=null
;for(r=0,i=this._mlen;r<i;++r)(0===(e=o[r]).num&&f?c:l).push(this.celltuple(e)),
o[r]=null;return this._alen=this._mlen=0,this._prev=null,t},ci.Definition={
type:"Bin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0
},{name:"anchor",type:"number"},{name:"maxbins",type:"number",default:20},{
name:"base",type:"number",default:10},{name:"divide",type:"number",array:!0,
default:[5,2]},{name:"extent",type:"number",array:!0,length:2,required:!0},{
name:"step",type:"number"},{name:"steps",type:"number",array:!0},{
name:"minstep",type:"number",default:0},{name:"nice",type:"boolean",default:!0
},{name:"name",type:"string"},{name:"as",type:"string",array:!0,length:2,
default:["bin0","bin1"]}]};var li=$(ci,Mr);function hi(t,e,n){
var r=t,i=e||[],a=n||[],o={},u=0;return{add:function(t){a.push(t)},
remove:function(t){o[r(t)]=++u},size:function(){return i.length},
data:function(t,e){return u&&(i=i.filter((function(t){return!o[r(t)]
})),o={},u=0),e&&t&&i.sort(t),a.length&&(i=t?V(t,i,a.sort(t)):i.concat(a),a=[]),
i}}}function di(t){Mr.call(this,[],t)}function pi(t){xt.call(this,null,gi,t)}
function gi(t){return this.value&&!t.modified()?this.value:P(t.fields,t.orders)}
function vi(t){Mr.call(this,null,t)}li.transform=function(t,e){
var n,i=this._bins(t),a=i.start,o=i.step,u=t.as||["bin0","bin1"],f=u[0],s=u[1]
;return n=t.modified()?(e=e.reflow(!0)).SOURCE:e.modified(r(t.field))?e.ADD_MOD:e.ADD,
e.visit(n,(function(t){var e=i(t);t[f]=e,t[s]=null==e?null:a+o*(1+(e-a)/o)
})),e.modifies(u)},li._bins=function(t){
if(this.value&&!t.modified())return this.value
;var i,a,o=t.field,u=Lr(t),f=u.start,s=u.stop,c=u.step
;null!=(i=t.anchor)&&(a=i-(f+c*Math.floor((i-f)/c)),f+=a,s+=a)
;var l=function(t){var e=o(t)
;return null==e?null:(e=Math.max(f,Math.min(+e,s-c)),f+c*Math.floor((e-f)/c))}
;return l.start=f,l.stop=s,l.step=c,this.value=e(l,r(o),t.name||"bin_"+n(o))
},di.Definition={type:"Collect",metadata:{source:!0},params:[{name:"sort",
type:"compare"}]},$(di,Mr).transform=function(t,e){
var n=e.fork(e.ALL),r=hi(ft,this.value,n.materialize(n.ADD).add),i=t.sort,a=e.changed()||i&&(t.modified("sort")||e.modified(i.fields))
;return n.visit(n.REM,r.remove),
this.modified(a),this.value=n.source=r.data(i,a),
e.source&&e.source.root&&(this.value.root=e.source.root),n
},$(pi,xt),vi.Definition={type:"CountPattern",metadata:{generates:!0,changes:!0
},params:[{name:"field",type:"field",required:!0},{name:"case",type:"enum",
values:["upper","lower","mixed"],default:"mixed"},{name:"pattern",type:"string",
default:'[\\w"]+'},{name:"stopwords",type:"string",default:""},{name:"as",
type:"string",array:!0,length:2,default:["text","count"]}]};var mi=$(vi,Mr)
;function yi(t){Mr.call(this,null,t)}mi.transform=function(t,e){function n(e){
return function(n){for(var r,i=function(t,e,n){switch(e){case"upper":
t=t.toUpperCase();break;case"lower":t=t.toLowerCase()}return t.match(n)
}(u(n),t.case,a)||[],f=0,s=i.length;f<s;++f)o.test(r=i[f])||e(r)}}
var r=this._parameterCheck(t,e),i=this._counts,a=this._match,o=this._stop,u=t.field,f=t.as||["text","count"],s=n((function(t){
i[t]=1+(i[t]||0)})),c=n((function(t){i[t]-=1}))
;return r?e.visit(e.SOURCE,s):(e.visit(e.ADD,s),
e.visit(e.REM,c)),this._finish(e,f)},mi._parameterCheck=function(t,e){var n=!1
;return!t.modified("stopwords")&&this._stop||(this._stop=new RegExp("^"+(t.stopwords||"")+"$","i"),
n=!0),
!t.modified("pattern")&&this._match||(this._match=new RegExp(t.pattern||"[\\w']+","g"),
n=!0),
(t.modified("field")||e.modified(t.field.fields))&&(n=!0),n&&(this._counts={}),n
},mi._finish=function(t,e){
var n,r,i,a=this._counts,o=this._tuples||(this._tuples={}),u=e[0],f=e[1],s=t.fork(t.NO_SOURCE|t.NO_FIELDS)
;for(n in a)r=o[n],
i=a[n]||0,!r&&i?(o[n]=r=ct({}),r[u]=n,r[f]=i,s.add.push(r)):0===i?(r&&s.rem.push(r),
a[n]=null,o[n]=null):r[f]!==i&&(r[f]=i,s.mod.push(r));return s.modifies(e)
},yi.Definition={type:"Cross",metadata:{generates:!0},params:[{name:"filter",
type:"expr"},{name:"as",type:"string",array:!0,length:2,default:["a","b"]}]
},$(yi,Mr).transform=function(t,e){
var n=e.fork(e.NO_SOURCE),r=this.value,i=t.as||["a","b"],a=i[0],o=i[1]
;return!r||e.changed(e.ADD_REM)||t.modified("as")||t.modified("filter")?(r&&(n.rem=r),
r=e.materialize(e.SOURCE).source,n.add=this.value=function(t,e,n,r){
for(var i,a,o=[],u={},f=t.length,s=0;s<f;++s)for(u[e]=a=t[s],
i=0;i<f;++i)u[n]=t[i],r(u)&&(o.push(ct(u)),(u={})[e]=a);return o
}(r,a,o,t.filter||v)):n.mod=r,n.source=this.value,n.modifies(i)};var bi={kde:ni,
mixture:ii,normal:ei,uniform:ai},_i="function";function xi(t){
Mr.call(this,null,t)}var wi=[{key:{function:"normal"},params:[{name:"mean",
type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{
function:"uniform"},params:[{name:"min",type:"number",default:0},{name:"max",
type:"number",default:1}]},{key:{function:"kde"},params:[{name:"field",
type:"field",required:!0},{name:"from",type:"data"},{name:"bandwidth",
type:"number",default:0}]}],Mi={key:{function:"mixture"},params:[{
name:"distributions",type:"param",array:!0,params:wi},{name:"weights",
type:"number",array:!0}]};function ki(t){
xt.call(this,null,Ei,t),this.modified(!0)}function Ei(t){var i=t.expr
;return this.value&&!t.modified("expr")?this.value:e((function(e){return i(e,t)
}),r(i),n(i))}function Si(t){Mr.call(this,[void 0,void 0],t)}function Ai(t,e){
xt.call(this,t),this.parent=e}xi.Definition={type:"Density",metadata:{
generates:!0},params:[{name:"extent",type:"number",array:!0,length:2},{
name:"steps",type:"number",default:100},{name:"method",type:"string",
default:"pdf",values:["pdf","cdf"]},{name:"distribution",type:"param",
params:wi.concat(Mi)},{name:"as",type:"string",array:!0,
default:["value","density"]}]},$(xi,Mr).transform=function(t,e){
var n=e.fork(e.NO_SOURCE|e.NO_FIELDS)
;if(!this.value||e.changed()||t.modified()){var r=function t(e,n){
var r=e.function;bi.hasOwnProperty(r)||i("Unknown distribution function: "+r)
;var a=bi[r]()
;for(var o in e)"field"===o?a.data((e.from||n()).map(e[o])):"distributions"===o?a[o](e[o].map((function(e){
return t(e,n)}))):typeof a[o]===_i&&a[o](e[o]);return a
}(t.distribution,function(t){return function(){
return t.materialize(t.SOURCE).source}}(e)),a=t.method||"pdf"
;"pdf"!==a&&"cdf"!==a&&i("Invalid density method: "+a),
t.extent||r.data||i("Missing density extent parameter."),a=r[a]
;var o=t.as||["value","density"],u=t.extent||Wr(r.data()),f=(u[1]-u[0])/(t.steps||100),s=Yr(u[0],u[1]+f/2,f).map((function(t){
var e={};return e[o[0]]=t,e[o[1]]=a(t),ct(e)}))
;this.value&&(n.rem=this.value),this.value=n.add=n.source=s}return n
},$(ki,xt),Si.Definition={type:"Extent",metadata:{},params:[{name:"field",
type:"field",required:!0}]},$(Si,Mr).transform=function(t,e){
var n,r=this.value,i=t.field,a=r[0],o=r[1]
;((n=e.changed()||e.modified(i.fields)||t.modified("field"))||null==a)&&(a=1/0,
o=-1/0),e.visit(n?e.SOURCE:e.ADD,(function(t){var e=i(t)
;null!=e&&((e=+e)<a&&(a=e),e>o&&(o=e))
})),isFinite(a)&&isFinite(o)||(a=o=void 0),this.value=[a,o]};var Ci=$(Ai,xt)
;function Oi(t){Mr.call(this,{},t),this._keys=I();var e=this._targets=[]
;e.active=0,e.forEach=function(t){for(var n=0,r=e.active;n<r;++n)t(e[n],n,e)}}
Ci.connect=function(t){return this.targets().add(t),t.source=this
},Ci.add=function(t){this.value.add.push(t)},Ci.rem=function(t){
this.value.rem.push(t)},Ci.mod=function(t){this.value.mod.push(t)
},Ci.init=function(t){this.value.init(t,t.NO_SOURCE)},Ci.evaluate=function(){
return this.value};var zi=$(Oi,Mr);function Di(t){xt.call(this,null,Ni,t)}
function Ni(t){
return this.value&&!t.modified()?this.value:o(t.name)?R(t.name).map((function(t){
return c(t)})):c(t.name,t.as)}function Ri(t){Mr.call(this,I(),t)}
function Ti(t,e){return t?t.map((function(t,r){return e[r]||n(t)})):null}
function Pi(t){Mr.call(this,[],t)}function Li(t){Mr.call(this,[],t)}
function qi(t){Mr.call(this,null,t)}function Ui(t){Mr.call(this,[],t)}
zi.activate=function(t){this._targets[this._targets.active++]=t
},zi.subflow=function(t,e,n,r){var i,a,o=this.value,u=o.hasOwnProperty(t)&&o[t]
;return u?u.value.stamp<n.stamp&&(u.init(n),
this.activate(u)):(a=r||(a=this._group[t])&&a.tuple,
u=(i=n.dataflow).add(new Ai(n.fork(n.NO_SOURCE),this)).connect(e(i,t,a)),o[t]=u,
this.activate(u)),u},zi.transform=function(t,e){
var n=e.dataflow,r=this,i=t.key,a=t.subflow,o=this._keys,u=t.modified("key")
;function f(t){return r.subflow(t,a,e)}
return this._group=t.group||{},this._targets.active=0,
e.visit(e.REM,(function(t){var e=ft(t),n=o.get(e)
;void 0!==n&&(o.delete(e),f(n).rem(t))})),e.visit(e.ADD,(function(t){var e=i(t)
;o.set(ft(t),e),f(e).add(t)
})),u||e.modified(i.fields)?e.visit(e.MOD,(function(t){
var e=ft(t),n=o.get(e),r=i(t)
;n===r?f(r).mod(t):(o.set(e,r),f(n).rem(t),f(r).add(t))
})):e.changed(e.MOD)&&e.visit(e.MOD,(function(t){f(o.get(ft(t))).mod(t)
})),u&&e.visit(e.REFLOW,(function(t){var e=ft(t),n=o.get(e),r=i(t)
;n!==r&&(o.set(e,r),f(n).rem(t),f(r).add(t))
})),o.empty>n.cleanThreshold&&n.runAfter(o.clean),e},$(Di,xt),Ri.Definition={
type:"Filter",metadata:{changes:!0},params:[{name:"expr",type:"expr",required:!0
}]},$(Ri,Mr).transform=function(t,e){
var n=e.dataflow,r=this.value,i=e.fork(),a=i.add,o=i.rem,u=i.mod,f=t.expr,s=!0
;function c(e){var n=ft(e),i=f(e,t),c=r.get(n)
;i&&c?(r.delete(n),a.push(e)):i||c?s&&i&&!c&&u.push(e):(r.set(n,1),o.push(e))}
return e.visit(e.REM,(function(t){var e=ft(t);r.has(e)?r.delete(e):o.push(t)})),
e.visit(e.ADD,(function(e){f(e,t)?a.push(e):r.set(ft(e),1)
})),e.visit(e.MOD,c),t.modified()&&(s=!1,
e.visit(e.REFLOW,c)),r.empty>n.cleanThreshold&&n.runAfter(r.clean),i
},Pi.Definition={type:"Flatten",metadata:{generates:!0},params:[{name:"fields",
type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0}]
},$(Pi,Mr).transform=function(t,e){
var n=e.fork(e.NO_SOURCE),r=t.fields,i=Ti(r,t.as||[]),a=i.length
;return n.rem=this.value,e.visit(e.SOURCE,(function(t){
for(var e,o,u,f=r.map((function(e){return e(t)})),s=f.reduce((function(t,e){
return Math.max(t,e.length)}),0),c=0;c<s;++c){
for(o=lt(t),e=0;e<a;++e)o[i[e]]=null==(u=f[e][c])?null:u;n.add.push(o)}
})),this.value=n.source=n.add,n.modifies(i)},Li.Definition={type:"Fold",
metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0
},{name:"as",type:"string",array:!0,length:2,default:["key","value"]}]
},$(Li,Mr).transform=function(t,e){
var r=e.fork(e.NO_SOURCE),i=t.fields,a=i.map(n),o=t.as||["key","value"],u=o[0],f=o[1],s=i.length
;return r.rem=this.value,e.visit(e.SOURCE,(function(t){
for(var e,n=0;n<s;++n)(e=lt(t))[u]=a[n],e[f]=i[n](t),r.add.push(e)
})),this.value=r.source=r.add,r.modifies(o)},qi.Definition={type:"Formula",
metadata:{modifies:!0},params:[{name:"expr",type:"expr",required:!0},{name:"as",
type:"string",required:!0},{name:"initonly",type:"boolean"}]
},$(qi,Mr).transform=function(t,e){
var n=t.expr,r=t.as,i=t.modified(),a=t.initonly?e.ADD:i?e.SOURCE:e.modified(n.fields)?e.ADD_MOD:e.ADD
;return i&&(e=e.materialize().reflow(!0)),
t.initonly||e.modifies(r),e.visit(a,(function(e){e[r]=n(e,t)}))
},$(Ui,Mr).transform=function(t,e){
var n,r,i,a=this.value,o=e.fork(e.ALL),u=t.size-a.length,f=t.generator;if(u>0){
for(n=[];--u>=0;)n.push(i=ct(f(t))),a.push(i)
;o.add=o.add.length?o.materialize(o.ADD).add.concat(n):n
}else r=a.slice(0,-u),o.rem=o.rem.length?o.materialize(o.REM).rem.concat(r):r,
a=a.slice(-u);return o.source=this.value=a,o};var Fi={value:"value",
median:function(t,e){if(!(t=Float64Array.from(function*(t,e){
if(void 0===e)for(let n of t)null!=n&&(n=+n)>=n&&(yield n);else{let n=-1
;for(let r of t)null!=(r=e(r,++n,t))&&(r=+r)>=r&&(yield r)}
}(t,e))).length)return;const n=t.length,r=n>>1
;return Zr(t,r-1,0),0==(1&n)&&Zr(t,r,r),Jr(t,.5)},mean:function(t,e){let n=0,r=0
;if(void 0===e)for(let i of t)null!=i&&(i=+i)>=i&&(++n,r+=i);else{let i=-1
;for(let a of t)null!=(a=e(a,++i,t))&&(a=+a)>=a&&(++n,r+=a)}if(n)return r/n},
min:function(t,e){let n
;if(void 0===e)for(let r of t)null!=r&&r>=r&&(void 0===n||n>r)&&(n=r);else{
let r=-1;for(let i of t)null!=(i=e(i,++r,t))&&i>=i&&(void 0===n||n>i)&&(n=i)}
return n},max:function(t,e){let n
;if(void 0===e)for(let r of t)null!=r&&r>=r&&(void 0===n||n<r)&&(n=r);else{
let r=-1;for(let i of t)null!=(i=e(i,++r,t))&&i>=i&&(void 0===n||n<i)&&(n=i)}
return n}},ji=[];function Ii(t){Mr.call(this,[],t)}function $i(t){
fi.call(this,t)}Ii.Definition={type:"Impute",metadata:{changes:!0},params:[{
name:"field",type:"field",required:!0},{name:"key",type:"field",required:!0},{
name:"keyvals",array:!0},{name:"groupby",type:"field",array:!0},{name:"method",
type:"enum",default:"value",values:["value","mean","median","max","min"]},{
name:"value",default:0}]},$(Ii,Mr).transform=function(t,e){
var r,a,o,u,f,s,c,l,h,d,p=e.fork(e.ALL),g=function(t){var e,n=t.method||Fi.value
;if(null!=Fi[n])return n===Fi.value?(e=void 0!==t.value?t.value:0,function(){
return e}):Fi[n];i("Unrecognized imputation method: "+n)}(t),v=function(t){
var e=t.field;return function(t){return t?e(t):NaN}
}(t),m=n(t.field),y=n(t.key),b=(t.groupby||[]).map(n),_=function(t,e,n,r){
var i,a,o,u,f,s,c,l,h=function(t){return t(l)},d=[],p=r?r.slice():[],g={},v={}
;for(p.forEach((function(t,e){g[t]=e+1
})),u=0,c=t.length;u<c;++u)s=n(l=t[u]),f=g[s]||(g[s]=p.push(s)),
(o=v[a=(i=e?e.map(h):ji)+""])||(o=v[a]=[],d.push(o),o.values=i),o[f-1]=l
;return d.domain=p,d
}(e.source,t.groupby,t.key,t.keyvals),x=[],w=this.value,M=_.domain.length
;for(f=0,
l=_.length;f<l;++f)for(o=(r=_[f]).values,a=NaN,c=0;c<M;++c)if(null==r[c]){
for(u=_.domain[c],d={_impute:!0},s=0,h=o.length;s<h;++s)d[b[s]]=o[s]
;d[y]=u,d[m]=isNaN(a)?a=g(r,v):a,x.push(ct(d))}
return x.length&&(p.add=p.materialize(p.ADD).add.concat(x)),
w.length&&(p.rem=p.materialize(p.REM).rem.concat(w)),this.value=x,p
},$i.Definition={type:"JoinAggregate",metadata:{modifies:!0},params:[{
name:"groupby",type:"field",array:!0},{name:"fields",type:"field",null:!0,
array:!0},{name:"ops",type:"enum",array:!0,values:Dr},{name:"as",type:"string",
null:!0,array:!0},{name:"key",type:"field"}]};var Bi=$($i,fi);function Wi(t){
xt.call(this,null,Yi,t)}function Yi(t){
return this.value&&!t.modified()?this.value:H(t.fields,t.flat)}function Gi(t){
Mr.call(this,null,t)}function Hi(t){Mr.call(this,{},t)}function Vi(t){
xt.call(this,null,Xi,t)}function Xi(t){
if(this.value&&!t.modified())return this.value
;var e,n,r,i=1/0,a=-1/0,o=t.extents
;for(e=0,n=o.length;e<n;++e)(r=o[e])[0]<i&&(i=r[0]),r[1]>a&&(a=r[1]);return[i,a]
}function Ji(t){xt.call(this,null,Zi,t)}function Zi(t){
return this.value&&!t.modified()?this.value:t.values.reduce((function(t,e){
return t.concat(e)}),[])}function Qi(t){Mr.call(this,null,t)}function Ki(t){
fi.call(this,t)}Bi.transform=function(t,e){var n,r=this,i=t.modified()
;return r.value&&(i||e.modified(r._inputs))?(n=r.value=i?r.init(t):{},
e.visit(e.SOURCE,(function(t){r.add(t)
}))):(n=r.value=r.value||this.init(t),e.visit(e.REM,(function(t){r.rem(t)
})),e.visit(e.ADD,(function(t){r.add(t)
}))),r.changes(),e.visit(e.SOURCE,(function(t){U(t,n[r.cellkey(t)].tuple)
})),e.reflow(i).modifies(this._outputs)},Bi.changes=function(){
var t,e,n=this._adds,r=this._mods
;for(t=0,e=this._alen;t<e;++t)this.celltuple(n[t]),n[t]=null
;for(t=0,e=this._mlen;t<e;++t)this.celltuple(r[t]),r[t]=null
;this._alen=this._mlen=0},$(Wi,xt),$(Gi,Mr).transform=function(t,e){
e.dataflow.request(this.target,t.url,t.format)},Hi.Definition={type:"Lookup",
metadata:{modifies:!0},params:[{name:"index",type:"index",params:[{name:"from",
type:"data",required:!0},{name:"key",type:"field",required:!0}]},{name:"values",
type:"field",array:!0},{name:"fields",type:"field",array:!0,required:!0},{
name:"as",type:"string",array:!0},{name:"default",default:null}]
},$(Hi,Mr).transform=function(t,e){
var r,a,o=e,u=t.as,f=t.fields,s=t.index,c=t.values,l=null==t.default?null:t.default,h=t.modified(),d=h?e.SOURCE:e.ADD,p=f.length
;return c?(a=c.length,
p>1&&!u&&i('Multi-field lookup requires explicit "as" parameter.'),
u&&u.length!==p*a&&i('The "as" parameter has too few output field names.'),
u=u||c.map(n),r=function(t){
for(var e,n,r=0,i=0;r<p;++r)if(null==(n=s.get(f[r](t))))for(e=0;e<a;++e,
++i)t[u[i]]=l;else for(e=0;e<a;++e,++i)t[u[i]]=c[e](n)
}):(u||i("Missing output field names."),r=function(t){
for(var e,n=0;n<p;++n)e=s.get(f[n](t)),t[u[n]]=null==e?l:e
}),h?o=e.reflow(!0):d|=f.some((function(t){return e.modified(t.fields)
}))?e.MOD:0,e.visit(d,r),o.modifies(u)
},$(Vi,xt),$(Ji,xt),$(Qi,Mr),Qi.prototype.transform=function(t,e){
return this.modified(t.modified()),this.value=t,e.fork(e.NO_SOURCE|e.NO_FIELDS)
},Ki.Definition={type:"Pivot",metadata:{generates:!0,changes:!0},params:[{
name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{
name:"value",type:"field",required:!0},{name:"op",type:"enum",values:Dr,
default:"sum"},{name:"limit",type:"number",default:0},{name:"key",type:"field"}]
};var ta=$(Ki,fi);function ea(t){Oi.call(this,t)}function na(t){
Mr.call(this,null,t)}function ra(t){Mr.call(this,null,t)}function ia(t){
Mr.call(this,null,t)}function aa(t){Mr.call(this,[],t),this.count=0}
function oa(t){Mr.call(this,null,t)}function ua(t){
Mr.call(this,null,t),this.modified(!0)}function fa(t){Mr.call(this,I(),t)}
function sa(t){Mr.call(this,null,t)}
ta._transform=ta.transform,ta.transform=function(t,n){
return this._transform(function(t,n){
var i=t.field,a=t.value,o=("count"===t.op?"__count__":t.op)||"sum",u=r(i).concat(r(a)),f=function(t,e,n){
var r={},i=[];return n.visit(n.SOURCE,(function(e){var n=t(e)
;r[n]||(r[n]=1,i.push(n))})),i.sort((function(t,e){
return(t<e||null==t)&&null!=e?-1:(t>e||null==e)&&null!=t?1:(e=e instanceof Date?+e:e,
(t=t instanceof Date?+t:t)!==t&&e==e?-1:e!=e&&t==t?1:0)})),e?i.slice(0,e):i
}(i,t.limit||0,n);return{key:t.key,groupby:t.groupby,ops:f.map((function(){
return o})),fields:f.map((function(t){return function(t,n,r,i){
return e((function(e){return n(e)===t?r(e):NaN}),i,t+"")}(t,i,a,u)})),
as:f.map((function(t){return t+""})),modified:t.modified.bind(t)}}(t,n),n)
},$(ea,Oi).transform=function(t,e){var n=this,a=t.subflow,o=t.field
;return(t.modified("field")||o&&e.modified(r(o)))&&i("PreFacet does not support field modification."),
this._targets.active=0,e.visit(e.MOD,(function(t){var r=n.subflow(ft(t),a,e,t)
;o?o(t).forEach((function(t){r.mod(t)})):r.mod(t)})),e.visit(e.ADD,(function(t){
var r=n.subflow(ft(t),a,e,t);o?o(t).forEach((function(t){r.add(ct(t))
})):r.add(t)})),e.visit(e.REM,(function(t){var r=n.subflow(ft(t),a,e,t)
;o?o(t).forEach((function(t){r.rem(t)})):r.rem(t)})),e},na.Definition={
type:"Project",metadata:{generates:!0,changes:!0},params:[{name:"fields",
type:"field",array:!0},{name:"as",type:"string",null:!0,array:!0}]
},$(na,Mr).transform=function(t,e){
var n,r,i=t.fields,a=Ti(t.fields,t.as||[]),o=i?function(t,e){
return function(t,e,n,r){for(var i=0,a=n.length;i<a;++i)e[r[i]]=n[i](t);return e
}(t,e,i,a)}:ht
;return this.value?r=this.value:(e=e.addAll(),r=this.value={}),n=e.fork(e.NO_SOURCE),
e.visit(e.REM,(function(t){var e=ft(t);n.rem.push(r[e]),r[e]=null
})),e.visit(e.ADD,(function(t){var e=o(t,ct({}));r[ft(t)]=e,n.add.push(e)
})),e.visit(e.MOD,(function(t){n.mod.push(o(t,r[ft(t)]))})),n
},$(ra,Mr).transform=function(t,e){
return this.value=t.value,t.modified("value")?e.fork(e.NO_SOURCE|e.NO_FIELDS):e.StopPropagation
},$(ia,Mr).transform=function(t,e){var n,r
;return this.value?r=this.value:(n=e=e.addAll(),
r=this.value={}),t.derive&&(n=e.fork(e.NO_SOURCE),e.visit(e.REM,(function(t){
var e=ft(t);n.rem.push(r[e]),r[e]=null})),e.visit(e.ADD,(function(t){var e=lt(t)
;r[ft(t)]=e,n.add.push(e)})),e.visit(e.MOD,(function(t){
n.mod.push(ht(t,r[ft(t)]))}))),n},aa.Definition={type:"Sample",metadata:{},
params:[{name:"size",type:"number",default:1e3}]
},$(aa,Mr).transform=function(e,n){
var r=n.fork(n.NO_SOURCE),i=e.modified("size"),a=e.size,o=this.value,u=this.count,f=0,s=o.reduce((function(t,e){
return t[ft(e)]=1,t}),{});function c(e){var n,i
;o.length<a?o.push(e):(i=~~((u+1)*t.random()))<o.length&&i>=f&&(n=o[i],
s[ft(n)]&&r.rem.push(n),o[i]=e),++u}
if(n.rem.length&&(n.visit(n.REM,(function(t){var e=ft(t)
;s[e]&&(s[e]=-1,r.rem.push(t)),--u})),o=o.filter((function(t){
return-1!==s[ft(t)]
}))),(n.rem.length||i)&&o.length<a&&n.source&&(f=u=o.length,n.visit(n.SOURCE,(function(t){
s[ft(t)]||c(t)})),f=-1),i&&o.length>a){
for(var l=0,h=o.length-a;l<h;++l)s[ft(o[l])]=-1,r.rem.push(o[l]);o=o.slice(h)}
return n.mod.length&&n.visit(n.MOD,(function(t){s[ft(t)]&&r.mod.push(t)
})),n.add.length&&n.visit(n.ADD,c),
(n.add.length||f<0)&&(r.add=o.filter((function(t){return!s[ft(t)]
}))),this.count=u,this.value=r.source=o,r},oa.Definition={type:"Sequence",
metadata:{changes:!0},params:[{name:"start",type:"number",required:!0},{
name:"stop",type:"number",required:!0},{name:"step",type:"number",default:1},{
name:"as",type:"string",default:"data"}]},$(oa,Mr).transform=function(t,e){
if(!this.value||t.modified()){var n=e.materialize().fork(e.MOD),r=t.as||"data"
;return n.rem=this.value?e.rem.concat(this.value):e.rem,
this.value=Yr(t.start,t.stop,t.step||1).map((function(t){var e={};return e[r]=t,
ct(e)})),n.add=e.add.concat(this.value),n}},$(ua,Mr).transform=function(t,e){
return this.value=e.source,
e.changed()?e.fork(e.NO_SOURCE|e.NO_FIELDS):e.StopPropagation
},$(fa,Mr).transform=function(t,e){var n=e.dataflow,r=t.field,i=this.value,a=!0
;function o(t){i.set(r(t),t)}
return t.modified("field")||e.modified(r.fields)?(i.clear(),
e.visit(e.SOURCE,o)):e.changed()?(e.visit(e.REM,(function(t){i.delete(r(t))
})),e.visit(e.ADD,o)):a=!1,
this.modified(a),i.empty>n.cleanThreshold&&n.runAfter(i.clean),e.fork()
},$(sa,Mr).transform=function(t,e){
(!this.value||t.modified("field")||t.modified("sort")||e.changed()||t.sort&&e.modified(t.sort.fields))&&(this.value=(t.sort?e.source.slice().sort(t.sort):e.source).map(t.field))
};var ca={row_number:function(){return{next:function(t){return t.index+1}}},
rank:function(){var t;return{init:function(){t=1},next:function(e){
var n=e.index,r=e.data;return n&&e.compare(r[n-1],r[n])?t=n+1:t}}},
dense_rank:function(){var t;return{init:function(){t=1},next:function(e){
var n=e.index,r=e.data;return n&&e.compare(r[n-1],r[n])?++t:t}}},
percent_rank:function(){var t=ca.rank(),e=t.next;return{init:t.init,
next:function(t){return(e(t)-1)/(t.data.length-1)}}},cume_dist:function(){var t
;return{init:function(){t=0},next:function(e){var n=e.index,r=e.data,i=e.compare
;if(t<n){for(;n+1<r.length&&!i(r[n],r[n+1]);)++n;t=n}return(1+t)/r.length}}},
ntile:function(t,e){(e=+e)>0||i("ntile num must be greater than zero.")
;var n=ca.cume_dist(),r=n.next;return{init:n.init,next:function(t){
return Math.ceil(e*r(t))}}},lag:function(t,e){return e=+e||1,{next:function(n){
var r=n.index-e;return r>=0?t(n.data[r]):null}}},lead:function(t,e){
return e=+e||1,{next:function(n){var r=n.index+e,i=n.data
;return r<i.length?t(i[r]):null}}},first_value:function(t){return{
next:function(e){return t(e.data[e.i0])}}},last_value:function(t){return{
next:function(e){return t(e.data[e.i1-1])}}},nth_value:function(t,e){
return(e=+e)>0||i("nth_value nth must be greater than zero."),{next:function(n){
var r=n.i0+(e-1);return r<n.i1?t(n.data[r]):null}}}},la=Object.keys(ca)
;function ha(t){
var e=this,a=R(t.ops),o=R(t.fields),u=R(t.params),f=R(t.as),s=e.outputs=[],c=e.windows=[],l={},h={},d=!0,g=[],v=[]
;function m(t){R(r(t)).forEach((function(t){l[t]=1}))}
m(t.sort),a.forEach((function(t,e){var r=o[e],a=n(r),l=Or(t,a,f[e])
;if(m(r),s.push(l),ca.hasOwnProperty(t))c.push(function(t,e,n,r){
var i=ca[t](e,n);return{init:i.init||p,update:function(t,e){e[r]=i.next(t)}}
}(t,o[e],u[e],l));else{
if(null==r&&"count"!==t&&i("Null aggregate field specified."),
"count"===t)return void g.push(l);d=!1;var y=h[a]
;y||((y=h[a]=[]).field=r,v.push(y)),y.push(Nr(t,l))}
})),(g.length||v.length)&&(e.cell=function(t,e,n){t=t.map((function(t){
return Pr(t,t.field)}));var r={num:0,agg:null,store:!1,count:e}
;if(!n)for(var i=t.length,a=r.agg=Array(i),o=0;o<i;++o)a[o]=new t[o](r)
;if(r.store)var u=r.data=new oi;return r.add=function(t){if(r.num+=1,!n){
u&&u.add(t);for(var e=0;e<i;++e)a[e].add(a[e].get(t),t)}},r.rem=function(t){
if(r.num-=1,!n){u&&u.rem(t);for(var e=0;e<i;++e)a[e].rem(a[e].get(t),t)}
},r.set=function(t){var i,o
;for(u&&u.values(),i=0,o=e.length;i<o;++i)t[e[i]]=r.num
;if(!n)for(i=0,o=a.length;i<o;++i)a[i].set(t)},r.init=function(){
r.num=0,u&&u.reset();for(var t=0;t<i;++t)a[t].init()},r
}(v,g,d)),e.inputs=Object.keys(l)}var da=ha.prototype;function pa(t){
Mr.call(this,{},t),this._mlen=0,this._mods=[]}da.init=function(){
this.windows.forEach((function(t){t.init()})),this.cell&&this.cell.init()
},da.update=function(t,e){
var n,r=this.cell,i=this.windows,a=t.data,o=i&&i.length;if(r){
for(n=t.p0;n<t.i0;++n)r.rem(a[n]);for(n=t.p1;n<t.i1;++n)r.add(a[n]);r.set(e)}
for(n=0;n<o;++n)i[n].update(t,e)},pa.Definition={type:"Window",metadata:{
modifies:!0},params:[{name:"sort",type:"compare"},{name:"groupby",type:"field",
array:!0},{name:"ops",type:"enum",array:!0,values:la.concat(Dr)},{name:"params",
type:"number",null:!0,array:!0},{name:"fields",type:"field",null:!0,array:!0},{
name:"as",type:"string",null:!0,array:!0},{name:"frame",type:"number",null:!0,
array:!0,length:2,default:[null,0]},{name:"ignorePeers",type:"boolean",
default:!1}]};var ga=$(pa,Mr);function va(t,e,n){
var r=n.sort,i=r&&!n.ignorePeers,a=n.frame||[null,0],o=t.data(r),u=o.length,f=0,s=i?jr(r):null,c={
i0:0,i1:0,p0:0,p1:0,index:0,data:o,compare:r||L(-1)}
;for(e.init();f<u;++f)ma(c,a,f,u),i&&ya(c,s),e.update(c,o[f])}
function ma(t,e,n,r){
t.p0=t.i0,t.p1=t.i1,t.i0=null==e[0]?0:Math.max(0,n-Math.abs(e[0])),
t.i1=null==e[1]?r:Math.min(r,n+Math.abs(e[1])+1),t.index=n}function ya(t,e){
var n=t.i0,r=t.i1-1,i=t.compare,a=t.data,o=a.length-1
;n>0&&!i(a[n],a[n-1])&&(t.i0=e.left(a,a[n])),
r<o&&!i(a[r],a[r+1])&&(t.i1=e.right(a,a[r]))}ga.transform=function(t,e){
var n,r,i=this,a=i.state,o=t.modified()
;this.stamp=e.stamp,a&&!o||(a=i.state=new ha(t));var u=Cr(t.groupby)
;function f(t){return i.group(u(t))}
for(o||e.modified(a.inputs)?(i.value={},e.visit(e.SOURCE,(function(t){
f(t).add(t)}))):(e.visit(e.REM,(function(t){f(t).remove(t)
})),e.visit(e.ADD,(function(t){f(t).add(t)
}))),n=0,r=i._mlen;n<r;++n)va(i._mods[n],a,t)
;return i._mlen=0,i._mods=[],e.reflow(o).modifies(a.outputs)
},ga.group=function(t){var e=this,n=e.value[t]
;return n||((n=e.value[t]=hi(ft)).stamp=-1),
n.stamp<e.stamp&&(n.stamp=e.stamp,e._mods[e._mlen++]=n),n}
;var ba=Object.freeze({aggregate:fi,bin:ci,collect:di,compare:pi,
countpattern:vi,cross:yi,density:xi,expression:ki,extent:Si,facet:Oi,field:Di,
filter:Ri,flatten:Pi,fold:Li,formula:qi,generate:Ui,impute:Ii,joinaggregate:$i,
key:Wi,load:Gi,lookup:Hi,multiextent:Vi,multivalues:Ji,params:Qi,pivot:Ki,
prefacet:ea,project:na,proxy:ra,relay:ia,sample:aa,sequence:oa,sieve:ua,
subflow:Ai,tupleindex:fa,values:sa,window:pa
}),_a="top",xa="left",wa="right",Ma="bottom",ka="start",Ea="group",Sa="axis",Aa="title",Ca="frame",Oa="scope",za="legend",Da="row-header",Na="row-footer",Ra="row-title",Ta="column-header",Pa="column-footer",La="column-title",qa="padding",Ua="fit",Fa="fit-x",ja="fit-y",Ia="none",$a="all",Ba="each",Wa="column",Ya="row"
;function Ga(t){this.clear(),t&&this.union(t)}var Ha=Ga.prototype
;Ha.clone=function(){return new Ga(this)},Ha.clear=function(){
return this.x1=+Number.MAX_VALUE,
this.y1=+Number.MAX_VALUE,this.x2=-Number.MAX_VALUE,
this.y2=-Number.MAX_VALUE,this},Ha.empty=function(){
return this.x1===+Number.MAX_VALUE&&this.y1===+Number.MAX_VALUE&&this.x2===-Number.MAX_VALUE&&this.y2===-Number.MAX_VALUE
},Ha.set=function(t,e,n,r){
return n<t?(this.x2=t,this.x1=n):(this.x1=t,this.x2=n),
r<e?(this.y2=e,this.y1=r):(this.y1=e,this.y2=r),this},Ha.add=function(t,e){
return t<this.x1&&(this.x1=t),
e<this.y1&&(this.y1=e),t>this.x2&&(this.x2=t),e>this.y2&&(this.y2=e),this
},Ha.expand=function(t){return this.x1-=t,this.y1-=t,this.x2+=t,this.y2+=t,this
},Ha.round=function(){
return this.x1=Math.floor(this.x1),this.y1=Math.floor(this.y1),
this.x2=Math.ceil(this.x2),this.y2=Math.ceil(this.y2),this
},Ha.translate=function(t,e){return this.x1+=t,this.x2+=t,this.y1+=e,this.y2+=e,
this},Ha.rotate=function(t,e,n){
var r=Math.cos(t),i=Math.sin(t),a=e-e*r+n*i,o=n-e*i-n*r,u=this.x1,f=this.x2,s=this.y1,c=this.y2
;return this.clear().add(r*u-i*s+a,i*u+r*s+o).add(r*u-i*c+a,i*u+r*c+o).add(r*f-i*s+a,i*f+r*s+o).add(r*f-i*c+a,i*f+r*c+o)
},Ha.union=function(t){
return t.x1<this.x1&&(this.x1=t.x1),t.y1<this.y1&&(this.y1=t.y1),
t.x2>this.x2&&(this.x2=t.x2),t.y2>this.y2&&(this.y2=t.y2),this
},Ha.intersect=function(t){
return t.x1>this.x1&&(this.x1=t.x1),t.y1>this.y1&&(this.y1=t.y1),
t.x2<this.x2&&(this.x2=t.x2),t.y2<this.y2&&(this.y2=t.y2),this
},Ha.encloses=function(t){
return t&&this.x1<=t.x1&&this.x2>=t.x2&&this.y1<=t.y1&&this.y2>=t.y2
},Ha.alignsWith=function(t){
return t&&(this.x1==t.x1||this.x2==t.x2||this.y1==t.y1||this.y2==t.y2)
},Ha.intersects=function(t){
return t&&!(this.x2<t.x1||this.x1>t.x2||this.y2<t.y1||this.y1>t.y2)
},Ha.contains=function(t,e){return!(t<this.x1||t>this.x2||e<this.y1||e>this.y2)
},Ha.width=function(){return this.x2-this.x1},Ha.height=function(){
return this.y2-this.y1};var Va,Xa=0;function Ja(t,e){var n,r=[];return n={
id:"gradient_"+Xa++,x1:t?t[0]:0,y1:t?t[1]:0,x2:e?e[0]:1,y2:e?e[1]:0,stops:r,
stop:function(t,e){return r.push({offset:t,color:e}),n}}}function Za(t){
this.mark=t,this.bounds=this.bounds||new Ga}function Qa(t){
Za.call(this,t),this.items=this.items||[]}function Ka(t,e){return function(t,e){
if("undefined"!=typeof document&&document.createElement){
var n=document.createElement("canvas")
;if(n&&n.getContext)return n.width=t,n.height=e,n}return null
}(t,e)||function(t,e){if(Va)try{return new Va(t,e)}catch(n){}return null
}(t,e)||null}function to(){
return("undefined"!=typeof Image?Image:null)||Va&&Va.Image||null||null}
function eo(t){this._pending=0,this._loader=t||zt()}
$(Qa,Za),["canvas","canvas-prebuilt"].some((function(t){try{
"function"!=typeof(Va=require(t))&&(Va=null)}catch(i){Va=null}return Va}))
;var no=eo.prototype;function ro(t){t._pending+=1}function io(t){t._pending-=1}
no.pending=function(){return this._pending},no.sanitizeURL=function(t){
var e=this;return ro(e),e._loader.sanitize(t,{context:"href"
}).then((function(t){return io(e),t})).catch((function(){return io(e),null}))
},no.loadImage=function(t){var e=this,n=to();return ro(e),e._loader.sanitize(t,{
context:"image"}).then((function(t){var r=t.href;if(!r||!n)throw{url:r}
;var i=new n;return i.onload=function(){io(e),i.loaded=!0},i.onerror=function(){
io(e),i.loaded=!1},i.src=r,i})).catch((function(t){return io(e),{loaded:!1,
width:0,height:0,src:t&&t.url||""}}))},no.ready=function(){var t=this
;return new Promise((function(e){!function n(r){
t.pending()?setTimeout((function(){n(!0)}),10):e(r)}(!1)}))}
;var ao=Math.PI,oo=2*ao,uo=1e-6,fo=oo-uo;function so(){
this._x0=this._y0=this._x1=this._y1=null,this._=""}function co(){return new so}
function lo(t){return function(){return t}}so.prototype=co.prototype={
constructor:so,moveTo:function(t,e){
this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)},
closePath:function(){
null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},
lineTo:function(t,e){this._+="L"+(this._x1=+t)+","+(this._y1=+e)},
quadraticCurveTo:function(t,e,n,r){
this._+="Q"+ +t+","+ +e+","+(this._x1=+n)+","+(this._y1=+r)},
bezierCurveTo:function(t,e,n,r,i,a){
this._+="C"+ +t+","+ +e+","+ +n+","+ +r+","+(this._x1=+i)+","+(this._y1=+a)},
arcTo:function(t,e,n,r,i){t=+t,e=+e,n=+n,r=+r,i=+i
;var a=this._x1,o=this._y1,u=n-t,f=r-e,s=a-t,c=o-e,l=s*s+c*c
;if(i<0)throw new Error("negative radius: "+i)
;if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=e);else if(l>uo)if(Math.abs(c*u-f*s)>uo&&i){
var h=n-a,d=r-o,p=u*u+f*f,g=h*h+d*d,v=Math.sqrt(p),m=Math.sqrt(l),y=i*Math.tan((ao-Math.acos((p+l-g)/(2*v*m)))/2),b=y/m,_=y/v
;Math.abs(b-1)>uo&&(this._+="L"+(t+b*s)+","+(e+b*c)),
this._+="A"+i+","+i+",0,0,"+ +(c*h>s*d)+","+(this._x1=t+_*u)+","+(this._y1=e+_*f)
}else this._+="L"+(this._x1=t)+","+(this._y1=e);else;},
arc:function(t,e,n,r,i,a){t=+t,e=+e
;var o=(n=+n)*Math.cos(r),u=n*Math.sin(r),f=t+o,s=e+u,c=1^a,l=a?r-i:i-r
;if(n<0)throw new Error("negative radius: "+n)
;null===this._x1?this._+="M"+f+","+s:(Math.abs(this._x1-f)>uo||Math.abs(this._y1-s)>uo)&&(this._+="L"+f+","+s),
n&&(l<0&&(l=l%oo+oo),
l>fo?this._+="A"+n+","+n+",0,1,"+c+","+(t-o)+","+(e-u)+"A"+n+","+n+",0,1,"+c+","+(this._x1=f)+","+(this._y1=s):l>uo&&(this._+="A"+n+","+n+",0,"+ +(l>=ao)+","+c+","+(this._x1=t+n*Math.cos(i))+","+(this._y1=e+n*Math.sin(i))))
},rect:function(t,e,n,r){
this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)+"h"+ +n+"v"+ +r+"h"+-n+"Z"
},toString:function(){return this._}}
;var ho=Math.abs,po=Math.atan2,go=Math.cos,vo=Math.max,mo=Math.min,yo=Math.sin,bo=Math.sqrt,_o=1e-12,xo=Math.PI,wo=xo/2,Mo=2*xo
;function ko(t){return t>1?0:t<-1?xo:Math.acos(t)}function Eo(t){
return t>=1?wo:t<=-1?-wo:Math.asin(t)}function So(t){return t.innerRadius}
function Ao(t){return t.outerRadius}function Co(t){return t.startAngle}
function Oo(t){return t.endAngle}function zo(t){return t&&t.padAngle}
function Do(t,e,n,r,i,a,o,u){
var f=n-t,s=r-e,c=o-i,l=u-a,h=(c*(e-a)-l*(t-i))/(l*f-c*s);return[t+h*f,e+h*s]}
function No(t,e,n,r,i,a,o){
var u=t-n,f=e-r,s=(o?a:-a)/bo(u*u+f*f),c=s*f,l=-s*u,h=t+c,d=e+l,p=n+c,g=r+l,v=(h+p)/2,m=(d+g)/2,y=p-h,b=g-d,_=y*y+b*b,x=i-a,w=h*g-p*d,M=(b<0?-1:1)*bo(vo(0,x*x*_-w*w)),k=(w*b-y*M)/_,E=(-w*y-b*M)/_,S=(w*b+y*M)/_,A=(-w*y+b*M)/_,C=k-v,O=E-m,z=S-v,D=A-m
;return C*C+O*O>z*z+D*D&&(k=S,E=A),{cx:k,cy:E,x01:-c,y01:-l,x11:k*(i/x-1),
y11:E*(i/x-1)}}function Ro(t){this._context=t}function To(t){return new Ro(t)}
function Po(t){return t[0]}function Lo(t){return t[1]}function qo(){
var t=Po,e=Lo,n=lo(!0),r=null,i=To,a=null;function o(o){
var u,f,s,c=o.length,l=!1
;for(null==r&&(a=i(s=co())),u=0;u<=c;++u)!(u<c&&n(f=o[u],u,o))===l&&((l=!l)?a.lineStart():a.lineEnd()),
l&&a.point(+t(f,u,o),+e(f,u,o));if(s)return a=null,s+""||null}
return o.x=function(e){return arguments.length?(t="function"==typeof e?e:lo(+e),
o):t},o.y=function(t){
return arguments.length?(e="function"==typeof t?t:lo(+t),o):e
},o.defined=function(t){
return arguments.length?(n="function"==typeof t?t:lo(!!t),o):n
},o.curve=function(t){return arguments.length?(i=t,null!=r&&(a=i(r)),o):i
},o.context=function(t){return arguments.length?(null==t?r=a=null:a=i(r=t),o):r
},o}function Uo(){var t=Po,e=null,n=lo(0),r=Lo,i=lo(!0),a=null,o=To,u=null
;function f(f){var s,c,l,h,d,p=f.length,g=!1,v=new Array(p),m=new Array(p)
;for(null==a&&(u=o(d=co())),s=0;s<=p;++s){
if(!(s<p&&i(h=f[s],s,f))===g)if(g=!g)c=s,u.areaStart(),u.lineStart();else{
for(u.lineEnd(),u.lineStart(),l=s-1;l>=c;--l)u.point(v[l],m[l])
;u.lineEnd(),u.areaEnd()}
g&&(v[s]=+t(h,s,f),m[s]=+n(h,s,f),u.point(e?+e(h,s,f):v[s],r?+r(h,s,f):m[s]))}
if(d)return u=null,d+""||null}function s(){
return qo().defined(i).curve(o).context(a)}return f.x=function(n){
return arguments.length?(t="function"==typeof n?n:lo(+n),e=null,f):t
},f.x0=function(e){return arguments.length?(t="function"==typeof e?e:lo(+e),f):t
},f.x1=function(t){
return arguments.length?(e=null==t?null:"function"==typeof t?t:lo(+t),f):e
},f.y=function(t){
return arguments.length?(n="function"==typeof t?t:lo(+t),r=null,f):n
},f.y0=function(t){return arguments.length?(n="function"==typeof t?t:lo(+t),f):n
},f.y1=function(t){
return arguments.length?(r=null==t?null:"function"==typeof t?t:lo(+t),f):r
},f.lineX0=f.lineY0=function(){return s().x(t).y(n)},f.lineY1=function(){
return s().x(t).y(r)},f.lineX1=function(){return s().x(e).y(n)
},f.defined=function(t){
return arguments.length?(i="function"==typeof t?t:lo(!!t),f):i
},f.curve=function(t){return arguments.length?(o=t,null!=a&&(u=o(a)),f):o
},f.context=function(t){return arguments.length?(null==t?a=u=null:u=o(a=t),f):a
},f}Ro.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){
case 0:
this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e)
;break;case 1:this._point=2;default:this._context.lineTo(t,e)}}};var Fo={
draw:function(t,e){var n=Math.sqrt(e/xo);t.moveTo(n,0),t.arc(0,0,n,0,Mo)}}
;function jo(){}function Io(t,e,n){
t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+n)/6)
}function $o(t){this._context=t}function Bo(t){this._context=t}function Wo(t){
this._context=t}function Yo(t,e){this._basis=new $o(t),this._beta=e}
$o.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){
this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){
switch(this._point){case 3:Io(this,this._x1,this._y1);case 2:
this._context.lineTo(this._x1,this._y1)}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){
case 0:
this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e)
;break;case 1:this._point=2;break;case 2:
this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6)
;default:Io(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}
},Bo.prototype={areaStart:jo,areaEnd:jo,lineStart:function(){
this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,
this._point=0},lineEnd:function(){switch(this._point){case 1:
this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:
this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),
this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),
this._context.closePath();break;case 3:
this.point(this._x2,this._y2),this.point(this._x3,this._y3),
this.point(this._x4,this._y4)}},point:function(t,e){
switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x2=t,this._y2=e;break
;case 1:this._point=2,this._x3=t,this._y3=e;break;case 2:
this._point=3,this._x4=t,
this._y4=e,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+e)/6)
;break;default:Io(this,t,e)}
this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},Wo.prototype={
areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},
lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},
lineEnd:function(){
(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){
case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3
;var n=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+e)/6
;this._line?this._context.lineTo(n,r):this._context.moveTo(n,r);break;case 3:
this._point=4;default:Io(this,t,e)}
this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},Yo.prototype={
lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},
lineEnd:function(){var t=this._x,e=this._y,n=t.length-1
;if(n>0)for(var r,i=t[0],a=e[0],o=t[n]-i,u=e[n]-a,f=-1;++f<=n;)r=f/n,
this._basis.point(this._beta*t[f]+(1-this._beta)*(i+r*o),this._beta*e[f]+(1-this._beta)*(a+r*u))
;this._x=this._y=null,this._basis.lineEnd()},point:function(t,e){
this._x.push(+t),this._y.push(+e)}};var Go=function t(e){function n(t){
return 1===e?new $o(t):new Yo(t,e)}return n.beta=function(e){return t(+e)},n
}(.85);function Ho(t,e,n){
t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-n),t._x2,t._y2)
}function Vo(t,e){this._context=t,this._k=(1-e)/6}Vo.prototype={
areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},
lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},
lineEnd:function(){switch(this._point){case 2:
this._context.lineTo(this._x2,this._y2);break;case 3:Ho(this,this._x1,this._y1)}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){
case 0:
this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e)
;break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3
;default:Ho(this,t,e)}
this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,
this._y1=this._y2,this._y2=e}};var Xo=function t(e){function n(t){
return new Vo(t,e)}return n.tension=function(e){return t(+e)},n}(0)
;function Jo(t,e){this._context=t,this._k=(1-e)/6}Jo.prototype={areaStart:jo,
areaEnd:jo,lineStart:function(){
this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,
this._point=0},lineEnd:function(){switch(this._point){case 1:
this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:
this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:
this.point(this._x3,this._y3),
this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},
point:function(t,e){switch(t=+t,e=+e,this._point){case 0:
this._point=1,this._x3=t,this._y3=e;break;case 1:
this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:
this._point=3,this._x5=t,this._y5=e;break;default:Ho(this,t,e)}
this._x0=this._x1,
this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}}
;var Zo=function t(e){function n(t){return new Jo(t,e)}
return n.tension=function(e){return t(+e)},n}(0);function Qo(t,e){
this._context=t,this._k=(1-e)/6}Qo.prototype={areaStart:function(){this._line=0
},areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},
lineEnd:function(){
(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){
case 0:this._point=1;break;case 1:this._point=2;break;case 2:
this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2)
;break;case 3:this._point=4;default:Ho(this,t,e)}
this._x0=this._x1,this._x1=this._x2,
this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}}
;var Ko=function t(e){function n(t){return new Qo(t,e)}
return n.tension=function(e){return t(+e)},n}(0);function tu(t,e,n){
var r=t._x1,i=t._y1,a=t._x2,o=t._y2;if(t._l01_a>_o){
var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,f=3*t._l01_a*(t._l01_a+t._l12_a)
;r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/f,
i=(i*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/f}if(t._l23_a>_o){
var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a)
;a=(a*s+t._x1*t._l23_2a-e*t._l12_2a)/c,o=(o*s+t._y1*t._l23_2a-n*t._l12_2a)/c}
t._context.bezierCurveTo(r,i,a,o,t._x2,t._y2)}function eu(t,e){
this._context=t,this._alpha=e}eu.prototype={areaStart:function(){this._line=0},
areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,
this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0
},lineEnd:function(){switch(this._point){case 2:
this._context.lineTo(this._x2,this._y2);break;case 3:
this.point(this._x2,this._y2)}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){
var n=this._x2-t,r=this._y2-e
;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}
switch(this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e)
;break;case 1:this._point=2;break;case 2:this._point=3;default:tu(this,t,e)}
this._l01_a=this._l12_a,
this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,
this._x0=this._x1,
this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}}
;var nu=function t(e){function n(t){return e?new eu(t,e):new Vo(t,0)}
return n.alpha=function(e){return t(+e)},n}(.5);function ru(t,e){
this._context=t,this._alpha=e}ru.prototype={areaStart:jo,areaEnd:jo,
lineStart:function(){
this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,
this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0
},lineEnd:function(){switch(this._point){case 1:
this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:
this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:
this.point(this._x3,this._y3),
this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},
point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e
;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}
switch(this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:
this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:
this._point=3,this._x5=t,this._y5=e;break;default:tu(this,t,e)}
this._l01_a=this._l12_a,
this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,
this._x0=this._x1,
this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}}
;var iu=function t(e){function n(t){return e?new ru(t,e):new Jo(t,0)}
return n.alpha=function(e){return t(+e)},n}(.5);function au(t,e){
this._context=t,this._alpha=e}au.prototype={areaStart:function(){this._line=0},
areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,
this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0
},lineEnd:function(){
(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){
var n=this._x2-t,r=this._y2-e
;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}
switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break
;case 2:
this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2)
;break;case 3:this._point=4;default:tu(this,t,e)}
this._l01_a=this._l12_a,this._l12_a=this._l23_a,
this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,
this._x0=this._x1,this._x1=this._x2,
this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}}
;var ou=function t(e){function n(t){return e?new au(t,e):new Qo(t,0)}
return n.alpha=function(e){return t(+e)},n}(.5);function uu(t){this._context=t}
function fu(t){return t<0?-1:1}function su(t,e,n){
var r=t._x1-t._x0,i=e-t._x1,a=(t._y1-t._y0)/(r||i<0&&-0),o=(n-t._y1)/(i||r<0&&-0),u=(a*i+o*r)/(r+i)
;return(fu(a)+fu(o))*Math.min(Math.abs(a),Math.abs(o),.5*Math.abs(u))||0}
function cu(t,e){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-e)/2:e}
function lu(t,e,n){var r=t._x0,i=t._y0,a=t._x1,o=t._y1,u=(a-r)/3
;t._context.bezierCurveTo(r+u,i+u*e,a-u,o-u*n,a,o)}function hu(t){
this._context=t}function du(t){this._context=new pu(t)}function pu(t){
this._context=t}function gu(t){this._context=t}function vu(t){
var e,n,r=t.length-1,i=new Array(r),a=new Array(r),o=new Array(r)
;for(i[0]=0,a[0]=2,
o[0]=t[0]+2*t[1],e=1;e<r-1;++e)i[e]=1,a[e]=4,o[e]=4*t[e]+2*t[e+1]
;for(i[r-1]=2,a[r-1]=7,
o[r-1]=8*t[r-1]+t[r],e=1;e<r;++e)n=i[e]/a[e-1],a[e]-=n,o[e]-=n*o[e-1]
;for(i[r-1]=o[r-1]/a[r-1],e=r-2;e>=0;--e)i[e]=(o[e]-i[e+1])/a[e]
;for(a[r-1]=(t[r]+i[r-1])/2,e=0;e<r-1;++e)a[e]=2*t[e+1]-i[e+1];return[i,a]}
function mu(t,e){this._context=t,this._t=e}uu.prototype={areaStart:jo,
areaEnd:jo,lineStart:function(){this._point=0},lineEnd:function(){
this._point&&this._context.closePath()},point:function(t,e){
t=+t,e=+e,this._point?this._context.lineTo(t,e):(this._point=1,
this._context.moveTo(t,e))}},hu.prototype={areaStart:function(){this._line=0},
areaEnd:function(){this._line=NaN},lineStart:function(){
this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},
lineEnd:function(){switch(this._point){case 2:
this._context.lineTo(this._x1,this._y1);break;case 3:
lu(this,this._t0,cu(this,this._t0))}
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line=1-this._line},point:function(t,e){var n=NaN
;if(e=+e,(t=+t)!==this._x1||e!==this._y1){switch(this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e)
;break;case 1:this._point=2;break;case 2:
this._point=3,lu(this,cu(this,n=su(this,t,e)),n);break;default:
lu(this,this._t0,n=su(this,t,e))}this._x0=this._x1,this._x1=t,this._y0=this._y1,
this._y1=e,this._t0=n}}
},(du.prototype=Object.create(hu.prototype)).point=function(t,e){
hu.prototype.point.call(this,e,t)},pu.prototype={moveTo:function(t,e){
this._context.moveTo(e,t)},closePath:function(){this._context.closePath()},
lineTo:function(t,e){this._context.lineTo(e,t)},
bezierCurveTo:function(t,e,n,r,i,a){this._context.bezierCurveTo(e,t,r,n,a,i)}
},gu.prototype={areaStart:function(){this._line=0},areaEnd:function(){
this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){
var t=this._x,e=this._y,n=t.length
;if(n)if(this._line?this._context.lineTo(t[0],e[0]):this._context.moveTo(t[0],e[0]),
2===n)this._context.lineTo(t[1],e[1]);else for(var r=vu(t),i=vu(e),a=0,o=1;o<n;++a,
++o)this._context.bezierCurveTo(r[0][a],i[0][a],r[1][a],i[1][a],t[o],e[o])
;(this._line||0!==this._line&&1===n)&&this._context.closePath(),
this._line=1-this._line,this._x=this._y=null},point:function(t,e){
this._x.push(+t),this._y.push(+e)}},mu.prototype={areaStart:function(){
this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){
this._x=this._y=NaN,this._point=0},lineEnd:function(){
0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),
(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),
this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,e){
switch(t=+t,e=+e,this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e)
;break;case 1:this._point=2;default:
if(this._t<=0)this._context.lineTo(this._x,e),this._context.lineTo(t,e);else{
var n=this._x*(1-this._t)+t*this._t
;this._context.lineTo(n,this._y),this._context.lineTo(n,e)}}this._x=t,this._y=e}
};var yu={basis:{curve:function(t){return new $o(t)}},"basis-closed":{
curve:function(t){return new Bo(t)}},"basis-open":{curve:function(t){
return new Wo(t)}},bundle:{curve:Go,tension:"beta",value:.85},cardinal:{
curve:Xo,tension:"tension",value:0},"cardinal-open":{curve:Ko,tension:"tension",
value:0},"cardinal-closed":{curve:Zo,tension:"tension",value:0},"catmull-rom":{
curve:nu,tension:"alpha",value:.5},"catmull-rom-closed":{curve:iu,
tension:"alpha",value:.5},"catmull-rom-open":{curve:ou,tension:"alpha",value:.5
},linear:{curve:To},"linear-closed":{curve:function(t){return new uu(t)}},
monotone:{horizontal:function(t){return new du(t)},vertical:function(t){
return new hu(t)}},natural:{curve:function(t){return new gu(t)}},step:{
curve:function(t){return new mu(t,.5)}},"step-after":{curve:function(t){
return new mu(t,1)}},"step-before":{curve:function(t){return new mu(t,0)}}}
;function bu(t,e,n){var r=yu.hasOwnProperty(t)&&yu[t],i=null
;return r&&(i=r.curve||r[e||"vertical"],
r.tension&&null!=n&&(i=i[r.tension](n))),i}var _u={m:2,l:2,h:1,v:1,c:6,s:4,q:4,
t:2,a:7},xu=[/([MLHVCSQTAZmlhvcsqtaz])/g,/###/,/(\d)([-+])/g,/\s|,|###/]
;function wu(t){var e,n,r,i,a,o,u,f,s,c,l,h=[]
;for(f=0,c=(e=t.slice().replace(xu[0],"###$1").split(xu[1]).slice(1)).length;f<c;++f){
for(r=(n=e[f]).slice(1).trim().replace(xu[2],"$1###$2").split(xu[3]),
i=[o=n.charAt(0)],s=0,l=r.length;s<l;++s)(a=+r[s])===a&&i.push(a)
;if(u=_u[o.toLowerCase()],
i.length-1>u)for(s=1,l=i.length;s<l;s+=u)h.push([o].concat(i.slice(s,s+u)));else h.push(i)
}return h}var Mu={},ku={},Eu=[].join;function Su(t){var e=Eu.call(t)
;if(ku[e])return ku[e]
;var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],u=t[5],f=t[6],s=t[7],c=s*o,l=-f*u,h=f*o,d=s*u,p=Math.cos(i),g=Math.sin(i),v=Math.cos(a),m=Math.sin(a),y=.5*(a-i),b=Math.sin(.5*y),_=8/3*b*b/Math.sin(y),x=n+p-_*g,w=r+g+_*p,M=n+v,k=r+m,E=M+_*m,S=k-_*v
;return ku[e]=[c*x+l*w,h*x+d*w,c*E+l*S,h*E+d*S,c*M+l*k,h*M+d*k]}
var Au=["l",0,0,0,0,0,0,0];function Cu(t,e){var n=Au[0]=t[0]
;if("a"===n||"A"===n)Au[1]=e*t[1],Au[2]=e*t[2],Au[3]=t[3],Au[4]=t[4],Au[5]=t[5],
Au[6]=e*t[6],Au[7]=e*t[7];else for(var r=1,i=t.length;r<i;++r)Au[r]=e*t[r]
;return Au}function Ou(t,e,n,r,i){var a,o,u,f,s,c=null,l=0,h=0,d=0,p=0
;null==n&&(n=0),null==r&&(r=0),null==i&&(i=1),t.beginPath&&t.beginPath()
;for(var g=0,v=e.length;g<v;++g){switch(a=e[g],1!==i&&(a=Cu(a,i)),a[0]){case"l":
l+=a[1],h+=a[2],t.lineTo(l+n,h+r);break;case"L":l=a[1],h=a[2],t.lineTo(l+n,h+r)
;break;case"h":l+=a[1],t.lineTo(l+n,h+r);break;case"H":l=a[1],t.lineTo(l+n,h+r)
;break;case"v":h+=a[1],t.lineTo(l+n,h+r);break;case"V":h=a[1],t.lineTo(l+n,h+r)
;break;case"m":l+=a[1],h+=a[2],t.moveTo(l+n,h+r);break;case"M":
l=a[1],h=a[2],t.moveTo(l+n,h+r);break;case"c":
o=l+a[5],u=h+a[6],d=l+a[3],p=h+a[4],
t.bezierCurveTo(l+a[1]+n,h+a[2]+r,d+n,p+r,o+n,u+r),l=o,h=u;break;case"C":l=a[5],
h=a[6],d=a[3],p=a[4],t.bezierCurveTo(a[1]+n,a[2]+r,d+n,p+r,l+n,h+r);break
;case"s":
o=l+a[3],u=h+a[4],d=2*l-d,p=2*h-p,t.bezierCurveTo(d+n,p+r,l+a[1]+n,h+a[2]+r,o+n,u+r),
d=l+a[1],p=h+a[2],l=o,h=u;break;case"S":
o=a[3],u=a[4],d=2*l-d,p=2*h-p,t.bezierCurveTo(d+n,p+r,a[1]+n,a[2]+r,o+n,u+r),
l=o,h=u,d=a[1],p=a[2];break;case"q":
o=l+a[3],u=h+a[4],d=l+a[1],p=h+a[2],t.quadraticCurveTo(d+n,p+r,o+n,u+r),l=o,h=u
;break;case"Q":
o=a[3],u=a[4],t.quadraticCurveTo(a[1]+n,a[2]+r,o+n,u+r),l=o,h=u,d=a[1],p=a[2]
;break;case"t":
o=l+a[1],u=h+a[2],null===c[0].match(/[QqTt]/)?(d=l,p=h):"t"===c[0]?(d=2*l-f,
p=2*h-s):"q"===c[0]&&(d=2*l-d,
p=2*h-p),f=d,s=p,t.quadraticCurveTo(d+n,p+r,o+n,u+r),h=u,d=(l=o)+a[1],p=h+a[2]
;break;case"T":
o=a[1],u=a[2],d=2*l-d,p=2*h-p,t.quadraticCurveTo(d+n,p+r,o+n,u+r),l=o,h=u;break
;case"a":
zu(t,l+n,h+r,[a[1],a[2],a[3],a[4],a[5],a[6]+l+n,a[7]+h+r]),l+=a[6],h+=a[7];break
;case"A":zu(t,l+n,h+r,[a[1],a[2],a[3],a[4],a[5],a[6]+n,a[7]+r]),l=a[6],h=a[7]
;break;case"z":case"Z":t.closePath()}c=a}}function zu(t,e,n,r){
for(var i=function(t,e,n,r,i,a,o,u,f){var s=Eu.call(arguments)
;if(Mu[s])return Mu[s]
;var c=o*(Math.PI/180),l=Math.sin(c),h=Math.cos(c),d=h*(u-t)*.5+l*(f-e)*.5,p=h*(f-e)*.5-l*(u-t)*.5,g=d*d/((n=Math.abs(n))*n)+p*p/((r=Math.abs(r))*r)
;g>1&&(n*=g=Math.sqrt(g),r*=g)
;var v=h/n,m=l/n,y=-l/r,b=h/r,_=v*u+m*f,x=y*u+b*f,w=v*t+m*e,M=y*t+b*e,k=1/((w-_)*(w-_)+(M-x)*(M-x))-.25
;k<0&&(k=0);var E=Math.sqrt(k);a==i&&(E=-E)
;var S=.5*(_+w)-E*(M-x),A=.5*(x+M)+E*(w-_),C=Math.atan2(x-A,_-S),O=Math.atan2(M-A,w-S)-C
;O<0&&1===a?O+=2*Math.PI:O>0&&0===a&&(O-=2*Math.PI)
;for(var z=Math.ceil(Math.abs(O/(.5*Math.PI+.001))),D=[],N=0;N<z;++N){
var R=C+N*O/z,T=C+(N+1)*O/z;D[N]=[S,A,R,T,n,r,l,h]}return Mu[s]=D
}(r[5],r[6],r[0],r[1],r[3],r[4],r[2],e,n),a=0;a<i.length;++a){var o=Su(i[a])
;t.bezierCurveTo(o[0],o[1],o[2],o[3],o[4],o[5])}}
var Du=2*Math.PI,Nu=Math.sqrt(3)/2,Ru={circle:{draw:function(t,e){
var n=Math.sqrt(e)/2;t.moveTo(n,0),t.arc(0,0,n,0,Du)}},cross:{
draw:function(t,e){var n=Math.sqrt(e)/2,r=n/2.5
;t.moveTo(-n,-r),t.lineTo(-n,r),t.lineTo(-r,r),
t.lineTo(-r,n),t.lineTo(r,n),t.lineTo(r,r),
t.lineTo(n,r),t.lineTo(n,-r),t.lineTo(r,-r),
t.lineTo(r,-n),t.lineTo(-r,-n),t.lineTo(-r,-r),t.closePath()}},diamond:{
draw:function(t,e){var n=Math.sqrt(e)/2
;t.moveTo(-n,0),t.lineTo(0,-n),t.lineTo(n,0),t.lineTo(0,n),t.closePath()}},
square:{draw:function(t,e){var n=Math.sqrt(e),r=-n/2;t.rect(r,r,n,n)}},
"triangle-up":{draw:function(t,e){var n=Math.sqrt(e)/2,r=Nu*n
;t.moveTo(0,-r),t.lineTo(-n,r),t.lineTo(n,r),t.closePath()}},"triangle-down":{
draw:function(t,e){var n=Math.sqrt(e)/2,r=Nu*n
;t.moveTo(0,r),t.lineTo(-n,-r),t.lineTo(n,-r),t.closePath()}},"triangle-right":{
draw:function(t,e){var n=Math.sqrt(e)/2,r=Nu*n
;t.moveTo(r,0),t.lineTo(-r,-n),t.lineTo(-r,n),t.closePath()}},"triangle-left":{
draw:function(t,e){var n=Math.sqrt(e)/2,r=Nu*n
;t.moveTo(-r,0),t.lineTo(r,-n),t.lineTo(r,n),t.closePath()}}};function Tu(t){
return Ru.hasOwnProperty(t)?Ru[t]:function(t){if(!Pu.hasOwnProperty(t)){
var e=wu(t);Pu[t]={draw:function(t,n){Ou(t,e,0,0,Math.sqrt(n)/2)}}}return Pu[t]
}(t)}var Pu={};function Lu(t){return t.x}function qu(t){return t.y}
function Uu(t){return t.width}function Fu(t){return t.height}function ju(t){
return function(){return t}}function Iu(){var t=Lu,e=qu,n=Uu,r=Fu,i=ju(0),a=null
;function o(o,u,f){
var s,c=null!=u?u:+t.call(this,o),l=null!=f?f:+e.call(this,o),h=+n.call(this,o),d=+r.call(this,o),p=+i.call(this,o)
;if(a||(a=s=co()),p<=0)a.rect(c,l,h,d);else{var g=c+h,v=l+d
;a.moveTo(c+p,l),a.lineTo(g-p,l),
a.quadraticCurveTo(g,l,g,l+p),a.lineTo(g,v-p),a.quadraticCurveTo(g,v,g-p,v),
a.lineTo(c+p,v),
a.quadraticCurveTo(c,v,c,v-p),a.lineTo(c,l+p),a.quadraticCurveTo(c,l,c+p,l),
a.closePath()}if(s)return a=null,s+""||null}return o.x=function(e){
return arguments.length?(t="function"==typeof e?e:ju(+e),o):t},o.y=function(t){
return arguments.length?(e="function"==typeof t?t:ju(+t),o):e
},o.width=function(t){
return arguments.length?(n="function"==typeof t?t:ju(+t),o):n
},o.height=function(t){return arguments.length?(r="function"==typeof t?t:ju(+t),
o):r},o.cornerRadius=function(t){
return arguments.length?(i="function"==typeof t?t:ju(+t),o):i
},o.context=function(t){return arguments.length?(a=null==t?null:t,o):a},o}
var $u=Math.PI;function Bu(){var t,e,n,r,i,a,o,u,f=null;function s(t,e,n){
var r=n/2;if(i){var s=o-e,c=t-a;if(s||c){
var l=Math.sqrt(s*s+c*c),h=(s/=l)*u,d=(c/=l)*u,p=Math.atan2(c,s)
;f.moveTo(a-h,o-d),
f.lineTo(t-s*r,e-c*r),f.arc(t,e,r,p-$u,p),f.lineTo(a+h,o+d),f.arc(a,o,u,p,p+$u)
}else f.arc(t,e,r,0,2*$u);f.closePath()}else i=1;a=t,o=e,u=r}function c(a){
var o,u,c,l=a.length,h=!1
;for(null==f&&(f=c=co()),o=0;o<=l;++o)!(o<l&&r(u=a[o],o,a))===h&&(h=!h)&&(i=0),
h&&s(+t(u,o,a),+e(u,o,a),+n(u,o,a));if(c)return f=null,c+""||null}
return c.x=function(e){return arguments.length?(t=e,c):t},c.y=function(t){
return arguments.length?(e=t,c):e},c.size=function(t){
return arguments.length?(n=t,c):n},c.defined=function(t){
return arguments.length?(r=t,c):r},c.context=function(t){
return arguments.length?(f=null==t?null:t,c):f},c}function Wu(t){return t.x||0}
function Yu(t){return t.y||0}function Gu(t){return t.cornerRadius||0}
function Hu(t){return!(!1===t.defined)}var Vu=function(){
var t=So,e=Ao,n=lo(0),r=null,i=Co,a=Oo,o=zo,u=null;function f(){
var f,s,c=+t.apply(this,arguments),l=+e.apply(this,arguments),h=i.apply(this,arguments)-wo,d=a.apply(this,arguments)-wo,p=ho(d-h),g=d>h
;if(u||(u=f=co()),
l<c&&(s=l,l=c,c=s),l>_o)if(p>Mo-_o)u.moveTo(l*go(h),l*yo(h)),u.arc(0,0,l,h,d,!g),
c>_o&&(u.moveTo(c*go(d),c*yo(d)),u.arc(0,0,c,d,h,g));else{
var v,m,y=h,b=d,_=h,x=d,w=p,M=p,k=o.apply(this,arguments)/2,E=k>_o&&(r?+r.apply(this,arguments):bo(c*c+l*l)),S=mo(ho(l-c)/2,+n.apply(this,arguments)),A=S,C=S
;if(E>_o){var O=Eo(E/c*yo(k)),z=Eo(E/l*yo(k))
;(w-=2*O)>_o?(_+=O*=g?1:-1,x-=O):(w=0,
_=x=(h+d)/2),(M-=2*z)>_o?(y+=z*=g?1:-1,b-=z):(M=0,y=b=(h+d)/2)}
var D=l*go(y),N=l*yo(y),R=c*go(x),T=c*yo(x);if(S>_o){
var P=l*go(b),L=l*yo(b),q=c*go(_),U=c*yo(_);if(p<xo){
var F=w>_o?Do(D,N,q,U,P,L,R,T):[R,T],j=D-F[0],I=N-F[1],$=P-F[0],B=L-F[1],W=1/yo(ko((j*$+I*B)/(bo(j*j+I*I)*bo($*$+B*B)))/2),Y=bo(F[0]*F[0]+F[1]*F[1])
;A=mo(S,(c-Y)/(W-1)),C=mo(S,(l-Y)/(W+1))}}
M>_o?C>_o?(v=No(q,U,D,N,l,C,g),m=No(P,L,R,T,l,C,g),
u.moveTo(v.cx+v.x01,v.cy+v.y01),
C<S?u.arc(v.cx,v.cy,C,po(v.y01,v.x01),po(m.y01,m.x01),!g):(u.arc(v.cx,v.cy,C,po(v.y01,v.x01),po(v.y11,v.x11),!g),
u.arc(0,0,l,po(v.cy+v.y11,v.cx+v.x11),po(m.cy+m.y11,m.cx+m.x11),!g),
u.arc(m.cx,m.cy,C,po(m.y11,m.x11),po(m.y01,m.x01),!g))):(u.moveTo(D,N),
u.arc(0,0,l,y,b,!g)):u.moveTo(D,N),
c>_o&&w>_o?A>_o?(v=No(R,T,P,L,c,-A,g),m=No(D,N,q,U,c,-A,g),
u.lineTo(v.cx+v.x01,v.cy+v.y01),
A<S?u.arc(v.cx,v.cy,A,po(v.y01,v.x01),po(m.y01,m.x01),!g):(u.arc(v.cx,v.cy,A,po(v.y01,v.x01),po(v.y11,v.x11),!g),
u.arc(0,0,c,po(v.cy+v.y11,v.cx+v.x11),po(m.cy+m.y11,m.cx+m.x11),g),
u.arc(m.cx,m.cy,A,po(m.y11,m.x11),po(m.y01,m.x01),!g))):u.arc(0,0,c,x,_,g):u.lineTo(R,T)
}else u.moveTo(0,0);if(u.closePath(),f)return u=null,f+""||null}
return f.centroid=function(){
var n=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +a.apply(this,arguments))/2-xo/2
;return[go(r)*n,yo(r)*n]},f.innerRadius=function(e){
return arguments.length?(t="function"==typeof e?e:lo(+e),f):t
},f.outerRadius=function(t){
return arguments.length?(e="function"==typeof t?t:lo(+t),f):e
},f.cornerRadius=function(t){
return arguments.length?(n="function"==typeof t?t:lo(+t),f):n
},f.padRadius=function(t){
return arguments.length?(r=null==t?null:"function"==typeof t?t:lo(+t),f):r
},f.startAngle=function(t){
return arguments.length?(i="function"==typeof t?t:lo(+t),f):i
},f.endAngle=function(t){
return arguments.length?(a="function"==typeof t?t:lo(+t),f):a
},f.padAngle=function(t){
return arguments.length?(o="function"==typeof t?t:lo(+t),f):o
},f.context=function(t){return arguments.length?(u=null==t?null:t,f):u},f
}().startAngle((function(t){return t.startAngle||0})).endAngle((function(t){
return t.endAngle||0})).padAngle((function(t){return t.padAngle||0
})).innerRadius((function(t){return t.innerRadius||0
})).outerRadius((function(t){return t.outerRadius||0
})).cornerRadius(Gu),Xu=Uo().x(Wu).y1(Yu).y0((function(t){
return(t.y||0)+(t.height||0)
})).defined(Hu),Ju=Uo().y(Yu).x1(Wu).x0((function(t){return(t.x||0)+(t.width||0)
})).defined(Hu),Zu=qo().x(Wu).y(Yu).defined(Hu),Qu=Iu().x(Wu).y(Yu).width((function(t){
return t.width||0})).height((function(t){return t.height||0
})).cornerRadius(Gu),Ku=function(){var t=lo(Fo),e=lo(64),n=null;function r(){
var r;if(n||(n=r=co()),t.apply(this,arguments).draw(n,+e.apply(this,arguments)),
r)return n=null,r+""||null}return r.type=function(e){
return arguments.length?(t="function"==typeof e?e:lo(e),r):t
},r.size=function(t){
return arguments.length?(e="function"==typeof t?t:lo(+t),r):e
},r.context=function(t){return arguments.length?(n=null==t?null:t,r):n},r
}().type((function(t){return Tu(t.shape||"circle")})).size((function(t){
return null==t.size?64:t.size
})),tf=Bu().x(Wu).y(Yu).defined(Hu).size((function(t){return t.size||1}))
;function ef(t,e,n,r){return Qu.context(t)(e,n,r)}function nf(t,e){
return e.stroke&&0!==e.opacity&&0!==e.strokeOpacity&&t.expand(null!=e.strokeWidth?+e.strokeWidth:1),
t}var rf,af=2*Math.PI,of=af/4,uf=af-1e-8;function ff(t){return rf=t,ff}
function sf(){}function cf(t,e){rf.add(t,e)}function lf(t,e,n){
return n.id?function(t,e,n){
for(var r=n.width(),i=n.height(),a=n.x1+e.x1*r,o=n.y1+e.y1*i,u=n.x1+e.x2*r,f=n.y1+e.y2*i,s=e.stops,c=0,l=s.length,h=t.createLinearGradient(a,o,u,f);c<l;++c)h.addColorStop(s[c].offset,s[c].color)
;return h}(t,n,e.bounds):n}function hf(t,e,n){
return(n*=null==e.fillOpacity?1:e.fillOpacity)>0&&(t.globalAlpha=n,
t.fillStyle=lf(t,e,e.fill),!0)}
ff.beginPath=sf,ff.closePath=sf,ff.moveTo=cf,ff.lineTo=cf,
ff.rect=function(t,e,n,r){cf(t,e),cf(t+n,e+r)
},ff.quadraticCurveTo=function(t,e,n,r){cf(t,e),cf(n,r)
},ff.bezierCurveTo=function(t,e,n,r,i,a){cf(t,e),cf(n,r),cf(i,a)
},ff.arc=function(t,e,n,r,i,a){
if(Math.abs(i-r)>uf)return cf(t-n,e-n),void cf(t+n,e+n)
;var o,u,f,s,c=1/0,l=-1/0,h=1/0,d=-1/0;function p(t){
f=n*Math.cos(t),s=n*Math.sin(t),f<c&&(c=f),f>l&&(l=f),s<h&&(h=s),s>d&&(d=s)}
if(p(r),
p(i),i!==r)if((r%=af)<0&&(r+=af),(i%=af)<0&&(i+=af),i<r&&(a=!a,o=r,r=i,i=o),
a)for(i-=af,
o=r-r%of,u=0;u<4&&o>i;++u,o-=of)p(o);else for(o=r-r%of+of,u=0;u<4&&o<i;++u,
o+=of)p(o);cf(t+c,e+h),cf(t+l,e+d)};var df=[];function pf(t,e,n){
var r=null!=(r=e.strokeWidth)?r:1
;return!(r<=0)&&((n*=null==e.strokeOpacity?1:e.strokeOpacity)>0&&(t.globalAlpha=n,
t.strokeStyle=lf(t,e,e.stroke),
t.lineWidth=r,t.lineCap=e.strokeCap||"butt",t.lineJoin=e.strokeJoin||"miter",
t.miterLimit=e.strokeMiterLimit||10,
t.setLineDash&&(t.setLineDash(e.strokeDash||df),
t.lineDashOffset=e.strokeDashOffset||0),!0))}function gf(t,e){
return t.zindex-e.zindex||t.index-e.index}function vf(t){
if(!t.zdirty)return t.zitems;var e,n,r,i=t.items,a=[]
;for(n=0,r=i.length;n<r;++n)(e=i[n]).index=n,e.zindex&&a.push(e)
;return t.zdirty=!1,t.zitems=a.sort(gf)}function mf(t,e){var n,r,i=t.items
;if(i&&i.length){var a=vf(t);if(a&&a.length){
for(n=0,r=i.length;n<r;++n)i[n].zindex||e(i[n]);i=a}
for(n=0,r=i.length;n<r;++n)e(i[n])}}function yf(t,e){var n,r,i=t.items
;if(!i||!i.length)return null;var a=vf(t)
;for(a&&a.length&&(i=a),r=i.length;--r>=0;)if(n=e(i[r]))return n
;if(i===a)for(r=(i=t.items).length;--r>=0;)if(!i[r].zindex&&(n=e(i[r])))return n
;return null}function bf(t){return function(e,n,r){mf(n,(function(n){
r&&!r.intersects(n.bounds)||xf(t,e,n,n)}))}}function _f(t){
return function(e,n,r){
!n.items.length||r&&!r.intersects(n.bounds)||xf(t,e,n.items[0],n.items)}}
function xf(t,e,n,r){var i=null==n.opacity?1:n.opacity
;0!==i&&(t(e,r)||(n.fill&&hf(e,n,i)&&e.fill(),n.stroke&&pf(e,n,i)&&e.stroke()))}
var wf=function(){return!0};function Mf(t){
return t||(t=wf),function(e,n,r,i,a,o){
return r*=e.pixelRatio,i*=e.pixelRatio,yf(n,(function(n){var u=n.bounds
;if((!u||u.contains(a,o))&&u)return t(e,n,r,i,a,o)?n:void 0}))}}
function kf(t,e){return function(n,r,i,a){
var o,u,f=Array.isArray(r)?r[0]:r,s=null==e?f.fill:e,c=f.stroke&&n.isPointInStroke
;return c&&(o=f.strokeWidth,
u=f.strokeCap,n.lineWidth=null!=o?o:1,n.lineCap=null!=u?u:"butt"),
!t(n,r)&&(s&&n.isPointInPath(i,a)||c&&n.isPointInStroke(i,a))}}function Ef(t){
return Mf(kf(t))}function Sf(t,e){return"translate("+t+","+e+")"}function Af(t){
return Sf(t.x||0,t.y||0)}function Cf(t,e){function n(t,n){var r=n.x||0,i=n.y||0
;t.translate(r,i),t.beginPath(),e(t,n),t.translate(-r,-i)}return{type:t,
tag:"path",nested:!1,attr:function(t,n){t("transform",Af(n)),t("d",e(null,n))},
bound:function(t,n){return e(ff(t),n),nf(t,n).translate(n.x||0,n.y||0)},
draw:bf(n),pick:Ef(n)}}var Of=Cf("arc",(function(t,e){return Vu.context(t)(e)}))
;function zf(t,e,n){function r(t,n){t.beginPath(),e(t,n)}var i=kf(r);return{
type:t,tag:"path",nested:!0,attr:function(t,n){var r=n.mark.items
;r.length&&t("d",e(null,r))},bound:function(t,n){var r=n.items
;return 0===r.length?t:(e(ff(t),r),nf(t,r[0]))},draw:_f(r),
pick:function(t,e,n,r,a,o){var u=e.items,f=e.bounds
;return!u||!u.length||f&&!f.contains(a,o)?null:(n*=t.pixelRatio,r*=t.pixelRatio,
i(t,u,n,r)?u[0]:null)},tip:n}}var Df=zf("area",(function(t,e){
var n=e[0],r=n.interpolate||"linear"
;return("horizontal"===n.orient?Ju:Xu).curve(bu(r,n.orient,n.tension)).context(t)(e)
}),(function(t,e){
for(var n,r,i="horizontal"===t[0].orient?e[1]:e[0],a="horizontal"===t[0].orient?"y":"x",o=t.length,u=1/0;--o>=0;)!1!==t[o].defined&&(r=Math.abs(t[o][a]-i))<u&&(u=r,
n=t[o]);return n})),Nf=1;function Rf(t,e,n){
var r=e.clip,i=t._defs,a=e.clip_id||(e.clip_id="clip"+Nf++),o=i.clipping[a]||(i.clipping[a]={
id:a})
;return T(r)?o.path=r(null):(o.width=n.width||0,o.height=n.height||0),"url(#"+a+")"
}function Tf(t,e){var n=e.stroke?.5:0;t.beginPath(),ef(t,e,n,n)}var Pf=kf(Tf)
;var Lf={type:"group",tag:"g",nested:!1,attr:function(t,e){t("transform",Af(e))
},bound:function(t,e){
if(!e.clip&&e.items)for(var n=e.items,r=0,i=n.length;r<i;++r)t.union(n[r].bounds)
;return(e.clip||e.width||e.height)&&!e.noBound&&t.add(0,0).add(e.width||0,e.height||0),
nf(t,e),t.translate(e.x||0,e.y||0)},draw:function(t,e,n){var r=this
;mf(e,(function(e){var i,a=e.x||0,o=e.y||0,u=e.width||0,f=e.height||0
;t.save(),t.translate(a,o),
(e.stroke||e.fill)&&(i=null==e.opacity?1:e.opacity)>0&&(Tf(t,e),
e.fill&&hf(t,e,i)&&t.fill(),
e.stroke&&pf(t,e,i)&&t.stroke()),e.clip&&(t.beginPath(),
t.rect(0,0,u,f),t.clip()),n&&n.translate(-a,-o),mf(e,(function(e){r.draw(t,e,n)
})),n&&n.translate(a,o),t.restore()}))},pick:function(t,e,n,r,i,a){
if(e.bounds&&!e.bounds.contains(i,a)||!e.items)return null
;var o=this,u=n*t.pixelRatio,f=r*t.pixelRatio;return yf(e,(function(s){
var c,l,h,d;if(!(d=s.bounds)||d.contains(i,a))return l=s.x||0,h=s.y||0,t.save(),
t.translate(l,h),l=i-l,h=a-h,!(c=yf(s,(function(t){return function(t,e,n){
return(!1!==t.interactive||"group"===t.marktype)&&t.bounds&&t.bounds.contains(e,n)
}(t,l,h)?o.pick(t,n,r,l,h):null
})))&&!1!==e.interactive&&(s.fill||s.stroke)&&Pf(t,s,u,f)&&(c=s),
t.restore(),c||null}))},background:function(t,e){var n=e.stroke?.5:0
;t("class","background"),t("d",ef(null,e,n,n))},foreground:function(t,e,n){
t("clip-path",e.clip?Rf(n,e,e):null)}};function qf(t,e){var n=t.image
;return n&&n.url===t.url||(n={loaded:!1,width:0,height:0
},e.loadImage(t.url).then((function(e){t.image=e,t.image.url=t.url}))),n}
function Uf(t,e){return"center"===t?e/2:"right"===t?e:0}function Ff(t,e){
return"middle"===t?e/2:"bottom"===t?e:0}var jf={type:"image",tag:"image",
nested:!1,attr:function(t,e,n){
var r=qf(e,n),i=e.x||0,a=e.y||0,o=(null!=e.width?e.width:r.width)||0,u=(null!=e.height?e.height:r.height)||0,f=!1===e.aspect?"none":"xMidYMid"
;i-=Uf(e.align,o),
a-=Ff(e.baseline,u),t("href",r.src||"","http://www.w3.org/1999/xlink","xlink:href"),
t("transform",Sf(i,a)),t("width",o),t("height",u),t("preserveAspectRatio",f)},
bound:function(t,e){
var n=e.image,r=e.x||0,i=e.y||0,a=(null!=e.width?e.width:n&&n.width)||0,o=(null!=e.height?e.height:n&&n.height)||0
;return r-=Uf(e.align,a),i-=Ff(e.baseline,o),t.set(r,i,r+a,i+o)},
draw:function(t,e,n){var r=this;mf(e,(function(e){
if(!n||n.intersects(e.bounds)){
var i,a,o,u,f=qf(e,r),s=e.x||0,c=e.y||0,l=(null!=e.width?e.width:f.width)||0,h=(null!=e.height?e.height:f.height)||0
;s-=Uf(e.align,l),
c-=Ff(e.baseline,h),!1!==e.aspect&&(a=f.width/f.height,o=e.width/e.height,
a==a&&o==o&&a!==o&&(o<a?(c+=(h-(u=l/a))/2,
h=u):(s+=(l-(u=h*a))/2,l=u))),f.loaded&&(t.globalAlpha=null!=(i=e.opacity)?i:1,
t.drawImage(f,s,c,l,h))}}))},pick:Mf(),get:qf,xOffset:Uf,yOffset:Ff
},If=zf("line",(function(t,e){var n=e[0],r=n.interpolate||"linear"
;return Zu.curve(bu(r,n.orient,n.tension)).context(t)(e)}),(function(t,e){
for(var n,r,i=Math.pow(t[0].strokeWidth||1,2),a=t.length;--a>=0;)if(!1!==t[a].defined&&(n=t[a].x-e[0])*n+(r=t[a].y-e[1])*r<i)return t[a]
;return null}));function $f(t,e){var n=e.path;if(null==n)return!0
;var r=e.pathCache;r&&r.path===n||((e.pathCache=r=wu(n)).path=n),Ou(t,r,e.x,e.y)
}var Bf={type:"path",tag:"path",nested:!1,attr:function(t,e){
t("transform",Af(e)),t("d",e.path)},bound:function(t,e){
return $f(ff(t),e)?t.set(0,0,0,0):nf(t,e)},draw:bf($f),pick:Ef($f)}
;function Wf(t,e){t.beginPath(),ef(t,e)}var Yf={type:"rect",tag:"path",
nested:!1,attr:function(t,e){t("d",ef(null,e))},bound:function(t,e){var n,r
;return nf(t.set(n=e.x||0,r=e.y||0,n+e.width||0,r+e.height||0),e)},draw:bf(Wf),
pick:Ef(Wf)};function Gf(t,e,n){var r,i,a,o
;return!(!e.stroke||!pf(t,e,n))&&(r=e.x||0,
i=e.y||0,a=null!=e.x2?e.x2:r,o=null!=e.y2?e.y2:i,
t.beginPath(),t.moveTo(r,i),t.lineTo(a,o),!0)}var Hf,Vf,Xf={type:"rule",
tag:"line",nested:!1,attr:function(t,e){
t("transform",Af(e)),t("x2",null!=e.x2?e.x2-(e.x||0):0),
t("y2",null!=e.y2?e.y2-(e.y||0):0)},bound:function(t,e){var n,r
;return nf(t.set(n=e.x||0,r=e.y||0,null!=e.x2?e.x2:n,null!=e.y2?e.y2:r),e)},
draw:function(t,e,n){mf(e,(function(e){if(!n||n.intersects(e.bounds)){
var r=null==e.opacity?1:e.opacity;r&&Gf(t,e,r)&&t.stroke()}}))},
pick:Mf((function(t,e,n,r){
return!!t.isPointInStroke&&(Gf(t,e,1)&&t.isPointInStroke(n,r))}))
},Jf=Cf("shape",(function(t,e){return(e.mark.shape||e.shape).context(t)(e)
})),Zf=Cf("symbol",(function(t,e){return Ku.context(t)(e)})),Qf={height:rs,
measureWidth:es,estimateWidth:Kf,width:Kf,canvas:is};function Kf(t){
return Vf=rs(t),ts(as(t))}function ts(t){return~~(.8*t.length*Vf)}
function es(t){return Hf.font=us(t),ns(as(t))}function ns(t){
return Hf.measureText(t).width}function rs(t){
return null!=t.fontSize?t.fontSize:11}function is(t){
Hf=t&&(Hf=Ka(1,1))?Hf.getContext("2d"):null,Qf.width=Hf?es:Kf}function as(t){
var e=t.text;return null==e?"":t.limit>0?function(t){
var e,n=+t.limit,r=t.text+"";Hf?(Hf.font=us(t),e=ns):(Vf=rs(t),e=ts)
;if(e(r)<n)return r;var i,a=t.ellipsis||"…",o="rtl"===t.dir,u=0,f=r.length
;if(n-=e(a),o){for(;u<f;)i=u+f>>>1,e(r.slice(i))>n?u=i+1:f=i;return a+r.slice(u)
}for(;u<f;)i=1+(u+f>>>1),e(r.slice(0,i))<n?u=i:f=i-1;return r.slice(0,u)+a
}(t):e+""}function os(t,e){var n=t.font
;return(e&&n?String(n).replace(/"/g,"'"):n)||"sans-serif"}function us(t,e){
return(t.fontStyle?t.fontStyle+" ":"")+(t.fontVariant?t.fontVariant+" ":"")+(t.fontWeight?t.fontWeight+" ":"")+rs(t)+"px "+os(t,e)
}function fs(t){var e=t.baseline,n=rs(t)
;return Math.round("top"===e?.79*n:"middle"===e?.3*n:"bottom"===e?-.21*n:0)}
is(!0);var ss={left:"start",center:"middle",right:"end"},cs=new Ga
;function ls(t,e,n){
var r,i,a=Qf.height(e),o=e.align,u=e.radius||0,f=e.x||0,s=e.y||0,c=e.dx||0,l=(e.dy||0)+fs(e)-Math.round(.8*a)
;return u&&(i=(e.theta||0)-Math.PI/2,
f+=u*Math.cos(i),s+=u*Math.sin(i)),r=Qf.width(e),
"center"===o?c-=r/2:"right"===o&&(c-=r),
t.set(c+=f,l+=s,c+r,l+a),e.angle&&!n&&t.rotate(e.angle*Math.PI/180,f,s),
t.expand(n||!r?0:1)}var hs={arc:Of,area:Df,group:Lf,image:jf,line:If,path:Bf,
rect:Yf,rule:Xf,shape:Jf,symbol:Zf,text:{type:"text",tag:"text",nested:!1,
attr:function(t,e){
var n,r=e.dx||0,i=(e.dy||0)+fs(e),a=e.x||0,o=e.y||0,u=e.angle||0,f=e.radius||0
;f&&(n=(e.theta||0)-Math.PI/2,
a+=f*Math.cos(n),o+=f*Math.sin(n)),t("text-anchor",ss[e.align]||"start"),
u?(n=Sf(a,o)+" rotate("+u+")",
(r||i)&&(n+=" "+Sf(r,i))):n=Sf(a+r,o+i),t("transform",n)},bound:ls,
draw:function(t,e,n){mf(e,(function(e){var r,i,a,o,u,f
;n&&!n.intersects(e.bounds)||(f=as(e))&&0!==(r=null==e.opacity?1:e.opacity)&&(t.font=us(e),
t.textAlign=e.align||"left",
i=e.x||0,a=e.y||0,(o=e.radius)&&(u=(e.theta||0)-Math.PI/2,
i+=o*Math.cos(u),a+=o*Math.sin(u)),
e.angle&&(t.save(),t.translate(i,a),t.rotate(e.angle*Math.PI/180),
i=a=0),i+=e.dx||0,
a+=(e.dy||0)+fs(e),e.fill&&hf(t,e,r)&&t.fillText(f,i,a),e.stroke&&pf(t,e,r)&&t.strokeText(f,i,a),
e.angle&&t.restore())}))},pick:Mf((function(t,e,n,r,i,a){
if(e.fontSize<=0)return!1;if(!e.angle)return!0
;var o=ls(cs,e,!0),u=-e.angle*Math.PI/180,f=Math.cos(u),s=Math.sin(u),c=e.x,l=e.y,h=f*i-s*a+(c-c*f+l*s),d=s*i+f*a+(l-c*s-l*f)
;return o.contains(h,d)}))},trail:zf("trail",(function(t,e){
return tf.context(t)(e)}),(function(t,e){
for(var n,r,i=t.length;--i>=0;)if(!1!==t[i].defined&&(n=t[i].x-e[0])*n+(r=t[i].y-e[1])*r<(n=t[i].size||1)*n)return t[i]
;return null}))};function ds(t,e,n){var r=hs[t.mark.marktype],i=e||r.bound
;return r.nested&&(t=t.mark),i(t.bounds||(t.bounds=new Ga),t,n)}var ps={
mark:null};function gs(t,e,n){
var r,i,a,o,u=hs[t.marktype],f=u.bound,s=t.items,c=s&&s.length
;if(u.nested)return c?a=s[0]:(ps.mark=t,a=ps),o=ds(a,f,n),e=e&&e.union(o)||o
;if(e=e||t.bounds&&t.bounds.clear()||new Ga,
c)for(r=0,i=s.length;r<i;++r)e.union(ds(s[r],f,n));return t.bounds=e}
var vs=["marktype","name","role","interactive","clip","items","zindex","x","y","width","height","align","baseline","fill","fillOpacity","opacity","stroke","strokeOpacity","strokeWidth","strokeCap","strokeDash","strokeDashOffset","startAngle","endAngle","innerRadius","outerRadius","cornerRadius","padAngle","interpolate","tension","orient","defined","url","path","x2","y2","size","shape","text","angle","theta","radius","dx","dy","font","fontSize","fontWeight","fontStyle","fontVariant"]
;function ms(t,e){return JSON.stringify(t,vs,e)}function ys(t){
return function t(e){var n,r,i,a=e.marktype,o=e.items
;if(o)for(r=0,i=o.length;r<i;++r)n=a?"mark":"group",
o[r][n]=e,o[r].zindex&&(o[r][n].zdirty=!0),"group"===(a||n)&&t(o[r]);a&&gs(e)
;return e}("string"==typeof t?JSON.parse(t):t)}function bs(t){
arguments.length?this.root=ys(t):(this.root=xs({marktype:"group",name:"root",
role:"frame"}),this.root.items=[new Qa(this.root)])}var _s=bs.prototype
;function xs(t,e){return{bounds:new Ga,clip:!!t.clip,group:e,
interactive:!1!==t.interactive,items:[],marktype:t.marktype,name:t.name||void 0,
role:t.role||void 0,zindex:t.zindex||0}}function ws(t,e,n){
return!t&&"undefined"!=typeof document&&document.createElement&&(t=document),
t?n?t.createElementNS(n,e):t.createElement(e):null}function Ms(t,e){
e=e.toLowerCase()
;for(var n=t.childNodes,r=0,i=n.length;r<i;++r)if(n[r].tagName.toLowerCase()===e)return n[r]
}function ks(t,e,n,r){var i,a=t.childNodes[e]
;return a&&a.tagName.toLowerCase()===n.toLowerCase()||(i=a||null,
a=ws(t.ownerDocument,n,r),t.insertBefore(a,i)),a}function Es(t,e){
for(var n=t.childNodes,r=n.length;r>e;)t.removeChild(n[--r]);return t}
function Ss(t){
return"mark-"+t.marktype+(t.role?" role-"+t.role:"")+(t.name?" "+t.name:"")}
function As(t,e){var n=e.getBoundingClientRect()
;return[t.clientX-n.left-(e.clientLeft||0),t.clientY-n.top-(e.clientTop||0)]}
function Cs(t,e){
this._active=null,this._handlers={},this._loader=t||zt(),this._tooltip=e||Os}
function Os(t,e,n,r){t.element().setAttribute("title",r||"")}
_s.toJSON=function(t){return ms(this.root,t||0)},_s.mark=function(t,e,n){
var r=xs(t,e=e||this.root.items[0])
;return e.items[n]=r,r.zindex&&(r.group.zdirty=!0),r};var zs=Cs.prototype
;function Ds(t){this._el=null,this._bgcolor=null,this._loader=new eo(t)}
zs.initialize=function(t,e,n){return this._el=t,this._obj=n||null,this.origin(e)
},zs.element=function(){return this._el},zs.canvas=function(){
return this._el&&this._el.firstChild},zs.origin=function(t){
return arguments.length?(this._origin=t||[0,0],this):this._origin.slice()
},zs.scene=function(t){return arguments.length?(this._scene=t,this):this._scene
},zs.on=function(){},zs.off=function(){},zs._handlerIndex=function(t,e,n){
for(var r=t?t.length:0;--r>=0;)if(t[r].type===e&&(!n||t[r].handler===n))return r
;return-1},zs.handlers=function(t){var e,n=this._handlers,r=[]
;if(t)r.push.apply(r,n[this.eventName(t)]);else for(e in n)r.push.apply(r,n[e])
;return r},zs.eventName=function(t){var e=t.indexOf(".")
;return e<0?t:t.slice(0,e)},zs.handleHref=function(t,e,n){
this._loader.sanitize(n,{context:"href"}).then((function(e){
var n=new MouseEvent(t.type,t),r=ws(null,"a")
;for(var i in e)r.setAttribute(i,e[i]);r.dispatchEvent(n)
})).catch((function(){}))},zs.handleTooltip=function(t,e,n){
if(e&&null!=e.tooltip){e=function(t,e,n,r){var i,a,o=t&&t.mark
;if(o&&(i=hs[o.marktype]).tip){
for((a=As(e,n))[0]-=r[0],a[1]-=r[1];t=t.mark.group;)a[0]-=t.x||0,a[1]-=t.y||0
;t=i.tip(o.items,a)}return t}(e,t,this.canvas(),this._origin)
;var r=n&&e&&e.tooltip||null;this._tooltip.call(this._obj,this,t,e,r)}
},zs.getItemBoundingClientRect=function(t){if(e=this.canvas()){
for(var e,n=e.getBoundingClientRect(),r=this._origin,i=t.bounds,a=i.x1+r[0]+n.left,o=i.y1+r[1]+n.top,u=i.width(),f=i.height();t.mark&&(t=t.mark.group);)a+=t.x||0,
o+=t.y||0;return{x:a,y:o,width:u,height:f,left:a,top:o,right:a+u,bottom:o+f}}}
;var Ns=Ds.prototype;Ns.initialize=function(t,e,n,r,i){
return this._el=t,this.resize(e,n,r,i)},Ns.element=function(){return this._el
},Ns.canvas=function(){return this._el&&this._el.firstChild
},Ns.background=function(t){
return 0===arguments.length?this._bgcolor:(this._bgcolor=t,this)
},Ns.resize=function(t,e,n,r){
return this._width=t,this._height=e,this._origin=n||[0,0],this._scale=r||1,this
},Ns.dirty=function(){},Ns.render=function(t){var e=this
;return e._call=function(){e._render(t)},e._call(),e._call=null,e
},Ns._render=function(){},Ns.renderAsync=function(t){var e=this.render(t)
;return this._ready?this._ready.then((function(){return e})):Promise.resolve(e)
},Ns._load=function(t,e){var n=this,r=n._loader[t](e);if(!n._ready){
var i=n._call;n._ready=n._loader.ready().then((function(t){t&&i(),n._ready=null
}))}return r},Ns.sanitizeURL=function(t){return this._load("sanitizeURL",t)
},Ns.loadImage=function(t){return this._load("loadImage",t)}
;var Rs="mousemove",Ts="mouseout",Ps="click";function Ls(t,e){Cs.call(this,t,e),
this._down=null,this._touch=null,this._first=!0}var qs=$(Ls,Cs)
;function Us(t,e,n){return function(r){var i=this._active,a=this.pickEvent(r)
;a===i||(i&&i.exit||this.fire(n,r),this._active=a,this.fire(e,r)),this.fire(t,r)
}}function Fs(t){return function(e){this.fire(t,e),this._active=null}}
qs.initialize=function(t,e,n){var r=this._canvas=t&&Ms(t,"canvas");if(r){
var i=this;this.events.forEach((function(t){r.addEventListener(t,(function(e){
qs[t]?qs[t].call(i,e):i.fire(t,e)}))}))}
return Cs.prototype.initialize.call(this,t,e,n)},qs.canvas=function(){
return this._canvas},qs.context=function(){return this._canvas.getContext("2d")
},
qs.events=["keydown","keypress","keyup","dragenter","dragleave","dragover","mousedown","mouseup","mousemove","mouseout","mouseover","click","dblclick","wheel","mousewheel","touchstart","touchmove","touchend"],
qs.DOMMouseScroll=function(t){this.fire("mousewheel",t)
},qs.mousemove=Us("mousemove","mouseover","mouseout"),
qs.dragover=Us("dragover","dragenter","dragleave"),
qs.mouseout=Fs("mouseout"),qs.dragleave=Fs("dragleave"),
qs.mousedown=function(t){this._down=this._active,this.fire("mousedown",t)
},qs.click=function(t){
this._down===this._active&&(this.fire("click",t),this._down=null)
},qs.touchstart=function(t){
this._touch=this.pickEvent(t.changedTouches[0]),this._first&&(this._active=this._touch,
this._first=!1),this.fire("touchstart",t,!0)},qs.touchmove=function(t){
this.fire("touchmove",t,!0)},qs.touchend=function(t){this.fire("touchend",t,!0),
this._touch=null},qs.fire=function(t,e,n){
var r,i,a=n?this._touch:this._active,o=this._handlers[t]
;if(e.vegaType=t,t===Ps&&a&&a.href?this.handleHref(e,a,a.href):t!==Rs&&t!==Ts||this.handleTooltip(e,a,t!==Ts),
o)for(r=0,i=o.length;r<i;++r)o[r].handler.call(this._obj,e,a)
},qs.on=function(t,e){var n=this.eventName(t),r=this._handlers
;return this._handlerIndex(r[n],t,e)<0&&(r[n]||(r[n]=[])).push({type:t,handler:e
}),this},qs.off=function(t,e){
var n=this.eventName(t),r=this._handlers[n],i=this._handlerIndex(r,t,e)
;return i>=0&&r.splice(i,1),this},qs.pickEvent=function(t){
var e=As(t,this._canvas),n=this._origin
;return this.pick(this._scene,e[0],e[1],e[0]-n[0],e[1]-n[1])
},qs.pick=function(t,e,n,r,i){var a=this.context()
;return hs[t.marktype].pick.call(this,a,t,e,n,r,i)}
;var js="undefined"!=typeof window&&window.devicePixelRatio||1;function Is(t){
Ds.call(this,t),this._redraw=!1,this._dirty=new Ga}
var $s=$(Is,Ds),Bs=Ds.prototype,Ws=new Ga;function Ys(t,e){Cs.call(this,t,e)
;var n=this;n._hrefHandler=Hs(n,(function(t,e){
e&&e.href&&n.handleHref(t,e,e.href)})),n._tooltipHandler=Hs(n,(function(t,e){
n.handleTooltip(t,e,t.type!==Ts)}))}$s.initialize=function(t,e,n,r,i){
return this._canvas=Ka(1,1),
t&&(Es(t,0).appendChild(this._canvas),this._canvas.setAttribute("class","marks")),
Bs.initialize.call(this,t,e,n,r,i)},$s.resize=function(t,e,n,r){
return Bs.resize.call(this,t,e,n,r),function(t,e,n,r,i){
var a="undefined"!=typeof HTMLElement&&t instanceof HTMLElement&&null!=t.parentNode,o=t.getContext("2d"),u=a?js:i
;t.width=e*u,
t.height=n*u,a&&1!==u&&(t.style.width=e+"px",t.style.height=n+"px"),
o.pixelRatio=u,o.setTransform(u,0,0,u,u*r[0],u*r[1])
}(this._canvas,this._width,this._height,this._origin,this._scale),
this._redraw=!0,this},$s.canvas=function(){return this._canvas
},$s.context=function(){return this._canvas?this._canvas.getContext("2d"):null},
$s.dirty=function(t){var e=function(t,e){if(null==e)return t
;for(var n=Ws.clear().union(t);null!=e;e=e.mark.group)n.translate(e.x||0,e.y||0)
;return n}(t.bounds,t.mark.group);this._dirty.union(e)},$s._render=function(t){
var e=this.context(),n=this._origin,r=this._width,i=this._height,a=this._dirty
;return e.save(),
this._redraw||a.empty()?(this._redraw=!1,a=null):a=function(t,e,n){
return e.expand(1).round(),
e.translate(-n[0]%1,-n[1]%1),t.beginPath(),t.rect(e.x1,e.y1,e.width(),e.height()),
t.clip(),e
}(e,a,n),this.clear(-n[0],-n[1],r,i),this.draw(e,t,a),e.restore(),this._dirty.clear(),
this},$s.draw=function(t,e,n){var r=hs[e.marktype];e.clip&&function(t,e){
var n=e.clip;if(t.save(),t.beginPath(),T(n))n(t);else{var r=e.group
;t.rect(0,0,r.width||0,r.height||0)}t.clip()
}(t,e),r.draw.call(this,t,e,n),e.clip&&t.restore()},$s.clear=function(t,e,n,r){
var i=this.context()
;i.clearRect(t,e,n,r),null!=this._bgcolor&&(i.fillStyle=this._bgcolor,
i.fillRect(t,e,n,r))};var Gs=$(Ys,Cs);function Hs(t,e){return function(n){
var r=n.target.__data__
;n.vegaType=n.type,r=Array.isArray(r)?r[0]:r,e.call(t._obj,n,r)}}
function Vs(t,e,n){var r,i,a="<"+t
;if(e)for(r in e)null!=(i=e[r])&&(a+=" "+r+'="'+i+'"')
;return n&&(a+=" "+n),a+">"}function Xs(t){return"</"+t+">"}
Gs.initialize=function(t,e,n){var r=this._svg
;return r&&(r.removeEventListener(Ps,this._hrefHandler),
r.removeEventListener(Rs,this._tooltipHandler),
r.removeEventListener(Ts,this._tooltipHandler)),
this._svg=r=t&&Ms(t,"svg"),r&&(r.addEventListener(Ps,this._hrefHandler),
r.addEventListener(Rs,this._tooltipHandler),
r.addEventListener(Ts,this._tooltipHandler)),
Cs.prototype.initialize.call(this,t,e,n)},Gs.canvas=function(){return this._svg
},Gs.on=function(t,e){var n=this.eventName(t),r=this._handlers
;if(this._handlerIndex(r[n],t,e)<0){var i={type:t,handler:e,listener:Hs(this,e)}
;(r[n]||(r[n]=[])).push(i),this._svg&&this._svg.addEventListener(n,i.listener)}
return this},Gs.off=function(t,e){
var n=this.eventName(t),r=this._handlers[n],i=this._handlerIndex(r,t,e)
;return i>=0&&(this._svg&&this._svg.removeEventListener(n,r[i].listener),
r.splice(i,1)),this};var Js={version:"1.1",xmlns:"http://www.w3.org/2000/svg",
"xmlns:xlink":"http://www.w3.org/1999/xlink"},Zs={fill:"fill",
fillOpacity:"fill-opacity",stroke:"stroke",strokeOpacity:"stroke-opacity",
strokeWidth:"stroke-width",strokeCap:"stroke-linecap",
strokeJoin:"stroke-linejoin",strokeDash:"stroke-dasharray",
strokeDashOffset:"stroke-dashoffset",strokeMiterLimit:"stroke-miterlimit",
opacity:"opacity"},Qs=Object.keys(Zs),Ks=Js.xmlns;function tc(t){
Ds.call(this,t),
this._dirtyID=1,this._dirty=[],this._svg=null,this._root=null,this._defs=null}
var ec=$(tc,Ds),nc=Ds.prototype;function rc(t,e,n){var r,i,a
;for((t=ks(t,n,"linearGradient",Ks)).setAttribute("id",e.id),
t.setAttribute("x1",e.x1),
t.setAttribute("x2",e.x2),t.setAttribute("y1",e.y1),t.setAttribute("y2",e.y2),
r=0,
i=e.stops.length;r<i;++r)(a=ks(t,r,"stop",Ks)).setAttribute("offset",e.stops[r].offset),
a.setAttribute("stop-color",e.stops[r].color);Es(t,r)}function ic(t,e,n){var r
;(t=ks(t,n,"clipPath",Ks)).setAttribute("id",e.id),
e.path?(r=ks(t,0,"path",Ks)).setAttribute("d",e.path):((r=ks(t,0,"rect",Ks)).setAttribute("x",0),
r.setAttribute("y",0),
r.setAttribute("width",e.width),r.setAttribute("height",e.height))}
function ac(t,e){for(;t&&t.dirty!==e;t=t.mark.group){
if(t.dirty=e,!t.mark||t.mark.dirty===e)return;t.mark.dirty=e}}
function oc(t,e,n,r,i){var a,o=t._svg
;if(!o&&(o=ws(a=e.ownerDocument,r,Ks),t._svg=o,
t.mark&&(o.__data__=t,o.__values__={fill:"default"},"g"===r))){
var u=ws(a,"path",Ks)
;u.setAttribute("class","background"),o.appendChild(u),u.__data__=t
;var f=ws(a,"g",Ks);o.appendChild(f),f.__data__=t}
return(o.ownerSVGElement!==i||function(t){var e=t.mark||t.group
;return e&&e.items.length>1
}(t)&&o.previousSibling!==n)&&e.insertBefore(o,n?n.nextSibling:e.firstChild),o}
ec.initialize=function(t,e,n,r){
return t&&(this._svg=ks(t,0,"svg",Ks),this._svg.setAttribute("class","marks"),
Es(t,1),this._root=ks(this._svg,0,"g",Ks),Es(this._svg,1)),this._defs={
gradient:{},clipping:{}
},this.background(this._bgcolor),nc.initialize.call(this,t,e,n,r)
},ec.background=function(t){
return arguments.length&&this._svg&&this._svg.style.setProperty("background-color",t),
nc.background.apply(this,arguments)},ec.resize=function(t,e,n,r){
return nc.resize.call(this,t,e,n,r),
this._svg&&(this._svg.setAttribute("width",this._width*this._scale),
this._svg.setAttribute("height",this._height*this._scale),
this._svg.setAttribute("viewBox","0 0 "+this._width+" "+this._height),
this._root.setAttribute("transform","translate("+this._origin+")")),
this._dirty=[],this},ec.canvas=function(){return this._svg},ec.svg=function(){
if(!this._svg)return null;var t={class:"marks",width:this._width*this._scale,
height:this._height*this._scale,viewBox:"0 0 "+this._width+" "+this._height}
;for(var e in Js)t[e]=Js[e];var n=this._bgcolor?Vs("rect",{width:this._width,
height:this._height,style:"fill: "+this._bgcolor+";"})+Xs("rect"):""
;return Vs("svg",t)+n+this._svg.innerHTML+Xs("svg")},ec._render=function(t){
return this._dirtyCheck()&&(this._dirtyAll&&this._resetDefs(),
this.draw(this._root,t),
Es(this._root,1)),this.updateDefs(),this._dirty=[],++this._dirtyID,this
},ec.updateDefs=function(){var t,e=this._svg,n=this._defs,r=n.el,i=0
;for(t in n.gradient)r||(n.el=r=ks(e,0,"defs",Ks)),rc(r,n.gradient[t],i++)
;for(t in n.clipping)r||(n.el=r=ks(e,0,"defs",Ks)),ic(r,n.clipping[t],i++)
;r&&(0===i?(e.removeChild(r),n.el=null):Es(r,i))},ec._resetDefs=function(){
var t=this._defs;t.gradient={},t.clipping={}},ec.dirty=function(t){
t.dirty!==this._dirtyID&&(t.dirty=this._dirtyID,this._dirty.push(t))
},ec.isDirty=function(t){return this._dirtyAll||!t._svg||t.dirty===this._dirtyID
},ec._dirtyCheck=function(){this._dirtyAll=!0;var t=this._dirty
;if(!t.length)return!0;var e,n,r,i,a,o,u,f=++this._dirtyID
;for(a=0,o=t.length;a<o;++a)(n=(e=t[a]).mark).marktype!==r&&(r=n.marktype,
i=hs[r]),
n.zdirty&&n.dirty!==f&&(this._dirtyAll=!1,ac(e,f),n.items.forEach((function(t){
t.dirty=f
}))),n.zdirty||(e.exit?(i.nested&&n.items.length?(u=n.items[0])._svg&&this._update(i,u._svg,u):e._svg&&(u=e._svg.parentNode)&&u.removeChild(e._svg),
e._svg=null):(e=i.nested?n.items[0]:e)._update!==f&&(e._svg&&e._svg.ownerSVGElement?this._update(i,e._svg,e):(this._dirtyAll=!1,
ac(e,f)),e._update=f));return!this._dirtyAll},ec.draw=function(t,e,n){
if(!this.isDirty(e))return e._svg
;var r,i=this,a=this._svg,o=hs[e.marktype],u=!1===e.interactive?"none":null,f="g"===o.tag,s=null,c=0
;function l(t){var e=i.isDirty(t),n=oc(t,r,s,o.tag,a)
;e&&(i._update(o,n,t),f&&function(t,e,n){e=e.lastChild;var r,i=0
;mf(n,(function(n){r=t.draw(e,n,r),++i})),Es(e,1+i)}(i,n,t)),s=n,++c}
return(r=oc(e,t,n,"g",a)).setAttribute("class",Ss(e)),
f||r.style.setProperty("pointer-events",u),
e.clip?r.setAttribute("clip-path",Rf(i,e,e.group)):r.removeAttribute("clip-path"),
o.nested?e.items.length&&l(e.items[0]):mf(e,l),Es(r,c),r}
;var uc=null,fc=null,sc={group:function(t,e,n){
fc=e.__values__,uc=e.childNodes[1],
t.foreground(lc,n,this),uc=e.childNodes[0],t.background(lc,n,this)
;var r=!1===n.mark.interactive?"none":null
;r!==fc.events&&(uc.style.setProperty("pointer-events",r),fc.events=r)},
text:function(t,e,n){var r
;(r=as(n))!==fc.text&&(e.textContent=r,fc.text=r),cc(e,"font-family",os(n)),
cc(e,"font-size",rs(n)+"px"),
cc(e,"font-style",n.fontStyle),cc(e,"font-variant",n.fontVariant),
cc(e,"font-weight",n.fontWeight)}};function cc(t,e,n){
n!==fc[e]&&(null==n?t.style.removeProperty(e):t.style.setProperty(e,n+""),
fc[e]=n)}function lc(t,e,n){
e!==fc[t]&&(null!=e?n?uc.setAttributeNS(n,t,e):uc.setAttribute(t,e):n?uc.removeAttributeNS(n,t):uc.removeAttribute(t),
fc[t]=e)}function hc(){var t
;return"undefined"==typeof window?"":(t=window.location).hash?t.href.slice(0,-t.hash.length):t.href
}function dc(t){Ds.call(this,t),this._text={head:"",bg:"",root:"",foot:"",
defs:"",body:""},this._defs={gradient:{},clipping:{}}}
ec._update=function(t,e,n){uc=e,fc=e.__values__,t.attr(lc,n,this)
;var r=sc[t.type];r&&r.call(this,t,e,n),this.style(uc,n)
},ec.style=function(t,e){var n,r,i,a,o
;if(null!=e)for(n=0,r=Qs.length;n<r;++n)o=e[i=Qs[n]],
"font"===i&&(o=os(e)),o!==fc[i]&&(a=Zs[i],
null==o?"fill"===a?t.style.setProperty(a,"none"):t.style.removeProperty(a):(o.id&&(this._defs.gradient[o.id]=o,
o="url("+hc()+"#"+o.id+")"),t.style.setProperty(a,o+"")),fc[i]=o)}
;var pc,gc=$(dc,Ds),vc=Ds.prototype;function mc(t,e,n,r){pc[r||t]=e}
function yc(t,e,n,r){if(null==t)return"";var i,a,o,u,f,s=""
;for("bgrect"===n&&!1===e.interactive&&(s+="pointer-events: none; "),
"text"===n&&(s+="font-family: "+os(t)+"; ",
s+="font-size: "+rs(t)+"px; ",t.fontStyle&&(s+="font-style: "+t.fontStyle+"; "),
t.fontVariant&&(s+="font-variant: "+t.fontVariant+"; "),
t.fontWeight&&(s+="font-weight: "+t.fontWeight+"; ")),
i=0,a=Qs.length;i<a;++i)o=Qs[i],
u=Zs[o],null==(f=t[o])?"fill"===u&&(s+="fill: none; "):"transparent"!==f||"fill"!==u&&"stroke"!==u?(f.id&&(r.gradient[f.id]=f,
f="url(#"+f.id+")"),s+=u+": "+f+"; "):s+=u+": none; "
;return s?'style="'+s.trim()+'"':null}gc.resize=function(t,e,n,r){
vc.resize.call(this,t,e,n,r);var i=this._origin,a=this._text,o={class:"marks",
width:this._width*this._scale,height:this._height*this._scale,
viewBox:"0 0 "+this._width+" "+this._height};for(var u in Js)o[u]=Js[u]
;a.head=Vs("svg",o);var f=this._bgcolor
;return"transparent"!==f&&"none"!==f||(f=null),a.bg=f?Vs("rect",{
width:this._width,height:this._height,style:"fill: "+f+";"
})+Xs("rect"):"",a.root=Vs("g",{transform:"translate("+i+")"
}),a.foot=Xs("g")+Xs("svg"),this},gc.background=function(){
var t=vc.background.apply(this,arguments)
;return arguments.length&&this._text.head&&this.resize(this._width,this._height,this._origin,this._scale),
t},gc.svg=function(){var t=this._text
;return t.head+t.bg+t.defs+t.root+t.body+t.foot},gc._render=function(t){
return this._text.body=this.mark(t),this._text.defs=this.buildDefs(),this
},gc.buildDefs=function(){var t,e,n,r,i=this._defs,a="";for(e in i.gradient){
for(r=(n=i.gradient[e]).stops,a+=Vs("linearGradient",{id:e,x1:n.x1,x2:n.x2,
y1:n.y1,y2:n.y2}),t=0;t<r.length;++t)a+=Vs("stop",{offset:r[t].offset,
"stop-color":r[t].color})+Xs("stop");a+=Xs("linearGradient")}
for(e in i.clipping)n=i.clipping[e],a+=Vs("clipPath",{id:e
}),n.path?a+=Vs("path",{d:n.path})+Xs("path"):a+=Vs("rect",{x:0,y:0,
width:n.width,height:n.height})+Xs("rect"),a+=Xs("clipPath")
;return a.length>0?Vs("defs")+a+Xs("defs"):""},gc.attributes=function(t,e){
return pc={},t(mc,e,this),pc},gc.href=function(t){var e,n=this,r=t.href;if(r){
if(e=n._hrefs&&n._hrefs[r])return e;n.sanitizeURL(r).then((function(t){
t["xlink:href"]=t.href,t.href=null,(n._hrefs||(n._hrefs={}))[r]=t}))}return null
},gc.mark=function(t){var e,n=this,r=hs[t.marktype],i=r.tag,a=this._defs,o=""
;function u(u){var f=n.href(u)
;f&&(o+=Vs("a",f)),e="g"!==i?yc(u,t,i,a):null,o+=Vs(i,n.attributes(r.attr,u),e),
"text"===i?o+=function(t){
return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
}(as(u)):"g"===i&&(o+=Vs("path",n.attributes(r.background,u),yc(u,t,"bgrect",a))+Xs("path"),
o+=Vs("g",n.attributes(r.foreground,u))+n.markGroup(u)+Xs("g")),
o+=Xs(i),f&&(o+=Xs("a"))}
return"g"!==i&&!1===t.interactive&&(e='style="pointer-events: none;"'),
o+=Vs("g",{class:Ss(t),"clip-path":t.clip?Rf(n,t,t.group):null
},e),r.nested?t.items&&t.items.length&&u(t.items[0]):mf(t,u),o+Xs("g")
},gc.markGroup=function(t){var e=this,n="";return mf(t,(function(t){n+=e.mark(t)
})),n};var bc="canvas",_c="none",xc={Canvas:bc,PNG:"png",SVG:"svg",None:_c
},wc={};function Mc(t,e){
return t=String(t||"").toLowerCase(),arguments.length>1?(wc[t]=e,this):wc[t]}
wc.canvas=wc.png={renderer:Is,headless:Is,handler:Ls},wc.svg={renderer:tc,
headless:dc,handler:Ys},wc.none={};var kc=new Ga;function Ec(t){var e=t.clip
;if(T(e))e(ff(kc.clear()));else{if(!e)return
;kc.set(0,0,t.group.width,t.group.height)}t.bounds.intersect(kc)}
function Sc(t,e,n){
return t===e||("path"===n?Ac(t,e):t instanceof Date&&e instanceof Date?+t==+e:Y(t)&&Y(e)?Math.abs(t-e)<=1e-9:t&&e&&(u(t)||u(e))?null!=t&&null!=e&&function(t,e){
var n,r,i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1
;for(i.sort(),a.sort(),r=i.length-1;r>=0;r--)if(i[r]!=a[r])return!1
;for(r=i.length-1;r>=0;r--)if(!Sc(t[n=i[r]],e[n],n))return!1
;return typeof t==typeof e}(t,e):t==e)}function Ac(t,e){return Sc(wu(t),wu(e))}
function Cc(t){Mr.call(this,null,t)}function Oc(t,e,n){
return e(t.bounds.clear(),t,n)}$(Cc,Mr).transform=function(t,e){
var n,r=e.dataflow,i=t.mark,a=i.marktype,o=hs[a],u=o.bound,f=i.bounds
;return o.nested?(i.items.length&&r.dirty(i.items[0]),
f=Oc(i,u),i.items.forEach((function(t){t.bounds.clear().union(f)
}))):a===Ea||t.modified()?(e.visit(e.MOD,(function(t){r.dirty(t)
})),f.clear(),i.items.forEach((function(t){f.union(Oc(t,u))
})),i.role===za&&e.reflow()):(n=e.changed(e.REM),e.visit(e.ADD,(function(t){
f.union(Oc(t,u))})),e.visit(e.MOD,(function(t){
n=n||f.alignsWith(t.bounds),r.dirty(t),f.union(Oc(t,u))
})),n&&(f.clear(),i.items.forEach((function(t){f.union(t.bounds)
})))),Ec(i),e.modifies("bounds")};var zc=":vega_identifier:";function Dc(t){
Mr.call(this,0,t)}function Nc(t){Mr.call(this,null,t)}function Rc(t){
Mr.call(this,null,t)}Dc.Definition={type:"Identifier",metadata:{modifies:!0},
params:[{name:"as",type:"string",required:!0}]
},$(Dc,Mr).transform=function(t,e){var n=function(t){var e=t._signals[zc]
;e||(t._signals[zc]=e=t.add(0));return e}(e.dataflow),r=n.value,i=t.as
;return e.visit(e.ADD,(function(t){t[i]||(t[i]=++r)})),n.set(this.value=r),e
},$(Nc,Mr).transform=function(t,e){var n=this.value
;n||((n=e.dataflow.scenegraph().mark(t.markdef,function(t){
var e=t.groups,n=t.parent
;return e&&1===e.size?e.get(Object.keys(e.object)[0]):e&&n?e.lookup(n):null
}(t),t.index)).group.context=t.context,
t.context.group||(t.context.group=n.group),
n.source=this,n.clip=t.clip,n.interactive=t.interactive,this.value=n)
;var r=n.marktype===Ea?Qa:Za;return e.visit(e.ADD,(function(t){r.call(t,n)
})),(t.modified("clip")||t.modified("interactive"))&&(n.clip=t.clip,
n.interactive=!!t.interactive,n.zdirty=!0,e.reflow()),n.items=e.source,e}
;var Tc=$(Rc,Mr),Pc={parity:function(t){return t.filter((function(t,e){
return e%2?t.opacity=0:1}))},greedy:function(t){var e
;return t.filter((function(t,n){
return n&&Lc(e.bounds,t.bounds)?t.opacity=0:(e=t,1)}))}};function Lc(t,e){
return!(t.x2-1<e.x1||t.x1+1>e.x2||t.y2-1<e.y1||t.y1+1>e.y2)}function qc(t){
for(var e,n=1,r=t.length,i=t[0].bounds;n<r;i=e,
++n)if(Lc(i,e=t[n].bounds))return!0}function Uc(t){var e=t.bounds
;return e.width()>1&&e.height()>1}function Fc(t){return t.forEach((function(t){
t.opacity=1})),t}function jc(t,e){
return t.reflow(e.modified()).modifies("opacity")}function Ic(t){
Mr.call(this,null,t)}function $c(t,e){
for(var n=0,r=t.length;n<r;++n)e.push(t[n])}function Bc(t){return{x1:0,y1:0,
x2:t.width||0,y2:t.height||0}}function Wc(t){var e=t.bounds.clone()
;return e.empty()?e.set(0,0,0,0):e.translate(-(t.x||0),-(t.y||0))}
function Yc(t,e){
return"x1"===e?t.x||0:"y1"===e?t.y||0:"x2"===e?(t.x||0)+(t.width||0):"y2"===e?(t.y||0)+(t.height||0):void 0
}function Gc(t,e){return t.bounds[e]}function Hc(t,e,n){var r=u(t)?t[e]:t
;return null!=r?r:void 0!==n?n:0}function Vc(t){return t<0?Math.ceil(-t):0}
function Xc(t,e,n){var r,i,a,o,u,f,s,c,l,h,d,p,g=function(t){
for(var e,n,r=t.items,i=r.length,a=0,o={marks:[],rowheaders:[],rowfooters:[],
colheaders:[],colfooters:[],rowtitle:null,coltitle:null
};a<i;++a)if(n=(e=r[a]).items,e.marktype===Ea)switch(e.role){case Sa:case za:
break;case Da:$c(n,o.rowheaders);break;case Na:$c(n,o.rowfooters);break;case Ta:
$c(n,o.colheaders);break;case Pa:$c(n,o.colfooters);break;case Ra:
o.rowtitle=n[0];break;case La:o.coltitle=n[0];break;default:$c(n,o.marks)}
return o
}(e),v=g.marks,m="flush"===n.bounds,y=m?Bc:Wc,b=new Ga(0,0,0,0),_=Hc(n.align,Wa),x=Hc(n.align,Ya),w=Hc(n.padding,Wa),M=Hc(n.padding,Ya),k=n.offset,E=e.columns||n.columns||v.length,S=E<0?1:Math.ceil(v.length/E),A=S*E,C=[],O=[],z=0,D=[],N=[],R=0,T=v.length
;for(i=0;i<E;++i)O[i]=0;for(i=0;i<S;++i)N[i]=0
;for(i=0;i<T;++i)u=y(v[i]),a=i%E,o=~~(i/E),
s=Math.ceil(y(v[i]).x2),c=Math.ceil(y(v[i]).y2),z=Math.max(z,s),R=Math.max(R,c),
O[a]=Math.max(O[a],s),
N[o]=Math.max(N[o],c),C.push(w+Vc(u.x1)),D.push(M+Vc(u.y1)),t.dirty(v[i])
;for(i=0;i<T;++i)i%E==0&&(C[i]=0),i<E&&(D[i]=0);if(_===Ba)for(a=1;a<E;++a){
for(p=0,i=a;i<T;i+=E)p<C[i]&&(p=C[i]);for(i=a;i<T;i+=E)C[i]=p+O[a-1]
}else if(_===$a){for(p=0,i=0;i<T;++i)i%E&&p<C[i]&&(p=C[i])
;for(i=0;i<T;++i)i%E&&(C[i]=p+z)
}else for(_=!1,a=1;a<E;++a)for(i=a;i<T;i+=E)C[i]+=O[a-1]
;if(x===Ba)for(o=1;o<S;++o){for(p=0,r=(i=o*E)+E;i<r;++i)p<D[i]&&(p=D[i])
;for(i=o*E;i<r;++i)D[i]=p+N[o-1]}else if(x===$a){
for(p=0,i=E;i<T;++i)p<D[i]&&(p=D[i]);for(i=E;i<T;++i)D[i]=p+R
}else for(x=!1,o=1;o<S;++o)for(r=(i=o*E)+E;i<r;++i)D[i]+=N[o-1]
;for(l=0,i=0;i<T;++i)s=(f=v[i]).x||0,
f.x=l=C[i]+(i%E?l:0),f.bounds.translate(l-s,0)
;for(a=0;a<E;++a)for(h=0,i=a;i<T;i+=E)c=(f=v[i]).y||0,
f.y=h+=D[i],f.bounds.translate(0,h-c)
;if(Hc(n.center,Wa)&&S>1&&_)for(i=0;i<T;++i)f=v[i],
(l=(u=_===$a?z:O[i%E])-y(f).x2)>0&&(f.x+=s=l/2,f.bounds.translate(s,0))
;if(Hc(n.center,Ya)&&1!==E&&x)for(i=0;i<T;++i)f=v[i],
(h=(u=x===$a?R:N[~~(i/E)])-y(f).y2)>0&&(f.y+=c=h/2,f.bounds.translate(0,c))
;for(i=0;i<T;++i)v[i].mark.bounds.clear()
;for(i=0;i<T;++i)f=v[i],t.dirty(f),b.union(f.mark.bounds.union(f.bounds))
;function P(t,e){return Math.floor(Math.min(t,e))}function L(t,e){
return Math.ceil(Math.max(t,e))}
y=m?Yc:Gc,d=Hc(n.headerBand,Ya,null),l=Jc(t,g.rowheaders,v,E,S,-Hc(k,"rowHeader"),P,0,y,"x1",0,E,1,d),
d=Hc(n.headerBand,Wa,null),
h=Jc(t,g.colheaders,v,E,E,-Hc(k,"columnHeader"),P,1,y,"y1",0,1,E,d),
d=Hc(n.footerBand,Ya,null),
Jc(t,g.rowfooters,v,E,S,Hc(k,"rowFooter"),L,0,y,"x2",E-1,E,1,d),
d=Hc(n.footerBand,Wa,null),
Jc(t,g.colfooters,v,E,E,Hc(k,"columnFooter"),L,1,y,"y2",A-E,1,E,d),
g.rowtitle&&(p=l-Hc(k,"rowTitle"),
d=Hc(n.titleBand,Ya,.5),Zc(t,g.rowtitle,p,0,b,d)),
g.coltitle&&(p=h-Hc(k,"columnTitle"),
d=Hc(n.titleBand,Wa,.5),Zc(t,g.coltitle,p,1,b,d))}
function Jc(t,e,n,r,i,a,o,u,f,s,c,l,h,d){
var p,g,v,m,y,b,_,x,w,M=n.length,k=0,E=0;if(!M)return k
;for(p=c;p<M;p+=l)n[p]&&(k=o(k,f(n[p],s)));if(!e.length)return k
;for(e.length>i&&(t.warn("Grid headers exceed limit: "+i),
e=e.slice(0,i)),k+=a,g=0,
m=e.length;g<m;++g)t.dirty(e[g]),e[g].mark.bounds.clear()
;for(p=c,g=0,m=e.length;g<m;++g,p+=l){
for(y=(b=e[g]).mark.bounds,v=p;v>=0&&null==(_=n[v]);v-=h);
u?(x=null==d?_.x:Math.round(_.bounds.x1+d*_.bounds.width()),
w=k):(x=k,w=null==d?_.y:Math.round(_.bounds.y1+d*_.bounds.height())),
y.union(b.bounds.translate(x-(b.x||0),w-(b.y||0))),
b.x=x,b.y=w,t.dirty(b),E=o(E,y[s])}return E}function Zc(t,e,n,r,i,a){if(e){
t.dirty(e);var o=n,u=n
;r?o=Math.round(i.x1+a*i.width()):u=Math.round(i.y1+a*i.height()),
e.bounds.translate(o-(e.x||0),u-(e.y||0)),e.mark.bounds.clear().union(e.bounds),
e.x=o,e.y=u,t.dirty(e)}}Tc.transform=function(t,e){
var n,r,i=Pc[t.method]||Pc.parity,a=e.materialize(e.SOURCE).source;if(a){
if(!t.method)return t.modified("method")&&(Fc(a),e=jc(e,t)),e
;if(t.sort&&(a=a.slice().sort(t.sort)),
"greedy"===t.method&&(a=a.filter(Uc)),n=Fc(a),e=jc(e,t),n.length>=3&&qc(n)){do{
n=i(n)}while(n.length>=3&&qc(n))
;n.length<3&&!_(a).opacity&&(n.length>1&&(_(n).opacity=0),_(a).opacity=1)}
return t.boundScale&&t.boundTolerance>=0&&(r=function(t,e,n){
var r=t.range(),i=new Ga
;return e===_a||e===Ma?i.set(r[0],-1/0,r[1],1/0):i.set(-1/0,r[0],1/0,r[1]),
i.expand(n||1),function(t){return i.encloses(t.bounds)}
}(t.boundScale,t.boundOrient,+t.boundTolerance),a.forEach((function(t){
r(t)||(t.opacity=0)}))),e}},$(Ic,Mr).transform=function(t,e){var n=e.dataflow
;if(e.visit(e.ALL,(function(t){n.dirty(t)})),e.fields&&e.fields.zindex){
var r=e.source&&e.source[0];r&&(r.mark.zdirty=!0)}};var Qc=new Ga
;function Kc(t){Mr.call(this,null,t)}function tl(t,e,n){
return t[e]===n?0:(t[e]=n,1)}function el(t){var e=t.items[0].datum.orient
;return e===xa||e===wa}function nl(t,e,n,r){
var i,a,o=e.items[0],u=o.datum,f=u.orient,s=function(t){var e=+t.grid
;return[t.ticks?e++:-1,t.labels?e++:-1,e+ +t.domain]
}(u),c=o.range,l=o.offset,h=o.position,d=o.minExtent,p=o.maxExtent,g=u.title&&o.items[s[2]].items[0],v=o.titlePadding,m=o.bounds,y=0,b=0
;switch(Qc.clear().union(m),
m.clear(),(i=s[0])>-1&&m.union(o.items[i].bounds),(i=s[1])>-1&&m.union(o.items[i].bounds),
f){case _a:
y=h||0,b=-l,a=Math.max(d,Math.min(p,-m.y1)),g&&(a=rl(g,a,v,0,-1,m)),m.add(0,-a).add(c,0)
;break;case xa:
y=-l,b=h||0,a=Math.max(d,Math.min(p,-m.x1)),g&&(a=rl(g,a,v,1,-1,m)),
m.add(-a,0).add(0,c);break;case wa:
y=n+l,b=h||0,a=Math.max(d,Math.min(p,m.x2)),g&&(a=rl(g,a,v,1,1,m)),
m.add(0,0).add(a,c);break;case Ma:
y=h||0,b=r+l,a=Math.max(d,Math.min(p,m.y2)),g&&(a=rl(g,a,v,0,1,m)),
m.add(0,0).add(c,a);break;default:y=o.x,b=o.y}
return nf(m.translate(y,b),o),tl(o,"x",y+.5)|tl(o,"y",b+.5)&&(o.bounds=Qc,
t.dirty(o),o.bounds=m,t.dirty(o)),o.mark.bounds.clear().union(m)}
function rl(t,e,n,r,i,a){var o=t.bounds,u=0,f=0
;return t.auto?(e+=n,r?u=(t.x||0)-(t.x=i*e):f=(t.y||0)-(t.y=i*e),
o.translate(-u,-f),
t.mark.bounds.set(o.x1,o.y1,o.x2,o.y2),r?(a.add(0,o.y1).add(0,o.y2),
e+=o.width()):(a.add(o.x1,0).add(o.x2,0),e+=o.height())):a.union(o),e}
function il(t,e){return e.reduce((function(e,n){var r=n.items[0]
;if(function(t,e,n){var r=e.padding-n.x,i=e.padding-n.y;if(e.datum.title){
var a=e.items[1].items[0];i+=e.titlePadding+a.fontSize}
(r||i)&&(n.x+=r,n.y+=i,n.bounds.translate(r,i),
n.mark.bounds.translate(r,i),t.dirty(n))
}(t,r,r.items[0].items[0]),r.datum.orient===xa){var i=Qc.clear()
;r.items.forEach((function(t){i.union(t.bounds)
})),e=Math.max(e,Math.ceil(i.width()+2*r.padding-1))}return e}),0)}
function al(t,e,n,r,i,a,o){
var u,f,s,c=e.items[0],l=c.datum,h=l.orient,d=c.offset,p=c.bounds,g=0,v=0
;switch(h===_a||h===Ma?(s=i,
g=n[h]):h!==xa&&h!==wa||(s=r,v=n[h]),Qc.clear().union(p),
p.clear(),c.items.forEach((function(t){p.union(t.bounds)
})),u=2*c.padding-1,f=2*c.padding-1,
p.empty()||(u=Math.ceil(p.width()+u),f=Math.ceil(p.height()+f)),
"symbol"===l.type&&function(t){var e=t.reduce((function(t,e){
return t[e.column]=Math.max(e.bounds.x2-e.x,t[e.column]||0),t}),{})
;t.forEach((function(t){t.width=e[t.column],t.height=t.bounds.y2-t.y}))
}(c.items[0].items[0].items[0].items),h){case xa:
g-=n.leftWidth+d-Math.floor(s.x1),n.left+=f+n.margin;break;case wa:
g+=d+Math.ceil(s.x2),n.right+=f+n.margin;break;case _a:
v-=f+d-Math.floor(s.y1),n.top+=u+n.margin;break;case Ma:
v+=d+Math.ceil(s.y2),n.bottom+=u+n.margin;break;case"top-left":g+=d,v+=d;break
;case"top-right":g+=a-u-d,v+=d;break;case"bottom-left":g+=d,v+=o-f-d;break
;case"bottom-right":g+=a-u-d,v+=o-f-d;break;default:g=c.x,v=c.y}
return nf(p.set(g,v,g+u,v+f),c),
tl(c,"x",g)|tl(c,"width",u)|tl(c,"y",v)|tl(c,"height",f)&&(c.bounds=Qc,
t.dirty(c),c.bounds=p,t.dirty(c)),c.mark.bounds.clear().union(p)}
$(Kc,Mr).transform=function(t,e){var n=e.dataflow
;return t.mark.items.forEach((function(e){
t.layout&&Xc(n,e,t.layout),function(t,e,n){
var r,i,a,o,u,f,s=e.items,c=Math.max(0,e.width||0),l=Math.max(0,e.height||0),h=(new Ga).set(0,0,c,l),d=h.clone(),p=h.clone(),g=[]
;for(u=0,f=s.length;u<f;++u)switch((i=s[u]).role){case Sa:
(o=el(i)?d:p).union(nl(t,i,c,l));break;case Aa:r=i;break;case za:g.push(i);break
;case Ca:case Oa:case Da:case Na:case Ra:case Ta:case Pa:case La:
d.union(i.bounds),p.union(i.bounds);break;default:h.union(i.bounds)}
if(g.length)for(a={leftWidth:il(t,g),margin:n.legendMargin||8,left:0,right:0,
top:0,bottom:0
},u=0,f=g.length;u<f;++u)if(o=al(t,g[u],a,d,p,c,l),n.autosize&&n.autosize.type===Ua){
var v=g[u].items[0].datum.orient
;v===xa||v===wa?h.add(o.x1,0).add(o.x2,0):v!==_a&&v!==Ma||h.add(0,o.y1).add(0,o.y2)
}else h.union(o);h.union(d).union(p),r&&h.union(function(t,e,n,r,i){
var a,o=e.items[0],u=o.orient,f=o.frame,s=o.anchor,c=o.offset,l=o.bounds,h=0,d=u===xa||u===wa?r:n,p=0,g=0
;f!==Ea?u===xa?(h=i.y2,
d=i.y1):u===wa?(h=i.y1,d=i.y2):(h=i.x1,d=i.x2):u===xa&&(h=r,d=0)
;switch(a=s===ka?h:"end"===s?d:(h+d)/2,Qc.clear().union(l),u){case _a:
p=a,g=i.y1-c;break;case xa:p=i.x1-c,g=a;break;case wa:p=i.x2+c,g=a;break
;case Ma:p=a,g=i.y2+c;break;default:p=o.x,g=o.y}
l.translate(p-o.x,g-o.y),tl(o,"x",p)|tl(o,"y",g)&&(o.bounds=Qc,
t.dirty(o),o.bounds=l,t.dirty(o));return e.bounds.clear().union(l)}(t,r,c,l,h))
;!function(t,e,n,r){
var i=r.autosize||{},a=i.type,o=t._width,u=t._height,f=t.padding()
;if(t._autosize<1||!a)return
;var s=Math.max(0,e.width||0),c=Math.max(0,Math.ceil(-n.x1)),l=Math.max(0,Math.ceil(n.x2-s)),h=Math.max(0,e.height||0),d=Math.max(0,Math.ceil(-n.y1)),p=Math.max(0,Math.ceil(n.y2-h))
;i.contains===qa&&(o-=f.left+f.right,u-=f.top+f.bottom)
;a===Ia?(c=0,d=0,s=o,h=u):a===Ua?(s=Math.max(0,o-c-l),
h=Math.max(0,u-d-p)):a===Fa?(s=Math.max(0,o-c-l),
u=h+d+p):a===ja?(o=s+c+l,h=Math.max(0,u-d-p)):"pad"===a&&(o=s+c+l,u=h+d+p)
;t._resizeView(o,u,s,h,[c,d],i.resize)}(t,e,h,n)}(n,e,t)
})),t.modified()&&e.reflow(),e};var ol=Object.freeze({bound:Cc,identifier:Dc,
mark:Nc,overlap:Rc,render:Ic,viewlayout:Kc
}),ul="log",fl="pow",sl="sqrt",cl="band",ll="point",hl="linear",dl="ordinal",pl="quantile",gl="quantize",vl="threshold",ml="bin-ordinal",yl="sequential"
;function bl(t,e,n){var r=t-e+2*n;return t?r>0?r:1:0}function _l(t,e){
return t<e?-1:t>e?1:t>=e?0:NaN}function xl(t){
return 1===t.length&&(t=function(t){return function(e,n){return _l(t(e),n)}
}(t)),{left:function(e,n,r,i){for(null==r&&(r=0),null==i&&(i=e.length);r<i;){
var a=r+i>>>1;t(e[a],n)<0?r=a+1:i=a}return r},right:function(e,n,r,i){
for(null==r&&(r=0),null==i&&(i=e.length);r<i;){var a=r+i>>>1
;t(e[a],n)>0?i=a:r=a+1}return r}}}var wl=xl(_l).right;function Ml(t){
return null===t?NaN:+t}var kl=Math.sqrt(50),El=Math.sqrt(10),Sl=Math.sqrt(2)
;function Al(t,e,n){var r,i,a,o,u=-1;if(n=+n,(t=+t)===(e=+e)&&n>0)return[t]
;if((r=e<t)&&(i=t,t=e,e=i),0===(o=Cl(t,e,n))||!isFinite(o))return[]
;if(o>0)for(t=Math.ceil(t/o),
e=Math.floor(e/o),a=new Array(i=Math.ceil(e-t+1));++u<i;)a[u]=(t+u)*o;else for(t=Math.floor(t*o),
e=Math.ceil(e*o),a=new Array(i=Math.ceil(t-e+1));++u<i;)a[u]=(t-u)/o
;return r&&a.reverse(),a}function Cl(t,e,n){
var r=(e-t)/Math.max(0,n),i=Math.floor(Math.log(r)/Math.LN10),a=r/Math.pow(10,i)
;return i>=0?(a>=kl?10:a>=El?5:a>=Sl?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(a>=kl?10:a>=El?5:a>=Sl?2:1)
}function Ol(t,e,n){
var r=Math.abs(e-t)/Math.max(0,n),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),a=r/i
;return a>=kl?i*=10:a>=El?i*=5:a>=Sl&&(i*=2),e<t?-i:i}function zl(t,e,n){
if(null==n&&(n=Ml),r=t.length){if((e=+e)<=0||r<2)return+n(t[0],0,t)
;if(e>=1)return+n(t[r-1],r-1,t);var r,i=(r-1)*e,a=Math.floor(i),o=+n(t[a],a,t)
;return o+(+n(t[a+1],a+1,t)-o)*(i-a)}}var Dl="$";function Nl(){}
function Rl(t,e){var n=new Nl;if(t instanceof Nl)t.each((function(t,e){
n.set(e,t)}));else if(Array.isArray(t)){var r,i=-1,a=t.length
;if(null==e)for(;++i<a;)n.set(i,t[i]);else for(;++i<a;)n.set(e(r=t[i],i,t),r)
}else if(t)for(var o in t)n.set(o,t[o]);return n}function Tl(){
var t,e,n,r=[],i=[];function a(n,i,o,u){
if(i>=r.length)return null!=t&&n.sort(t),null!=e?e(n):n
;for(var f,s,c,l=-1,h=n.length,d=r[i++],p=Rl(),g=o();++l<h;)(c=p.get(f=d(s=n[l])+""))?c.push(s):p.set(f,[s])
;return p.each((function(t,e){u(g,e,a(t,i,o,u))})),g}return n={
object:function(t){return a(t,0,Pl,Ll)},map:function(t){return a(t,0,ql,Ul)},
entries:function(t){return function t(n,a){if(++a>r.length)return n
;var o,u=i[a-1]
;return null!=e&&a>=r.length?o=n.entries():(o=[],n.each((function(e,n){o.push({
key:n,values:t(e,a)})}))),null!=u?o.sort((function(t,e){return u(t.key,e.key)
})):o}(a(t,0,ql,Ul),0)},key:function(t){return r.push(t),n},
sortKeys:function(t){return i[r.length-1]=t,n},sortValues:function(e){
return t=e,n},rollup:function(t){return e=t,n}}}function Pl(){return{}}
function Ll(t,e,n){t[e]=n}function ql(){return Rl()}function Ul(t,e,n){
t.set(e,n)}function Fl(){}Nl.prototype=Rl.prototype={constructor:Nl,
has:function(t){return Dl+t in this},get:function(t){return this[Dl+t]},
set:function(t,e){return this[Dl+t]=e,this},remove:function(t){var e=Dl+t
;return e in this&&delete this[e]},clear:function(){
for(var t in this)t[0]===Dl&&delete this[t]},keys:function(){var t=[]
;for(var e in this)e[0]===Dl&&t.push(e.slice(1));return t},values:function(){
var t=[];for(var e in this)e[0]===Dl&&t.push(this[e]);return t},
entries:function(){var t=[];for(var e in this)e[0]===Dl&&t.push({key:e.slice(1),
value:this[e]});return t},size:function(){var t=0
;for(var e in this)e[0]===Dl&&++t;return t},empty:function(){
for(var t in this)if(t[0]===Dl)return!1;return!0},each:function(t){
for(var e in this)e[0]===Dl&&t(this[e],e.slice(1),this)}};var jl=Rl.prototype
;Fl.prototype=function(t,e){var n=new Fl;if(t instanceof Fl)t.each((function(t){
n.add(t)}));else if(t){var r=-1,i=t.length
;if(null==e)for(;++r<i;)n.add(t[r]);else for(;++r<i;)n.add(e(t[r],r,t))}return n
}.prototype={constructor:Fl,has:jl.has,add:function(t){
return this[Dl+(t+="")]=t,this},remove:jl.remove,clear:jl.clear,values:jl.keys,
size:jl.size,empty:jl.empty,each:jl.each}
;var Il=Array.prototype,$l=Il.map,Bl=Il.slice,Wl={name:"implicit"}
;function Yl(t){var e=Rl(),n=[],r=Wl;function i(i){var a=i+"",o=e.get(a);if(!o){
if(r!==Wl)return r;e.set(a,o=n.push(i))}return t[(o-1)%t.length]}
return t=null==t?[]:Bl.call(t),i.domain=function(t){
if(!arguments.length)return n.slice();n=[],e=Rl()
;for(var r,a,o=-1,u=t.length;++o<u;)e.has(a=(r=t[o])+"")||e.set(a,n.push(r))
;return i},i.range=function(e){
return arguments.length?(t=Bl.call(e),i):t.slice()},i.unknown=function(t){
return arguments.length?(r=t,i):r},i.copy=function(){
return Yl().domain(n).range(t).unknown(r)},i}function Gl(t,e,n){
t.prototype=e.prototype=n,n.constructor=t}function Hl(t,e){
var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}
function Vl(){}
var Xl=.7,Jl=1/Xl,Zl="\\s*([+-]?\\d+)\\s*",Ql="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",Kl="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",th=/^#([0-9a-f]{3})$/,eh=/^#([0-9a-f]{6})$/,nh=new RegExp("^rgb\\("+[Zl,Zl,Zl]+"\\)$"),rh=new RegExp("^rgb\\("+[Kl,Kl,Kl]+"\\)$"),ih=new RegExp("^rgba\\("+[Zl,Zl,Zl,Ql]+"\\)$"),ah=new RegExp("^rgba\\("+[Kl,Kl,Kl,Ql]+"\\)$"),oh=new RegExp("^hsl\\("+[Ql,Kl,Kl]+"\\)$"),uh=new RegExp("^hsla\\("+[Ql,Kl,Kl,Ql]+"\\)$"),fh={
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
whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function sh(t){var e
;return t=(t+"").trim().toLowerCase(),
(e=th.exec(t))?new ph((e=parseInt(e[1],16))>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):(e=eh.exec(t))?ch(parseInt(e[1],16)):(e=nh.exec(t))?new ph(e[1],e[2],e[3],1):(e=rh.exec(t))?new ph(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=ih.exec(t))?lh(e[1],e[2],e[3],e[4]):(e=ah.exec(t))?lh(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=oh.exec(t))?vh(e[1],e[2]/100,e[3]/100,1):(e=uh.exec(t))?vh(e[1],e[2]/100,e[3]/100,e[4]):fh.hasOwnProperty(t)?ch(fh[t]):"transparent"===t?new ph(NaN,NaN,NaN,0):null
}function ch(t){return new ph(t>>16&255,t>>8&255,255&t,1)}function lh(t,e,n,r){
return r<=0&&(t=e=n=NaN),new ph(t,e,n,r)}function hh(t){
return t instanceof Vl||(t=sh(t)),
t?new ph((t=t.rgb()).r,t.g,t.b,t.opacity):new ph}function dh(t,e,n,r){
return 1===arguments.length?hh(t):new ph(t,e,n,null==r?1:r)}
function ph(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}
function gh(t){
return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}
function vh(t,e,n,r){
return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new bh(t,e,n,r)}
function mh(t){if(t instanceof bh)return new bh(t.h,t.s,t.l,t.opacity)
;if(t instanceof Vl||(t=sh(t)),!t)return new bh;if(t instanceof bh)return t
;var e=(t=t.rgb()).r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),a=Math.max(e,n,r),o=NaN,u=a-i,f=(a+i)/2
;return u?(o=e===a?(n-r)/u+6*(n<r):n===a?(r-e)/u+2:(e-n)/u+4,
u/=f<.5?a+i:2-a-i,o*=60):u=f>0&&f<1?0:o,new bh(o,u,f,t.opacity)}
function yh(t,e,n,r){return 1===arguments.length?mh(t):new bh(t,e,n,null==r?1:r)
}function bh(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}
function _h(t,e,n){
return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}Gl(Vl,sh,{
displayable:function(){return this.rgb().displayable()},hex:function(){
return this.rgb().hex()},toString:function(){return this.rgb()+""}
}),Gl(ph,dh,Hl(Vl,{brighter:function(t){
return t=null==t?Jl:Math.pow(Jl,t),new ph(this.r*t,this.g*t,this.b*t,this.opacity)
},darker:function(t){
return t=null==t?Xl:Math.pow(Xl,t),new ph(this.r*t,this.g*t,this.b*t,this.opacity)
},rgb:function(){return this},displayable:function(){
return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1
},hex:function(){return"#"+gh(this.r)+gh(this.g)+gh(this.b)},
toString:function(){var t=this.opacity
;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")
}})),Gl(bh,yh,Hl(Vl,{brighter:function(t){
return t=null==t?Jl:Math.pow(Jl,t),new bh(this.h,this.s,this.l*t,this.opacity)},
darker:function(t){
return t=null==t?Xl:Math.pow(Xl,t),new bh(this.h,this.s,this.l*t,this.opacity)},
rgb:function(){
var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r
;return new ph(_h(t>=240?t-240:t+120,i,r),_h(t,i,r),_h(t<120?t+240:t-120,i,r),this.opacity)
},displayable:function(){
return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1
}}))
;var xh=Math.PI/180,wh=180/Math.PI,Mh=.96422,kh=.82521,Eh=4/29,Sh=6/29,Ah=3*Sh*Sh
;function Ch(t){if(t instanceof zh)return new zh(t.l,t.a,t.b,t.opacity)
;if(t instanceof qh){if(isNaN(t.h))return new zh(t.l,0,0,t.opacity);var e=t.h*xh
;return new zh(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}
t instanceof ph||(t=hh(t))
;var n,r,i=Th(t.r),a=Th(t.g),o=Th(t.b),u=Dh((.2225045*i+.7168786*a+.0606169*o)/1)
;return i===a&&a===o?n=r=u:(n=Dh((.4360747*i+.3850649*a+.1430804*o)/Mh),
r=Dh((.0139322*i+.0971045*a+.7141733*o)/kh)),
new zh(116*u-16,500*(n-u),200*(u-r),t.opacity)}function Oh(t,e,n,r){
return 1===arguments.length?Ch(t):new zh(t,e,n,null==r?1:r)}
function zh(t,e,n,r){this.l=+t,this.a=+e,this.b=+n,this.opacity=+r}
function Dh(t){return t>.008856451679035631?Math.pow(t,1/3):t/Ah+Eh}
function Nh(t){return t>Sh?t*t*t:Ah*(t-Eh)}function Rh(t){
return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Th(t){
return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Ph(t){
if(t instanceof qh)return new qh(t.h,t.c,t.l,t.opacity)
;if(t instanceof zh||(t=Ch(t)),
0===t.a&&0===t.b)return new qh(NaN,0,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*wh
;return new qh(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}
function Lh(t,e,n,r){return 1===arguments.length?Ph(t):new qh(t,e,n,null==r?1:r)
}function qh(t,e,n,r){this.h=+t,this.c=+e,this.l=+n,this.opacity=+r}
Gl(zh,Oh,Hl(Vl,{brighter:function(t){
return new zh(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},
darker:function(t){
return new zh(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},
rgb:function(){
var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200
;return new ph(Rh(3.1338561*(e=Mh*Nh(e))-1.6168667*(t=1*Nh(t))-.4906146*(n=kh*Nh(n))),Rh(-.9787684*e+1.9161415*t+.033454*n),Rh(.0719453*e-.2289914*t+1.4052427*n),this.opacity)
}})),Gl(qh,Lh,Hl(Vl,{brighter:function(t){
return new qh(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},
darker:function(t){
return new qh(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},
rgb:function(){return Ch(this).rgb()}}))
;var Uh=-.14861,Fh=1.78277,jh=-.29227,Ih=-.90649,$h=1.97294,Bh=$h*Ih,Wh=$h*Fh,Yh=Fh*jh-Ih*Uh
;function Gh(t){if(t instanceof Vh)return new Vh(t.h,t.s,t.l,t.opacity)
;t instanceof ph||(t=hh(t))
;var e=t.r/255,n=t.g/255,r=t.b/255,i=(Yh*r+Bh*e-Wh*n)/(Yh+Bh-Wh),a=r-i,o=($h*(n-i)-jh*a)/Ih,u=Math.sqrt(o*o+a*a)/($h*i*(1-i)),f=u?Math.atan2(o,a)*wh-120:NaN
;return new Vh(f<0?f+360:f,u,i,t.opacity)}function Hh(t,e,n,r){
return 1===arguments.length?Gh(t):new Vh(t,e,n,null==r?1:r)}
function Vh(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}
function Xh(t,e,n,r,i){var a=t*t,o=a*t
;return((1-3*t+3*a-o)*e+(4-6*a+3*o)*n+(1+3*t+3*a-3*o)*r+o*i)/6}function Jh(t){
var e=t.length-1;return function(n){
var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),i=t[r],a=t[r+1],o=r>0?t[r-1]:2*i-a,u=r<e-1?t[r+2]:2*a-i
;return Xh((n-r/e)*e,o,i,a,u)}}function Zh(t){var e=t.length;return function(n){
var r=Math.floor(((n%=1)<0?++n:n)*e),i=t[(r+e-1)%e],a=t[r%e],o=t[(r+1)%e],u=t[(r+2)%e]
;return Xh((n-r/e)*e,i,a,o,u)}}function Qh(t){return function(){return t}}
function Kh(t,e){return function(n){return t+n*e}}function td(t,e){var n=e-t
;return n?Kh(t,n>180||n<-180?n-360*Math.round(n/360):n):Qh(isNaN(t)?e:t)}
function ed(t){return 1==(t=+t)?nd:function(e,n){return n-e?function(t,e,n){
return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){
return Math.pow(t+r*e,n)}}(e,n,t):Qh(isNaN(e)?n:e)}}function nd(t,e){var n=e-t
;return n?Kh(t,n):Qh(isNaN(t)?e:t)}Gl(Vh,Hh,Hl(Vl,{brighter:function(t){
return t=null==t?Jl:Math.pow(Jl,t),new Vh(this.h,this.s,this.l*t,this.opacity)},
darker:function(t){
return t=null==t?Xl:Math.pow(Xl,t),new Vh(this.h,this.s,this.l*t,this.opacity)},
rgb:function(){
var t=isNaN(this.h)?0:(this.h+120)*xh,e=+this.l,n=isNaN(this.s)?0:this.s*e*(1-e),r=Math.cos(t),i=Math.sin(t)
;return new ph(255*(e+n*(Uh*r+Fh*i)),255*(e+n*(jh*r+Ih*i)),255*(e+n*($h*r)),this.opacity)
}}));var rd=function t(e){var n=ed(e);function r(t,e){
var r=n((t=dh(t)).r,(e=dh(e)).r),i=n(t.g,e.g),a=n(t.b,e.b),o=nd(t.opacity,e.opacity)
;return function(e){return t.r=r(e),t.g=i(e),t.b=a(e),t.opacity=o(e),t+""}}
return r.gamma=t,r}(1);function id(t){return function(e){
var n,r,i=e.length,a=new Array(i),o=new Array(i),u=new Array(i)
;for(n=0;n<i;++n)r=dh(e[n]),a[n]=r.r||0,o[n]=r.g||0,u[n]=r.b||0
;return a=t(a),o=t(o),u=t(u),r.opacity=1,function(t){
return r.r=a(t),r.g=o(t),r.b=u(t),r+""}}}var ad=id(Jh),od=id(Zh)
;function ud(t,e){
var n,r=e?e.length:0,i=t?Math.min(r,t.length):0,a=new Array(i),o=new Array(r)
;for(n=0;n<i;++n)a[n]=pd(t[n],e[n]);for(;n<r;++n)o[n]=e[n];return function(t){
for(n=0;n<i;++n)o[n]=a[n](t);return o}}function fd(t,e){var n=new Date
;return e-=t=+t,function(r){return n.setTime(t+e*r),n}}function sd(t,e){
return e-=t=+t,function(n){return t+e*n}}function cd(t,e){var n,r={},i={}
;for(n in null!==t&&"object"==typeof t||(t={}),
null!==e&&"object"==typeof e||(e={}),e)n in t?r[n]=pd(t[n],e[n]):i[n]=e[n]
;return function(t){for(n in r)i[n]=r[n](t);return i}}
var ld=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,hd=new RegExp(ld.source,"g")
;function dd(t,e){var n,r,i,a=ld.lastIndex=hd.lastIndex=0,o=-1,u=[],f=[]
;for(t+="",e+="";(n=ld.exec(t))&&(r=hd.exec(e));)(i=r.index)>a&&(i=e.slice(a,i),
u[o]?u[o]+=i:u[++o]=i),
(n=n[0])===(r=r[0])?u[o]?u[o]+=r:u[++o]=r:(u[++o]=null,f.push({i:o,x:sd(n,r)})),
a=hd.lastIndex
;return a<e.length&&(i=e.slice(a),u[o]?u[o]+=i:u[++o]=i),u.length<2?f[0]?function(t){
return function(e){return t(e)+""}}(f[0].x):function(t){return function(){
return t}}(e):(e=f.length,function(t){for(var n,r=0;r<e;++r)u[(n=f[r]).i]=n.x(t)
;return u.join("")})}function pd(t,e){var n,r=typeof e
;return null==e||"boolean"===r?Qh(e):("number"===r?sd:"string"===r?(n=sh(e))?(e=n,
rd):dd:e instanceof sh?rd:e instanceof Date?fd:Array.isArray(e)?ud:"function"!=typeof e.valueOf&&"function"!=typeof e.toString||isNaN(e)?cd:sd)(t,e)
}function gd(t,e){return e-=t=+t,function(n){return Math.round(t+e*n)}}
var vd,md,yd,bd,_d=180/Math.PI,xd={translateX:0,translateY:0,rotate:0,skewX:0,
scaleX:1,scaleY:1};function wd(t,e,n,r,i,a){var o,u,f
;return(o=Math.sqrt(t*t+e*e))&&(t/=o,
e/=o),(f=t*n+e*r)&&(n-=t*f,r-=e*f),(u=Math.sqrt(n*n+r*r))&&(n/=u,
r/=u,f/=u),t*r<e*n&&(t=-t,e=-e,f=-f,o=-o),{translateX:i,translateY:a,
rotate:Math.atan2(e,t)*_d,skewX:Math.atan(f)*_d,scaleX:o,scaleY:u}}
function Md(t,e,n,r){function i(t){return t.length?t.pop()+" ":""}
return function(a,o){var u=[],f=[];return a=t(a),o=t(o),function(t,r,i,a,o,u){
if(t!==i||r!==a){var f=o.push("translate(",null,e,null,n);u.push({i:f-4,
x:sd(t,i)},{i:f-2,x:sd(r,a)})}else(i||a)&&o.push("translate("+i+e+a+n)
}(a.translateX,a.translateY,o.translateX,o.translateY,u,f),function(t,e,n,a){
t!==e?(t-e>180?e+=360:e-t>180&&(t+=360),a.push({
i:n.push(i(n)+"rotate(",null,r)-2,x:sd(t,e)})):e&&n.push(i(n)+"rotate("+e+r)
}(a.rotate,o.rotate,u,f),function(t,e,n,a){t!==e?a.push({
i:n.push(i(n)+"skewX(",null,r)-2,x:sd(t,e)}):e&&n.push(i(n)+"skewX("+e+r)
}(a.skewX,o.skewX,u,f),function(t,e,n,r,a,o){if(t!==n||e!==r){
var u=a.push(i(a)+"scale(",null,",",null,")");o.push({i:u-4,x:sd(t,n)},{i:u-2,
x:sd(e,r)})}else 1===n&&1===r||a.push(i(a)+"scale("+n+","+r+")")
}(a.scaleX,a.scaleY,o.scaleX,o.scaleY,u,f),a=o=null,function(t){
for(var e,n=-1,r=f.length;++n<r;)u[(e=f[n]).i]=e.x(t);return u.join("")}}}
var kd=Md((function(t){
return"none"===t?xd:(vd||(vd=document.createElement("DIV"),
md=document.documentElement,
yd=document.defaultView),vd.style.transform=t,t=yd.getComputedStyle(md.appendChild(vd),null).getPropertyValue("transform"),
md.removeChild(vd),
wd(+(t=t.slice(7,-1).split(","))[0],+t[1],+t[2],+t[3],+t[4],+t[5]))
}),"px, ","px)","deg)"),Ed=Md((function(t){
return null==t?xd:(bd||(bd=document.createElementNS("http://www.w3.org/2000/svg","g")),
bd.setAttribute("transform",t),
(t=bd.transform.baseVal.consolidate())?wd((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):xd)
}),", ",")",")"),Sd=Math.SQRT2;function Ad(t){return((t=Math.exp(t))+1/t)/2}
function Cd(t){return function(e,n){
var r=t((e=yh(e)).h,(n=yh(n)).h),i=nd(e.s,n.s),a=nd(e.l,n.l),o=nd(e.opacity,n.opacity)
;return function(t){return e.h=r(t),e.s=i(t),e.l=a(t),e.opacity=o(t),e+""}}}
var Od=Cd(td),zd=Cd(nd);function Dd(t){return function(e,n){
var r=t((e=Lh(e)).h,(n=Lh(n)).h),i=nd(e.c,n.c),a=nd(e.l,n.l),o=nd(e.opacity,n.opacity)
;return function(t){return e.h=r(t),e.c=i(t),e.l=a(t),e.opacity=o(t),e+""}}}
var Nd=Dd(td),Rd=Dd(nd);function Td(t){return function e(n){function r(e,r){
var i=t((e=Hh(e)).h,(r=Hh(r)).h),a=nd(e.s,r.s),o=nd(e.l,r.l),u=nd(e.opacity,r.opacity)
;return function(t){
return e.h=i(t),e.s=a(t),e.l=o(Math.pow(t,n)),e.opacity=u(t),e+""}}
return n=+n,r.gamma=e,r}(1)}var Pd=Td(td),Ld=Td(nd);var qd=Object.freeze({
interpolate:pd,interpolateArray:ud,interpolateBasis:Jh,
interpolateBasisClosed:Zh,interpolateDate:fd,interpolateDiscrete:function(t){
var e=t.length;return function(n){
return t[Math.max(0,Math.min(e-1,Math.floor(n*e)))]}},
interpolateHue:function(t,e){var n=td(+t,+e);return function(t){var e=n(t)
;return e-360*Math.floor(e/360)}},interpolateNumber:sd,interpolateObject:cd,
interpolateRound:gd,interpolateString:dd,interpolateTransformCss:kd,
interpolateTransformSvg:Ed,interpolateZoom:function(t,e){
var n,r,i=t[0],a=t[1],o=t[2],u=e[0],f=e[1],s=e[2],c=u-i,l=f-a,h=c*c+l*l
;if(h<1e-12)r=Math.log(s/o)/Sd,n=function(t){
return[i+t*c,a+t*l,o*Math.exp(Sd*t*r)]};else{
var d=Math.sqrt(h),p=(s*s-o*o+4*h)/(2*o*2*d),g=(s*s-o*o-4*h)/(2*s*2*d),v=Math.log(Math.sqrt(p*p+1)-p),m=Math.log(Math.sqrt(g*g+1)-g)
;r=(m-v)/Sd,n=function(t){var e=t*r,n=Ad(v),u=o/(2*d)*(n*function(t){
return((t=Math.exp(2*t))-1)/(t+1)}(Sd*e+v)-function(t){
return((t=Math.exp(t))-1/t)/2}(v));return[i+u*c,a+u*l,o*n/Ad(Sd*e+v)]}}
return n.duration=1e3*r,n},interpolateRgb:rd,interpolateRgbBasis:ad,
interpolateRgbBasisClosed:od,interpolateHsl:Od,interpolateHslLong:zd,
interpolateLab:function(t,e){
var n=nd((t=Oh(t)).l,(e=Oh(e)).l),r=nd(t.a,e.a),i=nd(t.b,e.b),a=nd(t.opacity,e.opacity)
;return function(e){return t.l=n(e),t.a=r(e),t.b=i(e),t.opacity=a(e),t+""}},
interpolateHcl:Nd,interpolateHclLong:Rd,interpolateCubehelix:Pd,
interpolateCubehelixLong:Ld,piecewise:function(t,e){
for(var n=0,r=e.length-1,i=e[0],a=new Array(r<0?0:r);n<r;)a[n]=t(i,i=e[++n])
;return function(t){var e=Math.max(0,Math.min(r-1,Math.floor(t*=r)))
;return a[e](t-e)}},quantize:function(t,e){
for(var n=new Array(e),r=0;r<e;++r)n[r]=t(r/(e-1));return n}});function Ud(t){
return function(){return t}}function Fd(t){return+t}var jd=[0,1]
;function Id(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:Ud(e)}
function $d(t,e,n,r){var i=t[0],a=t[1],o=e[0],u=e[1]
;return a<i?(i=n(a,i),o=r(u,o)):(i=n(i,a),o=r(o,u)),function(t){return o(i(t))}}
function Bd(t,e,n,r){
var i=Math.min(t.length,e.length)-1,a=new Array(i),o=new Array(i),u=-1
;for(t[i]<t[0]&&(t=t.slice().reverse(),
e=e.slice().reverse());++u<i;)a[u]=n(t[u],t[u+1]),o[u]=r(e[u],e[u+1])
;return function(e){var n=wl(t,e,1,i)-1;return o[n](a[n](e))}}function Wd(t,e){
return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
}function Yd(t,e){var n,r,i,a=jd,o=jd,u=pd,f=!1;function s(){
return n=Math.min(a.length,o.length)>2?Bd:$d,r=i=null,c}function c(e){
return(r||(r=n(a,o,f?function(t){return function(e,n){var r=t(e=+e,n=+n)
;return function(t){return t<=e?0:t>=n?1:r(t)}}}(t):t,u)))(+e)}
return c.invert=function(t){return(i||(i=n(o,a,Id,f?function(t){
return function(e,n){var r=t(e=+e,n=+n);return function(t){
return t<=0?e:t>=1?n:r(t)}}}(e):e)))(+t)},c.domain=function(t){
return arguments.length?(a=$l.call(t,Fd),s()):a.slice()},c.range=function(t){
return arguments.length?(o=Bl.call(t),s()):o.slice()},c.rangeRound=function(t){
return o=Bl.call(t),u=gd,s()},c.clamp=function(t){
return arguments.length?(f=!!t,s()):f},c.interpolate=function(t){
return arguments.length?(u=t,s()):u},s()}function Gd(t,e){
if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null
;var n,r=t.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]}
function Hd(t){return(t=Gd(Math.abs(t)))?t[1]:NaN}
var Vd,Xd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i
;function Jd(t){return new Zd(t)}function Zd(t){
if(!(e=Xd.exec(t)))throw new Error("invalid format: "+t);var e
;this.fill=e[1]||" ",
this.align=e[2]||">",this.sign=e[3]||"-",this.symbol=e[4]||"",
this.zero=!!e[5],this.width=e[6]&&+e[6],
this.comma=!!e[7],this.precision=e[8]&&+e[8].slice(1),
this.trim=!!e[9],this.type=e[10]||""}function Qd(t,e){var n=Gd(t,e)
;if(!n)return t+"";var r=n[0],i=n[1]
;return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")
}Jd.prototype=Zd.prototype,Zd.prototype.toString=function(){
return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type
};var Kd={"%":function(t,e){return(100*t).toFixed(e)},b:function(t){
return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){
return Math.round(t).toString(10)},e:function(t,e){return t.toExponential(e)},
f:function(t,e){return t.toFixed(e)},g:function(t,e){return t.toPrecision(e)},
o:function(t){return Math.round(t).toString(8)},p:function(t,e){
return Qd(100*t,e)},r:Qd,s:function(t,e){var n=Gd(t,e);if(!n)return t+""
;var r=n[0],i=n[1],a=i-(Vd=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,o=r.length
;return a===o?r:a>o?r+new Array(a-o+1).join("0"):a>0?r.slice(0,a)+"."+r.slice(a):"0."+new Array(1-a).join("0")+Gd(t,Math.max(0,e+a-1))[0]
},X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){
return Math.round(t).toString(16)}};function tp(t){return t}
var ep,np,rp,ip=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"]
;function ap(t){var e=t.grouping&&t.thousands?function(t,e){
return function(n,r){
for(var i=n.length,a=[],o=0,u=t[0],f=0;i>0&&u>0&&(f+u+1>r&&(u=Math.max(1,r-f)),
a.push(n.substring(i-=u,i+u)),!((f+=u+1)>r));)u=t[o=(o+1)%t.length]
;return a.reverse().join(e)}
}(t.grouping,t.thousands):tp,n=t.currency,r=t.decimal,i=t.numerals?function(t){
return function(e){return e.replace(/[0-9]/g,(function(e){return t[+e]}))}
}(t.numerals):tp,a=t.percent||"%";function o(t){
var o=(t=Jd(t)).fill,u=t.align,f=t.sign,s=t.symbol,c=t.zero,l=t.width,h=t.comma,d=t.precision,p=t.trim,g=t.type
;"n"===g?(h=!0,
g="g"):Kd[g]||(null==d&&(d=12),p=!0,g="g"),(c||"0"===o&&"="===u)&&(c=!0,
o="0",u="=")
;var v="$"===s?n[0]:"#"===s&&/[boxX]/.test(g)?"0"+g.toLowerCase():"",m="$"===s?n[1]:/[%p]/.test(g)?a:"",y=Kd[g],b=/[defgprs%]/.test(g)
;function _(t){var n,a,s,_=v,x=m;if("c"===g)x=y(t)+x,t="";else{var w=(t=+t)<0
;if(t=y(Math.abs(t),d),p&&(t=function(t){
t:for(var e,n=t.length,r=1,i=-1;r<n;++r)switch(t[r]){case".":i=e=r;break
;case"0":0===i&&(i=r),e=r;break;default:if(i>0){if(!+t[r])break t;i=0}}
return i>0?t.slice(0,i)+t.slice(e+1):t
}(t)),w&&0==+t&&(w=!1),_=(w?"("===f?f:"-":"-"===f||"("===f?"":f)+_,
x=("s"===g?ip[8+Vd/3]:"")+x+(w&&"("===f?")":""),
b)for(n=-1,a=t.length;++n<a;)if(48>(s=t.charCodeAt(n))||s>57){
x=(46===s?r+t.slice(n+1):t.slice(n))+x,t=t.slice(0,n);break}}h&&!c&&(t=e(t,1/0))
;var M=_.length+t.length+x.length,k=M<l?new Array(l-M+1).join(o):""
;switch(h&&c&&(t=e(k+t,k.length?l-x.length:1/0),k=""),u){case"<":t=_+t+x+k;break
;case"=":t=_+k+t+x;break;case"^":t=k.slice(0,M=k.length>>1)+_+t+x+k.slice(M)
;break;default:t=k+_+t+x}return i(t)}
return d=null==d?6:/[gprs]/.test(g)?Math.max(1,Math.min(21,d)):Math.max(0,Math.min(20,d)),
_.toString=function(){return t+""},_}return{format:o,formatPrefix:function(t,e){
var n=o(((t=Jd(t)).type="f",
t)),r=3*Math.max(-8,Math.min(8,Math.floor(Hd(e)/3))),i=Math.pow(10,-r),a=ip[8+r/3]
;return function(t){return n(i*t)+a}}}}function op(t){
return ep=ap(t),np=ep.format,rp=ep.formatPrefix,ep}function up(t,e,n){
var r,i=t[0],a=t[t.length-1],o=Ol(i,a,null==e?10:e)
;switch((n=Jd(null==n?",f":n)).type){case"s":
var u=Math.max(Math.abs(i),Math.abs(a))
;return null!=n.precision||isNaN(r=function(t,e){
return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Hd(e)/3)))-Hd(Math.abs(t)))
}(o,u))||(n.precision=r),rp(n,u);case"":case"e":case"g":case"p":case"r":
null!=n.precision||isNaN(r=function(t,e){
return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,Hd(e)-Hd(t))+1
}(o,Math.max(Math.abs(i),Math.abs(a))))||(n.precision=r-("e"===n.type));break
;case"f":case"%":null!=n.precision||isNaN(r=function(t){
return Math.max(0,-Hd(Math.abs(t)))}(o))||(n.precision=r-2*("%"===n.type))}
return np(n)}function fp(t){var e=t.domain;return t.ticks=function(t){var n=e()
;return Al(n[0],n[n.length-1],null==t?10:t)},t.tickFormat=function(t,n){
return up(e(),t,n)},t.nice=function(n){null==n&&(n=10)
;var r,i=e(),a=0,o=i.length-1,u=i[a],f=i[o]
;return f<u&&(r=u,u=f,f=r,r=a,a=o,o=r),
(r=Cl(u,f,n))>0?r=Cl(u=Math.floor(u/r)*r,f=Math.ceil(f/r)*r,n):r<0&&(r=Cl(u=Math.ceil(u*r)/r,f=Math.floor(f*r)/r,n)),
r>0?(i[a]=Math.floor(u/r)*r,
i[o]=Math.ceil(f/r)*r,e(i)):r<0&&(i[a]=Math.ceil(u*r)/r,
i[o]=Math.floor(f*r)/r,e(i)),t},t}function sp(){var t=Yd(Id,sd)
;return t.copy=function(){return Wd(t,sp())},fp(t)}function cp(t,e){
var n,r=0,i=(t=t.slice()).length-1,a=t[r],o=t[i]
;return o<a&&(n=r,r=i,i=n,n=a,a=o,o=n),t[r]=e.floor(a),t[i]=e.ceil(o),t}
function lp(t,e){return(e=Math.log(e/t))?function(n){return Math.log(n/t)/e
}:Ud(e)}function hp(t,e){return t<0?function(n){
return-Math.pow(-e,n)*Math.pow(-t,1-n)}:function(n){
return Math.pow(e,n)*Math.pow(t,1-n)}}function dp(t){
return isFinite(t)?+("1e"+t):t<0?0:t}function pp(t){
return 10===t?dp:t===Math.E?Math.exp:function(e){return Math.pow(t,e)}}
function gp(t){
return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),
function(e){return Math.log(e)/t})}function vp(t){return function(e){
return-t(-e)}}function mp(t,e){return t<0?-Math.pow(-t,e):Math.pow(t,e)}
function yp(){var t=1,e=Yd((function(e,n){
return(n=mp(n,t)-(e=mp(e,t)))?function(r){return(mp(r,t)-e)/n}:Ud(n)
}),(function(e,n){return n=mp(n,t)-(e=mp(e,t)),function(r){return mp(e+n*r,1/t)}
})),n=e.domain;return e.exponent=function(e){
return arguments.length?(t=+e,n(n())):t},e.copy=function(){
return Wd(e,yp().exponent(t))},fp(e)}op({decimal:".",thousands:",",grouping:[3],
currency:["$",""]});var bp=1e3,_p=6e4,xp=36e5,wp=864e5,Mp=2592e6,kp=31536e6
;function Ep(t){return new Date(t)}function Sp(t){
return t instanceof Date?+t:+new Date(+t)}function Ap(t,e,n,r,i,a,o,u,f){
var s=Yd(Id,sd),c=s.invert,l=s.domain,h=f(".%L"),d=f(":%S"),p=f("%I:%M"),g=f("%I %p"),v=f("%a %d"),m=f("%b %d"),y=f("%B"),b=f("%Y"),_=[[o,1,bp],[o,5,5e3],[o,15,15e3],[o,30,3e4],[a,1,_p],[a,5,3e5],[a,15,9e5],[a,30,18e5],[i,1,xp],[i,3,108e5],[i,6,216e5],[i,12,432e5],[r,1,wp],[r,2,1728e5],[n,1,6048e5],[e,1,Mp],[e,3,7776e6],[t,1,kp]]
;function x(u){
return(o(u)<u?h:a(u)<u?d:i(u)<u?p:r(u)<u?g:e(u)<u?n(u)<u?v:m:t(u)<u?y:b)(u)}
function w(e,n,r,i){if(null==e&&(e=10),"number"==typeof e){
var a=Math.abs(r-n)/e,o=xl((function(t){return t[2]})).right(_,a)
;o===_.length?(i=Ol(n/kp,r/kp,e),
e=t):o?(i=(o=_[a/_[o-1][2]<_[o][2]/a?o-1:o])[1],
e=o[0]):(i=Math.max(Ol(n,r,e),1),e=u)}return null==i?e:e.every(i)}
return s.invert=function(t){return new Date(c(t))},s.domain=function(t){
return arguments.length?l($l.call(t,Sp)):l().map(Ep)},s.ticks=function(t,e){
var n,r=l(),i=r[0],a=r[r.length-1],o=a<i
;return o&&(n=i,i=a,a=n),n=(n=w(t,i,a,e))?n.range(i,a+1):[],o?n.reverse():n
},s.tickFormat=function(t,e){return null==e?x:f(e)},s.nice=function(t,e){
var n=l();return(t=w(t,n[0],n[n.length-1],e))?l(cp(n,t)):s},s.copy=function(){
return Wd(s,Ap(t,e,n,r,i,a,o,u,f))},s}function Cp(){
var t,e,n=Yl().unknown(void 0),r=n.domain,i=n.range,a=[0,1],o=!1,u=0,f=0,s=.5
;function c(){var n=r().length,c=a[1]<a[0],l=a[c-0],h=a[1-c],d=bl(n,u,f)
;t=(h-l)/(d||1),
o&&(t=Math.floor(t)),l+=(h-l-t*(n-u))*s,e=t*(1-u),o&&(l=Math.round(l),
e=Math.round(e));var p=Yr(n).map((function(e){return l+t*e}))
;return i(c?p.reverse():p)}return delete n.unknown,n.domain=function(t){
return arguments.length?(r(t),c()):r()},n.range=function(t){
return arguments.length?(a=[+t[0],+t[1]],c()):a.slice()
},n.rangeRound=function(t){return a=[+t[0],+t[1]],o=!0,c()
},n.bandwidth=function(){return e},n.step=function(){return t
},n.round=function(t){return arguments.length?(o=!!t,c()):o
},n.padding=function(t){
return arguments.length?(f=Math.max(0,Math.min(1,t)),u=f,c()):u
},n.paddingInner=function(t){
return arguments.length?(u=Math.max(0,Math.min(1,t)),c()):u
},n.paddingOuter=function(t){
return arguments.length?(f=Math.max(0,Math.min(1,t)),c()):f
},n.align=function(t){
return arguments.length?(s=Math.max(0,Math.min(1,t)),c()):s
},n.invertRange=function(t){if(null!=t[0]&&null!=t[1]){
var n,o,u,f=+t[0],s=+t[1],c=a[1]<a[0],l=c?i().reverse():i(),h=l.length-1
;if(f==f&&s==s&&(s<f&&(u=f,
f=s,s=u),!(s<l[0]||f>a[1-c])))return n=Math.max(0,$r(l,f)-1),
o=f===s?n:$r(l,s)-1,
f-l[n]>e+1e-10&&++n,c&&(u=n,n=h-o,o=h-u),n>o?void 0:r().slice(n,o+1)}
},n.invert=function(t){var e=n.invertRange([t,t]);return e?e[0]:e
},n.copy=function(){
return Cp().domain(r()).range(a).round(o).paddingInner(u).paddingOuter(f).align(s)
},c()}var Op=Array.prototype.map,zp=Array.prototype.slice;function Dp(t){
return Op.call(t,(function(t){return+t}))}function Np(t,e){return function(){
var n=e();return n.invertRange||(n.invertRange=n.invert?function(t){
return function(e){var n,r=e[0],i=e[1]
;return i<r&&(n=r,r=i,i=n),[t.invert(r),t.invert(i)]}
}(n):n.invertExtent?function(t){return function(e){
var n,r,i,a,o=t.range(),u=e[0],f=e[1],s=-1
;for(f<u&&(r=u,u=f,f=r),i=0,a=o.length;i<a;++i)o[i]>=u&&o[i]<=f&&(s<0&&(s=i),
n=i)
;if(!(s<0))return u=t.invertExtent(o[s]),f=t.invertExtent(o[n]),[void 0===u[0]?u[1]:u[0],void 0===f[1]?f[0]:f[1]]
}}(n):void 0),n.type=t,n}}function Rp(t,e){
return arguments.length>1?(Tp[t]=Np(t,e),this):Tp.hasOwnProperty(t)?Tp[t]:void 0
}var Tp={identity:function t(){var e=[0,1];function n(t){return+t}
return n.invert=n,n.domain=n.range=function(t){
return arguments.length?(e=$l.call(t,Fd),n):e.slice()},n.copy=function(){
return t().domain(e)},fp(n)},linear:sp,log:function t(){
var e=Yd(lp,hp).domain([1,10]),n=e.domain,r=10,i=gp(10),a=pp(10);function o(){
return i=gp(r),a=pp(r),n()[0]<0&&(i=vp(i),a=vp(a)),e}return e.base=function(t){
return arguments.length?(r=+t,o()):r},e.domain=function(t){
return arguments.length?(n(t),o()):n()},e.ticks=function(t){
var e,o=n(),u=o[0],f=o[o.length-1];(e=f<u)&&(h=u,u=f,f=h)
;var s,c,l,h=i(u),d=i(f),p=null==t?10:+t,g=[];if(!(r%1)&&d-h<p){
if(h=Math.round(h)-1,d=Math.round(d)+1,u>0){
for(;h<d;++h)for(c=1,s=a(h);c<r;++c)if(!((l=s*c)<u)){if(l>f)break;g.push(l)}
}else for(;h<d;++h)for(c=r-1,s=a(h);c>=1;--c)if(!((l=s*c)<u)){if(l>f)break
;g.push(l)}}else g=Al(h,d,Math.min(d-h,p)).map(a);return e?g.reverse():g
},e.tickFormat=function(t,n){
if(null==n&&(n=10===r?".0e":","),"function"!=typeof n&&(n=np(n)),
t===1/0)return n;null==t&&(t=10);var o=Math.max(1,r*t/e.ticks().length)
;return function(t){var e=t/a(Math.round(i(t)))
;return e*r<r-.5&&(e*=r),e<=o?n(t):""}},e.nice=function(){return n(cp(n(),{
floor:function(t){return a(Math.floor(i(t)))},ceil:function(t){
return a(Math.ceil(i(t)))}}))},e.copy=function(){return Wd(e,t().base(r))},e},
ordinal:Yl,pow:yp,sqrt:function(){return yp().exponent(.5)},
quantile:function t(){var e=[],n=[],r=[];function i(){
var t=0,i=Math.max(1,n.length);for(r=new Array(i-1);++t<i;)r[t-1]=zl(e,t/i)
;return a}function a(t){if(!isNaN(t=+t))return n[wl(r,t)]}
return a.invertExtent=function(t){var i=n.indexOf(t)
;return i<0?[NaN,NaN]:[i>0?r[i-1]:e[0],i<r.length?r[i]:e[e.length-1]]
},a.domain=function(t){if(!arguments.length)return e.slice();e=[]
;for(var n,r=0,a=t.length;r<a;++r)null==(n=t[r])||isNaN(n=+n)||e.push(n)
;return e.sort(_l),i()},a.range=function(t){
return arguments.length?(n=Bl.call(t),i()):n.slice()},a.quantiles=function(){
return r.slice()},a.copy=function(){return t().domain(e).range(n)},a},
quantize:function t(){var e=0,n=1,r=1,i=[.5],a=[0,1];function o(t){
if(t<=t)return a[wl(i,t,0,r)]}function u(){var t=-1
;for(i=new Array(r);++t<r;)i[t]=((t+1)*n-(t-r)*e)/(r+1);return o}
return o.domain=function(t){return arguments.length?(e=+t[0],n=+t[1],u()):[e,n]
},o.range=function(t){
return arguments.length?(r=(a=Bl.call(t)).length-1,u()):a.slice()
},o.invertExtent=function(t){var o=a.indexOf(t)
;return o<0?[NaN,NaN]:o<1?[e,i[0]]:o>=r?[i[r-1],n]:[i[o-1],i[o]]
},o.copy=function(){return t().domain([e,n]).range(a)},fp(o)},
threshold:function t(){var e=[.5],n=[0,1],r=1;function i(t){
if(t<=t)return n[wl(e,t,0,r)]}return i.domain=function(t){
return arguments.length?(e=Bl.call(t),
r=Math.min(e.length,n.length-1),i):e.slice()},i.range=function(t){
return arguments.length?(n=Bl.call(t),
r=Math.min(e.length,n.length-1),i):n.slice()},i.invertExtent=function(t){
var r=n.indexOf(t);return[e[r-1],e[r]]},i.copy=function(){
return t().domain(e).range(n)},i},time:function(){
return Ap(Ee,ke,xe,be,ye,me,ve,ce,Fe).domain([new Date(2e3,0,1),new Date(2e3,0,2)])
},utc:function(){
return Ap(Te,Re,ze,Ce,Ae,Se,ve,ce,Ie).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])
},band:Cp,point:function(){return function t(e){var n=e.copy
;return e.padding=e.paddingOuter,delete e.paddingInner,e.copy=function(){
return t(n())},e}(Cp().paddingInner(1))},sequential:function t(e){
var n=sp(),r=0,i=1,a=!1;function o(){var t=n.domain();r=t[0],i=_(t)-r}
function u(t){var n=(t-r)/i;return e(a?Math.max(0,Math.min(1,n)):n)}
return u.clamp=function(t){return arguments.length?(a=!!t,u):a
},u.domain=function(t){return arguments.length?(n.domain(t),o(),u):n.domain()
},u.interpolator=function(t){return arguments.length?(e=t,u):e
},u.copy=function(){return t().domain(n.domain()).clamp(a).interpolator(e)
},u.ticks=function(t){return n.ticks(t)},u.tickFormat=function(t,e){
return n.tickFormat(t,e)},u.nice=function(t){return n.nice(t),o(),u},u},
"bin-linear":function t(){var e=sp(),n=[];function r(t){return e(t)}
function i(t){n=Dp(t),e.domain([n[0],_(n)])}return r.domain=function(t){
return arguments.length?(i(t),r):n.slice()},r.range=function(t){
return arguments.length?(e.range(t),r):e.range()},r.rangeRound=function(t){
return arguments.length?(e.rangeRound(t),r):e.rangeRound()
},r.interpolate=function(t){
return arguments.length?(e.interpolate(t),r):e.interpolate()
},r.invert=function(t){return e.invert(t)},r.ticks=function(t){
var e=n.length,i=~~(e/(t||e));return i<2?r.domain():n.filter((function(t,e){
return!(e%i)}))},r.tickFormat=function(){return e.tickFormat.apply(e,arguments)
},r.copy=function(){return t().domain(r.domain()).range(r.range())},r},
"bin-ordinal":function t(){var e=[],n=[];function r(t){
return null==t||t!=t?void 0:n[($r(e,t)-1)%n.length]}return r.domain=function(t){
return arguments.length?(e=Dp(t),r):e.slice()},r.range=function(t){
return arguments.length?(n=zp.call(t),r):n.slice()},r.tickFormat=function(){
var t=sp().domain([e[0],_(e)]);return t.tickFormat.apply(t,arguments)
},r.copy=function(){return t().domain(r.domain()).range(r.range())},r}}
;for(var Pp in Tp)Rp(Pp,Tp[Pp]);function Lp(t,e){var n=e[0],r=_(e)-n
;return function(e){return t(n+e*r)}}function qp(t,e,n){var r=n-e
;return r&&isFinite(r)?"linear"===t.type||"sequential"===t.type?function(t){
return(t-e)/r}:t.copy().domain([e,n]).range([0,1]).interpolate(Up):L(0)}
function Up(t,e){var n=e-t;return function(e){return t+e*n}}function Fp(t,e){
var n=qd[function(t){
return"interpolate"+t.toLowerCase().split("-").map((function(t){
return t[0].toUpperCase()+t.slice(1)})).join("")}(t)]
;return null!=e&&n&&n.gamma?n.gamma(e):n}function jp(t){
for(var e=t.length/6|0,n=new Array(e),r=0;r<e;)n[r]="#"+t.slice(6*r,6*++r)
;return n}
var Ip=jp("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),$p=jp("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),Bp=jp("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),Wp=jp("4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac"),Yp=jp("4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5"),Gp=new Array(3).concat("67a9cff7f7f7f1a340","0571b092c5defdb863e66101","0571b092c5def7f7f7fdb863e66101","2166ac67a9cfd1e5f0fee0b6f1a340b35806","2166ac67a9cfd1e5f0f7f7f7fee0b6f1a340b35806","2166ac4393c392c5ded1e5f0fee0b6fdb863e08214b35806","2166ac4393c392c5ded1e5f0f7f7f7fee0b6fdb863e08214b35806","0530612166ac4393c392c5ded1e5f0fee0b6fdb863e08214b358067f3b08","0530612166ac4393c392c5ded1e5f0f7f7f7fee0b6fdb863e08214b358067f3b08").map(jp)
;function Hp(t){
for(var e=t.length/6|0,n=new Array(e),r=0;r<e;)n[r]="#"+t.slice(6*r,6*++r)
;return n}
var Vp=Hp("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Xp=Hp("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),Jp=Hp("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),Zp=Hp("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),Qp=Hp("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),Kp=Hp("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),tg=Hp("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),eg=Hp("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),ng=Hp("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f")
;function rg(t){return ad(t[t.length-1])}
var ig=new Array(3).concat("d8b365f5f5f55ab4ac","a6611adfc27d80cdc1018571","a6611adfc27df5f5f580cdc1018571","8c510ad8b365f6e8c3c7eae55ab4ac01665e","8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e","8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e","8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e","5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30","5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(Hp),ag=rg(ig),og=new Array(3).concat("af8dc3f7f7f77fbf7b","7b3294c2a5cfa6dba0008837","7b3294c2a5cff7f7f7a6dba0008837","762a83af8dc3e7d4e8d9f0d37fbf7b1b7837","762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837","762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837","762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837","40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b","40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(Hp),ug=rg(og),fg=new Array(3).concat("e9a3c9f7f7f7a1d76a","d01c8bf1b6dab8e1864dac26","d01c8bf1b6daf7f7f7b8e1864dac26","c51b7de9a3c9fde0efe6f5d0a1d76a4d9221","c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221","c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221","c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221","8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419","8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(Hp),sg=rg(fg),cg=new Array(3).concat("998ec3f7f7f7f1a340","5e3c99b2abd2fdb863e66101","5e3c99b2abd2f7f7f7fdb863e66101","542788998ec3d8daebfee0b6f1a340b35806","542788998ec3d8daebf7f7f7fee0b6f1a340b35806","5427888073acb2abd2d8daebfee0b6fdb863e08214b35806","5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806","2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08","2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(Hp),lg=rg(cg),hg=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(Hp),dg=rg(hg),pg=new Array(3).concat("ef8a62ffffff999999","ca0020f4a582bababa404040","ca0020f4a582ffffffbababa404040","b2182bef8a62fddbc7e0e0e09999994d4d4d","b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d","b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d","b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d","67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a","67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(Hp),gg=rg(pg),vg=new Array(3).concat("fc8d59ffffbf91bfdb","d7191cfdae61abd9e92c7bb6","d7191cfdae61ffffbfabd9e92c7bb6","d73027fc8d59fee090e0f3f891bfdb4575b4","d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4","d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4","d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4","a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695","a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(Hp),mg=rg(vg),yg=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(Hp),bg=rg(yg),_g=new Array(3).concat("fc8d59ffffbf99d594","d7191cfdae61abdda42b83ba","d7191cfdae61ffffbfabdda42b83ba","d53e4ffc8d59fee08be6f59899d5943288bd","d53e4ffc8d59fee08bffffbfe6f59899d5943288bd","d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd","d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd","9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2","9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(Hp),xg=rg(_g),wg=new Array(3).concat("e5f5f999d8c92ca25f","edf8fbb2e2e266c2a4238b45","edf8fbb2e2e266c2a42ca25f006d2c","edf8fbccece699d8c966c2a42ca25f006d2c","edf8fbccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(Hp),Mg=rg(wg),kg=new Array(3).concat("e0ecf49ebcda8856a7","edf8fbb3cde38c96c688419d","edf8fbb3cde38c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(Hp),Eg=rg(kg),Sg=new Array(3).concat("e0f3dba8ddb543a2ca","f0f9e8bae4bc7bccc42b8cbe","f0f9e8bae4bc7bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(Hp),Ag=rg(Sg),Cg=new Array(3).concat("fee8c8fdbb84e34a33","fef0d9fdcc8afc8d59d7301f","fef0d9fdcc8afc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(Hp),Og=rg(Cg),zg=new Array(3).concat("ece2f0a6bddb1c9099","f6eff7bdc9e167a9cf02818a","f6eff7bdc9e167a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(Hp),Dg=rg(zg),Ng=new Array(3).concat("ece7f2a6bddb2b8cbe","f1eef6bdc9e174a9cf0570b0","f1eef6bdc9e174a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(Hp),Rg=rg(Ng),Tg=new Array(3).concat("e7e1efc994c7dd1c77","f1eef6d7b5d8df65b0ce1256","f1eef6d7b5d8df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(Hp),Pg=rg(Tg),Lg=new Array(3).concat("fde0ddfa9fb5c51b8a","feebe2fbb4b9f768a1ae017e","feebe2fbb4b9f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(Hp),qg=rg(Lg),Ug=new Array(3).concat("edf8b17fcdbb2c7fb8","ffffcca1dab441b6c4225ea8","ffffcca1dab441b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(Hp),Fg=rg(Ug),jg=new Array(3).concat("f7fcb9addd8e31a354","ffffccc2e69978c679238443","ffffccc2e69978c67931a354006837","ffffccd9f0a3addd8e78c67931a354006837","ffffccd9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(Hp),Ig=rg(jg),$g=new Array(3).concat("fff7bcfec44fd95f0e","ffffd4fed98efe9929cc4c02","ffffd4fed98efe9929d95f0e993404","ffffd4fee391fec44ffe9929d95f0e993404","ffffd4fee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(Hp),Bg=rg($g),Wg=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(Hp),Yg=rg(Wg),Gg=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(Hp),Hg=rg(Gg),Vg=new Array(3).concat("e5f5e0a1d99b31a354","edf8e9bae4b374c476238b45","edf8e9bae4b374c47631a354006d2c","edf8e9c7e9c0a1d99b74c47631a354006d2c","edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(Hp),Xg=rg(Vg),Jg=new Array(3).concat("f0f0f0bdbdbd636363","f7f7f7cccccc969696525252","f7f7f7cccccc969696636363252525","f7f7f7d9d9d9bdbdbd969696636363252525","f7f7f7d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(Hp),Zg=rg(Jg),Qg=new Array(3).concat("efedf5bcbddc756bb1","f2f0f7cbc9e29e9ac86a51a3","f2f0f7cbc9e29e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(Hp),Kg=rg(Qg),tv=new Array(3).concat("fee0d2fc9272de2d26","fee5d9fcae91fb6a4acb181d","fee5d9fcae91fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(Hp),ev=rg(tv),nv=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(Hp),rv=rg(nv),iv=Ld(Hh(300,.5,0),Hh(-240,.5,1)),av=Ld(Hh(-100,.75,.35),Hh(80,1.5,.8)),ov=Ld(Hh(260,.75,.35),Hh(80,1.5,.8)),uv=Hh()
;function fv(t){(t<0||t>1)&&(t-=Math.floor(t));var e=Math.abs(t-.5)
;return uv.h=360*t-100,uv.s=1.5-1.5*e,uv.l=.8-.9*e,uv+""}
var sv=dh(),cv=Math.PI/3,lv=2*Math.PI/3;function hv(t){var e
;return t=(.5-t)*Math.PI,
sv.r=255*(e=Math.sin(t))*e,sv.g=255*(e=Math.sin(t+cv))*e,
sv.b=255*(e=Math.sin(t+lv))*e,sv+""}function dv(t){var e=t.length
;return function(n){return t[Math.max(0,Math.min(e-1,Math.floor(n*e)))]}}
var pv=dv(Hp("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),gv=dv(Hp("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),vv=dv(Hp("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),mv=dv(Hp("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),yv=Object.freeze({
schemeCategory10:Vp,schemeAccent:Xp,schemeDark2:Jp,schemePaired:Zp,
schemePastel1:Qp,schemePastel2:Kp,schemeSet1:tg,schemeSet2:eg,schemeSet3:ng,
interpolateBrBG:ag,schemeBrBG:ig,interpolatePRGn:ug,schemePRGn:og,
interpolatePiYG:sg,schemePiYG:fg,interpolatePuOr:lg,schemePuOr:cg,
interpolateRdBu:dg,schemeRdBu:hg,interpolateRdGy:gg,schemeRdGy:pg,
interpolateRdYlBu:mg,schemeRdYlBu:vg,interpolateRdYlGn:bg,schemeRdYlGn:yg,
interpolateSpectral:xg,schemeSpectral:_g,interpolateBuGn:Mg,schemeBuGn:wg,
interpolateBuPu:Eg,schemeBuPu:kg,interpolateGnBu:Ag,schemeGnBu:Sg,
interpolateOrRd:Og,schemeOrRd:Cg,interpolatePuBuGn:Dg,schemePuBuGn:zg,
interpolatePuBu:Rg,schemePuBu:Ng,interpolatePuRd:Pg,schemePuRd:Tg,
interpolateRdPu:qg,schemeRdPu:Lg,interpolateYlGnBu:Fg,schemeYlGnBu:Ug,
interpolateYlGn:Ig,schemeYlGn:jg,interpolateYlOrBr:Bg,schemeYlOrBr:$g,
interpolateYlOrRd:Yg,schemeYlOrRd:Wg,interpolateBlues:Hg,schemeBlues:Gg,
interpolateGreens:Xg,schemeGreens:Vg,interpolateGreys:Zg,schemeGreys:Jg,
interpolatePurples:Kg,schemePurples:Qg,interpolateReds:ev,schemeReds:tv,
interpolateOranges:rv,schemeOranges:nv,interpolateCubehelixDefault:iv,
interpolateRainbow:fv,interpolateWarm:av,interpolateCool:ov,
interpolateSinebow:hv,interpolateViridis:pv,interpolateMagma:gv,
interpolateInferno:vv,interpolatePlasma:mv}),bv={blueorange:Gp},_v={
category10:Vp,accent:Xp,dark2:Jp,paired:Zp,pastel1:Qp,pastel2:Kp,set1:tg,
set2:eg,set3:ng,category20:Ip,category20b:$p,category20c:Bp,tableau10:Wp,
tableau20:Yp,viridis:pv,magma:gv,inferno:vv,plasma:mv,rainbow:fv,sinebow:hv,
blueorange:ad(_(Gp))};function xv(t,e){
_v[t]=yv["interpolate"+e],bv[t]=yv["scheme"+e]}function wv(t,e){
if(arguments.length>1)return _v[t]=e,this;var n=t.split("-")
;return t=n[0],(n=+n[1]+1)&&bv.hasOwnProperty(t)?bv[t][n-1]:!n&&_v.hasOwnProperty(t)?_v[t]:void 0
}
xv("blues","Blues"),xv("greens","Greens"),xv("greys","Greys"),xv("purples","Purples"),
xv("reds","Reds"),
xv("oranges","Oranges"),xv("brownbluegreen","BrBG"),xv("purplegreen","PRGn"),
xv("pinkyellowgreen","PiYG"),
xv("purpleorange","PuOr"),xv("redblue","RdBu"),xv("redgrey","RdGy"),
xv("redyellowblue","RdYlBu"),
xv("redyellowgreen","RdYlGn"),xv("spectral","Spectral"),
xv("bluegreen","BuGn"),xv("bluepurple","BuPu"),
xv("greenblue","GnBu"),xv("orangered","OrRd"),
xv("purplebluegreen","PuBuGn"),xv("purpleblue","PuBu"),
xv("purplered","PuRd"),xv("redpurple","RdPu"),
xv("yellowgreenblue","YlGnBu"),xv("yellowgreen","YlGn"),
xv("yelloworangebrown","YlOrBr"),xv("yelloworangered","YlOrRd");var Mv={
millisecond:ce,second:ve,minute:me,hour:ye,day:be,week:xe,month:ke,year:Ee},kv={
millisecond:ce,second:ve,minute:Se,hour:Ae,day:Ce,week:ze,month:Re,year:Te}
;function Ev(t){return Mv.hasOwnProperty(t)&&Mv[t]}function Sv(t){
return kv.hasOwnProperty(t)&&kv[t]}function Av(t,e){var n
;return u(e)&&(n=e.step,
e=e.interval),f(e)&&(e="time"===t.type?Ev(e):"utc"===t.type?Sv(e):i("Only time and utc scales accept interval strings."),
n&&(e=e.every(n))),e}function Cv(t,e,n){var r=t.range(),i=r[0],a=_(r)
;if(i>a&&(r=a,a=i,i=r),e=e.filter((function(e){return!((e=t(e))<i||e>a)
})),n>0&&e.length>1){
for(var o=[e[0],_(e)];e.length>n&&e.length>=3;)e=e.filter((function(t,e){
return!(e%2)}));e.length<3&&(e=o)}return e}function Ov(t,e){
return t.ticks?t.ticks(e):t.domain()}function zv(t,e,n){
var r=t.tickFormat?t.tickFormat(e,n):n?np(n):String
;return t.type===ul?function(t,e){return function(n){return t(n)?e(n):""}
}(r,function(t){var e=Jd(t||",");if(null==e.precision){
switch(e.precision=12,e.type){case"%":e.precision-=2;break;case"e":
e.precision-=1}return function(t,e){return function(n){
var r,i,a=t(n),o=a.indexOf(e);if(o<0)return a;for(i=(r=function(t,e){
var n,r=t.lastIndexOf("e");if(r>0)return r
;for(r=t.length;--r>e;)if((n=t.charCodeAt(r))>=48&&n<=57)return r+1
}(a,o))<a.length?a.slice(r):"";--r>o;)if("0"!==a[r]){++r;break}
return a.slice(0,r)+i}}(np(e),np(".1f")(1)[1])}return np(e)}(n)):r}
function Dv(t){Mr.call(this,null,t)}function Nv(t){Mr.call(this,null,t)}
function Rv(){return ct({})}function Tv(t){return t.exit}function Pv(t){
Mr.call(this,null,t)}$(Dv,Mr).transform=function(t,e){
if(this.value&&!t.modified())return e.StopPropagation
;var n=e.fork(e.NO_SOURCE|e.NO_FIELDS),r=this.value,i=t.scale,a=null==t.count?t.values?t.values.length:10:Av(i,t.count),o=t.format||zv(i,a,t.formatSpecifier),u=t.values?Cv(i,t.values,a):Ov(i,a)
;return r&&(n.rem=r),r=u.map((function(t,e){return ct({index:e/(u.length-1),
value:t,label:o(t)})})),t.extra&&r.length&&r.push(ct({index:-1,extra:{
value:r[0].value},label:""})),n.source=r,n.add=r,this.value=r,n
},$(Nv,Mr).transform=function(t,e){
var n=e.dataflow,r=e.fork(e.NO_SOURCE|e.NO_FIELDS),a=t.item||Rv,u=t.key||ft,f=this.value
;return o(r.encode)&&(r.encode=null),
f&&(t.modified("key")||e.modified(u))&&i("DataJoin does not support modified key function or fields."),
f||(e=e.addAll(),this.value=f=I().test(Tv),f.lookup=function(t){
return f.get(u(t))}),e.visit(e.ADD,(function(t){var e=u(t),n=f.get(e)
;n?n.exit?(f.empty--,
r.add.push(n)):r.mod.push(n):(f.set(e,n=a(t)),r.add.push(n)),n.datum=t,n.exit=!1
})),e.visit(e.MOD,(function(t){var e=u(t),n=f.get(e)
;n&&(n.datum=t,r.mod.push(n))})),e.visit(e.REM,(function(t){
var e=u(t),n=f.get(e);t!==n.datum||n.exit||(r.rem.push(n),n.exit=!0,++f.empty)
})),
e.changed(e.ADD_MOD)&&r.modifies("datum"),t.clean&&f.empty>n.cleanThreshold&&n.runAfter(f.clean),
r},$(Pv,Mr).transform=function(t,e){
var n=e.fork(e.ADD_REM),r=t.encoders,i=e.encode;if(o(i)){
if(!n.changed()&&!i.every((function(t){return r[t]})))return e.StopPropagation
;i=i[0],n.encode=null}
var a="enter"===i,u=r.update||m,f=r.enter||m,s=r.exit||m,c=(i&&!a?r[i]:u)||m
;if(e.changed(e.ADD)&&(e.visit(e.ADD,(function(e){
f(e,t),u(e,t),c!==m&&c!==u&&c(e,t)})),n.modifies(f.output),n.modifies(u.output),
c!==m&&c!==u&&n.modifies(c.output)),
e.changed(e.REM)&&s!==m&&(e.visit(e.REM,(function(e){s(e,t)
})),n.modifies(s.output)),a||c!==m){var l=e.MOD|(t.modified()?e.REFLOW:0)
;a?(e.visit(l,(function(e){var r=f(e,t);(c(e,t)||r)&&n.mod.push(e)
})),n.mod.length&&n.modifies(f.output)):e.visit(l,(function(e){
c(e,t)&&n.mod.push(e)})),n.mod.length&&n.modifies(c.output)}
return n.changed()?n:e.StopPropagation};var Lv="symbol",qv={}
;function Uv(t,e,n){return n===Lv&&qv[t.type]?function(t){
return function(e,n,r){var i=r[n+1]||r.max||1/0,a=Fv(e,t),o=Fv(i,t)
;return a&&o?a+"–"+o:o?"< "+o:"≥ "+a}}(e):"discrete"===n?function(t){
return function(e,n){return n?t(e):null}}(e):function(t){return function(e){
return t(e)}}(e)}function Fv(t,e){return isFinite(t)?e(t):null}function jv(t){
Mr.call(this,[],t)}qv.quantile=function(t){var e=[-1/0].concat(t.quantiles())
;return e.max=1/0,e},qv.quantize=function(t){
var e=t.domain(),n=e[0],r=_(e),i=t.range().length,a=new Array(i),o=0;a[0]=-1/0
;for(;++o<i;)a[o]=(o*r-(o-i)*n)/i;return a.max=1/0,a},qv.threshold=function(t){
var e=[-1/0].concat(t.domain());return e.max=1/0,e
},qv["bin-linear"]=qv[ml]=function(t){var e=t.domain();return e.max=e.pop(),e
},$(jv,Mr).transform=function(t,e){
if(null!=this.value&&!t.modified())return e.StopPropagation
;var n,r,i,a,o=e.fork(e.NO_SOURCE|e.NO_FIELDS),u=this.value,f=t.type||Lv,s=t.scale,c=null==t.count?5:Av(s,t.count),l=t.format||zv(s,c,t.formatSpecifier),h=t.values||function(t,e){
var n=qv[t.type];return n?n(t):Ov(t,e)}(s,c)
;return l=Uv(s,l,f),u&&(o.rem=u),f===Lv?(T(i=t.size)?(t.values||0!==s(h[0])||(h=h.slice(1)),
a=h.reduce((function(e,n){return Math.max(e,i(n,t))
}),0)):i=L(a=i||8),u=h.map((function(e,n){return ct({index:n,label:l(e,n,h),
value:e,offset:a,size:i(e,t)})
}))):"gradient"===f?(n=s.domain(),r=qp(s,n[0],_(n)),
h.length<3&&!t.values&&n[0]!==_(n)&&(h=[n[0],_(n)]),u=h.map((function(t,e){
return ct({index:e,label:l(t,e,h),value:t,perc:r(t)})
}))):(i=h.length-1,r=function(t){
var e=t.domain(),n=e.length-1,r=+e[0],i=+_(e),a=i-r;if(t.type===vl){
var o=n?a/n:.1;a=(i+=o)-(r-=o)}return function(t){return(t-r)/a}
}(s),u=h.map((function(t,e){return ct({index:e,label:l(t,e,h),value:t,
perc:e?r(t):0,perc2:e===i?1:r(h[e+1])})}))),o.source=u,o.add=u,this.value=u,o}
;var Iv=I({line:Hv,"line-radial":function(t,e,n,r){
return Hv(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n))},arc:Vv,
"arc-radial":function(t,e,n,r){
return Vv(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n))},curve:Xv,
"curve-radial":function(t,e,n,r){
return Xv(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n))},
"orthogonal-horizontal":function(t,e,n,r){return"M"+t+","+e+"V"+r+"H"+n},
"orthogonal-vertical":function(t,e,n,r){return"M"+t+","+e+"H"+n+"V"+r},
"orthogonal-radial":function(t,e,n,r){
var i=Math.cos(t),a=Math.sin(t),o=Math.cos(n),u=Math.sin(n),f=Math.abs(n-t)>Math.PI?n<=t:n>t
;return"M"+e*i+","+e*a+"A"+e+","+e+" 0 0,"+(f?1:0)+" "+e*o+","+e*u+"L"+r*o+","+r*u
},"diagonal-horizontal":function(t,e,n,r){var i=(t+n)/2
;return"M"+t+","+e+"C"+i+","+e+" "+i+","+r+" "+n+","+r},
"diagonal-vertical":function(t,e,n,r){var i=(e+r)/2
;return"M"+t+","+e+"C"+t+","+i+" "+n+","+i+" "+n+","+r},
"diagonal-radial":function(t,e,n,r){
var i=Math.cos(t),a=Math.sin(t),o=Math.cos(n),u=Math.sin(n),f=(e+r)/2
;return"M"+e*i+","+e*a+"C"+f*i+","+f*a+" "+f*o+","+f*u+" "+r*o+","+r*u}})
;function $v(t){return t.source.x}function Bv(t){return t.source.y}
function Wv(t){return t.target.x}function Yv(t){return t.target.y}
function Gv(t){Mr.call(this,{},t)}function Hv(t,e,n,r){
return"M"+t+","+e+"L"+n+","+r}function Vv(t,e,n,r){
var i=n-t,a=r-e,o=Math.sqrt(i*i+a*a)/2
;return"M"+t+","+e+"A"+o+","+o+" "+180*Math.atan2(a,i)/Math.PI+" 0 1 "+n+","+r}
function Xv(t,e,n,r){var i=n-t,a=r-e,o=.2*(i+a),u=.2*(a-i)
;return"M"+t+","+e+"C"+(t+o)+","+(e+u)+" "+(n+u)+","+(r-o)+" "+n+","+r}
function Jv(t){Mr.call(this,null,t)}Gv.Definition={type:"LinkPath",metadata:{
modifies:!0},params:[{name:"sourceX",type:"field",default:"source.x"},{
name:"sourceY",type:"field",default:"source.y"},{name:"targetX",type:"field",
default:"target.x"},{name:"targetY",type:"field",default:"target.y"},{
name:"orient",type:"enum",default:"vertical",
values:["horizontal","vertical","radial"]},{name:"shape",type:"enum",
default:"line",values:["line","arc","curve","diagonal","orthogonal"]},{
name:"require",type:"signal"},{name:"as",type:"string",default:"path"}]
},$(Gv,Mr).transform=function(t,e){
var n=t.sourceX||$v,r=t.sourceY||Bv,a=t.targetX||Wv,o=t.targetY||Yv,u=t.as||"path",f=t.orient||"vertical",s=t.shape||"line",c=Iv.get(s+"-"+f)||Iv.get(s)
;return c||i("LinkPath unsupported type: "+t.shape+(t.orient?"-"+t.orient:"")),
e.visit(e.SOURCE,(function(t){t[u]=c(n(t),r(t),a(t),o(t))
})),e.reflow(t.modified()).modifies(u)},Jv.Definition={type:"Pie",metadata:{
modifies:!0},params:[{name:"field",type:"field"},{name:"startAngle",
type:"number",default:0},{name:"endAngle",type:"number",
default:6.283185307179586},{name:"sort",type:"boolean",default:!1},{name:"as",
type:"string",array:!0,length:2,default:["startAngle","endAngle"]}]
},$(Jv,Mr).transform=function(t,e){
var n,r,i,a=t.as||["startAngle","endAngle"],o=a[0],u=a[1],f=t.field||g,s=t.startAngle||0,c=null!=t.endAngle?t.endAngle:2*Math.PI,l=e.source,h=l.map(f),d=h.length,p=s,v=(c-s)/function(t,e){
let n=0;if(void 0===e)for(let r of t)(r=+r)&&(n+=r);else{let r=-1
;for(let i of t)(i=+e(i,++r,t))&&(n+=i)}return n}(h),m=Yr(d)
;for(t.sort&&m.sort((function(t,e){return h[t]-h[e]
})),n=0;n<d;++n)i=h[m[n]],(r=l[m[n]])[o]=p,r[u]=p+=i*v
;return this.value=h,e.reflow(t.modified()).modifies(a)}
;var Zv=et([hl,fl,sl]),Qv=et([hl,ul,fl,sl,"time","utc"]),Kv=et(["set","modified","clear","type","scheme","schemeExtent","schemeCount","domain","domainMin","domainMid","domainMax","domainRaw","domainImplicit","nice","zero","range","rangeStep","round","reverse","interpolate","interpolateGamma"])
;function tm(t){Mr.call(this,null,t),this.modified(!0)}function em(t,e,n){
t===ul&&(Math.abs(e.reduce((function(t,e){return t+(e<0?-1:e>0?1:0)
}),0))!==e.length&&n.warn("Log scale domain includes zero: "+s(e)));return e}
function nm(t,e,n){return T(t)&&(e||n)?Lp(t,rm(e||[0,1],n)):t}function rm(t,e){
return e?t.slice().reverse():t}function im(t){Mr.call(this,null,t)}
$(tm,Mr).transform=function(t,e){var n,r=e.dataflow,a=this.value
;for(n in a&&!t.modified("type")||(this.value=a=Rp((t.type||hl).toLowerCase())()),
t)if(!Kv[n]){if("padding"===n&&Qv[a.type])continue
;T(a[n])?a[n](t[n]):r.warn("Unsupported scale property: "+n)}
return function(t,e,n){var r=e.round||!1,a=e.range
;if(null!=e.rangeStep)a=function(t,e,n){
t!==cl&&t!==ll&&i("Only band and point scales support rangeStep.")
;var r=(null!=e.paddingOuter?e.paddingOuter:e.padding)||0,a=t===ll?1:(null!=e.paddingInner?e.paddingInner:e.padding)||0
;return[0,e.rangeStep*bl(n,a,r)]}(t.type,e,n);else if(e.scheme){
if(a=function(t,e,n){var r,a=e.scheme.toLowerCase(),o=wv(a),u=e.schemeExtent
;o||i("Unrecognized scheme name: "+e.scheme)
;return n=t===vl?n+1:t===ml?n-1:t===pl||t===gl?+e.schemeCount||5:n,
t===yl?nm(o,u,e.reverse):!u&&(r=wv(a+"-"+n))?r:T(o)?function(t,e){
for(var n=new Array(e),r=e+1,i=0;i<e;)n[i]=t(++i/r);return n
}(nm(o,u),n):t===dl?o:o.slice(0,n)}(t.type,e,n),T(a))return t.interpolator(a)
}else if(a&&t.type===yl)return t.interpolator(ad(rm(a,e.reverse)))
;a&&e.interpolate&&t.interpolate?t.interpolate(Fp(e.interpolate,e.interpolateGamma)):T(t.round)?t.round(r):T(t.rangeRound)&&t.interpolate(r?gd:pd)
;a&&t.range(rm(a,e.reverse))}(a,t,function(t,e,n){var r=function(t,e,n){
return e?(t.domain(em(t.type,e,n)),e.length):-1}(t,e.domainRaw,n)
;if(r>-1)return r;var i,a,o=e.domain,u=t.type,f=e.zero||void 0===e.zero&&Zv[u]
;if(!o)return 0;Qv[u]&&e.padding&&o[0]!==_(o)&&(o=function(t,e,n,r,i){
var a=Math.abs(_(n)-n[0]),o=a/(a-2*r),u=t===ul?D(e,null,o):t===sl?N(e,null,o,.5):t===fl?N(e,null,o,i):z(e,null,o)
;return(e=e.slice())[0]=u[0],e[e.length-1]=u[1],e
}(u,o,e.range,e.padding,e.exponent))
;(f||null!=e.domainMin||null!=e.domainMax||null!=e.domainMid)&&(i=(o=o.slice()).length-1||1,
f&&(o[0]>0&&(o[0]=0),
o[i]<0&&(o[i]=0)),null!=e.domainMin&&(o[0]=e.domainMin),null!=e.domainMax&&(o[i]=e.domainMax),
null!=e.domainMid&&(((a=e.domainMid)<o[0]||a>o[i])&&n.warn("Scale domainMid exceeds domain min or max.",a),
o.splice(i,0,a)))
;t.domain(em(u,o,n)),u===dl&&t.unknown(e.domainImplicit?Wl:void 0)
;e.nice&&t.nice&&t.nice(!0!==e.nice&&Av(t,e.nice)||null);return o.length
}(a,t,r)),e.fork(e.NO_SOURCE|e.NO_FIELDS)},$(im,Mr).transform=function(t,e){
var n=t.modified("sort")||e.changed(e.ADD)||e.modified(t.sort.fields)||e.modified("datum")
;return n&&e.source.sort(t.sort),this.modified(n),e}
;var am="zero",om="center",um="normalize",fm=["y0","y1"];function sm(t){
Mr.call(this,null,t)}function cm(t,e,n,r,i){
for(var a,o=(e-t.sum)/2,u=t.length,f=0;f<u;++f)(a=t[f])[r]=o,
a[i]=o+=Math.abs(n(a))}function lm(t,e,n,r,i){
for(var a,o=1/t.sum,u=0,f=t.length,s=0,c=0;s<f;++s)(a=t[s])[r]=u,
a[i]=u=o*(c+=Math.abs(n(a)))}function hm(t,e,n,r,i){
for(var a,o,u=0,f=0,s=t.length,c=0;c<s;++c)(a=n(o=t[c]))<0?(o[r]=f,
o[i]=f+=a):(o[r]=u,o[i]=u+=a)}sm.Definition={type:"Stack",metadata:{modifies:!0
},params:[{name:"field",type:"field"},{name:"groupby",type:"field",array:!0},{
name:"sort",type:"compare"},{name:"offset",type:"enum",default:am,
values:[am,om,um]},{name:"as",type:"string",array:!0,length:2,default:fm}]
},$(sm,Mr).transform=function(t,e){
var n,r,i,a,o=t.as||fm,u=o[0],f=o[1],s=t.field||g,c=t.offset===om?cm:t.offset===um?lm:hm
;for(n=function(t,e,n,r){var i,a,o,u,f,s,c,l,h,d=[],p=function(t){return t(f)}
;if(null==e)d.push(t.slice());else for(i={},
a=0,o=t.length;a<o;++a)f=t[a],(c=i[s=e.map(p)])||(i[s]=c=[],d.push(c)),c.push(f)
;for(s=0,h=0,u=d.length;s<u;++s){
for(a=0,l=0,o=(c=d[s]).length;a<o;++a)l+=Math.abs(r(c[a]))
;c.sum=l,l>h&&(h=l),n&&c.sort(n)}return d.max=h,d}(e.source,t.groupby,t.sort,s),
r=0,i=n.length,a=n.max;r<i;++r)c(n[r],a,s,u,f)
;return e.reflow(t.modified()).modifies(o)};var dm=Object.freeze({axisticks:Dv,
datajoin:Nv,encode:Pv,legendentries:jv,linkpath:Gv,pie:Jv,scale:tm,sortitems:im,
stack:sm,validTicks:Cv});function pm(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}
!function(t){1===t.length&&(t=function(t){return function(e,n){return pm(t(e),n)
}}(t))}(pm);function gm(t,e,n){
t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n
;for(var r=-1,i=0|Math.max(0,Math.ceil((e-t)/n)),a=new Array(i);++r<i;)a[r]=t+r*n
;return a}var vm=Math.sqrt(50),mm=Math.sqrt(10),ym=Math.sqrt(2)
;function bm(t,e,n){
var r=Math.abs(e-t)/Math.max(0,n),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),a=r/i
;return a>=vm?i*=10:a>=mm?i*=5:a>=ym&&(i*=2),e<t?-i:i}function _m(t){
return Math.ceil(Math.log(t.length)/Math.LN2)+1}var xm=Array.prototype.slice
;function wm(t,e){return t-e}function Mm(t){return function(){return t}}
function km(t,e){for(var n,r=-1,i=e.length;++r<i;)if(n=Em(t,e[r]))return n
;return 0}function Em(t,e){
for(var n=e[0],r=e[1],i=-1,a=0,o=t.length,u=o-1;a<o;u=a++){
var f=t[a],s=f[0],c=f[1],l=t[u],h=l[0],d=l[1];if(Sm(f,l,e))return 0
;c>r!=d>r&&n<(h-s)*(r-c)/(d-c)+s&&(i=-i)}return i}function Sm(t,e,n){var r
;return function(t,e,n){return(e[0]-t[0])*(n[1]-t[1])==(n[0]-t[0])*(e[1]-t[1])
}(t,e,n)&&function(t,e,n){return t<=e&&e<=n||n<=e&&e<=t
}(t[r=+(t[0]===e[0])],n[r],e[r])}function Am(){}
var Cm=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]]
;function Om(){var t=1,e=1,n=_m,r=u;function i(t){var e=n(t)
;if(Array.isArray(e))e=e.slice().sort(wm);else{var r=function(t,e){
var n,r,i,a=t.length,o=-1;if(null==e){
for(;++o<a;)if(null!=(n=t[o])&&n>=n)for(r=i=n;++o<a;)null!=(n=t[o])&&(r>n&&(r=n),
i<n&&(i=n))
}else for(;++o<a;)if(null!=(n=e(t[o],o,t))&&n>=n)for(r=i=n;++o<a;)null!=(n=e(t[o],o,t))&&(r>n&&(r=n),
i<n&&(i=n));return[r,i]}(t),i=r[0],o=r[1]
;e=bm(i,o,e),e=gm(Math.floor(i/e)*e,Math.floor(o/e)*e,e)}
return e.map((function(e){return a(t,e)}))}function a(n,i){var a=[],u=[]
;return function(n,r,i){var a,u,f,s,c,l,h=new Array,d=new Array
;a=u=-1,s=n[0]>=r,Cm[s<<1].forEach(p)
;for(;++a<t-1;)f=s,s=n[a+1]>=r,Cm[f|s<<1].forEach(p);Cm[s<<0].forEach(p)
;for(;++u<e-1;){
for(a=-1,s=n[u*t+t]>=r,c=n[u*t]>=r,Cm[s<<1|c<<2].forEach(p);++a<t-1;)f=s,
s=n[u*t+t+a+1]>=r,l=c,c=n[u*t+a+1]>=r,Cm[f|s<<1|c<<2|l<<3].forEach(p)
;Cm[s|c<<3].forEach(p)}a=-1,c=n[u*t]>=r,Cm[c<<2].forEach(p)
;for(;++a<t-1;)l=c,c=n[u*t+a+1]>=r,Cm[c<<2|l<<3].forEach(p);function p(t){
var e,n,r=[t[0][0]+a,t[0][1]+u],f=[t[1][0]+a,t[1][1]+u],s=o(r),c=o(f)
;(e=d[s])?(n=h[c])?(delete d[e.end],
delete h[n.start],e===n?(e.ring.push(f),i(e.ring)):h[e.start]=d[n.end]={
start:e.start,end:n.end,ring:e.ring.concat(n.ring)
}):(delete d[e.end],e.ring.push(f),
d[e.end=c]=e):(e=h[c])?(n=d[s])?(delete h[e.start],
delete d[n.end],e===n?(e.ring.push(f),i(e.ring)):h[n.start]=d[e.end]={
start:n.start,end:e.end,ring:n.ring.concat(e.ring)
}):(delete h[e.start],e.ring.unshift(r),h[e.start=s]=e):h[s]=d[c]={start:s,
end:c,ring:[r,f]}}Cm[c<<3].forEach(p)}(n,i,(function(t){r(t,n,i),function(t){
for(var e=0,n=t.length,r=t[n-1][1]*t[0][0]-t[n-1][0]*t[0][1];++e<n;)r+=t[e-1][1]*t[e][0]-t[e-1][0]*t[e][1]
;return r}(t)>0?a.push([t]):u.push(t)})),u.forEach((function(t){
for(var e,n=0,r=a.length;n<r;++n)if(-1!==km((e=a[n])[0],t))return void e.push(t)
})),{type:"MultiPolygon",value:i,coordinates:a}}function o(e){
return 2*e[0]+e[1]*(t+1)*4}function u(n,r,i){n.forEach((function(n){
var a,o=n[0],u=n[1],f=0|o,s=0|u,c=r[s*t+f]
;o>0&&o<t&&f===o&&(a=r[s*t+f-1],n[0]=o+(i-a)/(c-a)-.5),
u>0&&u<e&&s===u&&(a=r[(s-1)*t+f],n[1]=u+(i-a)/(c-a)-.5)}))}
return i.contour=a,i.size=function(n){if(!arguments.length)return[t,e]
;var r=Math.ceil(n[0]),a=Math.ceil(n[1])
;if(!(r>0&&a>0))throw new Error("invalid size");return t=r,e=a,i
},i.thresholds=function(t){
return arguments.length?(n="function"==typeof t?t:Array.isArray(t)?Mm(xm.call(t)):Mm(t),
i):n},i.smooth=function(t){return arguments.length?(r=t?u:Am,i):r===u},i}
function zm(t,e,n){
for(var r=t.width,i=t.height,a=1+(n<<1),o=0;o<i;++o)for(var u=0,f=0;u<r+n;++u)u<r&&(f+=t.data[u+o*r]),
u>=n&&(u>=a&&(f-=t.data[u-a+o*r]),e.data[u-n+o*r]=f/Math.min(u+1,r-1+a-u,a))}
function Dm(t,e,n){
for(var r=t.width,i=t.height,a=1+(n<<1),o=0;o<r;++o)for(var u=0,f=0;u<i+n;++u)u<i&&(f+=t.data[o+u*r]),
u>=n&&(u>=a&&(f-=t.data[o+(u-a)*r]),e.data[o+(u-n)*r]=f/Math.min(u+1,i-1+a-u,a))
}function Nm(t){return t[0]}function Rm(t){return t[1]}function Tm(){return 1}
var Pm=["size","smooth"],Lm=["x","y","weight","size","cellSize","bandwidth"]
;function qm(t){Mr.call(this,null,t)}qm.Definition={type:"Contour",metadata:{
generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0
},{name:"values",type:"number",array:!0},{name:"x",type:"field"},{name:"y",
type:"field"},{name:"weight",type:"field"},{name:"cellSize",type:"number"},{
name:"bandwidth",type:"number"},{name:"count",type:"number"},{name:"smooth",
type:"boolean"},{name:"nice",type:"boolean",default:!1},{name:"thresholds",
type:"number",array:!0}]},$(qm,Mr).transform=function(t,e){
if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation
;var n,r,i,a=e.fork(e.NO_SOURCE|e.NO_FIELDS),o=t.count||10
;return t.values?(n=Om(),r=Pm,i=t.values):(n=function(){
var t=Nm,e=Rm,n=Tm,r=960,i=500,a=20,o=2,u=3*a,f=r+2*u>>o,s=i+2*u>>o,c=Mm(20)
;function l(r){var i=new Float32Array(f*s),l=new Float32Array(f*s)
;r.forEach((function(r,a,c){var l=+t(r,a,c)+u>>o,h=+e(r,a,c)+u>>o,d=+n(r,a,c)
;l>=0&&l<f&&h>=0&&h<s&&(i[l+h*f]+=d)})),zm({width:f,height:s,data:i},{width:f,
height:s,data:l},a>>o),Dm({width:f,height:s,data:l},{width:f,height:s,data:i
},a>>o),zm({width:f,height:s,data:i},{width:f,height:s,data:l},a>>o),Dm({
width:f,height:s,data:l},{width:f,height:s,data:i},a>>o),zm({width:f,height:s,
data:i},{width:f,height:s,data:l},a>>o),Dm({width:f,height:s,data:l},{width:f,
height:s,data:i},a>>o);var d=c(i);if(!Array.isArray(d)){var p=function(t,e){
var n,r,i=t.length,a=-1;if(null==e){
for(;++a<i;)if(null!=(n=t[a])&&n>=n)for(r=n;++a<i;)null!=(n=t[a])&&n>r&&(r=n)
}else for(;++a<i;)if(null!=(n=e(t[a],a,t))&&n>=n)for(r=n;++a<i;)null!=(n=e(t[a],a,t))&&n>r&&(r=n)
;return r}(i);d=bm(0,p,d),(d=gm(0,Math.floor(p/d)*d,d)).shift()}
return Om().thresholds(d).size([f,s])(i).map(h)}function h(t){
return t.value*=Math.pow(2,-2*o),t.coordinates.forEach(d),t}function d(t){
t.forEach(p)}function p(t){t.forEach(g)}function g(t){t[0]=t[0]*Math.pow(2,o)-u,
t[1]=t[1]*Math.pow(2,o)-u}function v(){return f=r+2*(u=3*a)>>o,s=i+2*u>>o,l}
return l.x=function(e){return arguments.length?(t="function"==typeof e?e:Mm(+e),
l):t},l.y=function(t){
return arguments.length?(e="function"==typeof t?t:Mm(+t),l):e
},l.weight=function(t){return arguments.length?(n="function"==typeof t?t:Mm(+t),
l):n},l.size=function(t){if(!arguments.length)return[r,i]
;var e=Math.ceil(t[0]),n=Math.ceil(t[1])
;if(!(e>=0||e>=0))throw new Error("invalid size");return r=e,i=n,v()
},l.cellSize=function(t){if(!arguments.length)return 1<<o
;if(!((t=+t)>=1))throw new Error("invalid cell size")
;return o=Math.floor(Math.log(t)/Math.LN2),v()},l.thresholds=function(t){
return arguments.length?(c="function"==typeof t?t:Array.isArray(t)?Mm(xm.call(t)):Mm(t),
l):c},l.bandwidth=function(t){if(!arguments.length)return Math.sqrt(a*(a+1))
;if(!((t=+t)>=0))throw new Error("invalid bandwidth")
;return a=Math.round((Math.sqrt(4*t*t+1)-1)/2),v()},l
}(),r=Lm,i=e.materialize(e.SOURCE).source),
n.thresholds(t.thresholds||(t.nice?o:function(t){return function(e){
for(var n=Wr(e),r=n[0],i=n[1]-r,a=[],o=1;o<=t;++o)a.push(r+i*o/(t+1));return a}
}(o))),r.forEach((function(e){null!=t[e]&&n[e](t[e])
})),this.value&&(a.rem=this.value),
i=i&&i.length?n(i).map(ct):[],this.value=a.source=a.add=i,a}
;var Um="FeatureCollection";function Fm(t){Mr.call(this,null,t)}function jm(){
return new Im}function Im(){this.reset()}Fm.Definition={type:"GeoJSON",
metadata:{},params:[{name:"fields",type:"field",array:!0,length:2},{
name:"geojson",type:"field"}]},$(Fm,Mr).transform=function(t,e){
var n,i=this._features,a=this._points,o=t.fields,u=o&&o[0],f=o&&o[1],s=t.geojson,c=e.ADD
;n=t.modified()||e.changed(e.REM)||e.modified(r(s))||u&&e.modified(r(u))||f&&e.modified(r(f)),
this.value&&!n||(c=e.SOURCE,
this._features=i=[],this._points=a=[]),s&&e.visit(c,(function(t){i.push(s(t))
})),u&&f&&(e.visit(c,(function(t){var e=u(t),n=f(t)
;null!=e&&null!=n&&(e=+e)===e&&(n=+n)===n&&a.push([e,n])})),i=i.concat({
type:"Feature",geometry:{type:"MultiPoint",coordinates:a}})),this.value={
type:Um,features:i}},Im.prototype={constructor:Im,reset:function(){
this.s=this.t=0},add:function(t){
Bm($m,t,this.t),Bm(this,$m.s,this.s),this.s?this.t+=$m.t:this.s=$m.t},
valueOf:function(){return this.s}};var $m=new Im;function Bm(t,e,n){
var r=t.s=e+n,i=r-e,a=r-i;t.t=e-a+(n-i)}
var Wm=1e-6,Ym=Math.PI,Gm=Ym/2,Hm=Ym/4,Vm=2*Ym,Xm=180/Ym,Jm=Ym/180,Zm=Math.abs,Qm=Math.atan,Km=Math.atan2,ty=Math.cos,ey=Math.ceil,ny=Math.exp,ry=Math.log,iy=Math.pow,ay=Math.sin,oy=Math.sign||function(t){
return t>0?1:t<0?-1:0},uy=Math.sqrt,fy=Math.tan;function sy(t){
return t>1?0:t<-1?Ym:Math.acos(t)}function cy(t){
return t>1?Gm:t<-1?-Gm:Math.asin(t)}function ly(){}function hy(t,e){
t&&py.hasOwnProperty(t.type)&&py[t.type](t,e)}var dy={Feature:function(t,e){
hy(t.geometry,e)},FeatureCollection:function(t,e){
for(var n=t.features,r=-1,i=n.length;++r<i;)hy(n[r].geometry,e)}},py={
Sphere:function(t,e){e.sphere()},Point:function(t,e){
t=t.coordinates,e.point(t[0],t[1],t[2])},MultiPoint:function(t,e){
for(var n=t.coordinates,r=-1,i=n.length;++r<i;)t=n[r],e.point(t[0],t[1],t[2])},
LineString:function(t,e){gy(t.coordinates,e,0)},MultiLineString:function(t,e){
for(var n=t.coordinates,r=-1,i=n.length;++r<i;)gy(n[r],e,0)},
Polygon:function(t,e){vy(t.coordinates,e)},MultiPolygon:function(t,e){
for(var n=t.coordinates,r=-1,i=n.length;++r<i;)vy(n[r],e)},
GeometryCollection:function(t,e){
for(var n=t.geometries,r=-1,i=n.length;++r<i;)hy(n[r],e)}};function gy(t,e,n){
var r,i=-1,a=t.length-n;for(e.lineStart();++i<a;)r=t[i],e.point(r[0],r[1],r[2])
;e.lineEnd()}function vy(t,e){var n=-1,r=t.length
;for(e.polygonStart();++n<r;)gy(t[n],e,1);e.polygonEnd()}function my(t,e){
t&&dy.hasOwnProperty(t.type)?dy[t.type](t,e):hy(t,e)}
var yy,by,_y,xy,wy,My=jm(),ky=jm(),Ey={point:ly,lineStart:ly,lineEnd:ly,
polygonStart:function(){My.reset(),Ey.lineStart=Sy,Ey.lineEnd=Ay},
polygonEnd:function(){var t=+My
;ky.add(t<0?Vm+t:t),this.lineStart=this.lineEnd=this.point=ly},
sphere:function(){ky.add(Vm)}};function Sy(){Ey.point=Cy}function Ay(){Oy(yy,by)
}function Cy(t,e){Ey.point=Oy,yy=t,by=e,_y=t*=Jm,xy=ty(e=(e*=Jm)/2+Hm),wy=ay(e)}
function Oy(t,e){
var n=(t*=Jm)-_y,r=n>=0?1:-1,i=r*n,a=ty(e=(e*=Jm)/2+Hm),o=ay(e),u=wy*o,f=xy*a+u*ty(i),s=u*r*ay(i)
;My.add(Km(s,f)),_y=t,xy=a,wy=o}function zy(t){return[Km(t[1],t[0]),cy(t[2])]}
function Dy(t){var e=t[0],n=t[1],r=ty(n);return[r*ty(e),r*ay(e),ay(n)]}
function Ny(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function Ry(t,e){
return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}
function Ty(t,e){t[0]+=e[0],t[1]+=e[1],t[2]+=e[2]}function Py(t,e){
return[t[0]*e,t[1]*e,t[2]*e]}function Ly(t){
var e=uy(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=e,t[1]/=e,t[2]/=e}
var qy,Uy,Fy,jy,Iy,$y,By,Wy,Yy,Gy,Hy,Vy,Xy,Jy,Zy,Qy,Ky,tb,eb,nb,rb,ib,ab,ob,ub,fb,sb=jm(),cb={
point:lb,lineStart:db,lineEnd:pb,polygonStart:function(){
cb.point=gb,cb.lineStart=vb,cb.lineEnd=mb,sb.reset(),Ey.polygonStart()},
polygonEnd:function(){Ey.polygonEnd(),cb.point=lb,cb.lineStart=db,cb.lineEnd=pb,
My<0?(qy=-(Fy=180),Uy=-(jy=90)):sb>Wm?jy=90:sb<-1e-6&&(Uy=-90),Gy[0]=qy,Gy[1]=Fy
}};function lb(t,e){Yy.push(Gy=[qy=t,Fy=t]),e<Uy&&(Uy=e),e>jy&&(jy=e)}
function hb(t,e){var n=Dy([t*Jm,e*Jm]);if(Wy){
var r=Ry(Wy,n),i=Ry([r[1],-r[0],0],r);Ly(i),i=zy(i)
;var a,o=t-Iy,u=o>0?1:-1,f=i[0]*Xm*u,s=Zm(o)>180
;s^(u*Iy<f&&f<u*t)?(a=i[1]*Xm)>jy&&(jy=a):s^(u*Iy<(f=(f+360)%360-180)&&f<u*t)?(a=-i[1]*Xm)<Uy&&(Uy=a):(e<Uy&&(Uy=e),
e>jy&&(jy=e)),
s?t<Iy?yb(qy,t)>yb(qy,Fy)&&(Fy=t):yb(t,Fy)>yb(qy,Fy)&&(qy=t):Fy>=qy?(t<qy&&(qy=t),
t>Fy&&(Fy=t)):t>Iy?yb(qy,t)>yb(qy,Fy)&&(Fy=t):yb(t,Fy)>yb(qy,Fy)&&(qy=t)
}else Yy.push(Gy=[qy=t,Fy=t]);e<Uy&&(Uy=e),e>jy&&(jy=e),Wy=n,Iy=t}function db(){
cb.point=hb}function pb(){Gy[0]=qy,Gy[1]=Fy,cb.point=lb,Wy=null}
function gb(t,e){if(Wy){var n=t-Iy;sb.add(Zm(n)>180?n+(n>0?360:-360):n)
}else $y=t,By=e;Ey.point(t,e),hb(t,e)}function vb(){Ey.lineStart()}
function mb(){
gb($y,By),Ey.lineEnd(),Zm(sb)>Wm&&(qy=-(Fy=180)),Gy[0]=qy,Gy[1]=Fy,Wy=null}
function yb(t,e){return(e-=t)<0?e+360:e}function bb(t,e){return t[0]-e[0]}
function _b(t,e){return t[0]<=t[1]?t[0]<=e&&e<=t[1]:e<t[0]||t[1]<e}var xb={
sphere:ly,point:wb,lineStart:kb,lineEnd:Ab,polygonStart:function(){
xb.lineStart=Cb,xb.lineEnd=Ob},polygonEnd:function(){
xb.lineStart=kb,xb.lineEnd=Ab}};function wb(t,e){t*=Jm;var n=ty(e*=Jm)
;Mb(n*ty(t),n*ay(t),ay(e))}function Mb(t,e,n){
++Hy,Xy+=(t-Xy)/Hy,Jy+=(e-Jy)/Hy,Zy+=(n-Zy)/Hy}function kb(){xb.point=Eb}
function Eb(t,e){t*=Jm;var n=ty(e*=Jm)
;ob=n*ty(t),ub=n*ay(t),fb=ay(e),xb.point=Sb,Mb(ob,ub,fb)}function Sb(t,e){t*=Jm
;var n=ty(e*=Jm),r=n*ty(t),i=n*ay(t),a=ay(e),o=Km(uy((o=ub*a-fb*i)*o+(o=fb*r-ob*a)*o+(o=ob*i-ub*r)*o),ob*r+ub*i+fb*a)
;Vy+=o,Qy+=o*(ob+(ob=r)),Ky+=o*(ub+(ub=i)),tb+=o*(fb+(fb=a)),Mb(ob,ub,fb)}
function Ab(){xb.point=wb}function Cb(){xb.point=zb}function Ob(){
Db(ib,ab),xb.point=wb}function zb(t,e){ib=t,ab=e,t*=Jm,e*=Jm,xb.point=Db
;var n=ty(e);ob=n*ty(t),ub=n*ay(t),fb=ay(e),Mb(ob,ub,fb)}function Db(t,e){t*=Jm
;var n=ty(e*=Jm),r=n*ty(t),i=n*ay(t),a=ay(e),o=ub*a-fb*i,u=fb*r-ob*a,f=ob*i-ub*r,s=uy(o*o+u*u+f*f),c=cy(s),l=s&&-c/s
;eb+=l*o,
nb+=l*u,rb+=l*f,Vy+=c,Qy+=c*(ob+(ob=r)),Ky+=c*(ub+(ub=i)),tb+=c*(fb+(fb=a)),
Mb(ob,ub,fb)}function Nb(t,e){function n(n,r){return n=t(n,r),e(n[0],n[1])}
return t.invert&&e.invert&&(n.invert=function(n,r){
return(n=e.invert(n,r))&&t.invert(n[0],n[1])}),n}function Rb(t,e){
return[Zm(t)>Ym?t+Math.round(-t/Vm)*Vm:t,e]}function Tb(t,e,n){
return(t%=Vm)?e||n?Nb(Lb(t),qb(e,n)):Lb(t):e||n?qb(e,n):Rb}function Pb(t){
return function(e,n){return[(e+=t)>Ym?e-Vm:e<-Ym?e+Vm:e,n]}}function Lb(t){
var e=Pb(t);return e.invert=Pb(-t),e}function qb(t,e){
var n=ty(t),r=ay(t),i=ty(e),a=ay(e);function o(t,e){
var o=ty(e),u=ty(t)*o,f=ay(t)*o,s=ay(e),c=s*n+u*r
;return[Km(f*i-c*a,u*n-s*r),cy(c*i+f*a)]}return o.invert=function(t,e){
var o=ty(e),u=ty(t)*o,f=ay(t)*o,s=ay(e),c=s*i-f*a
;return[Km(f*i+s*a,u*n+c*r),cy(c*n-u*r)]},o}function Ub(t,e){
(e=Dy(e))[0]-=t,Ly(e);var n=sy(-e[1]);return((-e[2]<0?-n:n)+Vm-Wm)%Vm}
function Fb(){var t,e=[];return{point:function(e,n){t.push([e,n])},
lineStart:function(){e.push(t=[])},lineEnd:ly,rejoin:function(){
e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var n=e
;return e=[],t=null,n}}}function jb(t,e){
return Zm(t[0]-e[0])<Wm&&Zm(t[1]-e[1])<Wm}function Ib(t,e,n,r){
this.x=t,this.z=e,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}
function $b(t,e,n,r,i){var a,o,u=[],f=[];if(t.forEach((function(t){
if(!((e=t.length-1)<=0)){var e,n,r=t[0],o=t[e];if(jb(r,o)){
for(i.lineStart(),a=0;a<e;++a)i.point((r=t[a])[0],r[1]);i.lineEnd()
}else u.push(n=new Ib(r,t,null,!0)),
f.push(n.o=new Ib(r,null,n,!1)),u.push(n=new Ib(o,t,null,!1)),
f.push(n.o=new Ib(o,null,n,!0))}})),u.length){
for(f.sort(e),Bb(u),Bb(f),a=0,o=f.length;a<o;++a)f[a].e=n=!n
;for(var s,c,l=u[0];;){for(var h=l,d=!0;h.v;)if((h=h.n)===l)return
;s=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){
if(d)for(a=0,o=s.length;a<o;++a)i.point((c=s[a])[0],c[1]);else r(h.x,h.n.x,1,i)
;h=h.n}else{
if(d)for(s=h.p.z,a=s.length-1;a>=0;--a)i.point((c=s[a])[0],c[1]);else r(h.x,h.p.x,-1,i)
;h=h.p}s=(h=h.o).z,d=!d}while(!h.v);i.lineEnd()}}}function Bb(t){if(e=t.length){
for(var e,n,r=0,i=t[0];++r<e;)i.n=n=t[r],n.p=i,i=n;i.n=n=t[0],n.p=i}}
Rb.invert=Rb;var Wb=jm();function Yb(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}
!function(t){1===t.length&&(t=function(t){return function(e,n){return Yb(t(e),n)
}}(t))}(Yb);function Gb(t,e,n){
t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n
;for(var r=-1,i=0|Math.max(0,Math.ceil((e-t)/n)),a=new Array(i);++r<i;)a[r]=t+r*n
;return a}function Hb(t){for(var e,n,r,i=t.length,a=-1,o=0;++a<i;)o+=t[a].length
;for(n=new Array(o);--i>=0;)for(e=(r=t[i]).length;--e>=0;)n[--o]=r[e];return n}
function Vb(t,e,n,r){return function(i){var a,o,u,f=e(i),s=Fb(),c=e(s),l=!1,h={
point:d,lineStart:g,lineEnd:v,polygonStart:function(){
h.point=m,h.lineStart=y,h.lineEnd=b,o=[],a=[]},polygonEnd:function(){
h.point=d,h.lineStart=g,h.lineEnd=v,o=Hb(o);var t=function(t,e){
var n=e[0],r=e[1],i=ay(r),a=[ay(n),-ty(n),0],o=0,u=0
;Wb.reset(),1===i?r=Gm+Wm:-1===i&&(r=-Gm-Wm)
;for(var f=0,s=t.length;f<s;++f)if(l=(c=t[f]).length)for(var c,l,h=c[l-1],d=h[0],p=h[1]/2+Hm,g=ay(p),v=ty(p),m=0;m<l;++m,
d=b,g=x,v=w,h=y){
var y=c[m],b=y[0],_=y[1]/2+Hm,x=ay(_),w=ty(_),M=b-d,k=M>=0?1:-1,E=k*M,S=E>Ym,A=g*x
;if(Wb.add(Km(A*k*ay(E),v*w+A*ty(E))),o+=S?M+k*Vm:M,S^d>=n^b>=n){
var C=Ry(Dy(h),Dy(y));Ly(C);var O=Ry(a,C);Ly(O);var z=(S^M>=0?-1:1)*cy(O[2])
;(r>z||r===z&&(C[0]||C[1]))&&(u+=S^M>=0?1:-1)}}
return(o<-1e-6||o<Wm&&Wb<-1e-6)^1&u}(a,r)
;o.length?(l||(i.polygonStart(),l=!0),$b(o,Jb,t,n,i)):t&&(l||(i.polygonStart(),
l=!0),
i.lineStart(),n(null,null,1,i),i.lineEnd()),l&&(i.polygonEnd(),l=!1),o=a=null},
sphere:function(){
i.polygonStart(),i.lineStart(),n(null,null,1,i),i.lineEnd(),i.polygonEnd()}}
;function d(e,n){t(e,n)&&i.point(e,n)}function p(t,e){f.point(t,e)}function g(){
h.point=p,f.lineStart()}function v(){h.point=d,f.lineEnd()}function m(t,e){
u.push([t,e]),c.point(t,e)}function y(){c.lineStart(),u=[]}function b(){
m(u[0][0],u[0][1]),c.lineEnd();var t,e,n,r,f=c.clean(),h=s.result(),d=h.length
;if(u.pop(),a.push(u),u=null,d)if(1&f){if((e=(n=h[0]).length-1)>0){
for(l||(i.polygonStart(),
l=!0),i.lineStart(),t=0;t<e;++t)i.point((r=n[t])[0],r[1]);i.lineEnd()}
}else d>1&&2&f&&h.push(h.pop().concat(h.shift())),o.push(h.filter(Xb))}return h}
}function Xb(t){return t.length>1}function Jb(t,e){
return((t=t.x)[0]<0?t[1]-Gm-Wm:Gm-t[1])-((e=e.x)[0]<0?e[1]-Gm-Wm:Gm-e[1])}
var Zb=Vb((function(){return!0}),(function(t){var e,n=NaN,r=NaN,i=NaN;return{
lineStart:function(){t.lineStart(),e=1},point:function(a,o){
var u=a>0?Ym:-Ym,f=Zm(a-n)
;Zm(f-Ym)<Wm?(t.point(n,r=(r+o)/2>0?Gm:-Gm),t.point(i,r),
t.lineEnd(),t.lineStart(),
t.point(u,r),t.point(a,r),e=0):i!==u&&f>=Ym&&(Zm(n-i)<Wm&&(n-=i*Wm),
Zm(a-u)<Wm&&(a-=u*Wm),r=function(t,e,n,r){var i,a,o=ay(t-n)
;return Zm(o)>Wm?Qm((ay(e)*(a=ty(r))*ay(n)-ay(r)*(i=ty(e))*ay(t))/(i*a*o)):(e+r)/2
}(n,r,a,o),
t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),e=0),t.point(n=a,r=o),i=u},
lineEnd:function(){t.lineEnd(),n=r=NaN},clean:function(){return 2-e}}
}),(function(t,e,n,r){var i
;if(null==t)i=n*Gm,r.point(-Ym,i),r.point(0,i),r.point(Ym,i),
r.point(Ym,0),r.point(Ym,-i),
r.point(0,-i),r.point(-Ym,-i),r.point(-Ym,0),r.point(-Ym,i);else if(Zm(t[0]-e[0])>Wm){
var a=t[0]<e[0]?Ym:-Ym;i=n*a/2,r.point(-a,i),r.point(0,i),r.point(a,i)
}else r.point(e[0],e[1])}),[-Ym,-Gm]);function Qb(t){
var e=ty(t),n=6*Jm,r=e>0,i=Zm(e)>Wm;function a(t,n){return ty(t)*ty(n)>e}
function o(t,n,r){var i=[1,0,0],a=Ry(Dy(t),Dy(n)),o=Ny(a,a),u=a[0],f=o-u*u
;if(!f)return!r&&t;var s=e*o/f,c=-e*u/f,l=Ry(i,a),h=Py(i,s);Ty(h,Py(a,c))
;var d=l,p=Ny(h,d),g=Ny(d,d),v=p*p-g*(Ny(h,h)-1);if(!(v<0)){
var m=uy(v),y=Py(d,(-p-m)/g);if(Ty(y,h),y=zy(y),!r)return y
;var b,_=t[0],x=n[0],w=t[1],M=n[1];x<_&&(b=_,_=x,x=b);var k=x-_,E=Zm(k-Ym)<Wm
;if(!E&&M<w&&(b=w,
w=M,M=b),E||k<Wm?E?w+M>0^y[1]<(Zm(y[0]-_)<Wm?w:M):w<=y[1]&&y[1]<=M:k>Ym^(_<=y[0]&&y[0]<=x)){
var S=Py(d,(-p+m)/g);return Ty(S,h),[y,zy(S)]}}}function u(e,n){
var i=r?t:Ym-t,a=0;return e<-i?a|=1:e>i&&(a|=2),n<-i?a|=4:n>i&&(a|=8),a}
return Vb(a,(function(t){var e,n,f,s,c;return{lineStart:function(){s=f=!1,c=1},
point:function(l,h){
var d,p=[l,h],g=a(l,h),v=r?g?0:u(l,h):g?u(l+(l<0?Ym:-Ym),h):0
;if(!e&&(s=f=g)&&t.lineStart(),
g!==f&&(!(d=o(e,p))||jb(e,d)||jb(p,d))&&(p[0]+=Wm,
p[1]+=Wm,g=a(p[0],p[1])),g!==f)c=0,
g?(t.lineStart(),d=o(p,e),t.point(d[0],d[1])):(d=o(e,p),
t.point(d[0],d[1]),t.lineEnd()),e=d;else if(i&&e&&r^g){var m
;v&n||!(m=o(p,e,!0))||(c=0,
r?(t.lineStart(),t.point(m[0][0],m[0][1]),t.point(m[1][0],m[1][1]),
t.lineEnd()):(t.point(m[1][0],m[1][1]),
t.lineEnd(),t.lineStart(),t.point(m[0][0],m[0][1])))}
!g||e&&jb(e,p)||t.point(p[0],p[1]),e=p,f=g,n=v},lineEnd:function(){
f&&t.lineEnd(),e=null},clean:function(){return c|(s&&f)<<1}}
}),(function(e,r,i,a){!function(t,e,n,r,i,a){if(n){var o=ty(e),u=ay(e),f=r*n
;null==i?(i=e+r*Vm,a=e-f/2):(i=Ub(o,i),a=Ub(o,a),(r>0?i<a:i>a)&&(i+=r*Vm))
;for(var s,c=i;r>0?c>a:c<a;c-=f)s=zy([o,-u*ty(c),-u*ay(c)]),t.point(s[0],s[1])}
}(a,t,n,i,e,r)}),r?[0,-t]:[-Ym,t-Ym])}var Kb=1e9,t_=-Kb;function e_(t,e,n,r){
function i(i,a){return t<=i&&i<=n&&e<=a&&a<=r}function a(i,a,u,s){var c=0,l=0
;if(null==i||(c=o(i,u))!==(l=o(a,u))||f(i,a)<0^u>0)do{
s.point(0===c||3===c?t:n,c>1?r:e)
}while((c=(c+u+4)%4)!==l);else s.point(a[0],a[1])}function o(r,i){
return Zm(r[0]-t)<Wm?i>0?0:3:Zm(r[0]-n)<Wm?i>0?2:1:Zm(r[1]-e)<Wm?i>0?1:0:i>0?3:2
}function u(t,e){return f(t.x,e.x)}function f(t,e){var n=o(t,1),r=o(e,1)
;return n!==r?n-r:0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0]}
return function(o){var f,s,c,l,h,d,p,g,v,m,y,b=o,_=Fb(),x={point:w,
lineStart:function(){x.point=M,s&&s.push(c=[]);m=!0,v=!1,p=g=NaN},
lineEnd:function(){f&&(M(l,h),d&&v&&_.rejoin(),f.push(_.result()))
;x.point=w,v&&b.lineEnd()},polygonStart:function(){b=_,f=[],s=[],y=!0},
polygonEnd:function(){var e=function(){
for(var e=0,n=0,i=s.length;n<i;++n)for(var a,o,u=s[n],f=1,c=u.length,l=u[0],h=l[0],d=l[1];f<c;++f)a=h,
o=d,
h=(l=u[f])[0],d=l[1],o<=r?d>r&&(h-a)*(r-o)>(d-o)*(t-a)&&++e:d<=r&&(h-a)*(r-o)<(d-o)*(t-a)&&--e
;return e}(),n=y&&e,i=(f=Hb(f)).length
;(n||i)&&(o.polygonStart(),n&&(o.lineStart(),
a(null,null,1,o),o.lineEnd()),i&&$b(f,u,e,a,o),o.polygonEnd());b=o,f=s=c=null}}
;function w(t,e){i(t,e)&&b.point(t,e)}function M(a,o){var u=i(a,o)
;if(s&&c.push([a,o]),
m)l=a,h=o,d=u,m=!1,u&&(b.lineStart(),b.point(a,o));else if(u&&v)b.point(a,o);else{
var f=[p=Math.max(t_,Math.min(Kb,p)),g=Math.max(t_,Math.min(Kb,g))],_=[a=Math.max(t_,Math.min(Kb,a)),o=Math.max(t_,Math.min(Kb,o))]
;!function(t,e,n,r,i,a){var o,u=t[0],f=t[1],s=0,c=1,l=e[0]-u,h=e[1]-f
;if(o=n-u,l||!(o>0)){if(o/=l,l<0){if(o<s)return;o<c&&(c=o)}else if(l>0){
if(o>c)return;o>s&&(s=o)}if(o=i-u,l||!(o<0)){if(o/=l,l<0){if(o>c)return
;o>s&&(s=o)}else if(l>0){if(o<s)return;o<c&&(c=o)}if(o=r-f,h||!(o>0)){
if(o/=h,h<0){if(o<s)return;o<c&&(c=o)}else if(h>0){if(o>c)return;o>s&&(s=o)}
if(o=a-f,h||!(o<0)){if(o/=h,h<0){if(o>c)return;o>s&&(s=o)}else if(h>0){
if(o<s)return;o<c&&(c=o)}
return s>0&&(t[0]=u+s*l,t[1]=f+s*h),c<1&&(e[0]=u+c*l,e[1]=f+c*h),!0}}}}
}(f,_,t,e,n,r)?u&&(b.lineStart(),
b.point(a,o),y=!1):(v||(b.lineStart(),b.point(f[0],f[1])),
b.point(_[0],_[1]),u||b.lineEnd(),y=!1)}p=a,g=o,v=u}return x}}jm()
;function n_(t,e,n){var r=Gb(t,e-Wm,n).concat(e);return function(t){
return r.map((function(e){return[t,e]}))}}function r_(t,e,n){
var r=Gb(t,e-Wm,n).concat(e);return function(t){return r.map((function(e){
return[e,t]}))}}function i_(t){return t}var a_,o_,u_,f_,s_=jm(),c_=jm(),l_={
point:ly,lineStart:ly,lineEnd:ly,polygonStart:function(){
l_.lineStart=h_,l_.lineEnd=g_},polygonEnd:function(){
l_.lineStart=l_.lineEnd=l_.point=ly,s_.add(Zm(c_)),c_.reset()},
result:function(){var t=s_/2;return s_.reset(),t}};function h_(){l_.point=d_}
function d_(t,e){l_.point=p_,a_=u_=t,o_=f_=e}function p_(t,e){c_.add(f_*t-u_*e),
u_=t,f_=e}function g_(){p_(a_,o_)}var v_=1/0,m_=v_,y_=-v_,b_=y_,__={
point:function(t,e){t<v_&&(v_=t);t>y_&&(y_=t);e<m_&&(m_=e);e>b_&&(b_=e)},
lineStart:ly,lineEnd:ly,polygonStart:ly,polygonEnd:ly,result:function(){
var t=[[v_,m_],[y_,b_]];return y_=b_=-(m_=v_=1/0),t}}
;var x_,w_,M_,k_,E_=0,S_=0,A_=0,C_=0,O_=0,z_=0,D_=0,N_=0,R_=0,T_={point:P_,
lineStart:L_,lineEnd:F_,polygonStart:function(){T_.lineStart=j_,T_.lineEnd=I_},
polygonEnd:function(){T_.point=P_,T_.lineStart=L_,T_.lineEnd=F_},
result:function(){
var t=R_?[D_/R_,N_/R_]:z_?[C_/z_,O_/z_]:A_?[E_/A_,S_/A_]:[NaN,NaN]
;return E_=S_=A_=C_=O_=z_=D_=N_=R_=0,t}};function P_(t,e){E_+=t,S_+=e,++A_}
function L_(){T_.point=q_}function q_(t,e){T_.point=U_,P_(M_=t,k_=e)}
function U_(t,e){var n=t-M_,r=e-k_,i=uy(n*n+r*r)
;C_+=i*(M_+t)/2,O_+=i*(k_+e)/2,z_+=i,P_(M_=t,k_=e)}function F_(){T_.point=P_}
function j_(){T_.point=$_}function I_(){B_(x_,w_)}function $_(t,e){
T_.point=B_,P_(x_=M_=t,w_=k_=e)}function B_(t,e){var n=t-M_,r=e-k_,i=uy(n*n+r*r)
;C_+=i*(M_+t)/2,
O_+=i*(k_+e)/2,z_+=i,D_+=(i=k_*t-M_*e)*(M_+t),N_+=i*(k_+e),R_+=3*i,P_(M_=t,k_=e)
}function W_(t){this._context=t}W_.prototype={_radius:4.5,
pointRadius:function(t){return this._radius=t,this},polygonStart:function(){
this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){
this._point=0},lineEnd:function(){
0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,e){
switch(this._point){case 0:this._context.moveTo(t,e),this._point=1;break;case 1:
this._context.lineTo(t,e);break;default:
this._context.moveTo(t+this._radius,e),this._context.arc(t,e,this._radius,0,Vm)}
},result:ly};var Y_,G_,H_,V_,X_,J_=jm(),Z_={point:ly,lineStart:function(){
Z_.point=Q_},lineEnd:function(){Y_&&K_(G_,H_),Z_.point=ly},
polygonStart:function(){Y_=!0},polygonEnd:function(){Y_=null},result:function(){
var t=+J_;return J_.reset(),t}};function Q_(t,e){Z_.point=K_,G_=V_=t,H_=X_=e}
function K_(t,e){V_-=t,X_-=e,J_.add(uy(V_*V_+X_*X_)),V_=t,X_=e}function tx(){
this._string=[]}function ex(t){
return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}
function nx(t,e){var n,r,i=4.5;function a(t){
return t&&("function"==typeof i&&r.pointRadius(+i.apply(this,arguments)),
my(t,n(r))),r.result()}return a.area=function(t){return my(t,n(l_)),l_.result()
},a.measure=function(t){return my(t,n(Z_)),Z_.result()},a.bounds=function(t){
return my(t,n(__)),__.result()},a.centroid=function(t){
return my(t,n(T_)),T_.result()},a.projection=function(e){
return arguments.length?(n=null==e?(t=null,i_):(t=e).stream,a):t
},a.context=function(t){
return arguments.length?(r=null==t?(e=null,new tx):new W_(e=t),
"function"!=typeof i&&r.pointRadius(i),a):e},a.pointRadius=function(t){
return arguments.length?(i="function"==typeof t?t:(r.pointRadius(+t),+t),a):i
},a.projection(t).context(e)}function rx(t){return function(e){var n=new ix
;for(var r in t)n[r]=t[r];return n.stream=e,n}}function ix(){}
function ax(t,e,n){var r=t.clipExtent&&t.clipExtent()
;return t.scale(150).translate([0,0]),
null!=r&&t.clipExtent(null),my(n,t.stream(__)),
e(__.result()),null!=r&&t.clipExtent(r),t}function ox(t,e,n){
return ax(t,(function(n){
var r=e[1][0]-e[0][0],i=e[1][1]-e[0][1],a=Math.min(r/(n[1][0]-n[0][0]),i/(n[1][1]-n[0][1])),o=+e[0][0]+(r-a*(n[1][0]+n[0][0]))/2,u=+e[0][1]+(i-a*(n[1][1]+n[0][1]))/2
;t.scale(150*a).translate([o,u])}),n)}function ux(t,e,n){
return ox(t,[[0,0],e],n)}function fx(t,e,n){return ax(t,(function(n){
var r=+e,i=r/(n[1][0]-n[0][0]),a=(r-i*(n[1][0]+n[0][0]))/2,o=-i*n[0][1]
;t.scale(150*i).translate([a,o])}),n)}function sx(t,e,n){
return ax(t,(function(n){
var r=+e,i=r/(n[1][1]-n[0][1]),a=-i*n[0][0],o=(r-i*(n[1][1]+n[0][1]))/2
;t.scale(150*i).translate([a,o])}),n)}tx.prototype={_radius:4.5,_circle:ex(4.5),
pointRadius:function(t){
return(t=+t)!==this._radius&&(this._radius=t,this._circle=null),this},
polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},
lineStart:function(){this._point=0},lineEnd:function(){
0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,e){
switch(this._point){case 0:this._string.push("M",t,",",e),this._point=1;break
;case 1:this._string.push("L",t,",",e);break;default:
null==this._circle&&(this._circle=ex(this._radius)),
this._string.push("M",t,",",e,this._circle)}},result:function(){
if(this._string.length){var t=this._string.join("");return this._string=[],t}
return null}},ix.prototype={constructor:ix,point:function(t,e){
this.stream.point(t,e)},sphere:function(){this.stream.sphere()},
lineStart:function(){this.stream.lineStart()},lineEnd:function(){
this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},
polygonEnd:function(){this.stream.polygonEnd()}};var cx=ty(30*Jm)
;function lx(t,e){return+e?function(t,e){
function n(r,i,a,o,u,f,s,c,l,h,d,p,g,v){var m=s-r,y=c-i,b=m*m+y*y
;if(b>4*e&&g--){
var _=o+h,x=u+d,w=f+p,M=uy(_*_+x*x+w*w),k=cy(w/=M),E=Zm(Zm(w)-1)<Wm||Zm(a-l)<Wm?(a+l)/2:Km(x,_),S=t(E,k),A=S[0],C=S[1],O=A-r,z=C-i,D=y*O-m*z
;(D*D/b>e||Zm((m*O+y*z)/b-.5)>.3||o*h+u*d+f*p<cx)&&(n(r,i,a,o,u,f,A,C,E,_/=M,x/=M,w,g,v),
v.point(A,C),n(A,C,E,_,x,w,s,c,l,h,d,p,g,v))}}return function(e){
var r,i,a,o,u,f,s,c,l,h,d,p,g={point:v,lineStart:m,lineEnd:b,
polygonStart:function(){e.polygonStart(),g.lineStart=_},polygonEnd:function(){
e.polygonEnd(),g.lineStart=m}};function v(n,r){n=t(n,r),e.point(n[0],n[1])}
function m(){c=NaN,g.point=y,e.lineStart()}function y(r,i){
var a=Dy([r,i]),o=t(r,i)
;n(c,l,s,h,d,p,c=o[0],l=o[1],s=r,h=a[0],d=a[1],p=a[2],16,e),e.point(c,l)}
function b(){g.point=v,e.lineEnd()}function _(){m(),g.point=x,g.lineEnd=w}
function x(t,e){y(r=t,e),i=c,a=l,o=h,u=d,f=p,g.point=y}function w(){
n(c,l,s,h,d,p,i,a,r,o,u,f,16,e),g.lineEnd=b,b()}return g}}(t,e):function(t){
return rx({point:function(e,n){e=t(e,n),this.stream.point(e[0],e[1])}})}(t)}
var hx=rx({point:function(t,e){this.stream.point(t*Jm,e*Jm)}})
;function dx(t,e,n){function r(r,i){return[e+t*r,n-t*i]}
return r.invert=function(r,i){return[(r-e)/t,(n-i)/t]},r}function px(t,e,n,r){
var i=ty(r),a=ay(r),o=i*t,u=a*t,f=i/t,s=a/t,c=(a*n-i*e)/t,l=(a*e+i*n)/t
;function h(t,r){return[o*t-u*r+e,n-u*t-o*r]}return h.invert=function(t,e){
return[f*t-s*e+c,l-s*t-f*e]},h}function gx(t){return vx((function(){return t
}))()}function vx(t){
var e,n,r,i,a,o,u,f,s,c,l=150,h=480,d=250,p=0,g=0,v=0,m=0,y=0,b=0,_=null,x=Zb,w=null,M=i_,k=.5
;function E(t){return f(t[0]*Jm,t[1]*Jm)}function S(t){
return(t=f.invert(t[0],t[1]))&&[t[0]*Xm,t[1]*Xm]}function A(){
var t=px(l,0,0,b).apply(null,e(p,g)),r=(b?px:dx)(l,h-t[0],d-t[1],b)
;return n=Tb(v,m,y),u=Nb(e,r),f=Nb(n,u),o=lx(u,k),C()}function C(){
return s=c=null,E}return E.stream=function(t){
return s&&c===t?s:s=hx(function(t){return rx({point:function(e,n){var r=t(e,n)
;return this.stream.point(r[0],r[1])}})}(n)(x(o(M(c=t)))))
},E.preclip=function(t){return arguments.length?(x=t,_=void 0,C()):x
},E.postclip=function(t){return arguments.length?(M=t,w=r=i=a=null,C()):M
},E.clipAngle=function(t){
return arguments.length?(x=+t?Qb(_=t*Jm):(_=null,Zb),C()):_*Xm
},E.clipExtent=function(t){
return arguments.length?(M=null==t?(w=r=i=a=null,i_):e_(w=+t[0][0],r=+t[0][1],i=+t[1][0],a=+t[1][1]),
C()):null==w?null:[[w,r],[i,a]]},E.scale=function(t){
return arguments.length?(l=+t,A()):l},E.translate=function(t){
return arguments.length?(h=+t[0],d=+t[1],A()):[h,d]},E.center=function(t){
return arguments.length?(p=t[0]%360*Jm,g=t[1]%360*Jm,A()):[p*Xm,g*Xm]
},E.rotate=function(t){
return arguments.length?(v=t[0]%360*Jm,m=t[1]%360*Jm,y=t.length>2?t[2]%360*Jm:0,
A()):[v*Xm,m*Xm,y*Xm]},E.angle=function(t){
return arguments.length?(b=t%360*Jm,A()):b*Xm},E.precision=function(t){
return arguments.length?(o=lx(u,k=t*t),C()):uy(k)},E.fitExtent=function(t,e){
return ox(E,t,e)},E.fitSize=function(t,e){return ux(E,t,e)
},E.fitWidth=function(t,e){return fx(E,t,e)},E.fitHeight=function(t,e){
return sx(E,t,e)},function(){
return e=t.apply(this,arguments),E.invert=e.invert&&S,A()}}function mx(t){
var e=0,n=Ym/3,r=vx(t),i=r(e,n);return i.parallels=function(t){
return arguments.length?r(e=t[0]*Jm,n=t[1]*Jm):[e*Xm,n*Xm]},i}function yx(t,e){
var n=ay(t),r=(n+ay(e))/2;if(Zm(r)<Wm)return function(t){var e=ty(t)
;function n(t,n){return[t*e,ay(n)/e]}return n.invert=function(t,n){
return[t/e,cy(n*e)]},n}(t);var i=1+n*(2*r-n),a=uy(i)/r;function o(t,e){
var n=uy(i-2*r*ay(e))/r;return[n*ay(t*=r),a-n*ty(t)]}
return o.invert=function(t,e){var n=a-e
;return[Km(t,Zm(n))/r*oy(n),cy((i-(t*t+n*n)*r*r)/(2*r))]},o}function bx(){
return mx(yx).scale(155.424).center([0,33.6442])}function _x(){
return bx().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])
}function xx(t){return function(e,n){var r=ty(e),i=ty(n),a=t(r*i)
;return[a*i*ay(e),a*ay(n)]}}function wx(t){return function(e,n){
var r=uy(e*e+n*n),i=t(r),a=ay(i),o=ty(i);return[Km(e*a,r*o),cy(r&&n*a/r)]}}
var Mx=xx((function(t){return uy(2/(1+t))}));Mx.invert=wx((function(t){
return 2*cy(t/2)}));var kx=xx((function(t){return(t=sy(t))&&t/ay(t)}))
;function Ex(t,e){return[t,ry(fy((Gm+e)/2))]}function Sx(t){
var e,n,r,i=gx(t),a=i.center,o=i.scale,u=i.translate,f=i.clipExtent,s=null
;function c(){var a=Ym*o(),u=i(function(t){function e(e){
return(e=t(e[0]*Jm,e[1]*Jm))[0]*=Xm,e[1]*=Xm,e}
return t=Tb(t[0]*Jm,t[1]*Jm,t.length>2?t[2]*Jm:0),e.invert=function(e){
return(e=t.invert(e[0]*Jm,e[1]*Jm))[0]*=Xm,e[1]*=Xm,e},e
}(i.rotate()).invert([0,0]))
;return f(null==s?[[u[0]-a,u[1]-a],[u[0]+a,u[1]+a]]:t===Ex?[[Math.max(u[0]-a,s),e],[Math.min(u[0]+a,n),r]]:[[s,Math.max(u[1]-a,e)],[n,Math.min(u[1]+a,r)]])
}return i.scale=function(t){return arguments.length?(o(t),c()):o()
},i.translate=function(t){return arguments.length?(u(t),c()):u()
},i.center=function(t){return arguments.length?(a(t),c()):a()
},i.clipExtent=function(t){
return arguments.length?(null==t?s=e=n=r=null:(s=+t[0][0],e=+t[0][1],n=+t[1][0],
r=+t[1][1]),c()):null==s?null:[[s,e],[n,r]]},c()}function Ax(t){
return fy((Gm+t)/2)}function Cx(t,e){
var n=ty(t),r=t===e?ay(t):ry(n/ty(e))/ry(Ax(e)/Ax(t)),i=n*iy(Ax(t),r)/r
;if(!r)return Ex;function a(t,e){i>0?e<-Gm+Wm&&(e=-Gm+Wm):e>Gm-Wm&&(e=Gm-Wm)
;var n=i/iy(Ax(e),r);return[n*ay(r*t),i-n*ty(r*t)]}
return a.invert=function(t,e){var n=i-e,a=oy(r)*uy(t*t+n*n)
;return[Km(t,Zm(n))/r*oy(n),2*Qm(iy(i/a,1/r))-Gm]},a}function Ox(t,e){
return[t,e]}function zx(t,e){var n=ty(t),r=t===e?ay(t):(n-ty(e))/(e-t),i=n/r+t
;if(Zm(r)<Wm)return Ox;function a(t,e){var n=i-e,a=r*t;return[n*ay(a),i-n*ty(a)]
}return a.invert=function(t,e){var n=i-e
;return[Km(t,Zm(n))/r*oy(n),i-oy(r)*uy(t*t+n*n)]},a}function Dx(t,e){
var n=ty(e),r=ty(t)*n;return[n*ay(t)/r,ay(e)/r]}function Nx(t,e,n,r){
return 1===t&&1===e&&0===n&&0===r?i_:rx({point:function(i,a){
this.stream.point(i*t+n,a*e+r)}})}function Rx(t,e){var n=e*e,r=n*n
;return[t*(.8707-.131979*n+r*(r*(.003971*n-.001529*r)-.013791)),e*(1.007226+n*(.015085+r*(.028874*n-.044475-.005916*r)))]
}function Tx(t,e){return[ty(e)*ay(t),ay(e)]}function Px(t,e){
var n=ty(e),r=1+ty(t)*n;return[n*ay(t)/r,ay(e)/r]}function Lx(t,e){
return[ry(fy((Gm+e)/2)),-t]}kx.invert=wx((function(t){return t
})),Ex.invert=function(t,e){return[t,2*Qm(ny(e))-Gm]
},Ox.invert=Ox,Dx.invert=wx(Qm),Rx.invert=function(t,e){var n,r=e,i=25;do{
var a=r*r,o=a*a
;r-=n=(r*(1.007226+a*(.015085+o*(.028874*a-.044475-.005916*o)))-e)/(1.007226+a*(.045255+o*(.259866*a-.311325-.005916*11*o)))
}while(Zm(n)>Wm&&--i>0)
;return[t/(.8707+(a=r*r)*(a*(a*a*a*(.003971-.001529*a)-.013791)-.131979)),r]
},Tx.invert=wx(cy),Px.invert=wx((function(t){return 2*Qm(t)
})),Lx.invert=function(t,e){return[-e,2*Qm(ny(t))-Gm]}
;var qx=nx(),Ux=["clipAngle","clipExtent","scale","translate","center","rotate","parallels","precision","reflectX","reflectY","coefficient","distance","fraction","lobes","parallel","radius","ratio","spacing","tilt"]
;function Fx(t,e){return function n(){var r=e()
;return r.type=t,r.path=nx().projection(r),r.copy=r.copy||function(){var t=n()
;return Ux.forEach((function(e){r.hasOwnProperty(e)&&t[e](r[e]())
})),t.path.pointRadius(r.path.pointRadius()),t},r}}function jx(t,e){
if(!t||"string"!=typeof t)throw new Error("Projection type must be a name string.")
;return t=t.toLowerCase(),
arguments.length>1?($x[t]=Fx(t,e),this):$x.hasOwnProperty(t)?$x[t]:null}
function Ix(t){return t&&t.path||qx}var $x={albers:_x,albersusa:function(){
var t,e,n,r,i,a,o=_x(),u=bx().rotate([154,0]).center([-2,58.5]).parallels([55,65]),f=bx().rotate([157,0]).center([-3,19.9]).parallels([8,18]),s={
point:function(t,e){a=[t,e]}};function c(t){var e=t[0],o=t[1]
;return a=null,n.point(e,o),a||(r.point(e,o),a)||(i.point(e,o),a)}function l(){
return t=e=null,c}return c.invert=function(t){
var e=o.scale(),n=o.translate(),r=(t[0]-n[0])/e,i=(t[1]-n[1])/e
;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?u:i>=.166&&i<.234&&r>=-.214&&r<-.115?f:o).invert(t)
},c.stream=function(n){return t&&e===n?t:t=function(t){var e=t.length;return{
point:function(n,r){for(var i=-1;++i<e;)t[i].point(n,r)},sphere:function(){
for(var n=-1;++n<e;)t[n].sphere()},lineStart:function(){
for(var n=-1;++n<e;)t[n].lineStart()},lineEnd:function(){
for(var n=-1;++n<e;)t[n].lineEnd()},polygonStart:function(){
for(var n=-1;++n<e;)t[n].polygonStart()},polygonEnd:function(){
for(var n=-1;++n<e;)t[n].polygonEnd()}}
}([o.stream(e=n),u.stream(n),f.stream(n)])},c.precision=function(t){
return arguments.length?(o.precision(t),
u.precision(t),f.precision(t),l()):o.precision()},c.scale=function(t){
return arguments.length?(o.scale(t),
u.scale(.35*t),f.scale(t),c.translate(o.translate())):o.scale()
},c.translate=function(t){if(!arguments.length)return o.translate()
;var e=o.scale(),a=+t[0],c=+t[1]
;return n=o.translate(t).clipExtent([[a-.455*e,c-.238*e],[a+.455*e,c+.238*e]]).stream(s),
r=u.translate([a-.307*e,c+.201*e]).clipExtent([[a-.425*e+Wm,c+.12*e+Wm],[a-.214*e-Wm,c+.234*e-Wm]]).stream(s),
i=f.translate([a-.205*e,c+.212*e]).clipExtent([[a-.214*e+Wm,c+.166*e+Wm],[a-.115*e-Wm,c+.234*e-Wm]]).stream(s),
l()},c.fitExtent=function(t,e){return ox(c,t,e)},c.fitSize=function(t,e){
return ux(c,t,e)},c.fitWidth=function(t,e){return fx(c,t,e)
},c.fitHeight=function(t,e){return sx(c,t,e)},c.scale(1070)},
azimuthalequalarea:function(){return gx(Mx).scale(124.75).clipAngle(179.999)},
azimuthalequidistant:function(){return gx(kx).scale(79.4188).clipAngle(179.999)
},conicconformal:function(){return mx(Cx).scale(109.5).parallels([30,30])},
conicequalarea:bx,conicequidistant:function(){
return mx(zx).scale(131.154).center([0,13.9389])},equirectangular:function(){
return gx(Ox).scale(152.63)},gnomonic:function(){
return gx(Dx).scale(144.049).clipAngle(60)},identity:function(){
var t,e,n,r,i,a,o=1,u=0,f=0,s=1,c=1,l=i_,h=null,d=i_;function p(){
return r=i=null,a}return a={stream:function(t){return r&&i===t?r:r=l(d(i=t))},
postclip:function(r){return arguments.length?(d=r,h=t=e=n=null,p()):d},
clipExtent:function(r){
return arguments.length?(d=null==r?(h=t=e=n=null,i_):e_(h=+r[0][0],t=+r[0][1],e=+r[1][0],n=+r[1][1]),
p()):null==h?null:[[h,t],[e,n]]},scale:function(t){
return arguments.length?(l=Nx((o=+t)*s,o*c,u,f),p()):o},translate:function(t){
return arguments.length?(l=Nx(o*s,o*c,u=+t[0],f=+t[1]),p()):[u,f]},
reflectX:function(t){
return arguments.length?(l=Nx(o*(s=t?-1:1),o*c,u,f),p()):s<0},
reflectY:function(t){
return arguments.length?(l=Nx(o*s,o*(c=t?-1:1),u,f),p()):c<0},
fitExtent:function(t,e){return ox(a,t,e)},fitSize:function(t,e){return ux(a,t,e)
},fitWidth:function(t,e){return fx(a,t,e)},fitHeight:function(t,e){
return sx(a,t,e)}}},mercator:function(){return Sx(Ex).scale(961/Vm)},
naturalEarth1:function(){return gx(Rx).scale(175.295)},orthographic:function(){
return gx(Tx).scale(249.5).clipAngle(90.000001)},stereographic:function(){
return gx(Px).scale(250).clipAngle(142)},transversemercator:function(){
var t=Sx(Lx),e=t.center,n=t.rotate;return t.center=function(t){
return arguments.length?e([-t[1],t[0]]):[(t=e())[1],-t[0]]
},t.rotate=function(t){
return arguments.length?n([t[0],t[1],t.length>2?t[2]+90:90]):[(t=n())[0],t[1],t[2]-90]
},n([0,0,90]).scale(159.155)}};for(var Bx in $x)jx(Bx,$x[Bx]);function Wx(t){
Mr.call(this,null,t)}function Yx(t){Mr.call(this,null,t)}function Gx(t){
Mr.call(this,null,t)}function Hx(t){
Mr.call(this,[],t),this.generator=function(){
var t,e,n,r,i,a,o,u,f,s,c,l,h=10,d=h,p=90,g=360,v=2.5;function m(){return{
type:"MultiLineString",coordinates:y()}}function y(){
return Gb(ey(r/p)*p,n,p).map(c).concat(Gb(ey(u/g)*g,o,g).map(l)).concat(Gb(ey(e/h)*h,t,h).filter((function(t){
return Zm(t%p)>Wm})).map(f)).concat(Gb(ey(a/d)*d,i,d).filter((function(t){
return Zm(t%g)>Wm})).map(s))}return m.lines=function(){
return y().map((function(t){return{type:"LineString",coordinates:t}}))
},m.outline=function(){return{type:"Polygon",
coordinates:[c(r).concat(l(o).slice(1),c(n).reverse().slice(1),l(u).reverse().slice(1))]
}},m.extent=function(t){
return arguments.length?m.extentMajor(t).extentMinor(t):m.extentMinor()
},m.extentMajor=function(t){
return arguments.length?(r=+t[0][0],n=+t[1][0],u=+t[0][1],
o=+t[1][1],r>n&&(t=r,r=n,n=t),u>o&&(t=u,u=o,o=t),m.precision(v)):[[r,u],[n,o]]},
m.extentMinor=function(n){
return arguments.length?(e=+n[0][0],t=+n[1][0],a=+n[0][1],
i=+n[1][1],e>t&&(n=e,e=t,t=n),a>i&&(n=a,a=i,i=n),m.precision(v)):[[e,a],[t,i]]},
m.step=function(t){
return arguments.length?m.stepMajor(t).stepMinor(t):m.stepMinor()
},m.stepMajor=function(t){return arguments.length?(p=+t[0],g=+t[1],m):[p,g]
},m.stepMinor=function(t){return arguments.length?(h=+t[0],d=+t[1],m):[h,d]
},m.precision=function(h){
return arguments.length?(v=+h,f=n_(a,i,90),s=r_(e,t,v),c=n_(u,o,90),l=r_(r,n,v),
m):v
},m.extentMajor([[-180,-89.999999],[180,89.999999]]).extentMinor([[-180,-80.000001],[180,80.000001]])
}()}function Vx(t){Mr.call(this,null,t),this.modified(!0)}function Xx(t,e,n){
T(t[e])&&t[e](n)}Wx.Definition={type:"GeoPath",metadata:{modifies:!0},params:[{
name:"projection",type:"projection"},{name:"field",type:"field"},{
name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",
default:"path"}]},$(Wx,Mr).transform=function(t,e){
var n=e.fork(e.ALL),r=this.value,i=t.field||d,a=t.as||"path",o=n.SOURCE
;!r||t.modified()?(this.value=r=Ix(t.projection),
n.materialize().reflow()):o=i===d||e.modified(i.fields)?n.ADD_MOD:n.ADD
;var u=function(t,e){var n=t.pointRadius()
;t.context(null),null!=e&&t.pointRadius(e);return n}(r,t.pointRadius)
;return n.visit(o,(function(t){t[a]=r(i(t))})),r.pointRadius(u),n.modifies(a)
},Yx.Definition={type:"GeoPoint",metadata:{modifies:!0},params:[{
name:"projection",type:"projection",required:!0},{name:"fields",type:"field",
array:!0,required:!0,length:2},{name:"as",type:"string",array:!0,length:2,
default:["x","y"]}]},$(Yx,Mr).transform=function(t,e){
var n,r=t.projection,i=t.fields[0],a=t.fields[1],o=t.as||["x","y"],u=o[0],f=o[1]
;function s(t){var e=r([i(t),a(t)])
;e?(t[u]=e[0],t[f]=e[1]):(t[u]=void 0,t[f]=void 0)}
return t.modified()?e=e.materialize().reflow(!0).visit(e.SOURCE,s):(n=e.modified(i.fields)||e.modified(a.fields),
e.visit(n?e.ADD_MOD:e.ADD,s)),e.modifies(o)},Gx.Definition={type:"GeoShape",
metadata:{modifies:!0},params:[{name:"projection",type:"projection"},{
name:"field",type:"field",default:"datum"},{name:"pointRadius",type:"number",
expr:!0},{name:"as",type:"string",default:"shape"}]
},$(Gx,Mr).transform=function(t,e){
var n=e.fork(e.ALL),r=this.value,i=t.field||c("datum"),a=t.as||"shape",o=n.ADD_MOD
;return r&&!t.modified()||(this.value=r=function(t,e,n){
var r=null==n?function(n){return t(e(n))}:function(r){
var i=t.pointRadius(),a=t.pointRadius(n)(e(r));return t.pointRadius(i),a}
;return r.context=function(e){return t.context(e),r},r
}(Ix(t.projection),i,t.pointRadius),
n.materialize().reflow(),o=n.SOURCE),n.visit(o,(function(t){t[a]=r
})),n.modifies(a)},Hx.Definition={type:"Graticule",metadata:{changes:!0},
params:[{name:"extent",type:"array",array:!0,length:2,content:{type:"number",
array:!0,length:2}},{name:"extentMajor",type:"array",array:!0,length:2,content:{
type:"number",array:!0,length:2}},{name:"extentMinor",type:"array",array:!0,
length:2,content:{type:"number",array:!0,length:2}},{name:"step",type:"number",
array:!0,length:2},{name:"stepMajor",type:"number",array:!0,length:2,
default:[90,360]},{name:"stepMinor",type:"number",array:!0,length:2,
default:[10,10]},{name:"precision",type:"number",default:2.5}]
},$(Hx,Mr).transform=function(t,e){var n,r=this.value,i=this.generator
;if(!r.length||t.modified())for(var a in t)T(i[a])&&i[a](t[a])
;return n=i(),r.length?e.mod.push(dt(r[0],n)):e.add.push(ct(n)),r[0]=n,e
},$(Vx,Mr).transform=function(t,e){var n=this.value
;return!n||t.modified("type")?(this.value=n=function(t){
var e=jx((t||"mercator").toLowerCase());e||i("Unrecognized projection type: "+t)
;return e()}(t.type),Ux.forEach((function(e){null!=t[e]&&Xx(n,e,t[e])
}))):Ux.forEach((function(e){t.modified(e)&&Xx(n,e,t[e])
})),null!=t.pointRadius&&n.path.pointRadius(t.pointRadius),t.fit&&function(t,e){
var n=function(t){return 1===(t=R(t)).length?t[0]:{type:Um,
features:t.reduce((function(t,e){
return e&&e.type===Um?t.push.apply(t,e.features):o(e)?t.push.apply(t,e):t.push(e),
t}),[])}}(e.fit);e.extent?t.fitExtent(e.extent,n):e.size&&t.fitSize(e.size,n)
}(n,t),e.fork(e.NO_SOURCE|e.NO_FIELDS)};var Jx=Object.freeze({contour:qm,
geojson:Fm,geopath:Wx,geopoint:Yx,geoshape:Gx,graticule:Hx,projection:Vx})
;function Zx(t){return function(){return t}}function Qx(){
return 1e-6*(Math.random()-.5)}function Kx(t,e,n,r){
if(isNaN(e)||isNaN(n))return t;var i,a,o,u,f,s,c,l,h,d=t._root,p={data:r
},g=t._x0,v=t._y0,m=t._x1,y=t._y1;if(!d)return t._root=p,t
;for(;d.length;)if((s=e>=(a=(g+m)/2))?g=a:m=a,
(c=n>=(o=(v+y)/2))?v=o:y=o,i=d,!(d=d[l=c<<1|s]))return i[l]=p,t
;if(u=+t._x.call(null,d.data),
f=+t._y.call(null,d.data),e===u&&n===f)return p.next=d,i?i[l]=p:t._root=p,t;do{
i=i?i[l]=new Array(4):t._root=new Array(4),
(s=e>=(a=(g+m)/2))?g=a:m=a,(c=n>=(o=(v+y)/2))?v=o:y=o
}while((l=c<<1|s)==(h=(f>=o)<<1|u>=a));return i[h]=d,i[l]=p,t}
function tw(t,e,n,r,i){this.node=t,this.x0=e,this.y0=n,this.x1=r,this.y1=i}
function ew(t){return t[0]}function nw(t){return t[1]}function rw(t,e,n){
var r=new iw(null==e?ew:e,null==n?nw:n,NaN,NaN,NaN,NaN)
;return null==t?r:r.addAll(t)}function iw(t,e,n,r,i,a){
this._x=t,this._y=e,this._x0=n,
this._y0=r,this._x1=i,this._y1=a,this._root=void 0}function aw(t){for(var e={
data:t.data},n=e;t=t.next;)n=n.next={data:t.data};return e}
var ow=rw.prototype=iw.prototype;function uw(t){return t.x+t.vx}function fw(t){
return t.y+t.vy}function sw(t){return t.index}function cw(t,e){var n=t.get(e)
;if(!n)throw new Error("missing: "+e);return n}ow.copy=function(){
var t,e,n=new iw(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root
;if(!r)return n;if(!r.length)return n._root=aw(r),n;for(t=[{source:r,
target:n._root=new Array(4)
}];r=t.pop();)for(var i=0;i<4;++i)(e=r.source[i])&&(e.length?t.push({source:e,
target:r.target[i]=new Array(4)}):r.target[i]=aw(e));return n
},ow.add=function(t){var e=+this._x.call(null,t),n=+this._y.call(null,t)
;return Kx(this.cover(e,n),e,n,t)},ow.addAll=function(t){
var e,n,r,i,a=t.length,o=new Array(a),u=new Array(a),f=1/0,s=1/0,c=-1/0,l=-1/0
;for(n=0;n<a;++n)isNaN(r=+this._x.call(null,e=t[n]))||isNaN(i=+this._y.call(null,e))||(o[n]=r,
u[n]=i,r<f&&(f=r),r>c&&(c=r),i<s&&(s=i),i>l&&(l=i))
;for(c<f&&(f=this._x0,c=this._x1),
l<s&&(s=this._y0,l=this._y1),this.cover(f,s).cover(c,l),
n=0;n<a;++n)Kx(this,o[n],u[n],t[n]);return this},ow.cover=function(t,e){
if(isNaN(t=+t)||isNaN(e=+e))return this
;var n=this._x0,r=this._y0,i=this._x1,a=this._y1
;if(isNaN(n))i=(n=Math.floor(t))+1,a=(r=Math.floor(e))+1;else{
if(!(n>t||t>i||r>e||e>a))return this;var o,u,f=i-n,s=this._root
;switch(u=(e<(r+a)/2)<<1|t<(n+i)/2){case 0:do{(o=new Array(4))[u]=s,s=o
}while(a=r+(f*=2),t>(i=n+f)||e>a);break;case 1:do{(o=new Array(4))[u]=s,s=o
}while(a=r+(f*=2),(n=i-f)>t||e>a);break;case 2:do{(o=new Array(4))[u]=s,s=o
}while(r=a-(f*=2),t>(i=n+f)||r>e);break;case 3:do{(o=new Array(4))[u]=s,s=o
}while(r=a-(f*=2),(n=i-f)>t||r>e)}this._root&&this._root.length&&(this._root=s)}
return this._x0=n,this._y0=r,this._x1=i,this._y1=a,this},ow.data=function(){
var t=[];return this.visit((function(e){if(!e.length)do{t.push(e.data)
}while(e=e.next)})),t},ow.extent=function(t){
return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]
},ow.find=function(t,e,n){
var r,i,a,o,u,f,s,c=this._x0,l=this._y0,h=this._x1,d=this._y1,p=[],g=this._root
;for(g&&p.push(new tw(g,c,l,h,d)),
null==n?n=1/0:(c=t-n,l=e-n,h=t+n,d=e+n,n*=n);f=p.pop();)if(!(!(g=f.node)||(i=f.x0)>h||(a=f.y0)>d||(o=f.x1)<c||(u=f.y1)<l))if(g.length){
var v=(i+o)/2,m=(a+u)/2
;p.push(new tw(g[3],v,m,o,u),new tw(g[2],i,m,v,u),new tw(g[1],v,a,o,m),new tw(g[0],i,a,v,m)),
(s=(e>=m)<<1|t>=v)&&(f=p[p.length-1],
p[p.length-1]=p[p.length-1-s],p[p.length-1-s]=f)}else{
var y=t-+this._x.call(null,g.data),b=e-+this._y.call(null,g.data),_=y*y+b*b
;if(_<n){var x=Math.sqrt(n=_);c=t-x,l=e-x,h=t+x,d=e+x,r=g.data}}return r
},ow.remove=function(t){
if(isNaN(a=+this._x.call(null,t))||isNaN(o=+this._y.call(null,t)))return this
;var e,n,r,i,a,o,u,f,s,c,l,h,d=this._root,p=this._x0,g=this._y0,v=this._x1,m=this._y1
;if(!d)return this;if(d.length)for(;;){
if((s=a>=(u=(p+v)/2))?p=u:v=u,(c=o>=(f=(g+m)/2))?g=f:m=f,
e=d,!(d=d[l=c<<1|s]))return this;if(!d.length)break
;(e[l+1&3]||e[l+2&3]||e[l+3&3])&&(n=e,h=l)}
for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,
r?(i?r.next=i:delete r.next,
this):e?(i?e[l]=i:delete e[l],(d=e[0]||e[1]||e[2]||e[3])&&d===(e[3]||e[2]||e[1]||e[0])&&!d.length&&(n?n[h]=d:this._root=d),
this):(this._root=i,this)},ow.removeAll=function(t){
for(var e=0,n=t.length;e<n;++e)this.remove(t[e]);return this
},ow.root=function(){return this._root},ow.size=function(){var t=0
;return this.visit((function(e){if(!e.length)do{++t}while(e=e.next)})),t
},ow.visit=function(t){var e,n,r,i,a,o,u=[],f=this._root
;for(f&&u.push(new tw(f,this._x0,this._y0,this._x1,this._y1));e=u.pop();)if(!t(f=e.node,r=e.x0,i=e.y0,a=e.x1,o=e.y1)&&f.length){
var s=(r+a)/2,c=(i+o)/2
;(n=f[3])&&u.push(new tw(n,s,c,a,o)),(n=f[2])&&u.push(new tw(n,r,c,s,o)),
(n=f[1])&&u.push(new tw(n,s,i,a,c)),(n=f[0])&&u.push(new tw(n,r,i,s,c))}
return this},ow.visitAfter=function(t){var e,n=[],r=[]
;for(this._root&&n.push(new tw(this._root,this._x0,this._y0,this._x1,this._y1));e=n.pop();){
var i=e.node;if(i.length){var a,o=e.x0,u=e.y0,f=e.x1,s=e.y1,c=(o+f)/2,l=(u+s)/2
;(a=i[0])&&n.push(new tw(a,o,u,c,l)),
(a=i[1])&&n.push(new tw(a,c,u,f,l)),(a=i[2])&&n.push(new tw(a,o,l,c,s)),
(a=i[3])&&n.push(new tw(a,c,l,f,s))}r.push(e)}
for(;e=r.pop();)t(e.node,e.x0,e.y0,e.x1,e.y1);return this},ow.x=function(t){
return arguments.length?(this._x=t,this):this._x},ow.y=function(t){
return arguments.length?(this._y=t,this):this._y};var lw={value:function(){}}
;function hw(){for(var t,e=0,n=arguments.length,r={};e<n;++e){
if(!(t=arguments[e]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}
return new dw(r)}function dw(t){this._=t}function pw(t,e){
return t.trim().split(/^|\s+/).map((function(t){var n="",r=t.indexOf(".")
;if(r>=0&&(n=t.slice(r+1),
t=t.slice(0,r)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t)
;return{type:t,name:n}}))}function gw(t,e){
for(var n,r=0,i=t.length;r<i;++r)if((n=t[r]).name===e)return n.value}
function vw(t,e,n){for(var r=0,i=t.length;r<i;++r)if(t[r].name===e){
t[r]=lw,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=n&&t.push({
name:e,value:n}),t}dw.prototype=hw.prototype={constructor:dw,on:function(t,e){
var n,r=this._,i=pw(t+"",r),a=-1,o=i.length;if(!(arguments.length<2)){
if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e)
;for(;++a<o;)if(n=(t=i[a]).type)r[n]=vw(r[n],t.name,e);else if(null==e)for(n in r)r[n]=vw(r[n],t.name,null)
;return this}for(;++a<o;)if((n=(t=i[a]).type)&&(n=gw(r[n],t.name)))return n},
copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice()
;return new dw(t)},call:function(t,e){
if((n=arguments.length-2)>0)for(var n,r,i=new Array(n),a=0;a<n;++a)i[a]=arguments[a+2]
;if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t)
;for(a=0,n=(r=this._[t]).length;a<n;++a)r[a].value.apply(e,i)},
apply:function(t,e,n){
if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t)
;for(var r=this._[t],i=0,a=r.length;i<a;++i)r[i].value.apply(e,n)}}
;var mw,yw,bw=0,_w=0,xw=0,ww=0,Mw=0,kw=0,Ew="object"==typeof performance&&performance.now?performance:Date,Sw="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){
setTimeout(t,17)};function Aw(){return Mw||(Sw(Cw),Mw=Ew.now()+kw)}
function Cw(){Mw=0}function Ow(){this._call=this._time=this._next=null}
function zw(t,e,n){var r=new Ow;return r.restart(t,e,n),r}function Dw(){
Mw=(ww=Ew.now())+kw,bw=_w=0;try{!function(){Aw(),++bw
;for(var t,e=mw;e;)(t=Mw-e._time)>=0&&e._call.call(null,t),e=e._next;--bw}()
}finally{bw=0,function(){var t,e,n=mw,r=1/0
;for(;n;)n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,
n=t?t._next=e:mw=e);yw=t,Rw(r)}(),Mw=0}}function Nw(){var t=Ew.now(),e=t-ww
;e>1e3&&(kw-=e,ww=t)}function Rw(t){
bw||(_w&&(_w=clearTimeout(_w)),t-Mw>24?(t<1/0&&(_w=setTimeout(Dw,t-Ew.now()-kw)),
xw&&(xw=clearInterval(xw))):(xw||(ww=Ew.now(),
xw=setInterval(Nw,1e3)),bw=1,Sw(Dw)))}function Tw(t){return t.x}function Pw(t){
return t.y}Ow.prototype=zw.prototype={constructor:Ow,restart:function(t,e,n){
if("function"!=typeof t)throw new TypeError("callback is not a function")
;n=(null==n?Aw():+n)+(null==e?0:+e),
this._next||yw===this||(yw?yw._next=this:mw=this,
yw=this),this._call=t,this._time=n,Rw()},stop:function(){
this._call&&(this._call=null,this._time=1/0,Rw())}}
;var Lw=Math.PI*(3-Math.sqrt(5));var qw={center:function(t,e){var n
;function r(){var r,i,a=n.length,o=0,u=0;for(r=0;r<a;++r)o+=(i=n[r]).x,u+=i.y
;for(o=o/a-t,u=u/a-e,r=0;r<a;++r)(i=n[r]).x-=o,i.y-=u}
return null==t&&(t=0),null==e&&(e=0),r.initialize=function(t){n=t
},r.x=function(e){return arguments.length?(t=+e,r):t},r.y=function(t){
return arguments.length?(e=+t,r):e},r},collide:function(t){var e,n,r=1,i=1
;function a(){
for(var t,a,u,f,s,c,l,h=e.length,d=0;d<i;++d)for(a=rw(e,uw,fw).visitAfter(o),
t=0;t<h;++t)u=e[t],c=n[u.index],l=c*c,f=u.x+u.vx,s=u.y+u.vy,a.visit(p)
;function p(t,e,n,i,a){var o=t.data,h=t.r,d=c+h
;if(!o)return e>f+d||i<f-d||n>s+d||a<s-d;if(o.index>u.index){
var p=f-o.x-o.vx,g=s-o.y-o.vy,v=p*p+g*g
;v<d*d&&(0===p&&(v+=(p=Qx())*p),0===g&&(v+=(g=Qx())*g),
v=(d-(v=Math.sqrt(v)))/v*r,
u.vx+=(p*=v)*(d=(h*=h)/(l+h)),u.vy+=(g*=v)*d,o.vx-=p*(d=1-d),o.vy-=g*d)}}}
function o(t){if(t.data)return t.r=n[t.data.index]
;for(var e=t.r=0;e<4;++e)t[e]&&t[e].r>t.r&&(t.r=t[e].r)}function u(){if(e){
var r,i,a=e.length;for(n=new Array(a),r=0;r<a;++r)i=e[r],n[i.index]=+t(i,r,e)}}
return"function"!=typeof t&&(t=Zx(null==t?1:+t)),a.initialize=function(t){
e=t,u()},a.iterations=function(t){return arguments.length?(i=+t,a):i
},a.strength=function(t){return arguments.length?(r=+t,a):r
},a.radius=function(e){return arguments.length?(t="function"==typeof e?e:Zx(+e),
u(),a):t},a},nbody:function(){var t,e,n,r,i=Zx(-30),a=1,o=1/0,u=.81
;function f(r){var i,a=t.length,o=rw(t,Tw,Pw).visitAfter(c)
;for(n=r,i=0;i<a;++i)e=t[i],o.visit(l)}function s(){if(t){var e,n,a=t.length
;for(r=new Array(a),e=0;e<a;++e)n=t[e],r[n.index]=+i(n,e,t)}}function c(t){
var e,n,i,a,o,u=0,f=0;if(t.length){
for(i=a=o=0;o<4;++o)(e=t[o])&&(n=Math.abs(e.value))&&(u+=e.value,
f+=n,i+=n*e.x,a+=n*e.y);t.x=i/f,t.y=a/f}else{(e=t).x=e.data.x,e.y=e.data.y;do{
u+=r[e.data.index]}while(e=e.next)}t.value=u}function l(t,i,f,s){
if(!t.value)return!0;var c=t.x-e.x,l=t.y-e.y,h=s-i,d=c*c+l*l
;if(h*h/u<d)return d<o&&(0===c&&(d+=(c=Qx())*c),
0===l&&(d+=(l=Qx())*l),d<a&&(d=Math.sqrt(a*d)),
e.vx+=c*t.value*n/d,e.vy+=l*t.value*n/d),!0;if(!(t.length||d>=o)){
(t.data!==e||t.next)&&(0===c&&(d+=(c=Qx())*c),
0===l&&(d+=(l=Qx())*l),d<a&&(d=Math.sqrt(a*d)));do{
t.data!==e&&(h=r[t.data.index]*n/d,e.vx+=c*h,e.vy+=l*h)}while(t=t.next)}}
return f.initialize=function(e){t=e,s()},f.strength=function(t){
return arguments.length?(i="function"==typeof t?t:Zx(+t),s(),f):i
},f.distanceMin=function(t){return arguments.length?(a=t*t,f):Math.sqrt(a)
},f.distanceMax=function(t){return arguments.length?(o=t*t,f):Math.sqrt(o)
},f.theta=function(t){return arguments.length?(u=t*t,f):Math.sqrt(u)},f},
link:function(t){var e,n,r,i,a,o=sw,u=function(t){
return 1/Math.min(i[t.source.index],i[t.target.index])},f=Zx(30),s=1
;function c(r){
for(var i=0,o=t.length;i<s;++i)for(var u,f,c,l,h,d,p,g=0;g<o;++g)f=(u=t[g]).source,
l=(c=u.target).x+c.vx-f.x-f.vx||Qx(),
h=c.y+c.vy-f.y-f.vy||Qx(),l*=d=((d=Math.sqrt(l*l+h*h))-n[g])/d*r*e[g],
h*=d,c.vx-=l*(p=a[g]),c.vy-=h*p,f.vx+=l*(p=1-p),f.vy+=h*p}function l(){if(r){
var u,f,s=r.length,c=t.length,l=Rl(r,o)
;for(u=0,i=new Array(s);u<c;++u)(f=t[u]).index=u,
"object"!=typeof f.source&&(f.source=cw(l,f.source)),
"object"!=typeof f.target&&(f.target=cw(l,f.target)),
i[f.source.index]=(i[f.source.index]||0)+1,
i[f.target.index]=(i[f.target.index]||0)+1
;for(u=0,a=new Array(c);u<c;++u)f=t[u],
a[u]=i[f.source.index]/(i[f.source.index]+i[f.target.index]);e=new Array(c),h(),
n=new Array(c),d()}}function h(){
if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+u(t[n],n,t)}function d(){
if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+f(t[e],e,t)}
return null==t&&(t=[]),c.initialize=function(t){r=t,l()},c.links=function(e){
return arguments.length?(t=e,l(),c):t},c.id=function(t){
return arguments.length?(o=t,c):o},c.iterations=function(t){
return arguments.length?(s=+t,c):s},c.strength=function(t){
return arguments.length?(u="function"==typeof t?t:Zx(+t),h(),c):u
},c.distance=function(t){
return arguments.length?(f="function"==typeof t?t:Zx(+t),d(),c):f},c},
x:function(t){var e,n,r,i=Zx(.1);function a(t){
for(var i,a=0,o=e.length;a<o;++a)(i=e[a]).vx+=(r[a]-i.x)*n[a]*t}function o(){
if(e){var a,o=e.length
;for(n=new Array(o),r=new Array(o),a=0;a<o;++a)n[a]=isNaN(r[a]=+t(e[a],a,e))?0:+i(e[a],a,e)
}}return"function"!=typeof t&&(t=Zx(null==t?0:+t)),a.initialize=function(t){e=t,
o()},a.strength=function(t){
return arguments.length?(i="function"==typeof t?t:Zx(+t),o(),a):i
},a.x=function(e){
return arguments.length?(t="function"==typeof e?e:Zx(+e),o(),a):t},a},
y:function(t){var e,n,r,i=Zx(.1);function a(t){
for(var i,a=0,o=e.length;a<o;++a)(i=e[a]).vy+=(r[a]-i.y)*n[a]*t}function o(){
if(e){var a,o=e.length
;for(n=new Array(o),r=new Array(o),a=0;a<o;++a)n[a]=isNaN(r[a]=+t(e[a],a,e))?0:+i(e[a],a,e)
}}return"function"!=typeof t&&(t=Zx(null==t?0:+t)),a.initialize=function(t){e=t,
o()},a.strength=function(t){
return arguments.length?(i="function"==typeof t?t:Zx(+t),o(),a):i
},a.y=function(e){
return arguments.length?(t="function"==typeof e?e:Zx(+e),o(),a):t},a}
},Uw="forces",Fw=["alpha","alphaMin","alphaTarget","velocityDecay","forces"],jw=["static","iterations"],Iw=["x","y","vx","vy"]
;function $w(t){Mr.call(this,null,t)}$w.Definition={type:"Force",metadata:{
modifies:!0},params:[{name:"static",type:"boolean",default:!1},{name:"restart",
type:"boolean",default:!1},{name:"iterations",type:"number",default:300},{
name:"alpha",type:"number",default:1},{name:"alphaMin",type:"number",
default:.001},{name:"alphaTarget",type:"number",default:0},{
name:"velocityDecay",type:"number",default:.4},{name:"forces",type:"param",
array:!0,params:[{key:{force:"center"},params:[{name:"x",type:"number",default:0
},{name:"y",type:"number",default:0}]},{key:{force:"collide"},params:[{
name:"radius",type:"number",expr:!0},{name:"strength",type:"number",default:.7
},{name:"iterations",type:"number",default:1}]},{key:{force:"nbody"},params:[{
name:"strength",type:"number",default:-30},{name:"theta",type:"number",
default:.9},{name:"distanceMin",type:"number",default:1},{name:"distanceMax",
type:"number"}]},{key:{force:"link"},params:[{name:"links",type:"data"},{
name:"id",type:"field"},{name:"distance",type:"number",default:30,expr:!0},{
name:"strength",type:"number",expr:!0},{name:"iterations",type:"number",
default:1}]},{key:{force:"x"},params:[{name:"strength",type:"number",default:.1
},{name:"x",type:"field"}]},{key:{force:"y"},params:[{name:"strength",
type:"number",default:.1},{name:"y",type:"field"}]}]},{name:"as",type:"string",
array:!0,modify:!1,default:Iw}]};var Bw=$($w,Mr);function Ww(t,e,n,r){
var i,a,o,u,f=R(e.forces)
;for(i=0,a=Fw.length;i<a;++i)(o=Fw[i])!==Uw&&e.modified(o)&&t[o](e[o])
;for(i=0,a=f.length;i<a;++i)u=Uw+i,
(o=n||e.modified(Uw,i)?Gw(f[i]):r&&Yw(f[i],r)?t.force(u):null)&&t.force(u,o)
;for(a=t.numForces||0;i<a;++i)t.force(Uw+i,null);return t.numForces=f.length,t}
function Yw(t,e){var n,i;for(n in t)if(T(i=t[n])&&e.modified(r(i)))return 1
;return 0}function Gw(t){var e,n
;for(n in qw.hasOwnProperty(t.force)||i("Unrecognized force: "+t.force),
e=qw[t.force](),t)T(e[n])&&Hw(e[n],t[n],t);return e}function Hw(t,e,n){
t(T(e)?function(t){return e(t,n)}:e)}Bw.transform=function(t,e){
var n=this.value,r=e.changed(e.ADD_REM),i=t.modified(Fw),a=t.iterations||300
;if(n?(r&&(e.modifies("index"),
n.nodes(e.source)),(i||e.changed(e.MOD))&&Ww(n,t,0,e)):(this.value=n=function(t,e){
var n=function(t){
var e,n=1,r=.001,i=1-Math.pow(r,1/300),a=0,o=.6,u=Rl(),f=zw(c),s=hw("tick","end")
;function c(){l(),s.call("tick",e),n<r&&(f.stop(),s.call("end",e))}function l(){
var e,r,f=t.length;for(n+=(a-n)*i,u.each((function(t){t(n)
})),e=0;e<f;++e)null==(r=t[e]).fx?r.x+=r.vx*=o:(r.x=r.fx,
r.vx=0),null==r.fy?r.y+=r.vy*=o:(r.y=r.fy,r.vy=0)}function h(){
for(var e,n=0,r=t.length;n<r;++n){if((e=t[n]).index=n,isNaN(e.x)||isNaN(e.y)){
var i=10*Math.sqrt(n),a=n*Lw;e.x=i*Math.cos(a),e.y=i*Math.sin(a)}
(isNaN(e.vx)||isNaN(e.vy))&&(e.vx=e.vy=0)}}function d(e){
return e.initialize&&e.initialize(t),e}return null==t&&(t=[]),h(),e={tick:l,
restart:function(){return f.restart(c),e},stop:function(){return f.stop(),e},
nodes:function(n){return arguments.length?(t=n,h(),u.each(d),e):t},
alpha:function(t){return arguments.length?(n=+t,e):n},alphaMin:function(t){
return arguments.length?(r=+t,e):r},alphaDecay:function(t){
return arguments.length?(i=+t,e):+i},alphaTarget:function(t){
return arguments.length?(a=+t,e):a},velocityDecay:function(t){
return arguments.length?(o=1-t,e):1-o},force:function(t,n){
return arguments.length>1?(null==n?u.remove(t):u.set(t,d(n)),e):u.get(t)},
find:function(e,n,r){var i,a,o,u,f,s=0,c=t.length
;for(null==r?r=1/0:r*=r,s=0;s<c;++s)(o=(i=e-(u=t[s]).x)*i+(a=n-u.y)*a)<r&&(f=u,
r=o);return f},on:function(t,n){return arguments.length>1?(s.on(t,n),e):s.on(t)}
}}(t),r=!1,i=n.stop,a=n.restart;return n.stopped=function(){return r
},n.restart=function(){return r=!1,a()},n.stop=function(){return r=!0,i()
},Ww(n,e,!0).on("end",(function(){r=!0}))
}(e.source,t),n.on("tick",function(t,e){return function(){t.touch(e).run()}
}(e.dataflow,this)),
t.static||(r=!0,n.tick()),e.modifies("index")),i||r||t.modified(jw)||e.changed()&&t.restart)if(n.alpha(Math.max(n.alpha(),t.alpha||1)).alphaDecay(1-Math.pow(n.alphaMin(),1/a)),
t.static)for(n.stop();--a>=0;)n.tick();else if(n.stopped()&&n.restart(),
!r)return e.StopPropagation;return this.finish(t,e)},Bw.finish=function(t,e){
for(var n,r=e.dataflow,i=this._argops,a=0,o=i.length;a<o;++a)if((n=i[a]).name===Uw&&"link"===n.op._argval.force)for(var u,f=n.op._argops,s=0,c=f.length;s<c;++s)if("links"===f[s].name&&(u=f[s].op.source)){
r.pulse(u,r.changeset().reflow());break}
return e.reflow(t.modified()).modifies(Iw)};var Vw=Object.freeze({force:$w})
;function Xw(t,e,n){var r={};return t.each((function(t){var i=t.data
;n(i)&&(r[e(i)]=t)})),t.lookup=r,t}function Jw(t,e){
return t.parent===e.parent?1:2}function Zw(t,e){return t+e.x}function Qw(t,e){
return Math.max(t,e.y)}function Kw(t){var e=0,n=t.children,r=n&&n.length
;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function tM(t,e){
var n,r,i,a,o,u=new iM(t),f=+t.value&&(u.value=t.value),s=[u]
;for(null==e&&(e=eM);n=s.pop();)if(f&&(n.value=+n.data.value),
(i=e(n.data))&&(o=i.length))for(n.children=new Array(o),
a=o-1;a>=0;--a)s.push(r=n.children[a]=new iM(i[a])),r.parent=n,r.depth=n.depth+1
;return u.eachBefore(rM)}function eM(t){return t.children}function nM(t){
t.data=t.data.data}function rM(t){var e=0;do{t.height=e
}while((t=t.parent)&&t.height<++e)}function iM(t){
this.data=t,this.depth=this.height=0,this.parent=null}
iM.prototype=tM.prototype={constructor:iM,count:function(){
return this.eachAfter(Kw)},each:function(t){var e,n,r,i,a=this,o=[a];do{
for(e=o.reverse(),
o=[];a=e.pop();)if(t(a),n=a.children)for(r=0,i=n.length;r<i;++r)o.push(n[r])
}while(o.length);return this},eachAfter:function(t){
for(var e,n,r,i=this,a=[i],o=[];i=a.pop();)if(o.push(i),
e=i.children)for(n=0,r=e.length;n<r;++n)a.push(e[n]);for(;i=o.pop();)t(i)
;return this},eachBefore:function(t){
for(var e,n,r=this,i=[r];r=i.pop();)if(t(r),
e=r.children)for(n=e.length-1;n>=0;--n)i.push(e[n]);return this},
sum:function(t){return this.eachAfter((function(e){
for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value
;e.value=n}))},sort:function(t){return this.eachBefore((function(e){
e.children&&e.children.sort(t)}))},path:function(t){
for(var e=this,n=function(t,e){if(t===e)return t
;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();for(;t===e;)i=t,
t=n.pop(),e=r.pop();return i}(e,t),r=[e];e!==n;)e=e.parent,r.push(e)
;for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r},
ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},
descendants:function(){var t=[];return this.each((function(e){t.push(e)})),t},
leaves:function(){var t=[];return this.eachBefore((function(e){
e.children||t.push(e)})),t},links:function(){var t=this,e=[]
;return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},
copy:function(){return tM(this).eachBefore(nM)}};var aM=Array.prototype.slice
;function oM(t){for(var e,n,r=0,i=(t=function(t){
for(var e,n,r=t.length;r;)n=Math.random()*r--|0,e=t[r],t[r]=t[n],t[n]=e;return t
}(aM.call(t))).length,a=[];r<i;)e=t[r],n&&sM(n,e)?++r:(n=lM(a=uM(a,e)),r=0)
;return n}function uM(t,e){var n,r;if(cM(e,t))return[e]
;for(n=0;n<t.length;++n)if(fM(e,t[n])&&cM(hM(t[n],e),t))return[t[n],e]
;for(n=0;n<t.length-1;++n)for(r=n+1;r<t.length;++r)if(fM(hM(t[n],t[r]),e)&&fM(hM(t[n],e),t[r])&&fM(hM(t[r],e),t[n])&&cM(dM(t[n],t[r],e),t))return[t[n],t[r],e]
;throw new Error}function fM(t,e){var n=t.r-e.r,r=e.x-t.x,i=e.y-t.y
;return n<0||n*n<r*r+i*i}function sM(t,e){var n=t.r-e.r+1e-6,r=e.x-t.x,i=e.y-t.y
;return n>0&&n*n>r*r+i*i}function cM(t,e){
for(var n=0;n<e.length;++n)if(!sM(t,e[n]))return!1;return!0}function lM(t){
switch(t.length){case 1:return function(t){return{x:t.x,y:t.y,r:t.r}}(t[0])
;case 2:return hM(t[0],t[1]);case 3:return dM(t[0],t[1],t[2])}}function hM(t,e){
var n=t.x,r=t.y,i=t.r,a=e.x,o=e.y,u=e.r,f=a-n,s=o-r,c=u-i,l=Math.sqrt(f*f+s*s)
;return{x:(n+a+f/l*c)/2,y:(r+o+s/l*c)/2,r:(l+i+u)/2}}function dM(t,e,n){
var r=t.x,i=t.y,a=t.r,o=e.x,u=e.y,f=e.r,s=n.x,c=n.y,l=n.r,h=r-o,d=r-s,p=i-u,g=i-c,v=f-a,m=l-a,y=r*r+i*i-a*a,b=y-o*o-u*u+f*f,_=y-s*s-c*c+l*l,x=d*p-h*g,w=(p*_-g*b)/(2*x)-r,M=(g*v-p*m)/x,k=(d*b-h*_)/(2*x)-i,E=(h*m-d*v)/x,S=M*M+E*E-1,A=2*(a+w*M+k*E),C=w*w+k*k-a*a,O=-(S?(A+Math.sqrt(A*A-4*S*C))/(2*S):C/A)
;return{x:r+w+M*O,y:i+k+E*O,r:O}}function pM(t,e,n){
var r,i,a,o,u=t.x-e.x,f=t.y-e.y,s=u*u+f*f
;s?(i=e.r+n.r,i*=i,o=t.r+n.r,i>(o*=o)?(r=(s+o-i)/(2*s),
a=Math.sqrt(Math.max(0,o/s-r*r)),
n.x=t.x-r*u-a*f,n.y=t.y-r*f+a*u):(r=(s+i-o)/(2*s),
a=Math.sqrt(Math.max(0,i/s-r*r)),n.x=e.x+r*u-a*f,n.y=e.y+r*f+a*u)):(n.x=e.x+n.r,
n.y=e.y)}function gM(t,e){var n=t.r+e.r-1e-6,r=e.x-t.x,i=e.y-t.y
;return n>0&&n*n>r*r+i*i}function vM(t){
var e=t._,n=t.next._,r=e.r+n.r,i=(e.x*n.r+n.x*e.r)/r,a=(e.y*n.r+n.y*e.r)/r
;return i*i+a*a}function mM(t){this._=t,this.next=null,this.previous=null}
function yM(t){return null==t?null:bM(t)}function bM(t){
if("function"!=typeof t)throw new Error;return t}function _M(){return 0}
function xM(t){return function(){return t}}function wM(t){
return Math.sqrt(t.value)}function MM(t){return function(e){
e.children||(e.r=Math.max(0,+t(e)||0))}}function kM(t,e){return function(n){
if(r=n.children){var r,i,a,o=r.length,u=t(n)*e||0;if(u)for(i=0;i<o;++i)r[i].r+=u
;if(a=function(t){if(!(i=t.length))return 0;var e,n,r,i,a,o,u,f,s,c,l
;if((e=t[0]).x=0,e.y=0,!(i>1))return e.r
;if(n=t[1],e.x=-n.r,n.x=e.r,n.y=0,!(i>2))return e.r+n.r
;pM(n,e,r=t[2]),e=new mM(e),
n=new mM(n),r=new mM(r),e.next=r.previous=n,n.next=e.previous=r,
r.next=n.previous=e;t:for(u=3;u<i;++u){
pM(e._,n._,r=t[u]),r=new mM(r),f=n.next,s=e.previous,c=n._.r,l=e._.r;do{
if(c<=l){if(gM(f._,r._)){n=f,e.next=n,n.previous=e,--u;continue t}
c+=f._.r,f=f.next}else{if(gM(s._,r._)){(e=s).next=n,n.previous=e,--u;continue t}
l+=s._.r,s=s.previous}}while(f!==s.next)
;for(r.previous=e,r.next=n,e.next=n.previous=n=r,
a=vM(e);(r=r.next)!==n;)(o=vM(r))<a&&(e=r,a=o);n=e.next}
for(e=[n._],r=n;(r=r.next)!==n;)e.push(r._)
;for(r=oM(e),u=0;u<i;++u)(e=t[u]).x-=r.x,e.y-=r.y;return r.r
}(r),u)for(i=0;i<o;++i)r[i].r-=u;n.r=a+u}}}function EM(t){return function(e){
var n=e.parent;e.r*=t,n&&(e.x=n.x+t*e.x,e.y=n.y+t*e.y)}}function SM(t){
t.x0=Math.round(t.x0),
t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}
function AM(t,e,n,r,i){
for(var a,o=t.children,u=-1,f=o.length,s=t.value&&(r-e)/t.value;++u<f;)(a=o[u]).y0=n,
a.y1=i,a.x0=e,a.x1=e+=a.value*s}var CM={depth:-1},OM={};function zM(t){
return t.id}function DM(t){return t.parentId}function NM(){var t=zM,e=DM
;function n(n){var r,i,a,o,u,f,s,c=n.length,l=new Array(c),h={}
;for(i=0;i<c;++i)r=n[i],
u=l[i]=new iM(r),null!=(f=t(r,i,n))&&(f+="")&&(h[s="$"+(u.id=f)]=s in h?OM:u)
;for(i=0;i<c;++i)if(u=l[i],null!=(f=e(n[i],i,n))&&(f+="")){
if(!(o=h["$"+f]))throw new Error("missing: "+f)
;if(o===OM)throw new Error("ambiguous: "+f)
;o.children?o.children.push(u):o.children=[u],u.parent=o}else{
if(a)throw new Error("multiple roots");a=u}if(!a)throw new Error("no root")
;if(a.parent=CM,a.eachBefore((function(t){t.depth=t.parent.depth+1,--c
})).eachBefore(rM),a.parent=null,c>0)throw new Error("cycle");return a}
return n.id=function(e){return arguments.length?(t=bM(e),n):t
},n.parentId=function(t){return arguments.length?(e=bM(t),n):e},n}
function RM(t,e){return t.parent===e.parent?1:2}function TM(t){var e=t.children
;return e?e[0]:t.t}function PM(t){var e=t.children;return e?e[e.length-1]:t.t}
function LM(t,e,n){var r=n/(e.i-t.i);e.c-=r,e.s+=n,t.c+=r,e.z+=n,e.m+=n}
function qM(t,e,n){return t.a.parent===e.parent?t.a:n}function UM(t,e){this._=t,
this.parent=null,
this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,
this.s=0,this.t=null,this.i=e}function FM(t,e,n,r,i){
for(var a,o=t.children,u=-1,f=o.length,s=t.value&&(i-n)/t.value;++u<f;)(a=o[u]).x0=e,
a.x1=r,a.y0=n,a.y1=n+=a.value*s}UM.prototype=Object.create(iM.prototype)
;var jM=(1+Math.sqrt(5))/2;function IM(t,e,n,r,i,a){
for(var o,u,f,s,c,l,h,d,p,g,v,m=[],y=e.children,b=0,_=0,x=y.length,w=e.value;b<x;){
f=i-n,s=a-r;do{c=y[_++].value}while(!c&&_<x)
;for(l=h=c,v=c*c*(g=Math.max(s/f,f/s)/(w*t)),p=Math.max(h/v,v/l);_<x;++_){
if(c+=u=y[_].value,u<l&&(l=u),u>h&&(h=u),v=c*c*g,(d=Math.max(h/v,v/l))>p){c-=u
;break}p=d}m.push(o={value:c,dice:f<s,children:y.slice(b,_)
}),o.dice?AM(o,n,r,i,w?r+=s*c/w:a):FM(o,n,r,w?n+=f*c/w:i,a),w-=c,b=_}return m}
var $M=function t(e){function n(t,n,r,i,a){IM(e,t,n,r,i,a)}
return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(jM);var BM=function t(e){
function n(t,n,r,i,a){
if((o=t._squarify)&&o.ratio===e)for(var o,u,f,s,c,l=-1,h=o.length,d=t.value;++l<h;){
for(f=(u=o[l]).children,s=u.value=0,c=f.length;s<c;++s)u.value+=f[s].value
;u.dice?AM(u,n,r,i,r+=(a-r)*u.value/d):FM(u,n,r,n+=(i-n)*u.value/d,a),d-=u.value
}else t._squarify=o=IM(e,t,n,r,i,a),o.ratio=e}return n.ratio=function(e){
return t((e=+e)>1?e:1)},n}(jM);function WM(t){Mr.call(this,null,t)}
function YM(t){return t.values}function GM(t){Mr.call(this,null,t)}
function HM(t,e){return t.parent===e.parent?1:2}WM.Definition={type:"Nest",
metadata:{treesource:!0,changes:!0},params:[{name:"keys",type:"field",array:!0
},{name:"generate",type:"boolean"}]},$(WM,Mr).transform=function(t,e){
e.source||i("Nest transform requires an upstream data source.")
;var n=t.generate,r=t.modified(),a=e.clone(),o=this.value
;return(!o||r||e.changed())&&(o&&o.each((function(t){
t.children&&ut(t.data)&&a.rem.push(t.data)})),this.value=o=tM({
values:R(t.keys).reduce((function(t,e){return t.key(e),t
}),Tl()).entries(a.source)},YM),n&&o.each((function(t){
t.children&&(t=ct(t.data),a.add.push(t),a.source.push(t))
})),Xw(o,ft,ft)),a.source.root=o,a},$(GM,Mr).transform=function(t,e){
e.source&&e.source.root||i(this.constructor.name+" transform requires a backing tree data source.")
;var n=this.layout(t.method),r=this.fields,a=e.source.root,o=t.as||r
;t.field&&a.sum(t.field),t.sort&&a.sort(t.sort),function(t,e,n){
for(var r,i=0,a=e.length;i<a;++i)(r=e[i])in n&&t[r](n[r])
}(n,this.params,t),n.separation&&n.separation(!1!==t.separation?HM:g);try{
this.value=n(a)}catch(u){i(u)}return a.each((function(t){!function(t,e,n){
for(var r=t.data,i=0,a=e.length-1;i<a;++i)r[n[i]]=t[e[i]]
;r[n[a]]=t.children?t.children.length:0}(t,r,o)
})),e.reflow(t.modified()).modifies(o).modifies("leaf")}
;var VM=["x","y","r","depth","children"];function XM(t){GM.call(this,t)}
XM.Definition={type:"Pack",metadata:{tree:!0,modifies:!0},params:[{name:"field",
type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",
default:0},{name:"radius",type:"field",default:null},{name:"size",type:"number",
array:!0,length:2},{name:"as",type:"string",array:!0,length:VM.length,default:VM
}]};var JM=$(XM,GM);JM.layout=function(){var t=null,e=1,n=1,r=_M;function i(i){
return i.x=e/2,
i.y=n/2,t?i.eachBefore(MM(t)).eachAfter(kM(r,.5)).eachBefore(EM(1)):i.eachBefore(MM(wM)).eachAfter(kM(_M,1)).eachAfter(kM(r,i.r/Math.min(e,n))).eachBefore(EM(Math.min(e,n)/(2*i.r))),
i}return i.radius=function(e){return arguments.length?(t=yM(e),i):t
},i.size=function(t){return arguments.length?(e=+t[0],n=+t[1],i):[e,n]
},i.padding=function(t){
return arguments.length?(r="function"==typeof t?t:xM(+t),i):r},i
},JM.params=["size","padding"],JM.fields=VM
;var ZM=["x0","y0","x1","y1","depth","children"];function QM(t){GM.call(this,t)}
QM.Definition={type:"Partition",metadata:{tree:!0,modifies:!0},params:[{
name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",
type:"number",default:0},{name:"round",type:"boolean",default:!1},{name:"size",
type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,
length:ZM.length,default:ZM}]};var KM=$(QM,GM);function tk(t){
Mr.call(this,null,t)}KM.layout=function(){var t=1,e=1,n=0,r=!1;function i(i){
var a=i.height+1;return i.x0=i.y0=n,i.x1=t,i.y1=e/a,i.eachBefore(function(t,e){
return function(r){r.children&&AM(r,r.x0,t*(r.depth+1)/e,r.x1,t*(r.depth+2)/e)
;var i=r.x0,a=r.y0,o=r.x1-n,u=r.y1-n
;o<i&&(i=o=(i+o)/2),u<a&&(a=u=(a+u)/2),r.x0=i,r.y0=a,r.x1=o,r.y1=u}
}(e,a)),r&&i.eachBefore(SM),i}return i.round=function(t){
return arguments.length?(r=!!t,i):r},i.size=function(n){
return arguments.length?(t=+n[0],e=+n[1],i):[t,e]},i.padding=function(t){
return arguments.length?(n=+t,i):n},i
},KM.params=["size","round","padding"],KM.fields=ZM,tk.Definition={
type:"Stratify",metadata:{treesource:!0},params:[{name:"key",type:"field",
required:!0},{name:"parentKey",type:"field",required:!0}]
},$(tk,Mr).transform=function(t,e){
e.source||i("Stratify transform requires an upstream data source.")
;var n=this.value,r=t.modified(),a=e.fork(e.ALL).materialize(e.SOURCE),o=!this.value||r||e.changed(e.ADD_REM)||e.modified(t.key.fields)||e.modified(t.parentKey.fields)
;return a.source=a.source.slice(),
o&&(n=a.source.length?Xw(NM().id(t.key).parentId(t.parentKey)(a.source),t.key,v):Xw(NM()([{}]),t.key,t.key)),
a.source.root=this.value=n,a};var ek={tidy:function(){var t=RM,e=1,n=1,r=null
;function i(i){var f=function(t){
for(var e,n,r,i,a,o=new UM(t,0),u=[o];e=u.pop();)if(r=e._.children)for(e.children=new Array(a=r.length),
i=a-1;i>=0;--i)u.push(n=e.children[i]=new UM(r[i],i)),n.parent=e
;return(o.parent=new UM(null,0)).children=[o],o}(i)
;if(f.eachAfter(a),f.parent.m=-f.z,f.eachBefore(o),r)i.eachBefore(u);else{
var s=i,c=i,l=i;i.eachBefore((function(t){
t.x<s.x&&(s=t),t.x>c.x&&(c=t),t.depth>l.depth&&(l=t)}))
;var h=s===c?1:t(s,c)/2,d=h-s.x,p=e/(c.x+h+d),g=n/(l.depth||1)
;i.eachBefore((function(t){t.x=(t.x+d)*p,t.y=t.depth*g}))}return i}
function a(e){var n=e.children,r=e.parent.children,i=e.i?r[e.i-1]:null;if(n){
!function(t){
for(var e,n=0,r=0,i=t.children,a=i.length;--a>=0;)(e=i[a]).z+=n,e.m+=n,
n+=e.s+(r+=e.c)}(e);var a=(n[0].z+n[n.length-1].z)/2
;i?(e.z=i.z+t(e._,i._),e.m=e.z-a):e.z=a}else i&&(e.z=i.z+t(e._,i._))
;e.parent.A=function(e,n,r){if(n){
for(var i,a=e,o=e,u=n,f=a.parent.children[0],s=a.m,c=o.m,l=u.m,h=f.m;u=PM(u),
a=TM(a),
u&&a;)f=TM(f),(o=PM(o)).a=e,(i=u.z+l-a.z-s+t(u._,a._))>0&&(LM(qM(u,e,r),e,i),
s+=i,c+=i),l+=u.m,s+=a.m,h+=f.m,c+=o.m
;u&&!PM(o)&&(o.t=u,o.m+=l-c),a&&!TM(f)&&(f.t=a,f.m+=s-h,r=e)}return r
}(e,i,e.parent.A||r[0])}function o(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}
function u(t){t.x*=e,t.y=t.depth*n}return i.separation=function(e){
return arguments.length?(t=e,i):t},i.size=function(t){
return arguments.length?(r=!1,e=+t[0],n=+t[1],i):r?null:[e,n]
},i.nodeSize=function(t){
return arguments.length?(r=!0,e=+t[0],n=+t[1],i):r?[e,n]:null},i},
cluster:function(){var t=Jw,e=1,n=1,r=!1;function i(i){var a,o=0
;i.eachAfter((function(e){var n=e.children;n?(e.x=function(t){
return t.reduce(Zw,0)/t.length}(n),e.y=function(t){return 1+t.reduce(Qw,0)
}(n)):(e.x=a?o+=t(e,a):0,e.y=0,a=e)}));var u=function(t){
for(var e;e=t.children;)t=e[0];return t}(i),f=function(t){
for(var e;e=t.children;)t=e[e.length-1];return t
}(i),s=u.x-t(u,f)/2,c=f.x+t(f,u)/2;return i.eachAfter(r?function(t){
t.x=(t.x-i.x)*e,t.y=(i.y-t.y)*n}:function(t){
t.x=(t.x-s)/(c-s)*e,t.y=(1-(i.y?t.y/i.y:1))*n})}return i.separation=function(e){
return arguments.length?(t=e,i):t},i.size=function(t){
return arguments.length?(r=!1,e=+t[0],n=+t[1],i):r?null:[e,n]
},i.nodeSize=function(t){
return arguments.length?(r=!0,e=+t[0],n=+t[1],i):r?[e,n]:null},i}
},nk=["x","y","depth","children"];function rk(t){GM.call(this,t)}rk.Definition={
type:"Tree",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{
name:"sort",type:"compare"},{name:"method",type:"enum",default:"tidy",
values:["tidy","cluster"]},{name:"size",type:"number",array:!0,length:2},{
name:"nodeSize",type:"number",array:!0,length:2},{name:"separation",
type:"boolean",default:!0},{name:"as",type:"string",array:!0,length:nk.length,
default:nk}]};var ik=$(rk,GM);function ak(t){Mr.call(this,[],t)}
ik.layout=function(t){var e=t||"tidy";if(ek.hasOwnProperty(e))return ek[e]()
;i("Unrecognized Tree layout method: "+e)
},ik.params=["size","nodeSize"],ik.fields=nk,ak.Definition={type:"TreeLinks",
metadata:{tree:!0,generates:!0,changes:!0},params:[]
},$(ak,Mr).transform=function(t,e){
var n=this.value,r=e.source&&e.source.root,a=e.fork(e.NO_SOURCE),o={}
;return r||i("TreeLinks transform requires a tree data source."),
e.changed(e.ADD_REM)?(a.rem=n,e.visit(e.SOURCE,(function(t){o[ft(t)]=1
})),r.each((function(t){var e=t.data,n=t.parent&&t.parent.data
;n&&o[ft(e)]&&o[ft(n)]&&a.add.push(ct({source:n,target:e}))
})),this.value=a.add):e.changed(e.MOD)&&(e.visit(e.MOD,(function(t){o[ft(t)]=1
})),n.forEach((function(t){(o[ft(t.source)]||o[ft(t.target)])&&a.mod.push(t)
}))),a};var ok={binary:function(t,e,n,r,i){
var a,o,u=t.children,f=u.length,s=new Array(f+1)
;for(s[0]=o=a=0;a<f;++a)s[a+1]=o+=u[a].value;!function t(e,n,r,i,a,o,f){
if(e>=n-1){var c=u[e];return c.x0=i,c.y0=a,c.x1=o,void(c.y1=f)}
var l=s[e],h=r/2+l,d=e+1,p=n-1;for(;d<p;){var g=d+p>>>1;s[g]<h?d=g+1:p=g}
h-s[d-1]<s[d]-h&&e+1<d&&--d;var v=s[d]-l,m=r-v;if(o-i>f-a){var y=(i*m+o*v)/r
;t(e,d,v,i,a,y,f),t(d,n,m,y,a,o,f)}else{var b=(a*m+f*v)/r
;t(e,d,v,i,a,o,b),t(d,n,m,i,b,o,f)}}(0,f,t.value,e,n,r,i)},dice:AM,slice:FM,
slicedice:function(t,e,n,r,i){(1&t.depth?FM:AM)(t,e,n,r,i)},squarify:$M,
resquarify:BM},uk=["x0","y0","x1","y1","depth","children"];function fk(t){
GM.call(this,t)}fk.Definition={type:"Treemap",metadata:{tree:!0,modifies:!0},
params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",
type:"enum",default:"squarify",
values:["squarify","resquarify","binary","dice","slice","slicedice"]},{
name:"padding",type:"number",default:0},{name:"paddingInner",type:"number",
default:0},{name:"paddingOuter",type:"number",default:0},{name:"paddingTop",
type:"number",default:0},{name:"paddingRight",type:"number",default:0},{
name:"paddingBottom",type:"number",default:0},{name:"paddingLeft",type:"number",
default:0},{name:"ratio",type:"number",default:1.618033988749895},{name:"round",
type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{
name:"as",type:"string",array:!0,length:uk.length,default:uk}]};var sk=$(fk,GM)
;sk.layout=function(){var t=function(){
var t=$M,e=!1,n=1,r=1,i=[0],a=_M,o=_M,u=_M,f=_M,s=_M;function c(t){
return t.x0=t.y0=0,t.x1=n,t.y1=r,t.eachBefore(l),i=[0],e&&t.eachBefore(SM),t}
function l(e){var n=i[e.depth],r=e.x0+n,c=e.y0+n,l=e.x1-n,h=e.y1-n
;l<r&&(r=l=(r+l)/2),
h<c&&(c=h=(c+h)/2),e.x0=r,e.y0=c,e.x1=l,e.y1=h,e.children&&(n=i[e.depth+1]=a(e)/2,
r+=s(e)-n,
c+=o(e)-n,(l-=u(e)-n)<r&&(r=l=(r+l)/2),(h-=f(e)-n)<c&&(c=h=(c+h)/2),t(e,r,c,l,h))
}return c.round=function(t){return arguments.length?(e=!!t,c):e
},c.size=function(t){return arguments.length?(n=+t[0],r=+t[1],c):[n,r]
},c.tile=function(e){return arguments.length?(t=bM(e),c):t
},c.padding=function(t){
return arguments.length?c.paddingInner(t).paddingOuter(t):c.paddingInner()
},c.paddingInner=function(t){
return arguments.length?(a="function"==typeof t?t:xM(+t),c):a
},c.paddingOuter=function(t){
return arguments.length?c.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):c.paddingTop()
},c.paddingTop=function(t){
return arguments.length?(o="function"==typeof t?t:xM(+t),c):o
},c.paddingRight=function(t){
return arguments.length?(u="function"==typeof t?t:xM(+t),c):u
},c.paddingBottom=function(t){
return arguments.length?(f="function"==typeof t?t:xM(+t),c):f
},c.paddingLeft=function(t){
return arguments.length?(s="function"==typeof t?t:xM(+t),c):s},c}()
;return t.ratio=function(e){var n=t.tile();n.ratio&&t.tile(n.ratio(e))
},t.method=function(e){
ok.hasOwnProperty(e)?t.tile(ok[e]):i("Unrecognized Treemap layout method: "+e)},
t
},sk.params=["method","ratio","size","round","padding","paddingInner","paddingOuter","paddingTop","paddingRight","paddingBottom","paddingLeft"],
sk.fields=uk;var ck=Object.freeze({nest:WM,pack:XM,partition:QM,stratify:tk,
tree:rk,treelinks:ak,treemap:fk});function lk(t){return function(){return t}}
function hk(t){return t[0]}function dk(t){return t[1]}function pk(){this._=null}
function gk(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function vk(t,e){var n=e,r=e.R,i=n.U
;i?i.L===n?i.L=r:i.R=r:t._=r,r.U=i,n.U=r,n.R=r.L,n.R&&(n.R.U=n),r.L=n}
function mk(t,e){var n=e,r=e.L,i=n.U
;i?i.L===n?i.L=r:i.R=r:t._=r,r.U=i,n.U=r,n.L=r.R,n.L&&(n.L.U=n),r.R=n}
function yk(t){for(;t.L;)t=t.L;return t}function bk(t,e,n,r){
var i=[null,null],a=Bk.push(i)-1
;return i.left=t,i.right=e,n&&xk(i,t,e,n),r&&xk(i,e,t,r),
Ik[t.index].halfedges.push(a),Ik[e.index].halfedges.push(a),i}
function _k(t,e,n){var r=[e,n];return r.left=t,r}function xk(t,e,n,r){
t[0]||t[1]?t.left===n?t[1]=r:t[0]=r:(t[0]=r,t.left=e,t.right=n)}
function wk(t,e,n,r,i){
var a,o=t[0],u=t[1],f=o[0],s=o[1],c=0,l=1,h=u[0]-f,d=u[1]-s;if(a=e-f,h||!(a>0)){
if(a/=h,h<0){if(a<c)return;a<l&&(l=a)}else if(h>0){if(a>l)return;a>c&&(c=a)}
if(a=r-f,h||!(a<0)){if(a/=h,h<0){if(a>l)return;a>c&&(c=a)}else if(h>0){
if(a<c)return;a<l&&(l=a)}if(a=n-s,d||!(a>0)){if(a/=d,d<0){if(a<c)return
;a<l&&(l=a)}else if(d>0){if(a>l)return;a>c&&(c=a)}if(a=i-s,d||!(a<0)){
if(a/=d,d<0){if(a>l)return;a>c&&(c=a)}else if(d>0){if(a<c)return;a<l&&(l=a)}
return!(c>0||l<1)||(c>0&&(t[0]=[f+c*h,s+c*d]),l<1&&(t[1]=[f+l*h,s+l*d]),!0)}}}}}
function Mk(t,e,n,r,i){var a=t[1];if(a)return!0
;var o,u,f=t[0],s=t.left,c=t.right,l=s[0],h=s[1],d=c[0],p=c[1],g=(l+d)/2,v=(h+p)/2
;if(p===h){if(g<e||g>=r)return;if(l>d){if(f){if(f[1]>=i)return}else f=[g,n]
;a=[g,i]}else{if(f){if(f[1]<n)return}else f=[g,i];a=[g,n]}
}else if(u=v-(o=(l-d)/(p-h))*g,o<-1||o>1)if(l>d){if(f){if(f[1]>=i)return
}else f=[(n-u)/o,n];a=[(i-u)/o,i]}else{if(f){if(f[1]<n)return}else f=[(i-u)/o,i]
;a=[(n-u)/o,n]}else if(h<p){if(f){if(f[0]>=r)return}else f=[e,o*e+u];a=[r,o*r+u]
}else{if(f){if(f[0]<e)return}else f=[r,o*r+u];a=[e,o*e+u]}
return t[0]=f,t[1]=a,!0}function kk(t,e){var n=t.site,r=e.left,i=e.right
;return n===i&&(i=r,
r=n),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(n===r?(r=e[1],i=e[0]):(r=e[0],
i=e[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function Ek(t,e){
return e[+(e.left!==t.site)]}function Sk(t,e){return e[+(e.left===t.site)]}
pk.prototype={constructor:pk,insert:function(t,e){var n,r,i;if(t){
if(e.P=t,e.N=t.N,t.N&&(t.N.P=e),t.N=e,t.R){for(t=t.R;t.L;)t=t.L;t.L=e}else t.R=e
;n=t
}else this._?(t=yk(this._),e.P=null,e.N=t,t.P=t.L=e,n=t):(e.P=e.N=null,this._=e,
n=null)
;for(e.L=e.R=null,e.U=n,e.C=!0,t=e;n&&n.C;)n===(r=n.U).L?(i=r.R)&&i.C?(n.C=i.C=!1,
r.C=!0,
t=r):(t===n.R&&(vk(this,n),n=(t=n).U),n.C=!1,r.C=!0,mk(this,r)):(i=r.L)&&i.C?(n.C=i.C=!1,
r.C=!0,t=r):(t===n.L&&(mk(this,n),n=(t=n).U),n.C=!1,r.C=!0,vk(this,r)),n=t.U
;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null
;var e,n,r,i=t.U,a=t.L,o=t.R
;if(n=a?o?yk(o):a:o,i?i.L===t?i.L=n:i.R=n:this._=n,a&&o?(r=n.C,
n.C=t.C,n.L=a,a.U=n,
n!==o?(i=n.U,n.U=t.U,t=n.R,i.L=t,n.R=o,o.U=n):(n.U=i,i=n,t=n.R)):(r=t.C,
t=n),t&&(t.U=i),!r)if(t&&t.C)t.C=!1;else{do{if(t===this._)break;if(t===i.L){
if((e=i.R).C&&(e.C=!1,i.C=!0,vk(this,i),e=i.R),e.L&&e.L.C||e.R&&e.R.C){
e.R&&e.R.C||(e.L.C=!1,
e.C=!0,mk(this,e),e=i.R),e.C=i.C,i.C=e.R.C=!1,vk(this,i),t=this._;break}
}else if((e=i.L).C&&(e.C=!1,i.C=!0,mk(this,i),e=i.L),e.L&&e.L.C||e.R&&e.R.C){
e.L&&e.L.C||(e.R.C=!1,
e.C=!0,vk(this,e),e=i.L),e.C=i.C,i.C=e.L.C=!1,mk(this,i),t=this._;break}
e.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var Ak,Ck=[];function Ok(){gk(this),
this.x=this.y=this.arc=this.site=this.cy=null}function zk(t){var e=t.P,n=t.N
;if(e&&n){var r=e.site,i=t.site,a=n.site;if(r!==a){
var o=i[0],u=i[1],f=r[0]-o,s=r[1]-u,c=a[0]-o,l=a[1]-u,h=2*(f*l-s*c)
;if(!(h>=-Yk)){
var d=f*f+s*s,p=c*c+l*l,g=(l*d-s*p)/h,v=(f*p-c*d)/h,m=Ck.pop()||new Ok
;m.arc=t,m.site=i,m.x=g+o,m.y=(m.cy=v+u)+Math.sqrt(g*g+v*v),t.circle=m
;for(var y=null,b=$k._;b;)if(m.y<b.y||m.y===b.y&&m.x<=b.x){if(!b.L){y=b.P;break}
b=b.L}else{if(!b.R){y=b;break}b=b.R}$k.insert(y,m),y||(Ak=m)}}}}function Dk(t){
var e=t.circle;e&&(e.P||(Ak=e.N),$k.remove(e),Ck.push(e),gk(e),t.circle=null)}
var Nk=[];function Rk(){gk(this),this.edge=this.site=this.circle=null}
function Tk(t){var e=Nk.pop()||new Rk;return e.site=t,e}function Pk(t){
Dk(t),jk.remove(t),Nk.push(t),gk(t)}function Lk(t){
var e=t.circle,n=e.x,r=e.cy,i=[n,r],a=t.P,o=t.N,u=[t];Pk(t)
;for(var f=a;f.circle&&Math.abs(n-f.circle.x)<Wk&&Math.abs(r-f.circle.cy)<Wk;)a=f.P,
u.unshift(f),Pk(f),f=a;u.unshift(f),Dk(f)
;for(var s=o;s.circle&&Math.abs(n-s.circle.x)<Wk&&Math.abs(r-s.circle.cy)<Wk;)o=s.N,
u.push(s),Pk(s),s=o;u.push(s),Dk(s);var c,l=u.length
;for(c=1;c<l;++c)s=u[c],f=u[c-1],xk(s.edge,f.site,s.site,i)
;f=u[0],(s=u[l-1]).edge=bk(f.site,s.site,null,i),zk(f),zk(s)}function qk(t){
for(var e,n,r,i,a=t[0],o=t[1],u=jk._;u;)if((r=Uk(u,o)-a)>Wk)u=u.L;else{
if(!((i=a-Fk(u,o))>Wk)){r>-Wk?(e=u.P,n=u):i>-Wk?(e=u,n=u.N):e=n=u;break}
if(!u.R){e=u;break}u=u.R}!function(t){Ik[t.index]={site:t,halfedges:[]}}(t)
;var f=Tk(t);if(jk.insert(e,f),e||n){
if(e===n)return Dk(e),n=Tk(e.site),jk.insert(f,n),
f.edge=n.edge=bk(e.site,f.site),zk(e),void zk(n);if(n){Dk(e),Dk(n)
;var s=e.site,c=s[0],l=s[1],h=t[0]-c,d=t[1]-l,p=n.site,g=p[0]-c,v=p[1]-l,m=2*(h*v-d*g),y=h*h+d*d,b=g*g+v*v,_=[(v*y-d*b)/m+c,(h*b-g*y)/m+l]
;xk(n.edge,s,p,_),f.edge=bk(s,t,null,_),n.edge=bk(t,p,null,_),zk(e),zk(n)
}else f.edge=bk(e.site,f.site)}}function Uk(t,e){
var n=t.site,r=n[0],i=n[1],a=i-e;if(!a)return r;var o=t.P;if(!o)return-1/0
;var u=(n=o.site)[0],f=n[1],s=f-e;if(!s)return u;var c=u-r,l=1/a-1/s,h=c/s
;return l?(-h+Math.sqrt(h*h-2*l*(c*c/(-2*s)-f+s/2+i-a/2)))/l+r:(r+u)/2}
function Fk(t,e){var n=t.N;if(n)return Uk(n,e);var r=t.site
;return r[1]===e?r[0]:1/0}var jk,Ik,$k,Bk,Wk=1e-6,Yk=1e-12;function Gk(t,e,n){
return(t[0]-n[0])*(e[1]-t[1])-(t[0]-e[0])*(n[1]-t[1])}function Hk(t,e){
return e[1]-t[1]||e[0]-t[0]}function Vk(t,e){var n,r,i,a=t.sort(Hk).pop()
;for(Bk=[],
Ik=new Array(t.length),jk=new pk,$k=new pk;;)if(i=Ak,a&&(!i||a[1]<i.y||a[1]===i.y&&a[0]<i.x))a[0]===n&&a[1]===r||(qk(a),
n=a[0],r=a[1]),a=t.pop();else{if(!i)break;Lk(i.arc)}if(function(){
for(var t,e,n,r,i=0,a=Ik.length;i<a;++i)if((t=Ik[i])&&(r=(e=t.halfedges).length)){
var o=new Array(r),u=new Array(r);for(n=0;n<r;++n)o[n]=n,u[n]=kk(t,Bk[e[n]])
;for(o.sort((function(t,e){return u[e]-u[t]})),n=0;n<r;++n)u[n]=e[o[n]]
;for(n=0;n<r;++n)e[n]=u[n]}}(),e){
var o=+e[0][0],u=+e[0][1],f=+e[1][0],s=+e[1][1];!function(t,e,n,r){
for(var i,a=Bk.length;a--;)Mk(i=Bk[a],t,e,n,r)&&wk(i,t,e,n,r)&&(Math.abs(i[0][0]-i[1][0])>Wk||Math.abs(i[0][1]-i[1][1])>Wk)||delete Bk[a]
}(o,u,f,s),function(t,e,n,r){var i,a,o,u,f,s,c,l,h,d,p,g,v=Ik.length,m=!0
;for(i=0;i<v;++i)if(a=Ik[i]){
for(o=a.site,u=(f=a.halfedges).length;u--;)Bk[f[u]]||f.splice(u,1)
;for(u=0,s=f.length;u<s;)p=(d=Sk(a,Bk[f[u]]))[0],
g=d[1],l=(c=Ek(a,Bk[f[++u%s]]))[0],
h=c[1],(Math.abs(p-l)>Wk||Math.abs(g-h)>Wk)&&(f.splice(u,0,Bk.push(_k(o,d,Math.abs(p-t)<Wk&&r-g>Wk?[t,Math.abs(l-t)<Wk?h:r]:Math.abs(g-r)<Wk&&n-p>Wk?[Math.abs(h-r)<Wk?l:n,r]:Math.abs(p-n)<Wk&&g-e>Wk?[n,Math.abs(l-n)<Wk?h:e]:Math.abs(g-e)<Wk&&p-t>Wk?[Math.abs(h-e)<Wk?l:t,e]:null))-1),
++s);s&&(m=!1)}if(m){var y,b,_,x=1/0
;for(i=0,m=null;i<v;++i)(a=Ik[i])&&(_=(y=(o=a.site)[0]-t)*y+(b=o[1]-e)*b)<x&&(x=_,
m=a);if(m){var w=[t,e],M=[t,r],k=[n,r],E=[n,e]
;m.halfedges.push(Bk.push(_k(o=m.site,w,M))-1,Bk.push(_k(o,M,k))-1,Bk.push(_k(o,k,E))-1,Bk.push(_k(o,E,w))-1)
}}for(i=0;i<v;++i)(a=Ik[i])&&(a.halfedges.length||delete Ik[i])}(o,u,f,s)}
this.edges=Bk,this.cells=Ik,jk=$k=Bk=Ik=null}function Xk(t){Mr.call(this,null,t)
}Vk.prototype={constructor:Vk,polygons:function(){var t=this.edges
;return this.cells.map((function(e){var n=e.halfedges.map((function(n){
return Ek(e,t[n])}));return n.data=e.site.data,n}))},triangles:function(){
var t=[],e=this.edges;return this.cells.forEach((function(n,r){
if(a=(i=n.halfedges).length)for(var i,a,o,u=n.site,f=-1,s=e[i[a-1]],c=s.left===u?s.right:s.left;++f<a;)o=c,
c=(s=e[i[f]]).left===u?s.right:s.left,
o&&c&&r<o.index&&r<c.index&&Gk(u,o,c)<0&&t.push([u.data,o.data,c.data])})),t},
links:function(){return this.edges.filter((function(t){return t.right
})).map((function(t){return{source:t.left.data,target:t.right.data}}))},
find:function(t,e,n){
for(var r,i,a=this,o=a._found||0,u=a.cells.length;!(i=a.cells[o]);)if(++o>=u)return null
;var f=t-i.site[0],s=e-i.site[1],c=f*f+s*s;do{
i=a.cells[r=o],o=null,i.halfedges.forEach((function(n){var r=a.edges[n],u=r.left
;if(u!==i.site&&u||(u=r.right)){var f=t-u[0],s=e-u[1],l=f*f+s*s
;l<c&&(c=l,o=u.index)}}))}while(null!==o)
;return a._found=r,null==n||c<=n*n?i.site:null}},Xk.Definition={type:"Voronoi",
metadata:{modifies:!0},params:[{name:"x",type:"field",required:!0},{name:"y",
type:"field",required:!0},{name:"size",type:"number",array:!0,length:2},{
name:"extent",type:"array",array:!0,length:2,default:[[-1e5,-1e5],[1e5,1e5]],
content:{type:"number",array:!0,length:2}},{name:"as",type:"string",
default:"path"}]};var Jk=$(Xk,Mr),Zk=[[-1e5,-1e5],[1e5,1e5]]
;Jk.transform=function(t,e){var n,r,i,a,o=t.as||"path",u=e.source
;for(n=function(){var t=hk,e=dk,n=null;function r(r){
return new Vk(r.map((function(n,i){
var a=[Math.round(t(n,i,r)/Wk)*Wk,Math.round(e(n,i,r)/Wk)*Wk]
;return a.index=i,a.data=n,a})),n)}return r.polygons=function(t){
return r(t).polygons()},r.links=function(t){return r(t).links()
},r.triangles=function(t){return r(t).triangles()},r.x=function(e){
return arguments.length?(t="function"==typeof e?e:lk(+e),r):t},r.y=function(t){
return arguments.length?(e="function"==typeof t?t:lk(+t),r):e
},r.extent=function(t){
return arguments.length?(n=null==t?null:[[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]],
r):n&&[[n[0][0],n[0][1]],[n[1][0],n[1][1]]]},r.size=function(t){
return arguments.length?(n=null==t?null:[[0,0],[+t[0],+t[1]]],
r):n&&[n[1][0]-n[0][0],n[1][1]-n[0][1]]},r
}().x(t.x).y(t.y),t.size?n.size(t.size):n.extent(t.extent||Zk),
this.value=n=n(u),
r=n.polygons(),i=0,a=u.length;i<a;++i)u[i][o]=r[i]?"M"+r[i].join("L")+"Z":null
;return e.reflow(t.modified()).modifies(o)};var Qk=Object.freeze({voronoi:Xk
}),Kk=Math.PI/180,tE=2048;function eE(){
var t,e,n,r,i,a,o,u=[256,256],f=oE,s=[],c=Math.random,l={};function h(t,e,n){
for(var r,i,a,o=e.x,s=e.y,l=Math.sqrt(u[0]*u[0]+u[1]*u[1]),h=f(u),d=c()<.5?1:-1,p=-d;(r=h(p+=d))&&(i=~~r[0],
a=~~r[1],
!(Math.min(Math.abs(i),Math.abs(a))>=l));)if(e.x=o+i,e.y=s+a,!(e.x+e.x0<0||e.y+e.y0<0||e.x+e.x1>u[0]||e.y+e.y1>u[1])&&(!n||!rE(e,t,u[0]))&&(!n||aE(e,n))){
for(var g,v=e.sprite,m=e.width>>5,y=u[0]>>5,b=e.x-(m<<4),_=127&b,x=32-_,w=e.y1-e.y0,M=(e.y+e.y0)*y+(b>>5),k=0;k<w;k++){
g=0;for(var E=0;E<=m;E++)t[M+E]|=g<<x|(E<m?(g=v[k*m+E])>>>_:0);M+=y}
return e.sprite=null,!0}return!1}return l.layout=function(){
for(var f=function(t){t.width=t.height=1
;var e=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2)
;t.width=2048/e,t.height=tE/e;var n=t.getContext("2d")
;return n.fillStyle=n.strokeStyle="red",n.textAlign="center",{context:n,ratio:e}
}(Ka()),l=function(t){var e=[],n=-1;for(;++n<t;)e[n]=0;return e
}((u[0]>>5)*u[1]),d=null,p=s.length,g=-1,v=[],m=s.map((function(u){return{
text:t(u),font:e(u),style:r(u),weight:i(u),rotate:a(u),size:~~n(u),padding:o(u),
xoff:0,yoff:0,x1:0,y1:0,x0:0,y0:0,hasText:!1,sprite:null,datum:u}
})).sort((function(t,e){return e.size-t.size}));++g<p;){var y=m[g]
;y.x=u[0]*(c()+.5)>>1,
y.y=u[1]*(c()+.5)>>1,nE(f,y,m,g),y.hasText&&h(l,y,d)&&(v.push(y),d?iE(d,y):d=[{
x:y.x+y.x0,y:y.y+y.y0},{x:y.x+y.x1,y:y.y+y.y1}],y.x-=u[0]>>1,y.y-=u[1]>>1)}
return v},l.words=function(t){return arguments.length?(s=t,l):s
},l.size=function(t){return arguments.length?(u=[+t[0],+t[1]],l):u
},l.font=function(t){return arguments.length?(e=uE(t),l):e
},l.fontStyle=function(t){return arguments.length?(r=uE(t),l):r
},l.fontWeight=function(t){return arguments.length?(i=uE(t),l):i
},l.rotate=function(t){return arguments.length?(a=uE(t),l):a
},l.text=function(e){return arguments.length?(t=uE(e),l):t
},l.spiral=function(t){return arguments.length?(f=fE[t]||t,l):f
},l.fontSize=function(t){return arguments.length?(n=uE(t),l):n
},l.padding=function(t){return arguments.length?(o=uE(t),l):o
},l.random=function(t){return arguments.length?(c=t,l):c},l}
function nE(t,e,n,r){if(!e.sprite){var i=t.context,a=t.ratio
;i.clearRect(0,0,2048/a,tE/a);var o,u,f,s,c,l=0,h=0,d=0,p=n.length
;for(--r;++r<p;){
if(e=n[r],i.save(),i.font=e.style+" "+e.weight+" "+~~((e.size+1)/a)+"px "+e.font,
o=i.measureText(e.text+"m").width*a,f=e.size<<1,e.rotate){
var g=Math.sin(e.rotate*Kk),v=Math.cos(e.rotate*Kk),m=o*v,y=o*g,b=f*v,_=f*g
;o=Math.max(Math.abs(m+_),Math.abs(m-_))+31>>5<<5,
f=~~Math.max(Math.abs(y+b),Math.abs(y-b))}else o=o+31>>5<<5
;if(f>d&&(d=f),l+o>=2048&&(l=0,h+=d,d=0),h+f>=tE)break
;i.translate((l+(o>>1))/a,(h+(f>>1))/a),
e.rotate&&i.rotate(e.rotate*Kk),i.fillText(e.text,0,0),
e.padding&&(i.lineWidth=2*e.padding,
i.strokeText(e.text,0,0)),i.restore(),e.width=o,
e.height=f,e.xoff=l,e.yoff=h,e.x1=o>>1,
e.y1=f>>1,e.x0=-e.x1,e.y0=-e.y1,e.hasText=!0,l+=o}
for(var x=i.getImageData(0,0,2048/a,tE/a).data,w=[];--r>=0;)if((e=n[r]).hasText){
for(u=(o=e.width)>>5,f=e.y1-e.y0,s=0;s<f*u;s++)w[s]=0;if(null==(l=e.xoff))return
;h=e.yoff;var M=0,k=-1;for(c=0;c<f;c++){for(s=0;s<o;s++){
var E=u*c+(s>>5),S=x[2048*(h+c)+(l+s)<<2]?1<<31-s%32:0;w[E]|=S,M|=S}
M?k=c:(e.y0++,f--,c--,h++)}e.y1=e.y0+k,e.sprite=w.slice(0,(e.y1-e.y0)*u)}}}
function rE(t,e,n){n>>=5
;for(var r,i=t.sprite,a=t.width>>5,o=t.x-(a<<4),u=127&o,f=32-u,s=t.y1-t.y0,c=(t.y+t.y0)*n+(o>>5),l=0;l<s;l++){
r=0;for(var h=0;h<=a;h++)if((r<<f|(h<a?(r=i[l*a+h])>>>u:0))&e[c+h])return!0;c+=n
}return!1}function iE(t,e){var n=t[0],r=t[1]
;e.x+e.x0<n.x&&(n.x=e.x+e.x0),e.y+e.y0<n.y&&(n.y=e.y+e.y0),
e.x+e.x1>r.x&&(r.x=e.x+e.x1),e.y+e.y1>r.y&&(r.y=e.y+e.y1)}function aE(t,e){
return t.x+t.x1>e[0].x&&t.x+t.x0<e[1].x&&t.y+t.y1>e[0].y&&t.y+t.y0<e[1].y}
function oE(t){var e=t[0]/t[1];return function(t){
return[e*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function uE(t){
return"function"==typeof t?t:function(){return t}}var fE={archimedean:oE,
rectangular:function(t){var e=4*t[0]/t[1],n=0,r=0;return function(t){
var i=t<0?-1:1;switch(Math.sqrt(1+4*i*t)-i&3){case 0:n+=e;break;case 1:r+=4
;break;case 2:n-=e;break;default:r-=4}return[n,r]}}
},sE=["x","y","font","fontSize","fontStyle","fontWeight","angle"],cE=["text","font","rotate","fontSize","fontStyle","fontWeight"]
;function lE(t){Mr.call(this,eE(),t)}lE.Definition={type:"Wordcloud",metadata:{
modifies:!0},params:[{name:"size",type:"number",array:!0,length:2},{name:"font",
type:"string",expr:!0,default:"sans-serif"},{name:"fontStyle",type:"string",
expr:!0,default:"normal"},{name:"fontWeight",type:"string",expr:!0,
default:"normal"},{name:"fontSize",type:"number",expr:!0,default:14},{
name:"fontSizeRange",type:"number",array:"nullable",default:[10,50]},{
name:"rotate",type:"number",expr:!0,default:0},{name:"text",type:"field"},{
name:"spiral",type:"string",values:["archimedean","rectangular"]},{
name:"padding",type:"number",expr:!0},{name:"as",type:"string",array:!0,
length:7,default:sE}]},$(lE,Mr).transform=function(e,n){var r=e.modified()
;if(r||n.changed(n.ADD_REM)||cE.some((function(t){var r=e[t]
;return T(r)&&n.modified(r.fields)}))){
var i,a=n.materialize(n.SOURCE).source,o=this.value,u=e.as||sE,f=e.fontSize||14
;if(T(f)?i=e.fontSizeRange:f=L(f),i){
var s=f,c=Rp("sqrt")().domain(function(t,e){
for(var n,r=1/0,i=-1/0,a=0,o=e.length;a<o;++a)(n=t(e[a]))<r&&(r=n),n>i&&(i=n)
;return[r,i]}(s,a)).range(i);f=function(t){return c(s(t))}}
a.forEach((function(t){t[u[0]]=NaN,t[u[1]]=NaN,t[u[3]]=0}))
;for(var l,h,d=o.words(a).text(e.text).size(e.size||[500,500]).padding(e.padding||1).spiral(e.spiral||"archimedean").rotate(e.rotate||0).font(e.font||"sans-serif").fontStyle(e.fontStyle||"normal").fontWeight(e.fontWeight||"normal").fontSize(f).random(t.random).layout(),p=o.size(),g=p[0]>>1,v=p[1]>>1,m=0,y=d.length;m<y;++m)(h=(l=d[m]).datum)[u[0]]=l.x+g,
h[u[1]]=l.y+v,
h[u[2]]=l.font,h[u[3]]=l.size,h[u[4]]=l.style,h[u[5]]=l.weight,h[u[6]]=l.rotate
;return n.reflow(r).modifies(u)}};var hE=Object.freeze({wordcloud:lE})
;function dE(t){return new Uint8Array(t)}function pE(t){
return new Uint16Array(t)}function gE(t){return new Uint32Array(t)}
function vE(t,e,n){var r=(e<257?dE:e<65537?pE:gE)(t);return n&&r.set(n),r}
function mE(t,e,n){var r=1<<e;return{one:r,zero:~r,range:n.slice(),
bisect:t.bisect,index:t.index,size:t.size,onAdd:function(t,e){
var n,i=this,a=i.bisect(i.range,t.value),o=t.index,u=a[0],f=a[1],s=o.length
;for(n=0;n<u;++n)e[o[n]]|=r;for(n=f;n<s;++n)e[o[n]]|=r;return i}}}function yE(){
var t=gE(0),e=[],n=0;return{insert:function(r,i,a){if(!i.length)return[]
;var o,u,f,s=n,c=i.length,l=Array(c),h=gE(c);for(f=0;f<c;++f)l[f]=r(i[f]),h[f]=f
;if(l=function(t,e){return t.sort.call(e,(function(e,n){var r=t[e],i=t[n]
;return r<i?-1:r>i?1:0})),function(t,e){
for(var n=e.length,r=new Array(n);n--;)r[n]=t[e[n]];return r}(t,e)
}(l,h),s)o=e,u=t,e=Array(s+c),t=gE(s+c),function(t,e,n,r,i,a,o,u,f){
var s,c=0,l=0;for(s=0;c<r&&l<o;++s)e[c]<i[l]?(u[s]=e[c],f[s]=n[c++]):(u[s]=i[l],
f[s]=a[l++]+t);for(;c<r;++c,++s)u[s]=e[c],f[s]=n[c]
;for(;l<o;++l,++s)u[s]=i[l],f[s]=a[l]+t}(a,o,u,s,l,h,c,e,t);else{
if(a>0)for(f=0;f<c;++f)h[f]+=a;e=l,t=h}return n=s+c,{index:h,value:l}},
remove:function(r,i){var a,o,u,f=n;for(o=0;!i[t[o]]&&o<f;++o);
for(u=o;o<f;++o)i[a=t[o]]||(t[u]=a,e[u]=e[o],++u);n=f-r},bisect:function(t,r){
var i;return r?i=r.length:(r=e,i=n),[Br(r,t[0],0,i),$r(r,t[1],0,i)]},
reindex:function(e){for(var r=0,i=n;r<i;++r)t[r]=e[t[r]]},index:function(){
return t},size:function(){return n}}}function bE(t){Mr.call(this,function(){
var t=8,e=[],n=gE(0),r=vE(0,t),i=vE(0,t);return{data:function(){return e},
seen:function(){return n=function(t,e,n){
return t.length>=e?t:((n=n||new t.constructor(e)).set(t),n)}(n,e.length)},
add:function(t){for(var n,r=0,i=e.length,a=t.length;r<a;++r)(n=t[r])._index=i++,
e.push(n)},remove:function(t,n){var a,o,u,f=e.length,s=Array(f-t),c=e
;for(o=0;!n[o]&&o<f;++o)s[o]=e[o],c[o]=o
;for(u=o;o<f;++o)a=e[o],n[o]?c[o]=-1:(c[o]=u,
r[u]=r[o],i[u]=i[o],s[u]=a,a._index=u++),r[o]=0;return e=s,c},size:function(){
return e.length},curr:function(){return r},prev:function(){return i},
reset:function(t){i[t]=r[t]},all:function(){
return t<257?255:t<65537?65535:4294967295},set:function(t,e){r[t]|=e},
clear:function(t,e){r[t]&=~e},resize:function(e,n){
(e>r.length||n>t)&&(t=Math.max(n,t),r=vE(e,t,r),i=vE(e,t))}}
}(),t),this._indices=null,this._dims=null}bE.Definition={type:"CrossFilter",
metadata:{},params:[{name:"fields",type:"field",array:!0,required:!0},{
name:"query",type:"array",array:!0,required:!0,content:{type:"number",array:!0,
length:2}}]};var _E=$(bE,Mr);function xE(t){Mr.call(this,null,t)}
_E.transform=function(t,e){
return this._dims?t.modified("fields")||t.fields.some((function(t){
return e.modified(t.fields)}))?this.reinit(t,e):this.eval(t,e):this.init(t,e)
},_E.init=function(t,e){
for(var n,r,i=t.fields,a=t.query,o=this._indices={},u=this._dims=[],f=a.length,s=0;s<f;++s)r=o[n=i[s].fname]||(o[n]=yE()),
u.push(mE(r,s,a[s]));return this.eval(t,e)},_E.reinit=function(t,e){
var n,r,i,a,o,u,f,s,c,l=e.materialize().fork(),h=t.fields,d=t.query,p=this._indices,g=this._dims,v=this.value,m=v.curr(),y=v.prev(),b=v.all(),_=l.rem=l.add,x=l.mod,w=d.length,M={}
;if(y.set(m),
e.rem.length&&(o=this.remove(t,e,l)),e.add.length&&v.add(e.add),e.mod.length)for(u={},
f=0,s=(a=e.mod).length;f<s;++f)u[a[f]._index]=1
;for(f=0;f<w;++f)c=h[f],(!g[f]||t.modified("fields",f)||e.modified(c.fields))&&((n=M[i=c.fname])||(p[i]=r=yE(),
M[i]=n=r.insert(c,e.source,0)),g[f]=mE(r,f,d[f]).onAdd(n,m))
;for(f=0,s=v.data().length;f<s;++f)o[f]||(y[f]!==m[f]?_.push(f):u[f]&&m[f]!==b&&x.push(f))
;return v.mask=(1<<w)-1,l},_E.eval=function(t,e){
var n=e.materialize().fork(),r=this._dims.length,i=0
;return e.rem.length&&(this.remove(t,e,n),
i|=(1<<r)-1),t.modified("query")&&!t.modified("fields")&&(i|=this.update(t,e,n)),
e.add.length&&(this.insert(t,e,n),
i|=(1<<r)-1),e.mod.length&&(this.modify(e,n),i|=(1<<r)-1),this.value.mask=i,n
},_E.insert=function(t,e,n){
var r,i,a,o=e.add,u=this.value,f=this._dims,s=this._indices,c=t.fields,l={},h=n.add,d=u.size(),p=d+o.length,g=f.length
;u.resize(p,g),u.add(o);var v=u.curr(),m=u.prev(),y=u.all()
;for(r=0;r<g;++r)a=l[i=c[r].fname]||(l[i]=s[i].insert(c[r],o,d)),f[r].onAdd(a,v)
;for(;d<p;++d)m[d]=y,v[d]!==y&&h.push(d)},_E.modify=function(t,e){
var n,r,i,a=e.mod,o=this.value,u=o.curr(),f=o.all(),s=t.mod
;for(n=0,r=s.length;n<r;++n)u[i=s[n]._index]!==f&&a.push(i)
},_E.remove=function(t,e,n){
var r,i,a,o,u=this._indices,f=this.value,s=f.curr(),c=f.prev(),l=f.all(),h={},d=n.rem,p=e.rem
;for(r=0,
i=p.length;r<i;++r)h[a=p[r]._index]=1,c[a]=o=s[a],s[a]=l,o!==l&&d.push(a)
;for(a in u)u[a].remove(i,h);return this.reindex(e,i,h),h
},_E.reindex=function(t,e,n){var r=this._indices,i=this.value
;t.runAfter((function(){var t=i.remove(e,n);for(var a in r)r[a].reindex(t)}))
},_E.update=function(t,e,n){
var r,i,a=this._dims,o=t.query,u=e.stamp,f=a.length,s=0
;for(n.filters=0,i=0;i<f;++i)t.modified("query",i)&&(r=i,++s)
;if(1===s)s=a[r].one,
this.incrementOne(a[r],o[r],n.add,n.rem);else for(i=0,s=0;i<f;++i)t.modified("query",i)&&(s|=a[i].one,
this.incrementAll(a[i],o[i],u,n.add),n.rem=n.add);return s
},_E.incrementAll=function(t,e,n,r){
var i,a,o,u=this.value,f=u.seen(),s=u.curr(),c=u.prev(),l=t.index(),h=t.bisect(t.range),d=t.bisect(e),p=d[0],g=d[1],v=h[0],m=h[1],y=t.one
;if(p<v)for(i=p,
a=Math.min(v,g);i<a;++i)f[o=l[i]]!==n&&(c[o]=s[o],f[o]=n,r.push(o)),
s[o]^=y;else if(p>v)for(i=v,
a=Math.min(p,m);i<a;++i)f[o=l[i]]!==n&&(c[o]=s[o],f[o]=n,r.push(o)),s[o]^=y
;if(g>m)for(i=Math.max(p,m),
a=g;i<a;++i)f[o=l[i]]!==n&&(c[o]=s[o],f[o]=n,r.push(o)),
s[o]^=y;else if(g<m)for(i=Math.max(v,g),
a=m;i<a;++i)f[o=l[i]]!==n&&(c[o]=s[o],f[o]=n,r.push(o)),s[o]^=y
;t.range=e.slice()},_E.incrementOne=function(t,e,n,r){
var i,a,o,u=this.value.curr(),f=t.index(),s=t.bisect(t.range),c=t.bisect(e),l=c[0],h=c[1],d=s[0],p=s[1],g=t.one
;if(l<d)for(i=l,
a=Math.min(d,h);i<a;++i)u[o=f[i]]^=g,n.push(o);else if(l>d)for(i=d,
a=Math.min(l,p);i<a;++i)u[o=f[i]]^=g,r.push(o)
;if(h>p)for(i=Math.max(l,p),a=h;i<a;++i)u[o=f[i]]^=g,
n.push(o);else if(h<p)for(i=Math.max(d,h),a=p;i<a;++i)u[o=f[i]]^=g,r.push(o)
;t.range=e.slice()},xE.Definition={type:"ResolveFilter",metadata:{},params:[{
name:"ignore",type:"number",required:!0,
description:"A bit mask indicating which filters to ignore."},{name:"filter",
type:"object",required:!0,
description:"Per-tuple filter bitmaps from a CrossFilter transform."}]
},$(xE,Mr).transform=function(t,e){var n=~(t.ignore||0),r=t.filter,i=r.mask
;if(0==(i&n))return e.StopPropagation
;var a=e.fork(e.ALL),o=r.data(),u=r.curr(),f=r.prev(),s=function(t){
return u[t]&n?null:o[t]}
;return a.filter(a.MOD,s),i&i-1?(a.filter(a.ADD,(function(t){var e=u[t]&n
;return!e&&e^f[t]&n?o[t]:null})),a.filter(a.REM,(function(t){var e=u[t]&n
;return e&&!(e^e^f[t]&n)?o[t]:null
}))):(a.filter(a.ADD,s),a.filter(a.REM,(function(t){return(u[t]&n)===i?o[t]:null
}))),a.filter(a.SOURCE,(function(t){return s(t._index)}))}
;var wE=Object.freeze({crossfilter:bE,resolvefilter:xE}),ME="default"
;function kE(t){var e=t._signals.cursor;e||(t._signals.cursor=e=t.add({user:ME,
item:null})),t.on(t.events("view","mousemove"),e,(function(t,n){
var r=e.value,i=r?f(r)?r:r.user:ME,a=n.item&&n.item.cursor||null
;return r&&i===r.user&&a==r.item?r:{user:i,item:a}})),t.add(null,(function(t){
var e=t.cursor,n=this.value;return f(e)||(n=e.item,e=e.user),function(t){
"undefined"!=typeof document&&document.body&&(document.body.style.cursor=t)
}(e&&e!==ME?e:n||e),n}),{cursor:e})}function EE(t,e){var n=t._runtime.data
;return n.hasOwnProperty(e)||i("Unrecognized data set: "+e),n[e]}
function SE(t,e){pt(e)||i("Second argument to changes must be a changeset.")
;var n=EE(this,t);return n.modified=!0,this.pulse(n.input,e)}function AE(t){
var e=t.padding();return Math.max(0,t._viewWidth+e.left+e.right)}function CE(t){
var e=t.padding();return Math.max(0,t._viewHeight+e.top+e.bottom)}
function OE(t){var e=t.padding(),n=t._origin;return[e.left+n[0],e.top+n[1]]}
function zE(t,e,n){var r,i,a=t._renderer.canvas()
;return a&&(i=OE(t),(r=As(e.changedTouches?e.changedTouches[0]:e,a))[0]-=i[0],
r[1]-=i[1]),e.dataflow=t,e.vega=function(t,e,n){
var r=e?"group"===e.mark.marktype?e:e.mark.group:null;function i(t){var n,i=r
;if(t)for(n=e;n;n=n.mark.group)if(n.mark.name===t){i=n;break}
return i&&i.mark&&i.mark.interactive?i:{}}function a(t){if(!t)return n
;f(t)&&(t=i(t))
;for(var e=n.slice();t;)e[0]-=t.x||0,e[1]-=t.y||0,t=t.mark&&t.mark.group
;return e}return{view:L(t),item:L(e||{}),group:i,xy:a,x:function(t){
return a(t)[0]},y:function(t){return a(t)[1]}}}(t,n,r),e.item=n,e}
var DE="view",NE={trap:!1};function RE(t){return t.item}function TE(t){
var e=t.item.mark.source;return e.source||e}function PE(t){return function(e,n){
return n.vega.view().changeset().encode(n.item,t)}}function LE(t,e,n){
var r=document.createElement(t);for(var i in e)r.setAttribute(i,e[i])
;return null!=n&&(r.textContent=n),r}var qE="vega-bind",UE="vega-bind-name"
;function FE(t,e,n){if(e){var r=n.param,i=n.state;return i||(i=n.state={
elements:null,active:!1,set:null,update:function(e){
e!==t.signal(r.signal)&&(i.source=!0,t.signal(r.signal,e).run())}
},r.debounce&&(i.update=q(r.debounce,i.update))),function(t,e,n,r){
var i=LE("div",{class:qE});i.appendChild(LE("span",{class:UE
},n.name||n.signal)),e.appendChild(i);var a=jE;switch(n.input){case"checkbox":
a=IE;break;case"select":a=$E;break;case"radio":a=BE;break;case"range":a=WE}
a(t,i,n,r)
}(i,e,r,t.signal(r.signal)),i.active||(t.on(t._signals[r.signal],null,(function(){
i.source?i.source=!1:i.set(t.signal(r.signal))})),i.active=!0),i}}
function jE(t,e,n,r){var i=LE("input")
;for(var a in n)"signal"!==a&&"element"!==a&&i.setAttribute("input"===a?"type":a,n[a])
;i.setAttribute("name",n.signal),
i.value=r,e.appendChild(i),i.addEventListener("input",(function(){
t.update(i.value)})),t.elements=[i],t.set=function(t){i.value=t}}
function IE(t,e,n,r){var i={type:"checkbox",name:n.signal};r&&(i.checked=!0)
;var a=LE("input",i);e.appendChild(a),a.addEventListener("change",(function(){
t.update(a.checked)})),t.elements=[a],t.set=function(t){a.checked=!!t||null}}
function $E(t,e,n,r){var i=LE("select",{name:n.signal})
;n.options.forEach((function(t){var e={value:t}
;YE(t,r)&&(e.selected=!0),i.appendChild(LE("option",e,t+""))
})),e.appendChild(i),i.addEventListener("change",(function(){
t.update(n.options[i.selectedIndex])})),t.elements=[i],t.set=function(t){
for(var e=0,r=n.options.length;e<r;++e)if(YE(n.options[e],t))return void(i.selectedIndex=e)
}}function BE(t,e,n,r){var i=LE("span",{class:"vega-bind-radio"})
;e.appendChild(i),t.elements=n.options.map((function(e){
var a="vega-option-"+n.signal+"-"+e,o={id:a,type:"radio",name:n.signal,value:e}
;YE(e,r)&&(o.checked=!0);var u=LE("input",o)
;return u.addEventListener("change",(function(){t.update(e)})),i.appendChild(u),
i.appendChild(LE("label",{for:a},e+"")),u})),t.set=function(e){
for(var n=t.elements,r=0,i=n.length;r<i;++r)YE(n[r].value,e)&&(n[r].checked=!0)}
}function WE(t,e,n,r){r=void 0!==r?r:(+n.max+ +n.min)/2
;var i=n.min||Math.min(0,+r)||0,a=n.max||Math.max(100,+r)||100,o=n.step||function(t,e,n){
var r=Math.abs(e-t)/Math.max(0,n),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),a=r/i
;return a>=Gr?i*=10:a>=Hr?i*=5:a>=Vr&&(i*=2),e<t?-i:i}(i,a,100),u=LE("input",{
type:"range",name:n.signal,min:i,max:a,step:o});u.value=r
;var f=LE("label",{},+r);function s(){f.textContent=u.value,t.update(+u.value)}
e.appendChild(u),
e.appendChild(f),u.addEventListener("input",s),u.addEventListener("change",s),
t.elements=[u],t.set=function(t){u.value=t,f.textContent=t}}function YE(t,e){
return t===e||t+""==e+""}function GE(t,e,n,r,i){
return(e=e||new r(t.loader())).initialize(n,AE(t),CE(t),OE(t),i).background(t._background)
}function HE(t,e){return e?function(){try{e.apply(this,arguments)}catch(i){
t.error(i)}}:null}function VE(t,e){if("string"==typeof e){
if("undefined"==typeof document)return t.error("DOM document instance not found."),
null
;if(!(e=document.querySelector(e)))return t.error("Signal bind element not found: "+e),
null}if(e)try{e.innerHTML=""}catch(n){e=null,t.error(n)}return e}
function XE(t,e,n){var r=Mc(e),i=r&&r.headless
;return i?t.runAsync().then((function(){
return GE(t,null,null,i,n).renderAsync(t._scenegraph.root)
})):Promise.reject("Unrecognized renderer type: "+e)}function JE(t){return+t||0}
var ZE,QE,KE,tS,eS,nS=["value","update","init","react","bind"];function rS(t,e){
i(t+' for "outer" push: '+s(e))}function iS(t,e){var n=t.name
;if("outer"===t.push)e.signals[n]||rS("No prior signal definition",n),
nS.forEach((function(e){void 0!==t[e]&&rS("Invalid property ",e)}));else{
var r=e.addSignal(n,t.value)
;!1===t.react&&(r.react=!1),t.bind&&e.addBinding(n,t.bind)}}function aS(t){
this.type=t}aS.prototype.visit=function(t){var e,n,r;if(t(this))return 1
;for(n=0,r=(e=function(t){switch(t.type){case"ArrayExpression":return t.elements
;case"BinaryExpression":case"LogicalExpression":return[t.left,t.right]
;case"CallExpression":var e=t.arguments.slice();return e.unshift(t.callee),e
;case"ConditionalExpression":return[t.test,t.consequent,t.alternate]
;case"MemberExpression":return[t.object,t.property];case"ObjectExpression":
return t.properties;case"Property":return[t.key,t.value];case"UnaryExpression":
return[t.argument];case"Identifier":case"Literal":case"RawCode":default:return[]
}}(this)).length;n<r;++n)if(e[n].visit(t))return 1}
;(ZE={})[1]="Boolean",ZE[2]="<end>",
ZE[3]="Identifier",ZE[4]="Keyword",ZE[5]="Null",
ZE[6]="Numeric",ZE[7]="Punctuator",ZE[8]="String",ZE[9]="RegularExpression"
;var oS="Identifier",uS="Unexpected token %0",fS="Invalid regular expression",sS="Invalid regular expression: missing /",cS="Octal literals are not allowed in strict mode.",lS="ILLEGAL",hS="Disabled.",dS=new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),pS=new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԯԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠ-ࢲࣤ-ॣ०-९ॱ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಁ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟ෦-෯ෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧ᪰-᪽ᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶ᳸᳹ᴀ-᷵᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚝꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꧠ-ꧾꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︭︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")
;function gS(t,e){if(!t)throw new Error("ASSERT: "+e)}function vS(t){
return t>=48&&t<=57}function mS(t){return"0123456789abcdefABCDEF".indexOf(t)>=0}
function yS(t){return"01234567".indexOf(t)>=0}function bS(t){
return 32===t||9===t||11===t||12===t||160===t||t>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(t)>=0
}function _S(t){return 10===t||13===t||8232===t||8233===t}function xS(t){
return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||92===t||t>=128&&dS.test(String.fromCharCode(t))
}function wS(t){
return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||t>=48&&t<=57||92===t||t>=128&&pS.test(String.fromCharCode(t))
}var MS={if:1,in:1,do:1,var:1,for:1,new:1,try:1,let:1,this:1,else:1,case:1,
void:1,with:1,enum:1,while:1,break:1,catch:1,throw:1,const:1,yield:1,class:1,
super:1,return:1,typeof:1,delete:1,switch:1,export:1,import:1,public:1,static:1,
default:1,finally:1,extends:1,package:1,private:1,function:1,continue:1,
debugger:1,interface:1,protected:1,instanceof:1,implements:1};function kS(){
for(var t;KE<tS&&(bS(t=QE.charCodeAt(KE))||_S(t));)++KE}function ES(t){
var e,n,r,i=0
;for(n="u"===t?4:2,e=0;e<n;++e)KE<tS&&mS(QE[KE])?(r=QE[KE++],i=16*i+"0123456789abcdef".indexOf(r.toLowerCase())):IS({},uS,lS)
;return String.fromCharCode(i)}function SS(){var t,e,n,r
;for(e=0,"}"===(t=QE[KE])&&IS({},uS,lS);KE<tS&&mS(t=QE[KE++]);)e=16*e+"0123456789abcdef".indexOf(t.toLowerCase())
;return(e>1114111||"}"!==t)&&IS({},uS,lS),
e<=65535?String.fromCharCode(e):(n=55296+(e-65536>>10),
r=56320+(e-65536&1023),String.fromCharCode(n,r))}function AS(){var t,e
;for(t=QE.charCodeAt(KE++),
e=String.fromCharCode(t),92===t&&(117!==QE.charCodeAt(KE)&&IS({},uS,lS),
++KE,(t=ES("u"))&&"\\"!==t&&xS(t.charCodeAt(0))||IS({},uS,lS),
e=t);KE<tS&&wS(t=QE.charCodeAt(KE));)++KE,
e+=String.fromCharCode(t),92===t&&(e=e.substr(0,e.length-1),
117!==QE.charCodeAt(KE)&&IS({},uS,lS),
++KE,(t=ES("u"))&&"\\"!==t&&wS(t.charCodeAt(0))||IS({},uS,lS),e+=t);return e}
function CS(){var t,e;return t=KE,{
type:1===(e=92===QE.charCodeAt(KE)?AS():function(){var t,e;for(t=KE++;KE<tS;){
if(92===(e=QE.charCodeAt(KE)))return KE=t,AS();if(!wS(e))break;++KE}
return QE.slice(t,KE)
}()).length?3:MS.hasOwnProperty(e)?4:"null"===e?5:"true"===e||"false"===e?1:3,
value:e,start:t,end:KE}}function OS(){
var t,e,n,r,i=KE,a=QE.charCodeAt(KE),o=QE[KE];switch(a){case 46:case 40:case 41:
case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:
return++KE,{type:7,value:String.fromCharCode(a),start:i,end:KE};default:
if(61===(t=QE.charCodeAt(KE+1)))switch(a){case 43:case 45:case 47:case 60:
case 62:case 94:case 124:case 37:case 38:case 42:return KE+=2,{type:7,
value:String.fromCharCode(a)+String.fromCharCode(t),start:i,end:KE};case 33:
case 61:return KE+=2,61===QE.charCodeAt(KE)&&++KE,{type:7,value:QE.slice(i,KE),
start:i,end:KE}}}return">>>="===(r=QE.substr(KE,4))?{type:7,value:r,start:i,
end:KE+=4}:">>>"===(n=r.substr(0,3))||"<<="===n||">>="===n?{type:7,value:n,
start:i,end:KE+=3}:o===(e=n.substr(0,2))[1]&&"+-<>&|".indexOf(o)>=0||"=>"===e?{
type:7,value:e,start:i,end:KE+=2}:"<>=!+-*%&|^/".indexOf(o)>=0?{type:7,value:o,
start:i,end:++KE}:void IS({},uS,lS)}function zS(){var t,e,n
;if(gS(vS((n=QE[KE]).charCodeAt(0))||"."===n,"Numeric literal must start with a decimal digit or a decimal point"),
e=KE,t="","."!==n){if(t=QE[KE++],n=QE[KE],"0"===t){
if("x"===n||"X"===n)return++KE,function(t){
for(var e="";KE<tS&&mS(QE[KE]);)e+=QE[KE++]
;return 0===e.length&&IS({},uS,lS),xS(QE.charCodeAt(KE))&&IS({},uS,lS),{type:6,
value:parseInt("0x"+e,16),start:t,end:KE}}(e);if(yS(n))return function(t){
for(var e="0"+QE[KE++];KE<tS&&yS(QE[KE]);)e+=QE[KE++]
;return(xS(QE.charCodeAt(KE))||vS(QE.charCodeAt(KE)))&&IS({},uS,lS),{type:6,
value:parseInt(e,8),octal:!0,start:t,end:KE}}(e)
;n&&vS(n.charCodeAt(0))&&IS({},uS,lS)}for(;vS(QE.charCodeAt(KE));)t+=QE[KE++]
;n=QE[KE]}if("."===n){for(t+=QE[KE++];vS(QE.charCodeAt(KE));)t+=QE[KE++]
;n=QE[KE]}
if("e"===n||"E"===n)if(t+=QE[KE++],"+"!==(n=QE[KE])&&"-"!==n||(t+=QE[KE++]),
vS(QE.charCodeAt(KE)))for(;vS(QE.charCodeAt(KE));)t+=QE[KE++];else IS({},uS,lS)
;return xS(QE.charCodeAt(KE))&&IS({},uS,lS),{type:6,value:parseFloat(t),start:e,
end:KE}}function DS(){var t,e,n,r;return eS=null,kS(),t=KE,e=function(){
var t,e,n,r
;for(gS("/"===(t=QE[KE]),"Regular expression literal must start with a slash"),
e=QE[KE++],
n=!1,r=!1;KE<tS;)if(e+=t=QE[KE++],"\\"===t)_S((t=QE[KE++]).charCodeAt(0))&&IS({},sS),
e+=t;else if(_S(t.charCodeAt(0)))IS({},sS);else if(n)"]"===t&&(n=!1);else{
if("/"===t){r=!0;break}"["===t&&(n=!0)}return r||IS({},sS),{
value:e.substr(1,e.length-2),literal:e}}(),n=function(){var t,e,n
;for(e="",n="";KE<tS&&wS((t=QE[KE]).charCodeAt(0));)++KE,
"\\"===t&&KE<tS?IS({},uS,lS):(n+=t,e+=t)
;return n.search(/[^gimuy]/g)>=0&&IS({},fS,n),{value:n,literal:e}
}(),r=function(t,e){var n=t
;e.indexOf("u")>=0&&(n=n.replace(/\\u\{([0-9a-fA-F]+)\}/g,(function(t,e){
if(parseInt(e,16)<=1114111)return"x";IS({},fS)
})).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"));try{return new RegExp(t,e)
}catch(r){return null}}(e.value,n.value),{literal:e.literal+n.literal,value:r,
regex:{pattern:e.value,flags:n.value},start:t,end:KE}}function NS(){var t
;return kS(),KE>=tS?{type:2,start:KE,end:KE
}:xS(t=QE.charCodeAt(KE))?CS():40===t||41===t||59===t?OS():39===t||34===t?function(){
var t,e,n,r,i="",a=!1
;for(gS("'"===(t=QE[KE])||'"'===t,"String literal must starts with a quote"),
e=KE,++KE;KE<tS;){if((n=QE[KE++])===t){t="";break}
if("\\"===n)if((n=QE[KE++])&&_S(n.charCodeAt(0)))"\r"===n&&"\n"===QE[KE]&&++KE;else switch(n){
case"u":case"x":"{"===QE[KE]?(++KE,i+=SS()):i+=ES(n);break;case"n":i+="\n";break
;case"r":i+="\r";break;case"t":i+="\t";break;case"b":i+="\b";break;case"f":
i+="\f";break;case"v":i+="\v";break;default:
yS(n)?(0!==(r="01234567".indexOf(n))&&(a=!0),
KE<tS&&yS(QE[KE])&&(a=!0,r=8*r+"01234567".indexOf(QE[KE++]),
"0123".indexOf(n)>=0&&KE<tS&&yS(QE[KE])&&(r=8*r+"01234567".indexOf(QE[KE++]))),
i+=String.fromCharCode(r)):i+=n}else{if(_S(n.charCodeAt(0)))break;i+=n}}
return""!==t&&IS({},uS,lS),{type:8,value:i,octal:a,start:e,end:KE}
}():46===t?vS(QE.charCodeAt(KE+1))?zS():OS():vS(t)?zS():OS()}function RS(){var t
;return KE=(t=eS).end,eS=NS(),KE=t.end,t}function TS(){var t;t=KE,eS=NS(),KE=t}
function PS(t,e,n){
var r=new aS("||"===t||"&&"===t?"LogicalExpression":"BinaryExpression")
;return r.operator=t,r.left=e,r.right=n,r}function LS(t,e){
var n=new aS("CallExpression");return n.callee=t,n.arguments=e,n}function qS(t){
var e=new aS(oS);return e.name=t,e}function US(t){var e=new aS("Literal")
;return e.value=t.value,
e.raw=QE.slice(t.start,t.end),t.regex&&("//"===e.raw&&(e.raw="/(?:)/"),
e.regex=t.regex),e}function FS(t,e,n){var r=new aS("MemberExpression")
;return r.computed="["===t,r.object=e,r.property=n,r.computed||(n.member=!0),r}
function jS(t,e,n){var r=new aS("Property");return r.key=e,r.value=n,r.kind=t,r}
function IS(t,e){
var n,r=Array.prototype.slice.call(arguments,2),i=e.replace(/%(\d)/g,(function(t,e){
return gS(e<r.length,"Message reference must be in range"),r[e]}))
;throw(n=new Error(i)).index=KE,n.description=i,n}function $S(t){
2===t.type&&IS(t,"Unexpected end of input"),
6===t.type&&IS(t,"Unexpected number"),
8===t.type&&IS(t,"Unexpected string"),3===t.type&&IS(t,"Unexpected identifier"),
4===t.type&&IS(t,"Unexpected reserved word"),IS(t,uS,t.value)}function BS(t){
var e=RS();7===e.type&&e.value===t||$S(e)}function WS(t){
return 7===eS.type&&eS.value===t}function YS(t){return 4===eS.type&&eS.value===t
}function GS(){var t=[]
;for(KE=eS.start,BS("[");!WS("]");)WS(",")?(RS(),t.push(null)):(t.push(iA()),
WS("]")||BS(","));return RS(),function(t){var e=new aS("ArrayExpression")
;return e.elements=t,e}(t)}function HS(){var t
;return KE=eS.start,8===(t=RS()).type||6===t.type?(t.octal&&IS(t,cS),
US(t)):qS(t.value)}function VS(){var t,e,n
;return KE=eS.start,3===(t=eS).type?(n=HS(),
BS(":"),jS("init",n,iA())):2!==t.type&&7!==t.type?(e=HS(),
BS(":"),jS("init",e,iA())):void $S(t)}function XS(){var t,e,n=[],r={},i=String
;for(KE=eS.start,
BS("{");!WS("}");)e="$"+((t=VS()).key.type===oS?t.key.name:i(t.key.value)),
Object.prototype.hasOwnProperty.call(r,e)?IS({},"Duplicate data property in object literal not allowed in strict mode"):r[e]=!0,
n.push(t),WS("}")||BS(",");return BS("}"),function(t){
var e=new aS("ObjectExpression");return e.properties=t,e}(n)}var JS={if:1,this:1
};function ZS(){var t,e,n;if(WS("("))return function(){var t
;return BS("("),t=aA(),BS(")"),t}();if(WS("["))return GS()
;if(WS("{"))return XS()
;if(t=eS.type,KE=eS.start,3===t||JS[eS.value])n=qS(RS().value);else if(8===t||6===t)eS.octal&&IS(eS,cS),
n=US(RS());else{if(4===t)throw new Error(hS)
;1===t?((e=RS()).value="true"===e.value,
n=US(e)):5===t?((e=RS()).value=null,n=US(e)):WS("/")||WS("/=")?(n=US(DS()),
TS()):$S(RS())}return n}function QS(){var t=[]
;if(BS("("),!WS(")"))for(;KE<tS&&(t.push(iA()),!WS(")"));)BS(",")
;return BS(")"),t}function KS(){return BS("."),function(){var t
;return KE=eS.start,function(t){
return 3===t.type||4===t.type||1===t.type||5===t.type
}(t=RS())||$S(t),qS(t.value)}()}function tA(){var t
;return BS("["),t=aA(),BS("]"),t}function eA(){var t=function(){var t
;for(t=ZS();;)if(WS("."))t=FS(".",t,KS());else if(WS("("))t=LS(t,QS());else{
if(!WS("["))break;t=FS("[",t,tA())}return t}()
;if(7===eS.type&&(WS("++")||WS("--")))throw new Error(hS);return t}
function nA(){var t,e;if(7!==eS.type&&4!==eS.type)e=eA();else{
if(WS("++")||WS("--"))throw new Error(hS)
;if(WS("+")||WS("-")||WS("~")||WS("!"))t=RS(),e=nA(),e=function(t,e){
var n=new aS("UnaryExpression");return n.operator=t,n.argument=e,n.prefix=!0,n
}(t.value,e);else{if(YS("delete")||YS("void")||YS("typeof"))throw new Error(hS)
;e=eA()}}return e}function rA(t){var e=0;if(7!==t.type&&4!==t.type)return 0
;switch(t.value){case"||":e=1;break;case"&&":e=2;break;case"|":e=3;break
;case"^":e=4;break;case"&":e=5;break;case"==":case"!=":case"===":case"!==":e=6
;break;case"<":case">":case"<=":case">=":case"instanceof":case"in":e=7;break
;case"<<":case">>":case">>>":e=8;break;case"+":case"-":e=9;break;case"*":
case"/":case"%":e=11}return e}function iA(){var t,e;return t=function(){
var t,e,n,r,i,a,o,u,f,s;if(t=eS,f=nA(),0===(i=rA(r=eS)))return f
;for(r.prec=i,RS(),e=[t,eS],a=[f,r,o=nA()];(i=rA(eS))>0;){
for(;a.length>2&&i<=a[a.length-2].prec;)o=a.pop(),
u=a.pop().value,f=a.pop(),e.pop(),n=PS(u,f,o),a.push(n)
;(r=RS()).prec=i,a.push(r),e.push(eS),n=nA(),a.push(n)}
for(n=a[s=a.length-1],e.pop();s>1;)e.pop(),n=PS(a[s-1].value,a[s-2],n),s-=2
;return n}(),WS("?")&&(RS(),e=iA(),BS(":"),t=function(t,e,n){
var r=new aS("ConditionalExpression")
;return r.test=t,r.consequent=e,r.alternate=n,r}(t,e,iA())),t}function aA(){
var t=iA();if(WS(","))throw new Error(hS);return t}var oA={NaN:"NaN",E:"Math.E",
LN2:"Math.LN2",LN10:"Math.LN10",LOG2E:"Math.LOG2E",LOG10E:"Math.LOG10E",
PI:"Math.PI",SQRT1_2:"Math.SQRT1_2",SQRT2:"Math.SQRT2",
MIN_VALUE:"Number.MIN_VALUE",MAX_VALUE:"Number.MAX_VALUE"};function uA(t){
function e(e,n,r){return function(i){return function(e,n,r,i){var a=t(n[0])
;return r&&(a=r+"("+a+")",
0===r.lastIndexOf("new ",0)&&(a="("+a+")")),a+"."+e+(i<0?"":0===i?"()":"("+n.slice(1).map(t).join(",")+")")
}(e,i,n,r)}}var n="new Date",r="String",a="RegExp";return{isNaN:"isNaN",
isFinite:"isFinite",abs:"Math.abs",acos:"Math.acos",asin:"Math.asin",
atan:"Math.atan",atan2:"Math.atan2",ceil:"Math.ceil",cos:"Math.cos",
exp:"Math.exp",floor:"Math.floor",log:"Math.log",max:"Math.max",min:"Math.min",
pow:"Math.pow",random:"Math.random",round:"Math.round",sin:"Math.sin",
sqrt:"Math.sqrt",tan:"Math.tan",clamp:function(e){
e.length<3&&i("Missing arguments to clamp function."),
e.length>3&&i("Too many arguments to clamp function.");var n=e.map(t)
;return"Math.max("+n[1]+", Math.min("+n[2]+","+n[0]+"))"},now:"Date.now",
utc:"Date.UTC",datetime:n,date:e("getDate",n,0),day:e("getDay",n,0),
year:e("getFullYear",n,0),month:e("getMonth",n,0),hours:e("getHours",n,0),
minutes:e("getMinutes",n,0),seconds:e("getSeconds",n,0),
milliseconds:e("getMilliseconds",n,0),time:e("getTime",n,0),
timezoneoffset:e("getTimezoneOffset",n,0),utcdate:e("getUTCDate",n,0),
utcday:e("getUTCDay",n,0),utcyear:e("getUTCFullYear",n,0),
utcmonth:e("getUTCMonth",n,0),utchours:e("getUTCHours",n,0),
utcminutes:e("getUTCMinutes",n,0),utcseconds:e("getUTCSeconds",n,0),
utcmilliseconds:e("getUTCMilliseconds",n,0),length:e("length",null,-1),
indexof:e("indexOf",null),lastindexof:e("lastIndexOf",null),
slice:e("slice",null),parseFloat:"parseFloat",parseInt:"parseInt",
upper:e("toUpperCase",r,0),lower:e("toLowerCase",r,0),
substring:e("substring",r),split:e("split",r),replace:e("replace",r),regexp:a,
test:e("test",a),if:function(e){
e.length<3&&i("Missing arguments to if function."),
e.length>3&&i("Too many arguments to if function.");var n=e.map(t)
;return"("+n[0]+"?"+n[1]+":"+n[2]+")"}}}var fA={};function sA(t,e,n){
var r=t+":"+n,i=fA[r];return i&&i[0]===e||(fA[r]=i=[e,e(n)]),i[1]}
function cA(t,e){return sA("timeFormat",Fe,e)(t)}var lA=new Date(2e3,0,1)
;function hA(t,e,n){return lA.setMonth(t),lA.setDate(e),cA(lA,n)}
function dA(t,e,n,r){var i,a=e[0],o=e[e.length-1]
;return a>o&&(i=a,a=o,o=i),r=void 0===r||r,
((n=void 0===n||n)?a<=t:a<t)&&(r?t<=o:t<o)}function pA(t,e,n){try{
t[e].apply(t,["EXPRESSION"].concat([].slice.call(n)))}catch(r){t.warn(r)}
return n[n.length-1]}var gA="undefined"!=typeof window&&window||null
;var vA="Literal",mA="%";function yA(t,e){var n
;return T(t)?t:f(t)?(n=e.scales[t])&&n.value:void 0}function bA(t,e,n){
var r=mA+n;if(!e.hasOwnProperty(r))try{e[r]=t.scaleRef(n)}catch(i){}}
function _A(t,e,n,r){
if(e[0].type===vA)bA(n,r,e[0].value);else if("Identifier"===e[0].type)for(t in n.scales)bA(n,r,t)
}function xA(t,e){return function(n,r,i){if(n){var a=yA(n,(i||this).context)
;return a&&a.path[t](r)}return e(r)}}var wA=xA("area",(function(t){
return ky.reset(),my(t,Ey),2*ky})),MA=xA("bounds",(function(t){var e,n,r,i,a,o,u
;if(jy=Fy=-(qy=Uy=1/0),Yy=[],my(t,cb),n=Yy.length){
for(Yy.sort(bb),e=1,a=[r=Yy[0]];e<n;++e)_b(r,(i=Yy[e])[0])||_b(r,i[1])?(yb(r[0],i[1])>yb(r[0],r[1])&&(r[1]=i[1]),
yb(i[0],r[1])>yb(r[0],r[1])&&(r[0]=i[0])):a.push(r=i)
;for(o=-1/0,e=0,r=a[n=a.length-1];e<=n;r=i,++e)i=a[e],(u=yb(r[1],i[0]))>o&&(o=u,
qy=i[0],Fy=r[1])}
return Yy=Gy=null,qy===1/0||Uy===1/0?[[NaN,NaN],[NaN,NaN]]:[[qy,Uy],[Fy,jy]]
})),kA=xA("centroid",(function(t){Hy=Vy=Xy=Jy=Zy=Qy=Ky=tb=eb=nb=rb=0,my(t,xb)
;var e=eb,n=nb,r=rb,i=e*e+n*n+r*r
;return i<1e-12&&(e=Qy,n=Ky,r=tb,Vy<Wm&&(e=Xy,n=Jy,
r=Zy),(i=e*e+n*n+r*r)<1e-12)?[NaN,NaN]:[Km(n,e)*Xm,cy(r/uy(i))*Xm]}))
;function EA(t){var e=this.context.data[t];return e?e.values.value:[]}
function SA(t,e,n,r){
e[0].type!==vA&&i("First argument to data functions must be a string literal.")
;var a=e[0].value,o=":"+a;r.hasOwnProperty(o)||(r[o]=n.getData(a).tuplesRef())}
var AA={};function CA(t){return t.data}function OA(t,e){var n=EA.call(e,t)
;return n.root&&n.root.lookup||AA}function zA(t,e){
return t===e||t!=t&&e!=e||!(!o(t)||!o(e)||t.length!==e.length)&&function(t,e){
for(var n=0,r=t.length;n<r;++n)if(!zA(t[n],e[n]))return!1;return!0}(t,e)}
function DA(t){return function(e){for(var n in t)if(!zA(e[n],t[n]))return!1
;return!0}}var NA="intersect",RA="index:unit";function TA(t,e){
for(var n,r,i=e.fields,a=e.values,u=i.length,f=0;f<u;++f)if((r=i[f]).getter=c.getter||c(r.field),
W(n=r.getter(t))&&(n=x(n)),
W(a[f])&&(a[f]=x(a[f])),W(a[f][0])&&(a[f]=a[f].map(x)),"E"===r.type){
if(o(a[f])?a[f].indexOf(n)<0:n!==a[f])return!1}else if("R"===r.type){
if(!dA(n,a[f]))return!1}else if("R-RE"===r.type){if(!dA(n,a[f],!0,!1))return!1
}else if("R-E"===r.type){if(!dA(n,a[f],!1,!1))return!1
}else if("R-LE"===r.type&&!dA(n,a[f],!1,!0))return!1;return!0}
function PA(t,e,n,r){
e[0].type!==vA&&i("First argument to indata must be a string literal.")
;var a=e[0].value,o="unit",u="@unit"
;(e.length>=2&&e[e.length-1].value)!==NA||r.hasOwnProperty(u)||(r["@unit"]=n.getData(a).indataRef(n,o)),
SA(0,e,n,r)}var LA={E_union:function(t,e){if(!t.length)return e
;for(var n=0,r=e.length;n<r;++n)t.indexOf(e[n])<0&&t.push(e[n]);return t},
E_intersect:function(t,e){return t.length?t.filter((function(t){
return e.indexOf(t)>=0})):e},R_union:function(t,e){var n=x(e[0]),r=x(e[1])
;return n>r&&(n=e[1],
r=e[0]),t.length?(t[0]>n&&(t[0]=n),t[1]<r&&(t[1]=r),t):[n,r]},
R_intersect:function(t,e){var n=x(e[0]),r=x(e[1])
;return n>r&&(n=e[1],r=e[0]),t.length?r<t[0]||t[1]<n?[]:(t[0]<n&&(t[0]=n),
t[1]>r&&(t[1]=r),t):[n,r]}},qA="bin_",UA="intersect",FA="union",jA="index:unit"
;function IA(t,e){
for(var n,r=e.fields,i=e.values,a=e.getter||(e.getter=[]),o=r.length,u=0;u<o;++u)if(a[u]=a[u]||c(r[u]),
W(n=a[u](t))&&(n=x(n)),W(i[u])&&(i[u]=x(i[u])),e[qA+r[u]]){
if(W(i[u][0])&&(i[u]=i[u].map(x)),!dA(n,i[u],!0,!1))return!1
}else if(n!==i[u])return!1;return!0}function $A(t,e){
for(var n,r,i=e.intervals,a=i.length,o=0;o<a;++o){
if(n=i[o].extent,r=(i[o].getter||(i[o].getter=c(i[o].field)))(t),
!n||n[0]===n[1])return!1
;if(W(r)&&(r=x(r)),W(n[0])&&(n=i[o].extent=n.map(x)),Y(n[0])&&!dA(r,n))return!1
;if(f(n[0])&&n.indexOf(r)<0)return!1}return!0}function BA(t,e,n,r){
for(var i,a,o,u,f,s=this.context.data[t],c=s?s.values.value:[],l=s?s[jA]&&s[jA].value:void 0,h=n===UA,d=c.length,p=0;p<d;++p)if(i=c[p],
l&&h){if(-1===(o=(a=a||{})[u=i.unit]||0))continue
;if(f=r(e,i),a[u]=f?-1:++o,f&&1===l.size)return!0
;if(!f&&o===l.get(u).count)return!1}else if(h^(f=r(e,i)))return f;return d&&h}
function WA(t,e,n){return BA.call(this,t,e,n,IA)}function YA(t,e,n,r){
e[0].type!==vA&&i("First argument to indata must be a string literal.")
;var a=e[0].value,o="unit",u="@unit"
;(e.length>=2&&e[e.length-1].value)!==UA||r.hasOwnProperty(u)||(r["@unit"]=n.getData(a).indataRef(n,o)),
SA(0,e,n,r)}function GA(t,e,n,r){
var i,a,o,u,f,s=this.context.data[t],c=s?s.values.value:[],l=s?s[jA]&&s[jA].value:void 0,h=c[0],d=0
;if(h){
for(i=e?h.encodings.length:h.fields.length;d<i;++d)if(e&&h.encodings[d]===e||n&&h.fields[d]===n){
a=d,u=h[qA+h.fields[d]];break}
return l&&1===l.size&&(r=FA),l&&r===UA?(f=c.reduce((function(t,e){
return(t[e.unit]||(t[e.unit]=[])).push({unit:e.unit,value:e.values[a]}),t}),{}),
o=Object.keys(f).map((function(t){return{unit:t,value:u?VA(f[t],FA):HA(f[t],FA)}
}))):o=c.map((function(t){return{unit:t.unit,value:t.values[a]}
})),u?VA(o,r):HA(o,r)}}function HA(t,e){
for(var n,r,i,a,o={},u=0,f={},s=[],c=0,l=t.length;c<l;++c)r=(n=t[c]).unit,
a=n.value,o[r]||(o[r]=++u),(i=f[a])||(f[a]=i={value:a,units:{},count:0
}),i.units[r]||(i.units[r]=++i.count)
;for(a in f)i=f[a],e===UA&&i.count!==u||s.push(i.value);return s.length?s:void 0
}function VA(t,e){
for(var n,r,i,a,o=e===UA?JA:XA,u=0,f=t.length;u<f;++u)W((n=t[u].value)[0])&&(n=n.map(x)),
(i=n[0])>(a=n[1])&&(a=n[0],i=n[1]),r=r?o(r,i,a):[i,a]
;return r&&r.length&&+r[0]!=+r[1]?r:void 0}function XA(t,e,n){
return t[0]>e&&(t[0]=e),t[1]<n&&(t[1]=n),t}function JA(t,e,n){
return n<t[0]||t[1]<e?[]:(t[0]<e&&(t[0]=e),t[1]>n&&(t[1]=n),t)}var ZA={
random:function(){return t.random()},isArray:o,isBoolean:B,isDate:W,isNumber:Y,
isObject:u,isRegExp:G,isString:f,isTuple:ut,toBoolean:Z,toDate:K,toNumber:x,
toString:tt,pad:J,peek:_,truncate:nt,rgb:dh,lab:Oh,hcl:Lh,hsl:yh,sequence:Yr,
format:function(t,e){return sA("format",np,e)(t)},utcFormat:function(t,e){
return sA("utcFormat",Ie,e)(t)},utcParse:function(t,e){
return sA("utcParse",$e,e)(t)},timeFormat:cA,timeParse:function(t,e){
return sA("timeParse",je,e)(t)},monthFormat:function(t){return hA(t,1,"%B")},
monthAbbrevFormat:function(t){return hA(t,1,"%b")},dayFormat:function(t){
return hA(0,2+t,"%A")},dayAbbrevFormat:function(t){return hA(0,2+t,"%a")},
quarter:function(t){return 1+~~(new Date(t).getMonth()/3)},
utcquarter:function(t){return 1+~~(new Date(t).getUTCMonth()/3)},
warn:function(){return pA(this.context.dataflow,"warn",arguments)},
info:function(){return pA(this.context.dataflow,"info",arguments)},
debug:function(){return pA(this.context.dataflow,"debug",arguments)},
extent:function(t){var e,n,r,i,a=0;if(t&&(e=t.length)){
for(n=t[a];null==n||n!=n;n=t[++a]);
for(r=i=n;a<e;++a)null!=(n=t[a])&&(n<r&&(r=n),n>i&&(i=n))}return[r,i]},
inScope:function(t){var e=this.context.group,n=!1;if(e)for(;t;){if(t===e){n=!0
;break}t=t.mark.group}return n},clampRange:function(t,e,n){var r,i=t[0],a=t[1]
;return a<i&&(r=a,
a=i,i=r),(r=a-i)>=n-e?[e,n]:[i=Math.min(Math.max(i,e),n-r),i+r]},
pinchDistance:function(t){
var e=t.touches,n=e[0].clientX-e[1].clientX,r=e[0].clientY-e[1].clientY
;return Math.sqrt(n*n+r*r)},pinchAngle:function(t){var e=t.touches
;return Math.atan2(e[0].clientY-e[1].clientY,e[0].clientX-e[1].clientX)},
screen:function(){return gA?gA.screen:{}},containerSize:function(){
var t=this.context.dataflow,e=t.container&&t.container()
;return e?[e.clientWidth,e.clientHeight]:[void 0,void 0]},windowSize:function(){
return gA?[gA.innerWidth,gA.innerHeight]:[void 0,void 0]},span:function(t){
return t[t.length-1]-t[0]||0},merge:function(){var t=[].slice.call(arguments)
;return t.unshift({}),U.apply(null,t)},flush:function(t,e,n,r,i,a){
if(!n&&0!==n)return a;var o,u,f=t[0],s=_(t),c=+n
;return s<f&&(o=f,f=s,s=o),(o=Math.abs(e-f))<(u=Math.abs(s-e))&&o<=c?r:u<=c?i:a
},bandspace:function(t,e,n){return bl(t||0,e||0,n||0)},inrange:dA,
setdata:function(t,e){var n=this.context.dataflow,r=this.context.data[t].input
;return n.pulse(r,n.changeset().remove(v).insert(e)),1},pathShape:function(t){
var e=null;return function(n){return n?Ou(n,e=e||wu(t)):t}},panLinear:S,
panLog:A,panPow:C,zoomLinear:z,zoomLog:D,zoomPow:N,encode:function(t,e,n){if(t){
var r=this.context.dataflow,i=t.mark.source;r.pulse(i,r.changeset().encode(t,e))
}return void 0!==n?n:t},modify:function(t,e,n,r,i,a){
var u,f,s=this.context.dataflow,c=this.context.data[t],l=c.input,h=c.changes,d=s.stamp()
;if(!1===s._trigger||!(l.value.length||e||r))return 0
;if((!h||h.stamp<d)&&(c.changes=h=s.changeset(),
h.stamp=d,s.runAfter((function(){c.modified=!0,s.pulse(l,h).run()
}),!0,1)),n&&(u=!0===n?v:o(n)||ut(n)?n:DA(n),
h.remove(u)),e&&h.insert(e),r&&(u=DA(r),
l.value.some(u)?h.remove(u):h.insert(r)),i)for(f in a)h.modify(i,f,a[f])
;return 1}},QA=["view","item","group","xy","x","y"],KA="this.",tC={}
;function eC(t,e,n){
return 1===arguments.length?ZA[t]:(ZA[t]=e,n&&(tC[t]=n),rC&&(rC.functions[t]=KA+t),
this)}eC("bandwidth",(function(t,e){var n=yA(t,(e||this).context)
;return n&&n.bandwidth?n.bandwidth():0}),_A),eC("copy",(function(t,e){
var n=yA(t,(e||this).context);return n?n.copy():void 0
}),_A),eC("domain",(function(t,e){var n=yA(t,(e||this).context)
;return n?n.domain():[]}),_A),eC("range",(function(t,e){
var n=yA(t,(e||this).context);return n&&n.range?n.range():[]
}),_A),eC("invert",(function(t,e,n){var r=yA(t,(n||this).context)
;return r?o(e)?(r.invertRange||r.invert)(e):(r.invert||r.invertExtent)(e):void 0
}),_A),eC("scale",(function(t,e,n){var r=yA(t,(n||this).context)
;return r?r(e):void 0}),_A),eC("gradient",(function(t,e,n,r,i){
t=yA(t,(i||this).context);var a=Ja(e,n),o=t.domain(),u=o[0],f=_(o),s=qp(t,u,f)
;t.ticks&&(u!==(o=t.ticks(+r||15))[0]&&o.unshift(u),f!==_(o)&&o.push(f))
;for(var c=0,l=o.length;c<l;++c)a.stop(s(o[c]),t(o[c]));return a
}),_A),eC("geoArea",wA,_A),
eC("geoBounds",MA,_A),eC("geoCentroid",kA,_A),eC("geoShape",(function(t,e,n){
var r=yA(t,(n||this).context);return function(t){
return r?r.path.context(t)(e):""}}),_A),eC("indata",(function(t,e,n){
var r=this.context.data[t]["index:"+e],i=r?r.value.get(n):void 0
;return i?i.count:i}),(function(t,e,n,r){
e[0].type!==vA&&i("First argument to indata must be a string literal."),
e[1].type!==vA&&i("Second argument to indata must be a string literal.")
;var a=e[0].value,o=e[1].value,u="@"+o
;r.hasOwnProperty(u)||(r[u]=n.getData(a).indataRef(n,o))
})),eC("data",EA,SA),eC("treePath",(function(t,e,n){
var r=OA(t,this),i=r[e],a=r[n];return i&&a?i.path(a).map(CA):void 0
}),SA),eC("treeAncestors",(function(t,e){var n=OA(t,this)[e]
;return n?n.ancestors().map(CA):void 0
}),SA),eC("vlSelectionTest",(function(t,e,n){
for(var r,i,a,o,u,f=this.context.data[t],s=f?f.values.value:[],c=f?f[RA]&&f[RA].value:void 0,l=n===NA,h=s.length,d=0;d<h;++d)if(r=s[d],
c&&l){if(-1===(a=(i=i||{})[o=r.unit]||0))continue
;if(u=TA(e,r),i[o]=u?-1:++a,u&&1===c.size)return!0
;if(!u&&a===c.get(o).count)return!1}else if(l^(u=TA(e,r)))return u;return h&&l
}),PA),eC("vlSelectionResolve",(function(t,e){
for(var n,r,i,a,o,u,f,s,c,l,h,d=this.context.data[t],p=d?d.values.value:[],g={},v={},m=p.length,y=0;y<m;++y)for(a=(n=p[y]).unit,
r=n.fields,
i=n.values,l=0,h=r.length;l<h;++l)o=r[l],f=(u=g[o.field]||(g[o.field]={}))[a]||(u[a]=[]),
v[o.field]=s=o.type.charAt(0),c=LA[s+"_union"],u[a]=c(f,R(i[l]))
;return e=e||"union",Object.keys(g).forEach((function(t){
g[t]=Object.keys(g[t]).map((function(e){return g[t][e]})).reduce((function(n,r){
return void 0===n?r:LA[v[t]+"_"+e](n,r)}))})),g
}),PA),eC("vlSingle",WA,SA),eC("vlSingleDomain",GA,SA),
eC("vlMulti",WA,YA),eC("vlMultiDomain",GA,YA),eC("vlInterval",(function(t,e,n){
return BA.call(this,t,e,n,$A)}),SA),eC("vlIntervalDomain",(function(t,e,n,r){
var i,a,o,u,f,s=this.context.data[t],c=s?s.values.value:[],l=c[0],h=0;if(l){
for(i=l.intervals.length;h<i;++h)if(a=l.intervals[h],
e&&a.encoding===e||n&&a.field===n){if(!a.extent)return;o=h,f=a.extent.length>2
;break}return u=c.reduce((function(t,e){
var n=e.intervals[o].extent,r=f?n.map((function(t){return{unit:e.unit,value:t}
})):{unit:e.unit,value:n};return f?t.push.apply(t,r):t.push(r),t
}),[]),f?HA(u,r):VA(u,r)}}),SA);var nC={blacklist:["_"],
whitelist:["datum","event","item"],fieldvar:"datum",globalvar:function(t){
return"_["+s("$"+t)+"]"},functions:function(t){var e=uA(t)
;for(var n in QA.forEach((function(t){e[t]="event.vega."+t})),ZA)e[n]=KA+n
;return e},constants:oA,visitors:tC},rC=function(t){
var e=(t=t||{}).whitelist?et(t.whitelist):{},n=t.blacklist?et(t.blacklist):{},r=t.constants||oA,a=(t.functions||uA)(d),o=t.globalvar,u=t.fieldvar,s={},c={},l=0,h=T(o)?o:function(t){
return o+'["'+t+'"]'};function d(t){if(f(t))return t;var e=p[t.type]
;return null==e&&i("Unsupported type: "+t.type),e(t)}var p={Literal:function(t){
return t.raw},Identifier:function(t){var a=t.name
;return l>0?a:n.hasOwnProperty(a)?i("Illegal identifier: "+a):r.hasOwnProperty(a)?r[a]:e.hasOwnProperty(a)?a:(s[a]=1,
h(a))},MemberExpression:function(t){var e=!t.computed,n=d(t.object);e&&(l+=1)
;var r=d(t.property);return n===u&&(c[r]=1),e&&(l-=1),n+(e?"."+r:"["+r+"]")},
CallExpression:function(t){
"Identifier"!==t.callee.type&&i("Illegal callee type: "+t.callee.type)
;var e=t.callee.name,n=t.arguments,r=a.hasOwnProperty(e)&&a[e]
;return r||i("Unrecognized function: "+e),T(r)?r(n):r+"("+n.map(d).join(",")+")"
},ArrayExpression:function(t){return"["+t.elements.map(d).join(",")+"]"},
BinaryExpression:function(t){return"("+d(t.left)+t.operator+d(t.right)+")"},
UnaryExpression:function(t){return"("+t.operator+d(t.argument)+")"},
ConditionalExpression:function(t){
return"("+d(t.test)+"?"+d(t.consequent)+":"+d(t.alternate)+")"},
LogicalExpression:function(t){return"("+d(t.left)+t.operator+d(t.right)+")"},
ObjectExpression:function(t){return"{"+t.properties.map(d).join(",")+"}"},
Property:function(t){l+=1;var e=d(t.key);return l-=1,e+":"+d(t.value)}}
;function g(t){var e={code:d(t),globals:Object.keys(s),fields:Object.keys(c)}
;return s={},c={},e}return g.functions=a,g.constants=r,g}(nC)
;function iC(t,e,n){var r,a,o={};try{r=function(t){
KE=0,tS=(QE=t).length,eS=null,TS();var e=aA()
;if(2!==eS.type)throw new Error("Unexpect token after expression.");return e
}(t=f(t)?t:s(t)+"")}catch(u){i("Expression parse error: "+t)}
return r.visit((function(t){if("CallExpression"===t.type){
var n=t.callee.name,r=nC.visitors[n];r&&r(n,t.arguments,e,o)}
})),(a=rC(r)).globals.forEach((function(t){var n="$"+t
;!o.hasOwnProperty(n)&&e.getSignal(t)&&(o[n]=e.signalRef(t))})),{
$expr:n?n+"return("+a.code+");":a.code,$fields:a.fields,$params:o}}
function aC(t,e,n,r){
this.id=-1,this.type=t,this.value=e,this.params=n,r&&(this.parent=r)}
function oC(t,e,n,r){return new aC(t,e,n,r)}function uC(t,e){
return oC("operator",t,e)}function fC(t){var e={$ref:t.id}
;return t.id<0&&(t.refs=t.refs||[]).push(e),e}var sC={$tupleid:1,
toString:function(){return":_tupleid_:"}};function cC(t,e){return e?{$field:t,
$name:e}:{$field:t}}var lC=cC("key");function hC(t,e){return{$compare:t,$order:e
}}function dC(t,e){
return(t&&t.signal?"$"+t.signal:t||"")+(t&&e?"_":"")+(e&&e.signal?"$"+e.signal:e||"")
}var pC="scope",gC="view";function vC(t){return t&&t.signal}function mC(t){
if(vC(t))return!0;if(u(t))for(var e in t)if(mC(t[e]))return!0;return!1}
function yC(t,e){return null!=t?t:e}function bC(t){return t&&t.signal||t}
var _C="timer";function xC(t,e){
return(t.merge?wC:t.stream?MC:t.type?kC:i("Invalid stream specification: "+s(t)))(t,e)
}function wC(t,e){var n=EC({merge:t.merge.map((function(t){return xC(t,e)}))
},t,e);return e.addStream(n).id}function MC(t,e){var n=EC({stream:xC(t.stream,e)
},t,e);return e.addStream(n).id}function kC(t,e){var n,r
;return t.type===_C?(n=e.event(_C,t.throttle),t={between:t.between,
filter:t.filter}):n=e.event(function(t){return t===pC?gC:t||gC
}(t.source),t.type),r=EC({stream:n
},t,e),1===Object.keys(r).length?n:e.addStream(r).id}function EC(t,e,n){
var r=e.between
;return r&&(2!==r.length&&i('Stream "between" parameter must have 2 entries: '+s(e)),
t.between=[xC(r[0],n),xC(r[1],n)]),
r=e.filter?R(e.filter):[],(e.marktype||e.markname||e.markrole)&&r.push(function(t,e,n){
var r="event.item"
;return r+(t&&"*"!==t?"&&"+r+".mark.marktype==='"+t+"'":"")+(n?"&&"+r+".mark.role==='"+n+"'":"")+(e?"&&"+r+".mark.name==='"+e+"'":"")
}(e.marktype,e.markname,e.markrole)),
e.source===pC&&r.push("inScope(event.item)"),
r.length&&(t.filter=iC("("+r.join(")&&(")+")").$expr),
null!=(r=e.throttle)&&(t.throttle=+r),
null!=(r=e.debounce)&&(t.debounce=+r),e.consume&&(t.consume=!0),t}
var SC,AC,CC="view",OC="[",zC="]",DC=/[[\]{}]/,NC={"*":1,arc:1,area:1,group:1,
image:1,line:1,path:1,rect:1,rule:1,shape:1,symbol:1,text:1,trail:1}
;function RC(t,e,n,r,i){for(var a,o=0,u=t.length;e<u;++e){
if(a=t[e],!o&&a===n)return e;i&&i.indexOf(a)>=0?--o:r&&r.indexOf(a)>=0&&++o}
return e}function TC(t){
for(var e=[],n=0,r=t.length,i=0;i<r;)i=RC(t,i,",","[{","]}"),
e.push(t.substring(n,i).trim()),n=++i
;if(0===e.length)throw"Empty event selector: "+t;return e}function PC(t){
return"["===t[0]?function(t){var e,n,r=t.length,i=1
;if((i=RC(t,i,zC,OC,zC))===r)throw"Empty between selector: "+t
;if(2!==(e=TC(t.substring(1,i))).length)throw"Between selector must have two elements: "+t
;if(">"!==(t=t.slice(i+1).trim())[0])throw"Expected '>' after between selector: "+t
;if(e=e.map(PC),(n=PC(t.slice(1).trim())).between)return{between:e,stream:n}
;n.between=e;return n}(t):function(t){var e,n,r={source:SC
},i=[],a=[0,0],o=0,u=0,f=t.length,s=0;if("}"===t[f-1]){
if(!((s=t.lastIndexOf("{"))>=0))throw"Unmatched right brace: "+t;try{
a=function(t){var e=t.split(",");if(!t.length||e.length>2)throw t
;return e.map((function(e){var n=+e;if(n!=n)throw t;return n}))
}(t.substring(s+1,f-1))}catch(c){throw"Invalid throttle specification: "+t}
f=(t=t.slice(0,s).trim()).length,s=0}if(!f)throw t;"@"===t[0]&&(o=++s)
;(e=RC(t,s,":"))<f&&(i.push(t.substring(u,e).trim()),u=s=++e)
;if((s=RC(t,s,OC))===f)i.push(t.substring(u,f).trim());else if(i.push(t.substring(u,s).trim()),
n=[],(u=++s)===f)throw"Unmatched left bracket: "+t;for(;s<f;){
if((s=RC(t,s,zC))===f)throw"Unmatched left bracket: "+t
;if(n.push(t.substring(u,s).trim()),
s<f-1&&t[++s]!==OC)throw"Expected left bracket: "+t;u=++s}
if(!(f=i.length)||DC.test(i[f-1]))throw"Invalid event selector: "+t
;f>1?(r.type=i[1],o?r.markname=i[0].slice(1):!function(t){
return AC.hasOwnProperty(t)}(i[0])?r.source=i[0]:r.marktype=i[0]):r.type=i[0]
;"!"===r.type.slice(-1)&&(r.consume=!0,r.type=r.type.slice(0,-1))
;null!=n&&(r.filter=n);a[0]&&(r.throttle=a[0]);a[1]&&(r.debounce=a[1]);return r
}(t)}var LC="var datum=event.item&&event.item.datum;";function qC(t,e,n){
var r,a,o=t.events,u=t.update,c=t.encode,l=[]
;o||i("Signal update missing events specification."),f(o)&&(o=function(t,e,n){
return SC=e||CC,AC=n||NC,TC(t.trim()).map(PC)
}(o,e.isSubscope()?pC:gC)),(o=R(o).filter((function(t){
return t.signal||t.scale?(l.push(t),0):1}))).length&&l.push(o.length>1?{merge:o
}:o[0]),
null!=c&&(u&&i("Signal encode and update are mutually exclusive."),u="encode(item(),"+s(c)+")"),
r=f(u)?iC(u,e,LC):null!=u.expr?iC(u.expr,e,LC):null!=u.value?u.value:null!=u.signal?{
$expr:"_.value",$params:{value:e.signalRef(u.signal)}
}:i("Invalid signal update specification."),a={target:n,update:r
},t.force&&(a.options={force:!0}),l.forEach((function(t){
e.addUpdate(U(function(t,e){return{
source:t.signal?e.signalRef(t.signal):t.scale?e.scaleRef(t.scale):xC(t,e)}
}(t,e),a))}))}function UC(t){return function(e,n,r){return oC(t,n,e||void 0,r)}}
var FC=UC("aggregate"),jC=UC("axisticks"),IC=UC("bound"),$C=UC("collect"),BC=UC("compare"),WC=UC("datajoin"),YC=UC("encode"),GC=UC("expression"),HC=UC("facet"),VC=UC("field"),XC=UC("key"),JC=UC("legendentries"),ZC=UC("load"),QC=UC("mark"),KC=UC("multiextent"),tO=UC("multivalues"),eO=UC("overlap"),nO=UC("params"),rO=UC("prefacet"),iO=UC("projection"),aO=UC("proxy"),oO=UC("relay"),uO=UC("render"),fO=UC("scale"),sO=UC("sieve"),cO=UC("sortitems"),lO=UC("viewlayout"),hO=UC("values"),dO=0,pO=["identity","ordinal","band","point","bin-linear","bin-ordinal","quantize","quantile","threshold","linear","pow","sqrt","log","sequential","time","utc"],gO=et(pO),vO=et(pO.slice(4,9)),mO=et(pO.slice(9)),yO=et(pO.slice(1,6))
;function bO(t){return yO.hasOwnProperty(t)}function _O(t){
return vO.hasOwnProperty(t)}function xO(t){return"quantile"===t}
function wO(t,e){var n,r=e.getScale(t.name).params
;for(n in r.domain=EO(t.domain,t,e),null!=t.range&&(r.range=function t(e,n,r){
var a=e.range,u=n.config.range;if(a.signal)return n.signalRef(a.signal)
;if(f(a)){if(u&&u.hasOwnProperty(a))return t(e=U({},e,{range:u[a]}),n,r)
;"width"===a?a=[0,{signal:"width"}]:"height"===a?a=bO(e.type)?[0,{
signal:"height"}]:[{signal:"height"
},0]:i("Unrecognized scale range value: "+s(a))}else{
if(a.scheme)return r.scheme=MO(a.scheme,n),
a.extent&&(r.schemeExtent=function(t,e){
return t.signal?e.signalRef(t.signal):t.map((function(t){return MO(t,e)}))
}(a.extent,n)),void(a.count&&(r.schemeCount=MO(a.count,n)))
;if(a.step)return void(r.rangeStep=MO(a.step,n))
;if(bO(e.type)&&!o(a))return EO(a,e,n);o(a)||i("Unsupported range type: "+s(a))}
return a.map((function(t){return MO(t,n)}))
}(t,e,r)),null!=t.interpolate&&function(t,e){
e.interpolate=MO(t.type||t),null!=t.gamma&&(e.interpolateGamma=MO(t.gamma))
}(t.interpolate,r),null!=t.nice&&function(t,e){e.nice=u(t)?{
interval:MO(t.interval),step:MO(t.step)}:MO(t)
}(t.nice,r),t)r.hasOwnProperty(n)||"name"===n||(r[n]=MO(t[n],e))}
function MO(t,e){
return u(t)?t.signal?e.signalRef(t.signal):i("Unsupported object: "+s(t)):t}
function kO(t){i("Can not find data set: "+s(t))}function EO(t,e,n){
if(t)return t.signal?n.signalRef(t.signal):(o(t)?SO:t.fields?CO:AO)(t,e,n)
;null==e.domainMin&&null==e.domainMax||i("No scale domain defined for domainMin/domainMax to override.")
}function SO(t,e,n){return t.map((function(t){return MO(t,n)}))}
function AO(t,e,n){var r=n.getData(t.data)
;return r||kO(t.data),bO(e.type)?r.valuesRef(n,t.field,zO(t.sort,!1)):xO(e.type)?r.domainRef(n,t.field):r.extentRef(n,t.field)
}function CO(t,e,n){var r=t.data,i=t.fields.reduce((function(t,e){
return e=f(e)?{data:r,field:e}:o(e)||e.signal?function(t,e){
var n="_:vega:_"+dO++,r=$C({});if(o(t))r.value={$ingest:t};else if(t.signal){
var i="setdata("+s(n)+","+t.signal+")";r.params.input=e.signalRef(i)}
return e.addDataPipeline(n,[r,sO({})]),{data:n,field:"data"}}(e,n):e,t.push(e),t
}),[]);return(bO(e.type)?OO:xO(e.type)?DO:NO)(t,n,i)}function OO(t,e,n){
var r,i,a,o;return r=n.map((function(t){var n=e.getData(t.data)
;return n||kO(t.data),n.countsRef(e,t.field)})),i=e.add(FC({groupby:lC,
ops:["sum"],fields:[e.fieldRef("count")],as:["count"],pulse:r})),a=e.add($C({
pulse:fC(i)})),o=e.add(hO({field:lC,sort:e.sortRef(zO(t.sort,!0)),pulse:fC(a)
})),fC(o)}function zO(t,e){
return t&&(t.field||t.op?t.field||"count"===t.op?e&&t.field?i("Multiple domain scales can not sort by field."):e&&t.op&&"count"!==t.op&&i("Multiple domain scales support op count only."):i("No field provided for sort aggregate op: "+t.op):u(t)?t.field="key":t={
field:"key"}),t}function DO(t,e,n){var r=n.map((function(t){
var n=e.getData(t.data);return n||kO(t.data),n.domainRef(e,t.field)}))
;return fC(e.add(tO({values:r})))}function NO(t,e,n){var r=n.map((function(t){
var n=e.getData(t.data);return n||kO(t.data),n.extentRef(e,t.field)}))
;return fC(e.add(KC({extents:r})))}function RO(t,e,n){
return o(t)?t.map((function(t){return RO(t,e,n)
})):u(t)?t.signal?n.signalRef(t.signal):"fit"===e?t:i("Unsupported parameter object: "+s(t)):t
}
var TO="top",PO="left",LO="right",qO="bottom",UO="index",FO="label",jO="perc",IO="size",$O="value",BO="guide-label",WO="guide-title",YO="group-title",GO="symbol",HO="gradient",VO="discrete",XO=["size","shape","fill","stroke","strokeDash","opacity"],JO={
name:1,interactive:1},ZO=et(["rule"]),QO=et(["group","image","rect"])
;function KO(t,e,n,r){var i=iC(t,e);return i.$fields.forEach((function(t){r[t]=1
})),U(n,i.$params),i.$expr}function tz(t,e,n,r){return function t(e,n,r,o){
var u,c,l;if(e.signal)u="datum",l=KO(e.signal,n,r,o);else if(e.group||e.parent){
for(c=Math.max(1,e.level||1),u="item";c-- >0;)u+=".mark.group"
;e.parent?(l=e.parent,u+=".datum"):l=e.group
}else e.datum?(u="datum",l=e.datum):i("Invalid field reference: "+s(e))
;e.signal||(f(l)?(o[l]=1,l=a(l).map(s).join("][")):l=t(l,n,r,o))
;return u+"["+l+"]"}(u(t)?t:{datum:t},e,n,r)}function ez(t,e,n,r,i){
var a,o,u,s=nz(t.scale,n,r,i)
;return null!=t.range?(o=s+".range()",e=0===(a=+t.range)?o+"[0]":"($="+o+","+(1===a?"$[$.length-1]":"$[0]+"+a+"*($[$.length-1]-$[0])")+")"):(void 0!==e&&(e=s+"("+e+")"),
t.band&&(u=function(t,e){if(!f(t))return-1;var n=e.scaleType(t)
;return"band"===n||"point"===n?1:0
}(t.scale,n))&&(a=(o=s+".bandwidth")+"()"+(1===(a=+t.band)?"":"*"+a),
u<0&&(a="("+o+"?"+a+":0)"),
e=(e?e+"+":"")+a,t.extra&&(e="(datum.extra?"+s+"(datum.extra.value):"+e+")")),
null==e&&(e="0")),e}function nz(t,e,n,r){var i
;if(f(t))i=mA+t,n.hasOwnProperty(i)||(n[i]=e.scaleRef(t)),i=s(i);else{
for(i in e.scales)n[mA+i]=e.scaleRef(i)
;i=s(mA)+"+"+(t.signal?"("+KO(t.signal,e,n,r)+")":tz(t,e,n,r))}return"_["+i+"]"}
function rz(t,e,n,r){return u(t)?"("+iz(null,t,e,n,r)+")":t}
function iz(t,e,n,r,i){if(null!=e.gradient)return function(t,e,n,r){
return"this.gradient("+nz(t.gradient,e,n,r)+","+s(t.start)+","+s(t.stop)+","+s(t.count)+")"
}(e,n,r,i);var a=e.signal?KO(e.signal,n,r,i):e.color?function(t,e,n,r){
function i(t,i,a,o){
return"this."+t+"("+[iz(null,i,e,n,r),iz(null,a,e,n,r),iz(null,o,e,n,r)].join(",")+").toString()"
}
return t.c?i("hcl",t.h,t.c,t.l):t.h||t.s?i("hsl",t.h,t.s,t.l):t.l||t.a?i("lab",t.l,t.a,t.b):t.r||t.g||t.b?i("rgb",t.r,t.g,t.b):null
}(e.color,n,r,i):null!=e.field?tz(e.field,n,r,i):void 0!==e.value?s(e.value):void 0
;return null!=e.scale&&(a=ez(e,a,n,r,i)),
void 0===a&&(a=null),null!=e.exponent&&(a="Math.pow("+a+","+rz(e.exponent,n,r,i)+")"),
null!=e.mult&&(a+="*"+rz(e.mult,n,r,i)),
null!=e.offset&&(a+="+"+rz(e.offset,n,r,i)),e.round&&(a="Math.round("+a+")"),a}
function az(t,e,n){return t+"["+s(e)+"]="+n+";"}function oz(t,e,n,r,i){var a=""
;return e.forEach((function(t){var e=iz(0,t,n,r,i)
;a+=t.test?KO(t.test,n,r,i)+"?"+e+":":e})),":"===_(a)&&(a+="null"),az("o",t,a)}
function uz(t,e,n,r){var i,a,u={},f="var o=item,datum=o.datum,$;"
;for(i in t)a=t[i],o(a)?f+=oz(i,a,r,n,u):f+=az("o",i,iz(0,a,r,n,u))
;return f+=function(t,e){var n=""
;return ZO[e]||(t.x2&&(t.x?(QO[e]&&(n+="if(o.x>o.x2)$=o.x,o.x=o.x2,o.x2=$;"),
n+="o.width=o.x2-o.x;"):n+="o.x=o.x2-(o.width||0);"),
t.xc&&(n+="o.x=o.xc-(o.width||0)/2;"),
t.y2&&(t.y?(QO[e]&&(n+="if(o.y>o.y2)$=o.y,o.y=o.y2,o.y2=$;"),
n+="o.height=o.y2-o.y;"):n+="o.y=o.y2-(o.height||0);"),
t.yc&&(n+="o.y=o.yc-(o.height||0)/2;")),n}(t,e),{$expr:f+="return 1;",
$fields:Object.keys(u),$output:Object.keys(t)}}
var fz="mark",sz="frame",cz="scope",lz="legend-label",hz="title";function dz(t){
return u(t)?U({},t):{value:t}}function pz(t,e,n,r){
return null!=n?(u(n)&&!o(n)?t.update[e]=n:t[r||"enter"][e]={value:n},1):0}
function gz(t,e,n){
for(var r in e)n&&n.hasOwnProperty(r)||(t[r]=U(t[r]||{},e[r]));return t}
function vz(t,e,n,r,i,a){var o,u;for(u in(a=a||{}).encoders={$encode:o={}
},t=function(t,e,n,r,i){var a,o,u={}
;"legend"!=n&&0!==String(n).indexOf("axis")||(n=null)
;for(a in o=n===sz?i.group:n===fz?U({},i.mark,i[e]):null)yz(a,t)||("fill"===a||"stroke"===a)&&(yz("fill",t)||yz("stroke",t))||(u[a]=mz(o[a]))
;return R(r).forEach((function(e){var n=i.style&&i.style[e]
;for(var r in n)yz(r,t)||(u[r]=mz(n[r]))})),(t=U({},t)).enter=U(u,t.enter),t
}(t,e,n,r,i.config))o[u]=uz(t[u],e,a,i);return a}function mz(t){
return t&&t.signal?{signal:t.signal}:{value:t}}function yz(t,e){
return e&&(e.enter&&e.enter[t]||e.update&&e.update[t])}
function bz(t,e,n,r,i,a,o){return{type:t,name:o?o.name:void 0,role:e,
style:o&&o.style||n,key:r,from:i,interactive:!(!o||!o.interactive),
encode:gz(a,o,JO)}}function _z(t,e,n){return yC(e[t],n[t])}function xz(t,e){
return"vertical"===yC(t.direction,e)}function wz(t,e){
return yC(t.gradientLength,e.gradientLength||e.gradientWidth)}function Mz(t,e){
return yC(t.gradientThickness,e.gradientThickness||e.gradientHeight)}
function kz(t,e){return yC(t.columns,yC(e.columns,+xz(t,e.symbolDirection)))}
function Ez(t,e){var n=e&&(e.update&&e.update[t]||e.enter&&e.enter[t])
;return n&&n.signal?n:n?n.value:null}
var Sz="group",Az="rect",Cz="rule",Oz="text";function zz(t,e,n,r){
var i,a,o,u,f,s,c={value:0},l=xz(t,n.gradientDirection),h=Mz(t,n),d=wz(t,n)
;return l?(o=[0,1],u=[0,0],f=h,s=d):(o=[0,0],u=[1,0],f=d,s=h),pz(i={enter:a={
opacity:c,x:c,y:c,width:dz(f),height:dz(s)},update:U({},a,{opacity:{value:1},
fill:{gradient:e,start:o,stop:u}}),exit:{opacity:c}
},"stroke",_z("gradientStrokeColor",t,n)),
pz(i,"strokeWidth",_z("gradientStrokeWidth",t,n)),
pz(i,"opacity",_z("gradientOpacity",t,n),"update"),
bz(Az,"legend-gradient",null,void 0,void 0,i,r)}function Dz(t,e,n,r,i){
var a,o,u,f,s,c,l={value:0},h=xz(t,n.gradientDirection),d=Mz(t,n),p=wz(t,n),g=""
;return h?(u="y",s="y2",f="x",c="width",g="1-"):(u="x",s="x2",f="y",c="height"),
(o={opacity:l,fill:{scale:e,field:$O}})[u]={signal:g+"datum."+jO,mult:p},o[f]=l,
o[s]={signal:g+"datum.perc2",mult:p},o[c]=dz(d),pz(a={enter:o,update:U({},o,{
opacity:{value:1}}),exit:{opacity:l}
},"stroke",_z("gradientStrokeColor",t,n)),pz(a,"strokeWidth",_z("gradientStrokeWidth",t,n)),
pz(a,"opacity",_z("gradientOpacity",t,n),"update"),
bz(Az,"legend-band",null,$O,i,a,r)}function Nz(t,e,n,r){var i,a,o,u,f,s={value:0
},c=xz(t,e.gradientDirection),l=dz(Mz(t,e)),h=wz(t,e),d=_z("labelOverlap",t,e),p=""
;return pz(i={enter:a={opacity:s},update:o={opacity:{value:1},text:{field:FO}},
exit:{opacity:s}},"fill",_z("labelColor",t,e)),pz(i,"font",_z("labelFont",t,e)),
pz(i,"fontSize",_z("labelFontSize",t,e)),
pz(i,"fontWeight",_z("labelFontWeight",t,e)),
pz(i,"fillOpacity",_z("labelOpacity",t,e)),
pz(i,"limit",yC(t.labelLimit,e.gradientLabelLimit)),c?(a.align={value:"left"
},a.baseline=o.baseline={
signal:'datum.perc<=0?"bottom":datum.perc>=1?"top":"middle"'
},u="y",f="x",p="1-"):(a.align=o.align={
signal:'datum.perc<=0?"left":datum.perc>=1?"right":"center"'},a.baseline={
value:"top"},u="x",f="y"),a[u]=o[u]={signal:p+"datum."+jO,mult:h
},a[f]=o[f]=l,l.offset=yC(t.labelOffset,e.gradientLabelOffset)||0,
t=bz(Oz,lz,BO,$O,r,i,n),d&&(t.overlap={method:d,order:"datum.index"}),t}
function Rz(t,e,n,r,i,a,o,u){return{type:Sz,name:n,role:t,style:e,from:r,
interactive:i||!1,encode:a,marks:o,layout:u}}var Tz={value:0}
;function Pz(t,e,n,r,i){
var a,o,u,f,s,c,l,h=n.entries,d=!(!h||!h.interactive),p=h?h.name:void 0,g=_z("clipHeight",t,e),v=_z("symbolOffset",t,e),m={
data:"value"},y={},b=i+"?datum.offset:datum."+IO,_=g?dz(g):{field:IO
},x="datum.index",w="max(1,"+i+")";return _.mult=.5,y={enter:a={opacity:Tz,x:{
signal:b,mult:.5,offset:v},y:_},update:o={opacity:{value:1},x:a.x,y:a.y},exit:{
opacity:Tz}
},t.fill||(pz(y,"fill",e.symbolBaseFillColor),pz(y,"stroke",e.symbolBaseStrokeColor)),
pz(y,"shape",_z("symbolType",t,e)),
pz(y,"size",_z("symbolSize",t,e)),pz(y,"strokeWidth",_z("symbolStrokeWidth",t,e)),
pz(y,"fill",_z("symbolFillColor",t,e)),
pz(y,"stroke",_z("symbolStrokeColor",t,e)),
pz(y,"opacity",_z("symbolOpacity",t,e),"update"),XO.forEach((function(e){
t[e]&&(o[e]=a[e]={scale:t[e],field:$O})
})),f=bz("symbol","legend-symbol",null,$O,m,y,n.symbols),
g&&(f.clip=!0),(u=dz(v)).offset=_z("labelOffset",t,e),pz(y={enter:a={opacity:Tz,
x:{signal:b,offset:u},y:_},update:o={opacity:{value:1},text:{field:FO},x:a.x,
y:a.y},exit:{opacity:Tz}
},"align",_z("labelAlign",t,e)),pz(y,"baseline",_z("labelBaseline",t,e)),
pz(y,"fill",_z("labelColor",t,e)),
pz(y,"font",_z("labelFont",t,e)),pz(y,"fontSize",_z("labelFontSize",t,e)),
pz(y,"fontWeight",_z("labelFontWeight",t,e)),pz(y,"limit",_z("labelLimit",t,e)),
pz(y,"fillOpacity",_z("labelOpacity",t,e)),s=bz(Oz,lz,BO,$O,m,y,n.labels),y={
enter:{noBound:{value:!0},width:Tz,height:g?dz(g):Tz,opacity:Tz},exit:{
opacity:Tz},update:o={opacity:{value:1},row:{signal:null},column:{signal:null}}
},
xz(t,e.symbolDirection)?(c="ceil(item.mark.items.length/"+w+")",o.row.signal=x+"%"+c,
o.column.signal="floor("+x+"/"+c+")",l={field:["row",x]
}):(o.row.signal="floor("+x+"/"+w+")",o.column.signal=x+"%"+w,l={field:x
}),o.column.signal=i+"?"+o.column.signal+":"+x,(t=Rz(cz,null,p,r={facet:{data:r,
name:"value",groupby:UO}},d,gz(y,h,JO),[f,s])).sort=l,t}function Lz(t,e){var n
;return u(t)&&(t.signal?n=t.signal:t.path?n="pathShape("+qz(t.path)+")":t.sphere&&(n="geoShape("+qz(t.sphere)+', {type: "Sphere"})')),
n?e.signalRef(n):!!t}function qz(t){return u(t)&&t.signal?t.signal:s(t)}
function Uz(t){var e=t.role||""
;return e.indexOf("axis")&&e.indexOf("legend")?t.type===Sz?cz:e||fz:e}
function Fz(t){return{marktype:t.type,name:t.name||void 0,role:t.role||Uz(t),
zindex:+t.zindex||void 0}}function jz(t,e){
return t&&t.signal?e.signalRef(t.signal):!1!==t}function Iz(t,e){
var n=Sr(t.type);n||i("Unrecognized transform type: "+s(t.type))
;var r=oC(n.type.toLowerCase(),null,$z(n,t,e))
;return t.signal&&e.addSignal(t.signal,e.proxy(r)),r.metadata=n.metadata||{},r}
function $z(t,e,n){var r,i,a,o={}
;for(i=0,a=t.params.length;i<a;++i)o[(r=t.params[i]).name]=Bz(r,e,n);return o}
function Bz(t,e,n){var r=t.type,a=e[t.name];return"index"===r?function(t,e,n){
f(e.from)||i('Lookup "from" parameter must be a string literal.')
;return n.getData(e.from).lookupRef(n,e.key)
}(0,e,n):void 0!==a?"param"===r?function(t,e,n){var r=e[t.name]
;return t.array?(o(r)||i("Expected an array of sub-parameters. Instead: "+s(r)),
r.map((function(e){return Yz(t,e,n)}))):Yz(t,r,n)
}(t,e,n):"projection"===r?n.projectionRef(e[t.name]):t.array&&!vC(a)?a.map((function(e){
return Wz(t,e,n)
})):Wz(t,a,n):void(t.required&&i("Missing required "+s(e.type)+" parameter: "+s(t.name)))
}function Wz(t,e,n){var r=t.type
;if(vC(e))return Gz(r)?i("Expression references can not be signals."):Hz(r)?n.fieldRef(e):Vz(r)?n.compareRef(e):n.signalRef(e.signal)
;var a=t.expr||Hz(r);return a&&function(t){return t&&t.expr
}(e)?n.exprRef(e.expr,e.as):a&&function(t){return t&&t.field
}(e)?cC(e.field,e.as):Gz(r)?iC(e,n):function(t){return"data"===t
}(r)?fC(n.getData(e).values):Hz(r)?cC(e):Vz(r)?n.compareRef(e):e}
function Yz(t,e,n){var r,a,o,u,f;for(u=0,f=t.params.length;u<f;++u){
for(o in(a=t.params[u]).key)if(a.key[o]!==e[o]){a=null;break}if(a)break}
return a||i("Unsupported parameter: "+s(e)),
r=U($z(a,e,n),a.key),fC(n.add(nO(r)))}function Gz(t){return"expr"===t}
function Hz(t){return"field"===t}function Vz(t){return"compare"===t}
function Xz(t,e){
return t.$ref?t:t.data&&t.data.$ref?t.data:fC(e.getData(t.data).output)}
function Jz(t,e,n,r,i){
this.scope=t,this.input=e,this.output=n,this.values=r,this.aggregate=i,
this.index={}}Jz.fromEntries=function(t,e){
var n=e.length,r=1,i=e[0],a=e[n-1],o=e[n-2],u=null
;for(t.add(e[0]);r<n;++r)e[r].params.pulse=fC(e[r-1]),
t.add(e[r]),"aggregate"===e[r].type&&(u=e[r]);return new Jz(t,i,o,a,u)}
;var Zz=Jz.prototype;function Qz(t){return f(t)?t:null}function Kz(t,e,n){
var r,i=dC(n.op,n.field);if(e.ops){
for(var a=0,o=e.as.length;a<o;++a)if(e.as[a]===i)return
}else e.ops=["count"],e.fields=[null],e.as=["count"]
;n.op&&(e.ops.push((r=n.op.signal)?t.signalRef(r):n.op),
e.fields.push(t.fieldRef(n.field)),e.as.push(i))}function tD(t,e,n,r,i,a,o){
var f,s,c=e[n]||(e[n]={}),l=function(t){
return u(t)?("descending"===t.order?"-":"+")+dC(t.op,t.field):""}(a),h=Qz(i)
;if(null!=h&&(t=e.scope,f=c[h+=l?"|"+l:""]),!f){var d=a?{field:lC,
pulse:e.countsRef(t,i,a)}:{field:t.fieldRef(i),pulse:fC(e.output)}
;l&&(d.sort=t.sortRef(a)),
s=t.add(oC(r,void 0,d)),o&&(e.index[i]=s),f=fC(s),null!=h&&(c[h]=f)}return f}
function eD(t,e,n){
var r,i=t.remove,a=t.insert,o=t.toggle,u=t.modify,f=t.values,s=e.add(uC())
;r=iC("if("+t.trigger+',modify("'+n+'",'+[a,i,o,u,f].map((function(t){
return null==t?"null":t
})).join(",")+"),0)",e),s.update=r.$expr,s.params=r.$params}function nD(t,e){
var n,r,a,o,u,f,c,l,h,d,p,g,v,m=Uz(t),y=t.type===Sz,b=t.from&&t.from.facet,_=t.layout||m===cz||m===sz,x=m===fz||_||b,w=t.overlap
;a=function(t,e,n){var r,a,o,u,f
;return t?(r=t.facet)&&(e||i("Only group marks can be faceted."),
null!=r.field?u=f=Xz(r,n):(t.data?f=fC(n.getData(t.data).aggregate):((o=Iz(U({
type:"aggregate",groupby:R(r.groupby)
},r.aggregate),n)).params.key=n.keyRef(r.groupby),
o.params.pulse=Xz(r,n),u=f=fC(n.add(o))),
a=n.keyRef(r.groupby,!0))):u=fC(n.add($C(null,[{}]))),u||(u=Xz(t,n)),{key:a,
pulse:u,parent:f}}(t.from,y,e),h=fC(r=e.add(WC({
key:a.key||(t.key?cC(t.key):void 0),pulse:a.pulse,clean:!y}))),r=o=e.add($C({
pulse:h})),r=e.add(QC({markdef:Fz(t),interactive:jz(t.interactive,e),
clip:Lz(t.clip,e),context:{$context:!0},groups:e.lookup(),
parent:e.signals.parent?e.signalRef("parent"):null,index:e.markpath(),
pulse:fC(r)})),d=fC(r),(r=e.add(YC(vz(t.encode,t.type,m,t.style,e,{pulse:d
})))).params.parent=e.encode(),t.transform&&t.transform.forEach((function(t){
var n=Iz(t,e)
;(n.metadata.generates||n.metadata.changes)&&i("Mark transforms should not generate new data."),
n.params.pulse=fC(r),e.add(r=n)})),t.sort&&(r=e.add(cO({
sort:e.compareRef(t.sort,!0),pulse:fC(r)}))),p=fC(r),(b||_)&&(g=fC(_=e.add(lO({
layout:e.objectProperty(t.layout),legendMargin:e.config.legendMargin,mark:d,
pulse:p})))),v=fC(u=e.add(IC({mark:d,pulse:g||p
}))),y&&(x&&((n=e.operators).pop(),
_&&n.pop()),e.pushState(p,g||v,h),b?function(t,e,n){
var r,a,o,u,f=t.from.facet,c=f.name,l=Xz(f,e)
;f.name||i("Facet must have a name: "+s(f)),
f.data||i("Facet must reference a data set: "+s(f)),f.field?u=e.add(rO({
field:e.fieldRef(f.field),pulse:l})):f.groupby?u=e.add(HC({
key:e.keyRef(f.groupby),group:fC(e.proxy(n.parent)),pulse:l
})):i("Facet must specify groupby or field: "+s(f)),
a=(r=e.fork()).add($C()),o=r.add(sO({pulse:fC(a)
})),r.addData(c,new Jz(r,a,a,o)),r.addSignal("parent",null),u.params.subflow={
$subflow:pD(t,r).toRuntime()}}(t,e,a):x?function(t,e,n){var r=e.add(rO({
pulse:n.pulse})),i=e.fork()
;i.add(sO()),i.addSignal("parent",null),r.params.subflow={
$subflow:pD(t,i).toRuntime()}
}(t,e,a):pD(t,e),e.popState(),x&&(_&&n.push(_),n.push(u))),
w&&(v=function(t,e,n){var r,i=t.method,a=t.bound,o={
method:vC(i)?n.signalRef(i.signal):i,pulse:e};t.order&&(o.sort=n.compareRef({
field:t.order}))
;a&&(r=a.tolerance,o.boundTolerance=vC(r)?n.signalRef(r.signal):+r,
o.boundScale=n.scaleRef(a.scale),o.boundOrient=a.orient);return fC(n.add(eO(o)))
}(w,v,e)),f=e.add(uO({pulse:v})),c=e.add(sO({pulse:fC(f)
},void 0,e.parent())),null!=t.name&&(l=t.name,
e.addData(l,new Jz(e,o,f,c)),t.on&&t.on.forEach((function(t){
(t.insert||t.remove||t.toggle)&&i("Marks only support modify triggers."),
eD(t,e,l)})))}function rD(t,e){
var n,r,a,o,u,f,s,c,l,h=e.config.legend,d=t.encode||{},p=d.legend||{},g=p.name||void 0,v=p.interactive,m=p.style,y=XO.reduce((function(e,n){
return e||t[n]}),0)
;return y||i("Missing valid scale for legend."),u=function(t,e){var n=t.type||GO
;t.type||1!==function(t){return XO.reduce((function(e,n){return e+(t[n]?1:0)
}),0)}(t)||!t.fill&&!t.stroke||(n=function(t){return mO.hasOwnProperty(t)
}(e)?HO:_O(e)?VO:GO);return n!==HO?n:_O(e)?VO:HO}(t,e.scaleType(y)),f={
orient:_z("orient",t,h),title:null!=t.title,type:u
},s=fC(e.add($C(null,[f]))),p=gz(function(t,e){var n={enter:{},update:{}}
;return pz(n,"offset",_z("offset",t,e)),
pz(n,"padding",_z("padding",t,e)),pz(n,"titlePadding",_z("titlePadding",t,e)),
pz(n,"fill",_z("fillColor",t,e)),
pz(n,"stroke",_z("strokeColor",t,e)),pz(n,"strokeWidth",_z("strokeWidth",t,e)),
pz(n,"cornerRadius",_z("cornerRadius",t,e)),pz(n,"strokeDash",e.strokeDash),n
}(t,h),p,JO),n={enter:{x:{value:0},y:{value:0}}},c=fC(e.add(JC(a={type:u,
scale:e.scaleRef(y),count:e.objectProperty(t.tickCount),
values:e.objectProperty(t.values),formatSpecifier:e.property(t.format)
}))),u===HO?(o=[zz(t,y,h,d.gradient),Nz(t,h,d.labels,c)],
a.count=a.count||e.signalRef("max(2,2*floor(("+bC(wz(t,h))+")/100))")):u===VO?o=[Dz(t,y,h,d.gradient,c),Nz(t,h,d.labels,c)]:(r=function(t,e){
return{align:_z("gridAlign",t,e),center:{row:!0,column:!1},columns:kz(t,e),
padding:{row:_z("rowPadding",t,e),column:_z("columnPadding",t,e)}}
}(t,h),o=[Pz(t,h,d,c,bC(r.columns))],a.size=function(t,e,n){var r,i,a
;return a=Ez("strokeWidth",n[0].encode),
i=t.size?'scale("'+t.size+'",datum)':Ez("size",n[0].encode),r=function(t,e,n){
return Ez("fontSize",t)||function(t,e,n){var r=e.config.style[n];return r&&r[t]
}("fontSize",e,n)
}(n[1].encode,e,BO),iC("max(ceil(sqrt("+bC(i)+")+"+bC(a)+"),"+bC(r)+")",e)
}(t,e,o[0].marks)),
o=[Rz("legend-entry",null,null,s,v,n,o,r)],f.title&&o.push(function(t,e,n,r){
var i,a,o={value:0};return pz(i={enter:a={opacity:o,x:{field:{group:"padding"}},
y:{field:{group:"padding"}}},update:{opacity:{value:1},text:dz(t.title),x:a.x,
y:a.y},exit:{opacity:o}
},"align",_z("titleAlign",t,e)),pz(i,"baseline",_z("titleBaseline",t,e)),
pz(i,"fill",_z("titleColor",t,e)),
pz(i,"font",_z("titleFont",t,e)),pz(i,"fontSize",_z("titleFontSize",t,e)),
pz(i,"fontWeight",_z("titleFontWeight",t,e)),pz(i,"limit",_z("titleLimit",t,e)),
pz(i,"fillOpacity",_z("titleOpacity",t,e)),bz(Oz,"legend-title",WO,null,r,i,n)
}(t,h,d.title,s)),
l=Rz("legend",m,g,s,v,p,o),t.zindex&&(l.zindex=t.zindex),nD(l,e)}
function iD(t,e,n){
return'item.anchor==="start"?'+t+':item.anchor==="end"?'+e+":"+n}
Zz.countsRef=function(t,e,n){var r,i,a,o=this,u=o.counts||(o.counts={}),f=Qz(e)
;return null!=f&&(t=o.scope,r=u[f]),r?n&&n.field&&Kz(t,r.agg.params,n):(a={
groupby:t.fieldRef(e,"key"),pulse:fC(o.output)
},n&&n.field&&Kz(t,a,n),i=t.add(FC(a)),r=t.add($C({pulse:fC(i)})),r={agg:i,
ref:fC(r)},null!=f&&(u[f]=r)),r.ref},Zz.tuplesRef=function(){
return fC(this.values)},Zz.extentRef=function(t,e){
return tD(t,this,"extent","extent",e,!1)},Zz.domainRef=function(t,e){
return tD(t,this,"domain","values",e,!1)},Zz.valuesRef=function(t,e,n){
return tD(t,this,"vals","values",e,n||!0)},Zz.lookupRef=function(t,e){
return tD(t,this,"lookup","tupleindex",e,!1)},Zz.indataRef=function(t,e){
return tD(t,this,"indata","tupleindex",e,!0,!0)}
;var aD=iD(s(PO),s(LO),s("center")),oD=iD('+(item.orient==="right")','+(item.orient!=="left")',"0.5")
;function uD(t,e){t=f(t)?{text:t}:t;var n,r,i,a=e.config.title,o=U({},t.encode)
;return n={orient:_z("orient",t,a)
},r=fC(e.add($C(null,[n]))),o.name=t.name,o.interactive=t.interactive,
i=function(t,e,n,r){var i,a,o,u,f,s={value:0
},c=t.text,l=_z("orient",t,e),h=_z("anchor",t,e),d=l===PO||l===TO?-1:1,p=l===TO||l===qO,g={
group:p?"width":"height"};u={field:g,mult:{signal:oD}},f=d<0?s:p?{field:{
group:"height"}}:{field:{group:"width"}},i={enter:a={opacity:s},update:o={
opacity:{value:1},text:dz(c),anchor:dz(h),orient:dz(l),extent:{field:g},align:{
signal:aD}},exit:{opacity:s}},p?(o.x=u,o.y=f,a.angle=s,a.baseline={
value:l===TO?qO:TO}):(o.x=f,o.y=u,a.angle={value:90*d},a.baseline={value:qO})
;return pz(i,"align",_z("align",t,e),"update"),
pz(i,"angle",_z("angle",t,e)),pz(i,"baseline",_z("baseline",t,e)),
pz(i,"fill",_z("color",t,e)),
pz(i,"font",_z("font",t,e)),pz(i,"fontSize",_z("fontSize",t,e)),
pz(i,"fontWeight",_z("fontWeight",t,e)),
pz(i,"frame",_z("frame",t,e)),pz(i,"limit",_z("limit",t,e)),
pz(i,"offset",_z("offset",t,e)||0),bz(Oz,hz,t.style||YO,null,r,i,n)
}(t,a,o,r),t.zindex&&(i.zindex=t.zindex),nD(i,e)}function fD(t,e){var n=[]
;t.transform&&t.transform.forEach((function(t){n.push(Iz(t,e))
})),t.on&&t.on.forEach((function(n){eD(n,e,t.name)
})),e.addDataPipeline(t.name,function(t,e,n){var r,i,a,o,u,f=[],s=null,c=!1,l=!1
;t.values?f.push(s=sD({$ingest:t.values,$format:t.format
})):t.url?(s=mC(t.url)||mC(t.format)?{$load:fC(e.add(cD(e,t)))}:{$request:t.url,
$format:t.format},f.push(s=sD(s))):t.source&&(s=r=R(t.source).map((function(t){
return fC(e.getData(t).output)})),f.push(null))
;for(i=0,a=n.length;i<a;++i)u=(o=n[i]).metadata,
s||u.source||f.push(s=sD()),f.push(o),
u.generates&&(l=!0),u.modifies&&!l&&(c=!0),u.source?s=o:u.changes&&(s=null)
;r&&(a=r.length-1,f[0]=oO({derive:c,pulse:a?r:r[0]}),(c||a)&&f.splice(1,0,sD()))
;s||f.push(sD());return f.push(sO({})),f}(t,e,n))}function sD(t){var e=$C({},t)
;return e.metadata={source:!0},e}function cD(t,e){return ZC({
url:t.property(e.url),format:t.objectProperty(e.format)})}function lD(t,e){
return{scale:t.scale,range:e}}function hD(t,e,n,r,i){return{
signal:'flush(range("'+t+'"), scale("'+t+'", datum.value), '+e+","+n+","+r+","+i+")"
}}function dD(t,e){var n,r,i,a,o,u,f=function(t,e){
var n=e.config,r=t.orient,i=r===TO||r===qO?n.axisX:n.axisY,a=n["axis"+r[0].toUpperCase()+r.slice(1)],o="band"===e.scaleType(t.scale)&&n.axisBand
;return i||a||o?U({},n.axis,i,a,o):n.axis
}(t,e),s=t.encode||{},c=s.axis||{},l=c.name||void 0,h=c.interactive,d=c.style
;return n={orient:t.orient,ticks:!!_z("ticks",t,f),labels:!!_z("labels",t,f),
grid:!!_z("grid",t,f),domain:!!_z("domain",t,f),title:!!yC(t.title,!1)
},r=fC(e.add($C({},[n]))),c=gz({update:{range:{
signal:'abs(span(range("'+t.scale+'")))'},offset:dz(yC(t.offset,0)),
position:dz(yC(t.position,0)),titlePadding:dz(_z("titlePadding",t,f)),
minExtent:dz(_z("minExtent",t,f)),maxExtent:dz(_z("maxExtent",t,f))}
},s.axis,JO),i=fC(e.add(jC({scale:e.scaleRef(t.scale),
extra:e.property(_z("tickExtra",t,f)),count:e.objectProperty(t.tickCount),
values:e.objectProperty(t.values),formatSpecifier:e.property(t.format)}))),u=[],
n.grid&&u.push(function(t,e,n,r){
var i,a,o,u,f,s,c,l,h,d=t.orient,p=t.gridScale,g=d===PO||d===TO?1:-1,v=g*t.offset||0,m={
value:0};return pz(i={enter:a={opacity:m},update:u={opacity:{value:1}},exit:o={
opacity:m}},"stroke",_z("gridColor",t,e)),pz(i,"strokeDash",_z("gridDash",t,e)),
pz(i,"strokeOpacity",_z("gridOpacity",t,e)),
pz(i,"strokeWidth",_z("gridWidth",t,e)),f={scale:t.scale,field:$O,
band:_z("bandPosition",t,e),round:_z("tickRound",t,e),extra:_z("tickExtra",t,e),
offset:_z("tickOffset",t,e)
},d===TO||d===qO?(s="x",c="y",h="height"):(s="y",c="x",
h="width"),l=c+"2",u[s]=a[s]=o[s]=f,p?(a[c]={scale:p,range:0,mult:g,offset:v
},u[l]=a[l]={scale:p,range:1,mult:g,offset:v}):(a[c]={value:v},u[l]=a[l]={
signal:h,mult:g,offset:v}),bz(Cz,"axis-grid",null,$O,r,i,n)
}(t,f,s.grid,i)),n.ticks&&(a=_z("tickSize",t,f),u.push(function(t,e,n,r,i){
var a,o,u,f,s,c,l=t.orient,h=l===PO||l===TO?-1:1,d={value:0};return pz(a={
enter:o={opacity:d},update:f={opacity:{value:1}},exit:u={opacity:d}
},"stroke",_z("tickColor",t,e)),
pz(a,"strokeOpacity",_z("tickOpacity",t,e)),pz(a,"strokeWidth",_z("tickWidth",t,e)),
(s=dz(i)).mult=h,c={scale:t.scale,field:$O,band:_z("bandPosition",t,e),
round:_z("tickRound",t,e),extra:_z("tickExtra",t,e),offset:_z("tickOffset",t,e)
},
l===TO||l===qO?(f.y=o.y=d,f.y2=o.y2=s,f.x=o.x=u.x=c):(f.x=o.x=d,f.x2=o.x2=s,f.y=o.y=u.y=c),
bz(Cz,"axis-tick",null,$O,r,a,n)
}(t,f,s.ticks,i,a))),n.labels&&(a=n.ticks?a:0,u.push(function(t,e,n,r,i){
var a,o,u,f,s,c,l,h,d,p=t.orient,g=p===PO||p===TO?-1:1,v=p===TO||p===qO,m=t.scale,y=bC(_z("labelFlush",t,e)),b=bC(_z("labelFlushOffset",t,e)),_=0===y||!!y,x=_z("labelAlign",t,e),w=_z("labelBaseline",t,e),M={
value:0}
;return(u=dz(i)).mult=g,u.offset=dz(_z("labelPadding",t,e)||0),u.offset.mult=g,
f={scale:m,field:$O,band:.5,offset:_z("tickOffset",t,e)
},v?(s=x||(_?hD(m,y,'"left"','"right"','"center"'):"center"),
c=w||(p===TO?"bottom":"top"),
l=!x):(s=x||(p===LO?"left":"right"),c=w||(_?hD(m,y,'"top"','"bottom"','"middle"'):"middle"),
l=!w),l=l&&_&&b?hD(m,y,"-"+b,b,0):null,pz(a={enter:o={opacity:M,x:v?f:u,y:v?u:f
},update:{opacity:{value:1},text:{field:FO},x:o.x,y:o.y},exit:{opacity:M,x:o.x,
y:o.y}
},v?"dx":"dy",l),pz(a,"align",s),pz(a,"baseline",c),pz(a,"angle",_z("labelAngle",t,e)),
pz(a,"fill",_z("labelColor",t,e)),
pz(a,"font",_z("labelFont",t,e)),pz(a,"fontSize",_z("labelFontSize",t,e)),
pz(a,"fontWeight",_z("labelFontWeight",t,e)),pz(a,"limit",_z("labelLimit",t,e)),
pz(a,"fillOpacity",_z("labelOpacity",t,e)),
h=_z("labelBound",t,e),d=_z("labelOverlap",t,e),
t=bz(Oz,"axis-label",BO,$O,r,a,n),(d||h)&&(t.overlap={method:d,
order:"datum.index",bound:h?{scale:m,orient:p,tolerance:h}:null}),t
}(t,f,s.labels,i,a))),n.domain&&u.push(function(t,e,n,r){
var i,a,o,u,f,s,c=t.orient,l={value:0};return pz(i={enter:a={opacity:l},
update:o={opacity:{value:1}},exit:{opacity:l}
},"stroke",_z("domainColor",t,e)),pz(i,"strokeWidth",_z("domainWidth",t,e)),
pz(i,"strokeOpacity",_z("domainOpacity",t,e)),
c===TO||c===qO?(u="x",s="y"):(u="y",
s="x"),f=u+"2",a[s]=l,o[u]=a[u]=lD(t,0),o[f]=a[f]=lD(t,1),
bz(Cz,"axis-domain",null,null,r,i,n)
}(t,f,s.domain,r)),n.title&&u.push(function(t,e,n,r){
var i,a,o,u,f=t.orient,s=f===PO||f===TO?-1:1,c=f===TO||f===qO,l={value:0}
;return i={enter:a={opacity:l},update:o={opacity:{value:1},text:dz(t.title)},
exit:{opacity:l}},u={scale:t.scale,range:.5},c?(o.x=u,a.angle={value:0
},a.baseline={value:f===TO?"bottom":"top"}):(o.y=u,a.angle={value:90*s
},a.baseline={value:"bottom"
}),pz(i,"align",_z("titleAlign",t,e)),pz(i,"angle",_z("titleAngle",t,e)),
pz(i,"baseline",_z("titleBaseline",t,e)),
pz(i,"fill",_z("titleColor",t,e)),pz(i,"font",_z("titleFont",t,e)),
pz(i,"fontSize",_z("titleFontSize",t,e)),
pz(i,"fontWeight",_z("titleFontWeight",t,e)),pz(i,"limit",_z("titleLimit",t,e)),
pz(i,"fillOpacity",_z("titleOpacity",t,e)),
!pz(i,"x",_z("titleX",t,e),"update")&&c&&!yz("x",n)&&(i.enter.auto={value:!0
}),!pz(i,"y",_z("titleY",t,e),"update")&&!c&&!yz("y",n)&&(i.enter.auto={value:!0
}),bz(Oz,"axis-title",WO,null,r,i,n)
}(t,f,s.title,r)),o=Rz("axis",d,l,r,h,c,u),t.zindex&&(o.zindex=t.zindex),nD(o,e)
}function pD(t,e,n){var r=R(t.signals),a=R(t.scales)
;return n||r.forEach((function(t){iS(t,e)
})),R(t.projections).forEach((function(t){!function(t,e){var n={}
;for(var r in t)"name"!==r&&(n[r]=RO(t[r],r,e));e.addProjection(t.name,n)}(t,e)
})),a.forEach((function(t){!function(t,e){var n=t.type||"linear"
;gO.hasOwnProperty(n)||i("Unrecognized scale type: "+s(n)),e.addScale(t.name,{
type:n,domain:void 0})}(t,e)})),R(t.data).forEach((function(t){fD(t,e)
})),a.forEach((function(t){wO(t,e)})),r.forEach((function(t){!function(t,e){
var n=e.getSignal(t.name),r=t.update
;t.init&&(r?i("Signals can not include both init and update expressions."):(r=t.init,
n.initonly=!0)),
r&&(r=iC(r,e),n.update=r.$expr,n.params=r.$params),t.on&&t.on.forEach((function(t){
qC(t,e,n.id)}))}(t,e)})),R(t.axes).forEach((function(t){dD(t,e)
})),R(t.marks).forEach((function(t){nD(t,e)
})),R(t.legends).forEach((function(t){rD(t,e)
})),t.title&&uD(t.title,e),e.parseLambdas(),e}
var gD=et(["width","height","padding","autosize"]);function vD(t,e){
var n,r,i,a,o,f=e.config
;return e.background=t.background||f.background,e.eventConfig=f.events,
o=fC(e.root=e.add(uC())),
e.addSignal("width",t.width||0),e.addSignal("height",t.height||0),
e.addSignal("padding",function(t,e){return u(t=t||e.padding)?{top:JE(t.top),
bottom:JE(t.bottom),left:JE(t.left),right:JE(t.right)}:function(t){return{top:t,
bottom:t,left:t,right:t}}(JE(t))
}(t.padding,f)),e.addSignal("autosize",function(t,e){
return u(t=t||e.autosize)?t:{type:t=t||"pad"}
}(t.autosize,f)),R(t.signals).forEach((function(t){gD[t.name]||iS(t,e)
})),r=e.add($C()),i=gz({enter:{x:{value:0},y:{value:0}},update:{width:{
signal:"width"},height:{signal:"height"}}
},t.encode),i=e.add(YC(vz(i,Sz,sz,t.style,e,{pulse:fC(r)}))),a=e.add(lO({
layout:e.objectProperty(t.layout),legendMargin:f.legendMargin,
autosize:e.signalRef("autosize"),mark:o,pulse:fC(i)
})),e.operators.pop(),e.pushState(fC(i),fC(a),null),
pD(t,e,!0),e.operators.push(a),n=e.add(IC({mark:o,pulse:fC(a)})),n=e.add(uO({
pulse:fC(n)})),n=e.add(sO({pulse:fC(n)})),e.addData("root",new Jz(e,r,r,n)),e}
function mD(t){
this.config=t,this.bindings=[],this.field={},this.signals={},this.lambdas={},
this.scales={},
this.events={},this.data={},this.streams=[],this.updates=[],this.operators=[],
this.background=null,
this.eventConfig=null,this._id=0,this._subid=0,this._nextsub=[0],
this._parent=[],this._encode=[],this._lookup=[],this._markpath=[]}
function yD(t){
this.config=t.config,this.field=Object.create(t.field),this.signals=Object.create(t.signals),
this.lambdas=Object.create(t.lambdas),
this.scales=Object.create(t.scales),this.events=Object.create(t.events),
this.data=Object.create(t.data),
this.streams=[],this.updates=[],this.operators=[],
this._id=0,this._subid=++t._nextsub[0],
this._nextsub=t._nextsub,this._parent=t._parent.slice(),
this._encode=t._encode.slice(),
this._lookup=t._lookup.slice(),this._markpath=t._markpath}
var bD=mD.prototype=yD.prototype;function _D(t){return(o(t)?xD:wD)(t)}
function xD(t){
for(var e,n="[",r=0,i=t.length;r<i;++r)n+=(r>0?",":"")+(u(e=t[r])?e.signal||_D(e):s(e))
;return n+"]"}function wD(t){var e,n,r="{",i=0
;for(e in t)n=t[e],r+=(++i>1?",":"")+s(e)+":"+(u(n)?n.signal||_D(n):s(n))
;return r+"}"}function MD(t){var e={padding:0,autosize:"pad",background:null,
events:{defaults:{allow:["wheel"]}},group:null,mark:null,arc:{fill:SD},area:{
fill:SD},image:null,line:{stroke:SD,strokeWidth:2},path:{stroke:SD},rect:{
fill:SD},rule:{stroke:AD},shape:{stroke:SD},symbol:{fill:SD,size:64},text:{
fill:AD,font:kD,fontSize:11},style:{"guide-label":{fill:AD,font:kD,fontSize:10},
"guide-title":{fill:AD,font:kD,fontSize:11,fontWeight:"bold"},"group-title":{
fill:AD,font:kD,fontSize:13,fontWeight:"bold"},point:{size:ED,strokeWidth:2,
shape:"circle"},circle:{size:ED,strokeWidth:2},square:{size:ED,strokeWidth:2,
shape:"square"},cell:{fill:"transparent",stroke:OD}},axis:{minExtent:0,
maxExtent:200,bandPosition:.5,domain:!0,domainWidth:1,domainColor:CD,grid:!1,
gridWidth:1,gridColor:OD,labels:!0,labelAngle:0,labelLimit:180,labelPadding:2,
ticks:!0,tickColor:CD,tickOffset:0,tickRound:!0,tickSize:5,tickWidth:1,
titleAlign:"center",titlePadding:4},axisBand:{tickOffset:-1},legend:{
orient:"right",offset:18,padding:0,gridAlign:"each",columnPadding:10,
rowPadding:2,symbolDirection:"vertical",gradientDirection:"vertical",
gradientLength:200,gradientThickness:16,gradientStrokeColor:OD,
gradientStrokeWidth:0,gradientLabelOffset:2,labelAlign:"left",
labelBaseline:"middle",labelLimit:160,labelOffset:4,labelOverlap:!0,
symbolType:"circle",symbolSize:100,symbolOffset:0,symbolStrokeWidth:1.5,
symbolBaseFillColor:"transparent",symbolBaseStrokeColor:CD,titleAlign:"left",
titleBaseline:"top",titleLimit:180,titlePadding:5},title:{orient:"top",
anchor:"middle",offset:4},range:{category:{scheme:"tableau10"},ordinal:{
scheme:"blues",extent:[.2,1]},heatmap:{scheme:"viridis"},ramp:{scheme:"blues",
extent:[.2,1]},diverging:{scheme:"blueorange"},
symbol:["circle","square","triangle-up","cross","diamond","triangle-right","triangle-down","triangle-left"]
}};return(t||[]).forEach((function(t){var n,r,i
;if(t)for(n in t)if("style"===n)for(n in i=e.style||(e.style={}),
t.style)i[n]=U(i[n]||{},t.style[n]);else r=t[n],
e[n]=u(r)&&!o(r)?U(u(e[n])?e[n]:{},r):r})),e}bD.fork=function(){
return new yD(this)},bD.isSubscope=function(){return this._subid>0
},bD.toRuntime=function(){return this.finish(),{background:this.background,
operators:this.operators,streams:this.streams,updates:this.updates,
bindings:this.bindings,eventConfig:this.eventConfig}},bD.id=function(){
return(this._subid?this._subid+":":0)+this._id++},bD.add=function(t){
return this.operators.push(t),
t.id=this.id(),t.refs&&(t.refs.forEach((function(e){e.$ref=t.id})),t.refs=null),
t},bD.proxy=function(t){var e=t instanceof aC?fC(t):t;return this.add(aO({
value:e}))},bD.addStream=function(t){return this.streams.push(t),t.id=this.id(),
t},bD.addUpdate=function(t){return this.updates.push(t),t},bD.finish=function(){
var t,e
;for(t in this.root&&(this.root.root=!0),this.signals)this.signals[t].signal=t
;for(t in this.scales)this.scales[t].scale=t;function n(t,e,n){var r
;t&&((r=t.data||(t.data={}))[e]||(r[e]=[])).push(n)}
for(t in this.data)for(var r in n((e=this.data[t]).input,t,"input"),
n(e.output,t,"output"),n(e.values,t,"values"),e.index)n(e.index[r],t,"index:"+r)
;return this},bD.pushState=function(t,e,n){this._encode.push(fC(this.add(sO({
pulse:t
})))),this._parent.push(e),this._lookup.push(n?fC(this.proxy(n)):null),this._markpath.push(-1)
},bD.popState=function(){
this._encode.pop(),this._parent.pop(),this._lookup.pop(),this._markpath.pop()
},bD.parent=function(){return _(this._parent)},bD.encode=function(){
return _(this._encode)},bD.lookup=function(){return _(this._lookup)
},bD.markpath=function(){var t=this._markpath;return++t[t.length-1]
},bD.fieldRef=function(t,e){if(f(t))return cC(t,e)
;t.signal||i("Unsupported field reference: "+s(t))
;var n,r=t.signal,a=this.field[r];return a||(n={name:this.signalRef(r)
},e&&(n.as=e),this.field[r]=a=fC(this.add(VC(n)))),a
},bD.compareRef=function(t,e){function n(t){
return vC(t)?(i=!0,r.signalRef(t.signal)):t}
var r=this,i=!1,a=R(t.field).map(n),o=R(t.order).map(n)
;return e&&a.push(sC),i?fC(this.add(BC({fields:a,orders:o}))):hC(a,o)
},bD.keyRef=function(t,e){var n=this.signals,r=!1
;return t=R(t).map((function(t){return vC(t)?(r=!0,fC(n[t.signal])):t
})),r?fC(this.add(XC({fields:t,flat:e}))):function(t,e){var n={$key:t}
;return e&&(n.$flat=!0),n}(t,e)},bD.sortRef=function(t){if(!t)return t
;var e=[dC(t.op,t.field),sC],n=t.order||"ascending"
;return n.signal?fC(this.add(BC({fields:e,orders:[n=this.signalRef(n.signal),n]
}))):hC(e,[n,n])},bD.event=function(t,e){var n=t+":"+e;if(!this.events[n]){
var r=this.id();this.streams.push({id:r,source:t,type:e}),this.events[n]=r}
return this.events[n]},bD.addSignal=function(t,e){
this.signals.hasOwnProperty(t)&&i("Duplicate signal name: "+s(t))
;var n=e instanceof aC?e:this.add(uC(e));return this.signals[t]=n
},bD.getSignal=function(t){
return this.signals[t]||i("Unrecognized signal name: "+s(t)),this.signals[t]
},bD.signalRef=function(t){
return this.signals[t]?fC(this.signals[t]):(this.lambdas.hasOwnProperty(t)||(this.lambdas[t]=this.add(uC(null))),
fC(this.lambdas[t]))},bD.parseLambdas=function(){
for(var t=Object.keys(this.lambdas),e=0,n=t.length;e<n;++e){
var r=t[e],i=iC(r,this),a=this.lambdas[r];a.params=i.$params,a.update=i.$expr}},
bD.property=function(t){return t&&t.signal?this.signalRef(t.signal):t
},bD.objectProperty=function(t){return t&&u(t)?this.signalRef(t.signal||_D(t)):t
},bD.exprRef=function(t,e){var n={expr:iC(t,this)}
;return e&&(n.expr.$name=e),fC(this.add(GC(n)))},bD.addBinding=function(t,e){
this.bindings||i("Nested signals do not support binding: "+s(t)),
this.bindings.push(U({signal:t},e))},bD.addScaleProj=function(t,e){
this.scales.hasOwnProperty(t)&&i("Duplicate scale or projection name: "+s(t)),
this.scales[t]=this.add(e)},bD.addScale=function(t,e){this.addScaleProj(t,fO(e))
},bD.addProjection=function(t,e){this.addScaleProj(t,iO(e))
},bD.getScale=function(t){
return this.scales[t]||i("Unrecognized scale name: "+s(t)),this.scales[t]
},bD.projectionRef=bD.scaleRef=function(t){return fC(this.getScale(t))
},bD.projectionType=bD.scaleType=function(t){return this.getScale(t).params.type
},bD.addData=function(t,e){
return this.data.hasOwnProperty(t)&&i("Duplicate data set name: "+s(t)),
this.data[t]=e},bD.getData=function(t){
return this.data[t]||i("Undefined data set name: "+s(t)),this.data[t]
},bD.addDataPipeline=function(t,e){
return this.data.hasOwnProperty(t)&&i("Duplicate data set name: "+s(t)),
this.addData(t,Jz.fromEntries(this,e))}
;var kD="sans-serif",ED=30,SD="#4c78a8",AD="#000",CD="#888",OD="#ddd"
;function zD(t,e,n){";"!==e[e.length-1]&&(e="return("+e+");")
;var r=Function.apply(null,t.concat(e))
;return n&&n.functions?r.bind(n.functions):r}function DD(t,e){
return zD(["event"],t,e)}function ND(t,e){return zD(["item","_"],t,e)}
function RD(t,e,n){var r,i
;for(r in n=n||{},t)i=t[r],n[r]=o(i)?i.map((function(t){return TD(t,e,n)
})):TD(i,e,n);return n}function TD(t,e,n){if(!t||!u(t))return t
;for(var r,i=0,a=PD.length;i<a;++i)if(r=PD[i],
t.hasOwnProperty(r.key))return r.parse(t,e,n);return t}var PD=[{key:"$ref",
parse:function(t,e){return e.get(t.$ref)||i("Operator not defined: "+t.$ref)}},{
key:"$key",parse:function(t,e){var n="k:"+t.$key+"_"+!!t.$flat
;return e.fn[n]||(e.fn[n]=H(t.$key,t.$flat))}},{key:"$expr",
parse:function(t,n,r){t.$params&&RD(t.$params,n,r)
;var i="e:"+t.$expr+"_"+t.$name;return n.fn[i]||(n.fn[i]=e(function(t,e){
return zD(["datum","_"],t,e)}(t.$expr,n),t.$fields,t.$name))}},{key:"$field",
parse:function(t,e){if(!t.$field)return null;var n="f:"+t.$field+"_"+t.$name
;return e.fn[n]||(e.fn[n]=c(t.$field,t.$name))}},{key:"$encode",
parse:function(t,n){var r,i,a=t.$encode,o={}
;for(r in a)i=a[r],o[r]=e(ND(i.$expr,n),i.$fields),o[r].output=i.$output
;return o}},{key:"$compare",parse:function(t,e){
var n="c:"+t.$compare+"_"+t.$order,r=R(t.$compare).map((function(t){
return t&&t.$tupleid?ft:t}));return e.fn[n]||(e.fn[n]=P(r,t.$order))}},{
key:"$context",parse:function(t,e){return e}},{key:"$subflow",
parse:function(t,e){var n=t.$subflow;return function(t,r,i){
var a=FD(n,e.fork()),o=a.get(n.operators[0].id),u=a.signals.parent
;return u&&u.set(i),o}}},{key:"$tupleid",parse:function(){return ft}}]
;function LD(t){return(t+"").toLowerCase()}function qD(t,e){!function(t){
return"operator"===LD(t)
}(t.type)&&t.type?e.transform(t,t.type):e.operator(t,t.update?function(t,e){
return zD(["_"],t,e)}(t.update,e):null)}function UD(t,e){
var n=u(n=t.source)?n.$ref:n,r=e.get(n),a=null,o=t.update,f=void 0
;r||i("Source not defined: "+t.source),
a=t.target&&t.target.$expr?DD(t.target.$expr,e):e.get(t.target),
o&&o.$expr&&(o.$params&&(f=RD(o.$params,e)),o=function(t,e){
return zD(["_","event"],t,e)}(o.$expr,e)),e.update(t,r,a,o,f)}function FD(t,e){
var n=t.operators||[]
;return t.background&&(e.background=t.background),t.eventConfig&&(e.eventConfig=t.eventConfig),
n.forEach((function(t){qD(t,e)})),n.forEach((function(t){!function(t,e){
if(t.params){var n=e.get(t.id)
;n||i("Invalid operator id: "+t.id),e.dataflow.connect(n,n.parameters(RD(t.params,e),t.react,t.initonly))
}}(t,e)})),(t.streams||[]).forEach((function(t){!function(t,e){
var n,r=null!=t.filter?DD(t.filter,e):void 0,a=null!=t.stream?e.get(t.stream):void 0
;t.source?a=e.events(t.source,t.type,r):t.merge&&(a=(n=t.merge.map(e.get.bind(e)))[0].merge.apply(n[0],n.slice(1))),
t.between&&(n=t.between.map(e.get.bind(e)),
a=a.between(n[0],n[1])),t.filter&&(a=a.filter(r)),
null!=t.throttle&&(a=a.throttle(+t.throttle)),
null!=t.debounce&&(a=a.debounce(+t.debounce)),
null==a&&i("Invalid stream definition: "+JSON.stringify(t)),
t.consume&&a.consume(!0),e.stream(t,a)}(t,e)
})),(t.updates||[]).forEach((function(t){UD(t,e)})),e.resolve()}var jD={skip:!0}
;function ID(t,e,n){return new $D(t,e,n)}function $D(t,e,n){
this.dataflow=t,this.transforms=e,
this.events=t.events.bind(t),this.signals={},this.scales={},
this.nodes={},this.data={},
this.fn={},n&&(this.functions=Object.create(n),this.functions.context=this)}
function BD(t){
this.dataflow=t.dataflow,this.transforms=t.transforms,this.functions=t.functions,
this.events=t.events,
this.signals=Object.create(t.signals),this.scales=Object.create(t.scales),
this.nodes=Object.create(t.nodes),
this.data=Object.create(t.data),this.fn=Object.create(t.fn),
t.functions&&(this.functions=Object.create(t.functions),
this.functions.context=this)}$D.prototype=BD.prototype={fork:function(){
var t=new BD(this);return(this.subcontext||(this.subcontext=[])).push(t),t},
get:function(t){return this.nodes[t]},set:function(t,e){return this.nodes[t]=e},
add:function(t,e){var n,r=this,i=r.dataflow;if(r.set(t.id,e),function(t){
return"collect"===LD(t)
}(t.type)&&(n=t.value)&&(n.$ingest?i.ingest(e,n.$ingest,n.$format):n.$load?r.get(n.$load.$ref).target=e:n.$request?i.request(e,n.$request,n.$format):i.pulse(e,i.changeset().insert(n))),
t.root&&(r.root=e),t.parent){var a=r.get(t.parent.$ref)
;a?(i.connect(a,[e]),e.targets().add(a)):(r.unresolved=r.unresolved||[]).push((function(){
a=r.get(t.parent.$ref),i.connect(a,[e]),e.targets().add(a)}))}
if(t.signal&&(r.signals[t.signal]=e),
t.scale&&(r.scales[t.scale]=e),t.data)for(var o in t.data)n=r.data[o]||(r.data[o]={}),
t.data[o].forEach((function(t){n[t]=e}))},resolve:function(){
return(this.unresolved||[]).forEach((function(t){t()
})),delete this.unresolved,this},operator:function(t,e){
this.add(t,this.dataflow.add(t.value,e))},transform:function(t,e){
this.add(t,this.dataflow.add(this.transforms[LD(e)]))},stream:function(t,e){
this.set(t.id,e)},update:function(t,e,n,r,i){this.dataflow.on(e,n,r,i,t.options)
},getState:function(t){var e=this,n={};if(t.signals){var r=n.signals={}
;Object.keys(e.signals).forEach((function(n){var i=e.signals[n]
;t.signals(n,i)&&(r[n]=i.value)}))}if(t.data){var i=n.data={}
;Object.keys(e.data).forEach((function(n){var r=e.data[n]
;t.data(n,r)&&(i[n]=r.input.value)}))}
return e.subcontext&&!1!==t.recurse&&(n.subcontext=e.subcontext.map((function(e){
return e.getState(t)}))),n},setState:function(t){
var e=this,n=e.dataflow,r=t.data,i=t.signals
;Object.keys(i||{}).forEach((function(t){n.update(e.signals[t],i[t],jD)
})),Object.keys(r||{}).forEach((function(t){
n.pulse(e.data[t].input,n.changeset().remove(v).insert(r[t]))
})),(t.subcontext||[]).forEach((function(t,n){var r=e.subcontext[n]
;r&&r.setState(t)}))}};var WD="width",YD="height",GD="padding",HD={skip:!0}
;function VD(t,e){var n=t.autosize(),r=t.padding()
;return e-(n&&n.contains===GD?r.left+r.right:0)}function XD(t,e){
var n=t.autosize(),r=t.padding();return e-(n&&n.contains===GD?r.top+r.bottom:0)}
function JD(t,e){return e.modified&&o(e.input.value)&&t.indexOf("_:vega:_")}
function ZD(t,e){return!("parent"===t||e instanceof Er.proxy)}
function QD(t,e,n,r){var i=t.element();i&&i.setAttribute("title",function(t){
return null==t?"":o(t)?KD(t):u(t)&&!W(t)?function(t){
return Object.keys(t).map((function(e){var n=t[e]
;return e+": "+(o(n)?KD(n):tN(n))})).join("\n")}(t):t+""}(r))}function KD(t){
return"["+t.map(tN).join(", ")+"]"}function tN(t){
return o(t)?"[…]":u(t)&&!W(t)?"{…}":t}function eN(t,e){var n=this
;e=e||{},_r.call(n),
n.loader(e.loader||n._loader),n.logLevel(e.logLevel||0),n._el=null,
n._renderType=e.renderer||xc.Canvas,n._scenegraph=new bs
;var r=n._scenegraph.root
;n._renderer=null,n._tooltip=e.tooltip||QD,n._redraw=!0,
n._handler=(new Ls).scene(r),
n._preventDefault=!1,n._timers=[],n._eventListeners=[],n._resizeListeners=[]
;var i=function(t,e,n){return FD(e,ID(t,Er,n||ZA))}(n,t,e.functions)
;n._runtime=i,n._signals=i.signals,n._bind=(t.bindings||[]).map((function(t){
return{state:null,param:U({},t)}
})),i.root&&i.root.set(r),r.source=i.data.root.input,
n.pulse(i.data.root.input,n.changeset().insert(r.items)),
n._background=i.background||null,n._eventConfig=function(t){
var e=(t=U({},t)).defaults
;return e&&(o(e.prevent)&&(e.prevent=et(e.prevent)),o(e.allow)&&(e.allow=et(e.allow))),
t
}(i.eventConfig),n._width=n.width(),n._height=n.height(),n._viewWidth=VD(n,n._width),
n._viewHeight=XD(n,n._height),
n._origin=[0,0],n._resize=0,n._autosize=1,function(t){
var e=t._signals,n=e.width,r=e.height,i=e.padding;function a(){
t._autosize=t._resize=1}t._resizeWidth=t.add(null,(function(e){
t._width=e.size,t._viewWidth=VD(t,e.size),a()}),{size:n
}),t._resizeHeight=t.add(null,(function(e){
t._height=e.size,t._viewHeight=XD(t,e.size),a()}),{size:r});var o=t.add(null,a,{
pad:i})
;t._resizeWidth.rank=n.rank+1,t._resizeHeight.rank=r.rank+1,o.rank=i.rank+1}(n),
kE(n)}var nN=$(eN,_r);function rN(t,e){
return t._signals.hasOwnProperty(e)?t._signals[e]:i("Unrecognized signal name: "+s(e))
}function iN(t,e){var n=(t._targets||[]).filter((function(t){var n=t._update
;return n&&n.handler===e}));return n.length?n[0]:null}function aN(t,e,n,r){
var i=iN(n,r);return i||((i=HE(this,(function(){r(e,n.value)
}))).handler=r,t.on(n,null,i)),t}function oN(t,e,n){var r=iN(e,n)
;return r&&e._targets.remove(r),t}nN.run=function(t){
if(_r.prototype.run.call(this,t),
this._pending)this.resize();else if(this._redraw||this._resize)try{this.render()
}catch(e){this.error(e)}return this},nN.render=function(){
return this._renderer&&(this._resize&&(this._resize=0,function(t){
var e=OE(t),n=AE(t),r=CE(t)
;t._renderer.background(t._background),t._renderer.resize(n,r,e),
t._handler.origin(e),t._resizeListeners.forEach((function(e){try{e(n,r)
}catch(i){t.error(i)}}))
}(this)),this._renderer.render(this._scenegraph.root)),this._redraw=!1,this
},nN.dirty=function(t){this._redraw=!0,this._renderer&&this._renderer.dirty(t)},
nN.container=function(){return this._el},nN.scenegraph=function(){
return this._scenegraph},nN.origin=function(){return this._origin.slice()
},nN.signal=function(t,e,n){var r=rN(this,t)
;return 1===arguments.length?r.value:this.update(r,e,n)
},nN.background=function(t){
return arguments.length?(this._background=t,this._resize=1,
this):this._background},nN.width=function(t){
return arguments.length?this.signal("width",t):this.signal("width")
},nN.height=function(t){
return arguments.length?this.signal("height",t):this.signal("height")
},nN.padding=function(t){
return arguments.length?this.signal("padding",t):this.signal("padding")
},nN.autosize=function(t){
return arguments.length?this.signal("autosize",t):this.signal("autosize")
},nN.renderer=function(t){
return arguments.length?(Mc(t)||i("Unrecognized renderer type: "+t),
t!==this._renderType&&(this._renderType=t,
this._resetRenderer()),this):this._renderType},nN.tooltip=function(t){
return arguments.length?(t!==this._tooltip&&(this._tooltip=t,
this._resetRenderer()),this):this._tooltip},nN.loader=function(t){
return arguments.length?(t!==this._loader&&(_r.prototype.loader.call(this,t),
this._resetRenderer()),this):this._loader},nN.resize=function(){
return this._autosize=1,this.touch(rN(this,"autosize"))
},nN._resetRenderer=function(){
this._renderer&&(this._renderer=null,this.initialize(this._el))
},nN._resizeView=function(t,e,n,r,i,a){this.runAfter((function(o){var u=0
;o._autosize=0,
o.width()!==n&&(u=1,o.signal(WD,n,HD),o._resizeWidth.skip(!0)),o.height()!==r&&(u=1,
o.signal(YD,r,HD),
o._resizeHeight.skip(!0)),o._viewWidth!==t&&(o._resize=1,o._viewWidth=t),
o._viewHeight!==e&&(o._resize=1,
o._viewHeight=e),o._origin[0]===i[0]&&o._origin[1]===i[1]||(o._resize=1,
o._origin=i),u&&o.run("enter"),a&&o.runAfter((function(){o.resize()}))}),!1,1)},
nN.addEventListener=function(t,e,n){var r=e
;return n&&!1===n.trap||((r=HE(this,e)).raw=e),this._handler.on(t,r),this
},nN.removeEventListener=function(t,e){
for(var n,r,i=this._handler.handlers(t),a=i.length;--a>=0;)if(r=i[a].type,
n=i[a].handler,t===r&&(e===n||e===n.raw)){this._handler.off(r,n);break}
return this},nN.addResizeListener=function(t){var e=this._resizeListeners
;return e.indexOf(t)<0&&e.push(t),this},nN.removeResizeListener=function(t){
var e=this._resizeListeners,n=e.indexOf(t);return n>=0&&e.splice(n,1),this
},nN.addSignalListener=function(t,e){return aN(this,t,rN(this,t),e)
},nN.removeSignalListener=function(t,e){return oN(this,rN(this,t),e)
},nN.addDataListener=function(t,e){return aN(this,t,EE(this,t).values,e)
},nN.removeDataListener=function(t,e){return oN(this,EE(this,t).values,e)
},nN.preventDefault=function(t){return arguments.length?(this._preventDefault=t,
this):this._preventDefault},nN.timer=function(t,e){
this._timers.push(function(t,e,n){var r=new Ow,i=e
;return null==e?(r.restart(t,e,n),
r):(e=+e,n=null==n?Aw():+n,r.restart((function a(o){
o+=i,r.restart(a,i+=e,n),t(o)}),e,n),r)}((function(e){t({timestamp:Date.now(),
elapsed:e})}),e))},nN.events=function(t,e,n){
var r,i=this,a=new Et(n),o=function(n,r){t===DE&&function(t,e){
var n=t._eventConfig.defaults,r=n&&n.prevent,i=n&&n.allow
;return!1!==r&&!0!==i&&(!0===r||!1===i||(r?r[e]:i?!i[e]:t.preventDefault()))
}(i,e)&&n.preventDefault();try{a.receive(zE(i,n,r))}catch(o){i.error(o)}finally{
i.run()}}
;if("timer"===t)i.timer(o,e);else if(t===DE)i.addEventListener(e,o,NE);else if("window"===t?"undefined"!=typeof window&&(r=[window]):"undefined"!=typeof document&&(r=document.querySelectorAll(t)),
r){for(var u=0,f=r.length;u<f;++u)r[u].addEventListener(e,o)
;i._eventListeners.push({type:e,sources:r,handler:o})
}else i.warn("Can not resolve event source: "+t);return a
},nN.finalize=function(){
var t,e,n,r=this._tooltip,i=this._timers,a=this._eventListeners
;for(t=i.length;--t>=0;)i[t].stop()
;for(t=a.length;--t>=0;)for(e=(n=a[t]).sources.length;--e>=0;)n.sources[e].removeEventListener(n.type,n.handler)
;return r&&r.call(this,this._handler,null,null,null),this
},nN.hover=function(t,e){
return e=[e||"update",(t=[t||"hover"])[0]],this.on(this.events("view","mouseover",RE),TE,PE(t)),
this.on(this.events("view","mouseout",RE),TE,PE(e)),this},nN.data=function(t){
return EE(this,t).values.value},nN.change=SE,nN.insert=function(t,e){
return SE.call(this,t,gt().insert(e))},nN.remove=function(t,e){
return SE.call(this,t,gt().remove(e))},nN.scale=function(t){
var e=this._runtime.scales
;return e.hasOwnProperty(t)||i("Unrecognized scale or projection: "+t),
e[t].value},nN.initialize=function(t,e){var n,r,i=this,a=i._renderType,o=Mc(a)
;return t=i._el=t?VE(i,t):null,
o||i.error("Unrecognized renderer type: "+a),n=o.handler||Ls,
r=t?o.renderer:o.headless,
i._renderer=r?GE(i,i._renderer,t,r):null,i._handler=function(t,e,n,r){
var i=new r(t.loader(),HE(t,t.tooltip())).scene(t.scenegraph().root).initialize(n,OE(t),t)
;return e&&e.handlers().forEach((function(t){i.on(t.type,t.handler)})),i
}(i,i._handler,t,n),i._redraw=!0,t&&(e=e?VE(i,e):t.appendChild(LE("div",{
class:"vega-bindings"})),i._bind.forEach((function(t){
t.param.element&&(t.element=VE(i,t.param.element))
})),i._bind.forEach((function(t){FE(i,t.element||e,t)}))),i
},nN.toImageURL=function(t,e){
return t!==xc.Canvas&&t!==xc.SVG&&t!==xc.PNG?Promise.reject("Unrecognized image type: "+t):XE(this,t,e).then((function(e){
return t===xc.SVG?function(t,e){var n=new Blob([t],{type:e})
;return window.URL.createObjectURL(n)
}(e.svg(),"image/svg+xml"):e.canvas().toDataURL("image/png")}))
},nN.toCanvas=function(t){return XE(this,xc.Canvas,t).then((function(t){
return t.canvas()}))},nN.toSVG=function(t){
return XE(this,xc.SVG,t).then((function(t){return t.svg()}))
},nN.getState=function(t){return this._runtime.getState(t||{data:JD,signals:ZD,
recurse:!0})},nN.setState=function(t){var e=this;return e.runAfter((function(){
e._trigger=!1,e._runtime.setState(t),e.run().runAfter((function(){e._trigger=!0
}))})),this
},U(Er,ba,ol,dm,Jx,Vw,ck,Qk,hE,wE),t.version="4.4.0",t.Dataflow=_r,t.EventStream=Et,
t.Parameters=mt,
t.Pulse=ur,t.MultiPulse=hr,t.Operator=xt,t.Transform=Mr,t.changeset=gt,
t.ingest=ct,
t.isTuple=ut,t.definition=Sr,t.transform=Ar,t.transforms=Er,t.tupleid=ft,
t.scale=Rp,t.scheme=wv,t.schemeDiscretized=function(t,e,n){
return arguments.length>1?(bv[t]=e,
_v[t]=n||ad(_(e)),this):bv.hasOwnProperty(t)?bv[t]:void 0
},t.interpolate=Fp,t.interpolateRange=Lp,
t.timeInterval=Ev,t.utcInterval=Sv,t.projection=jx,
t.View=eN,t.parse=function(t,e){
return u(t)||i("Input Vega specification must be an object."),
vD(t,new mD(MD([e,t.config]))).toRuntime()
},t.expressionFunction=eC,t.formatLocale=op,
t.timeFormatLocale=tr,t.runtime=FD,t.runtimeContext=ID,
t.bin=Lr,t.bootstrapCI=Kr,t.quartiles=ti,t.setRandom=function(e){t.random=e
},t.randomInteger=function(e,n){null==n&&(n=e,e=0);var r,i,a,o={}
;return o.min=function(t){return arguments.length?(a=i-(r=t||0),o):r
},o.max=function(t){return arguments.length?(a=(i=t||0)-r,o):i
},o.sample=function(){return r+Math.floor(a*t.random())},o.pdf=function(t){
return t===Math.floor(t)&&t>=r&&t<i?1/a:0},o.cdf=function(t){var e=Math.floor(t)
;return e<r?0:e>=i?1:(e-r+1)/a},o.icdf=function(t){
return t>=0&&t<=1?r-1+Math.floor(t*a):NaN},o.min(e).max(n)
},t.randomKDE=ni,t.randomMixture=ii,
t.randomNormal=ei,t.randomUniform=ai,t.accessor=e,
t.accessorName=n,t.accessorFields=r,
t.id=h,t.identity=d,t.zero=p,t.one=g,t.truthy=v,
t.falsy=m,t.logger=b,t.None=0,t.Error=1,
t.Warn=2,t.Info=3,t.Debug=4,t.panLinear=S,
t.panLog=A,t.panPow=C,t.zoomLinear=z,t.zoomLog=D,
t.zoomPow=N,t.array=R,t.compare=P,
t.constant=L,t.debounce=q,t.error=i,t.extend=U,
t.extentIndex=F,t.fastmap=I,t.field=c,
t.inherits=$,t.isArray=o,t.isBoolean=B,t.isDate=W,
t.isFunction=T,t.isNumber=Y,t.isObject=u,
t.isRegExp=G,t.isString=f,t.key=H,t.merge=V,
t.pad=J,t.peek=_,t.repeat=X,t.splitAccessPath=a,
t.stringValue=s,t.toBoolean=Z,t.toDate=K,
t.toNumber=x,t.toString=tt,t.toSet=et,t.truncate=nt,t.visitArray=rt,t.loader=zt,
t.read=nr,
t.inferType=jt,t.inferTypes=It,t.typeParsers=qt,t.format=ae,t.formats=oe,
t.Bounds=Ga,
t.Gradient=Ja,t.GroupItem=Qa,t.ResourceLoader=eo,t.Item=Za,t.Scenegraph=bs,
t.Handler=Cs,
t.Renderer=Ds,t.CanvasHandler=Ls,t.CanvasRenderer=Is,t.SVGHandler=Ys,
t.SVGRenderer=tc,
t.SVGStringRenderer=dc,t.RenderType=xc,t.renderModule=Mc,t.Marks=hs,
t.boundClip=Ec,t.boundContext=ff,t.boundStroke=nf,t.boundItem=ds,t.boundMark=gs,
t.pathCurves=bu,
t.pathSymbols=Tu,t.pathRectangle=Iu,t.pathTrail=Bu,t.pathParse=wu,
t.pathRender=Ou,
t.point=As,t.domCreate=ws,t.domFind=Ms,t.domChild=ks,t.domClear=Es,t.openTag=Vs,
t.closeTag=Xs,
t.font=us,t.fontFamily=os,t.fontSize=rs,t.textMetrics=Qf,t.resetSVGClipId=function(){
Nf=1
},t.sceneEqual=Sc,t.pathEqual=Ac,t.sceneToJSON=ms,t.sceneFromJSON=ys,t.sceneZOrder=vf,
t.sceneVisit=mf,t.scenePickVisit=yf,Object.defineProperty(t,"__esModule",{
value:!0})}));