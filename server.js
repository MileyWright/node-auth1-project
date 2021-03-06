const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSession = require('connect-session-knex')(session);
const Auth = require('./Auth/auth');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
    session({
        name: 'node-auth-project',
        secret: 'shh..this is a secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60,  // = 1 hours
            httpOnly: true,
            secure: false
        },
        store: new knexSession({
            knex: require('./data/dbConfig'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 1000 * 60 * 60
        })
    })   
)

// server.use('/', (req, res) => {
//     res.send(`<h1>Up and Running</h1>`)
// })
server.use('/api', Auth);

module.exports = server;