"use strict";
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/first');
var node_xmpp_core_1 = require('node-xmpp-core');
var SimpleStanza_1 = require('./SimpleStanza');
var util_1 = require('util');
/**
 * Represents a XmppConnection. Wraps the base node-xmpp-client library.
 */
var Connection = (function () {
    function Connection(client) {
        this.client = client;
        this.rawStanzaSubject = new Subject_1.Subject();
        this.statusSubject = new Subject_1.Subject();
        this.attachListeners();
    }
    Connection.createComponentConnection = function (component) {
        var con = new Connection(component);
        con.connectionType = 'component';
        return con;
    };
    Connection.createClientConnection = function (client) {
        var con = new Connection(client);
        con.connectionType = 'client';
        return con;
    };
    ;
    /**
     * Connect to the xmpp server.
     *
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    Connection.prototype.connect = function () {
        if (this.client.connect) {
            this.client.connect();
        }
        return this.statusSubject.filter(function (r) { return r === Connection.STATUS_ONLINE; }).first();
    };
    Connection.prototype.disconnect = function () {
        if (this.connectionType === 'client') {
            this.client.disconnect();
        }
        else {
            this.client.end();
        }
    };
    Connection.prototype.sendPresence = function (message) {
        var stanza = node_xmpp_core_1.createStanza('presence', {})
            .c('show').t('chat').up()
            .c('status').t(message);
        this.client.send(stanza);
    };
    /**
     * Send a direct message/stanza.
     *
     * @param to jid of the recipient
     * @param body the message body
     */
    Connection.prototype.sendMessage = function (to, body) {
        var message = new node_xmpp_core_1.Message();
        message.c('body').t(body);
        message.to = to;
        message.type = 'chat';
        this.client.send(message);
    };
    Connection.prototype.enableCarbons = function () {
        var iq = new node_xmpp_core_1.IQ({ id: 'enable1', type: 'set' }).c('enable', { xmlns: 'urn:xmpp:carbons:2' });
        this.client.send(iq);
    };
    Connection.prototype.disableCarbons = function () {
        var iq = new node_xmpp_core_1.IQ({ id: 'disable1', type: 'set' }).c('disable', { xmlns: 'urn:xmpp:carbons:2' });
        this.client.send(iq);
    };
    Connection.prototype.getStatusStream = function (type) {
        return this.statusSubject.asObservable().filter(function (r) { return !type || type === r; });
    };
    Connection.prototype.getRawStanzaStream = function (filter) {
        return this.rawStanzaSubject
            .filter(function (r) { return !filter || !filter.type || r.is(filter.type); })
            .filter(function (r) { return !filter || !filter.messageType || r.type === filter.messageType; });
    };
    Connection.prototype.getSimpleStanzaStream = function (filter) {
        return this.getRawStanzaStream(filter).map(toSimple)
            .filter(function (r) { return !r.composing && !r.paused; });
    };
    Connection.prototype.getSimpleComposingStream = function () {
        return this.getRawStanzaStream().map(toSimple).filter(function (r) { return r.composing; });
    };
    Connection.prototype.getSimplePausedStream = function () {
        return this.getRawStanzaStream().map(toSimple).filter(function (r) { return r.paused; });
    };
    /**
     * Attaching all available listeners.
     */
    Connection.prototype.attachListeners = function () {
        var _this = this;
        this.client.on(Connection.TYPE_STANZA, function (r) { return _this.rawStanzaSubject.next(r); });
        this.client.on(Connection.STATUS_ONLINE, function () { return _this.statusSubject.next(Connection.STATUS_ONLINE); });
        this.client.on(Connection.STATUS_OFFLINE, function () { return _this.statusSubject.next(Connection.STATUS_OFFLINE); });
        this.client.on(Connection.STATUS_CONNECT, function () { return _this.statusSubject.next(Connection.STATUS_CONNECT); });
        this.client.on(Connection.STATUS_RECONNECT, function () { return _this.statusSubject.next(Connection.STATUS_RECONNECT); });
        this.client.on(Connection.STATUS_DISCONNECT, function () { return _this.statusSubject.next(Connection.STATUS_DISCONNECT); });
        // this.client.on(Connection.STATUS_ERROR, (r) => this.statusSubject.next(Connection.STATUS_ERROR));
        this.client.on(Connection.STATUS_ERROR, function (r, t) { return console.log(r, t); });
    };
    Connection.STATUS_ONLINE = 'online';
    Connection.STATUS_OFFLINE = 'offline';
    Connection.STATUS_CONNECT = 'connect';
    Connection.STATUS_RECONNECT = 'reconnect';
    Connection.STATUS_DISCONNECT = 'disconnect';
    Connection.STATUS_ERROR = 'error';
    Connection.TYPE_STANZA = 'stanza';
    Connection.TYPE_MESSAGE = 'message';
    Connection.MESSAGE_CHAT = 'chat';
    Connection.MESSAGE_GROUPCHAT = 'groupchat';
    return Connection;
}());
exports.Connection = Connection;
var filterType = function (r, t) { return util_1.isNullOrUndefined(t) || r.is(t); };
var filterMessageType = function (r, t) { return util_1.isNullOrUndefined(t) || r.type === t; };
var toSimple = function (r) { return new SimpleStanza_1.SimpleStanza(r); };
var filterForwarded = function (r, f) { return util_1.isNullOrUndefined(f) || r.forwarded === f; };
var filterComposing = function (r, f) { return util_1.isNullOrUndefined(f) || r.composing === f; };
var filterPaused = function (r, f) { return util_1.isNullOrUndefined(f) || r.paused === f; };
//# sourceMappingURL=Connection.js.map