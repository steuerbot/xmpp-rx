/**
 * Created by marcneumann on 14.02.17.
 */
import {Subject, Observable} from 'rxjs';

declare function require(path: string): any;
let Client = require('node-xmpp-client');

interface XmppClient {
    connect(): void;
    disconnect(): void;
    on(event: string, c: (r: any) => void): void;
    send(stanza: any): void;
}

export class Connection {
    private client: XmppClient;
    private rawMessageSubject: Subject<any> = new Subject();

    constructor(private domain: string, private resource?: string) {
    }

    connect(username: string, password: string): Observable<any> {
        this.client = new Client({
            jid: createJid(username, this.domain),
            password: password,
            resource: this.resource
        });

        this.client.on('stanza', r => this.rawMessageSubject.next(r));

        this.client.connect();

        return Observable.create(obs => {

            this.client.on('online', () => {
                obs.next('online');
                obs.complete();
                this.attachListeners();
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


    private attachListeners() {
    }
}

const createJid = (username: string, domain: string, resource?: string) =>
username + '@' + domain;

const parseStanza = (r: any) => r.is('message') && r.attrs.type === 'chat';
// }
