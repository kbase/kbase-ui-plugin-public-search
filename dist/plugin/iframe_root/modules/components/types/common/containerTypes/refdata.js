define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,a,o){
"use strict"
;const s=o.tag,r=s("div"),i=s("a"),d=s("p"),n=s("hr"),c=s("span"),l=s("table"),u=s("tbody"),p=s("tr"),h=s("th"),b=s("td"),f=o.makeStyles({
table:{css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}}});class k{
constructor({source:t,sourceID:e,owner:a,lastModifiedAt:o,workspaceId:s,objectId:r}){
this.source=t,
this.sourceID=e,this.owner=a,this.lastModifiedAt=o,this.workspaceId=s,
this.objectId=r}}return e.registerComponent((function(){return{viewModel:k,
template:r([r([l({class:f.classes.table},[u([p([h("Source"),b(c({dataBind:{
text:"source"}}))]),p([h("Source ID"),b(c({dataBind:{text:"sourceID"}
}))]),p([h("Data imported by"),b(i({dataBind:{text:"owner",attr:{
href:'"/#people/" + owner'}},target:"_blank"}))]),p([h("Data imported"),b(c({
dataBind:{typedText:{value:"lastModifiedAt",type:'"date"',format:'"YYYY-MM-DD"'}
}}))])])])]),n({style:{width:"50%"}
}),r([d("This data object is contained within a Reference Data Workspace."),d(["KBase provides several sets of public reference datasets which you may use ","within Narratives for analysis."]),d(["Please see our ",i({
href:"http://kbase.us/data-policy-and-sources",target:"_blank"
},"Data Policy & Sources")," page for a full list of data sources and our data policy."])])]),
stylesheet:f.sheet}}))}));