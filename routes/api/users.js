const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');


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


// route Put users
// desc modify existing user
// access Private

router.put('/', auth,
async (req, res) => {

// Destructure req.body
const { name, email, password } = req.body;

try {

// See if user exists
  let user = await User.findById(req.user.id);
  if (user) {
    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

 //Check if user updated password

    if (password) {
      // Encrpt password
        const salt = await bcrypt.genSalt(10)
        let encryptPassword = await bcrypt.hash(password, salt);

      //update user in Database
      user = await User.findByIdAndUpdate(
        req.user.id,
        {
        name: name,
        email: email,
        password: encryptPassword
        }
      );

      console.log('user updated with password');
      res.status(200).send('User updated including password');

    } else {
      //update user in Database
      user = await User.findByIdAndUpdate(
        req.user.id,
        {
        name: name,
        email: email,
        }
      );

      console.log('user updated');
      res.status(200).send('User  updated');
    }
    };
} catch(err) {
  console.error(err);
  res.status(500).send('Server error');
}

});


module.exports = router;
