const express= require("express");
const app= express()
app.use(express.json());

 
const register= require("./controlller/register.controller")
 const login= require("./controlller/login.controller")
 const todocontroller= require("./controlller/todo.Controller")
app.use("/register", register);
app.use("/login", login)
app.use("/todo", todocontroller)
module.exports= app