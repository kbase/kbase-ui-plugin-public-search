define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,n,i,o){
"use strict";const r=i.tag,l=r("div"),s=r("table"),c=r("tr"),a=r("th"),d=r("td")
;class h{constructor({ref:e},n){
this.ref=e,this.runtime=n.$root.runtime,this.ready=t.observable(!0)}}
const g=i.makeStyles({component:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"column",marginTop:"10px"}},table:{css:{},inner:{td:{
padding:"4px",verticalAlign:"top"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px",verticalAlign:"top"},
"td:nth-child(1)":{width:"10em"},"th:nth-child(1)":{width:"10em"}}},
sectionHeader:{css:{fontWeight:"bold",fontSize:"110%",
color:"rgba(100,100,100,1)",marginTop:"8px"}}});function b(){return l({
class:g.classes.component},n.if("ready",s({class:g.classes.table
},[c([a("Something"),d({},"Here")])]),o.loading("Loading overview data")))}
return e.registerComponent((function(){return{viewModelWithContext:h,
template:b(),stylesheet:g.sheet}}))}));