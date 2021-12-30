const express = require('express');

const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// router.get('/', userController.get_timeline);
router.post('/signup', userController.post_signup);

router.get('/signin', userController.post_signin);

// router.post('/login', userController.post_login);

router.get('/', postController.get_posts);

router.get('/friendRequests', userController.get_friendRequests); // d

router.post('/confirmRequest', userController.confirmRequest);

router.post('/cancelRequest', userController.cancelRequest);

router.post('/addFriend', userController.addFriend);

router.get('/profile', userController.get_profile); // done

router.get('/createpost', postController.get_createpost);

router.post('/createPost', postController.post_createpost);

router.get('/login', passport.authenticate('facebook'));
router.get(
  '/auth/facebook',
  passport.authenticate('facebook'),
);

router.get(
  '/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('hello');
    res.redirect('/friendRequests');
  },
);

router.get('/user/:id', userController.get_user);

router.get('/friends', userController.get_friends);

router.get('/signout', userController.signout);

router.post('/unfriendUser', userController.unfriendUser);

router.post('/likePost', postController.likePost);

router.post('/dislikePost', postController.dislikePost);

router.get('/post/:id', postController.get_post);

router.post('/post/:id/postComment', postController.postComment);

module.exports = router;
