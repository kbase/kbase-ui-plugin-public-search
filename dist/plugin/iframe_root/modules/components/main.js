define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/lang","../lib/serviceUtils","../lib/model","./searchBar","./resultsArea","./navBar","./searchError","./dataTypes","./help","./tooltipManager","./dataSource","./dataPrivacy","./feedback","./copy/copyObjects","kb_knockout/components/overlayPanel","kb_knockout/lib/nanoBus","../lib/debug","../lib/history","../lib/style","../lib/text","../lib/instrument","../lib/data","../lib/types/controller","../lib/searchJob"],(function(e,t,a,s,r,i,o,n,h,l,c,u,p,m,d,g,b,y,w,v,f,D,S,P,T,C,k,x,R,I){
"use strict";class j extends r{constructor(e,a){
super(e),this.runtime=a.$root.runtime,
this.supportedDataTypes=a.$root.supportedDataTypes,this.columns=a.$root.columns,
this.maxHistoryLength=10,
this.authorization=e.authorization,this.pluginParams=this.parsePluginParams(e.pluginParams),
this.searchInput=t.observable(this.pluginParams.query),
this.forceSearch=t.observable(),
this.page=t.observable(1),this.pageSize=t.observable(),
this.totalPages=t.observable(),
this.searchHistory=t.observableArray(),this.view=t.observable("compact"),
this.instrument=new k.Instrument({type:"plugin",name:"public-search",
username:this.runtime.service("session").getUsername(),bus:this.bus});let s=[]
;this.pluginParams.dataTypes&&(s=this.supportedDataTypes.filter(({value:e})=>!this.pluginParams.dataTypes.includes(e.toLowerCase())).map(e=>e.value)),
this.dataTypes=t.observableArray(),
this.omittedDataTypes=t.observableArray(s),this.dataSources=t.observableArray()
;let r=!0,i=!0
;this.pluginParams.dataPrivacy&&(this.pluginParams.dataPrivacy.includes("private")||(r=!1),
this.pluginParams.dataPrivacy.includes("public")||(i=!1),
r||i||(r=!0,i=!0)),this.withPrivateData=t.observable(r),
this.withPublicData=t.observable(i);let n=!0,l=!0
;this.pluginParams.workspaceTypes&&(this.pluginParams.workspaceTypes.includes("narrative")||(n=!1),
this.pluginParams.workspaceTypes.includes("refdata")||(l=!1),n||l||(n=!0,l=!0)),
this.withUserData=t.observable(n),
this.withReferenceData=t.observable(l),this.model=new h.Model({
runtime:this.runtime
}),this.searching=t.observable(),this.error=t.observable(),this.searchState=t.observable("none"),
this.errorMessage=t.pureComputed(()=>{const e=this.error();if(e)return e.message
}),
this.searchResults=t.observableArray(),this.resultCount=t.pureComputed(()=>this.searchResults().length),
this.searchSummary=t.observableArray(this.supportedDataTypes.map(e=>({
selected:t.pureComputed(()=>!this.omittedDataTypes().includes(e.value)),
indexAvailable:e.indexAvailable,type:e.value,count:t.observable(null)
})).sort((e,t)=>e.type<t.type?-1:e.type>t.type?1:0)),
this.summaryCount=null,this.maxResultCount=1e4,
this.totalCount=t.observable(),this.realTotalCount=t.observable(),
this.searchQueryInput=t.pureComputed(()=>{const e=this.omittedDataTypes(),t=[]
;for(const o of this.supportedDataTypes)!e.includes(o.value)&&o.indexAvailable&&t.push(o.value)
;const a=this.supportedDataTypes.map(e=>e.value),{terms:s,diagnosis:r,theStopWords:i}=this.cleanSearchInput(this.searchInput())
;return{searchInput:this.searchInput(),searchTerms:s.join(" "),
forceSearch:this.forceSearch(),dataTypes:t,supportedDataTypes:a,
dataSources:this.dataSources(),withPrivateData:this.withPrivateData(),
withPublicData:this.withPublicData(),withUserData:this.withUserData(),
withReferenceData:this.withReferenceData()}
}),this.searchPagingInput=t.pureComputed(()=>({page:this.page()||1,
pageSize:this.pageSize()
})),this.totalPages=t.pureComputed(()=>this.totalCount()&&this.pageSize()?Math.ceil(this.totalCount()/this.pageSize()):0),
this.subscribe(this.pageSize,()=>{
this.page()>this.totalPages()&&this.page(this.totalPages())
}),this.sortSpec=t.pureComputed(()=>({
sortSpec:this.columns.filter(e=>!!e.sort&&e.sort.active()).map(e=>({
propertyKey:e.sort.propertyKey,direction:e.sort.direction(),
isObject:e.sort.isObject}))
})),this.selectedRows=t.observableArray(),this.selectedObjects=t.pureComputed(()=>this.selectedRows().map(e=>{
const[,t,a,s]=/WS:(\d+)\/(\d+)\/(\d+)/.exec(e);return[t,a,s].join("/")
})),this.canReset=t.pureComputed(()=>!!this.searchInput()||(!this.withPrivateData()||!this.withPublicData()||(!this.withUserData()||!this.withReferenceData()||(this.omittedDataTypes().length>0||void 0)))),
this.searchQuery=t.pureComputed(()=>({input:this.searchQueryInput(),
paging:this.searchPagingInput(),sorting:this.sortSpec(),
authorization:this.authorization()})),this.lastSearch={query:null
},this.subscribe(this.searchQuery,e=>{
e.paging.pageSize&&(o.isEqual(e,this.lastSearch.query)||(this.lastSearch.query&&this.lastSearch.query.input.searchTerms!==e.input.searchTerms&&this.page()&&this.page()>1?this.page(null):(this.lastSearch.query=e,
this.doSearch(e))))
}),this.overlayComponent=t.observable(),this.showOverlay=t.observable(),
this.subscribe(this.showOverlay,e=>{this.overlayComponent(e)
}),this.bus.on("showError",()=>{this.showError()
}),this.bus.on("show-feedback",()=>{this.showOverlay({name:w.name(),viewModel:{}
})}),this.bus.on("show-help",()=>{this.showOverlay({name:d.name(),viewModel:{}})
}),this.bus.on("show-copy-objects",()=>{this.showOverlay({name:v.name(),
viewModel:{objectsToCopy:this.selectedObjects}})
}),this.tooltipChannel=new D,this.bus.on("show-tooltip",e=>{
this.tooltipChannel.send("add-tooltip",e)
}),this.subscribe(this.authorization,()=>{
this.setupHistory(),this.instrument.setUsername(this.runtime.service("session").getUsername())
}),this.actions={resetSearch:()=>{this.resetSearchControls()}
},this.currentSearchJob=new I,this.setupHistory()}resetSearchControls(){
this.searchInput(""),
this.withPrivateData(!0),this.withPublicData(!0),this.withUserData(!0),
this.withReferenceData(!0),this.omittedDataTypes([])}cleanSearchInput(e){
if(!e)return{terms:[],diagnosis:"empty-input"}
;var t=e.trim().split(/\s+/).filter((function(e){return e.length}))
;if(0===t.length)return{terms:[],diagnosis:"just-whitespace"}
;var a=t.filter((function(e){return!x.isStopWord(e)}));if(t.length>a.length){
var s=t.filter((function(e){return x.isStopWord(e)}));return 0===a.length?{
terms:[],diagnosis:"just-stopwords",theStopWords:s}:{terms:a,
diagnosis:"some-stopwords",theStopWords:s}}return{terms:a,diagnosis:"ok",
theStopWords:null}}setupHistory(){
this.authorization()?this.history=new P.ProfileHistory({maxSize:10,
name:"kbase.plugins.public-search",maxAge:3600,token:this.authorization().token,
username:this.authorization().username,
url:this.runtime.config("services.UserProfile.url")
}):this.history=new P.CookieHistory({maxSize:10,
name:"kbase.plugins.public-search",maxAge:3600
}),this.history.getHistory().then(e=>{this.searchHistory(e)}).catch(e=>{
console.error("Error fetching search history",e)})}showError(){
const e=this.error();let t=[]
;e.stack&&(t=e.stack.split("\n")),e instanceof Error?this.error({code:"error",
message:e.name+": "+e.message,detail:"trace here",info:{
stackTrace:e.stack.split("\n")},stackTrace:t}):this.error({code:"unknown",
message:e.message||"",detail:"",info:e||{},stackTrace:t}),this.showOverlay({
name:p.name(),type:"error",viewModel:{error:this.error}})}parsePluginParams(e){
return{query:e.query,dataPrivacy:e.dataPrivacy?e.dataPrivacy.split(","):null,
workspaceTypes:e.workspaceTypes?e.workspaceTypes.split(","):null,
dataTypes:e.dataTypes?e.dataTypes.split(",").map(e=>e.toLowerCase()):null}}
updatePluginParams(e){const t={}
;if(e.input.searchInput&&(t.query=e.input.searchInput.trim()),
e.input.withPrivateData||e.input.withPublicData){const a=[]
;e.input.withPrivateData&&a.push("private"),
e.input.withPublicData&&a.push("public"),2!==a.length&&(t.dataPrivacy=a)}
if(e.input.withUserData||e.input.withReferenceData){const a=[]
;e.input.withUserData&&a.push("narrative"),
e.input.withReferenceData&&a.push("refdata"),2!==a.length&&(t.workspaceTypes=a)}
e.input.dataTypes&&e.input.dataTypes.length!==this.supportedDataTypes.length&&(t.dataTypes=e.input.dataTypes),
this.parentBus.send("set-plugin-params",{pluginParams:t})}queryToMeasure(e){
return{authorization:{username:e.authorization&&e.authorization.username},
filter:{withPrivateData:e.input.withPrivateData,
withPublicData:e.input.withPublicData,
withReferenceData:e.input.withReferenceData,withUserData:e.input.withUserData},
query:{input:e.input.searchInput,terms:e.input.searchTerms},paging:e.paging,
sorting:e.sorting}}doSearch(a){
if(this.updatePluginParams(a),this.currentSearchJob.cancel(),
this.currentSearchJob.promise&&(this.currentSearchJob.promise.cancel(),
this.currentSearchJob.promise),
!a.input.searchInput||0===a.input.searchInput.trim().length)return this.searchState("none"),
this.searchResults.removeAll(),
this.resetSearchSummary(),this.totalCount(0),this.realTotalCount(0),
void this.page(1);const s=new I;let r,i
;if(this.history.updateHistory(a.input.searchInput).then(e=>{
this.searchHistory(e)}).catch(e=>{
console.error("Error updating search history",e),this.searchHistory([])
}),r=a.paging.page?(a.paging.page-1)*a.paging.pageSize:0,a.paging.page>1){
const e=a.paging.page*a.paging.pageSize
;i=e>=this.maxResultCount?this.maxResultCount-e+a.paging.pageSize:a.paging.pageSize
}else i=a.paging.pageSize
;const o=a.input.dataTypes,h=k.createGroup(),l=new k.Measure({id:"search",
value:this.queryToMeasure(a),group:h})
;this.instrument.record(l),this.searching(!0),this.searchState("searching")
;const c=e.try(()=>{s.started()}).then(()=>e.all([this.model.search({
query:a.input.searchTerms,types:o,start:r,count:i,
withUserData:a.input.withUserData,withReferenceData:a.input.withReferenceData,
sorting:a.sorting.sortSpec,withPrivate:a.input.withPrivateData,
withPublic:a.input.withPublicData}),this.model.searchSummary({
types:a.input.supportedDataTypes,query:a.input.searchTerms,
withUserData:a.input.withUserData,withReferenceData:a.input.withReferenceData,
withPrivate:a.input.withPrivateData,withPublic:a.input.withPublicData
})]).spread((e,a)=>{this.searchResults.removeAll();const s=new k.Measure({
id:"search-result",group:h,value:{search:{total:e.total,pagination:e.pagination,
searchTime:e.search_time,sorting:e.sorting_rules,hits:e.objects.length},
summary:a}});this.instrument.record(s),this.searchSummary().forEach(e=>{
e.count(a.type_to_count[e.type]||0)})
;if(0===e.objects.length)return this.searchState("notfound"),this.totalCount(0),
this.realTotalCount(0),void this.page(1)
;this.page()||this.page(1),e.total>this.maxResultCount?(this.totalCount(this.maxResultCount),
this.realTotalCount(e.total)):(this.totalCount(e.total),
this.realTotalCount(e.total));const r={}
;for(const[t,h]of Object.entries(e.access_groups_info))r[t]=n.workspaceInfoToObject(h)
;this.workspacesMap=r;const i={}
;for(const[t,h]of Object.entries(e.objects_info))i[t]=n.objectInfoToObject(h)
;this.objectsMap=i;const o={};for(const[t,n]of Object.entries(r)){const a={
type:null,name:null,owner:null,ownerRealName:null}
;null==n?a.type="inaccessible":(a.owner=n.owner,
e.access_group_narrative_info[t]&&(a.ownerRealName=e.access_group_narrative_info[t][4]),
n.metadata.narrative?n.metadata.narrative_nice_name?(a.type="narrative",
a.name=n.metadata.narrative_nice_name):(a.type="tempnarrative",
a.name="Untitled"):n.metadata.searchtags&&n.metadata.searchtags.includes("refdata")?(a.type="refdata",
a.name=n.name):(a.type="workspace",a.name=n.name)),o[t]=a}
const l=e.objects.map(e=>{const a=R.makeSearchObject(e),s=o[a.workspaceId]
;let r,i,n="normal";const h=s.type;switch(s.type){case"narrative":
case"tempnarrative":r=s.owner,i=s.name;break;case"refdata":
e.data.source?(r=s.owner,i=e.data.source):(r=s.owner,i="n/a");break
;case"workspace":r=s.owner,i=s.name;break;case"inaccessible":
r="n/a",i="n/a",n="inaccessible",
S.tryInaccessibleObject(this.runtime,e.guid,a.ref);break;default:
r="** err",i="** err"}return{mode:n,id:e.guid,over:t.observable(!1),data:{
selected:{value:t.observable(this.selectedRows().includes(e.guid))},type:{
value:e.type},date:{value:new Date(e.timestamp)},owner:{value:r},source:{value:h
},name:{value:i},description:{value:a.title},metadata:{
workspaceId:a.workspaceId,objectId:a.objectId,version:a.version,ref:a.ref,
workspaceType:s.type,searchObject:a},detail:{searchObject:e}}}})
;this.searchResults(l),this.searchState("success")}).catch(e=>{
this.searchResults.removeAll(),
this.resetSearchSummary(),this.totalCount(0),this.realTotalCount(0),
this.page(1),this.searchState("error"),this.error(e),s.error(e)}).finally(()=>{
this.searching(!1)})).finally(()=>{s.finished()})
;s.running(c),this.currentSearchJob=s}resetSearchSummary(){
this.searchSummary().forEach(e=>{e.count(null)})}dispose(){}}
const _=i.tag,z=_("span"),A=_("div"),O=i.makeStyles({component:{css:{
margin:"0 10px",flex:"1 1 0px",display:"flex",flexDirection:"column"}},header:{
css:{display:"flex",flexDirection:"row"}},headerCol1:{css:{flex:"2 1 0px",
display:"flex",flexDirection:"column"}},headerCol2:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column",margin:"0 0 4px 4px",padding:"4px"}},
mainRow:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}},filterColumn:{
css:{width:"15em",minWidth:"15em",display:"flex",flexDirection:"column",
paddingRight:"10px",overflow:"auto"}},resultsColumn:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column",minWidth:"0"}},fieldGroupLabel:{
fontWeight:"bold",color:"gray",display:"flex",justifyContent:"center",
alignItems:"center",height:"1.5em",marginBottom:"8px"},columnHeader:{
color:"white",backgroundColor:"gray",margin:"10px 0 10px 0",
textTransform:"lowercase",display:"flex",justifyContent:"center",
alignItems:"center",height:"2em"},columnGroup:{css:{
border:"1px rgba(200,200,200,0.5) solid",marginBottom:"14px"}}})
;return a.registerComponent((function(){return{viewModelWithContext:j,
template:A({class:O.classes.component,dataBind:{let:{
authorization:"authorization"}}},[A({class:O.classes.header},[A({
class:O.classes.headerCol1},[s.component({name:l.name(),
params:["bus","searchInput","forceSearch","searching","selectedObjects","searchHistory","canReset","actions"]
})])]),A({class:O.classes.mainRow},[A({class:O.classes.filterColumn},[A({
class:O.classes.columnHeader,title:C.getTooltip("FILTERS_HEADER")},z({
class:T.classes.tooltipLight},"Filters")),A({class:O.classes.columnGroup},[A({
class:O.classes.fieldGroupLabel},z({class:T.classes.tooltipDark,
title:C.getTooltip("DATA_PRIVACY_HEADER")},"Data Privacy")),s.component({
name:y.name(),params:{withPrivateData:"withPrivateData",
withPublicData:"withPublicData"}})]),A({class:O.classes.columnGroup},[A({
class:O.classes.fieldGroupLabel},z({class:T.classes.tooltipDark,
title:C.getTooltip("WORKSPACE_TYPE_HEADER")},"Workspace Type")),s.component({
name:b.name(),params:{withUserData:"withUserData",
withReferenceData:"withReferenceData"}})]),A({class:O.classes.columnGroup},[A({
class:O.classes.fieldGroupLabel},z({class:T.classes.tooltipDark,
title:C.getTooltip("DATA_TYPES_HEADER")},"Data Types")),s.component({
name:m.name(),
params:["searchSummary","searchState","totalCount","realTotalCount","omittedDataTypes"]
})])]),A({class:O.classes.resultsColumn},[A({class:O.classes.columnHeader
},"Results"),s.component({name:u.name(),
params:["bus","page","totalPages","summaryCount","resultCount","totalCount","realTotalCount","searching","searchState","view"]
}),s.component({name:c.name(),
params:["bus","searchResults","searching","pageSize","searchState","showOverlay","errorMessage","selectedRows","view"]
})])]),s.component({name:f.name(),params:{component:"overlayComponent"}
}),s.component({name:g.name(),params:{channel:"tooltipChannel"}})]),
stylesheets:[O.sheet,T.sheet]}}))}));