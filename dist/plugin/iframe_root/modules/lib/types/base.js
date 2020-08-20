define([],(function(){"use strict";return{BaseObject:class{
constructor({object:t}){this.object=t
;const[,e,i,s]=t.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/)
;this.workspaceId=e,this.objectId=i,
this.version=s,this.ref=[e,i,s].join("/"),this.title=this.getTitle(),
this.detail=this.getDetail()}getDetail(){return{}}}}}));