const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/regSchema');
const User = mongoose.model('User', userSchema);
const validator = require('validator');
// const conn = require("./db/conn");

const registration =  async (req, res) => {
        const { userfirstname, userlastname, username, number, password } = req.body;
        if (!userfirstname || !userlastname || !username || !number || !password) {
            return res.status(422).json({error:"plz fill all the data"});
        }
        
        if (!validator.isEmail(username)) {
            return res.status(422).json({ error: "Invalid email format" });
        }
    
        try {
            const userExist = await User.findOne({ username: username, number:number });
    
            if (userExist) {
                // return res.status(422).json({ error: 'User already exists' });
                res.render("index",{message : "Email already taken"});
            }
    
            const userData = new User({ userfirstname, userlastname,username, number, password });
            
            //generate the jwt
            const token = await userData.generateAuthToken(); //generateAuthToken() is nathing it is the user defined function inside the registrattion schema
            console.log(token); //print the return value of generateAuthToken()
            const regData = await userData.save();
            console.log(regData);
            // return res.status(201).json({ message: 'user registered successfully' });
            res.status(200).render('user_deshboard.hbs', { message: 'Registration successfully completed.' });
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    };

module.exports = registration;