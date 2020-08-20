define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,s,t,l){
"use strict";class a{
constructor({name:e,owner:s,lastModifiedAt:t,workspaceId:l,objectId:a}){
this.name=e,
this.owner=s,this.lastModifiedAt=t,this.workspaceId=l,this.objectId=a}}
const c=l.tag,o=c("div"),n=c("span"),r=c("a"),i=l.makeStyles({table:{css:{},
inner:{td:{padding:"4px"},th:{fontWeight:"bold",color:"rgba(200,200,200,1)",
textAlign:"left",padding:"4px"}}},title:{css:{fontWeight:"bold",
color:"rgba(100,100,100,1)",textAlign:"center"}},component:{css:{}},row:{css:{
display:"flex",flexDirection:"row"}},cell:{css:{flex:"1 1 0px",
overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}},cellContent:{
css:{overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}},label:{
css:{fontWeight:"bold",color:"rgba(200,200,200,1)",marginRight:"4px"}}})
;function d(){return o({class:i.classes.component},[o({class:i.classes.title
},"In Narrative"),o({class:i.classes.row},[n({class:i.classes.label
},"title"),o({class:i.classes.cell},o({class:i.classes.cellContent},r({
target:"_blank",dataBind:{text:"name",attr:{
href:'"/narrative/ws." + workspaceId + ".obj." + objectId',title:"name"}}
})))]),o({class:i.classes.row},[n({class:i.classes.label},"owner"),o({
class:i.classes.cell},r({class:i.classes.cellContent,target:"_blank",dataBind:{
text:"owner",attr:{href:'"#people/" + owner',title:"owner"}}}))]),o({
class:i.classes.row},[n({class:i.classes.label},"saved"),o({class:i.classes.cell
},n({class:i.classes.cellContent,dataBind:{typedText:{value:"lastModifiedAt",
type:'"date"',format:'"MMM D, YYYY"'}}}))])])}
return s.registerComponent((function(){return{viewModel:a,template:d(),
stylesheet:i.sheet}}))}));