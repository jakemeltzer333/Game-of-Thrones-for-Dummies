const express = require('express');
const gotRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const gotController = require('../controllers/got-controller');
const gotHelpers = require('../services/got-helpers');
//set up index routes to direct only if user is logged in
gotRoutes.get('/', authHelpers.loginRequired, gotController.index);
gotRoutes.post('/', authHelpers.loginRequired, gotController.create);
//can only go to add page if user is logged in
gotRoutes.get('/add', authHelpers.loginRequired, (req, res) => {
  res.render('got/got-add', {
    currentPage: 'add',
  });
});
//set up routes so that users have to be logged in to see, update, or delete data
gotRoutes.get('/:id', authHelpers.loginRequired, gotController.show);
//set up helper functions to work when user clicks 'see more' instead of api link.
gotRoutes.post('/:id', authHelpers.loginRequired, gotHelpers.getAllegiance, gotHelpers.getFather, gotHelpers.getMother,
  gotController.update);
gotRoutes.delete('/:id', authHelpers.loginRequired, gotController.delete);

module.exports = gotRoutes;
