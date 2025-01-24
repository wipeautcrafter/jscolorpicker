var Ht = Object.defineProperty;
var Bt = (t, e, r) => e in t ? Ht(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var $ = (t, e, r) => Bt(t, typeof e != "symbol" ? e + "" : e, r);
function Nt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Re = { exports: {} }, te = typeof Reflect == "object" ? Reflect : null, Je = te && typeof te.apply == "function" ? te.apply : function(e, r, n) {
  return Function.prototype.apply.call(e, r, n);
}, $e;
te && typeof te.ownKeys == "function" ? $e = te.ownKeys : Object.getOwnPropertySymbols ? $e = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : $e = function(e) {
  return Object.getOwnPropertyNames(e);
};
function Wt(t) {
  console && console.warn && console.warn(t);
}
var ft = Number.isNaN || function(e) {
  return e !== e;
};
function w() {
  w.init.call(this);
}
Re.exports = w;
Re.exports.once = Vt;
w.EventEmitter = w;
w.prototype._events = void 0;
w.prototype._eventsCount = 0;
w.prototype._maxListeners = void 0;
var Qe = 10;
function Ce(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
Object.defineProperty(w, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Qe;
  },
  set: function(t) {
    if (typeof t != "number" || t < 0 || ft(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Qe = t;
  }
});
w.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
w.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || ft(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function pt(t) {
  return t._maxListeners === void 0 ? w.defaultMaxListeners : t._maxListeners;
}
w.prototype.getMaxListeners = function() {
  return pt(this);
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
    var l = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw l.context = s, l;
  }
  var a = o[e];
  if (a === void 0)
    return !1;
  if (typeof a == "function")
    Je(a, this, r);
  else
    for (var u = a.length, c = mt(a, u), n = 0; n < u; ++n)
      Je(c[n], this, r);
  return !0;
};
function dt(t, e, r, n) {
  var i, o, s;
  if (Ce(r), o = t._events, o === void 0 ? (o = t._events = /* @__PURE__ */ Object.create(null), t._eventsCount = 0) : (o.newListener !== void 0 && (t.emit(
    "newListener",
    e,
    r.listener ? r.listener : r
  ), o = t._events), s = o[e]), s === void 0)
    s = o[e] = r, ++t._eventsCount;
  else if (typeof s == "function" ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), i = pt(t), i > 0 && s.length > i && !s.warned) {
    s.warned = !0;
    var l = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    l.name = "MaxListenersExceededWarning", l.emitter = t, l.type = e, l.count = s.length, Wt(l);
  }
  return t;
}
w.prototype.addListener = function(e, r) {
  return dt(this, e, r, !1);
};
w.prototype.on = w.prototype.addListener;
w.prototype.prependListener = function(e, r) {
  return dt(this, e, r, !0);
};
function It() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function ht(t, e, r) {
  var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r }, i = It.bind(n);
  return i.listener = r, n.wrapFn = i, i;
}
w.prototype.once = function(e, r) {
  return Ce(r), this.on(e, ht(this, e, r)), this;
};
w.prototype.prependOnceListener = function(e, r) {
  return Ce(r), this.prependListener(e, ht(this, e, r)), this;
};
w.prototype.removeListener = function(e, r) {
  var n, i, o, s, l;
  if (Ce(r), i = this._events, i === void 0)
    return this;
  if (n = i[e], n === void 0)
    return this;
  if (n === r || n.listener === r)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || r));
  else if (typeof n != "function") {
    for (o = -1, s = n.length - 1; s >= 0; s--)
      if (n[s] === r || n[s].listener === r) {
        l = n[s].listener, o = s;
        break;
      }
    if (o < 0)
      return this;
    o === 0 ? n.shift() : Ft(n, o), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, l || r);
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
function vt(t, e, r) {
  var n = t._events;
  if (n === void 0)
    return [];
  var i = n[e];
  return i === void 0 ? [] : typeof i == "function" ? r ? [i.listener || i] : [i] : r ? qt(i) : mt(i, i.length);
}
w.prototype.listeners = function(e) {
  return vt(this, e, !0);
};
w.prototype.rawListeners = function(e) {
  return vt(this, e, !1);
};
w.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : gt.call(t, e);
};
w.prototype.listenerCount = gt;
function gt(t) {
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
  return this._eventsCount > 0 ? $e(this._events) : [];
};
function mt(t, e) {
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
function Vt(t, e) {
  return new Promise(function(r, n) {
    function i(s) {
      t.removeListener(e, o), n(s);
    }
    function o() {
      typeof t.removeListener == "function" && t.removeListener("error", i), r([].slice.call(arguments));
    }
    yt(t, e, o, { once: !0 }), e !== "error" && Ut(t, i, { once: !0 });
  });
}
function Ut(t, e, r) {
  typeof t.on == "function" && yt(t, "error", e, r);
}
function yt(t, e, r, n) {
  if (typeof t.on == "function")
    n.once ? t.once(e, r) : t.on(e, r);
  else if (typeof t.addEventListener == "function")
    t.addEventListener(e, function i(o) {
      n.once && t.removeEventListener(e, i), r(o);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
}
var wt = Re.exports;
const Xt = /* @__PURE__ */ Nt(wt);
var P = "top", T = "bottom", H = "right", D = "left", Te = "auto", he = [P, T, H, D], re = "start", pe = "end", Yt = "clippingParents", bt = "viewport", le = "popper", Kt = "reference", et = /* @__PURE__ */ he.reduce(function(t, e) {
  return t.concat([e + "-" + re, e + "-" + pe]);
}, []), xt = /* @__PURE__ */ [].concat(he, [Te]).reduce(function(t, e) {
  return t.concat([e, e + "-" + re, e + "-" + pe]);
}, []), zt = "beforeRead", Zt = "read", Gt = "afterRead", Jt = "beforeMain", Qt = "main", er = "afterMain", tr = "beforeWrite", rr = "write", nr = "afterWrite", ir = [zt, Zt, Gt, Jt, Qt, er, tr, rr, nr];
function I(t) {
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
function He(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = j(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function or(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, i = e.attributes[r] || {}, o = e.elements[r];
    !R(o) || !I(o) || (Object.assign(o.style, n), Object.keys(i).forEach(function(s) {
      var l = i[s];
      l === !1 ? o.removeAttribute(s) : o.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function sr(t) {
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
      var i = e.elements[n], o = e.attributes[n] || {}, s = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]), l = s.reduce(function(a, u) {
        return a[u] = "", a;
      }, {});
      !R(i) || !I(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const ar = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: or,
  effect: sr,
  requires: ["computeStyles"]
};
function W(t) {
  return t.split("-")[0];
}
var G = Math.max, Le = Math.min, ne = Math.round;
function Me() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function $t() {
  return !/^((?!chrome|android).)*safari/i.test(Me());
}
function ie(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), i = 1, o = 1;
  e && R(t) && (i = t.offsetWidth > 0 && ne(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && ne(n.height) / t.offsetHeight || 1);
  var s = J(t) ? j(t) : window, l = s.visualViewport, a = !$t() && r, u = (n.left + (a && l ? l.offsetLeft : 0)) / i, c = (n.top + (a && l ? l.offsetTop : 0)) / o, d = n.width / i, g = n.height / o;
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
function Be(t) {
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
  if (r && He(r)) {
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
function lr(t) {
  return ["table", "td", "th"].indexOf(I(t)) >= 0;
}
function U(t) {
  return ((J(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function _e(t) {
  return I(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (He(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    U(t)
  );
}
function tt(t) {
  return !R(t) || // https://github.com/popperjs/popper-core/issues/837
  q(t).position === "fixed" ? null : t.offsetParent;
}
function cr(t) {
  var e = /firefox/i.test(Me()), r = /Trident/i.test(Me());
  if (r && R(t)) {
    var n = q(t);
    if (n.position === "fixed")
      return null;
  }
  var i = _e(t);
  for (He(i) && (i = i.host); R(i) && ["html", "body"].indexOf(I(i)) < 0; ) {
    var o = q(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ve(t) {
  for (var e = j(t), r = tt(t); r && lr(r) && q(r).position === "static"; )
    r = tt(r);
  return r && (I(r) === "html" || I(r) === "body" && q(r).position === "static") ? e : r || cr(t) || e;
}
function Ne(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ue(t, e, r) {
  return G(t, Le(e, r));
}
function ur(t, e, r) {
  var n = ue(t, e, r);
  return n > r ? r : n;
}
function Lt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ct(t) {
  return Object.assign({}, Lt(), t);
}
function _t(t, e) {
  return e.reduce(function(r, n) {
    return r[n] = t, r;
  }, {});
}
var fr = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, Ct(typeof e != "number" ? e : _t(e, he));
};
function pr(t) {
  var e, r = t.state, n = t.name, i = t.options, o = r.elements.arrow, s = r.modifiersData.popperOffsets, l = W(r.placement), a = Ne(l), u = [D, H].indexOf(l) >= 0, c = u ? "height" : "width";
  if (!(!o || !s)) {
    var d = fr(i.padding, r), g = Be(o), f = a === "y" ? P : D, b = a === "y" ? T : H, v = r.rects.reference[c] + r.rects.reference[a] - s[a] - r.rects.popper[c], h = s[a] - r.rects.reference[a], x = ve(o), L = x ? a === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, C = v / 2 - h / 2, p = d[f], m = L - g[c] - d[b], y = L / 2 - g[c] / 2 + C, O = ue(p, y, m), A = a;
    r.modifiersData[n] = (e = {}, e[A] = O, e.centerOffset = O - y, e);
  }
}
function dr(t) {
  var e = t.state, r = t.options, n = r.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Ot(e.elements.popper, i) && (e.elements.arrow = i));
}
const hr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: pr,
  effect: dr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function oe(t) {
  return t.split("-")[1];
}
var vr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function gr(t, e) {
  var r = t.x, n = t.y, i = e.devicePixelRatio || 1;
  return {
    x: ne(r * i) / i || 0,
    y: ne(n * i) / i || 0
  };
}
function rt(t) {
  var e, r = t.popper, n = t.popperRect, i = t.placement, o = t.variation, s = t.offsets, l = t.position, a = t.gpuAcceleration, u = t.adaptive, c = t.roundOffsets, d = t.isFixed, g = s.x, f = g === void 0 ? 0 : g, b = s.y, v = b === void 0 ? 0 : b, h = typeof c == "function" ? c({
    x: f,
    y: v
  }) : {
    x: f,
    y: v
  };
  f = h.x, v = h.y;
  var x = s.hasOwnProperty("x"), L = s.hasOwnProperty("y"), C = D, p = P, m = window;
  if (u) {
    var y = ve(r), O = "clientHeight", A = "clientWidth";
    if (y === j(r) && (y = U(r), q(y).position !== "static" && l === "absolute" && (O = "scrollHeight", A = "scrollWidth")), y = y, i === P || (i === D || i === H) && o === pe) {
      p = T;
      var E = d && y === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        y[O]
      );
      v -= E - n.height, v *= a ? 1 : -1;
    }
    if (i === D || (i === P || i === T) && o === pe) {
      C = H;
      var _ = d && y === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        y[A]
      );
      f -= _ - n.width, f *= a ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: l
  }, u && vr), B = c === !0 ? gr({
    x: f,
    y: v
  }, j(r)) : {
    x: f,
    y: v
  };
  if (f = B.x, v = B.y, a) {
    var k;
    return Object.assign({}, S, (k = {}, k[p] = L ? "0" : "", k[C] = x ? "0" : "", k.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + v + "px)" : "translate3d(" + f + "px, " + v + "px, 0)", k));
  }
  return Object.assign({}, S, (e = {}, e[p] = L ? v + "px" : "", e[C] = x ? f + "px" : "", e.transform = "", e));
}
function mr(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, i = n === void 0 ? !0 : n, o = r.adaptive, s = o === void 0 ? !0 : o, l = r.roundOffsets, a = l === void 0 ? !0 : l, u = {
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
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, rt(Object.assign({}, u, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const yr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: mr,
  data: {}
};
var xe = {
  passive: !0
};
function wr(t) {
  var e = t.state, r = t.instance, n = t.options, i = n.scroll, o = i === void 0 ? !0 : i, s = n.resize, l = s === void 0 ? !0 : s, a = j(e.elements.popper), u = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && u.forEach(function(c) {
    c.addEventListener("scroll", r.update, xe);
  }), l && a.addEventListener("resize", r.update, xe), function() {
    o && u.forEach(function(c) {
      c.removeEventListener("scroll", r.update, xe);
    }), l && a.removeEventListener("resize", r.update, xe);
  };
}
const br = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: wr,
  data: {}
};
var xr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Oe(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return xr[e];
  });
}
var $r = {
  start: "end",
  end: "start"
};
function nt(t) {
  return t.replace(/start|end/g, function(e) {
    return $r[e];
  });
}
function We(t) {
  var e = j(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Ie(t) {
  return ie(U(t)).left + We(t).scrollLeft;
}
function Or(t, e) {
  var r = j(t), n = U(t), i = r.visualViewport, o = n.clientWidth, s = n.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    var u = $t();
    (u || !u && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: l + Ie(t),
    y: a
  };
}
function Lr(t) {
  var e, r = U(t), n = We(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, o = G(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = G(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Ie(t), a = -n.scrollTop;
  return q(i || r).direction === "rtl" && (l += G(r.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
function Fe(t) {
  var e = q(t), r = e.overflow, n = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + i + n);
}
function Et(t) {
  return ["html", "body", "#document"].indexOf(I(t)) >= 0 ? t.ownerDocument.body : R(t) && Fe(t) ? t : Et(_e(t));
}
function fe(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = Et(t), i = n === ((r = t.ownerDocument) == null ? void 0 : r.body), o = j(n), s = i ? [o].concat(o.visualViewport || [], Fe(n) ? n : []) : n, l = e.concat(s);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(fe(_e(s)))
  );
}
function je(t) {
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
  return e === bt ? je(Or(t, r)) : J(e) ? Cr(e, r) : je(Lr(U(t)));
}
function _r(t) {
  var e = fe(_e(t)), r = ["absolute", "fixed"].indexOf(q(t).position) >= 0, n = r && R(t) ? ve(t) : t;
  return J(n) ? e.filter(function(i) {
    return J(i) && Ot(i, n) && I(i) !== "body";
  }) : [];
}
function Er(t, e, r, n) {
  var i = e === "clippingParents" ? _r(t) : [].concat(e), o = [].concat(i, [r]), s = o[0], l = o.reduce(function(a, u) {
    var c = it(t, u, n);
    return a.top = G(c.top, a.top), a.right = Le(c.right, a.right), a.bottom = Le(c.bottom, a.bottom), a.left = G(c.left, a.left), a;
  }, it(t, s, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function At(t) {
  var e = t.reference, r = t.element, n = t.placement, i = n ? W(n) : null, o = n ? oe(n) : null, s = e.x + e.width / 2 - r.width / 2, l = e.y + e.height / 2 - r.height / 2, a;
  switch (i) {
    case P:
      a = {
        x: s,
        y: e.y - r.height
      };
      break;
    case T:
      a = {
        x: s,
        y: e.y + e.height
      };
      break;
    case H:
      a = {
        x: e.x + e.width,
        y: l
      };
      break;
    case D:
      a = {
        x: e.x - r.width,
        y: l
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var u = i ? Ne(i) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (o) {
      case re:
        a[u] = a[u] - (e[c] / 2 - r[c] / 2);
        break;
      case pe:
        a[u] = a[u] + (e[c] / 2 - r[c] / 2);
        break;
    }
  }
  return a;
}
function de(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, i = n === void 0 ? t.placement : n, o = r.strategy, s = o === void 0 ? t.strategy : o, l = r.boundary, a = l === void 0 ? Yt : l, u = r.rootBoundary, c = u === void 0 ? bt : u, d = r.elementContext, g = d === void 0 ? le : d, f = r.altBoundary, b = f === void 0 ? !1 : f, v = r.padding, h = v === void 0 ? 0 : v, x = Ct(typeof h != "number" ? h : _t(h, he)), L = g === le ? Kt : le, C = t.rects.popper, p = t.elements[b ? L : g], m = Er(J(p) ? p : p.contextElement || U(t.elements.popper), a, c, s), y = ie(t.elements.reference), O = At({
    reference: y,
    element: C,
    strategy: "absolute",
    placement: i
  }), A = je(Object.assign({}, C, O)), E = g === le ? A : y, _ = {
    top: m.top - E.top + x.top,
    bottom: E.bottom - m.bottom + x.bottom,
    left: m.left - E.left + x.left,
    right: E.right - m.right + x.right
  }, S = t.modifiersData.offset;
  if (g === le && S) {
    var B = S[i];
    Object.keys(_).forEach(function(k) {
      var X = [H, T].indexOf(k) >= 0 ? 1 : -1, Y = [P, T].indexOf(k) >= 0 ? "y" : "x";
      _[k] += B[Y] * X;
    });
  }
  return _;
}
function Ar(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, i = r.boundary, o = r.rootBoundary, s = r.padding, l = r.flipVariations, a = r.allowedAutoPlacements, u = a === void 0 ? xt : a, c = oe(n), d = c ? l ? et : et.filter(function(b) {
    return oe(b) === c;
  }) : he, g = d.filter(function(b) {
    return u.indexOf(b) >= 0;
  });
  g.length === 0 && (g = d);
  var f = g.reduce(function(b, v) {
    return b[v] = de(t, {
      placement: v,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[W(v)], b;
  }, {});
  return Object.keys(f).sort(function(b, v) {
    return f[b] - f[v];
  });
}
function Sr(t) {
  if (W(t) === Te)
    return [];
  var e = Oe(t);
  return [nt(t), e, nt(e)];
}
function kr(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var i = r.mainAxis, o = i === void 0 ? !0 : i, s = r.altAxis, l = s === void 0 ? !0 : s, a = r.fallbackPlacements, u = r.padding, c = r.boundary, d = r.rootBoundary, g = r.altBoundary, f = r.flipVariations, b = f === void 0 ? !0 : f, v = r.allowedAutoPlacements, h = e.options.placement, x = W(h), L = x === h, C = a || (L || !b ? [Oe(h)] : Sr(h)), p = [h].concat(C).reduce(function(Q, V) {
      return Q.concat(W(V) === Te ? Ar(e, {
        placement: V,
        boundary: c,
        rootBoundary: d,
        padding: u,
        flipVariations: b,
        allowedAutoPlacements: v
      }) : V);
    }, []), m = e.rects.reference, y = e.rects.popper, O = /* @__PURE__ */ new Map(), A = !0, E = p[0], _ = 0; _ < p.length; _++) {
      var S = p[_], B = W(S), k = oe(S) === re, X = [P, T].indexOf(B) >= 0, Y = X ? "width" : "height", M = de(e, {
        placement: S,
        boundary: c,
        rootBoundary: d,
        altBoundary: g,
        padding: u
      }), N = X ? k ? H : D : k ? T : P;
      m[Y] > y[Y] && (N = Oe(N));
      var ge = Oe(N), K = [];
      if (o && K.push(M[B] <= 0), l && K.push(M[N] <= 0, M[ge] <= 0), K.every(function(Q) {
        return Q;
      })) {
        E = S, A = !1;
        break;
      }
      O.set(S, K);
    }
    if (A)
      for (var me = b ? 3 : 1, Ee = function(V) {
        var ae = p.find(function(we) {
          var z = O.get(we);
          if (z)
            return z.slice(0, V).every(function(Ae) {
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
  fn: kr,
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
  return [P, H, T, D].some(function(e) {
    return t[e] >= 0;
  });
}
function Dr(t) {
  var e = t.state, r = t.name, n = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, s = de(e, {
    elementContext: "reference"
  }), l = de(e, {
    altBoundary: !0
  }), a = ot(s, n), u = ot(l, i, o), c = st(a), d = st(u);
  e.modifiersData[r] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": d
  });
}
const Mr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Dr
};
function jr(t, e, r) {
  var n = W(t), i = [D, P].indexOf(n) >= 0 ? -1 : 1, o = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, s = o[0], l = o[1];
  return s = s || 0, l = (l || 0) * i, [D, H].indexOf(n) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Rr(t) {
  var e = t.state, r = t.options, n = t.name, i = r.offset, o = i === void 0 ? [0, 0] : i, s = xt.reduce(function(c, d) {
    return c[d] = jr(d, e.rects, o), c;
  }, {}), l = s[e.placement], a = l.x, u = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += u), e.modifiersData[n] = s;
}
const Tr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Rr
};
function Hr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = At({
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
  fn: Hr,
  data: {}
};
function Nr(t) {
  return t === "x" ? "y" : "x";
}
function Wr(t) {
  var e = t.state, r = t.options, n = t.name, i = r.mainAxis, o = i === void 0 ? !0 : i, s = r.altAxis, l = s === void 0 ? !1 : s, a = r.boundary, u = r.rootBoundary, c = r.altBoundary, d = r.padding, g = r.tether, f = g === void 0 ? !0 : g, b = r.tetherOffset, v = b === void 0 ? 0 : b, h = de(e, {
    boundary: a,
    rootBoundary: u,
    padding: d,
    altBoundary: c
  }), x = W(e.placement), L = oe(e.placement), C = !L, p = Ne(x), m = Nr(p), y = e.modifiersData.popperOffsets, O = e.rects.reference, A = e.rects.popper, E = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, _ = typeof E == "number" ? {
    mainAxis: E,
    altAxis: E
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, E), S = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (y) {
    if (o) {
      var k, X = p === "y" ? P : D, Y = p === "y" ? T : H, M = p === "y" ? "height" : "width", N = y[p], ge = N + h[X], K = N - h[Y], me = f ? -A[M] / 2 : 0, Ee = L === re ? O[M] : A[M], se = L === re ? -A[M] : -O[M], ye = e.elements.arrow, Q = f && ye ? Be(ye) : {
        width: 0,
        height: 0
      }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Lt(), ae = V[X], we = V[Y], z = ue(0, O[M], Q[M]), Ae = C ? O[M] / 2 - me - z - ae - _.mainAxis : Ee - z - ae - _.mainAxis, Pt = C ? -O[M] / 2 + me + z + we + _.mainAxis : se + z + we + _.mainAxis, Se = e.elements.arrow && ve(e.elements.arrow), Dt = Se ? p === "y" ? Se.clientTop || 0 : Se.clientLeft || 0 : 0, qe = (k = S == null ? void 0 : S[p]) != null ? k : 0, Mt = N + Ae - qe - Dt, jt = N + Pt - qe, Ve = ue(f ? Le(ge, Mt) : ge, N, f ? G(K, jt) : K);
      y[p] = Ve, B[p] = Ve - N;
    }
    if (l) {
      var Ue, Rt = p === "x" ? P : D, Tt = p === "x" ? T : H, Z = y[m], be = m === "y" ? "height" : "width", Xe = Z + h[Rt], Ye = Z - h[Tt], ke = [P, D].indexOf(x) !== -1, Ke = (Ue = S == null ? void 0 : S[m]) != null ? Ue : 0, ze = ke ? Xe : Z - O[be] - A[be] - Ke + _.altAxis, Ze = ke ? Z + O[be] + A[be] - Ke - _.altAxis : Ye, Ge = f && ke ? ur(ze, Z, Ze) : ue(f ? ze : Xe, Z, f ? Ze : Ye);
      y[m] = Ge, B[m] = Ge - Z;
    }
    e.modifiersData[n] = B;
  }
}
const Ir = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Wr,
  requiresIfExists: ["offset"]
};
function Fr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function qr(t) {
  return t === j(t) || !R(t) ? We(t) : Fr(t);
}
function Vr(t) {
  var e = t.getBoundingClientRect(), r = ne(e.width) / t.offsetWidth || 1, n = ne(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Ur(t, e, r) {
  r === void 0 && (r = !1);
  var n = R(e), i = R(e) && Vr(e), o = U(e), s = ie(t, i, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((I(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Fe(o)) && (l = qr(e)), R(e) ? (a = ie(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : o && (a.x = Ie(o))), {
    x: s.left + l.scrollLeft - a.x,
    y: s.top + l.scrollTop - a.y,
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
    s.forEach(function(l) {
      if (!r.has(l)) {
        var a = e.get(l);
        a && i(a);
      }
    }), n.push(o);
  }
  return t.forEach(function(o) {
    r.has(o.name) || i(o);
  }), n;
}
function Yr(t) {
  var e = Xr(t);
  return ir.reduce(function(r, n) {
    return r.concat(e.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Kr(t) {
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
function Zr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, i = e.defaultOptions, o = i === void 0 ? at : i;
  return function(l, a, u) {
    u === void 0 && (u = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, at, o),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], g = !1, f = {
      state: c,
      setOptions: function(x) {
        var L = typeof x == "function" ? x(c.options) : x;
        v(), c.options = Object.assign({}, o, c.options, L), c.scrollParents = {
          reference: J(l) ? fe(l) : l.contextElement ? fe(l.contextElement) : [],
          popper: fe(a)
        };
        var C = Yr(zr([].concat(n, c.options.modifiers)));
        return c.orderedModifiers = C.filter(function(p) {
          return p.enabled;
        }), b(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var x = c.elements, L = x.reference, C = x.popper;
          if (lt(L, C)) {
            c.rects = {
              reference: Ur(L, ve(C), c.options.strategy === "fixed"),
              popper: Be(C)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(_) {
              return c.modifiersData[_.name] = Object.assign({}, _.data);
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
      update: Kr(function() {
        return new Promise(function(h) {
          f.forceUpdate(), h(c);
        });
      }),
      destroy: function() {
        v(), g = !0;
      }
    };
    if (!lt(l, a))
      return f;
    f.setOptions(u).then(function(h) {
      !g && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function b() {
      c.orderedModifiers.forEach(function(h) {
        var x = h.name, L = h.options, C = L === void 0 ? {} : L, p = h.effect;
        if (typeof p == "function") {
          var m = p({
            state: c,
            name: x,
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
var Gr = [br, Br, yr, ar, Tr, Pr, Ir, hr, Mr], Jr = /* @__PURE__ */ Zr({
  defaultModifiers: Gr
});
const Qr = ([t, e, r, n]) => {
  const i = Math.max(t, e, r), o = i - Math.min(t, e, r), s = o && (i == t ? (e - r) / o : i == e ? 2 + (r - t) / o : 4 + (t - e) / o);
  return [60 * (s < 0 ? s + 6 : s), i && o / i, i, n];
}, St = (t) => t.replace(/[^0-9%.,]/g, "").split(",").map((e) => parseFloat(e) / (e.endsWith("%") ? 100 : 1)), en = (t) => {
  const e = document.createElement("span");
  e.style.display = "none", e.style.color = t, document.body.append(e);
  const { color: r } = getComputedStyle(e);
  if (e.remove(), !r) return null;
  const [n, i, o, s] = St(r);
  return Qr([n / 255, i / 255, o / 255, s]);
}, tn = (t) => {
  const e = St(t).map((r, n) => Math.min(r, n ? 1 : 255));
  return e.length < 3 || e.some((r) => isNaN(r)) ? null : e;
}, kt = (t) => {
  let e;
  /^hsva?\(/i.test(t) ? e = "hsv" : /^hsla?\(/i.test(t) ? e = "hsl" : /^rgba?\(/i.test(t) ? e = "rgb" : e = "hex";
  const r = e === "hsv" ? tn(t) : en(t);
  if (!r) throw new Error("Color could not be parsed!");
  return r[3] = r[3] ?? 1, { color: r, format: e };
}, ee = (t) => t.toFixed(), rn = (t, e) => ("" + +t.toFixed(e)).replace(/^0\./g, "."), nn = ([t, e, r, n]) => {
  const i = r - r * e / 2, o = Math.min(i, 1 - i);
  return [t, o ? (r - i) / o : 0, i, n];
}, ct = ([t, e, r, n]) => {
  const i = (o, s = (o + t / 60) % 6) => r - r * e * Math.max(Math.min(s, 4 - s, 1), 0);
  return [i(5), i(3), i(1), n];
}, Pe = ([t, e, r, n], i) => {
  const o = n < 1 ? "a" : "", s = i.startsWith("hs") ? [ee(t), ee(e * 100) + "%", ee(r * 100) + "%"] : [ee(t * 255), ee(e * 255), ee(r * 255)];
  return o && s.push(rn(n, 2)), `${i}${o}(${s.join()})`;
}, on = (t) => "#" + t.slice(0, t[3] < 1 ? 4 : 3).map(
  (e) => Math.round(e * 255).toString(16).padStart(2, "0")
).join(""), sn = (t, e) => e === "hsv" ? Pe(t, e) : e === "hsl" ? Pe(nn(t), e) : e === "rgb" ? Pe(ct(t), e) : on(ct(t));
class F {
  constructor(e) {
    $(this, "color");
    if (!e)
      this.color = [0, 0, 0, 1];
    else if (e instanceof F)
      this.color = [...e.color];
    else if (Array.isArray(e)) {
      const [r = 0, n = 0, i = 0, o = 1] = e;
      this.color = [r, n, i, o];
    } else
      this.color = kt(e).color;
  }
  getSet(e, r) {
    if (r === void 0) return this.color[e];
    const n = [...this.color];
    return n[e] = r, new F(n);
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
    return sn(this.color, e);
  }
  toString() {
    return this.string("hex");
  }
  clone() {
    return new F(this);
  }
}
class De extends Xt {
  constructor(r) {
    super();
    $(this, "x", 0);
    $(this, "y", 0);
    $(this, "$track");
    $(this, "$thumb");
    this.$track = r, this.$thumb = r.querySelector(".cp_thumb"), this.$track.addEventListener("pointerdown", (n) => {
      this.$track.setPointerCapture(n.pointerId), this.handleDrag(n), n.preventDefault();
    }), this.$track.addEventListener("pointermove", (n) => {
      this.$track.hasPointerCapture(n.pointerId) && (this.handleDrag(n), n.preventDefault());
    }), this.$track.addEventListener("pointerup", (n) => {
      this.$track.releasePointerCapture(n.pointerId), this.$thumb.focus(), n.preventDefault();
    }), this.$track.addEventListener("keydown", (n) => {
      n.key === "ArrowLeft" ? (this.handleNudge(-1, 0, n.shiftKey), n.preventDefault()) : n.key === "ArrowRight" ? (this.handleNudge(1, 0, n.shiftKey), n.preventDefault()) : n.key === "ArrowUp" ? (this.handleNudge(0, -1, n.shiftKey), n.preventDefault()) : n.key === "ArrowDown" && (this.handleNudge(0, 1, n.shiftKey), n.preventDefault());
    });
  }
  handleDrag(r) {
    const n = this.$track.getBoundingClientRect();
    this.fireDrag((r.clientX - n.x) / n.width, (r.clientY - n.y) / n.height);
  }
  handleNudge(r, n, i) {
    const o = i ? 0.1 : 0.01;
    this.fireDrag(this.x + r * o, this.y + n * o);
  }
  fireDrag(r, n) {
    r < 0 ? r = 0 : r > 1 && (r = 1), n < 0 ? n = 0 : n > 1 && (n = 1), this.emit("drag", r, n);
  }
  move(r, n) {
    r !== void 0 && (this.x = r, this.$thumb.style.left = `${r * 100}%`), n !== void 0 && (this.y = n, this.$thumb.style.top = `${n * 100}%`);
  }
}
const an = {
  headless: !1,
  toggleStyle: "button",
  container: null,
  defaultColor: null,
  swatches: null,
  swatchesOnly: !1,
  enableAlpha: !0,
  enableEyedropper: !0,
  formats: ["hex", "rgb", "hsv", "hsl"],
  defaultFormat: "hex",
  submitMode: "confirm",
  showClearButton: !0,
  dismissOnOutsideClick: !0,
  dismissOnEscape: !0,
  dialogPlacement: "top",
  dialogOffset: 8
}, ut = (t) => t ? t instanceof HTMLElement ? t : document.querySelector(t) : null, ln = '<div class=cp_dialog><div class="cp_area cp_area-hsv"><div class=cp_thumb tabindex=0></div></div><div class=cp_dialog-inner><div class="cp_slider cp_slider-hue"><div class=cp_thumb tabindex=0></div></div><div class="cp_slider cp_slider-alpha"><div class=cp_thumb tabindex=0></div></div><div class=cp_swatches></div><div class=cp_formats></div><div class=cp_input-group><div class=cp_sample></div><input autocomplete=false class=cp_value spellcheck=false value=#ff0000> <button class="cp_action cp_eyedrop"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="m207.8 87.6l-25.37 25.53l4.89 4.88a16 16 0 0 1 0 22.64l-9 9a8 8 0 0 1-11.32 0l-60.68-60.7a8 8 0 0 1 0-11.32l9-9a16 16 0 0 1 22.63 0l4.88 4.89l25-25.11c10.79-10.79 28.37-11.45 39.45-1a28 28 0 0 1 .52 40.19"opacity=0.2 /><path d="M224 67.3a35.8 35.8 0 0 0-11.26-25.66c-14-13.28-36.72-12.78-50.62 1.13L142.8 62.2a24 24 0 0 0-33.14.77l-9 9a16 16 0 0 0 0 22.64l2 2.06l-51 51a39.75 39.75 0 0 0-10.53 38l-8 18.41A13.68 13.68 0 0 0 36 219.3a15.92 15.92 0 0 0 17.71 3.35L71.23 215a39.89 39.89 0 0 0 37.06-10.75l51-51l2.06 2.06a16 16 0 0 0 22.62 0l9-9a24 24 0 0 0 .74-33.18l19.75-19.87A35.75 35.75 0 0 0 224 67.3M97 193a24 24 0 0 1-24 6a8 8 0 0 0-5.55.31l-18.1 7.91L57 189.41a8 8 0 0 0 .25-5.75A23.88 23.88 0 0 1 63 159l51-51l33.94 34ZM202.13 82l-25.37 25.52a8 8 0 0 0 0 11.3l4.89 4.89a8 8 0 0 1 0 11.32l-9 9L112 83.26l9-9a8 8 0 0 1 11.31 0l4.89 4.89a8 8 0 0 0 5.65 2.34a8 8 0 0 0 5.66-2.36l24.94-25.09c7.81-7.82 20.5-8.18 28.29-.81a20 20 0 0 1 .39 28.7Z"/></g></svg></button> <button class="cp_action cp_clear"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="M224 56v144a8 8 0 0 1-8 8H68.53a8 8 0 0 1-6.86-3.88L16 128l45.67-76.12A8 8 0 0 1 68.53 48H216a8 8 0 0 1 8 8"opacity=0.2 /><path d="M216 40H68.53a16.08 16.08 0 0 0-13.72 7.77L9.14 123.88a8 8 0 0 0 0 8.24l45.67 76.11A16.08 16.08 0 0 0 68.53 216H216a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M61.67 204.12l6.86-4.12ZM216 200H68.53l-43.2-72l43.2-72H216Zm-109.66-53.66L124.69 128l-18.35-18.34a8 8 0 0 1 11.32-11.32L136 116.69l18.34-18.35a8 8 0 0 1 11.32 11.32L147.31 128l18.35 18.34a8 8 0 0 1-11.32 11.32L136 139.31l-18.34 18.35a8 8 0 0 1-11.32-11.32"/></g></svg></button> <button class="cp_action cp_submit"><svg class=cp_icon height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><g fill=currentColor><path d="m237.66 85.26l-128.4 128.4a8 8 0 0 1-11.32 0l-71.6-72a8 8 0 0 1 0-11.31l24-24a8 8 0 0 1 11.32 0L104 147.43l98.34-97.09a8 8 0 0 1 11.32 0l24 23.6a8 8 0 0 1 0 11.32"opacity=0.2 /><path d="m243.28 68.24l-24-23.56a16 16 0 0 0-22.59 0L104 136.23l-36.69-35.6a16 16 0 0 0-22.58.05l-24 24a16 16 0 0 0 0 22.61l71.62 72a16 16 0 0 0 22.63 0L243.33 90.91a16 16 0 0 0-.05-22.67M103.62 208L32 136l24-24a.6.6 0 0 1 .08.08l42.35 41.09a8 8 0 0 0 11.19 0L208.06 56L232 79.6Z"/></g></svg></button></div></div></div>', cn = '<div class=cp_caret><svg height=1em viewBox="0 0 256 256"width=1em xmlns=http://www.w3.org/2000/svg><path d="M208.49 120.49a12 12 0 0 1-17 0L140 69v147a12 12 0 0 1-24 0V69l-51.51 51.49a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17"fill=currentColor /></svg></div>';
let ce;
class fn extends wt.EventEmitter {
  /**
   * Create a new ColorPicker instance.
   * @param $from The element or query to bind to. (leave null to create one)
   * @param config The picker configuration.
   */
  constructor(r, n = {}) {
    super();
    $(this, "_open", !1);
    $(this, "_unset", !0);
    $(this, "_format");
    $(this, "_color");
    $(this, "_newColor");
    $(this, "config");
    $(this, "popper");
    $(this, "isInput");
    $(this, "$toggle");
    $(this, "$dialog");
    $(this, "$button");
    $(this, "$input");
    $(this, "changeHandler");
    $(this, "clickHandler");
    $(this, "hsvSlider");
    $(this, "hueSlider");
    $(this, "alphaSlider");
    $(this, "$formats");
    $(this, "$colorInput");
    this.config = { ...an, ...n }, r = ut(r) ?? document.createElement("button"), this.$toggle = r;
    const i = this.config.defaultColor || r.value || r.dataset.color || void 0;
    this.config.headless || this.createToggle(r), this._setCurrentColor(new F(i), !1), i || this.clear(!1), this.config.dismissOnOutsideClick && window.addEventListener("pointerdown", (o) => {
      if (!this._open) return;
      const s = o.target;
      !s.closest(".cp_dialog") && !s.closest(".color-picker") && this.close();
    }), this.config.dismissOnEscape && window.addEventListener("keydown", (o) => {
      if (o.key === "Escape") {
        const s = document.querySelector(":focus");
        (!s || s.closest(".cp_dialog")) && this.close();
        return;
      }
    }), this.close();
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
    return this.$toggle;
  }
  createToggle(r) {
    const n = r instanceof HTMLInputElement;
    this.isInput = n, this.$toggle = n ? document.createElement("button") : r, this.$input = n ? r : document.createElement("input"), this.isInput && r.type == "color" && (r.type = "text"), r.replaceWith(this.$toggle), this.$input.tabIndex = -1, this.$input.readOnly = !0, this.$input.classList.add("cp_input"), this.config.toggleStyle === "input" && this.$toggle.classList.add("cp_wide"), this.$button = document.createElement("div"), this.$button.classList.add("cp_button"), this.$button.innerHTML = cn, this.$toggle.classList.add("color-picker"), this.$toggle.setAttribute("type", "button"), this.$toggle.append(this.$input, this.$button), this.changeHandler = () => this.setColor(this.$input.value), this.clickHandler = () => this.toggle(), this.$input.addEventListener("change", this.changeHandler), this.$toggle.addEventListener("click", this.clickHandler);
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
    var i;
    if (this._open) return;
    this._open = !0, ce == null || ce.close(), ce = this;
    const n = ut(this.config.container) ?? document.body;
    n.insertAdjacentHTML("beforeend", ln), this.$dialog = n.lastElementChild, this.$colorInput = this.$dialog.querySelector(".cp_value"), this.populateDialog(), this.bindDialog(), this.setFormat(this.config.defaultFormat, !1), this.updateColor(), this.popper = Jr(this.$toggle, this.$dialog, {
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
    }), this.$colorInput.focus({ preventScroll: !0 }), (i = this.$button) == null || i.classList.add("cp_open"), setTimeout(() => this.$dialog.classList.add("cp_open")), r && (this.emit("open"), setTimeout(() => this.emit("opened"), this.getAnimationDuration()));
  }
  /**
   * Open the picker, returning a promise with the chosen color, optionally destroying it after.
   */
  prompt(r = !1) {
    return new Promise((n) => {
      let i = null;
      this.on("pick", (o) => i = o), this.once("close", () => n(i)), r && this.once("closed", () => this.destroy()), this.open();
    });
  }
  populateDialog() {
    if (this.config.swatches) {
      const r = this.config.swatches.map((n) => {
        const i = document.createElement("button");
        i.className = "cp_swatch", i.style.setProperty("--cp-color", n), i.dataset.color = n;
        const o = new F(i.dataset.color);
        return i.addEventListener("click", () => {
          this._setNewColor(o), this.config.swatchesOnly && this.close();
        }), i;
      });
      this.$dialog.querySelector(".cp_swatches").append(...r);
    }
    this.config.formats && (this.$formats = this.config.formats.map((r) => {
      const n = document.createElement("button");
      return n.className = "cp_format", n.dataset.format = r, n.textContent = r.toUpperCase(), n.addEventListener("click", () => this.setFormat(r)), n;
    }), this.$dialog.querySelector(".cp_formats").append(...this.$formats));
  }
  bindDialog() {
    const r = this.$dialog.querySelector(".cp_area-hsv");
    this.hsvSlider = new De(r), this.hsvSlider.on("drag", (a, u) => {
      this._setNewColor(this._newColor.saturation(a).value(1 - u));
    });
    const n = this.$dialog.querySelector(".cp_slider-hue");
    this.hueSlider = new De(n), this.hueSlider.on("drag", (a) => {
      this._setNewColor(this._newColor.hue(a * 360));
    });
    const i = this.$dialog.querySelector(".cp_slider-alpha");
    this.config.enableAlpha ? (this.alphaSlider = new De(i), this.alphaSlider.on("drag", (a) => {
      this._setNewColor(this._newColor.alpha(a), !0);
    })) : i.remove();
    const o = this.$dialog.querySelector(".cp_eyedrop");
    this.config.enableEyedropper && "EyeDropper" in window ? o.addEventListener("click", () => {
      new EyeDropper().open().then((a) => {
        const u = new F(a.sRGBHex);
        this._setNewColor(u);
      }).catch(() => {
      });
    }) : o.remove();
    const s = this.$dialog.querySelector(".cp_submit");
    this.config.submitMode === "confirm" ? s.addEventListener("click", () => this.submit()) : s.remove();
    const l = this.$dialog.querySelector(".cp_clear");
    if (this.config.showClearButton ? l.addEventListener("click", () => {
      this.clear(), this.close();
    }) : l.remove(), this.$colorInput.addEventListener("input", () => {
      try {
        const { color: a, format: u } = kt(this.$colorInput.value);
        this.setFormat(u, !1), this._setNewColor(new F(a), !1);
      } catch {
      }
    }), this.$colorInput.addEventListener("keydown", (a) => {
      a.key === "Enter" && this.submit();
    }), this.$colorInput.addEventListener("dblclick", () => {
      navigator.clipboard && navigator.clipboard.writeText(this.$colorInput.value);
    }), this.config.swatchesOnly) {
      const a = this.$dialog.querySelector(".cp_input-group");
      a && a.remove();
      const u = this.$dialog.querySelector(".cp_formats");
      u && u.remove(), n && n.remove(), r && r.remove(), i && i.remove();
    }
  }
  getAnimationDuration() {
    const n = window.getComputedStyle(this.$toggle).getPropertyValue("--cp-delay");
    return parseFloat(n) * (n.endsWith("ms") ? 1 : 1e3);
  }
  /**
   * Close the picker dialog.
   * @param emit Emit event?
   */
  close(r = !0) {
    var o;
    if (!this._open) return;
    this._open = !1, ce = void 0, (o = this.$button) == null || o.classList.remove("cp_open");
    const n = this.$dialog, i = this.popper;
    this.$dialog = void 0, this.popper = void 0, n == null || n.classList.remove("cp_open"), setTimeout(() => {
      n == null || n.remove(), i == null || i.destroy(), r && this.emit("closed");
    }, this.getAnimationDuration()), r && this.emit("close");
  }
  /**
   * Submit the current color and close.
   * @param color The picked color value.
   * @param emit Emit event?
   */
  submit(r = this._newColor, n = !0) {
    this._setCurrentColor(r), this.close(n);
  }
  /**
   * Destroy the picker and revert all HTML to what it was.
   */
  destroy() {
    var r;
    if (this.close(), (r = this.$dialog) == null || r.remove(), this.isInput) {
      if (!this.$input) return;
      this.$toggle.removeChild(this.$input), this.$toggle.replaceWith(this.$input), this.$input.classList.remove("cp_input"), this.$input.removeAttribute("tabindex"), this.$input.removeAttribute("readonly"), this.changeHandler && this.$input.removeEventListener("change", this.changeHandler);
    } else {
      if (!this.$toggle) return;
      this.$toggle.classList.remove("color-picker", "cp_open"), this.$toggle.removeAttribute("data-color"), this.$toggle.removeAttribute("type"), this.$toggle.textContent = "", this.clickHandler && this.$toggle.removeEventListener("click", this.clickHandler);
    }
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
    this._setCurrentColor(new F(r), n);
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
    if (this.config.submitMode === "instant" || this.config.swatchesOnly)
      return this._setCurrentColor(r, !0, n);
    this._newColor = r, this.updateColor(n);
  }
  _setCurrentColor(r, n = !0, i = !0) {
    this._unset = !1, this._newColor = this._color = r, this.updateColor(i), this.updateAppliedColor(n);
  }
  updateColor(r = !0) {
    var o, s, l, a, u, c, d, g, f, b;
    const n = ((o = this.color) == null ? void 0 : o.toString()) ?? "transparent", i = this._newColor.string("hex");
    (s = this.$dialog) == null || s.style.setProperty("--cp-base-color", i.substring(0, 7)), (l = this.$button) == null || l.style.setProperty("--cp-current-color", n), (a = this.$dialog) == null || a.style.setProperty("--cp-current-color", n), (u = this.$dialog) == null || u.style.setProperty("--cp-color", i), (c = this.$dialog) == null || c.style.setProperty("--cp-hue", this._newColor.hue().toString()), (d = this.$dialog) == null || d.style.setProperty("--cp-alpha", this._newColor.alpha().toString()), (g = this.hsvSlider) == null || g.move(this._newColor.saturation(), 1 - this._newColor.value()), (f = this.hueSlider) == null || f.move(this._newColor.hue() / 360), (b = this.alphaSlider) == null || b.move(this._newColor.alpha()), r && this.$colorInput && (this.$colorInput.value = this._newColor.string(this._format));
  }
  updateAppliedColor(r = !0) {
    const n = this._unset ? "" : this._color.string(this.config.defaultFormat);
    this.$input && (this.$input.value = n), this.$toggle && (this.$toggle.dataset.color = n), this.$button && this.$button.classList.toggle("cp_unset", this._unset), r && this.emit("pick", this.color);
  }
  updateFormat() {
    if (!this.$formats) return;
    this.$formats.forEach((n) => n.removeAttribute("aria-checked"));
    const r = this.$formats.find((n) => n.dataset.format === this._format);
    r && (r.ariaChecked = "true");
  }
}
export {
  fn as default
};
