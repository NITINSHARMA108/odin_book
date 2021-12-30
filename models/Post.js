const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;
const Post = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_pic: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
});

Post.virtual('formal_date').get(function () {
  const formalDate = DateTime.fromJSDate(this.date).toLocaleString(
    DateTime.DATETIME_MED,
  );
  return formalDate;
});

module.exports = mongoose.model('Post', Post);
