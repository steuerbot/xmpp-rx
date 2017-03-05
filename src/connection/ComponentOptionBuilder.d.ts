import {Connection} from './Connection';
import {Options} from '../../typings/custom/node-xmpp-component/lib/Component';
/**
 * Created by marcneumann on 19.02.17.
 */
export declare class ComponentOptionBuilder {
    constructor(conBuilder: (opt: Options) => Connection);

    withCredentials(jid: string, password: string, host: string, port: number): ComponentOptionBuilder;

    doReconnect(): ComponentOptionBuilder;

    build(): Connection;
}