// routes/auth-routes.js
const express = require("express");
const songsRoutes = express.Router();
const Song = require("../models/song");
const SpotifyWebApi = require('spotify-web-api-node');


const spotifyApi = new SpotifyWebApi({
  clientId: 'b67eb82b3f7d481e9947e0608e36ca36',
  clientSecret: '42d6ddb76fc14eb8b238c989d91f7efd'
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving an access token',
      err.message
    );
  }
);

songsRoutes.get("/search", (req, res, next) => {

  
  
  res.render("songs/search");
});// end of song get






songsRoutes.post("/results", (req, res, next) => {
  spotifyApi.searchTracks(req.body.searchterm)
    .then((data) =>{
      const result = (data.body.tracks.items);
      const stuff = {}
      stuff.artist = result[0].artists[0].name;
      stuff.album = result[0].album.name;
      stuff.name = result[0].name;
      stuff.image = result[0].album.images[1].url;
      stuff.link =result[0].href;
      // res.json(stuff)
      res.render("songs/results", stuffh)
    })
    .catch ((err)=>{
      console.log(err);
    })
  
   

  // res.render("songs/results");


}); //end of song post




//Search tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright'
// spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar')
//   .then(function(data) {
//     console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });






module.exports = songsRoutes;