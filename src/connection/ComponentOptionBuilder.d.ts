import {Connection} from './Connection';
import {Options} from 'node-xmpp-component';
/**
 * Created by marcneumann on 19.02.17.
 */
export declare class ComponentOptionBuilder {
    constructor(conBuilder: (opt: Options) => Connection);

    withCredentials(jid: string, password: string, host: string, port: number): ComponentOptionBuilder;

    doReconnect(): ComponentOptionBuilder;

    build(): Connection;
}