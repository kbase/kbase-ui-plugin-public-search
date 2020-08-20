define(["uuid"],(function(t){"use strict";return{Instrument:class{
constructor({type:e,name:s,username:i,bus:r}){
this.type=e,this.name=s,this.username=i,
this.bus=r,this.session=new t(4).format(),
this.createdAt=new Date,this.measurements=[],
this.autosendInterval=1e4,this.timer=null}setUsername(t){this.username=t}
record(t){this.measurements.push(t),this.start()}clear(){this.measurements=[]}
toJSON(){return this.measurements.map(t=>t.toJSON())}send(){
const t=this.toJSON();this.clear(),this.bus.send("instrumentation",{
type:this.type,name:this.name,session:{id:this.session,
createdAt:this.createdAt.toISOString(),username:this.username},measurements:t})}
start(){null===this.timer&&(this.timer=window.setTimeout(()=>{
this.send(),this.timer=null,this.measurements.length>0&&this.start()
},this.autosendInterval))}},Measure:class{constructor({id:t,value:e,group:s}){
this.id=t,this.value=e,this.group=s,this.createdAt=new Date}toJSON(){return{
id:this.id,value:this.value,group:this.group,
createdAt:this.createdAt.toISOString()}}},createGroup:function(){
return new t(4).format()}}}));