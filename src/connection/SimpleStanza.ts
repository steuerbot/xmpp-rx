import {Stanza} from 'node-xmpp-core';
/**
 * Created by marcneumann on 19.02.17.
 */

export class SimpleStanza {
    private _forwarded: boolean;
    private _body: string;
    private _componsing: boolean;
    private _paused: boolean;

    constructor(private rawStanza: Stanza) {
        if (rawStanza.is('message')) {
            this.parseMessage();
        }
    }

    get from(): string {
        return this.rawStanza.from;
    }

    get to(): string {
        return this.rawStanza.to;
    }

    get id(): string {
        return this.rawStanza.id;
    }

    get type(): string {
        return this.rawStanza.type;
    }

    get body(): string {
        return this._body;
    }

    get forwarded(): boolean {
        return this._forwarded;
    }

    get composing(): boolean {
        return this._componsing;
    }

    get paused(): boolean {
        return this._paused;
    }

    is(name: string, xmlns?: any): boolean {
        return this.rawStanza.is(name, xmlns);
    }

    private parseMessage() {
        let s = this.rawStanza.getChild('sent', 'urn:xmpp:carbons:2');
        let r = this.rawStanza.getChild('received', 'urn:xmpp:carbons:2');
        let f = s ? s : r;
        this._forwarded = !!f;

        if (f && f.getChild('forwarded') && f.getChild('forwarded').getChild('message')) {
            this.rawStanza = f.getChild('forwarded').getChild('message') as Stanza;
        }

        this._body = this.rawStanza.getChildText('body');
        this._componsing = !!this.rawStanza.getChild('composing');
        this._paused = !!this.rawStanza.getChild('paused');
    }
}