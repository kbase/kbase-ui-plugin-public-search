define(["./base"],(function(t){"use strict";class e extends t.BaseObject{
constructor(t){super(t)}getTitle(){
return this.object.data.name||this.object.object_name}getDetail(){return{
contigCount:this.object.data.contigs,dnaSize:this.object.data.dna_size,
gcContent:this.object.data.gc_content}}}return e}));