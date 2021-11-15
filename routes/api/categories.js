const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Categories = require('../../models/Categories');
const User = require('../../models/User');

// route GET categories
// desc  Test rout
// access Public

function mustNotExist (existing, add) {
    if (existing === undefined) existing = '';
    let newArray = add.split(',');
    newArray.forEach((newItem, index) => {
      console.log(newItem);
    if (existing) {
      let trimNewItem = newItem.trim();
      if (existing.includes(trimNewItem) === false) {
        existing += "," + newItem
      }}
      else {
      existing += newItem
    }})
    return existing;
};

function checkAndAdd (sent, existing) {
  let itemsSent = sent;
  let itemsExisting = existing;
  if (existing) itemsExisting = existing.toLowerCase();
  if (itemsSent == null && itemsExisting == null) return;
  else if (itemsSent == null && itemsExisting != null) return itemsExisting;
  else {
    let newAdditions = mustNotExist(itemsExisting, itemsSent);
    if (newAdditions) {
      return newAdditions;
    }
      else {
      return itemsExisting;
      }
    newAdditions = '';
  }};

router.get('/', async (req, res) => {
  try {
    const categories = await Categories.find().populate('user', ['name','avatar']);
    res.json(categories);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Categories Get All Categories');
  }
});

// route GET categories of auth usere
// desc  Rout to get entries o auth users
// access Private

router.get('/me', auth, async (req, res) => {
  try {
    const caregories = await Categories.find({ user: req.user.id }).sort({ start: -1});
    res.json(caregories);
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Categories Get All Categories by auth user');
  }
});


// route POST Categories
// desc  create an entry
// access Private
router.post('/', auth, async (req, res) => {

//Destructure body from request
const { positiveEmotions, negativeEmotions, neutralEmotions, positiveAction, negativeAction, neutralAction, positivePhysical, negativePhysical, neutralPhysical  } = req.body;

//Build entries Object
const categoryFields = {};
//get user from request Token
categoryFields.user = req.user.id;
if (positiveEmotions !== undefined) categoryFields.positiveEmotions = checkAndAdd(positiveEmotions.toLowerCase());
if (negativeEmotions !== undefined) categoryFields.negativeEmotions = checkAndAdd(negativeEmotions.toLowerCase());
if (neutralEmotions !== undefined) categoryFields.neutralEmotions = checkAndAdd(neutralEmotions.toLowerCase());
if (positiveAction !== undefined)  categoryFields.positiveAction = checkAndAdd(positiveAction.toLowerCase());
if (negativeAction !== undefined) categoryFields.negativeAction = checkAndAdd(negativeAction.toLowerCase());
if (neutralAction !== undefined) categoryFields.neutralAction = checkAndAdd(neutralAction.toLowerCase());
console.log(neutralAction);
if (positivePhysical !== undefined) categoryFields.positivePhysical = checkAndAdd(positivePhysical.toLowerCase());
if (negativePhysical !== undefined) categoryFields.negativePhysical = checkAndAdd(negativePhysical.toLowerCase());
if (neutralPhysical !== undefined) categoryFields.neutralPhysical = checkAndAdd(neutralPhysical.toLowerCase());

  try {

    // create entry
    let category = await Categories.findOne({ user: req.user.id });
    if (category) {
      //update entry
      category = await Categories.findOneAndUpdate(
        {user: req.user.id},
        {$set: categoryFields},
        {new: true}
      );

  return res.json(category);
} else {
  let categories = new Categories(categoryFields);
  await categories.save();
  return res.json(categories);
}

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Categories Post')
  }
});

// route POST entries
// desc  Edit an entry
// access Private
router.post('/edit/:category_id', auth, async (req, res) => {

  //Destructure body from request
  const { positiveEmotions, negativeEmotions, neutralEmotions, positiveAction, negativeAction, neutralAction, positivePhysical, negativePhysical, neutralPhysical  } = req.body;

  //Build entries Object
  const categoryFields = {};
  //get user from request Token
  categoryFields.user = req.user.id;
  if (positiveEmotions) categoryFields.positiveEmotions = checkAndAdd(positiveEmotions.toLowerCase());
  if (negativeEmotions) categoryFields.negativeEmotions = checkAndAdd(negativeEmotions.toLowerCase());
  if (neutralEmotions) categoryFields.neutralEmotions = checkAndAdd(neutralEmotions.toLowerCase());
  if (positiveAction) categoryFields.positiveAction = checkAndAdd(positiveAction.toLowerCase());
  if (negativeAction) categoryFields.negativeAction = checkAndAdd(negativeAction.toLowerCase());
  if (neutralAction) categoryFields.neutralAction = checkAndAdd(neutralAction.toLowerCase());
  if (positivePhysical) categoryFields.positivePhysical = checkAndAdd(positivePhysical.toLowerCase());
  if (negativePhysical) categoryFields.negativePhysical = checkAndAdd(negativePhysical.toLowerCase());
  if (neutralPhysical) categoryFields.neutralPhysical = checkAndAdd(neutralPhysical.toLowerCase());


  try {

    //Try to find entry in database
        let category = await Categories.findOne({ _id: req.params.category_id })
    //if entry exists, update the entry.
        if (category) {
          //update entry
          category = await Categories.findOneAndUpdate(
            {_id: req.params.entry_id},
            {$set: categoryFields},
            {new: true}
          );

      return res.json(category);
}
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Catgories Edit')
  }
});

// route POST entries
// desc  Edit main emotion variables
// access Private
router.post('/edit', auth, async (req, res) => {

  //Destructure body from request
  const { positiveEmotions, negativeEmotions, neutralEmotions, positiveAction, negativeAction, neutralAction, positivePhysical, negativePhysical, neutralPhysical  } = req.body;

  //Build entries Object
  const categoryFields = {};
  //get user from request Token
  categoryFields.user = req.user.id;
  if (positiveEmotions) categoryFields.positiveEmotions = positiveEmotions.toLowerCase();
  if (negativeEmotions) categoryFields.negativeEmotions = negativeEmotions.toLowerCase();
  if (neutralEmotions) categoryFields.neutralEmotions = neutralEmotions.toLowerCase();
  if (positiveAction) categoryFields.positiveAction = positiveAction.toLowerCase();
  if (negativeAction) categoryFields.negativeAction = negativeAction.toLowerCase();
  if (neutralAction) categoryFields.neutralAction = neutralAction.toLowerCase();
  if (positivePhysical) categoryFields.positivePhysical = positivePhysical.toLowerCase();
  if (negativePhysical) categoryFields.negativePhysical = negativePhysical.toLowerCase();
  if (neutralPhysical) categoryFields.neutralPhysical = neutralPhysical.toLowerCase();

   console.log(categoryFields);


  try {
        let mainID = '616af1e72025dd0ee4852da9';
    //Try to find entry in database
        let category = await Categories.findOne({ _id: mainID })

        console.log(category);

        categoryFields.positiveEmotions = checkAndAdd(categoryFields.positiveEmotions, category.positiveEmotions);
        categoryFields.negativeEmotions = checkAndAdd(categoryFields.negativeEmotions, category.negativeEmotions);
        categoryFields.neutralEmotions = checkAndAdd(categoryFields.neutralEmotions, category.neutralEmotions);
        categoryFields.positiveAction = checkAndAdd(categoryFields.positiveAction, category.positiveAction);
        categoryFields.negativeAction = checkAndAdd(categoryFields.negativeAction, category.negativeAction);
        categoryFields.neutralAction = checkAndAdd(categoryFields.neutralAction, category.neutralAction);
        categoryFields.positivePhysical = checkAndAdd(categoryFields.positivePhysical, category.positivePhysical);
        categoryFields.negativePhysical = checkAndAdd(categoryFields.negativePhysical, category.negativePhysical) ;
        categoryFields.neutralPhysical = checkAndAdd(categoryFields.neutralPhysical, category.neutralPhysical);



    //if entry exists, update the entry.
        if (category) {
          //update entry
          category = await Categories.findOneAndUpdate(
            {_id: mainID},
            {$set: categoryFields},
            {new: true}
          );

      return res.json(category);
}
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error Route API Catgories Edit')
  }
});

// route DELETE an entry
// desc  deleting an entry
// access Private
router.delete('/delete/:category_id', auth, async (req, res) => {
try{
  let categoryDelete = await Categories.findOneAndRemove({ _id: req.params.category_id });
    res.json(categoryDelete)

} catch(err) {
  console.error(err.message);
if (err.kind === 'ObjectId') {
  return res.status(404).json({ msg: 'Category not found' });
}
  res.status(500).send('Server Error Route API Category Delete an Entry');
}
});

module.exports = router;
