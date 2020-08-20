define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_common_ts/HttpClient","kb_lib/props","../builders"],(function(e,t,r,i,s,a,n,o,p,l){
"use strict";class g extends Error{constructor(e){super(e),this.name="NotFound"}
}class c extends s{constructor(e){super(e);const{term:r}=e
;this.lookupTerm=this.scrubTerm(r),
this.imageWidth="150px",this.defaultImageWidth="150px",
this.imageSize=t.observable(500),
this.imageUrl=t.observable(),this.imageCaption=t.observable(),
this.pageUrl=t.observable(),
this.error=t.observable(),this.ready=t.observable(!1),this.findImage()}
scrubTerm(e){const t=e.split(""),r=/[\w \s]/
;return t.filter(e=>!!r.exec(e)).join("")}findImage(){
this.lookupTerm&&this.getWikipediaInfo(this.lookupTerm).then(({imageUrl:e,url:t,introText:r})=>{
this.imageUrl(e),
this.pageUrl(t),this.introText=r.replace(/====/g,"####").replace(/===/g,"###").replace(/==/g,"##").replace(/\n/g,"  \n"),
this.ready(!0)}).catch(g,e=>{this.error(e)}).catch(e=>{
console.error("Error getting image",e),this.error(e)})}getWikipediaInfo(t){
return this.getPage(t).then(t=>(this.imageCaption(t.parse.title),
e.all([this.getImage({size:this.imageSize(),pageId:t.parse.pageid
}),this.getPageInfo({pageId:t.parse.pageid})]))).spread((e,t)=>({imageUrl:e,
url:t.url,introText:t.introText}))}getPage(t){
const r=JSON.parse(JSON.stringify(t.split(/\s+/)));return new e((e,i)=>{
const s=r=>{0===r.length&&i(new g('No Wikipedia page found matching "'+t+'"'))
;const a=new o.HttpClient,n=new o.HttpHeader({accept:"application/json"
}),p=new URL("https://en.wikipedia.org/w/api.php"),l=p.searchParams
;l.set("action","parse"),
l.set("format","json"),l.set("prop","text|headhtml"),l.set("section","0"),
l.set("redirects",""),l.set("page",r.join(" ")),l.set("origin","*"),a.request({
method:"GET",header:n,withCredentials:!1,url:p.toString()}).then(t=>{
switch(t.status){case 200:try{var a=JSON.parse(t.response);if(a.error){
if("missingtitle"===a.error.code)return r.pop(),s(r),null}else e(a)}catch(o){
this.error(o),i(new Error("Error parsing wikipedia response: "+o.message))}break
;default:var n="Unexpected response from wikipedia api: "+t.status
;console.error(n,t),i(new Error(n))}}).catch(e=>{i(e)})};s(r)})}
getPageInfo({pageId:e}){
const t=new URL("https://en.wikipedia.org/w/api.php"),r=t.searchParams
;r.set("action","query"),
r.set("pageids",e),r.set("prop","info|extracts"),r.set("explaintext","true"),
r.set("inprop","url"),r.set("origin","*"),r.set("format","json")
;return(new o.HttpClient).request({method:"GET",withCredentials:!1,
url:t.toString()}).then(t=>{switch(t.status){case 200:try{
var r=JSON.parse(t.response);return{
url:p.getProp(r,["query","pages",String(e),"fullurl"]),
introText:p.getProp(r,["query","pages",String(e),"extract"])}}catch(i){
console.error("error getting page info",i.message),this.error(i)}}})}
getImage({size:e,pageId:t}){
const r=new URL("https://en.wikipedia.org/w/api.php"),i=r.searchParams
;i.set("action","query"),
i.set("format","json"),i.set("prop","pageimages"),i.set("pithumbsize",String(e)),
i.set("pageids",String(t)),i.set("origin","*")
;const s=new o.HttpClient,a=new o.HttpHeader({accept:"application/json"})
;return s.request({method:"GET",header:a,withCredentials:!1,url:r.toString()
}).then(e=>{switch(e.status){case 200:try{var r=JSON.parse(e.response)
;return p.getProp(r,["query","pages",String(t),"thumbnail","source"],null)
}catch(s){throw new Error("Error parsing wikipedia response: "+s.message)}
default:var i="Unexpected response from wikipedia api: "+e.status
;throw console.error(i,e),new Error(i)}}).catch(e=>{
const t="Error getting image from wikipedia: "+e.message
;throw console.error(t,e),
new Error("Error getting image from wikipedia: "+e.message)})}}
const d=a.tag,h=d("a"),m=d("span"),u=d("div"),f=d("img"),w=a.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
margin:"10px"}},table:{css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}},wikipediaImage:{css:{width:"100%"}},imageCaption:{css:{
height:"1em",marginTop:"4px"}},square:{css:{width:"100%",height:"auto",
position:"relative"},pseudo:{before:{content:'""',display:"block",
paddingTop:"100%"}},inner:{"> .-content":{position:"absolute",top:"0",right:"0",
bottom:"0",left:"0",border:"1px silver dashed",display:"flex",
justifyContent:"center",alignItems:"center"}}}});function b(e){return u({
class:w.classes.square},u({class:"-content"},e))}function x(){return u({
class:w.classes.component},i.if("ready",u({style:{display:"flex",
flexDirection:"row",flex:"1 1 0px"}},[u({style:{flex:"2 1 0px",
paddingRight:"4px",marginRight:"4px",overflowY:"auto"}},u({dataBind:{
htmlMarkdown:"introText"}})),u({style:{flex:"1 1 0px"},dataBind:{attr:{
width:"imageWidth"}}},u([i.if("imageUrl",f({class:w.classes.wikipediaImage,
dataBind:{attr:{src:"imageUrl"}}}),b("Image not found")),u({
class:w.classes.imageCaption},h({dataBind:{attr:{href:"pageUrl"}},
target:"_blank"},[m({dataBind:{text:"imageCaption"},style:{marginRight:"6px"}
}),m({class:"fa fa-wikipedia-w"
})]))]))]),i.if("error",i.with("error()",l.buildError()),u(n.loading("Finding page at Wikipedia")))))
}return r.registerComponent((function(){return{viewModel:c,template:x(),
stylesheet:w.sheet}}))}));