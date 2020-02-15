const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const Auth = require('./Auth/auth');

const server = express();

server.use(
    session({
        name: 'node-auth-project',
        secret: 'shh..this is a secret',
        httpOnly: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,  // = 1 hours
            secure: false
        }
    })
)

server.use(express.json());
server.use('/api', Auth);
server.use(helmet);
server.use(cors());
module.exports = server;