
exports.up = function(knex) {
  return knex.schema
    .createTable('users',tbl => {
        tbl.increments()
        tbl.string('name', 126).notNullable()
        tbl.string('password', 126).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
