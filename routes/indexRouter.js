const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/add-movie', indexController.addMovieGet);
indexRouter.post('/add-movie', indexController.addMoviePost);

module.exports = indexRouter;