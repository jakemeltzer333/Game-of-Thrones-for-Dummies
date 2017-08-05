//require express
const express = require('express');
const userRoutes = express.Router();
//link user controller and auth helper files
const usersController = require('../controllers/users-controller');
const authHelpers = require('../services/auth/auth-helpers');
//get the user's main page but only if user is logged in
userRoutes.get('/', authHelpers.loginRequired, usersController.index);

module.exports = userRoutes;
