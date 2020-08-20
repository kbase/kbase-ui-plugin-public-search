define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/lang","kb_knockout/components/table","./aliases","./functions","./location","./contigs"],(function(e,t,s,n,a,o,i,l,r,c,u){
"use strict";class d{
constructor({name:e,label:t,type:s,sort:n,width:a,style:o,noSelect:i,component:l}){
this.name=e,
this.label=t,this.type=s,this.sort=n||null,this.width=a||1,this.style=o||{},
this.noSelect=i||!1,this.component=l||null}}class p{constructor({data:t}){
this.mode="normal",this.over=e.observable(!1),this.data=t}}class h{
constructor({rows:t}={}){
this.rows=e.observableArray(t||[]),this.selectedRows=e.observableArray(),
this.columns=[new d({name:"type",label:"Type",type:"string",width:1}),new d({
name:"id",label:"ID",type:"string",width:2}),new d({name:"aliases",
label:"Aliases",width:3,component:l.name()}),new d({name:"functions",
label:"Functions",width:3,component:r.name()}),new d({name:"location",
label:"Location",width:3,component:c.name()
})],this.isLoading=e.observable(),this.pageSize=e.observable(),
this.state=e.observable(),this.errorMessage=e.observable(),this.env={
selectedRows:this.selectedRows},this.actions={},this.sortby=e=>{
e.sort.direction("ascending"===e.sort.direction()?"descending":"ascending"),
this.columns.forEach(e=>{e.sort&&e.sort.active(!1)}),e.sort.active(!0)
},this.rowAction=null}}class b extends n{constructor(t,s){super(t)
;const{object:n}=t
;this.object=n,this.genomeGuid="WS:"+[n.objectInfo.wsid,n.objectInfo.id,n.objectInfo.version].map(String).join("/"),
this.runtime=s.$root.runtime,this.token=e.pureComputed(()=>{
const e=s.$root.authorization();return e?e.token:null
}),this.ready=e.observable(!1),
this.error=e.observable(),this.status=e.observable("none"),
this.selectedContig=e.observable(),
this.contigsCount=e.observable(),this.searchInput=e.observable("*"),
this.contigFilterInput=e.observable(),
this.totalFound=e.observable(),this.pageNumber=e.observable(1),
this.pageCount=e.observable(0),
this.table=new h,this.subscribe(this.selectedContig,e=>{
e?this.contigFilterInput(e):this.contigFilterInput(null)
}),this.subscribe(this.searchInput,()=>{this.pageNumber(1)
}),this.lastSearchQuery={terms:null,pageSize:null,page:null
},this.searchQuery=e.pureComputed(()=>{const e=this.searchInput();if(!e)return
;if(0===e.trim().length)return;const t=this.table.pageSize();if(!t)return
;const s=this.pageNumber();return{terms:e,filter:{
contig:this.contigFilterInput()},pageSize:t,page:s}
}),this.subscribe(this.searchQuery,e=>{e&&this.doSearch(e)}),this.messages={
none:"no active search",notfound:"sorry, not found",loading:"loading...",
error:"error!"}}doSearch(){const e=this.searchQuery()
;if(e&&!o.isEqual(e,this.lastSearchQuery))return e.page||(e.page=1),
this.lastSearchQuery=JSON.parse(JSON.stringify(e)),
this.status("searching"),this.getGenes(e).then(({genes:t,total:s})=>{
if(this.totalFound(s),
0===t.length)return this.table.rows.removeAll(),this.pageNumber(null),
this.pageCount(null),void this.status("notfound")
;this.status("done"),this.pageCount(Math.ceil(s/e.pageSize))
;const n=t.map(({id:e,type:t,aliases:s,functions:n,location:a})=>new p({data:{
id:{value:e},type:{value:t},aliases:{value:s},functions:{value:n},location:{
value:a}}}));this.table.rows(n)}).catch(e=>{
this.status("error"),console.error("ERROR",e)})}doFirst(){this.pageNumber(1)}
doPrev(){this.pageNumber()>1&&this.pageNumber(this.pageNumber()-1)}doNext(){
this.pageNumber()<this.pageCount()&&this.pageNumber(this.pageNumber()+1)}
doLast(){this.pageNumber(this.pageCount())}getGenes(e){
const t=this.runtime.service("rpc").makeClient({module:"KBaseSearchEngine",
timeout:1e4,authenticated:!0}),s=(e.page-1)*e.pageSize,n=e.pageSize
;let a=this.genomeGuid;"*"!==e.terms&&(a+=" "+e.terms)
;e.filter.contig&&e.filter.contig.length>0&&(a+=" "+e.filter.contig);const o={
object_types:["GenomeFeature"],match_filter:{full_text_in_all:a,
exclude_subobjects:0,lookup_in_keys:{}},pagination:{start:s,count:n},
post_processing:{ids_only:0,skip_info:0,skip_keys:0,skip_data:0,
include_highlight:1,add_narrative_info:1,add_access_group_info:1},
access_filter:{with_private:1,with_public:1},sorting_rules:[{property:"id",
ascending:1,is_object_property:1}]}
;return t.callFunc("search_objects",[o]).spread(e=>{
const t=e.objects.map(({data:e})=>{
const{id:t,type:s,location:n,aliases:a,functions:o}=e;return{id:t,type:s,
location:n.map(([e,t,s,n])=>({id:e,start:t,strand:s,length:n})),
aliases:a?a.map(e=>{if("string"==typeof e)return{type:null,name:e};{const[t,s]=e
;return{type:t,name:s}}}):[],functions:o||[]}});return{total:e.total,genes:t}
}).catch(e=>{console.error("error",e)})}}
const g=a.tag,f=g("div"),m=g("input"),y=g("button"),v=g("span"),x=a.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
marginTop:"10px"}},row:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}
},columnHeader:{css:{backgroundColor:"#CCC",color:"#555",padding:"4px",
textAlign:"center",fontWeight:"bold"}},col1:{css:{width:"15em",display:"flex",
flexDirection:"column",marginRight:"4px"}},col2:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column"}},searchBar:{css:{
border:"1px silver solid"}},filterBar:{css:{border:"1px silver solid"}},
searchResults:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
border:"1px silver solid"}},contigRow:{css:{padding:"4px",cursor:"pointer"},
pseudo:{hover:{backgroundColor:"#CCC"}}},selectedContig:{css:{
backgroundColor:"#CCC"}},label:{css:{fontWeight:"bold",
color:"rgba(150,150,150,1)"}}});function k(e){return v({class:x.classes.label
},e)}return t.registerComponent((function(){return{viewModelWithContext:b,
template:f({class:x.classes.component},[f({class:x.classes.row},[f({
class:x.classes.col1},[f({class:x.classes.columnHeader
},["contigs (",s.if('typeof contigsCount() === "undefined"',v({
class:"fa fa-spin fa-spinner fa-fw"}),s.if("contigsCount() > 0",v({dataBind:{
text:"contigsCount()"}}),"none")),")"]),s.component({name:u.name(),params:{
genomeRef:"object.objectInfo.ref",selectedContig:"selectedContig",
contigsCount:"contigsCount"}})]),f({class:x.classes.col2},[f({
class:x.classes.columnHeader},"features"),f({class:x.classes.searchBar},[[m({
dataBind:{textInput:"searchInput"},placeholder:"Search Features"}),y({
class:"btn btn-default",style:{width:"3em",maxWidth:"3em"},dataBind:{
click:"function(){doSearch()}"}},s.switch("$component.status()",[['"none"',v({
class:"fa fa-search"})],['"searching"',v({class:"fa fa-spinner fa-spin fa-fw"
})],['"notfound"',v({class:"fa fa-search"})],['"done"',v({class:"fa fa-search"
})],['"error"',v({class:"fa fa-search"})]]))],[y({class:"btn btn-default",
dataBind:{click:"function(d){$component.doFirst.call($component)}",
disable:"pageNumber() === 1"}},v({class:"fa fa-step-backward"})),y({
class:"btn btn-default",dataBind:{
click:"function(d){$component.doPrev.call($component)}",
disable:"pageNumber() === 1"}},v({class:"fa fa-chevron-left"})),y({
class:"btn btn-default",dataBind:{
click:"function(d){$component.doNext.call($component)}",
disable:"pageNumber() === pageCount()"}},v({class:"fa fa-chevron-right"})),y({
class:"btn btn-default",dataBind:{
click:"function(d){$component.doLast.call($component)}",
disable:"pageNumber() === pageCount()"}},v({class:"fa fa-step-forward"})),f({
style:{display:"inline-block",marginLeft:"10px"}
},s.if("pageCount() > 0",[k("pg "),v({dataBind:{text:"pageNumber"}
}),k(" of "),v({dataBind:{typedText:{value:"pageCount",type:'"number"',
format:'"0,0"'}}})],v({style:{fontStyle:"italic"}
},"No genes match this search")))],s.if("totalFound()",f({style:{
display:"inline-block",marginLeft:"10px"}},[k("found "),v({dataBind:{typedText:{
value:"totalFound()",type:'"number"',format:'"0,0"'}}})]))]),f({
class:x.classes.filterBar
},f({},[k("selected contig "),s.if("contigFilterInput",v({style:{
fontWeight:"bold"},dataBind:{text:"contigFilterInput"}}),v({style:{
fontStyle:"italic"}},"No contig selected"))])),f({class:x.classes.searchResults
},f({style:{flex:"1 1 0px",display:"flex",flexDirection:"column"},dataBind:{
component:{name:i.quotedName(),params:{link:"bus",table:"table",
messages:"messages"}}}}))])])]),stylesheet:x.sheet}}))}));