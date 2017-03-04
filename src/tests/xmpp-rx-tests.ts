import {ConnectionBuilder} from '../connection/ConnectionBuilder';

let con = ConnectionBuilder.ofTypeClient()
    .withCredentials('marc@steuerbot.com/resource_3', 'marc')
    // .setAutoConnect(false)
    .build();

con.getStatusStream('online').subscribe(r => {
    console.log(r);
    process.exit(0);
});