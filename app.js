var express = require('express');
var app = express();
var cors = require('cors');
var domainScannerRouter = require('./domainScanner/domainScannerRouter');

app.use(cors());

app.use('/scan', domainScannerRouter);

module.exports = app;
