'use strict';

const days = require('./days-model');
const mongoose = require('mongoose');

const events = new mongoose.Schema({
    eventName: {type: String, required: true, unique: true},
    eventLocation: {type: String, required: true, unique: true},
    eventDate: {type: String, required: true},
    eventDetails: {type: String, required: true},
});


modules.exports = mongoose.model('events', events);