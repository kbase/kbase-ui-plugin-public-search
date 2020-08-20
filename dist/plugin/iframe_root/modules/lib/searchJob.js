define(["uuid"],(function(t){"use strict"
;const s=Symbol(),i=Symbol(),e=Symbol(),r=Symbol(),n=Symbol();return class{
constructor(){
this.id=new t(4).format(),this.promise=null,this.state=null,this.error=null}
started(){this.state=s}running(t){this.promise=t,this.state=i}cancel(){
this.state===i&&this.promise&&(console.warn("canceling search job "+this.id),
this.promise.cancel(),this.state=r)}error(t){this.error=t,this.state=n}
finished(){this.promise=null,this.state=e}isCanceled(){return this.state===r}}
}));