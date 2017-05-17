var { database, TABLES } = require('../../db');

function all(query) {
  whereClause = {}
  if(Object.keys(query).length > 0) {
    Object.assign(whereClause, query)
  }
  return database.select(`${TABLES.MEAL_FOODS}.id`, `${TABLES.FOODS}.name`, `${TABLES.FOODS}.calories`, `${TABLES.MEAL_FOODS}.date`, `${TABLES.MEALS}.name AS meal_name`)
    .from(TABLES.FOODS)
    .innerJoin(TABLES.MEAL_FOODS, `${TABLES.MEAL_FOODS}.food_id`, `${TABLES.FOODS}.id`)
    .innerJoin(TABLES.MEALS, `${TABLES.MEAL_FOODS}.meal_id`, `${TABLES.MEALS}.id`)
    .where(whereClause)
}

function create(meal_params) {
  return database.raw('INSERT INTO meals (name) VALUES (?) RETURNING *', meal_params)
}

function find_by(name, query) {
  whereClause = {}
  whereClause[`${TABLES.MEALS}.name`] = name
  if(Object.keys(query).length > 0) {
    Object.assign(whereClause, query)
  }
  return database.select(`${TABLES.MEAL_FOODS}.id`, `${TABLES.FOODS}.name`, `${TABLES.FOODS}.calories`, `${TABLES.MEAL_FOODS}.date`)
    .from(TABLES.FOODS)
    .innerJoin(TABLES.MEAL_FOODS, `${TABLES.MEAL_FOODS}.food_id`, `${TABLES.FOODS}.id`)
    .innerJoin(TABLES.MEALS, `${TABLES.MEAL_FOODS}.meal_id`, `${TABLES.MEALS}.id`)
    .where(whereClause)
}

module.exports = {
  all: all,
  create: create,
  find_by: find_by
}