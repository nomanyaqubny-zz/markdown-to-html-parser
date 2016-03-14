var request = require('request');

describe('POST REQUESTS: ', function(){

  jasmine.getEnv().defaultTimeoutInterval = 5000;

  var options;

  beforeEach(function() {
	options = {
		uri: 'http://localhost:8000/markdown/save',
		method: 'POST',
		json: {
			"markdown": "# Heading 1"
		}
	};
  });

  describe("POST /markdown/save", function() {

  	it("should respond with 400 status code if markdown property is not sent", function(done) {
  		delete options.json.markdown;
      request(options, function(error, response, body){
        expect(response.statusCode).toBe(400);
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with 400 status code if markdown is empty", function(done) {
  		options.json.markdown = "";
      request(options, function(error, response, body){
        expect(response.statusCode).toBe(400);
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with 400 status code if markdown is not a string", function(done) {
  		options.json.markdown = 123456789;
      request(options, function(error, response, body){
        expect(response.statusCode).toBe(400);
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with 400 status code if markdown is not a string", function(done) {
  		options.json.markdown = null;
      request(options, function(error, response, body){
        expect(response.statusCode).toBe(400);
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with 200 status code if everything goes well", function(done) {
      request(options, function(error, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });  // timeout after 5000 ms
    });

	it("should respond with data having id to be defined", function(done) {
      request(options, function(error, response, body){
        expect(body._id).toBeDefined();
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with data having id not to be null", function(done) {
      request(options, function(error, response, body){
        expect(body._id).not.toBeNull();
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with data having markdown to be defined", function(done) {
      request(options, function(error, response, body){
        expect(body.markdown).toBeDefined();
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with data having markdown not to be null", function(done) {
      request(options, function(error, response, body){
        expect(body.markdown).not.toBeNull();
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with data having markdown equals the payload markdown sent", function(done) {
      request(options, function(error, response, body){
        expect(body.markdown).toEqual(options.json.markdown);
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with data having html to be defined", function(done) {
      request(options, function(error, response, body){
        expect(body.html).toBeDefined();
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with data having html not to be null", function(done) {
      request(options, function(error, response, body){
        expect(body.html).not.toBeNull();
        done();
      });  // timeout after 5000 ms
    });

  });

});