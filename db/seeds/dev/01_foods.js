//01_foods.js

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert([
        {name: 'tomato', calories: 100, active: true, created_at: new Date, updated_at: new Date},
        {name: 'potato', calories: 200, active: true, created_at: new Date, updated_at: new Date},
        {name: 'borsh', calories: 600, active: true, created_at: new Date, updated_at: new Date},
        {name: 'gyros', calories: 900, active: true, created_at: new Date, updated_at: new Date}
      ]);
    });
};
