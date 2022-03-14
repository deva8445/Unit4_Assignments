const express = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/Bank_System");
}

// user schema

const user = mongoose.Schema({
    firstName : {type:String,required:true},
    middleName : {type:String,required:false},
    lastName  : {type:String,required:true},
    age  : {type:Number,required:true},
    email  : {type:String,required:true},
    address   : {type:String,required:true},
    gender   : {type:String,required:false,default:"Female"},
    type    : {type:String,required:false},
},
{timestamp:true});

//User Model

const User = mongoose.model("user",user);

//BranchDetail Schema

const BranchDetail = mongoose.Schema({
    name : {type:String,required:true},
    address : {type:String,required:true},
    IFSC : {type:String,required:true},
    MICR : {type:Number,required:true},
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
},
{timestamp:true});

//BranchDetails Model

const Branch = mongoose.model("BranchDetail", BranchDetail);

//MasterAccount Schema

const MasterAccount = mongoose.Schema({
    balance :{type:Number,required:true},
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    branchId: {type:mongoose.Schema.Types.ObjectId,ref:"BranchDetails",required:true},
},
{timestamp:true});

//MasterAccount Model

const Master = mongoose.model("MasterAccount",MasterAccount);

// SavingsAccount Schema

const SavingsAccount = mongoose.Schema({
    account_number : {type:Number,required:true},
    balance : {type:Number,required:true},
    interestRate : {type:Number,required:true},
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    branchId: {type:mongoose.Schema.Types.ObjectId,ref:"BranchDetails",required:true},
},
{timestamp:true});

// SavingAccount Model

const Saving = mongoose.model("SavingAccount",SavingsAccount);

//FixedAccount Schema

const FixedAccount = mongoose.Schema({
    account_number : {type:Number,required:true},
    balance : {type:Number,required:true},
    interestRate : {type:Number,required:true},
    startDate  : {type:Number,required:true},
    maturityDate  : {type:Number,required:true},
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    branchId: {type:mongoose.Schema.Types.ObjectId,ref:"BranchDetails",required:true},
},
{timestamp:true});

//FixedAccount Models

const Fixed = mongoose.model("FixedAccount",FixedAccount);


app.get("/MasterAccount",async(req,res)=>{
    try {
        const master = await Master.find().lean().exec();
        return res.status(200).send(master);
    } catch (error) {
        // console.log(error);
        return res.status(500).send("Error:",error.message);
    }
});

app.post("/SavingAccount",async(req,res)=>{
    try {
        const saving = await Saving.create(req.body);
        return res.status(201).send(saving);
    } catch (error) {
        return res.status(500).send("Error:",error.message);
    }
});

app.post("/FixedAccount",async(req,res)=>{
    try {
        const fixed = await Fixed.create(req.body);
        return res.status(201).send(fixed);
    } catch (error) {
        return res.status(500).send("Error:",error.message);
    }
});

app.get("/MasterAccount/:id",async(req,res)=>{
    try {
        const master = await Master.findById(req.params.id).lean().exec();
        return res.status(200).send(master);
    } catch (error) {
        return res.status(500).send("Error:",error.message);
    }
});

app.delete("/FixedAccount/:id", async(req,res)=>{
    try {
        const fixed = await Fixed.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(fixed);
    } catch (error) {
        return res.status(500).send("Error:",error.message);
    }
});



app.listen(5000, async()=>{
    try {
        await connect();
        console.log("Port 5000 is connected");
    } catch (error) {
        console.log("Deva's port error :",error);
    }
});