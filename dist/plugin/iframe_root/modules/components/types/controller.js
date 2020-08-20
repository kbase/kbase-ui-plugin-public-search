define(["./genome/genome","./taxon/taxon","./narrative/narrative","./default/default","./pangenome/pangenome","./tree/tree","./rnaSeqSampleSet/main"],(function(e,n,t,r,a,o,u){
"use strict";return{typeToComponent:function(n){switch(n.toLowerCase()){
case"genome":return e;case"rnaseqsampleset":return u;case"narrative":return t
;case"pangenome":return a;case"tree":return o;default:return r}}}}));