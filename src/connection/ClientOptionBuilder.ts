import {Connection} from './Connection';
import {Options} from 'node-xmpp-client';

/**
 * Created by marcneumann on 18.02.17.
 */
export class ClientOptionBuilder {
    private options: Options;

    constructor(private conBuilder: (opt: Options) => Connection) {
    }

    withCredentials(jid: string, password: string): ClientOptionBuilder {
        this.options = {jid: jid, password: password};
        return this;
    }

    useWebsocket(url: string): ClientOptionBuilder {
        this.options.websocket = {url: url};
        return this;
    }

    useBosh(url: string): ClientOptionBuilder {
        this.options.bosh = {url: url};
        return this;
    }

    doReconnect(): ClientOptionBuilder {
        this.options.reconnect = true;
        return this;
    }

    setAutoConnect(v: boolean): ClientOptionBuilder {
        this.options.autostart = v;
        return this;
    }

    setRegister(v: boolean): ClientOptionBuilder {
        this.options.register = v;
        return this;
    }

    useLegacySSL(v: boolean): ClientOptionBuilder {
        this.options.legacySSL = v;
        return this;
    }

    actAs(v: string): ClientOptionBuilder {
        this.options.actAs = v;
        return this;
    }

    disallowTLS(v: boolean): ClientOptionBuilder {
        this.options.disallowTLS = v;
        return this;
    }

    setPreferredSASLMethod(v: string): ClientOptionBuilder {
        this.options.preferred = v;
        return this;
    }

    build(): Connection {
        return this.conBuilder(this.options);
    }
}