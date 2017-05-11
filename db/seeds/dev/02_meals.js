
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {id: 1, name: 'breakfast'},
        {id: 2, name: 'lunch'},
        {id: 3, name: 'dinner'},
        {id: 4, name: 'snacks'}
      ]);
    });
};
