const pool = require('../database');
const log = require('../logger');

/**
 * Function to list song authors.
 */
module.exports.list = function(req, res){
  pool
    .query('SELECT id, name, country FROM authors')
    // Send response
    .then(result => res.json(result[0]))
    // Catch errors and report to user.
    .catch(err => {
      log.error({ err }, 'An error occured while listing authors.');
      res.json({ error: true, reason: err.message })
    });
};

module.exports.get = function(req, res){
  if(!req.params.id)
    return res.json({ error: true, reason: "No id was given!" });

  pool
    .query('SELECT id, name, country FROM authors WHERE id = ?', req.params.id)
    // Send response
    .then(result => res.json(result[0]))
    // Catch errors and report to user.
    .catch(err => {
      log.error({ err }, 'An error occured while getting an author.');
      res.json({ error: true, reason: err.message })
    });
};

/**
 * Function to list songs for a given author.
 */
module.exports.songs = function(req, res){
  pool
    .query(
      `SELECT id, title, youtbe_id, release_date, length FROM songs WHERE author_id = ?`,
      [ req.params.id ]
    ).then(result => res.json(result[0]))
    .catch(err => {
      log.error({ err, author: req.params.id }, 'An error occured while listing songs for an author.');
      res.json({ error: true, reason: err.message });
    });
};