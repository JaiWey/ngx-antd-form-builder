import{Q as w,R as E,d as b,e as D,h as N,k as R}from"./chunk-FIXHLQK5.js";import{$a as g,Cb as v,Cc as F,Ha as c,Y as l,Za as y,_ as p,_b as S,bb as f,db as M,ea as u,eb as A,ja as h,na as m,vc as C}from"./chunk-JWLLVF4M.js";import"./chunk-CWTPBX7D.js";var B="@",_=(()=>{let e=class e{constructor(r,o,i,s,a){this.doc=r,this.delegate=o,this.zone=i,this.animationType=s,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=u(g,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-TR5XSBM2.js")).catch(o=>{throw new l(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:i})=>{this._engine=o(this.animationType,this.doc,this.scheduler);let s=new i(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(r,o){let i=this.delegate.createRenderer(r,o);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let s=new d(i);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let J=a.createRenderer(r,o);s.use(J)}).catch(a=>{s.use(i)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){y()},e.\u0275prov=p({token:e,factory:e.\u0275fac});let n=e;return n})(),d=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,o){this.delegate.insertBefore(e,t,r,o)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,o){this.delegate.setAttribute(e,t,r,o)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,o){this.delegate.setStyle(e,t,r,o)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(B)}};function P(n="animations"){return M("NgAsyncAnimations"),m([{provide:f,useFactory:(e,t,r)=>new _(e,t,r,n),deps:[C,b,A]},{provide:c,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var T=[{path:"",loadComponent:()=>import("./chunk-PHPEIST2.js").then(n=>n.FormBuilderComponent)},{path:"viewer",loadComponent:()=>import("./chunk-NK4BOTOW.js").then(n=>n.FormViewerComponent)}];function U(n){let e=n,t=Math.floor(Math.abs(n)),r=n.toString().replace(/^[^.]*\.?/,"").length;return t===1&&r===0?1:5}var I=["en",[["a","p"],["AM","PM"],void 0],[["AM","PM"],void 0,void 0],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],void 0,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],void 0,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",void 0,"{1} 'at' {0}",void 0],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",U];F(I);var x={providers:[R(T),E(w),P()]};var O=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=h({type:e,selectors:[["app-root"]],standalone:!0,features:[S],decls:1,vars:0,template:function(o,i){o&1&&v(0,"router-outlet")},dependencies:[N]});let n=e;return n})();D(O,x).catch(n=>console.error(n));