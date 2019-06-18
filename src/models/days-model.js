'use strict';

const mongoose = require('mongoose');

const days = new mongoose.Schema({
    weekdayName: {type: String, required: true, unique: true},
    eventDate: {type: String, required: true},
});


modules.exports = mongoose.model('days', days);