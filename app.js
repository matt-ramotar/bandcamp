const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');

// const indexRouter = require('./routes/api/index');
// const usersRouter = require('./routes/api/users');

const usersRouter = require('./routes/api/users');
const songsRouter = require('./routes/api/songs');
const pagesRouter = require('./routes/pages');
const artistsRouter = require('./routes/api/artists');

const { SSL_OP_NO_TICKET } = require('constants');
const { environment } = require('./config');
const { getUserFromToken } = require('./auth');

const app = express();

//const seedArtists = require('./spotify/spotifySeedData');
//console.log(seedArtists);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const token = req.cookies.token;
  console.log("I'm working, I'm checking the token")
  if (!token) return next();

  console.log("There's a token!")
  const user = await getUserFromToken(token, res);
  if (user) req.user = user;
  else res.clearCookie('token');
  next();
});

app.use('/public', express.static('public'));
app.use('/api/users', usersRouter);
app.use('/api/songs', songsRouter);
app.use('/api/artists', artistsRouter);
app.use('/', pagesRouter);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  if (!isProduction) console.log(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
