//initialize app dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require ('passport');

//initialize the app
const app = express();

//require dotenv for security
require('dotenv').config();

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//initialize static file
app.use(express.static('public'));

//initialize views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//initialize the local host port to listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//set up index route
app.get('/', (req,res) => {
  res.render('index', {
    message: 'Game of Thrones For Dummies',
    currentPage: 'home',
    documentTitle: 'Game of Thrones For Dummies',
  });
});
//require all the routes for the app
const gotRoutes = require('./routes/got-routes');
app.use('/got', gotRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);
//error handler
app.get('*', (req, res) => {
  res.status(400).send('Page Not Found');
});
