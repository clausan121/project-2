// routes/auth-routes.js
const express = require("express");
const playlistRoutes = express.Router();
const Playlist = require('../models/playlists')
const Song = require('../models/song')
const SpotifyWebApi = require('spotify-web-api-node');


const spotifyApi = new SpotifyWebApi({
  clientId:'b67eb82b3f7d481e9947e0608e36ca36',
  clientSecret:'42d6ddb76fc14eb8b238c989d91f7efd',
  redirectUri: 'http://localhost:3000/spotify/callback'
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



playlistRoutes.get("/", (req, res, next) => {
  res.render("playlist/index");
});




playlistRoutes.post("/", (req, res, next) => {

  


}); //end of song post









module.exports = playlistRoutes;