const { Router } = require('express');
const movieController = require('../controllers/movieController');
const movieRouter = Router();

movieRouter.get('/', movieController.getMovies);

module.exports = movieRouter;