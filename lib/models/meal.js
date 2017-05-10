var { database, TABLES } = require('../../db');

function create2(name) {
  return database.raw('INSERT INTO meals (name) VALUES (?) RETURNING *', [name])
}

module.exports = {
  create2: create2
}