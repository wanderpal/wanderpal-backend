"use strict";

const express = require("express");
const router = express.Router();
const Itineraries = require("../models/itineraries/itineraries-schema.js");
const ItinerariesModel = require("../models/itineraries/itineraries-model.js");

router.post("/create", (request, response) => {
  let itinerary = new Itineraries(request.body);
  itinerary.save()
    .then(itinerary => {
      console.log(`Itinerary '${itinerary.name}' created`);
      response.status(200).send(itinerary);
    });
});

router.get("/dashboard/:id", (request, response) => {
  let userId = request.userId;
  ItinerariesModel.getAll(userId)
    .then(result => {
      response.status(200).send(result);
    });
});

module.exports = router;