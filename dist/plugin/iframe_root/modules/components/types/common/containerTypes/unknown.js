define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,a,n){
"use strict"
;const o=n.tag,s=o("div"),i=o("span"),d=o("table"),r=o("tbody"),c=o("tr"),l=o("th"),b=o("td"),h=n.makeStyles({
table:{css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}}});class k{
constructor({name:t,owner:e,lastModifiedAt:a,workspaceId:n,objectId:o}){
this.name=t,
this.owner=e,this.lastModifiedAt=a,this.workspaceId=n,this.objectId=o}}
function p(){return s([s([i({class:h.classes.sectionHeader
},"Unknown Workspace")]),d({class:h.classes.table},[r([c([l("Narrative"),b(i({
dataBind:{text:"name"}}))]),c([l("Owner"),b(i({dataBind:{text:"owner"}
}))]),c([l("Created"),b(i({},"tbd"))]),c([l("Last modified"),b(i({dataBind:{
typedText:{value:"lastModifiedAt",type:'"date"',format:'"YYYY-MM-DD @ hh:mm a"'}
}}))])])])])}return e.registerComponent((function(){return{viewModel:k,
template:p(),stylesheet:h.sheet}}))}));