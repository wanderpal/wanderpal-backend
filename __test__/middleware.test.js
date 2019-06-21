'use strict';

const supergoose = require('./supergoose');
// const jwt = require('jsonwebtoken');
const auth = require('../src/auth/middleware');


const server = require('../src/app.js').server;
const mockRequest = supergoose.server(server);

//Turning on and off database
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('testing 404 and errors in Middleware', () => {

    let user = {email: 'email', password: 'password'};

    let errorMessage = {status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'};


    test('testing for 401', () => {
        let request =  {
            headers: {
                authorization: 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ',
            },
        };

        let response = {};

        let next = jest.fn();

        let middleware = auth;

        return middleware(request, response, next)
            .then(() => {
                expect(next).toHaveBeenCalledWith(errorMessage);
            })
    });

    test('testing for 404', () => {
        return mockRequest.post('/signon')
            .send(user)
            .then(result => {
                expect(result.error).toBe("[Error: cannot POST /signon (404)]");
                expect(result.statusCode).toEqual(404);
            });
    });



    // test('500 testing', () => {
    //     //NEEDS WORK
    //     return mockRequest.post('/login')
    //         .send({email: 'emal', password: 'password'})
    //         .then(result => {
    //             console.log('500 results', result);
    //             expect(result.text).toBe("{\"error\":{}}");
    //             expect(result.statusCode).toEqual(500);
    //         });
    // });

});