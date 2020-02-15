const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Auth = require('./Auth/auth');

const server = express();

server.use(express.json());
server.use('/api', Auth);
server.use(helmet);
server.use(cors());
module.exports = server;