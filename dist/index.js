"use strict";
var connection_1 = require("./connection");
var jid_1 = require("./jid");
require("rxjs/add/operator/do");
var con = new connection_1.Connection();
var jid = new jid_1.JID('marc', 'steuerbot.com');
var a = Date.now();
con.connect(jid, 'marc')["do"](function () { return con.sendPresence(); }).subscribe(function (r) { return console.log(r + ' in ' + (Date.now() - a) + 'ms'); });
con.getRawMessages().subscribe(function (r) {
    console.log(r);
});
//# sourceMappingURL=index.js.map