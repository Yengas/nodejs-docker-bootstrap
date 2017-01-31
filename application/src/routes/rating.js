const pool = require('../database');
const log = require('../logger');

// Make sure the given parameters are integers
// and the rate is between 1 and 10 inclusive.
function validateRating(song, rate){
  if(!song || !rate) return false;
  rate = parseInt(rate);
  return  rate && parseInt(song) && rate > 0 && rate <= 10;
}

// An endpoint to rate a given song.
module.exports.rate = function(req, res){
  if(!validateRating(req.params.id, req.body.rating))
    return res.json({ error: true, reason: 'Invalid rating!' });

  // Will fail if the song doesn't exists because of the foreign key constraint.
  pool
    .query(`INSERT INTO ratings (song_id, rating) VALUES (?, ?)`, [req.params.id, req.body.rating])
    .then(() => res.json({ success: true, message: "Ok!" }))
    .catch(err => {
      log.error({ err, params: { song: req.params.id, rating: req.body.rating }}, "Couldn't rate a song.");
      res.json({ error: true, reason: err.message });
    });
};