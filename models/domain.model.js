var mongoose = require('mongoose');

/**
 * domainUrl is the url of the top level domain in the form http://www.example.com
 */
var schema = new mongoose.Schema({
    domainUrl: String,
    user: String,
    created: {
        type: Date,
        default: new Date()
    }
});


// Model
var model = mongoose.model('Domain', schema);
module.exports = model;
