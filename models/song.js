// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const songSchema = new Schema({
  title: String,
  preview: String,
  artist: String,
  album: String,
  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;