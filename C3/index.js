const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const connect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Books");
}

const userSchema = new mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:false},
    age : {type:Number,required:true},
    email : {type:String,required:true,unique:true},
    profileImages : {type:Array,required:true},
},
{
    timestamps:true,
});

const User = mongoose.model("user", userSchema);

const bookSchema = new mongoose.Schema({
    likes : {type:Number,required:true,default:0},
    coverImage :{type:String, required:true},
    content :{type:String, required:true},
    userId : {type:mongoose.Schema.Types.ObjectId,required:true},
},
{
    timestamps:true,
});

const Book = mongoose.model("book", bookSchema);

const publicationSchema = new mongoose.Schema({
    name: {type:String,required:true},
    bookId : {type:mongoose.Schema.Types.ObjectId,required:true},
},
{
    timestamps:true,
});

const Publication = mongoose.model("publication", publicationSchema);

const commentSchema = new mongoose.Schema({
    body:{type:String,required:true},
    userId : {type:mongoose.Schema.Types.ObjectId,required:true},
    bookId : {type:mongoose.Schema.Types.ObjectId,required:true},
},
{
    timestamps:true,
});

const Comment = mongoose.model("comment",commentSchema);

app.post("/user", async (req,res)=>{
    try {
        const userRegister = await User.create(req.body);
        return res.status(201).send(userRegister);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post("/book",async (req,res)=>{
    try {
        const book = await Book.create(req.body);
        return res.status(201).send(book);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post("/comment", async (req,res)=>{
    try {
        const comments = await Comment.create(req.body);
        return res.status(201).send(comments);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get("/user/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


app.listen(5000, async ()=>{
    try {
        await connect();
        console.log("Port 5000 Conected");
    } catch (error) {
        console.log("Someting went wrong");
    }
});