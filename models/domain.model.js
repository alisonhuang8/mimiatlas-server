var mongoose = require('mongoose');

/**
 * domainUrl is the url of the top level domain in the form
 * http://www.example.com
 * user is the username of the user.
 */
var schema = new mongoose.Schema({
    domainUrl: String,
    user: String,
    created: {
        type: Date,
        default: new Date()
    }
});

var model = mongoose.model('Domain', schema);
module.exports = model;
