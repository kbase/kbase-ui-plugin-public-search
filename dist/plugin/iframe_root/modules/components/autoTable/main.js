define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","./message"],(function(e,o,t,n,l,i,a){
"use strict";class s extends n{constructor(o,t,n){super(o)
;const{table:l,messages:i}=o
;this.element=n,this.slowLoadingThreshold=300,this.table=l,
this.rows=this.table.rows,
this.columns=this.table.columns,this.state=this.table.state,
this.actions=this.table.actions,
this.env=this.table.env,this.view=this.table.view,
this.detailComponent=this.table.detailComponent,
this.messages=i,this.totalWidth=this.columns.reduce((e,o)=>e+o.width,0),
this.columns.forEach(e=>{const o=String(100*e.width/this.totalWidth)+"%"
;e.headerStyle=e.headerStyle||{},
e.headerStyle.flexBasis=o,e.rowStyle=e.rowStyle||{},e.rowStyle.flexBasis=o
}),this.sortColumn=e.observable("timestamp"),
this.sortDirection=e.observable("descending"),
this.height=e.observable(),this.compactRowHeight=35,
this.expandedRowHeight=100,this.headerRowHeight=35,
this.rowHeight=e.observable(this.compactRowHeight),this.subscribe(this.view,e=>{
switch(e){case"compact":this.rowHeight(this.compactRowHeight);break
;case"expanded":this.rowHeight(this.expandedRowHeight)}
}),this.resizerTimeout=200,this.resizerTimer=null,this.resizer=()=>{
this.resizerTimer||(this.resizerTimer=window.setTimeout(()=>{
this.resizerTimer=null,this.height(this.calcHeight())},this.resizerTimeout))
},this.resizeListener=window.addEventListener("resize",this.resizer,!1),
this.subscribe(this.height,e=>{e||this.table.pageSize(null)
;const o=Math.floor(e/this.rowHeight());this.table.pageSize(o)
}),this.subscribe(this.rowHeight,e=>{const o=this.height();if(!o)return
;const t=Math.floor(o/e);this.table.pageSize(t)
}),this.isLoadingSlowly=e.observable(!1),
this.loadingTimer=null,this.subscribe(this.table.isLoading,e=>{
e?this.timeLoading():this.cancelTimeLoading()}),this.height(this.calcHeight())}
doRowAction(e,o,t){
this.table.rowAction&&"inaccessible"!==t.mode&&this.table.rowAction(t)}
doSort(e){this.table.sortBy(e)}calcHeight(){
return this.element.querySelector("."+u.classes.tableBody).clientHeight}
doOpenUrl(e){
e.url?window.open(e.url,"_blank"):console.warn("No url for this column, won't open it")
}openLink(e){e&&window.open(e,"_blank")}timeLoading(){
this.loadingTimer=window.setTimeout(()=>{
this.table.isLoading()&&this.isLoadingSlowly(!0),this.loadingTimer=null
},this.slowLoadingThreshold)}cancelTimeLoading(){
this.loadingTimer&&(window.clearTimeout(this.loadingTimer),
this.loadingTimer=null),this.isLoadingSlowly(!1)}dispose(){
super.dispose(),this.resizeListener&&window.removeEventListener("resize",this.resizer,!1)
}}const c=l.tag,r=c("div"),d=c("span"),m=c("a"),u=l.makeStyles({component:{
flex:"1 1 0px",display:"flex",flexDirection:"column"},header:{flex:"0 0 50px"},
headerRow:{flex:"0 0 35px",display:"flex",flexDirection:"row",
alignItems:"center",fontWeight:"bold",color:"gray",overflow:"hidden"},
tableBody:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
overflow:"hidden"}},compactRow:{css:{flex:"0 0 35px",display:"flex",
flexDirection:"column",borderBottom:"1px #DDD solid",overflow:"hidden"}},
expandedRow:{css:{flex:"0 0 100px",display:"flex",flexDirection:"column",
borderBottom:"1px #DDD solid"}},commonRow:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"row",overflow:"hidden",flexWrap:"nowrap"}},detailRow:{css:{
height:"65px",display:"flex",flexDirection:"column"}},rowOver:{css:{
cursor:"pointer",backgroundColor:"#CCC"}},itemRowActive:{backgroundColor:"#DDD"
},searchLink:{css:{textDecoration:"underline"},pseudo:{hover:{
textDecoration:"underline",backgroundColor:"#EEE",cursor:"pointer"}}},cell:{
flexGrow:"1",flexShrink:"1",minWidth:"0",padding:"4px",display:"flex",
flexDirection:"column"},rowContent:{flex:"1 1 0px",display:"flex",
flexDirection:"row",alignItems:"stretch"},content:{flex:"1 1 0px",
whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"flex",
flexDirection:"column",justifyContent:"center",minWidth:"0"},value:{css:{
overflow:"hidden",textOverflow:"ellipsis",minWidth:"0"}},headerCell:{css:{
flex:"0 0 0px",overflow:"hidden",whiteSpace:"nowrap",borderTop:"1px #DDD solid",
borderBottom:"1px #DDD solid",height:"35px",padding:"4px",textAlign:"left",
display:"flex",alignItems:"center"}},innerCell:{flex:"1 1 0px",
overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",
alignSelf:"stretch",display:"flex",flexDirection:"column",
justifyContent:"center"},innerSortCell:{flex:"1 1 0px",whiteSpace:"nowrap",
display:"flex",flexDirection:"row",overflow:"hidden"},sortableCell:{css:{
cursor:"pointer"},pseudo:{hover:{backgroundColor:"rgba(200,200,200,0.8)"}}},
sortedCell:{backgroundColor:"rgba(200,200,200,0.5)"},sortIndicator:{
display:"inline"},sectionHeader:{padding:"4px",fontWeight:"bold",color:"#FFF",
backgroundColor:"#888"},selected:{backgroundColor:"#CCC"},private:{
backgroundColor:"green"},miniButton:{css:{padding:"2px",
border:"2px transparent solid",cursor:"pointer"},pseudo:{hover:{
border:"2px white solid"},active:{border:"2px white solid",
backgroundColor:"#555",color:"#FFF"}}}});function h(e){
return e.reduce((function(e,o){return e[o[0]]=o[1],e}),{})}function p(){
return r({dataBind:{foreach:{data:"$component.columns",as:'"column"'},event:{
click:"(d,e) => {$component.doRowAction.call($component, d, e, row)}",
mouseover:"() => {row.over(true)}",mouseout:"() => {row.over(false)}"}},
class:u.classes.commonRow},r({dataBind:{style:"column.rowStyle",
class:'row.over() && !column.noSelect ? "'+u.classes.rowOver+'" : null'},
class:[u.classes.cell]},t.if('row.mode === "inaccessible"',r({style:{
backgroundColor:"silver",flex:"1 1 0px",height:"100%"}}),r({
class:[u.classes.content],dataBind:{style:"column.style"}
},[t.if("column.action",[t.if("column.action.fn",t.if("row.data[column.name]",m({
dataBind:{typedText:{value:"row.data[column.name].value",type:"column.type",
format:"column.format"},
click:"function () {column.action.fn(row.data[column.name], row);}",
clickBubble:!1,attr:{title:"row.data[column.name].info"}},style:{
cursor:"pointer"}}),t.if("column.action.label",m({dataBind:{
text:"column.action.label"},style:{cursor:"pointer"}}),m({dataBind:{
css:"column.action.icon",click:"function () {column.action.fn(row);}",
clickBubble:!1},style:{cursor:"pointer"},class:"fa"
})))),t.if("column.action.name",t.if("row.data[column.name]",m({dataBind:{
typedText:{value:"row.data[column.name].value",type:"column.type",
format:"column.format"},
click:"function () {$component.actions[column.action.name]({row: row, col: row.data[column.name]});}",
clickBubble:!1,attr:{title:"row.data[column.name].info"}},style:{
cursor:"pointer"}}),t.if("column.action.label",m({dataBind:{
text:"column.action.label",
click:"function () {$component.actions[column.action.name]({row: row, col: null});}",
clickBubble:!1},style:{cursor:"pointer"}}),m({dataBind:{
css:"column.action.icon",
click:"function () {$component.actions[column.action.name]({row: row, col: null});}",
clickBubble:!1},style:{cursor:"pointer"},class:"fa"
})))),t.if("column.action.link",t.if("row.data[column.name]",t.if("row.data[column.name].url",m({
dataBind:{typedText:{value:"row.data[column.name].value",type:"column.type",
format:"column.format"},
click:"function () {$component.openLink(row.data[column.name].url);}",
clickBubble:!1,attr:{title:"row.data[column.name].info"}},style:{
cursor:"pointer"}}),d({dataBind:{typedText:{value:"row.data[column.name].value",
type:"column.type",format:"column.format"},attr:{
title:"row.data[column.name].info"}}})),t.if("column.action.label",m({dataBind:{
text:"column.action.label"},style:{cursor:"pointer"}}),m({dataBind:{
css:"column.action.icon",
click:"function () {$module.openLink(row.data[column.name], row);}",
clickBubble:!1},style:{cursor:"pointer"},class:"fa"
}))))],t.if("column.component",t.component2({name:"column.component",params:{
field:"row.data[column.name]",row:"row",env:"$component.env"}
}),t.if("row.data[column.name]",t.if("row.data[column.name].action",d({
class:u.classes.value,dataBind:{typedText:{value:"row.data[column.name].value",
type:"column.type",format:"column.format",
click:"$component[rowl[column.name].action]"},attr:{
title:"row.data[column.name].info"}}}),t.if("row.data[column.name].url",m({
class:u.classes.value,dataBind:{typedText:{value:"row.data[column.name].value",
type:"column.type",format:"column.format"},attr:{
title:"row.data[column.name].info"},
click:"function () {$component.doOpenUrl(row.data[column.name]);}",
clickBubble:"false"}}),d({class:u.classes.value,dataBind:{typedText:{
value:"row.data[column.name].value",type:"column.type",format:"column.format"},
attr:{title:"row.data[column.name].info"}}}))))))]))))}function f(){
return t.foreachAs("rows","row",t.if('$component.table.view() === "compact"',r({
class:u.classes.compactRow},[p()]),r({class:u.classes.expandedRow},[p(),r({
class:u.classes.detailRow},t.component2({name:"$component.detailComponent",
params:{row:"row"}}))])))}function w(e,o){
return t.if("typeof messages."+o+' === "string"',t.component({name:a.name(),
params:{type:'"'+e+'"',message:"messages."+o}}),r({dataBind:{component:{
name:"messages."+o+".component.name",params:{bus:"$component.bus",
table:"$component.table"}}}}))}return o.registerComponent((function(){return{
viewModelWithContext:s,template:r({class:u.classes.component},[r({
class:u.classes.headerRow,dataBind:{foreach:{data:"$component.columns",
as:'"column"'}}},r({dataBind:{style:"column.headerStyle",
css:h([[u.classes.sortableCell,"column.sort ? true : false"],[u.classes.sortedCell,"column.sort && column.sort.active() ? true : false"]]),
event:{click:"column.sort ? function () {$component.doSort(column);} : false"}},
class:[u.classes.headerCell]},[t.if("column.sort",r({
class:[u.classes.innerSortCell]},[r({class:[u.classes.innerCell]},[d({dataBind:{
text:"column.label"},style:{marginRight:"2px"}})]),r({
class:[u.classes.sortIndicator]},[t.if("!column.sort.active()",d({
class:"fa fa-sort"}),t.if('column.sort.direction() === "descending"',d({
class:"fa fa-sort-desc"}),t.if('column.sort.direction() === "ascending"',d({
class:"fa fa-sort-asc"}))))])]),r({class:[u.classes.innerCell]},[d({dataBind:{
text:"column.label"}})]))])),r({class:u.classes.tableBody
},t.switch("$component.state()",[['"notfound"',w("warning","notfound")],['"none"',w("info","none")],['"error"',w("danger","error")],['["searching", "success"]',[f(),t.if("$component.table.isLoading",r({
style:{position:"absolute",left:"0",right:"0",top:"0",bottom:"0",
backgroundColor:"rgba(255, 255, 255, 0.5)",fontSize:"300%",display:"flex",
flexDirection:"column",zIndex:"5"}},[r({style:{flex:"1 1 0px",display:"flex",
flexDirection:"row",justifyContent:"center",alignItems:"center",
color:"rgba(200, 200, 200, 0.8)"}
},[t.if("$component.isLoadingSlowly",i.loading())])]))]]]))]),stylesheet:u.sheet
}}))}));