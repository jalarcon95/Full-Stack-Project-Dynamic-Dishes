const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect,
// });

const sequelize = new Sequelize('recipes', 'root', 'root', {
  host: '127.0.0.1',
  port:'8889',
  dialect:'mysql'
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