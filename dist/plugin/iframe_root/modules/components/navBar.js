define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders"],(function(t,e,s,a,o,l){
"use strict";class n extends a{constructor(t){super(t)
;const{page:e,totalPages:s,summaryCount:a,resultCount:o,totalCount:l,realTotalCount:n,searching:i,searchState:c,view:r}=t
;this.page=e,
this.totalPages=s,this.summaryCount=a,this.resultCount=o,this.totalCount=l,
this.realTotalCount=n,this.searching=i,this.searchState=c,this.view=r}
compactView(){return"compact"===this.view()}expandedView(){
return"expanded"===this.view()}setView(t){this.view(t)}doFirstPage(){
this.page(1)}doPrevPage(){this.page()>1&&this.page(this.page()-1)}doNextPage(){
this.page()<this.totalPages()&&this.page(this.page()+1)}doLastPage(){
this.page(this.totalPages())}showTruncatedResultsTooltip(t,e){const s={
title:"Truncated Results",
content:["The search service is limited to accessing at most 10,000 items for a given query. ","Any results beyond the 10,000th item, within the current query and sort order, will be omitted. "],
left:e.clientX,top:e.clientY};this.bus.send("show-tooltip",s)}}
const i=o.tag,c=i("div"),r=i("span"),d=i("button");var u=o.makeStyles({
component:{css:{display:"flex",flexDirection:"row",alignItems:"stretch"}},
toolbar:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row",
alignItems:"center"}},cell:{css:{padding:"4px"}},col1:{css:{flex:"2 1 0px",
display:"flex",flexDirection:"row",alignItems:"center"}},col2:{css:{
flex:"2 1 0px",display:"flex",flexDirection:"row",alignItems:"center",
position:"relative"}},col3:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}})
;function p(){return c({style:{position:"absolute",left:"0",right:"0",top:"0",
bottom:"0",backgroundColor:"rgba(255, 255, 255, 0.5)",fontSize:"300%",
display:"flex",flexDirection:"column",zIndex:"5"}})}
return e.registerComponent((function(){return{viewModel:n,template:c({
class:u.classes.component},[c({class:u.classes.col1},c({class:u.classes.toolbar
},[c({class:u.classes.cell,style:{flex:"0 0 auto"}},c({class:"btn-group",
role:"group"},[d({type:"button",class:"btn btn-default",
title:"Show the first page of results",dataBind:{click:"doFirstPage",
enable:"page() > 1"}},r({class:"fa fa-step-backward"})),d({type:"button",
class:"btn btn-default",title:"Show the previous page of results",dataBind:{
click:"doPrevPage",enable:"page() > 1"}},r({class:"fa fa-chevron-left"})),d({
type:"button",class:"btn btn-default",title:"Show the next page of results",
dataBind:{click:"doNextPage",enable:"page() < totalPages()"}},r({
class:"fa fa-chevron-right"})),d({type:"button",class:"btn btn-default",
title:"Show the last page of results",dataBind:{click:"doLastPage",
enable:"page() < totalPages()"}},r({class:"fa fa-step-forward"}))])),c({
class:u.classes.cell,style:{flex:"0 0 auto",position:"relative"}
},[s.switch("searchState",[['"none"',""],['"notfound"',"no pages"],['"error"',""],['["searching", "success"]',[s.if('searchState() === "searching"',p()),s.if("totalPages() === 0","no pages",c({
style:{display:"inline-block",marginLeft:"6px"}},[" Page ",r({style:{
fontWeight:"bold"},dataBind:{text:"page"}})," of ",r({style:{fontWeight:"bold"},
dataBind:{typedText:{value:"totalPages",type:'"number"',format:'"0,0"'}}
})]))]]])])])),c({class:u.classes.col2
},s.switch("searchState",[['"none"',""],['"notfound"',""],['"error"',""],['["searching", "success"]',[s.if('searchState() === "searching"',p()),c([r({
style:{fontWeight:"bold"},dataBind:{typedText:{value:"resultCount",
type:'"number"',format:'"0,0"'}}})," of ",r({style:{fontWeight:"bold"},
dataBind:{typedText:{value:"realTotalCount",type:'"number"',format:'"0,0"'}}
})," objects",s.if("realTotalCount() > totalCount()",r({style:{
fontStyle:"italic"}},[" (truncated to ",r({dataBind:{typedText:{
value:"totalCount",type:'"number"',format:'"0,0"'}}})," ",r({
class:"fa fa-question-circle",dataTooltipHook:"truncatedText",style:{
color:"gray",cursor:"pointer"},dataBind:{
click:"function(d,e){$component.showTruncatedResultsTooltip(d,e)}"}
}),")"]))])]]])),c({class:u.classes.col3},c({class:"btn-group"},[d({
class:"btn btn-default",title:"Show results in compact rows - one row per item",
dataBind:{class:'compactView() ? "active" : null',
click:'() => {$component.setView("compact")}'}},r({class:"fa fa-bars"})),d({
class:"btn btn-default",
title:"Show results with expanded rows - some detail shown within row",
dataBind:{class:'expandedView() ? "active" : null',
click:'() => {$component.setView("expanded")}'}},r({class:"fa fa-square-o"
}))]))]),stylesheet:u.sheet}}))}));