define(["knockout"],(function(t){"use strict";function n(t){
if(void 0===t)return!0;switch(t){case'""':case"[]":case"{}":case"null":return!0}
}t.extenders.dirty=function(e,s){let i=e()
;const r=t.observable(t.mapping.toJSON(e)),a=t.observable(t.utils.unwrapObservable(s))
;return e.isDirty=t.computed((function(){
const s=t.mapping.toJSON(e),i=n(s),o=r();return!(i&n(o))&&(a()||s!==o)
})),e.markClean=function(){r(t.mapping.toJSON(e)),i=e(),a(!1)
},e.markDirty=function(){a(!0)},e.reset=function(){e(i)},e
},t.extenders.logChange=function(t,n){return t.subscribe((function(t){
console.log(n,t)})),t},t.extenders.enabled=function(n,e){const s=t.observable()
;n.isEnabled=s,e.observable.subscribe((function(t){try{const n=s(),i=e.fun(t)
;void 0===n?s(i):n?i||s(!1):i&&s(!0)}catch(n){
console.error("Error running enable test: "+n.message)}}))
},t.extenders.constraint=function(n,e){function s(){try{const t=n()
;if(function(t){
return null==t||!("string"!=typeof t||!n.constraint.autoTrim()||0!==t.trim().length)||t instanceof Array&&0===t.length
}(t))return n.constraint.isRequired()?(n.constraint.message(n.constraint.messages.requiredButEmpty||"Required but empty"),
n.constraint.isValid(!1),
void n.constraint.state("required-missing")):(n.constraint.message(""),
n.constraint.isValid(!0),void n.constraint.state("empty-optional"))
;if(!e.validate)return n.constraint.message(""),
n.constraint.isValid(!0),void n.constraint.state("valid");let s=e.validate(t)
;"string"==typeof s&&(s={message:s
}),s?(n.constraint.message(s.message||""),n.constraint.isValid(!1),
n.constraint.state("invalid")):(n.constraint.message(""),
n.constraint.isValid(!0),n.constraint.state("valid"))}catch(t){
n.constraint.message("Error running validation: "+t.message),
console.error("Error running validation: "+t.message),n.constraint.isValid(!1)}}
return n.constraint={},
n.constraint.description=e.description,n.constraint.messages=e.messages||{},
e.required?t.isComputed(e.required)||t.isObservable(e.required)?n.constraint.isRequired=e.required:n.constraint.isRequired=t.observable(e.required):n.constraint.isRequired=t.observable(!1),
n.constraint.autoTrim=t.observable(e.autoTrim||!0),
n.constraint.isValid=t.observable(e.valid||!0),
n.constraint.message=t.observable(),
n.constraint.state=t.observable("new"),s(n()),
n.subscribe(s),n.constraint.isRequired.subscribe(s),n}}));