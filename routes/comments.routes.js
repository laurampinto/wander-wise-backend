const express = require("express");
const router = express.Router();
const Attraction = require("../models/Attraction.model");
const Comment = require("../models/Comment.model");

// Comment Routes

// Route to add a new comment
router.post("/", (req, res, next) => {
  const { userId, attractionId, content } = req.body;

  if (mongoose.Types.ObjectId.isValid(attractionId) === false) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.create({ user: userId, attraction: attractionId, content: content })
    .then((createdComment) => {
      return Attraction.findByIdAndUpdate(
        attractionId,
        { $push: { comments: createdComment._id } },
        { new: true }
      );
    })
    .then((updatedAttraction) => {
      res.status(201).json(updatedAttraction);
    });
});

module.exports = router;
