/* eslint-disable */ (function (e, t) {
    typeof define == 'function' && define.amd ? define([], t) : (e.Spacecode = t());
})(this, function () {
    var e, t, n;
    return (
        (function (r) {
            function v(e, t) {
                return h.call(e, t);
            }
            function m(e, t) {
                var n,
                    r,
                    i,
                    s,
                    o,
                    u,
                    a,
                    f,
                    c,
                    h,
                    p,
                    v = t && t.split('/'),
                    m = l.map,
                    g = (m && m['*']) || {};
                if (e && e.charAt(0) === '.')
                    if (t) {
                        (v = v.slice(0, v.length - 1)),
                            (e = e.split('/')),
                            (o = e.length - 1),
                            l.nodeIdCompat && d.test(e[o]) && (e[o] = e[o].replace(d, '')),
                            (e = v.concat(e));
                        for (c = 0; c < e.length; c += 1) {
                            p = e[c];
                            if (p === '.') e.splice(c, 1), (c -= 1);
                            else if (p === '..') {
                                if (c === 1 && (e[2] === '..' || e[0] === '..')) break;
                                c > 0 && (e.splice(c - 1, 2), (c -= 2));
                            }
                        }
                        e = e.join('/');
                    } else e.indexOf('./') === 0 && (e = e.substring(2));
                if ((v || g) && m) {
                    n = e.split('/');
                    for (c = n.length; c > 0; c -= 1) {
                        r = n.slice(0, c).join('/');
                        if (v)
                            for (h = v.length; h > 0; h -= 1) {
                                i = m[v.slice(0, h).join('/')];
                                if (i) {
                                    i = i[r];
                                    if (i) {
                                        (s = i), (u = c);
                                        break;
                                    }
                                }
                            }
                        if (s) break;
                        !a && g && g[r] && ((a = g[r]), (f = c));
                    }
                    !s && a && ((s = a), (u = f)), s && (n.splice(0, u, s), (e = n.join('/')));
                }
                return e;
            }
            function g(e, t) {
                return function () {
                    var n = p.call(arguments, 0);
                    return typeof n[0] != 'string' && n.length === 1 && n.push(null), s.apply(r, n.concat([e, t]));
                };
            }
            function y(e) {
                return function (t) {
                    return m(t, e);
                };
            }
            function b(e) {
                return function (t) {
                    a[e] = t;
                };
            }
            function w(e) {
                if (v(f, e)) {
                    var t = f[e];
                    delete f[e], (c[e] = !0), i.apply(r, t);
                }
                if (!v(a, e) && !v(c, e)) throw new Error('No ' + e);
                return a[e];
            }
            function E(e) {
                var t,
                    n = e ? e.indexOf('!') : -1;
                return n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e];
            }
            function S(e) {
                return function () {
                    return (l && l.config && l.config[e]) || {};
                };
            }
            var i,
                s,
                o,
                u,
                a = {},
                f = {},
                l = {},
                c = {},
                h = Object.prototype.hasOwnProperty,
                p = [].slice,
                d = /\.js$/;
            (o = function (e, t) {
                var n,
                    r = E(e),
                    i = r[0];
                return (
                    (e = r[1]),
                    i && ((i = m(i, t)), (n = w(i))),
                    i
                        ? n && n.normalize
                            ? (e = n.normalize(e, y(t)))
                            : (e = m(e, t))
                        : ((e = m(e, t)), (r = E(e)), (i = r[0]), (e = r[1]), i && (n = w(i))),
                    { f: i ? i + '!' + e : e, n: e, pr: i, p: n }
                );
            }),
                (u = {
                    require: function (e) {
                        return g(e);
                    },
                    exports: function (e) {
                        var t = a[e];
                        return typeof t != 'undefined' ? t : (a[e] = {});
                    },
                    module: function (e) {
                        return { id: e, uri: '', exports: a[e], config: S(e) };
                    }
                }),
                (i = function (e, t, n, i) {
                    var s,
                        l,
                        h,
                        p,
                        d,
                        m = [],
                        y = typeof n,
                        E;
                    i = i || e;
                    if (y === 'undefined' || y === 'function') {
                        t = !t.length && n.length ? ['require', 'exports', 'module'] : t;
                        for (d = 0; d < t.length; d += 1) {
                            (p = o(t[d], i)), (l = p.f);
                            if (l === 'require') m[d] = u.require(e);
                            else if (l === 'exports') (m[d] = u.exports(e)), (E = !0);
                            else if (l === 'module') s = m[d] = u.module(e);
                            else if (v(a, l) || v(f, l) || v(c, l)) m[d] = w(l);
                            else {
                                if (!p.p) throw new Error(e + ' missing ' + l);
                                p.p.load(p.n, g(i, !0), b(l), {}), (m[d] = a[l]);
                            }
                        }
                        h = n ? n.apply(a[e], m) : undefined;
                        if (e)
                            if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports;
                            else if (h !== r || !E) a[e] = h;
                    } else e && (a[e] = n);
                }),
                (e = t = s = function (e, t, n, a, f) {
                    if (typeof e == 'string') return u[e] ? u[e](t) : w(o(e, t).f);
                    if (!e.splice) {
                        (l = e), l.deps && s(l.deps, l.callback);
                        if (!t) return;
                        t.splice ? ((e = t), (t = n), (n = null)) : (e = r);
                    }
                    return (
                        (t = t || function () {}),
                        typeof n == 'function' && ((n = a), (a = f)),
                        a
                            ? i(r, e, t, n)
                            : setTimeout(function () {
                                  i(r, e, t, n);
                              }, 4),
                        s
                    );
                }),
                (s.config = function (e) {
                    return s(e);
                }),
                (e._defined = a),
                (n = function (e, t, n) {
                    t.splice || ((n = t), (t = [])), !v(a, e) && !v(f, e) && (f[e] = [e, t, n]);
                }),
                (n.amd = { jQuery: !0 });
        })(),
        n('../build/almond', function () {}),
        n('Spacecode/Common/Enum', [], function () {
            var e = {};
            return (
                (e.getPropertyByValue = function (e) {
                    for (var t in this) if (this.hasOwnProperty(t) && this[t] == e) return t;
                    return null;
                }),
                e
            );
        }),
        n('Spacecode/Alert/AlertType', ['Spacecode/Common/Enum'], function (e) {
            var t = {
                DEVICE_DISCONNECTED: 'Device Disconnected',
                DOOR_OPEN_DELAY: 'Door Open Delay',
                TEMPERATURE: 'Temperature',
                THIEF_FINGER: 'Thief Finger'
            };
            return (t.getPropertyByValue = e.getPropertyByValue), t;
        }),
        n('Spacecode/Communication/Base64', [], function () {
            var e = {
                _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                encode: function (t) {
                    var n = '',
                        r,
                        i,
                        s,
                        o,
                        u,
                        a,
                        f,
                        l = 0;
                    t = e._utf8_encode(t);
                    while (l < t.length)
                        (r = t.charCodeAt(l++)),
                            (i = t.charCodeAt(l++)),
                            (s = t.charCodeAt(l++)),
                            (o = r >> 2),
                            (u = ((r & 3) << 4) | (i >> 4)),
                            (a = ((i & 15) << 2) | (s >> 6)),
                            (f = s & 63),
                            isNaN(i) ? (a = f = 64) : isNaN(s) && (f = 64),
                            (n =
                                n +
                                this._keyStr.charAt(o) +
                                this._keyStr.charAt(u) +
                                this._keyStr.charAt(a) +
                                this._keyStr.charAt(f));
                    return n;
                },
                decode: function (t) {
                    if (!t) return '';
                    typeof t != 'string' && t.length > 0 && typeof t[0] == 'string' && (t = t[0]);
                    var n = '',
                        r,
                        i,
                        s,
                        o,
                        u,
                        a,
                        f,
                        l = 0;
                    t = t.replace(/[^A-Za-z0-9\+\/=]/g, '');
                    while (l < t.length)
                        (o = this._keyStr.indexOf(t.charAt(l++))),
                            (u = this._keyStr.indexOf(t.charAt(l++))),
                            (a = this._keyStr.indexOf(t.charAt(l++))),
                            (f = this._keyStr.indexOf(t.charAt(l++))),
                            (r = (o << 2) | (u >> 4)),
                            (i = ((u & 15) << 4) | (a >> 2)),
                            (s = ((a & 3) << 6) | f),
                            (n += String.fromCharCode(r)),
                            a != 64 && (n += String.fromCharCode(i)),
                            f != 64 && (n += String.fromCharCode(s));
                    return (n = e._utf8_decode(n)), n;
                },
                _utf8_encode: function (e) {
                    e = e.replace(/\r\n/g, '\n');
                    var t = '';
                    for (var n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        r < 128
                            ? (t += String.fromCharCode(r))
                            : r > 127 && r < 2048
                            ? ((t += String.fromCharCode((r >> 6) | 192)), (t += String.fromCharCode((r & 63) | 128)))
                            : ((t += String.fromCharCode((r >> 12) | 224)),
                              (t += String.fromCharCode(((r >> 6) & 63) | 128)),
                              (t += String.fromCharCode((r & 63) | 128)));
                    }
                    return t;
                },
                _utf8_decode: function (e) {
                    var t = '',
                        n = 0,
                        r = 0,
                        i = 0,
                        s = 0;
                    while (n < e.length)
                        (r = e.charCodeAt(n)),
                            r < 128
                                ? ((t += String.fromCharCode(r)), n++)
                                : r > 191 && r < 224
                                ? ((i = e.charCodeAt(n + 1)),
                                  (t += String.fromCharCode(((r & 31) << 6) | (i & 63))),
                                  (n += 2))
                                : ((i = e.charCodeAt(n + 1)),
                                  (s = e.charCodeAt(n + 2)),
                                  (t += String.fromCharCode(((r & 15) << 12) | ((i & 63) << 6) | (s & 63))),
                                  (n += 3));
                    return t;
                }
            };
            return e;
        }),
        n('Spacecode/Alert/Alert', ['Spacecode/Alert/AlertType', 'Spacecode/Communication/Base64'], function (e, n) {
            function r(t, n, i, s, o, u, a) {
                if (!(this instanceof r)) throw new SyntaxError('Alert constructor cannot be called as a function.');
                (this._id = 0),
                    (this._type = t || e.UNDEFINED),
                    (this._toList = n),
                    (this._ccList = i),
                    (this._bccList = s),
                    (this._emailSubject = o),
                    (this._emailContent = u),
                    (this._enabled = a);
            }
            return (
                (r.prototype = {
                    constructor: r,
                    getId: function () {
                        return this._id;
                    },
                    getAlertType: function () {
                        return this._type;
                    },
                    getToList: function () {
                        return this._toList;
                    },
                    setToList: function (e) {
                        this._toList = e;
                    },
                    getCcList: function () {
                        return this._ccList;
                    },
                    setCcList: function (e) {
                        this._ccList = e;
                    },
                    getBccList: function () {
                        return this._bccList;
                    },
                    setBccList: function (e) {
                        this._bccList = e;
                    },
                    getEmailSubject: function () {
                        return this._emailSubject;
                    },
                    setEmailSubject: function (e) {
                        this._emailSubject = e;
                    },
                    getEmailContent: function () {
                        return this._emailContent;
                    },
                    setEmailContent: function (e) {
                        this._emailContent = e;
                    },
                    isEnabled: function () {
                        return this._enabled;
                    },
                    setEnabled: function (e) {
                        this._enabled = e;
                    },
                    serialize: function () {
                        var t = [];
                        return (
                            t.push('<alert>'),
                            t.push('<', r._NODE_ID, '>'),
                            t.push(this._id),
                            t.push('</', r._NODE_ID, '>'),
                            t.push('<', r._NODE_TYPE, '>'),
                            t.push(e.getPropertyByValue(this._type)),
                            t.push('</', r._NODE_TYPE, '>'),
                            t.push('<', r._NODE_TO, '>'),
                            t.push(this._toList),
                            t.push('</', r._NODE_TO, '>'),
                            t.push('<', r._NODE_CC, '>'),
                            t.push(this._ccList),
                            t.push('</', r._NODE_CC, '>'),
                            t.push('<', r._NODE_BCC, '>'),
                            t.push(this._bccList),
                            t.push('</', r._NODE_BCC, '>'),
                            t.push('<', r._NODE_SUBJECT, '>'),
                            t.push(this._emailSubject),
                            t.push('</', r._NODE_SUBJECT, '>'),
                            t.push('<', r._NODE_CONTENT, '>'),
                            t.push(this._emailContent),
                            t.push('</', r._NODE_CONTENT, '>'),
                            t.push('<', r._NODE_ENABLED, '>'),
                            t.push(this._enabled ? 'true' : 'false'),
                            t.push('</', r._NODE_ENABLED, '>'),
                            t.push('</alert>'),
                            n.encode(t.join(''))
                        );
                    }
                }),
                (r.deserialize = function (n) {
                    if (!window.DOMParser || !n || !(typeof n == 'string' || n instanceof String)) return null;
                    var i = new DOMParser(),
                        s = i.parseFromString(n, 'text/xml'),
                        o = s.querySelector(r._NODE_ID),
                        u = s.querySelector(r._NODE_TYPE),
                        a = s.querySelector(r._NODE_TO),
                        f = s.querySelector(r._NODE_SUBJECT),
                        l = s.querySelector(r._NODE_CONTENT),
                        c = s.querySelector(r._NODE_ENABLED);
                    if (o == null || u == null || a == null || f == null || l == null || c == null) return null;
                    var h = s.querySelector(r._NODE_CC),
                        p = s.querySelector(r._NODE_BCC),
                        d = s.querySelector('min'),
                        v = s.querySelector('max'),
                        m = parseInt(o.firstChild.nodeValue);
                    m = isNaN(m) ? 0 : m;
                    var g = u.firstChild.nodeValue,
                        y = a.firstChild.nodeValue,
                        b = h.firstChild == null ? '' : h.firstChild.nodeValue,
                        w = p.firstChild == null ? '' : p.firstChild.nodeValue,
                        E = f.firstChild.nodeValue,
                        S = l.firstChild.nodeValue,
                        x = c.firstChild.nodeValue;
                    if (!d || !v) {
                        var T = new r(e[g], y, b, w, E, S, x == 'true');
                        return (T._id = m), T;
                    }
                    var N = d.firstChild.nodeValue,
                        C = v.firstChild.nodeValue,
                        k = t('Spacecode/Alert/AlertTemperature'),
                        L = new k(y, b, w, E, S, x == 'true', parseFloat(N), parseFloat(C));
                    return (L._id = m), L;
                }),
                (r._NODE_ID = 'id'),
                (r._NODE_TYPE = 'type'),
                (r._NODE_TO = 'to'),
                (r._NODE_CC = 'cc'),
                (r._NODE_BCC = 'bcc'),
                (r._NODE_SUBJECT = 'subject'),
                (r._NODE_CONTENT = 'content'),
                (r._NODE_ENABLED = 'enabled'),
                r
            );
        }),
        n('Spacecode/Alert/AlertReport', [], function () {
            function e(t, n, r) {
                if (!(this instanceof e))
                    throw new SyntaxError('AlertReport constructor cannot be called as a function.');
                (this._alert = t), (this._extraData = n), (this._createdAt = r);
            }
            return (
                (e.prototype = {
                    constructor: e,
                    getAlert: function () {
                        return this._alert;
                    },
                    getAdditionalData: function () {
                        return this._extraData;
                    },
                    getCreationDate: function () {
                        return this._createdAt;
                    }
                }),
                e
            );
        }),
        n(
            'Spacecode/Alert/AlertTemperature',
            ['Spacecode/Alert/Alert', 'Spacecode/Alert/AlertType', 'Spacecode/Communication/Base64'],
            function (e, t, n) {
                function r(n, i, s, o, u, a, f, l) {
                    if (!(this instanceof r))
                        throw new SyntaxError('AlertTemperature constructor cannot be called as a function.');
                    e.call(this, t.TEMPERATURE, n, i, s, o, u, a),
                        (this._temperatureMin = f),
                        (this._temperatureMax = l);
                }
                return (
                    (r.prototype = Object.create(e.prototype)),
                    (r.prototype.constructor = r),
                    (r.prototype.getTemperatureMin = function () {
                        return this._temperatureMin;
                    }),
                    (r.prototype.setTemperatureMin = function (e) {
                        this._temperatureMin = e;
                    }),
                    (r.prototype.getTemperatureMax = function () {
                        return this._temperatureMax;
                    }),
                    (r.prototype.setTemperatureMax = function (e) {
                        this._temperatureMax = e;
                    }),
                    (r.prototype.serialize = function () {
                        var i = [],
                            s = new e(
                                t.TEMPERATURE,
                                this._toList,
                                this._ccList,
                                this._bccList,
                                this._emailSubject,
                                this._emailContent,
                                this._enabled
                            );
                        s._id = this._id;
                        var o = n.decode(s.serialize());
                        return (
                            (o = o.replace('</alert>', '')),
                            i.push(o),
                            i.push('<temperature>'),
                            i.push('<', r._NODE_MIN, '>'),
                            i.push(this._temperatureMin),
                            i.push('</', r._NODE_MIN, '>'),
                            i.push('<', r._NODE_MAX, '>'),
                            i.push(this._temperatureMax),
                            i.push('</', r._NODE_MAX, '>'),
                            i.push('</temperature>'),
                            i.push('</alert>'),
                            n.encode(i.join(''))
                        );
                    }),
                    (r._NODE_MIN = 'min'),
                    (r._NODE_MAX = 'max'),
                    r
                );
            }
        ),
        n('Spacecode/Alert/SmtpServer', [], function () {
            function e(t, n, r, i, s) {
                if (!(this instanceof e))
                    throw new SyntaxError('SmtpServer constructor cannot be called as a function.');
                if (!n || typeof n != 'number' || n < 1 || n > 65535)
                    throw new SyntaxError('Invalid TCP port number provided.');
                if (!t || typeof t != 'string' || t.trim().length === 0)
                    throw new SyntaxError('Invalid address provided.');
                (this._address = t),
                    (this._port = n),
                    (this._username = !r || typeof r != 'string' ? '' : r),
                    (this._password = !i || typeof i != 'string' ? '' : i),
                    (this._sslEnabled = s);
            }
            return (
                (e.prototype = {
                    constructor: e,
                    toString: function () {
                        return 'SmtpServer';
                    },
                    getAddress: function () {
                        return this._address;
                    },
                    getPort: function () {
                        return this._port;
                    },
                    getUsername: function () {
                        return this._username;
                    },
                    getPassword: function () {
                        return this._password;
                    },
                    isSslEnabled: function () {
                        return this._sslEnabled;
                    },
                    setAddress: function (e) {
                        if (!e || typeof e != 'string' || e.trim().length === 0)
                            throw new SyntaxError('Invalid address');
                        this._address = e;
                    },
                    setPort: function (e) {
                        if (!e || typeof e != 'number' || e < 1 || e > 65535)
                            throw new SyntaxError('Invalid TCP port number');
                        this._port = e;
                    },
                    setUsername: function (e) {
                        if (!e || typeof e != 'string' || e.trim().length === 0)
                            throw new SyntaxError('Invalid username');
                        this._user = e;
                    },
                    setPassword: function (e) {
                        this._password = !e || typeof e != 'string' ? '' : e;
                    },
                    setSslEnabled: function (e) {
                        this._sslEnabled = e;
                    }
                }),
                e
            );
        }),
        n('Spacecode/Device/DbConfiguration', [], function () {
            function e(t, n, r, i, s, o) {
                if (!(this instanceof e))
                    throw new SyntaxError('DbConfiguration constructor cannot be called as a function.');
                if (e._ALLOWED_DBMS.indexOf(o) === -1)
                    throw new SyntaxError('Invalid DBMS: only MySQL, PostgreSQL and SQL Server are supported.');
                if (!n || typeof n != 'number' || n < 1 || n > 65535)
                    throw new SyntaxError('Invalid TCP port number provided.');
                if (!t || typeof t != 'string' || t.trim().length === 0)
                    throw new SyntaxError('Invalid host provided.');
                if (!r || typeof r != 'string' || r.trim().length === 0)
                    throw new SyntaxError('Invalid name provided.');
                if (!i || typeof i != 'string' || i.trim().length === 0)
                    throw new SyntaxError('Invalid username provided.');
                (this._delay = t),
                    (this._delta = n),
                    (this._enabled = r),
                    (this._user = i),
                    (this._password = s),
                    (this._dbms = o);
            }
            return (
                (e.MySQL = 'mysql'),
                (e.PostgreSQL = 'postgresql'),
                (e.SQL_Server = 'sqlserver'),
                (e._ALLOWED_DBMS = [e.MySQL, e.PostgreSQL, e.SQL_Server]),
                (e.prototype = {
                    constructor: e,
                    toString: function () {
                        return 'DbConfiguration';
                    },
                    getHost: function () {
                        return this._delay;
                    },
                    getPort: function () {
                        return this._delta;
                    },
                    getName: function () {
                        return this._enabled;
                    },
                    getUser: function () {
                        return this._user;
                    },
                    getPassword: function () {
                        return this._password;
                    },
                    getDbms: function () {
                        return this._dbms;
                    },
                    setHost: function (e) {
                        if (!e || typeof e != 'string' || e.trim().length === 0) throw new SyntaxError('Invalid host');
                        this._delay = e;
                    },
                    setPort: function (e) {
                        if (!e || typeof e != 'number' || e < 1 || e > 65535)
                            throw new SyntaxError('Invalid TCP port number');
                        this._delta = e;
                    },
                    setName: function (e) {
                        if (!e || typeof e != 'string' || e.trim().length === 0) throw new SyntaxError('Invalid name');
                        this._enabled = e;
                    },
                    setUser: function (e) {
                        if (!e || typeof e != 'string' || e.trim().length === 0)
                            throw new SyntaxError('Invalid username');
                        this._user = e;
                    },
                    setPassword: function (e) {
                        this._password = !e || typeof e != 'string' ? '' : e;
                    },
                    setDbms: function (t) {
                        if (!t || typeof t != 'string' || e._ALLOWED_DBMS.indexOf(t) === -1)
                            throw new SyntaxError('Invalid DBMS');
                        this._dbms = t;
                    }
                }),
                e
            );
        }),
        n('Spacecode/Inventory/AccessType', ['Spacecode/Common/Enum'], function (e) {
            var t = { UNDEFINED: 'Undefined', BADGE: 'Badge', FINGERPRINT: 'Fingerprint' };
            return (t.getPropertyByValue = e.getPropertyByValue), t;
        }),
        n(
            'Spacecode/Inventory/Inventory',
            ['Spacecode/Inventory/AccessType', 'Spacecode/Communication/Base64'],
            function (e, t) {
                function n() {
                    if (!(this instanceof n))
                        throw new SyntaxError('Inventory constructor cannot be called as a function.');
                    (this._addedTags = []),
                        (this._presentTags = []),
                        (this._removedTags = []),
                        (this._id = 0),
                        (this._username = ''),
                        (this._accessType = e.UNDEFINED),
                        (this._createdAt = new Date());
                }
                return (
                    (n.prototype = {
                        constructor: n,
                        getId: function () {
                            return this._id;
                        },
                        getTagsAll: function () {
                            return this._addedTags.concat(this._presentTags);
                        },
                        getTagsAdded: function () {
                            return this._addedTags;
                        },
                        getTagsPresent: function () {
                            return this._presentTags;
                        },
                        getTagsRemoved: function () {
                            return this._removedTags;
                        },
                        getUsername: function () {
                            return this._username;
                        },
                        getAccessType: function () {
                            return this._accessType;
                        },
                        getCreationDate: function () {
                            return this._createdAt;
                        },
                        getNumberTotal: function () {
                            return this._addedTags.length + this._presentTags.length;
                        },
                        getNumberAdded: function () {
                            return this._addedTags.length;
                        },
                        getNumberPresent: function () {
                            return this._presentTags.length;
                        },
                        getNumberRemoved: function () {
                            return this._removedTags.length;
                        },
                        serialize: function () {
                            var r = [];
                            r.push('<inventory>'),
                                r.push('<', n._NODE_ID, '>'),
                                r.push(this._id),
                                r.push('</', n._NODE_ID + '>'),
                                r.push('<', n._NODE_DATE, '>'),
                                r.push(this._createdAt.getTime() / 1e3),
                                r.push('</', n._NODE_DATE + '>'),
                                r.push('<', n._NODE_PRESENT_TAGS, '>');
                            for (var i = 0; i < this._presentTags.length; ++i)
                                r.push('<', n._NODE_TAG_UID, '>'),
                                    r.push(this._presentTags[i]),
                                    r.push('</', n._NODE_TAG_UID, '>');
                            r.push('</', n._NODE_PRESENT_TAGS, '>'), r.push('<', n._NODE_ADDED_TAGS, '>');
                            for (i = 0; i < this._addedTags.length; ++i)
                                r.push('<', n._NODE_TAG_UID, '>'),
                                    r.push(this._addedTags[i]),
                                    r.push('</', n._NODE_TAG_UID, '>');
                            r.push('</', n._NODE_ADDED_TAGS, '>'), r.push('<', n._NODE_REMOVED_TAGS, '>');
                            for (i = 0; i < this._removedTags.length; ++i)
                                r.push('<', n._NODE_TAG_UID, '>'),
                                    r.push(this._removedTags[i]),
                                    r.push('</', n._NODE_TAG_UID, '>');
                            return (
                                r.push('</', n._NODE_REMOVED_TAGS, '>'),
                                this._username != null &&
                                    this._username.trim() != '' &&
                                    (r.push('<', n._NODE_USERNAME, '>'),
                                    r.push(this._username),
                                    r.push('</', n._NODE_USERNAME, '>'),
                                    r.push('<', n._NODE_ACCESS_TYPE, '>'),
                                    r.push(e.getPropertyByValue(this._accessType)),
                                    r.push('</', n._NODE_ACCESS_TYPE, '>')),
                                r.push('</inventory>'),
                                t.encode(r.join(''))
                            );
                        }
                    }),
                    (n._create = function (t, r, i, s, o, u, a) {
                        var f = new n();
                        return (
                            (f._id = t || 0),
                            (f._addedTags = r || []),
                            (f._presentTags = i || []),
                            (f._removedTags = s || []),
                            (f._username = o || ''),
                            (f._accessType = u || e.UNDEFINED),
                            (f._createdAt = a || new Date()),
                            f
                        );
                    }),
                    (n.deserialize = function (t) {
                        if (!window.DOMParser || !t || !(typeof t == 'string' || t instanceof String)) return null;
                        var r = new DOMParser(),
                            i = r.parseFromString(t, 'text/xml'),
                            s = i.querySelector(n._NODE_ID),
                            o = i.querySelector(n._NODE_DATE),
                            u = i.querySelector(n._NODE_ADDED_TAGS),
                            a = i.querySelector(n._NODE_PRESENT_TAGS),
                            f = i.querySelector(n._NODE_REMOVED_TAGS);
                        if (o == null || u == null || a == null || f == null) return null;
                        var l = s == null || !s.firstChild ? 0 : parseInt(s.firstChild.nodeValue);
                        l = isNaN(l) ? 0 : l;
                        var c = i.querySelector(n._NODE_USERNAME),
                            h = i.querySelector(n._NODE_ACCESS_TYPE),
                            p = u.querySelectorAll(n._NODE_TAG_UID),
                            d = a.querySelectorAll(n._NODE_TAG_UID),
                            v = f.querySelectorAll(n._NODE_TAG_UID),
                            m = c == null ? '' : c.firstChild.nodeValue,
                            g = h == null ? '' : h.firstChild.nodeValue,
                            y = o.firstChild == null ? new Date() : new Date(o.firstChild.nodeValue * 1e3),
                            b = [],
                            w = [],
                            E = [];
                        for (var S = 0; S < p.length; ++S) b.push(p[S].childNodes[0].nodeValue);
                        for (S = 0; S < d.length; ++S) w.push(d[S].childNodes[0].nodeValue);
                        for (S = 0; S < v.length; ++S) E.push(v[S].childNodes[0].nodeValue);
                        return n._create(l, b, w, E, m, e[g], y);
                    }),
                    (n._NODE_ID = 'id'),
                    (n._NODE_DATE = 'date'),
                    (n._NODE_ADDED_TAGS = 'addedTags'),
                    (n._NODE_PRESENT_TAGS = 'presentTags'),
                    (n._NODE_REMOVED_TAGS = 'removedTags'),
                    (n._NODE_TAG_UID = 'tag'),
                    (n._NODE_USERNAME = 'username'),
                    (n._NODE_ACCESS_TYPE = 'accessType'),
                    n
                );
            }
        ),
        n('Spacecode/User/GrantType', ['Spacecode/Common/Enum'], function (e) {
            var t = { ALL: 'All', MASTER: 'Master', SLAVE: 'Slave', UNDEFINED: 'Undefined' };
            return (t.getPropertyByValue = e.getPropertyByValue), t;
        }),
        n('Spacecode/User/User', ['Spacecode/User/GrantType', 'Spacecode/Communication/Base64'], function (e, t) {
            function n(t, r, i, s) {
                if (!(this instanceof n)) throw new SyntaxError('User constructor cannot be called as a function');
                if (!t || typeof t != 'string') throw new SyntaxError('Invalid Username');
                if (!r || e.getPropertyByValue(r) == null) throw new SyntaxError('Invalid Permission');
                (this._username = t),
                    (this._grantType = r || e.UNDEFINED),
                    (this._badgeNumber = i || ''),
                    (this._fingers = s || new Map());
            }
            return (
                (n.prototype = {
                    constructor: n,
                    getUsername: function () {
                        return this._username;
                    },
                    getBadgeNumber: function () {
                        return this._badgeNumber;
                    },
                    getPermission: function () {
                        return this._grantType;
                    },
                    getEnrolledFingersIndexes: function () {
                        var e = [];
                        return (
                            this._fingers.forEach(function (t, n) {
                                e.push(n);
                            }),
                            e
                        );
                    },
                    getFingerprintTemplate: function (e) {
                        return this._fingers.get(e) || null;
                    },
                    serialize: function () {
                        var r = [];
                        return (
                            r.push('<user>'),
                            r.push('<', n._NODE_USERNAME, '>'),
                            r.push(this._username),
                            r.push('</', n._NODE_USERNAME, '>'),
                            r.push('<', n._NODE_BADGE_NUMBER, '>'),
                            r.push(this._badgeNumber),
                            r.push('</', n._NODE_BADGE_NUMBER, '>'),
                            r.push('<', n._NODE_GRANT_TYPE, '>'),
                            r.push(e.getPropertyByValue(this._grantType)),
                            r.push('</', n._NODE_GRANT_TYPE, '>'),
                            r.push('<', n._NODE_FINGERS, '>'),
                            this._fingers.forEach(function (e, t) {
                                r.push('<', n._NODE_FINGER, ' ', n._ATTR_FINGER_INDEX, '="', t, '">'),
                                    r.push(e, '</', n._NODE_FINGER, '>');
                            }),
                            r.push('</', n._NODE_FINGERS, '>'),
                            r.push('</user>'),
                            t.encode(r.join(''))
                        );
                    }
                }),
                (n.deserialize = function (t) {
                    if (!window.DOMParser || !t || !(typeof t == 'string' || t instanceof String)) return null;
                    var r = new DOMParser(),
                        i = r.parseFromString(t, 'text/xml'),
                        s = i.querySelector(n._NODE_USERNAME),
                        o = i.querySelector(n._NODE_BADGE_NUMBER),
                        u = i.querySelector(n._NODE_GRANT_TYPE),
                        a = i.querySelector(n._NODE_FINGERS);
                    if (s == null || o == null || u == null || a == null) return null;
                    var f = s.firstChild.nodeValue,
                        l = o.firstChild == null ? '' : o.firstChild.nodeValue,
                        c = u.firstChild.nodeValue,
                        h = a.querySelectorAll(n._NODE_FINGER),
                        p = new Map();
                    for (var d = 0; d < h.length; ++d) {
                        var v = parseInt(h[d].getAttribute('index'));
                        if (isNaN(v) || v < 0 || v > 9) continue;
                        p.set(v, h[d].firstChild.nodeValue);
                    }
                    return new n(f, e[c], l, p);
                }),
                (n._NODE_USERNAME = 'username'),
                (n._NODE_BADGE_NUMBER = 'badgeNumber'),
                (n._NODE_GRANT_TYPE = 'grantType'),
                (n._NODE_FINGERS = 'fingers'),
                (n._NODE_FINGER = 'finger'),
                (n._ATTR_FINGER_INDEX = 'index'),
                n
            );
        }),
        n('Spacecode/User/FingerIndex', [], function () {
            var e = {
                LEFT_PINKY: 0,
                LEFT_RING: 1,
                LEFT_MIDDLE: 2,
                LEFT_INDEX: 3,
                LEFT_THUMB: 4,
                RIGHT_THUMB: 5,
                RIGHT_INDEX: 6,
                RIGHT_MIDDLE: 7,
                RIGHT_RING: 8,
                RIGHT_PINKY: 9
            };
            return e;
        }),
        n('Spacecode/User/Authentication', [], function () {
            function e(t, n, r) {
                if (!(this instanceof e))
                    throw new SyntaxError('Authentication constructor cannot be called as a function.');
                (this._username = t), (this._accessType = n), (this._createdAt = r);
            }
            return (
                (e.prototype = {
                    constructor: e,
                    getUsername: function () {
                        return this._username;
                    },
                    getAccessType: function () {
                        return this._accessType;
                    },
                    getCreationDate: function () {
                        return this._createdAt;
                    }
                }),
                e
            );
        }),
        n('Spacecode/Device/RewriteUidResult', [], function () {
            var e = {
                ERROR: 'Unexpected Error',
                TAG_NOT_DETECTED: 'Tag not found',
                TAG_NOT_CONFIRMED: 'Tag could not be confirmed',
                TAG_BLOCKED_OR_NOT_SUPPLIED: 'Tag blocked or not powered',
                TAG_BLOCKED: 'Tag blocked',
                TAG_NOT_SUPPLIED: 'Tag not powered',
                WRITING_CONFIRMATION_FAILED: 'Writing confirmation failed',
                WRITING_SUCCESS: 'Writing successful',
                NEW_UID_INVALID: 'Invalid new UID'
            };
            return e;
        }),
        n('Spacecode/Device/DeviceStatus', [], function () {
            var e = {
                NOT_READY: 'Not Ready',
                READY: 'Ready',
                DOOR_OPEN: 'Door Open',
                DOOR_CLOSED: 'Door Closed',
                SCANNING: 'Scanning',
                WAIT_MODE: 'Wait Mode',
                ERROR: 'Error',
                FLASHING_FIRMWARE: 'Flashing Firmware',
                LED_ON: 'Lighting',
                ENROLLING: 'Enrolling'
            };
            return e;
        }),
        n('Spacecode/Temperature/ProbeSettings', [], function () {
            function e(t, n, r) {
                if (!(this instanceof e))
                    throw new SyntaxError('ProbeSettings constructor cannot be called as a function.');
                if (!t || typeof t != 'number' || (t < e.MIN_MEASURE_DELAY && t !== -1))
                    throw new SyntaxError('Delay is invalid.');
                if (!n || typeof n != 'number' || (n < e.MIN_MEASURE_DELTA && n !== -1))
                    throw new SyntaxError('Delta is invalid.');
                if (typeof r != 'boolean') throw new SyntaxError('State (enabled/disabled) is invalid.');
                (this._delay = t), (this._delta = n), (this._enabled = r);
            }
            return (
                (e.MIN_MEASURE_DELAY = 20),
                (e.MIN_MEASURE_DELTA = 0.1),
                (e.prototype = {
                    constructor: e,
                    toString: function () {
                        return 'ProbeSettings';
                    },
                    getDelay: function () {
                        return this._delay;
                    },
                    getDelta: function () {
                        return this._delta;
                    },
                    isEnabled: function () {
                        return this._enabled;
                    }
                }),
                e
            );
        }),
        n(
            'Spacecode/Communication/PacketTransformer',
            [
                'Spacecode/Inventory/Inventory',
                'Spacecode/Inventory/AccessType',
                'Spacecode/Alert/Alert',
                'Spacecode/Alert/AlertType',
                'Spacecode/Alert/AlertTemperature',
                'Spacecode/Alert/AlertReport',
                'Spacecode/User/User',
                'Spacecode/User/GrantType',
                'Spacecode/User/FingerIndex',
                'Spacecode/User/Authentication',
                'Spacecode/Device/RewriteUidResult',
                'Spacecode/Communication/Base64',
                'Spacecode/Device/DeviceStatus',
                'Spacecode/Device/DbConfiguration',
                'Spacecode/Alert/SmtpServer',
                'Spacecode/Temperature/ProbeSettings'
            ],
            function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
                function m(e) {
                    return e ? n.deserialize(c.decode(e)) : null;
                }
                function g(e) {
                    if (!e || e.length < 2) return null;
                    var t = e.length > 2 ? e[2] : '';
                    return new s(m(e[0]), t, new Date(e[1] * 1e3));
                }
                function y(e, t) {
                    var n = t[0];
                    if (!e || e.length % 3 != 0 || !n || n.length == 0) return [];
                    var r = [],
                        i = new Map();
                    n.forEach(function (e) {
                        if (!e || e.getId() < 1) return;
                        i.set(e.getId(), e);
                    });
                    for (var o = 0; o < e.length; o += 3) {
                        var u = parseInt(e[o]),
                            a = e[o + 1],
                            f = e[o + 2];
                        if (isNaN(u) || !i.has(u)) continue;
                        r.push(new s(i.get(u), f, new Date(a * 1e3)));
                    }
                    return r;
                }
                function b(e) {
                    if (!e || e.length < 1) return [];
                    var t = [];
                    for (var n = 0; n < e.length; ++n) {
                        var r = m(e[n]);
                        r != null && t.push(r);
                    }
                    return t;
                }
                function w(e) {
                    if (!e || e.length % 3 != 0) return [];
                    var n = [];
                    for (var r = 0; r < e.length; r += 3) {
                        var i = e[r],
                            s = e[r + 1],
                            o = e[r + 2];
                        (o = o == 'F' ? t.FINGERPRINT : o == 'B' ? t.BADGE : t.UNDEFINED),
                            n.push(new f(i, o, new Date(s * 1e3)));
                    }
                    return n;
                }
                function E(e) {
                    return e == 'true';
                }
                function S(e) {
                    if (!e || e.length < 5) return null;
                    try {
                        return new p(e[0], parseInt(e[1]), e[2], e[3], '', e[4]);
                    } catch (t) {
                        if (t instanceof SyntaxError) return null;
                        throw t;
                    }
                }
                function x(e) {
                    return !e || !h[e] ? h.ERROR : h[e];
                }
                function T(t) {
                    return t ? e.deserialize(c.decode(t)) : null;
                }
                function N(e) {
                    if (!e || e.length < 1) return [];
                    var t = [];
                    for (var n = 0; n < e.length; ++n) {
                        var r = T(e[n]);
                        r != null && t.push(r);
                    }
                    return t;
                }
                function C(e) {
                    if (!e || e.length < 2 || (e.length & 1) == 1) return new Map();
                    var t = new Map();
                    for (var n = 0; n < e.length; n += 2) t.set(new Date(e[n] * 1e3), e[n + 1]);
                    return t;
                }
                function k(e) {
                    if (!e || e.length < 3) return null;
                    try {
                        return new v(parseInt(e[0]), parseFloat(e[1]), E(e[2]));
                    } catch (t) {
                        if (t instanceof SyntaxError) return null;
                        throw t;
                    }
                }
                function L(e) {
                    if (!e || e.length < 5) return null;
                    try {
                        return new d(e[0], parseInt(e[1]), e[2], e[3], E(e[4]));
                    } catch (t) {
                        if (t instanceof SyntaxError) return null;
                        throw t;
                    }
                }
                function A(e) {
                    return l[e] || l.ERROR;
                }
                function O(e) {
                    return e ? o.deserialize(c.decode(e)) : null;
                }
                function M(e) {
                    if (!e || e.length < 1) return [];
                    var t = [];
                    for (var n = 0; n < e.length; ++n) {
                        var r = O(e[n]);
                        r != null && t.push(r);
                    }
                    return t;
                }
                return {
                    transformAlert: m,
                    transformAlerts: b,
                    transformAlertReport: g,
                    transformAlertReports: y,
                    transformAuthentications: w,
                    transformBoolean: E,
                    transformDbConfiguration: S,
                    transformDeviceStatus: x,
                    transformInventories: N,
                    transformInventory: T,
                    transformMeasures: C,
                    transformProbeSettings: k,
                    transformSmtpServer: L,
                    transformRewriteUidResult: A,
                    transformUser: O,
                    transformUsers: M
                };
            }
        ),
        n('Spacecode/Communication/RequestCode', [], function () {
            return {
                ADD_ALERT: 'addalert',
                ADD_USER: 'adduser',
                ALERTS_LIST: 'alertslist',
                AUTHENTICATIONS_LIST: 'authenticationslist',
                ALERT_REPORTS: 'alertreports',
                DB_SETTINGS: 'dbsettings',
                DEVICE_STATUS: 'devicestatus',
                DISCONNECT: 'disconnect',
                ENROLL_FINGER: 'enrollfinger',
                INITIALIZATION: 'initialization',
                INVENTORIES_LIST: 'inventorieslist',
                INVENTORY_BY_ID: 'inventorybyid',
                LAST_ALERT: 'lastalert',
                LAST_INVENTORY: 'lastinventory',
                PROBE_SETTINGS: 'probesettings',
                REMOVE_ALERT: 'removealert',
                REMOVE_FINGERPRINT: 'removefingerprint',
                REMOVE_USER: 'removeuser',
                REWRITE_UID: 'rewriteuid',
                SCAN: 'scan',
                SET_DB_SETTINGS: 'setdbsettings',
                SET_PROBE_SETTINGS: 'setprobesettings',
                SET_SMTP_SERVER: 'setsmtpserver',
                SET_THIEF_FINGER: 'setthieffinger',
                SMTP_SERVER: 'smtpserver',
                START_LIGHTING: 'startlighting',
                STOP_LIGHTING: 'stoplighting',
                STOP_SCAN: 'stopscan',
                TEMPERATURE_CURRENT: 'temperaturecurrent',
                TEMPERATURE_LIST: 'temperaturelist',
                UPDATE_ALERT: 'updatealert',
                UPDATE_BADGE: 'updatebadge',
                UPDATE_PERMISSION: 'updatepermission',
                USER_BY_NAME: 'userbyname',
                USERS_LIST: 'userslist',
                USERS_UNREGISTERED: 'usersunregistered'
            };
        }),
        n('Spacecode/Communication/EventCode', [], function () {
            return {
                ALERT: 'event_alert',
                AUTHENTICATION_SUCCESS: 'event_authentication_success',
                AUTHENTICATION_FAILURE: 'event_authentication_failure',
                BADGE_SCANNED: 'event_badge_scanned',
                DEVICE_DISCONNECTED: 'event_device_disconnected',
                DOOR_OPENED: 'event_door_opened',
                DOOR_CLOSED: 'event_door_closed',
                DOOR_OPEN_DELAY: 'event_door_open_delay',
                ENROLLMENT_SAMPLE: 'event_enrollment_sample',
                FINGER_TOUCHED: 'event_finger_touched',
                FLASHING_PROGRESS: 'event_flashing_progress',
                LIGHTING_STARTED: 'event_lighting_started',
                LIGHTING_STOPPED: 'event_lighting_stopped',
                SCAN_CANCELLED_BY_DOOR: 'event_scan_cancelled_by_door',
                SCAN_CANCELLED_BY_HOST: 'event_scan_cancelled_by_host',
                SCAN_COMPLETED: 'event_scan_completed',
                SCAN_FAILED: 'event_scan_failed',
                SCAN_STARTED: 'event_scan_started',
                STATUS_CHANGED: 'event_status_changed',
                TAG_ADDED: 'event_tag_added',
                TAG_PRESENCE: 'event_tag_presence',
                TEMPERATURE_MEASURE: 'event_temperature_measure'
            };
        }),
        n('Spacecode/Device/DeviceType', [], function () {
            var e = {
                UNKNOWN: 'Unknown',
                SAS: 'SAS',
                SMARTBOARD: 'SmartBoard',
                SMARTBOX: 'SmartBox',
                SMARTCABINET: 'SmartCabinet',
                SMARTDRAWER: 'SmartDrawer',
                SMARTFRIDGE: 'SmartFridge',
                SMARTPAD: 'SmartPad',
                SMARTRACK: 'SmartRack',
                SMARTSTATION: 'SmartStation'
            };
            return e;
        }),
        n(
            'Spacecode/Device/Device',
            [
                'Spacecode/Inventory/Inventory',
                'Spacecode/User/User',
                'Spacecode/User/GrantType',
                'Spacecode/Communication/PacketTransformer',
                'Spacecode/Communication/RequestCode',
                'Spacecode/Communication/EventCode',
                'Spacecode/Device/DeviceStatus',
                'Spacecode/Device/DeviceType',
                'Spacecode/Inventory/AccessType',
                'Spacecode/Alert/Alert',
                'Spacecode/Alert/AlertTemperature',
                'Spacecode/Device/RewriteUidResult',
                'Spacecode/Device/DbConfiguration',
                'Spacecode/Alert/SmtpServer',
                'Spacecode/Temperature/ProbeSettings'
            ],
            function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
                function v(e, t) {
                    if (!(this instanceof v))
                        throw new SyntaxError('Device constructor cannot be called as a function.');
                    (this._ipAddress = e),
                        (this._tcpPort = typeof t == 'undefined' ? v.WEBSOCKET_TCP_PORT : t),
                        (this._socket = null),
                        (this._responseCallbacks = new Map()),
                        (this._serialNumber = null),
                        (this._deviceType = null),
                        (this._hardwareVersion = null),
                        (this._softwareVersion = null),
                        (this._status = o.ERROR),
                        (this._events = {});
                }
                return (
                    (v.TEMPERATURE_ERROR = 777),
                    (v.WEBSOCKET_TCP_PORT = 8081),
                    (v.prototype = {
                        constructor: v,
                        toString: function () {
                            return 'Device';
                        },
                        connect: function () {
                            if (this._socket != null)
                                if (
                                    this._socket.readyState == WebSocket.OPEN ||
                                    this._socket.readyState == WebSocket.CONNECTING
                                )
                                    return;
                            this._initializeSocket();
                        },
                        release: function () {
                            if (this._socket == null) return;
                            var e = this._socket.readyState;
                            if (e == WebSocket.OPEN || e == WebSocket.CONNECTING)
                                this._socket.send(i.DISCONNECT),
                                    this._socket.close(),
                                    this._dispatchEvent('disconnected', null);
                        },
                        _initializeDevice: function () {
                            var e = this;
                            this._send({ code: i.INITIALIZATION }, function (t) {
                                if (t === undefined || t.length < 4) {
                                    e._dispatchEvent('connected', null);
                                    return;
                                }
                                (e._serialNumber = t[0]),
                                    (e._deviceType = u[t[1]]),
                                    (e._hardwareVersion = t[2]),
                                    (e._softwareVersion = t[3]),
                                    t.length > 4 && e._updateStatus(t[4]),
                                    e._dispatchEvent('connected', null);
                            });
                        },
                        addAlert: function (e, t) {
                            if (!t || !(t instanceof f || t instanceof l)) {
                                e(!1);
                                return;
                            }
                            this._send(
                                { code: i.ADD_ALERT, parameters: [t.serialize()], transformer: r.transformBoolean },
                                e
                            );
                        },
                        addUser: function (e, n) {
                            if (!n || !(n instanceof t)) {
                                e(!1);
                                return;
                            }
                            this._send(
                                { code: i.ADD_USER, parameters: [n.serialize()], transformer: r.transformBoolean },
                                e
                            );
                        },
                        enrollFinger: function (e, t, n, s, o) {
                            if (!t || typeof t != 'string') {
                                e(!1);
                                return;
                            }
                            s = s ? s : !0;
                            var u = [t, n, s];
                            o != undefined && o !== null && typeof o == 'string' && u.push(o),
                                this._send(
                                    { code: i.ENROLL_FINGER, parameters: u, transformer: r.transformBoolean },
                                    e
                                );
                        },
                        getAlertReports: function (e, t, n, s) {
                            if (!(t instanceof Date && n instanceof Date) || !s || s.length == 0) {
                                e([]);
                                return;
                            }
                            this._send(
                                {
                                    code: i.ALERT_REPORTS,
                                    transformer: r.transformAlertReports,
                                    parameters: [t.getTime(), n.getTime()],
                                    transformerArgs: [s]
                                },
                                e
                            );
                        },
                        getAlertsList: function (e) {
                            this._send({ code: i.ALERTS_LIST, transformer: r.transformAlerts }, e);
                        },
                        getAuthentications: function (e, t, n) {
                            if (!(t instanceof Date && n instanceof Date)) {
                                e([]);
                                return;
                            }
                            this._send(
                                {
                                    code: i.AUTHENTICATIONS_LIST,
                                    parameters: [t.getTime(), n.getTime()],
                                    transformer: r.transformAuthentications
                                },
                                e
                            );
                        },
                        getDbConfiguration: function (e) {
                            this._send({ code: i.DB_SETTINGS, transformer: r.transformDbConfiguration }, e);
                        },
                        getCurrentTemperature: function (e) {
                            this._send({ code: i.TEMPERATURE_CURRENT }, e);
                        },
                        getImmediateStatus: function (e) {
                            this._send({ code: i.DEVICE_STATUS, transformer: r.transformDeviceStatus }, e);
                        },
                        getInventories: function (e, t, n) {
                            if (!(t instanceof Date && n instanceof Date)) {
                                e([]);
                                return;
                            }
                            this._send(
                                {
                                    code: i.INVENTORIES_LIST,
                                    parameters: [t.getTime(), n.getTime()],
                                    transformer: r.transformInventories
                                },
                                e
                            );
                        },
                        getInventoryById: function (e, t) {
                            if (t < 1) {
                                e(null);
                                return;
                            }
                            this._send(
                                { code: i.INVENTORY_BY_ID, parameters: [t], transformer: r.transformInventory },
                                e
                            );
                        },
                        getLastAlertReport: function (e) {
                            this._send({ code: i.LAST_ALERT, transformer: r.transformAlertReport }, e);
                        },
                        getLastInventory: function (e) {
                            this._send({ code: i.LAST_INVENTORY, transformer: r.transformInventory }, e);
                        },
                        getProbeSettings: function (e) {
                            this._send({ code: i.PROBE_SETTINGS, transformer: r.transformProbeSettings }, e);
                        },
                        getSmtpServer: function (e) {
                            this._send({ code: i.SMTP_SERVER, transformer: r.transformSmtpServer }, e);
                        },
                        getTemperatureMeasures: function (e, t, n) {
                            if (!(t instanceof Date && n instanceof Date) || n.getTime() <= t.getTime()) {
                                e(new Map());
                                return;
                            }
                            this._send(
                                {
                                    code: i.TEMPERATURE_LIST,
                                    parameters: [t.getTime(), n.getTime()],
                                    transformer: r.transformMeasures
                                },
                                e
                            );
                        },
                        getUserByName: function (e, t) {
                            if (!t || /^\s*$/.test(t)) {
                                e(null);
                                return;
                            }
                            this._send({ code: i.USER_BY_NAME, parameters: [t], transformer: r.transformUser }, e);
                        },
                        getUnregisteredUsers: function (e) {
                            this._send({ code: i.USERS_UNREGISTERED }, e);
                        },
                        getUsers: function (e) {
                            this._send({ code: i.USERS_LIST, transformer: r.transformUsers }, e);
                        },
                        removeFingerprint: function (e, t, n) {
                            if (!t || typeof t != 'string') {
                                e(!1);
                                return;
                            }
                            this._send(
                                { code: i.REMOVE_FINGERPRINT, parameters: [t, n], transformer: r.transformBoolean },
                                e
                            );
                        },
                        removeAlert: function (e, t) {
                            if (!t || !(t instanceof f || t instanceof l) || t.getId() === 0) {
                                e(!1);
                                return;
                            }
                            this._send(
                                { code: i.REMOVE_ALERT, parameters: [t.serialize()], transformer: r.transformBoolean },
                                e
                            );
                        },
                        removeUser: function (e, t) {
                            if (!t || typeof t != 'string') {
                                e(!1);
                                return;
                            }
                            this._send({ code: i.REMOVE_USER, parameters: [t], transformer: r.transformBoolean }, e);
                        },
                        requestScan: function () {
                            this._socket.send(i.SCAN);
                        },
                        rewriteUid: function (e, t, n) {
                            if (!t || !n) {
                                e(c.ERROR);
                                return;
                            }
                            this._send(
                                { code: i.REWRITE_UID, parameters: [t, n], transformer: r.transformRewriteUidResult },
                                e
                            );
                        },
                        setDbConfiguration: function (e, t) {
                            if (!t || !(t instanceof h)) {
                                e(!1);
                                return;
                            }
                            this._send(
                                {
                                    code: i.SET_DB_SETTINGS,
                                    parameters: [
                                        t.getHost(),
                                        t.getPort(),
                                        t.getName(),
                                        t.getUser(),
                                        t.getPassword(),
                                        t.getDbms()
                                    ],
                                    transformer: r.transformBoolean
                                },
                                e
                            );
                        },
                        setProbeSettings: function (e, t) {
                            if (!t || !(t instanceof d)) {
                                e(!1);
                                return;
                            }
                            this._send(
                                {
                                    code: i.SET_PROBE_SETTINGS,
                                    parameters: [t.getDelay(), t.getDelta(), t.isEnabled()],
                                    transformer: r.transformBoolean
                                },
                                e
                            );
                        },
                        setSmtpServer: function (e, t) {
                            if (!t || !(t instanceof p)) {
                                e(!1);
                                return;
                            }
                            this._send(
                                {
                                    code: i.SET_SMTP_SERVER,
                                    parameters: [
                                        t.getAddress(),
                                        t.getPort(),
                                        t.getUsername(),
                                        t.getPassword(),
                                        t.isSslEnabled()
                                    ],
                                    transformer: r.transformBoolean
                                },
                                e
                            );
                        },
                        startLightingTagsLed: function (e, t) {
                            if (!t || t.length == 0) {
                                e(!1);
                                return;
                            }
                            this._send({ code: i.START_LIGHTING, parameters: t, transformer: r.transformBoolean }, e);
                        },
                        stopLightingTagsLed: function (e) {
                            this._send({ code: i.STOP_LIGHTING, transformer: r.transformBoolean }, e);
                        },
                        stopScan: function () {
                            this._socket.send(i.STOP_SCAN);
                        },
                        updateAlert: function (e, t) {
                            if (!t || !(t instanceof f || t instanceof l) || t.getId() === 0) {
                                e(!1);
                                return;
                            }
                            this._send(
                                { code: i.UPDATE_ALERT, parameters: [t.serialize()], transformer: r.transformBoolean },
                                e
                            );
                        },
                        updateBadgeNumber: function (e, t, n) {
                            if (!t || typeof t != 'string' || typeof n != 'string') {
                                e(!1);
                                return;
                            }
                            this._send(
                                { code: i.UPDATE_BADGE, parameters: [t, n], transformer: r.transformBoolean },
                                e
                            );
                        },
                        updatePermission: function (e, t, s) {
                            if (!t || typeof t != 'string' || !s) {
                                e(!1);
                                return;
                            }
                            this._send(
                                {
                                    code: i.UPDATE_PERMISSION,
                                    parameters: [t, n.getPropertyByValue(s)],
                                    transformer: r.transformBoolean
                                },
                                e
                            );
                        },
                        _initializeSocket: function () {
                            if (!window.WebSocket) throw 'Your browser does not support WebSocket.';
                            var e = this,
                                t = !0;
                            (this._socket = new WebSocket('wss://' + this._ipAddress + ':' + this._tcpPort)),
                                (this._socket.onmessage = function (t) {
                                    var n = t.data;
                                    n.charCodeAt(n.length - 1) === 4 && (n = n.substr(0, n.length - 1));
                                    var r = n.split(String.fromCharCode(28));
                                    n.lastIndexOf('event_', 0) === 0 ? e._handleEvent(r) : e._handleResponse(r);
                                }),
                                (this._socket.onopen = function () {
                                    (t = !1), e._initializeDevice();
                                }),
                                (this._socket.onclose = function (n) {
                                    e._updateStatus(o.NOT_READY);
                                    if (n.code === 1006) {
                                        if (t) {
                                            e._dispatchEvent('connectionfailed', null);
                                            return;
                                        }
                                        e._dispatchEvent('connectionaborted', null);
                                        return;
                                    }
                                    e._dispatchEvent('disconnected', null);
                                });
                        },
                        _handleEvent: function (e) {
                            var t = e[0],
                                n = t.replace('event_', '').split('_').join('');
                            switch (e[0]) {
                                case s.ALERT:
                                    if (e.length < 2) return;
                                    this._dispatchEvent(n, [r.transformAlert(e[1]), e[2] || '']);
                                    break;
                                case s.AUTHENTICATION_SUCCESS:
                                case s.AUTHENTICATION_FAILURE:
                                    if (e.length < 4) return;
                                    var i = a[e[2]] || a.UNDEFINED;
                                    this._dispatchEvent(n, [r.transformUser(e[1]), i, r.transformBoolean(e[3])]);
                                    break;
                                case s.LIGHTING_STARTED:
                                case 'event_correlation_series':
                                    var o = [];
                                    e.length > 1 && (o = e.slice(1)), this._dispatchEvent(n, [o]);
                                    break;
                                case s.DOOR_CLOSED:
                                case s.DOOR_OPENED:
                                case s.DOOR_OPEN_DELAY:
                                case s.LIGHTING_STOPPED:
                                case s.SCAN_CANCELLED_BY_DOOR:
                                case s.SCAN_CANCELLED_BY_HOST:
                                case s.SCAN_COMPLETED:
                                case s.SCAN_FAILED:
                                case s.SCAN_STARTED:
                                case 'event_update_started':
                                    this._dispatchEvent(n, null);
                                    break;
                                case s.BADGE_SCANNED:
                                case s.ENROLLMENT_SAMPLE:
                                case s.TAG_ADDED:
                                case s.TEMPERATURE_MEASURE:
                                    if (e.length < 2) return;
                                    this._dispatchEvent(n, [e[1]]);
                                    break;
                                case s.FINGER_TOUCHED:
                                case 'event_update_ended':
                                    if (e.length < 2) return;
                                    this._dispatchEvent(n, [e[1] === 'true']);
                                    break;
                                case 'event_update_progress':
                                case s.FLASHING_PROGRESS:
                                    if (e.length < 3) return;
                                    this._dispatchEvent(n, [e[1], e[2]]);
                                    break;
                                case s.STATUS_CHANGED:
                                    if (e.length < 2) return;
                                    this._updateStatus(e[1]);
                                    break;
                                default:
                                    return;
                            }
                        },
                        on: function (e, t) {
                            (this._events[e] = this._events[e] || []), this._events[e].push(t);
                        },
                        off: function (e, t) {
                            if (this._events[e] == undefined) return;
                            var n = this._events[e];
                            for (var r = n.length; r--; ) n[r] === t && n.splice(r, 1);
                        },
                        one: function (e, t) {
                            (t._sc_only_once = !0), this.on(e, t);
                        },
                        _dispatchEvent: function (e, t) {
                            if (this._events[e] == undefined) return;
                            var n = this._events[e],
                                r = [];
                            n.forEach(function (e) {
                                e.apply(null, t), e._sc_only_once && r.push(e);
                            });
                            var i = this;
                            r.forEach(function (t) {
                                i.off(e, t);
                            });
                        },
                        _handleResponse: function (e) {
                            if (!this._responseCallbacks.has(e[0])) throw 'No callback set for ResponseCode: ' + e[0];
                            var t = this._responseCallbacks.get(e[0]).shift();
                            if (t != undefined && t.callback != undefined) {
                                var n = e.length > 1 ? e.slice(1, e.length) : [];
                                t.transformer !== undefined && (n = t.transformer.call(this, n, t.transformerArgs)),
                                    t.callback(n),
                                    t.postCallback !== undefined && t.postCallback.call(this, n);
                            }
                        },
                        _send: function (e, t) {
                            var n = {
                                callback: t,
                                transformer: e.transformer,
                                transformerArgs: e.transformerArgs,
                                postCallback: e.postCallback
                            };
                            this._responseCallbacks.has(e.code)
                                ? this._responseCallbacks.get(e.code).push(n)
                                : this._responseCallbacks.set(e.code, [n]);
                            var r = [e.code];
                            if (e.parameters !== undefined)
                                for (var i = 0; i < e.parameters.length; ++i) r.push(e.parameters[i]);
                            this._socket.send(r.join(String.fromCharCode(28)));
                        },
                        _updateStatus: function (e) {
                            (this._status = o[e] || e), this._dispatchEvent('statuschanged', [this._status]);
                        },
                        getIpAddress: function () {
                            return this._ipAddress;
                        },
                        isInitialized: function () {
                            return this._serialNumber !== null;
                        },
                        getSerialNumber: function () {
                            return this._serialNumber;
                        },
                        getDeviceType: function () {
                            return this._deviceType;
                        },
                        getHardwareVersion: function () {
                            return this._hardwareVersion;
                        },
                        getSoftwareVersion: function () {
                            return this._softwareVersion;
                        },
                        getStatus: function () {
                            return this._status;
                        },
                        isConnected: function () {
                            return this._socket != null && this._socket.readyState == WebSocket.OPEN;
                        }
                    }),
                    v
                );
            }
        ),
        n(
            'SpacecodeApiFactory',
            [
                'Spacecode/Alert/Alert',
                'Spacecode/Alert/AlertReport',
                'Spacecode/Alert/AlertTemperature',
                'Spacecode/Alert/AlertType',
                'Spacecode/Alert/SmtpServer',
                'Spacecode/Device/DbConfiguration',
                'Spacecode/Device/Device',
                'Spacecode/Device/DeviceStatus',
                'Spacecode/Device/DeviceType',
                'Spacecode/Device/RewriteUidResult',
                'Spacecode/Inventory/AccessType',
                'Spacecode/Inventory/Inventory',
                'Spacecode/User/Authentication',
                'Spacecode/User/FingerIndex',
                'Spacecode/User/GrantType',
                'Spacecode/User/User',
                'Spacecode/Temperature/ProbeSettings'
            ],
            function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m) {
                return {
                    Alert: e,
                    AlertReport: t,
                    AlertTemperature: n,
                    AlertType: r,
                    SmtpServer: i,
                    DbConfiguration: s,
                    Device: o,
                    DeviceStatus: u,
                    DeviceType: a,
                    RewriteUidResult: f,
                    Inventory: c,
                    AccessType: l,
                    Authentication: h,
                    FingerIndex: p,
                    GrantType: d,
                    User: v,
                    ProbeSettings: m
                };
            }
        ),
        t('SpacecodeApiFactory')
    );
});
