// routes/auth-routes.js
const express = require("express");
const playlistRoutes = express.Router();
const Playlist = require('../models/playlists')
const Song = require('../models/song')




playlistRoutes.get('/', (req, res, next) => {
  Playlist.find()
  .then((allThePlaylists)=>{
    res.render('playlist/index', {playlists:allThePlaylists});

  })

});


playlistRoutes.get("/playlist/new", (req, res, next) => {
  res.render("playlist/new");
});




playlistRoutes.post("/playlist/create", (req, res, next) => {
  Playlist.create({
    emoji: req.body.emoji,
    owner:req.user._id
  })
  .then ((y)=>{
    res.redirect ("/")
  })

}); //end of song post


playlistRoutes.post("/song/add", (req, res, next) => {
  console.log("=====================================================")
console.log(req.body)
Song.create({
  title:req.body.song,
  preview: req.body.preview,
  artist: req.body.artist,
  album: req.body.album,
  emoji:req.body.emoji
})
.then ((theSong)=>{
Playlist.findOne({emoji: req.body.emoji})
.then ((thePlaylist)=>{
  thePlaylist.songs.push(theSong._id)
  thePlaylist.save()
  .then(()=>{
    res.redirect("/")
  })
})

})
});

playlistRoutes.get("/playlist/:id", (req, res, next) => {
  const songsArray = []
  Playlist.findById(req.params.id)
  .then((thePlaylist)=>{
    thePlaylist.songs.forEach((songID)=>{
      Song.findById(songID)
      .then((song)=>{
        songsArray.push(song)
        console.log("+++++++++++++", songsArray.length)
        if(songsArray.length === thePlaylist.songs.length){
          res.render("playlist/details", {playlist:thePlaylist, songs:songsArray})
        }
      })
    })

  })
}); 






module.exports = playlistRoutes;