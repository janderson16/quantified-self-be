var Foods = require('../models/food')

function index(request, response) {
  Foods.all()
  .then(function(data) {
    let foods = data.rows
    if(!foods) {
      response.sendStatus(404)
    }else{
      response.json(foods)
    }
  });
}

function create(request, response) {
  food_params = [
    request.body.name,
    request.body.calories,
    request.body.active,
    request.body.created_at,
    request.body.updated_at
  ]
  Foods.create(food_params)
  .then(function(data) {
    new_food = data.rows[0]
    response.json(new_food)
  });
}

function show(request, response) {
  Foods.find(request.params.id)
  .then(function(data) {
    let food = data.rows[0]
    if(!food) {
      response.sendStatus(404)
    }else{
      response.json(food)
    };
  });
}

module.exports = {
  index: index,
  show: show,
  create: create
}
