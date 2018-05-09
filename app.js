require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcrypt");

// var SpotifyWebApi = require('spotify-web-api-node');
 
// var spotifyApi = new SpotifyWebApi({
//   clientId: 'b67eb82b3f7d481e9947e0608e36ca36',
//   clientSecret: '42d6ddb76fc14eb8b238c989d91f7efd',
// });

// spotifyApi.setAccessToken('BQBOToLqPW1dR5yvxpRsnpMmxVtdBVDiZpezHkkYGY4yzjCIU_4XcTbqhMQIGGZ1-OSyX4XLnwGSAJs-UKw');
 

//   spotifyApi.searchTracks('Love')
//   .then(function(data) {
//     console.log('Search by "Love"', data.body);
//   }, function(err) {
//     console.error(err);
//   });



mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGOURI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//passport config area
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));


// default value for title local
app.locals.title = '🐵 MOJOMOJI';

app.use(passport.initialize());
app.use(passport.session());


const playlist = require('./routes/playlist-Routes');
app.use('/', playlist);
const authRoutes = require("./routes/auth-Routes");
app.use('/', authRoutes);
const songs = require("./routes/songs-Routes");
app.use('/', songs);





module.exports = app;
