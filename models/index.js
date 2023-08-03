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

module.exports = { User, Recipe };