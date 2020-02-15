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
router.post('/login', restricted, (req, res) => {
    let {name, password} = req.body;
    db.findBy({name})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.user = true;
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
router.get('/users', restricted, (req, res, next) => {
    db.getUsers()
    .then(user => {
        res.status(200).json({user})
    })
   .catch(err => {
       console.log(err)
    res.status(500).json({error: 'Error'})

   })
})
 
router.delete('/logout', (req,res) => {
    if(req.session) {
        req.session.destroy((err) => {
            if(err) {
                res.status(400).send('Still logged in')
            } else {
                res.send('Logged out!')
            }
        });
    } else {
        res.end();
    }
})


//middleware to verify credentials using bcrypt
function restricted(req, res, next) {
   if(req.session && (req.session.user == true)) {
        next();
    } else {
        res.status(401).json({message: 'No Credentials Provided!'})
    }
   
}

module.exports = router;