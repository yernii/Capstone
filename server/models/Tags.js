const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  TagName: String,
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
});

module.exports = mongoose.model("Tag", TagSchema);
