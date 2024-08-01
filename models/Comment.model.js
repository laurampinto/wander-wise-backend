const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attraction: {
    type: Schema.Types.ObjectId,
    ref: "Attraction",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
