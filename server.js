// server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var FoodsController = require('./lib/controllers/foods-controller')
var md5 = require('md5')
var pry = require('pryjs')

// var Food = require('./lib/models/food')
// var environment   = process.env.NODE_ENV || 'development'
// var configuration = require('./knexfile')[environment]
// var database      = require('knex')(configuration)


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


// Edit
app.put('/api/v1/foods/:id', function(request, response) {
  // response.send('It\'s a secret to everyone.')
});

// Delete
app.delete('/api/v1/foods/:id', function(request, response) {
  // response.send('It\'s a secret to everyone.')
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