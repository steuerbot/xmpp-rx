"use strict";
var ConnectionBuilder_1 = require('../connection/ConnectionBuilder');
var con = ConnectionBuilder_1.ConnectionBuilder.ofTypeClient()
    .withCredentials('marc@steuerbot.com/resource_3', 'marc')
    .build();
con.getStatusStream('online').subscribe(function (r) {
    console.log(r);
    process.exit(0);
});
