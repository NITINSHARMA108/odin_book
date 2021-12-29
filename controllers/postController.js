const Post = require('../models/Post');
const User = require('../models/User');

exports.get_posts = async (req, res, next) => {
  const response = await Post.find();
};

exports.get_createpost = async (req, res, next) => {
  const users = await User.find({});
  res.render('createPost', { people: users });
};
