const User = require('../models/User');
const Recipe = require('../models/recipe');

User.hasMany(Recipe, {
    foreignKey: `user_id`,
    onDelete: `CASCADE`
});

Recipe.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete:`CASCADE`
});

// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Database and tables are synchronized.');
//   })
//   .catch((err) => {
//     console.error('Error syncing database:', err);
//   });

module.exports = { User, Recipe };