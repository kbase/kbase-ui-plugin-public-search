define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,s,l,t){
"use strict";class a{
constructor({name:e,owner:s,lastModifiedAt:l,workspaceId:t,objectId:a}){
this.name=e,
this.owner=s,this.lastModifiedAt=l,this.workspaceId=t,this.objectId=a}}
const c=t.tag,o=c("div"),n=c("span"),i=c("a"),r=t.makeStyles({table:{css:{},
inner:{td:{padding:"4px"},th:{fontWeight:"bold",color:"rgba(200,200,200,1)",
textAlign:"left",padding:"4px"}}},sectionHeader:{css:{fontWeight:"bold",
fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}},title:{css:{
fontWeight:"bold",color:"rgba(100,100,100,1)",textAlign:"center"}},component:{
css:{}},row:{css:{display:"flex",flexDirection:"row"}},cell:{css:{
flex:"1 1 0px",overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}},
cellContent:{css:{overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"
}},cellElement:{css:{display:"block",flex:"1 1 0px"}},label:{css:{
fontWeight:"bold",color:"rgba(200,200,200,1)",marginRight:"4px"}}})
;function d(){return o({class:r.classes.component},[o({class:r.classes.title
},"In Unknown Workspace"),o({class:r.classes.row},[n({class:r.classes.label
},"name"),o({class:r.classes.cell},o({class:r.classes.cellContent},o({dataBind:{
text:"name"}})))]),o({class:r.classes.row},[n({class:r.classes.label
},"owner"),o({class:r.classes.cell},o({class:r.classes.cellContent},i({
target:"_blank",dataBind:{text:"owner",attr:{href:'"#people/" + owner'}}
})))]),o({class:r.classes.row},[n({class:r.classes.label},"saved"),o({
class:r.classes.cell},o({class:r.classes.cellContent},n({dataBind:{typedText:{
value:"lastModifiedAt",type:'"date"',format:'"MMM D, YYYY"'}}})))])])}
return s.registerComponent((function(){return{viewModel:a,template:d(),
stylesheet:r.sheet}}))}));