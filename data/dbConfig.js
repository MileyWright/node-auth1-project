const knex  = require('knex')

const configOption = require('../knexfile').development;

const db = knex(configOption);

module.exports = db;