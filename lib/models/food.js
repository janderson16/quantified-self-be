var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)

function all() {
  return database.raw('SELECT * FROM foods')
}

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ? LIMIT 1', [id])
}

function create(food_params) {
  return database.raw('INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?) RETURNING *', food_params)
}

module.exports = {
  find: find,
  all: all,
  create: create
}
