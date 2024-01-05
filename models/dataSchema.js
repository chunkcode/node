const mongoose = require('mongoose')

const dataSchema = mongoose.Schema(
    {
       name:{
        type: String,
        required : [true,"name is required"]
       },
       email:{
        type: String,
        required : [true,"email is required"]
       },
       password:{
        type: String,
        required : [true,"password is required"]
       },
       phone:{
        type: String,
        required : [true,"phone is required"]
       },
       file1:{
        type: String,
        required : [true,"file1 is required"]
       },
       file2:{
        type: String,
       }
    }
)


module.exports = mongoose.model("Data",dataSchema)