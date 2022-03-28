const User=require("../model/user.model")
const jwt=require("jsonwebtoken")
 const express=require("express");
 const router= express.Router()
const newToken=(user)=>{
    return jwt.sign({user},"C4EVAL")
}

router.post("/", async(req,res)=>{
    try {
        
        let user= await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).send({message:"Email or password incorrect"})
        }
        // create user for new email
        user= await User.create(req.body)
        const token = newToken(user)
        return res.status(200).send({user, token})
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})
module.exports=router