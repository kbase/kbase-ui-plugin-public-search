define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(t,e,s,o,i){
"use strict";const l=i.tag,n=l("div"),a=l("p"),c=l("span"),r=i.makeStyles({
component:{css:{position:"absolute",border:"1px rgba(100,100,100,0.5) solid",
boxShadow:"4px 4px 4px rgba(100,100,100,0.5)",top:"0",left:"0",right:"0",
bottom:"0",backgroundColor:"rgba(255,255,255,1)",display:"flex",
flexDirection:"column"}},titleArea:{css:{backgroundColor:"rgba(100,100,100,1)",
padding:"4px",position:"relative"}},titleButton:{css:{position:"absolute",
right:"4px",top:"4px",width:"10px",color:"rgba(255,100,100,0.5)",
cursor:"pointer"},pseudo:{hover:{color:"rgba(255,100,100,1)"}}},title:{css:{
color:"rgba(255,255,255,1)",fontWeight:"bold"}},contentArea:{css:{padding:"4px",
overflowY:"auto",flex:"1 1 0px"}},content:{css:{fontWeight:"normal"}}})
;class d extends o{constructor(t){super(t)
;const{title:e,content:s,remover:o,top:i,left:l}=t
;this.title=e,this.closer=o,this.content="string"==typeof s?[s]:s,
this.top=i,this.left=l,this.width=200,this.height=200}doClose(){this.closer()}}
return e.registerComponent((function(){return{viewModelWithContext:d,
template:n({class:r.classes.component,dataBind:{style:{top:"top",left:"left",
width:"width",height:"height"},click:"function(){}",clickBubble:"false"}},[n({
class:r.classes.titleArea},[n({class:r.classes.titleButton,dataBind:{
click:"doClose"}},c({class:"fa fa-times"})),n({class:r.classes.title},[c({
class:"fa fa-question-circle",style:{marginRight:"6px"}}),c({dataBind:{
text:"title"}})])]),n({class:r.classes.contentArea},[n({class:r.classes.content,
dataBind:{foreach:"content"}},a({dataBind:{text:"$data"}}))])]),
stylesheet:r.sheet}}))}));