define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","../../../table2"],(function(e,t,s,o,n,i){
"use strict";class l extends o{constructor(t,s){super(t)
;const{genomeRef:o,selectedContig:n,contigsCount:i}=t
;this.genomeRef=o,this.runtime=s.$root.runtime,
this.selectedContig=n,this.contigsCount=i,
this.selectedRow=e.observable(),this.subscribe(this.selectedRow,e=>{
e?this.selectedContig()===e.id?this.selectedContig(null):this.selectedContig(e.id):this.selectedContig(null)
}),
this.contigs=e.observableArray(),this.ready=e.observable(!1),this.error=e.observable(),
this.table={style:{table:{backgroundColor:"#FFF"},row:{},selectedRow:{
backgroundColor:"aqua"}},selectedRow:this.selectedRow,sort:{
column:e.observable("length"),direction:e.observable("desc")},columns:[{
name:"id",label:"ID",width:65,html:!1,sort:!0,style:{cell:{"overflow-y":"auto",
"white-space":"nowrap","text-overflow":"ellipsis"}}},{name:"length",
label:"Length",width:35,sort:!0,style:{cell:{"text-align":"right",
"font-family":"monospace","font-size":"95%","overflow-y":"auto",
"white-space":"nowrap","text-overflow":"ellipsis"}},format:{type:"number",
format:"0,0"}}]},this.getContigs().then(t=>{
t?(this.contigsCount(t.length),this.contigs(t.map(t=>({id:t.id,length:t.length,
selected:e.observable(!1)})))):this.contigs([]),this.ready(!0)}).catch(e=>{
this.error(e.message)})}getContigs(){
const e=this.runtime.service("rpc").makeClient({module:"Workspace",timeout:1e4,
authenticated:!0});return e.callFunc("get_objects2",[{objects:[{
ref:this.genomeRef,
included:["contigs","num_contigs","contig_lengths","contigset_ref","assembly_ref"]
}]}]).spread(t=>{const{contigset_ref:s,assembly_ref:o}=t.data[0].data
;return s?e.callFunc("get_objects2",[{objects:[{ref:s,
included:["contigs/[*]/id","contigs/[*]/length"]}]
}]).spread(e=>e.data[0].data.contigs):o?e.callFunc("get_objects2",[{objects:[{
ref:o,included:["contigs"]}]}]).spread(e=>{const t=e.data[0].data.contigs
;return Object.keys(t).map(e=>{const s=t[e];return{id:s.contig_id,
length:s.length,start:s.start_position}})}):[]})}}
const c=(0,n.tag)("div"),r=n.makeStyles({component:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column",marginTop:"10px"}},searchResults:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column",border:"1px silver solid"}
},contigRow:{css:{padding:"4px",cursor:"pointer"},pseudo:{hover:{
backgroundColor:"#CCC"}}},selectedContig:{css:{backgroundColor:"aqua"}}})
;function a(){return c({class:r.classes.component
},s.if("ready",s.if("contigs().length > 0",s.component({name:i.name(),params:{
table:"table",rows:"contigs"}}),c({class:"alert alert-warning"
},"No contigs available")),c({class:"fa fa-spin fa-spinner fa-fw"})))}
return t.registerComponent((function(){return{viewModelWithContext:l,
template:a(),stylesheet:r.sheet}}))}));