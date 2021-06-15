
// const express = require('express');

const router = require('express').Router();
const { Users } = require('../../models');
const connection = require('../../config/connection-mysql')

const db = require("../../db");
const { sum } = require('../../models/users');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Users.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // GET /api/users/1
router.get('/:id', (req, res) => {
    Users.findOne({
        attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })
  // POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    Users.create({
      userName: req.body.userName,
      passwords: req.body.passwords
    })
      .then(dbUserData =>{
        req.session.save(() => {
          req.session.user_id=dbUserData.id;
          console.log(req.session.user.id);
          req.session.userName=dbUserData.userName;
          req.session.loggedIn= true;

          res.json(dbUserData);
        });
      });
  });
  router.post('/login', (req, res) => {
    Users.findOne({
      where: {
        userName: req.body.userName
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.passwords);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

      req.session.save(() => {
        req.session.user_id=dbUserData.id;
        req.session.userName=dbUserData.userName;
        req.session.loggedIn= true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });
  
 
  // PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Users.update(req.body, {
        individualHooks:true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.delete('/:id', (req, res) => {
    Users.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });
  
  

// // check for existing username for create account
// router.get("/usernamecheck", (req, res) => {
//     let userName = 'user1'
//     connection.query(db.searchUserName(userName), userName, (err, results)=> {
//     })
// })

// // post new userName
// router.post("/newuser", (req, res) => {
//     Users.create({
//         userName: req.body.userName,
//         passwords: req.body.passwords
//     }).then(submittedUser => {res.json(submittedUser)})
// })

// router.get("/username", (req, res) => {
//     Users.findAll({
//         where: {userName: req.body.userName}
//     }).then(checkUser => {
//         if(checkUser[0]===undefined){
//             Users.create({
//                 userName: req.body.userName,
//                 passwords: req.body.passwords
//             }).then(submittedUser => (res.json(submittedUser)))
//         } else {
//             res.status(404).json({message: "User already exists"});
//             return;
//         }
//     })
// })


module.exports = router;