const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler, handleValidationErrors } = require('./utils');

const bcrypt = require('bcryptjs');
const { getUserToken, requireAuth } = require('../auth');

const { User } = require('../db/models/');

const { userCreationValidators, loginValidators } = require('./validators');
const { validationResult } = require('express-validator')

// router.use(requireAuth);


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

  res.render('login');
})
)

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
