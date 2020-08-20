define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,t,o,r){
"use strict";class s{constructor(){
this.warnings=e.observableArray(),this.inputWarnings=e.pureComputed((function(){
var e=searchTerms();switch(e.diagnosis){case"just-whitespace":
return["Empty search input.","You must supply one or more terms to initiate a query."]
;case"just-stopwords":
return['The search consisted of just "stop words".',"Stop words are considered too common to be usefully applied to a search.","The following stop words were detected: "+e.theStopWords.join(", ")+"."]
;case"some-stopwords":
return['The search included some "stop words".',"Stop words are considered too common to be usefully applied to a search and are removed from the terms before submitting the query.","The following stop words were detected and removed: "+e.theStopWords.join(", ")+".","The terms sent were: "+e.terms.join(" ")]
}return[]}))}doClearWarnings(){this.warnings.removeAll()}}
const n=r.tag,a=n("button"),i=n("div"),d=r.makeStyles({warningContainer:{css:{
display:"block",position:"absolute",border:"1px silver solid",
backgroundColor:"#fcf8e3",zIndex:"3",top:"100%",left:"0",right:"0"}}})
;return t.registerComponent((function(){return{viewModel:s,
template:o.if("warnings().length",i({class:d.classes.warningContainer},[i({
dataBind:{foreach:"warnings"}},i({style:{marginTop:"2px",marginBottom:"2px",
padding:"3px"},dataBind:{text:"$data"}})),i({style:{
borderTop:"1px solid rgba(200,200,200,0.5)",padding:"3px",textAlign:"center"}
},[a({class:"btn btn-default btn-sm",type:"button",dataBind:{
click:"function(){$component.doClearWarnings.call($component)}"}},"Clear")])]))}
}))}));