'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const itineraries = new mongoose.Schema({
	userId: {type: String, required: true},
	name: {type: String, required: true },
	location: {type: String, required: true },
	dateStart: {type: String, required: true},
	dateEnd: {type: String, required: true},
	details: {type: String},
	image: {type: String}
});

module.exports = mongoose.model('itineraries', itineraries);