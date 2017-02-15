import {Client} from 'node-xmpp-client';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {JID} from './jid';

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

    sendMessage(to: string, jid: string, body: string) {
        let reply = new Client.Stanza('message', {
            to: to,
            from: jid,
            type: 'chat'
        });
        reply.c('body').t(body);
        this.client.send(reply);
    }

    getRawMessages(): Observable<any> {
        return this.rawMessageSubject.asObservable();
    }

    getChatMessageStream(): Observable<any> {
        return this.rawMessageSubject.asObservable();
    }
}

const parseStanza = (r: any) => r.is('message') && r.attrs.type === 'chat';