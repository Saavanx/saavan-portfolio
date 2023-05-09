/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function() {
    "use strict";
    var t = 0,
        e = {};

    function i(n) {
        if (!n) throw new Error("No options passed to Waypoint constructor");
        if (!n.element) throw new Error("No element option passed to Waypoint constructor");
        if (!n.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + t, this.options = i.Adapter.extend({}, i.defaults, n), this.element = this.options.element, this.adapter = new i.Adapter(this.element), this.callback = n.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = i.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = i.Context.findOrCreateByElement(this.options.context), i.offsetAliases[this.options.offset] && (this.options.offset = i.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), e[this.key] = this, t += 1
    }
    i.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, i.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, i.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete e[this.key]
    }, i.prototype.disable = function() {
        return this.enabled = !1, this
    }, i.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, i.prototype.next = function() {
        return this.group.next(this)
    }, i.prototype.previous = function() {
        return this.group.previous(this)
    }, i.invokeAll = function(t) {
        var i = [];
        for (var n in e) i.push(e[n]);
        for (var o = 0, r = i.length; o < r; o++) i[o][t]()
    }, i.destroyAll = function() {
        i.invokeAll("destroy")
    }, i.disableAll = function() {
        i.invokeAll("disable")
    }, i.enableAll = function() {
        for (var t in i.Context.refreshAll(), e) e[t].enabled = !0;
        return this
    }, i.refreshAll = function() {
        i.Context.refreshAll()
    }, i.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, i.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, i.adapters = [], i.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, i.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = i
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }
    var e = 0,
        i = {},
        n = window.Waypoint,
        o = window.onload;

    function r(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + e, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, e += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new r(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    r.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, r.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            n = this.element == this.element.window;
        t && e && !n && (this.adapter.off(".waypoints"), delete i[this.key])
    }, r.prototype.createThrottledResizeHandler = function() {
        var t = this;

        function e() {
            t.handleResize(), t.didResize = !1
        }
        this.adapter.on("resize.waypoints", (function() {
            t.didResize || (t.didResize = !0, n.requestAnimationFrame(e))
        }))
    }, r.prototype.createThrottledScrollHandler = function() {
        var t = this;

        function e() {
            t.handleScroll(), t.didScroll = !1
        }
        this.adapter.on("scroll.waypoints", (function() {
            t.didScroll && !n.isTouch || (t.didScroll = !0, n.requestAnimationFrame(e))
        }))
    }, r.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, r.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var n = e[i],
                o = n.newScroll > n.oldScroll ? n.forward : n.backward;
            for (var r in this.waypoints[i]) {
                var s = this.waypoints[i][r];
                if (null !== s.triggerPoint) {
                    var l = n.oldScroll < s.triggerPoint,
                        a = n.newScroll >= s.triggerPoint;
                    (l && a || !l && !a) && (s.queueTrigger(o), t[s.group.id] = s.group)
                }
            }
        }
        for (var h in t) t[h].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, r.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, r.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, r.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, r.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var n = 0, o = t.length; n < o; n++) t[n].destroy()
    }, r.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        for (var r in this.handleScroll(), t = {
                horizontal: {
                    contextOffset: e ? 0 : i.left,
                    contextScroll: e ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: e ? 0 : i.top,
                    contextScroll: e ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            }) {
            var s = t[r];
            for (var l in this.waypoints[r]) {
                var a, h, p, u, c = this.waypoints[r][l],
                    f = c.options.offset,
                    d = c.triggerPoint,
                    w = 0,
                    y = null == d;
                c.element !== c.element.window && (w = c.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(c) : "string" == typeof f && (f = parseFloat(f), c.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), a = s.contextScroll - s.contextOffset, c.triggerPoint = Math.floor(w + a - f), h = d < s.oldScroll, p = c.triggerPoint >= s.oldScroll, u = !h && !p, !y && (h && p) ? (c.queueTrigger(s.backward), o[c.group.id] = c.group) : (!y && u || y && s.oldScroll >= c.triggerPoint) && (c.queueTrigger(s.forward), o[c.group.id] = c.group)
            }
        }
        return n.requestAnimationFrame((function() {
            for (var t in o) o[t].flushTriggers()
        })), this
    }, r.findOrCreateByElement = function(t) {
        return r.findByElement(t) || new r(t)
    }, r.refreshAll = function() {
        for (var t in i) i[t].refresh()
    }, r.findByElement = function(t) {
        return i[t.waypointContextKey]
    }, window.onload = function() {
        o && o(), r.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e)
    }, n.Context = r
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }
    var i = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;

    function o(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
    }
    o.prototype.add = function(t) {
        this.waypoints.push(t)
    }, o.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, o.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var n = this.triggerQueues[i],
                o = "up" === i || "left" === i;
            n.sort(o ? e : t);
            for (var r = 0, s = n.length; r < s; r += 1) {
                var l = n[r];
                (l.options.continuous || r === n.length - 1) && l.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, o.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
    }, o.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, o.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, o.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, o.prototype.first = function() {
        return this.waypoints[0]
    }, o.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, o.findOrCreate = function(t) {
        return i[t.axis][t.name] || new o(t)
    }, n.Group = o
}(),
function() {
    "use strict";
    var t = window.Waypoint;

    function e(t) {
        return t === t.window
    }

    function i(t) {
        return e(t) ? t : t.defaultView
    }

    function n(t) {
        this.element = t, this.handlers = {}
    }
    n.prototype.innerHeight = function() {
        return e(this.element) ? this.element.innerHeight : this.element.clientHeight
    }, n.prototype.innerWidth = function() {
        return e(this.element) ? this.element.innerWidth : this.element.clientWidth
    }, n.prototype.off = function(t, e) {
        function i(t, e, i) {
            for (var n = 0, o = e.length - 1; n < o; n++) {
                var r = e[n];
                i && i !== r || t.removeEventListener(r)
            }
        }
        var n = t.split("."),
            o = n[0],
            r = n[1],
            s = this.element;
        if (r && this.handlers[r] && o) i(s, this.handlers[r][o], e), this.handlers[r][o] = [];
        else if (o)
            for (var l in this.handlers) i(s, this.handlers[l][o] || [], e), this.handlers[l][o] = [];
        else if (r && this.handlers[r]) {
            for (var a in this.handlers[r]) i(s, this.handlers[r][a], e);
            this.handlers[r] = {}
        }
    }, n.prototype.offset = function() {
        if (!this.element.ownerDocument) return null;
        var t = this.element.ownerDocument.documentElement,
            e = i(this.element.ownerDocument),
            n = {
                top: 0,
                left: 0
            };
        return this.element.getBoundingClientRect && (n = this.element.getBoundingClientRect()), {
            top: n.top + e.pageYOffset - t.clientTop,
            left: n.left + e.pageXOffset - t.clientLeft
        }
    }, n.prototype.on = function(t, e) {
        var i = t.split("."),
            n = i[0],
            o = i[1] || "__default",
            r = this.handlers[o] = this.handlers[o] || {};
        (r[n] = r[n] || []).push(e), this.element.addEventListener(n, e)
    }, n.prototype.outerHeight = function(t) {
        var i, n = this.innerHeight();
        return t && !e(this.element) && (i = window.getComputedStyle(this.element), n += parseInt(i.marginTop, 10), n += parseInt(i.marginBottom, 10)), n
    }, n.prototype.outerWidth = function(t) {
        var i, n = this.innerWidth();
        return t && !e(this.element) && (i = window.getComputedStyle(this.element), n += parseInt(i.marginLeft, 10), n += parseInt(i.marginRight, 10)), n
    }, n.prototype.scrollLeft = function() {
        var t = i(this.element);
        return t ? t.pageXOffset : this.element.scrollLeft
    }, n.prototype.scrollTop = function() {
        var t = i(this.element);
        return t ? t.pageYOffset : this.element.scrollTop
    }, n.extend = function() {
        var t = Array.prototype.slice.call(arguments);

        function e(t, e) {
            if ("object" == typeof t && "object" == typeof e)
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        }
        for (var i = 1, n = t.length; i < n; i++) e(t[0], t[i]);
        return t[0]
    }, n.inArray = function(t, e, i) {
        return null == e ? -1 : e.indexOf(t, i)
    }, n.isEmptyObject = function(t) {
        for (var e in t) return !1;
        return !0
    }, t.adapters.push({
        name: "noframework",
        Adapter: n
    }), t.Adapter = n
}();