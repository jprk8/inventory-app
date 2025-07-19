const pool = require('./pool');

async function getAllMovies() {
    try {
        const SQL = `
        SELECT
            movies.id,
            movies.title,
            movies.year,
            genres.genre,
            movies.director
        FROM movies
        LEFT JOIN genres ON movies.genre_id = genres.id
        ORDER BY movies.title;
        `;
        const { rows } = await pool.query(SQL);
        return rows;
    } catch (err) {
        console.error('Error fetching movies:', err);
        return [];
    }
}

async function getMovieDetails(id) {
    try {
        const SQL = `
        SELECT
            movies.id,
            movies.title,
            movies.year,
            genres.genre,
            movies.director
        FROM movies
        LEFT JOIN genres ON movies.genre_id = genres.id
        WHERE movies.id = $1;
        `;
        const { rows } = await pool.query(SQL, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching movie details:', err);
        return null;
    }
}

async function getGenres() {
    try {
        const SQL = `SELECT * FROM genres;`;
        const { rows } = await pool.query(SQL);
        return rows;
    } catch (err) {
        console.error('Error loading genres', err);
        return [];
    }
}

async function addMovie(movie) {
    try {
        const SQL = `
        INSERT INTO movies (title, year, genre_id, director)
        VALUES ($1, $2, $3, $4);
        `;
        await pool.query(SQL, [movie.title, movie.year, movie.genre, movie.director]);
    } catch (err) {
        console.error('Error adding movie:', err);
        throw err;
    }
}

async function deleteMovie(id) {
    try {
        const SQL = `DELETE FROM movies WHERE movies.id = $1;`;
        await pool.query(SQL, [id]);
    } catch (err) {
        console.error('Error deleting movie:', err);
        throw err;
    }
}

module.exports = {
    getAllMovies,
    getMovieDetails,
    getGenres,
    addMovie,
    deleteMovie
};