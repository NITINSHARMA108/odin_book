const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();
const passport = require('passport');

const app = express();

const routes = require('./routes/index');

const mongoDburl = process.env.connection;

mongoose.connect(mongoDburl, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
require('./config/passport_facebook')(passport);

app.use(passport.initialize());
app.use(routes);

app.listen(5000, () => console.log('listening to port 5000'));
