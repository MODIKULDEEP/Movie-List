const express = require("express");
const router = express.Router();


const userRoutes = require("./user/userRoutes");
const authRoutes = require("./user/authRoutes");

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/auth", authRoutes);

module.exports = router;