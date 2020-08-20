define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,s,a){
"use strict"
;const o=a.tag,n=o("div"),r=o("span"),i=o("table"),l=o("thead"),c=o("tr"),m=o("th"),h=o("tbody"),d=o("td"),u=o("input"),p=o("button")
;class g{constructor(e,s){
this.searchAPI=null,this.runtime=s.$root.runtime,this.query=t.observable(),
this.iterations=t.observable(10),
this.itemCount=t.observable(20),this.samples=t.observableArray(),
this.average=t.pureComputed(()=>{const t=this.samples().length
;return t?this.samples().reduce((t,e)=>t+e.elapsed,0)/t:null
}),this.averageSize=t.pureComputed(()=>{const t=this.samples().length
;return t?this.samples().reduce((t,e)=>t+e.size,0)/t:null
}),this.averageReturnedHits=t.pureComputed(()=>{const t=this.samples().length
;return t?this.samples().reduce((t,e)=>t+e.returnedHits,0)/t:null
}),this.averageTotalHits=t.pureComputed(()=>{const t=this.samples().length
;return t?this.samples().reduce((t,e)=>t+e.totalHits,0)/t:null
}),this.averageSearchTime=t.pureComputed(()=>{const t=this.samples().length
;return t?this.samples().reduce((t,e)=>t+e.searchTime,0)/t:null
}),this.scaleMin=t.observable(0),
this.scaleMax=t.observable(3e3),this.binCount=t.observable(40),
this.histogram=t.pureComputed(()=>{
const t=this.binCount(),e=this.samples().map(t=>t.elapsed),s=this.scaleMin(),a=this.scaleMax(),o=a-s,n=this.samples().length,r=o/t,i=[...Array(t).keys()].map(t=>({
lowerInclusive:0===t,lower:s+r*t,upper:s+r*t+r,upperInclusive:t===n-1,count:0,
width:20,height:8*t}));let l=0;e.forEach(e=>{let o
;e>a?l+=1:o=e===a?t-1:Math.floor((e-s)/r),
void 0===i[o]&&console.warn("bin",e,e-s,r,s,a,o),i[o].count=i[o].count+1})
;const c=200/i.reduce((t,e)=>Math.max(t,e.count),0);return i.forEach(t=>{
t.height=t.count*c}),{columns:i,min:s,max:a,columnWidth:20,columnMargin:5,
binCount:t,overage:l}})}doRunTest(){
this.samples.removeAll(),this.searchAPI=this.runtime.service("rpc").makeClient({
module:"KBaseSearchEngine",timeout:this.scaleMax(),authenticated:!1
}),this.warmUpCache().then(()=>{this.searchSequence(this.iterations())})}
doCall(t){const e=Date.now()
;return this.searchAPI.callFunc("search_objects",[t]).spread(t=>[Date.now()-e,t,null]).catch(t=>[Date.now()-e,null,t])
}warmUpCache(){return this.searchAPI.callFunc("status",[])}searchSequence(t){
const e={match_filter:{full_text_in_all:this.query(),exclude_subobjects:1},
pagination:{start:0,count:this.itemCount()},post_processing:{ids_only:0,
skip_info:0,skip_keys:0,skip_data:0,include_highlight:1,add_narrative_info:1},
access_filter:{with_private:0,with_public:1},sorting_rules:[{
property:"timestamp",ascending:0,is_object_property:0}]},s=[]
;return new Promise((a,o)=>{const n=t=>{0!==t?this.doCall(e).then(([e,s,a])=>{
let o;if(!s)throw console.error("Error",a),new Error("Error!")
;return o=JSON.stringify(s).length,this.samples.push({iteration:t,elapsed:e,
searchTime:s.search_time,result:s,error:a,size:o,returnedHits:s.objects.length,
totalHits:s.total}),n(t-1),null}).catch(t=>{o(t)}):a(s)};n(t)})}}
const b=a.makeStyles({statsTable:{css:{width:"50em",border:"1px silver solid"},
inner:{td:{padding:"4px",margin:"4px"},th:{padding:"4px",margin:"4px"},
"th:nth-child(1)":{width:"30em"},"td:nth-child(1)":{width:"30em"}}},
samplesTable:{css:{width:"50em",border:"1px silver solid"},inner:{td:{
padding:"4px",margin:"4px"},th:{padding:"4px",margin:"4px"},"th:nth-child(1)":{
width:"30em"},"td:nth-child(1)":{width:"30em"}}},header:{css:{fontWeight:"bold",
fontSize:"120%"}},sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
marginTop:"20px"}}});return e.registerComponent((function(){return{
viewModelWithContext:g,template:n([n({class:b.classes.header
},"Performance Testing"),n({class:b.classes.sectionHeader},"Input"),n({
class:"form",style:"width: 50em"},[n({class:"row"},[n({class:"col-sm-6"
},"Query"),n({class:"col-sm-6"},u({dataBind:{textInput:"query"},
class:"form-control"}))]),n({class:"row"},[n({class:"col-sm-6"
},"Iterations"),n({class:"col-sm-6"},u({dataBind:{textInput:"iterations"},
class:"form-control"}))]),n({class:"row"},[n({class:"col-sm-6"},"Scale min"),n({
class:"col-sm-6"},u({dataBind:{textInput:"scaleMin"},class:"form-control"
}))]),n({class:"row"},[n({class:"col-sm-6"},"Scale max"),n({class:"col-sm-6"
},u({dataBind:{textInput:"scaleMax"},class:"form-control"}))]),n({class:"row"
},[n({class:"col-sm-6"},"Items to returm"),n({class:"col-sm-6"},u({dataBind:{
textInput:"itemCount"},class:"form-control"}))]),n({class:"row"},[n({
class:"col-sm-6"}),n({class:"col-sm-6"},p({class:"btn btn-primary",dataBind:{
click:"doRunTest",enable:"iterations() ? true : false"}},"Run Test"))])]),n({
class:b.classes.sectionHeader},"Stats"),i({class:b.classes.statsTable
},[l([c([m("Measure"),m("Value")])]),h([c([d("Count"),d(r({dataBind:{
text:"samples().length"}}))]),c([d("Average"),d(r({dataBind:{typedText:{
value:"average",type:'"number"',format:'"0,0"'}}
}))]),c([d("Server search time"),d(r({dataBind:{typedText:{
value:"averageSearchTime",type:'"number"',format:'"0,0"'}}
}))]),c([d("Size"),d(r({dataBind:{typedText:{value:"averageSize",
type:'"number"',format:'"0,0"'}}}))]),c([d("Returned hits"),d(r({dataBind:{
typedText:{value:"averageReturnedHits",type:'"number"',format:'"0,0"'}}
}))]),c([d("Total hits"),d(r({dataBind:{typedText:{value:"averageTotalHits",
type:'"number"',format:'"0,0"'}}}))])])]),n({class:b.classes.sectionHeader
},"Histogram"),n({style:{position:"relative",height:"200px",
backgroundColor:"rgba(200,200,200,0.5)",marginTop:"30px",marginBottom:"100px"}
},[s.foreach("histogram().columns",[n({style:{position:"absolute",bottom:"0",
backgroundColor:"blue"},dataBind:{style:{
left:"$index() * (width + $component.histogram().columnMargin * 2)",
height:"height",width:"width",marginLeft:"$component.histogram().columnMargin",
marginRight:"$component.histogram().columnMargin"}}}),s.if("count > 0",n({
style:{position:"absolute",width:"10px",margin:"5px",
backgroundColor:"transparent"},dataBind:{style:{left:"$index() * (width + 10)",
bottom:"height",width:"width",marginLeft:"$component.histogram().columnMargin",
marginRight:"$component.histogram().columnMargin"}}},n({style:{
transform:"rotate(-45deg)",transformOrigin:"top left"},dataBind:{text:"count"}
}))),s.if("count > 0",n({style:{position:"absolute",bottom:"-20px",
backgroundColor:"transparent",transform:"rotate(45deg) ",
transformOrigin:"bottom left"},dataBind:{style:{
left:"$index() * (width + $component.histogram().columnMargin * 2) + $component.histogram().columnMargin"
}}},n({style:{color:"rgba(237,41,57)"}},[r({dataBind:{typedText:{value:"lower",
type:'"number"',format:'"0,0"'}}})," - ",r({dataBind:{typedText:{value:"upper",
type:'"number"',format:'"0,0"'}}})])))]),[n({style:{position:"absolute",
backgroundColor:"transparent"},dataBind:{style:{left:"0",bottom:"-20"},
text:"$component.histogram().min"}}),n({style:{position:"absolute",
backgroundColor:"transparent"},dataBind:{style:{
left:"($component.histogram().binCount - 1) * ($component.histogram().columnWidth + $component.histogram().columnMargin * 2)",
bottom:"-20"},text:"$component.histogram().max"}})]]),n({
class:b.classes.sectionHeader},"Samples"),i({class:b.classes.samplesTable,
style:{maxHeight:"10em",overflow:"auto"}
},[l([c([m("Iteration"),m("Elapsed (ms)")])]),h({dataBind:{foreach:"samples"}
},[c([d(r({dataBind:{text:"iteration"}})),d(r({dataBind:{text:"elapsed"}
}))])])])]),stylesheet:b.sheet}}))}));