var MealFood = require('../models/meal-food')

function createCRUD(request, response) {
  meal_food_params = {
    meal_id: request.body.meal_id,
    food_id: request.body.food_id,
    date:    request.body.date
  }
  MealFood.create(meal_food_params)
  .then(function(data) {
    new_meal_food = data.rows[0]
    response.json(new_meal_food)
  })
}

function deleteCRUD(request, response) {
  MealFood.destroy(request.params.id)
  .then(function(data) {
    response.sendStatus(200)
  })
}

module.exports = {
  create: createCRUD,
  delete: deleteCRUD
}