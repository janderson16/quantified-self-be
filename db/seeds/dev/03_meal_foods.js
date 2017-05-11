
exports.seed = function(knex, Promise) {
  return knex('meal_foods').insert([
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date},
    {meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, date: new Date}
  ]);
};
