const pool = require('./database');
const config = require('./config');
const log = require('./logger');
const express = require('express');
const bodyParser = require('body-parser');
const authorController = require('./routes/author');
const songController = require('./routes/song');
const ratingController = require('./routes/rating');
const app = express();

app.use(bodyParser.json({ extended: true }));

app.get('/healthz', require('./routes/healthz'));

app.get('/author/get', authorController.list);
app.get('/author/:id/get', authorController.get);
app.get('/author/:id/songs', authorController.songs);

app.get('/song/get', songController.list);
app.get('/song/:id/get', songController.get);
app.post('/song/search', songController.search);
app.post('/song/:id/rate', ratingController.rate);

pool
  .query('SELECT 1')
  .then(() => app.listen(config.port))
  .then(() => log.info({ port: config.port }, 'Service started working.'))
  .catch((err) => {
    log.error({ err }, "An error has occurred! Killing the application.");
    process.exit(-1);
  });

