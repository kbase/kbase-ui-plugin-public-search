define(["kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,t,l){
"use strict";class n{
constructor({node:e,leaves:t,first:l,last:n,originRef:o,componentName:a,scalingFactor:i}){
this.node=e,
this.leaves=t,this.first=l,this.last=n,this.originRef=o,this.scalingFactor=i,
this.componentName=a,
this.showLength=!1,e.nodes?(this.leaf=!1,this.tree=!0):(this.leaf=this.leaves[this.node.label],
this.tree=!1)}}const o=l.tag,a=o("a"),i=o("span"),s=o("div")
;return e.registerComponent((function(){return{viewModel:n,template:s({style:{
flex:"1 1 0px"}},[s({style:{display:"flex",flexDirection:"row"},dataBind:{
style:{"border-color":'tree ? "gray" : "green"'}}},[t.templateIf("tree",s({
style:{display:"flex",flexDirection:"row",alignItems:"center"}},[s({style:{
display:"flex",flexDirection:"column",alignSelf:"stretch"}},[s({style:{
flex:"1 1 0px"},dataBind:{style:{"border-left":'last ? "1px gray solid" : null'}
}}),s({style:{flex:"1 1 0px"},dataBind:{style:{
"border-left":'first ? "1px gray solid" : null'}}})]),s({style:{flex:"1 1 0px",
display:"flex",flexDirection:"column",justifyItem:"center",
justifyContent:"center"},dataBind:{style:{
width:'String(node.length * $component.scalingFactor) + "px"'}}},s({style:{
backgroundColor:"gray",height:"1px"}}))]),s({style:{flex:"1 1 0px",
display:"flex",flexDirection:"row"}},[s({style:{display:"flex",
flexDirection:"column",alignSelf:"stretch"}},[s({style:{flex:"1 1 0px"},
dataBind:{style:{"border-left":'last ? "1px gray solid" : null'}}}),s({style:{
flex:"1 1 0px"},dataBind:{style:{"border-left":'first ? "1px gray solid" : null'
}}})]),s({style:{width:"20px",display:"flex",flexDirection:"column",
justifyItem:"center",justifyContent:"center",borderRight:"3px green solid",
margin:"3px 0"},dataBind:{style:{
width:'String(node.length * $component.scalingFactor) + "px"'}}},s({style:{
backgroundColor:"gray",height:"1px"}})),s({style:{flex:"1 1 0px",
borderBottom:"1px silver dashed"}}),s({style:{width:"20em",overflowX:"auto",
whiteSpace:"nowrap",marginTop:"4px"},dataBind:{style:{
"background-color":'leaf.userGenome ? "yellow" : "transparent"'}}
},t.templateIf("leaf.ref",a({dataBind:{text:"leaf.scientificName",style:{
"font-weight":'leaf.userGenome ? "bold" : "normal"'},attr:{
href:'"/#dataview/" + leaf.ref'}},target:"_blank"}),i({dataBind:{
text:"leaf.scientificName",style:{
"font-weight":'leaf.userGenome ? "bold" : "normal"'}}
})))])),t.templateIf("tree",s({style:{flex:"1 1 0px"},dataBind:{
foreach:"node.nodes"}},s({dataBind:{component:{name:"$component.componentName",
params:{componentName:"$component.componentName",node:"$data",
leaves:"$component.leaves",first:"$index() === 0",
last:"$index() === $parent.node.nodes.length - 1",
originRef:"$component.originRef",scalingFactor:"$component.scalingFactor"}}}
})))])])}}))}));