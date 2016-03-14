'use strict';

exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path:'/', 
		handler: function(request, reply) {
			reply.file('./app/views/index.html');
		}
	});

	// Add the test route
	server.route({
		method: 'GET',
		path:'/hello', 
		handler: function(request, reply) {
			return reply('hello world');
		}
	});
	
	return next();
};

exports.register.attributes = {
	name: 'routes-index'
};