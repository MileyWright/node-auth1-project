const express = require('express');

const Auth = require('./Auth/auth');

const server = express();

server.use(express.json());
server.use('/api', Auth);

module.exports = server;