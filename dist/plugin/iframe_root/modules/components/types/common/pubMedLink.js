define(["kb_knockout/registry","kb_lib/html"],(function(t,e){"use strict"
;const n=(0,e.tag)("a");class i{constructor({text:t,id:e}){this.text=t,this.id=e
}}return t.registerComponent((function(){return{viewModel:i,template:n({
dataBind:{html:"text",attr:{href:'"https://www.ncbi.nlm.nih.gov/pubmed/" + id'}
},target:"_blank"})}}))}));