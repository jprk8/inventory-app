const pool = require('./pool');

async function getAllMovies() {
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
}

async function getMovieDetails(id) {
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
}

async function getGenres() {
    const SQL = `SELECT * FROM genres;`;
    const { rows } = await pool.query(SQL);
    return rows;
}

async function addMovie(movie) {
    const SQL = `
    INSERT INTO movies (title, year, genre_id, director)
    VALUES ($1, $2, $3, $4);
    `;
    await pool.query(SQL, [movie.title, movie.year, movie.genre, movie.director]);
}

module.exports = {
    getAllMovies,
    getMovieDetails,
    getGenres,
    addMovie
};