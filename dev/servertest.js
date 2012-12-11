// server test

var ArcusNode = require('../lib/arcus_node.js');

var server = new ArcusNode({
  port: 1935,
  logLevel: 'warn',
  logFile: null,
  peerProxy: true
});

server.on('connect', function(nc, params) {
  console.log("Connection!", params);
  nc.on('myCommand', function(arg) {
    console.log("myCommand in nc!!!");
  });
  nc.wait();
  nc.accept();
});

/*server.command('myCommand', function(nc, arg1, arg2, arg3) {
  console.log("myCommand!");
  return "arcusArg";
});*/

server.command('myCommand', function(nc, message, context, cb) {
  console.log("myCommand!", message.commandData);
  cb.call(context, nc, message, "asdqq123");
});

server.run();
