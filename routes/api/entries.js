const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Entries = require('../../models/Entries');
const User = require('../../models/User');


/*

const typeAndDirection = (title) => {
    for (const property in typeDirectionData) {
      if (typeDirectionData[property].includes(title) === true) {
        return property
      }
    }
};

const titleSplit = (title) => {
  let allTypesReturned = '';
  let titleSplit = title.split(' ');
  titleSplit.forEach((title, i) => {
    console.log(title);
    let type = typeAndDirection(title);
    console.log(type);
    if (type) allTypesReturned += type + ","
  });
  return allTypesReturned;
}

const determineTypeAndDirection = (title) => {
  console.log(title);
  let allTypesReturned = titleSplit(title);
  console.log(allTypesReturned);
  if (allTypesReturned.includes('Emotions') === true) console.log('There is emotion');
}

*/

// route GET entries
// desc  Test rout
// access Public

router.get('/', async (req, res) => {
  try {
    const entries = await Entries.find().populate('user', ['name','avatar']);
    res.json(entries);
    } catch(err) {
    console.error(err);
    res.status(500).send('Server Error Route API Entries Get All Entries');
  }
});

// route GET entries of auth usere
// desc  Rout to get entries o auth users
// access Private

router.get('/me/:limit', auth, async (req, res) => {
  try {
    const entries = await Entries.find({ user: req.user.id }).sort({ start: -1}).limit(parseInt(req.params.limit));
    res.json(entries);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Entries Get All Entries by auth user');
  }
});

// route GET entries of auth usere that are open
// desc  Rout to get entries o auth users
// access Private

router.get('/me/open/:limit', auth, async (req, res) => {
  try {
    const entries = await Entries.find({ user: req.user.id, end: null }).sort({ start: -1}).limit(parseInt(req.params.limit));
    res.json(entries);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Entries Get All Entries by auth user');
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
  const { title, type, direction, start, end, description } = req.body;

//Build entries Object
 const entriesFields = {};
 //get user from request Token
 entriesFields.user = req.user.id;
  if (title) entriesFields.title = title;
  if (type) entriesFields.type = type;
  if (direction) entriesFields.direction = direction;
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
  const { title, type, direction, start, end, duration, description } = req.body;

//Build entries Object
 const entriesFields = {};
 //get user from request Token
 entriesFields.user = req.user.id;
  if (title) entriesFields.title = title;
  if (type) entriesFields.type = type;
  if (direction) entriesFields.direction = direction;
  if (start) entriesFields.start = start;
  if (end) entriesFields.end = end;
  if (duration >= 0) entriesFields.duration = duration;
  if (description) entriesFields.description = description;

  try {

    //Try to find entry in database
        let entry = await Entries.findOne({ _id: req.params.entry_id })
    //if entry exists, update the entry.
        if (entry) {
          //update entry
          entry = await Entries.findOneAndUpdate(
            {_id: req.params.entry_id},
            {$set: entriesFields},
            {new: true}
          );

      return res.json(entry);;
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
  let entryDelete = await Entries.findOneAndRemove({ _id: req.params.entry_id });
    res.json(entryDelete)

} catch(err) {
  console.error(err.message);
if (err.kind === 'ObjectId') {
  return res.status(404).json({ msg: 'Post not found' });
}
  res.status(500).send('Server Error Route API Profile Delete an Entry');
}
});

module.exports = router;
