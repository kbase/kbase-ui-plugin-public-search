define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(s,e,t,l){
"use strict";class c{
constructor({source:s,sourceID:e,owner:t,lastModifiedAt:l,workspaceId:c,objectId:o}){
this.source=s,
this.sourceID=e,this.owner=t,this.lastModifiedAt=l,this.workspaceId=c,
this.objectId=o}}const o=l.tag,a=o("span"),n=o("div"),i=l.makeStyles({table:{
css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}},title:{css:{fontWeight:"bold",color:"rgba(100,100,100,1)",
textAlign:"center"}},component:{css:{}},row:{css:{display:"flex",
flexDirection:"row"}},cell:{css:{flex:"1 1 0px",overflowX:"hidden",
whiteSpace:"nowrap",textOverflow:"ellipsis"}},cellContent:{css:{
overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}},label:{css:{
fontWeight:"bold",color:"rgba(200,200,200,1)",marginRight:"4px"}}})
;function r(){return n({class:i.classes.component},[n({class:i.classes.title
},"In Reference Data Workspace"),n({class:i.classes.row},[a({
class:i.classes.label},"source"),n({class:i.classes.cell},n({
class:i.classes.cellContent},a({dataBind:{text:"source"}})))]),n({
class:i.classes.row},[a({class:i.classes.label},"source id"),n({
class:i.classes.cell},n({class:i.classes.cellContent},a({dataBind:{
text:"sourceID"}})))]),n({class:i.classes.row},[a({class:i.classes.label
},"last modified"),n({class:i.classes.cell},n({class:i.classes.cellContent},a({
dataBind:{typedText:{value:"lastModifiedAt",type:'"date"',format:'"MMM D, YYYY"'
}}})))])])}return e.registerComponent((function(){return{viewModel:c,
template:r(),stylesheet:i.sheet}}))}));