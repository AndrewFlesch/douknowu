const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Entries = require('../../models/Entries');
const User = require('../../models/User');

// route GET entries
// desc  Test rout
// access Public

router.get('/', async (req, res) => {
  try {
    const entries = await Entries.find().populate('user', ['name','avatar']);
    res.json(entries);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Entries Get All Entries');
  }
});

// route GET one entry
// desc  Get one entry
// access Public

router.get('/view/:entry_id', async (req, res) => {
  try {
    const entries = await Entries.findOne({ _id: req.params.entry_id }).populate('user', ['name','avatar']);
    res.json(entries);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Entries Get One Entry');
  }
});

// route POST entries
// desc  create an entry
// access Private
router.post('/', [auth,
    [
      check('title', 'Title is required').not().isEmpty()
    ]
  ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//Destructure body from request
  const { title, start, end, description } = req.body;

//Build entries Object
 const entriesFields = {};
 //get user from request Token
 entriesFields.user = req.user.id;
  if (title) entriesFields.title = title;
  if (start) entriesFields.start = start;
  if (end) entriesFields.end = end;
  if (description) entriesFields.description = description;

  try {

    // create entry
    entries = new Entries(entriesFields);
    await entries.save();
    return res.json(entries);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Entries Post')
  }
});

// route POST entries
// desc  Edit an entry
// access Private
router.post('/edit/:entry_id', [auth,
    [
      check('title', 'Title is required').not().isEmpty()
    ]
  ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//Destructure body from request
  const { title, start, end, description } = req.body;

//Build entries Object
 const entriesFields = {};
 //get user from request Token
 entriesFields.user = req.user.id;
  if (title) entriesFields.title = title;
  if (start) entriesFields.start = start;
  if (end) entriesFields.end = end;
  if (description) entriesFields.description = description;

  try {

    //Try to find entry in database
        let entry = await Entries.findOne({ _id: req.params.entry_id })
    //if entry exists, update the entry.
        if (entry) {
          //update entry
          profile = await Entries.findOneAndUpdate(
            {_id: req.params.entry_id},
            {$set: entriesFields},
            {new: true}
          );

      return res.json(profile);;
}
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Entries Edit')
  }
});

// route DELETE an entry
// desc  deleting an entry
// access Private
router.delete('/delete/:entry_id', auth, async (req, res) => {
try{
  await Entries.findOneAndRemove({ _id: req.params.entry_id });
    res.json({ msg: 'Entry deleted '})

} catch(err) {
  console.error(err.message);
  res.status(500).send('Server Error Route API Profile Delete an Entry');
}
});

module.exports = router;
