var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var domainScanner = require('./domainScanner');
router.use(bodyParser.urlencoded({ extended: true }));

var badRequest = function(response) {
    // TODO make this send the status in the header instead of in the response
    // body.
    response.send('400: Bad Request\n');
}

var success = function(response) {
    response.send();
}

router.post('/', function(request, response) {
    if (domainScanner.processRequest(request)) {
        success(response);
    } else {
        badRequest(response);
    }
})

module.exports = router;
