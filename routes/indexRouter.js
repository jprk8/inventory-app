const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/add-movie', indexController.addMovieGet);
indexRouter.post('/add-movie', indexController.addMoviePost);
indexRouter.get('/add-genre', indexController.addGenreGet);
indexRouter.post('/add-genre', indexController.addGenrePost);
indexRouter.get('/search-result', indexController.searchMovieGet);

module.exports = indexRouter;