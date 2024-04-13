const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    adminemail: {
        type: String,
        required: true
    },
    adminpassword: {
        type: String,
        required: true
    },
    tokens: [{          //must be created an array of object
        token: {            //object
            type: String,
            required: true
        }
    }]
});

// for generating the token
adminSchema.methods.generateAuthToken = async function () { //why we not use the fate arrow function --> bcs we try to use this keyword.
    try {
        const token = jwt.sign({ _id : this._id}, process.env.ADMIN_SECRET_KEY); //this._id --> fatch the _id from the database which is immidately generated;   && _id is the unique
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

module.exports = adminSchema;