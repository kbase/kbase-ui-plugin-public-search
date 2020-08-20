define(["./base"],(function(t){"use strict";class e extends t.BaseObject{
constructor(t){super(t)}getTitle(){
return this.object.data.name||this.object.object_name}getDetail(){return{
id:this.object.data.id,name:this.object.data.name,
compartments:this.object.data.modelcompartments,
compounds:this.object.data.modelcompounds,
reactions:this.object.data.modelreactions,source:this.object.data.source,
type:this.object.data.type,scientificName:this.object.key_props.scientific_name,
lineage:this.object.key_props.taxonomy}}}return e}));