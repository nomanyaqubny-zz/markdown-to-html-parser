'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

var config = {
  db: mongojs('kt-md-html'),
};

// Create a server with a host, port and pass/set config settings
const server = new Hapi.Server({
    app: config
});

server.connection({
    host: 'localhost', 
    port: 8000 
});

//Load plugins and start server
server.register([
    require('inert'),
    require('./app/routes/index.server.routes'),
    require('./app/routes/markdown-html.server.routes'),
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});