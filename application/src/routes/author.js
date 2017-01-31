const pool = require('../database');

/**
 * Function to list song authors.
 */
module.exports.list = function(req, res){
  pool
    .query('SELECT id, name, country FROM authors')
    // Filter invalid results
    .then(result => result && result.length > 0 ? Promise.resolve(result) : Promise.reject('Invalid result!'))
    // Send response
    .then(result => res.json(result[0]))
    // Catch errors and report to user.
    // TODO: log to stdout
    .catch(err => res.json({ error: true, reason: err.message }));
};