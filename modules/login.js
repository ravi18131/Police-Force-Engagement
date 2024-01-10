const mongoose = require('mongoose');
const userSchema = require('../models/regSchema');
const User = mongoose.model('User', userSchema);
const validator = require('validator');
// const conn = require("./db/conn");
const bcrypt = require('bcrypt');

const login =  async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(username,password);

        if (!username || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        if (!validator.isEmail(username)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
 
        const userLogin = await User.findOne({ username: username });

        if (!userLogin) {
            return res.status(400).json({ error: "Data not found" });
        } else {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            //generate the jwt
            const token = await userLogin.generateAuthToken(); //generateAuthToken() is nathing it is the user defined function inside the registrattion schema
            console.log(token); //print the return value of generateAuthToken()

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
                // res.render("login", { showError: true, message: "Credentials are wrong!!!", showMessage: false })
            } else {
                // return res.status(201).json({ message: "User Sign-in Successful" });
                res.status(200).render('user_deshboard.hbs');
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = login;