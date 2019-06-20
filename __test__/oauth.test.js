'use strict';

const server = require('../src/app.js').server;
const supergoose = require('./supergoose');
const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing Google OAuth', () => {

    test('Connects to Google OAuth', () => {

    })

});