var environment   = process.env.NODE_ENV || 'development'
var configuration = require('./knexfile')
var knex = require('knex')

exports.database = knex(configuration[environment])

exports.TABLES = {
  MEALS: 'meals',
  FOODS: 'foods',
  MEAL_FOODS: 'meal_foods'
}