define([],(function(){"use strict";function e(e){if(!e)return null
;var t=/(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)([\+\-])(\d\d)(:?[\:]*)(\d\d)/.exec(e)
;if(!t)throw new TypeError("Invalid Date Format for "+e)
;var d=t[7]+t[8]+":"+t[10],o=t[1]+"-"+t[2]+"-"+t[3]+"T"+t[4]+":"+t[5]+":"+t[6]+d
;return new Date(o)}return{workspaceInfoToObject:function(t){return{id:t[0],
name:t[1],owner:t[2],moddate:t[3],object_count:t[4],user_permission:t[5],
globalread:t[6],lockstat:t[7],metadata:t[8],modDate:e(t[3])}},
objectInfoToObject:function(t){const d=t[2].split(/[-.]/);return{id:t[0],
name:t[1],type:t[2],save_date:t[3],version:t[4],saved_by:t[5],wsid:t[6],ws:t[7],
checksum:t[8],size:t[9],metadata:t[10],ref:t[6]+"/"+t[0]+"/"+t[4],
obj_id:"ws."+t[6]+".obj."+t[0],typeModule:d[0],typeName:d[1],
typeMajorVersion:d[2],typeMinorVersion:d[3],saveDate:e(t[3])}}}}));