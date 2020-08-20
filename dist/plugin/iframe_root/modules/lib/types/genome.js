define(["./base"],(function(t){"use strict";class e extends t.BaseObject{
constructor(t){super(t)}getTitle(){
return this.object.data.scientific_name?this.object.data.scientific_name:this.object.data.name?this.object.data.name:void 0
}getDetail(){return{domain:this.object.data.domain,
scientificName:this.object.data.scientific_name,
contigCount:this.object.data.num_contigs,featureCount:this.object.data.features,
source:this.object.data.source,sourceId:this.object.data.source_id}}}return e
}));