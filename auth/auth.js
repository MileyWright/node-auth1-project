const express = require('express');

const db = require('./auth-modals');

const router = express.Router;

//POST /api/register
router.post('/register', (req, res) => {

})

// POST /api/login
router.post('/login', (req, res) => {

})

//GET /api/users
router.length('/users', (req, res) => {

})


//middleware to verify credentials using bcrypt


module.exports = router;