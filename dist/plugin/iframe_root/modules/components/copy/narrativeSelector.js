define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","../../lib/model"],(function(e,t,a,r,s,o){
"use strict";const i=r.tag,l=i("div"),n=i("span"),d=i("input"),c=i("select")
;class u{constructor(t,a){function r(e,t){return e<t?-1:e>t?1:0}
this.runtime=a.$root.runtime,this.model=new o.Model({runtime:this.runtime
}),this.selectedNarrative=e.observable(),
this.selectedNarrative.syncWith(t.selectedNarrative),this.sortOptions=[{
label:"Title",value:"title",selected:e.observable(!1)},{label:"Date",
value:"date",selected:e.observable(!1)
}],this.sortOption=e.observable("date"),this.sortDirection=e.observable("descending"),
this.ready=e.observable(!1),
this.narratives=e.observableArray([]),this.error=e.observable(),
this.inputValue=e.observable().extend({rateLimit:150
}),this.loading=e.observable(!1),
this.searchExpression=e.pureComputed(()=>!this.inputValue()||this.inputValue().length<2?null:this.inputValue()),
this.sortDir=e.pureComputed(()=>"ascending"===this.sortDirection()?1:-1),
this.narrativesFiltered=e.pureComputed(()=>{const e=this.searchExpression()
;let t;if(e){const a=e.toLowerCase()
;t=this.narratives().filter(e=>Object.keys(e.searchable).some(t=>e.searchable[t].indexOf(a)>=0))
}else t=this.narratives();const a=this.sortOption();return t.sort((e,t)=>{
var s=this.sortDir();switch(a){case"title":
return s*r(e.sortable.title,t.sortable.title);case"username":
return s*r(e.sortable.username,t.sortable.username);case"date":default:
return s*r(e.sortable.date,t.sortable.date)}})
}),this.totalCount=e.pureComputed(()=>this.narratives().length),
this.tooManyResults=e.observable(!1),
this.searchCount=e.observable(),this.isSearching=e.observable(!1),
this.model.getWritableNarratives().then(t=>{t.forEach(t=>{this.narratives.push({
title:t.metadata.narrative_nice_name,
ref:[String(t.id),t.metadata.narrative].join("/"),owner:t.owner,
realName:t.ownerRealName,date:t.modDate,searchable:{
title:t.metadata.narrative_nice_name.toLowerCase(),owner:t.owner,
realName:t.ownerRealName.toLowerCase()},sortable:{
title:t.metadata.narrative_nice_name.toLowerCase(),owner:t.owner,
date:t.modDate.getTime()},active:e.observable(!1),selected:e.observable(!1)})}),
this.ready(!0)}).catch(e=>{this.error(e)})}doSelectValue(e){
if(e.selected())return e.selected(!1),void this.selectedNarrative(null)
;this.narrativesFiltered().forEach(e=>{e.selected(!1)
}),this.selectedNarrative(e.ref),e.selected(!0)}doActivate(e){e.active(!0)}
doDeactivate(e){e.active(!1)}doClearSearch(){this.inputValue("")}doToggleSort(){
this.sortDirection("descending"===this.sortDirection()?"ascending":"descending")
}}var h=r.makeStyles({component:{css:{},inner:{".-row.-active":{css:{
backgroundColor:"silver"}}}},container:{css:{}},selectedRow:{css:{
backgroundColor:"silver"}},hoverRow:{css:{backgroundColor:"silver"}},
addonButton:{css:{},pseudoClasses:{hover:{
backgroundColor:"rgba(200,200,200,0.5)"},active:{
backgroundColor:"rgba(200,200,200,1)"}}}})
;return t.registerComponent((function(){return{viewModelWithContext:u,
template:l({style:{},class:h.classes.component},l({class:h.classes.container
},[l({dataBind:{if:"loading()"}},s.loading()),l({dataBind:{ifnot:"loading()"}
},[l({width:"100%"},l({style:{display:"flex",flexDirection:"row"}},[d({
class:"form-control",style:{flex:"1"},dataBind:{value:"inputValue",
valueUpdate:'"input"'}}),l({style:{flex:"0 0 auto"}},c({class:"form-control",
style:{flex:"0 0 auto"},dataBind:{value:"sortOption",options:"sortOptions",
optionsValue:'"value"',optionsText:'"label"'}})),n({
class:["input-group-addon","fa",h.classes.addonButton],style:{display:"block",
flex:"0 0 auto",width:"auto"},dataBind:{
class:'sortDirection() === "ascending" ? "fa-sort-asc" : "fa-sort-desc"',
click:"doToggleSort"}}),n({
class:["input-group-addon","fa","fa-times",h.classes.addonButton],style:{
cursor:"pointer",width:"auto"},dataBind:{click:"doClearSearch",
enable:"inputValue"}})])),l({style:{width:"100%",display:"flex",
flexDirection:"column",height:"20em"}},[a.if("ready",(l({style:{
borderTop:"1px silver solid",borderLeft:"1px silver solid",
borderRight:"1px silver solid",backgroundColor:"#EEE",zIndex:"100",
padding:"4px",width:"100%",flex:"0 0 auto"}},[l({style:{flex:"0 0 auto"}
},["Showing ",a.if("narrativesFiltered().length === totalCount()",n(["all ",n({
dataBind:{typedText:{value:"totalCount",type:'"number"',format:'"0,0"'}}
})," writable narratives"]),n([n({dataBind:{text:"narrativesFiltered().length"}
})," out of ",n({dataBind:{text:"totalCount"}
})," writable narratives"]))])]),l({dataBind:{foreach:{
data:"narrativesFiltered",includeDestroyed:"false"}},style:{
border:"1px silver solid",backgroundColor:"white",zIndex:"100",width:"100%",
overflow:"auto",flex:"1"}},l({class:"-row",style:{padding:"4px",
cursor:"pointer",borderBottom:"1px silver solid"},dataBind:{
click:"(d) => {$parent.doSelectValue(d)}",
class:'[($data && $data.active && active() ? "'+h.classes.hoverRow+'" : ""), ($data && $data.selected && selected() ? "'+h.classes.selectedRow+'" : "")].join(" ")',
event:{mouseover:"$parent.doActivate",mouseout:"$parent.doDeactivate"}}},[l({
style:{fontWeight:"bold"},dataBind:{text:"title"}}),l({style:{display:"flex",
flexDirection:"row"}},[l({style:{flex:"2"},dataBind:{text:"realName"}}),l({
style:{flex:"1"},dataBind:{text:"owner"}}),l({style:{flex:"1"},dataBind:{
typedText:{value:"date",type:'"date"',format:'"MM/DD/YYYY"'}}})])]))),l({style:{
textAlign:"center",margin:"20px"}},s.loading("Loading data")))]),l({
class:"text-warning",style:{fontStyle:"italic"},dataBind:{if:"tooManyResults()"}
},["Too many matches (",n({dataBind:{text:"searchCount"}
}),") to display -- please enter more in order to narrow your results."]),l({
style:{fontStyle:"italic"},dataBind:{
if:"!tooManyResults() && narrativesFiltered().length === 0 && inputValue() && inputValue().length < 2"
}
},["Please enter two or more letters above to search for your research or educational organization. "]),l({
style:{fontStyle:"italic"},dataBind:{
if:"!tooManyResults() && narrativesFiltered().length === 0 && inputValue() && inputValue().length >= 2"
}
},["Nothing matched your entry. You may leave it as is to use this value in your profile, ","or try different text to match your organization."])])])),
stylesheet:h.sheet}}))}));