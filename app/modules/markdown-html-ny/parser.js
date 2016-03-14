"use strict";

var markdown = require('./helpers/markdown');

function Parser() {};

(function() {
    this.markdownToHtml = function(markdownText, callback) {
    	markdown.toHtml(markdownText, function(err, result) {
    		callback(err, result);
    	});
    };
    this.validateMarkdown = function() {
    };
}).call(Parser.prototype);

var parser = new Parser();
module.exports = parser;