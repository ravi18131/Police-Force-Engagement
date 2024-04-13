const mongoose = require('mongoose');
const userSchema = require('../models/regSchema');
const User = mongoose.model('User', userSchema);
const validator = require('validator');

const registration = async (req, res) => {
    const { userfirstname, userlastname, username, number, password } = req.body;

    const imgfile = req.file.filename;

    if (!userfirstname || !userlastname || !username || !number || !password || !imgfile) {
        return res.status(422).json({ error: "plz fill all the data" });
    }

    if (!validator.isEmail(username)) {
        return res.status(422).json({ error: "Invalid email format" });
    }

    try {
        // const userExist = await User.findOne({ username: username, number: number });
        const userExist = await User.findOne({username: username, number: number});

        if (userExist) {
            // return res.status(422).json({ error: 'User already exists' });
            res.render("index", { message: "Email already taken" });
        }

        const userData = new User({ userfirstname, userlastname, username, number, password, image: imgfile });
        // const userData = new User({ userfirstname : userfirstname, userlastname : userlastname, username : username , number: number, password: password, image: imgfile });

        //generate the jwt
        const token = await userData.generateAuthToken(); //generateAuthToken() is nathing it is the user defined function inside the registrattion schema
        console.log(token); //print the return value of generateAuthToken()

        //set cookie
        // syntax --> res.cookie("name", value, [option]);
        res.cookie("jwt", token, { expires: new Date(Date.now() + 6000000000000), httpOnly: true });
        console.log(token); // Log the token, not 'cookie'
        // httpOnly : true --> it is used for user can only see the cookie but it cann't be updated
        // 30000 -3 second

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