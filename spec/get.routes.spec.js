var request = require('request');

describe('GET REQUESTS: ', function(){

  jasmine.getEnv().defaultTimeoutInterval = 5000;

  describe("GET /markdown", function() {

    it("should respond with 200 status code if no id mentioned", function(done) {
      request("http://localhost:8000/markdown", function(error, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });  // timeout after 5000 ms
    });

    it("should respond with list of markdown ids in the system", function(done) {
      request("http://localhost:8000/markdown", function(error, response, body){
        // TODO: to be any array either empty or not
        done();
      });
    });

  });

  describe("GET /markdown/get/{:id}", function() {

    it("should respond with 404 status code if invalid id", function(done) {
      request("http://localhost:8000/markdown/get/1", function(error, response, body){
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    it("should respond with 404 status code if garbage id", function(done) {
      request("http://localhost:8000/markdown/get/1!@AC#$!%--- --", function(error, response, body){
        expect(response.statusCode).toBe(404);
        done();
      });
    });
    
    /*it("should respond with 200 status code if valid id is given", function(done) {
      request("http://localhost:8000/markdown/get/d21b2be0-e601-11e5-9032-e7159c850e53", function(error, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("and should respond with json object having id and body if valid id is given", function(done) {
      request("http://localhost:8000/markdown/get/d21b2be0-e601-11e5-9032-e7159c850e53", function(error, response, body){
        expect(body).toBe(JSON.stringify({_id: "d21b2be0-e601-11e5-9032-e7159c850e53",body: "# Heading 1"}));
        done();
      });
    });*/

  });

});