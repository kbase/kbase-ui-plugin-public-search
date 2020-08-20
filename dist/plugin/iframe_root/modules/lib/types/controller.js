define(["./assembly","./fbaModel","./genome","./media","./narrative","./pairedEndLibrary","./pangenome","./rnaSeqSampleSet","./singleEndLibrary","./tree","./default"],(function(e,a,n,r,t,i,s,d,m,o,l){
"use strict";const b={assembly:e,fbamodel:a,genome:n,media:r,narrative:t,
pairedendlibrary:i,pangenome:s,rnaseqsampleset:d,singleendlibrary:m,tree:o}
;return{makeSearchObject:function(e){return new(b[e.type.toLowerCase()]||l)({
object:e})}}}));