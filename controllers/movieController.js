const db = require('../db/queries');

async function getMovies(req, res) {
    const movies = await db.getAllMovies();
    res.render('movies', { title: 'All Movies', movies: movies });
}

module.exports = {
    getMovies
};