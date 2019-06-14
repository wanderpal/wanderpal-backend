'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    email: {type: String},
    role: {type: String, default:'user', enum: ['admin','editor','user']},
});

users.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(console.error);
});
//this is for when the user doesn't have or want to use their google sign in
users.statics.authenticateBasic = function(auth) {
    let query = {username:auth.username};
    return this.findOne(query)
        .then( user => user && user.comparePassword(auth.password) )
        .catch(error => {throw error;});
};
//obvious
users.methods.comparePassword = function(password) {
    return bcrypt.compare( password, this.password )
        .then( valid => valid ? this : null);
};
//for when the user gets their JWT from google
users.statics.createFromOauth = function(email) {

    console.log('creating from oauth')

    if(! email) { return Promise.reject('Validation Error'); }

    return this.findOne( {email} )
        .then(user => {
            if( !user ) { throw new Error('User Not Found'); }
            console.log('Welcome Back', user.username);
            return user;
        })
        .catch( error => {
            console.log('Creating new user');
            let username = email;
            let password = 'none';
            return this.create({username, password, email});
        });

};
//obvious
users.methods.generateToken = function() {
    let token = {
        id: this._id,
        role: this.role,
    };
    return jwt.sign(token, process.env.SECRET || 'babyshark');
};

module.exports = mongoose.model('users', users);