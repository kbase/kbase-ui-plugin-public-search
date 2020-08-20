define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,a,o){
"use strict"
;const d=o.tag,i=(d("a"),d("span")),n=d("div"),s=d("table"),r=d("tbody"),c=d("tr"),l=d("th"),f=d("td"),m=o.makeStyles({
table:{css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}}});class b{constructor({createdAt:t,modifiedAt:e}){
this.createdAt=t,this.modifiedAt=e}}function h(){return n([n([i({
class:m.classes.sectionHeader},"Object Info")]),s({class:m.classes.table
},[r([c([l("Created at"),f({dataBind:{typedText:{value:"createdAt",
type:'"date"',format:'"YYYY/MM/DD @ hh:mm a"'}}})]),c([l("Last modified at"),f({
dataBind:{typedText:{value:"modifiedAt",type:'"date"',
format:'"YYYY/MM/DD @ hh:mm a"'}}})])])])])}
return e.registerComponent((function(){return{viewModel:b,template:h(),
stylesheet:m.sheet}}))}));