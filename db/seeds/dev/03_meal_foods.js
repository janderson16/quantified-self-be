
exports.seed = function(knex, Promise) {
  return knex('meal_foods').insert([
    {id: 1, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 2, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 3, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 4, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 5, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 6, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 7, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 8, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date},
    {id: 9, meal_id: Math.floor(Math.random() * (4 - 1)) + 1, food_id: Math.floor(Math.random() * (4 - 1)) + 1, diary_date: new Date}
  ]);
};
