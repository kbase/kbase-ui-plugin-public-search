define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(e,t,a,l,s){
"use strict"
;const o=s.tag,n=o("div"),c=o("label"),p=o("select"),i=o("option"),d=o("button")
;class r extends l{constructor(t,a){super(t);const{dataTypes:l}=t
;this.dataTypes=l,
this.supportedDataTypes=a.$root.supportedDataTypes,this.selectedDataTypes=e.observableArray(),
this.selectedDataType=e.observable(),this.selectionLabel=e.pureComputed(()=>{
const e=this.selectedDataTypes().length
;return 0===e?"All data types":e+" types selected"}),this.availableDataTypes=[{
value:"_select_",label:this.selectionLabel,enabled:e.observable(!0)
}].concat(this.supportedDataTypes.map(t=>({value:t.value,label:t.label,
enabled:e.observable(!0)}))),this.subscribe(this.selectedDataTypes,e=>{
0===e.length&&this.dataTypes.removeAll();const t=e.map(e=>e.value)
;this.dataTypes(t)
}),this.availableDataTypesMap=this.availableDataTypes.reduce((e,t)=>(e[t.value]=t,
e),{}),this.dataTypeInput=e.observable("_select_")}doSelectDataType(){
const e=this.availableDataTypesMap[this.dataTypeInput()]
;"_select_"!==e.value&&(e.enabled()?(this.selectedDataTypes.push(e),
e.enabled(!1)):(this.selectedDataTypes.remove(e),
e.enabled(!0)),this.dataTypeInput("_select_"))}doUnselectDataType(e){
this.selectedDataTypes.remove(e),e.enabled(!0)}doRemoveDataType(e){
this.selectedDataTypes.remove(e),e.enabled(!0)}doClearSelectedDataTypes(){
this.selectedDataTypes().forEach(e=>{e.enabled(!0)
}),this.selectedDataTypes.removeAll()}}var b=s.makeStyles({component:{
flex:"1 1 0px",display:"flex",flexDirection:"column"},activeFilterInput:{
backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},fieldGroupLabel:{
fontWeight:"bold",color:"gray",marginTop:"8px",marginRight:"4px"}})
;function u(){return n({class:"form-inline "+b.classes.component},n({
class:"form-group",style:{margin:"0 4px"}},[c({class:b.classes.fieldGroupLabel
},"Include Data Types:"),p({dataBind:{value:"dataTypeInput",event:{
change:"(d,e) => {$component.doSelectDataType.call($component,d,e)}"},
css:'selectedDataTypes().length ? "'+b.classes.activeFilterInput+'" : null',
foreach:"availableDataTypes"},class:"form-control",style:{margin:"0 4px"}
},a.if("enabled",i({dataBind:{value:"value",text:"label"}}),i({dataBind:{
value:"value",text:'"✓ " + label'}}))),a.if("selectedDataTypes().length > 0",d({
class:"btn btn-default",dataBind:{
click:"(d,e) => {$component.doClearSelectedDataTypes.call($component,d,e)}"}
},"Clear selected types"))]))}return t.registerComponent((function(){return{
viewModelWithContext:r,template:u(),stylesheet:b.sheet}}))}));