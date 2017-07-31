const express = require('express');
const gotRoutes = express.Router();


const gotController = require('../controllers/got-controller');

gotRoutes.get('/', gotController.index);
gotRoutes.post('/', gotController.create);

gotRoutes.get('/add', (req, res) => {
  res.render('got/got-add', {
    currentPage: 'add'.
  });
});

gotRoutes.get('/:id', gotController.show);
gotRoutes.get('/:id/edit', gotController.edit);
gotRoutes.put('/:id', gotController.update);
gotRoutes.delete('/:id', gotController.delete);

module.exports = gotRoutes;
