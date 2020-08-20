define(["./base"],(function(t){"use strict";class e extends t.BaseObject{
constructor(t){super(t)}getTitle(){return this.object.data.name}getDetail(){
return{name:this.object.data.name,genomeRefCount:this.object.data.genome_refs,
orthologCount:this.object.data.orthologs,type:this.object.data.type}}}return e
}));