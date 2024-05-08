const express = require("express");
const {
  movieCreate,
  movieUpdate,
  getAllMovies,
  deleteMovie,
} = require("../../controller/movie/movieController");
const { imageUpload } = require("../../middleware/imageUpload");
const { isAuthenticatedUser } = require("../../middleware/auth");
const router = express.Router();

router.post("/create", isAuthenticatedUser, imageUpload, movieCreate);
router.post("/update", isAuthenticatedUser, imageUpload, movieUpdate);
router.get("/getUsers", getAllMovies);
router.delete("/delete", isAuthenticatedUser, deleteMovie);
module.exports = router;
