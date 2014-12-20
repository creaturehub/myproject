var Hapi = require('hapi');
var Good = require('good');
var goodConsole = require('good-console');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function(req, reply) {
    reply('Hello, ' + encodeURIComponent(req.params.name) + '!');
  }
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: goodConsole,
      args: [{ logs: '*', response: '*' }]
    }]
  }
}, function(err) {
  if (err) throw err;

  server.start(function() {
    console.log('info', 'Server running at: ' + server.info.uri);
  });
});
