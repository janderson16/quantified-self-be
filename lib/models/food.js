var { database, TABLES } = require('../../db');

function all() {
  return database.raw('SELECT * FROM foods WHERE active = true ORDER BY created_at DESC')
}

function create(food_params) {
  return database.raw('INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?) RETURNING *',
    [ food_params['name'], food_params['calories'], food_params['active'], food_params['created_at'], food_params['updated_at'] ]
  )
}

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ? LIMIT 1', [id])
}

function inactivate(id) {
  return database.raw("UPDATE foods SET active = 'false', updated_at = '" + JSON.stringify(new Date) + "' WHERE id = " + id.toString() + " RETURNING *")
}

function update(id, food_params) {
  food_params['updated_at'] = (new Date).toJSON()
  query = "UPDATE foods SET " + objectToString(food_params) + " WHERE id = " + id.toString() + " RETURNING *"
  return database.raw(query)
}

function objectToString(object) {
  colsAndVals = ""
  for (var i = 0; i < Object.keys(object).length; i++) {
    var key = Object.keys(object)[i]
    var val = object[key]
    keyValStr = key + " = '" + val + "', "
    colsAndVals += keyValStr
  }
  return colsAndVals.slice(0, -2)
}

module.exports = {
  all: all,
  create: create,
  find: find,
  inactivate: inactivate,
  update: update
}
