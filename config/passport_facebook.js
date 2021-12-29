const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.ACCESS_ID,
        clientSecret: process.env.SECRET_ACCESS,
        callbackURL: 'http://localhost:5000/auth/facebook/secrets',
        profileFields: ['email', 'name', 'displayName', 'photos'],
      },
      ((accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const profileUrl = profile.photos[0].value;
        User.create(
          { facebookId: profile.id, name: profile.displayName, profile_pic: profileUrl },
          (err, user) => {
            console.log(user);
            done(err, user);
          },
        );
      }),
    ),
  );
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
};
