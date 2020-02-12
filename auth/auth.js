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
router.post('/login', (req, res) => {
    let {name, password} = req.body;
    db.findBy({name})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({message: 'Logged In'})
        } else {
            res.status(404).json({message: 'You shall not pass!'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'Could not login in user'})
    })
})

// //GET /api/users
router.get('/users', (req, res, next) => {
    db.getUsers()
    .then(user => {
        res.status(200).json({user})
    })
   .catch(err => {
       console.log(err)
    res.status(500).json({error: 'Error'})

   })
})
 


//middleware to verify credentials using bcrypt
function restricted(req, res, next) {
    const {name, password} = req.headers;
    if(name && password) {
        db.findBy({name})
        .first()
        .then( user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({message: 'You Shall Not Pass!'})
            }
        })
        .catch (err => {
            console.log(err)
            res.status(500).json({error: 'Error'})
        })
    } else {
        res.status(400).json({error: 'no credientials provided' })
    }
}

module.exports = router;