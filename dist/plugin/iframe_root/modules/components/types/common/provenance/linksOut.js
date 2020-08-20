define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_lib/jsonRpc/genericClient","kb_lib/workspaceUtils","kb_lib/props","./linksOutNode"],(function(e,t,o,r,n,i,a,s,c,l,d){
"use strict";class b extends n{constructor(e,o){super(e);const{object:r}=e
;this.runtime=o.$root.runtime,
this.object=r,this.ready=t.observable(!1),this.error=t.observable(),
this.refTree=t.observable(),
this.getReferencedObjects(this.object.objectInfo).then(e=>{
this.refTree(e),this.ready(!0)}).catch(e=>{
this.error(e),console.error("error",e)})}getReferencedObjects(t){
return function(t,o){const r=new s({module:"Workspace",
url:t.config("services.Workspace.url"),token:t.service("session").getAuthToken()
});function n(e){let t,o;switch(e){case"Genome":t=["scientific_name"],o=[{
from:"data.scientific_name",to:"title"}];break;case"Assembly":t=["assembly_id"],
o=[{from:"data.assembly_id",to:"title"}];break;case"Taxon":
t=["scientific_name"],o=[{from:"data.scientific_name",to:"title"}];break
;case"Tree":t=["name","description","type"],o=[{from:"data.name",to:"title"}]
;break;case"RNASeqSampleSet":t=["sampleset_id","sampleset_desc"],o=[{
from:"data.sampleset_id",to:"title"}];break;case"SingleEndLibrary":
case"PairedEndLibrary":t=["source.source","source.source_id"],o=[{from:"info.1",
to:"title"}];break;case"ConditionSet":t=["ontology_mapping_method"],o=[{
from:"info.1",to:"title"}];break;case"ContigSet":case"Media":case"FBAModel":
t=["name","id"],o=[{from:"info.1",to:"title"}];break;case"OntologyDictionary":
t=["auto_generated_by"],o=[{from:"info.1",to:"title"}];break;case"Narrative":
t=["nbformat","nbformat_minor"],o=[{from:"info.1",to:"title"}];break
;case"Pangenome":t=["name"],o=[{from:"data.name",to:"title"}];break;default:
throw new Error("Sorry, no handler for "+e)}return{fieldsToInclude:t,
displayMapping:o}}return function t(o,n){return r.callFunc("get_objects2",[{
objects:[{ref:o}],ignoreErrors:1,no_data:1}]).spread(r=>{
if(null===r.data[0])return{ref:o,accessible:!1,workspaceId:null,objectId:null,
objectVersion:null,name:null,type:null,typeID:null,children:[]}
;const i=c.objectInfoToObject(r.data[0].info),a=r.data[0].refs;return e.props({
ref:o,accessible:!0,workspaceId:i.wsid,objectId:i.id,objectVersion:i.version,
name:i.name,type:i.typeName,typeID:i.type,
children:e.all(a.map(e=>t(e,n+1))).then(e=>e.sort((e,t)=>null===e.type?null===t.type?0:-1:null===t.type?1:e.type.localeCompare(t.type)))
})})}(o,0).then(e=>{const t=[];!function(e,t){!function e(o){try{
t(o),o.children.forEach(t=>{e(t)})}catch(r){
console.error("ERROR walking tree",r)}}(e)}(e,e=>{e.type?t.push({node:e,
displaySpec:n(e.type)}):e.display={title:"** Inaccessible **"}})
;const o=t.map(e=>({ref:e.node.ref,included:e.displaySpec.fieldsToInclude}))
;return r.callFunc("get_objects2",[{objects:o,ignoreErrors:1
}]).spread(o=>(o.data.forEach((e,o)=>{if(null===e)return void(r.node.display={
title:"Unknown"})
;const r=t[o],n=r.displaySpec.displayMapping.reduce((t,{from:o,to:r})=>(t[r]=l.getProp(e,o),
t),{});r.node.display=n
}),e)).catch(t=>(console.error("Error getting object display info",t,o,e),{
title:"** ERROR **"}))})}(this.runtime,t.ref)}}const p=i.tag,f=p("p"),u=p("div")
;return o.registerComponent((function(){return{viewModelWithContext:b,
template:u({style:{marginTop:"10px"}
},[u([f(['The "Object Composition" view shows all objects which are linked ',"from this object. In this sense, the entire data set encompassed by ","this object is composed of this object plus all other objects it ","references."]),f(["This chart reads like an outline, in which indentation level indicates ","that the indented objects are linked to the object directly above."])]),r.if("ready",r.component({
name:d.name(),params:{tree:"refTree"}}),a.loading())])}}))}));