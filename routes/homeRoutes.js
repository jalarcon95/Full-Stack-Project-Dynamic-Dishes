const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(req.session.logged_in) 
    console.log("======================")    
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/recipes', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const recipeData = await Recipe.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
      
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        recipes, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/create-recipe', async (req, res) => {
    try {
        res.render('create', {logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json(err);
    }
  });

router.get('/recipes/:id', async (req, res) => {
    try {
      const recipeData = await Recipe.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const recipe = recipeData.get({ plain: true });
  
      res.render('recipe', {
        ...recipe,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Use withAuth middleware to prevent access to route
  router.get('/profile', async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      //console.log(req.session.user_id);
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Recipe }],
      });
  console.log(userData);
      const user = userData ? userData.get({ plain: true }) : {};
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });


module.exports = router;