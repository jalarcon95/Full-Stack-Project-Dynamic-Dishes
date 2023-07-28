const express = require("express")
const db = require("../models")
const router = express.Router()

router.get("/",(req,res,next)=>{
    db.Post.findAll({
        order:[
        ["id"]
        ]
    }).then(data =>{
        const receipedata= {
            receipe:data
        }
        res.render("receipe",receipedata)
    })
})


module.exports=router