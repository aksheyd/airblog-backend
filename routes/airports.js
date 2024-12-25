var express = require('express');
var router = express.Router();
var { getContainer } = require('../database/database');
const crypto = require("crypto");

function correct(Airport) {
  if (Airport.id) {

    if (Airport.iata && Airport.iata.length == 3 && Airport.iata == Airport.iata.toUpperCase()) {

      if (Airport.coordinates && Airport.coordinates.longitude && Airport.coordinates.latitude) {

        if (Airport.terminals && Airport.terminals.length > 0) {

          if (Airport.name && Airport.name.length > 0) {

            return true;
          }
        }
      }
    }
    return false;
  }
}

  /* GET users listing. */
  router.get('/', async function (req, res, next) {
    try {
      const container = await getContainer();
      const { resources } = await container.items.readAll().fetchAll();
      res.json(resources);
    } catch (error) {
      console.error("Error fetching items:", error.message);
      res.status(500).send("Error fetching items");
    }
  });

  router.post('/', async function (req, res, next) {
    try {
      const container = await getContainer();
      if (req.headers['content-type'] != 'application/json') {
        res.status(400).send("Invalid Content-Type, please set to application/json");
        return;
      }

      let newAirport = req.body;
      newAirport.id = crypto.randomUUID();

      if (correct(newAirport)) {
        const { resource } = await container.items.create(newAirport);
        res.status(201).json(resource); // Return the created item
      }
      else {
        console.log(newAirport)
        res.status(400).send("Invalid data");
      }
    } catch (error) {
      console.error("Error creating item:", error.message);
      res.status(500).send("Error creating item");
    }
  });

  module.exports = router;
