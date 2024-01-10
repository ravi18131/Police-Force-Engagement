const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/FMS', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected...");
    }).catch((e) => {
        console.log(e);
        console.log('Not connected..');
    })