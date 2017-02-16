"use strict";
require("rxjs/add/operator/do");
const models_1 = require("./models");
let con = new Connection();
let jid = new models_1.JID('marc', 'steuerbot.com');
let a = Date.now();
con.connect(jid, 'marc').do(() => con.sendPresence()).subscribe(r => console.log(r + ' in ' + (Date.now() - a) + 'ms'));
con.getRawMessages().subscribe(r => {
    console.log('rawMessage');
});
con.getChatMessageStream(models_1.Message.groupchat).subscribe(r => {
    console.log('chatMessage');
});
//# sourceMappingURL=xmpp-rx-tests.js.map