define(["kb_knockout/registry","kb_lib/html","./builder"],(function(e,t,o){
"use strict";class s extends o.TypeComponentBase{constructor(e){super(e)}}
const n=(0,t.tag)("div"),r=[{class:"col2",content:[[{label:"domain",
property:"domain"},{label:"scientific name",property:"scientificName"}],[{
label:"contigs",property:"contigCount"},{label:"features",
property:"featureCount"}]]},{class:"col1",content:[[{label:"source",
property:"source"},{label:"id",property:"sourceId"}]]}]
;return e.registerComponent((function(){return{viewModel:s,template:n({
class:o.style.classes.component},o.build(r)),stylesheet:o.style.sheet}}))}));