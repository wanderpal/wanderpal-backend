"use strict";

const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require("fs");
const path = require("path");
const Itineraries = require("../models/itineraries/itineraries-schema.js");
const ItinerariesModel = require("../models/itineraries/itineraries-model.js");

router.post("/create", (request, response) => {
  console.log(request.body, request.file);
  let form = new formidable.IncomingForm();

  form.on('fileBegin', (name, file) => {
    file.path = path.join(__dirname, '../../public/temp/',file.name);
  });
  form.parse(request, (err, fields, file) => {
    if (err) {
      console.error('Error', err)
      throw err
    }

    let itinerary = new Itineraries(fields);

    itinerary.save()
      .then(itinerary => {
        console.log(`Itinerary '${itinerary.name}' created`);
        response.status(200).send(itinerary);
      });
  })


});

router.get("/dashboard/:id", (request, response) => {
  let userId = request.userId;
  ItinerariesModel.getAll(userId)
    .then(result => {
      response.status(200).send(result);
    });
});

router.put("/itineraries/:id", (request, response) => {
  let record = request.body;
  let id = request.param.id;

  ItinerariesModel.put(id, record)
    .then(itinerary => {
      console.log(`Itinerary '${itinerary.name}' updated`);
      response.status(200).send(itinerary);
    });
});

router.delete("/itineraries/:id", (request, response) => {
  let itineraryID = request.params.id;
  ItinerariesModel.delete(itineraryID)
    .then(() => {
      response.status(200);
    });
});

module.exports = router;