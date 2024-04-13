const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const regSchema = new mongoose.Schema({
    userfirstname: {
        type: String,
        required: true
    },
    userlastname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    },
    password: {
        type: String,
        required: true
    },image:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{          //must be created an array of object
        token: {            //object
            type: String,
            required: true
        }
    }]
});

// middleware


// for generating the token
regSchema.methods.generateAuthToken = async function () { //why we not use the fate arrow function --> bcs we try to use this keyword.
    try {
        const token = jwt.sign({ _id : this._id}, process.env.SECRET_KEY); //this._id --> fatch the _id from the database which is immidately generated;   && _id is the unique
        // console.log(token);
        this.tokens = this.tokens.concat({token:token}); //token:token --> 1st token is DB token & 2nd is jwt.sign({ _id: this._id }, "mynameisravikumar18131"); by the object destructuring(ES6) if the key and value is same then it write once than it will also be perfact. like this.tokens = this.tokens.concat({token}); 
        // console.log(token);
        await this.save();
        return token;
    } catch (e) {
        console.log("An error is accored");
        console.log(e);
    }

}
regSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12); // Await the bcrypt hash operation
    }
    next();
});

module.exports = regSchema;
