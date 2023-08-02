const router = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let recipes = [
  { id: 1, title: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'cheese', 'bacon'] },
  { id: 2, title: 'Chicken Curry', ingredients: ['chicken', 'coconut milk', 'spices'] },
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});


app.get('/recipes/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const recipe = recipes.find((r) => r.id === recipeId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});


app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.put('/recipes/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const updatedRecipe = req.body;
  const recipeIndex = recipes.findIndex((r) => r.id === recipeId);
  if (recipeIndex !== -1) {
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...updatedRecipe, id: recipeId };
    res.json(recipes[recipeIndex]);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

app.delete('/recipes/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  recipes = recipes.filter((r) => r.id !== recipeId);
  res.status(204).end();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Recipe API server is running on http://localhost:${port}`);
})
