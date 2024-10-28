"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[314],{806:function(t,e,n){n.d(e,{L:function(){return o}});class o{constructor(t){this.isMounted=!1,this.node=t}update(){}}},3093:function(t,e,n){n.d(e,{s:function(){return l}});var o=n(2445),i=n(4140),r=n(806);class a extends r.L{constructor(t){super(t),t.animationState||(t.animationState=(0,i.M)(t))}updateAnimationControlsSubscription(){let{animate:t}=this.node.getProps();(0,o.H)(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){let{animate:t}=this.node.getProps(),{animate:e}=this.node.prevProps||{};t!==e&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),null===(t=this.unmountControls)||void 0===t||t.call(this)}}let s=0;class u extends r.L{constructor(){super(...arguments),this.id=s++}update(){if(!this.node.presenceContext)return;let{isPresent:t,onExitComplete:e}=this.node.presenceContext,{isPresent:n}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===n)return;let o=this.node.animationState.setActive("exit",!t);e&&!t&&o.then(()=>e(this.id))}mount(){let{register:t}=this.node.presenceContext||{};t&&(this.unmount=t(this.id))}unmount(){}}let l={animation:{Feature:a},exit:{Feature:u}}},9442:function(t,e,n){n.d(e,{featureDefinitions:function(){return i}});let o={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},i={};for(let t in o)i[t]={isEnabled:e=>o[t].some(t=>!!e[t])}},6335:function(t,e,n){n.d(e,{o:function(){return s}});var o=n(3574),i=n(6762),r=n(2817),a=n(2724);let s={pan:{Feature:i.q},drag:{Feature:o.h,ProjectionNode:a.u,MeasureLayout:r.q}}},7744:function(t,e,n){n.d(e,{E:function(){return f}});var o=n(7850),i=n(1029),r=n(4684),a=n(806);let s=new WeakMap,u=new WeakMap,l=t=>{let e=s.get(t.target);e&&e(t)},d=t=>{t.forEach(l)},c={some:0,all:1};class p extends a.L{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();let{viewport:t={}}=this.node.getProps(),{root:e,margin:n,amount:o="some",once:i}=t,r={root:e?e.current:void 0,rootMargin:n,threshold:"number"==typeof o?o:c[o]};return function(t,e,n){let o=function({root:t,...e}){let n=t||document;u.has(n)||u.set(n,{});let o=u.get(n),i=JSON.stringify(e);return o[i]||(o[i]=new IntersectionObserver(d,{root:t,...e})),o[i]}(e);return s.set(t,n),o.observe(t),()=>{s.delete(t),o.unobserve(t)}}(this.node.current,r,t=>{let{isIntersecting:e}=t;if(this.isInView===e||(this.isInView=e,i&&!e&&this.hasEnteredView))return;e&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",e);let{onViewportEnter:n,onViewportLeave:o}=this.node.getProps(),r=e?n:o;r&&r(t)})}mount(){this.startObserver()}update(){if("undefined"==typeof IntersectionObserver)return;let{props:t,prevProps:e}=this.node;["amount","margin","root"].some(function({viewport:t={}},{viewport:e={}}={}){return n=>t[n]!==e[n]}(t,e))&&this.startObserver()}unmount(){}}let f={inView:{Feature:p},tap:{Feature:r.Q},focus:{Feature:i.f},hover:{Feature:o.a}}},237:function(t,e,n){n.d(e,{b:function(){return r}});var o=n(2724),i=n(2817);let r={layout:{ProjectionNode:o.u,MeasureLayout:i.q}}},2817:function(t,e,n){n.d(e,{q:function(){return m}});var o=n(5893),i=n(7294),r=n(5947),a=n(5364),s=n(1705),u=n(3083),l=n(3871),d=n(3138),c=n(4561),p=n(3582),f=n(5368);class h extends i.Component{componentDidMount(){let{visualElement:t,layoutGroup:e,switchLayoutGroup:n,layoutId:o}=this.props,{projection:i}=t;(0,c.B)(v),i&&(e.group&&e.group.add(i),n&&n.register&&o&&n.register(i),i.root.didUpdate(),i.addEventListener("animationComplete",()=>{this.safeToRemove()}),i.setOptions({...i.options,onExitComplete:()=>this.safeToRemove()})),u.V.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){let{layoutDependency:e,visualElement:n,drag:o,isPresent:i}=this.props,r=n.projection;return r&&(r.isPresent=i,o||t.layoutDependency!==e||void 0===e?r.willUpdate():this.safeToRemove(),t.isPresent===i||(i?r.promote():r.relegate()||f.Wi.postRender(()=>{let t=r.getStack();t&&t.members.length||this.safeToRemove()}))),null}componentDidUpdate(){let{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),p.g.postRender(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:t,layoutGroup:e,switchLayoutGroup:n}=this.props,{projection:o}=t;o&&(o.scheduleCheckAfterUnmount(),e&&e.group&&e.group.remove(o),n&&n.deregister&&n.deregister(o))}safeToRemove(){let{safeToRemove:t}=this.props;t&&t()}render(){return null}}function m(t){let[e,n]=(0,r.oO)(),u=(0,i.useContext)(a.p);return(0,o.jsx)(h,{...t,layoutGroup:u,switchLayoutGroup:(0,i.useContext)(s.g),isPresent:e,safeToRemove:n})}let v={borderRadius:{...l.J,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:l.J,borderTopRightRadius:l.J,borderBottomLeftRadius:l.J,borderBottomRightRadius:l.J,boxShadow:d.M}},2096:function(t,e,n){n.d(e,{B:function(){return b}});var o=n(5893),i=n(7294),r=n(6014),a=n(4451),s=n(240),u=n(8868),l=n(398),d=n(8588),c=n(3582),p=n(1804),f=n(1705),h=n(619),m=n(9442),v=n(1741),w=n(5364);let g=Symbol.for("motionComponentSymbol");function b({preloadedFeatures:t,createVisualElement:e,useRender:n,useVisualState:b,Component:y}){t&&function(t){for(let e in t)m.featureDefinitions[e]={...m.featureDefinitions[e],...t[e]}}(t);let C=(0,i.forwardRef)(function(t,g){var C;let x;let S={...(0,i.useContext)(r._),...t,layoutId:function({layoutId:t}){let e=(0,i.useContext)(w.p).id;return e&&void 0!==t?e+"-"+t:t}(t)},{isStatic:E}=S,R=(0,h.H)(t),L=b(t,E);if(!E&&v.j){(0,i.useContext)(l.u).strict;let t=function(t){let{drag:e,layout:n}=m.featureDefinitions;if(!e&&!n)return{};let o={...e,...n};return{MeasureLayout:(null==e?void 0:e.isEnabled(t))||(null==n?void 0:n.isEnabled(t))?o.MeasureLayout:void 0,ProjectionNode:o.ProjectionNode}}(S);x=t.MeasureLayout,R.visualElement=function(t,e,n,o,h){var m,v;let{visualElement:w}=(0,i.useContext)(a.v),g=(0,i.useContext)(l.u),b=(0,i.useContext)(s.O),y=(0,i.useContext)(r._).reducedMotion,C=(0,i.useRef)();o=o||g.renderer,!C.current&&o&&(C.current=o(t,{visualState:e,parent:w,props:n,presenceContext:b,blockInitialAnimation:!!b&&!1===b.initial,reducedMotionConfig:y}));let x=C.current,S=(0,i.useContext)(f.g);x&&!x.projection&&h&&("html"===x.type||"svg"===x.type)&&function(t,e,n,o){let{layoutId:i,layout:r,drag:a,dragConstraints:s,layoutScroll:u,layoutRoot:l}=e;t.projection=new n(t.latestValues,e["data-framer-portal-id"]?void 0:function t(e){if(e)return!1!==e.options.allowProjection?e.projection:t(e.parent)}(t.parent)),t.projection.setOptions({layoutId:i,layout:r,alwaysMeasureLayout:!!a||s&&(0,p.I)(s),visualElement:t,animationType:"string"==typeof r?r:"both",initialPromotionConfig:o,layoutScroll:u,layoutRoot:l})}(C.current,n,h,S),(0,i.useInsertionEffect)(()=>{x&&x.update(n,b)});let E=n[d.M],R=(0,i.useRef)(!!E&&!(null===(m=window.MotionHandoffIsComplete)||void 0===m?void 0:m.call(window,E))&&(null===(v=window.MotionHasOptimisedAnimation)||void 0===v?void 0:v.call(window,E)));return(0,u.L)(()=>{x&&(window.MotionIsMounted=!0,x.updateFeatures(),c.g.render(x.render),R.current&&x.animationState&&x.animationState.animateChanges())}),(0,i.useEffect)(()=>{x&&(!R.current&&x.animationState&&x.animationState.animateChanges(),R.current&&(queueMicrotask(()=>{var t;null===(t=window.MotionHandoffMarkAsComplete)||void 0===t||t.call(window,E)}),R.current=!1))}),x}(y,L,S,e,t.ProjectionNode)}return(0,o.jsxs)(a.v.Provider,{value:R,children:[x&&R.visualElement?(0,o.jsx)(x,{visualElement:R.visualElement,...S}):null,n(y,t,(C=R.visualElement,(0,i.useCallback)(t=>{t&&L.mount&&L.mount(t),C&&(t?C.mount(t):C.unmount()),g&&("function"==typeof g?g(t):(0,p.I)(g)&&(g.current=t))},[C])),L,E,R.visualElement)]})});return C[g]=y,C}},6816:function(t,e,n){n.d(e,{j:function(){return r}});var o=n(4561),i=n(4714);function r(t,{layout:e,layoutId:n}){return i.G.has(t)||t.startsWith("origin")||(e||void 0!==n)&&(!!o.P[t]||"opacity"===t)}},5180:function(t,e,n){n.d(e,{t:function(){return c}});var o=n(7294),i=n(2445),r=n(240),a=n(9432),s=n(6681),u=n(6399),l=n(4451),d=n(7504);let c=t=>(e,n)=>{let c=(0,o.useContext)(l.v),p=(0,o.useContext)(r.O),f=()=>(function({scrapeMotionValuesFromProps:t,createRenderState:e,onMount:n},o,r,s){let l={latestValues:function(t,e,n,o){let r={},s=o(t,{});for(let t in s)r[t]=(0,u.b)(s[t]);let{initial:l,animate:c}=t,p=(0,d.G)(t),f=(0,d.M)(t);e&&f&&!p&&!1!==t.inherit&&(void 0===l&&(l=e.initial),void 0===c&&(c=e.animate));let h=!!n&&!1===n.initial,m=(h=h||!1===l)?c:l;if(m&&"boolean"!=typeof m&&!(0,i.H)(m)){let e=Array.isArray(m)?m:[m];for(let n=0;n<e.length;n++){let o=(0,a.o)(t,e[n]);if(o){let{transitionEnd:t,transition:e,...n}=o;for(let t in n){let e=n[t];if(Array.isArray(e)){let t=h?e.length-1:0;e=e[t]}null!==e&&(r[t]=e)}for(let e in t)r[e]=t[e]}}}return r}(o,r,s,t),renderState:e()};return n&&(l.mount=t=>n(o,t,l)),l})(t,e,c,p);return n?f():(0,s.h)(f)}},9630:function(t,e,n){n.d(e,{Z:function(){return i}});let o=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function i(t){return t.startsWith("while")||t.startsWith("drag")&&"draggable"!==t||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||o.has(t)}}}]);