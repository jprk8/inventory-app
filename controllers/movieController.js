const db = require('../db/queries');
const { fetchGif } = require('../utils/giphy');

async function getMovies(req, res) {
    const movies = await db.getAllMovies();
    const genres = await db.getGenres();
    res.render('movies', { title: 'All Movies', movies: movies , genres: genres });
}

async function getDetails(req, res) {
    const movie = await db.getMovieDetails(req.params.id);
    const gifUrl = await fetchGif(movie.title);
    res.render('details', { title: 'Movie Details', movie: movie, gifUrl: gifUrl });
}

async function deleteMoviePost(req, res) {
    await db.deleteMovie(req.params.id);
    const redirectTo = req.get('Referer') || '/';
    res.redirect(redirectTo);
}

async function getGenreMovies(req, res) {
    const movies = await db.getGenreMovies(req.params.genre);
    const genres = await db.getGenres();
    res.render('movies', { title: req.params.genre, movies: movies , genres: genres });
}

module.exports = {
    getMovies,
    getDetails,
    deleteMoviePost,
    getGenreMovies,
};