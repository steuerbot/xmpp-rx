"use strict";
const node_xmpp_client_1 = require("node-xmpp-client");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
const models_1 = require("./models");
/**
 * Represents a XmppConnection. Wraps the base node-xmpp-client library.
 */
class Connection {
    constructor() {
        this.rawMessageSubject = new Subject_1.Subject();
    }
    /**
     * Connect to the xmpp server.
     *
     * @param jid
     * @param password
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    connect(jid, password) {
        this.client = new node_xmpp_client_1.Client({
            jid: jid.toString(),
            password: password
        });
        this.client.on('stanza', (r, v) => {
            this.rawMessageSubject.next(r);
        });
        this.client.connect();
        return Observable_1.Observable.create(obs => {
            this.client.on('online', () => {
                obs.next('online');
                obs.complete();
            });
        });
    }
    disconnect() {
        this.client.disconnect();
    }
    sendPresence(message) {
        let stanza = new node_xmpp_client_1.Client.Stanza('presence', {})
            .c('show').t('chat').up()
            .c('status').t(message);
        this.client.send(stanza);
    }
    /**
     * Send a direct message/stanza.
     *
     * @param to jid of the recipient
     * @param from jid of the sender
     * @param body the message body
     * @param messageType (optional) default is 'chat'
     */
    sendMessage(to, from, body, messageType) {
        let type = messageType ? messageType : models_1.Message.chat;
        let reply = new node_xmpp_client_1.Client.Stanza('message', {
            to: to.toString(),
            from: from.toString(),
            type: models_1.Message.chat
        });
        reply.c('body').t(body);
        this.client.send(reply);
    }
    getRawMessages() {
        return this.rawMessageSubject.map(toObject);
    }
    getChatMessageStream(messageType) {
        return this.rawMessageSubject.filter(r => isChatMessage(r, messageType)).map(toObject);
    }
}
exports.Connection = Connection;
let isChatMessage = (r, t) => {
    return r.is('message', '') && (!t || r.type === t);
};
let toObject = (r) => {
    // console.log(r);
};
//# sourceMappingURL=connection.js.map