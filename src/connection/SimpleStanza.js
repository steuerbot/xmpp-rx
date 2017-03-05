"use strict";
/**
 * Created by marcneumann on 19.02.17.
 */
var SimpleStanza = (function () {
    function SimpleStanza(rawStanza) {
        this.rawStanza = rawStanza;
        if (rawStanza.is('message')) {
            this.parseMessage();
        }
    }
    Object.defineProperty(SimpleStanza.prototype, "from", {
        get: function () {
            return this.rawStanza.from;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "to", {
        get: function () {
            return this.rawStanza.to;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "id", {
        get: function () {
            return this.rawStanza.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "type", {
        get: function () {
            return this.rawStanza.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "body", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "forwarded", {
        get: function () {
            return this._forwarded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "composing", {
        get: function () {
            return this._componsing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleStanza.prototype, "paused", {
        get: function () {
            return this._paused;
        },
        enumerable: true,
        configurable: true
    });
    SimpleStanza.prototype.is = function (name, xmlns) {
        return this.rawStanza.is(name, xmlns);
    };
    SimpleStanza.prototype.parseMessage = function () {
        var s = this.rawStanza.getChild('sent', 'urn:xmpp:carbons:2');
        var r = this.rawStanza.getChild('received', 'urn:xmpp:carbons:2');
        var f = s ? s : r;
        this._forwarded = !!f;
        var m = this.rawStanza;
        if (f && f.getChild('forwarded') && f.getChild('forwarded').getChild('message')) {
            m = f.getChild('forwarded').getChild('message');
            this.rawStanza.from = m.getAttr('from');
        }
        this._body = m.getChildText('body', undefined);
        this._componsing = !!m.getChild('composing');
        this._paused = !!m.getChild('paused');
    };
    return SimpleStanza;
}());
exports.SimpleStanza = SimpleStanza;
//# sourceMappingURL=SimpleStanza.js.map