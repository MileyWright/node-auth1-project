const db = require('../data/dbConfig');

module.exports = {
   add,
   findBy,
   getUsers 
}

function add(user) {
    return db('users')
        .insert(user)
}

function findBy(filter) {
    return db('users')
        .select('id', 'name', 'password')
        .where(filter)
}

function getUsers() {
    return db('users')
}