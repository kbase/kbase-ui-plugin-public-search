define(["knockout","kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,o,n,l){
"use strict";class s extends o{constructor(t){
super(t),this.rows=t.rows,this.table=t.table,
this.columnMap=this.table.columns.reduce((t,e)=>(t[e.name]=e,t),{})}
sortTable(t,e){
const o=this.table.sort.column(),n="asc"===this.table.sort.direction()?1:-1
;return"function"==typeof this.columnMap[o].sort?n*this.columnMap[o].sort.comparator(t[o],e[o]):n*function(t,e){
return t<e?-1:t>e?1:0}(t[o],e[o])}doSort(t){
const e=this.table.sort.column(),o=this.table.sort.direction()
;e===t.name?"asc"===o?this.table.sort.direction("desc"):this.table.sort.direction("asc"):(this.table.sort.column(t.name),
this.table.sort.direction(o))}calcColumnStyle(t){const e={width:t.width+"%"}
;return t.cellStyle?Object.assign(e,t.cellStyle):Object.assign(e,{padding:"4px"
}),e}stringify(t){
return"{"+Object.keys(t).map(e=>e+":"+String(t[e])).join(",")+"}"}}
const a=l.tag,c=a("div"),r=a("span"),i=l.makeStyles({component:{css:{}},table:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column"}},tableHeader:{css:{
"-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none",
userSelect:"none",backgroundColor:"rgba(200,200,200,0.5)"}},tableHeaderColumn:{
css:{display:"inline-block",fontStyle:"italic",cursor:"pointer",
userSelect:"none"}},tableBody:{css:{flex:"1 1 0px",overflowY:"auto"}},row:{
css:{}},cell:{css:{display:"inline-block",verticalAlign:"top",
wordBreak:"break-all"}}});function m(){const t=c({dataBind:{with:"row",
as:'"row"',style:"$component.table.rowStyle"}
},n.foreachAs("$component.table.columns","column",c({class:i.classes.cell,
dataBind:{style:"$component.calcColumnStyle(column)"}
},n.if("column.component",n.with("row",r({dataBind:{component:{
name:"column.component.name",
params:'eval("(" + $component.stringify(column.component.params) + ")")'}}
})),n.if("column.format",r({dataBind:{typedText:{value:"row[column.name]",
type:"column.format.type",format:"column.format.format"}}
}),n.if("column.html",r({dataBind:{html:"row[column.name]"}}),r({dataBind:{
text:"row[column.name]"}})))))));return c({class:i.classes.table,dataBind:{
style:{
"background-color":'table.style && table.style.backgroundColor ? table.style.backgroundColor : "transparent"'
}}},[c({class:i.classes.tableHeader},n.foreach("table.columns",c({
class:i.classes.tableHeaderColumn,dataBind:{
style:"$component.calcColumnStyle($data)",
click:"function (d, e) {$component.doSort.call($component,d,e);}"}},[r({
dataBind:{text:"label"}}),r({dataBind:{visible:"sort",css:{
"fa-sort-desc":'$component.table.sort.column() === name && $component.table.sort.direction() === "desc"',
"fa-sort-asc":'$component.table.sort.column() === name && $component.table.sort.direction() === "asc"',
"fa-sort":"$component.table.sort.column() !== name"},style:{
color:'$component.table.sort.column() !== name ? "#AAA" : "#000"'}},style:{
marginLeft:"4px"},class:"fa"})]))),c({class:i.classes.tableBody,dataBind:{
style:{maxHeight:"table.style.maxHeight || null",
overflowY:'table.style.maxHeight ? "scroll" : null'}}
},n.foreachAs("rows.sorted((a,b) => {return $component.sortTable.call($component,a,b)})","row",t))])
}return e.registerComponent((function(){return{viewModel:s,template:m(),
stylesheet:i.sheet}}))}));