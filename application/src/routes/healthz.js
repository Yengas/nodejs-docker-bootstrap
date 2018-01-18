// And endpoint to return a healthy message.
// Indicating express started successfully.
module.exports = ({ config }) => ({
  ping: function(req, res){
    return res.json({ healthy: true, message: config.message });
  }
});