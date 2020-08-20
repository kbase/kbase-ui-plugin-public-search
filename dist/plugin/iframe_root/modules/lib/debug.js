define(["kb_lib/jsonRpc/genericClient"],(function(e){"use strict";return{
tryInaccessibleObject:function(c,n,s){new e({
token:c.service("session").getAuthToken(),module:"Workspace",
url:c.config("services.workspace.url")}).callFunc("get_object_info3",[{
objects:[{ref:s}]
}]).then(e=>(console.warn("inaccessible object",e),null)).catch(e=>(console.error("inaccessible object",s,n,e.message),
null))}}}));