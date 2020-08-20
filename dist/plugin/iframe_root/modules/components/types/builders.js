define(["knockout","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_knockout/components/tabset","kb_lib/html","kb_lib/htmlBuilders","../container/container","./common/wikipediaImage","./common/container","./common/containerTab","./common/metadata","./common/provenance/main"],(function(e,t,o,a,n,s,r,i,c,l,p,m){
"use strict";const b=n.tag,d=b("div"),u=b("span");function h(e){return d({
style:{display:"flex",flexDirection:"row"}},[d([u({class:"fa-stack fa-2x"},[u({
class:"fa fa-circle fa-stack-2x",dataBind:{style:{color:"dataIcon.color"}}}),u({
class:"fa-inverse fa-stack-1x ",dataBind:{class:"dataIcon.classes"}})])]),d({
style:{display:"flex",flexDirection:"column",justifyContent:"center"}},e)])}
return{buildHeader:function(e,o){return d({style:{display:"flex",
flexDirection:"row",height:"100px",marginBottom:"10px"}},[d({style:{
flex:"3 1 0px",display:"flex",flexDirection:"column",border:"1px silver solid",
paddingTop:"10px",overflow:"hidden"}},h(e)),d({style:{width:"150px"}
},function(){if(o)return t.component({name:i.name(),params:{term:o,
height:'"100px"'}})}()),d({style:{flex:"2 1 0px",border:"1px silver solid",
padding:"4px",marginRight:"10px",overflow:"hidden"}},d({dataBind:{component:{
name:r.quotedName(),params:{object:"object"}}}}))])},buildTabs:function(){
return d({style:{flex:"1 1 0px",display:"flex",flexDirection:"column"}
},[t.component({name:a.name(),params:{tabContext:"$component",tabs:"tabs",
bus:"bus"}})])},TypeViewModel:class extends o{constructor(t,o){super(t)
;const{object:a}=t
;this.object=a,this.runtime=o.$root.runtime,this.ready=e.observable(!1),
this.error=e.observable(),this.dataIcon=this.getDataIcon(),this.tabs=[]}
setTabs({primary:e,overview:t,custom:o}){t&&this.tabs.push({tab:{
label:"Overview"},panel:{component:{name:t,params:{object:"object"}}}
}),e&&(e.tab?this.tabs.push(e):this.tabs.push({tab:"Primary",panel:{component:e,
params:{object:"object"}}})),this.tabs.push({tab:{component:{name:l.name(),
params:{object:"object"}}},panel:{component:{name:c.name(),params:{
object:"object"}}}}),this.tabs.push({tab:{label:"Provenance"},panel:{component:{
name:m.name(),params:{object:"object"}}}}),o.forEach(e=>{this.tabs.push(e)
}),this.tabs[0].active=!0}getDataIcon(){try{
const e=this.object.objectInfo.type,t=this.runtime.service("type").parseTypeId(e),o=this.runtime.service("type").getIcon({
type:t});return{classes:o.classes.join(" "),color:o.color}}catch(e){
return console.error("When fetching icon config: ",e),{classes:"fa-question",
color:"gray"}}}},buildError:function(){return d({style:{width:"30em",
border:"1px red solid",backgroundColor:"rgba(255,0,0,0.3)",margin:"10px auto",
padding:"10px"}},[d({style:{backgroundColor:"red",color:"white",padding:"4px",
textAlign:"center",marginBottom:"10px"},dataBind:{text:'"Error: " + name'}}),d({
dataBind:{text:"message"}})])}}}));