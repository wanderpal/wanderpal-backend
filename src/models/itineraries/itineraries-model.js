'use strict';

const Model = require('../mongo-model.js');
const schema = require('./itineraries-schema.js');

class Itineraries extends Model {}

module.exports = new Itineraries(schema);
