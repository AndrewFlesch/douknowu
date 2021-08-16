const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// route GET getting all profiles
// desc  getting all profiles
// access Public
router.get('', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name','avatar']);
    res.json(profiles);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Profile Get All Profiles');
  }
});

// route GET profile/me
// desc  getting user profile of logged in user
// access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile)

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Profile Get Profile')
  }
});

// route GET profile/user/:user_id
// desc  getting individual user profile
// access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile)

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Profile Get Profile')
  }
});

// route POST profile
// desc  create or edit a profile
// access Private
router.post('/', [auth,
    [
      check('birth', 'Birth Date is required').not().isEmpty()
    ]
  ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//Destructure body from request
  const { birth, zip, country, city, gender, height, weight, ethnicityandrace, industry, area, jobtitle} = req.body;

//Build profile Object
 const profileFields = {};
 //get user from request Token
 profileFields.user = req.user.id;
  if (birth) profileFields.birth = birth;
  if (country) profileFields.country = country;
  if (zip) profileFields.zip = zip;
  if (city) profileFields.city = city;
  if (gender) profileFields.gender = gender;
  if (height) profileFields.height = height;
  if (weight) profileFields.weight = weight;
  if (ethnicityandrace) profileFields.ethnicityandrace = ethnicityandrace;
  if (industry) profileFields.industry = industry;
  if (area) profileFields.area = area;
  if (jobtitle) profileFields.jobtitle = jobtitle;

  try {
//Try to find profile in database
    let profile = await Profile.findOne({ user: req.user.id });
//if profiel exists, update the profile.
    if (profile) {
      //update profileFields
      profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      );

      return res.json(profile);
    }

    // create
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Profile Post')
  }
});

// route DELETE a profile and user
// desc  deleting a profile, user and posts
// access Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await Profile.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User and profile deleted '})

    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Profile Delete a User and Profile');
  }
});

module.exports = router;
