import {ConnectionBuilder} from '../connection/ConnectionBuilder';

let jid = 'beta_bot.steuerbot.com';

let con = ConnectionBuilder.ofTypeClient()
    .withCredentials('marc@steuerbot.com/resource_3', 'marc')
    // .setAutoConnect(false)
    .build();
// con.connect();
// let con = ConnectionBuilder.ofTypeComponent().withCredentials(jid, 'beta_bot', 'steuerbot.com', 5226).build();

// con.connect().subscribe(r => {
//     console.log('online');
//     con.sendPresence('ypypypyp');
// con.enableCarbons();

// con.sendMessage('marc@steuerbot.com', 'admin@steuerbot.com', 'hallo');
// });

// con.getStatusStream().subscribe(console.log);
//
// con.getSimpleStanzaStream({type: Connection.TYPE_MESSAGE})
//     .subscribe(r => console.log(`from: ${r.from} - type: ${r.type} - composing: ${r.composing} - paused: ${r.paused} - body: ${r.body}`));

// let client = new Client({jid: 'marc@steuerbot.com', password: 'marc'});
// client.connect();
// client.on('online', () => {
//     console.log('online');
//     let message = new Message();
//     message.c('body').t('hallo');
//     client.send(message);
// });

// let con = Connection.createClientConnection(client);
con.getStatusStream('online').subscribe(r => {
    console.log(r);
    setTimeout(() => {
        con.sendMessage('admin@steuerbot.com', 'hallo222');
    }, 2000);
});