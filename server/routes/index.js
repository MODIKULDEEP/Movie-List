const express = require("express");
const router = express.Router();

const userRoutes = require("./user/userRoutes");
const authRoutes = require("./user/authRoutes");
const movieRoutes = require("./movie/movieRouts");

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/movie", movieRoutes);

module.exports = router;
