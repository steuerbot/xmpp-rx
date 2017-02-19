import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import {Element, Stanza, createStanza} from 'node-xmpp-core';
import {EventEmitter} from 'events';
import {Component} from 'node-xmpp-component';
import {Client} from 'node-xmpp-client';
import {IQ, Message} from '@xmpp/xml';
import {SimpleStanza} from './SimpleStanza';
import {isNullOrUndefined} from 'util';

export interface MessageFilter {
    type?: string;
    messageType?: string;
    forwarded?: boolean;
    composing?: boolean;
    paused?: boolean;
}

interface XmppClient extends EventEmitter {
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
    public static readonly STATUS_ONLINE: string = 'online';
    public static readonly STATUS_OFFLINE: string = 'offline';
    public static readonly STATUS_CONNECT: string = 'connect';
    public static readonly STATUS_RECONNECT: string = 'reconnect';
    public static readonly STATUS_DISCONNECT: string = 'disconnect';
    public static readonly STATUS_ERROR: string = 'error';

    public static readonly TYPE_STANZA: string = 'stanza';
    public static readonly TYPE_MESSAGE: string = 'message';

    public static readonly MESSAGE_CHAT: string = 'chat';
    public static readonly MESSAGE_GROUPCHAT: string = 'groupchat';

    private connectionType: 'component' | 'client';
    private rawStanzaSubject: Subject<Stanza> = new Subject();
    private statusSubject: Subject<string> = new Subject();

    static createComponentConnection(component: Component): Connection {
        let con = new Connection(component);
        con.connectionType = 'component';
        return con;
    }

    static createClientConnection(client: Client): Connection {
        let con = new Connection(client);
        con.connectionType = 'client';
        return con;
    }

    constructor(private client: XmppClient) {
        this.attachListeners();
    };

    /**
     * Connect to the xmpp server.
     *
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    public connect(): Observable<string> {
        if (this.client.connect) {
            this.client.connect();
        }
        return this.statusSubject.filter(r => r === Connection.STATUS_ONLINE).first();
    }

    public disconnect() {
        if (this.connectionType === 'client') {
            this.client.disconnect();
        } else {
            this.client.end();
        }
    }

    public sendPresence(message?: string) {
        let stanza = createStanza('presence', {})
            .c('show').t('chat').up()
            .c('status').t(message);
        this.client.send(stanza);
    }

    /**
     * Send a direct message/stanza.
     *
     * @param to jid of the recipient
     * @param body the message body
     */
    public sendMessage(to: string, body: string) {
        let message = new Message();
        message.c('body').t(body);
        message.to = to;
        message.type = 'chat';
        this.client.send(message);
    }

    public enableCarbons(): void {
        let iq = new IQ({id: 'enable1', type: 'set'}).c('enable', {xmlns: 'urn:xmpp:carbons:2'});
        this.client.send(iq);
    }

    public disableCarbons(): void {
        let iq = new IQ({id: 'disable1', type: 'set'}).c('disable', {xmlns: 'urn:xmpp:carbons:2'});
        this.client.send(iq);
    }

    public getStatusStream(type?: string): Observable<any> {
        return this.statusSubject.asObservable().filter(r => !type || type === r);
    }

    public getRawStanzaStream(filter?: MessageFilter): Observable<Stanza> {
        return this.rawStanzaSubject
            .filter(r => !filter || !filter.type || r.is(filter.type))
            .filter(r => !filter || !filter.messageType || r.type === filter.messageType);
    }

    public getSimpleStanzaStream(filter?: MessageFilter): Observable<SimpleStanza> {
        return this.getRawStanzaStream(filter).map(toSimple)
            .filter(r => !r.composing && !r.paused);
    }

    public getSimpleComposingStream(): Observable<SimpleStanza> {
        return this.getRawStanzaStream().map(toSimple).filter(r => r.composing);
    }

    public getSimplePausedStream(): Observable<SimpleStanza> {
        return this.getRawStanzaStream().map(toSimple).filter(r => r.paused);
    }

    /**
     * Attaching all available listeners.
     */
    private attachListeners(): void {
        this.client.on(Connection.TYPE_STANZA, (r) => this.rawStanzaSubject.next(r));

        this.client.on(Connection.STATUS_ONLINE, () => this.statusSubject.next(Connection.STATUS_ONLINE));
        this.client.on(Connection.STATUS_OFFLINE, () => this.statusSubject.next(Connection.STATUS_OFFLINE));
        this.client.on(Connection.STATUS_CONNECT, () => this.statusSubject.next(Connection.STATUS_CONNECT));
        this.client.on(Connection.STATUS_RECONNECT, () => this.statusSubject.next(Connection.STATUS_RECONNECT));
        this.client.on(Connection.STATUS_DISCONNECT, () => this.statusSubject.next(Connection.STATUS_DISCONNECT));
        // this.client.on(Connection.STATUS_ERROR, (r) => this.statusSubject.next(Connection.STATUS_ERROR));
        this.client.on(Connection.STATUS_ERROR, (r, t) => console.log(r, t));
    }
}

let filterType = (r: Stanza, t: string) => isNullOrUndefined(t) || r.is(t);
let filterMessageType = (r: Stanza, t: string) => isNullOrUndefined(t) || r.type === t;

let toSimple = (r: Stanza) => new SimpleStanza(r);
let filterForwarded = (r: SimpleStanza, f: boolean) => isNullOrUndefined(f) || r.forwarded === f;
let filterComposing = (r: SimpleStanza, f: boolean) => isNullOrUndefined(f) || r.composing === f;
let filterPaused = (r: SimpleStanza, f: boolean) => isNullOrUndefined(f) || r.paused === f;

