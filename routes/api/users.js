const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')

// route Post users
// desc Register user
// access Public

router.post('/',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please add valid email').isEmail(),
      check('password', 'Password is required').not().isEmpty()
    ],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

// Destructure req.body
const { name, email, password } = req.body;

try {

// See if user exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      errors: [
        { msg: 'User already exists' }
      ]
    });
  }

// Get users gravatar
const avatar = gravatar.url(email, {
  s: '200',
  r: 'pg',
  d: 'mm'
})

// Create instance of user object
user = new User({
  name,
  email,
  avatar,
  password
});

// Encrpt password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt);

//Save user to Database
  await user.save();

// Return jsonwebtoken
  console.log(req.body);
  res.send('User Registered');

} catch(err) {
  console.error(err.message);
  res.status(500).send('Server error');
}



});

module.exports = router;