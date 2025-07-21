const db = require('../db/queries');

async function indexGet(req, res) {
    const genres = await db.getGenres();
    res.render('index', { title: 'Movie Database', genres: genres});
}

async function addMovieGet(req, res) {
    const genres = await db.getGenres();
    res.render('addMovie', { title: 'Add Movie', genres: genres });
}

async function addMoviePost(req, res) {
    await db.addMovie(req.body);
    res.redirect('/');
}

async function addGenreGet(req, res) {
    const genres = await db.getGenres();
    res.render('addGenre', { title: 'Add Genre', genres: genres });
}

async function addGenrePost(req, res) {
    await db.addGenre(req.body.genre);
    res.redirect('/');
}

module.exports = {
    indexGet,
    addMovieGet,
    addMoviePost,
    addGenreGet,
    addGenrePost,
};