
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'User1', password: 'password 1'},
        {id: 2, name: 'User2', password: 'password 2'}
      ]);
    });
};
