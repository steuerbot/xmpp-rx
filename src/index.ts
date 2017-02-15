import {Connection} from './connection';
import {JID} from './jid';
import 'rxjs/add/operator/do';

let con = new Connection();
let jid = new JID('marc', 'steuerbot.com');

let a = Date.now();
con.connect(jid, 'marc').do(() => con.sendPresence()).subscribe(r => console.log(r + ' in ' + (Date.now() - a) + 'ms'));
con.getRawMessages().subscribe(r => {
    console.log(r);
});
