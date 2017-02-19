import {EventEmitter} from 'events';
/**
 * Created by marcneumann on 18.02.17.
 */
export declare class Connection {
    static createConnection(component?: boolean): Connection;

    constructor(client: XmppClient);
}

export declare interface XmppClient extends EventEmitter {
    send(stanza: Element): void;

    // component methods
    onStreamStart?(streamAttrs: any): void;
    onStanza?(stanza: Element): void;
    end?(): void;

    // client methods
    connect?(): void;
    disconnect?(): void;
}