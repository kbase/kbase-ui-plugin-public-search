define(["kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./simpleTreeNode"],(function(e,t,n,i){
"use strict";const o=(0,n.tag)("div");class a{
constructor({tree:e,treeInfo:t,originRef:n},o,a){
this.tree=e,this.leaves=t.leaves,
this.originRef=n,this.componentName=i.name(),this.width=a.clientWidth/2
;const[l,r]=function(e){let t=0,n=0;return function e(i,o,a){
if(i+=1,a.length&&(o+=a.length),
!a.nodes)return n=Math.max(n,o),void(t=Math.max(t,i));a.nodes.forEach(t=>{
e(i,o,t)})}(0,0,e),[t,n]}(e)
;this.maxLength=r,this.maxDepth=l,this.scalingFactor=null,
l&&(this.scalingFactor=r?this.width/r:this.width)}}
return e.registerComponent((function(){return{viewModelWithContext:a,
template:o({style:{marginTop:"10px",flex:"1 1 0px",display:"flex",
flexDirection:"column"}},t.if("scalingFactor",[o({style:{
borderBottom:"1px silver solid",padding:"4px"}},[o("Scale - distance"),o([o({
style:{display:"inline-block"}},"0"),o({style:{display:"inline-block",
border:"1px blue solid",height:"10px",backgroundColor:"rgba(0,0,255,0.3)",
margin:"0 4px"},dataBind:{style:{width:'$component.width + "px"'}}}),o({style:{
display:"inline-block"},dataBind:{typedText:{value:"$component.maxLength",
type:'"number"',format:'"0.0000"'}}})])]),o({dataBind:{component:{
name:i.quotedName(),params:{componentName:"componentName",node:"tree",
leaves:"$component.leaves",originRef:"originRef",scalingFactor:"scalingFactor"}}
}})],o("Sorry, no tree")))}}))}));