exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE mealFoods(
    id SERIAL PRIMARY KEY NOT NULL,
    meal_id integer references meals(id),
    food_id integer references foods(id),
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE mealFoods`;
  return knex.raw(dropQuery);
};