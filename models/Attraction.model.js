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
    enum: ["Park", "Museum", "Landscape", "Monument"],
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
});

const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = Attraction;
