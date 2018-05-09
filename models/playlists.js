// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const playlistSchema = new Schema({
  emoji: String,
  songs: [],
  owner: String,
  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Playlist = mongoose.model("User", playlistSchema);

module.exports = Playlist;