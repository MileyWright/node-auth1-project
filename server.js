const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const Auth = require('./Auth/auth');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
    session({
        name: 'node-auth-project',
        secret: 'shh..this is a secret',
        httpOnly: true,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60,  // = 1 hours
            secure: false
        }
    })
)


server.use('/api', Auth);

module.exports = server;