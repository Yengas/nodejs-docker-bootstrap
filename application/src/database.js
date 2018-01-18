const mysql = require('mysql2/promise');

return module.exports = (databaseConfig) => mysql.createPool(databaseConfig);
