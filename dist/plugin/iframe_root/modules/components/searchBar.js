define(["uuid","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/httpUtils","./copy/copyObjectsControl","../lib/text","../lib/style","./searchWarnings"],(function(t,e,s,o,a,i,n,r,l,c,d){
"use strict"
;const h=i.tag,u=h("p"),p=h("img"),g=h("div"),y=h("button"),m=h("span"),b=h("input")
;class k extends a{constructor(t,s){super(t)
;const{searchInput:o,forceSearch:a,searching:n,selectedObjects:r,searchHistory:l,canReset:c,actions:d}=t
;this.selectedObjects=r,
this.runtime=s.$root.runtime,this.logo=null,this.searchControlValue=e.observable().syncFrom(o),
this.searchInput=o,
this.searchInputClass=e.pureComputed(()=>this.searchControlValue()!==this.searchInput()?f.classes.modifiedFilterInput:this.searchInput()?f.classes.activeFilterInput:null),
this.forceSearch=a,
this.searching=n,this.showHistory=e.observable(),this.searchHistory=l,
this.historyContainerId=i.genId(),
this.canReset=c,this.resetSearchControls=d.resetSearch,
this.documentClickListener=t=>{this.clickListener(t)
},document.addEventListener("click",this.documentClickListener,!0)}
addToHistory(t){
t&&0!==t.trim().length&&(this.searchHistory.remove(t),this.searchHistory.unshift(t),
this.searchHistory().length>10&&this.searchHistory.pop())}useFromHistory(t){
this.showHistory(!1),this.searchControlValue(t),this.doSearch()}
doToggleHistory(){this.showHistory(!this.showHistory())}doClearInput(){
this.searchInput("")}doReset(){this.resetSearchControls()}doSearch(){
const e=this.searchControlValue()
;/^\s*$/.test(e)||(this.forceSearch(new t(4).format()),this.searchInput(e))}
doKeyUp(t,e){
e.key?"Enter"===e.key&&this.doSearch():e.keyCode&&13===e.keyCode&&this.doSearch()
}clickListener(t){const e=t.target.getAttribute("data-type")
;return-1==["history-toggle-button","history-toggle-button-icon","history-item"].indexOf(e)&&this.showHistory(!1),
!0}showHelp(){this.parentBus.send("show-help")}googleFormLink(t){const e={
usp:"pp_url","entry.45112532":t.username,"entry.1257375807":t.realname,
"entry.1670959681":t.email,"entry.250050267":t.subject}
;return"https://docs.google.com/forms/d/e/1FAIpQLSf1STAE0g3wcg5z4NGUJPB05PZq_38Nzw8yesDff0kf6U0W0A/viewform?"+n.encodeQuery(e)
}showFeedback(){const t={
username:this.runtime.service("session").getUsername()||"",
realname:this.runtime.service("session").getRealname()||"",
email:this.runtime.service("session").getEmail()||"",subject:"Public Search"}
;window.open(this.googleFormLink(t),"_blank")}dispose(){
this.clickListener&&document.removeEventListener("click",this.clickListener,!0)}
}const f=i.makeStyles({component:{display:"flex",flexDirection:"row"},
searchBarArea:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}},
inputColumn:{css:{flex:"1 1 0px"}},buttonColumn:{css:{flex:"1 1 0px"}},
activeFilterInput:{backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},
modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},
historyContainer:{display:"block",position:"absolute",border:"1px silver solid",
backgroundColor:"rgba(255,255,255,0.9)",zIndex:"3",top:"100%",left:"0",right:"0"
},historyItem:{css:{padding:"3px",cursor:"pointer"},pseudo:{hover:{
backgroundColor:"silver"}}},addonButton:{css:{color:"black",cursor:"pointer"},
pseudo:{hover:{backgroundColor:"silver"},active:{backgroundColor:"gray",
color:"white"}}},addonButtonDisabled:{css:{color:"gray",cursor:"normal"}}})
;return s.registerComponent((function(){return{viewModelWithContext:k,
template:g({class:f.classes.component},[g({class:f.classes.searchBarArea},[g({
class:f.classes.inputColumn},g({class:"form"},g({class:"input-group"
},[o.if("logo",g({class:"input-group-addon ",style:{padding:"0",border:"none",
backgroundColor:"transparent"}},p({dataBind:{attr:{src:"logo"}},style:{
display:"inline",height:"30px",marginRight:"6px"}}))),g({class:"form-control",
style:{display:"inline-block",width:"100%",position:"relative",padding:"0",
border:"none"}},[b({class:["form-control"],dataBind:{
textInput:"searchControlValue",hasFocus:!0,css:"searchInputClass",event:{
keyup:"doKeyUp"}},placeholder:"Search KBase Data",
title:l.getTooltip("SEARCH_INPUT")}),o.if("showHistory",g({
class:f.classes.historyContainer,dataBind:{attr:{id:"historyContainerId"}}
},o.if("searchHistory().length > 0",o.foreach("searchHistory",g({dataBind:{
text:"$data",
click:"function(d,e){$component.useFromHistory.call($component,d,e)}"},
class:f.classes.historyItem,dataType:"history-item"})),u({style:{
fontStyle:"italic",padding:"8px",margin:"0px"}
},"no items in history yet - it will be populated as you conduct searches!"))))]),g({
class:["input-group-addon ",f.classes.addonButton,c.classes.tooltipDark],
dataBind:{click:"doSearch"},title:l.getTooltip("SEARCH_BUTTON")},m({class:"fa",
style:{fontSize:"100%"},dataBind:{css:{"fa-search":"!$component.searching()",
"fa-spinner fa-pulse":"$component.searching()"}}})),g({
class:["input-group-addon",f.classes.addonButton,c.classes.tooltipDark],
dataType:"history-toggle-button",title:l.getTooltip("SEARCH_HISTORY_BUTTON"),
dataBind:{click:"doToggleHistory",style:{
"background-color":'showHistory() ? "silver" : null'}}},m({
dataType:"history-toggle-button-icon",class:"fa fa-history"})),g({
class:["input-group-addon",f.classes.addonButton,c.classes.tooltipDark],
title:l.getTooltip("SEARCH_CLEAR_BUTTON"),dataBind:{
click:"searchControlValue() ? doClearInput : null",
css:'searchControlValue() ? "'+f.classes.addonButton+'" : "'+f.classes.addonButtonDisabled+'"'
}},m({class:"fa fa-trash-o"})),g({
class:["input-group-addon",f.classes.addonButton,c.classes.tooltipDark],
title:l.getTooltip("SEARCH_RESET_BUTTON"),dataBind:{
click:"canReset() ? doReset : null",
css:'canReset() ? "'+f.classes.addonButton+'" : "'+f.classes.addonButtonDisabled+'"'
}},m({class:"fa fa-recycle"}))]))),g({class:f.classes.buttonColumn},g({
class:"btn-toolbar pull-right"},[o.component({name:r.name(),
params:["selectedObjects","bus"]}),y({class:"btn btn-default",
title:l.getTooltip("FEEDBACK_BUTTON"),dataBind:{
click:"function(d,e){$component.showFeedback.call($component,d,e);}"}},[m({
class:"fa fa-bullhorn"})," Feedback"]),y({class:"btn btn-default",
title:l.getTooltip("HELP_BUTTON"),dataBind:{
click:"function(d,e){$component.showHelp.call($component,d,e);}"}},[m({
class:"fa fa-question-circle"})," Help"])]))])]),stylesheet:f.sheet}}))}));