define(["knockout","kb_knockout/registry","kb_lib/html"],(function(e,t,a){
"use strict"
;var l=a.tag,i=l("div"),o=l("span"),c=l("input"),r=l("label"),s=a.makeStyles({
component:{flex:"1 1 0px",display:"flex",flexDirection:"column"},searchArea:{
flex:"0 0 50px"},filterArea:{flex:"0 0 50px",textAlign:"left"},resultArea:{
flex:"1 1 0px",display:"flex",flexDirection:"column"},activeFilterInput:{
backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},modifiedFilterInput:{
backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},checkboxControl:{
borderColor:"transparent",boxShadow:"none",margin:"0 2px"},checkboxLabel:{
fontWeight:"normal",marginRight:"4px",marginLeft:"6px"},fieldGroupLabel:{
fontWeight:"bold",color:"gray",marginTop:"8px",marginRight:"4px"}});class n{
constructor({withPrivateData:e,withPublicData:t}){
this.withPrivateData=e,this.withPublicData=t}}
return t.registerComponent((function(){return{viewModel:n,template:i({style:{
display:"flex",flexDirection:"row"}},[i({style:{flex:"1",display:"flex",
justifyContent:"flex-end",alignItems:"center"}},i({class:"form-inline"},[o({
class:s.classes.fieldGroupLabel},"Access:"),o({
class:["form-control",s.classes.checkboxControl],
title:"Indicate whether to show private data - your data or shared directly with you",
dataBind:{css:'withPrivateData() ? "'+s.classes.activeFilterInput+'" : null'}
},r({class:s.classes.checkboxLabel},[c({type:"checkbox",dataBind:{
checked:"withPrivateData",enable:"withPublicData"}})," Private"])),o({
class:["form-control",s.classes.checkboxControl],
title:"Indicate whether to show public data - data which has been made viewable to all KBase users",
dataBind:{css:'withPublicData() ? "'+s.classes.activeFilterInput+'" : null'}
},r({class:s.classes.checkboxLabel},[c({type:"checkbox",dataBind:{
checked:"withPublicData",enable:"withPrivateData"}})," Public"]))]))]),
stylesheet:s.sheet}}))}));