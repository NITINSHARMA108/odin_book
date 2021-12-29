const { request } = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.post_signup = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await User.create({
    email,
    password,
  });
  if (response) {
    res.status(200).json({ message: 'user created successfully' });
  } else {
    res.status(404).json({ message: 'error in writing database' });
  }
};

exports.post_signin = (req, res, next) => {
  res.render('signin');
};

exports.get_profile = async (req, res, next) => {
  const users = await User.find();
  res.render('profile', { people: users });
};

exports.get_friendList = async (req, res, next) => {

};

exports.get_friendRequests = async (req, res, next) => {
  const users = await User.find({});
  const response = await User.findOne({ facebookId: '1056968548492628' });

  const requests = await User.find({ facebookId: { $in: response.friendRequests } });

  res.render('friendRequests', { people: users, requests });
};

exports.confirmRequest = async (req, res, next) => {
  const guest = await User.findOne({ facebookId: req.body.facebookId });
  let guestFriends = guest.friendList;
  let guestrequestList = guest.sentRequests;
  guestFriends = ['1056968548492628', ...guestFriends];
  guestrequestList = guestrequestList.filter((guest) => guest !== '1056968548492628');
  const host = await User.find({ facebookId: '1056968548492628' });
};

exports.cancelRequest = async (req, res, next) => {

};
exports.addFriend = async (req, res, next) => {
  const { facebookId } = req.body;
  const response = await User.findOne({ facebookId });
  let requestList = response.friendRequests;
  requestList = [...requestList, facebookId];
  const response1 = await User.findOne({ facebookId: '1056968548492628' });
  response1.sentRequests = [facebookId, ...response1.sentRequests];
  const r = await User.findOneAndUpdate({ facebookId }, {
    friendRequests: requestList,
  });
  await User.findOneAndUpdate({ facebookId: '1056968548492628' }, {
    sentRequests: response1.sentRequests,
  });
  res.json({ move: true });
};

exports.get_timeline = (req, res, next) => {
  res.render('index');
};

exports.get_user = async (req, res, next) => {
  const response = await User.findOne({ facebookId: req.params.id });
  const user = await User.findOne({ facebookId: '1056968548492628' });
  const { friendList } = user;
  const people = await User.find({ facebookId: { $nin: friendList } });
  res.render('profile', { people, user: response });
};

exports.get_friends = async (req, res, next) => {
  const response = await User.findOne({ facebookId: '1056968548492628' });
  let { friendList } = response;

  const friends = await User.find({ facebookId: { $in: friendList } });
  console.log(friends);
  friendList = ['1056968548492628', ...friendList];
  const people = await User.find({ facebookId: { $nin: friendList } });
  res.render('friends', { friends, people });
};
