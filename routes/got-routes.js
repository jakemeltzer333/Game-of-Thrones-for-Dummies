const express = require('express');
const gotRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
//const gotModel = require('../models/got');
//const asoaif =require('asoiaf-api');
const gotController = require('../controllers/got-controller');
const gotHelpers = require('../services/got-helpers');

gotRoutes.get('/', authHelpers.loginRequired, gotController.index);
gotRoutes.post('/', authHelpers.loginRequired, gotController.create);

gotRoutes.get('/add', authHelpers.loginRequired, (req, res) => {
  res.render('got/got-add', {
    currentPage: 'add',
  });
});

gotRoutes.get('/:id', authHelpers.loginRequired, gotController.show);
//gotRoutes.get('/:id/edit', authHelpers.loginRequired, gotController.edit);
gotRoutes.post('/:id', authHelpers.loginRequired, gotHelpers.getAllegiance, gotController.update);
gotRoutes.delete('/:id', authHelpers.loginRequired, gotController.delete);

module.exports = gotRoutes;
