var mongoose = require('mongoose');

// Schema
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


// Model
var model = mongoose.model('Url', schema);
module.exports = model;
