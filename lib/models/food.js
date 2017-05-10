var { database, TABLES } = require('../../db');

function all() {
  return database.raw('SELECT * FROM foods')
}

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ? LIMIT 1', [id])
}

function create(food_params) {
  return database.raw('INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?) RETURNING *', food_params)
}

function create2(name, calories, active, created_at, updated_at) {
  return database.raw('INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?) RETURNING *', [name, calories, active, created_at, updated_at])
}

function update(body, id) {
  colsAndVals = ''
  for (var i = 0; i < Object.keys(body).length; i++) {
    var key = Object.keys(body)[i]
    var val = body[key]
    keyValStr = key + " = '" + val + "', "
    colsAndVals += keyValStr
  }
  query = "UPDATE foods SET " + colsAndVals.slice(0, -2) + " WHERE id = " + id.toString() + " RETURNING *"
  return database.raw(query)
}

function inactivate(id) {
  return database.raw("UPDATE foods SET active = 'false', updated_at = '" + JSON.stringify(new Date) + "' WHERE id = " + id.toString() + " RETURNING *")
}

module.exports = {
  find: find,
  all: all,
  create: create,
  create2: create2,
  update: update,
  inactivate: inactivate
}
