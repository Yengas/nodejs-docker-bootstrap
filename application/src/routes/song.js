const log = require('../logger');
const pool = require('../database');

function buildSearchQuery(params = {}){
  const parameters = [];
  // Create filter expressions for each filter in params
  const filters = {
    'id': (id) => {
      parameters.push(id);
      return `songs.id = ${id}`;
    },
    'text': (text) => {
      parameters.push(`%${text}%`, `%${text}%`);
      return `songs.title LIKE ? OR authors.name LIKE ?`;
    },
    'date': (date) => {
      parameters.push(date);
      return `songs.release_date > ?`;
    },
    'rating': (rating) => {
      parameters.push(rating);
      return `rating >= ?`;
    },
    'country': (country) => {
      parameters.push(country);
      return `authors.country = ?`;
    }
  };
  // Create where expression
  const
    expression = Object.keys(params)
                      // Filter keys that doesn't have a values
                      .filter(key => params[key])
                      // For each key, call the corresponding function and fill parameters + get query.
                      .map(key => '(' + filters[key](params[key]) + ')')
                      // Concatenate each query with AND
                      .join('AND');

  return [
    `
    SELECT
      authors.name as author, 
      (SELECT AVG(rating) FROM ratings WHERE song_id = songs.id) as rating,
      songs.id, songs.title, songs.youtube_id, songs.release_date, songs.length
    FROM songs
    LEFT JOIN authors ON authors.id = songs.author_id
    ${expression ? `WHERE ${expression}` : '' }`,
    parameters
  ];
}

// Returns the list of all songs.
module.exports.list = function(req, res, body = {}){
  const [query, params] =  buildSearchQuery(body || {});

  pool
    .query(query, params)
    .then(result => res.json(result[0]))
    .catch(err => {
      log.error({ err }, 'An error occurred while listing songs.');
      res.json({ error: true, reason: err.message });
    });
};

// Returns a list of songs that searched via some predefined variables.
// See buildSearchQuery for parameters available.
module.exports.search = function(req, res){
  return module.exports.list(req, res, req.body);
};

// Returns a single song given an id.
module.exports.get = function(req, res){
  if(!req.params || !req.params.id)
    return res.json({ error: true, reason: "No id given!" });
  return module.exports.list(req, res, { id: req.params.id });
};