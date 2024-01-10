require('dotenv').config();    // make sure config at the top
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session')
const path = require("path");
const bodyParser = require("body-parser");
require('./db/conn');
const createUser = require("./modules/registration");
const loginUser = require('./modules/login');
const userFeedback= require('./modules/feedback');
const adminlogin = require("./modules/adminlogin");
const addofficer = require("./modules/addofficer");
const addSchema = require('./models/addSchema');
const add = mongoose.model('add', addSchema);

const app = express();
const port = process.env.PORT;

// console.log(process.env.SECRET_KEY);

// const mySchema = new mongoose.Schema({
//     City: String,
//     State: String,
//     Allotment: String,
//     Transfers: String,
//     Promotion: String,
//     Concern: String,
//     Gender: String,
//     Status: String,
//     Achievement: String,
//     FirstName: String,
//     LastName: String,
//     PoliceStation: String,
//     Rank: String,
//     Suggetion: String,
//     UserId: String,
//     ZipCode: String,
//     WorkStatus: String,
//     EmailId: String,
//     AssignedWork: String
// });


// const DutySchema = new mongoose.Schema({
//     City: String,
//     State: String,
//     Allotment: String,
//     Transfers: String,
//     Promotion: String,
//     Concern: String,
//     Gender: String,
//     Status: String,
//     Achievement: String,
//     FirstName: String,
//     LastName: String,
//     PoliceStation: String,
//     Rank: String,
//     Suggetion: String,
//     UserId: String,
//     ZipCode: String,
//     WorkStatus: String,
//     EmailId: String,
//     AssignedWork: String,
//     Location: String,
//     Date: String,
//     Startingtime: String,
//     Endingtime: String,

// });


// schema modules

// Define a model for the collection
// const adminpsdata = mongoose.model('adminpsdata', mySchema);
// const adminabpsdata = mongoose.model('adminabpsdata', mySchema);
// const adminagpsdata = mongoose.model('adminagpsdata', mySchema);
// const adminbgpsdata = mongoose.model('adminbgpsdata', mySchema);
// const admingnpsdata = mongoose.model('admingnpsdata', mySchema);
// const admingppsdata = mongoose.model('admingppsdata', mySchema);
// const adminmpnpsdata = mongoose.model('adminmpnpsdata', mySchema);
// const adminrbpsdata = mongoose.model('adminrbpsdata', mySchema);


// const ratibadpsassignedwork = mongoose.model('ratibadpsassignedwork', DutySchema);


// const ratibadpsduty = mongoose.model('ratibadpsduty', DutySchema);
// const ashokagardenpsduty = mongoose.model('ashokagardenpsduty', DutySchema);
// const mpnagarpsduty = mongoose.model('mpnagarpsduty', DutySchema);
// const bairagadhpsduty = mongoose.model('bairagadhpsduty', DutySchema);
// const aishbagpsduty = mongoose.model('aishbagpsduty', DutySchema);
// const govindpurapsduty = mongoose.model('govindpurapsduty', DutySchema);
// const gandhinagarpsduty = mongoose.model('gandhinagarpsduty', DutySchema);


// Use statics fils

app.use('/static', express.static('static')); 
app.use('/static/img', express.static('img'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}))


// app.use(passport.initialize());
// app.use(passport.session());

app.post('/userreg',createUser);
app.post('/userlogin', loginUser);
app.post('/feedback',userFeedback);
app.post('/adminlogin',adminlogin);
app.post('/addData', addofficer);

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
app.get('/views/ag_police_station', async (req, res) => {
    try {
        const data = await adminagpsdata.find({}).exec();
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/views/bg_police_station', async (req, res) => {
    try {
        const data = await adminbgpsdata.find({}).exec();
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/views/gn_police_station', async (req, res) => {
    try {
        const data = await admingnpsdata.find({}).exec();
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/views/gp_police_station', async (req, res) => {
    try {
        const data = await admingppsdata.find({}).exec();
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/views/mpn_police_station', async (req, res) => {
    try {
        const data = await adminmpnpsdata.find({}).exec();
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/views/rb_police_station', async (req, res) => {
    try {
        const data = await adminrbpsdata.find({}).exec();
        res.render('police_station.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/', (req, res) => {
    const params = {}; // used for dynamic data rendring
    res.status(200).render('index', params);
})
app.get('/views/service', (req, res) => {
    res.status(200).render('service');
})
app.get('/service', (req, res) => {
    res.status(200).render('service');
})
app.get('/views/about', (req, res) => {
    res.status(200).render('about');
})
app.get('/views/structure', (req, res) => {
    res.status(200).render('structure');
})
app.get('/views/who_is_who', (req, res) => {
    res.status(200).render('who_is_who');
})

app.get('/views/history', (req, res) => {
    res.status(200).render('about');
})
app.get('/user_history', (req, res) => {
    res.status(200).render('about');
})

app.get('/views/admin', (req, res) => {
    const params = {}
    res.status(200).render('history', params);
})

app.get('/views/feedback', (req, res) => {
    const params = {}
    res.status(200).render('feedback', params);
})

app.get('/helpline', (req, res) => {
    const params = {}
    res.status(200).render('helpline', params);
})
app.get('/views/helpline', (req, res) => {
    const params = {}
    res.status(200).render('helpline', params);
})
app.get('/registration', (req, res) => {
    const params = {}
    res.status(200).render('./registration', params);
})
app.get('/views/home', (req, res) => {
    const params = {}
    res.status(200).render('./user_deshboard.hbs', params);
})
app.get('/views/user_deshboard', (req, res) => {
    const params = {}
    res.status(200).render('./user_deshboard.hbs', params);
})
app.get('/views/admin_add_employee', (req, res) => {
    const params = {}
    res.status(200).render('./admin_add_employee.hbs', params);
})
app.get('/views/admin_update_employee', (req, res) => {
    const params = {}
    res.status(200).render('./admin_update_employee.hbs', params);
})
app.get('/views/admin_remove_employee', (req, res) => {
    const params = {}
    res.status(200).render('./admin_remove_employee.hbs', params);
})
app.get('/feedback', (req, res) => {
    const params = {}
    res.status(200).render('./feedback.hbs', params);
})
// app.get('/views/assigned_work', (req, res) => {
//     const params = {}
//     res.status(200).render('availability.hbs', params);
// })
app.get('/views/assigned_work', async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/progress', (req, res) => {
    const params = {}
    res.status(200).render('progress', params);
})
app.get('/views/map', (req, res) => {
    const params = {}
    res.status(200).render('map', params);
})
app.get('/map', (req, res) => {
    const params = {}
    res.status(200).render('map', params);
})
app.get('/views/user_history', async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/views/availability', async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/views/progress', (req, res) => {
    const params = {}
    res.status(200).render('progress', params);
})
app.get('/views/crimeChart2', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart2.hbs', params);
})
app.get('/views/crimeChart3', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart3.hbs', params);
})
app.get('/views/crimeChart4', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart4.hbs', params);
})
app.get('/userlogin', (req, res) => {
    const params = {}
    res.status(200).render('admin', params);
})
app.get('/views/crimeChart', (req, res) => {
    const params = {}
    res.status(200).render('crimeChart', params);
})
// app.get('/views/police_station', (req, res) => {
//     const params = {}
//     res.status(200).render('police_station', params);
// })


app.get('/availability', async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('availability.hbs', { data });
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/assigned_work', async (req, res) => {
    try {
        const data = await add.find({}).exec();
        res.render('assigned_work.hbs', { data });
        // res.send(data);
    } catch (err) {
        console.log(`Error retrieving collection data: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/views/logout', (req,res)=>{
    res.render("index");
})

app.get('*',(req,res)=>{
    res.render('404.hbs');
})



// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             // if (!user.verifyPassword(password)) { return done(null, false); }
//             if (!user.password === password) { return done(null, false); }
//             return done(null, user);
//         });
//     }
// ));

// passport.serializeUser((user, done) => {
//     if (user) {
//         return done(null, user.id);
//     }
//     return done(null, false);
// })

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         if (err) return done(null, false); // Corrected 'fasle' to 'false'
//         return done(null, user);
//     });
// });


// function isAuthenticated(req, res, done) {
//     if (req.user) {
//         return done();
//     }
//     return res.redirect("/");
// }


// app.get('/id', async (req, res) => {
//     try {
//         const data = await add.find({}).exec();
//         res.render('assigned_work.hbs', { data });
//         // res.send(data);
//     } catch (err) {
//         console.log(`Error retrieving collection data: ${err}`);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.get('/views/admin_update_employee', async (req, res) => {
//     try {
//         const data = await add.find({User Id}).exec();
//         res.render('assigned_work.hbs', { data });
//         // res.send(data);
//     } catch (err) {
//         console.log(`Error retrieving collection data: ${err}`);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });





// Sever listening
app.listen(port, () => {
    try{
        console.log(`server is runnning on the port ${port}`);
        
    }catch(e){
        console.log(e);
        console.log("An error is accured.....");
    }
});