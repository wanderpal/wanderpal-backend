'use strict';

const express = require('express');
const router = express.Router();
const Itineraries = require('../models/itineraries/itineraries-schema.js');
const ItinerariesModel = require('../models/itineraries/itineraries-model.js');
const auth = require('../auth/middleware.js');

router.post('/create', (request, response) => {
  let itinerary = new Itineraries(request.body);
  itinerary.save()
    .then(itinerary => {
      console.log(`Itinerary '${itinerary.name}' created`);
      response.status(200).send(itinerary);
    });
});

router.get('/dashboard', (request, response) => {
  let userId = request.userId;
  ItinerariesModel.getAll({ userId: userId })
    .then(result => {
      console.log(request.user);
      response.status(200).send(result);
    })
});

module.exports = router;