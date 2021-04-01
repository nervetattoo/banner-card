!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis
          ? globalThis
          : t || self).BannerCard = e());
})(this, function () {
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
   */ const t =
      "undefined" != typeof window &&
      null != window.customElements &&
      void 0 !== window.customElements.polyfillWrapFlushCallback,
    e = (t, e, i = null) => {
      for (; e !== i; ) {
        const i = e.nextSibling;
        t.removeChild(e), (e = i);
      }
    },
    i = `{{lit-${String(Math.random()).slice(2)}}}`,
    s = `\x3c!--${i}--\x3e`,
    n = new RegExp(`${i}|${s}`),
    r = "$lit$";
  class o {
    constructor(t, e) {
      (this.parts = []), (this.element = e);
      const s = [],
        o = [],
        c = document.createTreeWalker(e.content, 133, null, !1);
      let d = 0,
        u = -1,
        p = 0;
      const {
        strings: m,
        values: { length: y },
      } = t;
      for (; p < y; ) {
        const t = c.nextNode();
        if (null !== t) {
          if ((u++, 1 === t.nodeType)) {
            if (t.hasAttributes()) {
              const e = t.attributes,
                { length: i } = e;
              let s = 0;
              for (let t = 0; t < i; t++) a(e[t].name, r) && s++;
              for (; s-- > 0; ) {
                const e = m[p],
                  i = h.exec(e)[2],
                  s = i.toLowerCase() + r,
                  o = t.getAttribute(s);
                t.removeAttribute(s);
                const a = o.split(n);
                this.parts.push({
                  type: "attribute",
                  index: u,
                  name: i,
                  strings: a,
                }),
                  (p += a.length - 1);
              }
            }
            "TEMPLATE" === t.tagName &&
              (o.push(t), (c.currentNode = t.content));
          } else if (3 === t.nodeType) {
            const e = t.data;
            if (e.indexOf(i) >= 0) {
              const i = t.parentNode,
                o = e.split(n),
                c = o.length - 1;
              for (let e = 0; e < c; e++) {
                let s,
                  n = o[e];
                if ("" === n) s = l();
                else {
                  const t = h.exec(n);
                  null !== t &&
                    a(t[2], r) &&
                    (n =
                      n.slice(0, t.index) +
                      t[1] +
                      t[2].slice(0, -r.length) +
                      t[3]),
                    (s = document.createTextNode(n));
                }
                i.insertBefore(s, t),
                  this.parts.push({ type: "node", index: ++u });
              }
              "" === o[c]
                ? (i.insertBefore(l(), t), s.push(t))
                : (t.data = o[c]),
                (p += c);
            }
          } else if (8 === t.nodeType)
            if (t.data === i) {
              const e = t.parentNode;
              (null !== t.previousSibling && u !== d) ||
                (u++, e.insertBefore(l(), t)),
                (d = u),
                this.parts.push({ type: "node", index: u }),
                null === t.nextSibling ? (t.data = "") : (s.push(t), u--),
                p++;
            } else {
              let e = -1;
              for (; -1 !== (e = t.data.indexOf(i, e + 1)); )
                this.parts.push({ type: "node", index: -1 }), p++;
            }
        } else c.currentNode = o.pop();
      }
      for (const t of s) t.parentNode.removeChild(t);
    }
  }
  const a = (t, e) => {
      const i = t.length - e.length;
      return i >= 0 && t.slice(i) === e;
    },
    c = (t) => -1 !== t.index,
    l = () => document.createComment(""),
    h = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
  function d(t, e) {
    const {
        element: { content: i },
        parts: s,
      } = t,
      n = document.createTreeWalker(i, 133, null, !1);
    let r = p(s),
      o = s[r],
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
        (o.index = null !== h ? -1 : o.index - c), (r = p(s, r)), (o = s[r]);
    }
    l.forEach((t) => t.parentNode.removeChild(t));
  }
  const u = (t) => {
      let e = 11 === t.nodeType ? 0 : 1;
      const i = document.createTreeWalker(t, 133, null, !1);
      for (; i.nextNode(); ) e++;
      return e;
    },
    p = (t, e = -1) => {
      for (let i = e + 1; i < t.length; i++) {
        const e = t[i];
        if (c(e)) return i;
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
  const m = new WeakMap(),
    y = (t) => "function" == typeof t && m.has(t),
    g = {},
    f = {};
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
  class _ {
    constructor(t, e, i) {
      (this.__parts = []),
        (this.template = t),
        (this.processor = e),
        (this.options = i);
    }
    update(t) {
      let e = 0;
      for (const i of this.__parts) void 0 !== i && i.setValue(t[e]), e++;
      for (const t of this.__parts) void 0 !== t && t.commit();
    }
    _clone() {
      const e = t
          ? this.template.element.content.cloneNode(!0)
          : document.importNode(this.template.element.content, !0),
        i = [],
        s = this.template.parts,
        n = document.createTreeWalker(e, 133, null, !1);
      let r,
        o = 0,
        a = 0,
        l = n.nextNode();
      for (; o < s.length; )
        if (((r = s[o]), c(r))) {
          for (; a < r.index; )
            a++,
              "TEMPLATE" === l.nodeName &&
                (i.push(l), (n.currentNode = l.content)),
              null === (l = n.nextNode()) &&
                ((n.currentNode = i.pop()), (l = n.nextNode()));
          if ("node" === r.type) {
            const t = this.processor.handleTextExpression(this.options);
            t.insertAfterNode(l.previousSibling), this.__parts.push(t);
          } else
            this.__parts.push(
              ...this.processor.handleAttributeExpressions(
                l,
                r.name,
                r.strings,
                this.options
              )
            );
          o++;
        } else this.__parts.push(void 0), o++;
      return t && (document.adoptNode(e), customElements.upgrade(e)), e;
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
   */ const v = ` ${i} `;
  class b {
    constructor(t, e, i, s) {
      (this.strings = t),
        (this.values = e),
        (this.type = i),
        (this.processor = s);
    }
    getHTML() {
      const t = this.strings.length - 1;
      let e = "",
        n = !1;
      for (let o = 0; o < t; o++) {
        const t = this.strings[o],
          a = t.lastIndexOf("\x3c!--");
        n = (a > -1 || n) && -1 === t.indexOf("--\x3e", a + 1);
        const c = h.exec(t);
        e +=
          null === c
            ? t + (n ? v : s)
            : t.substr(0, c.index) + c[1] + c[2] + r + c[3] + i;
      }
      return (e += this.strings[t]), e;
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
   */ const w = (t) =>
      null === t || !("object" == typeof t || "function" == typeof t),
    S = (t) => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
  class x {
    constructor(t, e, i) {
      (this.dirty = !0),
        (this.element = t),
        (this.name = e),
        (this.strings = i),
        (this.parts = []);
      for (let t = 0; t < i.length - 1; t++) this.parts[t] = this._createPart();
    }
    _createPart() {
      return new C(this);
    }
    _getValue() {
      const t = this.strings,
        e = t.length - 1;
      let i = "";
      for (let s = 0; s < e; s++) {
        i += t[s];
        const e = this.parts[s];
        if (void 0 !== e) {
          const t = e.value;
          if (w(t) || !S(t)) i += "string" == typeof t ? t : String(t);
          else for (const e of t) i += "string" == typeof e ? e : String(e);
        }
      }
      return (i += t[e]), i;
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1),
        this.element.setAttribute(this.name, this._getValue()));
    }
  }
  class C {
    constructor(t) {
      (this.value = void 0), (this.committer = t);
    }
    setValue(t) {
      t === g ||
        (w(t) && t === this.value) ||
        ((this.value = t), y(t) || (this.committer.dirty = !0));
    }
    commit() {
      for (; y(this.value); ) {
        const t = this.value;
        (this.value = g), t(this);
      }
      this.value !== g && this.committer.commit();
    }
  }
  class P {
    constructor(t) {
      (this.value = void 0), (this.__pendingValue = void 0), (this.options = t);
    }
    appendInto(t) {
      (this.startNode = t.appendChild(l())),
        (this.endNode = t.appendChild(l()));
    }
    insertAfterNode(t) {
      (this.startNode = t), (this.endNode = t.nextSibling);
    }
    appendIntoPart(t) {
      t.__insert((this.startNode = l())), t.__insert((this.endNode = l()));
    }
    insertAfterPart(t) {
      t.__insert((this.startNode = l())),
        (this.endNode = t.endNode),
        (t.endNode = this.startNode);
    }
    setValue(t) {
      this.__pendingValue = t;
    }
    commit() {
      if (null === this.startNode.parentNode) return;
      for (; y(this.__pendingValue); ) {
        const t = this.__pendingValue;
        (this.__pendingValue = g), t(this);
      }
      const t = this.__pendingValue;
      t !== g &&
        (w(t)
          ? t !== this.value && this.__commitText(t)
          : t instanceof b
          ? this.__commitTemplateResult(t)
          : t instanceof Node
          ? this.__commitNode(t)
          : S(t)
          ? this.__commitIterable(t)
          : t === f
          ? ((this.value = f), this.clear())
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
        i = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
      e === this.endNode.previousSibling && 3 === e.nodeType
        ? (e.data = i)
        : this.__commitNode(document.createTextNode(i)),
        (this.value = t);
    }
    __commitTemplateResult(t) {
      const e = this.options.templateFactory(t);
      if (this.value instanceof _ && this.value.template === e)
        this.value.update(t.values);
      else {
        const i = new _(e, t.processor, this.options),
          s = i._clone();
        i.update(t.values), this.__commitNode(s), (this.value = i);
      }
    }
    __commitIterable(t) {
      Array.isArray(this.value) || ((this.value = []), this.clear());
      const e = this.value;
      let i,
        s = 0;
      for (const n of t)
        (i = e[s]),
          void 0 === i &&
            ((i = new P(this.options)),
            e.push(i),
            0 === s ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])),
          i.setValue(n),
          i.commit(),
          s++;
      s < e.length && ((e.length = s), this.clear(i && i.endNode));
    }
    clear(t = this.startNode) {
      e(this.startNode.parentNode, t.nextSibling, this.endNode);
    }
  }
  class N {
    constructor(t, e, i) {
      if (
        ((this.value = void 0),
        (this.__pendingValue = void 0),
        2 !== i.length || "" !== i[0] || "" !== i[1])
      )
        throw new Error(
          "Boolean attributes can only contain a single expression"
        );
      (this.element = t), (this.name = e), (this.strings = i);
    }
    setValue(t) {
      this.__pendingValue = t;
    }
    commit() {
      for (; y(this.__pendingValue); ) {
        const t = this.__pendingValue;
        (this.__pendingValue = g), t(this);
      }
      if (this.__pendingValue === g) return;
      const t = !!this.__pendingValue;
      this.value !== t &&
        (t
          ? this.element.setAttribute(this.name, "")
          : this.element.removeAttribute(this.name),
        (this.value = t)),
        (this.__pendingValue = g);
    }
  }
  class $ extends x {
    constructor(t, e, i) {
      super(t, e, i),
        (this.single = 2 === i.length && "" === i[0] && "" === i[1]);
    }
    _createPart() {
      return new k(this);
    }
    _getValue() {
      return this.single ? this.parts[0].value : super._getValue();
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1), (this.element[this.name] = this._getValue()));
    }
  }
  class k extends C {}
  let E = !1;
  (() => {
    try {
      const t = {
        get capture() {
          return (E = !0), !1;
        },
      };
      window.addEventListener("test", t, t),
        window.removeEventListener("test", t, t);
    } catch (t) {}
  })();
  class A {
    constructor(t, e, i) {
      (this.value = void 0),
        (this.__pendingValue = void 0),
        (this.element = t),
        (this.eventName = e),
        (this.eventContext = i),
        (this.__boundHandleEvent = (t) => this.handleEvent(t));
    }
    setValue(t) {
      this.__pendingValue = t;
    }
    commit() {
      for (; y(this.__pendingValue); ) {
        const t = this.__pendingValue;
        (this.__pendingValue = g), t(this);
      }
      if (this.__pendingValue === g) return;
      const t = this.__pendingValue,
        e = this.value,
        i =
          null == t ||
          (null != e &&
            (t.capture !== e.capture ||
              t.once !== e.once ||
              t.passive !== e.passive)),
        s = null != t && (null == e || i);
      i &&
        this.element.removeEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        ),
        s &&
          ((this.__options = T(t)),
          this.element.addEventListener(
            this.eventName,
            this.__boundHandleEvent,
            this.__options
          )),
        (this.value = t),
        (this.__pendingValue = g);
    }
    handleEvent(t) {
      "function" == typeof this.value
        ? this.value.call(this.eventContext || this.element, t)
        : this.value.handleEvent(t);
    }
  }
  const T = (t) =>
    t &&
    (E ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture);
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
   */ function z(t) {
    let e = V.get(t.type);
    void 0 === e &&
      ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
      V.set(t.type, e));
    let s = e.stringsArray.get(t.strings);
    if (void 0 !== s) return s;
    const n = t.strings.join(i);
    return (
      (s = e.keyString.get(n)),
      void 0 === s &&
        ((s = new o(t, t.getTemplateElement())), e.keyString.set(n, s)),
      e.stringsArray.set(t.strings, s),
      s
    );
  }
  const V = new Map(),
    O = new WeakMap();
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
   */ const U = new /**
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
  (class {
    handleAttributeExpressions(t, e, i, s) {
      const n = e[0];
      if ("." === n) {
        return new $(t, e.slice(1), i).parts;
      }
      if ("@" === n) return [new A(t, e.slice(1), s.eventContext)];
      if ("?" === n) return [new N(t, e.slice(1), i)];
      return new x(t, e, i).parts;
    }
    handleTextExpression(t) {
      return new P(t);
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
   */ "undefined" != typeof window &&
    (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");
  const j = (t, ...e) => new b(t, e, "html", U),
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
     */ M = (t, e) => `${t}--${e}`;
  let R = !0;
  void 0 === window.ShadyCSS
    ? (R = !1)
    : void 0 === window.ShadyCSS.prepareTemplateDom &&
      (console.warn(
        "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
      ),
      (R = !1));
  const I = (t) => (e) => {
      const s = M(e.type, t);
      let n = V.get(s);
      void 0 === n &&
        ((n = { stringsArray: new WeakMap(), keyString: new Map() }),
        V.set(s, n));
      let r = n.stringsArray.get(e.strings);
      if (void 0 !== r) return r;
      const a = e.strings.join(i);
      if (((r = n.keyString.get(a)), void 0 === r)) {
        const i = e.getTemplateElement();
        R && window.ShadyCSS.prepareTemplateDom(i, t),
          (r = new o(e, i)),
          n.keyString.set(a, r);
      }
      return n.stringsArray.set(e.strings, r), r;
    },
    q = ["html", "svg"],
    B = new Set(),
    D = (t, e, i) => {
      B.add(t);
      const s = i ? i.element : document.createElement("template"),
        n = e.querySelectorAll("style"),
        { length: r } = n;
      if (0 === r) return void window.ShadyCSS.prepareTemplateStyles(s, t);
      const o = document.createElement("style");
      for (let t = 0; t < r; t++) {
        const e = n[t];
        e.parentNode.removeChild(e), (o.textContent += e.textContent);
      }
      ((t) => {
        q.forEach((e) => {
          const i = V.get(M(e, t));
          void 0 !== i &&
            i.keyString.forEach((t) => {
              const {
                  element: { content: e },
                } = t,
                i = new Set();
              Array.from(e.querySelectorAll("style")).forEach((t) => {
                i.add(t);
              }),
                d(t, i);
            });
        });
      })(t);
      const a = s.content;
      i
        ? (function (t, e, i = null) {
            const {
              element: { content: s },
              parts: n,
            } = t;
            if (null == i) return void s.appendChild(e);
            const r = document.createTreeWalker(s, 133, null, !1);
            let o = p(n),
              a = 0,
              c = -1;
            for (; r.nextNode(); )
              for (
                c++,
                  r.currentNode === i &&
                    ((a = u(e)), i.parentNode.insertBefore(e, i));
                -1 !== o && n[o].index === c;

              ) {
                if (a > 0) {
                  for (; -1 !== o; ) (n[o].index += a), (o = p(n, o));
                  return;
                }
                o = p(n, o);
              }
          })(i, o, a.firstChild)
        : a.insertBefore(o, a.firstChild),
        window.ShadyCSS.prepareTemplateStyles(s, t);
      const c = a.querySelector("style");
      if (window.ShadyCSS.nativeShadow && null !== c)
        e.insertBefore(c.cloneNode(!0), e.firstChild);
      else if (i) {
        a.insertBefore(o, a.firstChild);
        const t = new Set();
        t.add(o), d(i, t);
      }
    };
  window.JSCompiler_renameProperty = (t, e) => t;
  const F = {
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
      },
    },
    H = (t, e) => e !== t && (e == e || t == t),
    L = {
      attribute: !0,
      type: String,
      converter: F,
      reflect: !1,
      hasChanged: H,
    },
    W = "finalized";
  class J extends HTMLElement {
    constructor() {
      super(), this.initialize();
    }
    static get observedAttributes() {
      this.finalize();
      const t = [];
      return (
        this._classProperties.forEach((e, i) => {
          const s = this._attributeNameForProperty(i, e);
          void 0 !== s && (this._attributeToPropertyMap.set(s, i), t.push(s));
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
    static createProperty(t, e = L) {
      if (
        (this._ensureClassProperties(),
        this._classProperties.set(t, e),
        e.noAccessor || this.prototype.hasOwnProperty(t))
      )
        return;
      const i = "symbol" == typeof t ? Symbol() : "__" + t,
        s = this.getPropertyDescriptor(t, i, e);
      void 0 !== s && Object.defineProperty(this.prototype, t, s);
    }
    static getPropertyDescriptor(t, e, i) {
      return {
        get() {
          return this[e];
        },
        set(s) {
          const n = this[t];
          (this[e] = s), this.requestUpdateInternal(t, n, i);
        },
        configurable: !0,
        enumerable: !0,
      };
    }
    static getPropertyOptions(t) {
      return (this._classProperties && this._classProperties.get(t)) || L;
    }
    static finalize() {
      const t = Object.getPrototypeOf(this);
      if (
        (t.hasOwnProperty(W) || t.finalize(),
        (this.finalized = !0),
        this._ensureClassProperties(),
        (this._attributeToPropertyMap = new Map()),
        this.hasOwnProperty(JSCompiler_renameProperty("properties", this)))
      ) {
        const t = this.properties,
          e = [
            ...Object.getOwnPropertyNames(t),
            ...("function" == typeof Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols(t)
              : []),
          ];
        for (const i of e) this.createProperty(i, t[i]);
      }
    }
    static _attributeNameForProperty(t, e) {
      const i = e.attribute;
      return !1 === i
        ? void 0
        : "string" == typeof i
        ? i
        : "string" == typeof t
        ? t.toLowerCase()
        : void 0;
    }
    static _valueHasChanged(t, e, i = H) {
      return i(t, e);
    }
    static _propertyValueFromAttribute(t, e) {
      const i = e.type,
        s = e.converter || F,
        n = "function" == typeof s ? s : s.fromAttribute;
      return n ? n(t, i) : t;
    }
    static _propertyValueToAttribute(t, e) {
      if (void 0 === e.reflect) return;
      const i = e.type,
        s = e.converter;
      return ((s && s.toAttribute) || F.toAttribute)(t, i);
    }
    initialize() {
      (this._updateState = 0),
        (this._updatePromise = new Promise(
          (t) => (this._enableUpdatingResolver = t)
        )),
        (this._changedProperties = new Map()),
        this._saveInstanceProperties(),
        this.requestUpdateInternal();
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
      this.enableUpdating();
    }
    enableUpdating() {
      void 0 !== this._enableUpdatingResolver &&
        (this._enableUpdatingResolver(),
        (this._enableUpdatingResolver = void 0));
    }
    disconnectedCallback() {}
    attributeChangedCallback(t, e, i) {
      e !== i && this._attributeToProperty(t, i);
    }
    _propertyToAttribute(t, e, i = L) {
      const s = this.constructor,
        n = s._attributeNameForProperty(t, i);
      if (void 0 !== n) {
        const t = s._propertyValueToAttribute(e, i);
        if (void 0 === t) return;
        (this._updateState = 8 | this._updateState),
          null == t ? this.removeAttribute(n) : this.setAttribute(n, t),
          (this._updateState = -9 & this._updateState);
      }
    }
    _attributeToProperty(t, e) {
      if (8 & this._updateState) return;
      const i = this.constructor,
        s = i._attributeToPropertyMap.get(t);
      if (void 0 !== s) {
        const t = i.getPropertyOptions(s);
        (this._updateState = 16 | this._updateState),
          (this[s] = i._propertyValueFromAttribute(e, t)),
          (this._updateState = -17 & this._updateState);
      }
    }
    requestUpdateInternal(t, e, i) {
      let s = !0;
      if (void 0 !== t) {
        const n = this.constructor;
        (i = i || n.getPropertyOptions(t)),
          n._valueHasChanged(this[t], e, i.hasChanged)
            ? (this._changedProperties.has(t) ||
                this._changedProperties.set(t, e),
              !0 !== i.reflect ||
                16 & this._updateState ||
                (void 0 === this._reflectingProperties &&
                  (this._reflectingProperties = new Map()),
                this._reflectingProperties.set(t, i)))
            : (s = !1);
      }
      !this._hasRequestedUpdate &&
        s &&
        (this._updatePromise = this._enqueueUpdate());
    }
    requestUpdate(t, e) {
      return this.requestUpdateInternal(t, e), this.updateComplete;
    }
    async _enqueueUpdate() {
      this._updateState = 4 | this._updateState;
      try {
        await this._updatePromise;
      } catch (t) {}
      const t = this.performUpdate();
      return null != t && (await t), !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
      return 4 & this._updateState;
    }
    get hasUpdated() {
      return 1 & this._updateState;
    }
    performUpdate() {
      if (!this._hasRequestedUpdate) return;
      this._instanceProperties && this._applyInstanceProperties();
      let t = !1;
      const e = this._changedProperties;
      try {
        (t = this.shouldUpdate(e)), t ? this.update(e) : this._markUpdated();
      } catch (e) {
        throw ((t = !1), this._markUpdated(), e);
      }
      t &&
        (1 & this._updateState ||
          ((this._updateState = 1 | this._updateState), this.firstUpdated(e)),
        this.updated(e));
    }
    _markUpdated() {
      (this._changedProperties = new Map()),
        (this._updateState = -5 & this._updateState);
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
        (this._reflectingProperties = void 0)),
        this._markUpdated();
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  J.finalized = !0;
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
  const Y =
      window.ShadowRoot &&
      (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
      "adoptedStyleSheets" in Document.prototype &&
      "replace" in CSSStyleSheet.prototype,
    G = Symbol();
  class K {
    constructor(t, e) {
      if (e !== G)
        throw new Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      this.cssText = t;
    }
    get styleSheet() {
      return (
        void 0 === this._styleSheet &&
          (Y
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
  (window.litElementVersions || (window.litElementVersions = [])).push("2.4.0");
  const Q = {};
  class X extends J {
    static getStyles() {
      return this.styles;
    }
    static _getUniqueStyles() {
      if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this)))
        return;
      const t = this.getStyles();
      if (Array.isArray(t)) {
        const e = (t, i) =>
            t.reduceRight(
              (t, i) => (Array.isArray(i) ? e(i, t) : (t.add(i), t)),
              i
            ),
          i = e(t, new Set()),
          s = [];
        i.forEach((t) => s.unshift(t)), (this._styles = s);
      } else this._styles = void 0 === t ? [] : [t];
      this._styles = this._styles.map((t) => {
        if (t instanceof CSSStyleSheet && !Y) {
          const e = Array.prototype.slice
            .call(t.cssRules)
            .reduce((t, e) => t + e.cssText, "");
          return new K(String(e), G);
        }
        return t;
      });
    }
    initialize() {
      super.initialize(),
        this.constructor._getUniqueStyles(),
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
          ? Y
            ? (this.renderRoot.adoptedStyleSheets = t.map((t) =>
                t instanceof CSSStyleSheet ? t : t.styleSheet
              ))
            : (this._needsShimAdoptedStyleSheets = !0)
          : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
              t.map((t) => t.cssText),
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
      const e = this.render();
      super.update(t),
        e !== Q &&
          this.constructor.render(e, this.renderRoot, {
            scopeName: this.localName,
            eventContext: this,
          }),
        this._needsShimAdoptedStyleSheets &&
          ((this._needsShimAdoptedStyleSheets = !1),
          this.constructor._styles.forEach((t) => {
            const e = document.createElement("style");
            (e.textContent = t.cssText), this.renderRoot.appendChild(e);
          }));
    }
    render() {
      return Q;
    }
  }
  (X.finalized = !0),
    (X.render = (t, i, s) => {
      if (!s || "object" != typeof s || !s.scopeName)
        throw new Error("The `scopeName` option is required.");
      const n = s.scopeName,
        r = O.has(i),
        o = R && 11 === i.nodeType && !!i.host,
        a = o && !B.has(n),
        c = a ? document.createDocumentFragment() : i;
      if (
        (((t, i, s) => {
          let n = O.get(i);
          void 0 === n &&
            (e(i, i.firstChild),
            O.set(i, (n = new P(Object.assign({ templateFactory: z }, s)))),
            n.appendInto(i)),
            n.setValue(t),
            n.commit();
        })(t, c, Object.assign({ templateFactory: I(n) }, s)),
        a)
      ) {
        const t = O.get(c);
        O.delete(c);
        const s = t.value instanceof _ ? t.value.template : void 0;
        D(n, c, s), e(i, i.firstChild), i.appendChild(c), O.set(i, t);
      }
      !r && o && window.ShadyCSS.styleElement(i.host);
    });
  var Z = ((t, ...e) => {
    const i = e.reduce(
      (e, i, s) =>
        e +
        ((t) => {
          if (t instanceof K) return t.cssText;
          if ("number" == typeof t) return t;
          throw new Error(
            `Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`
          );
        })(i) +
        t[s + 1],
      t[0]
    );
    return new K(i, G);
  })`:host{--bc-font-size-heading:var(--banner-card-heading-size, 3em);--bc-font-size-entity-value:var(--banner-card-entity-value-size, 1.5em);--bc-font-size-media-title:var(--banner-card-media-title-size, 0.9em);--bc-margin-heading:var(--banner-card-heading-margin, 1em);--bc-spacing:var(--banner-card-spacing, 4px);--bc-button-size:var(--banner-card-button-size, 32px);--bc-heading-color-dark:var(
      --banner-card-heading-color-dark,
      var(--primary-text-color)
    );--bc-heading-color-light:var(--banner-card-heading-color-light, #fff)}ha-card{display:flex;flex-direction:column;align-items:center;overflow-x:auto!important}a{cursor:pointer}ha-icon-button{width:var(--bc-button-size);height:var(--bc-button-size);padding:var(--bc-spacing)}.heading{display:flex;justify-content:center;align-items:center;font-size:var(--bc-font-size-heading);margin:var(--bc-margin-heading);font-weight:300;cursor:pointer}ha-icon.heading-icon{--iron-icon-width:1em;--iron-icon-height:1em;margin:0 var(--bc-spacing)}.overlay-strip{background:rgba(0,0,0,.3);overflow:hidden;width:100%}.entities{padding:calc(var(--bc-spacing) * 2) 0;color:#fff;display:grid}.entity-state{display:flex;flex-direction:column;align-items:center;margin-top:var(--bc-spacing);margin-bottom:var(--bc-spacing);box-shadow:-1px 0 0 0 #fff;width:100%}.media-title{flex:1 0;overflow:hidden;font-weight:300;font-size:var(--bc-font-size-media-title);white-space:nowrap;text-overflow:ellipsis}.media-controls{display:flex;flex:0 0 calc(var(--bc-button-size) * 3)}.entity-padded{display:block;min-width:-webkit-fill-available;padding:16px 16px 0 16px}.small-text{font-size:.6em}.entity-state.expand .entity-value{width:100%}.entity-state-left{margin-right:auto;margin-left:16px}.entity-state-right{margin-left:auto;margin-right:16px}.entity-name{font-weight:700;white-space:nowrap;padding-top:calc(var(--bc-spacing) * 2);padding-bottom:calc(var(--bc-spacing) * 2)}.entity-value{display:flex;width:100%;flex:1 0;font-size:var(--bc-font-size-entity-value);align-items:center;justify-content:center}.entity-value.error{display:inline-block;word-wrap:break-word;font-size:16px;width:90%}.entity-value ha-icon{color:#fff}mwc-button{--mdc-theme-primary:white}mwc-switch{--mdc-theme-secondary:white}`;
  function tt({ state: t, attributes: e }, i = !1) {
    return "string" == typeof i && e.hasOwnProperty(i) ? e[i] : t;
  }
  function et(t) {
    return "object" == typeof t
      ? ((e = t),
        (i = (t) => (!1 === t ? null : t)),
        Object.entries(e).reduce((t, [e, s]) => ({ ...t, [e]: i(s, e) }), {}))
      : { entity: t };
    var e, i;
  }
  const it = {
    "=": (t, e) => e.includes(t),
    ">": (t, e) => t > e[0],
    "<": (t, e) => t < e[0],
    "!=": (t, e) => !e.includes(t),
  };
  function st(t, e) {
    if (["string", "number", "boolean"].includes(typeof t))
      return it["="](e, [t]);
    if (Array.isArray(t)) {
      const [i, ...s] = t;
      return it.hasOwnProperty(i) ? it[i](e, s) : it["="](e, s);
    }
    throw new Error(`Couldn't find a valid matching strategy for '${t}'`);
  }
  !(function (t) {
    console.info("%cbanner-card: " + t, "font-weight: bold");
  })("0.13.0");
  const nt = /^(mdi|hass):/;
  function rt(t) {
    return "string" == typeof t && t.match(nt);
  }
  function ot(t, e = null) {
    return e
      ? j` <a class="entity-name" @click=${e}>${t}</a> `
      : j` <span class="entity-name">${t}</span> `;
  }
  class at extends X {
    static get properties() {
      return {
        config: Object,
        color: String,
        entities: Array,
        entityValues: Array,
        rowSize: Number,
        _hass: Object,
      };
    }
    static get styles() {
      return [Z];
    }
    constructor() {
      super(),
        (this.config = {}),
        (this.heading_entity = {}),
        (this.entities = []),
        (this._hass = {});
    }
    setConfig(t) {
      if (void 0 === t.heading) throw new Error("You need to define a heading");
      (this.entities = (t.entities || []).map(et)),
        (this.config = t),
        (this.color =
          t.color ||
          (function (t, e, i) {
            if (!t || "#" !== t[0]) return i;
            if (3 === (t = t.substring(1)).length) {
              const [e, i, s] = t;
              t = [e, e, i, i, s, s].join("");
            }
            if (6 !== t.length) return i;
            const s = [
                parseInt(t.slice(0, 2), 16) / 255,
                parseInt(t.slice(2, 4), 16) / 255,
                parseInt(t.slice(4, 6), 16) / 255,
              ],
              [n, r, o] = s.map((t) =>
                t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4)
              );
            return 0.2126 * n + 0.7152 * r + 0.0722 * o > 0.179 ? i : e;
          })(
            t.background,
            "var(--bc-heading-color-light)",
            "var(--bc-heading-color-dark)"
          )),
        (this.headerNotActiveColor = this.color),
        (this.headerActiveColor = `var(--paper-item-icon-active-color, ${
          this.color.match(/(var\(.+\))|(.+)/)[1]
        })`);
      if ("undefined" !== typeof t.row_size) {
        if (t.row_size < 1) throw new Error("row_size must be at least 1");
        "auto" === t.row_size
          ? (this.rowSize = this.entities.length)
          : (this.rowSize = t.row_size);
      }
      this.rowSize = this.rowSize || 3;
    }
    set hass(t) {
      (this._hass = t),
        (this.entityValues = (this.entities || [])
          .filter((e) =>
            (function (t, e) {
              if (!e.hasOwnProperty(t.entity)) return !1;
              if (t.when) {
                const { state: i, entity: s = t.entity, attributes: n } =
                    "string" == typeof t.when ? { state: t.when } : t.when,
                  r = e[s];
                return (
                  !(void 0 !== i && !st(i, r.state)) &&
                  Object.entries(n || {}).every(([t, e]) =>
                    st(e, r.attributes[t])
                  )
                );
              }
              return !0;
            })(e, t.states)
          )
          .map((t) => this.parseEntity(t))),
        this.config.heading_entity &&
          ("string" == typeof this.config.heading_entity
            ? (this.heading_entity = this.parseEntity({
                entity: this.config.heading_entity,
              }))
            : (this.heading_entity = this.parseEntity(
                this.config.heading_entity
              )),
          !this.config.color &&
            this.color &&
            ("on" === this.heading_entity.state
              ? (this.color = this.headerActiveColor)
              : (this.color = this.headerNotActiveColor)));
    }
    parseEntity(t) {
      const e = this._hass.states[t.entity],
        i = e ? e.attributes : {},
        s = {};
      if (t.map_state && e.state in t.map_state) {
        const i = t.map_state[e.state],
          n = typeof i;
        "string" === n
          ? (s.value = i)
          : "object" === n &&
            Object.entries(i).forEach(([t, e]) => {
              s[t] = e;
            });
      }
      const n = {
        name: i.friendly_name,
        state: e ? e.state : "",
        value: tt(e || {}, t.attribute),
        unit: i.unit_of_measurement,
        attributes: i,
        domain: t.entity ? t.entity.split(".")[0] : void 0,
      };
      return (
        i.hasOwnProperty("current_position") && (n.state = i.current_position),
        { ...n, ...t, ...s }
      );
    }
    grid(t = 1) {
      return "full" === t || t > this.rowSize
        ? `grid-column: span ${this.rowSize};`
        : `grid-column: span ${t};`;
    }
    _service(t, e, i) {
      return () => this._hass.callService(t, e, { entity_id: i });
    }
    render() {
      return j`
      <ha-card style="background: ${this.config.background};">
        ${this.renderHeading()} ${this.renderEntities()}
      </ha-card>
    `;
    }
    renderHeading() {
      let t = this.config.heading;
      if (!1 === t) return null;
      Array.isArray(t) || (t = [t]);
      return j`
      <h2 class="heading" @click=${() => {
        if (this.config.link) this.navigate(this.config.link);
        else if (this.heading_entity.entity)
          if (this.heading_entity.action) {
            const { service: t, ...e } = this.heading_entity.action,
              [i, s] = t.split(".");
            this._hass.callService(i, s, {
              entity_id: this.heading_entity.entity,
              ...e,
            });
          } else
            this._hass.callService(this.heading_entity.domain, "toggle", {
              entity_id: this.heading_entity.entity,
            });
      }} style="color: ${this.color};">
        ${t.map((t) =>
          rt(t)
            ? j`
              <ha-icon class="heading-icon" .icon="${t}"></ha-icon>
            `
            : j` <span>${t}</span> `
        )}
      </h2>
    `;
    }
    renderEntities() {
      return 0 === this.entityValues.length
        ? null
        : j`
      <div class="overlay-strip">
        <div
          class="entities"
          style="grid-template-columns: repeat(${this.rowSize}, 1fr);"
        >
          ${this.entityValues.map((t) => {
            if (t.error)
              return j`
                <div class="entity-state" style="${this.grid(t.size)}">
                  ${ot(t.error)}
                  <span class="entity-value error">${t.entity}</span>
                </div>
              `;
            const e = { ...t, onClick: () => this.openEntityPopover(t.entity) };
            if (t.action)
              return this.renderCustom({
                ...e,
                action: () => {
                  const { service: e, ...i } = t.action,
                    [s, n] = e.split(".");
                  this._hass.callService(s, n, { entity_id: t.entity, ...i });
                },
              });
            if (!t.attribute) {
              if (t.type && t.type.startsWith("custom:")) {
                const i = t.type.split(":")[1];
                let s = "";
                return (
                  "calendar-card" === i && (s = "small-text"),
                  this.renderCustomElement(i, e, s)
                );
              }
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
            }
            return this.renderDomainDefault(e);
          })}
        </div>
      </div>
    `;
    }
    renderValue(
      { icon: t, value: e, image: i, action: s, click: n, color: r },
      o
    ) {
      return t || rt(e)
        ? j`
        <ha-icon
          .icon="${t || e}"
          style="${(r = r ? "color: " + r : "")}"
          @click=${n}
        ></ha-icon>
      `
        : !0 === i
        ? j`
        <state-badge
          style="background-image: url(${e});"
          @click=${n}
        ></state-badge>
      `
        : o();
    }
    renderDomainDefault({
      value: t,
      unit: e,
      name: i,
      size: s,
      onClick: n,
      ...r
    }) {
      const o = this.renderValue(
        { ...r, value: t, click: n },
        () => j` ${t} ${e} `
      );
      return j`
      <a class="entity-state" style="${this.grid(s)}" @click=${n}>
        ${ot(i, n)}
        <span class="entity-value">${o}</span>
      </a>
    `;
    }
    renderCustom({
      value: t,
      unit: e,
      action: i,
      name: s,
      size: n,
      onClick: r,
      ...o
    }) {
      const a = this.renderValue(
        { ...o, value: t, unit: e, click: i },
        () => j`
        <mwc-button ?dense=${!0} @click=${i}>
          ${t} ${e}
        </mwc-button>
      `
      );
      return j`
      <div class="entity-state" style="${this.grid(n)}">
        ${ot(s, r)}
        <span class="entity-value">${a}</span>
      </div>
    `;
    }
    renderDomainMediaPlayer({
      onClick: t,
      attributes: e,
      size: i,
      name: s,
      state: n,
      entity: r,
      domain: o,
    }) {
      const a = "playing" === n,
        c = a ? "media_pause" : "media_play",
        l = [e.media_artist, e.media_title].join(" – ");
      return j`
      <div class="entity-state" style="${this.grid(i || "full")}">
        ${ot(s, t)}
        <div class="entity-value">
          <div class="entity-state-left media-title">${l}</div>
          <div class="entity-state-right media-controls">
            <ha-icon-button
              icon="mdi:skip-previous"
              role="button"
              @click=${this._service(o, "media_previous_track", r)}
            ></ha-icon-button>
            <ha-icon-button
              icon="${a ? "mdi:stop" : "mdi:play"}"
              role="button"
              @click=${this._service(o, c, r)}
            ></ha-icon-button>
            <ha-icon-button
              icon="mdi:skip-next"
              role="button"
              @click=${this._service(o, "media_next_track", r)}
            ></ha-icon-button>
          </div>
        </div>
      </div>
    `;
    }
    _renderCustomElement(t, e, i) {
      return j`
      <div class="entity-state" style="${this.grid(e.size || "full")}">
        <div class="entity-value">
          <div class="entity-padded ${i}">
            ${(function (t, e, i) {
              const s = document.createElement(t);
              return s.setConfig && s.setConfig(e), (s.hass = i), s;
            })(t, e, this._hass)}
          </div>
        </div>
      </div>
    `;
    }
    renderCustomElement(t, e, i = "") {
      if (customElements.get(t)) return this._renderCustomElement(t, e, i);
      console.error(t + " doesn't exist");
    }
    renderAsToggle({
      onClick: t,
      size: e,
      name: i,
      state: s,
      domain: n,
      entity: r,
      color: o,
    }) {
      return (
        (o = o || "var(--switch-checked-color)"),
        j`
      <div class="entity-state" style="${this.grid(e)}">
        ${ot(i, t)}
        <span class="entity-value">
          <mwc-switch
            style="--mdc-theme-secondary: ${o};"
            ?checked=${"on" === s}
            @click=${this._service(n, "toggle", r)}
          >
          </mwc-switch>
        </span>
      </div>
    `
      );
    }
    renderDomainCover({ onClick: t, size: e, name: i, state: s, entity: n }) {
      const r = "closed" === s || 0 === s,
        o = "open" === s || 100 === s;
      return j`
      <div class="entity-state" style="${this.grid(e)}">
        ${ot(i, t)}
        <span class="entity-value">
          <ha-icon-button
            ?disabled=${o}
            icon="hass:arrow-up"
            role="button"
            @click=${this._service("cover", "open_cover", n)}
          ></ha-icon-button>
          <ha-icon-button
            icon="hass:stop"
            role="button"
            @click=${this._service("cover", "stop_cover", n)}
          ></ha-icon-button>
          <ha-icon-button
            ?disabled=${r}
            icon="hass:arrow-down"
            role="button"
            @click=${this._service("cover", "close_cover", n)}
          ></ha-icon-button>
        </span>
      </div>
    `;
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
    fire(t, e, i) {
      (i = i || {}), (e = null == e ? {} : e);
      const s = new Event(t, {
        bubbles: void 0 === i.bubbles || i.bubbles,
        cancelable: Boolean(i.cancelable),
        composed: void 0 === i.composed || i.composed,
      });
      return (s.detail = e), this.dispatchEvent(s), s;
    }
  }
  return (
    window.customElements.define("banner-card", at),
    (window.customCards = window.customCards || []),
    window.customCards.push({
      type: "banner-card",
      name: "Banner Card",
      preview: !1,
      description:
        "The Banner card is a linkable banner with a large heading and interactive glaces of entities",
    }),
    at
  );
});
