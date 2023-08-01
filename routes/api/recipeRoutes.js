const router = require('express').Router();
const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());


// Define routes
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  res.json(recipe);
});

app.post('/recipes', (req, res) => {
  const { name, ingredients } = req.body;
  const id = recipes.length + 1;
  const newRecipe = { id, name, ingredients };

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.put('/recipes/:id', (req, res) => {
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

app.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  recipes = recipes.filter((r) => r.id !== id);
  res.status(204).end();
});

module.exports = router;
