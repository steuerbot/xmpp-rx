import {Component} from 'node-xmpp-component';

console.log('hallo');

// let client = new Client({jid: 'marc@steuerbot.com', password: 'marc'});
let component = new Component({jid: 'beta_bot.steuerbot.com', password: 'beta_bot', host: 'steuerbot.com', port: 5226});

component.on('online', () => console.log('online'));

