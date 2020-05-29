var express = require('express');
var topRouter = express.Router();

//top
var topController = require('../controllers/topController.js');
topRouter.get('/', topController.dummy);

//top-destinatii
var destinatiiController = require('../controllers/destinatiiController.js');
topRouter.get('/destinatii', destinatiiController.dummy);

module.exports = topRouter;