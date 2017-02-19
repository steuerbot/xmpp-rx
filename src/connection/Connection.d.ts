import {EventEmitter} from 'events';
import {Component} from 'node-xmpp-component';
import {Client} from 'node-xmpp-client';
import {SimpleStanza} from './SimpleStanza';
import {Observable} from 'rxjs';
import {Stanza, Element} from 'node-xmpp-core';

/**
 * Represents a XmppConnection. Wraps the base node-xmpp-client library.
 */
export declare class Connection {
    public static readonly STATUS_ONLINE: string;
    public static readonly STATUS_OFFLINE: string;
    public static readonly STATUS_CONNECT: string;
    public static readonly STATUS_RECONNECT: string;
    public static readonly STATUS_DISCONNECT: string;
    public static readonly STATUS_ERROR: string;

    public static readonly TYPE_STANZA: string;
    public static readonly TYPE_MESSAGE: string;

    public static readonly MESSAGE_CHAT: string;
    public static readonly MESSAGE_GROUPCHAT: string;

    static createComponentConnection(component: Component): Connection;

    static createClientConnection(client: Client): Connection;

    constructor(client: XmppClient);

    /**
     * Connect to the xmpp server.
     *
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    public connect(): Observable<string>;

    public disconnect();

    public sendPresence(message?: string);

    public sendMessage(to: string, body: string);

    public enableCarbons(): void;

    public disableCarbons(): void;

    public getStatusStream(type?: string): Observable<any>;

    public getRawStanzaStream(filter?: MessageFilter): Observable<Stanza>;

    public getSimpleStanzaStream(filter?: MessageFilter): Observable<SimpleStanza>;
}

declare interface XmppClient extends EventEmitter {
    send(stanza: Element): void;

    // component methods
    onStreamStart?(streamAttrs: any): void;
    onStanza?(stanza: Element): void;
    end?(): void;

    // client methods
    connect?(): void;
    disconnect?(): void;
}

export declare interface MessageFilter {
    type?: string;
    messageType?: string;
    forwarded?: boolean;
    composing?: boolean;
    paused?: boolean;
}