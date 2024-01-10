const mongoose = require('mongoose');
const feedSchema = require('../models/feedSchema');
const feed = mongoose.model('feed', feedSchema);

const feedback = async(req, res) => {
    try{
        var feedbackData = new feed(req.body);
        const feedData = await feedbackData.save();
        console.log(feedData);
        // alert('FeedBack Successfully submited....');
        res.status(200).render('user_deshboard.hbs',{ message: 'Feedback successfully submitted.' });
    }catch(e){
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = feedback;