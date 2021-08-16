const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntriesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date
  },
  duration: {
    type: Number,
  },
  description: {
    type: String
  }

})

module.exports = Post = mongoose.model('entries', EntriesSchema);
