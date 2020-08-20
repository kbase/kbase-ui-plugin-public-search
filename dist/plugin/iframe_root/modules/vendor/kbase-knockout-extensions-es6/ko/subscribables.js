define(["knockout"],(function(n){"use strict"
;n.subscribable.fn.subscribeChanged=function(n,s){let c=this.peek()
;return this.subscribe((function(i){const t=c;c=i,n.call(s,i,t)}))
},n.subscribable.fn.syncWith=function(n,s,c){const i=this
;return i(n()),i.subscribe((function(s){n(s)}),s,c),n.subscribe((function(n){
i(n)}),s,c),i},n.subscribable.fn.syncFrom=function(n,s,c){const i=this
;return i(n()),n.subscribe((function(n){i(n)}),s,c),i
},n.subscribable.fn.syncTo=function(n,s,c){const i=this
;return n(i()),i.subscribe((function(s){n(s)}),s,c),i}}));