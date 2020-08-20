define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","./tooltip"],(function(t,e,o,s,i,l){
"use strict";const n=(0,i.tag)("div"),h=i.makeStyles({component:{css:{
position:"absolute",top:"0",left:"0",zIndex:"3",
backgroundColor:"rgba(200,200,200,0.3)"}}});class r extends s{constructor(e){
super(e);const{channel:o}=e
;this.channel=o,this.tooltips=t.observableArray(),this.width=t.observable(0),
this.height=t.observable(0),
this.right=t.observable(),this.bottom=t.observable(),this.escapeHandler=t=>{
"Escape"===t.key&&this.closeAllTooltips()},this.subscribe(this.tooltips,t=>{
t.length>0?(this.width(null),
this.height(null),this.right(0),this.bottom(0),document.body.addEventListener("keyup",this.escapeHandler)):(this.width("0px"),
this.height("0px"),
this.right(null),this.bottom(null),document.body.removeEventListener("keyup",this.escapeHandler))
}),this.channel.on("add-tooltip",t=>{this.addTooltip(t)
}),this.channel.send("ready")}addTooltip({title:t,content:e,top:o,left:s}){
const i={title:t,content:e,top:o,left:s};this.tooltips.push(i),i.remover=()=>{
this.removeTooltip(i)}}removeTooltip(t){this.tooltips.remove(t)}
closeAllTooltips(){this.tooltips.removeAll()}}function c(){return n({
class:h.classes.component,dataBind:{style:{right:"right",bottom:"bottom",
width:"width",height:"height"},click:"closeAllTooltips"}
},o.foreach("tooltips",o.component({name:l.name(),params:{title:"title",
content:"content",remover:"remover",top:"top",left:"left"}})))}
return e.registerComponent((function(){return{viewModelWithContext:r,
template:c(),stylesheet:h.sheet}}))}));