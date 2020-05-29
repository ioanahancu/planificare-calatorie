var express = require('express');
var quizRouter = express.Router();

//quiz
var quizController = require('../controllers/quizController.js');
quizRouter.get('/', quizController.dummy);

//rezultate
var rezController = require('../controllers/rezController');
quizRouter.post('/rez-quiz', rezController.dummy);

module.exports = quizRouter;