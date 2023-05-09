/*!
 * purecounter.js - A simple yet configurable native javascript counter which you can count on.
 * Author: Stig Rex
 * Version: 1.5.0
 * Url: https://github.com/srexi/purecounterjs
 * License: MIT
 */
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.PureCounter = t() : e.PureCounter = t()
}(self, (function() {
    return e = {
            638: function(e) {
                function t(e) {
                    return function(e) {
                        if (Array.isArray(e)) return r(e)
                    }(e) || function(e) {
                        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                    }(e) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return r(e, t);
                            var n = Object.prototype.toString.call(e).slice(8, -1);
                            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
                        }
                    }(e) || function() {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function r(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
                    return n
                }

                function n(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = {};
                    for (var n in e)
                        if (t == {} || t.hasOwnProperty(n)) {
                            var o = a(e[n]);
                            r[n] = o, n.match(/duration|pulse/) && (r[n] = "boolean" != typeof o ? 1e3 * o : o)
                        }
                    return Object.assign({}, t, r)
                }

                function o(e, t) {
                    return Math.pow(e, t)
                }

                function i(e, t) {
                    var r = {
                            minimumFractionDigits: t.decimals,
                            maximumFractionDigits: t.decimals
                        },
                        n = "string" == typeof t.formater ? t.formater : void 0;
                    return e = function(e, t) {
                            if (t.filesizing || t.currency) {
                                e = Math.abs(Number(e));
                                var r = 1e3,
                                    n = t.currency && "string" == typeof t.currency ? t.currency : "",
                                    i = t.decimals || 1,
                                    a = ["", "K", "M", "B", "T"],
                                    u = "";
                                t.filesizing && (r = 1024, a = ["bytes", "KB", "MB", "GB", "TB"]);
                                for (var c = 4; c >= 0; c--)
                                    if (0 === c && (u = "".concat(e.toFixed(i), " ").concat(a[c])), e >= o(r, c)) {
                                        u = "".concat((e / o(r, c)).toFixed(i), " ").concat(a[c]);
                                        break
                                    }
                                return n + u
                            }
                            return parseFloat(e)
                        }(e, t),
                        function(e, t) {
                            if (t.formater) {
                                var r = t.separator ? "string" == typeof t.separator ? t.separator : "," : "";
                                return "en-US" !== t.formater && !0 === t.separator ? e : (n = r, e.replace(/^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi, (function(e, t, r, o, i) {
                                    var a = "",
                                        u = "";
                                    if (void 0 !== t ? (a = t.replace(new RegExp(/,/gi, "gi"), n), u = ",") : void 0 !== r ? a = r.replace(new RegExp(/\./gi, "gi"), n) : void 0 !== o && (a = o.replace(new RegExp(/ /gi, "gi"), n)), void 0 !== i) {
                                        var c = "," !== u && "," !== n ? "," : ".";
                                        a += void 0 !== i ? i.replace(new RegExp(/\.|,/gi, "gi"), c) : ""
                                    }
                                    return a
                                })))
                            }
                            var n;
                            return e
                        }(e = t.formater ? e.toLocaleString(n, r) : parseInt(e).toString(), t)
                }

                function a(e) {
                    return /^[0-9]+\.[0-9]+$/.test(e) ? parseFloat(e) : /^[0-9]+$/.test(e) ? parseInt(e) : /^true|false/i.test(e) ? /^true/i.test(e) : e
                }

                function u(e) {
                    for (var t = e.offsetTop, r = e.offsetLeft, n = e.offsetWidth, o = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, r += e.offsetLeft;
                    return t >= window.pageYOffset && r >= window.pageXOffset && t + o <= window.pageYOffset + window.innerHeight && r + n <= window.pageXOffset + window.innerWidth
                }
                e.exports = function() {
                    var e = n(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, {
                        start: 0,
                        end: 100,
                        duration: 2e3,
                        delay: 10,
                        once: !0,
                        pulse: !1,
                        decimals: 0,
                        legacy: !0,
                        filesizing: !1,
                        currency: !1,
                        separator: !1,
                        formater: "us-US",
                        selector: ".purecounter"
                    });

                    function r(e) {
                        e.forEach((function(e) {
                            !0 === c(e).legacy && u(e) && o([e])
                        }))
                    }

                    function o(e, t) {
                        e.forEach((function(e) {
                            var r = e.target || e,
                                n = c(r);
                            if (n.duration <= 0) return r.innerHTML = i(n.end, n);
                            if (!t && !u(e) || t && e.intersectionRatio < .5) {
                                var o = n.start > n.end ? n.end : n.start;
                                return r.innerHTML = i(o, n)
                            }
                            setTimeout((function() {
                                return function(e, t) {
                                    var r = (t.end - t.start) / (t.duration / t.delay),
                                        n = "inc";
                                    t.start > t.end && (n = "dec", r *= -1);
                                    var o = a(t.start);
                                    e.innerHTML = i(o, t), !0 === t.once && e.setAttribute("data-purecounter-duration", 0);
                                    var u = setInterval((function() {
                                        var c = function(e, t) {
                                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "inc";
                                            return e = a(e), t = a(t), parseFloat("inc" === r ? e + t : e - t)
                                        }(o, r, n);
                                        e.innerHTML = i(c, t), ((o = c) >= t.end && "inc" == n || o <= t.end && "dec" == n) && (e.innerHTML = i(t.end, t), t.pulse && (e.setAttribute("data-purecounter-duration", 0), setTimeout((function() {
                                            e.setAttribute("data-purecounter-duration", t.duration / 1e3)
                                        }), t.pulse)), clearInterval(u))
                                    }), t.delay)
                                }(r, n)
                            }), n.delay)
                        }))
                    }

                    function c(r) {
                        var o = e,
                            i = [].filter.call(r.attributes, (function(e) {
                                return /^data-purecounter-/.test(e.name)
                            }));
                        return n(0 != i.length ? Object.assign.apply(Object, [{}].concat(t(i.map((function(e) {
                            var t = e.name,
                                r = e.value;
                            return function(e, t, r) {
                                return t in e ? Object.defineProperty(e, t, {
                                    value: r,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : e[t] = r, e
                            }({}, t.replace("data-purecounter-", "").toLowerCase(), a(r))
                        }))))) : {}, o)
                    }! function() {
                        var t = document.querySelectorAll(e.selector);
                        if (0 !== t.length)
                            if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
                                var n = new IntersectionObserver(o.bind(this), {
                                    root: null,
                                    rootMargin: "20px",
                                    threshold: .5
                                });
                                t.forEach((function(e) {
                                    n.observe(e)
                                }))
                            } else window.addEventListener && (r(t), window.addEventListener("scroll", (function(e) {
                                r(t)
                            }), {
                                passive: !0
                            }))
                    }()
                }
            }
        }, t = {},
        function r(n) {
            var o = t[n];
            if (void 0 !== o) return o.exports;
            var i = t[n] = {
                exports: {}
            };
            return e[n](i, i.exports, r), i.exports
        }(638);
    var e, t
}));