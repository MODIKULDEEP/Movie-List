const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    movie_photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel;
