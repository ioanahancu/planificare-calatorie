var express = require('express');
var bagajRouter = express.Router();

var bagajController = require('../controllers/bagajController.js');
bagajRouter.get('/', bagajController.dummy);

module.exports = bagajRouter;