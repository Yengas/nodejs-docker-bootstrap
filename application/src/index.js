const config = require('./config');
const log = require('./logger');
const utils = require('./utils');
const pool = require('./database')(config.database);
const express = require('express');
const bodyParser = require('body-parser');

const {
  author: authorController,
  healthz: healthzController,
  song: songController,
  rating: ratingController
} = utils.buildControllers('./routes/', { pool, log }, config.routes);

const app = express();

app.use(bodyParser.json({ extended: true }));

app.get('/healthz', healthzController.ping);

app.get('/author/get', authorController.list);
app.get('/author/:id/get', authorController.get);
app.get('/author/:id/songs', authorController.songs);

app.get('/song/get', songController.list);
app.get('/song/:id/get', songController.get);
app.post('/song/search', songController.search);
app.post('/song/:id/rate', ratingController.rate);

(async function(){
  try{
    await pool.query('SELECT 1');
    await app.listen(config.port);
    log.info({ port: config.port }, 'Service started working.');
  }catch(err){
    log.error({ err }, "An error has occurred! Killing the application.");
    process.exit(-1);
  }
})();
