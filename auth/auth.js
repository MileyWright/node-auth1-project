const express = require('express');

const bcrypt = require('bcrypt');

const db = require('./auth-modals');

const router = express.Router();

// //POST /api/register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;
    db.add(user)
    .then(user => {
        res.status(201).json(`Posted ${user}`)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Could not register user'})
    })
})

// // POST /api/login
// router.post('/login', (req, res) => {

// })

// //GET /api/users
// router.get('/users', (req, res) => {

// })


//middleware to verify credentials using bcrypt


module.exports = router;