const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const attractionSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  typeOf: {
    type: String,
    required: true,
    enum: ["Park", "Museum", "Landscape"],
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = Attraction;
