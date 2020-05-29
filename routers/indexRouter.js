var express = require('express');
var indexRouter = express.Router();

var indexController = require('../controllers/indexController.js');
indexRouter.get('/', indexController.dummy);

module.exports = indexRouter;