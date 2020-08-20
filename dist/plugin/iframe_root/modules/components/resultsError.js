define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(t,e,r,n,o){
"use strict";const s=o.tag,a=s("div"),i=s("p"),c=s("hr"),l=s("button")
;class u extends n{constructor(t){super(t);const{table:e}=t
;this.errorMessage=e.errorMessage()}}return e.registerComponent((function(){
return{viewModel:u,template:a({class:"alert alert-danger",style:{
margin:"40px auto 0 auto",maxWidth:"40em",padding:"20px"}
},[i("Error running your search!"),c({style:{width:"50%"}}),i({dataBind:{
text:"errorMessage"}}),i({style:{marginTop:"10px",textAlign:"center"}},[l({
class:"btn btn-default",dataBind:{click:'function(){bus.send("showError")}'}
},"Show Error")])])}}))}));