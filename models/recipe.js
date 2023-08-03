const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id"
    },

  }
}, {
 
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'recipe',
});

module.exports = Recipe;