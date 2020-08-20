define(["./base"],(function(e){"use strict";class t extends e.BaseObject{
constructor(e){super(e)}getTitle(){
return this.object.data.sampleset_desc||this.object.object_name}getDetail(){
return{sampleCount:this.object.data.num_samples||"-",
description:this.object.data.sampleset_desc||"-",
source:this.object.data.source||"-"}}}return t}));