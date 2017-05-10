// server.js
var { database, TABLES } = require('./db');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var FoodsController = require('./lib/controllers/foods-controller')
var md5 = require('md5')

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
app.get('/api/v1/meals/:name', function(request, response){
  database.select(`${TABLES.FOODS}.name`, `${TABLES.FOODS}.calories`)
    .from(TABLES.FOODS)
    .innerJoin(TABLES.MEAL_FOODS, `${TABLES.MEAL_FOODS}.food_id`, `${TABLES.FOODS}.id`)
    .innerJoin(TABLES.MEALS, `${TABLES.MEAL_FOODS}.meal_id`, `${TABLES.MEALS}.id`)
    .where(`${TABLES.MEALS}.name`, request.params.name)
  .then(function(data) {
    meal = data[0]
    if(!meal) {
      response.sendStatus(404)
    }else{
      response.json(meal)
    }
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