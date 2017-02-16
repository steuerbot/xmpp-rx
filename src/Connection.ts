import {Client, Stanza} from 'node-xmpp-client';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {JID, MessageType, Message} from './models';

/**
 * Represents a XmppConnection. Wraps the base node-xmpp-client library.
 */
export class Connection {
    private client: Client;
    private rawMessageSubject: Subject<any> = new Subject();

    /**
     * Connect to the xmpp server.
     *
     * @param jid
     * @param password
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    connect(jid: JID, password: string): Observable<string> {
        this.client = new Client({
            jid: jid.toString(),
            password: password
        });

        this.client.on('stanza', (r, v) => {
            this.rawMessageSubject.next(r)
        });

        this.client.connect();

        return Observable.create(obs => {
            this.client.on('online', () => {
                obs.next('online');
                obs.complete();
            });
        });
    }

    disconnect() {
        this.client.disconnect();
    }

    sendPresence(message?: string) {
        let stanza = new Client.Stanza('presence', {})
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
    sendMessage(to: JID, from: JID, body: string, messageType?: MessageType) {
        let type = messageType ? messageType : Message.chat;
        let reply = new Client.Stanza('message', {
            to: to.toString(),
            from: from.toString(),
            type: Message.chat
        });
        reply.c('body').t(body);
        this.client.send(reply);
    }

    getRawMessages(): Observable<any> {
        return this.rawMessageSubject.map(toObject);
    }

    getChatMessageStream(messageType?: MessageType): Observable<any> {
        return this.rawMessageSubject.filter(r => isChatMessage(r, messageType)).map(toObject);
    }
}

let isChatMessage = (r: Stanza, t: MessageType) => {
    return r.is('message', '') && (!t || r.type === t);
};

let toObject = (r: Stanza) => {
    // console.log(r);
};