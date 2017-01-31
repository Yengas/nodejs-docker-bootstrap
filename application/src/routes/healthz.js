const config = require('../config');
const pool = require('../database');

// And endpoint to return a healthy message.
// Indicating express started successfully.
module.exports = function(req, res){
  res.json({ healthy: true, message: config.healthz.message });
};