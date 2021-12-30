const Post = require('../models/Post');
const User = require('../models/User');

async function getpeople(id) {
  const response = await User.findOne({ facebookId: id });
  let { friendList } = response;
  const { sentRequests } = response;
  const { friendRequests } = response;
  friendList = [id, ...friendList];
  const toFind = friendList.concat(sentRequests, friendRequests);
  const people = await User.find({ facebookId: { $nin: toFind } });
  return people;
}

exports.get_posts = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ facebookId: req.user.facebookId });
    let friends = user.friendList;
    friends = [req.user.facebookId, ...friends];
    const response = await Post.find({ user_id: { $in: friends } });
    const people = await getpeople(req.user.facebookId);
    console.log(response);
    res.render('index', { posts: response, people });
  } else {
    res.redirect('/signin');
  }
};

exports.get_createpost = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const people = await getpeople(req.user.facebookId);
    res.render('createPost', { people });
  } else {
    res.redirect('/signin');
  }
};

exports.post_createpost = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const { content } = req.body;
    const response = await Post.create({
      user_id: req.user.facebookId,
      content,
      user_pic: req.user.profile_pic,
      user_name: req.user.name,
    });
    res.redirect('/');
  } else {
    res.redirect('/signin');
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.body;
    const response1 = await Post.findByIdAndUpdate(id, { $push: { likes: req.user.facebookId } });
    const response2 = await User.findByIdAndUpdate(
      req.user.facebookId,
      { $push: { likeList: id } },
    );
    res.json({ move: true });
  } catch (err) {
    res.json({ move: false });
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const response1 = await User.findByIdAndUpdate(req.body.id, {
      $push: { comments: { name: req.body.name, comment: req.body.comment } },
    });
    return res.json({ move: true });
  } catch (err) {
    console.log(err);
    return res.json({ move: false });
  }
};

exports.get_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('Post', { post });
  } catch (err) {
    res.redirect('/');
  }
};
