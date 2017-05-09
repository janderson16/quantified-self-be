var Food = require('../models/food')

function indexCRUD(request, response) {
  Food.all()
  .then(function(data) {
    let foods = data.rows
    if(!foods) {
      response.sendStatus(404)
    }else{
      response.json(foods)
    }
  });
}

function createCRUD(request, response) {
  food_params = [
    request.body.name,
    request.body.calories,
    request.body.active,
    request.body.created_at,
    request.body.updated_at
  ]
  Food.create(food_params)
  .then(function(data) {
    new_food = data.rows[0]
    response.json(new_food)
  });
}

function showCRUD(request, response) {
  Food.find(request.params.id)
  .then(function(data) {
    let food = data.rows[0]
    if(!food) {
      response.sendStatus(404)
    }else{
      response.json(food)
    };
  });
}

function updateCRUD(request, response) {
  Food.update(request.body, request.params.id)
  .then(function(data) {
    update_food = data.rows[0]
    if(!update_food) {
      response.sendStatus(404)
    }else{
      response.json(update_food)
    }
  });
};

function deleteCRUD(request, response) {
  Food.inactivate(request.params.id)
  .then(function(data) {
    inactive_food = data.rows[0]
    response.json(inactive_food)
  });
}

module.exports = {
  index: indexCRUD,
  show: showCRUD,
  create: createCRUD,
  update: updateCRUD,
  delete: deleteCRUD
}
