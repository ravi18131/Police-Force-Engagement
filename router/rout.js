const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const userSchema = require('../models/regSchema');
const User = mongoose.model('User', userSchema);
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const createUser = require("../modules/registration");
const loginUser = require('../modules/login');
const userFeedback = require('../modules/feedback');
const adminlogin = require("../modules/adminlogin");
const addofficer = require("../modules/addofficer");
const addSchema = require('../models/addSchema');
const add = mongoose.model('add', addSchema);
const storage = require('../modules/upload');
const upload = multer({ storage: storage });
const app = express.Router();


app.post('/userreg', upload.single('image'), createUser);
app.post('/officer', loginUser);
app.post('/feedback', userFeedback);
app.post('/admin', adminlogin);
app.post('/addData', addofficer);


// delete request

app.get("/remove-officer", (req, res) => {
    console.log(req.query.EmailId); // Assuming EmailId is sent via query parameters
    add.deleteOne({ EmailId: req.query.EmailId })
        .then(data => {
            console.log(data);
            console.log("officer successfully deleted");
            res.status(200).render('admin.hbs', { message: 'Officer deleted successfully completed.' });
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).send("Error deleting member");
        });
});


// const imgSchema = require('../models/imgSchema');
// const img = mongoose.model('img', imgSchema);
// app.post('/image', upload.single('image'), async (req, res) => {

//     const imgfile = req.file.filename;
//     try {
//         const userData = new img({ image : imgfile });
//         const imgData = await userData.save();
//         // console.log(imgData);
//         res.send("successfully uploaded image")
//     } catch(e) {
//         console.log(e);
//         res.send("An error is accord");
//     }

// });


app.get('/views/ab_police_station', async (req, res) => {
    try {
        // Retrieve all collection data
        const data = await adminabpsdata.find({}).exec();
        // Send the collection data as a JSON response
        // res.send(data);
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/', (req, res) => {
    const params = {}; // used for dynamic data rendring
    res.status(200).render('index', params);
});
app.get('/profile', auth, async (req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById({ _id: verifyUser._id });
    res.status(200).render('profile', { fname: user.userfirstname + " " + user.userlastname, email: user.username, number: user.number, image: user.image });
});
app.get('/service', auth, async(req, res) => {
    res.status(200).render('service');
});
app.get('/about', (req, res) => {
    res.status(200).render('about');
});

app.get('/upload', (req, res) => {
    res.status(200).render('image');
});
app.get('/structure', (req, res) => {
    res.status(200).render('structure');
});
app.get('/who_is_who', (req, res) => {
    res.status(200).render('who_is_who');
});
app.get('/history', (req, res) => {
    res.status(200).render('about');
});
app.get('/user_history', (req, res) => {
    res.status(200).render('about');
});
app.get('/helpline', (req, res) => {
    const params = {}
    res.status(200).render('helpline', params);
});
app.get('/registration', (req, res) => {
    const params = {}
    res.status(200).render('./registration', params);
});
app.get('/user_deshboard', (req, res) => {
    const params = {}
    res.status(200).render('./user_deshboard.hbs', params);
});
app.get('/admin-add-officer', adminAuth, (req, res) => {
    const params = {}
    res.status(200).render('./admin_add_employee.hbs', params);
});
app.get('/admin-updat-officer', adminAuth, (req, res) => {
    const params = {}
    res.status(200).render('./admin_update_employee.hbs', params);
});
app.get('/admin-remove-officer', adminAuth, (req, res) => {
    const params = {}
    res.status(200).render('./admin_remove_employee.hbs', params);
});
app.get('/feedback', auth, (req, res) => {
    const params = {}
    res.status(200).render('./feedback.hbs', params);
});
app.get('/progress', auth, (req, res) => {
    const params = {}
    res.status(200).render('progress', params);
});
app.get('/map', (req, res) => {
    const params = {}
    res.status(200).render('map', params);
})
app.get('/user_history', async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/assigned_work', auth, async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/availability', auth, async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/crimeChart2', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart2.hbs', params);
})
app.get('/crimeChart3', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart3.hbs', params);
})
app.get('/crimeChart4', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart4.hbs', params);
})
app.get('/admin-profile', (req, res) => {
    const params = {}
    res.status(200).render('adminProfile', params);
})
app.get('/crimeChart', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart', params);
})

app.get('/logout', (req, res) => {
    res.render("index");
})

app.get('*', (req, res) => {
    res.render('404.hbs');
})




module.exports = app;
