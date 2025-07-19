const { Router } = require('express');
const movieController = require('../controllers/movieController');
const movieRouter = Router();

movieRouter.get('/', movieController.getMovies);
movieRouter.get('/:id', movieController.getDetails);
movieRouter.post('/:id/delete', movieController.deleteMoviePost);

module.exports = movieRouter;