define(["knockout","kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_knockout/lib/generators","kb_lib/html"],(function(e,t,o,l,s){
"use strict";class n extends o{constructor(t){
super(t),this.rows=t.rows,this.table=t.table,
this.columnMap=this.table.columns.reduce((e,t)=>(e[t.name]=t,
e),{}),this.selectedRow=e.observable()}sortTable(e,t){
const o=this.table.sort.column(),l="asc"===this.table.sort.direction()?1:-1
;return"function"==typeof this.columnMap[o].sort?l*this.columnMap[o].sort.comparator(e[o],t[o]):l*function(e,t){
return e<t?-1:e>t?1:0}(e[o],t[o])}doSort(e){
const t=this.table.sort.column(),o=this.table.sort.direction()
;t===e.name?"asc"===o?this.table.sort.direction("desc"):this.table.sort.direction("asc"):(this.table.sort.column(e.name),
this.table.sort.direction(o))}calcColumnStyle(e){const t={width:e.width+"%"}
;return e.style&&e.style.cell?Object.assign(t,e.style.cell):Object.assign(t,{
padding:"4px"}),t}stringify(e){
return"{"+Object.keys(e).map(t=>t+":"+String(e[t])).join(",")+"}"}
doSelectRow(e){
e.selected&&(e.selected(!0),this.selectedRow()&&this.selectedRow().selected(!1),
this.selectedRow(e)),this.table.selectedRow&&this.table.selectedRow(e)}}
const a=s.tag,c=a("div"),r=a("span"),i=s.makeStyles({component:{css:{}},table:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column"}},tableHeader:{css:{
"-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none",
userSelect:"none",backgroundColor:"rgba(200,200,200,0.5)"}},tableHeaderColumn:{
css:{display:"inline-block",fontStyle:"italic",cursor:"pointer",
userSelect:"none"}},tableBody:{css:{flex:"1 1 0px",overflowY:"auto"}},row:{css:{
cursor:"pointer"},pseudo:{hover:{backgroundColor:"#CCC"}}},cell:{css:{
display:"inline-block",verticalAlign:"top",wordBreak:"break-all"}},selectedRow:{
css:{backgroundColor:"#CCC"}}});function m(){const e=c({class:i.classes.row,
dataBind:{with:"row",as:'"row"',style:"$component.table.style.row",
click:"function(d){$component.doSelectRow.call($component, d)}",
class:'row.selected() ? "'+i.classes.selectedRow+'" : null'}
},l.foreachAs("$component.table.columns","column",c({class:i.classes.cell,
dataBind:{style:"$component.calcColumnStyle(column)"}
},l.if("column.component",l.with("row",r({dataBind:{component:{
name:"column.component.name",
params:'eval("(" + $component.stringify(column.component.params) + ")")'}}
})),l.if("column.format",r({dataBind:{typedText:{value:"row[column.name]",
type:"column.format.type",format:"column.format.format"}}
}),l.if("column.html",r({dataBind:{html:"row[column.name]"}}),r({dataBind:{
text:"row[column.name]"}})))))));return c({class:i.classes.table,dataBind:{
style:{
"background-color":'table.style.table.backgroundColor ? table.style.table.backgroundColor : "transparent"'
}}},[c({class:i.classes.tableHeader},l.foreach("table.columns",c({
class:i.classes.tableHeaderColumn,dataBind:{
style:"$component.calcColumnStyle($data)",
click:"function (d, e) {$component.doSort.call($component,d,e);}"}},[r({
dataBind:{text:"label"}}),r({dataBind:{visible:"sort",css:{
"fa-sort-desc":'$component.table.sort.column() === name && $component.table.sort.direction() === "desc"',
"fa-sort-asc":'$component.table.sort.column() === name && $component.table.sort.direction() === "asc"',
"fa-sort":"$component.table.sort.column() !== name"},style:{
color:'$component.table.sort.column() !== name ? "#AAA" : "#000"'}},style:{
marginLeft:"4px"},class:"fa"})]))),c({class:i.classes.tableBody,dataBind:{
style:{maxHeight:"table.style.table.maxHeight || null",
overflowY:'table.style.table.maxHeight ? "scroll" : null'}}
},l.foreachAs("rows.sorted((a,b) => {return $component.sortTable.call($component,a,b)})","row",e))])
}return t.registerComponent((function(){return{viewModel:n,template:m(),
stylesheet:i.sheet}}))}));