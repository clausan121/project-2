// routes/auth-routes.js
const express = require("express");
const playlistRoutes = express.Router();

playlistRoutes.get("/", (req, res, next) => {
  res.render("playlist/index");
});











module.exports = playlistRoutes;