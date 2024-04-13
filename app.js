require('dotenv').config();    // make sure config at the top
const express = require("express");
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('./db/conn');


const app = express();
const port = process.env.PORT;


// Use statics fils

app.use('/static', express.static('static')); 
app.use('/static/img', express.static('img'));
app.use('/images', express.static('images')); 
// app.use('/static/img', express.static('img'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const partialPath = path.join(__dirname,'./views/partials');

// console.log(path.join(__dirname,'./views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(partialPath);

app.use(require('./router/rout'));


// Sever listening
app.listen(port, () => {
    try{
        console.log(`server is runnning on the port ${port}`);
        
    }catch(e){
        console.log(e);
        console.log("An error is accured.....");
    }
});