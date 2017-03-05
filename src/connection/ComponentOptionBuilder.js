"use strict";
/**
 * Created by marcneumann on 18.02.17.
 */
var ComponentOptionBuilder = (function () {
    function ComponentOptionBuilder(conBuilder) {
        this.conBuilder = conBuilder;
    }
    ComponentOptionBuilder.prototype.withCredentials = function (jid, password, host, port) {
        this.options = { jid: jid, password: password, host: host, port: port };
        return this;
    };
    ComponentOptionBuilder.prototype.doReconnect = function () {
        this.options.reconnect = true;
        return this;
    };
    ComponentOptionBuilder.prototype.build = function () {
        return this.conBuilder(this.options);
    };
    return ComponentOptionBuilder;
}());
exports.ComponentOptionBuilder = ComponentOptionBuilder;
//# sourceMappingURL=ComponentOptionBuilder.js.map