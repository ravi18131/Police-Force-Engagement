const mongoose = require('mongoose');
const addSchema = require('../models/addSchema');
const add = mongoose.model('add', addSchema);

const addofficer = async(req, res) => {
    try{
        var addData = new add(req.body);
        const addDataOfficer = await addData.save();
        console.log(addDataOfficer);
        res.status(200).render('admin.hbs',{ message: 'Officer added successfully...' });

    }catch(e){
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = addofficer;
