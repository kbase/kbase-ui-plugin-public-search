define(["require"],e=>{"use strict";return class{
constructor({node:e,runtime:t,views:r}){
this.currentPanel=null,this.hostNode=e,this.runtime=t,
this.views=r,this.viewMap=new Map}loadModule(t){return new Promise((r,i)=>{
e([t],e=>{r(e)},e=>{i(e)})})}start(){
return Promise.all(this.views.map(({module:e,view:t,type:r})=>this.loadModule(e).then(e=>({
module:e,view:t,type:r||"es6"})))).then(e=>(e.forEach(e=>{
this.viewMap.set(e.view,e)}),this))}selectView(e){return this.viewMap.get(e)}
unmount(){return this.currentPanel?function(e){return new Promise((t,r)=>{try{
return t(e())}catch(i){r(i)}})
}(()=>this.currentPanel.widget.stop&&this.currentPanel.widget.stop()).then(()=>this.currentPanel.widget.detach&&this.currentPanel.widget.detach()):Promise.resolve()
}dispatch({view:e,params:t}){const r=this.selectView(e)
;return r&&r.module?this.unmount().then(()=>{let e;switch(r.type){case"factory":
e=r.module.make({runtime:this.runtime});break;case"es6":e=new r.module({
runtime:this.runtime});break;default:
throw new Error("Invalid view type: "+r.type)}if(this.currentPanel={view:r,
widget:e},this.currentPanel.widget.init)return this.currentPanel.widget.init()
}).then(()=>this.currentPanel.widget.attach(this.hostNode)).then(()=>this.currentPanel.widget.start(t)).catch(e=>{
console.error("ERROR",e)
}):(console.warn("bad view request",e,t),void alert("oops, bad view request: "+r))
}}});