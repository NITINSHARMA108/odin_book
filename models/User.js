const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = new Schema({
  name: {
    type: String,

  },
  profile_pic: {
    type: String,
  },
  friendList: {
    type: Array,

    default: [],
  },
  friendRequests: {
    type: Array,

    default: [],
  },
  facebookId: {
    type: String,
  },
  sentRequests: {
    type: Array,
    default: [],
  },
  likeList: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('User', User);
