module.exports = {
  database: JSON.parse(process.env.DATABASE_CONFIGURATION || '{}'),
  healthz: { message: 'I breathe!' }
};