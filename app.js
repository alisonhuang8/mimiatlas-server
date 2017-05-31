var express = require('express');
var app = express();
var cors = require('cors');
var domainScannerRouter = require('./domainScanner/domainScannerRouter');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'localhost/mimi', {});

app.use(cors());

app.use('/scan', domainScannerRouter);

module.exports = app;
