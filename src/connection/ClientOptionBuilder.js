"use strict";
/**
 * Created by marcneumann on 18.02.17.
 */
var ClientOptionBuilder = (function () {
    function ClientOptionBuilder(conBuilder) {
        this.conBuilder = conBuilder;
    }
    ClientOptionBuilder.prototype.withCredentials = function (jid, password) {
        this.options = { jid: jid, password: password };
        return this;
    };
    ClientOptionBuilder.prototype.useWebsocket = function (url) {
        this.options.websocket = { url: url };
        return this;
    };
    ClientOptionBuilder.prototype.useBosh = function (url) {
        this.options.bosh = { url: url };
        return this;
    };
    ClientOptionBuilder.prototype.doReconnect = function () {
        this.options.reconnect = true;
        return this;
    };
    ClientOptionBuilder.prototype.setAutoConnect = function (v) {
        this.options.autostart = v;
        return this;
    };
    ClientOptionBuilder.prototype.setRegister = function (v) {
        this.options.register = v;
        return this;
    };
    ClientOptionBuilder.prototype.useLegacySSL = function (v) {
        this.options.legacySSL = v;
        return this;
    };
    ClientOptionBuilder.prototype.actAs = function (v) {
        this.options.actAs = v;
        return this;
    };
    ClientOptionBuilder.prototype.disallowTLS = function (v) {
        this.options.disallowTLS = v;
        return this;
    };
    ClientOptionBuilder.prototype.setPreferredSASLMethod = function (v) {
        this.options.preferred = v;
        return this;
    };
    ClientOptionBuilder.prototype.build = function () {
        return this.conBuilder(this.options);
    };
    return ClientOptionBuilder;
}());
exports.ClientOptionBuilder = ClientOptionBuilder;
//# sourceMappingURL=ClientOptionBuilder.js.map