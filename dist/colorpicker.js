var Tt = Object.defineProperty;
var Bt = (t, e, r) => e in t ? Tt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var _ = (t, e, r) => Bt(t, typeof e != "symbol" ? e + "" : e, r);
function Nt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Re = { exports: {} }, te = typeof Reflect == "object" ? Reflect : null, Je = te && typeof te.apply == "function" ? te.apply : function(e, r, n) {
  return Function.prototype.apply.call(e, r, n);
}, Oe;
te && typeof te.ownKeys == "function" ? Oe = te.ownKeys : Object.getOwnPropertySymbols ? Oe = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Oe = function(e) {
  return Object.getOwnPropertyNames(e);
};
function Ht(t) {
  console && console.warn && console.warn(t);
}
var ut = Number.isNaN || function(e) {
  return e !== e;
};
function w() {
  w.init.call(this);
}
Re.exports = w;
Re.exports.once = It;
w.EventEmitter = w;
w.prototype._events = void 0;
w.prototype._eventsCount = 0;
w.prototype._maxListeners = void 0;
var Qe = 10;
function Le(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
Object.defineProperty(w, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Qe;
  },
  set: function(t) {
    if (typeof t != "number" || t < 0 || ut(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Qe = t;
  }
});
w.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
w.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || ut(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function ft(t) {
  return t._maxListeners === void 0 ? w.defaultMaxListeners : t._maxListeners;
}
w.prototype.getMaxListeners = function() {
  return ft(this);
};
w.prototype.emit = function(e) {
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
    var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw a.context = s, a;
  }
  var l = o[e];
  if (l === void 0)
    return !1;
  if (typeof l == "function")
    Je(l, this, r);
  else
    for (var u = l.length, c = gt(l, u), n = 0; n < u; ++n)
      Je(c[n], this, r);
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
  else if (typeof s == "function" ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), i = ft(t), i > 0 && s.length > i && !s.warned) {
    s.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = t, a.type = e, a.count = s.length, Ht(a);
  }
  return t;
}
w.prototype.addListener = function(e, r) {
  return pt(this, e, r, !1);
};
w.prototype.on = w.prototype.addListener;
w.prototype.prependListener = function(e, r) {
  return pt(this, e, r, !0);
};
function Wt() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function dt(t, e, r) {
  var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r }, i = Wt.bind(n);
  return i.listener = r, n.wrapFn = i, i;
}
w.prototype.once = function(e, r) {
  return Le(r), this.on(e, dt(this, e, r)), this;
};
w.prototype.prependOnceListener = function(e, r) {
  return Le(r), this.prependListener(e, dt(this, e, r)), this;
};
w.prototype.removeListener = function(e, r) {
  var n, i, o, s, a;
  if (Le(r), i = this._events, i === void 0)
    return this;
  if (n = i[e], n === void 0)
    return this;
  if (n === r || n.listener === r)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || r));
  else if (typeof n != "function") {
    for (o = -1, s = n.length - 1; s >= 0; s--)
      if (n[s] === r || n[s].listener === r) {
        a = n[s].listener, o = s;
        break;
      }
    if (o < 0)
      return this;
    o === 0 ? n.shift() : Ft(n, o), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, a || r);
  }
  return this;
};
w.prototype.off = w.prototype.removeListener;
w.prototype.removeAllListeners = function(e) {
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
function ht(t, e, r) {
  var n = t._events;
  if (n === void 0)
    return [];
  var i = n[e];
  return i === void 0 ? [] : typeof i == "function" ? r ? [i.listener || i] : [i] : r ? qt(i) : gt(i, i.length);
}
w.prototype.listeners = function(e) {
  return ht(this, e, !0);
};
w.prototype.rawListeners = function(e) {
  return ht(this, e, !1);
};
w.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : vt.call(t, e);
};
w.prototype.listenerCount = vt;
function vt(t) {
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
w.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Oe(this._events) : [];
};
function gt(t, e) {
  for (var r = new Array(e), n = 0; n < e; ++n)
    r[n] = t[n];
  return r;
}
function Ft(t, e) {
  for (; e + 1 < t.length; e++)
    t[e] = t[e + 1];
  t.pop();
}
function qt(t) {
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
    mt(t, e, o, { once: !0 }), e !== "error" && Vt(t, i, { once: !0 });
  });
}
function Vt(t, e, r) {
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
var yt = Re.exports;
const Xt = /* @__PURE__ */ Nt(yt);
var k = "top", T = "bottom", B = "right", j = "left", Te = "auto", he = [k, T, B, j], re = "start", pe = "end", Ut = "clippingParents", wt = "viewport", le = "popper", Yt = "reference", et = /* @__PURE__ */ he.reduce(function(t, e) {
  return t.concat([e + "-" + re, e + "-" + pe]);
}, []), bt = /* @__PURE__ */ [].concat(he, [Te]).reduce(function(t, e) {
  return t.concat([e, e + "-" + re, e + "-" + pe]);
}, []), zt = "beforeRead", Kt = "read", Zt = "afterRead", Gt = "beforeMain", Jt = "main", Qt = "afterMain", er = "beforeWrite", tr = "write", rr = "afterWrite", nr = [zt, Kt, Zt, Gt, Jt, Qt, er, tr, rr];
function F(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function D(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function J(t) {
  var e = D(t).Element;
  return t instanceof e || t instanceof Element;
}
function R(t) {
  var e = D(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Be(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = D(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ir(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, i = e.attributes[r] || {}, o = e.elements[r];
    !R(o) || !F(o) || (Object.assign(o.style, n), Object.keys(i).forEach(function(s) {
      var a = i[s];
      a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function or(t) {
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
      var i = e.elements[n], o = e.attributes[n] || {}, s = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]), a = s.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !R(i) || !F(i) || (Object.assign(i.style, a), Object.keys(o).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const sr = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ir,
  effect: or,
  requires: ["computeStyles"]
};
function W(t) {
  return t.split("-")[0];
}
var G = Math.max, Ce = Math.min, ne = Math.round;
function Me() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function xt() {
  return !/^((?!chrome|android).)*safari/i.test(Me());
}
function ie(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), i = 1, o = 1;
  e && R(t) && (i = t.offsetWidth > 0 && ne(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && ne(n.height) / t.offsetHeight || 1);
  var s = J(t) ? D(t) : window, a = s.visualViewport, l = !xt() && r, u = (n.left + (l && a ? a.offsetLeft : 0)) / i, c = (n.top + (l && a ? a.offsetTop : 0)) / o, d = n.width / i, g = n.height / o;
  return {
    width: d,
    height: g,
    top: c,
    right: u + d,
    bottom: c + g,
    left: u,
    x: u,
    y: c
  };
}
function Ne(t) {
  var e = ie(t), r = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: n
  };
}
function Ot(t, e) {
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
function I(t) {
  return D(t).getComputedStyle(t);
}
function ar(t) {
  return ["table", "td", "th"].indexOf(F(t)) >= 0;
}
function X(t) {
  return ((J(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function _e(t) {
  return F(t) === "html" ? t : (
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
function tt(t) {
  return !R(t) || // https://github.com/popperjs/popper-core/issues/837
  I(t).position === "fixed" ? null : t.offsetParent;
}
function lr(t) {
  var e = /firefox/i.test(Me()), r = /Trident/i.test(Me());
  if (r && R(t)) {
    var n = I(t);
    if (n.position === "fixed")
      return null;
  }
  var i = _e(t);
  for (Be(i) && (i = i.host); R(i) && ["html", "body"].indexOf(F(i)) < 0; ) {
    var o = I(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ve(t) {
  for (var e = D(t), r = tt(t); r && ar(r) && I(r).position === "static"; )
    r = tt(r);
  return r && (F(r) === "html" || F(r) === "body" && I(r).position === "static") ? e : r || lr(t) || e;
}
function He(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ue(t, e, r) {
  return G(t, Ce(e, r));
}
function cr(t, e, r) {
  var n = ue(t, e, r);
  return n > r ? r : n;
}
function $t() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ct(t) {
  return Object.assign({}, $t(), t);
}
function Lt(t, e) {
  return e.reduce(function(r, n) {
    return r[n] = t, r;
  }, {});
}
var ur = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, Ct(typeof e != "number" ? e : Lt(e, he));
};
function fr(t) {
  var e, r = t.state, n = t.name, i = t.options, o = r.elements.arrow, s = r.modifiersData.popperOffsets, a = W(r.placement), l = He(a), u = [j, B].indexOf(a) >= 0, c = u ? "height" : "width";
  if (!(!o || !s)) {
    var d = ur(i.padding, r), g = Ne(o), f = l === "y" ? k : j, x = l === "y" ? T : B, v = r.rects.reference[c] + r.rects.reference[l] - s[l] - r.rects.popper[c], h = s[l] - r.rects.reference[l], b = ve(o), $ = b ? l === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, C = v / 2 - h / 2, p = d[f], m = $ - g[c] - d[x], y = $ / 2 - g[c] / 2 + C, O = ue(p, y, m), A = l;
    r.modifiersData[n] = (e = {}, e[A] = O, e.centerOffset = O - y, e);
  }
}
function pr(t) {
  var e = t.state, r = t.options, n = r.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Ot(e.elements.popper, i) && (e.elements.arrow = i));
}
const dr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: fr,
  effect: pr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function oe(t) {
  return t.split("-")[1];
}
var hr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function vr(t, e) {
  var r = t.x, n = t.y, i = e.devicePixelRatio || 1;
  return {
    x: ne(r * i) / i || 0,
    y: ne(n * i) / i || 0
  };
}
function rt(t) {
  var e, r = t.popper, n = t.popperRect, i = t.placement, o = t.variation, s = t.offsets, a = t.position, l = t.gpuAcceleration, u = t.adaptive, c = t.roundOffsets, d = t.isFixed, g = s.x, f = g === void 0 ? 0 : g, x = s.y, v = x === void 0 ? 0 : x, h = typeof c == "function" ? c({
    x: f,
    y: v
  }) : {
    x: f,
    y: v
  };
  f = h.x, v = h.y;
  var b = s.hasOwnProperty("x"), $ = s.hasOwnProperty("y"), C = j, p = k, m = window;
  if (u) {
    var y = ve(r), O = "clientHeight", A = "clientWidth";
    if (y === D(r) && (y = X(r), I(y).position !== "static" && a === "absolute" && (O = "scrollHeight", A = "scrollWidth")), y = y, i === k || (i === j || i === B) && o === pe) {
      p = T;
      var E = d && y === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        y[O]
      );
      v -= E - n.height, v *= l ? 1 : -1;
    }
    if (i === j || (i === k || i === T) && o === pe) {
      C = B;
      var L = d && y === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        y[A]
      );
      f -= L - n.width, f *= l ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: a
  }, u && hr), N = c === !0 ? vr({
    x: f,
    y: v
  }, D(r)) : {
    x: f,
    y: v
  };
  if (f = N.x, v = N.y, l) {
    var P;
    return Object.assign({}, S, (P = {}, P[p] = $ ? "0" : "", P[C] = b ? "0" : "", P.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + v + "px)" : "translate3d(" + f + "px, " + v + "px, 0)", P));
  }
  return Object.assign({}, S, (e = {}, e[p] = $ ? v + "px" : "", e[C] = b ? f + "px" : "", e.transform = "", e));
}
function gr(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, i = n === void 0 ? !0 : n, o = r.adaptive, s = o === void 0 ? !0 : o, a = r.roundOffsets, l = a === void 0 ? !0 : a, u = {
    placement: W(e.placement),
    variation: oe(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, rt(Object.assign({}, u, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, rt(Object.assign({}, u, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const mr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: gr,
  data: {}
};
var xe = {
  passive: !0
};
function yr(t) {
  var e = t.state, r = t.instance, n = t.options, i = n.scroll, o = i === void 0 ? !0 : i, s = n.resize, a = s === void 0 ? !0 : s, l = D(e.elements.popper), u = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && u.forEach(function(c) {
    c.addEventListener("scroll", r.update, xe);
  }), a && l.addEventListener("resize", r.update, xe), function() {
    o && u.forEach(function(c) {
      c.removeEventListener("scroll", r.update, xe);
    }), a && l.removeEventListener("resize", r.update, xe);
  };
}
const wr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: yr,
  data: {}
};
var br = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function $e(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return br[e];
  });
}
var xr = {
  start: "end",
  end: "start"
};
function nt(t) {
  return t.replace(/start|end/g, function(e) {
    return xr[e];
  });
}
function We(t) {
  var e = D(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Fe(t) {
  return ie(X(t)).left + We(t).scrollLeft;
}
function Or(t, e) {
  var r = D(t), n = X(t), i = r.visualViewport, o = n.clientWidth, s = n.clientHeight, a = 0, l = 0;
  if (i) {
    o = i.width, s = i.height;
    var u = xt();
    (u || !u && e === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: a + Fe(t),
    y: l
  };
}
function $r(t) {
  var e, r = X(t), n = We(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, o = G(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = G(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -n.scrollLeft + Fe(t), l = -n.scrollTop;
  return I(i || r).direction === "rtl" && (a += G(r.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function qe(t) {
  var e = I(t), r = e.overflow, n = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + i + n);
}
function _t(t) {
  return ["html", "body", "#document"].indexOf(F(t)) >= 0 ? t.ownerDocument.body : R(t) && qe(t) ? t : _t(_e(t));
}
function fe(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = _t(t), i = n === ((r = t.ownerDocument) == null ? void 0 : r.body), o = D(n), s = i ? [o].concat(o.visualViewport || [], qe(n) ? n : []) : n, a = e.concat(s);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(fe(_e(s)))
  );
}
function De(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Cr(t, e) {
  var r = ie(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function it(t, e, r) {
  return e === wt ? De(Or(t, r)) : J(e) ? Cr(e, r) : De($r(X(t)));
}
function Lr(t) {
  var e = fe(_e(t)), r = ["absolute", "fixed"].indexOf(I(t).position) >= 0, n = r && R(t) ? ve(t) : t;
  return J(n) ? e.filter(function(i) {
    return J(i) && Ot(i, n) && F(i) !== "body";
  }) : [];
}
function _r(t, e, r, n) {
  var i = e === "clippingParents" ? Lr(t) : [].concat(e), o = [].concat(i, [r]), s = o[0], a = o.reduce(function(l, u) {
    var c = it(t, u, n);
    return l.top = G(c.top, l.top), l.right = Ce(c.right, l.right), l.bottom = Ce(c.bottom, l.bottom), l.left = G(c.left, l.left), l;
  }, it(t, s, n));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Et(t) {
  var e = t.reference, r = t.element, n = t.placement, i = n ? W(n) : null, o = n ? oe(n) : null, s = e.x + e.width / 2 - r.width / 2, a = e.y + e.height / 2 - r.height / 2, l;
  switch (i) {
    case k:
      l = {
        x: s,
        y: e.y - r.height
      };
      break;
    case T:
      l = {
        x: s,
        y: e.y + e.height
      };
      break;
    case B:
      l = {
        x: e.x + e.width,
        y: a
      };
      break;
    case j:
      l = {
        x: e.x - r.width,
        y: a
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var u = i ? He(i) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (o) {
      case re:
        l[u] = l[u] - (e[c] / 2 - r[c] / 2);
        break;
      case pe:
        l[u] = l[u] + (e[c] / 2 - r[c] / 2);
        break;
    }
  }
  return l;
}
function de(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, i = n === void 0 ? t.placement : n, o = r.strategy, s = o === void 0 ? t.strategy : o, a = r.boundary, l = a === void 0 ? Ut : a, u = r.rootBoundary, c = u === void 0 ? wt : u, d = r.elementContext, g = d === void 0 ? le : d, f = r.altBoundary, x = f === void 0 ? !1 : f, v = r.padding, h = v === void 0 ? 0 : v, b = Ct(typeof h != "number" ? h : Lt(h, he)), $ = g === le ? Yt : le, C = t.rects.popper, p = t.elements[x ? $ : g], m = _r(J(p) ? p : p.contextElement || X(t.elements.popper), l, c, s), y = ie(t.elements.reference), O = Et({
    reference: y,
    element: C,
    strategy: "absolute",
    placement: i
  }), A = De(Object.assign({}, C, O)), E = g === le ? A : y, L = {
    top: m.top - E.top + b.top,
    bottom: E.bottom - m.bottom + b.bottom,
    left: m.left - E.left + b.left,
    right: E.right - m.right + b.right
  }, S = t.modifiersData.offset;
  if (g === le && S) {
    var N = S[i];
    Object.keys(L).forEach(function(P) {
      var U = [B, T].indexOf(P) >= 0 ? 1 : -1, Y = [k, T].indexOf(P) >= 0 ? "y" : "x";
      L[P] += N[Y] * U;
    });
  }
  return L;
}
function Er(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, i = r.boundary, o = r.rootBoundary, s = r.padding, a = r.flipVariations, l = r.allowedAutoPlacements, u = l === void 0 ? bt : l, c = oe(n), d = c ? a ? et : et.filter(function(x) {
    return oe(x) === c;
  }) : he, g = d.filter(function(x) {
    return u.indexOf(x) >= 0;
  });
  g.length === 0 && (g = d);
  var f = g.reduce(function(x, v) {
    return x[v] = de(t, {
      placement: v,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[W(v)], x;
  }, {});
  return Object.keys(f).sort(function(x, v) {
    return f[x] - f[v];
  });
}
function Ar(t) {
  if (W(t) === Te)
    return [];
  var e = $e(t);
  return [nt(t), e, nt(e)];
}
function Sr(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var i = r.mainAxis, o = i === void 0 ? !0 : i, s = r.altAxis, a = s === void 0 ? !0 : s, l = r.fallbackPlacements, u = r.padding, c = r.boundary, d = r.rootBoundary, g = r.altBoundary, f = r.flipVariations, x = f === void 0 ? !0 : f, v = r.allowedAutoPlacements, h = e.options.placement, b = W(h), $ = b === h, C = l || ($ || !x ? [$e(h)] : Ar(h)), p = [h].concat(C).reduce(function(Q, V) {
      return Q.concat(W(V) === Te ? Er(e, {
        placement: V,
        boundary: c,
        rootBoundary: d,
        padding: u,
        flipVariations: x,
        allowedAutoPlacements: v
      }) : V);
    }, []), m = e.rects.reference, y = e.rects.popper, O = /* @__PURE__ */ new Map(), A = !0, E = p[0], L = 0; L < p.length; L++) {
      var S = p[L], N = W(S), P = oe(S) === re, U = [k, T].indexOf(N) >= 0, Y = U ? "width" : "height", M = de(e, {
        placement: S,
        boundary: c,
        rootBoundary: d,
        altBoundary: g,
        padding: u
      }), H = U ? P ? B : j : P ? T : k;
      m[Y] > y[Y] && (H = $e(H));
      var ge = $e(H), z = [];
      if (o && z.push(M[N] <= 0), a && z.push(M[H] <= 0, M[ge] <= 0), z.every(function(Q) {
        return Q;
      })) {
        E = S, A = !1;
        break;
      }
      O.set(S, z);
    }
    if (A)
      for (var me = x ? 3 : 1, Ee = function(V) {
        var ae = p.find(function(we) {
          var K = O.get(we);
          if (K)
            return K.slice(0, V).every(function(Ae) {
              return Ae;
            });
        });
        if (ae)
          return E = ae, "break";
      }, se = me; se > 0; se--) {
        var ye = Ee(se);
        if (ye === "break") break;
      }
    e.placement !== E && (e.modifiersData[n]._skip = !0, e.placement = E, e.reset = !0);
  }
}
const Pr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Sr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ot(t, e, r) {
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
function st(t) {
  return [k, B, T, j].some(function(e) {
    return t[e] >= 0;
  });
}
function kr(t) {
  var e = t.state, r = t.name, n = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, s = de(e, {
    elementContext: "reference"
  }), a = de(e, {
    altBoundary: !0
  }), l = ot(s, n), u = ot(a, i, o), c = st(l), d = st(u);
  e.modifiersData[r] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": d
  });
}
const jr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: kr
};
function Mr(t, e, r) {
  var n = W(t), i = [j, k].indexOf(n) >= 0 ? -1 : 1, o = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, s = o[0], a = o[1];
  return s = s || 0, a = (a || 0) * i, [j, B].indexOf(n) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function Dr(t) {
  var e = t.state, r = t.options, n = t.name, i = r.offset, o = i === void 0 ? [0, 0] : i, s = bt.reduce(function(c, d) {
    return c[d] = Mr(d, e.rects, o), c;
  }, {}), a = s[e.placement], l = a.x, u = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += u), e.modifiersData[n] = s;
}
const Rr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Dr
};
function Tr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = Et({
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
  fn: Tr,
  data: {}
};
function Nr(t) {
  return t === "x" ? "y" : "x";
}
function Hr(t) {
  var e = t.state, r = t.options, n = t.name, i = r.mainAxis, o = i === void 0 ? !0 : i, s = r.altAxis, a = s === void 0 ? !1 : s, l = r.boundary, u = r.rootBoundary, c = r.altBoundary, d = r.padding, g = r.tether, f = g === void 0 ? !0 : g, x = r.tetherOffset, v = x === void 0 ? 0 : x, h = de(e, {
    boundary: l,
    rootBoundary: u,
    padding: d,
    altBoundary: c
  }), b = W(e.placement), $ = oe(e.placement), C = !$, p = He(b), m = Nr(p), y = e.modifiersData.popperOffsets, O = e.rects.reference, A = e.rects.popper, E = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, L = typeof E == "number" ? {
    mainAxis: E,
    altAxis: E
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, E), S = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, N = {
    x: 0,
    y: 0
  };
  if (y) {
    if (o) {
      var P, U = p === "y" ? k : j, Y = p === "y" ? T : B, M = p === "y" ? "height" : "width", H = y[p], ge = H + h[U], z = H - h[Y], me = f ? -A[M] / 2 : 0, Ee = $ === re ? O[M] : A[M], se = $ === re ? -A[M] : -O[M], ye = e.elements.arrow, Q = f && ye ? Ne(ye) : {
        width: 0,
        height: 0
      }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : $t(), ae = V[U], we = V[Y], K = ue(0, O[M], Q[M]), Ae = C ? O[M] / 2 - me - K - ae - L.mainAxis : Ee - K - ae - L.mainAxis, Pt = C ? -O[M] / 2 + me + K + we + L.mainAxis : se + K + we + L.mainAxis, Se = e.elements.arrow && ve(e.elements.arrow), kt = Se ? p === "y" ? Se.clientTop || 0 : Se.clientLeft || 0 : 0, Ie = (P = S == null ? void 0 : S[p]) != null ? P : 0, jt = H + Ae - Ie - kt, Mt = H + Pt - Ie, Ve = ue(f ? Ce(ge, jt) : ge, H, f ? G(z, Mt) : z);
      y[p] = Ve, N[p] = Ve - H;
    }
    if (a) {
      var Xe, Dt = p === "x" ? k : j, Rt = p === "x" ? T : B, Z = y[m], be = m === "y" ? "height" : "width", Ue = Z + h[Dt], Ye = Z - h[Rt], Pe = [k, j].indexOf(b) !== -1, ze = (Xe = S == null ? void 0 : S[m]) != null ? Xe : 0, Ke = Pe ? Ue : Z - O[be] - A[be] - ze + L.altAxis, Ze = Pe ? Z + O[be] + A[be] - ze - L.altAxis : Ye, Ge = f && Pe ? cr(Ke, Z, Ze) : ue(f ? Ke : Ue, Z, f ? Ze : Ye);
      y[m] = Ge, N[m] = Ge - Z;
    }
    e.modifiersData[n] = N;
  }
}
const Wr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Hr,
  requiresIfExists: ["offset"]
};
function Fr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function qr(t) {
  return t === D(t) || !R(t) ? We(t) : Fr(t);
}
function Ir(t) {
  var e = t.getBoundingClientRect(), r = ne(e.width) / t.offsetWidth || 1, n = ne(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Vr(t, e, r) {
  r === void 0 && (r = !1);
  var n = R(e), i = R(e) && Ir(e), o = X(e), s = ie(t, i, r), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((F(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  qe(o)) && (a = qr(e)), R(e) ? (l = ie(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : o && (l.x = Fe(o))), {
    x: s.left + a.scrollLeft - l.x,
    y: s.top + a.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function Xr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(o) {
    e.set(o.name, o);
  });
  function i(o) {
    r.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(a) {
      if (!r.has(a)) {
        var l = e.get(a);
        l && i(l);
      }
    }), n.push(o);
  }
  return t.forEach(function(o) {
    r.has(o.name) || i(o);
  }), n;
}
function Ur(t) {
  var e = Xr(t);
  return nr.reduce(function(r, n) {
    return r.concat(e.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Yr(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function zr(t) {
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
var at = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function lt() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Kr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, i = e.defaultOptions, o = i === void 0 ? at : i;
  return function(a, l, u) {
    u === void 0 && (u = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, at, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, d = [], g = !1, f = {
      state: c,
      setOptions: function(b) {
        var $ = typeof b == "function" ? b(c.options) : b;
        v(), c.options = Object.assign({}, o, c.options, $), c.scrollParents = {
          reference: J(a) ? fe(a) : a.contextElement ? fe(a.contextElement) : [],
          popper: fe(l)
        };
        var C = Ur(zr([].concat(n, c.options.modifiers)));
        return c.orderedModifiers = C.filter(function(p) {
          return p.enabled;
        }), x(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var b = c.elements, $ = b.reference, C = b.popper;
          if (lt($, C)) {
            c.rects = {
              reference: Vr($, ve(C), c.options.strategy === "fixed"),
              popper: Ne(C)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(L) {
              return c.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var p = 0; p < c.orderedModifiers.length; p++) {
              if (c.reset === !0) {
                c.reset = !1, p = -1;
                continue;
              }
              var m = c.orderedModifiers[p], y = m.fn, O = m.options, A = O === void 0 ? {} : O, E = m.name;
              typeof y == "function" && (c = y({
                state: c,
                options: A,
                name: E,
                instance: f
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Yr(function() {
        return new Promise(function(h) {
          f.forceUpdate(), h(c);
        });
      }),
      destroy: function() {
        v(), g = !0;
      }
    };
    if (!lt(a, l))
      return f;
    f.setOptions(u).then(function(h) {
      !g && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function x() {
      c.orderedModifiers.forEach(function(h) {
        var b = h.name, $ = h.options, C = $ === void 0 ? {} : $, p = h.effect;
        if (typeof p == "function") {
          var m = p({
            state: c,
            name: b,
            instance: f,
            options: C
          }), y = function() {
          };
          d.push(m || y);
        }
      });
    }
    function v() {
      d.forEach(function(h) {
        return h();
      }), d = [];
    }
    return f;
  };
}
var Zr = [wr, Br, mr, sr, Rr, Pr, Wr, dr, jr], Gr = /* @__PURE__ */ Kr({
  defaultModifiers: Zr
});
const Jr = ([t, e, r, n]) => {
  const i = Math.max(t, e, r), o = i - Math.min(t, e, r), s = o && (i == t ? (e - r) / o : i == e ? 2 + (r - t) / o : 4 + (t - e) / o);
  return [60 * (s < 0 ? s + 6 : s), i && o / i, i, n];
}, At = (t) => t.replace(/[^0-9%.,]/g, "").split(",").map((e) => parseFloat(e) / (e.endsWith("%") ? 100 : 1)), Qr = (t) => {
  const e = document.createElement("span");
  e.style.display = "none", e.style.color = t, document.body.append(e);
  const { color: r } = getComputedStyle(e);
  if (e.remove(), !r) return null;
  const [n, i, o, s] = At(r);
  return Jr([n / 255, i / 255, o / 255, s]);
}, en = (t) => {
  const e = At(t).map((r, n) => Math.min(r, n ? 1 : 255));
  return e.length < 3 || e.some((r) => isNaN(r)) ? null : e;
}, St = (t) => {
  let e;
  /^hsva?\(/.test(t) ? e = "hsv" : /^hsla?\(/.test(t) ? e = "hsl" : /^rgba?\(/.test(t) ? e = "rgb" : e = "hex";
  const r = e === "hsv" ? en(t) : Qr(t);
  if (!r) throw new Error("Color could not be parsed!");
  return r[3] = r[3] ?? 1, { color: r, format: e };
}, ee = (t) => t.toFixed(), tn = (t, e) => ("" + +t.toFixed(e)).replace(/^0\./g, "."), rn = ([t, e, r, n]) => {
  const i = r - r * e / 2, o = Math.min(i, 1 - i);
  return [t, o ? (r - i) / o : 0, i, n];
}, ct = ([t, e, r, n]) => {
  const i = (o, s = (o + t / 60) % 6) => r - r * e * Math.max(Math.min(s, 4 - s, 1), 0);
  return [i(5), i(3), i(1), n];
}, ke = ([t, e, r, n], i) => {
  const o = n < 1 ? "a" : "", s = i.startsWith("hs") ? [ee(t), ee(e * 100) + "%", ee(r * 100) + "%"] : [ee(t * 255), ee(e * 255), ee(r * 255)];
  return o && s.push(tn(n, 2)), `${i}${o}(${s.join()})`;
}, nn = (t) => "#" + t.slice(0, t[3] < 1 ? 4 : 3).map(
  (e) => Math.round(e * 255).toString(16).padStart(2, "0")
).join(""), on = (t, e) => e === "hsv" ? ke(t, e) : e === "hsl" ? ke(rn(t), e) : e === "rgb" ? ke(ct(t), e) : nn(ct(t));
class q {
  constructor(e) {
    _(this, "color");
    if (!e)
      this.color = [0, 0, 0, 1];
    else if (e instanceof q)
      this.color = [...e.color];
    else if (Array.isArray(e)) {
      const [r = 0, n = 0, i = 0, o = 1] = e;
      this.color = [r, n, i, o];
    } else
      this.color = St(e).color;
  }
  getSet(e, r) {
    if (r === void 0) return this.color[e];
    const n = [...this.color];
    return n[e] = r, new q(n);
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
    return on(this.color, e);
  }
  toString() {
    return this.string("hex");
  }
  clone() {
    return new q(this);
  }
}
class je extends Xt {
  constructor(r) {
    super();
    _(this, "$track");
    _(this, "$thumb");
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
const sn = {
  toggleStyle: "button",
  defaultColor: null,
  swatches: null,
  enablePreview: !1,
  enableAlpha: !0,
  enableEyedropper: !0,
  formats: ["hex", "rgb", "hsv", "hsl"],
  defaultFormat: "hex",
  commitMode: "confirm",
  showSubmitButton: !0,
  showClearButton: !0,
  dismissOnOutsideClick: !0,
  dismissOnEscape: !0,
  dialogPlacement: "top",
  dialogOffset: 8
}, an = '<div class=cp_toggle><div class=cp_caret><svg height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><path d="M208.49 120.49a12 12 0 0 1-17 0L140 69v147a12 12 0 0 1-24 0V69l-51.51 51.49a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17"fill=currentColor /></svg></div></div>', ln = '<div class=cp_dialog><div class="cp_area cp_area-hsv"><div class=cp_inner></div><div class=cp_thumb></div></div><div class=cp_dialog-inner><div class=cp_preview><div class=cp_p-current></div><div class=cp_p-new></div></div><div class="cp_slider cp_slider-hue"><div class=cp_thumb></div></div><div class="cp_slider cp_slider-alpha"><div class=cp_inner></div><div class=cp_thumb></div></div><div class=cp_swatches></div><div class=cp_formats></div><div class=cp_input-group><button class="cp_action cp_eyedrop"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="m207.8 87.6l-25.37 25.53l4.89 4.88a16 16 0 0 1 0 22.64l-9 9a8 8 0 0 1-11.32 0l-60.68-60.7a8 8 0 0 1 0-11.32l9-9a16 16 0 0 1 22.63 0l4.88 4.89l25-25.11c10.79-10.79 28.37-11.45 39.45-1a28 28 0 0 1 .52 40.19"opacity=0.2 /><path d="M224 67.3a35.8 35.8 0 0 0-11.26-25.66c-14-13.28-36.72-12.78-50.62 1.13L142.8 62.2a24 24 0 0 0-33.14.77l-9 9a16 16 0 0 0 0 22.64l2 2.06l-51 51a39.75 39.75 0 0 0-10.53 38l-8 18.41A13.68 13.68 0 0 0 36 219.3a15.92 15.92 0 0 0 17.71 3.35L71.23 215a39.89 39.89 0 0 0 37.06-10.75l51-51l2.06 2.06a16 16 0 0 0 22.62 0l9-9a24 24 0 0 0 .74-33.18l19.75-19.87A35.75 35.75 0 0 0 224 67.3M97 193a24 24 0 0 1-24 6a8 8 0 0 0-5.55.31l-18.1 7.91L57 189.41a8 8 0 0 0 .25-5.75A23.88 23.88 0 0 1 63 159l51-51l33.94 34ZM202.13 82l-25.37 25.52a8 8 0 0 0 0 11.3l4.89 4.89a8 8 0 0 1 0 11.32l-9 9L112 83.26l9-9a8 8 0 0 1 11.31 0l4.89 4.89a8 8 0 0 0 5.65 2.34a8 8 0 0 0 5.66-2.36l24.94-25.09c7.81-7.82 20.5-8.18 28.29-.81a20 20 0 0 1 .39 28.7Z"/></g></svg></button> <input autocomplete=false class=cp_input spellcheck=false value=#ff0000> <button class="cp_action cp_clear"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="M224 56v144a8 8 0 0 1-8 8H68.53a8 8 0 0 1-6.86-3.88L16 128l45.67-76.12A8 8 0 0 1 68.53 48H216a8 8 0 0 1 8 8"opacity=0.2 /><path d="M216 40H68.53a16.08 16.08 0 0 0-13.72 7.77L9.14 123.88a8 8 0 0 0 0 8.24l45.67 76.11A16.08 16.08 0 0 0 68.53 216H216a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M61.67 204.12l6.86-4.12ZM216 200H68.53l-43.2-72l43.2-72H216Zm-109.66-53.66L124.69 128l-18.35-18.34a8 8 0 0 1 11.32-11.32L136 116.69l18.34-18.35a8 8 0 0 1 11.32 11.32L147.31 128l18.35 18.34a8 8 0 0 1-11.32 11.32L136 139.31l-18.34 18.35a8 8 0 0 1-11.32-11.32"/></g></svg></button> <button class="cp_action cp_submit"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="m237.66 85.26l-128.4 128.4a8 8 0 0 1-11.32 0l-71.6-72a8 8 0 0 1 0-11.31l24-24a8 8 0 0 1 11.32 0L104 147.43l98.34-97.09a8 8 0 0 1 11.32 0l24 23.6a8 8 0 0 1 0 11.32"opacity=0.2 /><path d="m243.28 68.24l-24-23.56a16 16 0 0 0-22.59 0L104 136.23l-36.69-35.6a16 16 0 0 0-22.58.05l-24 24a16 16 0 0 0 0 22.61l71.62 72a16 16 0 0 0 22.63 0L243.33 90.91a16 16 0 0 0-.05-22.67M103.62 208L32 136l24-24a.6.6 0 0 1 .08.08l42.35 41.09a8 8 0 0 0 11.19 0L208.06 56L232 79.6Z"/></g></svg></button></div></div></div>';
let ce;
class un extends yt.EventEmitter {
  /**
   * Create a new ColorPicker instance.
   * @param $from The element or query to bind to. (leave null to create one)
   * @param config The picker configuration.
   */
  constructor(r, n = {}) {
    var o;
    super();
    _(this, "_unset", !0);
    _(this, "_format");
    _(this, "_color");
    _(this, "_newColor");
    _(this, "config");
    _(this, "popper");
    _(this, "$target");
    _(this, "$dialog");
    _(this, "$toggle");
    _(this, "$toggleText");
    _(this, "hsvSlider");
    _(this, "hueSlider");
    _(this, "alphaSlider");
    _(this, "$formats");
    _(this, "$colorInput");
    if (this.config = { ...sn, ...n }, r ? typeof r == "string" && (r = document.querySelector(r)) : r = document.createElement("button"), !r) throw new Error("Element is null.");
    this.$target = r, this.config.toggleStyle !== "hidden" && (this.$toggle = r, this.$toggle.classList.add("color-picker"), this.$toggle.innerHTML = an, this.$toggle.addEventListener("click", () => this.toggle())), this.config.toggleStyle === "input" && (this.$toggleText = document.createElement("div"), this.$toggleText.className = "cp_text", this.$target.prepend(this.$toggleText)), this.close();
    const i = this.config.defaultColor ?? ((o = this.$toggle) == null ? void 0 : o.dataset.color);
    this._setCurrentColor(new q(i), !1), i || this.clear(!1), this.config.dismissOnOutsideClick && window.addEventListener("pointerdown", (s) => {
      if (!this.isOpen) return;
      s.target.closest(".cp_dialog") || this.close();
    }), this.config.dismissOnEscape && window.addEventListener("keydown", (s) => {
      if (!this.isOpen || s.key !== "Escape") return;
      const a = document.querySelector(":focus");
      (!a || a.closest(".cp_dialog")) && this.close();
    });
  }
  /**
   * Get whether the dialog is currently open.
   */
  get isOpen() {
    return !!this.$dialog;
  }
  /**
   * Get the picked color.
   */
  get color() {
    return this._unset ? null : this._color;
  }
  /**
   * Get the color currently selected in the dialog.
   */
  get selectedColor() {
    return this._newColor;
  }
  /**
   * Get the color output format.
   */
  get format() {
    return this._format;
  }
  /**
   * Get the target element.
   */
  get element() {
    return this.$target;
  }
  /**
   * Toggle whether the picker dialog is opened.
   * @param value Force open or closed?
   * @param emit Emit event?
   */
  toggle(r = !this.isOpen, n = !0) {
    r ? this.open(n) : this.close(n);
  }
  /**
   * Open the picker dialog.
   * @param emit Emit event?
   */
  open(r = !0) {
    var n;
    this.isOpen || (ce == null || ce.close(), ce = this, document.body.insertAdjacentHTML("beforeend", ln), this.$dialog = document.querySelector(".cp_dialog"), this.$colorInput = this.$dialog.querySelector(".cp_input"), this.populateDialog(), this.bindDialog(), this.setFormat(this.config.defaultFormat, !1), this.updateColor(), this.popper = Gr(this.$target, this.$dialog, {
      placement: this.config.dialogPlacement,
      strategy: "absolute",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, this.config.dialogOffset]
          }
        }
      ]
    }), (n = this.$toggle) == null || n.classList.add("cp_open"), setTimeout(() => this.$dialog.classList.add("cp_open")), r && (this.emit("open"), setTimeout(() => this.emit("opened"), this.getAnimationDuration())));
  }
  /**
   * Open the picker, returning a promise with the chosen color, optionally destroying it after.
   */
  openOnce(r = !1) {
    return new Promise((n) => {
      this.once("closed", () => {
        r && this.destroy(), n(this.color);
      }), this.open();
    });
  }
  populateDialog() {
    if (this.config.swatches) {
      const r = this.config.swatches.map((n) => {
        const i = document.createElement("button");
        i.className = "cp_swatch", i.style.setProperty("--cp-color", n), i.dataset.color = n;
        const o = new q(i.dataset.color);
        return i.addEventListener("click", () => this._setNewColor(o)), i;
      });
      this.$dialog.querySelector(".cp_swatches").append(...r);
    }
    this.config.formats && (this.$formats = this.config.formats.map((r) => {
      const n = document.createElement("button");
      return n.className = "cp_format", n.dataset.format = r, n.textContent = r.toUpperCase(), n.addEventListener("click", () => this.setFormat(r)), n;
    }), this.$dialog.querySelector(".cp_formats").append(...this.$formats));
  }
  bindDialog() {
    var l;
    const r = this.$dialog.querySelector(".cp_area-hsv");
    this.hsvSlider = new je(r), this.hsvSlider.on("drag", (u, c) => {
      this._setNewColor(this._newColor.saturation(u).value(1 - c));
    });
    const n = this.$dialog.querySelector(".cp_slider-hue");
    this.hueSlider = new je(n), this.hueSlider.on("drag", (u) => {
      this._setNewColor(this._newColor.hue(u * 360));
    });
    const i = this.$dialog.querySelector(".cp_slider-alpha");
    this.config.enableAlpha ? (this.alphaSlider = new je(i), this.alphaSlider.on("drag", (u) => {
      this._setNewColor(this._newColor.alpha(u), !0);
    })) : i.remove(), this.$colorInput.addEventListener("input", () => {
      try {
        const { color: u, format: c } = St(this.$colorInput.value);
        this.setFormat(c, !1), this._setNewColor(new q(u), !1);
      } catch {
      }
    }), this.config.enablePreview || (l = this.$dialog.querySelector(".cp_preview")) == null || l.remove();
    const o = this.$dialog.querySelector(".cp_eyedrop");
    this.config.enableEyedropper && "EyeDropper" in window ? o.addEventListener("click", () => {
      new EyeDropper().open().then((u) => {
        const c = new q(u.sRGBHex);
        this._setNewColor(c);
      }).catch(() => {
      });
    }) : o.remove();
    const s = this.$dialog.querySelector(".cp_submit");
    this.config.showSubmitButton ? s.addEventListener("click", () => {
      this._setCurrentColor(this._newColor), this.close();
    }) : s.remove();
    const a = this.$dialog.querySelector(".cp_clear");
    this.config.showClearButton ? a.addEventListener("click", () => {
      this.clear(), this.close();
    }) : a.remove();
  }
  getAnimationDuration() {
    const n = window.getComputedStyle(this.$target).getPropertyValue("--cp-delay");
    return parseFloat(n) * (n.endsWith("ms") ? 1 : 1e3);
  }
  /**
   * Close the picker dialog.
   * @param emit Emit event?
   */
  close(r = !0) {
    var n, i;
    this.isOpen && (ce = void 0, (n = this.$dialog) == null || n.classList.remove("cp_open"), (i = this.$toggle) == null || i.classList.remove("cp_open"), setTimeout(() => {
      var o, s;
      (o = this.$dialog) == null || o.remove(), (s = this.popper) == null || s.destroy(), this.$dialog = void 0, this.popper = void 0, r && this.emit("closed");
    }, this.getAnimationDuration()), r && this.emit("close"));
  }
  /**
   * Destroy the picker and revert all HTML to what it was.
   */
  destroy() {
    var r;
    this.close(), (r = this.$dialog) == null || r.remove(), this.$toggle && (this.$toggle.classList.remove("color-picker", "cp_open", "cp_unset"), this.$toggle.style.removeProperty("--cp-current-color"), this.$toggle.removeAttribute("data-color"), this.$toggle.textContent = "");
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
    this._setCurrentColor(new q(r), n);
  }
  /**
   * Set the picker color format.
   * @param format The color format.
   * @param update Update colors?
   */
  setFormat(r, n = !0) {
    this._format = r, this.updateFormat(), n && (this.updateColor(), this.updateAppliedColor(!1));
  }
  _setNewColor(r, n = !0) {
    if (this.config.commitMode === "instant")
      return this._setCurrentColor(r);
    this._newColor = r, this.updateColor(n);
  }
  _setCurrentColor(r, n = !0) {
    this._unset = !1, this._newColor = r, this._color = r, this.updateColor(!0), this.updateAppliedColor(n);
  }
  updateColor(r = !0) {
    var i, o, s, a, l, u, c, d, g;
    const n = ((i = this.color) == null ? void 0 : i.toString()) ?? "transparent";
    (o = this.$toggle) == null || o.style.setProperty("--cp-current-color", n), (s = this.$dialog) == null || s.style.setProperty("--cp-current-color", n), (a = this.$dialog) == null || a.style.setProperty("--cp-color", this._newColor.toString()), (l = this.$dialog) == null || l.style.setProperty("--cp-hue", this._newColor.hue().toString()), (u = this.$dialog) == null || u.style.setProperty("--cp-alpha", this._newColor.alpha().toString()), (c = this.hsvSlider) == null || c.moveThumb(this._newColor.saturation(), 1 - this._newColor.value()), (d = this.hueSlider) == null || d.moveThumb(this._newColor.hue() / 360), (g = this.alphaSlider) == null || g.moveThumb(this._newColor.alpha()), r && this.$colorInput && (this.$colorInput.value = this._newColor.string(this._format));
  }
  updateAppliedColor(r = !0) {
    var n, i;
    this.$toggle && (this.$toggle.classList.toggle("cp_unset", this._unset), this.$toggle.dataset.color = ((n = this.color) == null ? void 0 : n.toString()) ?? ""), this.$toggleText && (this.$toggleText.textContent = ((i = this.color) == null ? void 0 : i.string(this._format)) ?? "-"), r && this.emit("pick", this.color);
  }
  updateFormat() {
    if (!this.$formats) return;
    this.$formats.forEach((n) => n.removeAttribute("aria-checked"));
    const r = this.$formats.find((n) => n.dataset.format === this._format);
    r && (r.ariaChecked = "true");
  }
}
export {
  un as default
};
