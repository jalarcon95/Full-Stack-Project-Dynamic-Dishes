const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const Recipe = require('./models/recipe');
dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

 //Your further code and logic can go here

  } catch (error) {
    console.error('Unable to connect to the database:', error);
   }
 })();

