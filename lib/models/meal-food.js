var { database, TABLES } = require('../../db');

function create(meal_food_params) {
  return database.raw('INSERT INTO meal_foods (meal_id, food_id, date) VALUES (?, ?, ?) RETURNING *',
    [ meal_food_params['meal_id'], meal_food_params['food_id'], meal_food_params['date'] ]
  )
}

function destroy(id) {
  return database.raw('DELETE FROM meal_foods WHERE id =' + id)
}

module.exports = {
  create: create,
  destroy: destroy
}