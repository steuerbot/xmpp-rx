import 'rxjs/add/operator/do';
import {JID, Message} from './models';

let con = new Connection();
let jid = new JID('marc', 'steuerbot.com');

let a = Date.now();
con.connect(jid, 'marc').do(() => con.sendPresence()).subscribe(r => console.log(r + ' in ' + (Date.now() - a) + 'ms'));

con.getRawMessages().subscribe(r => {
    console.log('rawMessage');
});

con.getChatMessageStream(Message.groupchat).subscribe(r => {
    console.log('chatMessage');
});
