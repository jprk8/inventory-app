require('dotenv').config();
const path = require('node:path');
const express = require('express');
const indexRouter = require('./routes/indexRouter');
const movieRouter = require('./routes/movieRouter');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', movieRouter);

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));