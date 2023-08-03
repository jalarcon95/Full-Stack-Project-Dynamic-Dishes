const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const allConfigs = require('./config');
const config = allConfigs[env] || allConfigs['development']; // Fallback to development

// Check for JAWSDB_URL and update config if found
if (process.env.JAWSDB_URL) {
  config.use_env_variable = 'JAWSDB_URL';
}
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable])
  : new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
    });
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
module.exports = sequelize;