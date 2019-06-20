'use strict';

const server = require('../src/app.js').server;
const supergoose = require('./supergoose');
const jwt = require('jsonwebtoken');
const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing /login and /signup', () => {

    let user = {email: 'email', password: 'password'};

    let encodeToken;
    let id;

    test('/signup', () => {
        return mockRequest.post('/signup')
            .send(user)
            .then(results => {
                let token = jwt.verify(results.text, process.env.SECRET || 'test');
                console.log(token);
                id = token.id;
                encodeToken = results.text;
                expect(id).toBeTruthy();
            })
    });

    test('/login', () => {
        return mockRequest.post('/login')
            .auth(user.email, user.password)
            .then(() => {
                let token = jwt.verify(encodeToken, process.env.SECRET || 'test');
                expect(token.id).toEqual(id);
            })
    })
});