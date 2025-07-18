const pool = require('./pool');

async function getAllMovies() {
    const SQL = `
    SELECT
        movies.title,
        movies.year,
        genres.genre,
        movies.director
    FROM movies
    LEFT JOIN genres ON movies.genre_id = genres.id
    ORDER BY movies.title;
    `
    const { rows } = await pool.query(SQL);
    return rows;
}

module.exports = {
    getAllMovies
};