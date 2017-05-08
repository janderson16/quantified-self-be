// test/server-test.js

var assert = require('chai').assert;
var app = require('../server');
var request = require('request');

var environment   = process.env.NODE_ENV || 'test'
var configuration = require('../knexfile')[environment]
var database      = require('knex')(configuration)

describe('Server', function(){
  before(function(done){
    this.port = 9876;
    this.server = app.listen(this.port, function(err){
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(function(){
    this.server.close();
  });

  it('should exist', function(){
    assert(app);
  });

  describe('GET /api/v1/foods/:id', function(){
    beforeEach(function(done){
      database.raw('INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        ["Banana", 400, true, new Date, new Date])
      .then(function(){
        done();
      });
    });

    afterEach(function(done){
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(function(){
        done();
      });
    });

    it('should return 404 if resource is not found', function(done) {
      this.request.get('/api/v1/foods/10000', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404);
        done();
      });
    });

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have the id and the name from the resource', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error){ done(error) }

        var id = 1;
        var name = 'Banana';
        let parsedFood = JSON.parse(response.body.toString());

        assert.equal(parsedFood.id, id);
        assert.equal(parsedFood.name, name);
        assert.ok(parsedFood.created_at);
        done();
      })
    })
  });
});
