define(["bluebird","knockout","kb_knockout/lib/viewModelBase","kb_lib/httpUtils","./components/columns/selection"],(function(e,a,t,l,i){
"use strict";return class extends t{constructor(e){super(e)
;const{runtime:t,hostChannel:l,authorized:r,authorization:s,pluginParams:n}=e
;this.runtime=t,
this.hostChannel=l,this.pluginParams=n,this.authorized=a.observable(r),
this.authorization=a.observable(s),
this.ready=a.observable(!1),this.error=a.observable(),
this.methodMap=null,this.supportedDataTypes=[{value:"Narrative",
label:"Narrative",indexAvailable:!0},{value:"Assembly",label:"Assembly",
indexAvailable:!0},{value:"FBAModel",label:"FBA Model",indexAvailable:!0},{
value:"Genome",label:"Genome",indexAvailable:!0},{value:"PairedEndLibrary",
label:"Paired-End Library",indexAvailable:!0},{value:"Pangenome",
label:"Pangenome",indexAvailable:!0},{value:"RNASeqSampleSet",
label:"RNA-Seq Sample Set",indexAvailable:!0},{value:"SingleEndLibrary",
label:"Single-End Library",indexAvailable:!0},{value:"Tree",
label:"Species Tree",indexAvailable:!0},{value:"Media",label:"Media",
indexAvailable:!0
}],this.supportedDataTypesMap=this.supportedDataTypes.reduce((e,a)=>(e[a.value]=a,
e),{}),this.columns=[{name:"selected",label:"Select",type:"boolean",sort:null,
width:.5,style:{textAlign:"center"},noSelect:!0,component:i.name()},{
name:"description",label:"Name",type:"string",sort:null,width:3},{name:"date",
label:"Date",type:"date",format:"MM/DD/YYYY",sort:{propertyKey:"timestamp",
isObject:!1,direction:a.observable("descending"),active:a.observable(!0)},
width:1},{name:"type",label:"Data Type",type:"string",sort:{propertyKey:"type",
isObject:!1,direction:a.observable("ascending"),active:a.observable(!1)},width:1
},{name:"name",label:"Workspace",type:"string",width:3},{name:"source",
label:"Type",type:"string",width:1},{name:"owner",label:"Owner",type:"string",
width:1}],this.columnsMap=this.columns.reduce((function(e,a){return e[a.name]=a,
e
}),{}),this.getMethodMap().then(e=>(this.methodMap=e,this.getAllTypes())).then(e=>{
this.supportedDataTypes.forEach(a=>{
if(!e.includes(a.value))return console.warn("omitting unindexed type: "+a.value),
a.indexAvailable=!1;a.indexAvailable=!0}),this.ready(!0)}).catch(e=>{
this.error(e)})}getMethodMap(){const a=this.runtime.service("rpc").makeClient({
module:"NarrativeMethodStore",timeout:1e4,authorization:!1})
;return e.all([a.callFunc("list_methods_spec",[{tag:"dev"
}]),a.callFunc("list_methods_spec",[{tag:"beta"
}]),a.callFunc("list_methods_spec",[{tag:"release"}])]).spread(([e],[a],[t])=>({
dev:e.reduce((e,a)=>(e[a.behavior.kb_service_name+"/"+a.behavior.kb_service_method]=a,
e),{}),
beta:a.reduce((e,a)=>(e[a.behavior.kb_service_name+"/"+a.behavior.kb_service_method]=a,
e),{}),
release:t.reduce((e,a)=>(e[a.behavior.kb_service_name+"/"+a.behavior.kb_service_method]=a,
e),{})})).catch(e=>(console.error("ERROR",e.message),null))}getAllTypes(){
return this.runtime.service("rpc").makeClient({module:"KBaseSearchEngine",
timeout:1e4,authorization:!0}).callFunc("search_types",[{match_filter:{
full_text_in_all:null,exclude_subobjects:1},access_filter:{with_private:1,
with_public:1}}]).spread(e=>Object.keys(e.type_to_count))}}}));