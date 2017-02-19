# xmpp-rx
Simple rx-wrapper around the popular node-xmpp-client library.

### Installation

#### Node Server:  
1. `npm install --save @steuerbot/xmpp-rx`
2. Move content of `/node_modules/@steuerbot/types/` into `/node_modules/@types/`

#### Browser:
1. `npm install --save @steuerbot/xmpp-rx`
2. Move content of `/node_modules/@steuerbot/types/` into `/node_modules/@types/`
3. Edit line 15 of `/node_modules/node-xmpp-client/lib/Client.js`: <p/>
`var exec = require('child_process').exec` => `var exec = {}`

### Usage

Coming soon...