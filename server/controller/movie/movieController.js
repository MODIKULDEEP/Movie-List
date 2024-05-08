const ErrorHandler = require("../../utils/errorHandler");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const Movie = require("../../models/movieModel");

exports.movieCreate = asyncErrorHandler(async (req, res, next) => {
  const { movieName, description } = req.body;
  const movie_photo = req.imagePath || null;
  // Validation: Check if required fields are provided
  if (!movieName || !description) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Create the new movie
  const newMovie = new Movie({
    movieName,
    description,
    movie_photo,
  });

  // Save the new movie to the database
  const savedMovie = await newMovie.save();
  res.status(201).json({
    success: true,
    message: "Movie created successfully",
    movie: savedMovie,
  });
});

exports.movieUpdate = asyncErrorHandler(async (req, res, next) => {
  const { id, movieName, description } = req.body;
  const movie_photo = req.imagePath || null;

  // Validation: Check if required fields are provided
  if (!id || !movieName || !description) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Find the movie by ID and update their data
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    {
      movieName,
      description,
      movie_photo,
    },
    { new: true }
  );

  // Check if the movie was found and updated
  if (!updatedMovie) {
    return next(new ErrorHandler(404, "Movie not found"));
  }

  res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    movie: updatedMovie,
  });
});

exports.getAllMovies = asyncErrorHandler(async (req, res, next) => {
    const movies = await Movie.find();
    res.status(200).json({ success: true, movies });
});

exports.deleteMovie = asyncErrorHandler(async (req, res, next) => {
  // Retrieve movie ID from request query parameters
  const movieId = req.query.id;

  // Validate movie ID
  if (!movieId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide movie ID" });
  }

  // Find the movie by ID and delete it
  const movie = await Movie.findByIdAndDelete(movieId);

  // Check if the movie was found and deleted
  if (!movie) {
    return res.status(404).json({ success: false, message: "movie not found" });
  }

  res.status(200).json({ success: true, message: "Movie deleted successfully" });
});
