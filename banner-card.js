!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = t || self).BannerCard = e());
})(this, function() {
  "use strict";
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ const t = new WeakMap(),
    e = e => "function" == typeof e && t.has(e),
    s =
      void 0 !== window.customElements &&
      void 0 !== window.customElements.polyfillWrapFlushCallback,
    i = (t, e, s = null) => {
      for (; e !== s; ) {
        const s = e.nextSibling;
        t.removeChild(e), (e = s);
      }
    },
    n = {},
    r = {},
    o = `{{lit-${String(Math.random()).slice(2)}}}`,
    a = `\x3c!--${o}--\x3e`,
    c = new RegExp(`${o}|${a}`),
    l = "$lit$";
  class h {
    constructor(t, e) {
      (this.parts = []), (this.element = e);
      const s = [],
        i = [],
        n = document.createTreeWalker(e.content, 133, null, !1);
      let r = 0,
        a = -1,
        h = 0;
      const {
        strings: u,
        values: { length: f }
      } = t;
      for (; h < f; ) {
        const t = n.nextNode();
        if (null !== t) {
          if ((a++, 1 === t.nodeType)) {
            if (t.hasAttributes()) {
              const e = t.attributes,
                { length: s } = e;
              let i = 0;
              for (let t = 0; t < s; t++) d(e[t].name, l) && i++;
              for (; i-- > 0; ) {
                const e = u[h],
                  s = m.exec(e)[2],
                  i = s.toLowerCase() + l,
                  n = t.getAttribute(i);
                t.removeAttribute(i);
                const r = n.split(c);
                this.parts.push({
                  type: "attribute",
                  index: a,
                  name: s,
                  strings: r
                }),
                  (h += r.length - 1);
              }
            }
            "TEMPLATE" === t.tagName &&
              (i.push(t), (n.currentNode = t.content));
          } else if (3 === t.nodeType) {
            const e = t.data;
            if (e.indexOf(o) >= 0) {
              const i = t.parentNode,
                n = e.split(c),
                r = n.length - 1;
              for (let e = 0; e < r; e++) {
                let s,
                  r = n[e];
                if ("" === r) s = p();
                else {
                  const t = m.exec(r);
                  null !== t &&
                    d(t[2], l) &&
                    (r =
                      r.slice(0, t.index) +
                      t[1] +
                      t[2].slice(0, -l.length) +
                      t[3]),
                    (s = document.createTextNode(r));
                }
                i.insertBefore(s, t),
                  this.parts.push({ type: "node", index: ++a });
              }
              "" === n[r]
                ? (i.insertBefore(p(), t), s.push(t))
                : (t.data = n[r]),
                (h += r);
            }
          } else if (8 === t.nodeType)
            if (t.data === o) {
              const e = t.parentNode;
              (null !== t.previousSibling && a !== r) ||
                (a++, e.insertBefore(p(), t)),
                (r = a),
                this.parts.push({ type: "node", index: a }),
                null === t.nextSibling ? (t.data = "") : (s.push(t), a--),
                h++;
            } else {
              let e = -1;
              for (; -1 !== (e = t.data.indexOf(o, e + 1)); )
                this.parts.push({ type: "node", index: -1 }), h++;
            }
        } else n.currentNode = i.pop();
      }
      for (const t of s) t.parentNode.removeChild(t);
    }
  }
  const d = (t, e) => {
      const s = t.length - e.length;
      return s >= 0 && t.slice(s) === e;
    },
    u = t => -1 !== t.index,
    p = () => document.createComment(""),
    m = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class f {
    constructor(t, e, s) {
      (this.__parts = []),
        (this.template = t),
        (this.processor = e),
        (this.options = s);
    }
    update(t) {
      let e = 0;
      for (const s of this.__parts) void 0 !== s && s.setValue(t[e]), e++;
      for (const t of this.__parts) void 0 !== t && t.commit();
    }
    _clone() {
      const t = s
          ? this.template.element.content.cloneNode(!0)
          : document.importNode(this.template.element.content, !0),
        e = [],
        i = this.template.parts,
        n = document.createTreeWalker(t, 133, null, !1);
      let r,
        o = 0,
        a = 0,
        c = n.nextNode();
      for (; o < i.length; )
        if (((r = i[o]), u(r))) {
          for (; a < r.index; )
            a++,
              "TEMPLATE" === c.nodeName &&
                (e.push(c), (n.currentNode = c.content)),
              null === (c = n.nextNode()) &&
                ((n.currentNode = e.pop()), (c = n.nextNode()));
          if ("node" === r.type) {
            const t = this.processor.handleTextExpression(this.options);
            t.insertAfterNode(c.previousSibling), this.__parts.push(t);
          } else
            this.__parts.push(
              ...this.processor.handleAttributeExpressions(
                c,
                r.name,
                r.strings,
                this.options
              )
            );
          o++;
        } else this.__parts.push(void 0), o++;
      return s && (document.adoptNode(t), customElements.upgrade(t)), t;
    }
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ const y = ` ${o} `;
  class _ {
    constructor(t, e, s, i) {
      (this.strings = t),
        (this.values = e),
        (this.type = s),
        (this.processor = i);
    }
    getHTML() {
      const t = this.strings.length - 1;
      let e = "",
        s = !1;
      for (let i = 0; i < t; i++) {
        const t = this.strings[i],
          n = t.lastIndexOf("\x3c!--");
        s = (n > -1 || s) && -1 === t.indexOf("--\x3e", n + 1);
        const r = m.exec(t);
        e +=
          null === r
            ? t + (s ? y : a)
            : t.substr(0, r.index) + r[1] + r[2] + l + r[3] + o;
      }
      return (e += this.strings[t]);
    }
    getTemplateElement() {
      const t = document.createElement("template");
      return (t.innerHTML = this.getHTML()), t;
    }
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ const g = t =>
      null === t || !("object" == typeof t || "function" == typeof t),
    v = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
  class b {
    constructor(t, e, s) {
      (this.dirty = !0),
        (this.element = t),
        (this.name = e),
        (this.strings = s),
        (this.parts = []);
      for (let t = 0; t < s.length - 1; t++) this.parts[t] = this._createPart();
    }
    _createPart() {
      return new w(this);
    }
    _getValue() {
      const t = this.strings,
        e = t.length - 1;
      let s = "";
      for (let i = 0; i < e; i++) {
        s += t[i];
        const e = this.parts[i];
        if (void 0 !== e) {
          const t = e.value;
          if (g(t) || !v(t)) s += "string" == typeof t ? t : String(t);
          else for (const e of t) s += "string" == typeof e ? e : String(e);
        }
      }
      return (s += t[e]);
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1),
        this.element.setAttribute(this.name, this._getValue()));
    }
  }
  class w {
    constructor(t) {
      (this.value = void 0), (this.committer = t);
    }
    setValue(t) {
      t === n ||
        (g(t) && t === this.value) ||
        ((this.value = t), e(t) || (this.committer.dirty = !0));
    }
    commit() {
      for (; e(this.value); ) {
        const t = this.value;
        (this.value = n), t(this);
      }
      this.value !== n && this.committer.commit();
    }
  }
  class S {
    constructor(t) {
      (this.value = void 0), (this.__pendingValue = void 0), (this.options = t);
    }
    appendInto(t) {
      (this.startNode = t.appendChild(p())),
        (this.endNode = t.appendChild(p()));
    }
    insertAfterNode(t) {
      (this.startNode = t), (this.endNode = t.nextSibling);
    }
    appendIntoPart(t) {
      t.__insert((this.startNode = p())), t.__insert((this.endNode = p()));
    }
    insertAfterPart(t) {
      t.__insert((this.startNode = p())),
        (this.endNode = t.endNode),
        (t.endNode = this.startNode);
    }
    setValue(t) {
      this.__pendingValue = t;
    }
    commit() {
      for (; e(this.__pendingValue); ) {
        const t = this.__pendingValue;
        (this.__pendingValue = n), t(this);
      }
      const t = this.__pendingValue;
      t !== n &&
        (g(t)
          ? t !== this.value && this.__commitText(t)
          : t instanceof _
          ? this.__commitTemplateResult(t)
          : t instanceof Node
          ? this.__commitNode(t)
          : v(t)
          ? this.__commitIterable(t)
          : t === r
          ? ((this.value = r), this.clear())
          : this.__commitText(t));
    }
    __insert(t) {
      this.endNode.parentNode.insertBefore(t, this.endNode);
    }
    __commitNode(t) {
      this.value !== t && (this.clear(), this.__insert(t), (this.value = t));
    }
    __commitText(t) {
      const e = this.startNode.nextSibling,
        s = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
      e === this.endNode.previousSibling && 3 === e.nodeType
        ? (e.data = s)
        : this.__commitNode(document.createTextNode(s)),
        (this.value = t);
    }
    __commitTemplateResult(t) {
      const e = this.options.templateFactory(t);
      if (this.value instanceof f && this.value.template === e)
        this.value.update(t.values);
      else {
        const s = new f(e, t.processor, this.options),
          i = s._clone();
        s.update(t.values), this.__commitNode(i), (this.value = s);
      }
    }
    __commitIterable(t) {
      Array.isArray(this.value) || ((this.value = []), this.clear());
      const e = this.value;
      let s,
        i = 0;
      for (const n of t)
        void 0 === (s = e[i]) &&
          ((s = new S(this.options)),
          e.push(s),
          0 === i ? s.appendIntoPart(this) : s.insertAfterPart(e[i - 1])),
          s.setValue(n),
          s.commit(),
          i++;
      i < e.length && ((e.length = i), this.clear(s && s.endNode));
    }
    clear(t = this.startNode) {
      i(this.startNode.parentNode, t.nextSibling, this.endNode);
    }
  }
  class x {
    constructor(t, e, s) {
      if (
        ((this.value = void 0),
        (this.__pendingValue = void 0),
        2 !== s.length || "" !== s[0] || "" !== s[1])
      )
        throw new Error(
          "Boolean attributes can only contain a single expression"
        );
      (this.element = t), (this.name = e), (this.strings = s);
    }
    setValue(t) {
      this.__pendingValue = t;
    }
    commit() {
      for (; e(this.__pendingValue); ) {
        const t = this.__pendingValue;
        (this.__pendingValue = n), t(this);
      }
      if (this.__pendingValue === n) return;
      const t = !!this.__pendingValue;
      this.value !== t &&
        (t
          ? this.element.setAttribute(this.name, "")
          : this.element.removeAttribute(this.name),
        (this.value = t)),
        (this.__pendingValue = n);
    }
  }
  class C extends b {
    constructor(t, e, s) {
      super(t, e, s),
        (this.single = 2 === s.length && "" === s[0] && "" === s[1]);
    }
    _createPart() {
      return new P(this);
    }
    _getValue() {
      return this.single ? this.parts[0].value : super._getValue();
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1), (this.element[this.name] = this._getValue()));
    }
  }
  class P extends w {}
  let N = !1;
  try {
    const t = {
      get capture() {
        return (N = !0), !1;
      }
    };
    window.addEventListener("test", t, t),
      window.removeEventListener("test", t, t);
  } catch (t) {}
  class k {
    constructor(t, e, s) {
      (this.value = void 0),
        (this.__pendingValue = void 0),
        (this.element = t),
        (this.eventName = e),
        (this.eventContext = s),
        (this.__boundHandleEvent = t => this.handleEvent(t));
    }
    setValue(t) {
      this.__pendingValue = t;
    }
    commit() {
      for (; e(this.__pendingValue); ) {
        const t = this.__pendingValue;
        (this.__pendingValue = n), t(this);
      }
      if (this.__pendingValue === n) return;
      const t = this.__pendingValue,
        s = this.value,
        i =
          null == t ||
          (null != s &&
            (t.capture !== s.capture ||
              t.once !== s.once ||
              t.passive !== s.passive)),
        r = null != t && (null == s || i);
      i &&
        this.element.removeEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        ),
        r &&
          ((this.__options = $(t)),
          this.element.addEventListener(
            this.eventName,
            this.__boundHandleEvent,
            this.__options
          )),
        (this.value = t),
        (this.__pendingValue = n);
    }
    handleEvent(t) {
      "function" == typeof this.value
        ? this.value.call(this.eventContext || this.element, t)
        : this.value.handleEvent(t);
    }
  }
  const $ = t =>
    t &&
    (N ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture);
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ const E = new (class {
    handleAttributeExpressions(t, e, s, i) {
      const n = e[0];
      if ("." === n) {
        return new C(t, e.slice(1), s).parts;
      }
      return "@" === n
        ? [new k(t, e.slice(1), i.eventContext)]
        : "?" === n
        ? [new x(t, e.slice(1), s)]
        : new b(t, e, s).parts;
    }
    handleTextExpression(t) {
      return new S(t);
    }
  })();
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ function A(t) {
    let e = T.get(t.type);
    void 0 === e &&
      ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
      T.set(t.type, e));
    let s = e.stringsArray.get(t.strings);
    if (void 0 !== s) return s;
    const i = t.strings.join(o);
    return (
      void 0 === (s = e.keyString.get(i)) &&
        ((s = new h(t, t.getTemplateElement())), e.keyString.set(i, s)),
      e.stringsArray.set(t.strings, s),
      s
    );
  }
  const T = new Map(),
    V = new WeakMap();
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.1.2");
  const z = (t, ...e) => new _(t, e, "html", E),
    O = 133;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ function j(t, e) {
    const {
        element: { content: s },
        parts: i
      } = t,
      n = document.createTreeWalker(s, O, null, !1);
    let r = U(i),
      o = i[r],
      a = -1,
      c = 0;
    const l = [];
    let h = null;
    for (; n.nextNode(); ) {
      a++;
      const t = n.currentNode;
      for (
        t.previousSibling === h && (h = null),
          e.has(t) && (l.push(t), null === h && (h = t)),
          null !== h && c++;
        void 0 !== o && o.index === a;

      )
        (o.index = null !== h ? -1 : o.index - c), (o = i[(r = U(i, r))]);
    }
    l.forEach(t => t.parentNode.removeChild(t));
  }
  const M = t => {
      let e = 11 === t.nodeType ? 0 : 1;
      const s = document.createTreeWalker(t, O, null, !1);
      for (; s.nextNode(); ) e++;
      return e;
    },
    U = (t, e = -1) => {
      for (let s = e + 1; s < t.length; s++) {
        const e = t[s];
        if (u(e)) return s;
      }
      return -1;
    };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const R = (t, e) => `${t}--${e}`;
  let q = !0;
  void 0 === window.ShadyCSS
    ? (q = !1)
    : void 0 === window.ShadyCSS.prepareTemplateDom &&
      (console.warn(
        "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
      ),
      (q = !1));
  const I = t => e => {
      const s = R(e.type, t);
      let i = T.get(s);
      void 0 === i &&
        ((i = { stringsArray: new WeakMap(), keyString: new Map() }),
        T.set(s, i));
      let n = i.stringsArray.get(e.strings);
      if (void 0 !== n) return n;
      const r = e.strings.join(o);
      if (void 0 === (n = i.keyString.get(r))) {
        const s = e.getTemplateElement();
        q && window.ShadyCSS.prepareTemplateDom(s, t),
          (n = new h(e, s)),
          i.keyString.set(r, n);
      }
      return i.stringsArray.set(e.strings, n), n;
    },
    B = ["html", "svg"],
    F = new Set(),
    H = (t, e, s) => {
      F.add(t);
      const i = s ? s.element : document.createElement("template"),
        n = e.querySelectorAll("style"),
        { length: r } = n;
      if (0 === r) return void window.ShadyCSS.prepareTemplateStyles(i, t);
      const o = document.createElement("style");
      for (let t = 0; t < r; t++) {
        const e = n[t];
        e.parentNode.removeChild(e), (o.textContent += e.textContent);
      }
      (t => {
        B.forEach(e => {
          const s = T.get(R(e, t));
          void 0 !== s &&
            s.keyString.forEach(t => {
              const {
                  element: { content: e }
                } = t,
                s = new Set();
              Array.from(e.querySelectorAll("style")).forEach(t => {
                s.add(t);
              }),
                j(t, s);
            });
        });
      })(t);
      const a = i.content;
      s
        ? (function(t, e, s = null) {
            const {
              element: { content: i },
              parts: n
            } = t;
            if (null == s) return void i.appendChild(e);
            const r = document.createTreeWalker(i, O, null, !1);
            let o = U(n),
              a = 0,
              c = -1;
            for (; r.nextNode(); ) {
              for (
                c++,
                  r.currentNode === s &&
                    ((a = M(e)), s.parentNode.insertBefore(e, s));
                -1 !== o && n[o].index === c;

              ) {
                if (a > 0) {
                  for (; -1 !== o; ) (n[o].index += a), (o = U(n, o));
                  return;
                }
                o = U(n, o);
              }
            }
          })(s, o, a.firstChild)
        : a.insertBefore(o, a.firstChild),
        window.ShadyCSS.prepareTemplateStyles(i, t);
      const c = a.querySelector("style");
      if (window.ShadyCSS.nativeShadow && null !== c)
        e.insertBefore(c.cloneNode(!0), e.firstChild);
      else if (s) {
        a.insertBefore(o, a.firstChild);
        const t = new Set();
        t.add(o), j(s, t);
      }
    };
  window.JSCompiler_renameProperty = (t, e) => t;
  const D = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            return t ? "" : null;
          case Object:
          case Array:
            return null == t ? t : JSON.stringify(t);
        }
        return t;
      },
      fromAttribute(t, e) {
        switch (e) {
          case Boolean:
            return null !== t;
          case Number:
            return null === t ? null : Number(t);
          case Object:
          case Array:
            return JSON.parse(t);
        }
        return t;
      }
    },
    L = (t, e) => e !== t && (e == e || t == t),
    W = {
      attribute: !0,
      type: String,
      converter: D,
      reflect: !1,
      hasChanged: L
    },
    J = Promise.resolve(!0),
    Y = 1,
    G = 4,
    K = 8,
    Q = 16,
    X = 32,
    Z = "finalized";
  class tt extends HTMLElement {
    constructor() {
      super(),
        (this._updateState = 0),
        (this._instanceProperties = void 0),
        (this._updatePromise = J),
        (this._hasConnectedResolver = void 0),
        (this._changedProperties = new Map()),
        (this._reflectingProperties = void 0),
        this.initialize();
    }
    static get observedAttributes() {
      this.finalize();
      const t = [];
      return (
        this._classProperties.forEach((e, s) => {
          const i = this._attributeNameForProperty(s, e);
          void 0 !== i && (this._attributeToPropertyMap.set(i, s), t.push(i));
        }),
        t
      );
    }
    static _ensureClassProperties() {
      if (
        !this.hasOwnProperty(
          JSCompiler_renameProperty("_classProperties", this)
        )
      ) {
        this._classProperties = new Map();
        const t = Object.getPrototypeOf(this)._classProperties;
        void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
      }
    }
    static createProperty(t, e = W) {
      if (
        (this._ensureClassProperties(),
        this._classProperties.set(t, e),
        e.noAccessor || this.prototype.hasOwnProperty(t))
      )
        return;
      const s = "symbol" == typeof t ? Symbol() : `__${t}`;
      Object.defineProperty(this.prototype, t, {
        get() {
          return this[s];
        },
        set(e) {
          const i = this[t];
          (this[s] = e), this._requestUpdate(t, i);
        },
        configurable: !0,
        enumerable: !0
      });
    }
    static finalize() {
      const t = Object.getPrototypeOf(this);
      if (
        (t.hasOwnProperty(Z) || t.finalize(),
        (this[Z] = !0),
        this._ensureClassProperties(),
        (this._attributeToPropertyMap = new Map()),
        this.hasOwnProperty(JSCompiler_renameProperty("properties", this)))
      ) {
        const t = this.properties,
          e = [
            ...Object.getOwnPropertyNames(t),
            ...("function" == typeof Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols(t)
              : [])
          ];
        for (const s of e) this.createProperty(s, t[s]);
      }
    }
    static _attributeNameForProperty(t, e) {
      const s = e.attribute;
      return !1 === s
        ? void 0
        : "string" == typeof s
        ? s
        : "string" == typeof t
        ? t.toLowerCase()
        : void 0;
    }
    static _valueHasChanged(t, e, s = L) {
      return s(t, e);
    }
    static _propertyValueFromAttribute(t, e) {
      const s = e.type,
        i = e.converter || D,
        n = "function" == typeof i ? i : i.fromAttribute;
      return n ? n(t, s) : t;
    }
    static _propertyValueToAttribute(t, e) {
      if (void 0 === e.reflect) return;
      const s = e.type,
        i = e.converter;
      return ((i && i.toAttribute) || D.toAttribute)(t, s);
    }
    initialize() {
      this._saveInstanceProperties(), this._requestUpdate();
    }
    _saveInstanceProperties() {
      this.constructor._classProperties.forEach((t, e) => {
        if (this.hasOwnProperty(e)) {
          const t = this[e];
          delete this[e],
            this._instanceProperties || (this._instanceProperties = new Map()),
            this._instanceProperties.set(e, t);
        }
      });
    }
    _applyInstanceProperties() {
      this._instanceProperties.forEach((t, e) => (this[e] = t)),
        (this._instanceProperties = void 0);
    }
    connectedCallback() {
      (this._updateState = this._updateState | X),
        this._hasConnectedResolver &&
          (this._hasConnectedResolver(), (this._hasConnectedResolver = void 0));
    }
    disconnectedCallback() {}
    attributeChangedCallback(t, e, s) {
      e !== s && this._attributeToProperty(t, s);
    }
    _propertyToAttribute(t, e, s = W) {
      const i = this.constructor,
        n = i._attributeNameForProperty(t, s);
      if (void 0 !== n) {
        const t = i._propertyValueToAttribute(e, s);
        if (void 0 === t) return;
        (this._updateState = this._updateState | K),
          null == t ? this.removeAttribute(n) : this.setAttribute(n, t),
          (this._updateState = this._updateState & ~K);
      }
    }
    _attributeToProperty(t, e) {
      if (this._updateState & K) return;
      const s = this.constructor,
        i = s._attributeToPropertyMap.get(t);
      if (void 0 !== i) {
        const t = s._classProperties.get(i) || W;
        (this._updateState = this._updateState | Q),
          (this[i] = s._propertyValueFromAttribute(e, t)),
          (this._updateState = this._updateState & ~Q);
      }
    }
    _requestUpdate(t, e) {
      let s = !0;
      if (void 0 !== t) {
        const i = this.constructor,
          n = i._classProperties.get(t) || W;
        i._valueHasChanged(this[t], e, n.hasChanged)
          ? (this._changedProperties.has(t) ||
              this._changedProperties.set(t, e),
            !0 !== n.reflect ||
              this._updateState & Q ||
              (void 0 === this._reflectingProperties &&
                (this._reflectingProperties = new Map()),
              this._reflectingProperties.set(t, n)))
          : (s = !1);
      }
      !this._hasRequestedUpdate && s && this._enqueueUpdate();
    }
    requestUpdate(t, e) {
      return this._requestUpdate(t, e), this.updateComplete;
    }
    async _enqueueUpdate() {
      let t, e;
      this._updateState = this._updateState | G;
      const s = this._updatePromise;
      this._updatePromise = new Promise((s, i) => {
        (t = s), (e = i);
      });
      try {
        await s;
      } catch (t) {}
      this._hasConnected ||
        (await new Promise(t => (this._hasConnectedResolver = t)));
      try {
        const t = this.performUpdate();
        null != t && (await t);
      } catch (t) {
        e(t);
      }
      t(!this._hasRequestedUpdate);
    }
    get _hasConnected() {
      return this._updateState & X;
    }
    get _hasRequestedUpdate() {
      return this._updateState & G;
    }
    get hasUpdated() {
      return this._updateState & Y;
    }
    performUpdate() {
      this._instanceProperties && this._applyInstanceProperties();
      let t = !1;
      const e = this._changedProperties;
      try {
        (t = this.shouldUpdate(e)) && this.update(e);
      } catch (e) {
        throw ((t = !1), e);
      } finally {
        this._markUpdated();
      }
      t &&
        (this._updateState & Y ||
          ((this._updateState = this._updateState | Y), this.firstUpdated(e)),
        this.updated(e));
    }
    _markUpdated() {
      (this._changedProperties = new Map()),
        (this._updateState = this._updateState & ~G);
    }
    get updateComplete() {
      return this._getUpdateComplete();
    }
    _getUpdateComplete() {
      return this._updatePromise;
    }
    shouldUpdate(t) {
      return !0;
    }
    update(t) {
      void 0 !== this._reflectingProperties &&
        this._reflectingProperties.size > 0 &&
        (this._reflectingProperties.forEach((t, e) =>
          this._propertyToAttribute(e, this[e], t)
        ),
        (this._reflectingProperties = void 0));
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  tt[Z] = !0;
  /**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */
  const et =
      "adoptedStyleSheets" in Document.prototype &&
      "replace" in CSSStyleSheet.prototype,
    st = Symbol();
  class it {
    constructor(t, e) {
      if (e !== st)
        throw new Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      this.cssText = t;
    }
    get styleSheet() {
      return (
        void 0 === this._styleSheet &&
          (et
            ? ((this._styleSheet = new CSSStyleSheet()),
              this._styleSheet.replaceSync(this.cssText))
            : (this._styleSheet = null)),
        this._styleSheet
      );
    }
    toString() {
      return this.cssText;
    }
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  (window.litElementVersions || (window.litElementVersions = [])).push("2.2.1");
  const nt = t =>
    t.flat
      ? t.flat(1 / 0)
      : (function t(e, s = []) {
          for (let i = 0, n = e.length; i < n; i++) {
            const n = e[i];
            Array.isArray(n) ? t(n, s) : s.push(n);
          }
          return s;
        })(t);
  class rt extends tt {
    static finalize() {
      super.finalize.call(this),
        (this._styles = this.hasOwnProperty(
          JSCompiler_renameProperty("styles", this)
        )
          ? this._getUniqueStyles()
          : this._styles || []);
    }
    static _getUniqueStyles() {
      const t = this.styles,
        e = [];
      if (Array.isArray(t)) {
        nt(t)
          .reduceRight((t, e) => (t.add(e), t), new Set())
          .forEach(t => e.unshift(t));
      } else t && e.push(t);
      return e;
    }
    initialize() {
      super.initialize(),
        (this.renderRoot = this.createRenderRoot()),
        window.ShadowRoot &&
          this.renderRoot instanceof window.ShadowRoot &&
          this.adoptStyles();
    }
    createRenderRoot() {
      return this.attachShadow({ mode: "open" });
    }
    adoptStyles() {
      const t = this.constructor._styles;
      0 !== t.length &&
        (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
          ? et
            ? (this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet))
            : (this._needsShimAdoptedStyleSheets = !0)
          : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
              t.map(t => t.cssText),
              this.localName
            ));
    }
    connectedCallback() {
      super.connectedCallback(),
        this.hasUpdated &&
          void 0 !== window.ShadyCSS &&
          window.ShadyCSS.styleElement(this);
    }
    update(t) {
      super.update(t);
      const e = this.render();
      e instanceof _ &&
        this.constructor.render(e, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        }),
        this._needsShimAdoptedStyleSheets &&
          ((this._needsShimAdoptedStyleSheets = !1),
          this.constructor._styles.forEach(t => {
            const e = document.createElement("style");
            (e.textContent = t.cssText), this.renderRoot.appendChild(e);
          }));
    }
    render() {}
  }
  (rt.finalized = !0),
    (rt.render = (t, e, s) => {
      if (!s || "object" != typeof s || !s.scopeName)
        throw new Error("The `scopeName` option is required.");
      const n = s.scopeName,
        r = V.has(e),
        o = q && 11 === e.nodeType && !!e.host,
        a = o && !F.has(n),
        c = a ? document.createDocumentFragment() : e;
      if (
        (((t, e, s) => {
          let n = V.get(e);
          void 0 === n &&
            (i(e, e.firstChild),
            V.set(e, (n = new S(Object.assign({ templateFactory: A }, s)))),
            n.appendInto(e)),
            n.setValue(t),
            n.commit();
        })(t, c, Object.assign({ templateFactory: I(n) }, s)),
        a)
      ) {
        const t = V.get(c);
        V.delete(c);
        const s = t.value instanceof f ? t.value.template : void 0;
        H(n, c, s), i(e, e.firstChild), e.appendChild(c), V.set(e, t);
      }
      !r && o && window.ShadyCSS.styleElement(e.host);
    });
  var ot = ((t, ...e) => {
    const s = e.reduce(
      (e, s, i) =>
        e +
        (t => {
          if (t instanceof it) return t.cssText;
          if ("number" == typeof t) return t;
          throw new Error(
            `Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`
          );
        })(s) +
        t[i + 1],
      t[0]
    );
    return new it(s, st);
  })`:host{--bc-font-size-heading:var(--banner-card-heading-size, 3em);--bc-font-size-entity-value:var(--banner-card-entity-value-size, 1.5em);--bc-font-size-media-title:var(--banner-card-media-title-size, 0.9em);--bc-spacing:var(--banner-card-spacing, 4px);--bc-button-size:var(--banner-card-button-size, 32px);--bc-heading-color-dark:var(
      --banner-card-heading-color-dark,
      var(--primary-text-color)
    );--bc-heading-color-light:var(--banner-card-heading-color-light, #fff)}ha-card{display:flex;flex-direction:column;align-items:center}paper-icon-button{width:var(--bc-button-size);height:var(--bc-button-size);padding:var(--bc-spacing)}.heading{display:block;font-size:var(--bc-font-size-heading);font-weight:300;cursor:pointer;align-self:stretch;text-align:center}.overlay-strip{background:rgba(0,0,0,.3);overflow:hidden;width:100%}.entities{padding:calc(var(--bc-spacing) * 2) 0;color:#fff;display:grid}.entity-state{display:flex;flex-direction:column;align-items:center;margin:calc(var(--bc-spacing) * 2) 0;box-shadow:-1px 0 0 0 #fff;width:100%}.media-title{flex:1 0;overflow:hidden;font-weight:300;font-size:var(--bc-font-size-media-title);white-space:nowrap;text-overflow:ellipsis}.media-controls{display:flex;flex:0 0 calc(var(--bc-button-size) * 3)}.entity-state.expand .entity-value{width:100%}.entity-state-left{margin-right:auto;margin-left:16px}.entity-state-right{margin-left:auto;margin-right:16px}.entity-name{font-weight:700;white-space:nowrap}.entity-value{display:flex;width:100%;flex:1 0;padding-top:var(--bc-spacing);font-size:var(--bc-font-size-entity-value);align-items:center;justify-content:center}.entity-value.error{display:inline-block;word-wrap:break-word;font-size:16px;width:90%}.entity-value ha-icon{color:#fff}mwc-button{--mdc-theme-primary:white}mwc-switch{--mdc-theme-secondary:white}`;
  function at({ state: t, attributes: e }, s = !1) {
    return "string" == typeof s && e.hasOwnProperty(s) ? e[s] : t;
  }
  function ct(t) {
    return "object" == typeof t
      ? ((e = t),
        (s = t => (!1 === t ? null : t)),
        Object.entries(e).reduce((t, [e, i]) => ({ ...t, [e]: s(i, e) }), {}))
      : { entity: t };
    var e, s;
  }
  const lt = {
    "=": (t, e) => e.includes(t),
    ">": (t, e) => t > e[0],
    "<": (t, e) => t < e[0],
    "!=": (t, e) => !e.includes(t)
  };
  function ht(t, e) {
    if (["string", "number", "boolean"].includes(typeof t))
      return lt["="](e, [t]);
    if (Array.isArray(t)) {
      const [s, ...i] = t;
      return lt.hasOwnProperty(s) ? lt[s](e, i) : lt["="](e, i);
    }
    throw new Error(`Couldn't find a valid matching strategy for '${t}'`);
  }
  const dt = /^(mdi|hass):/;
  class ut extends rt {
    static get properties() {
      return {
        config: Object,
        color: String,
        entities: Array,
        entityValues: Array,
        rowSize: Number,
        _hass: Object
      };
    }
    static get styles() {
      return [ot];
    }
    constructor() {
      super(), (this.config = {}), (this.entities = []), (this._hass = {});
    }
    setConfig(t) {
      if (void 0 === t.heading) throw new Error("You need to define a heading");
      if (
        ((this.entities = (t.entities || []).map(ct)),
        (this.config = t),
        (this.color =
          t.color ||
          (function(t, e, s) {
            if (!t || "#" !== t[0]) return s;
            if (3 === (t = t.substring(1)).length) {
              const [e, s, i] = t;
              t = [e, e, s, s, i, i].join("");
            }
            if (6 !== t.length) return s;
            const i = [
                parseInt(t.slice(0, 2), 16) / 255,
                parseInt(t.slice(2, 4), 16) / 255,
                parseInt(t.slice(4, 6), 16) / 255
              ],
              [n, r, o] = i.map(t =>
                t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4)
              );
            return 0.2126 * n + 0.7152 * r + 0.0722 * o > 0.179 ? s : e;
          })(
            t.background,
            "var(--bc-heading-color-light)",
            "var(--bc-heading-color-dark)"
          )),
        void 0 !== t.row_size)
      ) {
        if (t.row_size < 1) throw new Error("row_size must be at least 1");
        this.rowSize = t.row_size;
      }
      this.rowSize = this.rowSize || 3;
    }
    set hass(t) {
      (this._hass = t),
        (this.entityValues = this.entities
          .filter(e =>
            (function(t, e) {
              if (t.when) {
                const { state: s, entity: i = t.entity, attributes: n } =
                    "string" == typeof t.when ? { state: t.when } : t.when,
                  r = e[i];
                return (
                  !(void 0 !== s && !ht(s, r.state)) &&
                  Object.entries(n || {}).every(([t, e]) => {
                    return ht(e, r.attributes[t]);
                  })
                );
              }
              return !0;
            })(e, t.states)
          )
          .map(t => this.parseEntity(t)));
    }
    parseEntity(t) {
      const e = this._hass;
      if (!e.states.hasOwnProperty(t.entity))
        return { ...t, error: "Entity not ready" };
      const s = e.states[t.entity],
        i = s.attributes,
        n = {};
      if (t.map_state && s.state in t.map_state) {
        const e = t.map_state[s.state],
          i = typeof e;
        "string" === i
          ? (n.value = e)
          : "object" === i &&
            Object.entries(e).forEach(([t, e]) => {
              n[t] = e;
            });
      }
      if (e.states[t.entity].attributes.hasOwnProperty("current_position")) {
        return {
          ...{
            name: i.friendly_name,
            state: i.current_position,
            value: at(s, t.attribute),
            unit: i.unit_of_measurement,
            attributes: i,
            domain: t.entity.split(".")[0]
          },
          ...t,
          ...n
        };
      }
      return {
        ...{
          name: i.friendly_name,
          state: s.state,
          value: at(s, t.attribute),
          unit: i.unit_of_measurement,
          attributes: i,
          domain: t.entity.split(".")[0]
        },
        ...t,
        ...n
      };
    }
    grid(t = 1) {
      return "full" === t || t > this.rowSize
        ? `grid-column: span ${this.rowSize};`
        : `grid-column: span ${t};`;
    }
    _service(t, e, s) {
      return () => this._hass.callService(t, e, { entity_id: s });
    }
    render() {
      return z`<ha-card style=background:${
        this.config.background
      }>${this.renderHeading()} ${this.renderEntities()}</ha-card>`;
    }
    renderHeading() {
      if (!1 === this.config.heading) return null;
      return z`<h2 class=heading @click=${() =>
        this.config.link &&
        this.navigate(
          this.config.link
        )} style=color:${this.color}>${this.config.heading}</h2>`;
    }
    renderEntities() {
      return 0 === this.entityValues.length
        ? null
        : z`<div class=overlay-strip><div class=entities style=grid-template-columns:repeat(${
            this.rowSize
          },1fr)>${this.entityValues.map(t => {
            if (t.error)
              return z`<div class=entity-state style=${this.grid(
                t.size
              )}><span class=entity-name>${
                t.error
              }</span> <span class="entity-value error">${
                t.entity
              }</span></div>`;
            const e = { ...t, onClick: () => this.openEntityPopover(t.entity) };
            if (t.action)
              return this.renderCustom({
                ...e,
                action: () => {
                  const { service: e, ...s } = t.action,
                    [i, n] = e.split(".");
                  this._hass.callService(i, n, { entity_id: t.entity, ...s });
                }
              });
            if (!t.attribute)
              switch (t.domain) {
                case "light":
                case "switch":
                case "input_boolean":
                  return this.renderAsToggle(e);
                case "cover":
                  return this.renderDomainCover(e);
                case "media_player":
                  return this.renderDomainMediaPlayer(e);
              }
            return this.renderDomainDefault(e);
          })}</div></div>`;
    }
    renderValue({ icon: t, value: e, image: s, action: i, click: n }, r) {
      return t ||
        (function(t) {
          return "string" == typeof t && t.match(dt);
        })(e)
        ? z`<ha-icon .icon=${t || e} @click=${n}></ha-icon>`
        : !0 === s
        ? z`<state-badge style="background-image:url('${e}')" @click=${n}></state-badge>`
        : r();
    }
    renderDomainDefault({
      value: t,
      unit: e,
      image: s,
      icon: i,
      name: n,
      size: r,
      onClick: o
    }) {
      const a = this.renderValue(
        { icon: i, image: s, value: t, click: o },
        () => z`${t} ${e}`
      );
      return z`<div class=entity-state style=${this.grid(
        r
      )} @click=${o}><span class=entity-name>${n}</span> <span class=entity-value>${a}</span></div>`;
    }
    renderCustom({
      value: t,
      unit: e,
      action: s,
      image: i,
      icon: n,
      name: r,
      size: o,
      onClick: a
    }) {
      const c = this.renderValue(
        { icon: n, image: i, value: t, click: s },
        () => z`<mwc-button ?dense=${!0} @click=${s}>${t} ${e}</mwc-button>`
      );
      return z`<div class=entity-state style=${this.grid(
        o
      )}><span class=entity-name @click=${a}>${r}</span> <span class=entity-value>${c}</span></div>`;
    }
    renderDomainMediaPlayer({
      onClick: t,
      attributes: e,
      size: s,
      name: i,
      state: n,
      entity: r,
      domain: o
    }) {
      const a = "playing" === n,
        c = a ? "media_pause" : "media_play",
        l = [e.media_artist, e.media_title].join(" – ");
      return z`<div class=entity-state style=${this.grid(
        s || "full"
      )}><span class=entity-name @click=${t}>${i}</span><div class=entity-value><div class="entity-state-left media-title">${l}</div><div class="entity-state-right media-controls"><paper-icon-button icon=mdi:skip-previous role=button @click=${this._service(o, "media_previous_track", r)}></paper-icon-button><paper-icon-button icon=${a ? "mdi:stop" : "mdi:play"} role=button @click=${this._service(o, c, r)}></paper-icon-button><paper-icon-button icon=mdi:skip-next role=button @click=${this._service(o, "media_next_track", r)}></paper-icon-button></div></div></div>`;
    }
    renderAsToggle({
      onClick: t,
      size: e,
      name: s,
      state: i,
      domain: n,
      entity: r
    }) {
      return z`<div class=entity-state style=${this.grid(
        e
      )}><span class=entity-name @click=${t}>${s}</span> <span class=entity-value><mwc-switch ?checked=${"on" === i} @click=${this._service(n, "toggle", r)}></mwc-switch></span></div>`;
    }
    renderDomainCover({ onClick: t, size: e, name: s, state: i, entity: n }) {
      const r = "closed" === i || 0 === i,
        o = "open" === i || 100 === i;
      return z`<div class=entity-state style=${this.grid(
        e
      )}><span class=entity-name @click=${t}>${s}</span> <span class=entity-value><paper-icon-button ?disabled=${o} icon=hass:arrow-up role=button @click=${this._service("cover", "open_cover", n)}></paper-icon-button><paper-icon-button icon=hass:stop role=button @click=${this._service("cover", "stop_cover", n)}></paper-icon-button><paper-icon-button ?disabled=${r} icon=hass:arrow-down role=button @click=${this._service("cover", "close_cover", n)}></paper-icon-button></span></div>`;
    }
    getCardSize() {
      return 3;
    }
    navigate(t) {
      history.pushState(null, "", t),
        this.fire("location-changed", { replace: !0 });
    }
    openEntityPopover(t) {
      this.fire("hass-more-info", { entityId: t });
    }
    fire(t, e, s) {
      (s = s || {}), (e = null == e ? {} : e);
      const i = new Event(t, {
        bubbles: void 0 === s.bubbles || s.bubbles,
        cancelable: Boolean(s.cancelable),
        composed: void 0 === s.composed || s.composed
      });
      return (i.detail = e), this.dispatchEvent(i), i;
    }
  }
  return window.customElements.define("banner-card", ut), ut;
});
