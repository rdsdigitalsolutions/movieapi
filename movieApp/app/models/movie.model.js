const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
  })
);

module.exports = Movie;
