const { request } = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

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

exports.post_signin = (req, res, next) => {
  res.render('signin');
};

exports.get_profile = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ facebookId: req.user.facebookID });
    const posts = await Post.find({ user_id: req.user.facebookId }).sort({
      date: -1,
    });
    const people = await getpeople(req.user.facebookId);
    res.render('profile', { user: req.user, posts, people });
  } else {
    res.redirect('/signin');
  }
};

exports.get_friendRequests = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const response = await User.findOne({ facebookId: req.user.facebookId });
    const { friendRequests } = response;

    const requests = await User.find({ facebookId: { $in: friendRequests } });
    const people = await getpeople(req.user.facebookId);
    res.render('friendRequests', { people, requests, user: req.user });
  } else {
    res.redirect('/signin');
  }
};

exports.confirmRequest = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const guest = await User.findOne({ facebookId: req.body.facebookId });
      let guestFriends = guest.friendList;
      let guestrequestList = guest.sentRequests;
      guestFriends = [req.user.facebookId, ...guestFriends];
      guestrequestList = guestrequestList.filter(
        (g) => g !== req.user.facebookId,
      );
      const response1 = await User.findOneAndUpdate(
        { facebookId: req.body.facebookId },
        {
          friendList: guestFriends,
          sentRequests: guestrequestList,
        },
      );
      const host = await User.findOne({ facebookId: req.user.facebookId });
      let hostFriends = host.friendList;
      let hostFriendRequests = host.friendRequests;
      hostFriends = [req.body.facebookId, ...hostFriends];
      hostFriendRequests = hostFriendRequests.filter(
        (h) => h !== req.body.facebookId,
      );
      const response2 = await User.findOneAndUpdate(
        { facebookId: req.user.facebookId },
        {
          friendList: hostFriends,
          friendRequests: hostFriendRequests,
        },
      );
      res.json({ move: true });
    } catch (err) {
      res.json({ move: false });
    }
  } else {
    res.redirect('/signin');
  }
};

exports.cancelRequest = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const guest = await User.findOne({ facebookId: req.body.facebookId });
      let guestrequestList = guest.sentRequests;
      guestrequestList = guestrequestList.filter(
        (g) => g !== req.user.facebookId,
      );
      const host = await User.findOne({ facebookId: req.user.facebookId });
      let hostFriendRequests = host.friendRequests;

      hostFriendRequests = hostFriendRequests.filter(
        (h) => h !== req.body.facebookId,
      );
      const response1 = await User.findOneAndUpdate(
        { facebookId: req.body.facebookId },
        {
          sentRequests: guestrequestList,
        },
      );
      const response2 = await User.findOneAndUpdate(
        { facebookId: req.user.facebookId },
        {
          friendRequests: hostFriendRequests,
        },
      );
      res.json({ move: true });
    } catch (err) {
      res.json({ move: false });
    }
  } else {
    res.redirect('/signin');
  }
};

exports.addFriend = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const { facebookId } = req.body;
    const guest = await User.findOne({ facebookId });
    let requestList = guest.friendRequests;
    requestList = [req.user.facebookId, ...requestList];
    const host = await User.findOne({ facebookId: req.user.facebookId });
    const hostsentRequests = host.sentRequests;
    const r = await User.findOneAndUpdate(
      { facebookId },
      {
        friendRequests: requestList,
      },
    );
    const response2 = await User.findOneAndUpdate(
      { facebookId: req.user.facebookId },
      {
        sentRequests: hostsentRequests,
      },
    );
    res.json({ move: true });
  } else {
    res.redirect('/signin');
  }
};

exports.get_user = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const response = await User.findOne({ facebookId: req.params.id });
    const user = await User.findOne({ facebookId: '1056968548492628' });
    const { friendList } = user;
    const people = await User.find({ facebookId: { $nin: friendList } });
    res.render('profile', { people, user: response });
  } else {
    res.redirect('/signin');
  }
};

exports.get_friends = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const response = await User.findOne({ facebookId: req.user.facebookId });
    const { friendList } = response;
    const friends = await User.find({ facebookId: { $in: friendList } });
    const people = await getpeople(req.user.facebookId);
    res.render('friends', { friends, people, user: req.user });
  } else {
    res.redirect('/signin');
  }
};

exports.unfriendUser = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const host = await User.findOne({ facebookId: req.user.facebookId });
      const guest = await User.findOne({ facebookId: req.body.facebookId });

      let guestfriendList = guest.friendList;
      guestfriendList = guestfriendList.filter((g) => g !== req.user.facebookId);
      let hostfriendList = host.friendList;
      hostfriendList = hostfriendList.filter((h) => h !== req.body.facebookId);
      const response1 = await User.findOneAndUpdate(
        { facebookId: req.body.facebookId },
        {
          friendList: guestfriendList,
        },
      );
      const response2 = await User.findOneAndUpdate(
        { facebookId: req.user.facebookId },
        {
          friendList: hostfriendList,
        },
      );
      res.json({ move: true });
    } catch (err) {
      res.json({ move: false });
    }
  } else {
    res.redirect('/signin');
  }
};
exports.signout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/signin');
  } else {
    res.redirect('/friends');
  }
};
