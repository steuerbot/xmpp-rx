"use strict";
var Message;
(function (Message) {
    Message.chat = 'chat';
    Message.error = 'error';
    Message.groupchat = 'groupchat';
    Message.headline = 'headline';
    Message.normal = 'normal';
})(Message = exports.Message || (exports.Message = {}));
class JID {
    constructor(user, domain, resource) {
        this.user = user;
        this.domain = domain;
        this.resource = resource;
    }
    /**
     * Returns a formatted string
     * @returns {string} => jid'@'domain'/'resource
     */
    toString() {
        let resource = this.resource ? this.resource : JID.DEFAULT_RESOURCE;
        return this.user + '@' + this.domain + '/' + resource;
    }
}
JID.DEFAULT_RESOURCE = 'node-xmpp-client';
exports.JID = JID;
//# sourceMappingURL=models.js.map