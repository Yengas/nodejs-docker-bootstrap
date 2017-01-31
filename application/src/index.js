const pool = require('./database');
const config = require('./config');
const express = require('express');
const authorController = require('./routes/author');
const songController = require('./routes/song');
const app = express();

app.get('/healtz', require('./routes/healthz'));
app.get('/author/get', authorController.list);

pool
  .query('SELECT 1')
  .then(() => app.listen(config.port))
  .then(() => console.log(`Service started working on port: ${config.port}!`))
  .catch((err) => {
    console.log(err);
    console.log("An error has occured! Killing the application.");
    process.exit(-1);
  });

