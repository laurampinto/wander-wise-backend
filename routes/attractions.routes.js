const express = require("express");
const router = express.Router();
const Attraction = require("../models/Attraction.model");
const Comment = require("../models/Comment.model");
const { default: mongoose } = require("mongoose");

// Attraction Routes

// Route to add a new attraction
router.post("/", (req, res, next) => {
  Attraction.create({
    title: req.body.title,
    city: req.body.city,
    typeOf: req.body.typeOf,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    comment: [],
  })
    .then((createdAttraction) => {
      res.json(createdAttraction);
      console.log("Attraction created ->", createdAttraction);
    })
    .catch((err) => {
      console.error("Error while creating the attraction ->", err);
      next(err);
    });
});


//Route to get all attractions
router.get("/", (req, res, next) => {
  Attraction.find()
    .populate("comments")
    .then((allAttractions) => {
      res.json(allAttractions);
    })
    .catch((err) => {
      console.log("Error while retrieving attractions ->", err);
      next(err);
    });
});

// Route to get one attraction by its Id
router.get("/:attactionId", (req, res, next) => {
  const attractionId = req.params.attactionId;

  if (mongoose.Types.ObjectId.isValid(attractionId) === false) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Attraction.findById(attractionId)
    .populate("comments")
    .then((oneAttraction) => {
      res.json(oneAttraction);
    })
    .catch((err) => {
      next(err);
    });
});

// Route to update a specific attraction by Id
router.put("/:attractionId", (req, res, next) => {
  const attractionId = req.params.attractionId;

  if (mongoose.Types.ObjectId.isValid(attractionId) === false) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  const { title, city, typeOf, description, imageUrl } = req.body;

  Attraction.findByIdAndUpdate(
    attractionId,
    {
      title: title,
      city: city,
      typeOf: typeOf,
      description: description,
      imageUrl: imageUrl,
    },
    { new: true }
  )
    .then((updatedAttraction) => {
      res.json(updatedAttraction);
    })
    .catch((err) => {
      next(err);
    });
});

// Route to delete a specific attraction by Id
router.delete("/:attractionId", (req, res, next) => {
  const attactionId = req.params.attractionId;

  if (mongoose.Types.ObjectId.isValid(attactionId) === false) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Attraction.findByIdAndDelete(attactionId)
    .then((deletedAttraction) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
