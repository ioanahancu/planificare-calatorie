var express = require('express');
var autentificareRouter = express.Router();

//autentificare
var autentificareController = require('../controllers/autentificareController');
autentificareRouter.get('/', autentificareController.dummy);

//verificare-autentificare
var verificareController = require('../controllers/verificareController');
autentificareRouter.post('/verificare-autentificare', verificareController.dummy);

//delogare
var delogareController = require('../controllers/delogareController');
autentificareRouter.get('/delogare', delogareController.dummy);

module.exports = autentificareRouter;