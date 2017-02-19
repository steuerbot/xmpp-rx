import {ComponentOptionBuilder} from './ComponentOptionBuilder';
import {ClientOptionBuilder} from './ClientOptionBuilder';
import {Connection} from './Connection';
import {Component, Options as ComponentOptions} from 'node-xmpp-component';
import {Client} from 'node-xmpp-client';
import {Options as ClientOptions} from 'node-xmpp-Client';
/**
 * Created by marcneumann on 18.02.17.
 */

export class ConnectionBuilder {

    static ofTypeComponent(): ComponentOptionBuilder {
        return new ComponentOptionBuilder(ConnectionBuilder.buildWithComponentOptions);
    }

    static ofTypeClient(): ClientOptionBuilder {
        return new ClientOptionBuilder(ConnectionBuilder.buildWithClientOptions);
    }

    private static buildWithComponentOptions(options: ComponentOptions): Connection {
        let component = new Component(options);
        return Connection.createComponentConnection(component);
    }

    private static buildWithClientOptions(options: ClientOptions): Connection {
        let client = new Client(options);
        return Connection.createClientConnection(client);
    }
}