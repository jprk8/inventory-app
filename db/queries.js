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
        const SQL = `SELECT * FROM genres ORDER BY genre;`;
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

async function getGenreMovies(genre) {
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
        WHERE genres.genre = $1
        ORDER BY movies.title
        `;
        const { rows } = await pool.query(SQL, [genre]);
        return rows;
    } catch (err) {
        console.error('Error loading movies from genre:', err);
        return [];
    }
}

async function addGenre(genre) {
    try {
        const SQL = `
        INSERT INTO genres (genre)
        VALUES ($1);
        `;
        await pool.query(SQL, [genre]);
    } catch (err) {
        console.error('Error creating genre:', err);
        throw err;
    }
}

async function getSearchResult(word) {
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
        WHERE movies.title ILIKE $1;
        `;
        const { rows } = await pool.query(SQL, [`%${word}%`]);
        return rows;
    } catch (err) {
        console.error('Error searching database:', err);
        return [];
    }
}

module.exports = {
    getAllMovies,
    getMovieDetails,
    getGenres,
    addMovie,
    deleteMovie,
    getGenreMovies,
    addGenre,
    getSearchResult,
};