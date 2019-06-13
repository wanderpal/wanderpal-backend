'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');
//console.log(authRouter);
// authRouter.get('/hello', (req, res, next) => {
//     res.status(200).send('hello');
// });
authRouter.post('/signup', (req, res, next) => {
    console.log('req.body', '========================================');
    let user = new User(req.body);
    console.log(req.body);
    console.log(user);
    user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req,res,next) => {
  oauth(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;