import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {JID, MessageType, Message} from '../../models';
import {Element, Stanza, createStanza} from 'node-xmpp-core';
import {EventEmitter} from 'events';
import {Component} from 'node-xmpp-component';
import {Client} from 'node-xmpp-client';

export interface XmppClient extends EventEmitter {
    send(stanza: Element): void;

    // component methods
    onStreamStart?(streamAttrs: any): void;
    onStanza?(stanza: Element): void;
    end?(): void;

    // client methods
    connect?(): void;
    disconnect?(): void;
}

/**
 * Represents a XmppConnection. Wraps the base node-xmpp-client library.
 */
export class Connection {
    private connectionType: 'component' | 'client';
    private rawMessageSubject: Subject<Stanza> = new Subject();

    static createComponentConnection(component: Component) {
        let con = new Connection(component);
        con.setConnetionType('component');
        con.connect();
        return con;
    }

    static createClientConnection(client: Client) {
        let con = new Connection(client);
        con.setConnetionType('client');
        return con;
    }

    private constructor(private client: XmppClient) {
    };

    /**
     * Connect to the xmpp server.
     *
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    connect(): Observable<string> {

        this.client.on('stanza', (r, v) => {
            this.rawMessageSubject.next(r)
        });

        if (this.client.connect) {
            this.client.connect();
        }
        
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
        let stanza = createStanza('presence', {})
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
        let reply = createStanza('message', {
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

    private setConnetionType(type: 'client' | 'component'): void {
        this.connectionType = type;
    }
}

let isChatMessage = (r: Stanza, t: MessageType) => {
    return r.is('message', '') && (!t || r.type === t);
};

let toObject = (r: Stanza) => {
    // console.log(r);
};