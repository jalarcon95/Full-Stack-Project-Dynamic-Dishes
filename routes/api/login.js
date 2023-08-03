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
                req.session.save(async() => {
                    const userData = await user.get({plain: true});
                    req.session.user_id = userData.id;
                    req.session.username = userData.username;
                    req.session.email = userData.email;

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