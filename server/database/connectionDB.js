const mongoose = require("mongoose");

const connectionDB = () => {
  mongoose
    .connect(
      "mongodb+srv://Yerni:Yerni@cluster0.svyv1.mongodb.net/AcademiaNet?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};

module.exports = connectionDB;
