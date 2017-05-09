// server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var FoodsController = require('./lib/controllers/foods-controller')
var md5 = require('md5')
var pry = require('pryjs')


var Food = require('./lib/models/food')
var environment   = process.env.NODE_ENV || 'development'
var configuration = require('./knexfile')[environment]
var database      = require('knex')(configuration)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self'


// Index
app.get('/api/v1/foods', FoodsController.index);

// Create
app.post('/api/v1/foods', FoodsController.create);

// Show
app.get('/api/v1/foods/:id', FoodsController.show);

// Update
app.put('/api/v1/foods/:id', function(request, response) {
  colsAndVals = ''
  for (var i = 0; i < Object.keys(request.body).length; i++) {
    var key = Object.keys(request.body)[i]
    var val = request.body[key]
    keyValStr = key + " = '" + val + "', "
    colsAndVals += keyValStr
  }
  query = "UPDATE foods SET " + colsAndVals.slice(0, -2) + " WHERE id = " + request.params.id.toString() + " RETURNING *"
  database.raw(query)
  .then(function(data) {
    update_food = data.rows[0]
    if(!update_food) {
      response.sendStatus(404)
    }else{
      response.json(update_food)
    }
  });
});

// Delete
app.delete('/api/v1/foods/:id', function(request, response) {
  database.raw("UPDATE foods SET active = 'false', updated_at = '" + JSON.stringify(new Date) + "' WHERE id = " + request.params.id.toString() + " RETURNING *")
  .then(function(data) {
    inactive_food = data.rows[0]
    response.json(inactive_food)
  });
});

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });;
}

module.exports = app