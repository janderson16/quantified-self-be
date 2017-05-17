//03_meal_foods.js

exports.seed = function(knex, Promise) {
  return knex('meal_foods').insert([
    {meal_id: 1, food_id: 1, date: new Date},
    {meal_id: 2, food_id: 2, date: new Date},
    {meal_id: 3, food_id: 3, date: new Date},
    {meal_id: 4, food_id: 4, date: new Date},
    {meal_id: 1, food_id: 1, date: new Date},
    {meal_id: 2, food_id: 2, date: new Date},
    {meal_id: 3, food_id: 3, date: new Date},
    {meal_id: 4, food_id: 4, date: new Date},
    {meal_id: 1, food_id: 1, date: new Date}
  ])
}