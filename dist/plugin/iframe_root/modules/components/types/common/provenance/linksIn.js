define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","kb_lib/workspaceUtils","../../../table","./objectLink"],(function(e,t,n,a,r,s,o,l,i){
"use strict";class c extends a{constructor(t,n){super(t);const{ref:a}=t
;this.runtime=n.$root.runtime,
this.ref=a,this.ready=e.observable(!1),this.error=e.observable(null),
this.referencingObjects=e.observableArray(),this.table={style:{
backgroundColor:"#FFF"},rowStyle:{borderBottom:"1px silver solid"},sort:{
column:e.observable("name"),direction:e.observable("asc")},columns:[{
name:"name",label:"Name",width:30,html:!1,sort:!0,component:{name:i.name(),
params:{name:"name",ref:"ref"}}},{name:"type",label:"Type",width:15,sort:!0},{
name:"saved",label:"Saved",width:15,format:{type:"date",format:"MMM D, YYYY"},
sort:!0},{name:"savedBy",label:"Saved By",width:15,sort:!0},{name:"container",
label:"Narrative",width:25,sort:!0}]
},this.table.columnMap=this.table.columns.reduce((e,t)=>(e[t.name]=t,
e),{}),this.getReferencingObjects().then(e=>{
this.ready(!0),this.referencingObjects(e)}).catch(e=>{console.error("ERROR!",e)
})}getReferencingObjects(){const e=this.runtime.service("rpc").makeClient({
module:"Workspace",timeout:1e4})
;return e.callFunc("list_referencing_objects",[[{ref:this.ref}]]).spread(t=>{
const n=t[0].map(e=>o.objectInfoToObject(e))
;return Promise.all(n.map(t=>e.callFunc("get_workspace_info",[{id:t.wsid
}]).spread(e=>o.workspaceInfoToObject(e)))).then(e=>n.map((t,n)=>{const a=e[n]
;let r
;return r=a.metadata&&a.metadata.narrative_nice_name?a.metadata.narrative_nice_name:a.name,
{name:t.name,ref:t.ref,type:t.typeName,saved:t.saveDate,savedBy:t.saved_by,
container:r}}))})}}const m=r.tag,b=m("p"),d=m("div"),f=r.makeStyles({component:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column",marginTop:"10px"}},
col0:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column"}},col1:{css:{
flex:"0 0 10em",display:"flex",flexDirection:"column"}},col2:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}},container:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"column"}}})
;return t.registerComponent((function(){return{viewModelWithContext:c,
template:d({class:f.classes.component
},[d([b(['The "Objects Referencing" view shows all objects which ',"are linked to, or use, this one."])]),n.if("ready",n.if("referencingObjects().length > 0",d({
class:f.classes.container,dataBind:{component:{name:l.quotedName(),params:{
table:"table",rows:"referencingObjects"}}}}),d({class:"alert alert-warning"
},"No other objects reference this one.")),s.loading())]),stylesheet:f.sheet}}))
}));