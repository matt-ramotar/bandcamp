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

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  if (req.user) {
    res.redirect("/home");
    return;
  }
  res.render("sign-up");
});

router.get('/home', (req, res) => {

  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("home", { firstName: req.user.firstName, user: req.user });
});
router.get('/navbar', (req, res) => {

  res.render("navbar");
});
router.get('/users/survey', (req, res) => {
  res.render("favorite-artists")

})

// router.get('*', (req, res) => {
//   res.render('error');

//   if (!req.user) {
//     res.redirect("/login");
//     return;
//   }
//   res.render("home", { username: req.user.username });
// });


module.exports = router;
