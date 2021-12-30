const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();

const routes = require('./routes/index');

const mongoDburl = process.env.CONNECTION;

mongoose.connect(mongoDburl, { useUnifiedTopology: true, useNewUrlParser: true })
  .catch((err) => console.log(err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
require('./config/passport_facebook')(passport);

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use((req, res, next) => {
  console.log('user', req.user);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('listening to port 5000'));
