var request = require('request');
var expect = require('../../node_modules/chai/chai').expect;

describe('API endpoint testing', function() {
  it('should respond to GET requests for / with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.equal('text/html; charset=UTF-8');
      done();
    });
  });

  it('should respond to GET requests to /mission/meta/:missionID with appropriate mission data', function(done) {
    request('http://127.0.0.1:3000/mission/meta/1', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      var data = JSON.parse(body);
      expect(data).to.be.an('object');
      expect(data.id).to.equal(1);
      expect(Object.keys(data).length).to.equal(14);
      done();
    });
  });

  it('should respond to GET requests to /spacecraft/data/:missionID with appropriate spacecraft data', function(done) {
    request('http://127.0.0.1:3000/spacecraft/data/1', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      var data = JSON.parse(body);
      expect(data).to.be.an('object');
      expect(data.id).to.equal(1);
      expect(Object.keys(data).length).to.equal(14);
      done();
      
    });
  });

  it('should respond to GET requests to /vehicle/engine/stage/:missionID/:stageNo with engine data for stage 1', function(done) {
    request('http://127.0.0.1:3000/vehicle/engine/stage/1/1', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      var data = JSON.parse(body);
      expect(data).to.be.an('array');
      //Array should have 9 items, 1 for each first stage engine
      expect(data.length).to.equal(9);
      done();
      
    });
  });

  it('should respond to GET requests to /vehicle/engine/stage/:missionID/:stageNo with engine data for stage 2', function(done) {
    request('http://127.0.0.1:3000/vehicle/engine/stage/1/2', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      var data = JSON.parse(body);
      expect(data).to.be.an('array');
      //Array should have 1 item corresponding to the single stage 2 engine
      expect(data.length).to.equal(1);
      expect(data[0].stage_num).to.equal(2);
      done();
      
    });
  });

  it('should respond to GET requests to /vehicle/engine/all/:missionID with all engine data for current mission', function(done) {
      request('http://127.0.0.1:3000/vehicle/engine/all/1', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        var data = JSON.parse(body);
        expect(data).to.be.an('array');
        //Array should have 1 item corresponding to the single stage 2 engine
        expect(data.length).to.equal(10);
        done();
        
      });
  });

  it('should respond to GET requests to /vehicle/tank/:missionID/:stageNo with tank data for stage 1', function(done) {
    request('http://127.0.0.1:3000/vehicle/tank/1/1', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      var data = JSON.parse(body);
      expect(data).to.be.an('array');
      expect(data.length).to.equal(2);
      expect(data[0].stage_num).to.equal(1);
      done();
    });
  });

  it('should respond to GET requests to /vehicle/tank/:missionID/:stageNo with tank data for stage 2', function(done) {
    request('http://127.0.0.1:3000/vehicle/tank/1/2', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      var data = JSON.parse(body);
      expect(data).to.be.an('array');
      expect(data.length).to.equal(2);
      expect(data[0].stage_num).to.equal(2);
      done();
    });
  });
  
  it('should respond to GET requests to /vehicle/tank/all/:missionID will all tank data for the current mission', function(done) {
      request('http://127.0.0.1:3000/vehicle/tank/all/1', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        var data = JSON.parse(body);
        expect(data).to.be.an('array');
        expect(data.length).to.equal(4);
        done();
      });
  });

});
