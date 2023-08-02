const router = require("express").Router();
const User = require("../../models/User")

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(async user => {
        if(user != null) {
            const isPasswordCorrect = await user.checkPassword(req.body.password)
            
           if(isPasswordCorrect) {
                req.session.save(() => {
                    req.session.id = user.id;
                    req.session.username = user.username;
                    req.session.email = user.email;

                    res.json({ 
                        message: "You are now logged in!"
                    })
                })
           } else {
            res.json({ 
                message: "Incorrect credentials!"
            })
           }
        }
    })
})

router.delete("/logout", (req, res) => {
    req.session.destroy();

    res.json({
        message: "You are now logged out!"
    })
})


module.exports = router;