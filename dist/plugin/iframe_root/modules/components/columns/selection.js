define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,t,s,o){
"use strict";const c=o.tag,i=c("span");c("div");class n{constructor(e){
this.selected=e.row.data.selected.value,
this.selectedRows=e.env.selectedRows,this.rowId=e.row.id}toggleSelected(e,t){
this.selected(!this.selected()),
this.selected()?(this.selectedRows.remove(this.rowId),
this.selectedRows.push(this.rowId)):this.selectedRows.remove(this.rowId),
t.stopPropagation()}}function r(){return i({style:{cursor:"pointer"},class:"fa",
dataBind:{class:'selected() ? "fa-check-square-o" : "fa-square-o"',
click:"function(d,e){$component.toggleSelected.call($component,d,e)}"}})}
return t.registerComponent((function(){return{viewModel:n,template:r()}}))}));