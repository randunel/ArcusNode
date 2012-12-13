// server test

var ArcusNode = require('../lib/arcus_node.js');

var server = new ArcusNode({
  port: 1935,
  logLevel: 'warn',
  logFile: null,
  peerProxy: true
});

server.on('connect', function(nc, params) {
  console.log("Connection handled");
  nc.onCommand('myCommand', function(message, cb) {
    console.log("myCommand in netconnection", message.commandData);
    cb.call(nc, message, "mowahahahha");
  });
  nc.wait();
  nc.accept();
});

// Old method
/*server.command('myCommand', function(nc, arg1, arg2, arg3) {
  console.log("myCommand!");
  return "arcusArg";
});*/

server.run();
