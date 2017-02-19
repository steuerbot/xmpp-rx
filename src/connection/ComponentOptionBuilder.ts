import {Options} from 'node-xmpp-component';
import {Connection} from './Connection';
/**
 * Created by marcneumann on 18.02.17.
 */

export class ComponentOptionBuilder {
    private options: Options;

    constructor(private conBuilder: (opt: Options) => Connection) {
    }

    withCredentials(jid: string, password: string, host: string, port: number): ComponentOptionBuilder {
        this.options = {jid: jid, password: password, host: host, port: port};
        return this;
    }

    doReconnect(): ComponentOptionBuilder {
        this.options.reconnect = true;
        return this;
    }

    build(): Connection {
        return this.conBuilder(this.options);
    }
}
