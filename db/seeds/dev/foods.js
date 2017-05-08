exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        ["Tomato", 100, true, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        ["Potato", 200, true, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        ["Corn with buttah", 300, true, new Date, new Date]
      )
    ]);
  });
};