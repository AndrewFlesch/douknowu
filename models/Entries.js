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
  type: {
    type: String
  },
  direction: {
    type: String
  },
  start: {
    type: Date,
    default: null
  },
  end: {
    type: Date,
    default: null
  },
  duration: {
    type: Number,
  },
  description: {
    type: String,
    defaul: null
  }

})

module.exports = Post = mongoose.model('entries', EntriesSchema);
