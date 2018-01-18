module.exports = ({ pool, log }) => ({
  /**
   * Function to list song authors.
   */
  list: async function(req, res){
    try{
      const result = await pool.query('SELECT id, name, country FROM authors');
      // Send response
      return res.json(result[0]);
    }catch(err){
      log.error({ err }, 'An error occurred while listing authors.');
      return res.json({ error: true, reason: err.message })
    }
  },
  // Get a single author with the given id.
  get: function(req, res){
    if(!req.params.id)
      return res.json({ error: true, reason: "No id was given!" });

    pool
      .query('SELECT id, name, country FROM authors WHERE id = ?', req.params.id)
      // Send response
      .then(result => res.json(result[0]))
      // Catch errors and report to user.
      .catch(err => {
        log.error({ err }, 'An error occurred while getting an author.');
        res.json({ error: true, reason: err.message })
      });
  },
  /**
   * Function to list songs for a given author.
   */
  songs: function(req, res){
    pool
      .query(
        `SELECT id, title, youtube_id, release_date, length FROM songs WHERE author_id = ?`,
        [ req.params.id ]
      ).then(result => res.json(result[0]))
      .catch(err => {
        log.error({ err, author: req.params.id }, 'An error occurred while listing songs for an author.');
        res.json({ error: true, reason: err.message });
      });
  }
});
