define(["knockout","kb_knockout/registry","kb_lib/html"],(function(t,a,e){
"use strict";class i{constructor({withPrivateData:a,withPublicData:e},i){
this._withPrivateData=a,
this._withPublicData=e,this.authorized=i.$root.authorized,
this.withPrivateData=t.pureComputed(()=>!!this.authorized()&&this._withPrivateData()),
this.withPublicData=t.pureComputed(()=>!this.authorized()||this._withPublicData)
}togglePrivateData(){
this._withPublicData()&&this._withPrivateData(!this._withPrivateData())}
togglePublicData(){
this._withPrivateData()&&this._withPublicData(!this._withPublicData())}}
const o=e.tag,l=o("div"),r=o("span"),c=e.makeStyles({component:{flex:"1 1 0px"},
searchArea:{flex:"0 0 50px"},filterArea:{flex:"0 0 50px",textAlign:"left"},
resultArea:{flex:"1 1 0px",display:"flex",flexDirection:"column"},
activeFilterInput:{css:{backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},
pseudo:{hover:{backgroundColor:"rgba(209, 226, 255, 0.5)"}}},
modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},
checkboxControl:{borderColor:"transparent",boxShadow:"none",margin:"0 2px",
borderRadius:"unset"},checkboxLabel:{fontWeight:"normal",marginRight:"4px",
marginLeft:"6px"},fieldGroupLabel:{fontWeight:"bold",color:"gray",
display:"flex",justifyContent:"center",alignItems:"center",height:"1.5em",
marginBottom:"8px"},fieldGroup:{},table:{css:{width:"100%",
backgroundColor:"#FFF"},inner:{".-header":{fontStyle:"italic",
color:"rgba(0, 0, 0, 0.7)",padding:"4px",borderBottom:"1px silver solid"},
".-header > .-cell":{display:"inline-block"},".-header > .-cell:nth-child(1)":{
width:"10%"},".-header > .-cell:nth-child(2)":{width:"90%"},".-body-container":{
backgroundColor:"rgba(255,255,255,1)"},".-body > .-row":{padding:"4px",
cursor:"pointer",height:"2em"},".-body > .-row > .-cell":{display:"inline-block"
},".-body > .-row > .-cell:nth-child(1)":{width:"10%"},
".-body > .-row > .-cell:nth-child(2)":{width:"90%"}}}});function s(){return l({
class:"component"},l({class:c.classes.table},[l({class:"-body-container"},l({
class:"-body"},[l({class:"-row",dataBind:{css:{
[c.classes.activeFilterInput]:"withPrivateData()"},
click:"function(d,e){$component.togglePrivateData.call($component,d,e);}"}},[l({
class:"-cell"},r({class:"fa",dataBind:{style:{
color:'withPublicData() && authorized() ? "#000" : "#AAA"'},css:{
"fa-check-square-o":"withPrivateData()","fa-square-o":"!withPrivateData()"}}
})),l({class:"-cell"},"Private Data")]),l({class:"-row",dataBind:{css:{
[c.classes.activeFilterInput]:"withPublicData()"},
click:"function(d,e){$component.togglePublicData($component,d,e);}"}},[l({
class:"-cell"},r({class:"fa",dataBind:{style:{
color:'withPrivateData() && authorized() ? "#000" : "#AAA"'},css:{
"fa-check-square-o":"withPublicData()","fa-square-o":"!withPublicData()"}}
})),l({class:"-cell"},"Public Data")])]))]))}
return a.registerComponent((function(){return{viewModelWithContext:i,
template:s(),stylesheet:c.sheet}}))}));