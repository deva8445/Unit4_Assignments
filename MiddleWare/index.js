const express = require("express");
const app = express();

app.use(allBooks);

app.get("/books",(req,res)=>{
    console.log("Fetching all books");
    res.send("All Books");
});

app.use(oneBook);

app.get("/book/:name", (req,res)=>{
    req.name=req.params["name"];
    res.send({bookName: req.name});
})

function allBooks(req,res,next){
    next();
}

function oneBook(req, res, next){
    // req.name = req.params.name;
    // console.log(req.params["name"]);
    next();
}

app.listen(5000,()=>{
    console.log("Port 5000 started");
});