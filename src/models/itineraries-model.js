'use strict';

const mongoose = require('mongoose');

const itineraries = new mongoose.Schema({
    itineraryName: {type: String, required: true, unique: true},
    itineraryLocation: {type: String, required: true, unique: true},
    itineraryDateStart: {type: String, required: true},
    itineraryDateEnd: {type: String, required: true},
    itineraryDetails: {type: String, required: true},
});


modules.exports = mongoose.model('itineraries', itineraries);
