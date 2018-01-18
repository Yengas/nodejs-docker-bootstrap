module.exports = {
  database: JSON.parse(process.env.DATABASE_CONFIGURATION || '{}'),
  port: parseInt(process.env.LISTEN_PORT || 8080),
  // Define each configuration specific to routes here.
  routes: {
    healthz: { message: 'I breathe!' }
  }
};