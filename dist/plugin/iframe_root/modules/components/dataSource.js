define(["knockout","kb_knockout/registry","kb_lib/html"],(function(e,t,a){
"use strict";class r{constructor({withUserData:e,withReferenceData:t}){
this.withUserData=e,this.withReferenceData=t}toggleUserData(){
this.withReferenceData()&&this.withUserData(!this.withUserData())}
toggleReferenceData(){
this.withUserData()&&this.withReferenceData(!this.withReferenceData())}}
const o=a.tag,l=o("div"),c=o("span"),i=a.makeStyles({component:{flex:"1 1 0px"},
searchArea:{flex:"0 0 50px"},filterArea:{flex:"0 0 50px",textAlign:"left"},
resultArea:{flex:"1 1 0px",display:"flex",flexDirection:"column"},
activeFilterInput:{css:{backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},
pseudo:{hover:{backgroundColor:"rgba(209, 226, 255, 0.5)"}}},
modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},
checkboxControl:{borderColor:"transparent",boxShadow:"none",margin:"0 2px",
borderRadius:"unset"},checkboxLabel:{fontWeight:"normal",marginRight:"4px",
marginLeft:"6px"},fieldGroupLabel:{fontWeight:"bold",color:"gray",
display:"flex",justifyContent:"center",alignItems:"center",height:"1.5em",
marginBottom:"8px"},fieldGroup:{},xtable:{css:{width:"100%",
"border-spacing":"4px","border-collapse":"separate"},inner:{tr:{cursor:"pointer"
},"td:nth-child(1)":{textAlign:"center",width:"1em"},"td:nth-child(2)":{}}},
table:{css:{width:"100%",backgroundColor:"#FFF"},inner:{".-header":{
fontStyle:"italic",color:"rgba(0, 0, 0, 0.7)",padding:"4px",
borderBottom:"1px silver solid"},".-header > .-cell":{display:"inline-block"},
".-header > .-cell:nth-child(1)":{width:"10%"},
".-header > .-cell:nth-child(2)":{width:"90%"},".-body-container":{
backgroundColor:"rgba(255,255,255,1)"},".-body > .-row":{padding:"4px",
cursor:"pointer",height:"2em"},".-body > .-row > .-cell":{display:"inline-block"
},".-body > .-row > .-cell:nth-child(1)":{width:"10%"},
".-body > .-row > .-cell:nth-child(2)":{width:"90%"}}}});function n(){return l({
class:"component"},l({class:i.classes.table},[l({class:"-body-container"},l({
class:"-body"},[l({class:"-row",dataBind:{css:{
[i.classes.activeFilterInput]:"withUserData()"},
click:"function(d,e){$component.toggleUserData.call($component,d,e);}"}},[l({
class:"-cell"},c({class:"fa",dataBind:{style:{
color:'withReferenceData() ? "#000" : "#AAA"'},css:{
"fa-check-square-o":"withUserData()","fa-square-o":"!withUserData()"}}})),l({
class:"-cell"},"Narrative")]),l({class:"-row",dataBind:{css:{
[i.classes.activeFilterInput]:"withReferenceData()"},
click:"function(d,e){$component.toggleReferenceData($component,d,e);}"}},[l({
class:"-cell"},c({class:"fa",dataBind:{style:{
color:'withUserData() ? "#000" : "#AAA"'},css:{
"fa-check-square-o":"withReferenceData()","fa-square-o":"!withReferenceData()"}}
})),l({class:"-cell"},"Reference Data")])]))]))}
return t.registerComponent((function(){return{viewModel:r,template:n(),
stylesheet:i.sheet}}))}));