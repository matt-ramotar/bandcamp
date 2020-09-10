// anything here is considered front-facing
// anything in the api folder is considered back-facing; the api endpoints should generally use
// res.


const express = require('express');
const router = express.Router();

const { restoreUser } = require('../auth');

const csrfProtection = require("csurf")({ cookie: true });

router.get('/', function (req, res, next) {
  res.render('index', { title: 'It\'s Band Time!' });
});

router.get('/login', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/sign-up', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect("/home");
    return;
  }
  res.render("sign-up", { csrf: req.csrfToken() });
});

router.get('/home', csrfProtection, (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("home", { username: req.user.username, csrf: req.csrfToken() });
});

router.get('*', (req, res) => {
  res.render('error');
})

module.exports = router;
