import {JID, MessageType} from './models';
import {Observable} from 'rxjs';

export declare class Connection {
    /**
     * Connect to the xmpp server.
     *
     * @param jid
     * @param password
     * @returns {Observable<string>} Observable which returns 'online' if the connection is successfully established.
     */
    connect(jid: JID, password: string): Observable<string>;

    disconnect(): void;

    sendPresence(message?: string): void;

    /**
     * Send a direct message/stanza.
     *
     * @param to jid of the recipient
     * @param from jid of the sender
     * @param body the message body
     * @param messageType (optional) default is 'chat'
     */
    sendMessage(to: JID, from: JID, body: string, messageType?: MessageType): void;

    getRawMessages(): Observable<any>;

    getChatMessageStream(messageType?: MessageType): Observable<any>;
}
