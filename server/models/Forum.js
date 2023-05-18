const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  title: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  passcode: String,
});

module.exports = mongoose.model("Forum", forumSchema);
