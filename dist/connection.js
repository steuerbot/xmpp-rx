"use strict";
var node_xmpp_client_1 = require("node-xmpp-client");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
/**
 * Represents a XmppConnection. Wraps the base node-xmpp-client library.
 */
var Connection = (function () {
    function Connection() {
        this.rawMessageSubject = new Subject_1.Subject();
    }
    /**
     * Connect to the xmpp server.
     *
     * @param jid
     * @param password
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    Connection.prototype.connect = function (jid, password) {
        var _this = this;
        this.client = new node_xmpp_client_1.Client({
            jid: jid.toString(),
            password: password
        });
        this.client.on('stanza', function (r, v) {
            _this.rawMessageSubject.next(r);
        });
        this.client.connect();
        return Observable_1.Observable.create(function (obs) {
            _this.client.on('online', function () {
                obs.next('online');
                obs.complete();
            });
        });
    };
    Connection.prototype.disconnect = function () {
        this.client.disconnect();
    };
    Connection.prototype.sendPresence = function (message) {
        var stanza = new node_xmpp_client_1.Client.Stanza('presence', {})
            .c('show').t('chat').up()
            .c('status').t(message);
        this.client.send(stanza);
    };
    Connection.prototype.sendMessage = function (to, jid, body) {
        var reply = new node_xmpp_client_1.Client.Stanza('message', {
            to: to,
            from: jid,
            type: 'chat'
        });
        reply.c('body').t(body);
        this.client.send(reply);
    };
    Connection.prototype.getRawMessages = function () {
        return this.rawMessageSubject.asObservable();
    };
    Connection.prototype.getChatMessageStream = function () {
        return this.rawMessageSubject.asObservable();
    };
    return Connection;
}());
exports.Connection = Connection;
var parseStanza = function (r) { return r.is('message') && r.attrs.type === 'chat'; };
//# sourceMappingURL=connection.js.map