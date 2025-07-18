const { Router } = require('express');
const movieController = require('../controllers/movieController');
const movieRouter = Router();

movieRouter.get('/', movieController.getMovies);
movieRouter.get('/:id', movieController.getDetails);

module.exports = movieRouter;