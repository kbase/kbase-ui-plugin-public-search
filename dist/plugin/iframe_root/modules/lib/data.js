define(["yaml!../data/stopWords.yaml"],(function(n){"use strict";return{
isStopWord:function(r){return n.warn.indexOf(r)>=0||n.ignore.indexOf(r)>=0}}}));