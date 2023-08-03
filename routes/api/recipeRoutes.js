// ---->  /api/users

const router = require("express").Router();
const Recipe = require("../../models/recipe")

router.get("/all", (req, res) => {
    Recipe.findAll()
    .then(results => {
        res.json(results)
    })
})

router.get("/:id", (req, res) => {
    Recipe.findByPk(req.params.id)
    .then(results => {
        res.json(results)
    })
})

router.post("/create", (req, res) => {
    Recipe.create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        user_id: req.session.user_id
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