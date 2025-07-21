#! /usr/bin/env node

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    year INTEGER,
    genre_id INTEGER REFERENCES genres(id),
    director VARCHAR(255)
);

INSERT INTO genres (genre)
VALUES
    ('Action'),
    ('Comedy'),
    ('Drama'),
    ('Sci-fi');

INSERT INTO movies (title, year, genre_id, director)
VALUES
    ('Interstellar', 2014, (SELECT id FROM genres WHERE genre = 'Sci-fi'), 'Christopher Nolan'),
    ('John Wick', 2014, (SELECT id FROM genres WHERE genre = 'Action'), 'Chad Stahelski'),
    ('Superbad', 2007, (SELECT id FROM genres WHERE genre = 'Comedy'), 'Greg Mottola'),
    ('About Time', 2013, (SELECT id FROM genres WHERE genre = 'Drama'), 'Richard Curtis'),
    ('2001: A Space Odyssey', 1968, (SELECT id FROM genres WHERE genre = 'Sci-fi'), 'Stanley Kubrick'),
    ('The Hangover', 2009, (SELECT id FROM genres WHERE genre = 'Comedy'), 'Todd Phillips'),
    ('Gladiator', 2000, (SELECT id FROM genres WHERE genre = 'Action'), 'Ridley Scott');
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: `postgresql://${process.env.USER}:${process.env.PW}@${process.env.HOST}:5432/${process.env.DB}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();