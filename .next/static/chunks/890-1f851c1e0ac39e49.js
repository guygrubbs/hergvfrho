"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[890],{1749:function(t,e,n){n.d(e,{L:function(){return s}});var i=n(7682);let s=t=>(t*=2)<1?.5*(0,i.G2)(t):.5*(2-Math.pow(2,-10*(t-1)))},7682:function(t,e,n){n.d(e,{CG:function(){return o},G2:function(){return a},XL:function(){return u}});var i=n(7961),s=n(415),r=n(5129);let o=(0,i._)(.33,1.53,.69,.99),a=(0,r.M)(o),u=(0,s.o)(a)},7255:function(t,e,n){n.d(e,{Bn:function(){return o},X7:function(){return a},Z7:function(){return r}});var i=n(415),s=n(5129);let r=t=>1-Math.sin(Math.acos(t)),o=(0,s.M)(r),a=(0,i.o)(r)},7961:function(t,e,n){n.d(e,{_:function(){return r}});var i=n(1662);let s=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t;function r(t,e,n,r){if(t===e&&n===r)return i.Z;let o=e=>(function(t,e,n,i,r){let o,a;let u=0;do(o=s(a=e+(n-e)/2,i,r)-t)>0?n=a:e=a;while(Math.abs(o)>1e-7&&++u<12);return a})(e,0,1,t,n);return t=>0===t||1===t?t:s(o(t),e,r)}},6260:function(t,e,n){n.d(e,{Vv:function(){return r},YQ:function(){return s},mZ:function(){return o}});var i=n(7961);let s=(0,i._)(.42,0,1,1),r=(0,i._)(0,0,.58,1),o=(0,i._)(.42,0,.58,1)},415:function(t,e,n){n.d(e,{o:function(){return i}});let i=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2},5129:function(t,e,n){n.d(e,{M:function(){return i}});let i=t=>e=>1-t(1-e)},9849:function(t,e,n){n.d(e,{q:function(){return i}});let i=t=>Array.isArray(t)&&"number"==typeof t[0]},3338:function(t,e,n){n.d(e,{N:function(){return i}});let i=t=>Array.isArray(t)&&"number"!=typeof t[0]},7769:function(t,e,n){n.d(e,{R:function(){return d}});var i=n(5487),s=n(7961),r=n(1662),o=n(6260),a=n(7255),u=n(7682),l=n(1749),h=n(9849);let c={linear:r.Z,easeIn:o.YQ,easeInOut:o.mZ,easeOut:o.Vv,circIn:a.Z7,circInOut:a.X7,circOut:a.Bn,backIn:u.G2,backInOut:u.XL,backOut:u.CG,anticipate:l.L},d=t=>{if((0,h.q)(t)){(0,i.k)(4===t.length,"Cubic bezier arrays must contain four numerical values.");let[e,n,r,o]=t;return(0,s._)(e,n,r,o)}return"string"==typeof t?((0,i.k)(void 0!==c[t],`Invalid easing type '${t}'`),c[t]):t}},8456:function(t,e,n){n.d(e,{E:function(){return i}});function i(t,e,n,i={passive:!0}){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n)}},486:function(t,e,n){n.d(e,{a:function(){return r}});var i=n(8456),s=n(8148);function r(t,e,n,r){return(0,i.E)(t,e,(0,s.s)(n),r)}},8148:function(t,e,n){n.d(e,{Q:function(){return s},s:function(){return r}});var i=n(9403);function s(t,e="page"){return{point:{x:t[`${e}X`],y:t[`${e}Y`]}}}let r=t=>e=>(0,i.D)(e)&&t(e,s(e))},9403:function(t,e,n){n.d(e,{D:function(){return i}});let i=t=>"mouse"===t.pointerType?"number"!=typeof t.button||t.button<=0:!1!==t.isPrimary},9727:function(t,e,n){n.d(e,{Z:function(){return r}});var i=n(2081);let s=["read","resolveKeyframes","update","preRender","render","postRender"];function r(t,e){let n=!1,r=!0,o={delta:0,timestamp:0,isProcessing:!1},a=()=>n=!0,u=s.reduce((t,e)=>(t[e]=function(t){let e=new Set,n=new Set,i=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(e){r.has(e)&&(u.schedule(e),t()),e(o)}let u={schedule:(t,s=!1,o=!1)=>{let a=o&&i?e:n;return s&&r.add(t),a.has(t)||a.add(t),t},cancel:t=>{n.delete(t),r.delete(t)},process:t=>{if(o=t,i){s=!0;return}i=!0,[e,n]=[n,e],n.clear(),e.forEach(a),i=!1,s&&(s=!1,u.process(t))}};return u}(a),t),{}),{read:l,resolveKeyframes:h,update:c,preRender:d,render:m,postRender:p}=u,f=()=>{let s=i.c.useManualTiming?o.timestamp:performance.now();n=!1,o.delta=r?1e3/60:Math.max(Math.min(s-o.timestamp,40),1),o.timestamp=s,o.isProcessing=!0,l.process(o),h.process(o),c.process(o),d.process(o),m.process(o),p.process(o),o.isProcessing=!1,n&&e&&(r=!1,t(f))},v=()=>{n=!0,r=!0,o.isProcessing||t(f)};return{schedule:s.reduce((t,e)=>{let i=u[e];return t[e]=(t,e=!1,s=!1)=>(n||v(),i.schedule(t,e,s)),t},{}),cancel:t=>{for(let e=0;e<s.length;e++)u[s[e]].cancel(t)},state:o,steps:u}}},6166:function(t,e,n){n.d(e,{Pn:function(){return r},Wi:function(){return s},frameData:function(){return o},yL:function(){return a}});var i=n(1662);let{schedule:s,cancel:r,state:o,steps:a}=(0,n(9727).Z)("undefined"!=typeof requestAnimationFrame?requestAnimationFrame:i.Z,!0)},3582:function(t,e,n){n.d(e,{g:function(){return i}});let{schedule:i,cancel:s}=(0,n(9727).Z)(queueMicrotask,!1)},1117:function(t,e,n){let i;n.d(e,{X:function(){return a}});var s=n(2081),r=n(6166);function o(){i=void 0}let a={now:()=>(void 0===i&&a.set(r.frameData.isProcessing||s.c.useManualTiming?r.frameData.timestamp:performance.now()),i),set:t=>{i=t,queueMicrotask(o)}}},3574:function(t,e,n){n.d(e,{h:function(){return T}});var i=n(806),s=n(1662),r=n(5487),o=n(9924),a=n(7544),u=n(1804),l=n(486),h=n(3967),c=n(6645),d=n(4169),m=n(179);function p(t,e,n){return{min:void 0!==e?t.min+e:void 0,max:void 0!==n?t.max+n-(t.max-t.min):void 0}}function f(t,e){let n=e.min-t.min,i=e.max-t.max;return e.max-e.min<t.max-t.min&&([n,i]=[i,n]),{min:n,max:i}}function v(t,e,n){return{min:g(t,e),max:g(t,n)}}function g(t,e){return"number"==typeof t?t:t[e]||0}var P=n(1512),E=n(1730),x=n(6460),y=n(8148),w=n(6117),A=n(8456),M=n(6190),L=n(735),b=n(1759),S=n(607),D=n(6166);let k=new WeakMap;class C{constructor(t){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=(0,P.dO)(),this.visualElement=t}start(t,{snapToCursor:e=!1}={}){let{presenceContext:n}=this.visualElement;if(n&&!1===n.isPresent)return;let{dragSnapToOrigin:i}=this.getProps();this.panSession=new o.H(t,{onSessionStart:t=>{let{dragSnapToOrigin:n}=this.getProps();n?this.pauseAnimation():this.stopAnimation(),e&&this.snapToCursor((0,y.Q)(t,"page").point)},onStart:(t,e)=>{let{drag:n,dragPropagation:i,onDragStart:s}=this.getProps();if(n&&!i&&(this.openGlobalLock&&this.openGlobalLock(),this.openGlobalLock=(0,a.fJ)(n),!this.openGlobalLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),(0,E.U)(t=>{let e=this.getAxisMotionValue(t).get()||0;if(M.aQ.test(e)){let{projection:n}=this.visualElement;if(n&&n.layout){let i=n.layout.layoutBox[t];if(i){let t=(0,c.JO)(i);e=parseFloat(e)/100*t}}}this.originPoint[t]=e}),s&&D.Wi.postRender(()=>s(t,e)),(0,S.K)(this.visualElement,"transform");let{animationState:r}=this.visualElement;r&&r.setActive("whileDrag",!0)},onMove:(t,e)=>{let{dragPropagation:n,dragDirectionLock:i,onDirectionLock:s,onDrag:r}=this.getProps();if(!n&&!this.openGlobalLock)return;let{offset:o}=e;if(i&&null===this.currentDirection){this.currentDirection=function(t,e=10){let n=null;return Math.abs(t.y)>e?n="y":Math.abs(t.x)>e&&(n="x"),n}(o),null!==this.currentDirection&&s&&s(this.currentDirection);return}this.updateAxis("x",e.point,o),this.updateAxis("y",e.point,o),this.visualElement.render(),r&&r(t,e)},onSessionEnd:(t,e)=>this.stop(t,e),resumeAnimation:()=>(0,E.U)(t=>{var e;return"paused"===this.getAnimationState(t)&&(null===(e=this.getAxisMotionValue(t).animation)||void 0===e?void 0:e.play())})},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:i,contextWindow:(0,b.l)(this.visualElement)})}stop(t,e){let n=this.isDragging;if(this.cancel(),!n)return;let{velocity:i}=e;this.startAnimation(i);let{onDragEnd:s}=this.getProps();s&&D.Wi.postRender(()=>s(t,e))}cancel(){this.isDragging=!1;let{projection:t,animationState:e}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;let{dragPropagation:n}=this.getProps();!n&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),e&&e.setActive("whileDrag",!1)}updateAxis(t,e,n){let{drag:i}=this.getProps();if(!n||!W(t,i,this.currentDirection))return;let s=this.getAxisMotionValue(t),r=this.originPoint[t]+n[t];this.constraints&&this.constraints[t]&&(r=function(t,{min:e,max:n},i){return void 0!==e&&t<e?t=i?(0,m.t)(e,t,i.min):Math.max(t,e):void 0!==n&&t>n&&(t=i?(0,m.t)(n,t,i.max):Math.min(t,n)),t}(r,this.constraints[t],this.elastic[t])),s.set(r)}resolveConstraints(){var t;let{dragConstraints:e,dragElastic:n}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):null===(t=this.visualElement.projection)||void 0===t?void 0:t.layout,s=this.constraints;e&&(0,u.I)(e)?this.constraints||(this.constraints=this.resolveRefConstraints()):e&&i?this.constraints=function(t,{top:e,left:n,bottom:i,right:s}){return{x:p(t.x,n,s),y:p(t.y,e,i)}}(i.layoutBox,e):this.constraints=!1,this.elastic=function(t=.35){return!1===t?t=0:!0===t&&(t=.35),{x:v(t,"left","right"),y:v(t,"top","bottom")}}(n),s!==this.constraints&&i&&this.constraints&&!this.hasMutatedConstraints&&(0,E.U)(t=>{!1!==this.constraints&&this.getAxisMotionValue(t)&&(this.constraints[t]=function(t,e){let n={};return void 0!==e.min&&(n.min=e.min-t.min),void 0!==e.max&&(n.max=e.max-t.min),n}(i.layoutBox[t],this.constraints[t]))})}resolveRefConstraints(){var t;let{dragConstraints:e,onMeasureDragConstraints:n}=this.getProps();if(!e||!(0,u.I)(e))return!1;let i=e.current;(0,r.k)(null!==i,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");let{projection:s}=this.visualElement;if(!s||!s.layout)return!1;let o=(0,x.z)(i,s.root,this.visualElement.getTransformPagePoint()),a={x:f((t=s.layout.layoutBox).x,o.x),y:f(t.y,o.y)};if(n){let t=n((0,w.z2)(a));this.hasMutatedConstraints=!!t,t&&(a=(0,w.i8)(t))}return a}startAnimation(t){let{drag:e,dragMomentum:n,dragElastic:i,dragTransition:s,dragSnapToOrigin:r,onDragTransitionEnd:o}=this.getProps(),a=this.constraints||{};return Promise.all((0,E.U)(o=>{if(!W(o,e,this.currentDirection))return;let u=a&&a[o]||{};r&&(u={min:0,max:0});let l={type:"inertia",velocity:n?t[o]:0,bounceStiffness:i?200:1e6,bounceDamping:i?40:1e7,timeConstant:750,restDelta:1,restSpeed:10,...s,...u};return this.startAxisValueAnimation(o,l)})).then(o)}startAxisValueAnimation(t,e){let n=this.getAxisMotionValue(t);return(0,S.K)(this.visualElement,t),n.start((0,L.v)(t,n,0,e,this.visualElement,!1))}stopAnimation(){(0,E.U)(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){(0,E.U)(t=>{var e;return null===(e=this.getAxisMotionValue(t).animation)||void 0===e?void 0:e.pause()})}getAnimationState(t){var e;return null===(e=this.getAxisMotionValue(t).animation)||void 0===e?void 0:e.state}getAxisMotionValue(t){let e=`_drag${t.toUpperCase()}`,n=this.visualElement.getProps();return n[e]||this.visualElement.getValue(t,(n.initial?n.initial[t]:void 0)||0)}snapToCursor(t){(0,E.U)(e=>{let{drag:n}=this.getProps();if(!W(e,n,this.currentDirection))return;let{projection:i}=this.visualElement,s=this.getAxisMotionValue(e);if(i&&i.layout){let{min:n,max:r}=i.layout.layoutBox[e];s.set(t[e]-(0,m.t)(n,r,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:t,dragConstraints:e}=this.getProps(),{projection:n}=this.visualElement;if(!(0,u.I)(e)||!n||!this.constraints)return;this.stopAnimation();let i={x:0,y:0};(0,E.U)(t=>{let e=this.getAxisMotionValue(t);if(e&&!1!==this.constraints){let n=e.get();i[t]=function(t,e){let n=.5,i=(0,c.JO)(t),s=(0,c.JO)(e);return s>i?n=(0,h.Y)(e.min,e.max-i,t.min):i>s&&(n=(0,h.Y)(t.min,t.max-s,e.min)),(0,d.u)(0,1,n)}({min:n,max:n},this.constraints[t])}});let{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",n.root&&n.root.updateScroll(),n.updateLayout(),this.resolveConstraints(),(0,E.U)(e=>{if(!W(e,t,null))return;let n=this.getAxisMotionValue(e),{min:s,max:r}=this.constraints[e];n.set((0,m.t)(s,r,i[e]))})}addListeners(){if(!this.visualElement.current)return;k.set(this.visualElement,this);let t=this.visualElement.current,e=(0,l.a)(t,"pointerdown",t=>{let{drag:e,dragListener:n=!0}=this.getProps();e&&n&&this.start(t)}),n=()=>{let{dragConstraints:t}=this.getProps();(0,u.I)(t)&&t.current&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,s=i.addEventListener("measure",n);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),D.Wi.read(n);let r=(0,A.E)(window,"resize",()=>this.scalePositionWithinConstraints()),o=i.addEventListener("didUpdate",({delta:t,hasLayoutChanged:e})=>{this.isDragging&&e&&((0,E.U)(e=>{let n=this.getAxisMotionValue(e);n&&(this.originPoint[e]+=t[e].translate,n.set(n.get()+t[e].translate))}),this.visualElement.render())});return()=>{r(),e(),s(),o&&o()}}getProps(){let t=this.visualElement.getProps(),{drag:e=!1,dragDirectionLock:n=!1,dragPropagation:i=!1,dragConstraints:s=!1,dragElastic:r=.35,dragMomentum:o=!0}=t;return{...t,drag:e,dragDirectionLock:n,dragPropagation:i,dragConstraints:s,dragElastic:r,dragMomentum:o}}}function W(t,e,n){return(!0===e||e===t)&&(null===n||n===t)}class T extends i.L{constructor(t){super(t),this.removeGroupControls=s.Z,this.removeListeners=s.Z,this.controls=new C(t)}mount(){let{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||s.Z}unmount(){this.removeGroupControls(),this.removeListeners()}}},7544:function(t,e,n){function i(t){let e=null;return()=>null===e&&(e=t,()=>{e=null})}n.d(e,{fJ:function(){return o},gD:function(){return a}});let s=i("dragHorizontal"),r=i("dragVertical");function o(t){let e=!1;if("y"===t)e=r();else if("x"===t)e=s();else{let t=s(),n=r();t&&n?e=()=>{t(),n()}:(t&&t(),n&&n())}return e}function a(){let t=o(!0);return!t||(t(),!1)}},1029:function(t,e,n){n.d(e,{f:function(){return o}});var i=n(8456),s=n(806),r=n(3624);class o extends s.L{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch(e){t=!0}t&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=(0,r.z)((0,i.E)(this.node.current,"focus",()=>this.onFocus()),(0,i.E)(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}},7850:function(t,e,n){n.d(e,{a:function(){return l}});var i=n(486),s=n(3624),r=n(7544),o=n(806),a=n(6166);function u(t,e){let n=e?"onHoverStart":"onHoverEnd";return(0,i.a)(t.current,e?"pointerenter":"pointerleave",(i,s)=>{if("touch"===i.pointerType||(0,r.gD)())return;let o=t.getProps();t.animationState&&o.whileHover&&t.animationState.setActive("whileHover",e);let u=o[n];u&&a.Wi.postRender(()=>u(i,s))},{passive:!t.getProps()[n]})}class l extends o.L{mount(){this.unmount=(0,s.z)(u(this.node,!0),u(this.node,!1))}unmount(){}}},9924:function(t,e,n){n.d(e,{H:function(){return h}});var i=n(8148),s=n(6917),r=n(486),o=n(3624),a=n(8178),u=n(9403),l=n(6166);class h{constructor(t,e,{transformPagePoint:n,contextWindow:s,dragSnapToOrigin:h=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let t=m(this.lastMoveEventInfo,this.history),e=null!==this.startEvent,n=(0,a.y)(t.offset,{x:0,y:0})>=3;if(!e&&!n)return;let{point:i}=t,{timestamp:s}=l.frameData;this.history.push({...i,timestamp:s});let{onStart:r,onMove:o}=this.handlers;e||(r&&r(this.lastMoveEvent,t),this.startEvent=this.lastMoveEvent),o&&o(this.lastMoveEvent,t)},this.handlePointerMove=(t,e)=>{this.lastMoveEvent=t,this.lastMoveEventInfo=c(e,this.transformPagePoint),l.Wi.update(this.updatePoint,!0)},this.handlePointerUp=(t,e)=>{this.end();let{onEnd:n,onSessionEnd:i,resumeAnimation:s}=this.handlers;if(this.dragSnapToOrigin&&s&&s(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let r=m("pointercancel"===t.type?this.lastMoveEventInfo:c(e,this.transformPagePoint),this.history);this.startEvent&&n&&n(t,r),i&&i(t,r)},!(0,u.D)(t))return;this.dragSnapToOrigin=h,this.handlers=e,this.transformPagePoint=n,this.contextWindow=s||window;let d=c((0,i.Q)(t),this.transformPagePoint),{point:p}=d,{timestamp:f}=l.frameData;this.history=[{...p,timestamp:f}];let{onSessionStart:v}=e;v&&v(t,m(d,this.history)),this.removeListeners=(0,o.z)((0,r.a)(this.contextWindow,"pointermove",this.handlePointerMove),(0,r.a)(this.contextWindow,"pointerup",this.handlePointerUp),(0,r.a)(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),(0,l.Pn)(this.updatePoint)}}function c(t,e){return e?{point:e(t.point)}:t}function d(t,e){return{x:t.x-e.x,y:t.y-e.y}}function m({point:t},e){return{point:t,delta:d(t,p(e)),offset:d(t,e[0]),velocity:function(t,e){if(t.length<2)return{x:0,y:0};let n=t.length-1,i=null,r=p(t);for(;n>=0&&(i=t[n],!(r.timestamp-i.timestamp>(0,s.w)(.1)));)n--;if(!i)return{x:0,y:0};let o=(0,s.X)(r.timestamp-i.timestamp);if(0===o)return{x:0,y:0};let a={x:(r.x-i.x)/o,y:(r.y-i.y)/o};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}(e,0)}}function p(t){return t[t.length-1]}},6762:function(t,e,n){n.d(e,{q:function(){return h}});var i=n(9924),s=n(486),r=n(806),o=n(1662),a=n(1759),u=n(6166);let l=t=>(e,n)=>{t&&u.Wi.postRender(()=>t(e,n))};class h extends r.L{constructor(){super(...arguments),this.removePointerDownListener=o.Z}onPointerDown(t){this.session=new i.H(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:(0,a.l)(this.node)})}createPanHandlers(){let{onPanSessionStart:t,onPanStart:e,onPan:n,onPanEnd:i}=this.node.getProps();return{onSessionStart:l(t),onStart:l(e),onMove:n,onEnd:(t,e)=>{delete this.session,i&&u.Wi.postRender(()=>i(t,e))}}}mount(){this.removePointerDownListener=(0,s.a)(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}},4684:function(t,e,n){n.d(e,{Q:function(){return m}});var i=n(8148),s=n(8456),r=n(486),o=n(806),a=n(3624),u=n(7544);let l=(t,e)=>!!e&&(t===e||l(t,e.parentElement));var h=n(1662),c=n(6166);function d(t,e){if(!e)return;let n=new PointerEvent("pointer"+t);e(n,(0,i.Q)(n))}class m extends o.L{constructor(){super(...arguments),this.removeStartListeners=h.Z,this.removeEndListeners=h.Z,this.removeAccessibleListeners=h.Z,this.startPointerPress=(t,e)=>{if(this.isPressing)return;this.removeEndListeners();let n=this.node.getProps(),i=(0,r.a)(window,"pointerup",(t,e)=>{if(!this.checkPressEnd())return;let{onTap:n,onTapCancel:i,globalTapTarget:s}=this.node.getProps(),r=s||l(this.node.current,t.target)?n:i;r&&c.Wi.update(()=>r(t,e))},{passive:!(n.onTap||n.onPointerUp)}),s=(0,r.a)(window,"pointercancel",(t,e)=>this.cancelPress(t,e),{passive:!(n.onTapCancel||n.onPointerCancel)});this.removeEndListeners=(0,a.z)(i,s),this.startPress(t,e)},this.startAccessiblePress=()=>{let t=(0,s.E)(this.node.current,"keydown",t=>{"Enter"!==t.key||this.isPressing||(this.removeEndListeners(),this.removeEndListeners=(0,s.E)(this.node.current,"keyup",t=>{"Enter"===t.key&&this.checkPressEnd()&&d("up",(t,e)=>{let{onTap:n}=this.node.getProps();n&&c.Wi.postRender(()=>n(t,e))})}),d("down",(t,e)=>{this.startPress(t,e)}))}),e=(0,s.E)(this.node.current,"blur",()=>{this.isPressing&&d("cancel",(t,e)=>this.cancelPress(t,e))});this.removeAccessibleListeners=(0,a.z)(t,e)}}startPress(t,e){this.isPressing=!0;let{onTapStart:n,whileTap:i}=this.node.getProps();i&&this.node.animationState&&this.node.animationState.setActive("whileTap",!0),n&&c.Wi.postRender(()=>n(t,e))}checkPressEnd(){return this.removeEndListeners(),this.isPressing=!1,this.node.getProps().whileTap&&this.node.animationState&&this.node.animationState.setActive("whileTap",!1),!(0,u.gD)()}cancelPress(t,e){if(!this.checkPressEnd())return;let{onTapCancel:n}=this.node.getProps();n&&c.Wi.postRender(()=>n(t,e))}mount(){let t=this.node.getProps(),e=(0,r.a)(t.globalTapTarget?window:this.node.current,"pointerdown",this.startPointerPress,{passive:!(t.onTapStart||t.onPointerStart)}),n=(0,s.E)(this.node.current,"focus",this.startAccessiblePress);this.removeStartListeners=(0,a.z)(e,n)}unmount(){this.removeStartListeners(),this.removeEndListeners(),this.removeAccessibleListeners()}}}}]);