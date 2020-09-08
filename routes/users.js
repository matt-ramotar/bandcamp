const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/sign-up', csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken() });
});

router.post('/', asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = req.body;
  console.log(firstName, lastName, email, password);
  res.redirect('/');
}));

router.get('/login', (req, res) => {
  res.render('/login');
})


module.exports = router;
