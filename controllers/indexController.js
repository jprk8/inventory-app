const db = require('../db/queries');

function indexGet(req, res) {
    res.render('index', { title: 'Movie Database'});
}

async function addMovieGet(req, res) {
    const genres = await db.getGenres();
    res.render('addForm', { title: 'Add Movie', genres: genres });
}

async function addMoviePost(req, res) {
    await db.addMovie(req.body);
    res.redirect('/');
}

module.exports = {
    indexGet,
    addMovieGet,
    addMoviePost
};