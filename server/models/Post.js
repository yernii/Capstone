const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("post", postSchema);
