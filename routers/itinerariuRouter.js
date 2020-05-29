var express = require('express');
var itinerariuRouter = express.Router();

var itinerariuController = require('../controllers/itinerariuController.js');
itinerariuRouter.get('/', itinerariuController.dummy);

module.exports = itinerariuRouter;