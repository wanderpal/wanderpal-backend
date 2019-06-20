'use strict';

const users = require('./users-model');
const mongoose = require('mongoose');


const itineraries = new mongoose.Schema({
    itineraryName: {type: String, required: true, unique: true},
    itineraryLocation: {type: String, required: true, unique: true},
    itineraryDateStart: {type: String, required: true},
    itineraryDateEnd: {type: String, required: true},
    itineraryDetails: {type: String, required: true},
});

itineraries.virtual('userItineraries', {
    ref: 'users',
    localField: 'user',
    foreignField: 'itineraryName',
    justOne: true,
});

itineraries.pre('find', function () {
    try {
        this.populate('userItineraries');
    } catch(e) {console.error('find error', e);}

});


modules.exports = mongoose.model('itineraries', itineraries);
