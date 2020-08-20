require(["loader"],(function(){"use strict"
;require(["bluebird","kbaseUI/integration","kbaseUI/dispatcher","kb_knockout/load","kb_lib/props","yaml!./config.yml","bootstrap","css!font_awesome"],(e,t,o,r,n,i)=>{
const a=new n.Props({data:i});e.try(()=>{const e=new t({rootWindow:window,
pluginConfigDB:a}),n=document.getElementById("root");let i=null
;return r.load().then(e=>{
e.options.deferUpdates=!0,e.options.createChildContextWithAs=!0
}).then(()=>e.start()).then(()=>{a.getItem("install.widgets",[]).forEach(t=>{
e.runtime.service("widget").getWidgetManager().addWidget(t)})
}).then(()=>(i=new o({runtime:e.runtime,node:n,views:a.getItem("views",[])
}),i.start())).then(t=>{e.onNavigate(({view:e,params:o})=>{t.dispatch({view:e,
params:o}).catch(e=>{console.error("Dispatch Error",e.message)})}),e.started()})
}).catch(e=>{console.error("ERROR2",e)})})}));