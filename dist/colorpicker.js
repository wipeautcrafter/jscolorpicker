var Rt = Object.defineProperty;
var Bt = (t, e, r) => e in t ? Rt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var E = (t, e, r) => Bt(t, typeof e != "symbol" ? e + "" : e, r);
function Tt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var je = { exports: {} }, te = typeof Reflect == "object" ? Reflect : null, Ge = te && typeof te.apply == "function" ? te.apply : function(e, r, n) {
  return Function.prototype.apply.call(e, r, n);
}, xe;
te && typeof te.ownKeys == "function" ? xe = te.ownKeys : Object.getOwnPropertySymbols ? xe = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : xe = function(e) {
  return Object.getOwnPropertyNames(e);
};
function Ft(t) {
  console && console.warn && console.warn(t);
}
var lt = Number.isNaN || function(e) {
  return e !== e;
};
function y() {
  y.init.call(this);
}
je.exports = y;
je.exports.once = It;
y.EventEmitter = y;
y.prototype._events = void 0;
y.prototype._eventsCount = 0;
y.prototype._maxListeners = void 0;
var Je = 10;
function Le(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
Object.defineProperty(y, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Je;
  },
  set: function(t) {
    if (typeof t != "number" || t < 0 || lt(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Je = t;
  }
});
y.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
y.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || lt(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function ut(t) {
  return t._maxListeners === void 0 ? y.defaultMaxListeners : t._maxListeners;
}
y.prototype.getMaxListeners = function() {
  return ut(this);
};
y.prototype.emit = function(e) {
  for (var r = [], n = 1; n < arguments.length; n++) r.push(arguments[n]);
  var i = e === "error", o = this._events;
  if (o !== void 0)
    i = i && o.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var s;
    if (r.length > 0 && (s = r[0]), s instanceof Error)
      throw s;
    var c = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw c.context = s, c;
  }
  var a = o[e];
  if (a === void 0)
    return !1;
  if (typeof a == "function")
    Ge(a, this, r);
  else
    for (var u = a.length, l = vt(a, u), n = 0; n < u; ++n)
      Ge(l[n], this, r);
  return !0;
};
function pt(t, e, r, n) {
  var i, o, s;
  if (Le(r), o = t._events, o === void 0 ? (o = t._events = /* @__PURE__ */ Object.create(null), t._eventsCount = 0) : (o.newListener !== void 0 && (t.emit(
    "newListener",
    e,
    r.listener ? r.listener : r
  ), o = t._events), s = o[e]), s === void 0)
    s = o[e] = r, ++t._eventsCount;
  else if (typeof s == "function" ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), i = ut(t), i > 0 && s.length > i && !s.warned) {
    s.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = t, c.type = e, c.count = s.length, Ft(c);
  }
  return t;
}
y.prototype.addListener = function(e, r) {
  return pt(this, e, r, !1);
};
y.prototype.on = y.prototype.addListener;
y.prototype.prependListener = function(e, r) {
  return pt(this, e, r, !0);
};
function Ht() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function ft(t, e, r) {
  var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r }, i = Ht.bind(n);
  return i.listener = r, n.wrapFn = i, i;
}
y.prototype.once = function(e, r) {
  return Le(r), this.on(e, ft(this, e, r)), this;
};
y.prototype.prependOnceListener = function(e, r) {
  return Le(r), this.prependListener(e, ft(this, e, r)), this;
};
y.prototype.removeListener = function(e, r) {
  var n, i, o, s, c;
  if (Le(r), i = this._events, i === void 0)
    return this;
  if (n = i[e], n === void 0)
    return this;
  if (n === r || n.listener === r)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || r));
  else if (typeof n != "function") {
    for (o = -1, s = n.length - 1; s >= 0; s--)
      if (n[s] === r || n[s].listener === r) {
        c = n[s].listener, o = s;
        break;
      }
    if (o < 0)
      return this;
    o === 0 ? n.shift() : Nt(n, o), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, c || r);
  }
  return this;
};
y.prototype.off = y.prototype.removeListener;
y.prototype.removeAllListeners = function(e) {
  var r, n, i;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
  if (arguments.length === 0) {
    var o = Object.keys(n), s;
    for (i = 0; i < o.length; ++i)
      s = o[i], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (r = n[e], typeof r == "function")
    this.removeListener(e, r);
  else if (r !== void 0)
    for (i = r.length - 1; i >= 0; i--)
      this.removeListener(e, r[i]);
  return this;
};
function dt(t, e, r) {
  var n = t._events;
  if (n === void 0)
    return [];
  var i = n[e];
  return i === void 0 ? [] : typeof i == "function" ? r ? [i.listener || i] : [i] : r ? Wt(i) : vt(i, i.length);
}
y.prototype.listeners = function(e) {
  return dt(this, e, !0);
};
y.prototype.rawListeners = function(e) {
  return dt(this, e, !1);
};
y.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : ht.call(t, e);
};
y.prototype.listenerCount = ht;
function ht(t) {
  var e = this._events;
  if (e !== void 0) {
    var r = e[t];
    if (typeof r == "function")
      return 1;
    if (r !== void 0)
      return r.length;
  }
  return 0;
}
y.prototype.eventNames = function() {
  return this._eventsCount > 0 ? xe(this._events) : [];
};
function vt(t, e) {
  for (var r = new Array(e), n = 0; n < e; ++n)
    r[n] = t[n];
  return r;
}
function Nt(t, e) {
  for (; e + 1 < t.length; e++)
    t[e] = t[e + 1];
  t.pop();
}
function Wt(t) {
  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
    e[r] = t[r].listener || t[r];
  return e;
}
function It(t, e) {
  return new Promise(function(r, n) {
    function i(s) {
      t.removeListener(e, o), n(s);
    }
    function o() {
      typeof t.removeListener == "function" && t.removeListener("error", i), r([].slice.call(arguments));
    }
    mt(t, e, o, { once: !0 }), e !== "error" && qt(t, i, { once: !0 });
  });
}
function qt(t, e, r) {
  typeof t.on == "function" && mt(t, "error", e, r);
}
function mt(t, e, r, n) {
  if (typeof t.on == "function")
    n.once ? t.once(e, r) : t.on(e, r);
  else if (typeof t.addEventListener == "function")
    t.addEventListener(e, function i(o) {
      n.once && t.removeEventListener(e, i), r(o);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
}
var gt = je.exports;
const Vt = /* @__PURE__ */ Tt(gt);
var D = "top", B = "bottom", T = "right", k = "left", Re = "auto", de = [D, B, T, k], re = "start", pe = "end", Xt = "clippingParents", yt = "viewport", ce = "popper", Ut = "reference", Qe = /* @__PURE__ */ de.reduce(function(t, e) {
  return t.concat([e + "-" + re, e + "-" + pe]);
}, []), wt = /* @__PURE__ */ [].concat(de, [Re]).reduce(function(t, e) {
  return t.concat([e, e + "-" + re, e + "-" + pe]);
}, []), Yt = "beforeRead", zt = "read", Kt = "afterRead", Zt = "beforeMain", Gt = "main", Jt = "afterMain", Qt = "beforeWrite", er = "write", tr = "afterWrite", rr = [Yt, zt, Kt, Zt, Gt, Jt, Qt, er, tr];
function W(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function j(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function J(t) {
  var e = j(t).Element;
  return t instanceof e || t instanceof Element;
}
function R(t) {
  var e = j(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Be(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = j(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function nr(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, i = e.attributes[r] || {}, o = e.elements[r];
    !R(o) || !W(o) || (Object.assign(o.style, n), Object.keys(i).forEach(function(s) {
      var c = i[s];
      c === !1 ? o.removeAttribute(s) : o.setAttribute(s, c === !0 ? "" : c);
    }));
  });
}
function ir(t) {
  var e = t.state, r = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var i = e.elements[n], o = e.attributes[n] || {}, s = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]), c = s.reduce(function(a, u) {
        return a[u] = "", a;
      }, {});
      !R(i) || !W(i) || (Object.assign(i.style, c), Object.keys(o).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const or = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: nr,
  effect: ir,
  requires: ["computeStyles"]
};
function N(t) {
  return t.split("-")[0];
}
var G = Math.max, _e = Math.min, ne = Math.round;
function ke() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function bt() {
  return !/^((?!chrome|android).)*safari/i.test(ke());
}
function ie(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), i = 1, o = 1;
  e && R(t) && (i = t.offsetWidth > 0 && ne(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && ne(n.height) / t.offsetHeight || 1);
  var s = J(t) ? j(t) : window, c = s.visualViewport, a = !bt() && r, u = (n.left + (a && c ? c.offsetLeft : 0)) / i, l = (n.top + (a && c ? c.offsetTop : 0)) / o, v = n.width / i, w = n.height / o;
  return {
    width: v,
    height: w,
    top: l,
    right: u + v,
    bottom: l + w,
    left: u,
    x: u,
    y: l
  };
}
function Te(t) {
  var e = ie(t), r = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: n
  };
}
function xt(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && Be(r)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function q(t) {
  return j(t).getComputedStyle(t);
}
function sr(t) {
  return ["table", "td", "th"].indexOf(W(t)) >= 0;
}
function X(t) {
  return ((J(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Ee(t) {
  return W(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Be(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    X(t)
  );
}
function et(t) {
  return !R(t) || // https://github.com/popperjs/popper-core/issues/837
  q(t).position === "fixed" ? null : t.offsetParent;
}
function ar(t) {
  var e = /firefox/i.test(ke()), r = /Trident/i.test(ke());
  if (r && R(t)) {
    var n = q(t);
    if (n.position === "fixed")
      return null;
  }
  var i = Ee(t);
  for (Be(i) && (i = i.host); R(i) && ["html", "body"].indexOf(W(i)) < 0; ) {
    var o = q(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function he(t) {
  for (var e = j(t), r = et(t); r && sr(r) && q(r).position === "static"; )
    r = et(r);
  return r && (W(r) === "html" || W(r) === "body" && q(r).position === "static") ? e : r || ar(t) || e;
}
function Fe(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function le(t, e, r) {
  return G(t, _e(e, r));
}
function cr(t, e, r) {
  var n = le(t, e, r);
  return n > r ? r : n;
}
function Ot() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function _t(t) {
  return Object.assign({}, Ot(), t);
}
function Lt(t, e) {
  return e.reduce(function(r, n) {
    return r[n] = t, r;
  }, {});
}
var lr = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, _t(typeof e != "number" ? e : Lt(e, de));
};
function ur(t) {
  var e, r = t.state, n = t.name, i = t.options, o = r.elements.arrow, s = r.modifiersData.popperOffsets, c = N(r.placement), a = Fe(c), u = [k, T].indexOf(c) >= 0, l = u ? "height" : "width";
  if (!(!o || !s)) {
    var v = lr(i.padding, r), w = Te(o), p = a === "y" ? D : k, x = a === "y" ? B : T, h = r.rects.reference[l] + r.rects.reference[a] - s[a] - r.rects.popper[l], d = s[a] - r.rects.reference[a], b = he(o), _ = b ? a === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, L = h / 2 - d / 2, f = v[p], m = _ - w[l] - v[x], g = _ / 2 - w[l] / 2 + L, O = le(f, g, m), A = a;
    r.modifiersData[n] = (e = {}, e[A] = O, e.centerOffset = O - g, e);
  }
}
function pr(t) {
  var e = t.state, r = t.options, n = r.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || xt(e.elements.popper, i) && (e.elements.arrow = i));
}
const fr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ur,
  effect: pr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function oe(t) {
  return t.split("-")[1];
}
var dr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function hr(t, e) {
  var r = t.x, n = t.y, i = e.devicePixelRatio || 1;
  return {
    x: ne(r * i) / i || 0,
    y: ne(n * i) / i || 0
  };
}
function tt(t) {
  var e, r = t.popper, n = t.popperRect, i = t.placement, o = t.variation, s = t.offsets, c = t.position, a = t.gpuAcceleration, u = t.adaptive, l = t.roundOffsets, v = t.isFixed, w = s.x, p = w === void 0 ? 0 : w, x = s.y, h = x === void 0 ? 0 : x, d = typeof l == "function" ? l({
    x: p,
    y: h
  }) : {
    x: p,
    y: h
  };
  p = d.x, h = d.y;
  var b = s.hasOwnProperty("x"), _ = s.hasOwnProperty("y"), L = k, f = D, m = window;
  if (u) {
    var g = he(r), O = "clientHeight", A = "clientWidth";
    if (g === j(r) && (g = X(r), q(g).position !== "static" && c === "absolute" && (O = "scrollHeight", A = "scrollWidth")), g = g, i === D || (i === k || i === T) && o === pe) {
      f = B;
      var C = v && g === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        g[O]
      );
      h -= C - n.height, h *= a ? 1 : -1;
    }
    if (i === k || (i === D || i === B) && o === pe) {
      L = T;
      var $ = v && g === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        g[A]
      );
      p -= $ - n.width, p *= a ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: c
  }, u && dr), F = l === !0 ? hr({
    x: p,
    y: h
  }, j(r)) : {
    x: p,
    y: h
  };
  if (p = F.x, h = F.y, a) {
    var P;
    return Object.assign({}, S, (P = {}, P[f] = _ ? "0" : "", P[L] = b ? "0" : "", P.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", P));
  }
  return Object.assign({}, S, (e = {}, e[f] = _ ? h + "px" : "", e[L] = b ? p + "px" : "", e.transform = "", e));
}
function vr(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, i = n === void 0 ? !0 : n, o = r.adaptive, s = o === void 0 ? !0 : o, c = r.roundOffsets, a = c === void 0 ? !0 : c, u = {
    placement: N(e.placement),
    variation: oe(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, tt(Object.assign({}, u, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, tt(Object.assign({}, u, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const mr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: vr,
  data: {}
};
var be = {
  passive: !0
};
function gr(t) {
  var e = t.state, r = t.instance, n = t.options, i = n.scroll, o = i === void 0 ? !0 : i, s = n.resize, c = s === void 0 ? !0 : s, a = j(e.elements.popper), u = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && u.forEach(function(l) {
    l.addEventListener("scroll", r.update, be);
  }), c && a.addEventListener("resize", r.update, be), function() {
    o && u.forEach(function(l) {
      l.removeEventListener("scroll", r.update, be);
    }), c && a.removeEventListener("resize", r.update, be);
  };
}
const yr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: gr,
  data: {}
};
var wr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Oe(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return wr[e];
  });
}
var br = {
  start: "end",
  end: "start"
};
function rt(t) {
  return t.replace(/start|end/g, function(e) {
    return br[e];
  });
}
function He(t) {
  var e = j(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Ne(t) {
  return ie(X(t)).left + He(t).scrollLeft;
}
function xr(t, e) {
  var r = j(t), n = X(t), i = r.visualViewport, o = n.clientWidth, s = n.clientHeight, c = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    var u = bt();
    (u || !u && e === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: c + Ne(t),
    y: a
  };
}
function Or(t) {
  var e, r = X(t), n = He(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, o = G(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = G(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -n.scrollLeft + Ne(t), a = -n.scrollTop;
  return q(i || r).direction === "rtl" && (c += G(r.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: c,
    y: a
  };
}
function We(t) {
  var e = q(t), r = e.overflow, n = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + i + n);
}
function Et(t) {
  return ["html", "body", "#document"].indexOf(W(t)) >= 0 ? t.ownerDocument.body : R(t) && We(t) ? t : Et(Ee(t));
}
function ue(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = Et(t), i = n === ((r = t.ownerDocument) == null ? void 0 : r.body), o = j(n), s = i ? [o].concat(o.visualViewport || [], We(n) ? n : []) : n, c = e.concat(s);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(ue(Ee(s)))
  );
}
function Me(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function _r(t, e) {
  var r = ie(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function nt(t, e, r) {
  return e === yt ? Me(xr(t, r)) : J(e) ? _r(e, r) : Me(Or(X(t)));
}
function Lr(t) {
  var e = ue(Ee(t)), r = ["absolute", "fixed"].indexOf(q(t).position) >= 0, n = r && R(t) ? he(t) : t;
  return J(n) ? e.filter(function(i) {
    return J(i) && xt(i, n) && W(i) !== "body";
  }) : [];
}
function Er(t, e, r, n) {
  var i = e === "clippingParents" ? Lr(t) : [].concat(e), o = [].concat(i, [r]), s = o[0], c = o.reduce(function(a, u) {
    var l = nt(t, u, n);
    return a.top = G(l.top, a.top), a.right = _e(l.right, a.right), a.bottom = _e(l.bottom, a.bottom), a.left = G(l.left, a.left), a;
  }, nt(t, s, n));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function $t(t) {
  var e = t.reference, r = t.element, n = t.placement, i = n ? N(n) : null, o = n ? oe(n) : null, s = e.x + e.width / 2 - r.width / 2, c = e.y + e.height / 2 - r.height / 2, a;
  switch (i) {
    case D:
      a = {
        x: s,
        y: e.y - r.height
      };
      break;
    case B:
      a = {
        x: s,
        y: e.y + e.height
      };
      break;
    case T:
      a = {
        x: e.x + e.width,
        y: c
      };
      break;
    case k:
      a = {
        x: e.x - r.width,
        y: c
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var u = i ? Fe(i) : null;
  if (u != null) {
    var l = u === "y" ? "height" : "width";
    switch (o) {
      case re:
        a[u] = a[u] - (e[l] / 2 - r[l] / 2);
        break;
      case pe:
        a[u] = a[u] + (e[l] / 2 - r[l] / 2);
        break;
    }
  }
  return a;
}
function fe(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, i = n === void 0 ? t.placement : n, o = r.strategy, s = o === void 0 ? t.strategy : o, c = r.boundary, a = c === void 0 ? Xt : c, u = r.rootBoundary, l = u === void 0 ? yt : u, v = r.elementContext, w = v === void 0 ? ce : v, p = r.altBoundary, x = p === void 0 ? !1 : p, h = r.padding, d = h === void 0 ? 0 : h, b = _t(typeof d != "number" ? d : Lt(d, de)), _ = w === ce ? Ut : ce, L = t.rects.popper, f = t.elements[x ? _ : w], m = Er(J(f) ? f : f.contextElement || X(t.elements.popper), a, l, s), g = ie(t.elements.reference), O = $t({
    reference: g,
    element: L,
    strategy: "absolute",
    placement: i
  }), A = Me(Object.assign({}, L, O)), C = w === ce ? A : g, $ = {
    top: m.top - C.top + b.top,
    bottom: C.bottom - m.bottom + b.bottom,
    left: m.left - C.left + b.left,
    right: C.right - m.right + b.right
  }, S = t.modifiersData.offset;
  if (w === ce && S) {
    var F = S[i];
    Object.keys($).forEach(function(P) {
      var U = [T, B].indexOf(P) >= 0 ? 1 : -1, Y = [D, B].indexOf(P) >= 0 ? "y" : "x";
      $[P] += F[Y] * U;
    });
  }
  return $;
}
function $r(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, i = r.boundary, o = r.rootBoundary, s = r.padding, c = r.flipVariations, a = r.allowedAutoPlacements, u = a === void 0 ? wt : a, l = oe(n), v = l ? c ? Qe : Qe.filter(function(x) {
    return oe(x) === l;
  }) : de, w = v.filter(function(x) {
    return u.indexOf(x) >= 0;
  });
  w.length === 0 && (w = v);
  var p = w.reduce(function(x, h) {
    return x[h] = fe(t, {
      placement: h,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[N(h)], x;
  }, {});
  return Object.keys(p).sort(function(x, h) {
    return p[x] - p[h];
  });
}
function Cr(t) {
  if (N(t) === Re)
    return [];
  var e = Oe(t);
  return [rt(t), e, rt(e)];
}
function Ar(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var i = r.mainAxis, o = i === void 0 ? !0 : i, s = r.altAxis, c = s === void 0 ? !0 : s, a = r.fallbackPlacements, u = r.padding, l = r.boundary, v = r.rootBoundary, w = r.altBoundary, p = r.flipVariations, x = p === void 0 ? !0 : p, h = r.allowedAutoPlacements, d = e.options.placement, b = N(d), _ = b === d, L = a || (_ || !x ? [Oe(d)] : Cr(d)), f = [d].concat(L).reduce(function(Q, V) {
      return Q.concat(N(V) === Re ? $r(e, {
        placement: V,
        boundary: l,
        rootBoundary: v,
        padding: u,
        flipVariations: x,
        allowedAutoPlacements: h
      }) : V);
    }, []), m = e.rects.reference, g = e.rects.popper, O = /* @__PURE__ */ new Map(), A = !0, C = f[0], $ = 0; $ < f.length; $++) {
      var S = f[$], F = N(S), P = oe(S) === re, U = [D, B].indexOf(F) >= 0, Y = U ? "width" : "height", M = fe(e, {
        placement: S,
        boundary: l,
        rootBoundary: v,
        altBoundary: w,
        padding: u
      }), H = U ? P ? T : k : P ? B : D;
      m[Y] > g[Y] && (H = Oe(H));
      var ve = Oe(H), z = [];
      if (o && z.push(M[F] <= 0), c && z.push(M[H] <= 0, M[ve] <= 0), z.every(function(Q) {
        return Q;
      })) {
        C = S, A = !1;
        break;
      }
      O.set(S, z);
    }
    if (A)
      for (var me = x ? 3 : 1, $e = function(V) {
        var ae = f.find(function(ye) {
          var K = O.get(ye);
          if (K)
            return K.slice(0, V).every(function(Ce) {
              return Ce;
            });
        });
        if (ae)
          return C = ae, "break";
      }, se = me; se > 0; se--) {
        var ge = $e(se);
        if (ge === "break") break;
      }
    e.placement !== C && (e.modifiersData[n]._skip = !0, e.placement = C, e.reset = !0);
  }
}
const Sr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ar,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function it(t, e, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - r.y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x
  };
}
function ot(t) {
  return [D, T, B, k].some(function(e) {
    return t[e] >= 0;
  });
}
function Pr(t) {
  var e = t.state, r = t.name, n = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, s = fe(e, {
    elementContext: "reference"
  }), c = fe(e, {
    altBoundary: !0
  }), a = it(s, n), u = it(c, i, o), l = ot(a), v = ot(u);
  e.modifiersData[r] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
    isReferenceHidden: l,
    hasPopperEscaped: v
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": v
  });
}
const Dr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Pr
};
function kr(t, e, r) {
  var n = N(t), i = [k, D].indexOf(n) >= 0 ? -1 : 1, o = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, s = o[0], c = o[1];
  return s = s || 0, c = (c || 0) * i, [k, T].indexOf(n) >= 0 ? {
    x: c,
    y: s
  } : {
    x: s,
    y: c
  };
}
function Mr(t) {
  var e = t.state, r = t.options, n = t.name, i = r.offset, o = i === void 0 ? [0, 0] : i, s = wt.reduce(function(l, v) {
    return l[v] = kr(v, e.rects, o), l;
  }, {}), c = s[e.placement], a = c.x, u = c.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += u), e.modifiersData[n] = s;
}
const jr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Mr
};
function Rr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = $t({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Br = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Rr,
  data: {}
};
function Tr(t) {
  return t === "x" ? "y" : "x";
}
function Fr(t) {
  var e = t.state, r = t.options, n = t.name, i = r.mainAxis, o = i === void 0 ? !0 : i, s = r.altAxis, c = s === void 0 ? !1 : s, a = r.boundary, u = r.rootBoundary, l = r.altBoundary, v = r.padding, w = r.tether, p = w === void 0 ? !0 : w, x = r.tetherOffset, h = x === void 0 ? 0 : x, d = fe(e, {
    boundary: a,
    rootBoundary: u,
    padding: v,
    altBoundary: l
  }), b = N(e.placement), _ = oe(e.placement), L = !_, f = Fe(b), m = Tr(f), g = e.modifiersData.popperOffsets, O = e.rects.reference, A = e.rects.popper, C = typeof h == "function" ? h(Object.assign({}, e.rects, {
    placement: e.placement
  })) : h, $ = typeof C == "number" ? {
    mainAxis: C,
    altAxis: C
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, C), S = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, F = {
    x: 0,
    y: 0
  };
  if (g) {
    if (o) {
      var P, U = f === "y" ? D : k, Y = f === "y" ? B : T, M = f === "y" ? "height" : "width", H = g[f], ve = H + d[U], z = H - d[Y], me = p ? -A[M] / 2 : 0, $e = _ === re ? O[M] : A[M], se = _ === re ? -A[M] : -O[M], ge = e.elements.arrow, Q = p && ge ? Te(ge) : {
        width: 0,
        height: 0
      }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Ot(), ae = V[U], ye = V[Y], K = le(0, O[M], Q[M]), Ce = L ? O[M] / 2 - me - K - ae - $.mainAxis : $e - K - ae - $.mainAxis, St = L ? -O[M] / 2 + me + K + ye + $.mainAxis : se + K + ye + $.mainAxis, Ae = e.elements.arrow && he(e.elements.arrow), Pt = Ae ? f === "y" ? Ae.clientTop || 0 : Ae.clientLeft || 0 : 0, Ie = (P = S == null ? void 0 : S[f]) != null ? P : 0, Dt = H + Ce - Ie - Pt, kt = H + St - Ie, qe = le(p ? _e(ve, Dt) : ve, H, p ? G(z, kt) : z);
      g[f] = qe, F[f] = qe - H;
    }
    if (c) {
      var Ve, Mt = f === "x" ? D : k, jt = f === "x" ? B : T, Z = g[m], we = m === "y" ? "height" : "width", Xe = Z + d[Mt], Ue = Z - d[jt], Se = [D, k].indexOf(b) !== -1, Ye = (Ve = S == null ? void 0 : S[m]) != null ? Ve : 0, ze = Se ? Xe : Z - O[we] - A[we] - Ye + $.altAxis, Ke = Se ? Z + O[we] + A[we] - Ye - $.altAxis : Ue, Ze = p && Se ? cr(ze, Z, Ke) : le(p ? ze : Xe, Z, p ? Ke : Ue);
      g[m] = Ze, F[m] = Ze - Z;
    }
    e.modifiersData[n] = F;
  }
}
const Hr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Fr,
  requiresIfExists: ["offset"]
};
function Nr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Wr(t) {
  return t === j(t) || !R(t) ? He(t) : Nr(t);
}
function Ir(t) {
  var e = t.getBoundingClientRect(), r = ne(e.width) / t.offsetWidth || 1, n = ne(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function qr(t, e, r) {
  r === void 0 && (r = !1);
  var n = R(e), i = R(e) && Ir(e), o = X(e), s = ie(t, i, r), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((W(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  We(o)) && (c = Wr(e)), R(e) ? (a = ie(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : o && (a.x = Ne(o))), {
    x: s.left + c.scrollLeft - a.x,
    y: s.top + c.scrollTop - a.y,
    width: s.width,
    height: s.height
  };
}
function Vr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(o) {
    e.set(o.name, o);
  });
  function i(o) {
    r.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(c) {
      if (!r.has(c)) {
        var a = e.get(c);
        a && i(a);
      }
    }), n.push(o);
  }
  return t.forEach(function(o) {
    r.has(o.name) || i(o);
  }), n;
}
function Xr(t) {
  var e = Vr(t);
  return rr.reduce(function(r, n) {
    return r.concat(e.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Ur(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function Yr(t) {
  var e = t.reduce(function(r, n) {
    var i = r[n.name];
    return r[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(e).map(function(r) {
    return e[r];
  });
}
var st = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function at() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function zr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, i = e.defaultOptions, o = i === void 0 ? st : i;
  return function(c, a, u) {
    u === void 0 && (u = o);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, st, o),
      modifiersData: {},
      elements: {
        reference: c,
        popper: a
      },
      attributes: {},
      styles: {}
    }, v = [], w = !1, p = {
      state: l,
      setOptions: function(b) {
        var _ = typeof b == "function" ? b(l.options) : b;
        h(), l.options = Object.assign({}, o, l.options, _), l.scrollParents = {
          reference: J(c) ? ue(c) : c.contextElement ? ue(c.contextElement) : [],
          popper: ue(a)
        };
        var L = Xr(Yr([].concat(n, l.options.modifiers)));
        return l.orderedModifiers = L.filter(function(f) {
          return f.enabled;
        }), x(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var b = l.elements, _ = b.reference, L = b.popper;
          if (at(_, L)) {
            l.rects = {
              reference: qr(_, he(L), l.options.strategy === "fixed"),
              popper: Te(L)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function($) {
              return l.modifiersData[$.name] = Object.assign({}, $.data);
            });
            for (var f = 0; f < l.orderedModifiers.length; f++) {
              if (l.reset === !0) {
                l.reset = !1, f = -1;
                continue;
              }
              var m = l.orderedModifiers[f], g = m.fn, O = m.options, A = O === void 0 ? {} : O, C = m.name;
              typeof g == "function" && (l = g({
                state: l,
                options: A,
                name: C,
                instance: p
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ur(function() {
        return new Promise(function(d) {
          p.forceUpdate(), d(l);
        });
      }),
      destroy: function() {
        h(), w = !0;
      }
    };
    if (!at(c, a))
      return p;
    p.setOptions(u).then(function(d) {
      !w && u.onFirstUpdate && u.onFirstUpdate(d);
    });
    function x() {
      l.orderedModifiers.forEach(function(d) {
        var b = d.name, _ = d.options, L = _ === void 0 ? {} : _, f = d.effect;
        if (typeof f == "function") {
          var m = f({
            state: l,
            name: b,
            instance: p,
            options: L
          }), g = function() {
          };
          v.push(m || g);
        }
      });
    }
    function h() {
      v.forEach(function(d) {
        return d();
      }), v = [];
    }
    return p;
  };
}
var Kr = [yr, Br, mr, or, jr, Sr, Hr, fr, Dr], Zr = /* @__PURE__ */ zr({
  defaultModifiers: Kr
});
const Gr = ([t, e, r, n]) => {
  const i = Math.max(t, e, r), o = i - Math.min(t, e, r), s = o && (i == t ? (e - r) / o : i == e ? 2 + (r - t) / o : 4 + (t - e) / o);
  return [60 * (s < 0 ? s + 6 : s), i && o / i, i, n];
}, Ct = (t) => t.replace(/[^0-9%.,]/g, "").split(",").map((e) => parseFloat(e) / (e.endsWith("%") ? 100 : 1)), Jr = (t) => {
  const e = document.createElement("span");
  e.style.display = "none", e.style.color = t, document.body.append(e);
  const { color: r } = getComputedStyle(e);
  if (e.remove(), !r) return null;
  const [n, i, o, s] = Ct(r);
  return Gr([n / 255, i / 255, o / 255, s]);
}, Qr = (t) => {
  const e = Ct(t).map((r, n) => Math.min(r, n ? 1 : 255));
  return e.length < 3 || e.some((r) => isNaN(r)) ? null : e;
}, At = (t) => {
  let e;
  /^hsva?\(/.test(t) ? e = "hsv" : /^hsla?\(/.test(t) ? e = "hsl" : /^rgba?\(/.test(t) ? e = "rgb" : e = "hex";
  const r = e === "hsv" ? Qr(t) : Jr(t);
  if (!r) throw new Error("Color could not be parsed!");
  return r[3] = r[3] ?? 1, { color: r, format: e };
}, ee = (t) => t.toFixed(), en = (t, e) => ("" + +t.toFixed(e)).replace(/^0\./g, "."), tn = ([t, e, r, n]) => {
  const i = r - r * e / 2, o = Math.min(i, 1 - i);
  return [t, o ? (r - i) / o : 0, i, n];
}, ct = ([t, e, r, n]) => {
  const i = (o, s = (o + t / 60) % 6) => r - r * e * Math.max(Math.min(s, 4 - s, 1), 0);
  return [i(5), i(3), i(1), n];
}, Pe = ([t, e, r, n], i) => {
  const o = n < 1 ? "a" : "", s = i.startsWith("hs") ? [ee(t), ee(e * 100) + "%", ee(r * 100) + "%"] : [ee(t * 255), ee(e * 255), ee(r * 255)];
  return o && s.push(en(n, 2)), `${i}${o}(${s.join()})`;
}, rn = (t) => "#" + t.slice(0, t[3] < 1 ? 4 : 3).map(
  (e) => Math.round(e * 255).toString(16).padStart(2, "0")
).join(""), nn = (t, e) => e === "hsv" ? Pe(t, e) : e === "hsl" ? Pe(tn(t), e) : e === "rgb" ? Pe(ct(t), e) : rn(ct(t));
class I {
  constructor(e) {
    E(this, "color");
    if (!e)
      this.color = [0, 0, 0, 1];
    else if (e instanceof I)
      this.color = [...e.color];
    else if (Array.isArray(e)) {
      const [r = 0, n = 0, i = 0, o = 1] = e;
      this.color = [r, n, i, o];
    } else
      this.color = At(e).color;
  }
  getSet(e, r) {
    if (r === void 0) return this.color[e];
    const n = [...this.color];
    return n[e] = r, new I(n);
  }
  hue(e) {
    return this.getSet(0, e);
  }
  saturation(e) {
    return this.getSet(1, e);
  }
  value(e) {
    return this.getSet(2, e);
  }
  alpha(e) {
    return this.getSet(3, e);
  }
  string(e) {
    return nn(this.color, e);
  }
  toString() {
    return this.string("hex");
  }
  clone() {
    return new I(this);
  }
}
class De extends Vt {
  constructor(r) {
    super();
    E(this, "$track");
    E(this, "$thumb");
    this.$track = r, this.$thumb = r.querySelector(".cp_thumb"), this.$track.addEventListener("pointerdown", (n) => {
      this.$track.setPointerCapture(n.pointerId), this.handleDrag(n);
    }), this.$track.addEventListener("pointermove", (n) => {
      this.$track.hasPointerCapture(n.pointerId) && this.handleDrag(n);
    }), this.$track.addEventListener("pointerup", (n) => {
      this.$track.releasePointerCapture(n.pointerId);
    });
  }
  handleDrag(r) {
    const n = this.$track.getBoundingClientRect();
    let i = (r.clientX - n.x) / n.width;
    i < 0 && (i = 0), i > 1 && (i = 1);
    let o = (r.clientY - n.y) / n.height;
    o < 0 && (o = 0), o > 1 && (o = 1), this.emit("drag", i, o);
  }
  moveThumb(r, n) {
    r !== void 0 && (this.$thumb.style.left = `${r * 100}%`), n !== void 0 && (this.$thumb.style.top = `${n * 100}%`);
  }
}
const on = {
  theme: null,
  toggleStyle: "button",
  animationDuration: 150,
  defaultColor: null,
  swatches: [
    "#D95D5D",
    "#DB8525",
    "#E8C43C",
    "#BED649",
    "#9ECBDB",
    "#6399A5",
    "#C771A1",
    "#FFFFFF",
    "#000000"
  ],
  enableAlpha: !0,
  enableEyedropper: !0,
  formats: ["hex", "rgb", "hsv", "hsl"],
  defaultFormat: "hex",
  commitMode: "confirm",
  showSubmitButton: !0,
  showClearButton: !0,
  dismissOnOutsideClick: !0,
  dismissOnEscape: !0
}, sn = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49 120.49a12 12 0 0 1-17 0L140 69v147a12 12 0 0 1-24 0V69l-51.51 51.49a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17"/></svg>', an = `<div class="cp_dialog">
  <div class="cp_area cp_area-hsv">
    <div class="cp_inner"></div>
    <div class="cp_thumb"></div>
  </div>
  <div class="cp_dialog-inner">
    <div class="cp_slider-hue cp_slider">
      <div class="cp_thumb"></div>
    </div>
    <div class="cp_slider cp_slider-alpha">
      <div class="cp_inner"></div>
      <div class="cp_thumb"></div>
    </div>
    <div class="cp_swatches"></div>
    <div class="cp_formats"></div>
    <div class="cp_input-group">
      <button class="cp_action cp_eyedrop">
        <!-- prettier-ignore -->
        <svg class="cp_icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="m207.8 87.6l-25.37 25.53l4.89 4.88a16 16 0 0 1 0 22.64l-9 9a8 8 0 0 1-11.32 0l-60.68-60.7a8 8 0 0 1 0-11.32l9-9a16 16 0 0 1 22.63 0l4.88 4.89l25-25.11c10.79-10.79 28.37-11.45 39.45-1a28 28 0 0 1 .52 40.19" opacity="0.2"/><path d="M224 67.3a35.8 35.8 0 0 0-11.26-25.66c-14-13.28-36.72-12.78-50.62 1.13L142.8 62.2a24 24 0 0 0-33.14.77l-9 9a16 16 0 0 0 0 22.64l2 2.06l-51 51a39.75 39.75 0 0 0-10.53 38l-8 18.41A13.68 13.68 0 0 0 36 219.3a15.92 15.92 0 0 0 17.71 3.35L71.23 215a39.89 39.89 0 0 0 37.06-10.75l51-51l2.06 2.06a16 16 0 0 0 22.62 0l9-9a24 24 0 0 0 .74-33.18l19.75-19.87A35.75 35.75 0 0 0 224 67.3M97 193a24 24 0 0 1-24 6a8 8 0 0 0-5.55.31l-18.1 7.91L57 189.41a8 8 0 0 0 .25-5.75A23.88 23.88 0 0 1 63 159l51-51l33.94 34ZM202.13 82l-25.37 25.52a8 8 0 0 0 0 11.3l4.89 4.89a8 8 0 0 1 0 11.32l-9 9L112 83.26l9-9a8 8 0 0 1 11.31 0l4.89 4.89a8 8 0 0 0 5.65 2.34a8 8 0 0 0 5.66-2.36l24.94-25.09c7.81-7.82 20.5-8.18 28.29-.81a20 20 0 0 1 .39 28.7Z"/></g></svg>
      </button>
      <input class="cp_input" value="#ff0000" autocomplete="false" spellcheck="false" />
      <button class="cp_action cp_clear">
        <!-- prettier-ignore -->
        <svg class="cp_icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M224 56v144a8 8 0 0 1-8 8H68.53a8 8 0 0 1-6.86-3.88L16 128l45.67-76.12A8 8 0 0 1 68.53 48H216a8 8 0 0 1 8 8" opacity="0.2"/><path d="M216 40H68.53a16.08 16.08 0 0 0-13.72 7.77L9.14 123.88a8 8 0 0 0 0 8.24l45.67 76.11A16.08 16.08 0 0 0 68.53 216H216a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M61.67 204.12l6.86-4.12ZM216 200H68.53l-43.2-72l43.2-72H216Zm-109.66-53.66L124.69 128l-18.35-18.34a8 8 0 0 1 11.32-11.32L136 116.69l18.34-18.35a8 8 0 0 1 11.32 11.32L147.31 128l18.35 18.34a8 8 0 0 1-11.32 11.32L136 139.31l-18.34 18.35a8 8 0 0 1-11.32-11.32"/></g></svg>
      </button>
      <button class="cp_action cp_submit">
        <!-- prettier-ignore -->
        <svg class="cp_icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="m237.66 85.26l-128.4 128.4a8 8 0 0 1-11.32 0l-71.6-72a8 8 0 0 1 0-11.31l24-24a8 8 0 0 1 11.32 0L104 147.43l98.34-97.09a8 8 0 0 1 11.32 0l24 23.6a8 8 0 0 1 0 11.32" opacity="0.2"/><path d="m243.28 68.24l-24-23.56a16 16 0 0 0-22.59 0L104 136.23l-36.69-35.6a16 16 0 0 0-22.58.05l-24 24a16 16 0 0 0 0 22.61l71.62 72a16 16 0 0 0 22.63 0L243.33 90.91a16 16 0 0 0-.05-22.67M103.62 208L32 136l24-24a.6.6 0 0 1 .08.08l42.35 41.09a8 8 0 0 0 11.19 0L208.06 56L232 79.6Z"/></g></svg>
      </button>
    </div>
  </div>
</div>
`;
class ln extends gt.EventEmitter {
  /**
   * Create a new ColorPicker instance.
   * @param $from The element or query to bind to. (leave null to create one)
   * @param config The picker configuration.
   */
  constructor(r, n = {}) {
    var s;
    super();
    E(this, "_open", !1);
    E(this, "_unset", !0);
    E(this, "_format");
    E(this, "_color");
    E(this, "_appliedColor");
    E(this, "config");
    E(this, "popper");
    E(this, "$root");
    E(this, "$dialog");
    E(this, "$button");
    E(this, "$input");
    E(this, "hsvSlider");
    E(this, "hueSlider");
    E(this, "alphaSlider");
    E(this, "$formats");
    E(this, "$colorInput");
    if (this.config = { ...on, ...n }, r ? typeof r == "string" && (r = document.querySelector(r)) : r = document.createElement("div"), !r) throw new Error("Element is null.");
    r instanceof HTMLInputElement ? this.$input = r : r instanceof HTMLButtonElement ? this.$button = r : this.$root = r, this.$root || (this.$root = document.createElement("div"), r.insertAdjacentElement("beforebegin", this.$root), (s = r.parentElement) == null || s.removeChild(r)), this.$root.classList.add("cp_root"), this.$button = this.$button ?? document.createElement("button"), this.$button.classList.add("cp_toggle"), this.$input = this.$input ?? document.createElement("input"), this.$input.tabIndex = -1;
    const i = document.createElement("div");
    i.className = "cp_caret", i.innerHTML = sn, this.$root.append(this.$button), this.$button.append(this.$input, i), this.$root.insertAdjacentHTML("afterbegin", an), this.$dialog = this.$root.querySelector(".cp_dialog"), this.$colorInput = this.$root.querySelector(".cp_input"), this.close(), this.populateDialog(), this.bindDialog(), this.setFormat(this.config.defaultFormat, !1);
    const o = this.config.defaultColor ?? this.$input.value;
    this._setAppliedColor(new I(o), !1), o || this.clear(!1), this.$root.style.setProperty("--cp-delay", `${this.config.animationDuration}ms`), this.config.toggleStyle === "input" && this.$button.classList.add("cp_wide"), this.$button.addEventListener("click", () => this.toggle()), this.config.dismissOnOutsideClick && window.addEventListener("pointerdown", (c) => {
      if (!this._open) return;
      c.target.closest(".cp_root") || this.close();
    }), this.config.dismissOnEscape && window.addEventListener("keydown", (c) => {
      if (!this._open || c.key !== "Escape") return;
      const a = document.querySelector(":focus");
      (!a || a.closest(".cp_root")) && this.close();
    });
  }
  /**
   * Get whether the dialog is currently open.
   */
  get isOpen() {
    return this._open;
  }
  /**
   * Get the picked color.
   */
  get color() {
    return this._unset ? null : this._appliedColor;
  }
  /**
   * Get the color currently selected in the dialog.
   */
  get selectedColor() {
    return this._color;
  }
  /**
   * Get the color output format.
   */
  get format() {
    return this._format;
  }
  /**
   * Get the root element for this picker.
   */
  get element() {
    return this.$root;
  }
  /**
   * Get the input the picker is bound to.
   */
  get input() {
    return this.$input;
  }
  /**
   * Toggle whether the picker dialog is opened.
   * @param value Force open or closed?
   * @param emit Emit event?
   */
  toggle(r = !this._open, n = !0) {
    r ? this.open(n) : this.close(n);
  }
  /**
   * Open the picker dialog.
   * @param emit Emit event?
   */
  open(r = !0) {
    var n;
    this._open = !0, (n = window.cp_openPicker) == null || n.close(), window.cp_openPicker = this, this.$dialog.style.removeProperty("display"), setTimeout(() => this.$root.classList.add("cp_open")), this.popper = Zr(this.$button, this.$dialog, {
      placement: "top",
      strategy: "absolute",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8]
          }
        }
      ]
    }), r && this.emit("open");
  }
  populateDialog() {
    if (this.config.swatches) {
      const r = this.config.swatches.map((n) => {
        const i = document.createElement("button");
        i.className = "cp_swatch", i.style.setProperty("--cp-color", n), i.dataset.color = n;
        const o = new I(i.dataset.color);
        return i.addEventListener("click", () => this._setColor(o)), i;
      });
      this.$root.querySelector(".cp_swatches").append(...r);
    }
    this.config.formats && (this.$formats = this.config.formats.map((r) => {
      const n = document.createElement("button");
      return n.className = "cp_format", n.dataset.format = r, n.textContent = r.toUpperCase(), n.addEventListener("click", () => this.setFormat(r)), n;
    }), this.$root.querySelector(".cp_formats").append(...this.$formats));
  }
  bindDialog() {
    const r = this.$root.querySelector(".cp_area-hsv");
    this.hsvSlider = new De(r), this.hsvSlider.on("drag", (a, u) => {
      this._setColor(this._color.saturation(a).value(1 - u));
    });
    const n = this.$root.querySelector(".cp_slider-hue");
    this.hueSlider = new De(n), this.hueSlider.on("drag", (a) => {
      this._setColor(this._color.hue(a * 360));
    });
    const i = this.$root.querySelector(".cp_slider-alpha");
    this.config.enableAlpha ? (this.alphaSlider = new De(i), this.alphaSlider.on("drag", (a) => {
      this._setColor(this._color.alpha(a), !0);
    })) : i.remove(), this.$colorInput.addEventListener("input", () => {
      try {
        const { color: a, format: u } = At(this.$colorInput.value);
        this.setFormat(u, !1), this._setColor(new I(a), !1);
      } catch {
      }
    });
    const o = this.$root.querySelector(".cp_eyedrop");
    this.config.enableEyedropper && "EyeDropper" in window ? o.addEventListener("click", () => {
      new EyeDropper().open().then((a) => {
        const u = new I(a.sRGBHex);
        this._setColor(u);
      }).catch(() => {
      });
    }) : o.remove();
    const s = this.$root.querySelector(".cp_submit");
    this.config.showSubmitButton ? s.addEventListener("click", () => {
      this._setAppliedColor(this._color), this.close();
    }) : s.remove();
    const c = this.$root.querySelector(".cp_clear");
    this.config.showClearButton ? c.addEventListener("click", () => {
      this.clear(), this.close();
    }) : c.remove();
  }
  /**
   * Close the picker dialog.
   * @param emit Emit event?
   */
  close(r = !0) {
    this._open = !1, window.cp_openPicker = void 0, this.$root.classList.remove("cp_open"), setTimeout(() => {
      var n;
      this.$dialog.style.display = "none", (n = this.popper) == null || n.destroy(), this.popper = void 0;
    }, this.config.animationDuration), r && this.emit("close");
  }
  /**
   * Clear the picker color value.
   * @param emit Emit event?
   */
  clear(r = !0) {
    this._unset = !0, this.updateAppliedColor(r);
  }
  /**
   * Set the picker color value.
   * @param color The new color value.
   * @param emit Emit event?
   */
  setColor(r, n = !0) {
    if (!r) return this.clear(n);
    this._setAppliedColor(new I(r), n);
  }
  /**
   * Set the picker color format.
   * @param format The color format.
   * @param update Update colors?
   */
  setFormat(r, n = !0) {
    this._format = r, this.updateFormat(), n && (this.updateColor(), this.updateAppliedColor());
  }
  _setColor(r, n = !0) {
    if (this.config.commitMode === "instant")
      return this._setAppliedColor(r);
    this._color = r, this.updateColor(n);
  }
  _setAppliedColor(r, n = !0) {
    this._unset = !1, this._color = r, this._appliedColor = r, this.updateColor(!0), this.updateAppliedColor(n);
  }
  updateColor(r = !0) {
    var n;
    this.$root.style.setProperty("--cp-color", this._color.toString()), this.$root.style.setProperty("--cp-hue", this._color.hue().toString()), this.$root.style.setProperty("--cp-alpha", this._color.alpha().toString()), this.hsvSlider.moveThumb(this._color.saturation(), 1 - this._color.value()), this.hueSlider.moveThumb(this._color.hue() / 360), (n = this.alphaSlider) == null || n.moveThumb(this._color.alpha()), r && (this.$colorInput.value = this._color.string(this._format));
  }
  updateAppliedColor(r = !0) {
    var i;
    this.$root.classList.toggle("cp_unset", this._unset), this.$root.style.setProperty("--cp-applied", ((i = this.color) == null ? void 0 : i.toString()) ?? "transparent");
    const n = this._appliedColor.string(this._format);
    this.$input.value = this._unset ? "-" : n, r && this.emit("pick", this.color);
  }
  updateFormat() {
    if (!this.$formats) return;
    this.$formats.forEach((n) => n.removeAttribute("aria-checked"));
    const r = this.$formats.find((n) => n.dataset.format === this._format);
    r && (r.ariaChecked = "true");
  }
}
export {
  ln as ColorPicker
};
