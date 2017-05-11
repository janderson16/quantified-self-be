
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {name: 'breakfast'},
        {name: 'lunch'},
        {name: 'dinner'},
        {name: 'snacks'}
      ]);
    });
};
