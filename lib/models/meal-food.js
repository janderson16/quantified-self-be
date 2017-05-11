var { database, TABLES } = require('../../db');

function create2(meal_id, food_id, date) {
  return database.raw('INSERT INTO meal_foods (meal_id, food_id, date) VALUES (?, ?, ?) RETURNING *', [meal_id, food_id, date])
}

module.exports = {
  create2: create2
}