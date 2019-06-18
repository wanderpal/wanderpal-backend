'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
  .then( (user) => {
    req.token = user.generateToken();
    req.user = user;
    res.set('token', req.token);
    res.cookie('auth', req.token);
    res.send(req.token);
  }).catch(next);
});

authRouter.post('/login', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  let loginData = [req.token, req.user];
  res.status(200).send(loginData);
});

authRouter.get('/oauth', (req,res,next) => {
  oauth(req)
    .then( token => {
      console.log('Successful oauth login');
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;