// routes/auth-routes.js
const express = require("express");
const songsRoutes = express.Router();


songsRoutes.get("/search", (req, res, next) => {
  res.render("songs/search");
});









module.exports = songsRoutes;