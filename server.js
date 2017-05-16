// server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var md5 = require('md5')
var cors = require('cors')

var { database, TABLES } = require('./db');
var FoodsController = require('./lib/controllers/foods-controller')
var MealsController = require('./lib/controllers/meals-controller')

app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self'


// Foods
app.get('/api/v1/foods', FoodsController.index);
app.post('/api/v1/foods', FoodsController.create);
app.get('/api/v1/foods/:id', FoodsController.show);
app.put('/api/v1/foods/:id', FoodsController.update);
app.delete('/api/v1/foods/:id', FoodsController.delete);

// Meals
app.get('/api/v1/meals', MealsController.index);
app.get('/api/v1/meals/:name', MealsController.show);

app.post('/api/v1/meals', function(request, response){
  meal_params = [
    request.body.meal_id,
    request.body.food_id,
    request.body.date
  ]
  console.log(request.body)
  database.raw('INSERT INTO meal_foods (meal_id, food_id, date) VALUES (?, ?, ?) RETURNING *', meal_params)
  .then(function(data) {
    new_meal_food = data.rows[0]
    response.json(new_meal_food)
  });
});

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });;
}

module.exports = app
