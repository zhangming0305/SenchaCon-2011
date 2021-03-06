
require("node-extjs-express");

new Ext.express.Application({
	name: "XERO",
	appFolder: __dirname,
	
	controllers: [
		"Viz"
	],
	
	port: 5000,
	hostname: "127.0.0.1",
	
	configureExpress: function(express, server) {
		server.use(express.logger(':method :url :status'));
		server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		server.use(server.router);
		server.use(express.static(__dirname + '/images'));
		
		this.configureSockets(express, server);
	},
	
	configureSockets: function(express, server) {
		var io = require('socket.io').listen(server);
		io.configure(function(){
			io.enable('browser client minification');
			io.enable('browser client etag');
			io.set('log level', 1);
		});
		
		this.io = io;
	},
	
  	launch: function() {
  		console.log('Socket server running at ws://*:' + this.port);
		console.log('Tracking server running at http://*:' + this.port + '/tracking.gif');
  	}
});
