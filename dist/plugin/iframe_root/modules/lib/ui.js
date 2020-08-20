define(["kb_lib/html"],(function(e){"use strict"
;var a=e.tag,t=a("button"),l=a("span"),o=a("div");return{
buildDialog:function(e){var a,r,n,i=e.type||"default";switch(i){case"warning":
r="exclamation-triangle",a="#8a6d3b";break;case"danger":case"error":r="frown-o",
a="#a94442";break;case"succcess":r="thumbs-up-o",a="##3c763d;";break;case"info":
r="info",a="#2e618d";break;case"primary":r=null,a="#2e618d";break;case"default":
default:r=i,a="#000"}n=r?l({class:"fa fa-"+r,style:{marginRight:"4px",
fontWeight:"bold",fontSize:"120%"}}):"";var s=(e.buttons||[{label:"Close",
onClick:"onClose"}]).map((function(e){return t({type:"button",
class:"btn btn-"+(e.type||"default"),dataBind:{click:e.onClick}},e.label)
})).join(" ");return o({},[o({style:{color:a,
backgroundColor:"rgba(255,255,255,1)",fontSize:"130%",fontWeight:"bold",
padding:"15px",borderBottom:"1px solid #e5e5e5"}},[n,e.title]),o({style:{
padding:"15px",minHeight:"10em",maxHeight:"85vh",overflowY:"auto",
backgroundColor:"rgba(255,255,255,1)"}},e.body),o({class:"clearfix",style:{
padding:"15px",textAlign:"right",backgroundColor:"rgba(255,255,255,1)",
borderTop:"1px solid #e5e5e5"}},o({class:"btn-toolbar pull-right",style:{
textAlign:"right"}},s))])},buildFullHeightDialog:function(e){var a,r,n
;switch(e.type||"default"){case"warning":r="exclamation-triangle",a="#8a6d3b"
;break;case"danger":case"error":r="frown-o",a="#a94442";break;case"succcess":
r="thumbs-up-o",a="##3c763d;";break;case"info":r="info",a="#2e618d";break
;case"primary":r=null,a="#2e618d";break;case"default":default:a="#000"}n=r?l({
class:"fa fa-"+r,style:{marginRight:"4px"}}):"";var i=(e.buttons||[{
label:"Close",onClick:"onClose"}]).map((function(e){return t({type:"button",
class:"btn btn-"+(e.type||"default"),dataBind:{click:e.onClick}},e.label)
})).join(" ");return o({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}},[o({style:{color:a,
backgroundColor:"rgba(255,255,255,1)",fontSize:"130%",fontWeight:"bold",
padding:"15px",borderBottom:"1px solid #e5e5e5"}},[n,e.title]),o({style:{
padding:"15px",minHeight:"10em",backgroundColor:"rgba(255,255,255,1)",
overflowY:"auto",flex:"1 1 0px",display:"flex",flexDirection:"column"}
},e.body),o({class:"clearfix",style:{padding:"15px",textAlign:"right",
backgroundColor:"rgba(255,255,255,1)",borderTop:"1px solid #e5e5e5"}},o({
class:"btn-toolbar pull-right",style:{textAlign:"right"}},i))])},
buildFullHeightDialog2:function(e){const a=(e.buttons||[{label:"Close",
onClick:"onClose"}]).map((function(e){return t({type:"button",
class:"btn btn-"+(e.type||"default"),dataBind:{click:e.onClick}},e.label)
})).join(" ");return o({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}},[o({style:{padding:"15px",minHeight:"10em",
backgroundColor:"rgba(255,255,255,1)",overflowY:"auto",flex:"1 1 0px",
display:"flex",flexDirection:"column"}},e.body),o({class:"clearfix",style:{
padding:"15px",textAlign:"right",backgroundColor:"rgba(255,255,255,1)",
borderTop:"1px solid #e5e5e5"}},o({class:"btn-toolbar pull-right",style:{
textAlign:"right"}},a))])},bootstrapTextColor:function(e){var a
;switch(e=e||"default"){case"warning":a="#8a6d3b";break;case"danger":
case"error":a="#a94442";break;case"succcess":a="##3c763d;";break;case"primary":
a="#2e618d";break;case"muted":a="#777";break;case"default":default:a="#000"}
return a}}}));