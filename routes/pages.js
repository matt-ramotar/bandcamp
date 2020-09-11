// anything here is considered front-facing
// anything in the api folder is considered back-facing; the api endpoints should generally use
// res.

const express = require('express');
const router = express.Router();

const { restoreUser } = require('../auth');

const csrfProtection = require('csurf')({ cookie: true });

router.get('/', function (req, res, next) {
  res.render('index', { title: "It's Band Time!" });
});

<<<<<<< HEAD
router.get('/login', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/sign-up', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('sign-up', { csrf: req.csrfToken() });
});

router.get('/home', csrfProtection, (req, res) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  res.render('home', { firstName: req.user.firstName });
});

router.get('/songs', (req, res) => {
  res.render('songs', { title: 'Songs' });
});

// router.get('*', (req, res) => {
//   res.render('error');
=======
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

router.get('/users/survey', csrfProtection, (req, res) => {
    res.render("favorite-artists", { csrfToken: req.csrfToken() })
>>>>>>> bd4631b781980714fb0de3fba7234decc5c0ab41

//     if (!req.user) {
//         res.redirect("/login");
//         return;
//     }
//     res.render("home", { username: req.user.username, csrf: req.csrfToken() });
// });

<<<<<<< HEAD
// router.get('/users/survey', (req, res) => {
//     res.render("favorite-artists")

// })

=======
// router.get('*', (req, res) => {

//   res.render('error');

//   if (!req.user) {
//     res.redirect("/login");
//     return;
//   }
//   res.render("home", { username: req.user.username });

//     res.render('error');

//     if (!req.user) {
//         res.redirect("/login");
//         return;
//     }
//     res.render("home", { username: req.user.username });

// });


>>>>>>> bd4631b781980714fb0de3fba7234decc5c0ab41
module.exports = router;
