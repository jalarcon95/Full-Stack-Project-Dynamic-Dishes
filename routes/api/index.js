const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
const loginRoutes = require("./login");

router.use("/users", userRoutes)
router.use("/recipes", recipeRoutes)
router.use("/auth", loginRoutes)

module.exports = router;
