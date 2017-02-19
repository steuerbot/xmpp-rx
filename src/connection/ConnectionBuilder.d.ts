import {ComponentOptionBuilder} from './ComponentOptionBuilder';
import {ClientOptionBuilder} from './ClientOptionBuilder';
import {Connection} from './Connection';
import {Options as ComponentOptions} from 'node-xmpp-component';
import {Options as ClientOptions} from 'node-xmpp-Client';

/**
 * Created by marcneumann on 19.02.17.
 */
export declare class ConnectionBuilder {
    static ofTypeComponent(): ComponentOptionBuilder;

    static ofTypeClient(): ClientOptionBuilder;

    private static buildWithComponentOptions(options: ComponentOptions): Connection;

    private static buildWithClientOptions(options: ClientOptions): Connection;
}