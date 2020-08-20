define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_common_ts/HttpClient","kb_lib/props"],(function(e,t,r,i,s,a,n,o,l){
"use strict";class p extends Error{constructor(e){super(e)}}class g extends s{
constructor(e){super(e);const{term:r,height:i}=e
;this.height=i,this.size=t.observable(500),
this.imageUrl=t.observable(),this.imageCaption=t.observable(),
this.pageUrl=t.observable(),
this.loaded=t.observable(!1),this.searchTerm=this.scrubTerm(r),
this.error=t.observable(),this.ready=t.observable(!1),this.findImage()}
scrubTerm(e){const t=e.split(""),r=/[\w \s]/
;return t.filter(e=>!!r.exec(e)).join("")}findImage(){
this.searchTerm&&this.getWikipediaInfo(this.searchTerm).then(({imageUrl:e,url:t})=>{
this.imageUrl(e),this.pageUrl(t),this.ready(!0)}).catch(p,e=>{this.error(e)
}).catch(e=>{console.error("Error getting image",e),this.error(e)})}
getWikipediaInfo(t){
return this.getPage(t).then(t=>(this.imageCaption(t.parse.title),
e.all([this.getImage({size:this.size(),pageId:t.parse.pageid}),this.getPageUrl({
pageId:t.parse.pageid})]))).spread((e,t)=>({imageUrl:e,url:t}))}getPage(t){
const r=JSON.parse(JSON.stringify(t.split(/\s+/)));return new e((e,t)=>{
const i=r=>{if(0===r.length)return void t(new p("No image found at Wikipedia"))
;const s=new o.HttpClient,a=new o.HttpHeader({accept:"application/json"
}),n=new URL("https://en.wikipedia.org/w/api.php"),l=n.searchParams
;l.set("action","parse"),
l.set("format","json"),l.set("prop","text"),l.set("section","0"),
l.set("redirects",""),l.set("page",r.join(" ")),l.set("origin","*"),s.request({
method:"GET",header:a,withCredentials:!1,url:n.toString()}).then(s=>{
switch(s.status){case 200:try{var a=JSON.parse(s.response);if(a.error){
if("missingtitle"===a.error.code)return r.pop(),i(r),null}else e(a)}catch(o){
this.error(o),t(new Error("Error parsing wikipedia response: "+o.message))}break
;default:var n="Unexpected response from wikipedia api: "+s.status
;console.error(n,s),t(new Error(n))}}).catch(e=>{t(e)})};i(r)})}
getPageUrl({pageId:e}){
const t=new URL("https://en.wikipedia.org/w/api.php"),r=t.searchParams
;r.set("action","query"),
r.set("pageids",e),r.set("prop","info"),r.set("inprop","url"),
r.set("origin","*"),r.set("format","json");return(new o.HttpClient).request({
method:"GET",withCredentials:!1,url:t.toString()}).then(t=>{switch(t.status){
case 200:try{var r=JSON.parse(t.response)
;return l.getProp(r,["query","pages",String(e),"fullurl"])}catch(i){
console.error("error getting page info",i.message),this.error(i)}}})}
getImage({size:e,pageId:t}){
const r=new URL("https://en.wikipedia.org/w/api.php"),i=r.searchParams
;i.set("action","query"),
i.set("format","json"),i.set("prop","pageimages"),i.set("pithumbsize",String(e)),
i.set("pageids",String(t)),i.set("origin","*")
;const s=new o.HttpClient,a=new o.HttpHeader({accept:"application/json"})
;return s.request({method:"GET",header:a,withCredentials:!1,url:r.toString()
}).then(e=>{switch(e.status){case 200:try{var r=JSON.parse(e.response)
;return l.getProp(r,["query","pages",String(t),"thumbnail","source"],null)
}catch(s){throw new Error("Error parsing wikipedia response: "+s.message)}
default:var i="Unexpected response from wikipedia api: "+e.status
;throw console.error(i,e),new Error(i)}}).catch(e=>{
const t="Error getting image from wikipedia: "+e.message
;throw console.error(t,e),
new Error("Error getting image from wikipedia: "+e.message)})}}
const c=a.tag,h=c("div"),d=c("img"),m=a.makeStyles({component:{css:{
width:"140px",overflow:"hidden"}},table:{css:{},inner:{td:{padding:"4px"},th:{
fontWeight:"bold",color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}},wikipediaImage:{css:{}},
imageCaption:{css:{height:"1em"}}});function u(){return h({
class:m.classes.component},i.if("ready",i.if("imageUrl",d({
class:m.classes.wikipediaImage,dataBind:{attr:{src:"imageUrl"},style:{
height:"height"}}}),h({style:{display:"flex",flexDirection:"column"}},[h({
style:{textAlign:"center",display:"flex",flexDirection:"column",
justifyContent:"center",border:"1px silver dashed"},dataBind:{style:{
height:"height"}}},[h("Image not found at Wikipedia")])])),i.if("error",h({
style:{display:"flex",flexDirection:"column"}},[h({style:{textAlign:"center",
display:"flex",alignItems:"center",border:"1px silver dashed"},dataBind:{style:{
height:"height"},text:"error().message"}})]),h({style:{display:"flex",
flexDirection:"column"}},[h({style:{textAlign:"center",display:"flex",
flexDirection:"column",justifyContent:"center",border:"1px silver dashed"},
dataBind:{style:{height:"height"}}},[h("Locating image at Wikipedia"),h({
fontSize:"80%"},n.loading())])]))))}return r.registerComponent((function(){
return{viewModel:g,template:u(),stylesheet:m.sheet}}))}));