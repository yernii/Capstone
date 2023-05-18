const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  date: { type: Date, format: "yyyy-mm-dd" },
  count: { type: Number },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  occupation: {
    type: String,
    enum: ["professor", "student"],
  },
  DoB: Date,
  university: String,
  forums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forum",
    },
  ],
  contributionHistory: [contributionSchema],
});

module.exports = mongoose.model("User", userSchema);
