define(["jquery","kb_lib/html","./widget"],(function(t,a){"use strict"
;const n=a.tag,e=n("a"),i=n("div");t.KBWidget({name:"kbTabs",version:"1.0.0",
init:function(a){this._super(a),a||(a={})
;var n=this.$elem,s=this,d=t('<ul class="nav nav-'+(a.pills?"pills":"tabs")+'">'),o=t('<div class="tab-content">')
;return n.append(d,o),this.tabHistory=[],this.addTab=function(n){
if(d.find('a[data-id="'+n.name+'"]').length>0)return
;const r=t('<li class="'+(n.active?"active":"")+'">'),c=t(e({dataToggle:"tab",
dataId:n.name,dataKBTesthookTab:n.key},n.name))
;if(n.animate,r.append(c),d.append(r),n.removable||a.removable){
var l=t('<button type="button" class="close" style="margin-left: 6px; vertical-align: bottom; ">&times;</button>')
;c.append(l),l.click((function(){s.rmTab(n.name)}))}const h=t(i({
class:"tab-pane "+(n.active?"active":""),dataId:n.name,
dataKBTesthookTabpane:n.key}))
;return h.append(n.content||""),o.append(h),r.click((function(a){
a.preventDefault(),a.stopPropagation();const n=t(this).find("a").data("id")
;s.showTab(n)})),n.content},this.rmTab=function(t){
const a=d.find('a[data-id="'+t+'"]').parent("li"),n=o.children('[data-id="'+t+'"]')
;let e
;this.tabHistory.pop(),e=this.tabHistory.length?this.tabHistory[this.tabHistory.length-1]:a.next().length>0?a.next().children("a").data("id"):a.prev().children("a").data("id"),
a.remove(),n.remove(),s.showTab(e)},this.tab=function(t){
return d.children('[data-id="'+t+'"]')},this.tabContent=function(t){
return o.children('[data-id="'+t+'"]')},this.addContent=function(t){
var a=o.children('[data-id="'+t.name+'"]');return a.append(t.content||""),a
},this.setContent=function(t){var a=o.children('[data-id="'+t.name+'"]')
;return a.empty(),a.append(t.content||""),a},this.showTab=t=>{
this.tabHistory.push(t),
d.children("li").removeClass("active"),o.children(".tab-pane").removeClass("active"),
d.find('a[data-id="'+t+'"]').parent().addClass("active"),
o.children('[data-id="'+t+'"]').addClass("active")},this.getTabNav=function(){
return d},a.tabs&&a.tabs.forEach(function(a){this.addTab(t.extend(a,{animate:!1
}))}.bind(this)),this}})}));