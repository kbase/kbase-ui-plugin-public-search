define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html"],(function(t,e,a,o){
"use strict"
;const i=o.tag,n=i("div"),r=i("a"),s=i("p"),d=i("hr"),c=i("span"),l=i("table"),h=i("tbody"),b=i("tr"),p=i("th"),k=i("td"),g=o.makeStyles({
table:{css:{},inner:{td:{padding:"4px"},th:{fontWeight:"bold",
color:"rgba(200,200,200,1)",textAlign:"left",padding:"4px"}}},sectionHeader:{
css:{fontWeight:"bold",fontSize:"110%",color:"rgba(100,100,100,1)",
marginTop:"8px"}}});class f{
constructor({name:t,owner:e,lastModifiedAt:a,workspaceId:o,objectId:i}){
this.name=t,
this.owner=e,this.lastModifiedAt=a,this.workspaceId=o,this.objectId=i}}
return e.registerComponent((function(){return{viewModel:f,template:n([n([l({
class:g.classes.table},[h([b([p("Title"),k(r({target:"_blank",dataBind:{
text:"name",attr:{href:'"/narrative/ws." + workspaceId + ".obj." + objectId'}}
}))]),b([p("Owner"),k(c({dataBind:{text:"owner"}
}))]),b([p("Created"),k(c({},"tbd"))]),b([p("Last modified"),k(c({dataBind:{
typedText:{value:"lastModifiedAt",type:'"date"',format:'"YYYY-MM-DD @ hh:mm a"'}
}}))])])])]),d({style:{width:"80%"}
}),n([s(["This object is contained in a Narrative. You may ",r({target:"_blank",
dataBind:{attr:{href:'"/narrative/ws." + workspaceId + ".obj." + objectId'}}
},"open")," the narrative to view the context in which the object is used and other associated "," objects and apps."]),s(["Note that Narrative access requires login."])])]),
stylesheet:g.sheet}}))}));