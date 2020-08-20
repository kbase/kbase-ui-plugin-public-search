define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","kb_lib/htmlBuilders","../lib/model","./autoTable/main","./inspector","./resultsError","./detail"],(function(e,s,t,o,a,r,n,i,l,c,h){
"use strict";const d=a.tag,m=d("div"),u=d("p"),b=d("span"),w=d("hr")
;class g extends o{constructor(e,s){super(e)
;const{searchResults:t,searching:o,pageSize:a,searchState:n,showOverlay:i,errorMessage:d,selectedRows:g,view:p}=e
;this.searchResults=t,
this.searching=o,this.showOverlay=i,this.selectedRows=g,this.view=p
;const f=s.$root.columns;this.table={rows:this.searchResults,selectedRows:g,
detailComponent:h.name(),columns:f,isLoading:o,pageSize:a,state:n,
errorMessage:d,view:p,env:{selectedRows:g},actions:{},sortBy:e=>{
e.sort.direction("ascending"===e.sort.direction()?"descending":"ascending"),
f.forEach(e=>{e.sort&&e.sort.active(!1)}),e.sort.active(!0)},rowAction:e=>{
this.showOverlay({name:l.name(),type:"info",viewModel:{row:e.data}})}
},this.messages={none:m([u("No active search."),w({style:{width:"50%"}
}),u("Enter one or more terms above to search for public data."),u('The search will find objects that include <b>all of the search words</b>, or terms, you submit. In tech-speak, this means that the terms are implicitly combined by a logical "AND".'),u(["Terms are matched against <b>whole words</b>; a search term will which is part of a word found in an object will not result in a match."])]),
notfound:m([u("Sorry, nothing was found with this search."),w({style:{
width:"50%"}}),u(["Try broadening your search or use the ",b({
class:"fa fa-bullhorn"
})," Feedback button above to let us know how we can improve search."])]),
loading:m([r.loading("Running your search...")]),error:{component:{
name:c.name(),params:{link:"bus",message:"errorMessage"}}}}}}
const p=a.makeStyles({container:{css:{flex:"1 1 0px",display:"flex",
flexDirection:"column",position:"relative"}}})
;return s.registerComponent((function(){return{viewModelWithContext:g,
template:m({class:p.classes.container},[m({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column"},dataBind:{component:{name:i.quotedName(),params:{
link:"bus",table:"table",messages:"messages"}}}})]),stylesheet:p.sheet}}))}));