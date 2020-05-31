var express = require('express');
var pareriRouter = express.Router();

var pareriController = require('../controllers/pareriController.js');
pareriRouter.get('/', pareriController.dummy);

//adaugare comment
var commentController = require('../controllers/commentController.js');
pareriRouter.post('/inserare', commentController.dummy);

//afisare comentarii
var displayCommentController = require('../controllers/displayCommentController');
pareriRouter.get('/comentarii', displayCommentController.dummy);

module.exports = pareriRouter;