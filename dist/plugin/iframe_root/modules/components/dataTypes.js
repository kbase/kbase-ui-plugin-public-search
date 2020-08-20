define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","../lib/style","../lib/text"],(function(e,t,l,a,o,s){
"use strict";class c{
constructor({searchSummary:t,searchState:l,totalCount:a,realTotalCount:o,omittedDataTypes:s}){
this.searchSummary=t,this.searchState=l,this.totalCount=a,this.realTotalCount=o,
this.omittedDataTypes=s,
this.includedTotal=e.pureComputed(()=>["none","error","searching"].includes(this.searchState())?null:this.searchSummary().reduce((e,t)=>t.selected()?e+t.count():e,0)),
this.excludedTotal=e.pureComputed(()=>["none","error","searching"].includes(this.searchState())?null:this.searchSummary().reduce((e,t)=>t.selected()?e:e+t.count(),0)),
this.canUncheck=e.pureComputed(()=>this.searchSummary().length-this.omittedDataTypes().length>1)
}getTooltip(e){return s.getTooltip(e)}getTypeTooltip(e){
return e.indexAvailable?!this.canUncheck()&&e.selected()?"Cannot toggle the last data type; at least one must be selected":this.getTooltip("DATA_TYPES_CHECKBOX"):"Index not available"
}doSelectDataType(e,t){
if((this.canUncheck()||!e.selected())&&e.indexAvailable)if(t.altKey){
this.omittedDataTypes().includes(e.type)?this.omittedDataTypes.remove(e.type):this.omittedDataTypes.push(e.type)
;const t=this.omittedDataTypes().includes(e.type)
;this.searchSummary().forEach(l=>{
l.type!==e.type&&(t?this.omittedDataTypes.remove(l.type):this.omittedDataTypes.push(l.type))
})
}else t.metaKey?(this.omittedDataTypes().includes(e.type)&&this.omittedDataTypes.remove(e.type),
this.searchSummary().forEach(t=>{
t.type!==e.type&&(this.omittedDataTypes().includes(t.type)||this.omittedDataTypes.push(t.type))
})):this.omittedDataTypes().includes(e.type)?this.omittedDataTypes.remove(e.type):this.omittedDataTypes.push(e.type)
}}const i=a.tag,n=i("span"),d=i("div"),r=a.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},container:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},title:{css:{
fontWeight:"bold",color:"gray"}},summaryTable:{css:{width:"100%",
backgroundColor:"#FFF",fontSize:"100%"},inner:{".-header":{fontStyle:"italic",
color:"rgba(0, 0, 0, 0.7)",padding:"4px",borderBottom:"1px silver solid"},
".-header > .-cell":{display:"inline-block"},".-header > .-cell:nth-child(1)":{
width:"10%"},".-header > .-cell:nth-child(2)":{width:"45%"},
".-header > .-cell:nth-child(3)":{width:"45%",textAlign:"right"},
".-body-container":{backgroundColor:"rgba(255,255,255,1)"},".-body > .-row":{
padding:"4px",height:"2em"},".-body > .-row > .-cell":{display:"inline-block"},
".-body > .-row > .-cell:nth-child(1)":{width:"10%"},
".-body > .-row > .-cell:nth-child(2)":{width:"45%"},
".-body > .-row > .-cell:nth-child(3)":{width:"45%",textAlign:"right"}}},
totalsTable:{css:{width:"100%",backgroundColor:"#FFF",fontSize:"100%"},inner:{
".-header":{fontStyle:"italic",color:"rgba(0, 0, 0, 0.7)",padding:"4px",
borderBottom:"1px silver solid"},".-header > .-cell":{display:"inline-block"},
".-header > .-cell:nth-child(1)":{width:"65%"},
".-header > .-cell:nth-child(3)":{width:"35%",textAlign:"right"},
".-body-container":{backgroundColor:"rgba(255,255,255,1)"},".-body > .-row":{
padding:"4px",height:"2em"},".-body > .-row > .-cell":{display:"inline-block"},
".-body > .-row > .-cell:nth-child(1)":{width:"65%"},
".-body > .-row > .-cell:nth-child(2)":{width:"35%",textAlign:"right"}}},
activeFilterInput:{css:{backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},
pseudo:{hover:{backgroundColor:"rgba(209, 226, 255, 0.5)"}}},statusRow:{css:{}},
columnSubHeader:{fontWeight:"bold",color:"gray",display:"flex",
justifyContent:"center",alignItems:"center",marginTop:"10px"}})
;return t.registerComponent((function(){return{viewModel:c,template:d({
class:r.classes.component},[d({class:r.classes.summaryTable},[d({class:"-header"
},[d({class:"-cell"}),d({class:"-cell"},n({class:o.classes.tooltipDark,
title:s.getTooltip("DATA_TYPES_DATA_TYPE_COLUMN")},"data type")),d({
class:"-cell"},n({class:o.classes.tooltipDark,
title:s.getTooltip("DATA_TYPES_COUNT_COLUMN")},"count"))]),d({
class:"-body-container"},d({class:"-body",dataBind:{foreach:"searchSummary"}
},[d({class:"-row",dataBind:{css:{[r.classes.activeFilterInput]:"selected()"},
click:"function(d,e){$component.doSelectDataType.call($component,d,e);}",style:{
cursor:'indexAvailable && ($component.canUncheck() || !selected()) ? "pointer" : "auto"'
},attr:{title:"$component.getTypeTooltip($data)"}}},[d({class:"-cell"
},l.if("indexAvailable",n({class:["fa",o.classes.tooltipDark],dataBind:{css:{
"fa-check-square-o":"selected()","fa-square-o":"!selected()"},style:{
color:'$component.canUncheck() || !selected() ? "#000" : "#AAA"'}}}),n({
class:["fa","fa-ban",o.classes.tooltipDark],style:{color:"#AAA"}}))),d({
class:"-cell",dataBind:{text:"type",style:{
"font-weight":'count() ? "bold" : "normal"',
"font-style":'count() ? "normal" : "italic"',
color:'selected() ? "#000" : "#AAA"'}}}),d({class:"-cell",dataBind:{typedText:{
value:"count",type:'"number"',format:'"0,0a"',missing:'"-"'},style:{
"font-weight":'count() ? "bold" : "normal"',
"font-style":'count() ? "normal" : "italic"',
color:'selected() ? "#000" : "#AAA"'}}})])]))]),d({
class:r.classes.columnSubHeader},n({class:o.classes.tooltipDark,
title:s.getTooltip("DATA_TYPES_SEARCH_RESULTS_HEADER")},"Search Results")),d({
class:r.classes.totalsTable},[d({class:"-body-container"},d({class:"-body"},[d({
class:"-row",style:{height:"1.5em"}},[d({class:"-cell",dataBind:{style:{
"font-weight":'includedTotal() ? "bold" : "normal"',
"font-style":'includedTotal() ? "normal" : "italic"'}}},"Included"),d({
class:"-cell",dataBind:{typedText:{value:"includedTotal",type:'"number"',
format:'"0,0a"',missing:'"-"'},style:{
"font-weight":'includedTotal() ? "bold" : "normal"',
"font-style":'includedTotal() ? "normal" : "italic"'}}})]),d({class:"-row",
style:{height:"1.5em"}},[d({class:"-cell",dataBind:{style:{
"font-weight":'excludedTotal() ? "bold" : "normal"',
"font-style":'excludedTotal() ? "normal" : "italic"'}}},"Excluded"),d({
class:"-cell",dataBind:{typedText:{value:"excludedTotal",type:'"number"',
format:'"0,0a"',missing:'"-"'},style:{
"font-weight":'excludedTotal() ? "bold" : "normal"',
"font-style":'excludedTotal() ? "normal" : "italic"'}}})])]))])]),
stylesheet:r.sheet}}))}));