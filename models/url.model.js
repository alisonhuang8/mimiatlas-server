var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema({
    domainUrl: String,
    user: String,
    data: Object,
    created: {
        type: Date,
        default: new Date()
    }
});


// Model
var model = mongoose.model('Urls', schema);
module.exports = model;
