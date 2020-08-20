define(["kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(e,s,l){
"use strict";const t=l.tag,a=t("span"),c=t("div"),o=l.makeStyles({component:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}},col2:{css:{
flex:"2 1 0px",display:"flex",flexDirection:"column",overflow:"auto"}},col1:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column",overflow:"auto"}},
row:{css:{flex:"1 1 0px"}},fieldSet:{css:{flex:"1 1 0px",overflow:"auto",
whiteSpace:"nowrap",textOverflow:"ellipsis"}},field:{css:{marginRight:"6px"}},
label:{css:{textStyle:"italic",color:"rgba(150,150,150,1)"}},value:{css:{}}})
;return{build:function(e){return e.map(e=>function(e){return c({
class:o.classes[e.class]},e.content.map(e=>c({class:o.classes.fieldSet
},e.map(e=>a({class:o.classes.field},[a({class:o.classes.label
},e.label+": "),e.format?a({class:o.classes.value,dataBind:{typedText:{
value:"detail."+e.property,type:'"'+e.type+'"',format:'"'+e.format+'"'}}}):a({
class:o.classes.value,dataBind:{text:"detail."+e.property}})])))))}(e))},
style:o,TypeComponentBase:class{constructor({row:e}){
this.detail=e.data.metadata.searchObject.detail}}}}));