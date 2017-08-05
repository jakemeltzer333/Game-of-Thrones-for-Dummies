const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};
//gives new users an ID number and stores them in the users database
//then render's their index page
usersController.index = (req, res) => {
  User.findByUserId(req.user.id)
  .then(got => {
    res.render('got/got-index', {
        currentPage: 'index',
        message: 'ok',
        data: got,
        user: req.user,
      });
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}
//creates new user and stores them in users database
usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;
