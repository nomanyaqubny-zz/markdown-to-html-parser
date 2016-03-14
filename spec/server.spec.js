var request = require('request');

describe('server up and running test', function(){

  jasmine.getEnv().defaultTimeoutInterval = 5000;

  describe("GET /hello", function() {
    
    it("should respond with 200 status code", function(done) {
      request("http://localhost:8000/hello", function(error, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });  // timeout after 5000 ms
    });

    it("and should respond with hello world", function(done) {
      request("http://localhost:8000/hello", function(error, response, body){
        expect(body).toBe("hello world");
        done();
      });  // timeout after 5000 ms
    });

  });

});