import {Client} from 'node-xmpp-client';

/**
 * Created by marcneumann on 17.02.17.
 */
console.log('hallo');
console.log('hallo');

let client = new Client({jid: 'marc@steuerbot.com', password: 'marc'});
client.on('online', () => console.log('online'));
client.connect();