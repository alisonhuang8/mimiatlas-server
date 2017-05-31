var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var domainScanner = require('./domainScanner');
router.use(bodyParser.urlencoded({extended: true}));


// Find a Url by ID
// function getUrlById(id) {
//     return new Promise((resolve, reject) => {
//         Url.find({
//             _id: id
//         }, function(err, result) {
//             if (err) return reject(err);
//             return resolve(result);
//         });
//     })
// }

var badRequest = function(response) {
	// TODO make this send the status in the header instead of in the response
	// body.
	response.status(400).send('Bad Request\n');
}

var success = function(response) {

	response.send();
}

router.post('/', function(request, response) {
	var scanResponse = domainScanner.processRequest(request)
	if (scanResponse) {
		success(response, scanResponse);
	} else {
		badRequest(response, scanResponse);
	}
})

module.exports = router;
