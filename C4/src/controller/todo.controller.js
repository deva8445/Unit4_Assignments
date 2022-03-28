const express= require("express");
const authenticate = require("../middleware/authentication");
const router= express.Router()
const Todo = require("../model/todo.model");
const User = require("../model/user.model");
 
router.post("/", async(req,res)=>{
    try {
        const todo= await Todo.create(req.body)
        return res.status(200).send(todo)
    } catch (error) {
        return res.status(400).send(error)
    }
})
router.get("/",async(req,res)=>{
    try {
       
            const todo= await Todo.find().lean().exec()
            return res.status(200).send(todo)
         }
      
     catch (error) {
        return res.status(400).send(error)
    }
})

router.get("/:id", authenticate,async(req,res)=>{
    try {
        const user= await User.find({email:req.body.userId}).lean().exec()
        if(user._id===req.body.userId)
         {
            const todo= await Todo.find().lean().exec()
            return res.status(200).send(todo)
         }
       return res.status(401).send({message:"You are not authorise to see the todo list "})
    } catch (error) {
        return res.status(400).send(error)
    }
})
router.patch("/:id", authenticate, async(req,res)=>{
    try {
        const user= await User.find({email:req.body.userId}).lean().exec()
        if(user._id===req.body.userId)
         {
        const todo= await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(200).send(todo)
        }
        return res.status(401).send({message:"You are not authorise to edit the todo list "})
    } catch (error) {
        return res.status(400).send(error)
    }
})
router.delete("/:id", authenticate, async(req,res)=>{
    try {
        const user= await User.find({email:req.body.userId}).lean().exec()
        if(user._id===req.body.userId)
         {
        const todo= await Todo.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(todo)
        }
        return res.status(401).send({message:"You are not authorise to delete the todo list "})
    } catch (error) {
        return res.status(400).send(error)
    }
})
 
module.exports=router