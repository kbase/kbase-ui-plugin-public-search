define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(t,e,s,a,n){
"use strict";const o=(0,n.tag)("div");class i extends a{constructor(t){super(t)
;const{type:e="default",message:s}=t;this.alertClass="alert-"+e,this.message=s}}
return e.registerComponent((function(){return{viewModel:i,template:o({
class:"alert",style:{margin:"40px auto 0 auto",maxWidth:"40em",padding:"20px"},
dataBind:{class:"alertClass"}},o({dataBind:{html:"message"}}))}}))}));