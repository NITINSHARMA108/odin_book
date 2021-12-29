const mongoose = require('mongoose');

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
  caption: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  likeList: {
    type: Array,
  },
  comment: {
    type: Array,
  },
});

module.exports = mongoose.model('Post', Post);
