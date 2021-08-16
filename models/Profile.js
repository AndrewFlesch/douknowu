const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  birth: {
    type: Date
  },
  country: {
    type: String
  },
  zip: {
    type: Number
  },
  city: {
    type: String
  },
  gender: {
    type: String
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  ethnicityandrace: {
    type: [String]
  },
  industry: {
    type: String
  },
  area: {
    type: String
  },
  jobtitle: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
