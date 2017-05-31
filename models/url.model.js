var mongoose = require('mongoose');

/**
 * domainUrl is the url of the top level domain in the form
 * http://www.example.com
 * user is the username of the user.
 * data is the data object that the crawler gets for each image url it finds.
 * stats is the object that stores the statistics yielded by clarifai for each
 * image.
 */
var schema = new mongoose.Schema({
    domainUrl: String,
    user: String,
    data: Object,
    stats: Object,
    created: {
        type: Date,
        default: new Date()
    }
});

var model = mongoose.model('Url', schema);
module.exports = model;
