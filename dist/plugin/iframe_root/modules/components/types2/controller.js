define(["./genome","./narrative","./default","./pangenome","./tree","./fbaModel","./rnaSeqSampleSet","./assembly","./pairedEndLibrary","./singleEndLibrary","./media"],(function(e,r,a,n,t,s,i,u,c,d,o){
"use strict";return{typeToComponent:function(l){switch(l.toLowerCase()){
case"assembly":return u;case"fbamodel":return s;case"genome":return e
;case"narrative":return r;case"singleendlibrary":return d
;case"pairedendlibrary":return c;case"rnaseqsampleset":return i;case"pangenome":
return n;case"tree":return t;case"media":return o;default:return a}}}}));