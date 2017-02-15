export class JID {
    static DEFAULT_RESOURCE: string = 'node-xmpp-client';

    constructor(private user: string, private domain: string, private resource?: string) {
    }

    /**
     * Returns a formatted string
     * @returns {string} => jid'@'domain'/'resource
     */
    toString(): string {
        let resource = this.resource ? this.resource : JID.DEFAULT_RESOURCE;
        return this.user + '@' + this.domain + '/' + resource;
    }
}