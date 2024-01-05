const mongoose = require('mongoose')
const Data = require('../models/dataSchema')
const upload = require('./fileupload_with_id')
const getData = async (req,res)=>{
    const data = await Data.find();
    res.status(200).json(data)
}
const postData = async (req,res)=>{
    
    const data = await Data.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        file1: "Before"});
    file1 = upload("file_1",req.body.file1,data.id)
    if(req.body.file2){
        file2 = upload("file_2",req.body.file2,data.id)
    }
    else{
        file2 = "No File"
    }
    const output = await Data.findByIdAndUpdate({_id: data.id},{ file1: file1,file2:file2 })    
    
    res.status(200).json(data.id)
}

module.exports = {getData,postData}