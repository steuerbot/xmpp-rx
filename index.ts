import {ConnectionBuilder} from './src/connection/ConnectionBuilder';
import {Connection} from './src/connection/Connection';

let jid = 'beta_bot.steuerbot.com';

// let con = ConnectionBuilder.ofTypeClient()
//     .withCredentials('marc@steuerbot.com/resource_3', 'marc')
//     .setAutoConnect(false)
//     .build();
let con = ConnectionBuilder.ofTypeComponent().withCredentials(jid, 'beta_bot', 'steuerbot.com', 5226).build();

// con.connect().subscribe(r => {
//     console.log('online');
//     con.sendPresence('ypypypyp');
//     con.enableCarbons();
// });

con.getStatusStream().subscribe(console.log);

con.getSimpleStanzaStream({type: Connection.TYPE_MESSAGE})
    .subscribe(r => console.log(`type: ${r.type} composing: ${r.composing} paused: ${r.paused} body: ${r.body}`));