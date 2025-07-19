const db = require('../db/queries');

async function getMovies(req, res) {
    const movies = await db.getAllMovies();
    res.render('movies', { title: 'All Movies', movies: movies });
}

async function getDetails(req, res) {
    const movie = await db.getMovieDetails(req.params.id);
    res.render('details', { title: 'Movie Details', movie: movie });
}

async function deleteMoviePost(req, res) {
    await db.deleteMovie(req.params.id);
    const redirectTo = req.get('Referer') || '/';
    res.redirect(redirectTo);
}

module.exports = {
    getMovies,
    getDetails,
    deleteMoviePost
};