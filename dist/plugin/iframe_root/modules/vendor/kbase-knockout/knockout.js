/*!
 * Knockout JavaScript library v3.5.1-beta7
 * (c) The Knockout.js team - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(e){
var t=this||(0,eval)("this"),n=t.document,i=t.navigator,r=t.jQuery,o=t.JSON
;r||"undefined"==typeof jQuery||(r=jQuery),function(e){
"function"==typeof define&&define.amd?define(["exports","require"],e):"object"==typeof exports&&"object"==typeof module?e(module.exports||exports):e(t.ko={})
}((function(s,a){var l=void 0!==s?s:{};l.exportSymbol=function(e,t){
for(var n=e.split("."),i=l,r=0;r<n.length-1;r++)i=i[n[r]];i[n[n.length-1]]=t
},l.exportProperty=function(e,t,n){e[t]=n
},l.version="3.5.1-beta7",l.exportSymbol("version",l.version),l.options={
deferUpdates:!1,useOnlyNativeEvents:!1,foreachHidesDestroyed:!1
},l.utils=function(){var s=Object.prototype.hasOwnProperty;function a(e,t){
for(var n in e)s.call(e,n)&&t(n,e[n])}function u(e,t){
if(t)for(var n in t)s.call(t,n)&&(e[n]=t[n]);return e}function d(e,t){
return e.__proto__=t,e}var c={__proto__:[]
}instanceof Array,p="function"==typeof Symbol,f={},m={}
;f[i&&/Firefox\/2/i.test(i.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"],
f.MouseEvents=["click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","mouseenter","mouseleave"],
a(f,(function(e,t){if(t.length)for(var n=0,i=t.length;n<i;n++)m[t[n]]=e}))
;var b,v={propertychange:!0},g=n&&function(){
for(var t=3,i=n.createElement("div"),r=i.getElementsByTagName("i");i.innerHTML="\x3c!--[if gt IE "+ ++t+"]><i></i><![endif]--\x3e",
r[0];);return t>4?t:e}(),h=6===g,y=7===g,x=/\S+/g;function E(e,t,n,i){
var r=e[t].match(x)||[];l.utils.arrayForEach(n.match(x),(function(e){
l.utils.addOrRemoveItem(r,e,i)})),e[t]=r.join(" ")}return{
fieldsIncludedWithJsonPost:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],
arrayForEach:function(e,t,n){for(var i=0,r=e.length;i<r;i++)t.call(n,e[i],i,e)},
arrayIndexOf:"function"==typeof Array.prototype.indexOf?function(e,t){
return Array.prototype.indexOf.call(e,t)}:function(e,t){
for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},
arrayFirst:function(t,n,i){
for(var r=0,o=t.length;r<o;r++)if(n.call(i,t[r],r,t))return t[r];return e},
arrayRemoveItem:function(e,t){var n=l.utils.arrayIndexOf(e,t)
;n>0?e.splice(n,1):0===n&&e.shift()},arrayGetDistinctValues:function(e){var t=[]
;return e&&l.utils.arrayForEach(e,(function(e){
l.utils.arrayIndexOf(t,e)<0&&t.push(e)})),t},arrayMap:function(e,t,n){var i=[]
;if(e)for(var r=0,o=e.length;r<o;r++)i.push(t.call(n,e[r],r));return i},
arrayFilter:function(e,t,n){var i=[]
;if(e)for(var r=0,o=e.length;r<o;r++)t.call(n,e[r],r)&&i.push(e[r]);return i},
arrayPushAll:function(e,t){
if(t instanceof Array)e.push.apply(e,t);else for(var n=0,i=t.length;n<i;n++)e.push(t[n])
;return e},addOrRemoveItem:function(e,t,n){
var i=l.utils.arrayIndexOf(l.utils.peekObservable(e),t)
;i<0?n&&e.push(t):n||e.splice(i,1)},canSetPrototype:c,extend:u,setPrototypeOf:d,
setPrototypeOfOrExtend:c?d:u,objectForEach:a,objectMap:function(e,t,n){
if(!e)return e;var i={};for(var r in e)s.call(e,r)&&(i[r]=t.call(n,e[r],r,e))
;return i},emptyDomNode:function(e){
for(;e.firstChild;)l.removeNode(e.firstChild)},
moveCleanedNodesToContainerElement:function(e){
for(var t=l.utils.makeArray(e),i=(t[0]&&t[0].ownerDocument||n).createElement("div"),r=0,o=t.length;r<o;r++)i.appendChild(l.cleanNode(t[r]))
;return i},cloneNodes:function(e,t){for(var n=0,i=e.length,r=[];n<i;n++){
var o=e[n].cloneNode(!0);r.push(t?l.cleanNode(o):o)}return r},
setDomNodeChildren:function(e,t){
if(l.utils.emptyDomNode(e),t)for(var n=0,i=t.length;n<i;n++)e.appendChild(t[n])
},replaceDomNodes:function(e,t){var n=e.nodeType?[e]:e;if(n.length>0){
for(var i=n[0],r=i.parentNode,o=0,s=t.length;o<s;o++)r.insertBefore(t[o],i)
;for(o=0,s=n.length;o<s;o++)l.removeNode(n[o])}},
fixUpContinuousNodeArray:function(e,t){if(e.length){
for(t=8===t.nodeType&&t.parentNode||t;e.length&&e[0].parentNode!==t;)e.splice(0,1)
;for(;e.length>1&&e[e.length-1].parentNode!==t;)e.length--;if(e.length>1){
var n=e[0],i=e[e.length-1];for(e.length=0;n!==i;)e.push(n),n=n.nextSibling
;e.push(i)}}return e},setOptionNodeSelectionState:function(e,t){
g<7?e.setAttribute("selected",t):e.selected=t},stringTrim:function(t){
return null===t||t===e?"":t.trim?t.trim():t.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")
},stringStartsWith:function(e,t){
return e=e||"",!(t.length>e.length)&&e.substring(0,t.length)===t},
domNodeIsContainedBy:function(e,t){if(e===t)return!0;if(11===e.nodeType)return!1
;if(t.contains)return t.contains(1!==e.nodeType?e.parentNode:e)
;if(t.compareDocumentPosition)return 16==(16&t.compareDocumentPosition(e))
;for(;e&&e!=t;)e=e.parentNode;return!!e},
domNodeIsAttachedToDocument:function(e){
return l.utils.domNodeIsContainedBy(e,e.ownerDocument.documentElement)},
anyDomNodeIsAttachedToDocument:function(e){
return!!l.utils.arrayFirst(e,l.utils.domNodeIsAttachedToDocument)},
tagNameLower:function(e){return e&&e.tagName&&e.tagName.toLowerCase()},
catchFunctionErrors:function(e){return l.onError?function(){try{
return e.apply(this,arguments)}catch(t){throw l.onError&&l.onError(t),t}}:e},
setTimeout:function(e,t){return setTimeout(l.utils.catchFunctionErrors(e),t)},
deferError:function(e){setTimeout((function(){throw l.onError&&l.onError(e),e
}),0)},registerEventHandler:function(e,t,n){
var i=l.utils.catchFunctionErrors(n),o=v[t]
;if(l.options.useOnlyNativeEvents||o||!r)if(o||"function"!=typeof e.addEventListener){
if(void 0===e.attachEvent)throw new Error("Browser doesn't support addEventListener or attachEvent")
;var s=function(t){i.call(e,t)},a="on"+t
;e.attachEvent(a,s),l.utils.domNodeDisposal.addDisposeCallback(e,(function(){
e.detachEvent(a,s)}))
}else e.addEventListener(t,i,!1);else b||(b="function"==typeof r(e).on?"on":"bind"),
r(e)[b](t,i)},triggerEvent:function(e,i){
if(!e||!e.nodeType)throw new Error("element must be a DOM node when calling triggerEvent")
;var o=function(e,t){if("input"!==l.utils.tagNameLower(e)||!e.type)return!1
;if("click"!=t.toLowerCase())return!1;var n=e.type
;return"checkbox"==n||"radio"==n}(e,i)
;if(l.options.useOnlyNativeEvents||!r||o)if("function"==typeof n.createEvent){
if("function"!=typeof e.dispatchEvent)throw new Error("The supplied element doesn't support dispatchEvent")
;var s=m[i]||"HTMLEvents",a=n.createEvent(s)
;a.initEvent(i,!0,!0,t,0,0,0,0,0,!1,!1,!1,!1,0,e),e.dispatchEvent(a)
}else if(o&&e.click)e.click();else{
if(void 0===e.fireEvent)throw new Error("Browser doesn't support triggering events")
;e.fireEvent("on"+i)}else r(e).trigger(i)},unwrapObservable:function(e){
return l.isObservable(e)?e():e},peekObservable:function(e){
return l.isObservable(e)?e.peek():e},toggleDomNodeCssClass:function(e,t,n){var i
;t&&("object"==typeof e.classList?(i=e.classList[n?"add":"remove"],
l.utils.arrayForEach(t.match(x),(function(t){i.call(e.classList,t)
}))):"string"==typeof e.className.baseVal?E(e.className,"baseVal",t,n):E(e,"className",t,n))
},setTextContent:function(t,n){var i=l.utils.unwrapObservable(n)
;null!==i&&i!==e||(i="");var r=l.virtualElements.firstChild(t)
;!r||3!=r.nodeType||l.virtualElements.nextSibling(r)?l.virtualElements.setDomNodeChildren(t,[t.ownerDocument.createTextNode(i)]):r.data=i,
l.utils.forceRefresh(t)},setElementName:function(e,t){if(e.name=t,g<=7)try{
var i=e.name.replace(/[&<>'"]/g,(function(e){return"&#"+e.charCodeAt(0)+";"}))
;e.mergeAttributes(n.createElement("<input name='"+i+"'/>"),!1)}catch(r){}},
forceRefresh:function(e){if(g>=9){var t=1==e.nodeType?e:e.parentNode
;t.style&&(t.style.zoom=t.style.zoom)}},
ensureSelectElementIsRenderedCorrectly:function(e){if(g){var t=e.style.width
;e.style.width=0,e.style.width=t}},range:function(e,t){
e=l.utils.unwrapObservable(e),t=l.utils.unwrapObservable(t)
;for(var n=[],i=e;i<=t;i++)n.push(i);return n},makeArray:function(e){
for(var t=[],n=0,i=e.length;n<i;n++)t.push(e[n]);return t},
createSymbolOrString:function(e){return p?Symbol(e):e},isIe6:h,isIe7:y,
ieVersion:g,getFormFields:function(e,t){
for(var n=l.utils.makeArray(e.getElementsByTagName("input")).concat(l.utils.makeArray(e.getElementsByTagName("textarea"))),i="string"==typeof t?function(e){
return e.name===t}:function(e){return t.test(e.name)
},r=[],o=n.length-1;o>=0;o--)i(n[o])&&r.push(n[o]);return r},
parseJson:function(e){
return"string"==typeof e&&(e=l.utils.stringTrim(e))?o&&o.parse?o.parse(e):new Function("return "+e)():null
},stringifyJson:function(e,t,n){
if(!o||!o.stringify)throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")
;return o.stringify(l.utils.unwrapObservable(e),t,n)},postJson:function(e,t,i){
var r=(i=i||{}).params||{},o=i.includeFields||this.fieldsIncludedWithJsonPost,s=e
;if("object"==typeof e&&"form"===l.utils.tagNameLower(e)){var u=e;s=u.action
;for(var d=o.length-1;d>=0;d--)for(var c=l.utils.getFormFields(u,o[d]),p=c.length-1;p>=0;p--)r[c[p].name]=c[p].value
}t=l.utils.unwrapObservable(t);var f=n.createElement("form")
;for(var m in f.style.display="none",f.action=s,f.method="post",t){
var b=n.createElement("input")
;b.type="hidden",b.name=m,b.value=l.utils.stringifyJson(l.utils.unwrapObservable(t[m])),
f.appendChild(b)}a(r,(function(e,t){var i=n.createElement("input")
;i.type="hidden",i.name=e,i.value=t,f.appendChild(i)
})),n.body.appendChild(f),i.submitter?i.submitter(f):f.submit(),
setTimeout((function(){f.parentNode.removeChild(f)}),0)}}
}(),l.exportSymbol("utils",l.utils),
l.exportSymbol("utils.arrayForEach",l.utils.arrayForEach),
l.exportSymbol("utils.arrayFirst",l.utils.arrayFirst),
l.exportSymbol("utils.arrayFilter",l.utils.arrayFilter),
l.exportSymbol("utils.arrayGetDistinctValues",l.utils.arrayGetDistinctValues),
l.exportSymbol("utils.arrayIndexOf",l.utils.arrayIndexOf),
l.exportSymbol("utils.arrayMap",l.utils.arrayMap),
l.exportSymbol("utils.arrayPushAll",l.utils.arrayPushAll),
l.exportSymbol("utils.arrayRemoveItem",l.utils.arrayRemoveItem),
l.exportSymbol("utils.cloneNodes",l.utils.cloneNodes),
l.exportSymbol("utils.createSymbolOrString",l.utils.createSymbolOrString),
l.exportSymbol("utils.extend",l.utils.extend),
l.exportSymbol("utils.fieldsIncludedWithJsonPost",l.utils.fieldsIncludedWithJsonPost),
l.exportSymbol("utils.getFormFields",l.utils.getFormFields),
l.exportSymbol("utils.objectMap",l.utils.objectMap),
l.exportSymbol("utils.peekObservable",l.utils.peekObservable),
l.exportSymbol("utils.postJson",l.utils.postJson),
l.exportSymbol("utils.parseJson",l.utils.parseJson),
l.exportSymbol("utils.registerEventHandler",l.utils.registerEventHandler),
l.exportSymbol("utils.stringifyJson",l.utils.stringifyJson),
l.exportSymbol("utils.range",l.utils.range),
l.exportSymbol("utils.toggleDomNodeCssClass",l.utils.toggleDomNodeCssClass),
l.exportSymbol("utils.triggerEvent",l.utils.triggerEvent),
l.exportSymbol("utils.unwrapObservable",l.utils.unwrapObservable),
l.exportSymbol("utils.objectForEach",l.utils.objectForEach),
l.exportSymbol("utils.addOrRemoveItem",l.utils.addOrRemoveItem),
l.exportSymbol("utils.setTextContent",l.utils.setTextContent),
l.exportSymbol("unwrap",l.utils.unwrapObservable),
Function.prototype.bind||(Function.prototype.bind=function(e){var t=this
;if(1===arguments.length)return function(){return t.apply(e,arguments)}
;var n=Array.prototype.slice.call(arguments,1);return function(){
var i=n.slice(0);return i.push.apply(i,arguments),t.apply(e,i)}
}),l.utils.domData=new function(){
var t,n,i=0,r="__ko__"+(new Date).getTime(),o={}
;return l.utils.ieVersion?(t=function(t,n){var s=t[r];if(!s||"null"===s||!o[s]){
if(!n)return e;s=t[r]="ko"+i++,o[s]={}}return o[s]},n=function(e){var t=e[r]
;return!!t&&(delete o[t],e[r]=null,!0)}):(t=function(e,t){var n=e[r]
;return!n&&t&&(n=e[r]={}),n},n=function(e){return!!e[r]&&(delete e[r],!0)}),{
get:function(e,n){var i=t(e,!1);return i&&i[n]},set:function(n,i,r){
var o=t(n,r!==e);o&&(o[i]=r)},getOrSet:function(e,n,i){var r=t(e,!0)
;return r[n]||(r[n]=i)},clear:n,nextKey:function(){return i+++r}}
},l.exportSymbol("utils.domData",l.utils.domData),
l.exportSymbol("utils.domData.clear",l.utils.domData.clear),
l.utils.domNodeDisposal=new function(){var t=l.utils.domData.nextKey(),n={1:!0,
8:!0,9:!0},i={1:!0,9:!0};function o(n,i){var r=l.utils.domData.get(n,t)
;return r===e&&i&&(r=[],l.utils.domData.set(n,t,r)),r}function s(e){
var t=o(e,!1);if(t){t=t.slice(0);for(var n=0;n<t.length;n++)t[n](e)}
l.utils.domData.clear(e),
l.utils.domNodeDisposal.cleanExternalData(e),i[e.nodeType]&&a(e.childNodes,!0)}
function a(e,t){
for(var n,i=[],r=0;r<e.length;r++)if((!t||8===e[r].nodeType)&&(s(i[i.length]=n=e[r]),
e[r]!==n))for(;r--&&-1==l.utils.arrayIndexOf(i,e[r]););}return{
addDisposeCallback:function(e,t){
if("function"!=typeof t)throw new Error("Callback must be a function")
;o(e,!0).push(t)},removeDisposeCallback:function(n,i){var r=o(n,!1)
;r&&(l.utils.arrayRemoveItem(r,i),0==r.length&&function(n){
l.utils.domData.set(n,t,e)}(n))},cleanNode:function(e){
return n[e.nodeType]&&(s(e),i[e.nodeType]&&a(e.getElementsByTagName("*"))),e},
removeNode:function(e){l.cleanNode(e),e.parentNode&&e.parentNode.removeChild(e)
},cleanExternalData:function(e){
r&&"function"==typeof r.cleanData&&r.cleanData([e])}}
},l.cleanNode=l.utils.domNodeDisposal.cleanNode,
l.removeNode=l.utils.domNodeDisposal.removeNode,
l.exportSymbol("cleanNode",l.cleanNode),
l.exportSymbol("removeNode",l.removeNode),
l.exportSymbol("utils.domNodeDisposal",l.utils.domNodeDisposal),
l.exportSymbol("utils.domNodeDisposal.addDisposeCallback",l.utils.domNodeDisposal.addDisposeCallback),
l.exportSymbol("utils.domNodeDisposal.removeDisposeCallback",l.utils.domNodeDisposal.removeDisposeCallback),
function(){
var i=[0,"",""],o=[1,"<table>","</table>"],s=[3,"<table><tbody><tr>","</tr></tbody></table>"],a=[1,"<select multiple='multiple'>","</select>"],u={
thead:o,tbody:o,tfoot:o,tr:[2,"<table><tbody>","</tbody></table>"],td:s,th:s,
option:a,optgroup:a},d=l.utils.ieVersion<=8;function c(e,r){r||(r=n)
;var o=r.parentWindow||r.defaultView||t,s=l.utils.stringTrim(e).toLowerCase(),a=r.createElement("div"),c=function(e){
var t=e.match(/^(?:<!--.*?-->\s*?)*?<([a-z]+)[\s>]/);return t&&u[t[1]]||i
}(s),p=c[0],f="ignored<div>"+c[1]+e+c[2]+"</div>"
;for("function"==typeof o.innerShiv?a.appendChild(o.innerShiv(f)):(d&&r.body.appendChild(a),
a.innerHTML=f,d&&a.parentNode.removeChild(a));p--;)a=a.lastChild
;return l.utils.makeArray(a.lastChild.childNodes)}
l.utils.parseHtmlFragment=function(e,t){return r?function(e,t){
if(r.parseHTML)return r.parseHTML(e,t)||[];var n=r.clean([e],t);if(n&&n[0]){
for(var i=n[0];i.parentNode&&11!==i.parentNode.nodeType;)i=i.parentNode
;i.parentNode&&i.parentNode.removeChild(i)}return n}(e,t):c(e,t)
},l.utils.parseHtmlForTemplateNodes=function(e,t){
var n=l.utils.parseHtmlFragment(e,t)
;return n.length&&n[0].parentElement||l.utils.moveCleanedNodesToContainerElement(n)
},l.utils.setHtml=function(t,n){
if(l.utils.emptyDomNode(t),null!==(n=l.utils.unwrapObservable(n))&&n!==e)if("string"!=typeof n&&(n=n.toString()),
r)r(t).html(n);else for(var i=l.utils.parseHtmlFragment(n,t.ownerDocument),o=0;o<i.length;o++)t.appendChild(i[o])
}
}(),l.exportSymbol("utils.parseHtmlFragment",l.utils.parseHtmlFragment),l.exportSymbol("utils.setHtml",l.utils.setHtml),
l.memoization=function(){var t={};function n(){
return(4294967296*(1+Math.random())|0).toString(16).substring(1)}return{
memoize:function(e){
if("function"!=typeof e)throw new Error("You can only pass a function to ko.memoization.memoize()")
;var i=n()+n();return t[i]=e,"\x3c!--[ko_memo:"+i+"]--\x3e"},
unmemoize:function(n,i){var r=t[n]
;if(r===e)throw new Error("Couldn't find any memo with ID "+n+". Perhaps it's already been unmemoized.")
;try{return r.apply(null,i||[]),!0}finally{delete t[n]}},
unmemoizeDomNodeAndDescendants:function(e,t){var n=[];!function e(t,n){
if(t)if(8==t.nodeType){var i=l.memoization.parseMemoText(t.nodeValue)
;null!=i&&n.push({domNode:t,memoId:i})
}else if(1==t.nodeType)for(var r=0,o=t.childNodes,s=o.length;r<s;r++)e(o[r],n)
}(e,n);for(var i=0,r=n.length;i<r;i++){var o=n[i].domNode,s=[o]
;t&&l.utils.arrayPushAll(s,t),
l.memoization.unmemoize(n[i].memoId,s),o.nodeValue="",
o.parentNode&&o.parentNode.removeChild(o)}},parseMemoText:function(e){
var t=e.match(/^\[ko_memo\:(.*?)\]$/);return t?t[1]:null}}
}(),l.exportSymbol("memoization",l.memoization),
l.exportSymbol("memoization.memoize",l.memoization.memoize),
l.exportSymbol("memoization.unmemoize",l.memoization.unmemoize),
l.exportSymbol("memoization.parseMemoText",l.memoization.parseMemoText),
l.exportSymbol("memoization.unmemoizeDomNodeAndDescendants",l.memoization.unmemoizeDomNodeAndDescendants),
l.tasks=function(){var e=[],i=0,r=1,o=0;function s(){
if(i)for(var t,n=i,r=0;o<i;)if(t=e[o++]){if(o>n){if(++r>=5e3){
o=i,l.utils.deferError(Error("'Too much recursion' after processing "+r+" task groups."))
;break}n=i}try{t()}catch(s){l.utils.deferError(s)}}}function a(){
s(),o=i=e.length=0}return{scheduler:t.MutationObserver?function(e){
var t=n.createElement("div");return new MutationObserver(e).observe(t,{
attributes:!0}),function(){t.classList.toggle("foo")}
}(a):n&&"onreadystatechange"in n.createElement("script")?function(e){
var t=n.createElement("script");t.onreadystatechange=function(){
t.onreadystatechange=null,n.documentElement.removeChild(t),t=null,e()
},n.documentElement.appendChild(t)}:function(e){setTimeout(e,0)},
schedule:function(t){return i||l.tasks.scheduler(a),e[i++]=t,r++},
cancel:function(t){var n=t-(r-i);n>=o&&n<i&&(e[n]=null)},
resetForTesting:function(){var t=i-o;return o=i=e.length=0,t},runEarly:s}
}(),l.exportSymbol("tasks",l.tasks),
l.exportSymbol("tasks.schedule",l.tasks.schedule),
l.exportSymbol("tasks.runEarly",l.tasks.runEarly),l.extenders={
throttle:function(e,t){e.throttleEvaluation=t;var n=null
;return l.dependentObservable({read:e,write:function(i){
clearTimeout(n),n=l.utils.setTimeout((function(){e(i)}),t)}})},
rateLimit:function(e,t){var n,i,r
;"number"==typeof t?n=t:(n=t.timeout,i=t.method),
e._deferUpdates=!1,r="function"==typeof i?i:"notifyWhenChangesStop"==i?p:c,
e.limit((function(e){return r(e,n,t)}))},deferred:function(t,n){
if(!0!==n)throw new Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.")
;t._deferUpdates||(t._deferUpdates=!0,t.limit((function(n){var i,r=!1
;return function(){if(!r){l.tasks.cancel(i),i=l.tasks.schedule(n);try{
r=!0,t.notifySubscribers(e,"dirty")}finally{r=!1}}}})))},notify:function(e,t){
e.equalityComparer="always"==t?null:d}};var u={undefined:1,boolean:1,number:1,
string:1};function d(e,t){return!(null!==e&&!(typeof e in u))&&e===t}
function c(t,n){var i;return function(){i||(i=l.utils.setTimeout((function(){
i=e,t()}),n))}}function p(e,t){var n;return function(){
clearTimeout(n),n=l.utils.setTimeout(e,t)}}
l.exportSymbol("extenders",l.extenders),l.subscription=function(e,t,n){
this._target=e,
this._callback=t,this._disposeCallback=n,this._isDisposed=!1,this._node=null,
this._domNodeDisposalCallback=null,
l.exportProperty(this,"dispose",this.dispose),
l.exportProperty(this,"disposeWhenNodeIsRemoved",this.disposeWhenNodeIsRemoved)
},l.subscription.prototype.dispose=function(){
this._domNodeDisposalCallback&&l.utils.domNodeDisposal.removeDisposeCallback(this._node,this._domNodeDisposalCallback),
this._isDisposed=!0,this._disposeCallback()
},l.subscription.prototype.disposeWhenNodeIsRemoved=function(e){
this._node=e,l.utils.domNodeDisposal.addDisposeCallback(e,this._domNodeDisposalCallback=this.dispose.bind(this))
},l.subscribable=function(){l.utils.setPrototypeOfOrExtend(this,b),b.init(this)}
;var f="change";function m(e,t){
t&&t!==f?"beforeChange"===t?this._limitBeforeChange(e):this._origNotifySubscribers(e,t):this._limitChange(e)
}var b={init:function(e){e._subscriptions={change:[]},e._versionNumber=1},
subscribe:function(e,t,n){var i=this;n=n||f
;var r=t?e.bind(t):e,o=new l.subscription(i,r,(function(){
l.utils.arrayRemoveItem(i._subscriptions[n],o),
i.afterSubscriptionRemove&&i.afterSubscriptionRemove(n)}))
;return i.beforeSubscriptionAdd&&i.beforeSubscriptionAdd(n),
i._subscriptions[n]||(i._subscriptions[n]=[]),i._subscriptions[n].push(o),o},
notifySubscribers:function(e,t){
if((t=t||f)===f&&this.updateVersion(),this.hasSubscriptionsForEvent(t)){
var n=t===f&&this._changeSubscriptions||this._subscriptions[t].slice(0);try{
l.dependencyDetection.begin()
;for(var i,r=0;i=n[r];++r)i._isDisposed||i._callback(e)}finally{
l.dependencyDetection.end()}}},getVersion:function(){return this._versionNumber
},hasChanged:function(e){return this.getVersion()!==e},updateVersion:function(){
++this._versionNumber},limit:function(e){
var t,n,i,r,o,s=this,a=l.isObservable(s)
;s._origNotifySubscribers||(s._origNotifySubscribers=s.notifySubscribers,
s.notifySubscribers=m);var u=e((function(){
s._notificationIsPending=!1,a&&r===s&&(r=s._evalIfChanged?s._evalIfChanged():s())
;var e=n||o&&s.isDifferent(i,r);o=n=t=!1,e&&s._origNotifySubscribers(i=r)}))
;s._limitChange=function(e,n){
n&&s._notificationIsPending||(o=!n),s._changeSubscriptions=s._subscriptions.change.slice(0),
s._notificationIsPending=t=!0,r=e,u()},s._limitBeforeChange=function(e){t||(i=e,
s._origNotifySubscribers(e,"beforeChange"))},s._recordUpdate=function(){o=!0
},s._notifyNextChangeIfValueIsDifferent=function(){
s.isDifferent(i,s.peek(!0))&&(n=!0)}},hasSubscriptionsForEvent:function(e){
return this._subscriptions[e]&&this._subscriptions[e].length},
getSubscriptionsCount:function(e){
if(e)return this._subscriptions[e]&&this._subscriptions[e].length||0;var t=0
;return l.utils.objectForEach(this._subscriptions,(function(e,n){
"dirty"!==e&&(t+=n.length)})),t},isDifferent:function(e,t){
return!this.equalityComparer||!this.equalityComparer(e,t)},toString:function(){
return"[object Object]"},extend:function(e){var t=this
;return e&&l.utils.objectForEach(e,(function(e,n){var i=l.extenders[e]
;"function"==typeof i&&(t=i(t,n)||t)})),t}}
;l.exportProperty(b,"init",b.init),l.exportProperty(b,"subscribe",b.subscribe),
l.exportProperty(b,"extend",b.extend),
l.exportProperty(b,"getSubscriptionsCount",b.getSubscriptionsCount),
l.utils.canSetPrototype&&l.utils.setPrototypeOf(b,Function.prototype),
l.subscribable.fn=b,l.isSubscribable=function(e){
return null!=e&&"function"==typeof e.subscribe&&"function"==typeof e.notifySubscribers
},
l.exportSymbol("subscribable",l.subscribable),l.exportSymbol("isSubscribable",l.isSubscribable),
l.computedContext=l.dependencyDetection=function(){var e,t=[],n=0;function i(n){
t.push(e),e=n}function r(){e=t.pop()}return{begin:i,end:r,
registerDependency:function(t){if(e){
if(!l.isSubscribable(t))throw new Error("Only subscribable things can act as dependencies")
;e.callback.call(e.callbackTarget,t,t._id||(t._id=++n))}},
ignore:function(e,t,n){try{return i(),e.apply(t,n||[])}finally{r()}},
getDependenciesCount:function(){if(e)return e.computed.getDependenciesCount()},
getDependencies:function(){if(e)return e.computed.getDependencies()},
isInitial:function(){if(e)return e.isInitial}}
}(),l.exportSymbol("computedContext",l.computedContext),
l.exportSymbol("computedContext.getDependenciesCount",l.computedContext.getDependenciesCount),
l.exportSymbol("computedContext.getDependencies",l.computedContext.getDependencies),
l.exportSymbol("computedContext.isInitial",l.computedContext.isInitial),
l.exportSymbol("computedContext.registerDependency",l.computedContext.registerDependency),
l.exportSymbol("ignoreDependencies",l.ignoreDependencies=l.dependencyDetection.ignore)
;var v=l.utils.createSymbolOrString("_latestValue");l.observable=function(e){
function t(){
return arguments.length>0?(t.isDifferent(t[v],arguments[0])&&(t.valueWillMutate(),
t[v]=arguments[0],
t.valueHasMutated()),this):(l.dependencyDetection.registerDependency(t),t[v])}
return t[v]=e,
l.utils.canSetPrototype||l.utils.extend(t,l.subscribable.fn),l.subscribable.fn.init(t),
l.utils.setPrototypeOfOrExtend(t,g),
l.options.deferUpdates&&l.extenders.deferred(t,!0),t};var g={equalityComparer:d,
peek:function(){return this[v]},valueHasMutated:function(){
this.notifySubscribers(this[v],"spectate"),this.notifySubscribers(this[v])},
valueWillMutate:function(){this.notifySubscribers(this[v],"beforeChange")}}
;l.utils.canSetPrototype&&l.utils.setPrototypeOf(g,l.subscribable.fn)
;var h=l.observable.protoProperty="__ko_proto__"
;g[h]=l.observable,l.isObservable=function(e){var t="function"==typeof e&&e[h]
;if(t&&t!==g[h]&&t!==l.computed.fn[h])throw Error("Invalid object that looks like an observable; possibly from another Knockout instance")
;return!!t},l.isWriteableObservable=function(e){
return"function"==typeof e&&(e[h]===g[h]||e[h]===l.computed.fn[h]&&e.hasWriteFunction)
},
l.exportSymbol("observable",l.observable),l.exportSymbol("isObservable",l.isObservable),
l.exportSymbol("isWriteableObservable",l.isWriteableObservable),
l.exportSymbol("isWritableObservable",l.isWriteableObservable),
l.exportSymbol("observable.fn",g),
l.exportProperty(g,"peek",g.peek),l.exportProperty(g,"valueHasMutated",g.valueHasMutated),
l.exportProperty(g,"valueWillMutate",g.valueWillMutate),
l.observableArray=function(e){
if("object"!=typeof(e=e||[])||!("length"in e))throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.")
;var t=l.observable(e)
;return l.utils.setPrototypeOfOrExtend(t,l.observableArray.fn),t.extend({
trackArrayChanges:!0})},l.observableArray.fn={remove:function(e){
for(var t=this.peek(),n=[],i="function"!=typeof e||l.isObservable(e)?function(t){
return t===e}:e,r=0;r<t.length;r++){var o=t[r];if(i(o)){
if(0===n.length&&this.valueWillMutate(),
t[r]!==o)throw Error("Array modified during remove; cannot remove item")
;n.push(o),t.splice(r,1),r--}}return n.length&&this.valueHasMutated(),n},
removeAll:function(t){if(t===e){var n=this.peek(),i=n.slice(0)
;return this.valueWillMutate(),n.splice(0,n.length),this.valueHasMutated(),i}
return t?this.remove((function(e){return l.utils.arrayIndexOf(t,e)>=0})):[]},
destroy:function(e){
var t=this.peek(),n="function"!=typeof e||l.isObservable(e)?function(t){
return t===e}:e;this.valueWillMutate();for(var i=t.length-1;i>=0;i--){var r=t[i]
;n(r)&&(r._destroy=!0)}this.valueHasMutated()},destroyAll:function(t){
return t===e?this.destroy((function(){return!0})):t?this.destroy((function(e){
return l.utils.arrayIndexOf(t,e)>=0})):[]},indexOf:function(e){var t=this()
;return l.utils.arrayIndexOf(t,e)},replace:function(e,t){var n=this.indexOf(e)
;n>=0&&(this.valueWillMutate(),this.peek()[n]=t,this.valueHasMutated())},
sorted:function(e){var t=this().slice(0);return e?t.sort(e):t.sort()},
reversed:function(){return this().slice(0).reverse()}
},l.utils.canSetPrototype&&l.utils.setPrototypeOf(l.observableArray.fn,l.observable.fn),
l.utils.arrayForEach(["pop","push","reverse","shift","sort","splice","unshift"],(function(e){
l.observableArray.fn[e]=function(){var t=this.peek()
;this.valueWillMutate(),this.cacheDiffForKnownOperation(t,e,arguments)
;var n=t[e].apply(t,arguments);return this.valueHasMutated(),n===t?this:n}
})),l.utils.arrayForEach(["slice"],(function(e){
l.observableArray.fn[e]=function(){var t=this();return t[e].apply(t,arguments)}
})),l.isObservableArray=function(e){
return l.isObservable(e)&&"function"==typeof e.remove&&"function"==typeof e.push
},
l.exportSymbol("observableArray",l.observableArray),l.exportSymbol("isObservableArray",l.isObservableArray)
;var y="arrayChange";l.extenders.trackArrayChanges=function(t,n){
if(t.compareArrayOptions={},
n&&"object"==typeof n&&l.utils.extend(t.compareArrayOptions,n),
t.compareArrayOptions.sparse=!0,!t.cacheDiffForKnownOperation){
var i,r,o=!1,s=null,a=0,u=t.beforeSubscriptionAdd,d=t.afterSubscriptionRemove
;t.beforeSubscriptionAdd=function(e){u&&u.call(t,e),e===y&&function(){if(!o){
o=!0,r=t.notifySubscribers,t.notifySubscribers=function(e,t){
return t&&t!==f||++a,r.apply(this,arguments)};var e=[].concat(t.peek()||[])
;s=null,i=t.subscribe((function(n){
if(n=[].concat(n||[]),t.hasSubscriptionsForEvent(y))var i=function(e,n){
return(!s||a>1)&&(s=l.utils.compareArrays(e,n,t.compareArrayOptions)),s}(e,n)
;e=n,s=null,a=0,i&&i.length&&t.notifySubscribers(i,y)}))}}()
},t.afterSubscriptionRemove=function(n){
d&&d.call(t,n),n!==y||t.hasSubscriptionsForEvent(y)||(r&&(t.notifySubscribers=r,
r=e),i&&i.dispose(),i=null,o=!1)},t.cacheDiffForKnownOperation=function(e,t,n){
if(o&&!a){var i=[],r=e.length,u=n.length,d=0;switch(t){case"push":d=r
;case"unshift":for(var c=0;c<u;c++)y("added",n[c],d+c);break;case"pop":d=r-1
;case"shift":r&&y("deleted",e[d],d);break;case"splice":
for(var p=Math.min(Math.max(0,n[0]<0?r+n[0]:n[0]),r),f=1===u?r:Math.min(p+(n[1]||0),r),m=p+u-2,b=Math.max(f,m),v=[],g=[],h=(c=p,
2);c<b;++c,++h)c<f&&g.push(y("deleted",e[c],c)),c<m&&v.push(y("added",n[h],c))
;l.utils.findMovesInArrayComparison(g,v);break;default:return}s=i}
function y(e,t,n){return i[i.length]={status:e,value:t,index:n}}}}}
;var x=l.utils.createSymbolOrString("_state");function E(e,t){
null!==t&&t.dispose&&t.dispose()}function w(e,t){
var n=this.computedObservable,i=n[x]
;i.isDisposed||(this.disposalCount&&this.disposalCandidates[t]?(n.addDependencyTracking(t,e,this.disposalCandidates[t]),
this.disposalCandidates[t]=null,
--this.disposalCount):i.dependencyTracking[t]||n.addDependencyTracking(t,e,i.isSleeping?{
_target:e
}:n.subscribeToDependency(e)),e._notificationIsPending&&e._notifyNextChangeIfValueIsDifferent())
}l.computed=l.dependentObservable=function(t,n,i){
if("object"==typeof t?i=t:(i=i||{},
t&&(i.read=t)),"function"!=typeof i.read)throw Error("Pass a function that returns the value of the ko.computed")
;var r=i.write,o={latestValue:e,isStale:!0,isDirty:!0,isBeingEvaluated:!1,
suppressDisposalUntilDisposeWhenReturnsFalse:!1,isDisposed:!1,pure:!1,
isSleeping:!1,readFunction:i.read,evaluatorFunctionTarget:n||i.owner,
disposeWhenNodeIsRemoved:i.disposeWhenNodeIsRemoved||i.disposeWhenNodeIsRemoved||null,
disposeWhen:i.disposeWhen||i.disposeWhen,domNodeDisposalCallback:null,
dependencyTracking:{},dependenciesCount:0,evaluationTimeoutInstance:null}
;function s(){if(arguments.length>0){
if("function"!=typeof r)throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")
;return r.apply(o.evaluatorFunctionTarget,arguments),this}
return o.isDisposed||l.dependencyDetection.registerDependency(s),
(o.isDirty||o.isSleeping&&s.haveDependenciesChanged())&&s.evaluateImmediate(),
o.latestValue}
return s[x]=o,s.hasWriteFunction="function"==typeof r,l.utils.canSetPrototype||l.utils.extend(s,l.subscribable.fn),
l.subscribable.fn.init(s),l.utils.setPrototypeOfOrExtend(s,C),i.pure?(o.pure=!0,
o.isSleeping=!0,
l.utils.extend(s,S)):i.deferEvaluation&&l.utils.extend(s,D),l.options.deferUpdates&&l.extenders.deferred(s,!0),
o.disposeWhenNodeIsRemoved&&(o.suppressDisposalUntilDisposeWhenReturnsFalse=!0,
o.disposeWhenNodeIsRemoved.nodeType||(o.disposeWhenNodeIsRemoved=null)),
o.isSleeping||i.deferEvaluation||s.evaluateImmediate(),
o.disposeWhenNodeIsRemoved&&s.isActive()&&l.utils.domNodeDisposal.addDisposeCallback(o.disposeWhenNodeIsRemoved,o.domNodeDisposalCallback=function(){
s.dispose()}),s};var C={equalityComparer:d,getDependenciesCount:function(){
return this[x].dependenciesCount},getDependencies:function(){
var e=this[x].dependencyTracking,t=[]
;return l.utils.objectForEach(e,(function(e,n){t[n._order]=n._target})),t},
addDependencyTracking:function(e,t,n){
if(this[x].pure&&t===this)throw Error("A 'pure' computed must not be called recursively")
;this[x].dependencyTracking[e]=n,
n._order=this[x].dependenciesCount++,n._version=t.getVersion()},
haveDependenciesChanged:function(){var e,t,n=this[x].dependencyTracking
;for(e in n)if(Object.prototype.hasOwnProperty.call(n,e)&&(t=n[e],
this._evalDelayed&&t._target._notificationIsPending||t._target.hasChanged(t._version)))return!0
},markDirty:function(){
this._evalDelayed&&!this[x].isBeingEvaluated&&this._evalDelayed(!1)},
isActive:function(){var e=this[x];return e.isDirty||e.dependenciesCount>0},
respondToChange:function(){
this._notificationIsPending?this[x].isDirty&&(this[x].isStale=!0):this.evaluatePossiblyAsync()
},subscribeToDependency:function(e){if(e._deferUpdates){
var t=e.subscribe(this.markDirty,this,"dirty"),n=e.subscribe(this.respondToChange,this)
;return{_target:e,dispose:function(){t.dispose(),n.dispose()}}}
return e.subscribe(this.evaluatePossiblyAsync,this)},
evaluatePossiblyAsync:function(){var e=this,t=e.throttleEvaluation
;t&&t>=0?(clearTimeout(this[x].evaluationTimeoutInstance),
this[x].evaluationTimeoutInstance=l.utils.setTimeout((function(){
e.evaluateImmediate(!0)
}),t)):e._evalDelayed?e._evalDelayed(!0):e.evaluateImmediate(!0)},
evaluateImmediate:function(e){var t=this[x],n=t.disposeWhen,i=!1
;if(!t.isBeingEvaluated&&!t.isDisposed){
if(t.disposeWhenNodeIsRemoved&&!l.utils.domNodeIsAttachedToDocument(t.disposeWhenNodeIsRemoved)||n&&n()){
if(!t.suppressDisposalUntilDisposeWhenReturnsFalse)return void this.dispose()
}else t.suppressDisposalUntilDisposeWhenReturnsFalse=!1;t.isBeingEvaluated=!0
;try{i=this.evaluateImmediate_CallReadWithDependencyDetection(e)}finally{
t.isBeingEvaluated=!1}return i}},
evaluateImmediate_CallReadWithDependencyDetection:function(t){
var n=this,i=n[x],r=!1,o=i.pure?e:!i.dependenciesCount,s={computedObservable:n,
disposalCandidates:i.dependencyTracking,disposalCount:i.dependenciesCount}
;l.dependencyDetection.begin({callbackTarget:s,callback:w,computed:n,isInitial:o
}),i.dependencyTracking={},i.dependenciesCount=0
;var a=this.evaluateImmediate_CallReadThenEndDependencyDetection(i,s)
;return i.dependenciesCount?r=n.isDifferent(i.latestValue,a):(n.dispose(),r=!0),
r&&(i.isSleeping?n.updateVersion():n.notifySubscribers(i.latestValue,"beforeChange"),
i.latestValue=a,
n.notifySubscribers(i.latestValue,"spectate"),!i.isSleeping&&t&&n.notifySubscribers(i.latestValue),
n._recordUpdate&&n._recordUpdate()),
o&&n.notifySubscribers(i.latestValue,"awake"),r},
evaluateImmediate_CallReadThenEndDependencyDetection:function(e,t){try{
var n=e.readFunction
;return e.evaluatorFunctionTarget?n.call(e.evaluatorFunctionTarget):n()}finally{
l.dependencyDetection.end(),
t.disposalCount&&!e.isSleeping&&l.utils.objectForEach(t.disposalCandidates,E),
e.isStale=e.isDirty=!1}},peek:function(e){var t=this[x]
;return(t.isDirty&&(e||!t.dependenciesCount)||t.isSleeping&&this.haveDependenciesChanged())&&this.evaluateImmediate(),
t.latestValue},limit:function(e){
l.subscribable.fn.limit.call(this,e),this._evalIfChanged=function(){
return this[x].isSleeping||(this[x].isStale?this.evaluateImmediate():this[x].isDirty=!1),
this[x].latestValue},this._evalDelayed=function(e){
this._limitBeforeChange(this[x].latestValue),
this[x].isDirty=!0,e&&(this[x].isStale=!0),this._limitChange(this,!e)}},
dispose:function(){var t=this[x]
;!t.isSleeping&&t.dependencyTracking&&l.utils.objectForEach(t.dependencyTracking,(function(e,t){
t.dispose&&t.dispose()
})),t.disposeWhenNodeIsRemoved&&t.domNodeDisposalCallback&&l.utils.domNodeDisposal.removeDisposeCallback(t.disposeWhenNodeIsRemoved,t.domNodeDisposalCallback),
t.dependencyTracking=e,
t.dependenciesCount=0,t.isDisposed=!0,t.isStale=!1,t.isDirty=!1,t.isSleeping=!1,
t.disposeWhenNodeIsRemoved=e,
t.disposeWhen=e,t.readFunction=e,this.hasWriteFunction||(t.evaluatorFunctionTarget=e)
}},S={beforeSubscriptionAdd:function(e){var t=this,n=t[x]
;if(!n.isDisposed&&n.isSleeping&&"change"==e){
if(n.isSleeping=!1,n.isStale||t.haveDependenciesChanged())n.dependencyTracking=null,
n.dependenciesCount=0,t.evaluateImmediate()&&t.updateVersion();else{var i=[]
;l.utils.objectForEach(n.dependencyTracking,(function(e,t){i[t._order]=e
})),l.utils.arrayForEach(i,(function(e,i){
var r=n.dependencyTracking[e],o=t.subscribeToDependency(r._target)
;o._order=i,o._version=r._version,n.dependencyTracking[e]=o
})),t.haveDependenciesChanged()&&t.evaluateImmediate()&&t.updateVersion()}
n.isDisposed||t.notifySubscribers(n.latestValue,"awake")}},
afterSubscriptionRemove:function(t){var n=this[x]
;n.isDisposed||"change"!=t||this.hasSubscriptionsForEvent("change")||(l.utils.objectForEach(n.dependencyTracking,(function(e,t){
t.dispose&&(n.dependencyTracking[e]={_target:t._target,_order:t._order,
_version:t._version},t.dispose())
})),n.isSleeping=!0,this.notifySubscribers(e,"asleep"))},getVersion:function(){
var e=this[x]
;return e.isSleeping&&(e.isStale||this.haveDependenciesChanged())&&this.evaluateImmediate(),
l.subscribable.fn.getVersion.call(this)}},D={beforeSubscriptionAdd:function(e){
"change"!=e&&"beforeChange"!=e||this.peek()}}
;l.utils.canSetPrototype&&l.utils.setPrototypeOf(C,l.subscribable.fn)
;var N=l.observable.protoProperty;C[N]=l.computed,l.isComputed=function(e){
return"function"==typeof e&&e[N]===C[N]},l.isPureComputed=function(e){
return l.isComputed(e)&&e[x]&&e[x].pure
},l.exportSymbol("computed",l.computed),l.exportSymbol("dependentObservable",l.computed),
l.exportSymbol("isComputed",l.isComputed),
l.exportSymbol("isPureComputed",l.isPureComputed),
l.exportSymbol("computed.fn",C),
l.exportProperty(C,"peek",C.peek),l.exportProperty(C,"dispose",C.dispose),
l.exportProperty(C,"isActive",C.isActive),
l.exportProperty(C,"getDependenciesCount",C.getDependenciesCount),
l.exportProperty(C,"getDependencies",C.getDependencies),
l.pureComputed=function(e,t){return"function"==typeof e?l.computed(e,t,{pure:!0
}):((e=l.utils.extend({},e)).pure=!0,l.computed(e,t))
},l.exportSymbol("pureComputed",l.pureComputed),function(){function t(i,r,o){
if(o=o||new n,
"object"!=typeof(i=r(i))||null===i||i===e||i instanceof RegExp||i instanceof Date||i instanceof String||i instanceof Number||i instanceof Boolean)return i
;var s=i instanceof Array?[]:{};return o.save(i,s),function(e,t){
if(e instanceof Array){for(var n=0;n<e.length;n++)t(n)
;"function"==typeof e.toJSON&&t("toJSON")}else for(var i in e)t(i)
}(i,(function(n){var a=r(i[n]);switch(typeof a){case"boolean":case"number":
case"string":case"function":s[n]=a;break;case"object":case"undefined":
var l=o.get(a);s[n]=l!==e?l:t(a,r,o)}})),s}function n(){
this.keys=[],this.values=[]}l.toJS=function(e){
if(0==arguments.length)throw new Error("When calling ko.toJS, pass the object you want to convert.")
;return t(e,(function(e){for(var t=0;l.isObservable(e)&&t<10;t++)e=e();return e
}))},l.toJSON=function(e,t,n){var i=l.toJS(e)
;return l.utils.stringifyJson(i,t,n)},n.prototype={constructor:n,
save:function(e,t){var n=l.utils.arrayIndexOf(this.keys,e)
;n>=0?this.values[n]=t:(this.keys.push(e),this.values.push(t))},get:function(t){
var n=l.utils.arrayIndexOf(this.keys,t);return n>=0?this.values[n]:e}}
}(),l.exportSymbol("toJS",l.toJS),
l.exportSymbol("toJSON",l.toJSON),l.when=function(e,t,n){function i(t){
var i=l.pureComputed(e,n).extend({notify:"always"}),r=i.subscribe((function(e){
e&&(r.dispose(),t(e))}));return i.notifySubscribers(i.peek()),r}
return"function"!=typeof Promise||t?i(t.bind(n)):new Promise(i)
},l.exportSymbol("when",l.when),function(){var t="__ko__hasDomDataOptionValue__"
;l.selectExtensions={readValue:function(n){switch(l.utils.tagNameLower(n)){
case"option":
return!0===n[t]?l.utils.domData.get(n,l.bindingHandlers.options.optionValueDomDataKey):l.utils.ieVersion<=7?n.getAttributeNode("value")&&n.getAttributeNode("value").specified?n.value:n.text:n.value
;case"select":
return n.selectedIndex>=0?l.selectExtensions.readValue(n.options[n.selectedIndex]):e
;default:return n.value}},writeValue:function(n,i,r){
switch(l.utils.tagNameLower(n)){case"option":
"string"==typeof i?(l.utils.domData.set(n,l.bindingHandlers.options.optionValueDomDataKey,e),
t in n&&delete n[t],
n.value=i):(l.utils.domData.set(n,l.bindingHandlers.options.optionValueDomDataKey,i),
n[t]=!0,n.value="number"==typeof i?i:"");break;case"select":
""!==i&&null!==i||(i=e)
;for(var o,s=-1,a=0,u=n.options.length;a<u;++a)if((o=l.selectExtensions.readValue(n.options[a]))==i||""===o&&i===e){
s=a;break}
(r||s>=0||i===e&&n.size>1)&&(n.selectedIndex=s,6===l.utils.ieVersion&&l.utils.setTimeout((function(){
n.selectedIndex=s}),0));break;default:null!==i&&i!==e||(i=""),n.value=i}}}
}(),l.exportSymbol("selectExtensions",l.selectExtensions),
l.exportSymbol("selectExtensions.readValue",l.selectExtensions.readValue),
l.exportSymbol("selectExtensions.writeValue",l.selectExtensions.writeValue),
l.expressionRewriting=function(){
var e=["true","false","null","undefined"],t=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,n=",\"'`{}()/:[\\]",i=RegExp(['"(?:\\\\.|[^"])*"',"'(?:\\\\.|[^'])*'","`(?:\\\\.|[^`])*`","/\\*(?:[^*]|\\*+[^*/])*\\*+/","//.*\n","/(?:\\\\.|[^/])+/w*","[^\\s:,/][^"+n+"]*[^\\s"+n+"]","[^\\s]"].join("|"),"g"),r=/[\])"'A-Za-z0-9_$]+$/,o={
in:1,return:1,typeof:1};function s(e){var t=l.utils.stringTrim(e)
;123===t.charCodeAt(0)&&(t=t.slice(1,-1))
;var n,s=[],a=(t+="\n,").match(i),u=[],d=0;if(a.length>1){
for(var c,p=0;c=a[p];++p){var f=c.charCodeAt(0);if(44===f){if(d<=0){
s.push(n&&u.length?{key:n,value:u.join("")}:{unknown:n||u.join("")}),n=d=0,u=[]
;continue}}else if(58===f){if(!d&&!n&&1===u.length){n=u.pop();continue}}else{
if(47===f&&c.length>1&&(47===c.charCodeAt(1)||42===c.charCodeAt(1)))continue
;if(47===f&&p&&c.length>1){var m=a[p-1].match(r)
;m&&!o[m[0]]&&(a=(t=t.substr(t.indexOf(c)+1)).match(i),p=-1,c="/")
}else 40===f||123===f||91===f?++d:41===f||125===f||93===f?--d:n||u.length||34!==f&&39!==f||(c=c.slice(1,-1))
}u.push(c)}if(d>0)throw Error("Unbalanced parentheses, braces, or brackets")}
return s}var a={};return{bindingRewriteValidators:[],twoWayBindings:a,
parseObjectLiteral:s,preProcessBindings:function(n,i){function r(n,i){var s
;if(!c){if(!function(e){return!e||!e.preprocess||(i=e.preprocess(i,n,r))
}(l.getBindingHandler(n)))return;if(a[n]&&(s=function(n){
if(l.utils.arrayIndexOf(e,n)>=0)return!1;var i=n.match(t)
;return null!==i&&(i[1]?"Object("+i[1]+")"+i[2]:n)}(i))){
var p="string"==typeof a[n]?a[n]:n;u.push("'"+p+"':function(_z){"+s+"=_z}")}}
d&&(i="function(){return "+i+" }"),o.push("'"+n+"':"+i)}
var o=[],u=[],d=(i=i||{}).valueAccessors,c=i.bindingParams,p="string"==typeof n?s(n):n
;return l.utils.arrayForEach(p,(function(e){r(e.key||e.unknown,e.value)
})),u.length&&r("_ko_property_writers","{"+u.join(",")+" }"),o.join(",")},
keyValueArrayContainsKey:function(e,t){
for(var n=0;n<e.length;n++)if(e[n].key==t)return!0;return!1},
writeValueToProperty:function(e,t,n,i,r){
if(e&&l.isObservable(e))!l.isWriteableObservable(e)||r&&e.peek()===i||e(i);else{
var o=t.get("_ko_property_writers");o&&o[n]&&o[n](i)}}}
}(),l.exportSymbol("expressionRewriting",l.expressionRewriting),
l.exportSymbol("expressionRewriting.bindingRewriteValidators",l.expressionRewriting.bindingRewriteValidators),
l.exportSymbol("expressionRewriting.parseObjectLiteral",l.expressionRewriting.parseObjectLiteral),
l.exportSymbol("expressionRewriting.preProcessBindings",l.expressionRewriting.preProcessBindings),
l.exportSymbol("expressionRewriting._twoWayBindings",l.expressionRewriting.twoWayBindings),
l.exportSymbol("jsonExpressionRewriting",l.expressionRewriting),
l.exportSymbol("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",l.expressionRewriting.preProcessBindings),
function(){
var e=n&&"\x3c!--test--\x3e"===n.createComment("test").text,t=e?/^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,i=e?/^<!--\s*\/ko\s*-->$/:/^\s*\/ko\s*$/,r={
ul:!0,ol:!0};function o(n){return 8==n.nodeType&&t.test(e?n.text:n.nodeValue)}
function s(t){return 8==t.nodeType&&i.test(e?t.text:t.nodeValue)}
var a="__ko_matchedEndComment__";function u(e,t){
for(var n=e,i=1,r=[];n=n.nextSibling;){
if(s(n)&&(l.utils.domData.set(n,a,!0),0==--i))return r;r.push(n),o(n)&&i++}
if(!t)throw new Error("Cannot find closing comment tag to match: "+e.nodeValue)
;return null}function d(e,t){var n=u(e,t)
;return n?n.length>0?n[n.length-1].nextSibling:e.nextSibling:null}function c(e){
var t=e.firstChild,n=null;if(t)do{if(n)n.push(t);else if(o(t)){var i=d(t,!0)
;i?t=i:n=[t]}else s(t)&&(n=[t])}while(t=t.nextSibling);return n}
l.virtualElements={allowedBindings:{},childNodes:function(e){
return o(e)?u(e):e.childNodes},emptyNode:function(e){
if(o(e))for(var t=l.virtualElements.childNodes(e),n=0,i=t.length;n<i;n++)l.removeNode(t[n]);else l.utils.emptyDomNode(e)
},setDomNodeChildren:function(e,t){if(o(e)){l.virtualElements.emptyNode(e)
;for(var n=e.nextSibling,i=0,r=t.length;i<r;i++)n.parentNode.insertBefore(t[i],n)
}else l.utils.setDomNodeChildren(e,t)},prepend:function(e,t){
o(e)?e.parentNode.insertBefore(t,e.nextSibling):e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)
},insertAfter:function(e,t,n){
n?o(e)?e.parentNode.insertBefore(t,n.nextSibling):n.nextSibling?e.insertBefore(t,n.nextSibling):e.appendChild(t):l.virtualElements.prepend(e,t)
},firstChild:function(e){
if(o(e))return!e.nextSibling||s(e.nextSibling)?null:e.nextSibling
;if(e.firstChild&&s(e.firstChild))throw new Error("Found invalid end comment, as the first child of "+e)
;return e.firstChild},nextSibling:function(e){
if(o(e)&&(e=d(e)),e.nextSibling&&s(e.nextSibling)){if(function(e){
return s(e)&&!l.utils.domData.get(e,a)
}(e.nextSibling))throw Error("Found end comment without a matching opening comment, as child of "+e)
;return null}return e.nextSibling},hasBindingValue:o,
virtualNodeBindingValue:function(n){var i=(e?n.text:n.nodeValue).match(t)
;return i?i[1]:null},normaliseVirtualElementDomStructure:function(e){
if(r[l.utils.tagNameLower(e)]){var t=e.firstChild;if(t)do{if(1===t.nodeType){
var n=c(t)
;if(n)for(var i=t.nextSibling,o=0;o<n.length;o++)i?e.insertBefore(n[o],i):e.appendChild(n[o])
}}while(t=t.nextSibling)}}}
}(),l.exportSymbol("virtualElements",l.virtualElements),
l.exportSymbol("virtualElements.allowedBindings",l.virtualElements.allowedBindings),
l.exportSymbol("virtualElements.emptyNode",l.virtualElements.emptyNode),
l.exportSymbol("virtualElements.insertAfter",l.virtualElements.insertAfter),
l.exportSymbol("virtualElements.prepend",l.virtualElements.prepend),
l.exportSymbol("virtualElements.setDomNodeChildren",l.virtualElements.setDomNodeChildren),
function(){var e="data-bind";l.bindingProvider=function(){this.bindingCache={}},
l.utils.extend(l.bindingProvider.prototype,{nodeHasBindings:function(t){
switch(t.nodeType){case 1:
return null!=t.getAttribute(e)||l.components.getComponentNameForNode(t);case 8:
return l.virtualElements.hasBindingValue(t);default:return!1}},
getBindings:function(e,t){
var n=this.getBindingsString(e,t),i=n?this.parseBindingsString(n,t,e):null
;return l.components.addBindingsForCustomElement(i,e,t,!1)},
getBindingAccessors:function(e,t){
var n=this.getBindingsString(e,t),i=n?this.parseBindingsString(n,t,e,{
valueAccessors:!0}):null
;return l.components.addBindingsForCustomElement(i,e,t,!0)},
getBindingsString:function(t,n){switch(t.nodeType){case 1:
return t.getAttribute(e);case 8:
return l.virtualElements.virtualNodeBindingValue(t);default:return null}},
parseBindingsString:function(e,t,n,i){try{return function(e,t,n){
var i=e+(n&&n.valueAccessors||"");return t[i]||(t[i]=function(e,t){
var n=l.expressionRewriting.preProcessBindings(e,t)
;return new Function("$context","$element","with($context){with($data||{}){return{"+n+"}}}")
}(e,n))}(e,this.bindingCache,i)(t,n)}catch(r){
throw r.message="Unable to parse bindings.\nBindings value: "+e+"\nMessage: "+r.message,
r}}}),l.bindingProvider.instance=new l.bindingProvider
}(),l.exportSymbol("bindingProvider",l.bindingProvider),function(){"use strict"
;var n=l.utils.createSymbolOrString("_subscribable"),i=l.utils.createSymbolOrString("_ancestorBindingInfo")
;l.bindingHandlers={};var o={script:!0,textarea:!0,template:!0}
;l.getBindingHandler=function(e){return l.bindingHandlers[e]};var s={}
;l.bindingContext=function(t,r,o,a,u){function d(){
var e=b?m():m,t=l.utils.unwrapObservable(e)
;return r?(r[n]&&r[n](),l.utils.extend(p,r),i in r&&(p[i]=r[i])):(p.$parents=[],
p.$root=t,
p.ko=l),p[n]=c,f?t=p.$data:(p.$rawData=e,p.$data=t),o&&(p[o]=t),a&&a(p,r,t),
p.$data}var c,p=this,f=t===s,m=f?e:t,b="function"==typeof m&&!l.isObservable(m)
;u&&u.exportDependencies?d():((c=l.pureComputed(d)).peek(),
c.isActive()?c.equalityComparer=null:p[n]=e)
},l.bindingContext.prototype.createChildContext=function(e,t,n,i){let r
;if(!i&&t&&"object"==typeof t?(r=(i=t).as,
n=i.extend):r=t,r&&i&&i.noChildContext){
const t="function"==typeof e&&!l.isObservable(e)
;return new l.bindingContext(s,this,null,(function(i){n&&n(i),i[r]=t?e():e}),i)}
return new l.bindingContext(e,this,r,(function(e,t){
e.$parentContext=t,e.$parent=t.$data,
e.$parents=(t.$parents||[]).slice(0),e.$parents.unshift(e.$parent),n&&n(e)}),i)
},l.bindingContext.prototype.extend=function(e){
return new l.bindingContext(s,this,null,(function(t){
l.utils.extend(t,"function"==typeof e?e(t):e)}))}
;var a=l.utils.domData.nextKey();function u(e){
var t=l.utils.domData.get(e,a),n=t&&t.asyncContext
;n&&(t.asyncContext=null,n.notifyAncestor())}function d(e,t,n){
this.node=e,this.bindingInfo=t,
this.asyncDescendants=[],this.childrenComplete=!1,
t.asyncContext||l.utils.domNodeDisposal.addDisposeCallback(e,u),
n&&n.asyncContext&&(n.asyncContext.asyncDescendants.push(e),
this.ancestorBindingInfo=n)}function c(e){return function(){return e}}
function p(e){return e()}function f(e){
return l.utils.objectMap(l.dependencyDetection.ignore(e),(function(t,n){
return function(){return e()[n]}}))}function m(e,t){
return f(this.getBindings.bind(this,e,t))}function b(e,t){
var n=l.virtualElements.firstChild(t);if(n){
var i,r=l.bindingProvider.instance,o=r.preprocessNode;if(o){
for(;i=n;)n=l.virtualElements.nextSibling(i),o.call(r,i)
;n=l.virtualElements.firstChild(t)}for(;i=n;)n=l.virtualElements.nextSibling(i),
v(e,i)}l.bindingEvent.notify(t,l.bindingEvent.childrenComplete)}function v(e,t){
var n=e,i=1===t.nodeType
;i&&l.virtualElements.normaliseVirtualElementDomStructure(t),
(i||l.bindingProvider.instance.nodeHasBindings(t))&&(n=g(t,null,e).bindingContextForDescendants),
n&&!o[l.utils.tagNameLower(t)]&&b(n,t)}function g(t,i,r){
var o,s=l.utils.domData.getOrSet(t,a,{}),u=s.alreadyBound;if(!i){
if(u)throw Error("You cannot apply bindings multiple times to the same element.")
;s.alreadyBound=!0}if(u||(s.context=r),i&&"function"!=typeof i)o=i;else{
var d=l.bindingProvider.instance,c=d.getBindingAccessors||m,f=l.dependentObservable((function(){
return(o=i?i(r,t):c.call(d,t,r))&&r[n]&&r[n](),o}),null,{
disposeWhenNodeIsRemoved:t});o&&f.isActive()||(f=null)}var b,v=r;function g(){
return l.utils.objectMap(f?f():o,p)}if(o){var h=f?function(e){return function(){
return p(f()[e])}}:function(e){return o[e]};g.get=function(e){
return o[e]&&p(h(e))},g.has=function(e){return e in o
},l.bindingEvent.childrenComplete in o&&l.bindingEvent.subscribe(t,l.bindingEvent.childrenComplete,(function(){
var e=p(o[l.bindingEvent.childrenComplete]);if(e){
var n=l.virtualElements.childNodes(t);n.length&&e(n,l.dataFor(n[0]))}
})),l.bindingEvent.descendantsComplete in o&&(v=l.bindingEvent.startPossiblyAsyncContentBinding(t,r),
l.bindingEvent.subscribe(t,l.bindingEvent.descendantsComplete,(function(){
var e=p(o[l.bindingEvent.descendantsComplete])
;e&&l.virtualElements.firstChild(t)&&e(t)})));var y=function(e){
var t=[],n={},i=[];return l.utils.objectForEach(e,(function r(o){if(!n[o]){
var s=l.getBindingHandler(o)
;s&&(s.after&&(i.push(o),l.utils.arrayForEach(s.after,(function(t){if(e[t]){
if(-1!==l.utils.arrayIndexOf(i,t))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+i.join(", "))
;r(t)}})),i.length--),t.push({key:o,handler:s})),n[o]=!0}})),t}(o)
;l.utils.arrayForEach(y,(function(n){
var i=n.handler.init,r=n.handler.update,s=n.key;8===t.nodeType&&function(e){
if(!l.virtualElements.allowedBindings[e])throw new Error("The binding '"+e+"' cannot be used with virtual elements")
}(s);try{"function"==typeof i&&l.dependencyDetection.ignore((function(){
var n=i(t,h(s),g,v.$data,v);if(n&&n.controlsDescendantBindings){
if(b!==e)throw new Error("Multiple bindings ("+b+" and "+s+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")
;b=s}})),"function"==typeof r&&l.dependentObservable((function(){
r(t,h(s),g,v.$data,v)}),null,{disposeWhenNodeIsRemoved:t})}catch(a){
throw a.message='Unable to process binding "'+s+": "+o[s]+'"\nMessage: '+a.message,
a}}))}var x=b===e;return{shouldBindDescendants:x,
bindingContextForDescendants:x&&v}}function h(t,n){
return t&&t instanceof l.bindingContext?t:new l.bindingContext(t,e,e,n)}
d.prototype.notifyAncestor=function(){
this.ancestorBindingInfo&&this.ancestorBindingInfo.asyncContext&&this.ancestorBindingInfo.asyncContext.descendantComplete(this.node)
},d.prototype.descendantComplete=function(e){
l.utils.arrayRemoveItem(this.asyncDescendants,e),
!this.asyncDescendants.length&&this.childrenComplete&&this.completeChildren()
},d.prototype.completeChildren=function(){
this.childrenComplete=!0,this.bindingInfo.asyncContext&&!this.asyncDescendants.length&&(this.bindingInfo.asyncContext=null,
l.utils.domNodeDisposal.removeDisposeCallback(this.node,u),
l.bindingEvent.notify(this.node,l.bindingEvent.descendantsComplete),
this.notifyAncestor())},l.bindingEvent={childrenComplete:"childrenComplete",
descendantsComplete:"descendantsComplete",subscribe:function(e,t,n,i){
var r=l.utils.domData.getOrSet(e,a,{})
;return r.eventSubscribable||(r.eventSubscribable=new l.subscribable),
r.eventSubscribable.subscribe(n,i,t)},notify:function(t,n){
var i=l.utils.domData.get(t,a)
;if(i&&(i.eventSubscribable&&i.eventSubscribable.notifySubscribers(t,n),
n==l.bindingEvent.childrenComplete))if(i.asyncContext)i.asyncContext.completeChildren();else if(i.asyncContext===e&&i.eventSubscribable&&i.eventSubscribable.hasSubscriptionsForEvent(l.bindingEvent.descendantsComplete))throw new Error("descendantsComplete event not supported for bindings on this node")
},startPossiblyAsyncContentBinding:function(e,t){
var n=l.utils.domData.getOrSet(e,a,{})
;return n.asyncContext||(n.asyncContext=new d(e,n,t[i])),
t[i]==n?t:t.extend((function(e){e[i]=n}))}
},l.storedBindingContextForNode=function(e){var t=l.utils.domData.get(e,a)
;return t&&t.context},l.applyBindingAccessorsToNode=function(e,t,n){
return 1===e.nodeType&&l.virtualElements.normaliseVirtualElementDomStructure(e),
g(e,t,h(n))},l.applyBindingsToNode=function(e,t,n){var i=h(n)
;return l.applyBindingAccessorsToNode(e,function(e,t,n){
return"function"==typeof e?f(e.bind(null,t,n)):l.utils.objectMap(e,c)}(t,i,e),i)
},l.applyBindingsToDescendants=function(e,t){
1!==t.nodeType&&8!==t.nodeType||b(h(e),t)},l.applyBindings=function(e,n,i){
if(!r&&t.jQuery&&(r=t.jQuery),arguments.length<2){
if(!(n=t.document.body))throw Error("ko.applyBindings: could not find window.document.body; has the document been loaded?")
}else if(!n||1!==n.nodeType&&8!==n.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")
;v(h(e,i),n)},l.contextFor=function(t){
return!t||1!==t.nodeType&&8!==t.nodeType?e:l.storedBindingContextForNode(t)
},l.dataFor=function(t){var n=l.contextFor(t);return n?n.$data:e
},l.exportSymbol("bindingHandlers",l.bindingHandlers),
l.exportSymbol("bindingEvent",l.bindingEvent),
l.exportSymbol("bindingEvent.subscribe",l.bindingEvent.subscribe),
l.exportSymbol("applyBindings",l.applyBindings),
l.exportSymbol("applyBindingsToDescendants",l.applyBindingsToDescendants),
l.exportSymbol("applyBindingAccessorsToNode",l.applyBindingAccessorsToNode),
l.exportSymbol("applyBindingsToNode",l.applyBindingsToNode),
l.exportSymbol("contextFor",l.contextFor),l.exportSymbol("dataFor",l.dataFor)
}(),function(e){var t={},n={};function i(t,n){
return Object.prototype.hasOwnProperty.call(t,n)?t[n]:e}function r(t,n,i,o){
o||(o=l.components.loaders.slice(0));var s=o.shift();if(s){var a=s[t];if(a){
var u=!1;if(a.apply(s,n.concat((function(e){u?i(null):null!==e?i(e):r(t,n,i,o)
})))!==e&&(u=!0,
!s.suppressLoaderExceptions))throw new Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.")
}else r(t,n,i,o)}else i(null)}l.components={get:function(e,o){var s=i(n,e)
;s?s.isSynchronousComponent?l.dependencyDetection.ignore((function(){
o(s.definition)})):l.tasks.schedule((function(){o(s.definition)
})):function(e,o){var s,a=i(t,e)
;a?a.subscribe(o):((a=t[e]=new l.subscribable).subscribe(o),function(e,t){
r("getConfig",[e],(function(n){n?r("loadComponent",[e,n],(function(e){t(e,n)
})):t(null,null)}))}(e,(function(i,r){var o=!(!r||!r.synchronous);n[e]={
definition:i,isSynchronousComponent:o
},delete t[e],s||o?a.notifySubscribers(i):l.tasks.schedule((function(){
a.notifySubscribers(i)}))})),s=!0)}(e,o)},clearCachedDefinition:function(e){
delete n[e]},_getFirstResultFromLoaders:r
},l.components.loaders=[],l.exportSymbol("components",l.components),
l.exportSymbol("components.get",l.components.get),
l.exportSymbol("components.clearCachedDefinition",l.components.clearCachedDefinition)
}(),function(e){var i={};function r(e){switch(l.utils.tagNameLower(e)){
case"script":return l.utils.parseHtmlFragment(e.text);case"textarea":
return l.utils.parseHtmlFragment(e.value);case"template":
if(o(e.content))return l.utils.cloneNodes(e.content.childNodes)}
return l.utils.cloneNodes(e.childNodes)}function o(e){
return t.DocumentFragment?e instanceof DocumentFragment:e&&11===e.nodeType}
function s(e,n,i){
"string"==typeof n.require?a||t.require?(a||t.require)([n.require],i):e("Uses require, but no AMD loader is present"):i(n)
}function u(e){return function(t){throw new Error("Component '"+e+"': "+t)}}
l.components.register=function(e,t){
if(!t)throw new Error("Invalid configuration for "+e)
;if(l.components.isRegistered(e))throw new Error("Component "+e+" is already registered")
;i[e]=t},l.components.isRegistered=function(e){
return Object.prototype.hasOwnProperty.call(i,e)
},l.components.unregister=function(e){
delete i[e],l.components.clearCachedDefinition(e)},l.components.defaultLoader={
getConfig:function(e,t){t(l.components.isRegistered(e)?i[e]:null)},
loadComponent:function(e,t,n){var i=u(e);s(i,t,(function(t){!function(e,t,n,i){
var r={},o=2,a=function(){0==--o&&i(r)},u=n.template,d=n.viewModel
;u?s(t,u,(function(t){
l.components._getFirstResultFromLoaders("loadTemplate",[e,t],(function(e){
r.template=e,a()}))})):a(),d?s(t,d,(function(t){
l.components._getFirstResultFromLoaders("loadViewModel",[e,t],(function(e){
r.createViewModel=e,a()}))})):a()}(e,i,t,n)}))},loadTemplate:function(e,i,s){
!function(e,i,s){
if("string"==typeof i)s(l.utils.parseHtmlFragment(i));else if(i instanceof Array)s(i);else if(o(i))s(l.utils.makeArray(i.childNodes));else if(i.element){
var a=i.element;if(function(e){
return t.HTMLElement?e instanceof HTMLElement:e&&e.tagName&&1===e.nodeType
}(a))s(r(a));else if("string"==typeof a){var u=n.getElementById(a)
;u?s(r(u)):e("Cannot find element with ID "+a)
}else e("Unknown element type: "+a)}else e("Unknown template value: "+i)
}(u(e),i,s)},loadViewModel:function(e,t,n){!function e(t,n,i){
if("function"==typeof n)i((function(e){return new n(e)
}));else if("function"==typeof n.createViewModel)i(n.createViewModel);else if("instance"in n){
var r=n.instance;i((function(e,t){return r}))
}else"viewModel"in n?e(t,n.viewModel,i):t("Unknown viewModel value: "+n)
}(u(e),t,n)}
},l.exportSymbol("components.register",l.components.register),l.exportSymbol("components.isRegistered",l.components.isRegistered),
l.exportSymbol("components.unregister",l.components.unregister),
l.exportSymbol("components.defaultLoader",l.components.defaultLoader),
l.components.loaders.push(l.components.defaultLoader),
l.components._allRegisteredComponents=i}(),function(e){
l.components.getComponentNameForNode=function(e){var t=l.utils.tagNameLower(e)
;if(l.components.isRegistered(t)&&(-1!=t.indexOf("-")||""+e=="[object HTMLUnknownElement]"||l.utils.ieVersion<=8&&e.tagName===t))return t
},l.components.addBindingsForCustomElement=function(e,t,n,r){if(1===t.nodeType){
var o=l.components.getComponentNameForNode(t);if(o){
if((e=e||{}).component)throw new Error('Cannot use the "component" binding on a custom element matching a component')
;var s={name:o,params:i(t,n)};e.component=r?function(){return s}:s}}return e}
;var t=new l.bindingProvider;function i(e,n){var i=e.getAttribute("params")
;if(i){var r=t.parseBindingsString(i,n,e,{valueAccessors:!0,bindingParams:!0
}),o=l.utils.objectMap(r,(function(t,n){return l.computed(t,null,{
disposeWhenNodeIsRemoved:e})})),s=l.utils.objectMap(o,(function(t,n){
var i=t.peek();return t.isActive()?l.computed({read:function(){
return l.utils.unwrapObservable(t())},
write:l.isWriteableObservable(i)&&function(e){t()(e)},disposeWhenNodeIsRemoved:e
}):i}));return Object.prototype.hasOwnProperty.call(s,"$raw")||(s.$raw=o),s}
return{$raw:{}}}l.utils.ieVersion<9&&(l.components.register=function(e){
return function(t){return n.createElement(t),e.apply(this,arguments)}
}(l.components.register),n.createDocumentFragment=function(e){return function(){
var t=e(),n=l.components._allRegisteredComponents
;for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&t.createElement(i)
;return t}}(n.createDocumentFragment))}(),function(e){var t=0
;l.bindingHandlers.component={init:function(e,n,i,r,o){var s,a,u,d=function(){
var e=s&&s.dispose;"function"==typeof e&&e.call(s),u&&u.dispose(),u=null,s=null,
a=null},c=l.utils.makeArray(l.virtualElements.childNodes(e))
;return l.virtualElements.emptyNode(e),
l.utils.domNodeDisposal.addDisposeCallback(e,d),l.computed((function(){
var i,r,p=l.utils.unwrapObservable(n())
;if("string"==typeof p?i=p:(i=l.utils.unwrapObservable(p.name),
r=l.utils.unwrapObservable(p.params)),
!i)throw new Error("No component name specified")
;var f=l.bindingEvent.startPossiblyAsyncContentBinding(e,o),m=a=++t
;l.components.get(i,(function(t){if(a===m){
if(d(),!t)throw new Error("Unknown component '"+i+"'");!function(e,t,n){
var i=t.template;if(!i)throw new Error("Component '"+e+"' has no template")
;var r=l.utils.cloneNodes(i);l.virtualElements.setDomNodeChildren(n,r)}(i,t,e)
;var n=function(e,t,n){var i=e.createViewModel;return i?i.call(e,t,n):t}(t,r,{
element:e,templateNodes:c}),o=f.createChildContext(n,{extend:function(e){
e.$component=n,e.$componentTemplateNodes=c}})
;n&&n.koDescendantsComplete&&(u=l.bindingEvent.subscribe(e,l.bindingEvent.descendantsComplete,n.koDescendantsComplete,n)),
s=n,l.applyBindingsToDescendants(o,e)}}))}),null,{disposeWhenNodeIsRemoved:e}),{
controlsDescendantBindings:!0}}},l.virtualElements.allowedBindings.component=!0
}();var T={class:"className",for:"htmlFor"};l.bindingHandlers.attr={
update:function(t,n,i){var r=l.utils.unwrapObservable(n())||{}
;l.utils.objectForEach(r,(function(n,i){i=l.utils.unwrapObservable(i)
;var r=n.indexOf(":"),o="lookupNamespaceURI"in t&&r>0&&t.lookupNamespaceURI(n.substr(0,r)),s=!1===i||null===i||i===e
;s?o?t.removeAttributeNS(o,n):t.removeAttribute(n):i=i.toString(),
l.utils.ieVersion<=8&&n in T?(n=T[n],
s?t.removeAttribute(n):t[n]=i):s||(o?t.setAttributeNS(o,n,i):t.setAttribute(n,i)),
"name"===n&&l.utils.setElementName(t,s?"":i)}))}},l.bindingHandlers.checked={
after:["value","attr"],init:function(t,n,i){var r=l.pureComputed((function(){
return i.has("checkedValue")?l.utils.unwrapObservable(i.get("checkedValue")):p?i.has("value")?l.utils.unwrapObservable(i.get("value")):t.value:void 0
}));function o(){var o=t.checked,u=r()
;if(!l.computedContext.isInitial()&&(o||!a&&!l.computedContext.getDependenciesCount())){
var p=l.dependencyDetection.ignore(n);if(d){var m=c?p.peek():p,b=f
;f=u,b!==u?o&&(l.utils.addOrRemoveItem(m,u,!0),
l.utils.addOrRemoveItem(m,b,!1)):l.utils.addOrRemoveItem(m,u,o),
c&&l.isWriteableObservable(p)&&p(m)
}else s&&(u===e?u=o:o||(u=e)),l.expressionRewriting.writeValueToProperty(p,i,"checked",u,!0)
}}var s="checkbox"==t.type,a="radio"==t.type;if(s||a){
var u=n(),d=s&&l.utils.unwrapObservable(u)instanceof Array,c=!(d&&u.push&&u.splice),p=a||d,f=d?r():e
;a&&!t.name&&l.bindingHandlers.uniqueName.init(t,(function(){return!0
})),l.computed(o,null,{disposeWhenNodeIsRemoved:t
}),l.utils.registerEventHandler(t,"click",o),l.computed((function(){
var i=l.utils.unwrapObservable(n()),o=r()
;d?(t.checked=l.utils.arrayIndexOf(i,o)>=0,f=o):t.checked=s&&o===e?!!i:r()===i
}),null,{disposeWhenNodeIsRemoved:t}),u=e}}
},l.expressionRewriting.twoWayBindings.checked=!0,
l.bindingHandlers.checkedValue={update:function(e,t){
e.value=l.utils.unwrapObservable(t())}},l.bindingHandlers.class={
update:function(e,t){var n=l.utils.stringTrim(l.utils.unwrapObservable(t()))
;l.utils.toggleDomNodeCssClass(e,e.__ko__cssValue,!1),
e.__ko__cssValue=n,l.utils.toggleDomNodeCssClass(e,n,!0)}
},l.bindingHandlers.css={update:function(e,t){
var n=l.utils.unwrapObservable(t())
;null!==n&&"object"==typeof n?l.utils.objectForEach(n,(function(t,n){
n=l.utils.unwrapObservable(n),l.utils.toggleDomNodeCssClass(e,t,n)
})):l.bindingHandlers.class.update(e,t)}},l.bindingHandlers.enable={
update:function(e,t){var n=l.utils.unwrapObservable(t())
;n&&e.disabled?e.removeAttribute("disabled"):n||e.disabled||(e.disabled=!0)}
},l.bindingHandlers.disable={update:function(e,t){
l.bindingHandlers.enable.update(e,(function(){
return!l.utils.unwrapObservable(t())}))}},l.bindingHandlers.event={
init:function(e,t,n,i,r){var o=t()||{};l.utils.objectForEach(o,(function(o){
"string"==typeof o&&l.utils.registerEventHandler(e,o,(function(e){var s,a=t()[o]
;if(a){try{var u=l.utils.makeArray(arguments)
;i=r.$data,u.unshift(i),s=a.apply(i,u)}finally{
!0!==s&&(e.preventDefault?e.preventDefault():e.returnValue=!1)}
var d=!1!==n.get(o+"Bubble")
;d||(e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation())}}))}))}
},function(){"use strict";l.bindingHandlers.foreach={
makeTemplateValueAccessor:function(e){return function(){
var t=e(),n=l.utils.peekObservable(t)
;return n&&"number"!=typeof n.length?(l.utils.unwrapObservable(t),{
foreach:n.data,as:n.as,noChildContext:n.noChildContext,
includeDestroyed:n.includeDestroyed,afterAdd:n.afterAdd,
beforeRemove:n.beforeRemove,afterRender:n.afterRender,beforeMove:n.beforeMove,
afterMove:n.afterMove,templateEngine:l.nativeTemplateEngine.instance}):{
foreach:t,templateEngine:l.nativeTemplateEngine.instance}}},init:function(e,t){
return l.bindingHandlers.template.init(e,l.bindingHandlers.foreach.makeTemplateValueAccessor(t))
},update:function(e,t,n,i,r){
return l.bindingHandlers.template.update(e,l.bindingHandlers.foreach.makeTemplateValueAccessor(t),n,i,r)
}
},l.expressionRewriting.bindingRewriteValidators.foreach=!1,l.virtualElements.allowedBindings.foreach=!0
}();var k="__ko_hasfocusLastValue";l.bindingHandlers.hasfocus={
init:function(e,t,n){var i=function(i){e.__ko_hasfocusUpdating=!0
;var r=e.ownerDocument;if("activeElement"in r){var o;try{o=r.activeElement
}catch(a){o=r.body}i=o===e}var s=t()
;l.expressionRewriting.writeValueToProperty(s,n,"hasfocus",i,!0),
e[k]=i,e.__ko_hasfocusUpdating=!1},r=i.bind(null,!0),o=i.bind(null,!1)
;l.utils.registerEventHandler(e,"focus",r),
l.utils.registerEventHandler(e,"focusin",r),
l.utils.registerEventHandler(e,"blur",o),
l.utils.registerEventHandler(e,"focusout",o),e[k]=!1},update:function(e,t){
var n=!!l.utils.unwrapObservable(t())
;e.__ko_hasfocusUpdating||e[k]===n||(n?e.focus():e.blur(),
!n&&e[k]&&e.ownerDocument.body.focus(),
l.dependencyDetection.ignore(l.utils.triggerEvent,null,[e,n?"focusin":"focusout"]))
}
},l.expressionRewriting.twoWayBindings.hasfocus=!0,l.bindingHandlers.hasFocus=l.bindingHandlers.hasfocus,
l.expressionRewriting.twoWayBindings.hasFocus="hasfocus",
l.bindingHandlers.html={init:function(){return{controlsDescendantBindings:!0}},
update:function(e,t){l.utils.setHtml(e,t())}},function(){"use strict"
;function e(e,t){l.bindingHandlers[e]={init:function(e,n,i,r,o){let s
;const a=l.computed((function(){const e=l.utils.unwrapObservable(n())
;return t?!e:!!e}),null,{disposeWhenNodeIsRemoved:e
}),u="render"==i.get("completeOn"),d=u||i.has(l.bindingEvent.descendantsComplete)
;return l.computed((function(){const t=a(),n=!s;var i
;n&&l.computedContext.getDependenciesCount()&&(s=l.utils.cloneNodes(l.virtualElements.childNodes(e),!0)),
d&&(o=l.bindingEvent.startPossiblyAsyncContentBinding(e,o)),
t?(n||l.virtualElements.setDomNodeChildren(e,l.utils.cloneNodes(s)),
a.isActive(),
i=o,l.applyBindingsToDescendants(i,e)):(l.virtualElements.emptyNode(e),
u||l.bindingEvent.notify(e,l.bindingEvent.childrenComplete))}),null,{
disposeWhenNodeIsRemoved:e}),{controlsDescendantBindings:!0}}
},l.expressionRewriting.bindingRewriteValidators[e]=!1,
l.virtualElements.allowedBindings[e]=!0}e("if"),e("ifnot",!0)}(),function(){
"use strict";!function(e){l.bindingHandlers[e]={init:function(e,t,n,i,r){
let o=null,s=!1,a=!0
;const u=l.isObservable(t()),d=n.get("as"),c=n.get("noChildContext"),p={as:d,
noChildContext:c
},f=!(!u||c&&d),m="render"===n.get("completeOn"),b=m||n.has(l.bindingEvent.descendantsComplete)
;return l.computed((function(){
const n=l.utils.unwrapObservable(t()),i=!(null==n)
;if(a&&l.computedContext.getDependenciesCount()&&(o=l.utils.cloneNodes(l.virtualElements.childNodes(e),!0)),
b&&(r=l.bindingEvent.startPossiblyAsyncContentBinding(e,r)),i){let i=!1
;if(a?i=!0:s?f&&(l.virtualElements.setDomNodeChildren(e,l.utils.cloneNodes(o)),
i=!0):(l.virtualElements.setDomNodeChildren(e,l.utils.cloneNodes(o)),i=!0),i){
const i=r.createChildContext("function"==typeof n?n:t,p)
;l.applyBindingsToDescendants(i,e)}s=!0
}else l.virtualElements.emptyNode(e),m||l.bindingEvent.notify(e,l.bindingEvent.childrenComplete),
s=!1;a=!1}),null,{disposeWhenNodeIsRemoved:e}),{controlsDescendantBindings:!0}}
},
l.expressionRewriting.bindingRewriteValidators[e]=!1,l.virtualElements.allowedBindings[e]=!0
}("with")}(),function(){"use strict";l.bindingHandlers.let={
init:function(e,t,n,i,r){const o=r.extend(t)
;return l.applyBindingsToDescendants(o,e),{controlsDescendantBindings:!0}}
},l.virtualElements.allowedBindings.let=!0}();var O={}
;l.bindingHandlers.options={init:function(e){
if("select"!==l.utils.tagNameLower(e))throw new Error("options binding applies only to SELECT elements")
;for(;e.length>0;)e.remove(0);return{controlsDescendantBindings:!0}},
update:function(t,n,i){function r(){
return l.utils.arrayFilter(t.options,(function(e){return e.selected}))}
var o,s,a=0==t.length,u=t.multiple,d=!a&&u?t.scrollTop:null,c=l.utils.unwrapObservable(n()),p=i.get("valueAllowUnset")&&i.has("value"),f=i.get("optionsIncludeDestroyed"),m={},b=[]
;function v(e,t,n){var i=typeof t;return"function"==i?t(e):"string"==i?e[t]:n}
p||(u?b=l.utils.arrayMap(r(),l.selectExtensions.readValue):t.selectedIndex>=0&&b.push(l.selectExtensions.readValue(t.options[t.selectedIndex]))),
c&&(void 0===c.length&&(c=[c]),s=l.utils.arrayFilter(c,(function(t){
return f||t===e||null===t||!l.utils.unwrapObservable(t._destroy)
})),i.has("optionsCaption")&&null!==(o=l.utils.unwrapObservable(i.get("optionsCaption")))&&o!==e&&s.unshift(O))
;var g=!1;function h(e,n){
if(g&&p)l.selectExtensions.writeValue(t,l.utils.unwrapObservable(i.get("value")),!0);else if(b.length){
var r=l.utils.arrayIndexOf(b,l.selectExtensions.readValue(n[0]))>=0
;l.utils.setOptionNodeSelectionState(n[0],r),
g&&!r&&l.dependencyDetection.ignore(l.utils.triggerEvent,null,[t,"change"])}}
m.beforeRemove=function(e){t.removeChild(e)};var y=h
;i.has("optionsAfterRender")&&"function"==typeof i.get("optionsAfterRender")&&(y=function(t,n){
h(0,n),
l.dependencyDetection.ignore(i.get("optionsAfterRender"),null,[n[0],t!==O?t:e])
}),l.utils.setDomNodeChildrenFromArrayMapping(t,s,(function(n,r,o){
o.length&&(b=!p&&o[0].selected?[l.selectExtensions.readValue(o[0])]:[],g=!0)
;var s=t.ownerDocument.createElement("option")
;if(n===O)l.utils.setTextContent(s,i.get("optionsCaption")),
l.selectExtensions.writeValue(s,e);else{var a=v(n,i.get("optionsValue"),n)
;l.selectExtensions.writeValue(s,l.utils.unwrapObservable(a))
;var u=v(n,i.get("optionsText"),a);l.utils.setTextContent(s,u)}return[s]}),m,y),
l.dependencyDetection.ignore((function(){
p?l.selectExtensions.writeValue(t,l.utils.unwrapObservable(i.get("value")),!0):(u?b.length&&r().length<b.length:b.length&&t.selectedIndex>=0?l.selectExtensions.readValue(t.options[t.selectedIndex])!==b[0]:b.length||t.selectedIndex>=0)&&l.utils.triggerEvent(t,"change")
})),
l.utils.ensureSelectElementIsRenderedCorrectly(t),d&&Math.abs(d-t.scrollTop)>20&&(t.scrollTop=d)
}
},l.bindingHandlers.options.optionValueDomDataKey=l.utils.domData.nextKey(),l.bindingHandlers.selectedOptions={
after:["options","foreach"],init:function(e,t,n){
l.utils.registerEventHandler(e,"change",(function(){var i=t(),r=[]
;l.utils.arrayForEach(e.getElementsByTagName("option"),(function(e){
e.selected&&r.push(l.selectExtensions.readValue(e))
})),l.expressionRewriting.writeValueToProperty(i,n,"selectedOptions",r)}))},
update:function(e,t){
if("select"!=l.utils.tagNameLower(e))throw new Error("values binding applies only to SELECT elements")
;var n=l.utils.unwrapObservable(t()),i=e.scrollTop
;n&&"number"==typeof n.length&&l.utils.arrayForEach(e.getElementsByTagName("option"),(function(e){
var t=l.utils.arrayIndexOf(n,l.selectExtensions.readValue(e))>=0
;e.selected!=t&&l.utils.setOptionNodeSelectionState(e,t)})),e.scrollTop=i}
},l.expressionRewriting.twoWayBindings.selectedOptions=!0,
l.bindingHandlers.style={update:function(t,n){
var i=l.utils.unwrapObservable(n()||{});l.utils.objectForEach(i,(function(n,i){
if(null!==(i=l.utils.unwrapObservable(i))&&i!==e&&!1!==i||(i=""),
r)r(t).css(n,i);else if(/^--/.test(n))t.style.setProperty(n,i);else{
n=n.replace(/-(\w)/g,(function(e,t){return t.toUpperCase()}));var o=t.style[n]
;t.style[n]=i,i===o||t.style[n]!=o||isNaN(i)||(t.style[n]=i+"px")}}))}
},l.bindingHandlers.submit={init:function(e,t,n,i,r){
if("function"!=typeof t())throw new Error("The value for a submit binding must be a function")
;l.utils.registerEventHandler(e,"submit",(function(n){var i,o=t();try{
i=o.call(r.$data,e)}finally{
!0!==i&&(n.preventDefault?n.preventDefault():n.returnValue=!1)}}))}
},l.bindingHandlers.text={init:function(){return{controlsDescendantBindings:!0}
},update:function(e,t){l.utils.setTextContent(e,t())}
},l.virtualElements.allowedBindings.text=!0,function(){if(t&&t.navigator){
var n,i,r,o,s,a=function(e){if(e)return parseFloat(e[1])
},u=t.navigator.userAgent
;(n=t.opera&&t.opera.version&&parseInt(t.opera.version()))||(s=a(u.match(/Edge\/([^ ]+)$/)))||a(u.match(/Chrome\/([^ ]+)/))||(i=a(u.match(/Version\/([^ ]+) Safari/)))||(r=a(u.match(/Firefox\/([^ ]+)/)))||(o=l.utils.ieVersion||a(u.match(/MSIE ([^ ]+)/)))||(o=a(u.match(/rv:([^ )]+)/)))
}
if(o>=8&&o<10)var d=l.utils.domData.nextKey(),c=l.utils.domData.nextKey(),p=function(e){
var t=this.activeElement,n=t&&l.utils.domData.get(t,c);n&&n(e)},f=function(e,t){
var n=e.ownerDocument
;l.utils.domData.get(n,d)||(l.utils.domData.set(n,d,!0),l.utils.registerEventHandler(n,"selectionchange",p)),
l.utils.domData.set(e,c,t)};l.bindingHandlers.textInput={init:function(t,a,u){
var d,c,p=t.value,m=function(n){clearTimeout(d),c=d=e;var i=t.value;p!==i&&(p=i,
l.expressionRewriting.writeValueToProperty(a(),u,"textInput",i))},b=function(e){
if(!d){c=t.value;var n=m;d=l.utils.setTimeout(n,4)}
},v=9==l.utils.ieVersion?b:m,g=!1,h=function(){
var n=l.utils.unwrapObservable(a())
;null!==n&&n!==e||(n=""),c===e||n!==c?t.value!==n&&(g=!0,
t.value=n,g=!1,p=t.value):l.utils.setTimeout(h,4)},y=function(e,n){
l.utils.registerEventHandler(t,e,n)}
;o&&y("keypress",m),o<11&&y("propertychange",(function(e){
g||"value"!==e.propertyName||v(e)
})),8==o&&(y("keyup",m),y("keydown",m)),f&&(f(t,v),
y("dragend",b)),(!o||o>=9)&&y("input",v),
i<5&&"textarea"===l.utils.tagNameLower(t)?(y("keydown",b),
y("paste",b),y("cut",b)):n<11?y("keydown",b):r<4?(y("DOMAutoComplete",m),
y("dragdrop",m),y("drop",m)):s&&"number"===t.type&&y("keydown",b),y("change",m),
y("blur",m),l.computed(h,null,{disposeWhenNodeIsRemoved:t})}
},l.expressionRewriting.twoWayBindings.textInput=!0,
l.bindingHandlers.textinput={preprocess:function(e,t,n){n("textInput",e)}}
}(),function(){"use strict";l.bindingHandlers.uniqueName={init:function(e,t){
if(t()){var n="ko_unique_"+ ++l.bindingHandlers.uniqueName.currentIndex
;l.utils.setElementName(e,n)}}},l.bindingHandlers.uniqueName.currentIndex=0
}(),function(){"use strict";l.bindingHandlers.using={init:function(e,t,n,i,r){
var o=r.createChildContext(t);return l.applyBindingsToDescendants(o,e),{
controlsDescendantBindings:!0}}},l.virtualElements.allowedBindings.using=!0
}(),function(){"use strict";l.bindingHandlers.value={
after:["options","foreach"],init:function(t,n,i){
const r=l.utils.tagNameLower(t),o="input"==r
;if(o&&("checkbox"==t.type||"radio"==t.type))return void l.applyBindingAccessorsToNode(t,{
checkedValue:n});let s=["change"],a=i.get("valueUpdate")
;a&&("string"==typeof a&&(a=[a]),
l.utils.arrayPushAll(s,a),s=l.utils.arrayGetDistinctValues(s));let u=null,d=!1
;var c,p=function(){u=null,d=!1;const e=n(),r=l.selectExtensions.readValue(t)
;l.expressionRewriting.writeValueToProperty(e,i,"value",r)}
;l.utils.ieVersion&&o&&"text"==t.type&&"off"!=t.autocomplete&&(!t.form||"off"!=t.form.autocomplete)&&-1==l.utils.arrayIndexOf(s,"propertychange")&&(l.utils.registerEventHandler(t,"propertychange",(function(){
d=!0})),l.utils.registerEventHandler(t,"focus",(function(){d=!1
})),l.utils.registerEventHandler(t,"blur",(function(){d&&p()
}))),l.utils.arrayForEach(s,(function(e){let n
;l.utils.stringStartsWith(e,"after")?(n=function(){
u=l.selectExtensions.readValue(t),l.utils.setTimeout(p,0)
},e=e.substring("after".length)):n=p,l.utils.registerEventHandler(t,e,n)
})),c=o&&"file"==t.type?function(){const i=l.utils.unwrapObservable(n())
;null===i||i===e||""===i?t.value="":l.dependencyDetection.ignore(p)}:function(){
const o=l.utils.unwrapObservable(n()),s=l.selectExtensions.readValue(t)
;if(null===u||o!==u){if(o!==s||s===e)if("select"===r){
const e=i.get("valueAllowUnset")
;l.selectExtensions.writeValue(t,o,e),e||o===l.selectExtensions.readValue(t)||l.dependencyDetection.ignore(p)
}else l.selectExtensions.writeValue(t,o)}else l.utils.setTimeout(c,0)
},l.computed(c,null,{disposeWhenNodeIsRemoved:t})},update:function(){}
},l.expressionRewriting.twoWayBindings.value=!0}(),function(){"use strict"
;l.bindingHandlers.visible={update:function(e,t){
const n=l.utils.unwrapObservable(t()),i=!("none"==e.style.display)
;n&&!i?e.style.display="":!n&&i&&(e.style.display="none")}
},l.bindingHandlers.hidden={update:function(e,t){
l.bindingHandlers.visible.update(e,(function(){
return!l.utils.unwrapObservable(t())}))}}}(),function(e){l.bindingHandlers[e]={
init:function(t,n,i,r,o){
return l.bindingHandlers.event.init.call(this,t,(function(){var t={}
;return t[e]=n(),t}),i,r,o)}}
}("click"),l.templateEngine=function(){},l.templateEngine.prototype.renderTemplateSource=function(e,t,n,i){
throw new Error("Override renderTemplateSource")
},l.templateEngine.prototype.createJavaScriptEvaluatorBlock=function(e){
throw new Error("Override createJavaScriptEvaluatorBlock")
},l.templateEngine.prototype.makeTemplateSource=function(e,t){
if("string"==typeof e){var i=(t=t||n).getElementById(e)
;if(!i)throw new Error("Cannot find template with ID "+e)
;return new l.templateSources.domElement(i)}
if(1==e.nodeType||8==e.nodeType)return new l.templateSources.anonymousTemplate(e)
;throw new Error("Unknown template type: "+e)
},l.templateEngine.prototype.renderTemplate=function(e,t,n,i){
var r=this.makeTemplateSource(e,i);return this.renderTemplateSource(r,t,n,i)
},l.templateEngine.prototype.isTemplateRewritten=function(e,t){
return!1===this.allowTemplateRewriting||this.makeTemplateSource(e,t).data("isRewritten")
},l.templateEngine.prototype.rewriteTemplate=function(e,t,n){
var i=this.makeTemplateSource(e,n),r=t(i.text())
;i.text(r),i.data("isRewritten",!0)
},l.exportSymbol("templateEngine",l.templateEngine),
l.templateRewriting=function(){
var e=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,t=/<!--\s*ko\b\s*([\s\S]*?)\s*-->/g
;function n(e,t,n,i){var r=l.expressionRewriting.parseObjectLiteral(e)
;!function(e){
for(var t=l.expressionRewriting.bindingRewriteValidators,n=0;n<e.length;n++){
var i=e[n].key;if(Object.prototype.hasOwnProperty.call(t,i)){var r=t[i]
;if("function"==typeof r){var o=r(e[n].value);if(o)throw new Error(o)
}else if(!r)throw new Error("This template engine does not support the '"+i+"' binding within its templates")
}}}(r)
;var o="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+l.expressionRewriting.preProcessBindings(r,{
valueAccessors:!0})+" } })()},'"+n.toLowerCase()+"')"
;return i.createJavaScriptEvaluatorBlock(o)+t}return{
ensureTemplateIsRewritten:function(e,t,n){
t.isTemplateRewritten(e,n)||t.rewriteTemplate(e,(function(e){
return l.templateRewriting.memoizeBindingAttributeSyntax(e,t)}),n)},
memoizeBindingAttributeSyntax:function(i,r){return i.replace(e,(function(){
return n(arguments[4],arguments[1],arguments[2],r)})).replace(t,(function(){
return n(arguments[1],"\x3c!-- ko --\x3e","#comment",r)}))},
applyMemoizedBindingsToNextSibling:function(e,t){
return l.memoization.memoize((function(n,i){var r=n.nextSibling
;r&&r.nodeName.toLowerCase()===t&&l.applyBindingAccessorsToNode(r,e,i)}))}}
}(),l.exportSymbol("__tr_ambtns",l.templateRewriting.applyMemoizedBindingsToNextSibling),
function(){l.templateSources={},l.templateSources.domElement=function(e){
if(this.domElement=e,e){var t=l.utils.tagNameLower(e)
;this.templateType="script"===t?1:"textarea"===t?2:"template"==t&&e.content&&11===e.content.nodeType?3:4
}},l.templateSources.domElement.prototype.text=function(){
var e=1===this.templateType?"text":2===this.templateType?"value":"innerHTML"
;if(0==arguments.length)return this.domElement[e];var t=arguments[0]
;"innerHTML"===e?l.utils.setHtml(this.domElement,t):this.domElement[e]=t}
;var t=l.utils.domData.nextKey()+"_"
;l.templateSources.domElement.prototype.data=function(e){
if(1===arguments.length)return l.utils.domData.get(this.domElement,t+e)
;l.utils.domData.set(this.domElement,t+e,arguments[1])}
;var n=l.utils.domData.nextKey();function i(e){
return l.utils.domData.get(e,n)||{}}function r(e,t){l.utils.domData.set(e,n,t)}
l.templateSources.domElement.prototype.nodes=function(){var t=this.domElement
;if(0==arguments.length){
var n=i(t),o=n.containerData||(3===this.templateType?t.content:4===this.templateType?t:e)
;if(!o||n.alwaysCheckText){var s=this.text()
;s&&(o=l.utils.parseHtmlForTemplateNodes(s,t.ownerDocument),this.text(""),r(t,{
containerData:o,alwaysCheckText:!0}))}return o}var a=arguments[0];r(t,{
containerData:a})},l.templateSources.anonymousTemplate=function(e){
this.domElement=e
},l.templateSources.anonymousTemplate.prototype=new l.templateSources.domElement,
l.templateSources.anonymousTemplate.prototype.constructor=l.templateSources.anonymousTemplate,
l.templateSources.anonymousTemplate.prototype.text=function(){
if(0==arguments.length){var t=i(this.domElement)
;return t.textData===e&&t.containerData&&(t.textData=t.containerData.innerHTML),
t.textData}var n=arguments[0];r(this.domElement,{textData:n})
},l.exportSymbol("templateSources",l.templateSources),
l.exportSymbol("templateSources.domElement",l.templateSources.domElement),
l.exportSymbol("templateSources.anonymousTemplate",l.templateSources.anonymousTemplate)
}(),function(){var t;function n(e,t,n){
for(var i,r=e,o=l.virtualElements.nextSibling(t);r&&(i=r)!==o;)n(i,r=l.virtualElements.nextSibling(i))
}function i(e,t){if(e.length){
var i=e[0],r=e[e.length-1],o=i.parentNode,s=l.bindingProvider.instance,a=s.preprocessNode
;if(a){if(n(i,r,(function(e,t){var n=e.previousSibling,o=a.call(s,e)
;o&&(e===i&&(i=o[0]||t),e===r&&(r=o[o.length-1]||n))})),e.length=0,!i)return
;i===r?e.push(i):(e.push(i,r),l.utils.fixUpContinuousNodeArray(e,o))}
n(i,r,(function(e){1!==e.nodeType&&8!==e.nodeType||l.applyBindings(t,e)
})),n(i,r,(function(e){
1!==e.nodeType&&8!==e.nodeType||l.memoization.unmemoizeDomNodeAndDescendants(e,[t])
})),l.utils.fixUpContinuousNodeArray(e,o)}}function r(e){
return e.nodeType?e:e.length>0?e[0]:null}function o(e,n,o,s,a){a=a||{}
;var u=(e&&r(e)||o||{}).ownerDocument,d=a.templateEngine||t
;l.templateRewriting.ensureTemplateIsRewritten(o,d,u)
;var c=d.renderTemplate(o,s,a,u)
;if("number"!=typeof c.length||c.length>0&&"number"!=typeof c[0].nodeType)throw new Error("Template engine must return an array of DOM nodes")
;var p=!1;switch(n){case"replaceChildren":
l.virtualElements.setDomNodeChildren(e,c),p=!0;break;case"replaceNode":
l.utils.replaceDomNodes(e,c),p=!0;break;case"ignoreTargetNode":break;default:
throw new Error("Unknown renderMode: "+n)}
return p&&(i(c,s),a.afterRender&&l.dependencyDetection.ignore(a.afterRender,null,[c,s[a.as||"$data"]]),
"replaceChildren"==n&&l.bindingEvent.notify(e,l.bindingEvent.childrenComplete)),
c}function s(e,t,n){return l.isObservable(e)?e():"function"==typeof e?e(t,n):e}
l.setTemplateEngine=function(n){
if(n!=e&&!(n instanceof l.templateEngine))throw new Error("templateEngine must inherit from ko.templateEngine")
;t=n},l.renderTemplate=function(n,i,a,u,d){
if(((a=a||{}).templateEngine||t)==e)throw new Error("Set a template engine before calling renderTemplate")
;if(d=d||"replaceChildren",u){var c=r(u),p=c&&"replaceNode"==d?c.parentNode:c
;return l.dependentObservable((function(){
var e=i&&i instanceof l.bindingContext?i:new l.bindingContext(i,null,null,null,{
exportDependencies:!0}),t=s(n,e.$data,e),p=o(u,d,t,e,a)
;"replaceNode"==d&&(c=r(u=p))}),null,{disposeWhen:function(){
return!c||!l.utils.domNodeIsAttachedToDocument(c)},disposeWhenNodeIsRemoved:p})}
return l.memoization.memoize((function(e){
l.renderTemplate(n,i,a,e,"replaceNode")}))
},l.renderTemplateForEach=function(t,n,r,a,u){var d,c=r.as,p=function(e,n){
d=u.createChildContext(e,{as:c,noChildContext:r.noChildContext,
extend:function(e){e.$index=n,c&&(e[c+"Index"]=n)}});var i=s(t,e,d)
;return o(a,"ignoreTargetNode",i,d,r)},f=function(e,t,n){
i(t,d),r.afterRender&&r.afterRender(t,e),d=null},m=function(e,t){
l.dependencyDetection.ignore(l.utils.setDomNodeChildrenFromArrayMapping,null,[a,e,p,r,f,t]),
l.bindingEvent.notify(a,l.bindingEvent.childrenComplete)
},b=!1===r.includeDestroyed||l.options.foreachHidesDestroyed&&!r.includeDestroyed
;if(b||r.beforeRemove||!l.isObservableArray(n))return l.dependentObservable((function(){
var t=l.utils.unwrapObservable(n)||[]
;void 0===t.length&&(t=[t]),b&&(t=l.utils.arrayFilter(t,(function(t){
return t===e||null===t||!l.utils.unwrapObservable(t._destroy)}))),m(t)}),null,{
disposeWhenNodeIsRemoved:a});m(n.peek());var v=n.subscribe((function(e){m(n(),e)
}),null,"arrayChange");return v.disposeWhenNodeIsRemoved(a),v}
;var a=l.utils.domData.nextKey(),u=l.utils.domData.nextKey()
;l.bindingHandlers.template={init:function(e,t){
var n=l.utils.unwrapObservable(t())
;if("string"==typeof n||n.name)l.virtualElements.emptyNode(e);else if("nodes"in n){
var i=n.nodes||[]
;if(l.isObservable(i))throw new Error('The "nodes" option must be a plain, non-observable array.')
;(o=i[0]&&i[0].parentNode)&&l.utils.domData.get(o,u)||(o=l.utils.moveCleanedNodesToContainerElement(i),
l.utils.domData.set(o,u,!0)),new l.templateSources.anonymousTemplate(e).nodes(o)
}else{var r=l.virtualElements.childNodes(e)
;if(!(r.length>0))throw new Error("Anonymous template defined, but no template content was provided")
;var o=l.utils.moveCleanedNodesToContainerElement(r)
;new l.templateSources.anonymousTemplate(e).nodes(o)}return{
controlsDescendantBindings:!0}},update:function(t,n,i,r,o){
var s,u=n(),d=l.utils.unwrapObservable(u),c=!0,p=null
;if("string"==typeof d?(s=u,
d={}):(s=d.name,"if"in d&&(c=l.utils.unwrapObservable(d.if)),
c&&"ifnot"in d&&(c=!l.utils.unwrapObservable(d.ifnot))),"foreach"in d){
var f=c&&d.foreach||[];p=l.renderTemplateForEach(s||t,f,d,t,o)}else if(c){
var m=o;"data"in d&&(m=o.createChildContext(d.data,{as:d.as,
noChildContext:d.noChildContext,exportDependencies:!0
})),p=l.renderTemplate(s||t,m,d,t)}else l.virtualElements.emptyNode(t)
;!function(t,n){var i=l.utils.domData.get(t,a)
;i&&"function"==typeof i.dispose&&i.dispose(),
l.utils.domData.set(t,a,!n||n.isActive&&!n.isActive()?e:n)}(t,p)}
},l.expressionRewriting.bindingRewriteValidators.template=function(e){
var t=l.expressionRewriting.parseObjectLiteral(e)
;return 1==t.length&&t[0].unknown||l.expressionRewriting.keyValueArrayContainsKey(t,"name")?null:"This template engine does not support anonymous templates nested within its templates"
},l.virtualElements.allowedBindings.template=!0
}(),l.exportSymbol("setTemplateEngine",l.setTemplateEngine),
l.exportSymbol("renderTemplate",l.renderTemplate),
l.utils.findMovesInArrayComparison=function(e,t,n){var i,r,o,s,a
;if(e.length&&t.length)for(i=r=0;(!n||i<n)&&(s=e[r]);++r){
for(o=0;a=t[o];++o)if(s.value===a.value){
s.moved=a.index,a.moved=s.index,t.splice(o,1),i=o=0;break}i+=o}
},l.utils.compareArrays=function(){var e="added",t="deleted"
;function n(e,t,n,i,r){
var o,s,a,u,d,c=Math.min,p=Math.max,f=[],m=e.length,b=t.length,v=b-m||1,g=m+b+1
;for(o=0;o<=m;o++)for(u=a,
f.push(a=[]),d=c(b,o+v),s=p(0,o-1);s<=d;s++)if(s)if(o)if(e[o-1]===t[s-1])a[s]=u[s-1];else{
var h=u[s]||g,y=a[s-1]||g;a[s]=c(h,y)+1}else a[s]=s+1;else a[s]=o+1
;var x,E=[],w=[],C=[]
;for(o=m,s=b;o||s;)x=f[o][s]-1,s&&x===f[o][s-1]?w.push(E[E.length]={status:n,
value:t[--s],index:s}):o&&x===f[o-1][s]?C.push(E[E.length]={status:i,
value:e[--o],index:o}):(--s,--o,r.sparse||E.push({status:"retained",value:t[s]
}))
;return l.utils.findMovesInArrayComparison(C,w,!r.dontLimitMoves&&10*m),E.reverse()
}return function(i,r,o){return o="boolean"==typeof o?{dontLimitMoves:o
}:o||{},r=r||[],(i=i||[]).length<r.length?n(i,r,e,t,o):n(r,i,t,e,o)}
}(),l.exportSymbol("utils.compareArrays",l.utils.compareArrays),function(){
function t(t,n,i,r,o){var s=[],a=l.dependentObservable((function(){
var e=n(i,o,l.utils.fixUpContinuousNodeArray(s,t))||[]
;s.length>0&&(l.utils.replaceDomNodes(s,e),
r&&l.dependencyDetection.ignore(r,null,[i,e,o])),
s.length=0,l.utils.arrayPushAll(s,e)}),null,{disposeWhenNodeIsRemoved:t,
disposeWhen:function(){return!l.utils.anyDomNodeIsAttachedToDocument(s)}})
;return{mappedNodes:s,dependentObservable:a.isActive()?a:e}}
var n=l.utils.domData.nextKey(),i=l.utils.domData.nextKey()
;l.utils.setDomNodeChildrenFromArrayMapping=function(r,o,s,a,u,d){
void 0===(o=o||[]).length&&(o=[o]),a=a||{}
;var c,p,f,m,b,v,g,h=l.utils.domData.get(r,n),y=!h,x=[],E=0,w=0,C=[],S=[],D=[],N=[],T=[],k=0
;function O(e){c={arrayEntry:e,indexObservable:l.observable(w++)
},x.push(c),y||T.push(c)}function _(e){
c=h[e],w!==e&&N.push(c),c.indexObservable(w++),
l.utils.fixUpContinuousNodeArray(c.mappedNodes,r),x.push(c)}function I(e,t){
if(e)for(var n=0,i=t.length;n<i;n++)l.utils.arrayForEach(t[n].mappedNodes,(function(i){
e(i,n,t[n].arrayEntry)}))}if(y)l.utils.arrayForEach(o,O);else{
if(!d||h&&h._countWaitingForRemove){var A=y?[]:l.utils.arrayMap(h,(function(e){
return e.arrayEntry})),R={dontLimitMoves:a.dontLimitMoves,sparse:!0}
;d=l.utils.compareArrays(A,o,R)}
for(var F,B,V,H=0;F=d[H];H++)switch(B=F.moved,V=F.index,F.status){case"deleted":
for(;E<V;)_(E++)
;B===e&&((c=h[E]).dependentObservable&&(c.dependentObservable.dispose(),
c.dependentObservable=e),
l.utils.fixUpContinuousNodeArray(c.mappedNodes,r).length&&(a.beforeRemove&&(x.push(c),
k++,c.arrayEntry===i?c=null:D.push(c)),c&&C.push.apply(C,c.mappedNodes))),E++
;break;case"added":for(;w<V;)_(E++);B!==e?(S.push(w),_(B)):O(F.value)}
for(;w<o.length;)_(E++);x._countWaitingForRemove=k}
l.utils.domData.set(r,n,x),I(a.beforeMove,N),
l.utils.arrayForEach(C,a.beforeRemove?l.cleanNode:l.removeNode);try{
g=r.ownerDocument.activeElement}catch(P){}if(S.length)for(;(H=S.shift())!=e;){
for(c=x[H],m=e;H;)if((v=x[--H].mappedNodes)&&v.length){m=v[v.length-1];break}
for(p=0;b=c.mappedNodes[p];m=b,p++)l.virtualElements.insertAfter(r,b,m)}for(H=0,
f=l.virtualElements.firstChild(r);c=x[H];H++){
for(c.mappedNodes||l.utils.extend(c,t(r,s,c.arrayEntry,u,c.indexObservable)),
p=0;b=c.mappedNodes[p];f=b.nextSibling,
m=b,p++)b!==f&&l.virtualElements.insertAfter(r,b,m)
;!c.initialized&&u&&(u(c.arrayEntry,c.mappedNodes,c.indexObservable),
c.initialized=!0)}
for(g&&r.ownerDocument.activeElement!=g&&g.focus(),I(a.beforeRemove,D),
H=0;H<D.length;++H)D[H].arrayEntry=i;I(a.afterMove,N),I(a.afterAdd,T)}
}(),l.exportSymbol("utils.setDomNodeChildrenFromArrayMapping",l.utils.setDomNodeChildrenFromArrayMapping),
l.nativeTemplateEngine=function(){this.allowTemplateRewriting=!1
},l.nativeTemplateEngine.prototype=new l.templateEngine,
l.nativeTemplateEngine.prototype.constructor=l.nativeTemplateEngine,
l.nativeTemplateEngine.prototype.renderTemplateSource=function(e,t,n,i){
var r=l.utils.ieVersion<9||!e.nodes?null:e.nodes()
;if(r)return l.utils.makeArray(r.cloneNode(!0).childNodes);var o=e.text()
;return l.utils.parseHtmlFragment(o,i)
},l.nativeTemplateEngine.instance=new l.nativeTemplateEngine,
l.setTemplateEngine(l.nativeTemplateEngine.instance),
l.exportSymbol("nativeTemplateEngine",l.nativeTemplateEngine),function(){
l.jqueryTmplTemplateEngine=function(){var e=this.jQueryTmplVersion=function(){
if(!r||!r.tmpl)return 0;try{
if(r.tmpl.tag.tmpl.open.toString().indexOf("__")>=0)return 2}catch(e){}return 1
}();this.renderTemplateSource=function(t,i,o,s){s=s||n,o=o||{},function(){
if(e<2)throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")
}();var a=t.data("precompiled");if(!a){var l=t.text()||""
;l="{{ko_with $item.koBindingContext}}"+l+"{{/ko_with}}",
a=r.template(null,l),t.data("precompiled",a)}var u=function(e,t,n){
return r.tmpl(e,t,n)}(a,[i.$data],r.extend({koBindingContext:i
},o.templateOptions));return u.appendTo(s.createElement("div")),r.fragments={},u
},this.createJavaScriptEvaluatorBlock=function(e){
return"{{ko_code ((function() { return "+e+" })()) }}"
},this.addTemplate=function(e,t){
n.write("<script type='text/html' id='"+e+"'>"+t+"<\/script>")
},e>0&&(r.tmpl.tag.ko_code={open:"__.push($1 || '');"},r.tmpl.tag.ko_with={
open:"with($1) {",close:"} "})
},l.jqueryTmplTemplateEngine.prototype=new l.templateEngine,
l.jqueryTmplTemplateEngine.prototype.constructor=l.jqueryTmplTemplateEngine
;var e=new l.jqueryTmplTemplateEngine
;e.jQueryTmplVersion>0&&l.setTemplateEngine(e),
l.exportSymbol("jqueryTmplTemplateEngine",l.jqueryTmplTemplateEngine)}()}))}();