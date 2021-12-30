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
    res.render('index', { posts: response, people, user: req.user });
  } else {
    res.redirect('/signin');
  }
};

exports.get_createpost = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const people = await getpeople(req.user.facebookId);
    res.render('createPost', { people, user: req.user });
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
  if (req.isAuthenticated()) {
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
  } else {
    res.redirect('/signin');
  }
};

exports.dislikePost = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const { id } = req.body;
      const response1 = await Post.findByIdAndUpdate(id, { $pull: { likes: req.user.facebookId } });
      const response2 = await User.findByIdAndUpdate(
        req.user.facebookId,
        { $pull: { likeList: id } },
      );
      res.json({ move: true });
    } catch (err) {
      res.json({ move: false });
    }
  } else {
    res.redirect('/signin');
  }
};

exports.postComment = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      console.log(req.params.id);
      const comment = { name: req.user.name, comment: req.body.comment };
      const response1 = await Post.findByIdAndUpdate(req.params.id, {
        $push: { comments: comment },
      });
      console.log(response1);
      return res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
      return res.redirect(`/post/${req.params.id}`);
    }
  } else {
    res.redirect('/signin');
  }
};

exports.get_post = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const post = await Post.findById(req.params.id);
      const people = await getpeople(req.user.facebookId);
      res.render('Post', { post, people });
    } catch (err) {
      res.redirect('/');
    }
  } else {
    res.redirect('/signin');
  }
};
