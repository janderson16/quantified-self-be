var assert = require('chai').assert;
var app = require('../server');
var request = require('request');
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

describe('Server', function(){
  before(function(done){
      this.port = 9876;
      this.server = app.listen(this.port, function(err, result){
        if (err) {return done(err);}
        done();
      });

      this.request = request.defaults({
        baseUrl: 'http://localhost:9876/'
      })
  });

  after(function(){
    this.server.close();
  });

  it('should exist', function(){
    assert(app);
  });

  describe('GET /api/v1/foods', function(){
    it('should return a 200', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if(error) {return done(error)}
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('POST /api/v1/foods', function() {
    it('should not return 404', function(done) {
      this.request.post('/api/secrets', function(error, response) {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', function(){
    it('should return a 200', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error) {return done(error)}
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    // it('Should return a 404 if no response', function(done){
    //   this.request.get('/api/v1/foods/100', function(error, response){
    //     if(error){done(error)}
    //     assert.equal(response.statusCode, 404);
    //     done();
    //   });
    // });
  });
});