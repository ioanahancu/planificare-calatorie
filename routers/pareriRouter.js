var express = require('express');
var pareriRouter = express.Router();

var pareriController = require('../controllers/pareriController.js');
pareriRouter.get('/', pareriController.dummy);

module.exports = pareriRouter;