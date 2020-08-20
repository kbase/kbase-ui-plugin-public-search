define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,a,n){
"use strict";class o{constructor(t){const{object:e}=t,a=e.objectInfo.metadata
;this.metadata=Object.keys(a).map(t=>({key:t,value:a[t]
})).sort((t,e)=>t.key<e.key?-1:t.key>e.key?1:0)}}
const i=n.tag,l=i("div"),s=i("table"),c=i("tr"),d=i("th"),r=i("td"),h=n.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
marginTop:"10px"}},table:{css:{},inner:{td:{padding:"4px",verticalAlign:"top"},
th:{fontWeight:"bold",color:"rgba(200,200,200,1)",textAlign:"left",
padding:"4px",verticalAlign:"top"},"td:nth-child(1)":{width:"10em"},
"th:nth-child(1)":{width:"10em"}}},sectionHeader:{css:{fontWeight:"bold",
fontSize:"110%",color:"rgba(100,100,100,1)",marginTop:"8px"}}})
;return e.registerComponent((function(){return{viewModel:o,template:l({
class:h.classes.component},[a.if("metadata.length > 0",s({class:h.classes.table,
dataBind:{foreach:"metadata"}},c([d({dataBind:{text:"key"}}),r({dataBind:{
text:"value"}})])),l({class:"well",style:{textStyle:"italic",textAign:"center"}
},"No metadata stored in this object"))]),stylesheet:h.sheet}}))}));