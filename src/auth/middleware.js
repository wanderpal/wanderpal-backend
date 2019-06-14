'use strict';

// const User = require('../models/users-model.js');

module.exports = (request, response, next) => {

  try {
    console.log(request.headers);
    let [authType, authString] = request.headers.authorization.split(' ');
    console.log(authType, '==================',authString, '===========================================');
    switch(authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      default:
        console.log('=================DEFAULT===========================');
        return _authError();
    }

  } catch(e) {
    console.log('=========================CATCH22=====================');
    return _authError();
  }

  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
    let auth = {username,password};  // {username:"john", password:"mysecret"}

    return User.authenticateBasic(auth)
      .then( user => _authenticate(user) );
  }

  function _authenticate(user) {
    if ( user ) {
      request.user = user;
      request.token = user.generateToken();
      next();
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};
