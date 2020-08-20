define(["./base"],(function(t){"use strict";class e extends t.BaseObject{
constructor(t){super(t)}getTitle(){if(this.object.data){
if(this.object.data.scientific_name)return this.object.data.scientific_name
;if(this.object.data.name)return this.object.data.name}
return this.object.object_name}}return e}));