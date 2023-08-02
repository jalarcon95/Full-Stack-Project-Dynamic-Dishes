// ---->  /api/users

const router = require("express").Router();
const User = require("../../models/User")

router.get("/all", (req, res) => {
    User.findAll()
    .then(results => {
        res.json(results)
    })
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
    .then(results => {
        res.json(results)
    })
})

router.post("/create", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(result => {
        res.json(result)
    })
})

router.put("/:id", (req, res) => {
    User.update(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password 
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
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.json(result)
    })
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


module.exports = router;