const express = require("express");
const router = express.Router();
const Attraction = require("../models/Attraction.model");

// Attraction Routes

//Route to add a new attraction
router.post("/api/attractions", (req, res) => {
  Attraction.create({
    title: req.body.title,
    city: req.body.city,
    typeOf: req.body.typeOf,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  })
    .then((createdAttraction) => {
      console.log("Attraction created ->", createdAttraction);
    })
    .catch((error) => {
      console.error("Error while creating the attraction ->", error);
      res.status(500).json({ error: "Failed to create the cohort" });
    });
});

//Route to get all attractions
router.get("/api/attractions", (req, res) => {
  Attraction.find({})
    .then((attractions) => {
      console.log("Retrieved attractions ->", attractions);
      res.status(200).json(attractions);
    })
    .catch((error) => {
      console.log("Error while retrieving attractions ->", error);
      res.status(500).json({ error: "Failed to retrieve attractions" });
    });
});

module.exports = router;
