const User=require("../model/user.model")
const jwt=require("jsonwebtoken")
 const express= require("express");
 const router= express.Router();

const newToken=(user)=>{
    return jwt.sign({user},"C4EVAL")
}

router.post("/", async(req,res)=>{
    try {
        //check if email exists already
        let user= await User.findOne({email:req.body.email}).exec()
        if(!user){
            return res.status(400).send({message:"Email or password incorrect"})
        }
        const match=user.checkPassword(req.body.password)
        if(!match){
            return res.status(400).send({message:"Email or password incorrect"})
        }
        const token = newToken(user)
        return res.status(200).send({user, token})
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

)
module.exports= router