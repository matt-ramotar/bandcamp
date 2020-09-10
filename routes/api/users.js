const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler, handleValidationErrors } = require('./utils');

const { User, Artist, Reactiontype } = require('../../db/models');
const reactiontype = require('../../db/models/reactiontype');
const bcrypt = require('bcryptjs');
const { getUserToken, requireAuth } = require('../../auth');


const { userCreationValidators, loginValidators } = require('./validators');
const { validationResult, check } = require('express-validator')

// router.use(requireAuth);



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


router.post('/', userCreationValidators, handleValidationErrors, csrfProtection,
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body;

    console.log(
      firstName,
      lastName,
      email,
      password,
      confirmPassword)

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      firstName,
      lastName,
      hashedPassword
    })
    // user.hashedPassword = hashedPassword;
    // await user.save();
    // loginUser(req, res, user);
    // const token = getUserToken(user);
    res.render('login', {
      // user: { id: user.id },
      // token
    });
  }));

router.get('/login', loginValidators, asyncHandler(async (req, res) => {

  // if (req.user) {
  //   const { user, token } = req;
  //   console.log(user, token)
  //   res.redirect('/users/home', { user, token });
  // }

  res.redirect('/artists');
}));

router.post('/login', loginValidators, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);
  console.log(validatorErrors)
  if (validatorErrors.isEmpty()) {
    // Attempt to get the user by their email address.
    const user = await User.findOne({ where: { email: email } });
    console.log(user)

    if (user !== null) {
      // If the user exists then compare their password
      // to the provided password.
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        // loginUser(req, res, user);
        res.render('home', { firstName: user.firstName });

      }
    }
    errors.push('Login failed for the provided email address and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
    console.log("Error: password incorrect")
  }
}))

router.get('/home', (req, res) => {

  res.render('login', { title: "You're IN!" });
})



module.exports = router;
