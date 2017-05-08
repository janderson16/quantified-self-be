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

function food_params(params) {
  [
    params.id,
    params.name,
    params.calories,
    params.active,
    params.created_at,
    params.updated_at
  ]
}

module.exports = {
  index: index,
  show: show
}
