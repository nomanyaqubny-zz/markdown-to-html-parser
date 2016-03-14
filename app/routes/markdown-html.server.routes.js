'use strict';

const Boom = require('boom');  
const uuid = require('node-uuid');
const Joi = require('joi');

/*****

Later on move handler functions to controller - if find spare time
var taskController = require('../controllers/markdown-html.server.controller');

*****/

var parser = require('../modules/markdown-html-ny/parser');

exports.register = function(server, options, next) {
  const db = server.settings.app.db;
  const htmlCollection = db.collection('html_collection');

  server.route({
    method: 'GET',
    path: '/markdown',
    handler: function(request, reply) {

      htmlCollection.find(function(err, docs) {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        reply(docs);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/markdown/get/{id}',
    handler: function(request, reply) {

      htmlCollection.findOne({
        _id: request.params.id
      }, function(err, doc) {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        if (!doc) {
          return reply(Boom.notFound());
        }

        reply(doc);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/markdown/save',
    handler: function(request, reply) {
      var doc = request.payload;
      //Create an id
      doc._id = uuid.v1();

      // parse markdown to html here
      parser.markdownToHtml(doc.markdown, function(err, result) {
        if(err) {
          return reply(Boom.badData(result, err));
        }

        doc.html = result;

        htmlCollection.save(doc, function(err, result) {
          if (err) {
            return reply(Boom.badData('Internal MongoDB error', err));
          }
          reply(doc);
        });

      });
    },
    config: {
      validate: {
        payload: {
          markdown: Joi.string().required()
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/markdown/delete/{id}',
    handler: function(request, reply) {
      if (request.params.id == 701) {

        htmlCollection.remove({}, function(err, result) {
          if (err) {
            return reply(Boom.badData('Internal MongoDB error', err));
          }

          if (result.n === 0) {
            return reply(Boom.notFound());
          }

          reply().code(204);
        });

      } else {
        reply().code(403);
      }
    }
  });

  return next();
};

exports.register.attributes = {
	name: 'routes-markdown-html'
};