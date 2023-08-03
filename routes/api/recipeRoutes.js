// ---->  /api/users

const router = require("express").Router();
const Recipe = require("../../models/recipe")
const { generateTimestamp } = require('../../utils/day');

router.get("/all", (req, res) => {
    Recipe.findAll()
    .then(results => {
        res.json(results)
    })
})

router.get("/recipes/:id", (req, res) => {
    Recipe.findByPk(req.params.id)
    .then(results => {
        res.json(results)
    })
})

router.post("/create", (req, res) => {

    // const date_created = generateTimestamp();

    Recipe.create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        user_id: req.session.user_id,
        // date_created,
    })
    .then(result => {
        res.json(result)
    })
})

router.put("/:id", (req, res) => {
    Recipe.update(
        {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(result => {
        res.json(result)
    })
})

router.delete("/:id", (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.json(result)
    })
})


module.exports = router;