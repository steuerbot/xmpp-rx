"use strict";
var ComponentOptionBuilder_1 = require('./ComponentOptionBuilder');
var ClientOptionBuilder_1 = require('./ClientOptionBuilder');
var Connection_1 = require('./Connection');
var node_xmpp_component_1 = require('node-xmpp-component');
var node_xmpp_client_1 = require('node-xmpp-client');
/**
 * Created by marcneumann on 18.02.17.
 */
var ConnectionBuilder = (function () {
    function ConnectionBuilder() {
    }
    ConnectionBuilder.ofTypeComponent = function () {
        return new ComponentOptionBuilder_1.ComponentOptionBuilder(ConnectionBuilder.buildWithComponentOptions);
    };
    ConnectionBuilder.ofTypeClient = function () {
        return new ClientOptionBuilder_1.ClientOptionBuilder(ConnectionBuilder.buildWithClientOptions);
    };
    ConnectionBuilder.buildWithComponentOptions = function (options) {
        var component = new node_xmpp_component_1.Component(options);
        return Connection_1.Connection.createComponentConnection(component);
    };
    ConnectionBuilder.buildWithClientOptions = function (options) {
        var client = new node_xmpp_client_1.Client(options);
        return Connection_1.Connection.createClientConnection(client);
    };
    return ConnectionBuilder;
}());
exports.ConnectionBuilder = ConnectionBuilder;
//# sourceMappingURL=ConnectionBuilder.js.map