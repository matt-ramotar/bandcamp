const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');

const { User: User, Artist, ReactionType, UserReaction } = require('../db/models');
const bcrypt = require('bcryptjs');




const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      debugger;
      return true;
    })
];

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/sign-up', csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken() });
});

router.post('/', userValidators, csrfProtection, asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = req.body;
  const validatorErrors = validationResult(req);
  console.log(validatorErrors)
  if (validatorErrors.isEmpty()) {
    console.log(
      firstName,
      lastName,
      email,
      password,
      confirmPassword)
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({
      email,
      firstName,
      lastName,
      hashedPassword
    })
    // user.hashedPassword = hashedPassword;
    // await user.save();
    // loginUser(req, res, user);
    res.redirect('/artists');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('sign-up', {
      title: 'Register',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }

  res.redirect('/');
}));

router.get('/login', (req, res) => {
  res.render('login');
})


module.exports = router;
