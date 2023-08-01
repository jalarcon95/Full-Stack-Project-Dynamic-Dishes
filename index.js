const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const Recipe = require('./models/recipe');
dotenv.config();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', async (req, res) => {
  // const  recipe =  await Recipe.create ({
  //   title:'test',
  //   description:'text',
  //   ingredients:'a',
  //   instructions:'instructions'
  // });
  // recipe.save();
  // res.send('saved')
  res.render('views/login.handlebars')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

sequelize.sync();



// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     // Your further code and logic can go here

//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

