//02_meals.js

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('meals').insert([
        {name: 'breakfast'},
        {name: 'lunch'},
        {name: 'dinner'},
        {name: 'snacks'}
      ]);
    });
};
