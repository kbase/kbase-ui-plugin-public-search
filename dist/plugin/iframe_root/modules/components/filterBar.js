define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","./accessControl","./dataSource","./controls/dataTypesControl"],(function(e,t,a,s,n,i,o,r){
"use strict";const l=(0,n.tag)("div");class c extends s{constructor(e){super(e)
;const{withPrivateData:t,withPublicData:a,withUserData:s,withReferenceData:n,dataTypes:i}=e
;this.withPrivateData=t,
this.withPublicData=a,this.withUserData=s,this.withReferenceData=n,
this.dataTypes=i}}const p=n.makeStyles({component:{css:{display:"flex",
flexDirection:"row",marginTop:"10px"}},toolbar:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"row",marginBottom:"10px",alignItems:"center"}},
cell:{css:{padding:"4px"}}});return t.registerComponent((function(){return{
viewModel:c,template:l({class:p.classes.component},[l({class:p.classes.toolbar
},[l({style:{display:"flex",flexDirection:"row",alignItems:"center",
justifyContent:"flex-end",marginLeft:"10px"},dataBind:{component:{
name:o.quotedName(),params:{withUserData:"withUserData",
withReferenceData:"withReferenceData"}}}}),l({style:{flex:"1 1 0px",
display:"flex",flexDirection:"row",alignItems:"center",
justifyContent:"flex-end",marginLeft:"10px"},dataBind:{component:{
name:r.quotedName(),params:{dataTypes:"dataTypes"}}}})])]),stylesheet:p.sheet}
}))}));