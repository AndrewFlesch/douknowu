const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CategoriesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  positiveEmotions: {
    type: String,
  },
  negativeEmotions: {
    type: String,
  },
  neutralEmotions: {
    type: String,
  },
  positiveAction: {
    type: String,
  },
  negativeAction: {
    type: String,
  },
  neutralAction: {
    type: String,
  },
  positivePhysical: {
    type: String,
  },
  negativePhysical: {
    type: String,
  },
  neutralPhysical: {
    type: String,
  },

})

module.exports = Post = mongoose.model('categories', CategoriesSchema);
