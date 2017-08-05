const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');
//sets up route to go to login page if user is not logged in
authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});
//sets up route so that user can't login unless they're registered
authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});
//When user registers, a new user is created and added to database
authRouter.post('/register', usersController.create);
//If user exists, they're routed to their character list page
//but stays there if they don't exists
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);
//when user logs out, redirects to index page for registration/login
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
