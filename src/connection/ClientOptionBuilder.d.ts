import {Connection} from './Connection';
import {Options} from 'node-xmpp-client';
/**
 * Created by marcneumann on 19.02.17.
 */

export declare class ClientOptionBuilder {
    constructor(conBuilder: (opt: Options) => Connection);

    withCredentials(jid: string, password: string): ClientOptionBuilder;

    useWebsocket(url: string): ClientOptionBuilder;

    useBosh(url: string): ClientOptionBuilder;

    doReconnect(): ClientOptionBuilder;

    setAutoConnect(v: boolean): ClientOptionBuilder;

    setRegister(v: boolean): ClientOptionBuilder;

    useLegacySSL(v: boolean): ClientOptionBuilder;

    actAs(v: string): ClientOptionBuilder;

    disallowTLS(v: boolean): ClientOptionBuilder;

    setPreferredSASLMethod(v: string): ClientOptionBuilder;

    build(): Connection;
}