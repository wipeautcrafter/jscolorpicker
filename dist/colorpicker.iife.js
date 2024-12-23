var ColorPicker=function(){"use strict";var ln=Object.defineProperty;var cn=(z,N,H)=>N in z?ln(z,N,{enumerable:!0,configurable:!0,writable:!0,value:H}):z[N]=H;var L=(z,N,H)=>cn(z,typeof N!="symbol"?N+"":N,H);function z(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var N={exports:{}},H=typeof Reflect=="object"?Reflect:null,Ve=H&&typeof H.apply=="function"?H.apply:function(e,r,n){return Function.prototype.apply.call(e,r,n)},ye;H&&typeof H.ownKeys=="function"?ye=H.ownKeys:Object.getOwnPropertySymbols?ye=function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:ye=function(e){return Object.getOwnPropertyNames(e)};function kt(t){console&&console.warn&&console.warn(t)}var Xe=Number.isNaN||function(e){return e!==e};function m(){m.init.call(this)}N.exports=m,N.exports.once=Rt,m.EventEmitter=m,m.prototype._events=void 0,m.prototype._eventsCount=0,m.prototype._maxListeners=void 0;var Ue=10;function we(t){if(typeof t!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}Object.defineProperty(m,"defaultMaxListeners",{enumerable:!0,get:function(){return Ue},set:function(t){if(typeof t!="number"||t<0||Xe(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");Ue=t}}),m.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},m.prototype.setMaxListeners=function(e){if(typeof e!="number"||e<0||Xe(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this};function Ye(t){return t._maxListeners===void 0?m.defaultMaxListeners:t._maxListeners}m.prototype.getMaxListeners=function(){return Ye(this)},m.prototype.emit=function(e){for(var r=[],n=1;n<arguments.length;n++)r.push(arguments[n]);var i=e==="error",o=this._events;if(o!==void 0)i=i&&o.error===void 0;else if(!i)return!1;if(i){var s;if(r.length>0&&(s=r[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var l=o[e];if(l===void 0)return!1;if(typeof l=="function")Ve(l,this,r);else for(var u=l.length,c=Je(l,u),n=0;n<u;++n)Ve(c[n],this,r);return!0};function ze(t,e,r,n){var i,o,s;if(we(r),o=t._events,o===void 0?(o=t._events=Object.create(null),t._eventsCount=0):(o.newListener!==void 0&&(t.emit("newListener",e,r.listener?r.listener:r),o=t._events),s=o[e]),s===void 0)s=o[e]=r,++t._eventsCount;else if(typeof s=="function"?s=o[e]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),i=Ye(t),i>0&&s.length>i&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=t,a.type=e,a.count=s.length,kt(a)}return t}m.prototype.addListener=function(e,r){return ze(this,e,r,!1)},m.prototype.on=m.prototype.addListener,m.prototype.prependListener=function(e,r){return ze(this,e,r,!0)};function jt(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function Ke(t,e,r){var n={fired:!1,wrapFn:void 0,target:t,type:e,listener:r},i=jt.bind(n);return i.listener=r,n.wrapFn=i,i}m.prototype.once=function(e,r){return we(r),this.on(e,Ke(this,e,r)),this},m.prototype.prependOnceListener=function(e,r){return we(r),this.prependListener(e,Ke(this,e,r)),this},m.prototype.removeListener=function(e,r){var n,i,o,s,a;if(we(r),i=this._events,i===void 0)return this;if(n=i[e],n===void 0)return this;if(n===r||n.listener===r)--this._eventsCount===0?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||r));else if(typeof n!="function"){for(o=-1,s=n.length-1;s>=0;s--)if(n[s]===r||n[s].listener===r){a=n[s].listener,o=s;break}if(o<0)return this;o===0?n.shift():Mt(n,o),n.length===1&&(i[e]=n[0]),i.removeListener!==void 0&&this.emit("removeListener",e,a||r)}return this},m.prototype.off=m.prototype.removeListener,m.prototype.removeAllListeners=function(e){var r,n,i;if(n=this._events,n===void 0)return this;if(n.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):n[e]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete n[e]),this;if(arguments.length===0){var o=Object.keys(n),s;for(i=0;i<o.length;++i)s=o[i],s!=="removeListener"&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(r=n[e],typeof r=="function")this.removeListener(e,r);else if(r!==void 0)for(i=r.length-1;i>=0;i--)this.removeListener(e,r[i]);return this};function Ze(t,e,r){var n=t._events;if(n===void 0)return[];var i=n[e];return i===void 0?[]:typeof i=="function"?r?[i.listener||i]:[i]:r?Dt(i):Je(i,i.length)}m.prototype.listeners=function(e){return Ze(this,e,!0)},m.prototype.rawListeners=function(e){return Ze(this,e,!1)},m.listenerCount=function(t,e){return typeof t.listenerCount=="function"?t.listenerCount(e):Ge.call(t,e)},m.prototype.listenerCount=Ge;function Ge(t){var e=this._events;if(e!==void 0){var r=e[t];if(typeof r=="function")return 1;if(r!==void 0)return r.length}return 0}m.prototype.eventNames=function(){return this._eventsCount>0?ye(this._events):[]};function Je(t,e){for(var r=new Array(e),n=0;n<e;++n)r[n]=t[n];return r}function Mt(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}function Dt(t){for(var e=new Array(t.length),r=0;r<e.length;++r)e[r]=t[r].listener||t[r];return e}function Rt(t,e){return new Promise(function(r,n){function i(s){t.removeListener(e,o),n(s)}function o(){typeof t.removeListener=="function"&&t.removeListener("error",i),r([].slice.call(arguments))}Qe(t,e,o,{once:!0}),e!=="error"&&Tt(t,i,{once:!0})})}function Tt(t,e,r){typeof t.on=="function"&&Qe(t,"error",e,r)}function Qe(t,e,r,n){if(typeof t.on=="function")n.once?t.once(e,r):t.on(e,r);else if(typeof t.addEventListener=="function")t.addEventListener(e,function i(o){n.once&&t.removeEventListener(e,i),r(o)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t)}var et=N.exports;const Bt=z(et);var k="top",R="bottom",T="right",j="left",Se="auto",le=[k,R,T,j],re="start",ce="end",Nt="clippingParents",tt="viewport",ue="popper",Ht="reference",rt=le.reduce(function(t,e){return t.concat([e+"-"+re,e+"-"+ce])},[]),nt=[].concat(le,[Se]).reduce(function(t,e){return t.concat([e,e+"-"+re,e+"-"+ce])},[]),Wt="beforeRead",Ft="read",qt="afterRead",It="beforeMain",Vt="main",Xt="afterMain",Ut="beforeWrite",Yt="write",zt="afterWrite",Kt=[Wt,Ft,qt,It,Vt,Xt,Ut,Yt,zt];function q(t){return t?(t.nodeName||"").toLowerCase():null}function M(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function K(t){var e=M(t).Element;return t instanceof e||t instanceof Element}function B(t){var e=M(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Pe(t){if(typeof ShadowRoot>"u")return!1;var e=M(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Zt(t){var e=t.state;Object.keys(e.elements).forEach(function(r){var n=e.styles[r]||{},i=e.attributes[r]||{},o=e.elements[r];!B(o)||!q(o)||(Object.assign(o.style,n),Object.keys(i).forEach(function(s){var a=i[s];a===!1?o.removeAttribute(s):o.setAttribute(s,a===!0?"":a)}))})}function Gt(t){var e=t.state,r={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,r.popper),e.styles=r,e.elements.arrow&&Object.assign(e.elements.arrow.style,r.arrow),function(){Object.keys(e.elements).forEach(function(n){var i=e.elements[n],o=e.attributes[n]||{},s=Object.keys(e.styles.hasOwnProperty(n)?e.styles[n]:r[n]),a=s.reduce(function(l,u){return l[u]="",l},{});!B(i)||!q(i)||(Object.assign(i.style,a),Object.keys(o).forEach(function(l){i.removeAttribute(l)}))})}}const Jt={name:"applyStyles",enabled:!0,phase:"write",fn:Zt,effect:Gt,requires:["computeStyles"]};function I(t){return t.split("-")[0]}var Z=Math.max,be=Math.min,ne=Math.round;function ke(){var t=navigator.userAgentData;return t!=null&&t.brands&&Array.isArray(t.brands)?t.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function it(){return!/^((?!chrome|android).)*safari/i.test(ke())}function ie(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!1);var n=t.getBoundingClientRect(),i=1,o=1;e&&B(t)&&(i=t.offsetWidth>0&&ne(n.width)/t.offsetWidth||1,o=t.offsetHeight>0&&ne(n.height)/t.offsetHeight||1);var s=K(t)?M(t):window,a=s.visualViewport,l=!it()&&r,u=(n.left+(l&&a?a.offsetLeft:0))/i,c=(n.top+(l&&a?a.offsetTop:0))/o,d=n.width/i,g=n.height/o;return{width:d,height:g,top:c,right:u+d,bottom:c+g,left:u,x:u,y:c}}function je(t){var e=ie(t),r=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:n}}function ot(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&Pe(r)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function V(t){return M(t).getComputedStyle(t)}function Qt(t){return["table","td","th"].indexOf(q(t))>=0}function U(t){return((K(t)?t.ownerDocument:t.document)||window.document).documentElement}function xe(t){return q(t)==="html"?t:t.assignedSlot||t.parentNode||(Pe(t)?t.host:null)||U(t)}function st(t){return!B(t)||V(t).position==="fixed"?null:t.offsetParent}function er(t){var e=/firefox/i.test(ke()),r=/Trident/i.test(ke());if(r&&B(t)){var n=V(t);if(n.position==="fixed")return null}var i=xe(t);for(Pe(i)&&(i=i.host);B(i)&&["html","body"].indexOf(q(i))<0;){var o=V(i);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||e&&o.willChange==="filter"||e&&o.filter&&o.filter!=="none")return i;i=i.parentNode}return null}function fe(t){for(var e=M(t),r=st(t);r&&Qt(r)&&V(r).position==="static";)r=st(r);return r&&(q(r)==="html"||q(r)==="body"&&V(r).position==="static")?e:r||er(t)||e}function Me(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function pe(t,e,r){return Z(t,be(e,r))}function tr(t,e,r){var n=pe(t,e,r);return n>r?r:n}function at(){return{top:0,right:0,bottom:0,left:0}}function lt(t){return Object.assign({},at(),t)}function ct(t,e){return e.reduce(function(r,n){return r[n]=t,r},{})}var rr=function(e,r){return e=typeof e=="function"?e(Object.assign({},r.rects,{placement:r.placement})):e,lt(typeof e!="number"?e:ct(e,le))};function nr(t){var e,r=t.state,n=t.name,i=t.options,o=r.elements.arrow,s=r.modifiersData.popperOffsets,a=I(r.placement),l=Me(a),u=[j,T].indexOf(a)>=0,c=u?"height":"width";if(!(!o||!s)){var d=rr(i.padding,r),g=je(o),f=l==="y"?k:j,x=l==="y"?R:T,v=r.rects.reference[c]+r.rects.reference[l]-s[l]-r.rects.popper[c],h=s[l]-r.rects.reference[l],b=fe(o),_=b?l==="y"?b.clientHeight||0:b.clientWidth||0:0,C=v/2-h/2,p=d[f],y=_-g[c]-d[x],w=_/2-g[c]/2+C,O=pe(p,w,y),A=l;r.modifiersData[n]=(e={},e[A]=O,e.centerOffset=O-w,e)}}function ir(t){var e=t.state,r=t.options,n=r.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=e.elements.popper.querySelector(i),!i)||ot(e.elements.popper,i)&&(e.elements.arrow=i))}const or={name:"arrow",enabled:!0,phase:"main",fn:nr,effect:ir,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function oe(t){return t.split("-")[1]}var sr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ar(t,e){var r=t.x,n=t.y,i=e.devicePixelRatio||1;return{x:ne(r*i)/i||0,y:ne(n*i)/i||0}}function ut(t){var e,r=t.popper,n=t.popperRect,i=t.placement,o=t.variation,s=t.offsets,a=t.position,l=t.gpuAcceleration,u=t.adaptive,c=t.roundOffsets,d=t.isFixed,g=s.x,f=g===void 0?0:g,x=s.y,v=x===void 0?0:x,h=typeof c=="function"?c({x:f,y:v}):{x:f,y:v};f=h.x,v=h.y;var b=s.hasOwnProperty("x"),_=s.hasOwnProperty("y"),C=j,p=k,y=window;if(u){var w=fe(r),O="clientHeight",A="clientWidth";if(w===M(r)&&(w=U(r),V(w).position!=="static"&&a==="absolute"&&(O="scrollHeight",A="scrollWidth")),w=w,i===k||(i===j||i===T)&&o===ce){p=R;var E=d&&w===y&&y.visualViewport?y.visualViewport.height:w[O];v-=E-n.height,v*=l?1:-1}if(i===j||(i===k||i===R)&&o===ce){C=T;var $=d&&w===y&&y.visualViewport?y.visualViewport.width:w[A];f-=$-n.width,f*=l?1:-1}}var S=Object.assign({position:a},u&&sr),W=c===!0?ar({x:f,y:v},M(r)):{x:f,y:v};if(f=W.x,v=W.y,l){var P;return Object.assign({},S,(P={},P[p]=_?"0":"",P[C]=b?"0":"",P.transform=(y.devicePixelRatio||1)<=1?"translate("+f+"px, "+v+"px)":"translate3d("+f+"px, "+v+"px, 0)",P))}return Object.assign({},S,(e={},e[p]=_?v+"px":"",e[C]=b?f+"px":"",e.transform="",e))}function lr(t){var e=t.state,r=t.options,n=r.gpuAcceleration,i=n===void 0?!0:n,o=r.adaptive,s=o===void 0?!0:o,a=r.roundOffsets,l=a===void 0?!0:a,u={placement:I(e.placement),variation:oe(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:i,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,ut(Object.assign({},u,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s,roundOffsets:l})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,ut(Object.assign({},u,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const cr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:lr,data:{}};var Oe={passive:!0};function ur(t){var e=t.state,r=t.instance,n=t.options,i=n.scroll,o=i===void 0?!0:i,s=n.resize,a=s===void 0?!0:s,l=M(e.elements.popper),u=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&u.forEach(function(c){c.addEventListener("scroll",r.update,Oe)}),a&&l.addEventListener("resize",r.update,Oe),function(){o&&u.forEach(function(c){c.removeEventListener("scroll",r.update,Oe)}),a&&l.removeEventListener("resize",r.update,Oe)}}const fr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:ur,data:{}};var pr={left:"right",right:"left",bottom:"top",top:"bottom"};function _e(t){return t.replace(/left|right|bottom|top/g,function(e){return pr[e]})}var dr={start:"end",end:"start"};function ft(t){return t.replace(/start|end/g,function(e){return dr[e]})}function De(t){var e=M(t),r=e.pageXOffset,n=e.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Re(t){return ie(U(t)).left+De(t).scrollLeft}function hr(t,e){var r=M(t),n=U(t),i=r.visualViewport,o=n.clientWidth,s=n.clientHeight,a=0,l=0;if(i){o=i.width,s=i.height;var u=it();(u||!u&&e==="fixed")&&(a=i.offsetLeft,l=i.offsetTop)}return{width:o,height:s,x:a+Re(t),y:l}}function vr(t){var e,r=U(t),n=De(t),i=(e=t.ownerDocument)==null?void 0:e.body,o=Z(r.scrollWidth,r.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),s=Z(r.scrollHeight,r.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Re(t),l=-n.scrollTop;return V(i||r).direction==="rtl"&&(a+=Z(r.clientWidth,i?i.clientWidth:0)-o),{width:o,height:s,x:a,y:l}}function Te(t){var e=V(t),r=e.overflow,n=e.overflowX,i=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+i+n)}function pt(t){return["html","body","#document"].indexOf(q(t))>=0?t.ownerDocument.body:B(t)&&Te(t)?t:pt(xe(t))}function de(t,e){var r;e===void 0&&(e=[]);var n=pt(t),i=n===((r=t.ownerDocument)==null?void 0:r.body),o=M(n),s=i?[o].concat(o.visualViewport||[],Te(n)?n:[]):n,a=e.concat(s);return i?a:a.concat(de(xe(s)))}function Be(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function gr(t,e){var r=ie(t,!1,e==="fixed");return r.top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r}function dt(t,e,r){return e===tt?Be(hr(t,r)):K(e)?gr(e,r):Be(vr(U(t)))}function mr(t){var e=de(xe(t)),r=["absolute","fixed"].indexOf(V(t).position)>=0,n=r&&B(t)?fe(t):t;return K(n)?e.filter(function(i){return K(i)&&ot(i,n)&&q(i)!=="body"}):[]}function yr(t,e,r,n){var i=e==="clippingParents"?mr(t):[].concat(e),o=[].concat(i,[r]),s=o[0],a=o.reduce(function(l,u){var c=dt(t,u,n);return l.top=Z(c.top,l.top),l.right=be(c.right,l.right),l.bottom=be(c.bottom,l.bottom),l.left=Z(c.left,l.left),l},dt(t,s,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function ht(t){var e=t.reference,r=t.element,n=t.placement,i=n?I(n):null,o=n?oe(n):null,s=e.x+e.width/2-r.width/2,a=e.y+e.height/2-r.height/2,l;switch(i){case k:l={x:s,y:e.y-r.height};break;case R:l={x:s,y:e.y+e.height};break;case T:l={x:e.x+e.width,y:a};break;case j:l={x:e.x-r.width,y:a};break;default:l={x:e.x,y:e.y}}var u=i?Me(i):null;if(u!=null){var c=u==="y"?"height":"width";switch(o){case re:l[u]=l[u]-(e[c]/2-r[c]/2);break;case ce:l[u]=l[u]+(e[c]/2-r[c]/2);break}}return l}function he(t,e){e===void 0&&(e={});var r=e,n=r.placement,i=n===void 0?t.placement:n,o=r.strategy,s=o===void 0?t.strategy:o,a=r.boundary,l=a===void 0?Nt:a,u=r.rootBoundary,c=u===void 0?tt:u,d=r.elementContext,g=d===void 0?ue:d,f=r.altBoundary,x=f===void 0?!1:f,v=r.padding,h=v===void 0?0:v,b=lt(typeof h!="number"?h:ct(h,le)),_=g===ue?Ht:ue,C=t.rects.popper,p=t.elements[x?_:g],y=yr(K(p)?p:p.contextElement||U(t.elements.popper),l,c,s),w=ie(t.elements.reference),O=ht({reference:w,element:C,strategy:"absolute",placement:i}),A=Be(Object.assign({},C,O)),E=g===ue?A:w,$={top:y.top-E.top+b.top,bottom:E.bottom-y.bottom+b.bottom,left:y.left-E.left+b.left,right:E.right-y.right+b.right},S=t.modifiersData.offset;if(g===ue&&S){var W=S[i];Object.keys($).forEach(function(P){var G=[T,R].indexOf(P)>=0?1:-1,J=[k,R].indexOf(P)>=0?"y":"x";$[P]+=W[J]*G})}return $}function wr(t,e){e===void 0&&(e={});var r=e,n=r.placement,i=r.boundary,o=r.rootBoundary,s=r.padding,a=r.flipVariations,l=r.allowedAutoPlacements,u=l===void 0?nt:l,c=oe(n),d=c?a?rt:rt.filter(function(x){return oe(x)===c}):le,g=d.filter(function(x){return u.indexOf(x)>=0});g.length===0&&(g=d);var f=g.reduce(function(x,v){return x[v]=he(t,{placement:v,boundary:i,rootBoundary:o,padding:s})[I(v)],x},{});return Object.keys(f).sort(function(x,v){return f[x]-f[v]})}function br(t){if(I(t)===Se)return[];var e=_e(t);return[ft(t),e,ft(e)]}function xr(t){var e=t.state,r=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var i=r.mainAxis,o=i===void 0?!0:i,s=r.altAxis,a=s===void 0?!0:s,l=r.fallbackPlacements,u=r.padding,c=r.boundary,d=r.rootBoundary,g=r.altBoundary,f=r.flipVariations,x=f===void 0?!0:f,v=r.allowedAutoPlacements,h=e.options.placement,b=I(h),_=b===h,C=l||(_||!x?[_e(h)]:br(h)),p=[h].concat(C).reduce(function(ae,Y){return ae.concat(I(Y)===Se?wr(e,{placement:Y,boundary:c,rootBoundary:d,padding:u,flipVariations:x,allowedAutoPlacements:v}):Y)},[]),y=e.rects.reference,w=e.rects.popper,O=new Map,A=!0,E=p[0],$=0;$<p.length;$++){var S=p[$],W=I(S),P=oe(S)===re,G=[k,R].indexOf(W)>=0,J=G?"width":"height",D=he(e,{placement:S,boundary:c,rootBoundary:d,altBoundary:g,padding:u}),F=G?P?T:j:P?R:k;y[J]>w[J]&&(F=_e(F));var Ce=_e(F),Q=[];if(o&&Q.push(D[W]<=0),a&&Q.push(D[F]<=0,D[Ce]<=0),Q.every(function(ae){return ae})){E=S,A=!1;break}O.set(S,Q)}if(A)for(var Le=x?3:1,We=function(Y){var me=p.find(function(Ee){var ee=O.get(Ee);if(ee)return ee.slice(0,Y).every(function(Fe){return Fe})});if(me)return E=me,"break"},ge=Le;ge>0;ge--){var $e=We(ge);if($e==="break")break}e.placement!==E&&(e.modifiersData[n]._skip=!0,e.placement=E,e.reset=!0)}}const Or={name:"flip",enabled:!0,phase:"main",fn:xr,requiresIfExists:["offset"],data:{_skip:!1}};function vt(t,e,r){return r===void 0&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function gt(t){return[k,T,R,j].some(function(e){return t[e]>=0})}function _r(t){var e=t.state,r=t.name,n=e.rects.reference,i=e.rects.popper,o=e.modifiersData.preventOverflow,s=he(e,{elementContext:"reference"}),a=he(e,{altBoundary:!0}),l=vt(s,n),u=vt(a,i,o),c=gt(l),d=gt(u);e.modifiersData[r]={referenceClippingOffsets:l,popperEscapeOffsets:u,isReferenceHidden:c,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":d})}const Cr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:_r};function Lr(t,e,r){var n=I(t),i=[j,k].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},e,{placement:t})):r,s=o[0],a=o[1];return s=s||0,a=(a||0)*i,[j,T].indexOf(n)>=0?{x:a,y:s}:{x:s,y:a}}function $r(t){var e=t.state,r=t.options,n=t.name,i=r.offset,o=i===void 0?[0,0]:i,s=nt.reduce(function(c,d){return c[d]=Lr(d,e.rects,o),c},{}),a=s[e.placement],l=a.x,u=a.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=u),e.modifiersData[n]=s}const Er={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:$r};function Ar(t){var e=t.state,r=t.name;e.modifiersData[r]=ht({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}const Sr={name:"popperOffsets",enabled:!0,phase:"read",fn:Ar,data:{}};function Pr(t){return t==="x"?"y":"x"}function kr(t){var e=t.state,r=t.options,n=t.name,i=r.mainAxis,o=i===void 0?!0:i,s=r.altAxis,a=s===void 0?!1:s,l=r.boundary,u=r.rootBoundary,c=r.altBoundary,d=r.padding,g=r.tether,f=g===void 0?!0:g,x=r.tetherOffset,v=x===void 0?0:x,h=he(e,{boundary:l,rootBoundary:u,padding:d,altBoundary:c}),b=I(e.placement),_=oe(e.placement),C=!_,p=Me(b),y=Pr(p),w=e.modifiersData.popperOffsets,O=e.rects.reference,A=e.rects.popper,E=typeof v=="function"?v(Object.assign({},e.rects,{placement:e.placement})):v,$=typeof E=="number"?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),S=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,W={x:0,y:0};if(w){if(o){var P,G=p==="y"?k:j,J=p==="y"?R:T,D=p==="y"?"height":"width",F=w[p],Ce=F+h[G],Q=F-h[J],Le=f?-A[D]/2:0,We=_===re?O[D]:A[D],ge=_===re?-A[D]:-O[D],$e=e.elements.arrow,ae=f&&$e?je($e):{width:0,height:0},Y=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:at(),me=Y[G],Ee=Y[J],ee=pe(0,O[D],ae[D]),Fe=C?O[D]/2-Le-ee-me-$.mainAxis:We-ee-me-$.mainAxis,tn=C?-O[D]/2+Le+ee+Ee+$.mainAxis:ge+ee+Ee+$.mainAxis,qe=e.elements.arrow&&fe(e.elements.arrow),rn=qe?p==="y"?qe.clientTop||0:qe.clientLeft||0:0,Ot=(P=S==null?void 0:S[p])!=null?P:0,nn=F+Fe-Ot-rn,on=F+tn-Ot,_t=pe(f?be(Ce,nn):Ce,F,f?Z(Q,on):Q);w[p]=_t,W[p]=_t-F}if(a){var Ct,sn=p==="x"?k:j,an=p==="x"?R:T,te=w[y],Ae=y==="y"?"height":"width",Lt=te+h[sn],$t=te-h[an],Ie=[k,j].indexOf(b)!==-1,Et=(Ct=S==null?void 0:S[y])!=null?Ct:0,At=Ie?Lt:te-O[Ae]-A[Ae]-Et+$.altAxis,St=Ie?te+O[Ae]+A[Ae]-Et-$.altAxis:$t,Pt=f&&Ie?tr(At,te,St):pe(f?At:Lt,te,f?St:$t);w[y]=Pt,W[y]=Pt-te}e.modifiersData[n]=W}}const jr={name:"preventOverflow",enabled:!0,phase:"main",fn:kr,requiresIfExists:["offset"]};function Mr(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function Dr(t){return t===M(t)||!B(t)?De(t):Mr(t)}function Rr(t){var e=t.getBoundingClientRect(),r=ne(e.width)/t.offsetWidth||1,n=ne(e.height)/t.offsetHeight||1;return r!==1||n!==1}function Tr(t,e,r){r===void 0&&(r=!1);var n=B(e),i=B(e)&&Rr(e),o=U(e),s=ie(t,i,r),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!r)&&((q(e)!=="body"||Te(o))&&(a=Dr(e)),B(e)?(l=ie(e,!0),l.x+=e.clientLeft,l.y+=e.clientTop):o&&(l.x=Re(o))),{x:s.left+a.scrollLeft-l.x,y:s.top+a.scrollTop-l.y,width:s.width,height:s.height}}function Br(t){var e=new Map,r=new Set,n=[];t.forEach(function(o){e.set(o.name,o)});function i(o){r.add(o.name);var s=[].concat(o.requires||[],o.requiresIfExists||[]);s.forEach(function(a){if(!r.has(a)){var l=e.get(a);l&&i(l)}}),n.push(o)}return t.forEach(function(o){r.has(o.name)||i(o)}),n}function Nr(t){var e=Br(t);return Kt.reduce(function(r,n){return r.concat(e.filter(function(i){return i.phase===n}))},[])}function Hr(t){var e;return function(){return e||(e=new Promise(function(r){Promise.resolve().then(function(){e=void 0,r(t())})})),e}}function Wr(t){var e=t.reduce(function(r,n){var i=r[n.name];return r[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,r},{});return Object.keys(e).map(function(r){return e[r]})}var mt={placement:"bottom",modifiers:[],strategy:"absolute"};function yt(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Fr(t){t===void 0&&(t={});var e=t,r=e.defaultModifiers,n=r===void 0?[]:r,i=e.defaultOptions,o=i===void 0?mt:i;return function(a,l,u){u===void 0&&(u=o);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},mt,o),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},d=[],g=!1,f={state:c,setOptions:function(b){var _=typeof b=="function"?b(c.options):b;v(),c.options=Object.assign({},o,c.options,_),c.scrollParents={reference:K(a)?de(a):a.contextElement?de(a.contextElement):[],popper:de(l)};var C=Nr(Wr([].concat(n,c.options.modifiers)));return c.orderedModifiers=C.filter(function(p){return p.enabled}),x(),f.update()},forceUpdate:function(){if(!g){var b=c.elements,_=b.reference,C=b.popper;if(yt(_,C)){c.rects={reference:Tr(_,fe(C),c.options.strategy==="fixed"),popper:je(C)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function($){return c.modifiersData[$.name]=Object.assign({},$.data)});for(var p=0;p<c.orderedModifiers.length;p++){if(c.reset===!0){c.reset=!1,p=-1;continue}var y=c.orderedModifiers[p],w=y.fn,O=y.options,A=O===void 0?{}:O,E=y.name;typeof w=="function"&&(c=w({state:c,options:A,name:E,instance:f})||c)}}}},update:Hr(function(){return new Promise(function(h){f.forceUpdate(),h(c)})}),destroy:function(){v(),g=!0}};if(!yt(a,l))return f;f.setOptions(u).then(function(h){!g&&u.onFirstUpdate&&u.onFirstUpdate(h)});function x(){c.orderedModifiers.forEach(function(h){var b=h.name,_=h.options,C=_===void 0?{}:_,p=h.effect;if(typeof p=="function"){var y=p({state:c,name:b,instance:f,options:C}),w=function(){};d.push(y||w)}})}function v(){d.forEach(function(h){return h()}),d=[]}return f}}var qr=[fr,Sr,cr,Jt,Er,Or,jr,or,Cr],Ir=Fr({defaultModifiers:qr});const Vr=([t,e,r,n])=>{const i=Math.max(t,e,r),o=i-Math.min(t,e,r),s=o&&(i==t?(e-r)/o:i==e?2+(r-t)/o:4+(t-e)/o);return[60*(s<0?s+6:s),i&&o/i,i,n]},wt=t=>t.replace(/[^0-9%.,]/g,"").split(",").map(e=>parseFloat(e)/(e.endsWith("%")?100:1)),Xr=t=>{const e=document.createElement("span");e.style.display="none",e.style.color=t,document.body.append(e);const{color:r}=getComputedStyle(e);if(e.remove(),!r)return null;const[n,i,o,s]=wt(r);return Vr([n/255,i/255,o/255,s])},Ur=t=>{const e=wt(t).map((r,n)=>Math.min(r,n?1:255));return e.length<3||e.some(r=>isNaN(r))?null:e},bt=t=>{let e;/^hsva?\(/.test(t)?e="hsv":/^hsla?\(/.test(t)?e="hsl":/^rgba?\(/.test(t)?e="rgb":e="hex";const r=e==="hsv"?Ur(t):Xr(t);if(!r)throw new Error("Color could not be parsed!");return r[3]=r[3]??1,{color:r,format:e}},se=t=>t.toFixed(),Yr=(t,e)=>(""+ +t.toFixed(e)).replace(/^0\./g,"."),zr=([t,e,r,n])=>{const i=r-r*e/2,o=Math.min(i,1-i);return[t,o?(r-i)/o:0,i,n]},xt=([t,e,r,n])=>{const i=(o,s=(o+t/60)%6)=>r-r*e*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1),n]},Ne=([t,e,r,n],i)=>{const o=n<1?"a":"",s=i.startsWith("hs")?[se(t),se(e*100)+"%",se(r*100)+"%"]:[se(t*255),se(e*255),se(r*255)];return o&&s.push(Yr(n,2)),`${i}${o}(${s.join()})`},Kr=t=>"#"+t.slice(0,t[3]<1?4:3).map(e=>Math.round(e*255).toString(16).padStart(2,"0")).join(""),Zr=(t,e)=>e==="hsv"?Ne(t,e):e==="hsl"?Ne(zr(t),e):e==="rgb"?Ne(xt(t),e):Kr(xt(t));class X{constructor(e){L(this,"color");if(!e)this.color=[0,0,0,1];else if(e instanceof X)this.color=[...e.color];else if(Array.isArray(e)){const[r=0,n=0,i=0,o=1]=e;this.color=[r,n,i,o]}else this.color=bt(e).color}getSet(e,r){if(r===void 0)return this.color[e];const n=[...this.color];return n[e]=r,new X(n)}hue(e){return this.getSet(0,e)}saturation(e){return this.getSet(1,e)}value(e){return this.getSet(2,e)}alpha(e){return this.getSet(3,e)}string(e){return Zr(this.color,e)}toString(){return this.string("hex")}clone(){return new X(this)}}class He extends Bt{constructor(r){super();L(this,"$track");L(this,"$thumb");this.$track=r,this.$thumb=r.querySelector(".cp_thumb"),this.$track.addEventListener("pointerdown",n=>{this.$track.setPointerCapture(n.pointerId),this.handleDrag(n)}),this.$track.addEventListener("pointermove",n=>{this.$track.hasPointerCapture(n.pointerId)&&this.handleDrag(n)}),this.$track.addEventListener("pointerup",n=>{this.$track.releasePointerCapture(n.pointerId)})}handleDrag(r){const n=this.$track.getBoundingClientRect();let i=(r.clientX-n.x)/n.width;i<0&&(i=0),i>1&&(i=1);let o=(r.clientY-n.y)/n.height;o<0&&(o=0),o>1&&(o=1),this.emit("drag",i,o)}moveThumb(r,n){r!==void 0&&(this.$thumb.style.left=`${r*100}%`),n!==void 0&&(this.$thumb.style.top=`${n*100}%`)}}const Gr={toggleStyle:"button",defaultColor:null,swatches:null,enablePreview:!1,enableAlpha:!0,enableEyedropper:!0,formats:["hex","rgb","hsv","hsl"],defaultFormat:"hex",commitMode:"confirm",showSubmitButton:!0,showClearButton:!0,dismissOnOutsideClick:!0,dismissOnEscape:!0,dialogPlacement:"top",dialogOffset:8},Jr='<div class=cp_toggle><div class=cp_caret><svg height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><path d="M208.49 120.49a12 12 0 0 1-17 0L140 69v147a12 12 0 0 1-24 0V69l-51.51 51.49a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17"fill=currentColor /></svg></div></div>',Qr='<div class=cp_dialog><div class="cp_area cp_area-hsv"><div class=cp_inner></div><div class=cp_thumb></div></div><div class=cp_dialog-inner><div class=cp_preview><div class=cp_p-current></div><div class=cp_p-new></div></div><div class="cp_slider cp_slider-hue"><div class=cp_thumb></div></div><div class="cp_slider cp_slider-alpha"><div class=cp_inner></div><div class=cp_thumb></div></div><div class=cp_swatches></div><div class=cp_formats></div><div class=cp_input-group><button class="cp_action cp_eyedrop"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="m207.8 87.6l-25.37 25.53l4.89 4.88a16 16 0 0 1 0 22.64l-9 9a8 8 0 0 1-11.32 0l-60.68-60.7a8 8 0 0 1 0-11.32l9-9a16 16 0 0 1 22.63 0l4.88 4.89l25-25.11c10.79-10.79 28.37-11.45 39.45-1a28 28 0 0 1 .52 40.19"opacity=0.2 /><path d="M224 67.3a35.8 35.8 0 0 0-11.26-25.66c-14-13.28-36.72-12.78-50.62 1.13L142.8 62.2a24 24 0 0 0-33.14.77l-9 9a16 16 0 0 0 0 22.64l2 2.06l-51 51a39.75 39.75 0 0 0-10.53 38l-8 18.41A13.68 13.68 0 0 0 36 219.3a15.92 15.92 0 0 0 17.71 3.35L71.23 215a39.89 39.89 0 0 0 37.06-10.75l51-51l2.06 2.06a16 16 0 0 0 22.62 0l9-9a24 24 0 0 0 .74-33.18l19.75-19.87A35.75 35.75 0 0 0 224 67.3M97 193a24 24 0 0 1-24 6a8 8 0 0 0-5.55.31l-18.1 7.91L57 189.41a8 8 0 0 0 .25-5.75A23.88 23.88 0 0 1 63 159l51-51l33.94 34ZM202.13 82l-25.37 25.52a8 8 0 0 0 0 11.3l4.89 4.89a8 8 0 0 1 0 11.32l-9 9L112 83.26l9-9a8 8 0 0 1 11.31 0l4.89 4.89a8 8 0 0 0 5.65 2.34a8 8 0 0 0 5.66-2.36l24.94-25.09c7.81-7.82 20.5-8.18 28.29-.81a20 20 0 0 1 .39 28.7Z"/></g></svg></button> <input autocomplete=false class=cp_input spellcheck=false value=#ff0000> <button class="cp_action cp_clear"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="M224 56v144a8 8 0 0 1-8 8H68.53a8 8 0 0 1-6.86-3.88L16 128l45.67-76.12A8 8 0 0 1 68.53 48H216a8 8 0 0 1 8 8"opacity=0.2 /><path d="M216 40H68.53a16.08 16.08 0 0 0-13.72 7.77L9.14 123.88a8 8 0 0 0 0 8.24l45.67 76.11A16.08 16.08 0 0 0 68.53 216H216a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M61.67 204.12l6.86-4.12ZM216 200H68.53l-43.2-72l43.2-72H216Zm-109.66-53.66L124.69 128l-18.35-18.34a8 8 0 0 1 11.32-11.32L136 116.69l18.34-18.35a8 8 0 0 1 11.32 11.32L147.31 128l18.35 18.34a8 8 0 0 1-11.32 11.32L136 139.31l-18.34 18.35a8 8 0 0 1-11.32-11.32"/></g></svg></button> <button class="cp_action cp_submit"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="m237.66 85.26l-128.4 128.4a8 8 0 0 1-11.32 0l-71.6-72a8 8 0 0 1 0-11.31l24-24a8 8 0 0 1 11.32 0L104 147.43l98.34-97.09a8 8 0 0 1 11.32 0l24 23.6a8 8 0 0 1 0 11.32"opacity=0.2 /><path d="m243.28 68.24l-24-23.56a16 16 0 0 0-22.59 0L104 136.23l-36.69-35.6a16 16 0 0 0-22.58.05l-24 24a16 16 0 0 0 0 22.61l71.62 72a16 16 0 0 0 22.63 0L243.33 90.91a16 16 0 0 0-.05-22.67M103.62 208L32 136l24-24a.6.6 0 0 1 .08.08l42.35 41.09a8 8 0 0 0 11.19 0L208.06 56L232 79.6Z"/></g></svg></button></div></div></div>';let ve;class en extends et.EventEmitter{constructor(r,n={}){var o;super();L(this,"_open",!1);L(this,"_unset",!0);L(this,"_format");L(this,"_color");L(this,"_newColor");L(this,"config");L(this,"popper");L(this,"$target");L(this,"$dialog");L(this,"$toggle");L(this,"$toggleText");L(this,"hsvSlider");L(this,"hueSlider");L(this,"alphaSlider");L(this,"$formats");L(this,"$colorInput");if(this.config={...Gr,...n},r?typeof r=="string"&&(r=document.querySelector(r)):r=document.createElement("button"),!r)throw new Error("Element is null.");this.$target=r,this.config.toggleStyle!=="hidden"&&(this.$toggle=r,this.$toggle.classList.add("color-picker"),this.$toggle.innerHTML=Jr,this.$toggle.addEventListener("click",()=>this.toggle())),this.config.toggleStyle==="input"&&(this.$toggleText=document.createElement("div"),this.$toggleText.className="cp_text",this.$target.prepend(this.$toggleText)),this.close();const i=this.config.defaultColor??((o=this.$toggle)==null?void 0:o.dataset.color);this._setCurrentColor(new X(i),!1),i||this.clear(!1),this.config.dismissOnOutsideClick&&window.addEventListener("pointerdown",s=>{if(!this._open)return;const a=s.target;!a.closest(".cp_dialog")&&!a.closest(".color-picker")&&this.close()}),this.config.dismissOnEscape&&window.addEventListener("keydown",s=>{if(!this._open||s.key!=="Escape")return;const a=document.querySelector(":focus");(!a||a.closest(".cp_dialog"))&&this.close()})}get isOpen(){return this._open}get color(){return this._unset?null:this._color}get selectedColor(){return this._newColor}get format(){return this._format}get element(){return this.$target}toggle(r=!this._open,n=!0){r?this.open(n):this.close(n)}open(r=!0){var n;this._open||(this._open=!0,ve==null||ve.close(),ve=this,document.body.insertAdjacentHTML("beforeend",Qr),this.$dialog=document.body.lastElementChild,this.$colorInput=this.$dialog.querySelector(".cp_input"),this.populateDialog(),this.bindDialog(),this.setFormat(this.config.defaultFormat,!1),this.updateColor(),this.popper=Ir(this.$target,this.$dialog,{placement:this.config.dialogPlacement,strategy:"absolute",modifiers:[{name:"offset",options:{offset:[0,this.config.dialogOffset]}}]}),(n=this.$toggle)==null||n.classList.add("cp_open"),setTimeout(()=>this.$dialog.classList.add("cp_open")),r&&(this.emit("open"),setTimeout(()=>this.emit("opened"),this.getAnimationDuration())))}openOnce(r=!1){return new Promise(n=>{this.once("closed",()=>{r&&this.destroy(),n(this.color)}),this.open()})}populateDialog(){if(this.config.swatches){const r=this.config.swatches.map(n=>{const i=document.createElement("button");i.className="cp_swatch",i.style.setProperty("--cp-color",n),i.dataset.color=n;const o=new X(i.dataset.color);return i.addEventListener("click",()=>this._setNewColor(o)),i});this.$dialog.querySelector(".cp_swatches").append(...r)}this.config.formats&&(this.$formats=this.config.formats.map(r=>{const n=document.createElement("button");return n.className="cp_format",n.dataset.format=r,n.textContent=r.toUpperCase(),n.addEventListener("click",()=>this.setFormat(r)),n}),this.$dialog.querySelector(".cp_formats").append(...this.$formats))}bindDialog(){var l;const r=this.$dialog.querySelector(".cp_area-hsv");this.hsvSlider=new He(r),this.hsvSlider.on("drag",(u,c)=>{this._setNewColor(this._newColor.saturation(u).value(1-c))});const n=this.$dialog.querySelector(".cp_slider-hue");this.hueSlider=new He(n),this.hueSlider.on("drag",u=>{this._setNewColor(this._newColor.hue(u*360))});const i=this.$dialog.querySelector(".cp_slider-alpha");this.config.enableAlpha?(this.alphaSlider=new He(i),this.alphaSlider.on("drag",u=>{this._setNewColor(this._newColor.alpha(u),!0)})):i.remove(),this.$colorInput.addEventListener("input",()=>{try{const{color:u,format:c}=bt(this.$colorInput.value);this.setFormat(c,!1),this._setNewColor(new X(u),!1)}catch{}}),this.config.enablePreview||(l=this.$dialog.querySelector(".cp_preview"))==null||l.remove();const o=this.$dialog.querySelector(".cp_eyedrop");this.config.enableEyedropper&&"EyeDropper"in window?o.addEventListener("click",()=>{new EyeDropper().open().then(u=>{const c=new X(u.sRGBHex);this._setNewColor(c)}).catch(()=>{})}):o.remove();const s=this.$dialog.querySelector(".cp_submit");this.config.showSubmitButton?s.addEventListener("click",()=>{this._setCurrentColor(this._newColor),this.close()}):s.remove();const a=this.$dialog.querySelector(".cp_clear");this.config.showClearButton?a.addEventListener("click",()=>{this.clear(),this.close()}):a.remove()}getAnimationDuration(){const n=window.getComputedStyle(this.$target).getPropertyValue("--cp-delay");return parseFloat(n)*(n.endsWith("ms")?1:1e3)}close(r=!0){var o;if(!this._open)return;this._open=!1,ve=void 0,(o=this.$toggle)==null||o.classList.remove("cp_open");const n=this.$dialog,i=this.popper;this.$dialog=void 0,this.popper=void 0,n==null||n.classList.remove("cp_open"),setTimeout(()=>{n==null||n.remove(),i==null||i.destroy(),r&&this.emit("closed")},this.getAnimationDuration()),r&&this.emit("close")}destroy(){var r;this.close(),(r=this.$dialog)==null||r.remove(),this.$toggle&&(this.$toggle.classList.remove("color-picker","cp_open","cp_unset"),this.$toggle.style.removeProperty("--cp-current-color"),this.$toggle.removeAttribute("data-color"),this.$toggle.textContent="")}clear(r=!0){this._unset=!0,this.updateAppliedColor(r)}setColor(r,n=!0){if(!r)return this.clear(n);this._setCurrentColor(new X(r),n)}setFormat(r,n=!0){this._format=r,this.updateFormat(),n&&(this.updateColor(),this.updateAppliedColor(!1))}_setNewColor(r,n=!0){if(this.config.commitMode==="instant")return this._setCurrentColor(r);this._newColor=r,this.updateColor(n)}_setCurrentColor(r,n=!0){this._unset=!1,this._newColor=r,this._color=r,this.updateColor(!0),this.updateAppliedColor(n)}updateColor(r=!0){var i,o,s,a,l,u,c,d,g;const n=((i=this.color)==null?void 0:i.toString())??"transparent";(o=this.$toggle)==null||o.style.setProperty("--cp-current-color",n),(s=this.$dialog)==null||s.style.setProperty("--cp-current-color",n),(a=this.$dialog)==null||a.style.setProperty("--cp-color",this._newColor.toString()),(l=this.$dialog)==null||l.style.setProperty("--cp-hue",this._newColor.hue().toString()),(u=this.$dialog)==null||u.style.setProperty("--cp-alpha",this._newColor.alpha().toString()),(c=this.hsvSlider)==null||c.moveThumb(this._newColor.saturation(),1-this._newColor.value()),(d=this.hueSlider)==null||d.moveThumb(this._newColor.hue()/360),(g=this.alphaSlider)==null||g.moveThumb(this._newColor.alpha()),r&&this.$colorInput&&(this.$colorInput.value=this._newColor.string(this._format))}updateAppliedColor(r=!0){var n,i;this.$toggle&&(this.$toggle.classList.toggle("cp_unset",this._unset),this.$toggle.dataset.color=((n=this.color)==null?void 0:n.toString())??""),this.$toggleText&&(this.$toggleText.textContent=((i=this.color)==null?void 0:i.string(this._format))??"-"),r&&this.emit("pick",this.color)}updateFormat(){if(!this.$formats)return;this.$formats.forEach(n=>n.removeAttribute("aria-checked"));const r=this.$formats.find(n=>n.dataset.format===this._format);r&&(r.ariaChecked="true")}}return en}();
