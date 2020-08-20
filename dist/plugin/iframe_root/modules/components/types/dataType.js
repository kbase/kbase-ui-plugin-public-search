define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,n,s){
"use strict"
;const o=s.tag,a=o("a"),i=o("span"),r=o("div"),l=o("table"),c=o("tbody"),d=o("tr"),b=o("th"),p=o("td"),g=s.makeStyles({
table:{css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}}});class u{constructor({typeID:t,name:e,module:n,version:s}){
this.typeID=t,this.name=e,this.module=n,this.version=s}}function h(){
return r([r([i({class:g.classes.sectionHeader},"Data Type"),a({
class:"btn btn-link",target:"_blank",dataBind:{attr:{
href:'"/#spec/type/" + typeID'}}},"view")]),l({class:g.classes.table
},[c([d([b("Type"),p("Genome")]),d([b("Version"),p("14.1")])])])])}
return e.registerComponent((function(){return{viewModel:u,template:h(),
stylesheet:g.sheet}}))}));