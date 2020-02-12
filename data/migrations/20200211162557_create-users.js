
exports.up = function(knex) {
  return knex.schema
    .createTable('users',tbl => {
        tbl.increments()
        tbl.string('name', 126)
        tbl.string('password', 126)
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
