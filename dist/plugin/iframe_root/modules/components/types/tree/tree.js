define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders","./overview","./simpleTree","../builders"],(function(e,t,n,o,r,s,a,i){
"use strict";const c=o.tag,l=c("div"),f=c("a");class u{constructor(e,t,n){
this.nodes=e,this.label=t,this.length=n}}class d{constructor(e,t){
this.label=e,this.length=t}}class b extends i.TypeViewModel{constructor(e,t){
super(e,t),
this.tree=null,this.treeInfo=null,this.objectName=this.object.objectInfo.name,
this.objectRef=this.object.objectInfo.ref,this.setTabs({primary:{tab:{
label:"Simple Tree",component:null},panel:{component:{name:a.name(),params:{
originRef:"objectRef",tree:"tree",treeInfo:"treeInfo"}}}},overview:s.name(),
custom:[]}),this.getSummaryInfo().then(()=>{this.ready(!0)}).catch(e=>{
console.error("ERROR",e)})}parseTree(e){const t=e;let n=0;function o(e){
const o=[];for(;-1===e.indexOf(t[n]);)o.push(t[n]),n+=1;return o.join("")}
function r(){return":"!==t[n]?null:(n+=1,parseFloat(o(",)")))}function s(){
const e=o(":,)"),t=r();return new d(e,t)}return function e(){
if("("!==t[n])return null;n+=1;const a=[];let i;for(;;){
if(i=e(),null===i&&(i=s()),a.push(i),")"===t[n]){n+=1;break}
if(","!==t[n])throw new Error('Unexpected character in descendants list: "'+t[n]+'" at pos "'+n+'"')
;n+=1}const c=o(":,);"),l=r();return new u(a,c,l)}()}getSummaryInfo(){
const e=this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authorization:!1});return e.callFunc("get_objects",[[{
ref:this.object.objectInfo.ref}]]).spread(([t])=>e.callFunc("get_objects2",[{
objects:[{ref:t.data.ws_refs.user1.g[0],included:["scientific_name"]}],
ignoreErrors:1,no_data:0}]).spread(e=>{let n
;e.data[0]&&(n=e.data[0].data.scientific_name)
;const o=t.data.tree,r=this.parseTree(o),s=t.data.leaf_list.reduce((e,o)=>{
const r=t.data.default_node_labels[o],s=/^(.+)\s\((.+)\)$/.exec(r)
;if("user1"===o){let r;s&&([,r]=s),e[o]={userGenome:!0,nodeID:o,label:n,
scientificName:n||r||"User Genome",genomeID:null,ref:t.data.ws_refs[o].g[0]}
}else if(s){const[,n,a]=s;e[o]={userGenome:!1,nodeID:o,label:r,scientificName:n,
genomeID:a,ref:t.data.ws_refs[o].g[0]}}else e[o]={userGenome:!1,nodeID:o,
label:r,scientificName:r,genomeID:null,ref:t.data.ws_refs[o].g[0]};return e},{})
;this.tree=r,this.treeInfo={leaves:s}}))}}const m=o.makeStyles({component:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},sectionHeader:{css:{
fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}}
});return t.registerComponent((function(){return{viewModelWithContext:b,
template:l({class:m.classes.component
},n.if("ready",n.if("object",[i.buildHeader([n.if("objectName",f({style:{
fontSize:"120%",fontWeight:"bold",fontStyle:"italic"},dataBind:{
text:"objectName",attr:{href:'"/#dataview/" + object.objectInfo.ref'}},
target:"_blank"}),l(r.loading())),l(f({dataBind:{
text:'object.objectInfo.typeName + " " + object.objectInfo.typeMajorVersion + "." + object.objectInfo.typeMinorVersion',
attr:{href:'"/#spec/type/" + object.objectInfo.type'}},target:"_blank"})),l({
dataBind:{typedText:{value:"object.objectInfo.saveDate",type:'"date"',
format:'"MMM D, YYYY"'}}})],null),i.buildTabs()],r.loading()),r.loading())),
stylesheet:m.sheet}}))}));