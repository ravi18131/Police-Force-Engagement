const mongoose = require('mongoose');
// create schema for adding the employee
const addSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required: true
    },
    LastName:{
        type:String,
        required: true
    },
    EmailId:{
        type:String,
        unique:true,
        required: true
    },
    MobileNumber:{
        type: Number,
        required: true,
        unique:true,
        min:10
    },
    Gender:{
        type:String,
        required: true
    },
    PoliceStation:{
        type:String,
        required: true
    },
    City:{
        type:String,
        required: true
    },
    State:{
        type:String,
        required: true
    },
    ZipCode:{
        type: Number,
        required: true,
        unique:true,
        max:6,
        min:6
    },
    Allotment:{
        type:String,
        required: true
    },
    Status:{
        type:String,
        required: true
    },
    Rank:{
        type:String,
        required: true
    },
    Transfers:{
        type:String,
        required: true
    },
    Promotion:{
        type:String,
        required: true
    },
    AssignedWork:{
        type:String,
        required: true
    },
    StartingTime:{
        type:String,
        required: true
    },
    EndingTime:{
        type:String,
        required: true
    },
    Date:{
        type: Date,
        required:true
        // default: Date.now
    },
    WorkStatus:{
        type:String,
        required: true
    },
    Location:{
        type:String,
        required: true
    },
    CreateUserId:{
        type:String,
        required: true
    },
});

module.exports = addSchema;