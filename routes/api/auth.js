const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// route GET auth
// desc  Test rout
// access Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

);

// route Post auth
// desc Login user
// access Public

router.post('/',
    [
      check('email', 'Please add valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

// Destructure req.body
const { email, password } = req.body;

try {

// See if user exists
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      errors: [
        { msg: 'Incorrect Email or Password' }
      ]
    });
  }

//Check Password
const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch) {
  return res.status(400).json({
    errors: [
      { msg: 'Incorrect Email or Password' }
    ]
  });
}

// Return jsonwebtoken
  const payload = {
    user: {
      id: user.id
    }
  }

  jwt.sign(payload, config.get('jwtSecret'),
  { expiresIn: 360000 },
  (err, token) => {
    if(err) throw err;
    res.json({ token });
  });

} catch(err) {
  console.error(err.message);
  res.status(500).send('Server error');
}

});

module.exports = router;
