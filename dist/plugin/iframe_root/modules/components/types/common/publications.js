define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_common_ts/HttpClient","../../table","../../../lib/docUtils","./authors","./pubMedLink"],(function(t,e,s,n,r,i,a,o,l,c,u,h){
"use strict";const m=i.tag,d=m("div"),b=m("span"),p=m("input"),g=m("label")
;class f extends r{constructor(t,s){super(t);const{query:n}=t
;this.runtime=s.$root.runtime,
this.queryInput=e.observable(n),this.queryTerms=e.pureComputed(()=>this.queryInput().split(/\s+/).join("+")),
this.publications=e.observableArray(),
this.loading=e.observable(!0),this.maxPublications=50,this.table={style:{
backgroundColor:"#FFF"},rowStyle:{borderBottom:"1px silver solid"},sort:{
column:e.observable("year"),direction:e.observable("desc")},columns:[{
name:"title",label:"Title",width:40,html:!0,sort:!0,component:{name:h.name(),
params:{text:"title",id:"id"}}},{name:"source",label:"Source",width:15,sort:!0
},{name:"year",label:"Year",width:10,sort:!0},{name:"authors",label:"Authors",
width:35,component:{name:u.name(),params:{authors:"authors"}},sort:null}]
},this.table.columnMap=this.table.columns.reduce((t,e)=>(t[e.name]=e,
t),{}),this.subscribe(this.queryTerms,()=>{this.fetchPublications()
}),this.status=e.observable("searching"),this.fetchPublications()}
fetchPublications(){this.status("searching"),this.getPublications().then(t=>{
this.publications(t),this.loading(!1),this.status("success")}).catch(t=>{
console.error("ERROR fetching publications",t),this.status("error")})}
getPublications(){
return this.getPublicationIds().then(e=>t.all([this.getSummaries(e),this.getAbstracts(e)])).spread((t,e)=>{
const s=[];for(let n=t.length-1;n>=0;n-=1){const r=Object.assign({},t[n],e[n])
;s.push(r)}return s})}getPublicationIds(){
const t=new URL("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"),e=t.searchParams
;e.set("db","pubmed"),
e.set("sort","pub+date"),e.set("retmax",this.maxPublications),
e.set("term",this.queryTerms());return(new o.HttpClient).request({method:"GET",
url:t.toString(),responseType:"document"}).then(t=>{
const e=c.docToJSON(t.response)
;return c.find(e,["eSearchResult","IdList"]).children.reduce((t,e)=>{
if("Id"===e.name){const s=c.find(e,["#text"]).text;t.push(parseInt(s))}return t
},[])}).catch(t=>{console.error(t)})}getAbstracts(t){
const e=new URL("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"),s=e.searchParams
;s.set("db","pubmed"),s.set("rettype","abstract"),s.set("id",t.join(","))
;return(new o.HttpClient).request({method:"GET",url:e.toString(),
responseType:"document"}).then(t=>{
const e=c.docToJSON(t.response),s=c.find(e,["PubmedArticleSet"],null)
;if(!s)return[];return s.children.filter(t=>"PubmedArticle"===t.name).map(t=>{
const e=c.find(t,["MedlineCitation"]);return{
id:parseInt(c.find(e,["PMID","#text"]).text),
abstract:c.findText(e,["Article","Abstract","AbstractText","#text"],"No abstract found for this article")
}})}).catch(t=>{
throw console.error("Error getting abstracts: ",t),new Error("Error getting abstracts: "+t.message)
})}getSummaries(t){
const e=new URL("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"),s=e.searchParams
;s.set("db","pubmed"),s.set("id",t.join(","));return(new o.HttpClient).request({
method:"GET",url:e.toString(),responseType:"document"
}).then(t=>c.find(c.docToJSON(t.response),["eSummaryResult"]).children.filter(t=>"DocSum"===t.name).map(t=>{
const e=parseInt(c.findText(t,["Id","#text"])),s=t.children.reduce((t,e)=>{
if("Item"!==e.name)return t;const s=e.attributes.Name;let n
;return n=1==e.children.length?c.findText(e,["#text"],null):e.children.reduce((t,e)=>{
if("Item"===e.name){const s=c.findText(e,["#text"],null);t.push(s)}return t
},[]),t[s]=n,t
},{}),n=s.PubDate,r=n.split(/\s+/),i=parseInt(r[0]),a=s.Source,o=s.Title,l=s.AuthorList,u=s.PubTypeList,h=u.includes("Journal Article")
;return{id:e,date:n,year:i,source:a,title:o,authors:l,pubTypes:u,isJournal:h}
})).catch(t=>{
throw console.error("Error getting summaries: ",t),new Error("Error getting summaries: "+t.message)
})}}const y=i.makeStyles({component:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"column",marginTop:"10px"}},container:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column"}}})
;return s.registerComponent((function(){return{viewModelWithContext:f,
template:d({class:y.classes.component
},[n.if("loading",a.loading("Loading publications"),d({class:y.classes.container
},[d({class:"form-inline",style:{marginBottom:"10px"}},[d({class:"form-group"
},[g({class:"control-label",style:{marginRight:"4px"}},"PubMed Search"),d({
class:"input-group"},[p({class:"form-control",dataBind:{value:"queryInput"},
style:{width:"20em"}}),d({class:"input-group-addon",style:{width:"3em",
maxWidth:"3em"}},n.switch("status",[['"searching"',b({
class:"fa fa-spinner fa-spin fa-fw"})],['"error"',b({class:"fa fa-frown-o"
})],['"success"',b({class:"fa fa-search"})]]))])]),d({style:{
display:"inline-block",marginLeft:"12px"}
},[n.if("publications().length > 0",[b("Loaded "),b({dataBind:{
text:"publications().length"}
}),b(" publications")])])]),n.if("publications().length > 0",d({
class:y.classes.container,dataBind:{component:{name:l.quotedName(),params:{
table:"table",rows:"publications"}}}}),d({class:"well",style:{
textStyle:"italic",textAlign:"center"}
},"No publications found in PubMed with the above search terms; you may modify and rerun the search."))]))]),
stylesheet:y.sheet}}))}));