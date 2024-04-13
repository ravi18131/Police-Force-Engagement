const mongoose = require('mongoose');
const adminSchema = require('../models/adminSchema');
const admin = mongoose.model('admin', adminSchema);
const validator = require('validator');

const adminlogin =  async (req, res) => {
    try {
        const { adminemail, adminpassword } = req.body;
        // console.log(username,password);

        if (!adminemail || !adminpassword) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        if (!validator.isEmail(adminemail)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
 
        const userLogin = await admin.findOne({ adminemail: adminemail});

        if (!userLogin) {
            return res.status(400).json({ error: "Data not found" });
        } else {
            const isMatch = await admin.findOne({ adminpassword: adminpassword});
            //generate the jwt
            const token = await userLogin.generateAuthToken(); //generateAuthToken() is nathing it is the user defined function inside the registrattion schema
            console.log(token); //print the return value of generateAuthToken()

            res.cookie("jwt", token, { expires: new Date(Date.now() + 6000000000), httpOnly: true });
            console.log(token); // Log the token, not 'cookie'

            if (!isMatch) {
                // return res.status(400).json({ error: "Invalid credentials" });
                res.status(400).render("index", { message: "Credentials are wrong!!!"})
            } else {
                // return res.status(201).json({ message: "User Sign-in Successful" });
                res.status(200).render('admin.hbs', {message:"login successfull"});
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = adminlogin;