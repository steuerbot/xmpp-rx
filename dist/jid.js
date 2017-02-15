"use strict";
var JID = (function () {
    function JID(user, domain, resource) {
        this.user = user;
        this.domain = domain;
        this.resource = resource;
    }
    /**
     * Returns a formatted string
     * @returns {string} => jid'@'domain'/'resource
     */
    JID.prototype.toString = function () {
        var resource = this.resource ? this.resource : JID.DEFAULT_RESOURCE;
        return this.user + '@' + this.domain + '/' + resource;
    };
    return JID;
}());
JID.DEFAULT_RESOURCE = 'node-xmpp-client';
exports.JID = JID;
//# sourceMappingURL=jid.js.map