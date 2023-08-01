const express = require('express');
const router = express.Router(); 
const { generateTimestamp } = require('./helper');


let recipes = [];

// Define routes
router.get('/recipes', (req, res) => {
  res.json(recipes);
});

router.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  res.json(recipe);
});

router.post('/recipes', (req, res) => {
  const { name, ingredients } = req.body;
  const id = recipes.length + 1;
  const createdAt = generateTimestamp(); 
  const newRecipe = { id, name, ingredients, createdAt }; 

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

router.put('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const { name, ingredients } = req.body;
  recipe.name = name;
  recipe.ingredients = ingredients;

  res.json(recipe);
});

router.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  recipes = recipes.filter((r) => r.id !== id);
  res.status(204).end();
});

module.exports = router;