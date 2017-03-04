import {Stanza} from '@steuerbot/types/node-xmpp-core';

export declare class SimpleStanza {
    from: string;
    to: string;
    id: string;
    type: string;
    body: string;
    forwarded: boolean;
    composing: boolean;
    paused: boolean;

    constructor(rawStanza: Stanza);

    is(name: string, xmlns?: any): boolean;
}