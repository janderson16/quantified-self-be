var { database, TABLES } = require('../../db');

function create2(meal_id, food_id, date) {
  return database.raw('INSERT INTO meal_foods (meal_id, food_id, date) VALUES (?, ?, ?) RETURNING *', [meal_id, food_id, date])
}

function create(meal_food_params) {
  return database.raw('INSERT INTO meal_foods (meal_id, food_id, date) VALUES (?, ?, ?) RETURNING *', [meal_food_params])
}


function destroy(id) {
  return database.raw('DELETE FROM meal_foods WHERE id =' + id)
}

module.exports = {
  create2: create2,
  create: create,
  destroy: destroy,
}